import { colors, borderRadius, spacing, shadows } from "../../styles/theme";
import type { CSSProperties } from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export default function Card({ children, title, style, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: colors.surface,
        borderRadius: borderRadius.lg,
        boxShadow: shadows.md,
        padding: spacing.lg,
        ...style,
      }}
    >
      {title && (
        <h3
          style={{
            marginBottom: spacing.md,
            color: colors.text,
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
