// Outils PVit partagés (ne pas modifier)
export const BASE = "https://api.mypvit.pro";

let cache = {}; // une clé par compte d'opération

// Nettoie un code PVit : enlève espaces, "/", "v1", "v2" et les mots de fin de chemin
export function code(value) {
  const bad = ["", "v1", "v2", "renew-secret", "rest", "status"];
  const parts = String(value || "").trim().split("/").map((x) => x.trim()).filter((x) => !bad.includes(x.toLowerCase()));
  return parts[0] || "";
}

// Garde uniquement lettres, chiffres et "_" (supprime espaces et caractères invisibles)
export function clean(v) {
  return String(v || "").replace(/[^A-Za-z0-9_]/g, "");
}

// Une seule adresse IPv4 à transmettre à PVit dans X-Forwarded-For
const V4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
export function fwdIp(env, request) {
  const fixed = ''102.22.0.0'';
  if (V4.test(fixed)) return fixed;
  const cf = request ? String(request.headers.get("CF-Connecting-IP") || "").trim() : "";
  return V4.test(cf) ? cf : "";
}

export function ipHeader(ip) {
  return ip ? { "X-Forwarded-For": ip } : {};
}

// Appel PVit : via le relais (RELAY_URL) s'il est configuré, sinon en direct
export async function pvitFetch(env, path, init = {}, ip) {
  const relay = String(env.RELAY_URL || "").trim();
  if (relay) {
    return fetch(relay, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(env.RELAY_TOKEN || "").trim(),
      },
      body: JSON.stringify({
        path,
        method: init.method || "GET",
        headers: init.headers || {},
        body: init.body ? String(init.body) : undefined,
      }),
    });
  }
  return fetch(BASE + path, {
    ...init,
    headers: { ...(init.headers || {}), ...ipHeader(ip) },
  });
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function cleanPhone(p) {
  let n = String(p || "").replace(/\D/g, "");
  if (n.startsWith("241")) n = n.slice(3);
  if (n.length === 8) n = "0" + n;
  return n;
}

// Récupère (et renouvelle automatiquement) la clé secrète PVit
export function accountFor(env, operator) {
  const specific =
    operator === "AIRTEL_MONEY" ? env.PVIT_ACCOUNT_CODE_AIRTEL :
    operator === "MOOV_MONEY" ? env.PVIT_ACCOUNT_CODE_MOOV : "";
  return clean(specific || env.PVIT_ACCOUNT_CODE);
}

export function allAccounts(env) {
  return [...new Set([env.PVIT_ACCOUNT_CODE, env.PVIT_ACCOUNT_CODE_AIRTEL, env.PVIT_ACCOUNT_CODE_MOOV].map(clean).filter(Boolean))];
}

export async function getSecret(env, account, ip) {
  account = clean(account || env.PVIT_ACCOUNT_CODE);
  const now = Date.now();
  const hit = cache[account];
  if (hit && now < hit.exp) return hit.secret;

  const c = code(env.PVIT_CODE_SECRET);
  const urls = [`/v2/${c}/renew-secret`, `/${c}/renew-secret`];
  let lastError = "";

  for (const url of urls) {
    try {
      const body = new URLSearchParams({
        operationAccountCode: account,
        receptionUrlCode: clean(env.PVIT_CALLBACK_CODE),
        password: env.PVIT_PASSWORD,
      });
      const r = await pvitFetch(env, url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      }, ip);
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.secret) {
        const ttl = Math.max((Number(j.expires_in) || 3600) - 300, 60);
        cache[account] = { secret: j.secret, exp: now + ttl * 1000 };
        return j.secret;
      }
      lastError += `[${url.startsWith("/v2/") ? "v2" : "v1"}: HTTP ${r.status} ${JSON.stringify(j).slice(0, 400)}] `;
    } catch (e) {
      lastError += `[${url.startsWith("/v2/") ? "v2" : "v1"}: ${String(e)}] `;
    }
  }
  throw new Error("Clé PVit impossible à obtenir : " + lastError + `(compte envoyé : ${account}, ${account.length} caractères)`);
}
