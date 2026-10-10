import { BASE, json, getSecret, allAccounts, code } from "../_pvit.js";

// GET /api/check?transactionId=PAY...   réponse : { ok, status: PENDING | SUCCESS | FAILED | AMBIGUOUS }
export async function onRequestGet({ request, env }) {
  try {
    const id = new URL(request.url).searchParams.get("transactionId");
    if (!id) return json({ ok: false, error: "transactionId manquant" }, 400);

    let last = "PENDING";
    for (const account of allAccounts(env)) {
      const secret = await getSecret(env, account);
      const url =
        `${BASE}/${code(env.PVIT_CODE_STATUS)}/status` +
        `?transactionId=${encodeURIComponent(id)}` +
        `&accountOperationCode=${encodeURIComponent(account)}` +
        `&transactionOperation=PAYMENT`;
      const r = await fetch(url, {
        headers: { "X-Secret": secret, Accept: "application/json" },
      });
      const j = await r.json().catch(() => ({}));
      const status = j.status || (j.data && j.data.status);
      if (r.ok && status) return json({ ok: true, status });
      if (status) last = status;
    }
    return json({ ok: true, status: last });
  } catch (e) {
    return json({ ok: false, error: String(e.message || e) }, 500);
  }
}
