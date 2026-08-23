"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const TIER_LABELS: Record<string, string> = {
  "womens-hormones": "Is It My Hormones? Panel",
  "mens-testosterone": "Running on Empty Panel",
  "fatigue-energy": "Fatigue & Energy Deep Screen",
  "cardiovascular-risk": "Cardiovascular Risk Panel",
  "metabolic-weight": "Metabolic Weight Resistance Panel",
  "optimiser-baseline": "Optimiser's Baseline Panel",
};

const SYMPTOM_OPTIONS = [
  "Persistent fatigue or low energy",
  "Brain fog or poor concentration",
  "Poor sleep or waking at night",
  "Low mood or anxiety",
  "Low libido or drive",
  "Difficulty maintaining muscle",
  "Weight gain, especially abdominal",
  "Hot flushes or night sweats",
  "Irregular periods or cycle changes",
  "Poor exercise recovery",
  "Hair thinning",
  "Joint pain or stiffness",
];

function QuestionnaireForm() {
  const params = useSearchParams();
  const router = useRouter();
  const tier = params.get("tier") || "";
  const panelLabel = TIER_LABELS[tier] || "Blood Test Panel";

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const [answers, setAnswers] = useState({
    email: "",
    age: "",
    sex: "",
    menstrualStatus: "",
    topSymptoms: [] as string[],
    medications: "",
    promptedBy: "",
    previousResults: "",
    primaryGoal: "",
  });

  function setField(key: string, val: string) {
    setAnswers(prev => ({ ...prev, [key]: val }));
  }

  function toggleSymptom(sym: string) {
    setAnswers(prev => {
      const already = prev.topSymptoms.includes(sym);
      if (already) return { ...prev, topSymptoms: prev.topSymptoms.filter(s => s !== sym) };
      if (prev.topSymptoms.length >= 3) return prev;
      return { ...prev, topSymptoms: [...prev.topSymptoms, sym] };
    });
  }

  async function handleSubmit() {
    if (!answers.email) { setError("Please enter your email address so we can match this to your test."); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/blood-test-questionnaire", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...answers, tier }),
      });
      if (!res.ok) throw new Error("submission failed");
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again or email support@veridianclinic.com.");
    } finally {
      setSubmitting(false);
    }
  }

  const inp: React.CSSProperties = {
    width: "100%", padding: "11px 14px", border: "1px solid rgba(0,0,0,.15)",
    background: "var(--wh)", fontSize: ".93rem", color: "var(--sl)", outline: "none",
    boxSizing: "border-box" as const,
  };
  const label: React.CSSProperties = { fontSize: ".78rem", fontWeight: 700, letterSpacing: ".08em", color: "var(--sl)", marginBottom: 6, display: "block" };
  const hint: React.CSSProperties = { fontSize: ".75rem", color: "var(--sl3)", lineHeight: 1.6, marginBottom: 12, display: "block" };

  if (done) {
    return (
      <>
        <style>{FONTS + CSS}</style>
        <Navigation />
        <main style={{ paddingTop: "var(--nav-h)" }}>
          <section className="sec bg-fo" style={{ paddingTop: 72, paddingBottom: 72 }}>
            <div className="wrap" style={{ maxWidth: 640, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, margin: "0 auto 20px", borderRadius: "50%", background: "rgba(200,168,75,.15)", border: "1.5px solid var(--go)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14.5l4.5 4.5L22 9" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="lbl" style={{ color: "var(--go)" }}>Form received</p>
              <div className="rule rule-c" style={{ background: "var(--go)" }} />
              <h1 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 14 }}>
                Thank you. Dr Tosin has your context.
              </h1>
              <p style={{ fontSize: ".93rem", color: "rgba(246,241,232,.68)", lineHeight: 1.9 }}>
                Your answers are attached to your test record. When your results are ready, Dr Tosin will interpret them in the context of the symptoms and goals you have described here, not just against reference ranges.
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
        <section className="sec bg-iv" style={{ paddingBottom: 8 }}>
          <div className="wrap" style={{ maxWidth: 680 }}>
            <p className="lbl a1">Clinical Context Form</p>
            <div className="rule a1" />
            <h1 className="cg a2" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 12 }}>
              Help Dr Tosin interpret your results.
            </h1>
            <p className="a3" style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 0 }}>
              Panel: <strong style={{ color: "var(--sl)" }}>{panelLabel}</strong>. These 8 questions take about 3 minutes. Your answers are used when Dr Tosin writes your interpretation report.
            </p>
          </div>
        </section>

        <section className="sec bg-iv" style={{ paddingTop: 16 }}>
          <div className="wrap" style={{ maxWidth: 680 }}>
            <div className="card">
              {error && <p style={{ color: "#7a1616", background: "rgba(122,22,22,.08)", padding: "10px 14px", fontSize: ".86rem", marginBottom: 20 }}>{error}</p>}

              <div style={{ display: "grid", gap: 24 }}>

                {/* Q1: Email */}
                <div>
                  <label style={label}>Your email address <span style={{ color: "var(--fo)" }}>*</span></label>
                  <span style={hint}>So we can match this form to your test order.</span>
                  <input style={inp} type="email" placeholder="your@email.com" value={answers.email} onChange={e => setField("email", e.target.value)} />
                </div>

                {/* Q2: Age */}
                <div>
                  <label style={label}>Your age</label>
                  <input style={inp} type="number" placeholder="e.g. 42" min="18" max="99" value={answers.age} onChange={e => setField("age", e.target.value)} />
                </div>

                {/* Q3: Sex */}
                <div>
                  <label style={label}>Biological sex</label>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {["Male", "Female", "Prefer not to say"].map(opt => (
                      <button key={opt} onClick={() => setField("sex", opt)} style={{
                        padding: "9px 18px", border: `1.5px solid ${answers.sex === opt ? "var(--fo)" : "rgba(0,0,0,.15)"}`,
                        background: answers.sex === opt ? "var(--fo)" : "var(--wh)", color: answers.sex === opt ? "var(--iv)" : "var(--sl)",
                        fontSize: ".88rem", cursor: "pointer",
                      }}>{opt}</button>
                    ))}
                  </div>
                </div>

                {/* Q4: Menstrual status (conditional) */}
                {(answers.sex === "Female" || answers.sex === "") && (
                  <div>
                    <label style={label}>Menstrual status (if applicable)</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {["Regular cycles", "Irregular cycles", "Perimenopause", "Post-menopause", "Not applicable"].map(opt => (
                        <button key={opt} onClick={() => setField("menstrualStatus", opt)} style={{
                          padding: "9px 18px", border: `1.5px solid ${answers.menstrualStatus === opt ? "var(--fo)" : "rgba(0,0,0,.15)"}`,
                          background: answers.menstrualStatus === opt ? "var(--fo)" : "var(--wh)", color: answers.menstrualStatus === opt ? "var(--iv)" : "var(--sl)",
                          fontSize: ".88rem", cursor: "pointer",
                        }}>{opt}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q5: Top symptoms */}
                <div>
                  <label style={label}>Top 3 symptoms you want this test to address</label>
                  <span style={hint}>Select up to 3. These become the focus of Dr Tosin's interpretation.</span>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {SYMPTOM_OPTIONS.map(sym => {
                      const selected = answers.topSymptoms.includes(sym);
                      const disabled = !selected && answers.topSymptoms.length >= 3;
                      return (
                        <button key={sym} onClick={() => toggleSymptom(sym)} disabled={disabled} style={{
                          padding: "8px 14px", border: `1.5px solid ${selected ? "var(--fo)" : "rgba(0,0,0,.13)"}`,
                          background: selected ? "var(--fo)" : disabled ? "rgba(0,0,0,.03)" : "var(--wh)",
                          color: selected ? "var(--iv)" : disabled ? "var(--sl3)" : "var(--sl)",
                          fontSize: ".82rem", cursor: disabled ? "default" : "pointer",
                        }}>{sym}</button>
                      );
                    })}
                  </div>
                </div>

                {/* Q6: Medications */}
                <div>
                  <label style={label}>Current medications or supplements (if any)</label>
                  <span style={hint}>Include HRT, thyroid medication, statins, metformin, or anything relevant. Write &quot;none&quot; if not applicable.</span>
                  <input style={inp} type="text" placeholder="e.g. Levothyroxine 50mcg, Vitamin D, none" value={answers.medications} onChange={e => setField("medications", e.target.value)} />
                </div>

                {/* Q7: What prompted */}
                <div>
                  <label style={label}>What prompted you to book this test?</label>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {[
                      "Symptoms GP couldn't explain",
                      "Normal results but still unwell",
                      "Preventive or baseline check",
                      "Starting HRT or hormone treatment",
                      "Health optimisation",
                      "Other",
                    ].map(opt => (
                      <button key={opt} onClick={() => setField("promptedBy", opt)} style={{
                        padding: "9px 16px", border: `1.5px solid ${answers.promptedBy === opt ? "var(--fo)" : "rgba(0,0,0,.15)"}`,
                        background: answers.promptedBy === opt ? "var(--fo)" : "var(--wh)", color: answers.promptedBy === opt ? "var(--iv)" : "var(--sl)",
                        fontSize: ".85rem", cursor: "pointer",
                      }}>{opt}</button>
                    ))}
                  </div>
                </div>

                {/* Q8: Previous results */}
                <div>
                  <label style={label}>Have you had relevant blood tests before?</label>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                    {["Yes, and I was told everything was normal", "Yes, and abnormal results were found", "No, this is my first test for this", "Not sure"].map(opt => (
                      <button key={opt} onClick={() => setField("previousResults", opt)} style={{
                        padding: "9px 16px", border: `1.5px solid ${answers.previousResults === opt ? "var(--fo)" : "rgba(0,0,0,.15)"}`,
                        background: answers.previousResults === opt ? "var(--fo)" : "var(--wh)", color: answers.previousResults === opt ? "var(--iv)" : "var(--sl)",
                        fontSize: ".85rem", cursor: "pointer",
                      }}>{opt}</button>
                    ))}
                  </div>
                </div>

                {/* Q8b: Primary goal */}
                <div>
                  <label style={label}>What would a useful result look like to you?</label>
                  <span style={hint}>What are you hoping to understand or change after getting your results?</span>
                  <textarea style={{ ...inp, height: 88, resize: "vertical" as const }} placeholder="e.g. I want to know why I'm tired all the time and what I can actually do about it." value={answers.primaryGoal} onChange={e => setField("primaryGoal", e.target.value)} />
                </div>

              </div>

              <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,.07)" }}>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !answers.email}
                  className="btn btn-fo"
                  style={{ width: "100%", opacity: submitting ? .6 : 1 }}
                >
                  {submitting ? "Sending..." : "Submit to Dr Tosin →"}
                </button>
                <p style={{ fontSize: ".72rem", color: "var(--sl3)", lineHeight: 1.7, marginTop: 12, textAlign: "center" }}>
                  Your answers are stored securely and are only accessible by Dr Tosin when preparing your results report.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function QuestionnairePage() {
  return (
    <Suspense fallback={null}>
      <QuestionnaireForm />
    </Suspense>
  );
}
