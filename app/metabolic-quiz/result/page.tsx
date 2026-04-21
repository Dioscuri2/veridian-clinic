"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const BANDS = {
  strong: {
    tone: "On Track",
    color: "var(--grn)",
    bg: "rgba(20,82,38,.08)",
    title: "Your metabolism is well-matched to your years.",
    note: "Your inputs suggest relatively strong metabolic resilience. The priority is protecting this trajectory and confirming the unseen biomarkers before they drift.",
  },
  drifting: {
    tone: "Needs Attention",
    color: "var(--amr)",
    bg: "rgba(138,85,0,.08)",
    title: "Your metabolic age may be running slightly ahead of the calendar.",
    note: "There are early signs of metabolic drift. This is often the best intervention window — before more obvious dysfunction becomes established.",
  },
  "high-risk": {
    tone: "High Priority",
    color: "var(--red)",
    bg: "rgba(122,22,22,.08)",
    title: "Your answers suggest your metabolism may be ageing ahead of your years.",
    note: "Your pattern shows multiple drivers of metabolic stress. That does not make the outcome fixed — but it does mean the next move matters.",
  },
};

const WEAKEST_LABELS: Record<string, string> = {
  waist: "Waist-to-height ratio — a strong proxy for visceral fat, insulin resistance, and cardiovascular risk.",
  sleep: "Sleep quality — poor sleep directly disrupts glucose regulation, appetite signalling, and metabolic recovery.",
  activity: "Movement — low activity is one of the most direct and modifiable drivers of metabolic decline.",
  diet: "Diet quality — directly affects insulin load, systemic inflammation, and long-term metabolic function.",
};

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function ResultContent() {
  const params = useSearchParams();
  const score = clamp(Number(params.get("score") || 0), 0, 100);
  const bandKey = (params.get("band") || "drifting") as keyof typeof BANDS;
  const age = Number(params.get("age") || 0);
  const weakest = params.get("weakest") || "sleep";
  const band = BANDS[bandKey] ?? BANDS.drifting;

  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimated((prev) => {
        if (prev >= score) { clearInterval(t); return score; }
        return Math.min(score, prev + 2);
      });
    }, 18);
    return () => clearInterval(t);
  }, [score]);

  const radius = 86;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (animated / 100) * circ;
  const scorecardUrl = `/metabolic-quiz/scorecard?score=${score}&band=${bandKey}&age=${age}&weakest=${weakest}`;

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="text-center" style={{ marginBottom: 48 }}>
              <p className="lbl a1">Metabolic Age Result</p>
              <div className="rule rule-c a1" />
            </div>

            <div
              className="a2"
              style={{
                display: "grid",
                gap: 48,
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,360px),1fr))",
                alignItems: "center",
              }}
            >
              {/* Score ring */}
              <div style={{ display: "grid", placeItems: "center" }}>
                <div style={{ position: "relative", width: 240, height: 240 }}>
                  <svg width="240" height="240" viewBox="0 0 240 240" aria-label={`Metabolic score: ${score}`}>
                    <circle cx="120" cy="120" r={radius} fill="none" stroke="rgba(0,0,0,.07)" strokeWidth="18" />
                    <circle
                      cx="120"
                      cy="120"
                      r={radius}
                      fill="none"
                      stroke={band.color}
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeDasharray={circ}
                      strokeDashoffset={offset}
                      transform="rotate(-90 120 120)"
                      style={{ transition: "stroke-dashoffset .6s ease" }}
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: ".7rem",
                          color: "var(--sl3)",
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          marginBottom: 4,
                        }}
                      >
                        Your Score
                      </p>
                      <div
                        className="cg"
                        style={{ fontSize: "3.8rem", fontWeight: 500, lineHeight: 1, color: band.color }}
                      >
                        {animated}
                      </div>
                      <p style={{ fontSize: ".88rem", color: "var(--sl3)", marginTop: 6 }}>out of 100</p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 20,
                    padding: "8px 20px",
                    background: band.bg,
                    color: band.color,
                    fontSize: ".72rem",
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    display: "inline-block",
                  }}
                >
                  {band.tone}
                </div>
              </div>

              {/* Interpretation */}
              <div style={{ display: "grid", gap: 22 }}>
                <h1
                  className="cg"
                  style={{
                    fontSize: "clamp(1.9rem,4vw,2.8rem)",
                    fontWeight: 500,
                    color: "var(--sl)",
                    lineHeight: 1.2,
                  }}
                >
                  {age > 0 ? (
                    <>Age {age} snapshot — </>
                  ) : null}
                  {band.title}
                </h1>

                <p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.95 }}>{band.note}</p>

                {/* Likely driver */}
                <div
                  style={{
                    padding: "16px 18px",
                    background: "var(--iv2)",
                    borderLeft: `3px solid ${band.color}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: ".7rem",
                      color: "var(--sl3)",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Likely contributing factor
                  </p>
                  <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                    {WEAKEST_LABELS[weakest] ?? WEAKEST_LABELS.sleep}
                  </p>
                </div>

                {/* CTA block */}
                <div
                  style={{
                    padding: "24px 28px",
                    background: "var(--fo)",
                    borderRadius: 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: ".7rem",
                      color: "var(--go2)",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Your full scorecard is ready
                  </p>
                  <p
                    style={{
                      fontSize: ".93rem",
                      color: "rgba(246,241,232,.78)",
                      lineHeight: 1.85,
                      marginBottom: 20,
                    }}
                  >
                    Your personalised breakdown, key drivers, and next-step guidance can be emailed to you.
                  </p>
                  <Link href={scorecardUrl} className="btn btn-go btn-full">
                    Get My Full Scorecard →
                  </Link>
                </div>

                <p style={{ fontSize: ".78rem", color: "var(--sl3)", lineHeight: 1.7 }}>
                  The detailed breakdown is emailed to you. The next step unlocks your personalised interpretation.
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

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}
