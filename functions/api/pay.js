import { json, cleanPhone, getSecret, accountFor, code, clean, fwdIp, pvitFetch } from "../_pvit.js";

// POST /api/pay   corps : { phone: "074000000", operator: "AIRTEL_MONEY" | "MOOV_MONEY" (facultatif) }
export async function onRequestPost({ request, env }) {
  try {
    const b = await request.json().catch(() => ({}));
    const phone = cleanPhone(b.phone);
    if (phone.length < 8) return json({ ok: false, error: "Numéro invalide" }, 400);

    let operator = String(b.operator || "").toUpperCase();
    if (operator.includes("AIRTEL")) operator = "AIRTEL_MONEY";
    else if (operator.includes("MOOV")) operator = "MOOV_MONEY";
    else operator = phone.startsWith("07") ? "AIRTEL_MONEY" : "MOOV_MONEY";

    // Le montant est fixé côté serveur (jamais envoyé par l'app)
    const amount = Number(env.PVIT_AMOUNT || 5000);
    const reference = "SM" + Date.now() + Math.floor(Math.random() * 1000);

    const account = accountFor(env, operator);
    const ip = fwdIp(env, request);
    const secret = await getSecret(env, account, ip);
    const r = await pvitFetch(env, `/v2/${code(env.PVIT_CODE_REST)}/rest`, {
      method: "POST",
      headers: {
        "X-Secret": secret,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        agent: "SHOPMANAGER",
        amount,
        reference,
        service: "RESTFUL",
        transaction_type: "PAYMENT",
        operator_code: operator,
        customer_account_number: phone,
        merchant_operation_account_code: account,
        callback_url_code: clean(env.PVIT_CALLBACK_CODE),
        owner_charge: "CUSTOMER",
        owner_charge_operator: "CUSTOMER",
        free_info: "Abonnement SHOPMANAGER",
        product: "ABONNEMENT",
      }),
    }, ip);
    const j = await r.json().catch(() => ({}));

    if (r.ok && j.reference_id) {
      return json({
        ok: true,
        reference: j.reference_id,
        transactionId: j.reference_id,
        merchantReference: j.merchant_reference_id || reference,
        status: j.status || "PENDING",
        message: "Validez le paiement sur votre téléphone.",
      });
    }
    return json({ ok: false, error: j.message ||     const detail = j.message || (Array.isArray(j.messages) ? j.messages.join(" ") : "") || j.error || JSON.stringify(j).slice(0, 400);
    return json({ ok: false, error: "PVit HTTP " + r.status + " : " + detail }, 400); }, 400);
  } catch (e) {
    return json({ ok: false, error: String(e.message || e) }, 500);
  }
}
