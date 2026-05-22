import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";
import PeriGuideUpsells from "./PeriGuideUpsells";

export const metadata: Metadata = {
  title: "Your Free Guide Is Ready | Veridian Clinic",
  robots: { index: false },
};

export default function PeriGuideThankyouPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)", background: "var(--iv)" }}>

        {/* ── Download section ── */}
        <section className="sec bg-fo" style={{ paddingTop: 64, paddingBottom: 72 }}>
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>

            {/* Tick */}
            <div style={{ width: 72, height: 72, margin: "0 auto 24px", borderRadius: "50%", background: "rgba(200,168,75,.15)", border: "1.5px solid var(--go)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M7 15.5l5 5L23 10" stroke="#c8a84b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p className="lbl" style={{ color: "var(--go)" }}>Your guide is ready</p>
            <div className="rule rule-c" style={{ background: "var(--go)" }} />
            <h1 className="cg" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 16 }}>
              The Perimenopause Reset Guide
            </h1>
            <p style={{ fontSize: ".94rem", color: "rgba(246,241,232,.65)", lineHeight: 1.9, maxWidth: 520, margin: "0 auto 32px" }}>
              Download your guide below. Save it somewhere easy to find — you'll want to refer back to specific chapters as you work through the six-week reset.
            </p>

            <a
              href="/api/peri-guide-download"
              className="btn btn-go"
              style={{ padding: "16px 48px", fontSize: ".95rem", display: "inline-block" }}
              download="Veridian-Perimenopause-Reset-Guide.pdf"
            >
              Download Your Free Guide (PDF) ↓
            </a>

            <p style={{ marginTop: 14, fontSize: ".74rem", color: "rgba(246,241,232,.35)", lineHeight: 1.7 }}>
              GP-authored · Eight chapters · Symptom tracker included
            </p>
          </div>
        </section>

        {/* ── Recommended next step — upsell/downsell ── */}
        <section className="sec bg-iv" style={{ paddingTop: 64, paddingBottom: 72 }}>
          <PeriGuideUpsells />
        </section>

      </main>
      <Footer />
    </>
  );
}
