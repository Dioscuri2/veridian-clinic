"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

type Answers = {
  age: string;
  sex: string;
  heightCm: string;
  waistCm: string;
  energy: string;
  sleep: string;
  stress: string;
  activity: string;
  diet: string;
  gut: string;
};

const QUESTIONS = [
  {
    id: "age",
    type: "number" as const,
    label: "How old are you?",
    helper: "We use this as the baseline for your metabolic drift estimate.",
    placeholder: "e.g. 42",
    min: 18,
    max: 90,
  },
  {
    id: "sex",
    type: "choice" as const,
    label: "What is your biological sex?",
    helper: "Used for waist-to-height interpretation thresholds.",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    id: "heightCm",
    type: "number" as const,
    label: "What is your height in cm?",
    helper: "Used to calculate your waist-to-height ratio — a stronger metabolic predictor than BMI.",
    placeholder: "e.g. 175",
    min: 100,
    max: 250,
  },
  {
    id: "waistCm",
    type: "number" as const,
    label: "What is your waist circumference in cm?",
    helper: "Measure at navel height, relaxed. This is your most clinically significant single input.",
    placeholder: "e.g. 92",
    min: 40,
    max: 220,
  },
  {
    id: "energy",
    type: "choice" as const,
    label: "How would you describe your energy levels through the day?",
    helper: "Post-meal energy crashes and persistent afternoon fatigue are early markers of hyperinsulinaemia — often years before fasting glucose moves.",
    options: [
      { label: "Consistently strong — I rarely feel a significant energy dip", value: "high" },
      { label: "Noticeable afternoon dip, but I recover without much difficulty", value: "mid" },
      { label: "Frequent crashes after meals, or persistent low energy most days", value: "low" },
    ],
  },
  {
    id: "sleep",
    type: "choice" as const,
    label: "How would you describe your sleep?",
    helper: "Poor sleep quality disrupts insulin sensitivity, cortisol rhythm, and appetite signalling — independently of how many hours you log.",
    options: [
      { label: "7–9 hours, mostly restorative — I wake feeling refreshed", value: "optimal" },
      { label: "6–7 hours, or I sleep enough but rarely feel fully recovered", value: "mid" },
      { label: "Under 6 hours, or consistently poor quality most nights", value: "low" },
    ],
  },
  {
    id: "stress",
    type: "choice" as const,
    label: "How would you describe your stress load over the past 3 months?",
    helper: "Chronic cortisol elevation is directly causal for visceral fat accumulation and insulin resistance — independent of diet and exercise.",
    options: [
      { label: "Manageable — I have good recovery between demanding periods", value: "low" },
      { label: "Elevated but functional — I push through, though it's building", value: "mid" },
      { label: "Chronically high — rarely switching off, frequent exhaustion or overwhelm", value: "high" },
    ],
  },
  {
    id: "activity",
    type: "choice" as const,
    label: "How active are you each week?",
    helper: "Skeletal muscle is the primary site of glucose disposal. Regular resistance training is one of the most direct levers for reversing insulin resistance.",
    options: [
      { label: "Strength and cardio, 4 or more sessions per week", value: "high" },
      { label: "2–3 sessions per week, mixed types", value: "mid" },
      { label: "Mostly sedentary — fewer than 2 structured sessions per week", value: "low" },
    ],
  },
  {
    id: "diet",
    type: "choice" as const,
    label: "How would you rate your diet quality?",
    helper: "Dietary insulin load, fibre intake, and ultra-processed food frequency are the three strongest dietary predictors of metabolic age drift.",
    options: [
      { label: "Mostly whole foods, protein-forward, low in processed intake", value: "high" },
      { label: "Mixed — some processed foods and sugar, but not every day", value: "mid" },
      { label: "Frequent ultra-processed foods, sugary drinks, or high-carb snacking", value: "low" },
    ],
  },
  {
    id: "gut",
    type: "choice" as const,
    label: "How is your digestive health?",
    helper: "Gut dysbiosis increases intestinal permeability, triggering systemic low-grade inflammation that directly impairs insulin sensitivity and accelerates metabolic ageing.",
    options: [
      { label: "Good — regular, comfortable, no persistent bloating or discomfort", value: "good" },
      { label: "Occasional bloating or irregularity — a few times per week", value: "mid" },
      { label: "Frequent bloating, pain, or irregular bowel habits most days", value: "poor" },
    ],
  },
];

