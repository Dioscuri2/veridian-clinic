"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { FONTS, CSS } from "@/components/globalStyles";

type AnswerMap = {
  waistRatio: string | null;
  energy: string | null;
  sleep: string | null;
  exercise: string | null;
  recovery: string | null;
  stress: string | null;
};

type Question = {
  key: keyof AnswerMap;
  title: string;
  helper?: string;
  options: { label: string; value: string; points: number }[];
};

const questions: Question[] = [
  {
    key: "waistRatio",
    title: "What’s your waist-to-height ratio?",
    helper: "Quick guide: waist circumference ÷ height. Under 0.5 is usually lower risk.",
    options: [
      { label: "Under 0.5", value: "under-0.5", points: -2 },
      { label: "0.50–0.54", value: "0.50-0.54", points: 2 },
      { label: "0.55–0.59", value: "0.55-0.59", points: 5 },
      { label: "0.60 or above", value: "0.60-plus", points: 8 },
    ],
  },
  {
    key: "energy",
    title: "How often do you get an afternoon energy crash?",
    options: [
      { label: "Rarely", value: "rarely", points: 0 },
      { label: "1–2 times a week", value: "weekly", points: 2 },
      { label: "Most weekdays", value: "most-weekdays", points: 4 },
      { label: "Almost every day", value: "daily", points: 6 },
    ],
  },
  {
    key: "sleep",
    title: "How would you rate your sleep quality?",
    options: [
      { label: "Consistently restorative", value: "restorative", points: 0 },
      { label: "Good but inconsistent", value: "inconsistent", points: 2 },
      { label: "Often broken or too short", value: "broken", points: 4 },
      { label: "Poor most nights", value: "poor", points: 6 },
    ],
  },
  {
    key: "exercise",
    title: "What best describes your weekly movement?",
    options: [
      { label: "Strength + cardio 4+ times per week", value: "high", points: -2 },
      { label: "3 consistent sessions per week", value: "moderate", points: 1 },
      { label: "1–2 sessions per week", value: "low", points: 4 },
      { label: "Mostly sedentary", value: "sedentary", points: 7 },
    ],
  },
  {
    key: "recovery",
    title: "How quickly do you recover after exertion or a poor night’s sleep?",
    options: [
      { label: "Usually within a day", value: "fast", points: 0 },
      { label: "It takes a couple of days", value: "medium", points: 2 },
      { label: "I often feel drained for several days", value: "slow", points: 4 },
      { label: "I feel run down most of the time", value: "very-slow", points: 6 },
    ],
  },
  {
    key: "stress",
    title: "How intense is your current stress load?",
    options: [
      { label: "Low and manageable", value: "low", points: 0 },
      { label: "Moderate", value: "moderate", points: 2 },
      { label: "High", value: "high", points: 4 },
      { label: "Very high and persistent", value: "very-high", points: 6 },
    ],
  },
];

const baseAge = 42;

function calculateMetabolicAge(score: number) {
  return Math.max(24, Math.min(79, baseAge + Math.round(score * 0.85)));
}

function getBand(score: number) {
  if (score <= 4) return { label: "Resilient", tone: "On Track", color: "var(--grn)", note: "Your answers suggest relatively strong metabolic resilience. The opportunity is optimisation, not rescue." };
  if (score <= 12) return { label: "Drifting", tone: "Needs Attention", color: "var(--amr)", note: "There are early signals that your metabolic age may be running ahead of your chronological age. This is exactly the stage where precision changes trajectory." };
  return { label: "Accelerated", tone: "High Priority", color: "var(--red)", note: "Your responses suggest multiple drivers of accelerated metabolic ageing. That doesn’t mean damage is fixed — it means this is the right time to intervene." };
}

