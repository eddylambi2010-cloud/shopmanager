// functions/api/check.js — Cloudflare Pages Function
// Reçoit GET ?reference=SHOP... et renvoie le statut du paiement MyPvit.
const json = (body, status = 200) =>
new Response(JSON.stringify(body), {
status,
headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
});
const FINAL_BAD = ["FAILED", "CANCELLED", "CANCELED", "EXPIRED", "REJECTED", "DECLINED"];
export async function onRequestGet({ request, env }) {
const reference = new URL(request.url).searchParams.get("reference") || "";
if (!/^SHOP\d{10,}$/.test(reference)) return json({ error: "Référence invalide" }, 400);
const secret = env.MYPVIT_SECRET || env.MYPVIT_SECRET_KEY;
const base = env.MYPVIT_API_URL || env.VITE_MYPVIT_API_URL || "https://api.mypvit.pro";
if (!secret) return json({ error: "Configuration serveur incomplète" }, 500);
try {
const res = await fetch(`${base}/v2/merchant-operation/${reference}`, {
method: "GET",
headers: { "X-Secret": secret },
});
const data = await res.json().catch(() => ({}));
if (!res.ok) return json({ reference, status: "UNKNOWN", success: false, final: false, raw: data });
const status = String(
data.status ?? data.data?.status ?? data.transaction?.status ?? data.operation?.status ?? ""
).toUpperCase();
return json({
reference,
status,
success: status === "SUCCESS",
final: status === "SUCCESS" || FINAL_BAD.includes(status),
raw: data,
});
} catch {
return json({ reference, status: "UNKNOWN", success: false, final: false });
}
}
