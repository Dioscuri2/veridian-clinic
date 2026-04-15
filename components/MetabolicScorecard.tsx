"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LeadCaptureForm from "@/components/LeadCaptureForm";

type Answers = {
  age: string;
  sex: "male" | "female" | "";
  heightCm: string;
  waistCm: string;
  sleep: string | null;
  activity: string | null;
  diet: string | null;
};

type Band = {
  label: string;
  tone: string;
  color: string;
  bg: string;
  note: string;
};

const QUESTIONS = [
  { id: "age", type: "number", label: "How old are you?", helper: "Used to frame your result.", placeholder: "e.g. 42", min: 18, max: 90 },
  { id: "sex", type: "choice", label: "Biological sex", helper: "Used for waist-to-height interpretation.", options: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ] },
  { id: "heightCm", type: "number", label: "Height (cm)", helper: "Example: 175", placeholder: "e.g. 175", min: 100, max: 250 },
  { id: "waistCm", type: "number", label: "Waist circumference (cm)", helper: "Measure at navel height, relaxed.", placeholder: "e.g. 92", min: 40, max: 220 },
  { id: "sleep", type: "choice", label: "Average sleep quality and duration", options: [
    { label: "7 to 9 hours, mostly restorative", value: "optimal" },
    { label: "6 to 7 hours, somewhat inconsistent", value: "mid" },
    { label: "Under 6 hours or poor most nights", value: "low" },
  ] },
  { id: "activity", type: "choice", label: "Weekly activity level", options: [
    { label: "Strength + cardio 4+ sessions per week", value: "high" },
    { label: "2 to 3 sessions per week", value: "mid" },
    { label: "Mostly sedentary", value: "low" },
  ] },
  { id: "diet", type: "choice", label: "Typical diet quality", options: [
    { label: "Mostly whole foods, protein-forward, low ultra-processed intake", value: "high" },
    { label: "Mixed, with some processed foods and sugar", value: "mid" },
    { label: "Frequent ultra-processed foods, snacks, or sugary drinks", value: "low" },
  ] },
] as const;

