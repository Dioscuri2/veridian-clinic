"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const WHAT_IS_INSIDE = [
  { title: "The Perimenopause Window", body: "What's actually happening hormonally in the years before your final period — oestrogen fluctuation, progesterone decline, and why your body responds so differently now." },
  { title: "Your Metabolic Shift", body: "Why weight accumulates differently after 40, particularly around the abdomen. The link between oestrogen, insulin sensitivity, and fat storage — explained plainly." },
  { title: "Eating for Hormonal Balance", body: "A protein-first plate framework, phytoestrogen-rich foods, and what to reduce. Practical UK supermarket-friendly meal guidance, not elimination diets." },
  { title: "Sleep & the Hormonal Loop", body: "How falling oestrogen disrupts sleep architecture, worsens hot flushes at night, and drives cortisol. Evidence-based evening routines and sleep hygiene for this stage." },
  { title: "Movement That Works Now", body: "Resistance training for bone density and insulin sensitivity. Three tiers from low to high activity. Why cardio alone is not enough during perimenopause." },
  { title: "Supplement Stack", body: "Magnesium glycinate, Vitamin D3/K2, Omega-3, and adaptogenic support. Clinical context for each — what the evidence says and what to expect." },
  { title: "Symptom & Cycle Tracker", body: "A printable one-page tracker for hot flushes, mood, energy, cycle length, and sleep quality — so you arrive at any clinical appointment with useful data." },
  { title: "When to Seek Clinical Assessment", body: "Red flags, what blood tests to ask for, how to have the HRT conversation, and what a comprehensive hormonal panel should include." },
];

function PeriGuideContent() {
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
        body: JSON.stringify({ tier: "peri-guide" }),
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
              The Perimenopause Reset
            </h1>
            <p
              className="a2"
              style={{ fontSize: "clamp(.95rem,2.2vw,1.05rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 600, margin: "0 auto 10px", fontStyle: "italic" }}
            >
              A Doctor's Guide to Hormonal & Metabolic Health
            </p>
            <p
              className="a3"
              style={{ fontSize: "clamp(.9rem,2vw,1rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 640, margin: "0 auto 28px" }}
            >
              Understand the hormonal shift. Stabilise your metabolism. Reclaim your energy, sleep and weight — with a clinically-grounded framework written for women navigating perimenopause.
            </p>
            <div className="badge-row a4" style={{ justifyContent: "center", marginBottom: 32 }}>
              <span className="badge">GP-Authored</span>
              <span className="badge">Instant Download</span>
              <span className="badge">Women 35–55</span>
              <span className="badge">£9.99</span>
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
                {loading ? "Redirecting to checkout…" : "Get the Guide for £9.99 →"}
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
              <h2 className="sh-title">A complete clinical framework for the perimenopause transition</h2>
              <p className="sh-body">Not generic wellness advice. A structured, GP-authored guide covering every domain that matters — hormones, metabolism, sleep, nutrition and movement — for women 35–55.</p>
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
              <h2 className="sh-title">Women 35–55 who know something has shifted — and want to understand it</h2>
            </div>
            <div className="card">
              <ul className="chk" style={{ marginBottom: 32 }}>
                <li>Weight gaining around the middle despite no change in diet or exercise</li>
                <li>Sleep disrupted by waking, night sweats, or simply not feeling restored</li>
                <li>Energy, mood and concentration noticeably different from two years ago</li>
                <li>Cycles changing — shorter, longer, heavier, or more unpredictable</li>
                <li>You've been told bloods are "normal" but you know something has changed</li>
                <li>You want a clear framework before — or alongside — any clinical conversation</li>
              </ul>
              <div style={{ paddingTop: 24, borderTop: "1px solid rgba(0,0,0,.07)" }}>
                <p style={{ fontSize: ".8rem", color: "var(--sl3)", lineHeight: 1.7, marginBottom: 20 }}>
                  <strong>Safety note:</strong> This guide is for informational and educational purposes and does not replace professional medical advice. If you are on HRT, thyroid medication, insulin, or have a history of hormone-sensitive conditions, consult your clinician before making dietary or supplementation changes.
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                  <span className="cg" style={{ fontSize: "2.4rem", fontWeight: 400, color: "var(--fo)", lineHeight: 1 }}>£9.99</span>
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

        {/* Blood test upsell */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <p className="lbl">Want the full clinical picture?</p>
            <div className="rule rule-c" />
            <h2
              className="cg"
              style={{ fontSize: "clamp(1.7rem,3.8vw,2.5rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 16 }}
            >
              A comprehensive hormonal blood panel reveals what's actually driving your symptoms.
            </h2>
            <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 28, maxWidth: 560, margin: "0 auto 28px" }}>
              The Veridian Baseline includes oestradiol, FSH, LH, SHBG, thyroid function, fasting insulin, cortisol, and full metabolic markers — GP reviewed with a written clinical report.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/book?tier=baseline" className="btn btn-fo">Book a Comprehensive Blood Test →</a>
              <a href="/book?tier=discovery" className="btn btn-ol">Book a Discovery Call First</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

export default function PerimenopauseGuidePage() {
  return (
    <Suspense fallback={null}>
      <PeriGuideContent />
    </Suspense>
  );
}
