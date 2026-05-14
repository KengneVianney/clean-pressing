import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      
      {/* Sidebar */}
      <aside style={{
        width: "240px",
        background: "#1f2937",
        color: "white",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "20px" }}>CleanPressing 🚀</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
          <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>Orders</Link>
          <Link to="/new" style={{ color: "white", textDecoration: "none" }}>New Order</Link>
          <Link to="/reports" style={{ color: "white", textDecoration: "none" }}>Reports</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{
        flex: 1,
        padding: "30px",
        background: "#f3f4f6"
      }}>
        {children}
      </main>

    </div>
  );
}