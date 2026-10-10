import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  { id: 1, name: "Riz 5kg", price: 8000, icon: "🍚" },
  { id: 2, name: "Jus", price: 500, icon: "🧃" },
  { id: 3, name: "Savon", price: 600, icon: "🧼" },
];
const START_STOCK = { 1: 20, 2: 40, 3: 30 };
const LIMIT = 10;
const MERCHANT = "MR_1791484047";
const CODE_HASH = "131e27b7715c43825f14696b907812d34fb86a529dd8c98fedbf87016f5d9149";
const OK = ["SUCCESS", "SUCCESSFUL"];
const BAD = ["FAILED", "CANCELLED", "CANCELED", "EXPIRED", "REJECTED"];

const load = (k, fb) => {
  try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fb; } catch { return fb; }
};
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const fcfa = n => Number(n).toLocaleString("fr-FR") + " FCFA";
const sha = async t =>
  [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)))]
    .map(b => b.toString(16).padStart(2, "0")).join("");

const S = {
  page: { minHeight: "100vh", background: "#F1F3F6", fontFamily: "system-ui, Arial, sans-serif", color: "#111" },
  header: { background: "#0B2A5B", color: "#fff", padding: "16px", textAlign: "center", fontSize: 22, fontWeight: 800 },
  wrap: { maxWidth: 520, margin: "0 auto", padding: 14 },
  card: { background: "#fff", borderRadius: 18, padding: 14, margin: "10px 0", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 6px #0002" },
  icon: { fontSize: 44 },
  grow: { flex: 1 },
  name: { fontSize: 20, fontWeight: 700 },
  price: { color: "#1E6BFF", fontWeight: 700 },
  small: { fontSize: 14, opacity: 0.7 },
  btnGreen: { background: "#16A34A", color: "#fff", border: 0, borderRadius: 14, padding: "14px 16px", fontSize: 16, fontWeight: 800, cursor: "pointer" },
  overlay: { position: "fixed", inset: 0, background: "#000a", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 20 },
  modal: { background: "#fff", width: "100%", maxWidth: 520, borderRadius: "24px 24px 0 0", padding: 18, maxHeight: "92vh", overflow: "auto" },
  two: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0" },
  op: on => ({ background: on.bg, color: on.fg, border: 0, borderRadius: 14, minHeight: 56, fontSize: 17, fontWeight: 800, cursor: "pointer" }),
  input: { width: "100%", boxSizing: "border-box", fontSize: 20, padding: 14, borderRadius: 12, border: "2px solid #9994", margin: "4px 0" },
  status: err => ({ minHeight: 24, margin: "10px 0", fontWeight: 600, color: err ? "#DC2626" : "#0B2A5B" }),
  pay: dis => ({ display: "block", width: "100%", minHeight: 60, border: 0, borderRadius: 16, background: dis ? "#8bc9a1" : "#16A34A", color: "#fff", fontSize: 19, fontWeight: 800, cursor: dis ? "default" : "pointer", margin: "10px 0" }),
  cancel: { display: "block", width: "100%", minHeight: 52, border: 0, borderRadius: 14, background: "#E5E7EB", color: "#111", fontSize: 17, fontWeight: 700, cursor: "pointer" },
  note: { textAlign: "center", fontSize: 13, opacity: 0.7, marginTop: 12 },
  lock: { maxWidth: 420, margin: "60px auto", background: "#fff", borderRadius: 20, padding: 24, textAlign: "center", boxShadow: "0 2px 10px #0003" },
};

export default function App() {
  const [stock, setStock] = useState(() => load("sm_stock", START_STOCK));
  const [sales, setSales] = useState(() => Number(load("salesCount", 0)));
  const [unlocked, setUnlocked] = useState(() => load("sm_unlocked", false) === true);
  const [item, setItem] = useState(null);
  const [op, setOp] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState(false);
  const timer = useRef(null);
  const limit = useRef(null);
  const finished = useRef(false);

  const stop = () => { clearInterval(timer.current); clearTimeout(limit.current); };
  useEffect(() => stop, []);

  const open = p => {
    finished.current = false;
    setItem(p); setOp(""); setPhone(""); setStatus(""); setError(false); setLoading(false);
  };
  const close = () => {
    stop(); finished.current = true;
    setItem(null); setOp(""); setPhone(""); setStatus(""); setError(false); setLoading(false);
  };
  const fail = msg => {
    if (finished.current) return;
    stop(); setLoading(false); setError(true); setStatus(msg);
  };
  const success = p => {
    if (finished.current) return;
    finished.current = true; stop();
    const n = Number(load("salesCount", 0)) + 1;
    save("salesCount", n); setSales(n);
    const s = { ...load("sm_stock", START_STOCK) };
    s[p.id] = Math.max(0, (s[p.id] ?? 0) - 1);
    save("sm_stock", s); setStock(s);
    setItem(null); setOp(""); setPhone(""); setStatus(""); setError(false); setLoading(false);
    alert("Paiement reçu ✅");
  };

  const pay = async () => {
    const p = item;
    const digits = phone.replace(/\D/g, "");
    if (!op) { setError(true); setStatus("Choisissez Moov Money ou Airtel Money"); return; }
    if (digits.length !== 9) { setError(true); setStatus("Le numéro doit avoir 9 chiffres"); return; }
    finished.current = false;
    setLoading(true); setError(false); setStatus("Envoi de la demande…");
    try {
      const r = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: p.price, phone: digits, operator: op }),
      });
      const d = await r.json();
      if (!r.ok || !d.reference) throw new Error(d.error || "Paiement refusé");
      setStatus("Demande envoyée au " + digits + ", demande au client de taper son code secret");
      const ref = d.reference;
      timer.current = setInterval(async () => {
        try {
          const rr = await fetch("/api/check?reference=" + encodeURIComponent(ref));
          const c = await rr.json();
          const st = String(c.status || "").toUpperCase();
          if (OK.includes(st) || c.success === true) success(p);
          else if (BAD.includes(st) || c.final === true) fail("Paiement échoué ou annulé");
        } catch {}
      }, 5000);
      limit.current = setTimeout(() => fail("Temps dépassé (2 min) : le client n'a pas validé"), 120000);
    } catch (e) {
      fail(String(e.message || e));
    }
  };

  const unlock = async () => {
    if ((await sha(code.trim())) === CODE_HASH) { save("sm_unlocked", true); setUnlocked(true); setCodeErr(false); }
    else setCodeErr(true);
  };

  if (sales >= LIMIT && !unlocked) {
    return (
      <div style={S.page}>
        <div style={S.header}>SHOPMANAGER</div>
        <div style={S.lock}>
          <div style={{ fontSize: 60 }}>🔒</div>
          <h2>Limite atteinte</h2>
          <p>Vous avez fait {LIMIT} ventes. Entrez le code pour débloquer.</p>
          <input style={S.input} type="password" inputMode="numeric" placeholder="Code" value={code}
            onChange={e => { setCode(e.target.value); setCodeErr(false); }} />
          {codeErr && <p style={{ color: "#DC2626", fontWeight: 700 }}>Code incorrect</p>}
          <button style={S.pay(false)} onClick={unlock}>🔓 DÉBLOQUER</button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.header}>SHOPMANAGER</div>
      <div style={S.wrap}>
        <div style={S.small}>Ventes : {sales}{unlocked ? "" : " / " + LIMIT}</div>
        {PRODUCTS.map(p => (
          <div key={p.id} style={S.card}>
            <div style={S.icon}>{p.icon}</div>
            <div style={S.grow}>
              <div style={S.name}>{p.name}</div>
              <div style={S.price}>{fcfa(p.price)}</div>
              <div style={S.small}>{stock[p.id] ?? 0} en stock</div>
            </div>
            <button style={{ ...S.btnGreen, opacity: (stock[p.id] ?? 0) > 0 ? 1 : 0.5 }}
              disabled={(stock[p.id] ?? 0) <= 0} onClick={() => open(p)}>ENCAISSER</button>
          </div>
        ))}
      </div>

      {item && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <h2 style={{ margin: "0 0 4px" }}>{item.icon} {item.name}</h2>
            <div style={{ ...S.price, fontSize: 24 }}>{fcfa(item.price)}</div>
            <div style={S.two}>
              <button disabled={loading} style={S.op(op === "MOOV" ? { bg: "#1E6BFF", fg: "#fff" } : { bg: "#E5E7EB", fg: "#111" })}
                onClick={() => setOp("MOOV")}>Moov Money</button>
              <button disabled={loading} style={S.op(op === "AIRTEL" ? { bg: "#DC2626", fg: "#fff" } : { bg: "#E5E7EB", fg: "#111" })}
                onClick={() => setOp("AIRTEL")}>Airtel Money</button>
            </div>
            <input style={S.input} type="tel" inputMode="numeric" placeholder="07xxxxxxx" value={phone}
              disabled={loading} onChange={e => setPhone(e.target.value)} />
            <div style={S.status(error)}>{status}</div>
            <button style={S.pay(loading)} disabled={loading} onClick={pay}>
              {loading ? "⏳ EN ATTENTE…" : "⚡ PAYER AUTOMATIQUE"}
            </button>
            <button style={S.cancel} onClick={close}>Annuler</button>
            <div style={S.note}>Argent sur {MERCHANT}. Visa bientôt</div>
          </div>
        </div>
      )}
    </div>
  );
}
