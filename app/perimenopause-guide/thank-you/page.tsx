import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

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

        {/* ── Recommended next step ── */}
        <section className="sec bg-iv" style={{ paddingTop: 64, paddingBottom: 72 }}>
          <div className="wrap" style={{ maxWidth: 760 }}>

            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="lbl">Recommended next step</p>
              <div className="rule rule-c" />
              <h2 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}>
                Know your numbers before you begin.
              </h2>
              <p style={{ fontSize: "clamp(.95rem,2vw,1.05rem)", color: "var(--sl2)", lineHeight: 1.9, maxWidth: 580, margin: "0 auto" }}>
                The guide explains what to test and why. The Advanced Health Panel gives you the actual numbers — so you can reset with a complete picture of where your hormones, metabolism, and nutritional status sit right now.
              </p>
            </div>

            {/* ── Upsell 1: Blood Panel ── */}
            <div className="card" style={{ background: "var(--fo)", marginBottom: 20, padding: "clamp(24px,5vw,40px)" }}>
              <p style={{ fontSize: ".68rem", color: "var(--go)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
                Veridian Women's Advanced Health Panel
              </p>
              <h3 className="cg" style={{ fontSize: "clamp(1.3rem,3vw,2rem)", fontWeight: 500, color: "rgba(246,241,232,.95)", lineHeight: 1.25, marginBottom: 12 }}>
                150+ markers. GP-reviewed report. Know your baseline.
              </h3>
              <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.68)", lineHeight: 1.9, marginBottom: 20 }}>
                The most comprehensive female hormonal and metabolic panel available — covering oestradiol, progesterone, FSH, LH, testosterone, full thyroid including antibodies, HbA1c, insulin, vitamin D, ferritin, B12, cardiovascular risk markers, inflammation, and more. You receive a GP-reviewed digital report with your personalised next steps within 72 hours of your blood draw.
              </p>

              {/* What's included compact list */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", marginBottom: 24 }}>
                {["Hormones: Oestradiol, Progesterone, FSH, LH", "Testosterone (Total & Free) + DHEA-S", "Full Thyroid: TSH, fT3, fT4 + Antibodies", "Metabolic: HbA1c, Insulin, C-Peptide, Leptin", "Cardiovascular: Full lipid + Apolipoproteins", "Nutrition: Vitamin D, B12, Folate, Ferritin", "Inflammation: hsCRP + Immunoglobulins", "Tumour marker: CA-125 · Allergy: IgE"].map(item => (
                  <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--go)", fontWeight: 700, fontSize: ".8rem", flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: ".8rem", color: "rgba(246,241,232,.62)", lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Phlebotomy note */}
              <div style={{ background: "rgba(200,168,75,.1)", border: "1px solid rgba(200,168,75,.22)", padding: "12px 16px", marginBottom: 22 }}>
                <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.65)", lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: "var(--go)" }}>Blood draw:</strong> Attend your nearest Randox Health clinic — London, Manchester, Birmingham and nationwide. Clinic phlebotomy fee: <strong style={{ color: "var(--go)" }}>£30</strong>, paid on the day at Randox. This is a clinic visit, not a home visit or postal kit.
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <Link href="/book?tier=perimenopause-panel" className="btn btn-go" style={{ display: "inline-block" }}>
                  Book the Advanced Health Panel — £295 →
                </Link>
                <p style={{ fontSize: ".74rem", color: "rgba(246,241,232,.38)", margin: 0, lineHeight: 1.6 }}>
                  Panel: £295 · Blood draw: £30 at Randox (paid on the day)
                </p>
              </div>
            </div>

            {/* ── Upsell 2: Virtual Clinical Review ── */}
            <div className="card" style={{ border: "1px solid rgba(200,168,75,.2)", background: "rgba(44,42,38,.04)", padding: "clamp(24px,5vw,40px)" }}>
              <p style={{ fontSize: ".68rem", color: "var(--sl3)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
                Virtual Clinical Review — Video Call
              </p>
              <h3 className="cg" style={{ fontSize: "clamp(1.2rem,2.8vw,1.7rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, marginBottom: 6 }}>
                Book a Clinical Review with Dr Tosin
              </h3>
              <p style={{ fontSize: ".9rem", color: "var(--sl3)", marginBottom: 20 }}>
                <strong style={{ color: "var(--sl)", fontSize: "1.1rem" }}>£97</strong>
                <span style={{ marginLeft: 10, textDecoration: "line-through", color: "var(--sl3)" }}>£195</span>
                <span style={{ marginLeft: 10, fontSize: ".8rem" }}>— guide reader rate</span>
              </p>

              <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 20 }}>
                A 30-minute one-to-one video call with Dr Tosin to work through your symptoms, review your blood results (if you have them), and map out your personal clinical pathway. This is a <strong>virtual appointment via video call</strong> — not a face-to-face clinic visit.
              </p>

              <ul style={{ margin: "0 0 24px 0", padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
                {[
                  "Full hormonal & metabolic risk assessment",
                  "30-minute 1:1 with Dr Tosin (video call)",
                  "Your treatment options explained — including HRT",
                  "What to manage and live with now — practical, realistic guidance",
                  "Personalised blood test recommendations",
                ].map(item => (
                  <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--go)", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/book?tier=discovery-quiz" className="btn btn-fo" style={{ padding: "14px 32px", fontSize: ".92rem", display: "inline-block" }}>
                Book Your Virtual Clinical Review — £97 →
              </Link>
              <p style={{ marginTop: 10, fontSize: ".72rem", color: "var(--sl3)", lineHeight: 1.6 }}>
                You'll receive booking confirmation and your video call link after payment. Questions? <a href="mailto:hello@veridianclinic.com" style={{ color: "var(--fo)" }}>hello@veridianclinic.com</a>
              </p>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
