"use client";
import { useState } from "react";
import Link from "next/link";
import CalendlyPopupButton from "@/components/CalendlyPopupButton";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

export default function PeriGuideUpsells() {
  const [panelDeclined, setPanelDeclined] = useState(false);

  return (
    <div className="wrap" style={{ maxWidth: 760 }}>

      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p className="lbl">Recommended next step</p>
        <div className="rule rule-c" />
        <h2 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}>
          Know your numbers before you begin.
        </h2>
        <p style={{ fontSize: "clamp(.95rem,2vw,1.05rem)", color: "var(--sl2)", lineHeight: 1.9, maxWidth: 580, margin: "0 auto" }}>
          The guide explains what to test and why. The Advanced Health Panel gives you the actual numbers so you can reset with a complete picture of where your hormones, metabolism, and nutritional status sit right now.
        </p>
      </div>

      {/* ── Upsell 1: Blood Panel ── */}
      <div
        className="card"
        style={{
          background: "var(--fo)",
          marginBottom: 16,
          padding: "clamp(24px,5vw,40px)",
          transition: "opacity .35s ease, max-height .45s ease",
          opacity: panelDeclined ? 0.35 : 1,
          overflow: "hidden",
        }}
      >
        {panelDeclined ? (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <p style={{ fontSize: ".86rem", color: "rgba(246,241,232,.55)", lineHeight: 1.7, margin: "0 0 10px" }}>
              You can always book the blood panel later it will still be here when you're ready.
            </p>
            <button
              onClick={() => setPanelDeclined(false)}
              style={{ background: "none", border: "none", color: "var(--go)", fontSize: ".82rem", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}
            >
              Show the blood panel again
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: ".68rem", color: "var(--go)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
              Veridian Women's Advanced Health Panel
            </p>
            <h3 className="cg" style={{ fontSize: "clamp(1.3rem,3vw,2rem)", fontWeight: 500, color: "rgba(246,241,232,.95)", lineHeight: 1.25, marginBottom: 12 }}>
              150+ markers. GP-reviewed report. Know your baseline.
            </h3>
            <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.68)", lineHeight: 1.9, marginBottom: 20 }}>
              The most comprehensive female hormonal and metabolic panel available oestradiol, progesterone, FSH, LH, testosterone, full thyroid including antibodies, HbA1c, insulin, vitamin D, ferritin, B12, cardiovascular risk, inflammation, and more. GP-reviewed digital report with personalised next steps within 72 hours.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", marginBottom: 22 }}>
              {[
                "Hormones: Oestradiol, Progesterone, FSH, LH",
                "Testosterone (Total & Free) + DHEA-S",
                "Full Thyroid: TSH, fT3, fT4 + Antibodies",
                "Metabolic: HbA1c, Insulin, C-Peptide, Adiponectin",
                "Cardiovascular: Full lipid + Apolipoproteins",
                "Nutrition: Vitamin D, B12, Folate, Ferritin",
                "Inflammation: hsCRP + Immunoglobulins",
                "Tumour marker: CA-125 · Allergy: IgE",
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--go)", fontWeight: 700, fontSize: ".8rem", flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: ".8rem", color: "rgba(246,241,232,.62)", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(200,168,75,.1)", border: "1px solid rgba(200,168,75,.22)", padding: "12px 16px", marginBottom: 22 }}>
              <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.65)", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "var(--go)" }}>Blood draw:</strong> Attend your nearest Randox Health clinic London, Manchester, Birmingham and nationwide. Phlebotomy fee: <strong style={{ color: "var(--go)" }}>£30</strong>, paid on the day at Randox. This is a clinic visit, not a home visit or postal kit.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <Link href="/book?tier=perimenopause-panel" className="btn btn-go" style={{ display: "inline-block" }}>
                  Book the Advanced Health Panel £375 →
                </Link>
                <p style={{ fontSize: ".72rem", color: "rgba(246,241,232,.35)", marginTop: 6, lineHeight: 1.5 }}>
                  Panel: £375 · Blood draw: £30 at Randox (paid on the day)
                </p>
              </div>
            </div>

            {/* Downsell trigger */}
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid rgba(246,241,232,.1)", textAlign: "center" }}>
              <button
                onClick={() => setPanelDeclined(true)}
                style={{ background: "none", border: "none", color: "rgba(246,241,232,.35)", fontSize: ".8rem", cursor: "pointer", fontFamily: "inherit", lineHeight: 1.6 }}
              >
                No, thank you I'll skip the blood tests for now ↓
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Upsell / Downsell 2: Virtual Clinical Review ── */}
      <div
        className="card"
        style={{
          border: panelDeclined ? "1.5px solid rgba(200,168,75,.45)" : "1px solid rgba(200,168,75,.2)",
          background: panelDeclined ? "rgba(200,168,75,.04)" : "rgba(44,42,38,.04)",
          padding: "clamp(24px,5vw,40px)",
          transition: "border-color .35s ease, background .35s ease",
        }}
      >
        {panelDeclined && (
          <div style={{ marginBottom: 16, padding: "10px 14px", background: "rgba(20,82,38,.06)", border: "1px solid rgba(20,82,38,.2)" }}>
            <p style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.8, margin: 0 }}>
              <strong style={{ color: "#145226" }}>Not ready for blood tests yet?</strong> A clinical review can still help you understand your symptoms, explore your options, and decide if and when testing makes sense for you.
            </p>
          </div>
        )}

        <p style={{ fontSize: ".68rem", color: "var(--sl3)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
          Virtual Clinical Review Video Call
        </p>
        <h3 className="cg" style={{ fontSize: "clamp(1.2rem,2.8vw,1.7rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, marginBottom: 6 }}>
          Book a Clinical Review with Dr Tosin
        </h3>
        <p style={{ fontSize: ".9rem", color: "var(--sl3)", marginBottom: 18 }}>
          <strong style={{ color: "var(--sl)", fontSize: "1.1rem" }}>£77</strong>
          <span style={{ marginLeft: 10, textDecoration: "line-through" }}>£97</span>
          <span style={{ marginLeft: 10, fontSize: ".8rem" }}>  guide reader rate with code QUIZRATE</span>
        </p>

        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 20 }}>
          A 30-minute one-to-one video call with Dr Tosin. Review your symptoms, your blood results (if you have them), and your options including HRT. This is a <strong>virtual appointment via video call</strong>, not a face-to-face clinic visit.
        </p>

        <ul style={{ margin: "0 0 24px 0", padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
          {[
            "Full hormonal & metabolic risk assessment",
            "30-minute 1:1 with Dr Tosin (video call)",
            "Your treatment options explained including HRT",
            "What to manage and live with now practical guidance",
            "Personalised blood test recommendations",
          ].map(item => (
            <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "var(--go)", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
              <span style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.6 }}>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTAs Stripe payment + Calendly option */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a href="https://notes.thanksdoc.co.uk/book/service/136/36" target="_blank" rel="noopener noreferrer" className="btn btn-fo" style={{ padding: "14px 32px", fontSize: ".92rem", display: "inline-block", textAlign: "center" }}>
            Book, use QUIZRATE for £77 →
          </a>

          {CALENDLY_URL && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,.1)" }} />
                <span style={{ fontSize: ".7rem", color: "var(--sl3)", letterSpacing: ".08em", textTransform: "uppercase" }}>or</span>
                <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,.1)" }} />
              </div>
              <CalendlyPopupButton
                url={CALENDLY_URL}
                className="btn btn-ol"
                style={{ padding: "13px 32px", fontSize: ".9rem", textAlign: "center" }}
              >
                Check Available Times →
              </CalendlyPopupButton>
            </>
          )}
        </div>

        <p style={{ marginTop: 14, fontSize: ".72rem", color: "var(--sl3)", lineHeight: 1.6 }}>
          After payment you'll receive a booking link to schedule your video call at a time that suits you. Questions? <a href="mailto:support@veridianclinic.com" style={{ color: "var(--fo)" }}>support@veridianclinic.com</a>
        </p>
      </div>

    </div>
  );
}
