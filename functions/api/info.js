import { json } from "../_pvit.js";

// GET /api/info : affiche le montant configuré (aucune donnée secrète)
export async function onRequestGet({ env }) {
  return json({ amount: Number(env.PVIT_AMOUNT || 5000) });
}
