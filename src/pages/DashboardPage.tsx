import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import ConfirmModal from "../components/ConfirmModal";
import { useOrders } from "../hooks/useOrders";
import { formatPrice } from "../utils/pricing";
import { colors, spacing, borderRadius } from "../styles/theme";
import type { OrderStatus } from "../types/Order";

const articleColors: Record<string, string> = {
  Costume: "#1e293b", "Robe de soirée": "#831843", Robes: "#831843",
  Chemises: "#1e40af", "Veste en cuir": "#78350f", Tapis: "#713f12",
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { orders, loading, update, remove } = useOrders();
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const processing = orders.filter((o) => o.status === "processing").length;
  const completed = orders.filter((o) => o.status === "completed" || o.status === "delivered").length;
  const recent = orders.slice(0, 5);

  const stats = [
    { label: "Total Orders", value: totalOrders.toString(), color: colors.primary },
    { label: "Revenue", value: formatPrice(totalRevenue), color: colors.success },
    { label: "Pending", value: pending.toString(), color: colors.warning },
    { label: "Processing", value: processing.toString(), color: colors.info },
    { label: "Completed", value: completed.toString(), color: colors.success },
  ];

  return (
    <div>
      <Card style={{ marginBottom: spacing.lg }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: colors.text, marginBottom: "4px" }}>Dashboard</h1>
            <p style={{ fontSize: "13px", color: colors.textLight }}>
              {loading ? "Loading..." : `${totalOrders} total orders — ${formatPrice(totalRevenue)} revenue`}
            </p>
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: spacing.md, marginBottom: spacing.xl }}>
        {stats.map((s) => (
          <Card key={s.label}>
            <p style={{ fontSize: "13px", color: colors.textSecondary, marginBottom: spacing.xs }}>{s.label}</p>
            <p style={{ fontSize: "22px", fontWeight: 700, color: s.color }}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card title="Recent Orders">
        {loading ? (
          <p style={{ color: colors.textLight }}>Loading...</p>
        ) : recent.length === 0 ? (
          <p style={{ color: colors.textLight }}>No orders yet</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {recent.map((o) => {
              const color = articleColors[o.article] ?? colors.text;
              return (
                  <div
                    key={o.id}
                    onClick={() => navigate(`/app/orders/${o.id}`)}
                    style={{
                      display: "flex", alignItems: "center", gap: spacing.sm,
                      padding: spacing.sm, borderRadius: borderRadius.md, cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = colors.background}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: borderRadius.md, flexShrink: 0,
                      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: spacing.sm, marginBottom: "2px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: colors.text }}>{o.client}</span>
                      <Badge status={o.status} />
                    </div>
                    <p style={{ fontSize: "13px", color: colors.textSecondary }}>
                      {o.orderId} — {o.article} × {o.quantity}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: spacing.sm, flexShrink: 0 }}>
                    <select
                      value={o.status}
                      onChange={(e) => update(o.id!, { status: e.target.value as OrderStatus })}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        padding: `${spacing.xs} ${spacing.sm}`,
                        border: `1px solid ${colors.border}`, borderRadius: borderRadius.sm,
                        fontSize: "12px", outline: "none", background: colors.surface, cursor: "pointer",
                      }}
                    >
                      {(["pending", "processing", "completed", "delivered", "cancelled"] as OrderStatus[]).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget(o.id!); }}
                      style={{
                        width: 28, height: 28, border: "none", borderRadius: borderRadius.sm,
                        background: "transparent", color: colors.textLight, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = colors.errorBg; e.currentTarget.style.color = colors.error; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = colors.textLight; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <ConfirmModal
        simple
        title="Delete Order"
        message="Permanently delete this order?"
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget !== null) remove(deleteTarget);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
