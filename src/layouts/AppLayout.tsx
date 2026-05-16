import { NavLink, useNavigate } from "react-router-dom";
import { colors, spacing, borderRadius } from "../styles/theme";
import type { CSSProperties } from "react";

const navItems = [
  { path: "/app", label: "Dashboard", end: true },
  { path: "/app/orders", label: "Orders" },
  { path: "/app/new", label: "New Order" },
  { path: "/app/reports", label: "Reports" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Arial", display: "flex", flexDirection: "column" }}>

      <header style={{
        background: colors.navbar, borderBottom: `1px solid ${colors.border}`,
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: `0 ${spacing.xl}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", height: 60,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
            <div
              onClick={() => navigate("/app")}
              style={{ display: "flex", alignItems: "center", gap: spacing.sm, cursor: "pointer" }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: borderRadius.sm,
                background: colors.primary, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "#fff", fontSize: "11px", fontWeight: 800 }}>CP</span>
              </div>
              <span style={{ fontSize: "16px", fontWeight: 700, color: colors.text }}>CleanPressing</span>
            </div>
            <nav style={{ display: "flex", gap: spacing.xs, marginLeft: spacing.lg }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  style={({ isActive }): CSSProperties => ({
                    padding: `${spacing.sm} ${spacing.md}`,
                    borderRadius: borderRadius.md,
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isActive ? "#fff" : colors.textSecondary,
                    backgroundColor: isActive ? colors.primary : "transparent",
                    transition: "all 0.15s ease",
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <button
            onClick={() => navigate("/")}
            style={{
              padding: `${spacing.sm} ${spacing.md}`,
              background: "transparent",
              border: `1.5px solid ${colors.border}`,
              borderRadius: borderRadius.md,
              fontSize: "13px",
              fontWeight: 600,
              color: colors.textSecondary,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: spacing.xs,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.error; e.currentTarget.style.color = colors.error; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.textSecondary; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main style={{
        flex: 1, padding: spacing.xl, background: colors.background,
        maxWidth: 1200, margin: "0 auto", width: "100%",
      }}>
        {children}
      </main>

    </div>
  );
}
