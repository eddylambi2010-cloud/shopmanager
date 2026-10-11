import { json, getSecret, allAccounts, code, fwdIp, pvitFetch } from "../_pvit.js";

// GET /api/check?reference=PAY...   réponse : { ok, status, success, final }
const out = (status) =>
  json({ ok: true, status, success: status === "SUCCESS", final: status === "SUCCESS" || status === "FAILED" });

export async function onRequestGet({ request, env }) {
  try {
    const sp = new URL(request.url).searchParams;
    const id = sp.get("reference") || sp.get("transactionId");
    if (!id) return json({ ok: false, error: "reference manquante" }, 400);

    let last = "PENDING";
    for (const account of allAccounts(env)) {
      const ip = fwdIp(env, request);
      const secret = await getSecret(env, account, ip);
      const url =
        `/${code(env.PVIT_CODE_STATUS)}/status` +
        `?transactionId=${encodeURIComponent(id)}` +
        `&accountOperationCode=${encodeURIComponent(account)}` +
        `&transactionOperation=PAYMENT`;
      const r = await pvitFetch(env, url, {
        method: "GET",
        headers: { "X-Secret": secret, Accept: "application/json" },
      }, ip);
      const j = await r.json().catch(() => ({}));
      const status = j.status || (j.data && j.data.status);
      if (r.ok && status) return out(status);
      if (status) last = status;
    }
    return out(last);
  } catch (e) {
    return json({ ok: false, error: String(e.message || e) }, 500);
  }
}
