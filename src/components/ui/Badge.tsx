import { colors, borderRadius, spacing } from "../../styles/theme";
import { statusConfig } from "../../styles/theme";

interface BadgeProps {
  status: string;
  label?: string;
}

export default function Badge({ status, label }: BadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    color: colors.textSecondary,
    bg: colors.background,
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.xs,
        padding: `${spacing.xs} ${spacing.sm}`,
        borderRadius: borderRadius.full,
        fontSize: "12px",
        fontWeight: 600,
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.color}20`,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: config.color,
        }}
      />
      {label ?? config.label}
    </span>
  );
}
