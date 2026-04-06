"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const questions = [
  {
    q: "How often do you experience an afternoon energy crash?",
    options: [
      { label: "Rarely or never", score: 0 },
      { label: "1–2 times per week", score: 1 },
      { label: "Most weekdays", score: 2 },
      { label: "Almost every day", score: 3 },
    ],
  },
  {
    q: "How concerned are you about your weight or body composition right now?",
    options: [
      { label: "Not concerned", score: 0 },
      { label: "Mildly concerned", score: 1 },
      { label: "Moderately concerned", score: 2 },
      { label: "Very concerned", score: 3 },
    ],
  },
  {
    q: "How would you describe your sleep quality?",
    options: [
      { label: "Consistently good", score: 0 },
      { label: "Fairly good", score: 1 },
      { label: "Inconsistent", score: 2 },
      { label: "Poor most nights", score: 3 },
    ],
  },
  {
    q: "Do you have a family history of diabetes, heart disease, or high cholesterol?",
    options: [
      { label: "No", score: 0 },
      { label: "Not sure", score: 1 },
      { label: "Yes — one close relative", score: 2 },
      { label: "Yes — multiple close relatives", score: 3 },
    ],
  },
  {
    q: "Have you ever had advanced markers like ApoB, fasting insulin, or Lp(a) checked?",
    options: [
      { label: "Yes, recently", score: 0 },
      { label: "Yes, but not recently", score: 1 },
      { label: "I’m not sure", score: 2 },
      { label: "No, never", score: 3 },
    ],
  },
  {
    q: "How would you describe your current stress load?",
    options: [
      { label: "Low and manageable", score: 0 },
      { label: "Moderate", score: 1 },
      { label: "High", score: 2 },
      { label: "Very high and persistent", score: 3 },
    ],
  },
  {
    q: "How physically active are you at the moment?",
    options: [
      { label: "Very active and consistent", score: 0 },
      { label: "Reasonably active", score: 1 },
      { label: "Inconsistent", score: 2 },
      { label: "Mostly sedentary", score: 3 },
    ],
  },
  {
    q: "What best describes what you want right now?",
    options: [
      { label: "A quick professional steer", score: 0 },
      { label: "A solid metabolic assessment", score: 1 },
      { label: "A deeper longevity work-up", score: 2 },
      { label: "A comprehensive reset with ongoing support", score: 3 },
    ],
  },
];

const resultMap = {
  initial: {
    tier: "initial",
    title: "Initial GP Consultation",
    price: "£195",
    summary: "You’d likely benefit most from a focused GP consultation first — a clear, efficient starting point to map symptoms, goals, and the right diagnostic next step.",
  },
  core: {
    tier: "core",
    title: "Core Metabolic Assessment",
    price: "£495",
    summary: "Your answers suggest the Core Metabolic Assessment is likely the best fit — enough depth to identify the main drivers of your weight, energy, and cardiometabolic risk.",
  },
  advanced: {
    tier: "advanced",
    title: "Advanced Longevity Assessment",
    price: "£895",
    summary: "Your answers suggest a deeper clinical picture would be useful. The Advanced Longevity Assessment gives the most comprehensive diagnostic clarity.",
  },
  programme: {
    tier: "programme",
    title: "12-Week Metabolic Reset Programme",
    price: "£1,895",
    summary: "You appear to need not just insight, but structured follow-through. The 12-week programme is likely the best route if you want guided implementation and accountability.",
  },
};

