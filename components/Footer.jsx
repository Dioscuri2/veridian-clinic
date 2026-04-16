"use client";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────
 Footer — shared across all Veridian pages
 ───────────────────────────────────────────────────────────────── */

export default function Footer() {
 return (
 <footer style={{ background: "var(--sl)", padding: "52px 24px", textAlign: "center" }}>
 <div className="wrap" style={{ maxWidth: 980 }}>
 <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
 <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
 <circle cx="14" cy="20" r="12" stroke="rgba(200,168,75,.5)" strokeWidth="3.2" fill="none"/>
 <circle cx="26" cy="20" r="12" stroke="rgba(246,241,232,.2)" strokeWidth="3.2" fill="none"/>
 </svg>
 <span className="cg" style={{ fontSize: ".95rem", fontWeight: 500, letterSpacing: ".2em", color: "rgba(246,241,232,.35)", textTransform: "uppercase" }}>
 Veridian Clinic
 </span>
 </div>

 <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 20 }}>
 {[
 { label: "Assessments", href: "/assessments" },
 { label: "Book Now", href: "/book" },
 { label: "Metabolic Quiz", href: "/metabolic-age" },
 { label: "Patient Portal", href: "/intake" },
 ].map(({ label, href }) => (
 <Link key={label} href={href} className="footer-link" style={{ color: "rgba(246,241,232,.4)" }}>{label}</Link>
 ))}
 </div>

 <div style={{ fontSize: ".74rem", color: "rgba(246,241,232,.22)", lineHeight: 1.95, maxWidth: 720, margin: "0 auto 18px" }}>
 <p style={{ margin: "0 0 10px" }}>
 Veridian Clinic is a CQC-registered private healthcare provider. All clinical services are led by qualified GMC-registered doctors.
 Our services complement, but do not replace, NHS care.
 </p>
 <p style={{ margin: "0 0 8px", color: "rgba(246,241,232,.34)" }}>
 Veridian Clinic is a trading name of Olympus Premium Health Ltd.
 </p>
 <p style={{ margin: "0 0 8px" }}>
 Registered Business Address: 82A James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, England, IP28 7DE.
 </p>
 <p style={{ margin: 0 }}>
 Company Registration Number: 13621708.
 </p>
 </div>

 <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
 {[
 { label: "Privacy Policy", href: "/privacy" },
 { label: "Cookie Policy", href: "/cookies" },
 { label: "Terms of Service", href: "#" },
 { label: "CQC Registration", href: "#" },
 { label: "Contact Us", href: "#" },
 ].map(({ label, href }) => (
 <Link key={label} href={href} className="footer-link">{label}</Link>
 ))}
 </div>

 <p style={{ fontSize: ".68rem", color: "rgba(246,241,232,.14)" }}>
 © {new Date().getFullYear()} Veridian Clinic, a trading name of Olympus Premium Health Ltd. All rights reserved.
 </p>
 </div>
 </footer>
 );
}
