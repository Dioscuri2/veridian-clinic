"use client";
import { FONTS, CSS } from "@/components/globalStyles";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const plans = [
 {
 name: "Initial GP Consultation",
 price: "£195",
 cadence: "Starting point",
 tier: "initial",
 blurb: "A focused 30-minute consultation to map your goals, symptoms, and clinical history — and identify exactly the right diagnostic pathway for you.",
 feats: [
 "30-minute GP consultation with Dr Taiwo",
 "Goal setting & full clinical history",
 "Initial domain mapping",
 "Written next-step plan",
 "Nationwide virtual delivery",
 ],
 cta: "Book Consultation",
 feat: false,
 right_for: "Right for you if you want to discuss your goals and get expert direction before committing to a full assessment.",
 },
 {
 name: "Core Metabolic Assessment",
 price: "£495",
 cadence: "Most popular",
 tier: "core",
 blurb: "A complete metabolic picture. Advanced blood testing, CGM, sleep tracking and a full domain scorecard with a personalised 12-week plan.",
 feats: [
 "Advanced blood panel — HbA1c, ApoB, lipids, fasting insulin",
 "14-day continuous glucose monitoring (CGM)",
 "Sleep & recovery tracking",
 "Full domain scorecard & outcome mapping report",
 "45-minute insight consultation",
 "Personalised 12-week optimisation plan",
 ],
 cta: "Start Assessment",
 feat: true,
 right_for: "Right for you if you are ready to understand exactly what is driving your weight, energy, and cardiovascular risk — with data.",
 },
 {
 name: "Advanced Longevity Assessment",
 price: "£895",
 cadence: "Deepest insight",
 tier: "advanced",
 blurb: "Expanded biomarkers, cardiovascular risk profiling, and a full 60-minute review with Dr Taiwo to go through every finding in detail.",
 feats: [
 "Full panel — ApoB, Lp(a), HOMA-IR, hsCRP, ferritin",
 "Cardiovascular risk profiling",
 "14-day CGM monitoring",
 "Domain scorecard & outcome mapping",
 "60-minute insight consultation",
 "Personalised 12-week plan",
 ],
 cta: "Choose Advanced",
 feat: false,
 right_for: "Right for you if you have a family history of cardiovascular disease, want the most comprehensive picture, or are ready to go deep.",
 },
];

const comparisonRows = [
 { feature: "GP Consultation", initial: true, core: true, advanced: true },
 { feature: "Blood panel (core markers)", initial: false, core: true, advanced: true },
 { feature: "ApoB & Lp(a) cardiovascular", initial: false, core: false, advanced: true },
 { feature: "HOMA-IR & insulin resistance", initial: false, core: true, advanced: true },
 { feature: "hsCRP inflammation panel", initial: false, core: false, advanced: true },
 { feature: "14-day CGM monitoring", initial: false, core: true, advanced: true },
 { feature: "Sleep & recovery tracking", initial: false, core: true, advanced: true },
 { feature: "Domain scorecard & report", initial: false, core: true, advanced: true },
 { feature: "Outcome mapping", initial: false, core: true, advanced: true },
 { feature: "Insight consultation length", initial: "30 min", core: "45 min", advanced: "60 min" },
 { feature: "Personalised 12-week plan", initial: false, core: true, advanced: true },
];

function Check({ val }: { val: boolean | string }) {
 if (typeof val === "string") return <span style={{ fontSize: ".82rem", fontWeight: 500, color: "var(--fo)" }}>{val}</span>;
 return val
 ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="var(--fo)"/><path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="var(--go2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
 : <span style={{ fontSize: "1rem", color: "var(--sl3)", opacity: .4 }}>—</span>;
}

