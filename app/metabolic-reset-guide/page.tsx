import Link from "next/link";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "The Metabolic Reset Guide — £19.99 | Veridian Clinic",
  description:
    "A doctor-led practical guide for improving the hidden drivers of weight gain, poor energy, and metabolic stress. Know which markers matter most and what to do first.",
};

export default function MetabolicResetGuidePage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Hero */}
        <section className="sec bg-iv" style={{ paddingBottom: 48 }}>
          <div className="wrap" style={{ maxWidth: 860, textAlign: "center" }}>
            <p className="lbl a1">Doctor-Led Practical Guide</p>
            <div className="rule rule-c a1" />
            <h1
              className="cg a2"
              style={{
                fontSize: "clamp(2.4rem,5.5vw,4.2rem)",
                fontWeight: 500,
                color: "var(--sl)",
                lineHeight: 1.12,
                marginBottom: 18,
              }}
            >
              The Metabolic Reset Guide
            </h1>
            <p
              className="a3"
              style={{
                fontSize: "clamp(.97rem,2.4vw,1.1rem)",
                color: "var(--sl2)",
                lineHeight: 1.95,
                maxWidth: 640,
                margin: "0 auto 28px",
              }}
            >
              A practical guide for people who want to start improving the hidden drivers of weight gain, poor energy, and metabolic stress — without waiting for the next GP appointment.
            </p>
            <div className="badge-row a4" style={{ justifyContent: "center", marginBottom: 32 }}>
              <span className="badge">GP-Authored</span>
              <span className="badge">Instant Download</span>
              <span className="badge">£19.99</span>
            </div>
            <div className="a4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book?tier=guide" className="btn btn-fo" style={{ padding: "15px 40px", fontSize: ".9rem" }}>
                Get the Guide for £19.99 →
              </Link>
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 960 }}>
            <div className="sh text-center">
              <p className="lbl">What's inside</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Built around the markers and levers that matter</h2>
              <p className="sh-body">Not generic wellness advice. A structured practical guide that reflects how a GP thinks about metabolic risk.</p>
            </div>
            <div className="g3">
              {[
                {
                  title: "Understand Your Metabolism",
                  body: "A clear explanation of what drives metabolic drift — insulin load, visceral fat, sleep disruption, and chronic inflammation — written in plain clinical language.",
                },
                {
                  title: "First Actions Protocol",
                  body: "Practical first-step actions for food, movement, sleep, and recovery. Structured to be implementable without overhauling everything at once.",
                },
                {
                  title: "Marker Clarity",
                  body: "The markers most likely to reveal early dysfunction that standard panels miss. What to ask for, what the numbers mean, and what to do with them.",
                },
              ].map((item) => (
                <div key={item.title} className="card">
                  <p className="lbl" style={{ marginBottom: 12 }}>{item.title}</p>
                  <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.9 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you'll leave with + purchase */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sh text-center">
              <p className="lbl">What you'll leave with</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">A clear starting point, not another information pile</h2>
            </div>
            <div className="card">
              <ul className="chk" style={{ marginBottom: 32 }}>
                <li>Understand what may be driving your metabolism right now</li>
                <li>Simple first actions for food, movement, sleep, and recovery</li>
                <li>Know which markers matter most and what to ask your doctor</li>
                <li>A 14-day reset structure to build early momentum</li>
                <li>Prepare properly before deeper clinical work, if needed</li>
              </ul>

              <div
                style={{
                  paddingTop: 28,
                  borderTop: "1px solid rgba(0,0,0,.07)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span
                      className="cg"
                      style={{ fontSize: "2.6rem", fontWeight: 400, color: "var(--fo)", lineHeight: 1 }}
                    >
                      £19.99
                    </span>
                  </div>
                  <p style={{ fontSize: ".78rem", color: "var(--sl3)", marginTop: 4 }}>
                    One-off payment · Instant access
                  </p>
                </div>
                <Link href="/book?tier=guide" className="btn btn-fo">
                  Get the Guide →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical context — soft upsell to Baseline */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <p className="lbl">Ready for clinical depth?</p>
            <div className="rule rule-c" />
            <h2
              className="cg"
              style={{
                fontSize: "clamp(1.8rem,4vw,2.7rem)",
                fontWeight: 500,
                color: "var(--sl)",
                lineHeight: 1.25,
                marginBottom: 16,
              }}
            >
              The Veridian Baseline gives you the full clinical picture.
            </h2>
            <p
              style={{
                fontSize: ".95rem",
                color: "var(--sl2)",
                lineHeight: 1.95,
                marginBottom: 28,
                maxWidth: 580,
                margin: "0 auto 28px",
              }}
            >
              The Baseline Assessment includes the 9-marker blood panel, clinical GP interpretation, and a written action plan. It goes beyond the guide into real diagnostic clarity.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/book?tier=baseline" className="btn btn-fo">Book the Baseline Audit →</Link>
              <Link href="/assessments" className="btn btn-ol">Compare All Pathways</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
