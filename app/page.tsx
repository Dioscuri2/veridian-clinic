"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const domains = [
 { n:"01", title:"Structural Health", sub:"Your physical foundation", desc:"Cardiovascular fitness, muscle mass, and movement — how well your body tolerates and recovers from everyday physical demand.", metrics:["Resting heart rate","VO₂max / fitness proxy","Body composition","Grip strength & movement"], band:"amr", pct:"56%" },
 { n:"02", title:"Metabolic Health", sub:"How your body handles energy", desc:"How effectively you process glucose and fats — and the hidden burden on your blood vessels and organs. The most powerful lever for long-term disease prevention.", metrics:["HbA1c & fasting insulin","ApoB & full lipid panel","CGM — TIR & variability","Post-prandial glucose patterns"], band:"red", pct:"40%" },
 { n:"03", title:"Recovery", sub:"How you repair and regenerate", desc:"Sleep quality, HRV, and nervous system balance — how well your body shifts from output to restoration. Independently linked to diabetes, hypertension, and cardiovascular mortality.", metrics:["Sleep duration & consistency","Heart rate variability (HRV)","Sleep efficiency","Autonomic balance"], band:"amr", pct:"52%" },
 { n:"04", title:"Stress Resilience", sub:"How you respond to pressure", desc:"How often and how long your body sits in fight-or-flight — directly affecting appetite, blood pressure, sleep quality, and cardiovascular risk.", metrics:["Validated stress screening","Subjective load audit","Physiological markers","Behavioural patterns"], band:"grn", pct:"72%" },
];

const fillHex = { red:"#7a1616", amr:"#8a5500", grn:"#145226" };
const fillClass = { red:"fill-red", amr:"fill-amr", grn:"fill-grn" };
const bandLabel = { red:"High Priority", amr:"Moderate Priority", grn:"On Track" };
const bandClass = { red:"spill-r", amr:"spill-a", grn:"spill-g" };

const programme = [
 "Core Metabolic Assessment — bloods, CGM, sleep tracking",
 "Full domain scorecard & outcome mapping report",
 "Weekly GP check-in — 12 consultations",
 "Personalised nutrition & movement protocol",
 "Repeat blood markers at weeks 6 and 12",
 "GLP-1 or lipid therapy review where clinically indicated",
 "Behaviour & lifestyle coaching throughout",
 "Direct messaging support between sessions",
 "Final 12-week report & forward plan",
];

const testimonials = [
 { name:"James H.", age:"52", role:"Business Owner", text:"I have had annual blood tests for years and was always told everything was fine. Veridian showed my ApoB had been silently elevated for years. Six months on it is down 30% and I feel better than I did at 40.", stars:5 },
 { name:"Sarah M.", age:"44", role:"Senior Partner", text:"The domain scorecard made everything click. I could see exactly why I was tired every afternoon and why my weight kept creeping up despite doing everything 'right'. The CGM data alone was worth every penny.", stars:5 },
 { name:"David K.", age:"48", role:"Consultant Surgeon", text:"As a clinician myself I was sceptical. But the evidence base and Dr Taiwo's clinical reasoning are excellent. The outcome mapping is genuinely clever — I wish this had existed a decade ago.", stars:5 },
 { name:"Rachel T.", age:"39", role:"Director", text:"The 12-week programme was transformative. Not just the results but finally understanding the mechanisms. Dr Taiwo explains complex physiology in a way that actually makes sense.", stars:5 },
];

