"use client";
import { FONTS, CSS } from "@/components/globalStyles";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const PORTAL_URL = "#";

const steps = [
 {
 n: "1",
 title: "Complete your clinical intake form",
 desc: "Tell us about your medical history, current medications, symptoms, and health goals. This takes approximately 10 minutes and ensures Dr Taiwo can focus your consultation on clinical insight — not background admin.",
 icon: "📋",
 },
 {
 n: "2",
 title: "Upload recent NHS blood results (if available)",
 desc: "If you have had blood tests in the last 12 months, please upload them. You can download your NHS results via the NHS App, GP Patient Access, or Patients Know Best. Accepted formats: PDF, JPG, PNG.",
 icon: "🧪",
 },
 {
 n: "3",
 title: "Sync your wearable data (optional)",
 desc: "If you use an Oura Ring, Whoop, Garmin, or Apple Health, you can securely share your recent sleep, HRV, and activity data. This gives Dr Taiwo objective recovery and structural data before your appointment.",
 icon: "⌚",
 },
];

const dataPoints = [
 "All data is encrypted in transit and at rest (AES-256)",
 "GDPR compliant — your data is never sold or shared with third parties",
 "Stored on UK/EU servers only",
 "You can request deletion of your data at any time",
 "Accessible only to your treating clinician — Dr Taiwo",
];

export default function IntakePage() {
 return (
 <>
 <style>{FONTS + CSS}</style>
 <Navigation />
 <main style={{ paddingTop: "var(--nav-h)" }}>
 <section className="sec bg-fo" style={{ textAlign: "center", paddingBottom: 48 }}>
 <div className="wrap" style={{ maxWidth: 700 }}>
 <div style={{ width: 64, height: 64, border: "2px solid rgba(200,168,75,.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
 <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
 <rect x="4" y="12" width="20" height="14" rx="1" stroke="var(--go2)" strokeWidth="1.8"/>
 <path d="M9 12V8.5a5 5 0 0 1 10 0V12" stroke="var(--go2)" strokeWidth="1.8" strokeLinecap="round"/>
 <circle cx="14" cy="19" r="2" fill="var(--go2)"/>
 </svg>
 </div>
 <p className="lbl a1" style={{ color: "var(--go2)" }}>Secure Patient Portal</p>
 <div className="rule rule-c a1" style={{ background: "var(--go)" }} />
 <h1 className="cg a2" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 20 }}>
 Preparing for your consultation
 <br/><em style={{ fontStyle: "italic", color: "var(--go2)" }}>securely</em>
 </h1>
 <p className="a3" style={{ fontSize: ".93rem", color: "rgba(246,241,232,.68)", lineHeight: 1.95 }}>
 To make the most of your time with Dr Taiwo, we ask you to complete your clinical intake before your appointment. Everything is handled via a secure, GDPR-compliant portal.
 </p>
 </div>
 </section>
 <section className="sec bg-iv"><div className="wrap" style={{ maxWidth: 860 }}><div className="sh text-center"><p className="lbl">Before Your Appointment</p><div className="rule rule-c" /><h2 className="sh-title">Three steps to complete</h2><p className="sh-body">These steps are optional but highly recommended. Completing them means Dr Taiwo can spend your consultation on clinical insight and your personalised plan — not collecting background information.</p></div><div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>{steps.map(step => (<div key={step.n} className="intake-step"><div className="intake-num">{step.n}</div><div style={{ flexGrow: 1 }}><p style={{ fontSize: ".95rem", fontWeight: 600, color: "var(--sl)", marginBottom: 8 }}>{step.title}</p><p style={{ fontSize: ".87rem", color: "var(--sl2)", lineHeight: 1.9 }}>{step.desc}</p></div></div>))}</div><div style={{ background: "var(--fo)", padding: "clamp(28px,6vw,48px)", textAlign: "center", marginBottom: 48, position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: "var(--go)" }} /><p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--go2)", marginBottom: 12 }}>Ready to begin?</p><h2 className="cg" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 20 }}>Enter the Secure Clinical Portal</h2><p style={{ fontSize: ".88rem", color: "rgba(246,241,232,.65)", lineHeight: 1.85, maxWidth: 480, margin: "0 auto 28px" }}>You will be taken to our GDPR-compliant clinical portal. Your data is encrypted and accessible only to Dr Taiwo.</p><a href={PORTAL_URL} className="btn btn-go" style={{ fontSize: ".9rem", padding: "16px 40px", gap: 10 }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="7" width="12" height="8" rx="1" stroke="var(--fo)" strokeWidth="1.4"/><path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="var(--fo)" strokeWidth="1.4" strokeLinecap="round"/><circle cx="8" cy="11" r="1.2" fill="var(--fo)"/></svg>Enter Secure Clinical Portal</a><p style={{ fontSize: ".74rem", color: "rgba(246,241,232,.36)", marginTop: 16 }}>You will not be asked for payment in the portal. This is for medical information only.</p></div><div className="g2" style={{ alignItems: "start" }}><div className="card-iv" style={{ padding: "28px 32px" }}><p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 16 }}>Your data &amp; privacy</p><ul style={{ listStyle: "none" }}>{dataPoints.map(d => (<li key={d} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,.06)", fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.8 }}><span style={{ color: "var(--grn)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{d}</li>))}</ul></div><div><div className="card" style={{ marginBottom: 20, borderTop: "3px solid var(--go)" }}><p style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 12 }}>Downloading your NHS records</p><p style={{ fontSize: ".85rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 16 }}>You can download blood test results, medication lists, and GP letters through:</p>{[{ name: "NHS App", url: "https://www.nhs.uk/nhs-app/", desc: "Available on iOS and Android" },{ name: "Patients Know Best", url: "https://patientsknowbest.com/", desc: "Connected to your GP system" },{ name: "GP Patient Access", url: "https://www.patientaccess.com/", desc: "Via your GP practice" }].map(({ name, url, desc }) => (<div key={name} style={{ padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}><a href={url} target="_blank" rel="noreferrer" style={{ fontSize: ".86rem", fontWeight: 600, color: "var(--fo)", textDecoration: "underline" }}>{name}</a><p style={{ fontSize: ".76rem", color: "var(--sl3)" }}>{desc}</p></div>))}</div><div style={{ background: "var(--iv2)", padding: "20px 24px", border: "1px solid rgba(0,0,0,.07)" }}><p style={{ fontSize: ".8rem", color: "var(--sl2)", lineHeight: 1.85 }}><strong style={{ color: "var(--fo)" }}>Haven't booked yet?</strong> The intake portal is only relevant after booking your assessment. If you haven't booked, <Link href="/assessments" style={{ color: "var(--fo)", fontWeight: 600, textDecoration: "underline" }}>see our assessments</Link> first.</p></div></div></div></div></section>
 </main>
 <Footer />
 </>
 );
}
