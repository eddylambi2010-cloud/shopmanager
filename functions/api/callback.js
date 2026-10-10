import { json } from "../_pvit.js";

// POST /api/callback — appelé par PVit après chaque paiement.
// Accusé de réception obligatoire : renvoyer tel quel transactionId et code.
export async function onRequestPost({ request }) {
  const b = await request.json().catch(() => ({}));
  return json({ transactionId: b.transactionId, responseCode: b.code }, 200);
}

export async function onRequestGet() {
  return json({ ok: true });
}
