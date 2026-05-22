"use client";
import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

type AgeGroup = "under45" | "45plus";

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
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

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
      setTimeout(() => setSubmitted(true), 280);
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

              {/* Under-45 NICE guidance */}
              {ageGroup === "under45" && (
                <div style={{ maxWidth: 600, margin: "0 auto 32px", textAlign: "left", background: "rgba(20,82,38,.06)", border: "1px solid rgba(20,82,38,.25)", padding: "18px 22px" }}>
                  <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#145226", marginBottom: 8 }}>
                    Important — because you're under 45
                  </p>
                  <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.85, margin: 0 }}>
                    Although these symptoms are consistent with perimenopause, <strong style={{ color: "var(--sl)" }}>NICE guidelines (NG23) recommend blood tests to confirm the diagnosis in women under 45</strong> — symptoms alone are not sufficient at this age. A hormone panel (FSH, oestradiol, thyroid) can give you clarity on what's actually happening and rule out other causes. The blood panel below is the most thorough way to do this.
                  </p>
                </div>
              )}

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

              {/* Blood panel CTA — all bands */}
              <div style={{ maxWidth: 600, margin: "32px auto 0", textAlign: "left", background: "var(--fo)", padding: "clamp(20px,4vw,28px)" }}>
                <p style={{ fontSize: ".68rem", color: "var(--go)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                  {ageGroup === "under45" ? "Recommended for women under 45 — NICE NG23" : "Know your numbers"}
                </p>
                <h3 className="cg" style={{ fontSize: "clamp(1.1rem,2.8vw,1.5rem)", fontWeight: 500, color: "rgba(246,241,232,.95)", lineHeight: 1.3, marginBottom: 10 }}>
                  Veridian Women's Advanced Health Panel — £295
                </h3>
                <p style={{ fontSize: ".86rem", color: "rgba(246,241,232,.72)", lineHeight: 1.85, marginBottom: 16 }}>
                  150+ markers covering hormones (oestradiol, progesterone, FSH, LH, testosterone), full thyroid including antibodies, insulin, HbA1c, vitamin D, ferritin, B12, cardiovascular risk, and more. Includes a GP-reviewed digital report with your personalised next steps. Clinic blood draw: £30 (paid at Randox, nationwide clinics).
                </p>
                <Link href="/book?tier=perimenopause-panel" className="btn btn-go" style={{ display: "inline-block" }}>
                  Book the Advanced Health Panel — £295 →
                </Link>
                <p style={{ marginTop: 8, fontSize: ".72rem", color: "rgba(246,241,232,.4)" }}>Panel: £295 · Clinic blood draw: £30 (paid at Randox on the day)</p>
              </div>

              {band === "high" && (
                <div style={{ marginTop: 20, maxWidth: 600, margin: "20px auto 0" }}>
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
