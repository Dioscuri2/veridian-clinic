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

// These statements are load bearing. They must describe what the code actually
// does. The Discord alert was stripped of all patient data so that the second
// line below is true; do not re-add patient fields to it. Since Nov 2026 the
// answers are saved, encrypted, to the clinic's record store (lib/intakeStore.ts)
// and only fall back to a Brevo email if that store is down.
const dataPoints = [
  "Sent over an encrypted connection and handled under UK GDPR",
  "Saved, encrypted, to a private clinic record that only Dr Taiwo, your treating clinician, can open",
  "Never sold, and never used for marketing",
  "Our email provider (Brevo, EU) holds your email address for appointment messages. It carries your answers to Dr Taiwo only if the clinic record is unavailable",
  "You can ask us to delete it at any time at support@veridianclinic.com",
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
  const [phone, setPhone] = useState("");
  const [sexAtBirth, setSexAtBirth] = useState("");
  const [address, setAddress] = useState("");
  const [allergies, setAllergies] = useState("");
  const [pregnancy, setPregnancy] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [gpPractice, setGpPractice] = useState("");
  const [gpConsent, setGpConsent] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [consent, setConsent] = useState(false);
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
  const [record, setRecord] = useState("");

  const siteKeySet = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const canSubmit =
    name.trim() && email.trim() && symptoms.trim() &&
    phone.trim() && allergies.trim() &&
    isAdult && consent &&
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
          phone: phone.trim(),
          dob,
          sexAtBirth,
          address: address.trim(),
          medications,
          allergies,
          conditions,
          symptoms,
          pregnancy,
          recentTests,
          smoking,
          alcohol: alcohol.trim(),
          gpPractice: gpPractice.trim(),
          gpConsent,
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
      setRecord(typeof data?.record === "string" ? data.record : "");
      setStatus("done");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function downloadCopy() {
    const url = URL.createObjectURL(new Blob([record], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "veridian-clinic-intake.txt";
    a.click();
    URL.revokeObjectURL(url);
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
                  {record && (
                    <div style={{ textAlign: "left", maxWidth: 560, margin: "0 auto 28px" }}>
                      <p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--go2)", marginBottom: 8 }}>Your copy</p>
                      <p style={{ fontSize: ".85rem", color: "rgba(246,241,232,.65)", lineHeight: 1.8, margin: "0 0 12px" }}>This is what Dr Taiwo will read before your appointment. You can download it to keep.</p>
                      <pre style={{ margin: "0 0 14px", padding: 16, background: "var(--iv)", color: "var(--sl)", fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: ".76rem", lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 360, overflowY: "auto" }}>{record}</pre>
                      <button type="button" onClick={downloadCopy} className="btn btn-ol" style={{ fontSize: ".85rem" }}>Download my copy</button>
                    </div>
                  )}
                  <Link href="/" className="btn btn-ol" style={{ fontSize: ".88rem" }}>Return to Home</Link>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--go2)", marginBottom: 12 }}>Secure Clinical Intake</p>
                  <h2 className="cg" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 24 }}>Tell Dr Tosin about yourself</h2>

                  <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>

                    {/* Safety netting must come BEFORE any question. A patient with
                        a red flag should leave this form, not complete it. */}
                    <div style={{ padding: "18px 20px", background: "rgba(122,22,22,.14)", border: "1px solid rgba(122,22,22,.5)" }}>
                      <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#ff9b9b", marginBottom: 8 }}>
                        Do not use this form in an emergency
                      </p>
                      <p style={{ fontSize: ".85rem", color: "rgba(246,241,232,.8)", lineHeight: 1.8, margin: 0 }}>
                        Call <strong>999</strong> now if you have chest pain, breathlessness at rest, weakness or drooping on one side of the face or body, difficulty speaking, uncontrolled bleeding, a severe allergic reaction, or a first or prolonged seizure. Call <strong>NHS 111</strong> if you are unsure and need advice today. This form is not monitored in real time, and Dr Taiwo may not read it for several hours.
                      </p>
                      <p style={{ fontSize: ".85rem", color: "rgba(246,241,232,.8)", lineHeight: 1.8, margin: "10px 0 0" }}>
                        If you are in mental health crisis or thinking about harming yourself, call <strong>111</strong> and select the mental health option, or <strong>Samaritans</strong> free on <strong>116 123</strong>, at any hour. Please do not wait for this form.
                      </p>
                    </div>

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

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Mobile number *</label>
                        <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                          placeholder="So Dr Taiwo can reach you"
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)" }}
                        />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Date of birth</label>
                        <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: dob ? "var(--iv)" : "rgba(246,241,232,.35)" }}
                        />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Sex registered at birth</label>
                        <select value={sexAtBirth} onChange={e => setSexAtBirth(e.target.value)}
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: sexAtBirth ? "var(--iv)" : "rgba(246,241,232,.35)" }}>
                          <option value="">Select...</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Home address and postcode</label>
                      <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2}
                        placeholder="Needed for any private prescription or referral letter, and for your invoice."
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)", resize: "vertical", lineHeight: 1.7 }}
                      />
                    </div>

                    <div>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Current medications</label>
                      <textarea value={medications} onChange={e => setMedications(e.target.value)} rows={3}
                        placeholder="List any medications you currently take, including dose if known. Write 'None' if not applicable."
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)", resize: "vertical", lineHeight: 1.7 }}
                      />
                    </div>

                    {/* Required. An unanswered allergy box is not the same as "no
                        allergies", and this form feeds a consultation that may prescribe. */}
                    <div>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Allergies *</label>
                      <textarea required value={allergies} onChange={e => setAllergies(e.target.value)} rows={2}
                        placeholder="Any medicine, food or other allergy, and what reaction it caused. Write 'None known' if you have none."
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)", resize: "vertical", lineHeight: 1.7 }}
                      />
                      <p style={{ fontSize: ".76rem", color: "rgba(246,241,232,.45)", lineHeight: 1.7, marginTop: 8 }}>
                        Please answer this one even if the answer is none. It cannot be left blank.
                      </p>
                    </div>

                    <div>
                      <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Pregnancy and breastfeeding</label>
                      <select value={pregnancy} onChange={e => setPregnancy(e.target.value)}
                        style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: pregnancy ? "var(--iv)" : "rgba(246,241,232,.35)" }}>
                        <option value="">Select...</option>
                        <option value="Not applicable">Not applicable</option>
                        <option value="Not pregnant or breastfeeding">Not pregnant or breastfeeding</option>
                        <option value="Pregnant">Pregnant</option>
                        <option value="Breastfeeding">Breastfeeding</option>
                        <option value="Trying to conceive">Trying to conceive</option>
                        <option value="Unsure">Unsure</option>
                      </select>
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
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Alcohol, units per week</label>
                        <input type="text" value={alcohol} onChange={e => setAlcohol(e.target.value)}
                          placeholder="Roughly. A pint or a medium glass of wine is about 2 units."
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>Your NHS GP practice</label>
                        <input type="text" value={gpPractice} onChange={e => setGpPractice(e.target.value)}
                          placeholder="Practice name and town"
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: "var(--iv)" }}
                        />
                      </div>
                      <div>
                        <label style={{ ...labelStyle, color: "rgba(246,241,232,.55)" }}>May we send a summary to your NHS GP?</label>
                        <select value={gpConsent} onChange={e => setGpConsent(e.target.value)}
                          style={{ ...fieldStyle, background: "rgba(246,241,232,.06)", border: "1px solid rgba(246,241,232,.14)", color: gpConsent ? "var(--iv)" : "rgba(246,241,232,.35)" }}>
                          <option value="">Select...</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                          <option value="I would like to decide after the consultation">Decide after the consultation</option>
                        </select>
                      </div>
                    </div>
                    <p style={{ fontSize: ".78rem", color: "rgba(246,241,232,.45)", lineHeight: 1.75, marginTop: -6 }}>
                      Sharing a summary is good practice and keeps your NHS record complete, but it is your choice and saying no will not affect your care here. This service does not replace your NHS GP, so please stay registered with them.
                    </p>

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
                        Some people find it easier to explain their history out loud. The simplest way is to{" "}
                        <a href="https://wa.me/442036339518?text=Voice%20note%20for%20my%20intake" target="_blank" rel="noopener noreferrer" style={{ color: "var(--go)", textDecoration: "underline" }}>send a voice note on WhatsApp to 020 3633 9518</a>
                        {" "}and just talk. Hold the microphone button in WhatsApp and speak for as long as you need. We transcribe it and read it before your appointment, so there is nothing to type and nothing to upload.
                      </p>
                      <p style={{ fontSize: ".85rem", color: "rgba(246,241,232,.7)", lineHeight: 1.8, marginBottom: 14 }}>
                        If you would rather record a video, or you are not on WhatsApp, use a free tool such as{" "}
                        <a href="https://www.loom.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--go)", textDecoration: "underline" }}>Loom</a>{" "}
                        and paste the share link below instead. Either way, cover the same ground as the questions above: what brought you here, how long it has been going on, what you have already tried, and what you are hoping for.
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

                    {/* Both required. Note the wording: the patient confirms their
                        own age and accuracy. Nothing here tells them they qualify
                        for anything, which is decided in consultation. */}
                    <div style={{ padding: "18px 20px", background: "rgba(246,241,232,.04)", border: "1px solid rgba(246,241,232,.14)", display: "grid", gap: 14 }}>
                      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
                        <input type="checkbox" required checked={isAdult} onChange={e => setIsAdult(e.target.checked)}
                          style={{ marginTop: 4, width: 16, height: 16, flexShrink: 0, accentColor: "#c8a84b" }}
                        />
                        <span style={{ fontSize: ".85rem", color: "rgba(246,241,232,.8)", lineHeight: 1.75 }}>
                          I am <strong>18 or over</strong>. Veridian Clinic does not see children.
                        </span>
                      </label>
                      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
                        <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)}
                          style={{ marginTop: 4, width: 16, height: 16, flexShrink: 0, accentColor: "#c8a84b" }}
                        />
                        <span style={{ fontSize: ".85rem", color: "rgba(246,241,232,.8)", lineHeight: 1.75 }}>
                          The information I have given is accurate and complete to the best of my knowledge, and I agree to Dr Taiwo holding and using it to provide my care. I understand this is a <strong>private service</strong> that does not replace NHS GP registration or emergency care, that I <strong>cannot be physically examined</strong> remotely, that <strong>controlled drugs will not be prescribed</strong>, and that whether any treatment or prescription is appropriate is decided during the consultation. See our{" "}
                          <Link href="/privacy" style={{ color: "var(--go)", textDecoration: "underline" }}>privacy notice</Link>{" "}and{" "}
                          <Link href="/terms" style={{ color: "var(--go)", textDecoration: "underline" }}>terms</Link>.
                        </span>
                      </label>
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
