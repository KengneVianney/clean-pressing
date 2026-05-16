import { colors, spacing, borderRadius } from "../styles/theme";

const features = [
  {
    title: "Order Management",
    desc: "Create, track, and manage all cleaning orders in real-time. Never lose track of a client's garment again.",
  },
  {
    title: "Dashboard & Analytics",
    desc: "Get a complete overview of your business with real-time stats on orders, revenue, and performance.",
  },
  {
    title: "Photo Tracking",
    desc: "Attach photos to each order for precise identification. Know exactly what belongs to whom.",
  },
  {
    title: "Detailed Reports",
    desc: "Generate insightful reports on revenue trends, popular services, and business growth.",
  },
];

const featureIcons = [
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 14l2 2 4-4" />
  </svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>,
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>,
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "Arial, sans-serif" }}>

      <nav style={{
        background: "#fff", borderBottom: `1px solid ${colors.border}`,
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: `${spacing.md} ${spacing.xl}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
            <div style={{
              width: 32, height: 32, borderRadius: borderRadius.md,
              background: colors.primary, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: 800 }}>CP</span>
            </div>
            <span style={{ fontSize: "18px", fontWeight: 700, color: colors.text }}>CleanPressing</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.lg }}>
            <a href="#features" style={{ textDecoration: "none", fontSize: "14px", color: colors.textSecondary, fontWeight: 500 }}>Features</a>
            <a href="#about" style={{ textDecoration: "none", fontSize: "14px", color: colors.textSecondary, fontWeight: 500 }}>About</a>
            <a href="/app" style={{
              padding: `${spacing.sm} ${spacing.lg}`,
              background: colors.primary, color: "#fff",
              borderRadius: borderRadius.md, fontWeight: 600, fontSize: "14px",
              textDecoration: "none", transition: "background 0.15s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.background = colors.primary}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>


        <section style={{
          textAlign: "center",
          background: `linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #f0f4ff 100%)`,
          padding: "100px 24px 80px",
        }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{
              width: 72, height: 72, borderRadius: borderRadius.lg,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryHover})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto", marginBottom: spacing.lg,
            }}>
              <span style={{ color: "#fff", fontSize: "24px", fontWeight: 800 }}>CP</span>
            </div>
            <h1 style={{ fontSize: "38px", fontWeight: 800, color: colors.text, marginBottom: spacing.md, lineHeight: 1.2 }}>
              Manage Your Pressing<br />Business with Ease
            </h1>
            <p style={{ fontSize: "17px", color: colors.textSecondary, lineHeight: 1.7, marginBottom: spacing.xl, maxWidth: 520, margin: "0 auto 32px" }}>
              CleanPressing helps you track orders, manage clients, calculate prices, and monitor your revenue — all in one place.
            </p>
            <div style={{ display: "flex", gap: spacing.md, justifyContent: "center" }}>
              <a href="/app" style={{
                padding: `${spacing.md} ${spacing.xl}`,
                background: colors.primary, color: "#fff",
                borderRadius: borderRadius.md, fontWeight: 600, fontSize: "16px",
                textDecoration: "none", transition: "background 0.15s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = colors.primaryHover}
                onMouseLeave={(e) => e.currentTarget.style.background = colors.primary}
              >
                Launch App
              </a>
              <a href="#features" style={{
                padding: `${spacing.md} ${spacing.xl}`,
                background: "#fff", color: colors.text,
                borderRadius: borderRadius.md, fontWeight: 600, fontSize: "16px",
                textDecoration: "none", border: `1.5px solid ${colors.border}`,
              }}>
                Learn More
              </a>
            </div>
          </div>
        </section>

        <section id="features" style={{ padding: "80px 24px", background: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: colors.text, textAlign: "center", marginBottom: spacing.sm }}>
              Everything You Need
            </h2>
            <p style={{ fontSize: "15px", color: colors.textSecondary, textAlign: "center", marginBottom: spacing.xxl }}>
              Powerful features to streamline your pressing business
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.lg }}>
              {features.map((f, i) => (
                <div key={f.title} style={{
                  padding: spacing.lg, borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.border}`, transition: "box-shadow 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,99,235,0.08)"; e.currentTarget.style.borderColor = colors.primary + "40"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = colors.border; }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: borderRadius.md, background: colors.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: spacing.sm }}>
                    {featureIcons[i]}
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: colors.text, marginBottom: spacing.xs }}>{f.title}</h3>
                  <p style={{ fontSize: "14px", color: colors.textSecondary, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" style={{ padding: "80px 24px", background: colors.background }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: colors.text, marginBottom: spacing.md }}>
              About the Project
            </h2>
            <p style={{ fontSize: "15px", color: colors.textSecondary, lineHeight: 1.7, marginBottom: spacing.lg }}>
              CleanPressing is a student project developed for the ICT202 — Mobile Development course.
              Built by Group 9x (8 members, 4 pairs), the application demonstrates a complete
              workflow for managing a dry cleaning business using modern web technologies.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: spacing.xl, flexWrap: "wrap" }}>
              {["React 19", "TypeScript", "Vite", "React Router"].map((tech) => (
                <span key={tech} style={{
                  padding: `${spacing.xs} ${spacing.md}`, borderRadius: borderRadius.full,
                  background: "#fff", border: `1px solid ${colors.border}`,
                  fontSize: "13px", fontWeight: 600, color: colors.textSecondary,
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

      <footer style={{
        marginTop: "auto",
        padding: `${spacing.lg} 24px`, background: colors.text, color: colors.textLight,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: spacing.xl }}>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
            <div style={{
              width: 28, height: 28, borderRadius: borderRadius.sm,
              background: colors.primary, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontSize: "12px", fontWeight: 800 }}>CP</span>
            </div>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>CleanPressing</span>
          </div>
          <span style={{ fontSize: "13px", opacity: 0.5 }}>ICT202 — Groupe 9x</span>
          <span style={{ fontSize: "13px", opacity: 0.5 }}>Built with React, TypeScript & Vite</span>
        </div>
      </footer>

    </div>
  );
}
