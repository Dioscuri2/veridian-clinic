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
  sleep: string;
  activity: string;
  diet: string;
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
    id: "sleep",
    type: "choice" as const,
    label: "How would you describe your sleep?",
    helper: "Sleep quality has a disproportionate effect on glucose regulation and metabolic recovery.",
    options: [
      { label: "7–9 hours, mostly restorative", value: "optimal" },
      { label: "6–7 hours, somewhat inconsistent", value: "mid" },
      { label: "Under 6 hours or poor most nights", value: "low" },
    ],
  },
  {
    id: "activity",
    type: "choice" as const,
    label: "How active are you each week?",
    helper: "Exercise is one of the strongest modifiable levers for metabolic health.",
    options: [
      { label: "Strength and cardio, 4 or more sessions per week", value: "high" },
      { label: "2–3 sessions per week", value: "mid" },
      { label: "Mostly sedentary", value: "low" },
    ],
  },
  {
    id: "diet",
    type: "choice" as const,
    label: "How would you rate your diet quality?",
    options: [
      { label: "Mostly whole foods, protein-forward, low processed intake", value: "high" },
      { label: "Mixed — some processed foods and sugar", value: "mid" },
      { label: "Frequent ultra-processed foods, snacks, or sugary drinks", value: "low" },
    ],
  },
];

const INITIAL: Answers = { age: "", sex: "", heightCm: "", waistCm: "", sleep: "", activity: "", diet: "" };

function computeResult(a: Answers) {
  const chrono = Number(a.age || 0);
  const h = Number(a.heightCm || 0);
  const w = Number(a.waistCm || 0);
  const whtr = h > 0 && w > 0 ? w / h : 0;

  // WHtR → year delta (from original metabolic-age ruleset)
  let whtrYears = 0;
  if (whtr) {
    if (a.sex === "male") {
      whtrYears = whtr < 0.5 ? 0 : whtr < 0.55 ? 4 : whtr < 0.6 ? 7 : 10;
    } else if (a.sex === "female") {
      whtrYears = whtr < 0.45 ? 0 : whtr < 0.5 ? 2 : whtr < 0.55 ? 6 : 10;
    }
  }

  // Sleep → year delta
  const sleepYears = a.sleep === "optimal" ? 1 : a.sleep === "mid" ? 3 : 6;

  // Activity → year delta (negative = positive metabolic protection)
  const activityYears = a.activity === "high" ? -4 : a.activity === "mid" ? -1 : 4;

  // Diet → year delta
  const dietYears = a.diet === "high" ? 0 : a.diet === "mid" ? 2 : 5;

  const delta = whtrYears + sleepYears + activityYears + dietYears;
  const mAge = Math.max(18, Math.min(90, Math.round(chrono + delta)));
  const band = delta <= 3 ? "strong" : delta <= 10 ? "drifting" : "high-risk";

  // Weakest = highest positive year contributor (worst factor)
  const factors = [
    { key: "waist", years: whtrYears },
    { key: "sleep", years: sleepYears },
    { key: "activity", years: Math.max(0, activityYears) },
    { key: "diet", years: dietYears },
  ];
  const weakest = factors.sort((a, b) => b.years - a.years)[0].key;

  return { mAge, chrono, delta, band, weakest };
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
    const { mAge, chrono, delta, band, weakest } = computeResult(answers);
    router.push(`/metabolic-quiz/result?mAge=${mAge}&chrono=${chrono}&delta=${delta}&band=${band}&weakest=${weakest}`);
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
                A fast clinical screening tool to estimate metabolic drift before it becomes obvious disease.
              </p>
              <div className="badge-row a4" style={{ justifyContent: "center", marginBottom: 36 }}>
                <span className="badge">7 Questions</span>
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
