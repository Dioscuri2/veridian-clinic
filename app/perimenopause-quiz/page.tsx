"use client";
import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

type AgeGroup = "under45" | "45plus";
type BloodTestStatus = "done" | "notDone";

const AGE_OPTIONS: { label: string; group: AgeGroup }[] = [
  { label: "Under 40", group: "under45" },
  { label: "40–44", group: "under45" },
  { label: "45–50", group: "45plus" },
  { label: "51 or over / post-menopause", group: "45plus" },
];

const QUESTIONS = [
  {
    id: "sleep",
    text: "Do you wake between 2–4am with your mind racing, unable to get back to sleep — even when you're exhausted?",
    options: [
      "Rarely or never",
      "Once or twice a week",
      "Most nights — I'm awake for an hour or more",
      "Almost every night — I'm running on broken sleep",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "brain",
    text: "Have you been losing words mid-sentence, forgetting why you walked into a room, or feeling like your sharpness has gone?",
    options: [
      "No — my memory and focus feel normal",
      "Occasionally foggy, minor forgetfulness",
      "Yes — noticeably worse. I'd never have forgotten things like this before",
      "Significant brain fog — it's affecting my work and daily life",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "weight",
    text: "Has weight appeared around your middle seemingly overnight — and won't budge no matter what you eat or how much you exercise?",
    options: [
      "No change",
      "Slight increase I can explain",
      "Yes — stubborn belly weight, nothing I try is working",
      "Significant change that's affecting how I feel in my body",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "mood",
    text: "Do you experience sudden flashes of rage, irritability, or emotion that feel completely out of proportion — then feel fine ten minutes later?",
    options: [
      "Rarely — my moods feel even",
      "Occasionally",
      "Regularly — it genuinely doesn't feel like me",
      "Frequently — it's affecting my relationships",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "heat",
    text: "Do you experience sudden waves of heat, flushing, or wake up drenched in sweat at night?",
    options: [
      "No",
      "Mild warmth occasionally",
      "Hot flushes or night sweats several times a week",
      "Daily or severely disruptive hot flushes / heavy night sweats",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "energy",
    text: "Even after a full night's sleep, do you feel like you're running on empty by mid-morning — a tiredness that rest doesn't fix?",
    options: [
      "No — my energy is consistent and good",
      "Some afternoon dips",
      "Tired most of the day despite sleeping",
      "Exhausted — even good sleep doesn't restore me",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "anxiety",
    text: "Have you noticed a new physical anxiety — heart pounding for no reason, waves of dread, or a sense of 'impending doom' that comes out of nowhere?",
    options: [
      "No",
      "Mild and manageable",
      "Yes — it feels different from any anxiety I've had before",
      "Significant — it's interfering with my daily life",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    id: "cycles",
    text: "Have your periods become unpredictable — shorter, heavier, skipped months, or flooding that's hard to manage?",
    options: [
      "No change / I'm post-menopause",
      "Minor variations",
      "Noticeable changes in the last 6–12 months",
      "Significant irregularity or very heavy / flooding periods",
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
    body: "You're likely in the early stages of the transition, or managing symptoms well. Building the right habits now protects your sleep, metabolism and mental clarity over the next decade — the Reset Guide gives you that foundation.",
    ctaLabel: "Get the Reset Guide — £9.99",
    ctaHref: "/perimenopause-guide",
    colour: "#145226",
  },
  moderate: {
    label: "Moderate Symptom Burden",
    headline: "Classic perimenopause. Your body is telling you something is shifting.",
    body: "Brain fog, disrupted sleep, and changing weight at this level are almost always oestrogen–progesterone fluctuation — not stress, not age. The six-week Reset Guide was built for exactly this stage.",
    ctaLabel: "Get the Six-Week Reset Guide — £9.99",
    ctaHref: "/perimenopause-guide",
    colour: "#8a5500",
  },
  high: {
    label: "High Symptom Burden",
    headline: "Your symptoms are significant. You need more than general advice.",
    body: "At this level, lifestyle changes alone may not be enough without understanding your hormonal baseline first. The Reset Guide walks you through exactly which blood tests to request and when to have an HRT conversation.",
    ctaLabel: "Get the Reset Guide — £9.99",
    ctaHref: "/perimenopause-guide",
    colour: "#7a1616",
  },
};

export default function PerimenopauseQuizPage() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [bloodTestStatus, setBloodTestStatus] = useState<BloodTestStatus | null>(null);

  const current = QUESTIONS[step];
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const band = getBand(totalScore);
  const result = RESULTS[band];
  const maxScore = QUESTIONS.reduce((a, q) => a + Math.max(...q.scores), 0);
  const pct = Math.round((totalScore / maxScore) * 100);

  function selectAge(group: AgeGroup) {
    setAgeGroup(group);
  }

  function select(score: number) {
    const next = { ...answers, [current.id]: score };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 280);
    } else {
      setTimeout(() => {
        setSubmitted(true);
        document.cookie = "quiz_gate=1; path=/; max-age=86400";
      }, 280);
    }
  }

  const totalSteps = QUESTIONS.length;
  const progress = submitted ? 100 : Math.round((step / totalSteps) * 100);

  // Age selection screen
  if (!ageGroup) {
    return (
      <>
        <style>{FONTS + CSS}</style>
        <Navigation />
        <main style={{ paddingTop: "var(--nav-h)", minHeight: "100svh", background: "var(--iv)" }}>
          <section className="sec" style={{ paddingTop: 56, paddingBottom: 80 }}>
            <div className="wrap" style={{ maxWidth: 680 }}>
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

              <div className="card" style={{ padding: "clamp(20px,5vw,36px)" }}>
                <p style={{ fontSize: "clamp(1.2rem,3.5vw,1.5rem)", fontWeight: 600, color: "var(--sl)", lineHeight: 1.5, marginBottom: 28 }}>
                  First — how old are you?
                </p>
                <div style={{ display: "grid", gap: 14 }}>
                  {AGE_OPTIONS.map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => selectAge(opt.group)}
                      style={{
                        textAlign: "left",
                        padding: "clamp(14px,3vw,18px) clamp(16px,4vw,24px)",
                        background: "rgba(0,0,0,.03)",
                        border: "2px solid rgba(0,0,0,.1)",
                        color: "var(--sl)",
                        fontSize: "clamp(1rem,2.5vw,1.08rem)",
                        lineHeight: 1.55,
                        cursor: "pointer",
                        transition: "all .18s ease",
                        fontFamily: "inherit",
                        borderRadius: 2,
                        minHeight: 44,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

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
                          minHeight: 44,
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => step === 0 ? setAgeGroup(null) : setStep(s => s - 1)}
                style={{ background: "none", border: "none", color: "var(--sl3)", fontSize: ".95rem", cursor: "pointer", fontFamily: "inherit", padding: "8px 0", minHeight: 44 }}
              >
                ← Back
              </button>
            </div>
          </section>

        ) : (

          /* Result */
          <section className="sec" style={{ paddingTop: 56, paddingBottom: 80 }}>
            <div className="wrap" style={{ maxWidth: 660 }}>

              {/* Score + band */}
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ width: 92, height: 92, borderRadius: "50%", margin: "0 auto 20px", background: "var(--fo)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--go)", lineHeight: 1 }}>{pct}%</span>
                  <span style={{ fontSize: ".58rem", color: "rgba(246,241,232,.5)", letterSpacing: ".1em", textTransform: "uppercase" }}>score</span>
                </div>
                <div style={{ display: "inline-block", padding: "4px 14px", background: result.colour + "22", border: `1px solid ${result.colour}55`, marginBottom: 16 }}>
                  <span style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: result.colour }}>{result.label}</span>
                </div>
                <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}>
                  {result.headline}
                </h2>
                <p style={{ fontSize: "clamp(.95rem,2.3vw,1.05rem)", color: "var(--sl2)", lineHeight: 1.9, maxWidth: 540, margin: "0 auto" }}>
                  {result.body}
                </p>
              </div>

              {/* Score breakdown */}
              <div className="card" style={{ marginBottom: 32 }}>
                <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 14 }}>Your symptom areas</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  {QUESTIONS.map(q => {
                    const s = answers[q.id] ?? 0;
                    const maxS = Math.max(...q.scores);
                    return (
                      <div key={q.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: ".78rem", color: "var(--sl2)", textTransform: "capitalize" }}>{q.id}</span>
                          <span style={{ fontSize: ".74rem", color: s >= 2 ? "#8a5500" : "var(--sl3)", fontWeight: s >= 2 ? 700 : 400 }}>
                            {s === 0 ? "Low" : s === 1 ? "Mild" : s === 2 ? "Moderate" : "High"}
                          </span>
                        </div>
                        <div style={{ height: 3, background: "rgba(0,0,0,.08)", borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${(s / maxS) * 100}%`, background: s >= 2 ? "#c8a84b" : "rgba(0,0,0,.2)", borderRadius: 2 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 — Guide */}
              <div style={{ textAlign: "center", marginBottom: 12 }}>
                <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 14 }}>Step 1</p>
                <Link href={result.ctaHref} className="btn btn-go" style={{ padding: "16px 48px", fontSize: ".97rem", display: "inline-block" }}>
                  {result.ctaLabel} →
                </Link>
                <p style={{ marginTop: 10, fontSize: ".75rem", color: "var(--sl3)", lineHeight: 1.65 }}>
                  Includes the six-week reset framework, which blood tests to request, and when to have an HRT conversation.
                </p>
              </div>

              <div style={{ height: 1, background: "rgba(0,0,0,.08)", margin: "28px 0" }} />

              {/* Under-45 blood test branch */}
              {ageGroup === "under45" && (
                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#145226", marginBottom: 10 }}>Because you're under 45</p>
                  <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 18 }}>
                    NICE guidelines (NG23) recommend blood tests to confirm perimenopause in women under 45 — a symptom score alone isn't enough at this age. Have you already had a hormone blood test?
                  </p>
                  {!bloodTestStatus && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <button
                        onClick={() => setBloodTestStatus("done")}
                        style={{ padding: "14px 16px", background: "rgba(0,0,0,.03)", border: "2px solid rgba(0,0,0,.1)", color: "var(--sl)", fontSize: ".92rem", lineHeight: 1.45, cursor: "pointer", fontFamily: "inherit", borderRadius: 2, textAlign: "left", minHeight: 44 }}
                      >
                        Yes — I know my numbers
                      </button>
                      <button
                        onClick={() => setBloodTestStatus("notDone")}
                        style={{ padding: "14px 16px", background: "rgba(0,0,0,.03)", border: "2px solid rgba(0,0,0,.1)", color: "var(--sl)", fontSize: ".92rem", lineHeight: 1.45, cursor: "pointer", fontFamily: "inherit", borderRadius: 2, textAlign: "left", minHeight: 44 }}
                      >
                        No — I'd like to know my numbers
                      </button>
                    </div>
                  )}

                  {bloodTestStatus === "notDone" && (
                    <div style={{ background: "var(--fo)", padding: "clamp(18px,4vw,26px)", marginTop: 16 }}>
                      <p style={{ fontSize: ".68rem", color: "var(--go)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Recommended — NICE NG23</p>
                      <h3 className="cg" style={{ fontSize: "clamp(1rem,2.5vw,1.35rem)", fontWeight: 500, color: "rgba(246,241,232,.95)", lineHeight: 1.3, marginBottom: 10 }}>
                        Veridian Women's Advanced Health Panel — £295
                      </h3>
                      <p style={{ fontSize: ".84rem", color: "rgba(246,241,232,.68)", lineHeight: 1.85, marginBottom: 16 }}>
                        150+ markers: hormones, thyroid, metabolic, cardiovascular, nutrition, inflammation. GP-reviewed report with personalised next steps within 72 hours. Clinic blood draw: £30 (paid at Randox, nationwide).
                      </p>
                      <Link href="/book?tier=perimenopause-panel" className="btn btn-go" style={{ display: "inline-block" }}>
                        Book the Advanced Health Panel — £295 →
                      </Link>
                      <p style={{ marginTop: 8, fontSize: ".7rem", color: "rgba(246,241,232,.38)" }}>Panel: £295 · Blood draw: £30 at Randox clinic (paid on the day)</p>
                    </div>
                  )}

                  {bloodTestStatus === "done" && (
                    <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8, marginTop: 12, padding: "12px 16px", background: "rgba(20,82,38,.06)", border: "1px solid rgba(20,82,38,.2)" }}>
                      Good — you already have your baseline. The Reset Guide will help you interpret those numbers in the context of your symptoms and map out your next steps.
                    </p>
                  )}
                </div>
              )}

              {/* Virtual Clinical Review — all users */}
              <div style={{ background: "rgba(44,42,38,.05)", border: "1px solid rgba(0,0,0,.1)", padding: "clamp(20px,4vw,28px)" }}>
                <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 6 }}>Virtual Clinical Review</p>
                <h3 className="cg" style={{ fontSize: "clamp(1.1rem,2.8vw,1.45rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, marginBottom: 6 }}>
                  Book a Discounted Clinical Review with Dr Tosin
                </h3>
                <p style={{ fontSize: ".82rem", color: "var(--sl3)", marginBottom: 16 }}>
                  <strong style={{ color: "var(--sl)", fontSize: "1rem" }}>£97</strong>
                  <span style={{ marginLeft: 8, textDecoration: "line-through" }}>£195</span>
                  <span style={{ marginLeft: 8 }}>— quiz taker rate</span>
                </p>
                <ul style={{ margin: "0 0 20px 0", padding: 0, listStyle: "none", display: "grid", gap: 9 }}>
                  {[
                    "Full hormonal & metabolic risk assessment",
                    "30-minute 1:1 with Dr Tosin (video call — not face-to-face)",
                    "Your treatment options explained, including HRT",
                    "What to manage and live with — practical, realistic guidance",
                    "Personalised blood test recommendations",
                  ].map(item => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--go)", fontWeight: 700, marginTop: 1, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: ".86rem", color: "var(--sl2)", lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/book?tier=discovery-quiz" className="btn btn-fo" style={{ padding: "14px 32px", fontSize: ".92rem", display: "inline-block" }}>
                  Book Your Virtual Clinical Review — £97 →
                </Link>
                <p style={{ marginTop: 10, fontSize: ".72rem", color: "var(--sl3)", lineHeight: 1.6 }}>
                  This is a virtual appointment via video call. You'll receive a confirmation with the booking link after payment.
                </p>
              </div>

            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
