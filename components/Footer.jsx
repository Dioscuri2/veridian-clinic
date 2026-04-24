"use client";
import { useState } from "react";
import Link from "next/link";

function PatientPortalLink() {
  const [showMsg, setShowMsg] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setShowMsg(v => !v)}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontSize: ".92rem", color: "rgba(246,241,232,.75)", textDecoration: "underline",
          textDecorationColor: "rgba(246,241,232,.25)", fontFamily: "inherit",
        }}
      >
        Patient Portal
      </button>
      {showMsg && (
        <span style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
          transform: "translateX(-50%)",
          background: "var(--fo)", color: "var(--sl)", fontSize: ".78rem",
          fontWeight: 600, letterSpacing: ".06em", padding: "6px 12px",
          whiteSpace: "nowrap", pointerEvents: "none",
        }}>
          Coming soon
        </span>
      )}
    </span>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "var(--sl)", padding: "56px 24px 40px", textAlign: "center" }}>
      <div className="wrap" style={{ maxWidth: 980 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
          <svg viewBox="0 0 40 40" fill="none" width="30" height="30">
            <circle cx="14" cy="20" r="12" stroke="rgba(200,168,75,.7)" strokeWidth="3.2" fill="none"/>
            <circle cx="26" cy="20" r="12" stroke="rgba(246,241,232,.45)" strokeWidth="3.2" fill="none"/>
          </svg>
          <span className="cg" style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: ".22em", color: "rgba(246,241,232,.85)", textTransform: "uppercase" }}>
            Veridian Clinic
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", marginBottom: 28 }}>
          <Link href="/assessments" style={{ fontSize: ".92rem", color: "rgba(246,241,232,.75)", textDecoration: "underline", textDecorationColor: "rgba(246,241,232,.25)" }}>
            Assessments
          </Link>
          <Link href="/book?tier=discovery" style={{ fontSize: ".92rem", color: "rgba(246,241,232,.75)", textDecoration: "underline", textDecorationColor: "rgba(246,241,232,.25)" }}>
            Book Now
          </Link>
          <Link href="/metabolic-quiz" style={{ fontSize: ".92rem", color: "rgba(246,241,232,.75)", textDecoration: "underline", textDecorationColor: "rgba(246,241,232,.25)" }}>
            Metabolic Quiz
          </Link>
          <PatientPortalLink />
        </div>

        {/* Body text */}
        <div style={{ fontSize: ".88rem", color: "rgba(246,241,232,.65)", lineHeight: 2, maxWidth: 720, margin: "0 auto 24px" }}>
          <p style={{ margin: "0 0 12px" }}>
            Veridian Clinic provides health optimisation and longevity services.
            Our services complement, but do not replace, NHS care.
          </p>
          <p style={{ margin: "0 0 12px", color: "rgba(246,241,232,.8)", fontWeight: 500 }}>
            CQC regulated services provided by{" "}
            <a href="https://thanksdoc.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(246,241,232,.8)", textDecoration: "underline", textDecorationColor: "rgba(246,241,232,.3)" }}>
              Thanksdoc
            </a>
          </p>
          <p style={{ margin: "0 0 10px" }}>
            Veridian Clinic is a trading name of Olympus Premium Health Ltd.
          </p>
          <p style={{ margin: "0 0 10px" }}>
            Registered Business Address: 82A James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, England, IP28 7DE.
          </p>
          <p style={{ margin: 0 }}>
            Company Registration Number: 13621708.
          </p>
        </div>

        {/* Legal links */}
        <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Cookie Policy", href: "/cookies" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Contact Us", href: "/contact" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} style={{ fontSize: ".88rem", color: "rgba(246,241,232,.65)", textDecoration: "underline", textDecorationColor: "rgba(246,241,232,.25)" }}>
              {label}
            </Link>
          ))}
        </div>

        <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.4)" }}>
          © {new Date().getFullYear()} Veridian Clinic, a trading name of Olympus Premium Health Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
