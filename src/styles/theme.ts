export const colors = {
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  primaryLight: "#eff6ff",
  navbar: "#ffffff",
  background: "#f0f4ff",
  surface: "#ffffff",
  text: "#1e293b",
  textSecondary: "#64748b",
  textLight: "#94a3b8",
  border: "#dbe4f0",
  success: "#16a34a",
  successBg: "#f0fdf4",
  warning: "#d97706",
  warningBg: "#fffbeb",
  error: "#dc2626",
  errorBg: "#fef2f2",
  info: "#2563eb",
  infoBg: "#eff6ff",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
};

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  full: "9999px",
};

export const shadows = {
  sm: "0 1px 2px rgba(37,99,235,0.05)",
  md: "0 4px 6px -1px rgba(37,99,235,0.08)",
  lg: "0 10px 15px -3px rgba(37,99,235,0.1)",
};

export const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "En attente", color: colors.warning, bg: colors.warningBg },
  processing: { label: "En cours", color: colors.info, bg: colors.infoBg },
  completed: { label: "Terminé", color: colors.success, bg: colors.successBg },
  delivered: { label: "Livré", color: colors.success, bg: colors.successBg },
  cancelled: { label: "Annulé", color: colors.error, bg: colors.errorBg },
};
