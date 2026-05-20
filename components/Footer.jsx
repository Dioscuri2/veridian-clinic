"use client";
import { useState, lazy, Suspense } from "react";
import Link from "next/link";

const LegalModal = lazy(() => import("./LegalModal"));

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

const footerLinkStyle = {
  fontSize: ".88rem",
  color: "rgba(246,241,232,.65)",
  textDecoration: "underline",
  textDecorationColor: "rgba(246,241,232,.25)",
};

const footerBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontFamily: "inherit",
  fontSize: ".88rem",
  color: "rgba(246,241,232,.65)",
  textDecoration: "underline",
  textDecorationColor: "rgba(246,241,232,.25)",
};

export default function Footer() {
  const [modal, setModal] = useState(null); // 'terms' | 'privacy' | null

  return (
    <>
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
            <p style={{ margin: "0 0 12px" }}>
              CQC regulated activities provided by{" "}
              <a href="https://thanksdoc.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(246,241,232,.65)", textDecoration: "underline", textDecorationColor: "rgba(246,241,232,.25)" }}>
                ThanksDoc
              </a>
              .
            </p>
          </div>

          {/* Legal links */}
          <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", marginBottom: 22 }}>
            <button style={footerBtnStyle} onClick={() => setModal("privacy")}>
              Privacy Policy
            </button>
            <Link href="/cookies" style={footerLinkStyle}>
              Cookie Policy
            </Link>
            <button style={footerBtnStyle} onClick={() => setModal("terms")}>
              Terms of Service
            </button>
            <Link href="/contact" style={footerLinkStyle}>
              Contact Us
            </Link>
          </div>

          {/* Contact line */}
          <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.5)", marginBottom: 8 }}>
            General enquiries:{" "}
            <a href="mailto:support@veridianclinic.com" style={{ color: "rgba(246,241,232,.7)", textDecoration: "underline" }}>
              support@veridianclinic.com
            </a>
            <span style={{ margin: "0 10px", opacity: 0.3 }}>·</span>
            <a href="https://wa.me/447344290497?text=Hi%2C%20I%20found%20Veridian%20Clinic%20online%20and%20I%27d%20like%20to%20find%20out%20more." target="_blank" rel="noopener noreferrer" style={{ color: "rgba(246,241,232,.7)", textDecoration: "underline" }}>
              WhatsApp
            </a>
          </p>

          {/* Complaints line */}
          <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.45)", marginBottom: 10 }}>
            Clinical complaints:{" "}
            <a href="mailto:complaints@thanksdoc.co.uk" style={{ color: "rgba(246,241,232,.55)", textDecoration: "underline" }}>
              complaints@thanksdoc.co.uk
            </a>
          </p>

          <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.4)" }}>
            © {new Date().getFullYear()} Veridian Clinic. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Legal modals — lazy loaded, zero bundle cost until needed */}
      {modal && (
        <Suspense fallback={null}>
          <LegalModal type={modal} onClose={() => setModal(null)} />
        </Suspense>
      )}
    </>
  );
}
