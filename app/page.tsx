"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { FONTS, CSS } from "@/components/globalStyles";

const domains = [
 { n:"01", title:"Structural Health", sub:"Your physical foundation", desc:"Your cardiovascular fitness, strength, body composition and movement capacity — the physical reserve that protects independence, performance and long-term resilience.", metrics:["Resting heart rate","VO₂max / fitness proxy","Body composition","Grip strength & movement"], band:"amr", pct:"56%" },
 { n:"02", title:"Metabolic Health", sub:"The missing link behind decline", desc:"This is where we look for the hidden drivers most people never measure: fasting insulin, HbA1c, ApoB, homocysteine and glucose variability. These markers often move long before disease is diagnosed.", metrics:["HbA1c & fasting insulin","ApoB, homocysteine & full lipid panel","CGM — time in range & variability","Post-meal glucose patterns"], band:"red", pct:"40%" },
 { n:"03", title:"Recovery", sub:"How you repair and regenerate", desc:"Sleep quality, HRV and recovery capacity determine whether your body can restore itself after stress, training, work and life load — or slowly slide into fatigue and dysfunction.", metrics:["Sleep duration & consistency","Heart rate variability (HRV)","Sleep efficiency","Autonomic balance"], band:"amr", pct:"52%" },
 { n:"04", title:"Stress Resilience", sub:"How you hold pressure", desc:"How often and how long your body stays in fight-or-flight. This directly affects appetite, blood pressure, glucose control, sleep quality and long-term cardiovascular risk.", metrics:["Validated stress screening","Subjective load audit","Physiological markers","Behavioural patterns"], band:"grn", pct:"72%" },
];

const fillHex = { red:"#7a1616", amr:"#8a5500", grn:"#145226" };
const fillClass = { red:"fill-red", amr:"fill-amr", grn:"fill-grn" };
const bandLabel = { red:"High Priority", amr:"Moderate Priority", grn:"On Track" };
const bandClass = { red:"spill-r", amr:"spill-a", grn:"spill-g" };

const programme = [
 "Veridian Baseline biomarkers with exact metabolic risk markers",
 "One 14-day CGM cycle with interpretation and action plan",
 "Fortnightly coaching to improve nutrition, activity and recovery adherence",
 "Monthly GP reviews to assess progress and adapt treatment",
 "Personalised nutrition, movement and behaviour protocol",
 "Clinical review of therapies where indicated, including lipid or GLP-1 options",
 "Repeat measurements and end-of-programme forward plan",
];

const testimonials = [
 { name:"James H.", age:"52", role:"Business Owner", text:"I had annual blood tests for years and was always told everything was fine. Veridian showed my ApoB had been quietly elevated for years. Six months on it is down 30% and I feel better than I did at 40.", stars:5 },
 { name:"Sarah M.", age:"44", role:"Senior Partner", text:"The domain scorecard made everything click. I could finally see why my energy crashed every afternoon and why my weight kept creeping up despite doing everything 'right'. The CGM data alone was worth it.", stars:5 },
 { name:"David K.", age:"48", role:"Consultant Surgeon", text:"As a clinician myself I was sceptical. But the evidence base and Dr Taiwo's reasoning are excellent. The way Veridian connects biomarkers to outcomes is genuinely useful.", stars:5 },
 { name:"Rachel T.", age:"39", role:"Director", text:"The reset was transformative. Not just the results, but finally understanding the mechanisms. Complex physiology explained in a way that actually changed my behaviour.", stars:5 },
];

const faqs = [
 { q:"Is Veridian a replacement for my NHS GP?", a:"No. We are a private preventive and optimisation service that complements your NHS care. We communicate with your GP where clinically appropriate." },
 { q:"Is Veridian CQC registered?", a:"Yes. Veridian Clinic is fully CQC registered. All clinical services are personally led by Dr Oluwatosin Taiwo — MBBS, MRCGP, MRCS." },
 { q:"How are consultations delivered?", a:"All consultations are virtual, delivered via a secure encrypted video platform, accessible across the UK." },
 { q:"What blood tests are included?", a:"The Veridian Baseline includes HbA1c, fasting insulin, fasting glucose, ApoB, homocysteine, full lipid panel, ALT, AST, hs-CRP and broader metabolic markers. Higher-tier pathways add deeper review and ongoing clinical supervision." },
 { q:"Can I access GLP-1 therapy?", a:"Where clinically indicated, we can initiate and supervise GLP-1 therapy as part of a structured programme — always integrated into a wider plan, never prescribed in isolation." },
 { q:"How soon can I be seen?", a:"Initial consultations are typically available within 5–7 working days." },
];

