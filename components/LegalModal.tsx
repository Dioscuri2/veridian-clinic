"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

const hd: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 600,
  color: "#2c2a26",
  margin: "24px 0 8px",
  letterSpacing: "0.01em",
};
const p: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#5a534a",
  lineHeight: 1.9,
  margin: "0 0 12px",
};
const ul: React.CSSProperties = {
  paddingLeft: "1.3em",
  margin: "0 0 12px",
  color: "#5a534a",
  fontSize: "0.9rem",
  lineHeight: 1.9,
};

const tdLink = (href: string, label: string) => (
  <div style={{ textAlign: "center", padding: "32px 24px" }}>
    <p style={{ ...p, marginBottom: 8 }}>
      Registered clinical activities at Veridian Clinic are delivered via ThanksDoc (Endura Health Ltd).
      Their {label} is published on their website and kept up to date there.
    </p>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        marginTop: 16,
        padding: "12px 28px",
        background: "#2c2a26",
        color: "#f6f1e8",
        fontSize: "0.88rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textDecoration: "none",
        borderRadius: 4,
      }}
    >
      View ThanksDoc {label} →
    </a>
    <p style={{ ...p, fontSize: "0.78rem", color: "#8a8278", marginTop: 16 }}>
      Opens on thanksdoc.co.uk in a new tab.
    </p>
  </div>
);

const THANKSDOC_TERMS = tdLink("https://thanksdoc.co.uk/terms-and-conditions/", "Terms & Conditions");
const THANKSDOC_PRIVACY = tdLink("https://thanksdoc.co.uk/privacy-policy/", "Privacy Policy");

export default function LegalModal({
  type,
  onClose,
}: {
  type: "terms" | "privacy";
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const isTerms = type === "terms";
  const title = isTerms ? "Terms & Conditions" : "Privacy Policy";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`ThanksDoc ${title}`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(13,11,8,0.82)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#f6f1e8",
          width: "100%",
          maxWidth: "820px",
          height: "92vh",
          borderRadius: "16px 16px 0 0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 -24px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#2c2a26",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span
                style={{
                  background: "#c8a84b",
                  color: "#2c2a26",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                }}
              >
                Powered by ThanksDoc
              </span>
            </div>
            <p style={{ color: "#f6f1e8", fontSize: "1rem", fontWeight: 600, margin: 0 }}>
              {title}
            </p>
            <p style={{ color: "rgba(246,241,232,0.5)", fontSize: "0.75rem", margin: "3px 0 0" }}>
              Registered clinical activities via ThanksDoc (Endura Health Ltd)
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "rgba(246,241,232,0.1)",
              border: "1px solid rgba(246,241,232,0.2)",
              color: "#f6f1e8",
              width: 36,
              height: 36,
              borderRadius: "50%",
              fontSize: "1.1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 48px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {isTerms ? THANKSDOC_TERMS : THANKSDOC_PRIVACY}
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            padding: "14px 28px",
            borderTop: "1px solid rgba(44,42,38,0.12)",
            background: "#ede8df",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.78rem", color: "#8a8278" }}>
            Complaints regarding regulated clinical care:{" "}
            <a href="mailto:complaints@thanksdoc.co.uk" style={{ color: "#2c2a26" }}>
              complaints@thanksdoc.co.uk
            </a>
          </p>
          <button
            onClick={onClose}
            style={{
              background: "#2c2a26",
              color: "#f6f1e8",
              border: "none",
              padding: "9px 22px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
