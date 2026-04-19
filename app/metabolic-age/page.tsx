"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { FONTS, CSS } from "@/components/globalStyles";

type Sex = "male" | "female";

type AnswerMap = {
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
  options: { label: string; value: string; years: number }[];
};

type ResultBand = {
  label: string;
  tone: string;
  color: string;
  note: string;
};

const questions: Question[] = [
  {
    key: "energy",
    title: "How often do you get an afternoon energy crash?",
    helper: "Frequent crashes can act as a useful real-world proxy for poor glycaemic stability and insulin burden.",
    options: [
      { label: "Rarely", value: "rarely", years: 1 },
      { label: "1–2 times a week", value: "weekly", years: 2 },
      { label: "Most weekdays", value: "most-weekdays", years: 4 },
      { label: "Almost every day", value: "daily", years: 6 },
    ],
  },
  {
    key: "sleep",
    title: "How would you rate your sleep quality?",
    helper: "Sleep quality has a disproportionate impact on glucose regulation, appetite signalling, and recovery biology.",
    options: [
      { label: "Consistently restorative", value: "restorative", years: 1 },
      { label: "Good but inconsistent", value: "inconsistent", years: 2 },
      { label: "Often broken or too short", value: "broken", years: 4 },
      { label: "Poor most nights", value: "poor", years: 6 },
    ],
  },
  {
    key: "exercise",
    title: "What best describes your weekly movement?",
    helper: "Exercise is one of the strongest non-drug levers for improving insulin sensitivity and metabolic age trajectory.",
    options: [
      { label: "Strength + cardio 4+ times per week", value: "high", years: -4 },
      { label: "3 consistent sessions per week", value: "moderate", years: -2 },
      { label: "1–2 sessions per week", value: "low", years: 1 },
      { label: "Mostly sedentary", value: "sedentary", years: 4 },
    ],
  },
  {
    key: "recovery",
    title: "How quickly do you recover after exertion or a poor night’s sleep?",
    options: [
      { label: "Usually within a day", value: "fast", years: 0 },
      { label: "It takes a couple of days", value: "medium", years: 1 },
      { label: "I often feel drained for several days", value: "slow", years: 3 },
      { label: "I feel run down most of the time", value: "very-slow", years: 5 },
    ],
  },
  {
    key: "stress",
    title: "How intense is your current stress load?",
    options: [
      { label: "Low and manageable", value: "low", years: 0 },
      { label: "Moderate", value: "moderate", years: 1 },
      { label: "High", value: "high", years: 3 },
      { label: "Very high and persistent", value: "very-high", years: 5 },
    ],
  },
];

function getBmi(heightCm: number, weightKg: number) {
  const heightM = heightCm / 100;
  if (!heightM || !Number.isFinite(heightM)) return null;
  return weightKg / (heightM * heightM);
}

function getWaistToHeightRatio(waistCm: number, heightCm: number) {
  if (!waistCm || !heightCm || !Number.isFinite(waistCm) || !Number.isFinite(heightCm)) return null;
  return waistCm / heightCm;
}

function getWhtrYears(sex: Sex, ratio: number | null) {
  if (!ratio || !Number.isFinite(ratio)) return 0;

  if (sex === "male") {
    if (ratio < 0.5) return 0;
    if (ratio < 0.55) return 4;
    if (ratio < 0.6) return 7;
    return 10;
  }

  if (ratio < 0.45) return 0;
  if (ratio < 0.5) return 2;
  if (ratio < 0.55) return 6;
  return 10;
}

function getBmiContextYears(bmi: number | null) {
  if (!bmi || !Number.isFinite(bmi)) return 0;
  if (bmi < 18.5) return 1;
  if (bmi < 25) return 0;
  if (bmi < 30) return 1;
  if (bmi < 35) return 2;
  return 3;
}

