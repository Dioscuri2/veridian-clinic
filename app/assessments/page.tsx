"use client";
import { FONTS, CSS } from "@/components/globalStyles";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const plans = [
 {
 name: "Metabolic Discovery",
 price: "£195",
 cadence: "Focused starting point",
 tier: "discovery",
 blurb: "A focused GP-led consultation to understand your symptoms, goals, family history and likely metabolic blind spots — then recommend the right next diagnostic step.",
 feats: [
 "30-minute GP consultation with Dr Taiwo",
 "Clinical review of symptoms, weight, energy, sleep and family history",
 "Early risk direction on likely missing-link markers",
 "Written next-step recommendation",
 "Nationwide virtual delivery",
 ],
 cta: "Book Discovery Call",
 feat: false,
 right_for: "Right for you if you want expert metabolic direction before choosing a full assessment.",
 },
 {
 name: "Veridian Baseline",
 price: "£595",
 cadence: "Core assessment",
 tier: "baseline",
 blurb: "A GP-led baseline audit designed to reveal the most actionable metabolic drivers of decline before they become disease.",
 feats: [
 "Biomarker panel including HbA1c, fasting glucose, fasting insulin",
 "ApoB, homocysteine and full lipid profile",
 "ALT, AST and liver-metabolic stress review",
 "hs-CRP and core inflammation assessment",
 "Doctor-led interpretation with outcome mapping",
 "Clear written action plan and next-step recommendations",
 ],
 cta: "Book Baseline Audit",
 feat: true,
 right_for: "Right for you if you want a high-value, high-clarity baseline on the markers most likely to explain drifting energy, weight and vascular risk.",
 },
 {
 name: "12-Week Metabolic Reset",
 price: "£1,895",
 cadence: "Structured intervention",
 tier: "programme",
 blurb: "A doctor-led reset for patients who need guided implementation, accountability and follow-through — not just a report.",
 feats: [
 "Everything in the Veridian Baseline",
 "One 14-day CGM cycle with interpretation",
 "Fortnightly coaching support",
 "Monthly GP reviews",
 "Personalised nutrition, movement and recovery protocol",
 "End-of-programme review and forward plan",
 ],
 cta: "Apply for Reset",
 feat: false,
 right_for: "Right for you if metabolic dysfunction is already affecting how you feel and you want a supervised path back to control.",
 },
 {
 name: "Executive Healthspan",
 price: "from £3,495",
 cadence: "Highest-touch pathway",
 tier: "executive",
 blurb: "A premium, high-touch pathway for leaders who want deeper review, broader oversight and an ongoing preventive strategy tailored to performance and longevity.",
 feats: [
 "Expanded physician oversight and strategic review",
 "Broader diagnostics and personalised sequencing",
 "Priority access and continuity planning",
 "Integrated longevity risk review",
 "Tailored implementation support",
 "Suitable for complex, high-demand lifestyles",
 ],
 cta: "Enquire About Executive Care",
 feat: false,
 right_for: "Right for you if you want a premium, doctor-led healthspan strategy rather than a one-off assessment.",
 },
];

