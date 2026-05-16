import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ConfirmModal from "../components/ConfirmModal";
import { useOrders } from "../hooks/useOrders";
import { formatPrice } from "../utils/pricing";
import { colors, spacing, borderRadius } from "../styles/theme";

export default function ReportsPage() {
  const { orders, loading, clearAll } = useOrders();
  const [modalOpen, setModalOpen] = useState(false);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const statusCounts = ["pending", "processing", "completed", "delivered", "cancelled"].map((s) => {
    const count = orders.filter((o) => o.status === s).length;
    const pct = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;
    return { status: s, count, pct };
  });

  const statusColors: Record<string, string> = {
    pending: colors.warning, processing: colors.info,
    completed: colors.success, delivered: colors.success, cancelled: colors.error,
  };

  const statusLabels: Record<string, string> = {
    pending: "En attente", processing: "En cours",
    completed: "Terminé", delivered: "Livré", cancelled: "Annulé",
  };

  const monthlyMap: Record<string, { orders: number; revenue: number }> = {};
  orders.forEach((o) => {
    const m = o.createdAt.slice(0, 7);
    if (!monthlyMap[m]) monthlyMap[m] = { orders: 0, revenue: 0 };
    monthlyMap[m].orders += 1;
    monthlyMap[m].revenue += o.total;
  });
  const monthlyData = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6);

  const articleMap: Record<string, { count: number; revenue: number }> = {};
  orders.forEach((o) => {
    if (!articleMap[o.article]) articleMap[o.article] = { count: 0, revenue: 0 };
    articleMap[o.article].count += o.quantity;
    articleMap[o.article].revenue += o.total;
  });
  const topArticles = Object.entries(articleMap)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5)
    .map(([article, data]) => ({ article, ...data }));

  const maxRevenue = Math.max(...monthlyData.map(([, d]) => d.revenue), 1);

  if (loading) {
    return <Card><p style={{ color: colors.textLight, padding: spacing.lg }}>Loading...</p></Card>;
  }

  return (
    <div>
      <h1 style={{ fontSize: "24px", fontWeight: 700, color: colors.text, marginBottom: spacing.lg }}>Reports</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: spacing.md, marginBottom: spacing.xl }}>
        <Card>
          <p style={{ fontSize: "13px", color: colors.textSecondary, marginBottom: spacing.xs }}>Total Orders</p>
          <p style={{ fontSize: "28px", fontWeight: 700, color: colors.text }}>{totalOrders}</p>
        </Card>
        <Card>
          <p style={{ fontSize: "13px", color: colors.textSecondary, marginBottom: spacing.xs }}>Total Revenue</p>
          <p style={{ fontSize: "28px", fontWeight: 700, color: colors.success }}>{formatPrice(totalRevenue)}</p>
        </Card>
        <Card>
          <p style={{ fontSize: "13px", color: colors.textSecondary, marginBottom: spacing.xs }}>Avg. per Order</p>
          <p style={{ fontSize: "28px", fontWeight: 700, color: colors.primary }}>{formatPrice(avgOrder)}</p>
        </Card>
        <Card>
          <p style={{ fontSize: "13px", color: colors.textSecondary, marginBottom: spacing.xs }}>This Month</p>
          <p style={{ fontSize: "28px", fontWeight: 700, color: colors.warning }}>
            {monthlyData.length > 0 ? monthlyData[monthlyData.length - 1][1].orders : 0}
          </p>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.lg, marginBottom: spacing.lg }}>
        <Card title="Monthly Revenue">
          {monthlyData.length === 0 ? (
            <p style={{ color: colors.textLight, fontSize: "14px" }}>No data yet</p>
          ) : (
            <div style={{ display: "flex", alignItems: "flex-end", gap: spacing.sm, height: "160px", paddingTop: spacing.md }}>
              {monthlyData.map(([month, d]) => {
                const h = (d.revenue / maxRevenue) * 140;
                const label = month.slice(5, 7) + "/" + month.slice(2, 4);
                return (
                  <div key={month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.xs }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: colors.primary }}>{(d.revenue / 1000).toFixed(0)}k</span>
                    <div style={{ width: "100%", maxWidth: 40, height: `${h}px`, background: colors.primary, borderRadius: `${borderRadius.sm} ${borderRadius.sm} 0 0` }} />
                    <span style={{ fontSize: "11px", color: colors.textSecondary }}>{label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card title="Orders by Status">
          {statusCounts.every((s) => s.count === 0) ? (
            <p style={{ color: colors.textLight, fontSize: "14px" }}>No data yet</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              {statusCounts.map((s) => (
                <div key={s.status}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing.xs }}>
                    <span style={{ fontSize: "13px", color: colors.text }}>{statusLabels[s.status]}</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: statusColors[s.status] }}>{s.count} ({s.pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: colors.border, borderRadius: borderRadius.full, overflow: "hidden" }}>
                    <div style={{ width: `${s.pct}%`, height: "100%", background: statusColors[s.status], borderRadius: borderRadius.full }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="Top Articles">
        {topArticles.length === 0 ? (
          <p style={{ color: colors.textLight, fontSize: "14px" }}>No data yet</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}`, textAlign: "left" }}>
                <th style={{ padding: spacing.sm, color: colors.textSecondary }}>Article</th>
                <th style={{ padding: spacing.sm, color: colors.textSecondary }}>Items</th>
                <th style={{ padding: spacing.sm, color: colors.textSecondary, textAlign: "right" }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topArticles.map((a, i) => (
                <tr key={a.article} style={{ borderBottom: i < topArticles.length - 1 ? `1px solid ${colors.border}` : "none" }}>
                  <td style={{ padding: spacing.sm, color: colors.text, fontWeight: 500 }}>{a.article}</td>
                  <td style={{ padding: spacing.sm, color: colors.text }}>{a.count}</td>
                  <td style={{ padding: spacing.sm, color: colors.success, fontWeight: 600, textAlign: "right" }}>{formatPrice(a.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <div style={{ marginTop: spacing.xxl, paddingTop: spacing.xl, borderTop: `1px solid ${colors.border}` }}>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: colors.error, marginBottom: spacing.sm }}>Danger Zone</h2>
        <p style={{ fontSize: "13px", color: colors.textSecondary, marginBottom: spacing.md }}>
          Permanently delete all order data from the database.
        </p>
        <Button variant="danger" onClick={() => setModalOpen(true)}>
          Clear Database
        </Button>
      </div>

      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={clearAll}
      />
    </div>
  );
}
