"use client";
import { useState } from "react";
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
    text: "Do you experience sudden flashes of rage, irritability, or emotion completely out of proportion — then feel fine ten minutes later?",
    options: [
      "Rarely — my moods feel even",
      "Occasionally",
      "Regularly — it genuinely doesn't feel like me",
      "Frequently — it's affecting my relationships",
    ],
    scores: [0, 1, 2, 3],
  },
];

type Band = "low" | "moderate" | "high";

function getBand(score: number): Band {
  if (score <= 3) return "low";
  if (score <= 7) return "moderate";
  return "high";
}

const RESULTS: Record<Band, { label: string; headline: string; body: string; colour: string }> = {
  low: {
    label: "Early Stage / Low Burden",
    headline: "Your symptoms are mild — but the shift may be beginning.",
    body: "You're likely in the early stages of the transition, or managing symptoms well. The right habits now protect your sleep, metabolism and mental clarity over the next decade.",
    colour: "#145226",
  },
  moderate: {
    label: "Moderate Symptom Burden",
    headline: "Classic perimenopause. Your body is telling you something is shifting.",
    body: "Brain fog, disrupted sleep, and changing weight at this level are almost always oestrogen–progesterone fluctuation — not stress, not age. The six-week Reset Guide was built for exactly this stage.",
    colour: "#8a5500",
  },
  high: {
    label: "High Symptom Burden",
    headline: "Your symptoms are significant. You need more than general advice.",
    body: "At this level, lifestyle changes alone may not be enough without understanding your hormonal baseline first. The Reset Guide walks you through exactly which blood tests to request and when to have an HRT conversation.",
    colour: "#7a1616",
  },
};

const LABEL_MAP: Record<string, string> = {
  sleep: "Sleep",
  brain: "Brain fog",
  weight: "Weight",
  mood: "Mood",
};