const comparisonRows = [
 { feature: "GP Consultation", discovery: true, baseline: true, programme: true, executive: true },
 { feature: "HbA1c, fasting glucose, fasting insulin", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "ApoB + full lipid profile", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "Homocysteine", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "ALT / AST", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "hs-CRP", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "CGM cycle", discovery: false, baseline: false, programme: true, executive: true },
 { feature: "Fortnightly coaching", discovery: false, baseline: false, programme: true, executive: true },
 { feature: "Monthly GP reviews", discovery: false, baseline: false, programme: true, executive: true },
 { feature: "Written action plan", discovery: true, baseline: true, programme: true, executive: true },
 { feature: "Priority / premium pathway", discovery: false, baseline: false, programme: false, executive: true },
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
 <div className="wrap" style={{ maxWidth: 860 }}>
 <p className="lbl a1">Assessments & Pricing</p>
 <div className="rule rule-c a1" />
 <h1 className="cg a2" style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15 }}>
 Choose the right level of insight.
 <br /><em style={{ fontStyle: "italic", color: "var(--fo)" }}>From first clarity to full metabolic reset.</em>
 </h1>
 <p className="a3" style={{ fontSize: "clamp(1rem,2.4vw,1.12rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 700, margin: "20px auto 0" }}>
 Every pathway is GP-led, clinically structured and designed to identify the missing-link drivers standard screening often misses — particularly insulin burden, ApoB-driven vascular risk and homocysteine load.
 </p>
 <div className="badge-row a4" style={{ justifyContent: "center", marginTop: 24 }}>
 <span className="badge"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L2 3.8v3.2c0 2.4 1.9 4.5 4.5 5.2 2.6-.7 4.5-2.8 4.5-5.2V3.8z" fill="var(--fo)" stroke="var(--go)" strokeWidth=".6"/><path d="M4.5 6.5l1.5 1.5 2.5-2.5" stroke="var(--go)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>CQC Registered</span>
 <span className="badge">GP Led</span>
 <span className="badge">Virtual UK Care</span>
 <span className="badge">Actionable Marker Focus</span>
 </div>
 </div>
 </section>
 <section className="sec bg-wh" style={{ paddingTop: 20 }}><div className="wrap"><div className="g4">{plans.map(p => (<div key={p.name} className={`card${p.feat ? " card-featured" : ""}`} style={{ position: "relative", display: "flex", flexDirection: "column" }}>{p.feat && <span className="plan-pill">Recommended</span>}<p className="plan-cadence">{p.cadence}</p><h2 className="cg" style={{ fontSize: "1.45rem", fontWeight: 500, lineHeight: 1.2, color: p.feat ? "var(--iv)" : "var(--sl)", marginBottom: 16 }}>{p.name}</h2><span className="plan-price">{p.price}</span><p style={{ fontSize: ".9rem", lineHeight: 1.9, color: p.feat ? "rgba(246,241,232,.72)" : "var(--sl2)", margin: "16px 0 20px" }}>{p.blurb}</p><div style={{ padding: "14px 16px", background: p.feat ? "rgba(246,241,232,.07)" : "var(--iv)", borderLeft: `3px solid ${p.feat ? "var(--go)" : "var(--fo)"}`, marginBottom: 20 }}><p style={{ fontSize: ".8rem", fontStyle: "italic", color: p.feat ? "rgba(246,241,232,.75)" : "var(--sl2)", lineHeight: 1.75 }}>{p.right_for}</p></div><ul className="chk" style={{ marginBottom: 28, flexGrow: 1 }}>{p.feats.map(f => <li key={f}>{f}</li>)}</ul><Link href={`/book?tier=${p.tier}`} className={`btn btn-full ${p.feat ? "btn-go" : "btn-fo"}`}>{p.cta} →</Link></div>))}</div></div></section>
 <section className="sec bg-iv"><div className="wrap" style={{ maxWidth: 980 }}><div className="sh text-center"><p className="lbl">Baseline Marker List</p><div className="rule rule-c" /><h2 className="sh-title">What the Veridian Baseline is designed to surface</h2><p className="sh-body" style={{ fontSize: "1rem", maxWidth: 760 }}>This is the core value proposition: we focus on the markers most likely to reveal early metabolic decline and future vascular risk, not just whether a routine panel says you are “normal”.</p></div><div className="g2"><div className="card"><p className="lbl" style={{ marginBottom: 14 }}>Exact markers visible</p><ul className="chk"><li>HbA1c</li><li>Fasting glucose</li><li>Fasting insulin</li><li>ApoB</li><li>Homocysteine</li><li>Full lipid profile</li><li>ALT</li><li>AST</li><li>hs-CRP</li></ul></div><div className="card"><p className="lbl" style={{ marginBottom: 14 }}>What you get back</p><ul className="chk"><li>Doctor-led interpretation of what matters now</li><li>Explanation of how your markers connect to weight, energy and cardiovascular risk</li><li>Clear written action plan</li><li>Advice on whether you need further testing, CGM or structured follow-up</li><li>A practical next-step pathway rather than isolated lab numbers</li></ul></div></div></div></section>
 <section className="sec bg-wh"><div className="wrap"><div className="sh text-center"><p className="lbl">Side by Side</p><div className="rule rule-c" /><h2 className="sh-title">What’s included in each pathway</h2></div><div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}><thead><tr><th style={{ textAlign: "left", padding: "12px 16px", fontSize: ".74rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)", borderBottom: "2px solid var(--iv3)" }}>Feature</th>{["Discovery\n£195", "Baseline\n£595", "Reset\n£1,895", "Executive\nfrom £3,495"].map((h, i) => (<th key={i} style={{ textAlign: "center", padding: "12px 16px", fontSize: ".74rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: i === 1 ? "var(--fo)" : "var(--sl3)", borderBottom: `2px solid ${i === 1 ? "var(--go)" : "var(--iv3)"}`, whiteSpace: "pre-line" }}>{h}</th>))}</tr></thead><tbody>{comparisonRows.map((row, idx) => (<tr key={row.feature} style={{ background: idx % 2 === 0 ? "var(--wh)" : "var(--iv)" }}><td style={{ padding: "13px 16px", fontSize: ".88rem", color: "var(--sl2)" }}>{row.feature}</td>{[row.discovery, row.baseline, row.programme, row.executive].map((v, i) => (<td key={i} style={{ padding: "13px 16px", textAlign: "center" }}><Check val={v as boolean | string} /></td>))}</tr>))}</tbody></table></div></div></section>
 <section className="bg-fo" style={{ padding: "60px 24px" }}><div className="wrap" style={{ maxWidth: 860, textAlign: "center" }}><p className="lbl" style={{ color: "var(--go2)" }}>The structured intervention pathway</p><div className="rule rule-c" style={{ background: "var(--go)" }} /><h2 className="cg" style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.25, marginBottom: 16 }}>12-Week Metabolic Reset — £1,895</h2><p style={{ fontSize: ".97rem", color: "rgba(246,241,232,.68)", lineHeight: 1.95, marginBottom: 28, maxWidth: 640, margin: "0 auto 28px" }}>For people who already know something is off and want accountability, structured follow-through and medical oversight — not just another information pack.</p><div className="g3" style={{ textAlign: "left" }}><div className="card-fo"><p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>Includes</p><ul className="chk"><li>Everything in the Veridian Baseline</li><li>One 14-day CGM cycle</li><li>Fortnightly coaching touchpoints</li></ul></div><div className="card-fo"><p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>Clinical oversight</p><ul className="chk"><li>Monthly GP reviews</li><li>Programme adaptation based on response</li><li>Medication / therapy review where indicated</li></ul></div><div className="card-fo"><p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>Outcome focus</p><ul className="chk"><li>Better glucose stability and energy control</li><li>More consistent adherence and behaviour change</li><li>Clear next-stage forward plan</li></ul></div></div><div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}><Link href="/book?tier=programme" className="btn btn-go">Apply for Reset →</Link><Link href="/book?tier=baseline" className="btn btn-ol-lt">Book Baseline Audit</Link></div></div></section>
 <section className="sec bg-wh"><div className="wrap" style={{ maxWidth: 800, textAlign: "center" }}><p className="lbl">Need help choosing?</p><div className="rule rule-c" /><h2 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 16 }}>If you want the highest-value entry point, start with the Baseline.</h2><p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 32, maxWidth: 620, margin: "0 auto 32px" }}>It gives you the clearest early read on metabolic risk and the markers most often missed in routine care — with a straightforward clinical plan for what to do next.</p><div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}><Link href="/book?tier=baseline" className="btn btn-fo">Book Baseline Audit →</Link><Link href="/book?tier=discovery" className="btn btn-ol">Start with Discovery</Link></div></div></section>
 </main>
 <Footer />
 </>
 );
}
