"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const WHAT_IS_INSIDE = [
  { title: "PERC Framework", body: "Four pillars — Prepare, Eat & Eliminate, Reset, Condition — giving you a structured mental model before you change a single habit." },
  { title: "21-Day Roadmap", body: "Day-by-day action plan across three phases. Not a vague programme — a specific daily structure with clear checkpoints." },
  { title: "7-Day Meal Plan", body: "Clean, real-food meals available in any UK supermarket. Protein-first plate template with balanced meal guide included." },
  { title: "Fasting Cheat Sheet", body: "Two tracks — beginner and advanced. Timing strategies with the physiological reasoning behind them." },
  { title: "Movement Ladder", body: "Three tiers from sedentary to active. Structured activity tiers matched to your current fitness starting point." },
  { title: "Supplement Stack", body: "Sleep and gut support stack — the supplements most relevant to metabolic function, with clinical context." },
  { title: "Shopping List & Tracker", body: "One-page printable shopping list by category and a 21-day daily tick-box habit tracker." },
  { title: "Busy Day Plan + Rapid Reset", body: "A stripped-back fallback for chaotic days and a Rapid Reset Protocol to recover from a slip in 24–48 hours." },
];

function GuidePageContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useSearchParams();
  const cancelled = params.get("cancelled") === "1";

  async function handleBuy() {
    setLoading(true);
    setError("");
    try {
      const resp = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "guide" }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.url) throw new Error(data.error || "Unable to start checkout.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Hero */}
        <section className="sec bg-iv" style={{ paddingBottom: 48 }}>
          <div className="wrap" style={{ maxWidth: 860, textAlign: "center" }}>
            <p className="lbl a1">GP-Authored · Instant Download</p>
            <div className="rule rule-c a1" />
            <h1
              className="cg a2"
              style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.12, marginBottom: 18 }}
            >
              Why Your Weight Isn't Shifting
            </h1>
            <p
              className="a2"
              style={{ fontSize: "clamp(.95rem,2.2vw,1.05rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 600, margin: "0 auto 10px", fontStyle: "italic" }}
            >
              A Doctor's 21-Day Metabolic Reset Guide
            </p>
            <p
              className="a3"
              style={{ fontSize: "clamp(.9rem,2vw,1rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 640, margin: "0 auto 28px" }}
            >
              Lower blood sugar · Ease blood pressure · Get your energy back. A practical, clinically-grounded guide for adults 40+ ready to address the hidden drivers of metabolic drift — without waiting for the next GP appointment.
            </p>
            <div className="badge-row a4" style={{ justifyContent: "center", marginBottom: 32 }}>
              <span className="badge">GP-Authored</span>
              <span className="badge">Instant Download</span>
              <span className="badge">21-Day Plan</span>
              <span className="badge">£19.99</span>
            </div>

            {cancelled && (
              <div style={{ maxWidth: 480, margin: "0 auto 20px", padding: "12px 16px", borderLeft: "3px solid var(--amr)", background: "rgba(138,85,0,.06)", textAlign: "left" }}>
                <p style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.7 }}>
                  No payment was taken. You can purchase the guide below whenever you're ready.
                </p>
              </div>
            )}

            {error && (
              <div style={{ maxWidth: 480, margin: "0 auto 20px", padding: "12px 16px", borderLeft: "3px solid var(--red)", background: "rgba(122,22,22,.06)", textAlign: "left" }}>
                <p style={{ fontSize: ".84rem", color: "var(--red)", lineHeight: 1.7 }}>{error}</p>
              </div>
            )}

            <div className="a4">
              <button
                onClick={handleBuy}
                disabled={loading}
                className="btn btn-fo"
                style={{ padding: "15px 44px", fontSize: ".9rem", opacity: loading ? 0.65 : 1 }}
              >
                {loading ? "Redirecting to checkout…" : "Get the Guide for £19.99 →"}
              </button>
              <p style={{ fontSize: ".76rem", color: "var(--sl3)", marginTop: 10, lineHeight: 1.6 }}>
                Secure payment via Stripe · Instant PDF download · One-off payment
              </p>
            </div>
          </div>
        </section>

        {/* What's inside grid */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 980 }}>
            <div className="sh text-center">
              <p className="lbl">What's inside</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Everything you need for a structured metabolic reset</h2>
              <p className="sh-body">Not generic wellness advice. A structured, clinically-grounded guide covering every domain that matters for metabolic change in adults 40+.</p>
            </div>
            <div className="g3" style={{ marginBottom: 0 }}>
              {WHAT_IS_INSIDE.map((item) => (
                <div key={item.title} className="card">
                  <p className="lbl" style={{ marginBottom: 10 }}>{item.title}</p>
                  <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.9 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sh text-center">
              <p className="lbl">Who this is for</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Adults 40+ with metabolic drift they can't seem to shift</h2>
            </div>
            <div className="card">
              <ul className="chk" style={{ marginBottom: 32 }}>
                <li>Weight that isn't moving despite trying — and you want to understand why</li>
                <li>Blood sugar creeping up, energy dropping, sleep not recovering you</li>
                <li>You've been told things are "borderline" but given no clear next step</li>
                <li>You want a structured plan to start from, not another information pile</li>
                <li>You're preparing for clinical work and want to arrive ready</li>
              </ul>
              <div style={{ paddingTop: 24, borderTop: "1px solid rgba(0,0,0,.07)" }}>
                <p style={{ fontSize: ".8rem", color: "var(--sl3)", lineHeight: 1.7, marginBottom: 20 }}>
                  <strong>Safety note:</strong> This guide is for informational purposes and does not replace professional medical advice. If you are on insulin, sulfonylureas, SGLT2 inhibitors, or blood pressure medication — or have kidney disease, type 1 diabetes, or a recent cardiac event — consult your clinician before making dietary changes.
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                  <span className="cg" style={{ fontSize: "2.4rem", fontWeight: 400, color: "var(--fo)", lineHeight: 1 }}>£19.99</span>
                  <span style={{ fontSize: ".82rem", color: "var(--sl3)" }}>One-off payment · Instant download</span>
                </div>
                {error && (
                  <div style={{ marginBottom: 14, padding: "10px 14px", borderLeft: "3px solid var(--red)", background: "rgba(122,22,22,.06)" }}>
                    <p style={{ fontSize: ".82rem", color: "var(--red)", lineHeight: 1.7 }}>{error}</p>
                  </div>
                )}
                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className="btn btn-fo"
                  style={{ opacity: loading ? 0.65 : 1 }}
                >
                  {loading ? "Redirecting to checkout…" : "Get the Guide →"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Soft upsell */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <p className="lbl">Ready for clinical depth?</p>
            <div className="rule rule-c" />
            <h2
              className="cg"
              style={{ fontSize: "clamp(1.7rem,3.8vw,2.5rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 16 }}
            >
              The Veridian Baseline gives you the full clinical picture.
            </h2>
            <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 28, maxWidth: 560, margin: "0 auto 28px" }}>
              The Baseline Assessment includes a 9-marker blood panel, GP clinical interpretation, and a written action plan — going beyond the guide into real diagnostic clarity.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/book?tier=discovery" className="btn btn-fo">Book a Free Discovery Call →</a>
              <a href="/assessments" className="btn btn-ol">Compare All Pathways</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function MetabolicResetGuidePage() {
  return (
    <Suspense fallback={null}>
      <GuidePageContent />
    </Suspense>
  );
}
