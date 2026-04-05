"use client";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const nextSteps = [
 "Your booking request has been sent to Veridian Clinic.",
 "You’ll receive a confirmation email with next steps.",
 "If relevant, we’ll send details for blood testing, CGM, or pre-consultation prep.",
 "You can now complete your secure clinical intake to make the consultation more useful.",
];

export default function ThankYouPage() {
 return (
 <>
 <style>{FONTS + CSS}</style>
 <Navigation />
 <main style={{ paddingTop: "var(--nav-h)" }}>
 <section className="sec bg-iv" style={{ minHeight: "calc(100svh - var(--nav-h))", display: "flex", alignItems: "center" }}>
 <div className="wrap" style={{ maxWidth: 820, textAlign: "center" }}>
 <div style={{ width: 78, height: 78, margin: "0 auto 26px", borderRadius: "50%", background: "var(--fo)", display: "flex", alignItems: "center", justifyContent: "center" }}>
 <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
 <circle cx="17" cy="17" r="16" stroke="var(--go2)" strokeWidth="1.5" />
 <path d="M10 17.5l4.3 4.3L24 12" stroke="var(--go2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </div>
 <p className="lbl">Booking Request Received</p>
 <div className="rule rule-c" />
 <h1 className="cg" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 16 }}>
 Thank you.
 <br /><em style={{ fontStyle: "italic", color: "var(--fo)" }}>You’re in.</em>
 </h1>
 <p style={{ fontSize: ".94rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 620, margin: "0 auto 32px" }}>
 Your request has been submitted successfully. The next useful step is to complete your secure clinical intake so Dr Taiwo has the right context ahead of your consultation.
 </p>
 <div className="card" style={{ textAlign: "left", maxWidth: 760, margin: "0 auto 28px" }}>
 <p style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>What happens next</p>
 <div style={{ display: "grid", gap: 14 }}>
 {nextSteps.map((step, i) => (
 <div key={step} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 14, borderBottom: i < nextSteps.length - 1 ? "1px solid rgba(0,0,0,.06)" : "none" }}>
 <div style={{ width: 28, height: 28, background: "var(--fo)", color: "var(--go2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".8rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
 <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85 }}>{step}</p>
 </div>
 ))}
 </div>
 </div>
 <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
 <Link href="/intake" className="btn btn-fo">Complete Clinical Intake →</Link>
 <Link href="/" className="btn btn-ol">Return to Home</Link>
 </div>
 </div>
 </section>
 </main>
 <Footer />
 </>
 );
}
