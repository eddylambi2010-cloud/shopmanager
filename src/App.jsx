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
  if (!phone.trim()) return say("Entrez votre numéro de téléphone.");
  if (paying) return;

  setPaying(true);

  try {
    const response = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 5000,
        phone: phone.trim(),
        operator,
        merchantReference: "MR_1791484047",
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.reference) {
      throw new Error(data.message || "Impossible d'initier le paiement.");
    }

    say("Paiement initié. Confirmez sur votre téléphone.");

    for (let i = 0; i < 36; i++) {
      await new Promise(resolve => setTimeout(resolve, 5000));

      const check = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: data.reference }),
      });

      const result = await check.json();

      if (result.status === "SUCCESS") {
        up(c => {
          c.until = Date.now() + 30 * DAY;
        });

        setPaying(false);
        home();
        return say("Paiement confirmé ! Accès activé pendant 30 jours.");
      }

      if (["FAILED", "CANCELLED", "REJECTED"].includes(result.status)) {
        throw new Error("Paiement refusé ou annulé.");
      }
    }

    say("Confirmation en attente. Vérifiez votre paiement.");
  } catch (error) {
    say(error.message || "Erreur de paiement.");
  } finally {
    setPaying(false);
  }
};

const blocPaiement = (
  <>
    <div className="cd">
      <h3>Payer 5000 FCFA</h3>

      <div className="two">
        <button
          className={operator === "MOOV" ? "p on" : ""}
          onClick={() => setOperator("MOOV")}
        >
          Moov
        </button>

        <button
          className={operator === "AIRTEL" ? "p on" : ""}
          onClick={() => setOperator("AIRTEL")}
        >
          Airtel
        </button>
      </div>

      <input
        type="tel"
        placeholder="Votre numéro de téléphone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <button
        className="big g"
        disabled={paying}
        onClick={payerAbonnement}
      >
        {paying ? "Vérification en cours..." : "PAYER 5000 FCFA"}
      </button>
    </div>

    <div className="cd">
      <h3>Administration</h3>

      <input
        type="password"
        placeholder="Code administrateur"
        value={adminCode}
        onChange={e => setAdminCode(e.target.value)}
      />

      <button
        className="big"
        onClick={() => {
          if (adminCode !== "0505") {
            return say("Code incorrect.");
          }

          up(c => {
            c.adm = 1;
          });

          setAdminCode("");
          home();
          say("Accès administrateur activé.");
        }}
      >
        DÉBLOQUER
      </button>
    </div>
  </>
);
  const share = () => { const d = { title: "SHOPMANAGER", text: "SHOPMANAGER — Votre commerce, simplement.", url: location.href }; if (location.protocol === "file:") delete d.url; navigator.share ? navigator.share(d).catch(() => {}) : (navigator.clipboard?.writeText(location.href), say("Lien copié ✅")); };

  // ---- Écrans ----
  const V = {
    home: () => ["SHOPMANAGER", <>
      <div className="hi">Bonjour 👋<small>{S.biz.name} — Votre commerce, simplement.</small></div>
      {S.seen < 3 && <div className="cd"><b>Étape {S.seen + 1}/3</b><p style={{ fontSize: 22 }}>{TUT[S.seen]}</p><button className="big" onClick={() => up(c => { c.seen++; })}>{S.seen < 2 ? "Suivant ➡️" : "J'ai compris ✅"}</button></div>}
      {S.until > 0 && !S.adm && S.until - Date.now() < 3 * DAY && <div className="alert">⏰ {S.until > Date.now() ? "Abonnement bientôt expiré" : "Abonnement expiré : délai de grâce"}<button onClick={() => go("sub")}>⭐ Renouveler</button></div>}
      {S.msg && <div className="alert">📣 {S.msg}<button onClick={() => up(c => { c.msg = ""; })}>🔕 Ne plus afficher</button></div>}
      {S.prods.filter(p => p.stock <= p.min && !S.mute[p.id]).map(p => <div className="alert" key={p.id}>⚠️ STOCK FAIBLE<br />Il vous reste {p.stock} {p.name}<button onClick={() => up(c => { c.mute[p.id] = 1; })}>🔕 Ne plus me le rappeler</button></div>)}
      <div className="g4">{[["🛒", "VENDRE", "sell"], ["📦", "PRODUITS", "prod"], ["💰", "ARGENT", "money"], ["👤", "CLIENTS", "cust"]].map(a => <button key={a[2]} onClick={() => go(a[2])}><i>{a[0]}</i>{a[1]}</button>)}</div>
      <button className="big y" onClick={() => go("voice")}>🎤 PARLER À SHOPMANAGER</button>
      <div className="g4 s">
        <button onClick={() => go("stats")}><i>📊</i>RÉSULTATS</button>
        <button onClick={() => go("sub")}><i>⭐</i>ABONNEMENT</button>
        <button onClick={() => form("Mon commerce", [{ k: "name", l: "Nom du commerce", v: S.biz.name }, { k: "tel", l: "Téléphone", t: "tel", v: S.biz.tel }], r => up(c => { c.biz = r; }))}><i>⚙️</i>MON COMMERCE</button>
      </div></>],
    sell: () => {
      const ps = S.prods.filter(p => !sec || p.sec === sec), ks = Object.keys(cart);
      return ["Vendre", <>
        <div className="tabs"><button className={!sec ? "on" : ""} onClick={() => setSec(0)}>Tout</button>{S.secs.map(s => <button key={s.id} className={sec === s.id ? "on" : ""} onClick={() => setSec(s.id)}>{s.icon || ""} {s.name}</button>)}</div>
        <div className="grid">{ps.map(p => <div className="card" key={p.id} onClick={() => add(p.id)}><i>{p.icon}</i><b>{p.name}</b><span>{f(p.price)}</span><small>{p.stock} disponibles</small>{cart[p.id] && <em>{cart[p.id]}</em>}</div>)}</div>
        {!ps.length && <p>Aucun produit. Allez dans 📦 PRODUITS.</p>}
        {ks.length > 0 && <div className="cartp">
          {ks.map(k => { const p = S.prods.find(x => x.id == k); return <div className="l" key={k}><span>{p.icon} {p.name}</span><button onClick={() => chg(k, -1)}>−</button><b>{cart[k]}</b><button onClick={() => chg(k, 1)}>+</button><button onClick={() => { const c = { ...cart }; delete c[k]; setCart(c); }}>✕</button></div>; })}
          <div className="two"><button className={"p " + (mode === "paid" ? "on" : "")} onClick={() => setMode("paid")}>🟢 PAYÉ</button><button className={"c " + (mode === "credit" ? "on" : "")} onClick={() => setMode("credit")}>🔴 À CRÉDIT</button></div>
          {mode === "credit" && <><select value={cu} onChange={e => setCu(+e.target.value)}><option value={0}>👤 Choisir le client…</option>{S.custs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <button className="lnk" onClick={() => form("Nouveau client", [{ k: "name", l: "Nom" }, { k: "tel", l: "Téléphone", t: "tel" }], r => { if (r.name) { const id = nid(S.custs); up(c => { c.custs.push({ id, name: r.name, tel: r.tel, debt: 0 }); }); setCu(id); } })}>➕ Nouveau client</button></>}
          <div className="num" style={{ textAlign: "center" }}>{f(sum(ks, k => cart[k] * S.prods.find(p => p.id == k).price))}</div>
          <button className="big g" onClick={sell}>💵 ENCAISSER</button></div>}</>];
    },
    done: () => !last ? ["Vente", <p>Aucune vente</p>] : ["Vente", <>
      <div className="cd"><div style={{ fontSize: 70 }}>✅</div><h2 className="gr">VENTE RÉUSSIE</h2><div className="num">{f(last.total)}</div>{!last.paid && <p className="rd">Noté sur la dette du client</p>}</div>
      <button className="big y" onClick={() => say(<pre>{recTxt(last, S.biz)}</pre>)}>🧾 Reçu</button>
      <button className="big g" onClick={() => wa((S.custs.find(c => c.id === last.cu) || {}).tel, recTxt(last, S.biz))}>📲 Envoyer sur WhatsApp</button>
      <button className="big" onClick={() => setSt(a => [...a.slice(0, -1), ["sell", {}]])}>🛒 Nouvelle vente</button>
      <button className="big" onClick={() => setSt(a => [...a.slice(0, -1), ["cust", {}]])}>👤 Nouveau client</button></>],
    prod: () => {
      const ps = S.prods.filter(p => nm(p.name).includes(nm(q)));
      return ["Produits", <>
        <input placeholder="🔍 Rechercher" value={q} onChange={e => setQ(e.target.value)} />
        <button className="big g" onClick={() => eS()}>📁 NOUVELLE SECTION</button>
        {S.secs.map(s => <div className="cd" style={{ textAlign: "left", padding: 12 }} key={s.id}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><b style={{ flex: 1, fontSize: 20 }}>{s.icon || "📁"} {s.name}</b><button className="lnk" style={{ width: "auto" }} onClick={() => eS(s.id)}>✏️ Modifier</button></div>
          {ps.filter(p => p.sec === s.id).map(p => <div className="row" key={p.id} onClick={() => eP(p.id)}><i>{p.icon}</i><div><b>{p.name}</b><small>{f(p.price)} · {p.stock} en stock {p.stock <= p.min ? "⚠️" : ""}</small></div>›</div>)}
          {!ps.some(p => p.sec === s.id) && <small>Section vide</small>}
          <button className="big" onClick={() => eP(0, s.id)}>➕ Ajouter un produit ici</button></div>)}
        {!S.secs.length && <p>Créez votre première section 👆</p>}</>];
    },
    cust: () => ["Clients", <>
      <button className="big g" onClick={() => eC()}>➕ NOUVEAU CLIENT</button>
      <div className="cd">Total qu'on vous doit<div className="num rd">{f(sum(S.custs, c => c.debt))}</div></div>
      {S.custs.map(c => <div className="row" key={c.id} onClick={() => go("fiche", { id: c.id })}><i>👤</i><div><b>{c.name}</b><small>📞 {c.tel || "—"}</small></div><b className={c.debt ? "rd" : "gr"}>{f(c.debt)}</b></div>)}</>],
    fiche: () => {
      const c = S.custs.find(x => x.id === P.id); if (!c) return ["Clients", <p>Client introuvable</p>];
      return [c.name, <>
        <div className="cd">📞 {c.tel || "—"}<p>Vous doit :</p><div className={"num " + (c.debt ? "rd" : "gr")}>{f(c.debt)}</div></div>
        {c.debt > 0 && <>
          <button className="big g" onClick={() => form("Il a payé", [{ k: "a", l: "Montant (FCFA)", t: "number", v: c.debt }], r => { const a = Math.min(r.a, c.debt); if (a > 0) up(x => { x.custs.find(y => y.id === c.id).debt -= a; x.cash.push({ d: Date.now(), type: "in", label: "Paiement client", amt: a }); }); })}>💰 IL A PAYÉ</button>
          <button className="big y" onClick={() => wa(c.tel, `Bonjour ${c.name}, rappel : vous devez ${f(c.debt)} à ${S.biz.name}. Merci !`)}>📲 Rappel WhatsApp</button></>}
        <button className="big" onClick={() => eC(c.id)}>✏️ Modifier</button>
        <h3>🧾 Historique</h3>
        {S.sales.filter(s => s.cu === c.id).slice().reverse().map(s => <div className="row" key={s.id}><div>{new Date(s.d).toLocaleDateString("fr-FR")}<small>{s.items.map(i => i.q + " " + i.name).join(", ")}</small></div><b>{f(s.total)}</b></div>)}</>];
    },
    money: () => {
      const i = sum(S.cash.filter(x => x.type === "in"), x => x.amt), o = sum(S.cash.filter(x => x.type === "out"), x => x.amt);
      const d0 = mp === 0 ? 0 : mp === 1 ? today() : today() - (mp - 1) * DAY, ag = {};
      since(d0).forEach(sl => sl.items.forEach(it => { const a = ag[it.name] || (ag[it.name] = { q: 0, t: 0, id: it.id }); a.q += it.q; a.t += it.q * it.price; }));
      const rows = Object.entries(ag).sort((a, b) => b[1].t - a[1].t);
      return ["Argent", <>
        <div className="cd">💰 Argent disponible<div className="num">{f(i - o)}</div></div>
        <div className="two"><div className="cd">🟢 Entré<br /><b className="gr">{f(i)}</b></div><div className="cd">🔴 Sorti<br /><b className="rd">{f(o)}</b></div></div>
        <h3>🧾 Ce que j'ai vendu</h3>
        <div className="tabs">{[[1, "Aujourd'hui"], [7, "7 jours"], [30, "30 jours"], [0, "Tout"]].map(a => <button key={a[0]} className={mp === a[0] ? "on" : ""} onClick={() => setMp(a[0])}>{a[1]}</button>)}</div>
        {rows.map(([n, a]) => { const p = S.prods.find(x => x.id === a.id); return <div className="row" key={n}><i>{p ? p.icon : "🛒"}</i><div><b>{n}</b><small>{a.q} vendu(s)</small></div><b className="gr">{f(a.t)}</b></div>; })}
        {!rows.length && <p>Aucune vente sur cette période.</p>}
        <div className="cd">Total des ventes<div className="num gr">{f(sum(rows, r => r[1].t))}</div></div>
        <button className="big g" onClick={() => ent("in", "Autre recette")}>🟢 Autre recette</button>
        <div className="two">{["🛍️ Achat", "🚚 Transport", "👷 Salaire", "🏠 Loyer"].map(l => <button key={l} style={{ background: "var(--r)", color: "#fff", minHeight: 60, border: 0, borderRadius: 14, fontWeight: 700, fontSize: 17 }} onClick={() => ent("out", l)}>{l}</button>)}</div>
        <button className="big r" onClick={() => ent("out", "Autre dépense")}>🔴 Autre dépense</button>
        {S.cash.slice(-20).reverse().map((x, k) => <div className="row" key={k}><div>{x.label}<small>{new Date(x.d).toLocaleDateString("fr-FR")}</small></div><b className={x.type === "in" ? "gr" : "rd"}>{x.type === "in" ? "+" : "−"}{f(x.amt)}</b></div>)}</>];
    },
    stats: () => {
      const d = per === 1 ? today() : today() - (per - 1) * DAY, ss = since(d), v = sum(ss, s => s.total), m = sum(ss, s => s.total - s.cost);
      const dep = sum(S.cash.filter(x => x.type === "out" && x.d >= d), x => x.amt);
      const days = [...Array(7)].map((_, k) => { const a = today() - (6 - k) * DAY; return { l: new Date(a).toLocaleDateString("fr-FR", { weekday: "short" }), v: sum(S.sales.filter(s => s.d >= a && s.d < a + DAY), s => s.total) }; });
      const mx = Math.max(1, ...days.map(x => x.v));
      return ["Mes résultats", <>
        <div className="tabs">{[[1, "Aujourd'hui"], [7, "7 jours"], [30, "30 jours"]].map(a => <button key={a[0]} className={per === a[0] ? "on" : ""} onClick={() => setPer(a[0])}>{a[1]}</button>)}</div>
        <div className="cd">💰 J'ai vendu<div className="num">{f(v)}</div></div>
        <div className="cd">📈 J'ai gagné environ<div className="num gr">{f(m - dep)}</div></div>
        <div className="two"><div className="cd">📦 Produits vendus<br /><b className="num">{sum(ss, s => sum(s.items, i => i.q))}</b></div><div className="cd">👥 Clients<br /><b className="num">{S.custs.length}</b></div></div>
        <details><summary className="lnk">Détails avancés</summary>
          <div className="row"><div>Coût des marchandises</div><b>{f(sum(ss, s => s.cost))}</b></div><div className="row"><div>Marge</div><b>{f(m)}</b></div>
          <div className="row"><div>Dépenses</div><b>{f(dep)}</b></div><div className="row"><div>Créances</div><b className="rd">{f(sum(S.custs, c => c.debt))}</b></div></details>
        <div className="cd"><div className="bars">{days.map((x, k) => <div key={k} style={{ height: x.v / mx * 100 + "%" }} />)}</div><div className="bars">{days.map((x, k) => <div key={k}>{x.l}</div>)}</div></div></>];
    },
    voice: () => ["Parler", <>
      <button className="big y" style={{ minHeight: 120, fontSize: 26 }} onClick={listen}>🎤 APPUYEZ ET PARLEZ</button>
      <div className="cd" style={{ fontSize: 22 }}>{vt || "Dites : « J'ai vendu deux riz »"}</div>
      {pend && <div className="two"><button className="p on" onClick={() => { pend(); setPend(null); setVt("✅ Fait !"); spk("Fait"); }}>🟢 OUI</button><button className="c on" onClick={() => { setPend(null); setVt("Annulé"); }}>🔴 NON</button></div>}
      <input placeholder="✍️ ou écrivez ici" onKeyDown={e => { if (e.key === "Enter") { run(e.target.value); e.target.value = ""; } }} />
      <small>« Combien ai-je vendu aujourd'hui ? » · « Qui me doit de l'argent ? » · « Combien de riz me reste-t-il ? » · « Ajoute 20 savons » · « Dépense de 10000 francs »</small></>],
    sub: () => {
      const left = Math.max(0, S.settings.demo - S.sales.length), on = S.until > Date.now(), p = S.pay;
      return ["Abonnement", <>
        <div className="cd"><h2>⭐ PRO</h2><div className="num">{f(S.settings.price)}</div>pour {S.settings.days} jours</div>
        <div className="cd">{S.adm ? "✅ Administrateur : accès libre" : on ? "✅ Actif jusqu'au " + new Date(S.until).toLocaleDateString("fr-FR") : <>🔒 Paiement nécessaire pour utiliser l'application{left > 0 && <><br /><small>Essai : encore {left} vente(s)</small></>}</>}</div>
        <div className="cd">📱 Payer par Mobile Money{p.moov && <><br /><b>Moov Money : {p.moov}</b></>}{p.airtel && <><br /><b>Airtel Money : {p.airtel}</b></>}{p.intl1 && <><br /><b>International : {p.intl1}</b></>}{p.intl2 && <><br /><b>International : {p.intl2}</b></>}</div>
        <div className="cd">Votre code appareil<br /><b className="num" style={{ fontSize: 26 }}>{dcode}</b><small>Envoyez-le avec la preuve de paiement</small></div>
        <button className="big g" onClick={sendProof}>📲 J'AI PAYÉ — ENVOYER LA PREUVE</button>
        {p.payurl && <button className="big" onClick={payOnline}>💳 PAYER EN LIGNE</button>}
        <button className="big y" onClick={() => form("Code activation", [{ k: "c", l: "Code reçu" }], r => activate(r.c))}>🔑 J'AI MON CODE D'ACTIVATION</button></>];
    },
    admin: () => {
      const on = S.until > Date.now();
      return ["🛡️ Administration", <>
        <div className="two"><div className="cd">Ventes<br /><b className="num">{S.sales.length}</b></div><div className="cd">Chiffre<br /><b>{f(sum(S.sales, s => s.total))}</b></div><div className="cd">Produits<br /><b className="num">{S.prods.length}</b></div><div className="cd">Clients<br /><b className="num">{S.custs.length}</b></div></div>
        <div className="cd">⭐ Pro : {on ? "actif jusqu'au " + new Date(S.until).toLocaleDateString("fr-FR") : "non actif"}<br /><small>{f(S.settings.price)} / {S.settings.days} jours · grâce {S.settings.grace} j · {S.settings.demo} ventes gratuites</small></div>
        <div className="g4 s">
          <button onClick={aTarif}><i>💲</i>TARIFS ET DÉLAIS</button><button onClick={aPay}><i>📱</i>PAIEMENTS</button>
          <button onClick={aCode}><i>🎟️</i>CODE D'ACTIVATION</button><button onClick={() => form("Message administrateur", [{ k: "m", l: "Message (vide = aucun)", v: S.msg }], r => up(c => { c.msg = r.m; }))}><i>📣</i>MESSAGE</button>
          <button onClick={chPw}><i>🔑</i>CHANGER MON CODE</button><button onClick={bk}><i>💾</i>SAUVEGARDE</button>
          <button onClick={aRes}><i>♻️</i>RESTAURER</button><button onClick={() => { if (confirm("Effacer TOUTES les données ?") && confirm("Vraiment tout effacer ?")) { try { localStorage.removeItem("sm"); } catch {} location.reload(); } }}><i>🗑️</i>TOUT EFFACER</button></div>
        <button className="big" style={{ background: "#334155" }} onClick={() => { up(c => { c.adm = 0; }); home(); }}>🔒 VERROUILLER</button></>];
    },
  };
  const [title, body] = (V[cur] || V.home)();

  return (
    <>
      <style>{CSS}</style>
      <header>
        <button style={{ visibility: st.length > 1 ? "visible" : "hidden" }} onClick={back} aria-label="Retour">←</button>
        <b onClick={tapTitle} style={{ userSelect: "none", padding: "12px 0" }}>{title}</b>
        <button onClick={share} aria-label="Partager">⇪</button>
      </header>
      <main>{body}</main>
      {fm && <FormModal key={fm.id} fm={fm} close={() => setFm(null)} />}
      {msg && <div className="ov" onClick={() => setMsg(null)}><div className="md"><h3>{msg}</h3><button className="big">OK</button></div></div>}
    </>
  );
}
