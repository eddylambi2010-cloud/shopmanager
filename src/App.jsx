// SHOPMANAGER — Votre commerce, simplement. (version React / JSX)
// Utilisation : export par défaut <App /> ; aucune autre dépendance que React. 
import { useState, useEffect, useRef } from "react";
const CSS = `:root{--b:#0B2A5B;--a:#1E6BFF;--y:#FFC21A;--g:#16A34A;--r:#DC2626;--bg:#F1F3F6;--c:#fff;--t:#111;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media(prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#0d1420;--c:#1a2434;--t:#f2f5fa}}
html,body{height:100%;margin:0}body{background:var(--bg);color:var(--t);font:18px system-ui,Arial,sans-serif}
*{box-sizing:border-box}header{display:flex;align-items:center;gap:8px;background:var(--b);color:#fff;padding:10px 12px;position:sticky;top:env(safe-area-inset-top,0px);z-index:5}
header b{flex:1;text-align:center;font-size:20px}header button{background:#ffffff22;color:#fff;border:0;border-radius:14px;width:52px;height:52px;font-size:26px}
main{max-width:560px;margin:auto;padding:14px 14px 90px}button{font:inherit;cursor:pointer}
.big{display:block;width:100%;min-height:62px;border:0;border-radius:18px;background:var(--a);color:#fff;font-size:20px;font-weight:700;margin:10px 0;padding:10px}
.y{background:var(--y);color:#111}.g{background:var(--g)}.r{background:var(--r)}.lnk{background:none;border:0;color:var(--a);padding:12px;font-size:17px;width:100%}
.hi{font-size:26px;font-weight:700;margin:6px 0}.hi small{display:block;font-size:16px;font-weight:400;opacity:.7}
.g4{display:grid;grid-template-columns:1fr 1fr;gap:12px}.g4 button{background:var(--c);color:var(--t);border:0;border-radius:22px;padding:22px 6px;font-weight:800;font-size:19px;box-shadow:0 2px 8px #0002}.g4 i{display:block;font-size:54px;font-style:normal;margin-bottom:6px}
.g4.s{margin:10px 0}.g4.s button{padding:14px 4px;font-size:15px}.g4.s i{font-size:36px;margin-bottom:4px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.card{background:var(--c);border-radius:20px;padding:12px;text-align:center;position:relative;box-shadow:0 2px 6px #0002}.card i{display:block;font-size:44px;font-style:normal}.card b,.card span,.card small{display:block}.card span{color:var(--a);font-weight:700}.card small{opacity:.7}
.card em{position:absolute;top:6px;right:8px;background:var(--g);color:#fff;border-radius:50%;min-width:30px;height:30px;line-height:30px;font-style:normal;font-weight:700}
.tabs{display:flex;gap:8px;overflow-x:auto;margin-bottom:10px}.tabs button{border:0;border-radius:20px;padding:12px 18px;background:var(--c);color:var(--t);white-space:nowrap;font-weight:700}.tabs .on{background:var(--b);color:#fff}
.row{display:flex;align-items:center;gap:10px;background:var(--c);border-radius:16px;padding:12px;margin:8px 0}.row>div{flex:1}.row small{display:block;opacity:.7}.row i{font-size:34px;font-style:normal}
.alert{background:var(--r);color:#fff;border-radius:16px;padding:14px;margin:10px 0;font-weight:700;animation:bl 1s infinite}.alert button{display:block;margin-top:8px;border:0;border-radius:12px;padding:10px;background:#fff;color:var(--r);font-weight:700}
@keyframes bl{50%{opacity:.45}}
.cartp{position:sticky;bottom:0;background:var(--c);border-radius:20px 20px 0 0;padding:12px;box-shadow:0 -4px 14px #0003;margin-top:12px}
.cartp .l{display:flex;align-items:center;gap:6px;margin:4px 0}.cartp .l span{flex:1}.cartp .l button{width:44px;height:44px;border-radius:12px;border:0;background:var(--bg);color:var(--t);font-size:22px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:8px}.two button{min-height:56px;border-radius:14px;border:3px solid transparent;font-weight:700;font-size:18px;background:var(--bg);color:var(--t)}.two .on.p{background:var(--g);color:#fff}.two .on.c{background:var(--r);color:#fff}
select,input{width:100%;font:inherit;padding:14px;border-radius:12px;border:2px solid #8884;background:var(--bg);color:var(--t);margin:4px 0}
.ov{position:fixed;inset:0;background:#000a;z-index:20;display:flex;align-items:flex-end;justify-content:center}.md{background:var(--c);width:100%;max-width:560px;border-radius:24px 24px 0 0;padding:16px;max-height:90%;overflow:auto}
.num{font-size:38px;font-weight:800}.cd{background:var(--c);border-radius:20px;padding:16px;margin:10px 0;text-align:center}.gr{color:var(--g)}.rd{color:var(--r)}
.bars{display:flex;align-items:flex-end;gap:6px;height:120px}.bars div{flex:1;background:var(--a);border-radius:6px 6px 0 0;min-height:3px}.bars+.bars{height:auto;font-size:12px;text-align:center;margin-top:2px}.bars+.bars div{background:none}
pre{white-space:pre-wrap;background:var(--bg);padding:12px;border-radius:12px;font:16px monospace}`;
const PUB={"kty": "EC", "crv": "P-256", "x": "xzcuBLJW4NdJlBfwoZF5n4SbVYJivcabTG4U9SNyhHQ", "y": "Hm3OB2UBER4QyOqaf45D0r9d0fv1eLDko0b_-U1JEJE"},ENC='EoIMIHhMz9cBd2DsmAWL2l6BJCh4JZYNvIB3JGglGgfpbErOZzpeeJmvHH/NVcExIpBjWnolhOi4MuUJ07tCDueU9sCGXUuV5MhRZmCpIdTT9zd2VuwjW4vtcrwqrIdTcGb14cmOA/mY++9PJn8TLxlEbZTn+tk2aLilKTVhOmeFSDR0jxh7rLtF2osqKPVZv38zqyEEmQ1+PDbNibY7K9ScR9a7VmI1uoakDDCAP3IAYt1UlRJkaoRa8fRe0m5+/02aOk15gQ1HGLb8XF63AK9HVLLVlvmI2VYw6TZzwUVES/dHXUBbw7SExUNGG2OwyKRgIasKPsj7Hw==';
const ADM='0982849bb3576bd57e217efb1d3627dc785bbb79b5e35a0c872418405f28a27b';
const DAY = 864e5, today = () => new Date().setHours(0, 0, 0, 0);
const f = n => Math.round(n).toLocaleString("fr-FR") + " FCFA";
const nm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const nid = a => Math.max(0, ...a.map(x => x.id)) + 1;
const enc = t => new TextEncoder().encode(t);
const b64 = b => btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const ub = t => Uint8Array.from(atob(t.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
const ECA = { name: "ECDSA", namedCurve: "P-256" }, SG = { name: "ECDSA", hash: "SHA-256" };
const hs = async p => [...new Uint8Array(await crypto.subtle.digest("SHA-256", enc("sm:" + p)))].map(b => b.toString(16).padStart(2, "0")).join("");
const rid = () => Array.from({ length: 6 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
async function getSk(p) {
try {
const b = Uint8Array.from(atob(ENC), c => c.charCodeAt(0));
const km = await crypto.subtle.importKey("raw", enc(p), "PBKDF2", false, ["deriveKey"]);
const k = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: b.slice(0, 16), iterations: 100000, hash: "SHA-256" }, km, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b.slice(16, 28) }, k, b.slice(28)));
} catch { return ""; }
}
async function skOk(sk) {
try {
if (!sk) return false;
const m = enc("t"), pk = await crypto.subtle.importKey("jwk", PUB, ECA, false, ["verify"]), k = await crypto.subtle.importKey("jwk", JSON.parse(sk), ECA, false, ["sign"]);
return await crypto.subtle.verify(SG, pk, await crypto.subtle.sign(SG, k, m), m);
} catch { return false; }
}
const wa = (tel, t) => {
let n = String(tel || "").replace(/\D/g, "");
if (/^0\d{8}$/.test(n)) n = "241" + n.slice(1);
window.open("https://wa.me/" + n + "?text=" + encodeURIComponent(t), "_blank");
};
const spk = t => { try { const u = new SpeechSynthesisUtterance(t); u.lang = "fr-FR"; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch {} };
const recTxt = (s, biz) => `SHOPMANAGER\nReçu de vente\n${biz.name}${biz.tel ? "\nTél : " + biz.tel : ""}\n${new Date(s.d).toLocaleString("fr-FR")}\n\n${s.items.map(i => `${i.q} x ${i.name} = ${f(i.q * i.price)}`).join("\n")}\n\nTOTAL : ${f(s.total)}\n${s.paid ? "PAYÉ ✅" : "À CRÉDIT"}\nMerci !`;
const DEF = {
biz: { name: "Ma boutique", tel: "" },
settings: { price: 5000, days: 30, grace: 2, demo: 10 },
secs: [{ id: 1, name: "Alimentation", icon: "🍚" }, { id: 2, name: "Boissons", icon: "🥤" }, { id: 3, name: "Beauté", icon: "🧼" }],
prods: [
{ id: 1, sec: 1, name: "Riz 5 kg", icon: "🍚", price: 8000, cost: 6500, stock: 20, min: 5 },
{ id: 2, sec: 2, name: "Jus", icon: "🧃", price: 500, cost: 300, stock: 40, min: 10 },
{ id: 3, sec: 3, name: "Savon", icon: "🧼", price: 600, cost: 400, stock: 3, min: 5 },
],
custs: [{ id: 1, name: "Jean (démo)", tel: "", debt: 0 }],
sales: [], cash: [], until: 0, seen: 0, mute: {}, adm: 0, h: "", sk: "", dev: rid(), n: 0, msg: "",
pay: { moov: "065575201", airtel: "077044782", intl1: "", intl2: "", payurl: "", apiurl: "", apikey: "", wa: "" },
};
const TUT = ["🛒 Pour vendre, appuyez ici.", "📦 Pour voir vos produits, appuyez ici.", "💰 Pour voir votre argent, appuyez ici."];
function FormModal({ fm, close }) {
const [v, setV] = useState(() => Object.fromEntries(fm.fields.map(x => [x.k, x.v ?? ""])));
const set = (k, val) => setV(o => ({ ...o, [k]: val }));
return (
<div className="ov"><div className="md">
<h3>{fm.title}</h3>
{fm.fields.map(x => (
<label key={x.k}>{x.l}
{x.o
? <select value={v[x.k]} onChange={e => set(x.k, e.target.value)}>{x.o.map(o => <option key={o[0]} value={o[0]}>{o[1]}</option>)}</select>
: <input type={x.t || "text"} inputMode={x.t === "number" ? "numeric" : undefined} value={v[x.k]} onChange={e => set(x.k, e.target.value)} />}
</label>
))}
<button className="big g" onClick={() => {
const r = {};
fm.fields.forEach(x => { const a = v[x.k]; r[x.k] = x.t === "number" ? (+a || 0) : x.o ? +a : String(a).trim(); });
close(); fm.ok(r);
}}>✅ OK</button>
{fm.del && <button className="big r" onClick={() => { if (confirm("Supprimer ?")) { close(); fm.del(); } }}>🗑️ Supprimer</button>}
<button className="lnk" onClick={close}>Annuler</button>
</div></div>
);
}
export default function App() {
const [S, setS] = useState(() => {
try { const x = JSON.parse(localStorage.getItem("sm")); return x ? { ...DEF, ...x, pay: { ...DEF.pay, ...x.pay } } : DEF; } catch { return DEF; }
});
useEffect(() => { try { localStorage.setItem("sm", JSON.stringify(S)); } catch {} }, [S]);
const up = fn => setS(s => { const c = structuredClone(s); fn(c); return c; });
const [st, setSt] = useState([["home", {}]]);
const [fm, setFm] = useState(null), [msg, setMsg] = useState(null);
const [cart, setCart] = useState({}), [mode, setMode] = useState("paid"), [cu, setCu] = useState(0), [sec, setSec] = useState(0);
const [q, setQ] = useState(""), [per, setPer] = useState(1), [mp, setMp] = useState(1), [last, setLast] = useState(null);
const [vt, setVt] = useState(""), [pend, setPend] = useState(null);
const taps = useRef(0), tt = useRef(0);
const [cur, P] = st[st.length - 1];
const go = (s, p = {}) => setSt(a => [...a, [s, p]]);
const back = () => setSt(a => (a.length > 1 ? a.slice(0, -1) : a));
const home = () => setSt([["home", {}]]);
const say = t => setMsg(t);
const form = (title, fields, ok, del) => setFm({ title, fields, ok, del, id: Math.random() });
const dcode = S.dev + "." + S.n;
const act = S.adm || Date.now() < S.until + S.settings.grace * DAY;
const locked = !act && S.sales.length >= S.settings.demo;
useEffect(() => { if (locked && !["sub", "done"].includes(cur)) setSt([["sub", {}]]); }, [locked, cur]);
const since = d => S.sales.filter(s => s.d >= d);
const sum = (a, fn) => a.reduce((s, x) => s + fn(x), 0);
// ---- Administration ----
const unlock = () => form("Code administrateur", [{ k: "p", l: "Code secret", t: "password" }], async r => {
if ((await hs(r.p)) !== (S.h || ADM)) return say("Code incorrect");
if (await skOk(S.sk)) { up(c => { c.adm = 1; }); return go("admin"); }
form("Première fois sur ce téléphone", [{ k: "k", l: "Clé d'origine (une seule fois)", t: "password" }], async z => {
const sk = await getSk(z.k);
if (sk && (await skOk(sk))) { up(c => { c.sk = sk; c.adm = 1; }); go("admin"); } else say("Clé incorrecte");
});
});
const tapTitle = () => {
taps.current++; clearTimeout(tt.current); tt.current = setTimeout(() => { taps.current = 0; }, 2000);
if (taps.current >= 3) { taps.current = 0; unlock(); } else home();
};
const activate = async c0 => {
const c = (c0 || "").trim(), k = c.indexOf("-"), d = +c.slice(0, k);
try {
const pk = await crypto.subtle.importKey("jwk", PUB, ECA, false, ["verify"]);
if (d > 0 && (await crypto.subtle.verify(SG, pk, ub(c.slice(k + 1)), enc(dcode + "|" + d)))) {
up(x => { x.until = Math.max(Date.now(), x.until) + d * DAY; x.n++; }); home(); return say("Abonnement activé ✅");
}
} catch {}
say("Code incorrect");
};
const aCode = () => form("Code d'activation", [{ k: "v", l: "Code appareil du client" }, { k: "d", l: "Jours", t: "number", v: S.settings.days }], async r => {
try {
const k = await crypto.subtle.importKey("jwk", JSON.parse(S.sk), ECA, false, ["sign"]);
const c = r.d + "-" + b64(await crypto.subtle.sign(SG, k, enc(r.v.trim() + "|" + r.d)));
try { navigator.clipboard.writeText(c); } catch {}
say(<>Code à envoyer au client (copié) :<pre>{c}</pre></>);
} catch { say("Erreur, code appareil invalide"); }
});
const aTarif = () => form("Tarifs et délais", [
{ k: "price", l: "Prix abonnement (FCFA)", t: "number", v: S.settings.price }, { k: "days", l: "Durée (jours)", t: "number", v: S.settings.days },
{ k: "grace", l: "Délai de grâce (jours)", t: "number", v: S.settings.grace }, { k: "demo", l: "Ventes gratuites", t: "number", v: S.settings.demo }], r => up(c => { c.settings = r; }));
const aPay = () => form("Moyens de paiement", [
{ k: "moov", l: "Moov Money", t: "tel", v: S.pay.moov }, { k: "airtel", l: "Airtel Money", t: "tel", v: S.pay.airtel },
{ k: "intl1", l: "Paiement international 1", v: S.pay.intl1 }, { k: "intl2", l: "Paiement international 2", v: S.pay.intl2 },
{ k: "payurl", l: "Lien de paiement (URL)", v: S.pay.payurl }, { k: "apiurl", l: "URL API", v: S.pay.apiurl },
{ k: "apikey", l: "Clé API publique", v: S.pay.apikey }, { k: "wa", l: "Mon WhatsApp", t: "tel", v: S.pay.wa }], r => up(c => { c.pay = r; }));
const chPw = () => form("Changer mon code", [{ k: "o", l: "Code actuel", t: "password" }, { k: "n", l: "Nouveau code (4 caractères minimum)", t: "password" }, { k: "c", l: "Retapez le nouveau code", t: "password" }], async r => {
if ((await hs(r.o)) !== (S.h || ADM)) return say("Code actuel incorrect");
if (r.n.length < 4) return say("Nouveau code trop court");
if (r.n !== r.c) return say("Les deux codes ne sont pas pareils");
const h = await hs(r.n); up(c => { c.h = h; }); say("Code changé ✅");
});
const bk = () => { const t = JSON.stringify(S); navigator.share ? navigator.share({ title: "Sauvegarde SHOPMANAGER", text: t }).catch(() => {}) : (navigator.clipboard?.writeText(t), say("Sauvegarde copiée ✅")); };
const aRes = () => form("Restaurer", [{ k: "j", l: "Collez la sauvegarde ici" }], r => { try { const o = JSON.parse(r.j); if (o && o.prods) setS({ ...o, adm: 0 }); else say("Sauvegarde invalide"); } catch { say("Sauvegarde invalide"); } });
// ---- Produits, sections, clients ----
const eP = (id, sid, secs = S.secs) => {
const p = S.prods.find(x => x.id === id) || {};
if (!secs.length) return eS();
form(id ? "Modifier le produit" : "Nouveau produit", [
{ k: "name", l: "Nom", v: p.name }, { k: "icon", l: "Icône (emoji)", v: p.icon || "📦" },
{ k: "sec", l: "Section", v: p.sec || sid || secs[0].id, o: secs.map(s => [s.id, s.name]) },
{ k: "cost", l: "Prix d'achat", t: "number", v: p.cost }, { k: "price", l: "Prix de vente", t: "number", v: p.price },
{ k: "stock", l: "Quantité en stock", t: "number", v: p.stock }, { k: "min", l: "Stock minimum (alerte)", t: "number", v: p.min ?? 3 }],
r => { if (!r.name) return; up(c => { if (id) { Object.assign(c.prods.find(x => x.id === id), r); delete c.mute[id]; } else c.prods.push({ id: nid(c.prods), ...r }); }); },
id ? () => up(c => { c.prods = c.prods.filter(x => x.id !== id); }) : undefined);
};
const eS = id => {
const s = S.secs.find(x => x.id === id) || {};
form(id ? "Modifier la section" : "Nouvelle section", [{ k: "name", l: "Nom (ex : Boissons)", v: s.name }, { k: "icon", l: "Icône (emoji)", v: s.icon || "📁" }],
r => {
if (!r.name) return;
if (id) up(c => { Object.assign(c.secs.find(x => x.id === id), r); });
else { const n = nid(S.secs); up(c => { c.secs.push({ id: n, ...r }); }); setTimeout(() => eP(0, n, [...S.secs, { id: n, ...r }]), 150); }
},
id ? () => { if (S.prods.some(p => p.sec === id)) say("Déplacez ou supprimez d'abord les produits de cette section"); else up(c => { c.secs = c.secs.filter(x => x.id !== id); }); } : undefined);
};
const eC = id => {
const c0 = S.custs.find(x => x.id === id) || {};
form(id ? "Modifier" : "Nouveau client", [{ k: "name", l: "Nom", v: c0.name }, { k: "tel", l: "Téléphone", t: "tel", v: c0.tel }],
r => { if (!r.name) return; up(c => { if (id) Object.assign(c.custs.find(x => x.id === id), r); else c.custs.push({ id: nid(c.custs), debt: 0, ...r }); }); },
id ? () => { up(c => { c.custs = c.custs.filter(x => x.id !== id); }); back(); } : undefined);
};
const ent = (type, label) => form(label, [{ k: "a", l: "Montant (FCFA)", t: "number" }], r => { if (r.a > 0) up(c => { c.cash.push({ d: Date.now(), type, label, amt: r.a }); }); });
// ---- Vente ----
const add = id => { const p = S.prods.find(x => x.id === id); if ((cart[id] || 0) < p.stock) setCart({ ...cart, [id]: (cart[id] || 0) + 1 }); else say("Stock épuisé"); };
const chg = (k, d) => { const c = { ...cart }; c[k] += d; if (c[k] <= 0) delete c[k]; setCart(c); };
const sell = () => {
const ks = Object.keys(cart); if (!ks.length) return;
if (!act && S.sales.length >= S.settings.demo) return go("sub");
if (mode === "credit" && !cu) return say("Choisissez le client 👤");
const items = ks.map(k => { const p = S.prods.find(x => x.id == k); return { id: p.id, name: p.name, q: cart[k], price: p.price, cost: p.cost }; });
const total = sum(items, i => i.q * i.price);
const sale = { id: nid(S.sales), d: Date.now(), items, total, cost: sum(items, i => i.q * i.cost), paid: mode === "paid", cu: mode === "credit" ? cu : 0 };
up(c => {
items.forEach(i => { c.prods.find(p => p.id === i.id).stock -= i.q; });
c.sales.push(sale);
if (sale.paid) c.cash.push({ d: sale.d, type: "in", label: "Vente : " + items.map(i => i.q + " " + i.name).join(", "), amt: total });
else c.custs.find(x => x.id === cu).debt += total;
});
setLast(sale); setCart({}); setCu(0); setMode("paid"); setSt(a => [...a.slice(0, -1), ["done", {}]]);
};
// ---- Voix ----
const run = t => {
const x = nm(t).replace(/(\d)\s+(?=\d{3})/g, "$1");
const pr = S.prods.find(p => nm(p.name).split(" ").some(w => w.length > 2 && x.includes(w.replace(/s$/, ""))));
const NW = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10 };
const qn = () => { const d = x.match(/\d+/); if (d) return +d[0]; for (const w of x.split(/\s+/)) if (NW[w]) return NW[w]; return 1; };
const rep = s => { setVt(s); setPend(null); spk(s); }, ask = (s, fn) => { setVt(s); setPend(() => fn); spk(s); };
let m;
if (/combien.*(vendu|gagne)/.test(x)) return rep(`Aujourd'hui vous avez vendu ${f(sum(since(today()), s => s.total))}.`);
if (/qui.*doi/.test(x)) { const d = S.custs.filter(c => c.debt > 0); return rep(d.length ? d.map(c => `${c.name} vous doit ${f(c.debt)}`).join(". ") : "Personne ne vous doit rien."); }
if (/reste/.test(x) && pr) return rep(`Il vous reste ${pr.stock} ${pr.name}.`);
if (/d[e]?pense/.test(x) && (m = x.match(/(\d+)/))) return ask(`Enregistrer une dépense de ${f(+m[1])} ?`, () => up(c => { c.cash.push({ d: Date.now(), type: "out", label: "Dépense", amt: +m[1] }); }));
if (/ajoute/.test(x) && pr) { const n = qn(); return ask(`Ajouter ${n} ${pr.name} au stock ?`, () => up(c => { c.prods.find(p => p.id === pr.id).stock += n; })); }
if (/(vendu|vends|vente)/.test(x) && pr) {
const n = qn(); if (n > pr.stock) return rep(`Il ne reste que ${pr.stock} ${pr.name}.`);
return ask(`Confirmer la vente de ${f(n * pr.price)} ?`, () => up(c => {
c.sales.push({ id: nid(c.sales), d: Date.now(), items: [{ id: pr.id, name: pr.name, q: n, price: pr.price, cost: pr.cost }], total: n * pr.price, cost: n * pr.cost, paid: true, cu: 0 });
c.prods.find(p => p.id === pr.id).stock -= n;
c.cash.push({ d: Date.now(), type: "in", label: "Vente : " + n + " " + pr.name, amt: n * pr.price });
}));
}
rep("Je n'ai pas compris. Essayez : « J'ai vendu deux riz ».");
};
const listen = () => {
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SR) return say("Micro non disponible ici. Écrivez votre phrase en bas ✍️");
const r = new SR(); r.lang = "fr-FR"; r.onresult = e => run(e.results[0][0].transcript); r.onerror = () => say("Je n'ai rien entendu. Réessayez ou écrivez."); r.start(); setVt("🎤 Je vous écoute…");
};
const sendProof = () => wa(S.pay.wa || S.pay.airtel, "Bonjour, j'ai payé mon abonnement SHOPMANAGER. Code appareil : " + dcode + " — Commerce : " + S.biz.name + (S.biz.tel ? " — " + S.biz.tel : ""));
const payOnline = () => { const u = S.pay.payurl; window.open(/^https?:/.test(u) ? u : "https://" + u, "_blank"); };
const [phone, setPhone] = useState("");
const [operator, setOperator] = useState("MOOV");
const [paying, setPaying] = useState(false);
const [adminCode, setAdminCode] = useState("");
const payerAbonnement = async () => {
const tel = phone.replace(/\D/g, "");
if (tel.length < 8) return say("Entrez votre numéro de téléphone.");
if (paying) return;
setPaying(true);
try {
const response = await fetch("/api/pay", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
amount: 5000,
phone: tel,
operator,
merchantReference: "MR_1791484047",
}),
});
const data = await response.json().catch(() => ({}));
if (!response.ok || !data.reference) {
throw new Error(data.message || data.error || "Impossible d'initier le paiement.");
}
const ref = String(data.reference);
say("Paiement initié. Confirmez sur