export default function AssessmentsPage() {
 return (
 <>
 <style>{FONTS + CSS}</style>
 <Navigation />
 <main style={{ paddingTop: "var(--nav-h)" }}>
 <section className="sec bg-iv" style={{ textAlign: "center", paddingBottom: 40 }}>
 <div className="wrap" style={{ maxWidth: 760 }}>
 <p className="lbl a1">Assessments & Pricing</p>
 <div className="rule rule-c a1" />
 <h1 className="cg a2" style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15 }}>
 Choose your starting point.
 <br /><em style={{ fontStyle: "italic", color: "var(--fo)" }}>Clarity on what to fix, from £195.</em>
 </h1>
 <p className="a3" style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, marginTop: 20, maxWidth: 600, margin: "20px auto 0" }}>
 Every Veridian assessment is GP-led, clinically structured, and delivered virtually. Whether you want a focused consultation or a complete metabolic picture, we have a clear pathway for you.
 </p>
 <div className="badge-row a4" style={{ justifyContent: "center", marginTop: 24 }}>
 <span className="badge"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L2 3.8v3.2c0 2.4 1.9 4.5 4.5 5.2 2.6-.7 4.5-2.8 4.5-5.2V3.8z" fill="var(--fo)" stroke="var(--go)" strokeWidth=".6"/><path d="M4.5 6.5l1.5 1.5 2.5-2.5" stroke="var(--go)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>CQC Registered</span>
 <span className="badge">GP Led</span>
 <span className="badge">Results in 7–10 days</span>
 <span className="badge">MRCGP · MRCS</span>
 </div>
 </div>
 </section>
 <section className="sec bg-wh" style={{ paddingTop: 20 }}><div className="wrap"><div className="g3">{plans.map(p => (<div key={p.name} className={`card${p.feat ? " card-featured" : ""}`} style={{ position: "relative", display: "flex", flexDirection: "column" }}>{p.feat && <span className="plan-pill">Most Popular</span>}<p className="plan-cadence">{p.cadence}</p><h2 className="cg" style={{ fontSize: "1.45rem", fontWeight: 500, lineHeight: 1.2, color: p.feat ? "var(--iv)" : "var(--sl)", marginBottom: 16 }}>{p.name}</h2><span className="plan-price">{p.price}</span><p style={{ fontSize: ".86rem", lineHeight: 1.85, color: p.feat ? "rgba(246,241,232,.66)" : "var(--sl2)", margin: "16px 0 20px" }}>{p.blurb}</p><div style={{ padding: "14px 16px", background: p.feat ? "rgba(246,241,232,.07)" : "var(--iv)", borderLeft: `3px solid ${p.feat ? "var(--go)" : "var(--fo)"}`, marginBottom: 20 }}><p style={{ fontSize: ".78rem", fontStyle: "italic", color: p.feat ? "rgba(246,241,232,.72)" : "var(--sl2)", lineHeight: 1.75 }}>{p.right_for}</p></div><ul className="chk" style={{ marginBottom: 28, flexGrow: 1 }}>{p.feats.map(f => <li key={f}>{f}</li>)}</ul><Link href={`/book?tier=${p.tier}`} className={`btn btn-full ${p.feat ? "btn-go" : "btn-fo"}`}>{p.cta} →</Link></div>))}</div></div></section>
 <section className="sec bg-iv"><div className="wrap"><div className="sh text-center"><p className="lbl">Side by Side</p><div className="rule rule-c" /><h2 className="sh-title">What's included in each assessment</h2></div><div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}><thead><tr><th style={{ textAlign: "left", padding: "12px 16px", fontSize: ".74rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)", borderBottom: "2px solid var(--iv3)" }}>Feature</th>{["Initial\n£195", "Core\n£495", "Advanced\n£895"].map((h, i) => (<th key={i} style={{ textAlign: "center", padding: "12px 16px", fontSize: ".74rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: i === 1 ? "var(--fo)" : "var(--sl3)", borderBottom: `2px solid ${i === 1 ? "var(--go)" : "var(--iv3)"}`, whiteSpace: "pre-line" }}>{h}</th>))}</tr></thead><tbody>{comparisonRows.map((row, idx) => (<tr key={row.feature} style={{ background: idx % 2 === 0 ? "var(--wh)" : "var(--iv)" }}><td style={{ padding: "13px 16px", fontSize: ".86rem", color: "var(--sl2)" }}>{row.feature}</td>{[row.initial, row.core, row.advanced].map((v, i) => (<td key={i} style={{ padding: "13px 16px", textAlign: "center" }}><Check val={v as boolean | string} /></td>))}</tr>))}</tbody></table></div></div></section>
 <section className="bg-fo" style={{ padding: "60px 24px" }}><div className="wrap" style={{ maxWidth: 800, textAlign: "center" }}><p className="lbl" style={{ color: "var(--go2)" }}>Not sure which assessment is right for you?</p><div className="rule rule-c" style={{ background: "var(--go)" }} /><h2 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.25, marginBottom: 16 }}>Take our free 2-minute clinical quiz</h2><p style={{ fontSize: ".93rem", color: "rgba(246,241,232,.68)", lineHeight: 1.95, marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>Answer a few questions about your energy, weight, sleep, and family history. Dr Taiwo's clinical algorithm will recommend exactly the right starting point for you — at no cost.</p><div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}><Link href="/quiz" className="btn btn-go">Take the Free Quiz →</Link><Link href="/book" className="btn btn-ol-lt">Go Straight to Booking</Link></div></div></section>
 <section className="sec bg-wh"><div className="wrap" style={{ maxWidth: 860 }}><div style={{ background: "var(--sl)", padding: "clamp(32px,6vw,56px)", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "var(--go)" }} /><div style={{ paddingLeft: "clamp(16px,4vw,32px)" }}><p className="lbl" style={{ color: "var(--go2)", marginBottom: 10 }}>The Complete Programme</p><h2 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 14 }}>12-Week Metabolic Reset Programme — £1,895</h2><p style={{ fontSize: ".91rem", color: "rgba(246,241,232,.65)", lineHeight: 1.95, marginBottom: 28, maxWidth: 580 }}>Everything in the Core Assessment plus 12 weekly GP reviews, repeat biomarkers, a personalised nutrition and movement protocol, and ongoing clinical support from start to final report.</p><Link href="/book?tier=programme" className="btn btn-go">Enquire About the Programme →</Link></div></div></div></section>
 </main>
 <Footer />
 </>
 );
}
