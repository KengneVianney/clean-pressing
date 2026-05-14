export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard 📊</h1>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <div style={{ padding: "10px", background: "white" }}>Orders: 0</div>
        <div style={{ padding: "10px", background: "white" }}>Revenue: 0 FCFA</div>
        <div style={{ padding: "10px", background: "white" }}>Pending: 0</div>
      </div>
    </div>
  );
}