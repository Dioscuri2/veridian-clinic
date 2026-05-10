"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("vc_cookie_consent");
    if (!stored) setVisible(true);
  }, []);

  function grant() {
    localStorage.setItem("vc_cookie_consent", "granted");
    window.dispatchEvent(new CustomEvent("consentUpdated", { detail: "granted" }));
    setVisible(false);
  }

  function deny() {
    localStorage.setItem("vc_cookie_consent", "denied");
    window.dispatchEvent(new CustomEvent("consentUpdated", { detail: "denied" }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        background: "#1a1814",
        borderTop: "1px solid rgba(200,168,75,.3)",
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        flexWrap: "wrap",
      }}
    >
      <p style={{
        fontSize: ".82rem",
        color: "rgba(246,241,232,.72)",
        lineHeight: 1.75,
        margin: 0,
        maxWidth: 700,
        flex: 1,
      }}>
        We use essential cookies to make this site work. With your consent, we also use Google Analytics and Meta Pixel to understand how visitors use the site.{" "}
        <Link href="/cookies" style={{ color: "rgba(200,168,75,.9)", textDecoration: "underline" }}>
          Cookie policy
        </Link>
      </p>
      <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
        <button
          onClick={deny}
          style={{
            background: "transparent",
            border: "1px solid rgba(246,241,232,.22)",
            color: "rgba(246,241,232,.6)",
            fontSize: ".78rem",
            padding: "9px 18px",
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: ".04em",
            lineHeight: 1,
          }}
        >
          Reject non-essential
        </button>
        <button
          onClick={grant}
          style={{
            background: "#c8a84b",
            border: "1px solid #c8a84b",
            color: "#1a1814",
            fontSize: ".78rem",
            fontWeight: 700,
            padding: "9px 18px",
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: ".06em",
            lineHeight: 1,
          }}
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
