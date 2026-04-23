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
  "Veridian Baseline biomarkers — exact metabolic risk markers included",
  "One 14-day CGM cycle with interpretation and action plan",
  "Fortnightly coaching to improve nutrition, activity and recovery adherence",
  "GP-led review at programme midpoint to assess progress and adapt treatment where indicated",
  "Personalised nutrition, movement and behaviour protocol",
  "Clinical review of therapies where indicated, including lipid or GLP-1 options",
  "Repeat measurements and end-of-programme forward plan",
];

const offers = [
  {
    name: "Discovery Call",
    price: "£195",
    tier: "discovery",
    tag: "Focused starting point",
    blurb: "A 30-minute GP-led consultation. Useful even if you don't progress further — you leave with clarity, answers to your questions, and a clear written next-step plan.",
    leave_with: [
      "Expert GP assessment of your symptoms and likely metabolic drivers",
      "Clear written action summary and next-step recommendations",
      "Guidance on whether the Veridian Baseline or another route is right for you",
      "Answers to your specific concerns from a qualified doctor",
    ],
    bring: "Recent blood tests (if available), medication list, and your key symptoms or concerns.",
    cta: "Book Discovery Call",
    featured: false,
  },
  {
    name: "Veridian Baseline",
    price: "£595",
    tier: "baseline",
    tag: "Core diagnostic assessment",
    blurb: "A full diagnostic clinical work-up built around the markers most likely to reveal what is driving your symptoms — with clinical interpretation and a clear action plan.",
    leave_with: [
      "Full blood panel: HbA1c, fasting insulin, ApoB, homocysteine, lipid profile, hs-CRP, ALT, AST",
      "Clinical interpretation — not just numbers, but what they mean for you",
      "Written action plan with specific, prioritised next steps",
      "Clear guidance on whether you need CGM, structured follow-up, or the 12-week Reset",
    ],
    bring: null,
    cta: "Book Baseline Audit",
    featured: true,
  },
  {
    name: "12-Week Metabolic Reset",
    price: "£1,895",
    tier: "programme",
    tag: "Structured implementation",
    blurb: "A structured 12-week supervised programme combining the Baseline findings with CGM monitoring, fortnightly coaching and GP oversight. Measurable change, built around your data.",
    leave_with: [
      "Everything in the Veridian Baseline",
      "One 14-day CGM cycle with full interpretation",
      "Fortnightly coaching and accountability check-ins",
      "GP-led clinical review at programme midpoint",
      "End-of-programme review and 12-month forward plan",
    ],
    bring: null,
    cta: "Apply for Reset",
    featured: false,
  },
];

const testimonials = [
  { name:"James H.", age:"52", role:"Business Owner", text:"I had annual blood tests for years and was always told everything was fine. Veridian showed my ApoB had been quietly elevated for years. Six months on it is down 30% and I feel better than I did at 40.", stars:5 },
  { name:"Sarah M.", age:"44", role:"Senior Partner", text:"The domain scorecard made everything click. I could finally see why my energy crashed every afternoon and why my weight kept creeping up despite doing everything 'right'. The CGM data alone was worth it.", stars:5 },
  { name:"David K.", age:"48", role:"Consultant Surgeon", text:"As a clinician myself I was sceptical. But the evidence base and Dr Taiwo's reasoning are excellent. The way Veridian connects biomarkers to outcomes is genuinely useful.", stars:5 },
  { name:"Rachel T.", age:"39", role:"Director", text:"The reset was transformative. Not just the results, but finally understanding the mechanisms. Complex physiology explained in a way that actually changed my behaviour.", stars:5 },
];

const faqs = [
  { q:"Is Veridian a replacement for my NHS GP?", a:"No. We are a private preventive and optimisation service that complements your NHS care. We communicate with your GP where clinically appropriate." },
  { q:"Are your clinical services CQC regulated?", a:"Yes. CQC regulated clinical services are delivered under the umbrella of thanksdoc.co.uk. Veridian Clinic delivers the longevity-focused health optimisation layer, and regulated medical care — including prescribing where indicated — is provided through that CQC regulated structure." },
  { q:"How is care delivered?", a:"All consultations are delivered virtually, nationwide. Regulated medical care is provided through a CQC regulated structure, while our health optimisation and coaching work is delivered by the Veridian team directly." },
  { q:"What blood tests are included?", a:"The Veridian Baseline includes HbA1c, fasting insulin, fasting glucose, ApoB, homocysteine, full lipid panel, ALT, AST, hs-CRP and broader metabolic markers. Higher-tier pathways add deeper review and integrated support." },
  { q:"Can I access GLP-1 therapy?", a:"Where clinically indicated, prescribing pathways including GLP-1 options may be available through our CQC regulated clinical structure — never as an isolated shortcut, always as part of a structured programme." },
  { q:"How soon can I be seen?", a:"Initial consultations are typically available within 5–7 working days." },
];