function getBand(riskDelta: number): ResultBand {
  if (riskDelta <= 3) {
    return {
      label: "Resilient",
      tone: "On Track",
      color: "var(--grn)",
      note: "Your inputs suggest relatively strong metabolic resilience. The win here is staying proactive and validating the blind spots early.",
    };
  }

  if (riskDelta <= 10) {
    return {
      label: "Drifting",
      tone: "Needs Attention",
      color: "var(--amr)",
      note: "Your answers suggest your metabolism may be ageing ahead of the calendar. This is the exact window where targeted intervention changes trajectory.",
    };
  }

  return {
    label: "Accelerated",
    tone: "High Priority",
    color: "var(--red)",
    note: "Your pattern suggests multiple drivers of accelerated metabolic ageing. That does not mean the outcome is fixed — it means the next move matters.",
  };
}

export default function MetabolicAgePage() {
  const [step, setStep] = useState(0);
  const [chronologicalAge, setChronologicalAge] = useState("");
  const [sex, setSex] = useState<Sex | null>(null);
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [waistCm, setWaistCm] = useState("");
  const [answers, setAnswers] = useState<AnswerMap>({
    energy: null,
    sleep: null,
    exercise: null,
    recovery: null,
    stress: null,
  });

  const parsedAge = Number.parseFloat(chronologicalAge);
  const parsedHeight = Number.parseFloat(heightCm);
  const parsedWeight = Number.parseFloat(weightKg);
  const parsedWaist = Number.parseFloat(waistCm);

  const hasFoundationalInputs = parsedAge > 0 && Boolean(sex);
  const hasBodyMetrics = parsedHeight > 0 && parsedWeight > 0 && parsedWaist > 0;

  const totalAnswered = useMemo(() => {
    const answerCount = Object.values(answers).filter(Boolean).length;
    return answerCount + (hasFoundationalInputs ? 1 : 0) + (hasBodyMetrics ? 1 : 0);
  }, [answers, hasFoundationalInputs, hasBodyMetrics]);

  const lifestyleDelta = useMemo(() => {
    return questions.reduce((sum, question) => {
      const selected = question.options.find((option) => option.value === answers[question.key]);
      return sum + (selected?.years ?? 0);
    }, 0);
  }, [answers]);

  const bmi = useMemo(() => getBmi(parsedHeight, parsedWeight), [parsedHeight, parsedWeight]);
  const waistToHeightRatio = useMemo(
    () => getWaistToHeightRatio(parsedWaist, parsedHeight),
    [parsedWaist, parsedHeight]
  );

  const whtrYears = useMemo(() => {
    if (!sex || !hasBodyMetrics) return 0;
    return getWhtrYears(sex, waistToHeightRatio);
  }, [sex, hasBodyMetrics, waistToHeightRatio]);

  const bmiContextYears = useMemo(() => {
    if (!hasBodyMetrics) return 0;
    return getBmiContextYears(bmi);
  }, [hasBodyMetrics, bmi]);

  const riskDelta = lifestyleDelta + whtrYears + bmiContextYears;
  const metabolicAge = hasFoundationalInputs ? Math.max(18, Math.min(90, Math.round(parsedAge + riskDelta))) : null;
  const band = getBand(riskDelta);
  const totalSteps = questions.length + 2;
  const progress = (totalAnswered / totalSteps) * 100;
  const finished = hasFoundationalInputs && hasBodyMetrics && Object.values(answers).every(Boolean) && step > questions.length;

  function setAnswer(key: keyof AnswerMap, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function next() {
    if (step === 0) {
      if (!hasFoundationalInputs) return;
      setStep(1);
      return;
    }

    if (step === 1) {
      if (!hasBodyMetrics) return;
      setStep(2);
      return;
    }

    const currentQuestion = questions[step - 2];
    if (!currentQuestion) return;
    if (!answers[currentQuestion.key]) return;
    if (step < questions.length + 1) setStep(step + 1);
    else setStep(questions.length + 2);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function restart() {
    setChronologicalAge("");
    setSex(null);
    setHeightCm("");
    setWeightKg("");
    setWaistCm("");
    setAnswers({ energy: null, sleep: null, exercise: null, recovery: null, stress: null });
    setStep(0);
  }

  const currentQuestion = step > 1 ? questions[step - 2] : null;

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
                In under two minutes, estimate whether your metabolism is ageing faster than the calendar suggests — then unlock your personalised Metabolic Health Scorecard and Longevity Roadmap.
              </p>
              <div className="badge-row" style={{ justifyContent: "center" }}>
                <span className="badge">7 questions</span>
                <span className="badge">Instant age deviation result</span>
                <span className="badge">Clinical framework</span>
              </div>
            </div>

            {!finished && (step <= 1 || currentQuestion) ? (
              <div className="g2" style={{ alignItems: "start" }}>
                <div className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
                    <p className="lbl">Question {step + 1} of {totalSteps}</p>
                    <p style={{ fontSize: ".76rem", color: "var(--sl3)" }}>{Math.round(progress)}% complete</p>
                  </div>
                  <div className="prog-track" style={{ marginBottom: 26 }}>
                    <div className="prog-fill" style={{ width: `${progress}%` }} />
                  </div>

                  {step === 0 ? (
                    <>
                      <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 10 }}>
                        Start with your chronological age and biological sex
                      </h2>
                      <p style={{ fontSize: ".84rem", color: "var(--sl3)", lineHeight: 1.8, marginBottom: 22 }}>
                        We use these as the baseline for your age deviation score and for gender-matched waist-to-height thresholds.
                      </p>

                      <div style={{ display: "grid", gap: 14, marginBottom: 26 }}>
                        <label style={{ display: "grid", gap: 8 }}>
                          <span style={{ fontSize: ".82rem", color: "var(--sl2)", fontWeight: 600 }}>Chronological Age</span>
                          <input
                            type="number"
                            inputMode="numeric"
                            min="18"
                            max="90"
                            step="1"
                            placeholder="e.g. 42"
                            value={chronologicalAge}
                            onChange={(event) => setChronologicalAge(event.target.value)}
                            style={{
                              width: "100%",
                              padding: "14px 16px",
                              borderRadius: 14,
                              border: "1px solid rgba(25,38,32,.12)",
                              background: "var(--wh)",
                              color: "var(--sl)",
                              fontSize: "1rem",
                            }}
                          />
                        </label>

                        <div style={{ display: "grid", gap: 8 }}>
                          <span style={{ fontSize: ".82rem", color: "var(--sl2)", fontWeight: 600 }}>Biological Sex / Gender</span>
                          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                            {[
                              { label: "Male", value: "male" },
                              { label: "Female", value: "female" },
                            ].map((option) => {
                              const active = sex === option.value;
                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  className={`q-opt ${active ? "selected" : ""}`}
                                  onClick={() => setSex(option.value as Sex)}
                                >
                                  <span>{option.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : step === 1 ? (
                    <>
                      <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 10 }}>
                        What are your body metrics?
                      </h2>
                      <p style={{ fontSize: ".84rem", color: "var(--sl3)", lineHeight: 1.8, marginBottom: 22 }}>
                        Height, weight, and waist circumference let us calculate waist-to-height ratio — one of the strongest simple proxies for visceral fat risk.
                      </p>

                      <div style={{ display: "grid", gap: 14, marginBottom: 26 }}>
                        <label style={{ display: "grid", gap: 8 }}>
                          <span style={{ fontSize: ".82rem", color: "var(--sl2)", fontWeight: 600 }}>Height</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            min="100"
                            max="250"
                            step="0.1"
                            placeholder="e.g. 175 cm"
                            value={heightCm}
                            onChange={(event) => setHeightCm(event.target.value)}
                            style={{
                              width: "100%",
                              padding: "14px 16px",
                              borderRadius: 14,
                              border: "1px solid rgba(25,38,32,.12)",
                              background: "var(--wh)",
                              color: "var(--sl)",
                              fontSize: "1rem",
                            }}
                          />
                        </label>

                        <label style={{ display: "grid", gap: 8 }}>
                          <span style={{ fontSize: ".82rem", color: "var(--sl2)", fontWeight: 600 }}>Weight</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            min="30"
                            max="300"
                            step="0.1"
                            placeholder="e.g. 78 kg"
                            value={weightKg}
                            onChange={(event) => setWeightKg(event.target.value)}
                            style={{
                              width: "100%",
                              padding: "14px 16px",
                              borderRadius: 14,
                              border: "1px solid rgba(25,38,32,.12)",
                              background: "var(--wh)",
                              color: "var(--sl)",
                              fontSize: "1rem",
                            }}
                          />
                        </label>

                        <label style={{ display: "grid", gap: 8 }}>
                          <span style={{ fontSize: ".82rem", color: "var(--sl2)", fontWeight: 600 }}>Waist Circumference</span>
                          <input
                            type="number"
                            inputMode="decimal"
                            min="40"
                            max="220"
                            step="0.1"
                            placeholder="e.g. 90 cm"
                            value={waistCm}
                            onChange={(event) => setWaistCm(event.target.value)}
                            style={{
                              width: "100%",
                              padding: "14px 16px",
                              borderRadius: 14,
                              border: "1px solid rgba(25,38,32,.12)",
                              background: "var(--wh)",
                              color: "var(--sl)",
                              fontSize: "1rem",
                            }}
                          />
                        </label>
                      </div>
                    </>
                  ) : currentQuestion ? (
                    <>
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
                              type="button"
                              className={`q-opt ${active ? "selected" : ""}`}
                              onClick={() => setAnswer(currentQuestion.key, option.value)}
                            >
                              <span className="q-opt-letter">{String.fromCharCode(65 + index)}</span>
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : null}

                  <div style={{ display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
                    <button onClick={back} className="btn btn-ol" disabled={step === 0} style={{ opacity: step === 0 ? 0.45 : 1 }}>
                      Back
                    </button>
                    <button
                      onClick={next}
                      className="btn btn-fo"
                      disabled={
                        step === 0
                          ? !hasFoundationalInputs
                          : step === 1
                            ? !hasBodyMetrics
                            : !currentQuestion || !answers[currentQuestion.key]
                      }
                      style={{
                        opacity:
                          step === 0
                            ? hasFoundationalInputs
                              ? 1
                              : 0.45
                            : step === 1
                              ? hasBodyMetrics
                                ? 1
                                : 0.45
                              : !currentQuestion || !answers[currentQuestion.key]
                                ? 0.45
                                : 1,
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>

                <div className="card" style={{ background: "var(--fo)", color: "var(--iv)" }}>
                  <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>What this reveals</p>
                  <h3 className="cg" style={{ fontSize: "2rem", fontWeight: 500, lineHeight: 1.15, marginBottom: 16 }}>
                    This version estimates age deviation, not just a generic score.
                  </h3>
                  <p style={{ fontSize: ".92rem", color: "rgba(246,241,232,.74)", lineHeight: 1.9, marginBottom: 18 }}>
                    We’re combining waist-to-height ratio, exercise exposure, energy stability, sleep quality, and recovery strain to estimate how many years your metabolism may be running ahead of — or behind — your chronological age.
                  </p>
                  <div style={{ padding: "16px 18px", background: "rgba(246,241,232,.05)", borderLeft: "3px solid var(--go)" }}>
                    <p style={{ fontSize: ".8rem", color: "rgba(246,241,232,.7)", lineHeight: 1.8 }}>
                      After your result, you can request the full Metabolic Health Scorecard and Longevity Roadmap — including the 7 missing markers most people never get checked.
                    </p>
                  </div>
                  <div style={{ marginTop: 22, display: "grid", gap: 10 }}>
                    {[
                      "Chronological age baseline",
                      "Biological sex thresholding",
                      "Height, weight + waist circumference",
                      "Energy stability",
                      "Sleep quality",
                      "Exercise consistency",
                      "Recovery capacity",
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

            {finished && metabolicAge !== null ? (
              <div className="g2" style={{ alignItems: "start" }}>
                <div className="card" style={{ background: "var(--wh)" }}>
                  <p className="lbl" style={{ marginBottom: 12 }}>Your result</p>
                  <h2 className="cg" style={{ fontSize: "clamp(2.1rem,5vw,3.6rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--sl)", marginBottom: 8 }}>
                    Estimated Metabolic Age: <span style={{ color: "var(--fo)" }}>{metabolicAge}</span>
                  </h2>
                  <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.8, marginBottom: 14 }}>
                    Chronological age: <strong style={{ color: "var(--sl)" }}>{Math.round(parsedAge)}</strong> · Risk delta: <strong style={{ color: band.color }}>{riskDelta >= 0 ? `+${riskDelta}` : riskDelta} years</strong>
                  </p>
                  <p style={{ fontSize: ".8rem", letterSpacing: ".12em", textTransform: "uppercase", color: band.color, fontWeight: 700, marginBottom: 18 }}>
                    {band.tone} · {band.label}
                  </p>
                  <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 22 }}>
                    {band.note}
                  </p>
                  <div style={{ padding: "18px 20px", background: "var(--iv)", borderLeft: `3px solid ${band.color}`, marginBottom: 16 }}>
                    <p style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.8, marginBottom: 10 }}>
                      This directional estimate uses age deviation logic: <strong style={{ color: "var(--fo)" }}>Estimated Age = Chronological Age + Risk Delta</strong>.
                    </p>
                    <p style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                      WHtR: <strong style={{ color: "var(--fo)" }}>{waistToHeightRatio?.toFixed(2) ?? "—"}</strong> ({whtrYears >= 0 ? `+${whtrYears}` : whtrYears} years) · BMI context: <strong style={{ color: "var(--fo)" }}>{bmi?.toFixed(1) ?? "—"}</strong> ({bmiContextYears >= 0 ? `+${bmiContextYears}` : bmiContextYears} years)
                    </p>
                  </div>
                  <div style={{ padding: "18px 20px", background: "rgba(200,168,75,.08)", borderLeft: "3px solid var(--go)", marginBottom: 22 }}>
                    <p style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                      Next verification step: confirm the blind spots with the <strong style={{ color: "var(--fo)" }}>7 Missing Markers</strong> — especially <strong style={{ color: "var(--fo)" }}>ApoB, Homocysteine, and Fasting Insulin</strong>.
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
                    quizScore={riskDelta}
                    metabolicAge={metabolicAge}
                    resultBand={band.label}
                    title="Get Your Metabolic Health Scorecard + Longevity Roadmap"
                    subtitle="Enter your details to generate your personalised report, including your age deviation result, clinical interpretation, and the 7 Missing Markers to verify next."
                    ctaLabel="Generate My Scorecard →"
                    submittingLabel="Generating your Metabolic Health Scorecard and Longevity Roadmap..."
                    successMessage="Your personalised scorecard request is in. Check your inbox next, then use the 7 Missing Markers — especially ApoB, Homocysteine, and Fasting Insulin — as your verification step."
                    metadata={{
                      chronologicalAge: Math.round(parsedAge),
                      biologicalSex: sex,
                      heightCm: parsedHeight,
                      weightKg: parsedWeight,
                      waistCircumferenceCm: parsedWaist,
                      waistToHeightRatio: waistToHeightRatio ? Number(waistToHeightRatio.toFixed(3)) : null,
                      bmi: bmi ? Number(bmi.toFixed(1)) : null,
                      riskDelta,
                      lifestyleDelta,
                      whtrYears,
                      bmiContextYears,
                      answers,
                    }}
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
