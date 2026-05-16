import { useState } from "react";
import { colors, spacing, borderRadius } from "../styles/theme";
import Button from "./ui/Button";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  simple?: boolean;
  title?: string;
  message?: string;
}

export default function ConfirmModal({ open, onClose, onConfirm, simple, title, message }: ConfirmModalProps) {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setStep(1);
    setPassword("");
    onClose();
  };

  const handleFinal = () => {
    onConfirm();
    handleClose();
  };

  if (simple) {
    return (
      <div
        onClick={handleBackdrop}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <div style={{
          background: colors.surface, borderRadius: borderRadius.lg,
          padding: spacing.xl, width: 420, maxWidth: "90vw",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}>
          {step === 1 ? (
            <>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: colors.error, marginBottom: spacing.sm }}>
                {title ?? "Delete Order"}
              </h2>
              <p style={{ fontSize: "14px", color: colors.text, lineHeight: 1.5, marginBottom: spacing.md }}>
                {message ?? "This action cannot be undone."}
              </p>
              <p style={{ fontSize: "14px", color: colors.text, lineHeight: 1.5, marginBottom: spacing.lg }}>
                Are you sure you want to continue?
              </p>
              <div style={{ display: "flex", gap: spacing.sm, justifyContent: "flex-end" }}>
                <Button variant="ghost" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={() => setStep(2)}>I understand, continue</Button>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: colors.error, marginBottom: spacing.sm }}>
                Final Confirmation
              </h2>
              <p style={{ fontSize: "14px", color: colors.text, lineHeight: 1.5, marginBottom: spacing.lg }}>
                This action cannot be undone. Confirm deletion?
              </p>
              <div style={{ display: "flex", gap: spacing.sm, justifyContent: "flex-end" }}>
                <Button variant="ghost" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={handleFinal}>Delete</Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div style={{
        background: colors.surface, borderRadius: borderRadius.lg,
        padding: spacing.xl, width: 420, maxWidth: "90vw",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        {step === 1 ? (
          <>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: colors.error, marginBottom: spacing.sm }}>
              {title ?? "Clear All Data"}
            </h2>
            <p style={{ fontSize: "14px", color: colors.text, lineHeight: 1.5, marginBottom: spacing.md }}>
              {message ?? "This will permanently delete all orders from the database."}
            </p>
            <p style={{ fontSize: "14px", color: colors.text, lineHeight: 1.5, marginBottom: spacing.lg }}>
              Are you sure you want to continue?
            </p>
            <div style={{ display: "flex", gap: spacing.sm, justifyContent: "flex-end" }}>
              <Button variant="ghost" onClick={handleClose}>Cancel</Button>
              <Button variant="danger" onClick={() => setStep(2)}>I understand, continue</Button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: colors.error, marginBottom: spacing.sm }}>
              Final Confirmation
            </h2>
            <p style={{ fontSize: "14px", color: colors.text, lineHeight: 1.5, marginBottom: spacing.md }}>
              Type <strong style={{ fontFamily: "monospace", background: colors.errorBg, padding: "2px 6px", borderRadius: borderRadius.sm }}>sudo delete</strong> below to confirm:
            </p>
            <input
              autoFocus
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && password === "sudo delete") handleFinal(); }}
              placeholder="type sudo delete"
              style={{
                width: "100%", padding: spacing.sm, marginBottom: spacing.lg,
                border: `1.5px solid ${password === "sudo delete" ? colors.error : colors.border}`,
                borderRadius: borderRadius.md, fontSize: "14px", outline: "none",
                boxSizing: "border-box",
                fontFamily: "monospace",
              }}
            />
            <div style={{ display: "flex", gap: spacing.sm, justifyContent: "flex-end" }}>
              <Button variant="ghost" onClick={handleClose}>Cancel</Button>
              <Button
                variant="danger"
                disabled={password !== "sudo delete"}
                onClick={handleFinal}
              >
                Delete Everything
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