const insightPlaceholders = [
  { title: "The 7 Missing Markers: A Clinical Guide to Longevity Biomarkers", category: "Free Guide", href: "/markers-guide", cta: "Get the free guide →", label: "Available now", body: "A concise, high-authority guide to the overlooked biomarkers that often reveal metabolic and cardiovascular risk earlier than routine screening." },
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
      <style>{FONTS + CSS + `
        .doc-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 580px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,.08);
          background: var(--wh);
          margin-bottom: 32px;
        }
        .doc-hero-image {
          position: relative;
          background: var(--fo);
          min-height: 480px;
        }
        .doc-hero-image img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .doc-hero-image-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(transparent, rgba(13,40,24,0.88));
          padding: 80px 28px 28px;
        }
        .doc-hero-bio {
          padding: clamp(36px,6vw,64px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .doc-cred-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 28px;
        }
        @media(max-width:900px){
          .doc-hero-grid { grid-template-columns: 1fr; }
          .doc-hero-image { min-height: 400px; }
          .doc-cred-grid { grid-template-columns: 1fr; }
        }
        .offer-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 24px;
          align-items: start;
        }
        @media(max-width:900px){ .offer-grid { grid-template-columns: 1fr; } }
        .offer-card {
          border: 1px solid rgba(0,0,0,.09);
          background: var(--wh);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .offer-card-featured {
          border: 2px solid var(--go);
          background: var(--fo);
        }
        .offer-card-head {
          padding: 28px 28px 20px;
          border-bottom: 1px solid rgba(0,0,0,.07);
        }
        .offer-card-featured .offer-card-head {
          border-bottom-color: rgba(246,241,232,.1);
        }
        .offer-card-body { padding: 24px 28px; flex-grow: 1; display: flex; flex-direction: column; }
        .offer-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem;
          font-weight: 500;
          color: var(--sl);
          line-height: 1;
          margin-bottom: 4px;
        }
        .offer-card-featured .offer-price { color: var(--go2); }
        .symptom-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 12px 40px;
        }
        @media(max-width:640px){ .symptom-grid { grid-template-columns: 1fr; } }
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
        }
        @media(max-width:900px){ .problem-grid { grid-template-columns: 1fr; gap: 14px; } }
        @media(min-width:640px) and (max-width:900px){ .problem-grid { grid-template-columns: repeat(2,1fr); } }
      `}</style>
      <Navigation />
      <main>

        {/* ── 1. HERO ── */}
        <section style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center",
          paddingTop: "calc(var(--nav-h) + 32px)", paddingBottom: 60, paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
          background: "radial-gradient(ellipse 70% 55% at 65% 45%, rgba(13,40,24,.05) 0%, transparent 65%), radial-gradient(ellipse 40% 35% at 12% 78%, rgba(200,168,75,.04) 0%, transparent 55%), var(--iv)" }}>
          <div style={{ maxWidth: "var(--max)", margin: "0 auto", width: "100%" }}>
            <div className="badge-row a1" style={{ marginBottom: 28 }}>
              <span className="badge"><Shield/>GP-Led</span>
              <span className="badge"><Shield/>CQC Regulated Services</span>
              <span className="badge">UK Nationwide</span>
              <span className="badge">Evidence-Based</span>
            </div>
            <div className="g2-hero" style={{ display: "grid", alignItems: "center" }}>
              <div>
                <p className="lbl a1">Metabolic &amp; Longevity Medicine</p>
                <div className="rule a2"/>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem,6.8vw,4.7rem)", fontWeight: 500, lineHeight: 1.09, color: "var(--sl)", letterSpacing: "-.01em", margin: "8px 0 22px" }} className="a2">
                  Fix your weight, energy, sleep and metabolic health at the root cause
                </h1>
                <p className="a3" style={{ fontSize: "clamp(1.05rem,2.5vw,1.18rem)", color: "var(--sl2)", lineHeight: 1.9, maxWidth: 640, marginBottom: 18 }}>
                  Doctor-led metabolic and longevity care for adults 40+ using biomarkers, structured assessment and personalised plans to help you feel better and measure real progress.
                </p>
                <p className="a3" style={{ fontSize: ".84rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 20, lineHeight: 1.7, borderLeft: "2px solid var(--go)", paddingLeft: 14 }}>
                  GP-led &nbsp;·&nbsp; CQC regulated services &nbsp;·&nbsp; Nationwide virtual care
                </p>
                <ul className="a3" style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "grid", gap: 10 }}>
                  {["Fix the drivers behind weight gain, low energy and poor sleep","Use biomarkers to uncover what routine care often misses","Track progress across metabolism, recovery, stress and long-term health"].map(b => (
                    <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.7 }}>
                      <span style={{ color: "var(--go)", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="a4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link href="/book?tier=discovery" className="btn btn-go">Book Discovery Call →</Link>
                  <Link href="/metabolic-quiz" className="btn btn-fo">Take the Metabolic Quiz →</Link>
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
                <Link href="/book?tier=discovery" className="btn btn-fo btn-full" style={{ marginTop: 20 }}>Book Discovery Call →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. WHO THIS IS FOR ── */}
        <section className="sec bg-iv2">
          <div className="wrap">
            <div className="g2-wide" style={{ display: "grid", gap: 48, alignItems: "center" }}>
              <div>
                <p className="lbl">Who This Is For</p>
                <div className="rule" style={{ marginBottom: 22 }}/>
                <h2 className="cg" style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 18 }}>
                  Built for adults 40+ who know something is drifting
                </h2>
                <p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 28 }}>
                  Most patients arrive not in crisis, but because something has shifted and routine care has not given them a clear answer. If any of the following sound familiar, you are in the right place.
                </p>
                <ul className="symptom-grid" style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                  {[
                    "Weight gaining around the middle",
                    "Low energy and persistent fatigue",
                    "Poor sleep and slow recovery",
                    "Stress, burnout or difficulty switching off",
                    "Blood pressure or blood sugar drifting",
                    "Feeling older than you should",
                  ].map(s => (
                    <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
                      <span style={{ color: "var(--fo)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>—</span>
                      <span style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.6 }}>{s}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/metabolic-quiz" className="btn btn-fo">Check Your Metabolic Age — Free →</Link>
                <p style={{ fontSize: ".76rem", color: "var(--sl3)", marginTop: 10, fontStyle: "italic" }}>60 seconds. No account needed.</p>
              </div>
              <div style={{ display: "grid", gap: 16 }}>
                <div style={{ padding: "24px 26px", background: "var(--wh)", border: "1px solid rgba(0,0,0,.07)", borderLeft: "3px solid var(--fo)" }}>
                  <p style={{ fontSize: ".78rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 8 }}>Performance Protector</p>
                  <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.85 }}>You still perform at a high level, but your weight, recovery, blood pressure, family history or lab drift tells you something is moving in the wrong direction. You want precision before damage accumulates.</p>
                </div>
                <div style={{ padding: "24px 26px", background: "var(--wh)", border: "1px solid rgba(0,0,0,.07)", borderLeft: "3px solid var(--go)" }}>
                  <p style={{ fontSize: ".78rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 8 }}>Metabolic Recovery</p>
                  <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.85 }}>Energy is less stable. Weight is harder to shift. Cravings, poor sleep, brain fog or rising risk markers suggest metabolic dysfunction is already affecting daily life. You want a structured way back.</p>
                </div>
                <div style={{ padding: "16px 20px", background: "var(--iv)", borderLeft: "2px solid rgba(0,0,0,.12)" }}>
                  <p style={{ fontSize: ".82rem", color: "var(--sl3)", lineHeight: 1.8, fontStyle: "italic" }}>We do not wait for disease. We look for the hidden pattern driving it — and act while there is still a clean window to reverse it.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="ticker-wrap bg-iv2"><div className="ticker-inner">{[...Array(4)].flatMap((_, k) => ["Fasting Insulin","Homocysteine","ApoB","Continuous Glucose Monitoring","Longevity Medicine","HbA1c · hs-CRP · ALT/AST","Doctor-Led Assessment","12-Week Reset Programme"].map(t => (<span key={`${k}-${t}`} className="ticker-item">{t}<span className="ticker-dot"> · </span></span>)))}</div></div>

        {/* ── 3. MEET THE DOCTOR ── */}
        <section id="team" className="sec bg-iv">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">Meet the Doctor</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">Doctor-led from first assessment to final plan.</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 760 }}>
                When you consult with Veridian, you are speaking to a qualified GP — not a health coach, an AI tool or a wellness brand.
              </p>
            </div>

            <div className="doc-hero-grid">
              <div className="doc-hero-image">
                <img src="/dr-oluwatosin-taiwo.jpg" alt="Dr Oluwatosin Taiwo — Founder and Lead GP, Veridian Clinic" />
                <div className="doc-hero-image-overlay">
                  <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--go2)", marginBottom: 6 }}>Founder &amp; Lead GP</p>
                  <h3 className="cg" style={{ fontSize: "clamp(1.7rem,3.5vw,2.5rem)", color: "#fff", fontWeight: 500, marginBottom: 5, lineHeight: 1.15 }}>Dr Oluwatosin Taiwo</h3>
                  <p style={{ fontSize: ".82rem", color: "rgba(246,241,232,.72)" }}>MBBS &nbsp;·&nbsp; MRCGP &nbsp;·&nbsp; MRCS</p>
                </div>
              </div>
              <div className="doc-hero-bio">
                <p className="lbl" style={{ marginBottom: 14 }}>Why Veridian Clinic Exists</p>
                <div className="rule" style={{ marginBottom: 22 }}/>
                <blockquote className="cg" style={{ fontSize: "clamp(1.45rem,2.8vw,2rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, marginBottom: 22, fontStyle: "italic" }}>
                  "Conventional medicine waits for disease. I built Veridian to act long before it arrives."
                </blockquote>
                <p style={{ fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 16 }}>
                  Dr Taiwo founded Veridian Clinic to fill the gap between routine NHS care — which waits for thresholds to be crossed — and genuinely proactive metabolic medicine that addresses root causes while they are still reversible.
                </p>
                <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 28 }}>
                  His clinical background spans general practice, surgery, and metabolic health. His focus at Veridian is identifying the hidden drivers — insulin burden, ApoB trajectory, sleep disruption, and stress load — and designing precise, structured pathways to address them.
                </p>
                <div className="doc-cred-grid">
                  {[
                    ["MBBS", "Bachelor of Medicine, Bachelor of Surgery"],
                    ["MRCGP", "Member of the Royal College of GPs"],
                    ["MRCS", "Member of the Royal College of Surgeons"],
                    ["GP-Led", "All consultations led by a qualified physician"],
                  ].map(([tag, desc]) => (
                    <div key={tag} style={{ padding: "12px 14px", background: "var(--iv)", borderLeft: "2px solid var(--go)" }}>
                      <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 3 }}>{tag}</p>
                      <p style={{ fontSize: ".78rem", color: "var(--sl3)", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  ))}
                </div>
                <Link href="/book?tier=discovery" className="btn btn-fo">Book a Discovery Call →</Link>
              </div>
            </div>

            <div className="cqc-strip" style={{ marginTop: 32 }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:28 }}>
                {[
                  ["CQC Regulated Services","CQC regulated clinical services delivered through thanksdoc.co.uk"],
                  ["GP-Led Consultations","All medical assessments led by a qualified, experienced General Practitioner"],
                  ["Nationwide Virtual Care","Delivered remotely across the UK — no in-person requirement"]
                ].map(([t,d]) => (
                  <div key={t} className="cqc-item">
                    <Shield/>
                    <div>
                      <p className="cqc-label">{t}</p>
                      <p className="cqc-sub">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/book?tier=discovery" className="btn btn-go" style={{ fontSize:".8rem", padding:"11px 20px" }}>Book Discovery Call →</Link>
            </div>
          </div>
        </section>

        {/* ── 4. WHAT WE DO ── */}
        <section id="process" className="sec bg-wh">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">What We Do</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">Identify the root cause. Build a plan. Measure the change.</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 760 }}>Veridian combines doctor-led medical assessment with advanced longevity support so the regulated and optimisation layers are clear, joined up, and built around your data.</p>
            </div>
            <div className="gproc">
              {[
                { n:"01", t:"GP-Led Clinical Assessment", d:"All consultations are led by Dr Taiwo, a qualified GP. We assess symptoms, history and goals — and look beyond routine markers to find what is actually driving your picture." },
                { n:"02", t:"Biomarker-Led Diagnosis", d:"We run the markers most likely to reveal insulin burden, ApoB-driven cardiovascular risk, sleep dysfunction and metabolic stress — and interpret them clinically, not just numerically." },
                { n:"03", t:"Personalised Action Plan", d:"You leave with a written, prioritised plan. No generic advice. Your data, your drivers, your next steps — with CGM and coaching available where appropriate." },
                { n:"04", t:"Measured Progress Over Time", d:"We use biomarker review, behaviour change support and structured follow-up to keep progress practical, trackable and sustainable." },
              ].map(s => (
                <div key={s.n} style={{ padding:"28px 0", borderBottom:"1px solid rgba(0,0,0,.07)" }}>
                  <div style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".28em", color:"var(--go)", marginBottom:10 }}>{s.n}</div>
                  <div style={{ width:1, height:32, background:"var(--go)", opacity:.45, marginBottom:14 }}/>
                  <h3 className="cg" style={{ fontSize:"1.65rem", fontWeight:500, color:"var(--fo)", marginBottom:8 }}>{s.t}</h3>
                  <p style={{ fontSize:".95rem", color:"var(--sl2)", lineHeight:1.9 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOUR DOMAINS ── */}
        <section id="domains" className="sec bg-iv"><div className="wrap"><div className="sh text-center"><p className="lbl">The Framework</p><div className="rule rule-c"/><h2 className="sh-title">Four domains. One clear picture.</h2><p className="sh-body" style={{ fontSize: "1rem" }}>Each domain is scored 1–10. Red means it needs attention now. Amber means there is room to improve. Green means maintain your gains. Together they explain the outcomes you care about most.</p></div><div className="g4">{domains.map(d => (<div key={d.title} className="card" style={{ display:"flex", flexDirection:"column" }}><div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}><span className="lbl">{d.n}</span><span className={`spill ${bandClass[d.band as keyof typeof bandClass]}`}>{bandLabel[d.band as keyof typeof bandLabel]}</span></div><h3 className="cg" style={{ fontSize:"1.6rem", fontWeight:500, color:"var(--sl)", lineHeight:1.2, marginBottom:3 }}>{d.title}</h3><p style={{ fontSize:".8rem", letterSpacing:".06em", color:"var(--go)", marginBottom:12 }}>{d.sub}</p><p style={{ fontSize:".92rem", color:"var(--sl2)", lineHeight:1.9, marginBottom:16, flexGrow:1 }}>{d.desc}</p><div style={{ borderTop:"1px solid rgba(0,0,0,.06)", paddingTop:14, marginBottom:14 }}>{d.metrics.map(m => (<div key={m} style={{ display:"flex", alignItems:"center", gap:9, padding:"4px 0" }}><div style={{ width:4, height:4, borderRadius:"50%", background:"var(--fo)", flexShrink:0 }}/><span style={{ fontSize:".83rem", color:"var(--sl2)" }}>{m}</span></div>))}</div><div className="sc-bar-track"><div className={`sc-bar-fill ${fillClass[d.band as keyof typeof fillClass]}`} style={{ "--bw": d.pct } as React.CSSProperties}/></div></div>))}</div></div></section>

        {/* ── 5. METABOLIC QUIZ CTA ── */}
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
              <p className="lbl" style={{ color: "var(--go2)", marginBottom: 0 }}>Free · 60 Seconds · Instant Result</p>
              <h2 className="cg" style={{ fontSize: "clamp(2.1rem,4.8vw,3.4rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.14, maxWidth: 780, margin: 0 }}>Check Your Metabolic Age</h2>
              <p style={{ fontSize: "1rem", color: "rgba(246,241,232,.74)", lineHeight: 1.9, maxWidth: 680, margin: 0 }}>Answer 7 focused questions and get an estimate of your metabolic age — the key drivers behind your energy, weight trajectory, and long-term cardiometabolic risk. Free, and no account required.</p>
              <Link href="/metabolic-quiz" className="btn btn-go">Take the Metabolic Quiz →</Link>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
                <span style={{ fontSize: ".67rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(246,241,232,.38)" }}>Free &amp; Instant</span>
                <span style={{ color: "rgba(246,241,232,.2)", margin: "0 4px" }}>|</span>
                <span style={{ fontSize: ".67rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(246,241,232,.38)" }}>No account needed</span>
                <span style={{ color: "rgba(246,241,232,.2)", margin: "0 4px" }}>|</span>
                <span style={{ fontSize: ".67rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(246,241,232,.38)" }}>Clinical framework</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. WHAT WE MEASURE ── */}
        <section className="sec bg-iv"><div className="wrap"><div className="g2-wide" style={{ display:"grid", alignItems:"center" }}><div><p className="lbl">The Missing-Link Markers</p><div className="rule"/><h2 className="cg" style={{ fontSize:"clamp(1.95rem,3.8vw,2.7rem)", fontWeight:500, color:"var(--sl)", lineHeight:1.25 }}>The symptoms are obvious.<br/><em style={{ fontStyle:"italic", color:"var(--fo2)" }}>The drivers are often hidden.</em></h2><p style={{ fontSize:"1rem", color:"var(--sl2)", lineHeight:1.95, marginTop:18, marginBottom:30 }}>A normal-looking basic check-up can miss the very markers most relevant to future decline. Veridian is built to surface the missing links early — particularly insulin burden, ApoB-driven vascular risk and homocysteine-related methylation stress.</p><Link href="/assessments" className="btn btn-fo">See Our Assessments →</Link></div><div style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", overflow:"hidden" }}><div style={{ background:"var(--fo)", padding:"14px 26px" }}><p className="lbl" style={{ color:"var(--go2)" }}>What We Measure — and Why</p></div>{[{ o:"Insulin burden", d:"Fasting insulin · HbA1c · CGM patterns", m:"Helps explain weight gain, cravings, energy crashes and early insulin resistance" },{ o:"ApoB-driven vascular risk", d:"ApoB · lipid panel", m:"Shows the particle burden linked to long-term cardiovascular disease risk" },{ o:"Homocysteine load", d:"Homocysteine", m:"Flags methylation stress associated with vascular and neurological risk" },{ o:"Inflammation & liver stress", d:"hs-CRP · ALT · AST", m:"Helps reveal inflammatory load and metabolic strain that routine screening may underplay" }].map((r, i, a) => (<div key={r.o} style={{ padding:"18px 26px", borderBottom:i < a.length-1 ? "1px solid rgba(0,0,0,.06)" : "none" }}><p style={{ fontSize:".95rem", fontWeight:600, color:"var(--sl)", marginBottom:3 }}>{r.o}</p><p style={{ fontSize:".8rem", color:"var(--fo2)", marginBottom:2 }}>{r.d}</p><p style={{ fontSize:".78rem", color:"var(--sl3)", lineHeight: 1.7 }}>{r.m}</p></div>))}</div></div></div></section>

        {/* ── 7. OFFER PREVIEW ── */}
        <section id="assessments" className="sec bg-iv2">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">Assessments &amp; Pathways</p>
              <div className="rule rule-c"/>
              <h2 className="cg sh-title">A clear pathway from first conversation to lasting change.</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 740 }}>
                Every patient starts somewhere. Choose the level of precision that matches where you are right now.
              </p>
            </div>
            <div className="offer-grid">
              {offers.map((o) => (
                <div key={o.name} className={`offer-card${o.featured ? " offer-card-featured" : ""}`}>
                  {o.featured && (
                    <div style={{ position:"absolute", top:-1, left:28, background:"var(--go)", padding:"4px 14px", fontSize:".68rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--fo)" }}>
                      Recommended starting point
                    </div>
                  )}
                  <div className="offer-card-head" style={{ paddingTop: o.featured ? 36 : 28 }}>
                    <p style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color: o.featured ? "var(--go2)" : "var(--fo)", marginBottom:6 }}>{o.tag}</p>
                    <h3 className="cg" style={{ fontSize:"1.65rem", fontWeight:500, color: o.featured ? "var(--iv)" : "var(--sl)", lineHeight:1.2, marginBottom:12 }}>{o.name}</h3>
                    <div className="offer-price">{o.price}</div>
                    <p style={{ fontSize:".84rem", color: o.featured ? "rgba(246,241,232,.65)" : "var(--sl3)", marginTop:4, fontStyle:"italic" }}>
                      {o.name === "12-Week Metabolic Reset" ? "Payment plans available" : "One-off consultation"}
                    </p>
                  </div>
                  <div className="offer-card-body">
                    <p style={{ fontSize:".92rem", color: o.featured ? "rgba(246,241,232,.78)" : "var(--sl2)", lineHeight:1.9, marginBottom:20 }}>{o.blurb}</p>
                    <p style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color: o.featured ? "var(--go2)" : "var(--fo)", marginBottom:10 }}>What you leave with</p>
                    <ul style={{ listStyle:"none", marginBottom:20, flexGrow:1 }}>
                      {o.leave_with.map(f => (
                        <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"5px 0", borderBottom:`1px solid ${o.featured ? "rgba(246,241,232,.07)" : "rgba(0,0,0,.05)"}` }}>
                          <div style={{ width:14, height:14, borderRadius:"50%", border:`1px solid ${o.featured ? "var(--go)" : "var(--fo)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:3, fontSize:".48rem", color: o.featured ? "var(--go)" : "var(--fo)", fontWeight:700 }}>✓</div>
                          <span style={{ fontSize:".85rem", color: o.featured ? "rgba(246,241,232,.7)" : "var(--sl2)", lineHeight:1.75 }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {o.bring && (
                      <div style={{ padding:"12px 14px", background: o.featured ? "rgba(246,241,232,.06)" : "var(--iv)", borderLeft:"2px solid var(--go)", marginBottom:20 }}>
                        <p style={{ fontSize:".76rem", fontWeight:600, color: o.featured ? "var(--go2)" : "var(--fo)", marginBottom:3 }}>Bring to your call:</p>
                        <p style={{ fontSize:".78rem", color: o.featured ? "rgba(246,241,232,.6)" : "var(--sl3)", lineHeight:1.7, fontStyle:"italic" }}>{o.bring}</p>
                      </div>
                    )}
                    <Link href={`/book?tier=${o.tier}`} className={`btn btn-full ${o.featured ? "btn-go" : "btn-fo"}`} style={{ marginTop:"auto" }}>
                      {o.cta} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:28 }}>
              <Link href="/assessments" className="btn btn-ol">Compare all assessments in detail →</Link>
            </div>
          </div>
        </section>

        {/* ── 8. TESTIMONIALS ── */}
        <section id="testimonials" className="sec bg-wh">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">Patient Experiences</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">What our patients say</h2>
              <p className="sh-body">Experiences from patients who have completed the Veridian assessment and programme.</p>
            </div>
            <div style={{ marginBottom: 40 }}>
              {testimonials.map((t,i) => (
                <div key={i} style={{ display: i === tIdx ? "block" : "none" }}>
                  <div style={{ background:"var(--fo)", padding:"clamp(32px,6vw,52px)", position:"relative", overflow:"hidden" }}>
                    <div className="cg" style={{ position:"absolute", top:-20, left:28, fontSize:"12rem", lineHeight:1, color:"rgba(200,168,75,.07)", userSelect:"none" }}>"</div>
                    <Stars n={t.stars}/>
                    <p className="cg" style={{ fontSize:"clamp(1.15rem,3vw,1.7rem)", fontWeight:400, fontStyle:"italic", color:"var(--iv)", lineHeight:1.75, marginBottom:26, position:"relative" }}>"{t.text}"</p>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ width:44, height:44, background:"var(--go)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", color:"var(--fo)", fontWeight:600 }}>{t.name[0]}</div>
                      <div>
                        <p style={{ fontSize:".88rem", fontWeight:600, color:"var(--iv)", letterSpacing:".04em" }}>{t.name}, {t.age}</p>
                        <p style={{ fontSize:".76rem", color:"var(--go2)" }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", gap:9, justifyContent:"center", marginTop:16 }}>
                {testimonials.map((_,i) => (
                  <button key={i} onClick={() => setTIdx(i)} style={{ width:i===tIdx?26:7, height:7, background:i===tIdx?"var(--fo)":"var(--iv3)", border:"none", cursor:"pointer", transition:"all .3s" }}/>
                ))}
              </div>
            </div>
            <div className="g2">
              {testimonials.map((t,i) => (
                <div key={i} style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", padding:"clamp(24px,5vw,40px)", position:"relative", transition:"all .3s" }}>
                  <div className="cg" style={{ position:"absolute", top:18, left:26, fontSize:"4.5rem", lineHeight:1, color:"var(--go)", opacity:.18 }}>"</div>
                  <Stars n={t.stars}/>
                  <p style={{ fontSize:".89rem", color:"var(--sl2)", lineHeight:1.9, marginBottom:18, paddingTop:6 }}>{t.text.length > 155 ? t.text.slice(0,155)+"…" : t.text}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:12, borderTop:"1px solid rgba(0,0,0,.06)", paddingTop:14 }}>
                    <div style={{ width:34, height:34, background:"var(--fo)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Cormorant Garamond',serif", fontSize:".9rem", color:"var(--go2)", fontWeight:500 }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize:".83rem", fontWeight:600, color:"var(--sl)" }}>{t.name}, {t.age}</p>
                      <p style={{ fontSize:".72rem", color:"var(--sl3)" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLINICAL INSIGHTS ── */}
        <section className="sec bg-wh"><div className="wrap"><div className="sh text-center"><p className="lbl">Clinical Insights</p><div className="rule rule-c"/><h2 className="sh-title">Evidence-led guidance for metabolic health and longevity.</h2><p className="sh-body" style={{ fontSize: "1rem", maxWidth: 760 }}>Practical explainers on insulin resistance, cardiovascular risk, and the clinical strategies that shift long-term trajectory.</p></div><div className="g3">{insightPlaceholders.map((item) => (<article key={item.title} className="card" style={{ display: "flex", flexDirection: "column", minHeight: 320 }}><span className="lbl" style={{ marginBottom: 18 }}>{item.category}</span><h3 className="cg" style={{ fontSize: "1.75rem", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 16 }}>{item.title}</h3><p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 22, flexGrow: 1 }}>{item.body}</p><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid rgba(0,0,0,.07)" }}><span style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--sl3)" }}>{item.label}</span><Link href={item.href} style={{ fontSize: ".78rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fo)" }}>{item.cta}</Link></div></article>))}</div></div></section>

        {/* ── FAQ ── */}
        <section id="faq" className="sec bg-iv"><div className="wrap" style={{ maxWidth: 760 }}><div className="sh text-center"><p className="lbl">FAQs</p><div className="rule rule-c"/><h2 className="sh-title">Common questions</h2></div>{faqs.map(item => <FaqItem key={item.q} item={item}/>)}</div></section>

        {/* ── NEWSLETTER ── */}
        <section id="newsletter" className="sec bg-wh"><div className="wrap" style={{ maxWidth: 980 }}><div style={{ background: "linear-gradient(135deg, rgba(13,40,24,1) 0%, rgba(19,31,46,1) 100%)", padding: "clamp(28px,6vw,54px)", display: "grid", gap: 28, border: "1px solid rgba(0,0,0,.08)" }}><div><p className="lbl" style={{ color: "var(--go2)", marginBottom: 14 }}>Veridian Intelligence</p><h2 className="cg" style={{ fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.18, marginBottom: 14 }}>Longevity science, translated.</h2><p style={{ fontSize: "1rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9, maxWidth: 680 }}>Get the latest metabolic research and clinical protocols delivered to your inbox.</p></div><LeadCaptureForm source="homepage-newsletter" title="Join the newsletter" subtitle="Weekly metabolic health insight, longevity thinking, and practical next steps from Veridian Clinic." ctaLabel="Join the Newsletter →" buttonClassName="btn btn-go btn-full" compact /></div></div></section>

        {/* ── 9. FINAL CTA ── */}
        <section className="sec bg-fo" style={{ textAlign:"center" }}>
          <div style={{ maxWidth:760, margin:"0 auto" }}>
            <div className="vline"/>
            <h2 className="cg" style={{ fontSize:"clamp(2rem,4.5vw,3rem)", fontWeight:500, color:"var(--iv)", lineHeight:1.25, marginBottom:16 }}>Long-term health needs more than symptom management.<br/><em style={{ fontStyle:"italic", color:"var(--go2)" }}>It needs clarity, structure, and follow-through.</em></h2>
            <p style={{ fontSize:"1rem", color:"rgba(246,241,232,.58)", lineHeight:1.95, marginBottom:24 }}>Get clarity on what is driving decline, and a plan that combines CQC regulated medical pathways with meaningful health optimisation support.</p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:32 }}>
              <Link href="/book?tier=discovery" className="btn btn-go">Book Discovery Call →</Link>
              <Link href="/metabolic-quiz" className="btn btn-ol-lt">Take the Metabolic Quiz</Link>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center" }}>
              <span style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.38)" }}>CQC Regulated Services</span>
              <span style={{ color:"rgba(246,241,232,.2)", margin:"0 4px" }}>|</span>
              <span style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.38)" }}>GP-Led</span>
              <span style={{ color:"rgba(246,241,232,.2)", margin:"0 4px" }}>|</span>
              <span style={{ fontSize:".67rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.38)" }}>ApoB · Insulin · Homocysteine</span>
            </div>
            <p style={{ fontSize:".72rem", color:"rgba(246,241,232,.28)", lineHeight:1.8, marginTop:24 }}>
              CQC regulated clinical services are delivered under the umbrella of thanksdoc.co.uk.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
