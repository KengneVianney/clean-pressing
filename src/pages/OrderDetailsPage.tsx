import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import ConfirmModal from "../components/ConfirmModal";
import { useOrders } from "../hooks/useOrders";
import { formatPrice } from "../utils/pricing";
import { colors, spacing, borderRadius } from "../styles/theme";
import type { Order, OrderStatus } from "../types/Order";

const articleColors: Record<string, string> = {
  Costume: "#1e293b", "Robe de soirée": "#831843", "Veste en cuir": "#78350f",
};

type Tab = "details" | "timeline";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, update, remove } = useOrders();
  const [tab, setTab] = useState<Tab>("details");
  const [status, setStatus] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const order: Order | undefined = orders.find((o) => o.id === Number(id));

  if (!order) {
    return (
      <div>
        <Button variant="ghost" onClick={() => navigate("/app/orders")}>← Back</Button>
        <Card style={{ marginTop: spacing.md }}><p style={{ color: colors.textLight, padding: spacing.lg }}>Order not found.</p></Card>
      </div>
    );
  }

  const color = articleColors[order.article] ?? colors.text;

  const timeline = [
    { action: "Commande créée", date: order.createdAt, done: true },
    { action: "En cours de traitement", date: order.status === "processing" || order.status === "completed" || order.status === "delivered" ? order.updatedAt : "—", done: order.status !== "pending" },
    { action: "Terminé", date: order.status === "completed" || order.status === "delivered" ? order.updatedAt : "—", done: order.status === "completed" || order.status === "delivered" },
    { action: "Livré au client", date: order.status === "delivered" ? order.updatedAt : "—", done: order.status === "delivered" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
        <Button variant="ghost" onClick={() => navigate("/app/orders")}>← Back</Button>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: colors.text }}>Order Details</h1>
      </div>

      <Card style={{ marginBottom: spacing.lg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: spacing.md }}>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
            <div style={{
              width: 56, height: 56, borderRadius: borderRadius.md, flexShrink: 0,
              background: `linear-gradient(135deg, ${color}, ${color}dd)`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px",
              position: "relative",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
              </svg>
              <span style={{ position: "absolute", inset: 4, border: "1px dashed rgba(255,255,255,0.2)", borderRadius: "4px", pointerEvents: "none" }} />
            </div>
            <div>
              <p style={{ fontSize: "14px", color: colors.textSecondary }}>
                Order <strong style={{ color: colors.text }}>{order.orderId}</strong>
              </p>
              <p style={{ fontSize: "13px", color: colors.textLight, marginTop: spacing.xs }}>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <Badge status={order.status} />
        </div>
      </Card>

      <div style={{ display: "flex", gap: spacing.sm, marginBottom: spacing.lg }}>
        <button onClick={() => setTab("details")} style={tabStyle(tab === "details")}>Details</button>
        <button onClick={() => setTab("timeline")} style={tabStyle(tab === "timeline")}>Timeline</button>
      </div>

      {tab === "details" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.lg }}>
          <Card title="Customer Information">
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              <InfoRow label="Name" value={order.client} />
              <InfoRow label="Phone" value={order.phone} />
              <InfoRow label="Email" value={order.email} />
            </div>
          </Card>
          <Card title="Order Summary">
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              <InfoRow label="Article" value={order.article} />
              <InfoRow label="Quantity" value={`${order.quantity}`} />
              <InfoRow label="Service" value={order.service} />
              <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: spacing.sm, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, color: colors.text }}>Total</span>
                <span style={{ fontWeight: 700, color: colors.primary, fontSize: "18px" }}>{formatPrice(order.total)}</span>
              </div>
            </div>
          </Card>

          {order.photos.length > 0 && (
            <Card title="Photos" style={{ gridColumn: "span 2" }}>
              <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
                {order.photos.map((src, i) => (
                  <img key={i} src={src} alt={`Photo ${i + 1}`} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }} />
                ))}
              </div>
            </Card>
          )}

          <Card title="Items" style={{ gridColumn: "span 2" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border}`, textAlign: "left" }}>
                  <th style={{ padding: spacing.sm, color: colors.textSecondary }}>Article</th>
                  <th style={{ padding: spacing.sm, color: colors.textSecondary }}>Qty</th>
                  <th style={{ padding: spacing.sm, color: colors.textSecondary }}>Unit Price</th>
                  <th style={{ padding: spacing.sm, color: colors.textSecondary, textAlign: "right" }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: spacing.sm, color: colors.text }}>{order.article}</td>
                  <td style={{ padding: spacing.sm, color: colors.text }}>{order.quantity}</td>
                  <td style={{ padding: spacing.sm, color: colors.text }}>{formatPrice(order.total / order.quantity)}</td>
                  <td style={{ padding: spacing.sm, color: colors.text, textAlign: "right", fontWeight: 600 }}>{formatPrice(order.total)}</td>
                </tr>
              </tbody>
            </table>
            {order.notes && (
              <div style={{ marginTop: spacing.md, padding: spacing.md, background: colors.warningBg, borderRadius: borderRadius.md }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: colors.warning, marginBottom: spacing.xs }}>Notes</p>
                <p style={{ fontSize: "13px", color: colors.text }}>{order.notes}</p>
              </div>
            )}
          </Card>

          <Card title="Actions" style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: spacing.md, flexWrap: "wrap" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: colors.text }}>Status:</span>
              <select
                value={status || order.status}
                onChange={(e) => {
                  const val = e.target.value as OrderStatus;
                  update(order.id!, { status: val });
                  setStatus(val);
                }}
                style={{
                  padding: `${spacing.sm} ${spacing.md}`,
                  border: `1.5px solid ${colors.border}`, borderRadius: borderRadius.md,
                  fontSize: "14px", outline: "none", background: colors.surface,
                }}
              >
                {(["pending", "processing", "completed", "delivered", "cancelled"] as OrderStatus[]).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div style={{ flex: 1 }} />
              <Button variant="danger" onClick={() => setDeleteOpen(true)}>Delete Order</Button>
            </div>
          </Card>
        </div>
      ) : (
        <Card title="Order Timeline">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: spacing.md, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%",
                    backgroundColor: t.done ? colors.success : colors.border, flexShrink: 0,
                  }} />
                  {i < timeline.length - 1 && (
                    <div style={{ width: 2, height: 24, backgroundColor: t.done ? colors.success : colors.border }} />
                  )}
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: t.done ? colors.text : colors.textLight }}>{t.action}</p>
                  <p style={{ fontSize: "12px", color: colors.textLight }}>{t.date !== "—" ? new Date(t.date).toLocaleString() : "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <ConfirmModal
        simple
        title="Delete Order"
        message="Permanently delete this order?"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          remove(order.id!);
          navigate("/app/orders");
        }}
      />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${colors.border}`, paddingBottom: spacing.xs }}>
      <span style={{ fontSize: "13px", color: colors.textSecondary }}>{label}</span>
      <span style={{ fontSize: "14px", color: colors.text, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: `${spacing.sm} ${spacing.lg}`, borderRadius: borderRadius.md, border: "none",
    background: active ? colors.primary : colors.surface,
    color: active ? "#fff" : colors.textSecondary, fontWeight: 600, fontSize: "14px",
    cursor: "pointer", boxShadow: active ? undefined : "0 1px 2px rgba(0,0,0,0.05)",
    transition: "all 0.15s ease",
  };
}
