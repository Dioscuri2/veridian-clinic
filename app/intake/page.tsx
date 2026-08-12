"use client";
import { useState } from "react";
import { FONTS, CSS } from "@/components/globalStyles";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TurnstileWidget from "@/components/TurnstileWidget";
import Link from "next/link";

const steps = [
  {
    n: "1",
    title: "Complete your clinical intake form",
    desc: "Tell us about your medical history, current medications, symptoms, and health goals. This takes approximately 10 minutes and ensures Dr Taiwo can focus your consultation on clinical insight not background admin.",
  },
  {
    n: "2",
    title: "Upload recent NHS blood results (if available)",
    desc: "If you have had blood tests in the last 12 months, please upload them or note the results in the form. You can download your NHS results via the NHS App, GP Patient Access, or Patients Know Best.",
  },
  {
    n: "3",
    title: "Wait for Dr Tosin to confirm your appointment",
    desc: "Dr Taiwo reviews every intake before confirming. You will receive a confirmation email within 24 hours. If your request cannot be accommodated clinically a full refund is issued.",
  },
];

const dataPoints = [
  "All data is encrypted in transit and at rest",
  "GDPR compliant - your data is never sold or shared with third parties",
  "Stored on UK/EU servers only",
  "You can request deletion of your data at any time",
  "Accessible only to your treating clinician Dr Taiwo",
];

type FormStatus = "idle" | "submitting" | "done" | "error";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid rgba(0,0,0,.12)",
  background: "var(--iv)",
  fontSize: ".92rem",
  color: "var(--sl)",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "Georgia, serif",
};

const labelStyle: React.CSSProperties = {
  fontSize: ".72rem",
  fontWeight: 700,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--sl3)",
  display: "block",
  marginBottom: 6,
};

