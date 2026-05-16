import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useOrders } from "../hooks/useOrders";
import { calculatePrice, formatPrice, services } from "../utils/pricing";
import { fileToBase64 } from "../utils/fileToBase64";
import { colors, spacing, borderRadius } from "../styles/theme";

type PhotoItem = { id: number; preview: string };

export default function NewOrderPage() {
  const navigate = useNavigate();
  const { create } = useOrders();
  const [form, setForm] = useState({ client: "", phone: "", email: "", article: "", quantity: 1, service: services[0].name, notes: "" });
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(0);

  const total = calculatePrice(form.service, form.quantity);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const results = await Promise.all(files.map(async (file) => {
      idCounter.current += 1;
      const b64 = await fileToBase64(file);
      return { id: idCounter.current, preview: b64 };
    }));
    setPhotos((prev) => [...prev, ...results]);
    if (fileRef.current) fileRef.current.value = "";
  };

  const removePhoto = (id: number) => {
    setPhotos((prev) => {
      const p = prev.find((x) => x.id === id);
      if (p) URL.revokeObjectURL(p.preview);
      return prev.filter((x) => x.id !== id);
    });
  };

const orderIdRef = useRef(0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    orderIdRef.current += 1;
    const now = new Date().toISOString();
    const seq = String(orderIdRef.current).padStart(3, "0");
    await create({
      orderId: `CMD-${seq}`,
    client: form.client,
    phone: form.phone,
    email: form.email,
    article: form.article,
    quantity: form.quantity,
    service: form.service,
    total,
    status: "pending",
    notes: form.notes,
    photos: photos.map((p) => p.preview),
    createdAt: now,
    updatedAt: now,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
        <Card>
          <div style={{
            width: 56, height: 56, borderRadius: "50%", background: colors.successBg,
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", marginBottom: spacing.md,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 style={{ color: colors.success, marginBottom: spacing.sm }}>Order Created!</h2>
          <p style={{ color: colors.textSecondary, marginBottom: spacing.xs }}>{form.client} — {form.article} × {form.quantity}</p>
          <p style={{ color: colors.textLight, fontSize: "13px", marginBottom: spacing.sm }}>{form.service}</p>
          {photos.length > 0 && (
            <div style={{ display: "flex", gap: spacing.sm, justifyContent: "center", flexWrap: "wrap", marginBottom: spacing.sm }}>
              {photos.map((p) => (
                <img key={p.id} src={p.preview} alt="" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: borderRadius.sm, border: `1px solid ${colors.border}` }} />
              ))}
            </div>
          )}
          <p style={{ fontSize: "24px", fontWeight: 700, color: colors.primary, marginBottom: spacing.lg }}>{formatPrice(total)}</p>
          <Button onClick={() => navigate("/app/orders")}>View Orders</Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <Card>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: colors.text, marginBottom: "4px" }}>New Order</h1>
        <p style={{ fontSize: "13px", color: colors.textLight, marginBottom: spacing.lg }}>
          Fill in the details to create a new cleaning order
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>

          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: colors.text, marginBottom: spacing.sm }}>Photos</p>
            <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFile} style={{ display: "none" }} />
              <button type="button" onClick={() => fileRef.current?.click()} style={{
                width: 100, height: 100, border: `2px dashed ${colors.border}`,
                borderRadius: borderRadius.md, background: colors.background, cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.xs,
                transition: "all 0.15s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.background = colors.infoBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.background = colors.background; }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.textLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                </svg>
                <span style={{ fontSize: "11px", color: colors.textLight, fontWeight: 500 }}>Add Photo</span>
              </button>
              {photos.map((p) => (
                <div key={p.id} style={{ position: "relative", width: 100, height: 100 }}>
                  <img src={p.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: borderRadius.md, border: `1.5px solid ${colors.border}` }} />
                  <button type="button" onClick={() => removePhoto(p.id)} style={{
                    position: "absolute", top: 4, right: 4, width: 20, height: 20, borderRadius: "50%",
                    border: "none", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "12px",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.md }}>
              <Field label="Client Name">
                <input required value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="Full name" style={inputStyle} />
              </Field>
              <Field label="Phone">
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+242 XX XXX XXXX" style={inputStyle} />
              </Field>
            </div>
            <Field label="Email (optional)">
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="client@email.com" style={inputStyle} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.md }}>
              <Field label="Article">
                <input required value={form.article} onChange={(e) => setForm({ ...form, article: e.target.value })} placeholder="e.g. Costume, Robe" style={inputStyle} />
              </Field>
              <Field label="Quantity">
                <input required type="number" min={1} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Math.max(1, Number(e.target.value)) })} style={inputStyle} />
              </Field>
            </div>
            <Field label="Service">
              <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} style={inputStyle}>
                {services.map((s) => (
                  <option key={s.name} value={s.name}>{s.name} — {formatPrice(s.price)}</option>
                ))}
              </select>
            </Field>
            <Field label="Notes (optional)">
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any special instructions..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </Field>
          </div>

          <div style={{
            background: colors.primary + "08", borderRadius: borderRadius.md,
            padding: spacing.md, display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ color: colors.textSecondary, fontSize: "14px" }}>Total</span>
            <span style={{ fontSize: "24px", fontWeight: 700, color: colors.primary }}>{formatPrice(total)}</span>
          </div>

          <Button type="submit" size="lg" style={{ width: "100%" }}>Create Order</Button>
        </form>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
      <span style={{ fontSize: "13px", fontWeight: 600, color: colors.text }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  padding: `${spacing.sm} ${spacing.md}`, border: `1.5px solid ${colors.border}`,
  borderRadius: borderRadius.md, fontSize: "14px", outline: "none",
  width: "100%", boxSizing: "border-box",
};
