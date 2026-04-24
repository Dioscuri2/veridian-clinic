"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Shield() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 1.2L2 4.2v3.5c0 2.8 2.1 5 5.5 5.8 3.4-.8 5.5-3 5.5-5.8V4.2z" fill="var(--fo)" stroke="var(--go)" strokeWidth=".7"/>
      <path d="M5 7.5l1.7 1.7 2.8-2.8" stroke="var(--go)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobOpen(false); }, [pathname]);

  const anchor = (hash) => isHome ? hash : `/${hash}`;

  const navLinks = [
    { label: "How It Works", href: anchor("#process") },
    { label: "Metabolic Quiz", href: "/metabolic-quiz" },
    { label: "About", href: anchor("#about") },
  ];

  return (
    <header className={`nav ${scrolled || !isHome ? "nav-scroll" : ""}`}>
      <div style={{ padding: "8px 24px", textAlign: "center", fontSize: ".66rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--fo)", borderBottom: "1px solid rgba(0,0,0,.06)", background: "rgba(246,241,232,.92)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
        <svg width="11" height="11" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
          <path d="M7.5 1.2L2 4.2v3.5c0 2.8 2.1 5 5.5 5.8 3.4-.8 5.5-3 5.5-5.8V4.2z" fill="var(--fo)" stroke="var(--go)" strokeWidth=".7"/>
          <path d="M5 7.5l1.7 1.7 2.8-2.8" stroke="var(--go)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>CQC regulated services &nbsp;·&nbsp; GP-led metabolic and longevity care</span>
      </div>
      <div className="nav-inner">
        <Link href="/" className="logo-mark">
          <svg viewBox="0 0 40 40" fill="none" width="34" height="34">
            <circle cx="14" cy="20" r="12" stroke="var(--fo)" strokeWidth="3.2" fill="none"/>
            <circle cx="26" cy="20" r="12" stroke="var(--go)" strokeWidth="3.2" fill="none"/>
          </svg>
          <div>
            <p className="logo-text-main">VERIDIAN</p>
            <p className="logo-text-sub">Clinic</p>
          </div>
        </Link>

        <nav className="nav-links">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="nav-link"
              style={{ color: pathname === href ? "var(--fo)" : undefined }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ display: "none", alignItems: "center", gap: 6, marginRight: 8 }} className="nav-trust">
            <Shield/>
            <span style={{ fontSize: ".66rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--fo)" }}>CQC Regulated Services</span>
          </div>
          <Link href="/book?tier=discovery" className="btn btn-fo" id="nav-cta"
            style={{ padding: "10px 18px", fontSize: ".78rem", display: "none" }}>
            Book Discovery Call →
          </Link>
          <button className="mob-btn" onClick={() => setMobOpen(!mobOpen)} aria-label={mobOpen ? "Close menu" : "Open menu"} aria-expanded={mobOpen} aria-controls="mobile-navigation-menu">
            {mobOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobOpen && (
        <div className="mob-menu" id="mobile-navigation-menu">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="mob-link">{label}</Link>
          ))}
          <Link href="/book?tier=discovery" className="btn btn-fo btn-full" style={{ marginTop: 16 }}>
            Book Discovery Call →
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,.07)" }}>
            <Shield/>
            <span style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--fo)" }}>CQC Regulated Services · GP-Led</span>
          </div>
        </div>
      )}

      <style>{`
        @media(min-width:900px){
          #nav-cta { display: inline-flex !important; }
          .nav-trust { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