export default function IntakePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [medications, setMedications] = useState("");
  const [conditions, setConditions] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [recentTests, setRecentTests] = useState("");
  const [smoking, setSmoking] = useState("");
  const [notes, setNotes] = useState("");
  const [recordingUrl, setRecordingUrl] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const siteKeySet = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const canSubmit =
    name.trim() && email.trim() && symptoms.trim() &&
    status !== "submitting" &&
    (!siteKeySet || !!turnstileToken);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          dob,
          medications,
          conditions,
          symptoms,
          recentTests,
          smoking,
          notes,
          recordingUrl: recordingUrl.trim(),
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* ── Hero ── */}
        <section className="sec bg-fo" style={{ textAlign: "center", paddingBottom: 48 }}>
          <div className="wrap" style={{ maxWidth: 700 }}>
            <div style={{ width: 64, height: 64, border: "2px solid rgba(200,168,75,.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="12" width="20" height="14" rx="1" stroke="var(--go2)" strokeWidth="1.8"/>
                <path d="M9 12V8.5a5 5 0 0 1 10 0V12" stroke="var(--go2)" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="14" cy="19" r="2" fill="var(--go2)"/>
              </svg>
            </div>
            <p className="lbl a1" style={{ color: "var(--go2)" }}>Clinical Intake Form</p>
            <div className="rule rule-c a1" style={{ background: "var(--go)" }} />
            <h1 className="cg a2" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 20 }}>
              Preparing for your consultation
              <br /><em style={{ fontStyle: "italic", color: "var(--go2)" }}>securely</em>
            </h1>
            <p className="a3" style={{ fontSize: ".93rem", color: "rgba(246,241,232,.68)", lineHeight: 1.95 }}>
              Complete your intake below. Dr Taiwo reviews every submission before confirming your appointment.
            </p>
          </div>
        </section>

        {/* ── Steps + form ── */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>

            <div className="sh text-center">
              <p className="lbl">Before Your Appointment</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Three steps to completion</h2>
              <p className="sh-body">Completing this form means Dr Taiwo can spend your consultation on clinical insight and your personalised plan, not collecting background information.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
              {steps.map(step => (
                <div key={step.n} className="intake-step">
                  <div className="intake-num">{step.n}</div>
                  <div style={{ flexGrow: 1 }}>
                    <p style={{ fontSize: ".95rem", fontWeight: 600, color: "var(--sl)", marginBottom: 8 }}>{step.title}</p>
                    <p style={{ fontSize: ".87rem", color: "var(--sl2)", lineHeight: 1.9 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Intake form ── */}
            <div style={{ background: "var(--fo)", padding: "clamp(28px,6vw,48px)", marginBottom: 48, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: "var(--go)" }} />

              {status === "done" ? (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--go2)", marginBottom: 12 }}>Intake Received</p>
                  <h2 className="cg" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 16 }}>Thank you. Dr Taiwo will be in touch.</h2>
                  <p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.65)", lineHeight: 1.85, maxWidth: 480, margin: "0 auto 24px" }}>Your intake has been received. You will receive a confirmation email within 24 hours once Dr Taiwo has reviewed your details.</p>
                  <Link href="/" className="btn btn-ol" style={{ fontSize: ".88rem" }}>Return to Home</Link>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--go2)", marginBottom: 12 }}>Secure Clinical Intake</p>
                  <h2 className="cg" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 24 }}>Tell Dr Tosin about yourself</h2>

                  <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Full name *</label>
                        <input type="text" required value={name} onChange={e => setName(e.target.value)}
                          placeholder="Your full name"
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)" }}
                        />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Email address *</label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)" }}
                        />
                      </div>
                    </div>

                    <div style={{ maxWidth: 280 }}>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Date of birth</label>
                      <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: dob ? "var(--iv)" : "rgba(246,241,232,.35)" }}
                      />
                    </div>

                    <div>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Current medications</label>
                      <textarea value={medications} onChange={e => setMedications(e.target.value)} rows={3}
                        placeholder="List any medications you currently take, including dose if known. Write 'None' if not applicable."
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)", resize: "vertical", lineHeight: 1.7 }}
                      />
                    </div>

                    <div>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Medical conditions / diagnoses</label>
                      <textarea value={conditions} onChange={e => setConditions(e.target.value)} rows={3}
                        placeholder="List any diagnosed conditions (e.g. Type 2 diabetes, hypothyroidism, PCOS). Write 'None' if not applicable."
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)", resize: "vertical", lineHeight: 1.7 }}
                      />
                    </div>

                    <div>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Main symptoms / reason for booking *</label>
                      <textarea required value={symptoms} onChange={e => setSymptoms(e.target.value)} rows={4}
                        placeholder="Describe your main concerns and what you are hoping to understand or achieve from this consultation."
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)", resize: "vertical", lineHeight: 1.7 }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Recent NHS blood tests (last 12 months)?</label>
                        <select value={recentTests} onChange={e => setRecentTests(e.target.value)}
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: recentTests ? "var(--iv)" : "rgba(246,241,232,.35)" }}>
                          <option value="">Select...</option>
                          <option value="Yes - I will share the results">Yes - I will share the results</option>
                          <option value="Yes - I do not have them to hand">Yes - I do not have them to hand</option>
                          <option value="No">No</option>
                          <option value="Unsure">Unsure</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Smoking status</label>
                        <select value={smoking} onChange={e => setSmoking(e.target.value)}
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: smoking ? "var(--iv)" : "rgba(246,241,232,.35)" }}>
                          <option value="">Select...</option>
                          <option value="Never smoked">Never smoked</option>
                          <option value="Ex-smoker">Ex-smoker</option>
                          <option value="Current smoker">Current smoker</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Anything else Dr Tosin should know?</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                        placeholder="Any additional context, concerns, or questions you would like Dr Taiwo to be aware of before your appointment."
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)", resize: "vertical", lineHeight: 1.7 }}
                      />
                    </div>

                    <div style={{ padding: "18px 20px", background: "rgba(200,168,75,.08)", border: "1px solid rgba(200,168,75,.3)" }}>
                      <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--go)", marginBottom: 8 }}>
                        Optional &middot; Prefer to talk instead of type?
                      </p>
                      <p style={{ fontSize: ".85rem", color: "rgba(246,241,232,.7)", lineHeight: 1.8, marginBottom: 14 }}>
                        Some people find it easier to explain their history out loud. If you would rather record a short message than write it, record a video or voice note using a tool such as{" "}
                        <a href="https://www.loom.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--go)", textDecoration: "underline" }}>Loom</a>{" "}
                        (free, up to 5 minutes, and it produces a transcript automatically), then paste the share link below. Cover the same ground as the questions above: what brought you here, how long it has been going on, what you have already tried, and what you are hoping for.
                      </p>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Link to your recording</label>
                      <input
                        type="url"
                        value={recordingUrl}
                        onChange={e => setRecordingUrl(e.target.value)}
                        placeholder="https://www.loom.com/share/..."
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)" }}
                      />
                      <p style={{ fontSize: ".76rem", color: "rgba(246,241,232,.45)", lineHeight: 1.7, marginTop: 10 }}>
                        Please still complete the medication and medical condition fields above, as these need to be accurate in writing for your clinical record. Set your recording so that only people with the link can view it, and do not include payment details or passwords.
                      </p>
                    </div>

                    <TurnstileWidget
                      onVerify={setTurnstileToken}
                      onExpire={() => setTurnstileToken("")}
                      onError={() => setTurnstileToken("")}
                      theme="dark"
                    />

                    {(status === "error" || errorMsg) && (
                      <p style={{ fontSize: ".85rem", color: "#e57373", margin: 0 }}>{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      className="btn btn-go"
                      disabled={!canSubmit}
                      style={{ opacity: !canSubmit ? 0.55 : 1, cursor: !canSubmit ? "not-allowed" : "pointer", fontSize: ".9rem", padding: "16px 40px" }}
                    >
                      {status === "submitting" ? "Submitting..." : "Submit Intake Form →"}
                    </button>

                    <p style={{ fontSize: ".74rem", color: "rgba(246,241,232,.36)", lineHeight: 1.7 }}>
                      Your intake is sent securely to Dr Taiwo only. GDPR compliant. You will receive a confirmation email within 24 hours.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* ── Privacy + NHS records ── */}
            <div className="g2" style={{ alignItems: "start" }}>
              <div className="card-iv" style={{ padding: "28px 32px" }}>
                <p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 16 }}>Your data &amp; privacy</p>
                <ul style={{ listStyle: "none" }}>
                  {dataPoints.map(d => (
                    <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,.06)", fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                      <span style={{ color: "var(--grn)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>&#10003;</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="card" style={{ marginBottom: 20, borderTop: "3px solid var(--go)" }}>
                  <p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 12 }}>Downloading your NHS records</p>
                  <p style={{ fontSize: ".85rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 16 }}>You can download blood test results, medication lists, and GP letters through:</p>
                  {[
                    { name: "NHS App", url: "https://www.nhs.uk/nhs-app/", desc: "Available on iOS and Android" },
                    { name: "Patients Know Best", url: "https://patientsknowbest.com/", desc: "Connected to your GP system" },
                    { name: "GP Patient Access", url: "https://www.patientaccess.com/", desc: "Via your GP practice" },
                  ].map(({ name: n, url, desc }) => (
                    <div key={n} style={{ padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
                      <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: ".86rem", fontWeight: 600, color: "var(--fo)", textDecoration: "underline" }}>{n}</a>
                      <p style={{ fontSize: ".76rem", color: "var(--sl3)" }}>{desc}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: "var(--iv2)", padding: "20px 24px", border: "1px solid rgba(0,0,0,.07)" }}>
                  <p style={{ fontSize: ".8rem", color: "var(--sl2)", lineHeight: 1.85 }}><strong style={{ color: "var(--fo)" }}>Haven&apos;t booked yet?</strong> The intake form is only relevant after booking your assessment. If you haven&apos;t booked, <Link href="/assessments" style={{ color: "var(--fo)", fontWeight: 600, textDecoration: "underline" }}>see our assessments</Link> first.</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
