"use client";
import { FormEvent, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

function ScorecardContent() {
  const params = useSearchParams();
  const router = useRouter();

  const score = params.get("score") || "";
  const band = params.get("band") || "drifting";
  const age = params.get("age") || "";
  const weakest = params.get("weakest") || "";

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
          quizScore: score ? Number(score) : undefined,
          resultBand: band,
          metadata: {
            age: age ? Number(age) : undefined,
            weakest,
            funnel: "metabolic-quiz",
          },
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data?.error || "Unable to send your scorecard right now.");
      router.push(`/metabolic-quiz/thank-you?name=${encodeURIComponent(firstName.trim())}`);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const BAND_LABELS: Record<string, string> = {
    strong: "On Track",
    drifting: "Needs Attention",
    "high-risk": "High Priority",
  };

  const BAND_COLORS: Record<string, string> = {
    strong: "var(--grn)",
    drifting: "var(--amr)",
    "high-risk": "var(--red)",
  };

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section
          className="sec bg-iv"
          style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", alignItems: "center" }}
        >
          <div className="wrap" style={{ maxWidth: 660 }}>
            {/* Score reminder */}
            {score && (
              <div
                className="a1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 28,
                  padding: "12px 16px",
                  background: "var(--iv2)",
                  borderLeft: `3px solid ${BAND_COLORS[band] ?? "var(--go)"}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 500,
                    lineHeight: 1,
                    color: BAND_COLORS[band] ?? "var(--fo)",
                  }}
                >
                  {score}
                </div>
                <div>
                  <p style={{ fontSize: ".7rem", color: "var(--sl3)", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>
                    Your score · {BAND_LABELS[band] ?? band}
                  </p>
                  <p style={{ fontSize: ".84rem", color: "var(--sl2)", marginTop: 2 }}>
                    Your full breakdown is ready to be emailed to you.
                  </p>
                </div>
              </div>
            )}

            <div className="card a2" style={{ padding: "clamp(28px,5vw,52px)" }}>
              <p className="lbl" style={{ marginBottom: 10 }}>Your Metabolic Scorecard</p>
              <div style={{ width: 36, height: 2, background: "var(--go)", marginBottom: 24 }} />

              <h1
                className="cg"
                style={{
                  fontSize: "clamp(1.9rem,4.5vw,3rem)",
                  fontWeight: 500,
                  color: "var(--sl)",
                  lineHeight: 1.2,
                  marginBottom: 14,
                }}
              >
                Send me my full metabolic scorecard
              </h1>
              <p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 32 }}>
                Get your personalised score breakdown, key drivers, and next-step guidance delivered to your inbox.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
                <div>
                  <label htmlFor="sc-fname" className="lead-label">First name</label>
                  <input
                    id="sc-fname"
                    type="text"
                    className="form-field"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label htmlFor="sc-email" className="lead-label">Email address</label>
                  <input
                    id="sc-email"
                    type="email"
                    className="form-field"
                    placeholder="Enter your best email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: ".8rem",
                    color: "var(--sl3)",
                    lineHeight: 1.7,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    style={{ marginTop: 3, minWidth: 18, minHeight: 18, flexShrink: 0 }}
                  />
                  <span>
                    I agree to receive Veridian Clinic emails, including my scorecard, metabolic health guidance, and occasional updates.
                  </span>
                </label>

                {errorMsg && (
                  <div
                    style={{
                      padding: "12px 14px",
                      borderLeft: "3px solid var(--red)",
                      background: "rgba(122,22,22,.06)",
                    }}
                  >
                    <p style={{ fontSize: ".82rem", color: "var(--red)", lineHeight: 1.7 }}>{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-fo btn-full"
                  disabled={!canSubmit}
                  style={{ opacity: canSubmit ? 1 : 0.5 }}
                >
                  {status === "submitting" ? "Sending your scorecard..." : "Email Me My Scorecard →"}
                </button>
              </form>

              <p
                style={{
                  fontSize: ".76rem",
                  color: "var(--sl3)",
                  marginTop: 16,
                  lineHeight: 1.7,
                  textAlign: "center",
                }}
              >
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
