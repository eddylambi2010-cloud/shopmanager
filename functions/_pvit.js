// Outils PVit partagés (ne pas modifier)
export const BASE = "https://api.mypvit.pro";

let cache = {}; // une clé par compte d'opération

// Nettoie un code PVit : enlève espaces, "/", "v1", "v2" et les mots de fin de chemin
export function code(value) {
  const bad = ["", "v1", "v2", "renew-secret", "rest", "status"];
  const parts = String(value || "").trim().split("/").map((x) => x.trim()).filter((x) => !bad.includes(x.toLowerCase()));
  return parts[0] || "";
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
  return specific || env.PVIT_ACCOUNT_CODE;
}

export function allAccounts(env) {
  return [...new Set([env.PVIT_ACCOUNT_CODE, env.PVIT_ACCOUNT_CODE_AIRTEL, env.PVIT_ACCOUNT_CODE_MOOV].filter(Boolean))];
}

export async function getSecret(env, account) {
  account = account || env.PVIT_ACCOUNT_CODE;
  const now = Date.now();
  const hit = cache[account];
  if (hit && now < hit.exp) return hit.secret;

  const c = code(env.PVIT_CODE_SECRET);
  const urls = [`${BASE}/v2/${c}/renew-secret`, `${BASE}/${c}/renew-secret`];
  let lastError = "";

  for (const url of urls) {
    try {
      const body = new URLSearchParams({
        operationAccountCode: account,
        receptionUrlCode: String(env.PVIT_CALLBACK_CODE || "").trim(),
        password: env.PVIT_PASSWORD,
      });
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.secret) {
        const ttl = Math.max((Number(j.expires_in) || 3600) - 300, 60);
        cache[account] = { secret: j.secret, exp: now + ttl * 1000 };
        return j.secret;
      }
      lastError += `[${url.includes("/v2/") ? "v2" : "v1"}: HTTP ${r.status} ${JSON.stringify(j).slice(0, 400)}] `;
    } catch (e) {
      lastError += `[${url.includes("/v2/") ? "v2" : "v1"}: ${String(e)}] `;
    }
  }
  throw new Error("Clé PVit impossible à obtenir : " + lastError);
}
