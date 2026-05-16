import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { useOrders } from "../hooks/useOrders";
import { formatPrice } from "../utils/pricing";
import { colors, spacing, borderRadius, shadows } from "../styles/theme";

const articleColors: Record<string, string> = {
  Costume: "#1e293b", "Costume 3 pièces": "#1e293b", "Robe de soirée": "#831843",
  Robes: "#831843", Chemises: "#1e40af", "Veste en cuir": "#78350f", Tapis: "#713f12",
};

const statuses = ["all", "pending", "processing", "completed", "delivered", "cancelled"];

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders, loading } = useOrders();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = o.client.toLowerCase().includes(q) || o.orderId.toLowerCase().includes(q) || o.article.toLowerCase().includes(q);
    const matchFilter = filter === "all" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: colors.text }}>Orders</h1>
        <Button onClick={() => navigate("/app/new")}>+ New Order</Button>
      </div>

      <Card style={{ marginBottom: spacing.lg }}>
        <div style={{ display: "flex", gap: spacing.md, flexWrap: "wrap" }}>
          <input
            placeholder="Search client, order ID, or article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: "200px",
              padding: `${spacing.sm} ${spacing.md}`,
              border: `1.5px solid ${colors.border}`,
              borderRadius: borderRadius.md, fontSize: "14px", outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap" }}>
            {statuses.map((s) => (
              <button key={s} onClick={() => setFilter(s)} style={{
                padding: `${spacing.xs} ${spacing.md}`, borderRadius: borderRadius.full,
                border: `1.5px solid ${filter === s ? colors.primary : colors.border}`,
                background: filter === s ? colors.primary : "transparent",
                color: filter === s ? "#fff" : colors.textSecondary,
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
                textTransform: "capitalize", transition: "all 0.15s ease",
              }}>
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {loading ? (
        <Card><p style={{ color: colors.textLight, textAlign: "center", padding: spacing.lg }}>Loading...</p></Card>
      ) : filtered.length === 0 ? (
        <Card><p style={{ color: colors.textSecondary, textAlign: "center", padding: spacing.lg }}>No orders found.</p></Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: spacing.md }}>
          {filtered.map((o) => {
            const color = articleColors[o.article] ?? colors.text;
            return (
              <article
                key={o.id}
                onClick={() => navigate(`/app/orders/${o.id}`)}
                style={{
                  background: colors.surface, borderRadius: borderRadius.lg,
                  boxShadow: shadows.md, overflow: "hidden", cursor: "pointer",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = shadows.lg; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = shadows.md; }}
              >
                <div style={{
                  background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: spacing.sm, minHeight: 130, padding: spacing.md, position: "relative",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                  </svg>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3px" }}>
                    {o.article}
                  </span>
                  <span style={{ position: "absolute", inset: 8, border: "1.5px dashed rgba(255,255,255,0.2)", borderRadius: borderRadius.md, pointerEvents: "none" }} />
                </div>
                <div style={{ padding: spacing.md }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.sm }}>
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: colors.text }}>{o.client}</p>
                      <p style={{ fontSize: "12px", color: colors.textLight }}>{o.phone}</p>
                    </div>
                    <p style={{ fontSize: "18px", fontWeight: 700, color: colors.primary }}>{formatPrice(o.total)}</p>
                  </div>
                  <div style={{ display: "flex", gap: spacing.sm, fontSize: "13px", color: colors.textSecondary, flexWrap: "wrap" }}>
                    <span style={{ background: colors.background, padding: `2px ${spacing.sm}`, borderRadius: borderRadius.sm }}>
                      ×{o.quantity} — {o.service}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: spacing.sm }}>
                    <Badge status={o.status} />
                    <span style={{ fontSize: "12px", color: colors.textLight }}>{new Date(o.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