const INITIAL: Answers = {
  age: "", sex: "", heightCm: "", waistCm: "",
  energy: "", sleep: "", stress: "", activity: "", diet: "", gut: "",
};

function computeResult(a: Answers) {
  const chrono = Number(a.age || 0);
  const h = Number(a.heightCm || 0);
  const w = Number(a.waistCm || 0);
  const whtr = h > 0 && w > 0 ? w / h : 0;

  // WHtR → year delta
  let whtrYears = 0;
  if (whtr) {
    if (a.sex === "male") {
      whtrYears = whtr < 0.5 ? 0 : whtr < 0.55 ? 4 : whtr < 0.6 ? 7 : 10;
    } else {
      whtrYears = whtr < 0.45 ? 0 : whtr < 0.5 ? 2 : whtr < 0.55 ? 6 : 10;
    }
  }

  // Energy → year delta (hyperinsulinaemia proxy)
  const energyYears = a.energy === "high" ? -1 : a.energy === "mid" ? 2 : 4;

  // Sleep → year delta (restorative sleep is metabolically protective, not neutral)
  const sleepYears = a.sleep === "optimal" ? -1 : a.sleep === "mid" ? 3 : 6;

  // Stress → year delta (cortisol/visceral fat pathway)
  const stressYears = a.stress === "low" ? 0 : a.stress === "mid" ? 3 : 6;

  // Activity → year delta
  const activityYears = a.activity === "high" ? -4 : a.activity === "mid" ? -1 : 4;

  // Diet → year delta
  const dietYears = a.diet === "high" ? 0 : a.diet === "mid" ? 2 : 5;

  // Gut → year delta (systemic inflammation proxy)
  const gutYears = a.gut === "good" ? 0 : a.gut === "mid" ? 1 : 3;

  const rawDelta = whtrYears + energyYears + sleepYears + stressYears + activityYears + dietYears + gutYears;

  // Normalise: 10-question version has higher theoretical max, scale down slightly
  // so band thresholds remain meaningful
  const delta = Math.round(rawDelta * 0.82);

  const mAge = Math.max(18, Math.min(90, Math.round(chrono + delta)));
  const band = delta <= 3 ? "strong" : delta <= 10 ? "drifting" : "high-risk";

  // Weakest = highest positive year contributor
  const factors = [
    { key: "waist", years: whtrYears },
    { key: "energy", years: Math.max(0, energyYears) },
    { key: "sleep", years: sleepYears },
    { key: "stress", years: stressYears },
    { key: "activity", years: Math.max(0, activityYears) },
    { key: "diet", years: dietYears },
    { key: "gut", years: gutYears },
  ];
  const weakest = factors.sort((a, b) => b.years - a.years)[0].key;

  return {
    mAge, chrono, delta, band, weakest,
    scores: { waist: whtrYears, energy: energyYears, sleep: sleepYears, stress: stressYears, activity: activityYears, diet: dietYears, gut: gutYears },
  };
}

function canAdvance(step: number, answers: Answers): boolean {
  const q = QUESTIONS[step];
  if (!q) return false;
  if (q.type === "number") {
    const v = Number(answers[q.id as keyof Answers] || 0);
    return v >= q.min! && v <= q.max!;
  }
  return !!answers[q.id as keyof Answers];
}

