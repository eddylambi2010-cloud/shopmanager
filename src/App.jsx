// SHOPMANAGER — Votre commerce, simplement. (version React / JSX)
// Utilisation : export par défaut <App /> ; aucune autre dépendance que React.
// Partage propriétaire / vendeurs : optionnel (bouton « Partage » sur l'accueil). Sans partage, l'application fonctionne comme avant.
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
pre{white-space:pre-wrap;background:var(--bg);padding:12px;border-radius:12px;font:16px monospace}
.net{font-size:15px;text-align:center;opacity:.85;margin:4px 0}.sm{font-size:15px;opacity:.75}`;
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
  sales: [], cash: [], until: 0, seen: 0, mute: {}, adm: 0, h: "", sk: "", dev: rid(), n: 0, msg: "", payref: "",
  pay: { moov: "065575201", airtel: "077044782", intl1: "", intl2: "", payurl: "", apiurl: "", apikey: "", wa: "" },
};
const TUT = ["🛒 Pour vendre, appuyez ici.", "📦 Pour voir vos produits, appuyez ici.", "💰 Pour voir votre argent, appuyez ici."];

// ---- Partage en ligne (Supabase) : propriétaire + vendeurs ----
const SBU = "https://gucmuncvxomywlivukon.supabase.co", SBK = "sb_publishable_h9nqIwAXf1uv3SUd1bgv8Q_xwNK1XAW";
const SHARED = ["biz", "settings", "secs", "prods", "custs", "sales", "cash", "until"];
const pick = s => Object.fromEntries(SHARED.map(k => [k, s[k]]));
const mail = tel => String(tel).replace(/\D/g, "") + "@shopmanager.app";
const frm = m => /invalid login/i.test(m) ? "Numéro ou mot de passe incorrect" : /at least|weak/i.test(m) ? "Mot de passe trop court (6 caractères minimum)" : m;
const loadC = () => { try { return JSON.parse(localStorage.getItem("smc")) || null; } catch { return null; } };
const saveC = c => { try { c ? localStorage.setItem("smc", JSON.stringify(c)) : localStorage.removeItem("smc"); } catch {} };
async function sb(path, { method = "GET", body, tok, prefer } = {}) {
  const h = { apikey: SBK, "Content-Type": "application/json" };
  if (tok) h.Authorization = "Bearer " + tok;
  if (prefer) h.Prefer = prefer;
  let r;
  try { r = await fetch(SBU + path, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body) }); }
  catch { throw new Error("Pas de connexion Internet"); }
  const t = await r.text();
  let j = null;
  try { j = t ? JSON.parse(t) : null; } catch {}
  if (!r.ok) throw new Error(frm((j && (j.message || j.msg || j.error_description || j.error)) || "Erreur " + r.status));
  return j;
}
async function sbAuth(kind, tel, pw) {
  const email = mail(tel);
  const j = kind === "signup"
    ? await sb("/auth/v1/signup", { method: "POST", body: { email, password: pw } })
    : await sb("/auth/v1/token?grant_type=password", { method: "POST", body: { email, password: pw } });
  if (!j || !j.access_token) throw new Error("Compte créé mais non confirmé : désactivez « Confirm email » dans Supabase.");
  return j;
}
const authBoth = async (tel, pw) => {
  try { return await sbAuth("signup", tel, pw); }
  catch (e) { if (/already|registered/i.test(e.message)) return sbAuth("login", tel, pw); throw e; }
};

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
  const Sref = useRef(S); Sref.current = S;
  useEffect(() => { try { localStorage.setItem("sm", JSON.stringify(S)); } catch {} }, [S]);

  // ---- Partage : état ----
  const cref = useRef(undefined);
  if (cref.current === undefined) cref.current = loadC();
  const [cl, setCl] = useState(() => { const c = cref.current; return c ? { role: c.role, name: c.name, shop: c.shop, uid: c.uid } : null; });
  const [net, setNet] = useState(true), [wait, setWait] = useState(false), [members, setMembers] = useState([]);
  const lock = useRef(0), polling = useRef(""), clr = useRef(null);
  clr.current = cl;
  const own = !cl || cl.role === "owner";

  const leave = text => {
    const was = cref.current; cref.current = null; saveC(null); setCl(null); setMembers([]);
    if (was && was.role === "manager") setS({ ...DEF, dev: rid() });
    if (text) say(text);
  };
  const tokOk = async () => {
    const c = cref.current; if (!c) throw new Error("Non connecté");
    if (Date.now() > c.exp - 60000) {
      try {
        const j = await sb("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: { refresh_token: c.ref } });
        c.tok = j.access_token; c.ref = j.refresh_token || c.ref; c.exp = Date.now() + (j.expires_in || 3600) * 1000; saveC(c);
      } catch (e) { if (!/connexion/i.test(e.message)) e.fatal = true; throw e; }
    }
    return c.tok;
  };
  const rpc = async (fn, body) => sb("/rest/v1/rpc/" + fn, { method: "POST", tok: await tokOk(), body });
  const pull = async () => {
    const c = cref.current; if (!c || lock.current > 0) return;
    try {
      const tok = await tokOk();
      const rows = await sb("/rest/v1/shops?id=eq." + c.shop + "&select=data,version", { tok });
      if (!rows || !rows[0]) return leave("Votre accès à ce commerce a été retiré.");
      c.ver = rows[0].version;
      setS(s => ({ ...s, ...rows[0].data }));
      setNet(true);
    } catch (e) { if (e.fatal) leave("Session expirée. Reconnectez-vous via Partage."); else setNet(false); }
  };
  const pushUp = async fn => {
    lock.current++;
    try {
      for (let i = 0; i < 4; i++) {
        const tok = await tokOk(), c = cref.current;
        const rows = await sb("/rest/v1/shops?id=eq." + c.shop + "&select=data,version", { tok });
        const row = rows && rows[0]; if (!row) throw new Error("Accès refusé");
        const full = { ...structuredClone(Sref.current), ...structuredClone(row.data) };
        fn(full);
        const res = await sb("/rest/v1/shops?id=eq." + c.shop + "&version=eq." + row.version, { method: "PATCH", tok, prefer: "return=representation", body: { data: pick(full), version: row.version + 1 } });
        if (res && res.length) { c.ver = res[0].version; setS(s => ({ ...s, ...full })); setNet(true); return; }
      }
      throw new Error("Conflit : réessayez");
    } finally { lock.current--; }
  };
  const up = fn => {
    const cur = Sref.current, nx = structuredClone(cur); fn(nx);
    const changed = JSON.stringify(pick(nx)) !== JSON.stringify(pick(cur));
    const cc0 = clr.current;
    if (changed && cc0 && cc0.role === "manager") return say("Réservé au propriétaire");
    Sref.current = nx; setS(nx);
    if (changed && cc0) pushUp(fn).catch(e => { say("Non enregistré en ligne : " + e.message); pull(); });
  };
  const connect = async j => {
    const m = await sb("/rest/v1/members?user_id=eq." + j.user.id + "&active=eq.true&select=shop_id,role,name&limit=1", { tok: j.access_token });
    if (!m || !m[0]) throw new Error("Aucun commerce lié à ce compte");
    const c = { tok: j.access_token, ref: j.refresh_token, exp: Date.now() + (j.expires_in || 3600) * 1000, uid: j.user.id, shop: m[0].shop_id, role: m[0].role, name: m[0].name || "" };
    cref.current = c; saveC(c); setCl({ role: c.role, name: c.name, shop: c.shop, uid: c.uid });
    await pull();
  };
  useEffect(() => {
    if (!cl) return;
    const t = () => pull();
    t();
    const iv = setInterval(t, 12000);
    const vis = () => { if (!document.hidden) t(); };
    document.addEventListener("visibilitychange", vis);
    return () => { clearInterval(iv); document.removeEventListener("visibilitychange", vis); };
  }, [cl && cl.shop]);

  const [st, setSt] = useState([["home", {}]]);
  const [fm, setFm] = useState(null), [msg, setMsg] = useState(null);
  const [cart, setCart] = useState({}), [mode, setMode] = useState("paid"), [cu, setCu] = useState(0), [sec, setSec] = useState(0);
  const [q, setQ] = useState(""), [per, setPer] = useState(1), [mp, setMp] = useState(1), [last, setLast] = useState(null);
  const [vt, setVt] = useState(""), [pend, setPend] = useState(null), [vin, setVin] = useState(""), [acode, setAcode] = useState("");
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
  useEffect(() => { if (locked && !["sub", "done", "share"].includes(cur)) setSt([["sub", {}]]); }, [locked, cur]);
  useEffect(() => { if (cur === "share" && cl && cl.role === "owner") loadMembers(); }, [cur, cl && cl.shop]);
  const since = d => S.sales.filter(s => s.d >= d);
  const sum = (a, fn) => a.reduce((s, x) => s + fn(x), 0);
  // ---- Administration ----
  const unlock = () => {
    if (cl && cl.role === "manager") return say("Non disponible pour un vendeur");
    form("Code administrateur", [{ k: "p", l: "Code secret", t: "password" }], async r => {
      if ((await hs(r.p)) !== (S.h || ADM)) return say("Code incorrect");
      if (await skOk(S.sk)) { up(c => { c.adm = 1; }); return go("admin"); }
      form("Première fois sur ce téléphone", [{ k: "k", l: "Clé d'origine (une seule fois)", t: "password" }], async z => {
        const sk = await getSk(z.k);
        if (sk && (await skOk(sk))) { up(c => { c.sk = sk; c.adm = 1; }); go("admin"); } else say("Clé incorrecte");
      });
    });
  };
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
  const bk = () => {
    const { sk, adm, ...safe } = S; // la clé administrateur ne part jamais dans une sauvegarde
    const t = JSON.stringify(safe);
    navigator.share ? navigator.share({ title: "Sauvegarde SHOPMANAGER", text: t }).catch(() => {}) : (navigator.clipboard?.writeText(t), say("Sauvegarde copiée ✅"));
  };
  const aRes = () => form("Restaurer", [{ k: "j", l: "Collez la sauvegarde ici" }], r => {
    try { const o = JSON.parse(r.j); if (o && o.prods) setS({ ...DEF, ...o, pay: { ...DEF.pay, ...o.pay }, adm: 0, sk: S.sk }); else say("Sauvegarde invalide"); } catch { say("Sauvegarde invalide"); }
  });
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
      id ? () => { if (S.prods.some(p => p.sec === id)) say("Déplacez ou supprimez d'abord les produits de cette section"); else { up(c => { c.secs = c.secs.filter(x => x.id !== id); }); setSec(0); } } : undefined);
  };
  const eC = id => {
    const c0 = S.custs.find(x => x.id === id) || {};
    form(id ? "Modifier" : "Nouveau client", [{ k: "name", l: "Nom", v: c0.name }, { k: "tel", l: "Téléphone", t: "tel", v: c0.tel }],
      r => { if (!r.name) return; up(c => { if (id) Object.assign(c.custs.find(x => x.id === id), r); else c.custs.push({ id: nid(c.custs), debt: 0, ...r }); }); },
      id ? () => { up(c => { c.custs = c.custs.filter(x => x.id !== id); }); back(); } : undefined);
  };
  const eBiz = () => form("Mon commerce", [{ k: "name", l: "Nom du commerce", v: S.biz.name }, { k: "tel", l: "Téléphone (sur les reçus)", t: "tel", v: S.biz.tel }], r => { if (r.name) up(c => { c.biz = r; }); });
  const ent = (type, label) => form(label, [{ k: "a", l: "Montant (FCFA)", t: "number" }], r => { if (r.a > 0) up(c => { c.cash.push({ d: Date.now(), type, label, amt: r.a }); }); });
  // ---- Vente ----
  const add = id => { const p = S.prods.find(x => x.id === id); if ((cart[id] || 0) < p.stock) setCart({ ...cart, [id]: (cart[id] || 0) + 1 }); else say("Stock épuisé"); };
  const chg = (k, d) => { const c = { ...cart }; c[k] += d; if (c[k] <= 0) delete c[k]; else if (c[k] > S.prods.find(x => x.id == k).stock) return say("Stock épuisé"); setCart(c); };
  const sell = async () => {
    const ks = Object.keys(cart); if (!ks.length || wait) return;
    if (!act && S.sales.length >= S.settings.demo) return go("sub");
    if (mode === "credit" && !cu) return say("Choisissez le client 👤");
    if (cl) {
      let sale;
      setWait(true); lock.current++;
      try { sale = await rpc("record_sale", { p_shop: cref.current.shop, p_sale: { items: ks.map(k => ({ id: +k, q: cart[k] })), paid: mode === "paid", cu: mode === "credit" ? cu : 0 } }); }
      catch (e) { return say(e.message); }
      finally { lock.current--; setWait(false); }
      await pull();
      setLast(sale); setCart({}); setCu(0); setMode("paid"); setSt(a => [...a.slice(0, -1), ["done", {}]]);
      return;
    }
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
  const voiceSale = async (pr, n) => {
    if (!cl) {
      up(c => {
        c.sales.push({ id: nid(c.sales), d: Date.now(), items: [{ id: pr.id, name: pr.name, q: n, price: pr.price, cost: pr.cost }], total: n * pr.price, cost: n * pr.cost, paid: true, cu: 0 });
        c.prods.find(p => p.id === pr.id).stock -= n;
        c.cash.push({ d: Date.now(), type: "in", label: "Vente : " + n + " " + pr.name, amt: n * pr.price });
      });
      return;
    }
    setWait(true); lock.current++;
    try { await rpc("record_sale", { p_shop: cref.current.shop, p_sale: { items: [{ id: pr.id, q: n }], paid: true, cu: 0 } }); }
    catch (e) { return say(e.message); }
    finally { lock.current--; setWait(false); }
    await pull(); setVt("Vente enregistrée ✅");
  };
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
      return ask(`Confirmer la vente de ${f(n * pr.price)} ?`, () => voiceSale(pr, n));
    }
    rep("Je n'ai pas compris. Essayez : « J'ai vendu deux riz ».");
  };
  const listen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return say("Micro non disponible ici. Écrivez votre phrase en bas ✍️");
    const r = new SR(); r.lang = "fr-FR"; r.onresult = e => run(e.results[0][0].transcript); r.onerror = () => say("Je n'ai rien entendu. Réessayez ou écrivez."); r.start(); setVt("🎤 Je vous écoute…");
  };
  // ---- Abonnement et paiement ----
  const sendProof = () => wa(S.pay.wa || S.pay.airtel, "Bonjour, j'ai payé mon abonnement SHOPMANAGER. Code appareil : " + dcode + " — Commerce : " + S.biz.name + (S.biz.tel ? " — " + S.biz.tel : ""));
  const payOnline = () => { const u = S.pay.payurl; window.open(/^https?:/.test(u) ? u : "https://" + u, "_blank"); };
  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState("MOOV");
  const [paying, setPaying] = useState(false);
  const pollPay = async ref => {
    if (polling.current === ref) return;
    polling.current = ref;
    try {
      for (let i = 0; i < 60; i++) {
        await new Promise(r => setTimeout(r, 4000));
        let d = null;
        try { d = await (await fetch("/api/check?reference=" + encodeURIComponent(ref))).json(); } catch { continue; }
        if (d && d.final) {
          up(c => { c.payref = ""; if (d.success) c.until = Math.max(Date.now(), c.until) + c.settings.days * DAY; });
          if (d.success) { home(); say("Paiement confirmé ✅ Abonnement activé !"); }
          else say("Le paiement a échoué ou a été refusé. Réessayez. Si vous avez été débité, contactez-nous.");
          return;
        }
      }
      say("Paiement pas encore confirmé. Si vous avez été débité, rouvrez l'application dans quelques minutes : elle vérifiera toute seule.");
    } finally { polling.current = ""; }
  };
  useEffect(() => {
    const [ref, t] = (Sref.current.payref || "").split("|");
    if (ref && Date.now() - +t < 18e5) { setPaying(true); pollPay(ref).finally(() => setPaying(false)); }
  }, []);
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
          amount: S.settings.price,
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
      up(c => { c.payref = ref + "|" + Date.now(); });
      say("Paiement initié. Confirmez sur votre téléphone avec votre code secret. L'abonnement s'active tout seul.");
      await pollPay(ref);
    } catch (e) {
      say(e.message || "Erreur de paiement.");
    } finally {
      setPaying(false);
    }
  };
  // ---- Partage : actions ----
  const enableShare = () => form("Mon compte propriétaire", [
    { k: "tel", l: "Votre téléphone", t: "tel" }, { k: "pw", l: "Mot de passe (6 caractères minimum)", t: "password" }], async r => {
    const tel = r.tel.replace(/\D/g, "");
    if (tel.length < 8) return say("Numéro invalide");
    if (r.pw.length < 6) return say("Mot de passe trop court (6 caractères minimum)");
    setWait(true);
    try {
      const j = await authBoth(tel, r.pw);
      const has = await sb("/rest/v1/members?user_id=eq." + j.user.id + "&active=eq.true&select=shop_id&limit=1", { tok: j.access_token });
      if (!has || !has[0]) await sb("/rest/v1/rpc/create_shop", { method: "POST", tok: j.access_token, body: { p_data: pick(Sref.current), p_name: Sref.current.biz.name } });
      await connect(j);
      say("Partage activé ✅ Vous pouvez maintenant inviter un vendeur.");
    } catch (e) { say(e.message); } finally { setWait(false); }
  });
  const loginShare = () => form("Me connecter", [
    { k: "tel", l: "Votre téléphone", t: "tel" }, { k: "pw", l: "Mot de passe", t: "password" }], async r => {
    setWait(true);
    try { await connect(await sbAuth("login", r.tel.replace(/\D/g, ""), r.pw)); say("Connecté ✅"); }
    catch (e) { say(e.message); } finally { setWait(false); }
  });
  const joinShare = () => form("Rejoindre un commerce", [
    { k: "code", l: "Code reçu du propriétaire" }, { k: "name", l: "Votre nom" },
    { k: "tel", l: "Votre téléphone", t: "tel" }, { k: "pw", l: "Choisissez un mot de passe (6 caractères minimum)", t: "password" }], async r => {
    const tel = r.tel.replace(/\D/g, "");
    if (!r.code || !r.name || tel.length < 8) return say("Remplissez tous les champs");
    if (r.pw.length < 6) return say("Mot de passe trop court (6 caractères minimum)");
    if (!confirm("Ce téléphone sera relié au commerce du propriétaire. Les données de ce téléphone seront remplacées. Continuer ?")) return;
    setWait(true);
    try {
      const j = await authBoth(tel, r.pw);
      await sb("/rest/v1/rpc/join_shop", { method: "POST", tok: j.access_token, body: { p_code: r.code, p_name: r.name } });
      await connect(j);
      home(); say("Vous êtes connecté ✅");
    } catch (e) { say(e.message); } finally { setWait(false); }
  });
  const inviteVendor = async () => {
    try {
      const code = await rpc("create_invite", { p_shop: cref.current.shop });
      const txt = `Bonjour, rejoignez ${S.biz.name} sur SHOPMANAGER : ouvrez ${location.origin}, touchez « Partage », puis « Rejoindre un commerce ». Code : ${code} (valable 24 h)`;
      say(<>Code vendeur (valable 24 h, une seule utilisation) :<pre>{code}</pre><button className="big g" onClick={() => wa("", txt)}>📲 Envoyer par WhatsApp</button></>);
    } catch (e) { say(e.message); }
  };
  const loadMembers = async () => {
    try { setMembers((await sb("/rest/v1/members?shop_id=eq." + cref.current.shop + "&select=user_id,role,name,active&order=created_at", { tok: await tokOk() })) || []); } catch {}
  };
  const removeVendor = async m => {
    if (!confirm("Retirer " + (m.name || "ce vendeur") + " ? Son accès sera coupé tout de suite.")) return;
    try { await rpc("remove_member", { p_shop: cref.current.shop, p_user: m.user_id }); loadMembers(); } catch (e) { say(e.message); }
  };

  // ---- Affichage ----
  const low = S.prods.filter(p => p.stock <= p.min && !S.mute[p.id]).slice(0, 2);
  const list = S.prods.filter(p => (!sec || p.sec === sec) && (!q || nm(p.name).includes(nm(q))));
  const tdy = since(today());
  const cartKeys = Object.keys(cart).filter(k => S.prods.some(p => p.id == k));
  const cartTotal = sum(cartKeys, k => cart[k] * S.prods.find(x => x.id == k).price);
  const cc = cur === "cust" ? S.custs.find(x => x.id === P.id) : null;
  const cin = sum(S.cash.filter(x => x.type === "in"), x => x.amt), cout = sum(S.cash.filter(x => x.type === "out"), x => x.amt);
  const dt = d => new Date(d).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  const secTabs = (
    <div className="tabs">
      <button className={!sec ? "on" : ""} onClick={() => setSec(0)}>Tout</button>
      {S.secs.map(s => <button key={s.id} className={sec === s.id ? "on" : ""} onClick={() => setSec(s.id)}>{s.icon} {s.name}</button>)}
    </div>
  );
  const repView = () => {
    const rs = since(today() - (per - 1) * DAY);
    const tot = sum(rs, s => s.total), gain = sum(rs, s => s.total - s.cost);
    const days = Array.from({ length: 7 }, (_, i) => today() - (6 - i) * DAY);
    const vals = days.map(d => sum(S.sales.filter(s => s.d >= d && s.d < d + DAY), s => s.total));
    const mx = Math.max(1, ...vals);
    const top = {}; rs.forEach(s => s.items.forEach(i => { top[i.name] = (top[i.name] || 0) + i.q; }));
    const tops = Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const by = {}; rs.forEach(s => { if (s.by) by[s.by] = (by[s.by] || 0) + s.total; });
    return (
      <>
        <div className="tabs">{[[1, "Aujourd'hui"], [7, "7 jours"], [30, "30 jours"]].map(([v, l]) => <button key={v} className={per === v ? "on" : ""} onClick={() => setPer(v)}>{l}</button>)}</div>
        <div className="cd">Ventes<div className="num">{f(tot)}</div>Bénéfice<div className="num gr">{f(gain)}</div><span className="sm">{rs.length} vente(s)</span></div>
        <div className="cd">
          <div className="bars">{vals.map((v, i) => <div key={i} style={{ height: Math.max(3, v / mx * 120) }} />)}</div>
          <div className="bars">{days.map((d, i) => <div key={i}>{new Date(d).toLocaleDateString("fr-FR", { weekday: "short" }).slice(0, 3)}</div>)}</div>
        </div>
        {tops.length > 0 && <div className="cd"><b>🏆 Les plus vendus</b>{tops.map(([n, v]) => <div key={n}>{n} : {v}</div>)}</div>}
        {Object.keys(by).length > 0 && <div className="cd"><b>👤 Par vendeur</b>{Object.entries(by).map(([n, v]) => <div key={n}>{n} : {f(v)}</div>)}</div>}
        <div className="cd">Les clients vous doivent<div className="num rd">{f(sum(S.custs, c => c.debt))}</div></div>
      </>
    );
  };
  const subStatus = S.adm ? "Mode administrateur" : Date.now() < S.until ? "Actif jusqu'au " + new Date(S.until).toLocaleDateString("fr-FR")
    : act ? "Délai de grâce en cours" : S.sales.length < S.settings.demo ? "Essai gratuit : " + (S.settings.demo - S.sales.length) + " vente(s) restante(s)" : "Abonnement expiré";

  return (
    <>
      <style>{CSS}</style>
      <header>
        {st.length > 1 ? <button onClick={back}>⬅️</button> : <span style={{ width: 52 }} />}
        <b onClick={tapTitle}>SHOPMANAGER</b>
        <button onClick={() => go("voice")}>🎤</button>
      </header>
      <main>
        {cur === "home" && <>
          <div className="hi">Bonjour 👋<small>{S.biz.name} • {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</small></div>
          {cl && <div className="net">{net ? "🟢 Synchronisé" : "🔴 Pas de connexion : les ventes sont impossibles"}{cl.role === "manager" ? " • Vendeur" : " • Propriétaire"}</div>}
          {S.seen < TUT.length && <div className="cd">{TUT[S.seen]}<button className="lnk" onClick={() => up(c => { c.seen++; })}>OK, compris</button></div>}
          {low.map(p => <div className="alert" key={p.id}>⚠️ {p.name} : il reste {p.stock}<button onClick={() => up(c => { c.mute[p.id] = 1; })}>👍 Compris</button></div>)}
          {own && <div className="cd">Ventes d'aujourd'hui<div className="num">{f(sum(tdy, s => s.total))}</div></div>}
          <div className="g4">
            <button onClick={() => go("sell")}><i>🛒</i>Vendre</button>
            <button onClick={() => go("prods")}><i>📦</i>Produits</button>
            {own && <button onClick={() => go("cash")}><i>💰</i>Argent</button>}
            <button onClick={() => go("custs")}><i>👥</i>Clients</button>
          </div>
          <div className="g4 s">
            {own && <button onClick={() => go("rep")}><i>📊</i>Rapports</button>}
            {own && <button onClick={eBiz}><i>🏪</i>Mon commerce</button>}
            <button onClick={() => go("share")}><i>🔗</i>Partage</button>
            <button onClick={() => go("sub")}><i>🔑</i>Abonnement</button>
          </div>
        </>}

        {cur === "sell" && <>
          <input placeholder="🔍 Chercher un produit" value={q} onChange={e => setQ(e.target.value)} />
          {secTabs}
          <div className="grid">
            {list.map(p => (
              <div className="card" key={p.id} onClick={() => add(p.id)}>
                {cart[p.id] > 0 && <em>{cart[p.id]}</em>}
                <i>{p.icon}</i><b>{p.name}</b><span>{f(p.price)}</span><small>Stock : {p.stock}</small>
              </div>
            ))}
          </div>
          {cartKeys.length > 0 && (
            <div className="cartp">
              {cartKeys.map(k => { const p = S.prods.find(x => x.id == k); return (
                <div className="l" key={k}><span>{p.icon} {p.name}</span><button onClick={() => chg(k, -1)}>−</button><b>{cart[k]}</b><button onClick={() => chg(k, 1)}>+</button></div>
              ); })}
              <div className="two">
                <button className={mode === "paid" ? "on p" : ""} onClick={() => setMode("paid")}>💵 Payé</button>
                <button className={mode === "credit" ? "on c" : ""} onClick={() => setMode("credit")}>📒 Crédit</button>
              </div>
              {mode === "credit" && (
                <select value={cu} onChange={e => setCu(+e.target.value)}>
                  <option value={0}>👤 Choisir le client</option>
                  {S.custs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              )}
              <button className="big g" disabled={wait} onClick={sell}>{wait ? "⏳ Envoi…" : "✅ Valider " + f(cartTotal)}</button>
            </div>
          )}
        </>}

        {cur === "done" && last && <>
          <div className="cd"><div className="num gr">✅</div><div className="hi">Vente enregistrée<small>{f(last.total)} • {last.paid ? "Payé" : "À crédit"}</small></div></div>
          <pre>{recTxt(last, S.biz)}</pre>
          <button className="big g" onClick={() => { const c = S.custs.find(x => x.id === last.cu); wa(c ? c.tel : "", recTxt(last, S.biz)); }}>📲 Envoyer le reçu (WhatsApp)</button>
          <button className="big" onClick={() => setSt([["home", {}], ["sell", {}]])}>🛒 Nouvelle vente</button>
          <button className="lnk" onClick={home}>🏠 Accueil</button>
        </>}

        {cur === "prods" && <>
          {own && <div className="two"><button onClick={() => eP(0, sec)}>➕ Produit</button><button onClick={() => eS()}>📁 Section</button></div>}
          <input placeholder="🔍 Chercher" value={q} onChange={e => setQ(e.target.value)} />
          {secTabs}
          {own && sec > 0 && <button className="lnk" onClick={() => eS(sec)}>✏️ Modifier cette section</button>}
          {list.map(p => (
            <div className="row" key={p.id} onClick={() => own && eP(p.id)}>
              <i>{p.icon}</i><div><b>{p.name}</b><small>{f(p.price)} • Stock : {p.stock}</small></div>{p.stock <= p.min && <span>⚠️</span>}
            </div>
          ))}
          {!list.length && <div className="cd">Aucun produit.</div>}
        </>}

        {cur === "cash" && own && <>
          <div className="cd">En caisse<div className={"num " + (cin - cout >= 0 ? "gr" : "rd")}>{f(cin - cout)}</div></div>
          <div className="two"><button onClick={() => ent("in", "Entrée d'argent")}>➕ Entrée</button><button onClick={() => ent("out", "Dépense")}>➖ Dépense</button></div>
          {[...S.cash].sort((a, b) => b.d - a.d).slice(0, 40).map((x, i) => (
            <div className="row" key={i}><i>{x.type === "in" ? "🟢" : "🔴"}</i><div><b>{x.label}</b><small>{dt(x.d)}</small></div><b className={x.type === "in" ? "gr" : "rd"}>{x.type === "in" ? "+" : "−"}{f(x.amt)}</b></div>
          ))}
        </>}

        {cur === "custs" && <>
          {own && <button className="big" onClick={() => eC(0)}>➕ Nouveau client</button>}
          {S.custs.map(c => (
            <div className="row" key={c.id} onClick={() => go("cust", { id: c.id })}>
              <i>👤</i><div><b>{c.name}</b><small>{c.tel}</small></div><b className={c.debt > 0 ? "rd" : "gr"}>{c.debt > 0 ? f(c.debt) : "✓"}</b>
            </div>
          ))}
        </>}

        {cur === "cust" && cc && <>
          <div className="cd"><div className="hi">{cc.name}<small>{cc.tel}</small></div><div className={"num " + (cc.debt > 0 ? "rd" : "gr")}>{f(cc.debt)}</div></div>
          {own && cc.debt > 0 && <button className="big g" onClick={() => form("Encaisser", [{ k: "a", l: "Montant reçu (FCFA)", t: "number", v: cc.debt }], r => {
            if (r.a > 0) up(c => { const x = c.custs.find(y => y.id === cc.id), a = Math.min(r.a, x.debt); x.debt -= a; c.cash.push({ d: Date.now(), type: "in", label: "Remboursement : " + x.name, amt: a }); });
          })}>💵 Encaisser</button>}
          {own && cc.tel && cc.debt > 0 && <button className="big y" onClick={() => wa(cc.tel, `Bonjour ${cc.name}, c'est ${S.biz.name}. Il vous reste ${f(cc.debt)} à régler. Merci !`)}>📲 Rappel WhatsApp</button>}
          {own && <button className="lnk" onClick={() => eC(cc.id)}>✏️ Modifier</button>}
        </>}

        {cur === "rep" && own && repView()}

        {cur === "voice" && <>
          <button className="big y" onClick={listen}>🎤 Parler</button>
          <input placeholder="✍️ Ou écrivez ici : J'ai vendu deux riz" value={vin} onChange={e => setVin(e.target.value)} />
          <button className="big" onClick={() => vin && run(vin)}>OK</button>
          {vt && <div className="cd">{vt}</div>}
          {pend && <div className="two"><button className="on p" onClick={() => { const fn = pend; setPend(null); setVt("Fait ✅"); fn(); }}>✅ Oui</button><button className="on c" onClick={() => { setPend(null); setVt("Annulé"); }}>❌ Non</button></div>}
          <div className="sm">Exemples : « J'ai vendu deux riz » • « Combien j'ai vendu ? » • « Qui me doit ? » • « Il reste combien de savon ? » • « Dépense 2000 »</div>
        </>}

        {cur === "sub" && <>
          <div className="cd"><div className="hi">{act ? "✅" : "🔒"} Abonnement<small>{subStatus}</small></div></div>
          {!own ? <div className="cd">L'abonnement est géré par le propriétaire du commerce. S'il est expiré, prévenez-le pour qu'il le renouvelle.</div> : <>
            <div className="tabs"><button className={mp === 1 ? "on" : ""} onClick={() => setMp(1)}>📲 Mobile Money</button><button className={mp === 2 ? "on" : ""} onClick={() => setMp(2)}>🔑 Autre / code</button></div>
            {mp === 1 && <>
              <div className="cd">{f(S.settings.price)} pour {S.settings.days} jours</div>
              <select value={operator} onChange={e => setOperator(e.target.value)}><option value="MOOV">Moov Money</option><option value="AIRTEL">Airtel Money</option></select>
              <input type="tel" inputMode="numeric" placeholder="Votre numéro de téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
              <button className="big g" disabled={paying} onClick={payerAbonnement}>{paying ? "⏳ Vérification du paiement…" : "💳 Payer " + f(S.settings.price)}</button>
              <div className="sm">Un message arrive sur votre téléphone : confirmez avec votre code secret. L'abonnement s'active tout seul.</div>
            </>}
            {mp === 2 && <>
              <div className="cd">Envoyez {f(S.settings.price)} au :<br />Moov Money <b>{S.pay.moov}</b><br />Airtel Money <b>{S.pay.airtel}</b>{S.pay.intl1 && <><br />{S.pay.intl1}</>}{S.pay.intl2 && <><br />{S.pay.intl2}</>}</div>
              {S.pay.payurl && <button className="big y" onClick={payOnline}>🌍 Payer en ligne</button>}
              <button className="big" onClick={sendProof}>📲 J'ai payé : envoyer la preuve</button>
              <div className="sm">Code appareil : <b>{dcode}</b></div>
              <input placeholder="Code d'activation reçu" value={acode} onChange={e => setAcode(e.target.value)} />
              <button className="big g" onClick={() => activate(acode)}>✅ Activer</button>
            </>}
          </>}
          <button className="lnk" onClick={() => go("share")}>🔗 Partage / se connecter</button>
        </>}

        {cur === "share" && <>
          {!cl && <>
            <div className="cd">Pour voir les ventes de votre vendeur depuis chez vous, activez le partage. Sans partage, l'application reste comme avant.</div>
            <button className="big g" disabled={wait} onClick={enableShare}>☁️ Activer le partage (je suis le propriétaire)</button>
            <button className="big" disabled={wait} onClick={joinShare}>🔑 Rejoindre un commerce (j'ai un code)</button>
            <button className="lnk" disabled={wait} onClick={loginShare}>Déjà un compte ? Me connecter</button>
          </>}
          {cl && cl.role === "owner" && <>
            <div className="cd"><div className="hi">☁️ Partage actif<small>Vous êtes le propriétaire • {net ? "🟢 synchronisé" : "🔴 hors connexion"}</small></div></div>
            <button className="big g" onClick={inviteVendor}>➕ Inviter un vendeur</button>
            {members.filter(m => m.role === "manager" && m.active).map(m => (
              <div className="row" key={m.user_id}><i>👤</i><div><b>{m.name || "Vendeur"}</b><small>Vendeur</small></div><button className="lnk" style={{ width: "auto" }} onClick={() => removeVendor(m)}>Retirer</button></div>
            ))}
            <button className="lnk" onClick={() => { if (confirm("Arrêter le partage sur ce téléphone ? Vos données restent ici.")) leave("Partage arrêté sur ce téléphone."); }}>Me déconnecter du partage</button>
          </>}
          {cl && cl.role === "manager" && <>
            <div className="cd"><div className="hi">🧑‍💼 Vendeur<small>{S.biz.name} • {net ? "🟢 synchronisé" : "🔴 hors connexion"}</small></div></div>
            <button className="lnk" onClick={() => { if (confirm("Vous déconnecter ?")) leave("Vous êtes déconnecté."); }}>Me déconnecter</button>
          </>}
        </>}

        {cur === "admin" && <>
          <div className="cd"><div className="hi">⚙️ Administrateur</div></div>
          <button className="big" onClick={aCode}>🔑 Générer un code d'activation</button>
          <button className="big" onClick={aTarif}>💲 Tarifs et délais</button>
          <button className="big" onClick={aPay}>💳 Moyens de paiement</button>
          <button className="big" onClick={chPw}>🔐 Changer mon code</button>
          <button className="big" onClick={bk}>💾 Sauvegarde</button>
          <button className="big" onClick={aRes}>♻️ Restaurer</button>
          <button className="big r" onClick={() => { up(c => { c.adm = 0; }); home(); }}>🚪 Quitter le mode admin</button>
        </>}
      </main>
      {fm && <FormModal key={fm.id} fm={fm} close={() => setFm(null)} />}
      {msg && <div className="ov"><div className="md">{typeof msg === "string" ? <p>{msg}</p> : msg}<button className="big" onClick={() => setMsg(null)}>OK</button></div></div>}
    </>
  );
}
