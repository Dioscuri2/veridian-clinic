"use client";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────
 Footer — shared across all Veridian pages
 ───────────────────────────────────────────────────────────────── */

export default function Footer() {
 return (
 <footer style={{ background: "var(--sl)", padding: "52px 24px", textAlign: "center" }}>
 <div className="wrap">
 <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 22 }}>
 <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
 <circle cx="14" cy="20" r="12" stroke="rgba(200,168,75,.5)" strokeWidth="3.2" fill="none"/>
 <circle cx="26" cy="20" r="12" stroke="rgba(246,241,232,.2)" strokeWidth="3.2" fill="none"/>
 </svg>
 <span className="cg" style={{ fontSize: ".95rem", fontWeight: 500, letterSpacing: ".2em", color: "rgba(246,241,232,.35)", textTransform: "uppercase" }}>
 Veridian Clinic
 </span>
 </div>

 <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", marginBottom: 20 }}>
 {[
 { label: "Assessments", href: "/assessments" },
 { label: "Book Now", href: "/book" },
 { label: "Metabolic Quiz", href: "/metabolic-age" },
 { label: "Patient Portal", href: "/intake" },
 ].map(({ label, href }) => (
 <Link key={label} href={href} className="footer-link" style={{ color: "rgba(246,241,232,.4)" }}>{label}</Link>
 ))}
 </div>

 <p style={{ fontSize: ".74rem", color: "rgba(246,241,232,.22)", lineHeight: 1.95, maxWidth: 560, margin: "0 auto 18px" }}>
 Veridian Clinic is a CQC-registered private healthcare provider. All clinical services are led by qualified GMC-registered doctors.
 Our services complement, but do not replace, NHS care. TZA Inc. Limited.
 </p>

 <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
 {["Privacy Policy", "Terms of Service", "CQC Registration", "Contact Us"].map(l => (
 <a key={l} href="#" className="footer-link">{l}</a>
 ))}
 </div>

 <p style={{ fontSize: ".68rem", color: "rgba(246,241,232,.14)" }}>
 © {new Date().getFullYear()} Veridian Clinic (TZA Inc. Limited). All rights reserved.
 </p>
 </div>
 </footer>
 );
}
