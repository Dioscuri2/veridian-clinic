"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WhatsAppButton from "@/components/WhatsAppButton";

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
    { label: "Insights", href: "/blog" },
    { label: "Pricing", href: "/assessments" },
    { label: "About Us", href: anchor("#about") },
  ];

  return (
    <>
      <header className={`nav ${scrolled || !isHome ? "nav-scroll" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="logo-mark">
            <svg viewBox="0 0 40 40" fill="none" width="38" height="38">
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
          </div>
        )}

        <style>{`
          @media(min-width:900px){
            #nav-cta { display: inline-flex !important; }
          }
        `}</style>
      </header>

      {/* Floating WhatsApp button — appears on every page */}
      <WhatsAppButton />
    </>
  );
}
