import { colors, borderRadius, spacing } from "../../styles/theme";
import type { CSSProperties } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<Variant, CSSProperties> = {
  primary: {
    backgroundColor: colors.primary,
    color: "#fff",
    border: "none",
  },
  secondary: {
    backgroundColor: colors.text,
    color: "#fff",
    border: "none",
  },
  outline: {
    backgroundColor: "transparent",
    color: colors.primary,
    border: `1.5px solid ${colors.primary}`,
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.textSecondary,
    border: "none",
  },
  danger: {
    backgroundColor: colors.error,
    color: "#fff",
    border: "none",
  },
};

const sizeStyles: Record<Size, CSSProperties> = {
  sm: { padding: `${spacing.xs} ${spacing.sm}`, fontSize: "13px" },
  md: { padding: `${spacing.sm} ${spacing.md}`, fontSize: "14px" },
  lg: { padding: `${spacing.md} ${spacing.lg}`, fontSize: "16px" },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  style,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        borderRadius: borderRadius.md,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.15s ease",
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === "primary") e.currentTarget.style.backgroundColor = colors.primaryHover;
          if (variant === "outline") e.currentTarget.style.backgroundColor = colors.infoBg;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          if (variant === "primary") e.currentTarget.style.backgroundColor = colors.primary;
          if (variant === "outline") e.currentTarget.style.backgroundColor = "transparent";
        }
      }}
    >
      {children}
    </button>
  );
}
