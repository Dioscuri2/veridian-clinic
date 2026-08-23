import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "Your Free Guide Is Ready | Veridian Clinic",
  robots: { index: false },
};

export default function GuideThankyouPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)", background: "var(--iv)" }}>

        {/* Download section */}
        <section className="sec bg-fo" style={{ paddingTop: 64, paddingBottom: 72 }}>
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>

            <div style={{ width: 72, height: 72, margin: "0 auto 24px", borderRadius: "50%", background: "rgba(200,168,75,.15)", border: "1.5px solid var(--go)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M7 15.5l5 5L23 10" stroke="#c8a84b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p className="lbl" style={{ color: "var(--go)" }}>Your guide is ready</p>
            <div className="rule rule-c" style={{ background: "var(--go)" }} />
            <h1 className="cg" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 16 }}>
              The 21-Day Metabolic Reset Guide
            </h1>
            <p style={{ fontSize: ".94rem", color: "rgba(246,241,232,.65)", lineHeight: 1.9, maxWidth: 520, margin: "0 auto 32px" }}>
              Download your guide below. Save it somewhere easy to find you'll want to refer back to specific chapters as you work through the 21-day reset.
            </p>

            <a
              href="/api/guide-download?tier=guide"
              className="btn btn-go"
              style={{ padding: "16px 48px", fontSize: ".95rem", display: "inline-block" }}
              download="Veridian-Metabolic-Reset-Guide.pdf"
            >
              Download Your Free Guide (PDF) ↓
            </a>

            <p style={{ marginTop: 14, fontSize: ".74rem", color: "rgba(246,241,232,.35)", lineHeight: 1.7 }}>
              GP-authored · Eight chapters · 21-day plan included
            </p>
          </div>
        </section>

        {/* Upsell section */}
        <section className="sec bg-iv" style={{ paddingTop: 64, paddingBottom: 72 }}>
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sh text-center" style={{ marginBottom: 40 }}>
              <p className="lbl">Your next step</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">See what's actually driving your metabolic drift.</h2>
              <p className="sh-body">The guide gives you the framework. Clinical work gives you your specific picture your markers, your drivers, your plan.</p>
            </div>

            <div className="g2">
              {/* Discovery Call */}
              <div className="card" style={{ background: "var(--fo)" }}>
                <p style={{ fontSize: ".68rem", color: "var(--go2)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Most popular</p>
                <h3 className="cg" style={{ fontSize: "1.3rem", fontWeight: 500, color: "rgba(246,241,232,.95)", lineHeight: 1.3, marginBottom: 10 }}>
                  Discovery Core
                </h3>
                <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.72)", lineHeight: 1.85, marginBottom: 20 }}>
                  30-minute call with Dr Taiwo. Review your symptoms, history, and goals then get a personalised plan for what to investigate next.
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: 400, color: "var(--go)", lineHeight: 1 }}>£127</span>
                  <span style={{ fontSize: ".8rem", color: "rgba(246,241,232,.45)" }}>30-minute GP-led call</span>
                </div>
                <Link href="/book?tier=discovery" className="btn btn-go" style={{ display: "block", textAlign: "center" }}>
                  Book My Discovery Core →
                </Link>
              </div>

              {/* Blood tests */}
              <div className="card">
                <p className="lbl" style={{ marginBottom: 8 }}>Full clinical picture</p>
                <h3 className="cg" style={{ fontSize: "1.3rem", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, marginBottom: 10 }}>
                  Metabolic Blood Panel
                </h3>
                <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 20 }}>
                  9-marker blood panel with GP clinical interpretation and a written action plan. See exactly what your biology is doing not just whether it's "normal".
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: 400, color: "var(--fo)", lineHeight: 1 }}>£595</span>
                  <span style={{ fontSize: ".8rem", color: "var(--sl3)" }}>Metabolic Baseline</span>
                </div>
                <Link href="/book?tier=baseline" className="btn btn-fo" style={{ display: "block", textAlign: "center" }}>
                  Book the Baseline →
                </Link>
              </div>
            </div>

            <p style={{ textAlign: "center", marginTop: 28, fontSize: ".8rem", color: "var(--sl3)" }}>
              Questions? <a href="mailto:support@veridianclinic.com" style={{ color: "var(--fo)" }}>support@veridianclinic.com</a>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