export default function MetabolicAgePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({
    waistRatio: null,
    energy: null,
    sleep: null,
    exercise: null,
    recovery: null,
    stress: null,
  });

  const totalAnswered = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers]
  );

  const score = useMemo(() => {
    return questions.reduce((sum, question) => {
      const selected = question.options.find((option) => option.value === answers[question.key]);
      return sum + (selected?.points ?? 0);
    }, 0);
  }, [answers]);

  const metabolicAge = calculateMetabolicAge(score);
  const band = getBand(score);
  const progress = (totalAnswered / questions.length) * 100;
  const finished = totalAnswered === questions.length && step >= questions.length;

  function setAnswer(key: keyof AnswerMap, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function next() {
    const currentQuestion = questions[step];
    if (!currentQuestion) return;
    if (!answers[currentQuestion.key]) return;
    if (step < questions.length - 1) setStep(step + 1);
    else setStep(questions.length);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function restart() {
    setAnswers({ waistRatio: null, energy: null, sleep: null, exercise: null, recovery: null, stress: null });
    setStep(0);
  }

  const currentQuestion = questions[step];

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section className="sec bg-iv" style={{ paddingBottom: 40 }}>
          <div className="wrap" style={{ maxWidth: 980 }}>
            <div className="text-center" style={{ maxWidth: 760, margin: "0 auto 36px" }}>
              <p className="lbl">Free Lead Magnet</p>
              <div className="rule rule-c" />
              <h1
                className="cg"
                style={{
                  fontSize: "clamp(2.2rem,5.5vw,4.2rem)",
                  fontWeight: 500,
                  color: "var(--sl)",
                  lineHeight: 1.12,
                  marginBottom: 18,
                }}
              >
                Metabolic Age Calculator
              </h1>
              <p style={{ fontSize: "1rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 22 }}>
                In under two minutes, estimate whether your metabolism is ageing faster than the calendar suggests — then unlock your full longevity roadmap.
              </p>
              <div className="badge-row" style={{ justifyContent: "center" }}>
                <span className="badge">6 questions</span>
                <span className="badge">Instant result</span>
                <span className="badge">GP-led framework</span>
              </div>
            </div>

            {!finished && currentQuestion ? (
              <div className="g2" style={{ alignItems: "start" }}>
                <div className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
                    <p className="lbl">Question {step + 1} of {questions.length}</p>
                    <p style={{ fontSize: ".76rem", color: "var(--sl3)" }}>{Math.round(progress)}% complete</p>
                  </div>
                  <div className="prog-track" style={{ marginBottom: 26 }}>
                    <div className="prog-fill" style={{ width: `${progress}%` }} />
                  </div>

                  <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 10 }}>
                    {currentQuestion.title}
                  </h2>
                  {currentQuestion.helper ? (
                    <p style={{ fontSize: ".84rem", color: "var(--sl3)", lineHeight: 1.8, marginBottom: 22 }}>{currentQuestion.helper}</p>
                  ) : null}

                  <div style={{ display: "grid", gap: 12, marginBottom: 26 }}>
                    {currentQuestion.options.map((option, index) => {
                      const active = answers[currentQuestion.key] === option.value;
                      return (
                        <button
                          key={option.value}
                          className={`q-opt ${active ? "selected" : ""}`}
                          onClick={() => setAnswer(currentQuestion.key, option.value)}
                        >
                          <span className="q-opt-letter">{String.fromCharCode(65 + index)}</span>
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
                    <button onClick={back} className="btn btn-ol" disabled={step === 0} style={{ opacity: step === 0 ? 0.45 : 1 }}>
                      Back
                    </button>
                    <button onClick={next} className="btn btn-fo" disabled={!answers[currentQuestion.key]} style={{ opacity: !answers[currentQuestion.key] ? 0.45 : 1 }}>
                      Continue →
                    </button>
                  </div>
                </div>

                <div className="card" style={{ background: "var(--fo)", color: "var(--iv)" }}>
                  <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>What this reveals</p>
                  <h3 className="cg" style={{ fontSize: "2rem", fontWeight: 500, lineHeight: 1.15, marginBottom: 16 }}>
                    Early metabolic strain often shows up before diagnosis.
                  </h3>
                  <p style={{ fontSize: ".92rem", color: "rgba(246,241,232,.74)", lineHeight: 1.9, marginBottom: 18 }}>
                    We’re using high-signal lifestyle and body-composition proxies that tend to correlate with insulin burden, recovery dysfunction, and cardiometabolic drift.
                  </p>
                  <div style={{ padding: "16px 18px", background: "rgba(246,241,232,.05)", borderLeft: "3px solid var(--go)" }}>
                    <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.7)", lineHeight: 1.8 }}>
                      After your result, you can request the full longevity roadmap — designed to translate your score into the next smartest clinical move.
                    </p>
                  </div>
                  <div style={{ marginTop: 22, display: "grid", gap: 10 }}>
                    {[
                      "Waist-to-height ratio",
                      "Energy stability",
                      "Sleep quality",
                      "Exercise consistency",
                      "Recovery capacity",
                      "Stress load",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--go)" }} />
                        <span style={{ fontSize: ".84rem", color: "rgba(246,241,232,.72)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {finished ? (
              <div className="g2" style={{ alignItems: "start" }}>
                <div className="card" style={{ background: "var(--wh)" }}>
                  <p className="lbl" style={{ marginBottom: 12 }}>Your result</p>
                  <h2 className="cg" style={{ fontSize: "clamp(2.1rem,5vw,3.6rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--sl)", marginBottom: 8 }}>
                    Metabolic Age: <span style={{ color: "var(--fo)" }}>{metabolicAge}</span>
                  </h2>
                  <p style={{ fontSize: ".8rem", letterSpacing: ".12em", textTransform: "uppercase", color: band.color, fontWeight: 700, marginBottom: 18 }}>
                    {band.tone} · {band.label}
                  </p>
                  <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 22 }}>
                    {band.note}
                  </p>
                  <div style={{ padding: "18px 20px", background: "var(--iv)", borderLeft: `3px solid ${band.color}`, marginBottom: 22 }}>
                    <p style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                      Score: <strong style={{ color: "var(--fo)" }}>{score}</strong>. This isn’t a diagnosis. It’s a directional screening tool built to identify who should look closer at metabolic risk.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button onClick={restart} className="btn btn-ol">Retake Quiz</button>
                    <Link href="/assessments" className="btn btn-fo">See Assessments →</Link>
                  </div>
                </div>

                <div className="card" style={{ borderTop: "3px solid var(--go)" }}>
                  <LeadCaptureForm
                    source="metabolic-age-quiz"
                    quizScore={score}
                    metabolicAge={metabolicAge}
                    resultBand={band.label}
                    title="Get Your Full Longevity Roadmap"
                    subtitle="Enter your details to unlock the personalised roadmap that matches your metabolic age result."
                    ctaLabel="Get Your Full Longevity Roadmap →"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
