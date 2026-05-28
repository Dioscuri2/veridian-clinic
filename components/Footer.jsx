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
      <a
        href="https://wa.me/447344290497?text=Hi%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Veridian%20Clinic."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          background: "#25D366",
          padding: "16px 24px",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span style={{ color: "white", fontWeight: 600, fontSize: ".95rem", letterSpacing: ".02em" }}>
          Prefer to speak to a person? Message us on WhatsApp
        </span>
      </a>
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
              Registered activities via{" "}
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