export default function PerimenopauseQuizPage() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Email capture state
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const current = QUESTIONS[step];
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const band = getBand(totalScore);
  const result = RESULTS[band];
  const maxScore = QUESTIONS.reduce((a, q) => a + Math.max(...q.scores), 0);
  const pct = Math.round((totalScore / maxScore) * 100);

  const progress = submitted ? 100 : Math.round((step / QUESTIONS.length) * 100);

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

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");
    if (!email.trim()) { setEmailError("Please enter your email address."); return; }
    setEmailLoading(true);
    try {
      const res = await fetch("/api/peri-guide-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          source: "perimenopause-quiz",
          metadata: { band, score: totalScore, pct, ageGroup },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      window.location.href = "/perimenopause-guide/thank-you";
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setEmailLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    padding: "13px 16px",
    fontSize: ".95rem",
    fontFamily: "inherit",
    border: "1.5px solid rgba(0,0,0,.15)",
    background: "#fff",
    color: "var(--sl)",
    outline: "none",
    borderRadius: 2,
    width: "100%",
    boxSizing: "border-box",
  };

  // ── Age screen ──
  if (!ageGroup) {
    return (
      <>
        <style>{FONTS + CSS}</style>
        <Navigation />
        <main style={{ paddingTop: "var(--nav-h)", minHeight: "100svh", background: "var(--iv)" }}>
          <section className="sec" style={{ paddingTop: 56, paddingBottom: 80 }}>
            <div className="wrap" style={{ maxWidth: 640 }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <p className="lbl" style={{ fontSize: ".75rem", letterSpacing: ".18em" }}>Free Perimenopause Symptom Check</p>
                <div className="rule rule-c" />
                <h1 className="cg" style={{ fontSize: "clamp(2.4rem,6vw,3.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.1, marginBottom: 14 }}>
                  Is this perimenopause?
                </h1>
                <p style={{ fontSize: "clamp(1rem,2.5vw,1.1rem)", color: "var(--sl2)", lineHeight: 1.85 }}>
                  4 questions · Under 90 seconds · Written by a GP
                </p>
              </div>
              <div className="card" style={{ padding: "clamp(20px,5vw,36px)" }}>
                <p style={{ fontSize: "clamp(1.2rem,3.5vw,1.45rem)", fontWeight: 600, color: "var(--sl)", lineHeight: 1.5, marginBottom: 24 }}>
                  First — how old are you?
                </p>
                <div style={{ display: "grid", gap: 12 }}>
                  {AGE_OPTIONS.map(opt => (
                    <button
                      key={opt.label}
                      onClick={() => setAgeGroup(opt.group)}
                      style={{ textAlign: "left", padding: "clamp(14px,3vw,18px) clamp(16px,4vw,24px)", background: "rgba(0,0,0,.03)", border: "2px solid rgba(0,0,0,.1)", color: "var(--sl)", fontSize: "clamp(1rem,2.5vw,1.08rem)", lineHeight: 1.55, cursor: "pointer", transition: "all .18s ease", fontFamily: "inherit", borderRadius: 2, minHeight: 44 }}
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
          // ── Quiz questions ──
          <section className="sec" style={{ paddingTop: 56, paddingBottom: 80 }}>
            <div className="wrap" style={{ maxWidth: 640 }}>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <p className="lbl" style={{ fontSize: ".75rem", letterSpacing: ".18em" }}>Free Perimenopause Symptom Check</p>
                <div className="rule rule-c" />
                <h1 className="cg" style={{ fontSize: "clamp(2.4rem,6vw,3.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.1, marginBottom: 14 }}>
                  Is this perimenopause?
                </h1>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: ".8rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)" }}>
                    Question {step + 1} of {QUESTIONS.length}
                  </span>
                  <span style={{ fontSize: ".8rem", color: "var(--sl3)" }}>{progress}%</span>
                </div>
                <div style={{ height: 6, background: "rgba(0,0,0,.08)", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: "var(--go)", borderRadius: 3, transition: "width .4s ease" }} />
                </div>
              </div>

              {/* Question card */}
              <div className="card" style={{ marginBottom: 20, padding: "clamp(20px,5vw,36px)" }}>
                <p style={{ fontSize: "clamp(1.2rem,3.5vw,1.5rem)", fontWeight: 600, color: "var(--sl)", lineHeight: 1.5, marginBottom: 28 }}>
                  {current.text}
                </p>
                <div style={{ display: "grid", gap: 12 }}>
                  {current.options.map((opt, i) => {
                    const selected = answers[current.id] === current.scores[i];
                    return (
                      <button
                        key={opt}
                        onClick={() => select(current.scores[i])}
                        style={{ textAlign: "left", padding: "clamp(14px,3vw,18px) clamp(16px,4vw,24px)", background: selected ? "var(--fo)" : "rgba(0,0,0,.03)", border: `2px solid ${selected ? "var(--fo)" : "rgba(0,0,0,.1)"}`, color: selected ? "var(--iv)" : "var(--sl)", fontSize: "clamp(1rem,2.5vw,1.08rem)", lineHeight: 1.55, cursor: "pointer", transition: "all .18s ease", fontFamily: "inherit", borderRadius: 2, minHeight: 44 }}
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
          // ── Results ──
          <section className="sec" style={{ paddingTop: 56, paddingBottom: 80 }}>
            <div className="wrap" style={{ maxWidth: 620 }}>

              {/* Score + band */}
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ width: 88, height: 88, borderRadius: "50%", margin: "0 auto 20px", background: "var(--fo)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--go)", lineHeight: 1 }}>{pct}%</span>
                  <span style={{ fontSize: ".58rem", color: "rgba(246,241,232,.5)", letterSpacing: ".1em", textTransform: "uppercase" }}>score</span>
                </div>
                <div style={{ display: "inline-block", padding: "4px 14px", background: result.colour + "22", border: `1px solid ${result.colour}55`, marginBottom: 16 }}>
                  <span style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: result.colour }}>{result.label}</span>
                </div>
                <h2 className="cg" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 12 }}>
                  {result.headline}
                </h2>
                <p style={{ fontSize: "clamp(.95rem,2vw,1rem)", color: "var(--sl2)", lineHeight: 1.9, maxWidth: 500, margin: "0 auto" }}>
                  {result.body}
                </p>
              </div>

              {/* Score bars */}
              <div className="card" style={{ marginBottom: 28 }}>
                <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 14 }}>Your symptom areas</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  {QUESTIONS.map(q => {
                    const s = answers[q.id] ?? 0;
                    const maxS = Math.max(...q.scores);
                    return (
                      <div key={q.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: ".78rem", color: "var(--sl2)" }}>{LABEL_MAP[q.id]}</span>
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

              {/* Under-45 note */}
              {ageGroup === "under45" && (
                <div style={{ marginBottom: 24, padding: "14px 18px", background: "rgba(20,82,38,.05)", border: "1px solid rgba(20,82,38,.2)" }}>
                  <p style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.8, margin: 0 }}>
                    <strong style={{ color: "#145226" }}>Because you're under 45:</strong> NICE guidelines (NG23) recommend blood tests to confirm perimenopause at this age — the free guide covers exactly which tests to request.
                  </p>
                </div>
              )}

              {/* Email capture — guide as the reward */}
              <div className="card" style={{ background: "var(--fo)", padding: "clamp(22px,5vw,36px)", textAlign: "center" }}>
                <p style={{ fontSize: ".68rem", color: "var(--go)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>
                  Free — based on your results
                </p>
                <h3 className="cg" style={{ fontSize: "clamp(1.2rem,3vw,1.7rem)", fontWeight: 500, color: "rgba(246,241,232,.95)", lineHeight: 1.3, marginBottom: 10 }}>
                  Get your personalised Reset Guide
                </h3>
                <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.62)", lineHeight: 1.8, marginBottom: 22, maxWidth: 420, margin: "0 auto 22px" }}>
                  The six-week GP-authored guide, with your blood test checklist and the next clinical steps matched to your symptom level. Enter your email — download it instantly.
                </p>

                <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 380, margin: "0 auto" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      style={{ ...inputStyle, background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(200,168,75,.3)", color: "var(--iv)" }}
                      aria-label="First name"
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      style={{ ...inputStyle, background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(200,168,75,.3)", color: "var(--iv)" }}
                      aria-label="Email address"
                    />
                  </div>
                  {emailError && <p style={{ fontSize: ".82rem", color: "#f88", margin: 0 }}>{emailError}</p>}
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="btn btn-go"
                    style={{ padding: "15px 32px", fontSize: ".95rem", opacity: emailLoading ? 0.65 : 1, cursor: emailLoading ? "default" : "pointer" }}
                  >
                    {emailLoading ? "Sending…" : "Download My Free Guide →"}
                  </button>
                  <p style={{ fontSize: ".72rem", color: "rgba(246,241,232,.35)", margin: 0, lineHeight: 1.7 }}>
                    No payment. No spam. Instant PDF download.
                  </p>
                </form>
              </div>

            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
