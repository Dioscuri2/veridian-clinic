"use client";
import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const QUESTIONS = [
  {
    id: "sleep",
    text: "How often do you wake between 2–4am and struggle to get back to sleep?",
    options: ["Rarely or never", "Once or twice a week", "Most nights", "Almost every night"],
    scores: [0, 1, 2, 3],
  },
  {
    id: "brain",
    text: "How would you describe your mental clarity and memory lately?",
    options: [
      "Sharp — no change",
      "Occasionally foggy, minor forgetfulness",
      "Noticeably worse — losing words, forgetting things I never would have before",
      "Significant brain fog — affecting work or daily life",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "weight",
    text: "Have you noticed weight gain around your middle that won't shift, despite no obvious change in diet or exercise?",
    options: [
      "No change",
      "Slight increase I can explain",
      "Yes — stubborn belly weight, nothing I try is working",
      "Significant change that's affecting how I feel about my body",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "mood",
    text: "How often do you experience sudden irritability, rage or mood swings that feel out of proportion?",
    options: ["Rarely", "Occasionally", "Regularly — it doesn't feel like me", "Frequently — affecting my relationships"],
    scores: [0, 1, 2, 3],
  },
  {
    id: "heat",
    text: "Do you experience hot flushes or night sweats?",
    options: [
      "No",
      "Mild warmth occasionally",
      "Hot flushes or night sweats several times a week",
      "Daily or disruptive hot flushes / heavy night sweats",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "energy",
    text: "How would you describe your energy levels across the day?",
    options: [
      "Consistent and good",
      "Some afternoon dips",
      "Tired most of the day despite sleeping",
      "Exhausted — even rested sleep doesn't restore me",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "anxiety",
    text: "Have you noticed new or worsened anxiety — especially physical anxiety, heart racing, or a sense of dread?",
    options: [
      "No",
      "Mild and manageable",
      "Yes — feels different from any anxiety I've had before",
      "Significant — interfering with daily life",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "cycles",
    text: "Have your menstrual cycles changed — shorter, longer, heavier, more irregular, or skipped months?",
    options: [
      "No change / I'm post-menopause",
      "Minor variations",
      "Noticeable changes in the last 6–12 months",
      "Significant irregularity or very heavy periods",
    ],
    scores: [0, 0, 2, 3],
  },
];

type Band = "low" | "moderate" | "high";

function getBand(score: number): Band {
  if (score <= 6) return "low";
  if (score <= 13) return "moderate";
  return "high";
}

const RESULTS: Record<Band, {
  label: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  colour: string;
}> = {
  low: {
    label: "Early Stage / Low Burden",
    headline: "Your symptoms are mild — but the shift may be beginning.",
    body: "Your score suggests you're either early in the perimenopausal transition or managing symptoms well. The changes are subtle now, but understanding what's coming — and building the right habits early — is exactly what protects your sleep, metabolism and mental sharpness over the next decade. The Perimenopause Reset Guide gives you that foundation.",
    ctaLabel: "Start the Reset — £9.99",
    ctaHref: "/perimenopause-guide",
    colour: "#145226",
  },
  moderate: {
    label: "Moderate Symptom Burden",
    headline: "Classic perimenopause. Your body is telling you something is shifting.",
    body: "Your score suggests you're in the thick of the perimenopausal transition. Brain fog, disrupted sleep, and changing weight patterns at this level are almost always driven by the oestrogen–progesterone fluctuation — not stress, not age, not 'just how things are'. A structured six-week reset framework gives you specific tools for each of these symptoms. This is exactly what the guide was built for.",
    ctaLabel: "Get the Six-Week Reset Guide — £9.99",
    ctaHref: "/perimenopause-guide",
    colour: "#8a5500",
  },
  high: {
    label: "High Symptom Burden",
    headline: "Your symptoms are significant. You need more than general advice.",
    body: "Your score suggests a high hormonal symptom burden. At this level, lifestyle changes alone — while important — may not be enough without understanding your hormonal baseline first. The Perimenopause Reset Guide walks you through this, including exactly which blood tests to request and when symptoms warrant an HRT conversation. Many women at this level also benefit from a clinical review with Dr Tosin before or alongside starting the reset.",
    ctaLabel: "Get the Reset Guide + Book a Clinical Review",
    ctaHref: "/perimenopause-guide",
    colour: "#7a1616",
  },
};

export default function PerimenopauseQuizPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const current = QUESTIONS[step];
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const band = getBand(totalScore);
  const result = RESULTS[band];
  const maxScore = QUESTIONS.reduce((a, q) => a + Math.max(...q.scores), 0);
  const pct = Math.round((totalScore / maxScore) * 100);

  function select(score: number) {
    const next = { ...answers, [current.id]: score };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 280);
    } else {
      setTimeout(() => setSubmitted(true), 280);
    }
  }

  const progress = submitted ? 100 : Math.round(((step) / QUESTIONS.length) * 100);

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)", minHeight: "100svh", background: "var(--iv)" }}>

        {!submitted ? (
          <section className="sec" style={{ paddingTop: 56, paddingBottom: 80 }}>
            <div className="wrap" style={{ maxWidth: 680 }}>

              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <p className="lbl" style={{ fontSize: ".75rem", letterSpacing: ".18em" }}>Free Perimenopause Symptom Check</p>
                <div className="rule rule-c" />
                <h1 className="cg" style={{ fontSize: "clamp(2.4rem,6vw,3.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.1, marginBottom: 16 }}>
                  Is this perimenopause?
                </h1>
                <p style={{ fontSize: "clamp(1rem,2.5vw,1.1rem)", color: "var(--sl2)", lineHeight: 1.85 }}>
                  8 questions · Under 2 minutes · Written by a GP
                </p>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: ".8rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)" }}>
                    Question {step + 1} of {QUESTIONS.length}
                  </span>
                  <span style={{ fontSize: ".8rem", color: "var(--sl3)" }}>{progress}%</span>
                </div>
                <div style={{ height: 6, background: "rgba(0,0,0,.08)", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: "var(--go)", borderRadius: 3, transition: "width .4s ease" }} />
                </div>
              </div>

              {/* Question */}
              <div className="card" style={{ marginBottom: 24, padding: "clamp(20px,5vw,36px)" }}>
                <p style={{ fontSize: "clamp(1.2rem,3.5vw,1.5rem)", fontWeight: 600, color: "var(--sl)", lineHeight: 1.5, marginBottom: 28 }}>
                  {current.text}
                </p>
                <div style={{ display: "grid", gap: 14 }}>
                  {current.options.map((opt, i) => {
                    const selected = answers[current.id] === current.scores[i];
                    return (
                      <button
                        key={opt}
                        onClick={() => select(current.scores[i])}
                        style={{
                          textAlign: "left",
                          padding: "clamp(14px,3vw,18px) clamp(16px,4vw,24px)",
                          background: selected ? "var(--fo)" : "rgba(0,0,0,.03)",
                          border: `2px solid ${selected ? "var(--fo)" : "rgba(0,0,0,.1)"}`,
                          color: selected ? "var(--iv)" : "var(--sl)",
                          fontSize: "clamp(1rem,2.5vw,1.08rem)",
                          lineHeight: 1.55,
                          cursor: "pointer",
                          transition: "all .18s ease",
                          fontFamily: "inherit",
                          borderRadius: 2,
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  style={{ background: "none", border: "none", color: "var(--sl3)", fontSize: ".95rem", cursor: "pointer", fontFamily: "inherit", padding: "8px 0", minHeight: 44 }}
                >
                  ← Back
                </button>
              )}
            </div>
          </section>

        ) : (

          /* Result */
          <section className="sec" style={{ paddingTop: 56, paddingBottom: 80 }}>
            <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>

              {/* Score circle */}
              <div style={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 28px", background: "var(--fo)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--go)", lineHeight: 1 }}>{pct}%</span>
                <span style={{ fontSize: ".6rem", color: "rgba(246,241,232,.55)", letterSpacing: ".1em", textTransform: "uppercase" }}>score</span>
              </div>

              <div style={{ display: "inline-block", padding: "4px 14px", background: result.colour + "22", border: `1px solid ${result.colour}55`, marginBottom: 20 }}>
                <span style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: result.colour }}>{result.label}</span>
              </div>

              <h2 className="cg" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 20 }}>
                {result.headline}
              </h2>

              <p style={{ fontSize: "clamp(1rem,2.5vw,1.1rem)", color: "var(--sl2)", lineHeight: 2, maxWidth: 600, margin: "0 auto 36px" }}>
                {result.body}
              </p>

              {/* Score breakdown */}
              <div className="card" style={{ maxWidth: 560, margin: "0 auto 36px", textAlign: "left" }}>
                <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 16 }}>Your symptom areas</p>
                {QUESTIONS.map(q => {
                  const s = answers[q.id] ?? 0;
                  const maxS = Math.max(...q.scores);
                  return (
                    <div key={q.id} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: ".8rem", color: "var(--sl2)", textTransform: "capitalize" }}>{q.id}</span>
                        <span style={{ fontSize: ".78rem", color: s >= 2 ? "#8a5500" : "var(--sl3)", fontWeight: s >= 2 ? 700 : 400 }}>
                          {s === 0 ? "Low" : s === 1 ? "Mild" : s === 2 ? "Moderate" : "High"}
                        </span>
                      </div>
                      <div style={{ height: 3, background: "rgba(0,0,0,.08)", borderRadius: 2 }}>
                        <div style={{ height: "100%", width: `${(s / maxS) * 100}%`, background: s >= 2 ? "#c8a84b" : "rgba(0,0,0,.2)", borderRadius: 2, transition: "width .6s ease" }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link href={result.ctaHref} className="btn btn-go" style={{ padding: "16px 48px", fontSize: ".97rem" }}>
                {result.ctaLabel} →
              </Link>
              <p style={{ marginTop: 12, fontSize: ".76rem", color: "var(--sl3)", lineHeight: 1.6 }}>
                The guide includes a full section on knowing your numbers, understanding your results, and when to seek clinical assessment.
              </p>

              {band === "high" && (
                <div style={{ marginTop: 28, maxWidth: 560, margin: "28px auto 0" }}>
                  <Link href="/book?tier=discovery" className="btn btn-fo" style={{ padding: "13px 32px", fontSize: ".9rem" }}>
                    Book a Clinical Review with Dr Tosin — £195 →
                  </Link>
                  <p style={{ marginTop: 8, fontSize: ".74rem", color: "var(--sl3)" }}>Or £97 if you get the guide first.</p>
                </div>
              )}

            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