export default function MetabolicQuizPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL);

  const q = QUESTIONS[step];
  const ready = canAdvance(step, answers);
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const isLast = step === QUESTIONS.length - 1;

  function setAnswer(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext() {
    if (!ready) return;
    if (!isLast) { setStep((s) => s + 1); return; }
    const { mAge, chrono, delta, band, weakest, scores } = computeResult(answers);
    const s = scores;
    router.push(`/metabolic-quiz/result?mAge=${mAge}&chrono=${chrono}&delta=${delta}&band=${band}&weakest=${weakest}&fw=${s.waist}&fe=${s.energy}&fs=${s.sleep}&fst=${s.stress}&fa=${s.activity}&fd=${s.diet}&fg=${s.gut}`);
  }

  function handleBack() {
    if (step === 0) { setStarted(false); return; }
    setStep((s) => s - 1);
  }

  if (!started) {
    return (
      <>
        <style>{FONTS + CSS}</style>
        <Navigation />
        <main style={{ paddingTop: "var(--nav-h)" }}>
          <section
            className="sec bg-iv"
            style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", alignItems: "center" }}
          >
            <div className="wrap" style={{ maxWidth: 820, textAlign: "center" }}>
              <p className="lbl a1">Free Clinical Tool</p>
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
                Get Your Metabolic Age
                <br />
                <em style={{ fontStyle: "italic", color: "var(--fo)" }}>in 60 Seconds</em>
              </h1>
              <p
                className="a3"
                style={{
                  fontSize: "clamp(.97rem,2.4vw,1.1rem)",
                  color: "var(--sl2)",
                  lineHeight: 1.95,
                  maxWidth: 600,
                  margin: "0 auto 30px",
                }}
              >
                A 10-question clinical screening tool that estimates your biological age across seven metabolic pathways — before dysfunction becomes visible disease.
              </p>
              <div className="badge-row a4" style={{ justifyContent: "center", marginBottom: 36 }}>
                <span className="badge">10 Questions</span>
                <span className="badge">Clinical Framework</span>
                <span className="badge">Instant Result</span>
                <span className="badge">Free</span>
              </div>
              <button
                onClick={() => setStarted(true)}
                className="btn btn-fo a4"
                style={{ fontSize: ".92rem", padding: "15px 40px" }}
              >
                Start the Quiz →
              </button>
              <p style={{ fontSize: ".78rem", color: "var(--sl3)", marginTop: 18, lineHeight: 1.7 }}>
                No account required. Your data is used only to generate your result.
              </p>
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
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <p className="lbl">Question {step + 1} of {QUESTIONS.length}</p>
              <p style={{ fontSize: ".78rem", color: "var(--sl3)" }}>{Math.round(progress)}% complete</p>
            </div>
            <div className="prog-track" style={{ marginBottom: 32 }}>
              <div className="prog-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="card">
              <h2
                className="cg"
                style={{
                  fontSize: "clamp(1.7rem,4vw,2.5rem)",
                  fontWeight: 500,
                  color: "var(--sl)",
                  lineHeight: 1.25,
                  marginBottom: q.helper ? 12 : 28,
                }}
              >
                {q.label}
              </h2>
              {"helper" in q && q.helper && (
                <p style={{ fontSize: ".88rem", color: "var(--sl3)", lineHeight: 1.8, marginBottom: 26 }}>
                  {q.helper}
                </p>
              )}

              {q.type === "number" ? (
                <input
                  key={q.id}
                  type="number"
                  min={q.min}
                  max={q.max}
                  placeholder={q.placeholder}
                  value={answers[q.id as keyof Answers]}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && ready) handleNext(); }}
                  className="form-field"
                  style={{ maxWidth: 320, marginBottom: 28 }}
                  autoFocus
                />
              ) : (
                <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
                  {"options" in q &&
                    q.options.map((opt, idx) => {
                      const active = answers[q.id as keyof Answers] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`q-opt${active ? " selected" : ""}`}
                          onClick={() => setAnswer(q.id, opt.value)}
                        >
                          <span className="q-opt-letter">{String.fromCharCode(65 + idx)}</span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                </div>
              )}

              <div style={{ display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
                <button type="button" className="btn btn-ol" onClick={handleBack}>
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-fo"
                  onClick={handleNext}
                  disabled={!ready}
                  style={{ opacity: ready ? 1 : 0.45 }}
                >
                  {isLast ? "See My Result →" : "Continue →"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