const insightPlaceholders = [
 { title: "The 7 Missing Markers: A GP-Led Guide to Longevity Biomarkers", category: "Free Guide", href: "/markers-guide", cta: "Get the free guide →", label: "Available now", body: "A concise, high-authority guide to the overlooked biomarkers that often reveal metabolic and cardiovascular risk earlier than routine screening." },
 { title: "Why Fasting Insulin is the Missing Link in Longevity", category: "Metabolic Health", href: "/blog/fast-insulin", cta: "Read article →", label: "Live now", body: "A clinical explainer on why insulin often shifts long before glucose markers become obviously abnormal." },
 { title: "ApoB vs LDL: The Real Cardiovascular Risk Marker", category: "Cardiovascular Risk", href: "/blog/apob-vs-ldl", cta: "Read article →", label: "Live now", body: "A practical guide to why ApoB often gives a cleaner picture of atherogenic particle burden than LDL alone." },
 { title: "Reversing Metabolic Syndrome in 12 Weeks", category: "Clinical Protocols", href: "/blog/reversing-metabolic-syndrome", cta: "Read article →", label: "Live now", body: "How a focused 12-week strategy can improve weight trajectory, insulin burden, and cardiometabolic risk." },
];

function Stars({ n }: { n: number }) {
 return (
 <div style={{ display:"flex", gap:3, marginBottom:12 }}>
 {Array.from({ length: n }).map((_, i) => (
 <svg key={i} width="12" height="12" viewBox="0 0 12 12">
 <path d="M6 1l1.2 2.9L10 4.4l-2 1.9.5 2.8L6 7.9l-2.5 1.2.5-2.8L2 4.4l2.8-.5Z" fill="#c8a84b"/>
 </svg>
 ))}
 </div>
 );
}