function getRecommendation(total: number) {
  if (total <= 5) return resultMap.initial;
  if (total <= 11) return resultMap.core;
  if (total <= 17) return resultMap.advanced;
  return resultMap.programme;
}

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const current = questions[step];
  const selected = answers[step];
  const progress = ((step + 1) / questions.length) * 100;

  const totalScore = useMemo(
    () => answers.reduce<number>((sum, val) => sum + (val ?? 0), 0),
    [answers]
  );
  const recommendation = getRecommendation(totalScore);
  const finished = started && answers.every((a) => a !== null) && step === questions.length;

  const choose = (score: number) => {
    const next = [...answers];
    next[step] = score;
    setAnswers(next);
  };

  const nextQuestion = () => {
    if (selected === null) return;
    if (step < questions.length - 1) setStep(step + 1);
    else setStep(questions.length);
  };

  const prevQuestion = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStarted(false);
    setStep(0);
    setAnswers(Array(questions.length).fill(null));
  };

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        {!started ? (
          <section className="sec bg-iv" style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", alignItems: "center" }}>
            <div className="wrap" style={{ maxWidth: 760, textAlign: "center" }}>
              <p className="lbl">Free Clinical Quiz</p>
              <div className="rule rule-c" />
              <h1 className="cg" style={{ fontSize: "clamp(2.1rem,5vw,3.5rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 18 }}>
                Find the right Veridian starting point in <em style={{ fontStyle: "italic", color: "var(--fo)" }}>2 minutes</em>
              </h1>
              <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 620, margin: "0 auto 30px" }}>
                Answer 8 short questions about your energy, sleep, weight, family history, and goals. We’ll recommend the most appropriate assessment tier for you.
              </p>
              <div className="badge-row" style={{ justifyContent: "center", marginBottom: 32 }}>
                <span className="badge">8 Questions</span>
                <span className="badge">Free</span>
                <span className="badge">GP-Led Logic</span>
              </div>
              <button onClick={() => setStarted(true)} className="btn btn-fo">Begin Clinical Quiz →</button>
            </div>
          </section>
        ) : finished ? (
          <section className="sec bg-wh">
            <div className="wrap" style={{ maxWidth: 820 }}>
              <div className="text-center" style={{ marginBottom: 40 }}>
                <p className="lbl">Your Recommendation</p>
                <div className="rule rule-c" />
                <h1 className="cg" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2 }}>
                  {recommendation.title}
                </h1>
                <p style={{ fontSize: ".9rem", color: "var(--go)", letterSpacing: ".08em", marginTop: 8 }}>{recommendation.price}</p>
              </div>
              <div className="card" style={{ maxWidth: 760, margin: "0 auto 28px" }}>
                <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 18 }}>{recommendation.summary}</p>
                <div style={{ padding: "14px 16px", background: "var(--iv)", borderLeft: "3px solid var(--fo)", marginBottom: 22 }}>
                  <p style={{ fontSize: ".8rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                    Your score: <strong style={{ color: "var(--fo)" }}>{totalScore}</strong> / 24
                  </p>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link href={`/book?tier=${recommendation.tier}`} className="btn btn-fo">Book My Assessment →</Link>
                  <Link href="/assessments" className="btn btn-ol">Compare All Assessments</Link>
                  <button onClick={reset} className="btn btn-ol">Retake Quiz</button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="sec bg-iv">
            <div className="wrap" style={{ maxWidth: 820 }}>
              <div style={{ marginBottom: 26 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 10, alignItems: "center" }}>
                  <p className="lbl">Question {step + 1} of {questions.length}</p>
                  <p style={{ fontSize: ".78rem", color: "var(--sl3)" }}>{Math.round(progress)}% complete</p>
                </div>
                <div className="prog-track"><div className="prog-fill" style={{ width: `${progress}%` }} /></div>
              </div>
              <div className="card">
                <h1 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.5rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 24 }}>
                  {current.q}
                </h1>
                <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
                  {current.options.map((opt, idx) => {
                    const active = selected === opt.score;
                    return (
                      <button
                        key={opt.label}
                        className={`q-opt ${active ? "selected" : ""}`}
                        onClick={() => choose(opt.score)}
                      >
                        <span className="q-opt-letter">{String.fromCharCode(65 + idx)}</span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
                  <button onClick={prevQuestion} className="btn btn-ol" disabled={step === 0} style={{ opacity: step === 0 ? 0.45 : 1, cursor: step === 0 ? "not-allowed" : "pointer" }}>Back</button>
                  <button onClick={nextQuestion} className="btn btn-fo" disabled={selected === null} style={{ opacity: selected === null ? 0.45 : 1, cursor: selected === null ? "not-allowed" : "pointer" }}>Next Question →</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