const faqs = [
 { q:"Is Veridian a replacement for my NHS GP?", a:"No. We are a private preventive and optimisation service that complements your NHS care. We communicate with your GP where clinically appropriate." },
 { q:"Is Veridian CQC registered?", a:"Yes. Veridian Clinic is fully CQC registered. All clinical services are personally led by Dr Oluwatosin Taiwo — MBBS, MRCGP, MRCS." },
 { q:"How are consultations delivered?", a:"All consultations are virtual, delivered via a secure encrypted video platform, accessible across the UK." },
 { q:"What blood tests are included?", a:"The Core Assessment includes HbA1c, fasting insulin, ApoB, full lipid panel, and key metabolic markers. The Advanced Assessment adds Lp(a), HOMA-IR, hsCRP, ferritin and a full cardiovascular risk panel." },
 { q:"Can I access GLP-1 therapy?", a:"Where clinically indicated, we can initiate and supervise GLP-1 therapy as part of a structured programme — always integrated into a wider plan, never prescribed in isolation." },
 { q:"How soon can I be seen?", a:"Initial consultations are typically available within 5–7 working days." },
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
 <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(.92rem,2vw,1.05rem)", fontWeight: 400, color: "var(--fo3)", letterSpacing: ".02em", marginBottom: 10 }} className="a1">
 For the health-conscious professional who knows something is off — but hasn't been able to prove it.
 </p>
 <p className="lbl a1">Longevity &amp; Metabolic Health</p>
 <div className="rule a2"/>
 <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.1rem,7vw,4.4rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--sl)", letterSpacing: "-.01em", margin: "8px 0 22px" }} className="a2">
 Understand what<br/>is driving your health.
 <br/><em style={{ background: "linear-gradient(90deg,var(--go),var(--go2),var(--go3),var(--go2),var(--go))", backgroundSize: "250% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "goldpulse 4s ease infinite", fontStyle: "italic" }}>Then fix it.</em>
 </h1>
 <p className="a3" style={{ fontSize: "clamp(.95rem,2.5vw,1.05rem)", color: "var(--sl2)", lineHeight: 1.9, maxWidth: 540, marginBottom: 10 }}>
 Veridian is a CQC-registered, GP-led longevity and metabolic health clinic. Advanced biomarker testing, continuous glucose monitoring, and structured clinical insight — a precise map of your health and a plan to optimise it.
 </p>
 <p className="a3" style={{ fontSize: ".82rem", color: "var(--sl3)", marginBottom: 28, fontWeight: 400 }}>
 Consultations from <strong style={{ color: "var(--fo)" }}>£195</strong> · Assessments from <strong style={{ color: "var(--fo)" }}>£495</strong>
 </p>
 <div className="a4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
 <Link href="/assessments" className="btn btn-fo">View Assessments →</Link>
 <Link href="/quiz" className="btn btn-ol">Free Clinical Quiz</Link>
 </div>
 <div className="a5" style={{ display: "flex", flexWrap: "wrap", gap: 36, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,.08)", marginTop: 36 }}>
 {[ ["4","Health Domains\nMeasured"],["12","Week Reset\nProgramme"],["2","Specialist\nDoctors"] ].map(([n,l]) => (
 <div key={l}>
 <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 500, color: "var(--fo)", lineHeight: 1 }}>{n}</div>
 <div style={{ fontSize: ".68rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)", marginTop: 5, lineHeight: 1.5 }}>
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
 <span style={{ fontSize: ".86rem", fontWeight: 500, color: "var(--sl)" }}>{d.l}</span>
 <span style={{ fontSize: ".8rem", fontWeight: 600, color: fillHex[d.b as keyof typeof fillHex] }}>{d.s}/10</span>
 </div>
 <div className="sc-bar-track">
 <div className={`sc-bar-fill ${fillClass[d.b as keyof typeof fillClass]}`} style={{ "--bw": d.p } as React.CSSProperties}/>
 </div>
 </div>
 ))}
 <div style={{ marginTop: 24, padding: "16px 18px", background: "var(--iv)", borderLeft: "3px solid var(--fo)" }}>
 <p style={{ fontSize: ".79rem", color: "var(--sl2)", lineHeight: 1.85 }}><strong style={{ color: "var(--fo)" }}>Illustrative example.</strong> Your scores are built from blood tests, CGM data, sleep metrics and validated clinical questionnaires.</p>
 </div>
 <Link href="/assessments" className="btn btn-fo btn-full" style={{ marginTop: 20, fontSize: ".79rem", padding: "12px 18px" }}>Get My Real Score →</Link>
 </div>
 </div>
 </div>
 </section>
 <div className="ticker-wrap bg-iv2"><div className="ticker-inner">{[...Array(4)].flatMap((_, k) => ["Advanced Biomarker Testing","Continuous Glucose Monitoring","CQC Registered","GP Led","12-Week Reset Programme","Nationwide Virtual Care","HbA1c · ApoB · Lp(a)","Longevity Medicine","MRCGP · MRCS"].map(t => (<span key={`${k}-${t}`} className="ticker-item">{t}<span className="ticker-dot"> · </span></span>)))}</div></div>
 <section className="sec bg-fo"><div className="wrap"><div className="g2" style={{ alignItems: "center" }}><div><p className="lbl" style={{ color: "var(--go2)" }}>The Gap</p><div className="rule" style={{ background: "var(--go)" }}/><h2 className="cg" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2 }}>Your NHS results are "normal".<br/><em style={{ fontStyle: "italic", color: "var(--go2)" }}>But you don't feel optimised.</em></h2><p style={{ fontSize: ".91rem", color: "rgba(246,241,232,.62)", lineHeight: 1.95, marginTop: 20, marginBottom: 32 }}>Standard healthcare is built to detect disease. Veridian is built to prevent it — by measuring the domains driving your weight, energy, and cardiovascular risk before they become clinical problems.</p><blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.15rem,2.5vw,1.4rem)", fontStyle: "italic", color: "var(--go2)", lineHeight: 1.75, borderLeft: "3px solid var(--go)", paddingLeft: 22 }}>
 "We don't guess. We measure the domains driving your health — and show you exactly what to fix."
 </blockquote></div><div>{["Your weight creeps upward year on year despite doing the right things.","Your energy crashes mid-afternoon — every single day.","Your routine bloods are fine, but your ApoB has never been measured.","Your family history is quietly coming into focus."].map((t,i) => (<div key={i} style={{ display:"flex", alignItems:"flex-start", gap:16, padding:"18px 22px", background:"rgba(246,241,232,.05)", border:"1px solid rgba(246,241,232,.08)", marginBottom:12 }}><div style={{ width:26, height:26, borderRadius:"50%", border:"1.5px solid var(--go)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1, fontSize:".58rem", color:"var(--go2)", fontWeight:700 }}>✓</div><p style={{ fontSize:".9rem", color:"rgba(246,241,232,.78)", lineHeight:1.85 }}>{t}</p></div>))}</div></div></div></section>
 <section id="process" className="sec bg-iv"><div className="wrap"><div className="sh text-center"><p className="lbl">The Process</p><div className="rule rule-c"/><h2 className="sh-title">From insight to optimisation</h2></div><div className="gproc">{[{n:"01",t:"Consult",d:"A focused GP consultation — your goals, history, and the right diagnostic path."},{n:"02",t:"Measure",d:"Blood markers, CGM, sleep and recovery data build a precise clinical picture."},{n:"03",t:"Interpret",d:"A doctor-led report maps your data to outcomes: weight, energy, cardiovascular risk."},{n:"04",t:"Optimise",d:"A 12-week plan targeting your highest-leverage domains with specific, realistic actions."}].map(s => (<div key={s.n} style={{ padding:"28px 0", borderBottom:"1px solid rgba(0,0,0,.07)" }}><div style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".28em", color:"var(--go)", marginBottom:10 }}>{s.n}</div><div style={{ width:1, height:32, background:"var(--go)", opacity:.45, marginBottom:14 }}/><h3 className="cg" style={{ fontSize:"1.55rem", fontWeight:500, color:"var(--fo)", marginBottom:8 }}>{s.t}</h3><p style={{ fontSize:".87rem", color:"var(--sl2)", lineHeight:1.9 }}>{s.d}</p></div>))}</div></div></section>
 <section id="domains" className="sec bg-wh"><div className="wrap"><div className="sh text-center"><p className="lbl">The Framework</p><div className="rule rule-c"/><h2 className="sh-title">Four domains. One clear picture.</h2><p className="sh-body">Each domain scored 1–10. Red = high priority. Amber = room to improve. Green = maintain. Together they explain every outcome you care about.</p></div><div className="g4">{domains.map(d => (<div key={d.title} className="card" style={{ display:"flex", flexDirection:"column" }}><div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}><span className="lbl">{d.n}</span><span className={`spill ${bandClass[d.band as keyof typeof bandClass]}`}>{bandLabel[d.band as keyof typeof bandLabel]}</span></div><h3 className="cg" style={{ fontSize:"1.5rem", fontWeight:500, color:"var(--sl)", lineHeight:1.2, marginBottom:3 }}>{d.title}</h3><p style={{ fontSize:".75rem", letterSpacing:".06em", color:"var(--go)", marginBottom:12 }}>{d.sub}</p><p style={{ fontSize:".86rem", color:"var(--sl2)", lineHeight:1.85, marginBottom:16, flexGrow:1 }}>{d.desc}</p><div style={{ borderTop:"1px solid rgba(0,0,0,.06)", paddingTop:14, marginBottom:14 }}>{d.metrics.map(m => (<div key={m} style={{ display:"flex", alignItems:"center", gap:9, padding:"3px 0" }}><div style={{ width:4, height:4, borderRadius:"50%", background:"var(--fo)", flexShrink:0 }}/><span style={{ fontSize:".79rem", color:"var(--sl2)" }}>{m}</span></div>))}</div><div className="sc-bar-track"><div className={`sc-bar-fill ${fillClass[d.band as keyof typeof fillClass]}`} style={{ "--bw": d.pct } as React.CSSProperties}/></div></div>))}</div></div></section>
 <section className="sec bg-iv"><div className="wrap"><div className="g2-wide" style={{ display:"grid", alignItems:"center" }}><div><p className="lbl">Why It Matters</p><div className="rule"/><h2 className="cg" style={{ fontSize:"clamp(1.8rem,3.8vw,2.6rem)", fontWeight:500, color:"var(--sl)", lineHeight:1.25 }}>Your symptoms are the effect.<br/><em style={{ fontStyle:"italic", color:"var(--fo2)" }}>Your domains are the cause.</em></h2><p style={{ fontSize:".9rem", color:"var(--sl2)", lineHeight:1.95, marginTop:18, marginBottom:30 }}>The risks you care about most — cardiovascular disease, weight gain, energy crashes — are not random. They emerge from how your four domains interact. We map this precisely.</p><Link href="/assessments" className="btn btn-fo">See Our Assessments →</Link></div><div style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", overflow:"hidden" }}><div style={{ background:"var(--fo)", padding:"14px 26px" }}><p className="lbl" style={{ color:"var(--go2)" }}>Outcome Mapping</p></div>{[{ o:"Cardiovascular risk", d:"Metabolic · Structural · Recovery", m:"ApoB, HbA1c, fitness proxy, resting HR" },{ o:"Weight & body composition", d:"Metabolic · Recovery · Behaviour", m:"Fasting insulin, CGM patterns, sleep" },{ o:"Energy & brain fog", d:"Metabolic · Recovery · Stress", m:"Glycaemic variability, HRV, stress scores" },{ o:"Blood pressure", d:"Structural · Stress · Recovery", m:"Resting HR, cortisol proxy, sleep quality" }].map((r, i, a) => (<div key={r.o} style={{ padding:"18px 26px", borderBottom:i < a.length-1 ? "1px solid rgba(0,0,0,.06)" : "none" }}><p style={{ fontSize:".9rem", fontWeight:600, color:"var(--sl)", marginBottom:3 }}>{r.o}</p><p style={{ fontSize:".76rem", color:"var(--fo2)", marginBottom:2 }}>{r.d}</p><p style={{ fontSize:".73rem", color:"var(--sl3)" }}>{r.m}</p></div>))}</div></div></div></section>
 <section id="programme" className="sec bg-sl"><div className="wrap"><div className="g2" style={{ alignItems:"center" }}><div><p className="lbl" style={{ color:"var(--go2)" }}>The Complete Programme</p><div className="rule" style={{ background:"var(--go)" }}/><h2 className="cg" style={{ fontSize:"clamp(2rem,4.5vw,3rem)", fontWeight:500, color:"var(--iv)", lineHeight:1.2 }}>12-Week Metabolic<br/>Reset Programme</h2><p style={{ fontSize:".92rem", color:"rgba(246,241,232,.6)", lineHeight:1.95, marginTop:18, marginBottom:32 }}>A fully supervised 12-week programme combining complete assessment, weekly GP review, repeat biomarkers, personalised nutrition and movement protocol, and ongoing support.</p><div style={{ background:"rgba(246,241,232,.05)", border:"1px solid rgba(246,241,232,.1)", padding:"24px 28px", marginBottom:30 }}><p className="lbl" style={{ color:"var(--go2)", marginBottom:8 }}>Programme Investment</p><span className="cg" style={{ fontSize:"3rem", fontWeight:400, color:"var(--go2)", lineHeight:1, display:"block" }}>£1,895</span><p style={{ fontSize:".76rem", color:"rgba(246,241,232,.34)", marginTop:6 }}>Payment plans available — contact us to discuss.</p></div><Link href="/book?tier=programme" className="btn btn-go">Enquire About the Programme →</Link></div><ul style={{ listStyle:"none" }}>{programme.map((f,i) => (<li key={f} style={{ display:"flex", alignItems:"flex-start", gap:16, padding:"14px 0", borderBottom:i < programme.length-1 ? "1px solid rgba(246,241,232,.07)" : "none" }}><div style={{ width:22, height:22, borderRadius:"50%", border:"1px solid var(--go)", background:"rgba(200,168,75,.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2, fontSize:".58rem", color:"var(--go2)", fontWeight:700 }}>✓</div><span style={{ fontSize:".88rem", color:"rgba(246,241,232,.7)", lineHeight:1.85 }}>{f}</span></li>))}</ul></div></div></section>
 <section id="team" className="sec bg-iv"><div className="wrap"><div className="sh text-center"><p className="lbl">Our Doctors</p><div className="rule rule-c"/><h2 className="sh-title">Clinically led. Personally invested.</h2></div><div className="g2">{[{ name:"Dr Oluwatosin Taiwo", creds:"MBBS · MRCGP · MRCS", role:"Founder & Longevity GP", bio:"A highly qualified GP with a background spanning general practice, surgery, and metabolic medicine. Dr Taiwo founded Veridian Clinic to bridge the gap between conventional NHS care and the precision preventive medicine that patients deserve — specialising in longevity, metabolic optimisation, and GLP-1 therapy.", tag:"Founder" },{ name:"Dr Tolu Taiwo", creds:"Clinical Oncologist", role:"Clinical Oncologist & Longevity Doctor", bio:"With a background in clinical oncology, Dr Tolu Taiwo brings a systems-level perspective on long-term disease prevention and cellular health. Her expertise adds vital depth to the Veridian approach — focusing on the biological drivers of resilience and the strategies that protect long-term health.", tag:"Clinical Lead" }].map(doc => (<div key={doc.name} className="doc-card"><div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}><div className="doc-avatar">{doc.name.split(" ").pop()![0]}</div><span className="doc-tag">{doc.tag}</span></div><h3 className="doc-name">{doc.name}</h3><p className="doc-creds">{doc.creds}</p><p className="doc-role">{doc.role}</p><p className="doc-bio">{doc.bio}</p></div>))}</div><div className="cqc-strip"><div style={{ display:"flex", flexWrap:"wrap", gap:28 }}>{[["CQC Registered","Full Care Quality Commission registration"],["GP Led","All care by GMC-registered doctors"],["MRCGP Qualified","Royal College of General Practitioners"]].map(([t,d]) => (<div key={t} className="cqc-item"><Shield/><div><p className="cqc-label">{t}</p><p className="cqc-sub">{d}</p></div></div>))}</div><Link href="/assessments" className="btn btn-go" style={{ fontSize:".8rem", padding:"11px 20px" }}>View Assessments →</Link></div></div></section>
 <section id="testimonials" className="sec bg-wh"><div className="wrap"><div className="sh text-center"><p className="lbl">Patient Testimonials</p><div className="rule rule-c"/><h2 className="sh-title">What our patients say</h2><p className="sh-body">Real experiences from patients who have completed the Veridian assessment and programme.</p></div><div style={{ marginBottom: 40 }}>{testimonials.map((t,i) => (<div key={i} style={{ display: i === tIdx ? "block" : "none" }}><div style={{ background:"var(--fo)", padding:"clamp(32px,6vw,52px)", position:"relative", overflow:"hidden" }}><div className="cg" style={{ position:"absolute", top:-20, left:28, fontSize:"12rem", lineHeight:1, color:"rgba(200,168,75,.07)", userSelect:"none" }}>"</div><Stars n={t.stars}/><p className="cg" style={{ fontSize:"clamp(1.15rem,3vw,1.7rem)", fontWeight:400, fontStyle:"italic", color:"var(--iv)", lineHeight:1.75, marginBottom:26, position:"relative" }}>"{t.text}"</p><div style={{ display:"flex", alignItems:"center", gap:14 }}><div style={{ width:44, height:44, background:"var(--go)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", color:"var(--fo)", fontWeight:600 }}>{t.name[0]}</div><div><p style={{ fontSize:".88rem", fontWeight:600, color:"var(--iv)", letterSpacing:".04em" }}>{t.name}, {t.age}</p><p style={{ fontSize:".76rem", color:"var(--go2)" }}>{t.role}</p></div></div></div></div>))}<div style={{ display:"flex", gap:9, justifyContent:"center", marginTop:16 }}>{testimonials.map((_,i) => (<button key={i} onClick={() => setTIdx(i)} style={{ width:i===tIdx?26:7, height:7, background:i===tIdx?"var(--fo)":"var(--iv3)", border:"none", cursor:"pointer", transition:"all .3s" }}/>))}</div></div><div className="g2">{testimonials.map((t,i) => (<div key={i} style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", padding:"clamp(24px,5vw,40px)", position:"relative", transition:"all .3s" }}><div className="cg" style={{ position:"absolute", top:18, left:26, fontSize:"4.5rem", lineHeight:1, color:"var(--go)", opacity:.18 }}>"</div><Stars n={t.stars}/><p style={{ fontSize:".89rem", color:"var(--sl2)", lineHeight:1.9, marginBottom:18, paddingTop:6 }}>{t.text.length > 155 ? t.text.slice(0,155)+"…" : t.text}</p><div style={{ display:"flex", alignItems:"center", gap:12, borderTop:"1px solid rgba(0,0,0,.06)", paddingTop:14 }}><div style={{ width:34, height:34, background:"var(--fo)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Cormorant Garamond',serif", fontSize:".9rem", color:"var(--go2)", fontWeight:500 }}>{t.name[0]}</div><div><p style={{ fontSize:".83rem", fontWeight:600, color:"var(--sl)" }}>{t.name}, {t.age}</p><p style={{ fontSize:".72rem", color:"var(--sl3)" }}>{t.role}</p></div></div></div>))}</div><div style={{ marginTop:24, padding:"16px 20px", background:"var(--iv)", border:"1px solid rgba(0,0,0,.07)", display:"flex", gap:14, alignItems:"center" }}><div style={{ width:3, height:34, background:"var(--go)", flexShrink:0 }}/><p style={{ fontSize:".79rem", color:"var(--sl2)", lineHeight:1.8 }}><strong style={{ color:"var(--fo)" }}>Note:</strong> Replace with verified patient reviews before launch. Trustpilot or Google Reviews integration recommended.</p></div></div></section>
 <section id="faq" className="sec bg-iv"><div className="wrap" style={{ maxWidth: 760 }}><div className="sh text-center"><p className="lbl">FAQs</p><div className="rule rule-c"/><h2 className="sh-title">Common questions</h2></div>{faqs.map(item => <FaqItem key={item.q} item={item}/>)}</div></section>
 <section className="sec bg-fo" style={{ textAlign:"center" }}><div style={{ maxWidth:680, margin:"0 auto" }}><div className="vline"/><h2 className="cg" style={{ fontSize:"clamp(1.9rem,4.5vw,2.9rem)", fontWeight:500, color:"var(--iv)", lineHeight:1.25, marginBottom:16 }}>Your scores are not a judgement.<br/><em style={{ fontStyle:"italic", color:"var(--go2)" }}>They are a dashboard.</em></h2><p style={{ fontSize:".93rem", color:"rgba(246,241,232,.58)", lineHeight:1.95, marginBottom:36 }}>Clarity on what to work on. Evidence that your efforts are changing your underlying risk.</p><div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:36 }}><Link href="/assessments" className="btn btn-go">View Assessments →</Link><Link href="/quiz" className="btn btn-ol-lt">Free Clinical Quiz</Link></div><div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center" }}><span style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.38)" }}>CQC Registered</span><span style={{ color:"rgba(246,241,232,.2)", margin:"0 4px" }}>|</span><span style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.38)" }}>GP Led</span><span style={{ color:"rgba(246,241,232,.2)", margin:"0 4px" }}>|</span><span style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.38)" }}>MRCGP · MRCS</span></div></div></section>
 </main>
 <Footer />
 </>
 );
}