function Shield() {
 return (
 <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
 <path d="M7.5 1.2L2 4.2v3.5c0 2.8 2.1 5 5.5 5.8 3.4-.8 5.5-3 5.5-5.8V4.2z" fill="var(--fo)" stroke="var(--go)" strokeWidth=".7"/>
 <path d="M5 7.5l1.7 1.7 2.8-2.8" stroke="var(--go)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 );
}

function FaqItem({ item }: { item: { q: string; a: string } }) {
 const [open, setOpen] = useState(false);
 return (
 <div>
 <button className="faq-btn" onClick={() => setOpen(o => !o)}>
 <span className="faq-q">{item.q}</span>
 <span className="faq-icon" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
 </button>
 {open && <p className="faq-a">{item.a}</p>}
 </div>
 );
}

export default function HomePage() {
 const [tIdx, setTIdx] = useState(0);

 useEffect(() => {
 const t = setInterval(() => setTIdx(i => (i + 1) % testimonials.length), 6500);
 return () => clearInterval(t);
 }, []);

 return (
 <>
 <style>{FONTS + CSS}</style>
 <Navigation />
 <main>
 <section style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center",
 paddingTop: "calc(var(--nav-h) + 24px)", paddingBottom: 60, paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
 background: "radial-gradient(ellipse 70% 55% at 65% 45%, rgba(13,40,24,.05) 0%, transparent 65%), radial-gradient(ellipse 40% 35% at 12% 78%, rgba(200,168,75,.04) 0%, transparent 55%), var(--iv)" }}>
 <div style={{ maxWidth: "var(--max)", margin: "0 auto", width: "100%" }}>
 <div className="badge-row a1" style={{ marginBottom: 28 }}>
 <span className="badge"><Shield/>CQC Registered</span>
 <span className="badge">GP Led</span>
 <span className="badge">UK Nationwide</span>
 <span className="badge">Evidence-Based</span>
 </div>
 <div className="g2-hero" style={{ display: "grid", alignItems: "center" }}>
 <div>
 <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.25rem,3vw,1.7rem)", fontWeight: 500, color: "var(--fo2)", letterSpacing: ".01em", lineHeight: 1.55, marginBottom: 14, maxWidth: 760 }} className="a1">
 For individuals who want to catch metabolic decline early — and change its trajectory.
 </p>
 <p className="lbl a1">Longevity &amp; Metabolic Health</p>
 <div className="rule a2"/>
 <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem,7.2vw,5rem)", fontWeight: 500, lineHeight: 1.06, color: "var(--sl)", letterSpacing: "-.01em", margin: "8px 0 22px" }} className="a2">
 Find and fix the metabolic drivers of decline — before they become disease.
 </h1>
 <p className="a3" style={{ fontSize: "clamp(1.08rem,2.7vw,1.28rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 650, marginBottom: 14 }}>
 Veridian is a CQC-registered, GP-led clinic that looks for the missing links most standard care ignores — insulin, homocysteine, ApoB, glucose variability, recovery capacity and more — then turns those findings into a precise clinical plan.
 </p>
 <p className="a3" style={{ fontSize: "1rem", color: "var(--sl3)", marginBottom: 28, fontWeight: 400, lineHeight: 1.8 }}>
 Metabolic Discovery from <strong style={{ color: "var(--fo)" }}>£195</strong> · Veridian Baseline <strong style={{ color: "var(--fo)" }}>£595</strong> · 12-Week Reset <strong style={{ color: "var(--fo)" }}>£1,895</strong>
 </p>
 <div className="a4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
 <Link href="/metabolic-scorecard" className="btn btn-go">Take the Metabolic Quiz →</Link>
 <Link href="/book?tier=baseline" className="btn btn-fo">Join Waitlist / Book Baseline →</Link>
 <Link href="/assessments" className="btn btn-ol">View Pricing &amp; Pathways</Link>
 </div>
 <div className="a5" style={{ display: "flex", flexWrap: "wrap", gap: 36, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,.08)", marginTop: 36 }}>
 {[ ["4","Health Domains\nMeasured"],["3","Missing-Link\nMarkers Prioritised"],["12","Week Reset\nAvailable"] ].map(([n,l]) => (
 <div key={l}>
 <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.35rem", fontWeight: 500, color: "var(--fo)", lineHeight: 1 }}>{n}</div>
 <div style={{ fontSize: ".72rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)", marginTop: 5, lineHeight: 1.5 }}>
 {l.split("\n").map((ln, i) => <span key={i} style={{ display: "block" }}>{ln}</span>)}
 </div>
 </div>
 ))}
 </div>
 </div>
 <div className="a3" style={{ background: "var(--wh)", border: "1px solid rgba(0,0,0,.09)", padding: "clamp(24px,5vw,40px)", boxShadow: "0 28px 80px rgba(13,40,24,.12)", position: "relative", marginTop: 40 }}>
 <div style={{ position: "absolute", top: 0, left: 0, width: 56, height: 3, background: "var(--go)" }}/>
 <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 56, background: "var(--go)" }}/>
 <p className="lbl" style={{ marginBottom: 24 }}>Sample Domain Scorecard</p>
 {[{ l:"Structural Health",s:6,p:"60%",b:"amr"},{ l:"Metabolic Health",s:4,p:"40%",b:"red"},{ l:"Recovery",s:5,p:"52%",b:"amr"},{ l:"Stress Resilience",s:7,p:"72%",b:"grn"}].map(d => (
 <div key={d.l} style={{ marginBottom: 20 }}>
 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
 <span style={{ fontSize: ".92rem", fontWeight: 500, color: "var(--sl)" }}>{d.l}</span>
 <span style={{ fontSize: ".84rem", fontWeight: 600, color: fillHex[d.b as keyof typeof fillHex] }}>{d.s}/10</span>
 </div>
 <div className="sc-bar-track">
 <div className={`sc-bar-fill ${fillClass[d.b as keyof typeof fillClass]}`} style={{ "--bw": d.p } as React.CSSProperties}/>
 </div>
 </div>
 ))}
 <div style={{ marginTop: 24, padding: "16px 18px", background: "var(--iv)", borderLeft: "3px solid var(--fo)" }}>
 <p style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.85 }}><strong style={{ color: "var(--fo)" }}>Illustrative example.</strong> Your real score is built from blood tests, CGM data, sleep metrics and validated clinical questionnaires — not guesswork.</p>
 </div>
 <Link href="/book?tier=baseline" className="btn btn-fo btn-full" style={{ marginTop: 20 }}>Book Baseline Audit →</Link>
 </div>
 </div>
 </div>
 </section>
 <section id="scorecard" className="sec bg-wh">
 <div className="wrap">
 <div style={{
 background: "linear-gradient(135deg, #0d1f1a 0%, #13212e 100%)",
 border: "1px solid rgba(0,0,0,.08)",
 padding: "clamp(32px,6vw,56px)",
 display: "grid",
 gap: 24,
 textAlign: "center",
 justifyItems: "center"
 }}>
 <p className="lbl" style={{ color: "var(--go2)", marginBottom: 0 }}>Metabolic Scorecard</p>
 <h2 className="cg" style={{ fontSize: "clamp(2.1rem,4.8vw,3.4rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.14, maxWidth: 780, margin: 0 }}>Get Your Metabolic Scorecard in 60 Seconds</h2>
 <p style={{ fontSize: "1rem", color: "rgba(246,241,232,.74)", lineHeight: 1.9, maxWidth: 700, margin: 0 }}>Answer a few focused questions and get a premium snapshot of the domains most likely driving your energy, weight trajectory, and long-term cardiovascular risk.</p>
 <Link href="/metabolic-scorecard" className="btn btn-go">Start Assessment →</Link>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}><span style={{ fontSize: ".67rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(246,241,232,.38)" }}>GP Led</span><span style={{ color: "rgba(246,241,232,.2)", margin: "0 4px" }}>|</span><span style={{ fontSize: ".67rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(246,241,232,.38)" }}>ApoB · Insulin · Recovery</span><span style={{ color: "rgba(246,241,232,.2)", margin: "0 4px" }}>|</span><span style={{ fontSize: ".67rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(246,241,232,.38)" }}>60 Second Entry Point</span></div>
 </div>
 </div>
 </section>
 <div className="ticker-wrap bg-iv2"><div className="ticker-inner">{[...Array(4)].flatMap((_, k) => ["Fasting Insulin","Homocysteine","ApoB","Continuous Glucose Monitoring","CQC Registered","GP Led","HbA1c · hs-CRP · ALT/AST","Longevity Medicine","12-Week Reset Programme"].map(t => (<span key={`${k}-${t}`} className="ticker-item">{t}<span className="ticker-dot"> · </span></span>)))}</div></div>
 <section className="sec bg-fo"><div className="wrap"><div className="g2" style={{ alignItems: "center" }}><div><p className="lbl" style={{ color: "var(--go2)" }}>Who We Help</p><div className="rule" style={{ background: "var(--go)" }}/><h2 className="cg" style={{ fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2 }}>Two common starting points.<br/><em style={{ fontStyle: "italic", color: "var(--go2)" }}>One clinical objective: intervene early.</em></h2><p style={{ fontSize: "1rem", color: "rgba(246,241,232,.68)", lineHeight: 1.95, marginTop: 20, marginBottom: 32 }}>Most patients come to Veridian from one of two places: they are functioning well but know something is drifting, or they already feel the metabolic consequences and want a doctor-led reset.</p><blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.15rem,2.5vw,1.45rem)", fontStyle: "italic", color: "var(--go2)", lineHeight: 1.75, borderLeft: "3px solid var(--go)", paddingLeft: 22 }}>
 "We don’t wait for disease. We look for the hidden pattern driving it."
 </blockquote></div><div>{[
 {title:"Performance Protector", body:"You still perform at a high level, but your weight, recovery, blood pressure, family history or lab drift tells you something is moving in the wrong direction. You want precision before damage accumulates."},
 {title:"Metabolic Recovery", body:"Energy is less stable. Weight is harder to shift. Cravings, poor sleep, brain fog or rising risk markers suggest metabolic dysfunction is already affecting daily life. You want a structured way back."}
 ].map((t,i) => (<div key={i} style={{ padding:"20px 22px", background:"rgba(246,241,232,.05)", border:"1px solid rgba(246,241,232,.08)", marginBottom:12 }}><p style={{ fontSize:".8rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"var(--go2)", marginBottom:8 }}>{t.title}</p><p style={{ fontSize:".95rem", color:"rgba(246,241,232,.78)", lineHeight:1.9 }}>{t.body}</p></div>))}</div></div></div></section>
 <section id="process" className="sec bg-iv"><div className="wrap"><div className="sh text-center"><p className="lbl">The Process</p><div className="rule rule-c"/><h2 className="sh-title">From missing links to measurable change</h2><p className="sh-body" style={{ fontSize: "1rem", maxWidth: 760 }}>We don’t just ask whether your blood test is “normal”. We ask which hidden drivers are pushing you towards fatigue, weight gain, vascular risk and future disease — then we act on them.</p></div><div className="gproc">{[{n:"01",t:"Consult",d:"A focused GP consultation to understand goals, symptoms, history and where your biggest metabolic risks are likely to sit."},{n:"02",t:"Measure",d:"We prioritise the missing-link markers many people have never had properly assessed: fasting insulin, HbA1c, ApoB, homocysteine, liver markers, inflammation and CGM patterns."},{n:"03",t:"Interpret",d:"Your results are translated into a doctor-led report showing what is driving your energy, weight, cardiovascular risk and recovery profile."},{n:"04",t:"Optimise",d:"You leave with a clear, staged plan — from nutrition and sleep to coaching, GP review and treatment options where clinically indicated."}].map(s => (<div key={s.n} style={{ padding:"28px 0", borderBottom:"1px solid rgba(0,0,0,.07)" }}><div style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".28em", color:"var(--go)", marginBottom:10 }}>{s.n}</div><div style={{ width:1, height:32, background:"var(--go)", opacity:.45, marginBottom:14 }}/><h3 className="cg" style={{ fontSize:"1.65rem", fontWeight:500, color:"var(--fo)", marginBottom:8 }}>{s.t}</h3><p style={{ fontSize:".95rem", color:"var(--sl2)", lineHeight:1.9 }}>{s.d}</p></div>))}</div></div></section>
 <section id="domains" className="sec bg-wh"><div className="wrap"><div className="sh text-center"><p className="lbl">The Framework</p><div className="rule rule-c"/><h2 className="sh-title">Four domains. One clear picture.</h2><p className="sh-body" style={{ fontSize: "1rem" }}>Each domain is scored 1–10. Red means it needs attention now. Amber means there is room to improve. Green means maintain your gains. Together they explain the outcomes you care about most.</p></div><div className="g4">{domains.map(d => (<div key={d.title} className="card" style={{ display:"flex", flexDirection:"column" }}><div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}><span className="lbl">{d.n}</span><span className={`spill ${bandClass[d.band as keyof typeof bandClass]}`}>{bandLabel[d.band as keyof typeof bandLabel]}</span></div><h3 className="cg" style={{ fontSize:"1.6rem", fontWeight:500, color:"var(--sl)", lineHeight:1.2, marginBottom:3 }}>{d.title}</h3><p style={{ fontSize:".8rem", letterSpacing:".06em", color:"var(--go)", marginBottom:12 }}>{d.sub}</p><p style={{ fontSize:".92rem", color:"var(--sl2)", lineHeight:1.9, marginBottom:16, flexGrow:1 }}>{d.desc}</p><div style={{ borderTop:"1px solid rgba(0,0,0,.06)", paddingTop:14, marginBottom:14 }}>{d.metrics.map(m => (<div key={m} style={{ display:"flex", alignItems:"center", gap:9, padding:"4px 0" }}><div style={{ width:4, height:4, borderRadius:"50%", background:"var(--fo)", flexShrink:0 }}/><span style={{ fontSize:".83rem", color:"var(--sl2)" }}>{m}</span></div>))}</div><div className="sc-bar-track"><div className={`sc-bar-fill ${fillClass[d.band as keyof typeof fillClass]}`} style={{ "--bw": d.pct } as React.CSSProperties}/></div></div>))}</div></div></section>
 <section className="sec bg-iv"><div className="wrap"><div className="g2-wide" style={{ display:"grid", alignItems:"center" }}><div><p className="lbl">The Missing-Link Markers</p><div className="rule"/><h2 className="cg" style={{ fontSize:"clamp(1.95rem,3.8vw,2.7rem)", fontWeight:500, color:"var(--sl)", lineHeight:1.25 }}>The symptoms are obvious.<br/><em style={{ fontStyle:"italic", color:"var(--fo2)" }}>The drivers are often hidden.</em></h2><p style={{ fontSize:"1rem", color:"var(--sl2)", lineHeight:1.95, marginTop:18, marginBottom:30 }}>A normal-looking basic check-up can miss the very markers most relevant to future decline. Veridian is built to surface the missing links early — particularly insulin burden, ApoB-driven vascular risk and homocysteine-related methylation stress.</p><Link href="/assessments" className="btn btn-fo">See Our Assessments →</Link></div><div style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", overflow:"hidden" }}><div style={{ background:"var(--fo)", padding:"14px 26px" }}><p className="lbl" style={{ color:"var(--go2)" }}>What We Measure — and Why</p></div>{[{ o:"Insulin burden", d:"Fasting insulin · HbA1c · CGM patterns", m:"Helps explain weight gain, cravings, energy crashes and early insulin resistance" },{ o:"ApoB-driven vascular risk", d:"ApoB · lipid panel", m:"Shows the particle burden linked to long-term cardiovascular disease risk" },{ o:"Homocysteine load", d:"Homocysteine", m:"Flags methylation stress associated with vascular and neurological risk" },{ o:"Inflammation & liver stress", d:"hs-CRP · ALT · AST", m:"Helps reveal inflammatory load and metabolic strain that routine screening may underplay" }].map((r, i, a) => (<div key={r.o} style={{ padding:"18px 26px", borderBottom:i < a.length-1 ? "1px solid rgba(0,0,0,.06)" : "none" }}><p style={{ fontSize:".95rem", fontWeight:600, color:"var(--sl)", marginBottom:3 }}>{r.o}</p><p style={{ fontSize:".8rem", color:"var(--fo2)", marginBottom:2 }}>{r.d}</p><p style={{ fontSize:".78rem", color:"var(--sl3)", lineHeight: 1.7 }}>{r.m}</p></div>))}</div></div></div></section>
 <section id="programme" className="sec bg-sl"><div className="wrap"><div className="g2" style={{ alignItems:"center" }}><div><p className="lbl" style={{ color:"var(--go2)" }}>The Complete Programme</p><div className="rule" style={{ background:"var(--go)" }}/><h2 className="cg" style={{ fontSize:"clamp(2rem,4.5vw,3rem)", fontWeight:500, color:"var(--iv)", lineHeight:1.2 }}>12-Week Metabolic<br/>Reset Programme</h2><p style={{ fontSize:".98rem", color:"rgba(246,241,232,.6)", lineHeight:1.95, marginTop:18, marginBottom:32 }}>A structured 12-week intervention for people who need more than information. We combine metabolic measurement, one CGM cycle, fortnightly coaching and monthly GP reviews to create measurable change.</p><div style={{ background:"rgba(246,241,232,.05)", border:"1px solid rgba(246,241,232,.1)", padding:"24px 28px", marginBottom:30 }}><p className="lbl" style={{ color:"var(--go2)", marginBottom:8 }}>Programme Investment</p><span className="cg" style={{ fontSize:"3rem", fontWeight:400, color:"var(--go2)", lineHeight:1, display:"block" }}>£1,895</span><p style={{ fontSize:".76rem", color:"rgba(246,241,232,.34)", marginTop:6 }}>Payment plans available — contact us to discuss.</p></div><Link href="/book?tier=programme" className="btn btn-go">Apply for Metabolic Reset →</Link></div><ul style={{ listStyle:"none" }}>{programme.map((f,i) => (<li key={f} style={{ display:"flex", alignItems:"flex-start", gap:16, padding:"14px 0", borderBottom:i < programme.length-1 ? "1px solid rgba(246,241,232,.07)" : "none" }}><div style={{ width:22, height:22, borderRadius:"50%", border:"1px solid var(--go)", background:"rgba(200,168,75,.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2, fontSize:".58rem", color:"var(--go2)", fontWeight:700 }}>✓</div><span style={{ fontSize:".9rem", color:"rgba(246,241,232,.7)", lineHeight:1.85 }}>{f}</span></li>))}</ul></div></div></section>
 <section id="team" className="sec bg-iv"><div className="wrap"><div className="sh text-center"><p className="lbl">Our Doctors</p><div className="rule rule-c"/><h2 className="sh-title">Clinically led. Personally invested.</h2></div><div className="g2">{[{ name:"Dr Oluwatosin Taiwo", creds:"MBBS · MRCGP · MRCS", role:"Founder & Longevity GP", bio:"A highly qualified GP with a background spanning general practice, surgery, and metabolic medicine. Dr Taiwo founded Veridian Clinic to bridge the gap between conventional NHS care and the precision preventive medicine that patients deserve — specialising in longevity, metabolic optimisation, and GLP-1 therapy.", tag:"Founder" },{ name:"Dr Tolu Taiwo", creds:"Clinical Oncologist", role:"Clinical Oncologist & Longevity Doctor", bio:"With a background in clinical oncology, Dr Tolu Taiwo brings a systems-level perspective on long-term disease prevention and cellular health. Her expertise adds vital depth to the Veridian approach — focusing on the biological drivers of resilience and the strategies that protect long-term health.", tag:"Clinical Lead" }].map(doc => (<div key={doc.name} className="doc-card"><div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}><div className="doc-avatar" style={{background: "#e5e7eb", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem"}}>Photo</div><span className="doc-tag">{doc.tag}</span></div><h3 className="doc-name">{doc.name}</h3><p className="doc-creds">{doc.creds}</p><p className="doc-role">{doc.role}</p><p className="doc-bio">{doc.bio}</p></div>))}</div><div className="cqc-strip"><div style={{ display:"flex", flexWrap:"wrap", gap:28 }}>{[["CQC Registered","Full Care Quality Commission registration"],["GP Led","All care by GMC-registered doctors"],["MRCGP Qualified","Royal College of General Practitioners"]].map(([t,d]) => (<div key={t} className="cqc-item"><Shield/><div><p className="cqc-label">{t}</p><p className="cqc-sub">{d}</p></div></div>))}</div><Link href="/book?tier=baseline" className="btn btn-go" style={{ fontSize:".8rem", padding:"11px 20px" }}>Book Baseline Audit →</Link></div></div></section>
 <section id="testimonials" className="sec bg-wh"><div className="wrap"><div className="sh text-center"><p className="lbl">Patient Testimonials</p><div className="rule rule-c"/><h2 className="sh-title">What our patients say</h2><p className="sh-body">Real experiences from patients who have completed the Veridian assessment and programme.</p></div><div style={{ marginBottom: 40 }}>{testimonials.map((t,i) => (<div key={i} style={{ display: i === tIdx ? "block" : "none" }}><div style={{ background:"var(--fo)", padding:"clamp(32px,6vw,52px)", position:"relative", overflow:"hidden" }}><div className="cg" style={{ position:"absolute", top:-20, left:28, fontSize:"12rem", lineHeight:1, color:"rgba(200,168,75,.07)", userSelect:"none" }}>"</div><Stars n={t.stars}/><p className="cg" style={{ fontSize:"clamp(1.15rem,3vw,1.7rem)", fontWeight:400, fontStyle:"italic", color:"var(--iv)", lineHeight:1.75, marginBottom:26, position:"relative" }}>"{t.text}"</p><div style={{ display:"flex", alignItems:"center", gap:14 }}><div style={{ width:44, height:44, background:"var(--go)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", color:"var(--fo)", fontWeight:600 }}>{t.name[0]}</div><div><p style={{ fontSize:".88rem", fontWeight:600, color:"var(--iv)", letterSpacing:".04em" }}>{t.name}, {t.age}</p><p style={{ fontSize:".76rem", color:"var(--go2)" }}>{t.role}</p></div></div></div></div>))}<div style={{ display:"flex", gap:9, justifyContent:"center", marginTop:16 }}>{testimonials.map((_,i) => (<button key={i} onClick={() => setTIdx(i)} style={{ width:i===tIdx?26:7, height:7, background:i===tIdx?"var(--fo)":"var(--iv3)", border:"none", cursor:"pointer", transition:"all .3s" }}/>))}</div></div><div className="g2">{testimonials.map((t,i) => (<div key={i} style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", padding:"clamp(24px,5vw,40px)", position:"relative", transition:"all .3s" }}><div className="cg" style={{ position:"absolute", top:18, left:26, fontSize:"4.5rem", lineHeight:1, color:"var(--go)", opacity:.18 }}>"</div><Stars n={t.stars}/><p style={{ fontSize:".89rem", color:"var(--sl2)", lineHeight:1.9, marginBottom:18, paddingTop:6 }}>{t.text.length > 155 ? t.text.slice(0,155)+"…" : t.text}</p><div style={{ display:"flex", alignItems:"center", gap:12, borderTop:"1px solid rgba(0,0,0,.06)", paddingTop:14 }}><div style={{ width:34, height:34, background:"var(--fo)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Cormorant Garamond',serif", fontSize:".9rem", color:"var(--go2)", fontWeight:500 }}>{t.name[0]}</div><div><p style={{ fontSize:".83rem", fontWeight:600, color:"var(--sl)" }}>{t.name}, {t.age}</p><p style={{ fontSize:".72rem", color:"var(--sl3)" }}>{t.role}</p></div></div></div>))}</div><div style={{ marginTop:24, padding:"16px 20px", background:"var(--iv)", border:"1px solid rgba(0,0,0,.07)", display:"flex", gap:14, alignItems:"center" }}><div style={{ width:3, height:34, background:"var(--go)", flexShrink:0 }}/><p style={{ fontSize:".79rem", color:"var(--sl2)", lineHeight:1.8 }}><strong style={{ color:"var(--fo)" }}>Note:</strong> Replace with verified patient reviews before launch. Trustpilot or Google Reviews integration recommended.</p></div></div></section>
 <section className="sec bg-wh"><div className="wrap"><div className="sh text-center"><p className="lbl">Clinical Insights</p><div className="rule rule-c"/><h2 className="sh-title">Evidence-led guidance for metabolic health and longevity.</h2><p className="sh-body" style={{ fontSize: "1rem", maxWidth: 760 }}>Explore practical, GP-led explainers on insulin resistance, cardiovascular risk, and the clinical strategies that shift long-term trajectory.</p></div><div className="g3">{insightPlaceholders.map((item) => (<article key={item.title} className="card" style={{ display: "flex", flexDirection: "column", minHeight: 320 }}><span className="lbl" style={{ marginBottom: 18 }}>{item.category}</span><h3 className="cg" style={{ fontSize: "1.75rem", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 16 }}>{item.title}</h3><p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 22, flexGrow: 1 }}>{item.body}</p><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid rgba(0,0,0,.07)" }}><span style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--sl3)" }}>{item.label}</span><Link href={item.href} style={{ fontSize: ".78rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fo)" }}>{item.cta}</Link></div></article>))}</div></div></section>
 <section id="faq" className="sec bg-iv"><div className="wrap" style={{ maxWidth: 760 }}><div className="sh text-center"><p className="lbl">FAQs</p><div className="rule rule-c"/><h2 className="sh-title">Common questions</h2></div>{faqs.map(item => <FaqItem key={item.q} item={item}/>)} </div></section>
 <section id="newsletter" className="sec bg-wh"><div className="wrap" style={{ maxWidth: 980 }}><div style={{ background: "linear-gradient(135deg, rgba(13,40,24,1) 0%, rgba(19,31,46,1) 100%)", padding: "clamp(28px,6vw,54px)", display: "grid", gap: 28, border: "1px solid rgba(0,0,0,.08)" }}><div><p className="lbl" style={{ color: "var(--go2)", marginBottom: 14 }}>Veridian Intelligence</p><h2 className="cg" style={{ fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.18, marginBottom: 14 }}>Longevity science, translated.</h2><p style={{ fontSize: "1rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9, maxWidth: 680 }}>Get the latest metabolic research and clinical protocols delivered to your inbox.</p></div><LeadCaptureForm source="homepage-newsletter" title="Join the newsletter" subtitle="Weekly metabolic health insight, longevity thinking, and practical next steps from Veridian Clinic." ctaLabel="Join the Newsletter →" buttonClassName="btn btn-go btn-full" compact /></div></div></section>
 <section className="sec bg-fo" style={{ textAlign:"center" }}><div style={{ maxWidth:760, margin:"0 auto" }}><div className="vline"/><h2 className="cg" style={{ fontSize:"clamp(2rem,4.5vw,3rem)", fontWeight:500, color:"var(--iv)", lineHeight:1.25, marginBottom:16 }}>Your biomarkers are not background noise.<br/><em style={{ fontStyle:"italic", color:"var(--go2)" }}>They are the earliest warning system you have.</em></h2><p style={{ fontSize:"1rem", color:"rgba(246,241,232,.58)", lineHeight:1.95, marginBottom:24 }}>Get clarity on what is driving decline, and a clinical plan to reverse course while it is still modifiable.</p><div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}><Link href="/metabolic-scorecard" className="btn btn-go">Take the Metabolic Quiz →</Link><Link href="/assessments" className="btn btn-ol-lt">View All Assessments</Link></div><div style={{ background:"rgba(246,241,232,.05)", border:"1px solid rgba(246,241,232,.08)", padding:"24px", textAlign:"left", marginBottom:26 }}><LeadCaptureForm source="homepage-waitlist" title="Join the Veridian waitlist" subtitle="Get early access to new clinical pathways, flagship offers, and your next-step roadmap." ctaLabel="Join Waitlist →" buttonClassName="btn btn-go btn-full" compact /></div><div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center" }}><span style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.38)" }}>CQC Registered</span><span style={{ color:"rgba(246,241,232,.2)", margin:"0 4px" }}>|</span><span style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.38)" }}>GP Led</span><span style={{ color:"rgba(246,241,232,.2)", margin:"0 4px" }}>|</span><span style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.38)" }}>ApoB · Insulin · Homocysteine</span></div></div></section>
 </main>
 <Footer />
 </>
 );
}