const initialAnswers: Answers = {
  age: "",
  sex: "",
  heightCm: "",
  waistCm: "",
  sleep: null,
  activity: null,
  diet: null,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getBand(score: number): Band {
  if (score >= 75) {
    return {
      label: "Strong",
      tone: "On Track",
      color: "var(--grn)",
      bg: "rgba(20,82,38,.08)",
      note: "Your inputs suggest relatively strong metabolic resilience. The priority is protecting momentum and validating the unseen biomarkers early.",
    };
  }
  if (score >= 50) {
    return {
      label: "Drifting",
      tone: "Needs Attention",
      color: "var(--amr)",
      bg: "rgba(138,85,0,.08)",
      note: "There are early signs of metabolic drift. This is often the best intervention window, before more obvious dysfunction becomes established.",
    };
  }
  return {
    label: "High Risk Pattern",
    tone: "High Priority",
    color: "var(--red)",
    bg: "rgba(122,22,22,.08)",
    note: "Your answers suggest a higher-risk pattern. That does not make the outcome fixed, but it does mean earlier action is likely to matter.",
  };
}

export default function MetabolicScorecard() {
  const searchParams = useSearchParams();
  const embed = searchParams?.get("embed") === "true";
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [animateScore, setAnimateScore] = useState(0);

  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const age = Number(answers.age || 0);
  const heightCm = Number(answers.heightCm || 0);
  const waistCm = Number(answers.waistCm || 0);
  const whtr = heightCm > 0 && waistCm > 0 ? waistCm / heightCm : 0;

  const sleepScore = answers.sleep === "optimal" ? 100 : answers.sleep === "mid" ? 65 : 30;
  const activityScore = answers.activity === "high" ? 100 : answers.activity === "mid" ? 65 : 25;
  const dietScore = answers.diet === "high" ? 100 : answers.diet === "mid" ? 60 : 20;
  const whtrScore = useMemo(() => {
    if (!whtr || !answers.sex) return 0;
    if (answers.sex === "male") {
      if (whtr < 0.5) return 100;
      if (whtr < 0.55) return 65;
      return 25;
    }
    if (whtr < 0.45) return 100;
    if (whtr < 0.5) return 70;
    return 25;
  }, [whtr, answers.sex]);

  const totalScore = Math.round((whtrScore * 0.4) + (sleepScore * 0.2) + (activityScore * 0.2) + (dietScore * 0.2));
  const band = getBand(totalScore);

  const weakestFactor = useMemo(() => {
    const factors = [
      { label: "Waist-to-height ratio", score: whtrScore, detail: whtr ? `WHtR ${whtr.toFixed(2)}` : "Add body metrics" },
      { label: "Sleep", score: sleepScore, detail: answers.sleep === "optimal" ? "Recovery looks supportive" : answers.sleep === "mid" ? "Sleep consistency may be pulling the score down" : "Sleep appears to be a major drag factor" },
      { label: "Activity", score: activityScore, detail: answers.activity === "high" ? "Activity is supportive" : answers.activity === "mid" ? "More weekly movement would help" : "Low movement is a likely metabolic drag" },
      { label: "Diet", score: dietScore, detail: answers.diet === "high" ? "Diet quality looks supportive" : answers.diet === "mid" ? "Diet quality is mixed" : "Diet quality is likely a major driver" },
    ];
    return factors.sort((a, b) => a.score - b.score)[0];
  }, [activityScore, answers.activity, answers.diet, answers.sleep, dietScore, sleepScore, whtr, whtrScore]);

  useEffect(() => {
    if (!submitted) return;
    const target = totalScore;
    const timer = window.setInterval(() => {
      setAnimateScore((current) => {
        if (current >= target) {
          window.clearInterval(timer);
          return target;
        }
        return Math.min(target, current + 2);
      });
    }, 18);
    return () => window.clearInterval(timer);
  }, [submitted, totalScore]);

  const current = QUESTIONS[step];

  function canContinue() {
    switch (current.id) {
      case "age": return Number(answers.age) >= 18;
      case "sex": return !!answers.sex;
      case "heightCm": return Number(answers.heightCm) > 0;
      case "waistCm": return Number(answers.waistCm) > 0;
      case "sleep": return !!answers.sleep;
      case "activity": return !!answers.activity;
      case "diet": return !!answers.diet;
      default: return false;
    }
  }

  function handleNext() {
    if (!canContinue()) return;
    if (step === QUESTIONS.length - 1) {
      setSubmitted(true);
      return;
    }
    setStep((s) => s + 1);
  }

  function handleBack() {
    if (submitted) {
      setSubmitted(false);
      setAnimateScore(0);
      setStep(QUESTIONS.length - 1);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  function reset() {
    setAnswers(initialAnswers);
    setStep(0);
    setSubmitted(false);
    setAnimateScore(0);
  }

  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const gaugeOffset = circumference - (clamp(animateScore, 0, 100) / 100) * circumference;

  return (
    <div className="card" style={{ maxWidth: 1040, margin: "0 auto", padding: "clamp(24px,4vw,44px)", overflow: "hidden" }}>
      <div className="text-center" style={{ maxWidth: 760, margin: "0 auto 30px" }}>
        <p className="lbl">Metabolic Health Scorecard</p>
        <div className="rule rule-c" />
        <h3 className="sh-title">A 7-question metabolic risk snapshot</h3>
        <p className="sh-body" style={{ maxWidth: 720 }}>
          Score your current position using waist-to-height ratio, sleep, activity, and diet, then unlock the free GP-recommended blood test guide.
        </p>
      </div>

      {!submitted ? (
        <div style={{ display: "grid", gap: 26 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
              <p className="lbl">Question {step + 1} of {QUESTIONS.length}</p>
              <p style={{ fontSize: ".78rem", color: "var(--sl3)" }}>{Math.round(progress)}% complete</p>
            </div>
            <div className="prog-track"><div className="prog-fill" style={{ width: `${progress}%` }} /></div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <h4 className="cg" style={{ fontSize: "clamp(1.6rem,3.5vw,2.3rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2 }}>{current.label}</h4>
            {"helper" in current && current.helper ? (
              <p style={{ fontSize: ".9rem", color: "var(--sl3)", lineHeight: 1.8 }}>{current.helper}</p>
            ) : null}

            {current.type === "number" ? (
              <input
                type="number"
                min={current.min}
                max={current.max}
                placeholder={current.placeholder}
                value={answers[current.id as keyof Answers] as string}
                onChange={(event) => setAnswers((prev) => ({ ...prev, [current.id]: event.target.value }))}
                className="form-field"
                style={{ maxWidth: 360 }}
              />
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {current.options.map((option) => {
                  const active = answers[current.id as keyof Answers] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`q-opt ${active ? "selected" : ""}`}
                      onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: option.value }))}
                    >
                      <span className="q-opt-letter">{option.label.charAt(0)}</span>
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="btn btn-ol" onClick={handleBack} disabled={step === 0}>Back</button>
            <button type="button" className="btn btn-go" onClick={handleNext} disabled={!canContinue()}>
              {step === QUESTIONS.length - 1 ? "Reveal my score →" : "Continue →"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 28 }}>
          <div style={{ display: "grid", gap: 28, alignItems: "center", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div style={{ display: "grid", placeItems: "center" }}>
              <div style={{ position: "relative", width: 240, height: 240 }}>
                <svg width="240" height="240" viewBox="0 0 240 240" aria-label="Metabolic score gauge">
                  <circle cx="120" cy="120" r={radius} fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="18" />
                  <circle
                    cx="120"
                    cy="120"
                    r={radius}
                    fill="none"
                    stroke={band.color}
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={gaugeOffset}
                    transform="rotate(-90 120 120)"
                    style={{ transition: "stroke-dashoffset .6s ease" }}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
                  <div>
                    <p style={{ fontSize: ".72rem", color: "var(--sl3)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 4 }}>Your Score</p>
                    <div className="cg" style={{ fontSize: "3.8rem", fontWeight: 500, lineHeight: 1, color: band.color }}>{animateScore}</div>
                    <p style={{ fontSize: ".92rem", color: "var(--sl2)", marginTop: 6 }}>{band.label}</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", background: band.bg, color: band.color, fontSize: ".74rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", width: "fit-content" }}>
                {band.tone}
              </div>
              <h4 className="cg" style={{ fontSize: "clamp(1.8rem,3.8vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2 }}>
                {age ? `Age ${age} snapshot, metabolic profile ${band.label.toLowerCase()}.` : "Your metabolic snapshot is ready."}
              </h4>
              <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.9 }}>{band.note}</p>

              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { label: "Waist-to-height", score: whtrScore, detail: whtr ? `WHtR ${whtr.toFixed(2)}` : "Not enough data" },
                  { label: "Sleep", score: sleepScore, detail: answers.sleep === "optimal" ? "Supportive" : answers.sleep === "mid" ? "Mixed" : "Likely drag factor" },
                  { label: "Activity", score: activityScore, detail: answers.activity === "high" ? "Supportive" : answers.activity === "mid" ? "Moderate" : "Likely drag factor" },
                  { label: "Diet", score: dietScore, detail: answers.diet === "high" ? "Supportive" : answers.diet === "mid" ? "Mixed" : "Likely drag factor" },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
                      <span style={{ fontSize: ".85rem", color: "var(--sl)", fontWeight: 500 }}>{item.label}</span>
                      <span style={{ fontSize: ".78rem", color: "var(--sl3)" }}>{item.detail}</span>
                    </div>
                    <div className="sc-bar-track"><div className="sc-bar-fill" style={{ width: `${item.score}%`, background: item.score >= 75 ? "var(--grn)" : item.score >= 50 ? "var(--amr)" : "var(--red)", animation: "none" }} /></div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "16px 18px", background: "var(--iv)", borderLeft: `3px solid ${band.color}` }}>
                <p style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                  <strong style={{ color: band.color }}>Biggest callout:</strong> {weakestFactor.label} is your most likely current drag factor. {weakestFactor.detail}.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "start" }}>
            <div style={{ background: "var(--iv)", border: "1px solid rgba(0,0,0,.07)", padding: "24px" }}>
              <p className="lbl" style={{ marginBottom: 10 }}>Free Next Step</p>
              <h5 className="cg" style={{ fontSize: "2rem", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 12 }}>
                Get the GP-Recommended Blood Test Guide
              </h5>
              <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 18 }}>
                Enter your email to unlock the free guide, plus the blood markers most likely to matter for metabolic health, insulin resistance, and cardiovascular risk.
              </p>
              <LeadCaptureForm
                source="metabolic-scorecard"
                quizScore={totalScore}
                resultBand={band.label}
                metadata={{ whtr: whtr ? Number(whtr.toFixed(2)) : null, age, sleep: answers.sleep, activity: answers.activity, diet: answers.diet }}
                title="Unlock the free guide"
                subtitle="We’ll send your guide straight to your inbox."
                ctaLabel="Email me the guide →"
                buttonClassName="btn btn-go btn-full"
                compact
                fields={["firstName", "email"]}
              />
            </div>

            <div style={{ background: "var(--wh)", border: "1px solid rgba(0,0,0,.07)", padding: "24px" }}>
              <p className="lbl" style={{ marginBottom: 10 }}>Optional Upgrade</p>
              <h5 className="cg" style={{ fontSize: "2rem", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 12 }}>
                Metabolic Reset PDF, £19.99
              </h5>
              <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 18 }}>
                A soft next step for people who want practical action now: meal timing, protein targets, training priorities, sleep anchors, and a 14-day reset structure.
              </p>
              <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
                {[
                  "Simple GP-style risk interpretation",
                  "Daily reset checklist",
                  "Sleep, activity, and diet action plan",
                  "Designed to pair with the blood test guide",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--go)", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/book?tier=baseline" className="btn btn-fo btn-full">See the full clinical pathway →</Link>
              <p style={{ fontSize: ".75rem", color: "var(--sl3)", lineHeight: 1.7, marginTop: 12 }}>
                Soft upsell only. The free guide is available without purchase.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="btn btn-ol" onClick={handleBack}>Back</button>
            <button type="button" className="btn btn-ol" onClick={reset}>Retake scorecard</button>
            {!embed ? <Link href="/book?tier=baseline" className="btn btn-go">Book a baseline audit →</Link> : null}
          </div>
        </div>
      )}
    </div>
  );
}
