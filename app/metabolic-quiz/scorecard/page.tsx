"use client";
import { FormEvent, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const FACTOR_META: Record<string, { label: string; subtitle: string; greenNote: string; redNote: string }> = {
  waist: {
    label: "Waist-to-Height Ratio",
    subtitle: "Visceral fat & insulin resistance",
    greenNote: "Your waist-to-height ratio is in a protective range.",
    redNote: "Elevated visceral fat is one of the strongest drivers of insulin resistance and cardiovascular risk.",
  },
  energy: {
    label: "Energy & Fatigue",
    subtitle: "Hyperinsulinaemia proxy",
    greenNote: "Consistent energy levels suggest your insulin and cortisol rhythms are well-regulated.",
    redNote: "Persistent fatigue and post-meal crashes are early markers of hyperinsulinaemia — often detectable years before glucose changes.",
  },
  sleep: {
    label: "Sleep Quality",
    subtitle: "Glucose regulation & cortisol",
    greenNote: "Restorative sleep is one of the most powerful metabolic recovery tools.",
    redNote: "Poor sleep directly disrupts glucose regulation, cortisol rhythm, appetite signalling, and metabolic recovery.",
  },
  stress: {
    label: "Chronic Stress",
    subtitle: "Cortisol load & visceral fat",
    greenNote: "Low chronic stress keeps cortisol rhythms healthy and visceral fat accumulation in check.",
    redNote: "Sustained cortisol elevation drives visceral fat accumulation and insulin resistance — independent of diet and exercise.",
  },
  activity: {
    label: "Movement & Exercise",
    subtitle: "Glucose disposal capacity",
    greenNote: "Regular structured movement is one of the most direct interventions for metabolic health.",
    redNote: "Skeletal muscle is the primary site of glucose disposal. Low activity is one of the most modifiable drivers of metabolic decline.",
  },
  diet: {
    label: "Diet Quality",
    subtitle: "Insulin load & inflammation",
    greenNote: "Your dietary pattern supports lower insulin load and reduced systemic inflammation.",
    redNote: "Dietary insulin load, fibre intake, and ultra-processed food frequency are the strongest dietary predictors of metabolic age drift.",
  },
  gut: {
    label: "Gut Health",
    subtitle: "Systemic inflammation",
    greenNote: "Good gut function reduces inflammatory signalling and supports insulin sensitivity.",
    redNote: "Gut dysbiosis increases intestinal permeability, triggering systemic inflammation that directly impairs insulin sensitivity.",
  },
};

function ragColor(score: number): string {
  if (score <= 0) return "var(--grn)";
  if (score <= 3) return "var(--amr)";
  return "var(--red)";
}

function ragLabel(score: number): string {
  if (score <= 0) return "On Track";
  if (score <= 3) return "Needs Attention";
  return "High Priority";
}

function ragBg(score: number): string {
  if (score <= 0) return "rgba(20,82,38,.07)";
  if (score <= 3) return "rgba(138,85,0,.07)";
  return "rgba(122,22,22,.07)";
}

function ragBorder(score: number): string {
  if (score <= 0) return "rgba(20,82,38,.22)";
  if (score <= 3) return "rgba(138,85,0,.22)";
  return "rgba(122,22,22,.22)";
}

function ScorecardContent() {
  const params = useSearchParams();
  const router = useRouter();

  const mAge = params.get("mAge") || "";
  const chrono = params.get("chrono") || "";
  const delta = params.get("delta") || "";
  const band = params.get("band") || "drifting";
  const weakest = params.get("weakest") || "";
  const redirect = params.get("redirect") || "";

  const factorScores: Record<string, number> = {
    waist:    Number(params.get("fw")  ?? 0),
    energy:   Number(params.get("fe")  ?? 0),
    sleep:    Number(params.get("fs")  ?? 0),
    stress:   Number(params.get("fst") ?? 0),
    activity: Number(params.get("fa")  ?? 0),
    diet:     Number(params.get("fd")  ?? 0),
    gut:      Number(params.get("fg")  ?? 0),
  };

  const hasFactorData = Object.values(factorScores).some(v => v !== 0);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit = firstName.trim() && email.trim() && consent && status !== "submitting";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const resp = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          consent,
          source: "metabolic-quiz-scorecard",
          list: "newsletter",
          metabolicAge: mAge ? Number(mAge) : undefined,
          resultBand: band,
          metadata: {
            chronologicalAge: chrono ? Number(chrono) : undefined,
            metabolicAge: mAge ? Number(mAge) : undefined,
            riskDelta: delta ? Number(delta) : undefined,
            weakest,
            factorScores,
            funnel: "metabolic-quiz",
          },
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.error || "Unable to send your scorecard right now.");
      if (redirect === "discovery-quiz") {
        router.push(`/book?tier=discovery-quiz`);
      } else {
        router.push(`/metabolic-quiz/thank-you?name=${encodeURIComponent(firstName.trim())}`);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const BAND_COLORS: Record<string, string> = {
    strong: "var(--grn)",
    drifting: "var(--amr)",
    "high-risk": "var(--red)",
  };

  const BAND_LABELS: Record<string, string> = {
    strong: "On Track",
    drifting: "Needs Attention",
    "high-risk": "High Priority",
  };

  const factorOrder = ["waist", "energy", "sleep", "stress", "activity", "diet", "gut"];

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 760 }}>

            {/* Metabolic age summary bar */}
            {mAge && (
              <div
                className="a1"
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  marginBottom: 32, padding: "14px 18px",
                  background: "var(--iv2)",
                  borderLeft: `3px solid ${BAND_COLORS[band] ?? "var(--go)"}`,
                }}
              >
                <div className="cg" style={{ fontSize: "2.6rem", fontWeight: 500, lineHeight: 1, color: BAND_COLORS[band] ?? "var(--fo)" }}>
                  {mAge}
                </div>
                <div>
                  <p style={{ fontSize: ".7rem", color: "var(--sl3)", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>
                    Estimated metabolic age · {BAND_LABELS[band] ?? band}
                  </p>
                  {chrono && (
                    <p style={{ fontSize: ".84rem", color: "var(--sl2)", marginTop: 2 }}>
                      Your chronological age is {chrono}.{" "}
                      {Number(delta) > 0
                        ? `Your metabolism is running approximately ${delta} year${Number(delta) === 1 ? "" : "s"} ahead.`
                        : Number(delta) < 0
                        ? `Your metabolism is tracking ${Math.abs(Number(delta))} year${Math.abs(Number(delta)) === 1 ? "" : "s"} behind your age — a positive sign.`
                        : "Your metabolic age closely matches your chronological age."}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Per-factor traffic light breakdown */}
            {hasFactorData && (
              <div className="a2" style={{ marginBottom: 40 }}>
                <p className="lbl" style={{ marginBottom: 8 }}>Your Factor Breakdown</p>
                <div style={{ width: 36, height: 2, background: "var(--go)", marginBottom: 20 }} />
                <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 24 }}>
                  Each domain is rated based on your answers. Red means it&apos;s contributing most to metabolic age drift. Green means it&apos;s actively protective.
                </p>
                <div style={{ display: "grid", gap: 8 }}>
                  {factorOrder.map((key) => {
                    const score = factorScores[key];
                    const meta = FACTOR_META[key];
                    const color = ragColor(score);
                    const label = ragLabel(score);
                    const bg = ragBg(score);
                    const border = ragBorder(score);
                    const isWeakest = key === weakest && score > 0;
                    return (
                      <div
                        key={key}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          gap: 16,
                          alignItems: "center",
                          padding: "14px 18px",
                          background: bg,
                          border: `1px solid ${border}`,
                          position: "relative",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                            <p style={{ fontSize: ".9rem", fontWeight: 600, color: "var(--sl)" }}>{meta.label}</p>
                            {isWeakest && (
                              <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: color, color: "var(--iv)", padding: "1px 6px" }}>
                                Primary Driver
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: ".78rem", color: "var(--sl3)", marginBottom: 6 }}>{meta.subtitle}</p>
                          <p style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.7 }}>
                            {score <= 0 ? meta.greenNote : meta.redNote}
                          </p>
                        </div>
                        <div style={{ textAlign: "center", flexShrink: 0 }}>
                          <div style={{
                            width: 44, height: 44, borderRadius: "50%",
                            background: color,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: 4,
                          }}>
                            <span style={{ fontSize: ".9rem", color: "#fff", fontWeight: 700 }}>
                              {score <= 0 ? "✓" : score <= 3 ? "!" : "✕"}
                            </span>
                          </div>
                          <p style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color, whiteSpace: "nowrap" }}>
                            {label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Email capture */}
            <div className="card a3" style={{ padding: "clamp(28px,5vw,52px)" }}>
              <p className="lbl" style={{ marginBottom: 10 }}>Your Metabolic Scorecard</p>
              <div style={{ width: 36, height: 2, background: "var(--go)", marginBottom: 24 }} />

              {redirect === "discovery-quiz" && (
                <div style={{ padding: "14px 16px", background: "var(--fo)", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: "var(--go)", color: "var(--fo)", padding: "2px 8px" }}>
                      QUIZ RATE UNLOCKED
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                    <span className="cg" style={{ fontSize: "1.6rem", fontWeight: 600, color: "var(--go)" }}>£97</span>
                    <span style={{ fontSize: ".88rem", color: "rgba(246,241,232,.5)", textDecoration: "line-through" }}>£195</span>
                    <span style={{ fontSize: ".78rem", color: "var(--go2)", fontWeight: 500 }}>GP Discovery Call · Save £98</span>
                  </div>
                  <p style={{ fontSize: ".82rem", color: "rgba(246,241,232,.72)", lineHeight: 1.75 }}>
                    Enter your email below. Your scorecard is sent instantly — then you&apos;ll be taken straight to book your call at £97.
                  </p>
                </div>
              )}

              <h2
                className="cg"
                style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}
              >
                {redirect === "discovery-quiz" ? "Enter your email to claim your scorecard + £97 rate" : "Email me this breakdown"}
              </h2>
              <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 28 }}>
                {redirect === "discovery-quiz"
                  ? "Your free scorecard is sent to your inbox immediately. You'll then be taken to book your 30-minute GP Discovery Call at the quiz-taker rate of £97."
                  : "Get your full factor breakdown, the clinical explanation behind each score, and a personalised next-step recommendation — delivered to your inbox."}
              </p>

              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
                <div>
                  <label htmlFor="sc-fname" className="lead-label">First name</label>
                  <input
                    id="sc-fname" type="text" className="form-field"
                    placeholder="Your first name"
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    required autoFocus
                  />
                </div>
                <div>
                  <label htmlFor="sc-email" className="lead-label">Email address</label>
                  <input
                    id="sc-email" type="email" className="form-field"
                    placeholder="Enter your best email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: ".8rem", color: "var(--sl3)", lineHeight: 1.7, cursor: "pointer" }}>
                  <input
                    type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                    style={{ marginTop: 3, minWidth: 18, minHeight: 18, flexShrink: 0 }}
                  />
                  <span>I agree to receive Veridian Clinic emails, including my scorecard, metabolic health guidance, and occasional updates.</span>
                </label>
                {errorMsg && (
                  <div style={{ padding: "12px 14px", borderLeft: "3px solid var(--red)", background: "rgba(122,22,22,.06)" }}>
                    <p style={{ fontSize: ".82rem", color: "var(--red)", lineHeight: 1.7 }}>{errorMsg}</p>
                  </div>
                )}
                <button
                  type="submit" className="btn btn-fo btn-full"
                  disabled={!canSubmit} style={{ opacity: canSubmit ? 1 : 0.5 }}
                >
                  {status === "submitting" ? "Sending your scorecard..." : "Email Me My Scorecard →"}
                </button>
              </form>

              <p style={{ fontSize: ".76rem", color: "var(--sl3)", marginTop: 16, lineHeight: 1.7, textAlign: "center" }}>
                Your detailed breakdown will be sent to your inbox. We do not share your data.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ScorecardPage() {
  return (
    <Suspense fallback={null}>
      <ScorecardContent />
    </Suspense>
  );
}
