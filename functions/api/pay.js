// functions/api/pay.js — Cloudflare Pages Function
// Reçoit POST { amount, phone, operator } et lance le paiement MyPvit.

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const OPERATORS = { MOOV: "MOOV_MONEY", AIRTEL: "AIRTEL_MONEY" };

// Numéro gabonais -> 9 chiffres (ex : 077044782)
function cleanPhone(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.startsWith("241") && d.length >= 11) d = d.slice(3);
  if (d.length === 8) d = "0" + d;
  return /^0\d{8}$/.test(d) ? d : null;
}

export async function onRequestPost({ request, env }) {
  // Accepte seulement les appels venant de ton propre site
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: "Origine refusée" }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Requête invalide" }, 400);
  }

  const amount = Math.round(Number(body.amount));
  if (!Number.isFinite(amount) || amount < 100 || amount > 5000000) {
    return json({ error: "Montant invalide" }, 400);
  }
  const phone = cleanPhone(body.phone);
  if (!phone) return json({ error: "Numéro invalide (9 chiffres)" }, 400);

  const operator_code = OPERATORS[String(body.operator || "").toUpperCase()];
  if (!operator_code) return json({ error: "Choisissez MOOV ou AIRTEL" }, 400);

  const secret = env.MYPVIT_SECRET;
  const merchant = env.VITE_MYPVIT_MERCI;
  const base = env.VITE_MYPVIT_API_URL || "https://api.mypvit.pro";
  if (!secret || !merchant) return json({ error: "Configuration serveur incomplète" }, 500);

  const reference = "SHOP" + Date.now();

  try {
    const res = await fetch(`${base}/v2/merchant-operation/rest`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Secret": secret },
      body: JSON.stringify({
        amount,
        reference,
        service: "RESTFUL",
        transaction_type: "PAYMENT",
        operator_code,
        customer_account_number: phone,
        merchant_operation_account_code: merchant,
        owner_charge: "CUSTOMER",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return json({ error: "MyPvit a refusé la demande", details: data }, 502);
    return json({ ok: true, reference, mypvit: data });
  } catch (e) {
    return json({ error: "MyPvit injoignable" }, 502);
  }
}
