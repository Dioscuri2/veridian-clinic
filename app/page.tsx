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

const offers = [
  {
    name: "Discovery Call",
    price: "£195",
    tier: "discovery",
    tag: "First conversation",
    blurb: "A 30-minute GP-led consultation to review your concerns, history and goals. Useful even if you don't progress immediately — you leave with clarity and a clear written next-step plan.",
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
    tag: "Diagnostic assessment",
    blurb: "The deeper clinical work-up. A structured assessment built around the biomarkers most likely to reveal what is driving your symptoms — with clinical interpretation and a clear action plan.",
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
    tag: "Structured programme",
    blurb: "12 weeks of supervised implementation. CGM monitoring, fortnightly coaching, and GP oversight combined into a programme designed to create measurable, lasting change.",
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
        /* ── Hero split layout ── */
        .hero-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100svh;
          padding-top: var(--nav-h);
        }
        .hero-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(48px,8vh,96px) clamp(28px,6vw,88px);
          background: var(--iv);
        }
        .hero-img-col {
          position: relative;
          overflow: hidden;
          background: var(--fo);
        }
        .hero-img-col img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        @media(max-width:900px) {
          .hero-split { grid-template-columns: 1fr; min-height: auto; }
          .hero-text-col { padding: 40px 24px 48px; order: 2; }
          .hero-img-col { height: 420px; order: 1; }
        }

        /* ── Meet the doctor ── */
        .doc-editorial {
          display: grid;
          grid-template-columns: 480px 1fr;
          min-height: 560px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,.08);
          background: var(--wh);
        }
        .doc-editorial-img {
          position: relative;
          background: var(--fo);
        }
        .doc-editorial-img img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .doc-editorial-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(transparent, rgba(13,40,24,.85));
          padding: 72px 28px 28px;
        }
        .doc-editorial-bio {
          padding: clamp(36px,5vw,60px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .doc-cred-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 28px;
        }
        @media(max-width:960px) {
          .doc-editorial { grid-template-columns: 1fr; }
          .doc-editorial-img { min-height: 420px; }
          .doc-cred-grid { grid-template-columns: 1fr; }
        }

        /* ── Offer cards ── */
        .offer-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 24px;
          align-items: start;
        }
        @media(max-width:900px) { .offer-grid { grid-template-columns: 1fr; } }
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
        .offer-card-head { padding: 28px 28px 20px; border-bottom: 1px solid rgba(0,0,0,.07); }
        .offer-card-featured .offer-card-head { border-bottom-color: rgba(246,241,232,.1); }
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

        /* ── Domain cards ── */
        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
        }
        @media(max-width:900px) { .problem-grid { grid-template-columns: 1fr; gap: 14px; } }
        @media(min-width:640px) and (max-width:900px) { .problem-grid { grid-template-columns: repeat(2,1fr); } }
      `}</style>
      <Navigation />
      <main>

        {/* ─────────────────────────────────────────────────────────
            1. HERO — clean split: copy left, doctor image right
        ───────────────────────────────────────────────────────── */}
        <section className="hero-split">
          <div className="hero-text-col">
            <p className="lbl a1" style={{ marginBottom: 12 }}>Metabolic &amp; Longevity Medicine</p>
            <div className="rule a1" style={{ marginBottom: 24 }}/>
            <h1
              className="cg a2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem,5.5vw,4.2rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                color: "var(--sl)",
                letterSpacing: "-.01em",
                marginBottom: 28,
              }}
            >
              Fix your weight, energy, sleep, and metabolic health at the root cause.
            </h1>
            <p
              className="a2"
              style={{
                fontSize: ".82rem",
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--fo)",
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <span style={{ display:"flex", alignItems:"center", gap:6 }}><Shield/>GP-led</span>
              <span style={{ color:"var(--iv3)" }}>·</span>
              <span>CQC regulated services</span>
              <span style={{ color:"var(--iv3)" }}>·</span>
              <span>Nationwide virtual care</span>
            </p>
            <div className="a3" style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
              <Link href="/book?tier=discovery" className="btn btn-go" style={{ textAlign: "center" }}>
                Book a Discovery Call →
              </Link>
              <Link href="/metabolic-quiz" className="btn btn-fo" style={{ textAlign: "center" }}>
                Check your metabolic age — Free
              </Link>
            </div>
          </div>
          <div className="hero-img-col">
            <img src="/dr-tosin.jpg" alt="Dr Tosin Taiwo GP — Founder of Veridian Clinic" />
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            2. WHO IS THIS FOR
        ───────────────────────────────────────────────────────── */}
        <section className="sec bg-iv2">
          <div className="wrap" style={{ maxWidth: 1060 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px,6vw,80px)", alignItems: "start" }}>
              <div>
                <p className="lbl" style={{ marginBottom: 14 }}>Who Is This For?</p>
                <div className="rule" style={{ marginBottom: 24 }}/>
                <h2
                  className="cg"
                  style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.18, marginBottom: 20 }}
                >
                  Built for adults 40+ who know something is drifting
                </h2>
                <p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 28 }}>
                  Most patients arrive not in crisis, but because something has shifted and routine care has not given them a clear answer.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                  {[
                    "Weight gaining around the middle",
                    "Low energy and persistent fatigue",
                    "Poor sleep and slow recovery",
                    "Stress, burnout or difficulty switching off",
                    "Blood pressure or blood sugar drifting",
                    "Feeling older than you should",
                  ].map(s => (
                    <li
                      key={s}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "11px 0",
                        borderBottom: "1px solid rgba(0,0,0,.06)",
                        fontSize: ".95rem",
                        color: "var(--sl2)",
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--fo)", flexShrink: 0 }}/>
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href="/book?tier=discovery" className="btn btn-fo">Book your discovery call →</Link>
              </div>

              <div style={{ display: "grid", gap: 16, paddingTop: 8 }}>
                <div style={{ padding: "26px 28px", background: "var(--wh)", border: "1px solid rgba(0,0,0,.07)", borderTop: "3px solid var(--fo)" }}>
                  <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 10 }}>High-functioning but declining</p>
                  <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.85 }}>You still perform at a high level. But your weight, energy, recovery, blood pressure, or family history tells you something is moving in the wrong direction. You want precision before damage accumulates.</p>
                </div>
                <div style={{ padding: "26px 28px", background: "var(--wh)", border: "1px solid rgba(0,0,0,.07)", borderTop: "3px solid var(--go)" }}>
                  <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 10 }}>Already feeling the drift</p>
                  <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.85 }}>Energy is less stable. Weight is harder to shift. Cravings, poor sleep, brain fog or rising risk markers are already affecting daily life. You want a structured way back.</p>
                </div>
                <div style={{ padding: "20px 22px", background: "var(--iv)", borderLeft: "3px solid var(--go)" }}>
                  <p style={{ fontSize: ".84rem", color: "var(--sl3)", lineHeight: 1.8, fontStyle: "italic" }}>
                    We do not wait for disease. We look for the hidden pattern driving it — and act while there is still a clean window to reverse it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            3. MEET THE DOCTOR
        ───────────────────────────────────────────────────────── */}
        <section id="team" className="sec bg-iv">
          <div className="wrap">
            <div className="sh text-center" style={{ marginBottom: 40 }}>
              <p className="lbl">Meet the Doctor</p>
              <div className="rule rule-c"/>
            </div>
            <div className="doc-editorial">
              <div className="doc-editorial-img">
                <img src="/dr-tosin.jpg" alt="Dr Tosin Taiwo — Founder and Lead GP, Veridian Clinic" />
                <div className="doc-editorial-overlay">
                  <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--go2)", marginBottom: 6 }}>Founder &amp; Lead GP</p>
                  <h3 className="cg" style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", color: "#fff", fontWeight: 500, marginBottom: 5, lineHeight: 1.15 }}>Dr Tosin Taiwo</h3>
                  <p style={{ fontSize: ".82rem", color: "rgba(246,241,232,.72)" }}>MBBS &nbsp;·&nbsp; MRCGP &nbsp;·&nbsp; MRCS</p>
                </div>
              </div>
              <div className="doc-editorial-bio">
                <p className="lbl" style={{ marginBottom: 14 }}>GP-Led Metabolic Medicine</p>
                <div className="rule" style={{ marginBottom: 22 }}/>
                <h2
                  className="cg"
                  style={{ fontSize: "clamp(1.5rem,2.8vw,2.1rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 20 }}
                >
                  Doctor-led metabolic and longevity care for adults who feel something is drifting.
                </h2>
                <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 14 }}>
                  Dr Taiwo is a qualified GP with a background spanning general practice, surgery and metabolic health. He leads all Veridian consultations personally — you speak to a doctor, not a health coach or AI tool.
                </p>
                <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 28 }}>
                  His focus is identifying the hidden drivers — insulin burden, ApoB trajectory, sleep disruption, and stress load — and building precise, structured pathways to address them before they become harder to reverse.
                </p>
                <div className="doc-cred-grid">
                  {[
                    ["MBBS", "Bachelor of Medicine and Surgery"],
                    ["MRCGP", "Member of the Royal College of GPs"],
                    ["MRCS", "Member of the Royal College of Surgeons"],
                    ["CQC Regulated", "Regulated clinical services via thanksdoc.co.uk"],
                  ].map(([tag, desc]) => (
                    <div key={tag} style={{ padding: "12px 14px", background: "var(--iv)", borderLeft: "2px solid var(--go)" }}>
                      <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 3 }}>{tag}</p>
                      <p style={{ fontSize: ".77rem", color: "var(--sl3)", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  ))}
                </div>
                <Link href="/book?tier=discovery" className="btn btn-fo">Book a Discovery Call →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            4. ABOUT / STORY
        ───────────────────────────────────────────────────────── */}
        <section id="about" className="sec bg-sl">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl" style={{ color: "var(--go2)", textAlign: "center", marginBottom: 12 }}>Why Veridian Exists</p>
            <div className="rule rule-c" style={{ background: "var(--go)", marginBottom: 40 }}/>
            <blockquote
              className="cg"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem,3.8vw,2.7rem)",
                fontWeight: 500,
                fontStyle: "italic",
                color: "var(--iv)",
                lineHeight: 1.35,
                borderLeft: "3px solid var(--go)",
                paddingLeft: "clamp(20px,4vw,36px)",
                marginBottom: 40,
              }}
            >
              "Conventional medicine often waits for disease.<br/>
              I built Veridian to act long before it arrives."
            </blockquote>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <p style={{ fontSize: ".95rem", color: "rgba(246,241,232,.72)", lineHeight: 1.95 }}>
                Many of my patients were being told their blood tests were 'normal' while feeling tired, heavier, struggling with energy and sleep, and sensing something was off. Routine care had no clear answer for them.
              </p>
              <p style={{ fontSize: ".95rem", color: "rgba(246,241,232,.72)", lineHeight: 1.95 }}>
                Veridian exists to bridge that gap — using the biomarkers that routine care rarely checks, structured assessment, and personalised doctor-led plans to help patients act earlier and track real progress.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            5. SCORECARD / QUIZ INTRO
        ───────────────────────────────────────────────────────── */}
        <section id="scorecard" className="sec bg-iv">
          <div className="wrap">
            <div className="g2-wide" style={{ display: "grid", gap: "clamp(36px,6vw,72px)", alignItems: "center" }}>
              <div>
                <p className="lbl" style={{ marginBottom: 14 }}>Free Metabolic Assessment</p>
                <div className="rule" style={{ marginBottom: 24 }}/>
                <h2
                  className="cg"
                  style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 16 }}
                >
                  Four domains.<br/>One clear picture.
                </h2>
                <p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 12 }}>
                  Your metabolic health is not one number. It is the combination of four domains — structural, metabolic, recovery and stress resilience.
                </p>
                <p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 28 }}>
                  The free quiz estimates your metabolic age and identifies which domain is likely driving your symptoms.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 340 }}>
                  <Link href="/metabolic-quiz" className="btn btn-fo">
                    Check Your Metabolic Age — Free →
                  </Link>
                </div>
                <p style={{ fontSize: ".75rem", color: "var(--sl3)", marginTop: 10, fontStyle: "italic" }}>60 seconds. No account needed. Instant result.</p>
              </div>
              <div style={{ background: "var(--wh)", border: "1px solid rgba(0,0,0,.09)", padding: "clamp(24px,4vw,36px)", boxShadow: "0 20px 60px rgba(13,40,24,.08)", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 48, height: 3, background: "var(--go)" }}/>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 48, background: "var(--go)" }}/>
                <p className="lbl" style={{ marginBottom: 22 }}>Sample Domain Scorecard</p>
                {[{ l:"Structural Health",s:6,p:"60%",b:"amr"},{ l:"Metabolic Health",s:4,p:"40%",b:"red"},{ l:"Recovery",s:5,p:"52%",b:"amr"},{ l:"Stress Resilience",s:7,p:"72%",b:"grn"}].map(d => (
                  <div key={d.l} style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: ".9rem", fontWeight: 500, color: "var(--sl)" }}>{d.l}</span>
                      <span style={{ fontSize: ".82rem", fontWeight: 600, color: fillHex[d.b as keyof typeof fillHex] }}>{d.s}/10</span>
                    </div>
                    <div className="sc-bar-track">
                      <div className={`sc-bar-fill ${fillClass[d.b as keyof typeof fillClass]}`} style={{ "--bw": d.p } as React.CSSProperties}/>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 20, padding: "14px 16px", background: "var(--iv)", borderLeft: "3px solid var(--fo)" }}>
                  <p style={{ fontSize: ".8rem", color: "var(--sl2)", lineHeight: 1.8 }}><strong style={{ color: "var(--fo)" }}>Illustrative example.</strong> Your score is built from blood tests, CGM data, sleep metrics and clinical questionnaires.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            6. IDENTIFY THE ROOT CAUSE / BUILD A PLAN
        ───────────────────────────────────────────────────────── */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 980 }}>
            <div className="sh text-center" style={{ marginBottom: 40 }}>
              <p className="lbl">The Veridian Method</p>
              <div className="rule rule-c"/>
              <h2 className="cg sh-title">Understand the cause. Build the plan.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ padding: "clamp(28px,5vw,44px)", background: "var(--iv)", border: "1px solid rgba(0,0,0,.07)" }}>
                <div style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".28em", color: "var(--go)", marginBottom: 16 }}>01</div>
                <h3 className="cg" style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}>Identify the root cause</h3>
                <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 20 }}>We run the biomarkers that routine care rarely checks — the markers most likely to explain weight gain, fatigue, cardiovascular risk, and metabolic drift.</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {["Insulin burden & glucose variability","ApoB-driven cardiovascular risk","Homocysteine & methylation stress","Sleep, HRV & recovery signals"].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", borderBottom: "1px solid rgba(0,0,0,.05)", fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--fo)", flexShrink: 0, fontWeight: 700, marginTop: 1 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: "clamp(28px,5vw,44px)", background: "var(--fo)", border: "2px solid var(--go)" }}>
                <div style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".28em", color: "var(--go2)", marginBottom: 16 }}>02</div>
                <h3 className="cg" style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 14 }}>Build a plan</h3>
                <p style={{ fontSize: ".93rem", color: "rgba(246,241,232,.75)", lineHeight: 1.9, marginBottom: 20 }}>You leave with a written, personalised action plan. No generic advice — your data, your drivers, your next steps.</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {["Clear written priorities and next steps","CGM where appropriate","Fortnightly coaching & accountability","GP review at programme midpoint"].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", borderBottom: "1px solid rgba(246,241,232,.08)", fontSize: ".88rem", color: "rgba(246,241,232,.72)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--go2)", flexShrink: 0, fontWeight: 700, marginTop: 1 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            7. CLEAR PATHWAY — HOW IT WORKS
        ───────────────────────────────────────────────────────── */}
        <section id="process" className="sec bg-iv">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">How It Works</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">A clear pathway from first conversation to lasting change.</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 700 }}>
                Every patient starts with a conversation. From there, the pathway is structured, measurable, and GP-led at every stage.
              </p>
            </div>
            <div className="gproc">
              {[
                { n:"01", t:"Discovery Call", d:"A 30-minute GP-led consultation to understand your symptoms, history and goals. You leave with clarity and a clear written next-step recommendation — useful even if you do not progress immediately." },
                { n:"02", t:"Veridian Baseline", d:"A full diagnostic assessment. The biomarkers most likely to reveal insulin burden, ApoB-driven risk, and metabolic dysfunction — with clinical interpretation and a clear action plan." },
                { n:"03", t:"Personalised Plan", d:"A written, prioritised plan built around your data. CGM, nutrition, movement and behaviour protocols. Where clinically indicated, prescribing pathways including GLP-1 options are available." },
                { n:"04", t:"Structured Follow-Up", d:"Fortnightly coaching, GP-led clinical review at midpoint, and an end-of-programme review with a 12-month forward plan. Progress is measured, not assumed." },
              ].map(s => (
                <div key={s.n} style={{ padding:"28px 0", borderBottom:"1px solid rgba(0,0,0,.07)" }}>
                  <div style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".28em", color:"var(--go)", marginBottom:10 }}>{s.n}</div>
                  <div style={{ width:1, height:28, background:"var(--go)", opacity:.4, marginBottom:14 }}/>
                  <h3 className="cg" style={{ fontSize:"1.6rem", fontWeight:500, color:"var(--fo)", marginBottom:8 }}>{s.t}</h3>
                  <p style={{ fontSize:".93rem", color:"var(--sl2)", lineHeight:1.9 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            8. SYMPTOMS AND BIOMARKERS — WHAT WE MEASURE
        ───────────────────────────────────────────────────────── */}
        <section className="sec bg-wh">
          <div className="wrap">
            <div className="g2-wide" style={{ display:"grid", alignItems:"center" }}>
              <div>
                <p className="lbl">What We Measure</p>
                <div className="rule" style={{ marginBottom: 22 }}/>
                <h2 className="cg" style={{ fontSize:"clamp(1.9rem,3.8vw,2.7rem)", fontWeight:500, color:"var(--sl)", lineHeight:1.25, marginBottom: 18 }}>
                  The symptoms are obvious.<br/>
                  <em style={{ fontStyle:"italic", color:"var(--fo2)" }}>The drivers are often hidden.</em>
                </h2>
                <p style={{ fontSize:".97rem", color:"var(--sl2)", lineHeight:1.95, marginBottom:30 }}>
                  A routine check-up can miss the very markers most relevant to future decline. Veridian surfaces the missing links early — particularly insulin burden, ApoB-driven vascular risk, and homocysteine-related methylation stress.
                </p>
                <Link href="/assessments" className="btn btn-fo">See Our Assessments →</Link>
              </div>
              <div style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", overflow:"hidden" }}>
                <div style={{ background:"var(--fo)", padding:"14px 26px" }}>
                  <p className="lbl" style={{ color:"var(--go2)" }}>What We Measure — and Why</p>
                </div>
                {[
                  { o:"Insulin burden", d:"Fasting insulin · HbA1c · CGM patterns", m:"Explains weight gain, cravings, energy crashes and early insulin resistance" },
                  { o:"ApoB-driven vascular risk", d:"ApoB · full lipid panel", m:"Shows the particle burden linked to long-term cardiovascular disease risk" },
                  { o:"Homocysteine load", d:"Homocysteine", m:"Flags methylation stress associated with vascular and neurological risk" },
                  { o:"Inflammation & liver stress", d:"hs-CRP · ALT · AST", m:"Reveals inflammatory load and metabolic strain that routine screening may miss" },
                  { o:"Sleep & recovery", d:"HRV · sleep architecture · recovery signals", m:"Sleep quality directly affects glucose, appetite, and long-term metabolic function" },
                ].map((r, i, a) => (
                  <div key={r.o} style={{ padding:"16px 26px", borderBottom:i < a.length-1 ? "1px solid rgba(0,0,0,.06)" : "none" }}>
                    <p style={{ fontSize:".93rem", fontWeight:600, color:"var(--sl)", marginBottom:2 }}>{r.o}</p>
                    <p style={{ fontSize:".78rem", color:"var(--fo2)", marginBottom:2 }}>{r.d}</p>
                    <p style={{ fontSize:".77rem", color:"var(--sl3)", lineHeight: 1.7 }}>{r.m}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            9. PRICING
        ───────────────────────────────────────────────────────── */}
        <section id="assessments" className="sec bg-iv2">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">Assessments &amp; Pathways</p>
              <div className="rule rule-c"/>
              <h2 className="cg sh-title">A clear pathway from first conversation to lasting change.</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 680 }}>
                Choose the level of precision that matches where you are right now.
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
                    <p style={{ fontSize:".82rem", color: o.featured ? "rgba(246,241,232,.6)" : "var(--sl3)", marginTop:4, fontStyle:"italic" }}>
                      {o.name === "12-Week Metabolic Reset" ? "Payment plans available" : "One-off consultation"}
                    </p>
                  </div>
                  <div className="offer-card-body">
                    <p style={{ fontSize:".92rem", color: o.featured ? "rgba(246,241,232,.78)" : "var(--sl2)", lineHeight:1.9, marginBottom:20 }}>{o.blurb}</p>
                    <p style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color: o.featured ? "var(--go2)" : "var(--fo)", marginBottom:10 }}>What you leave with</p>
                    <ul style={{ listStyle:"none", marginBottom:20, flexGrow:1 }}>
                      {o.leave_with.map(f => (
                        <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"5px 0", borderBottom:`1px solid ${o.featured ? "rgba(246,241,232,.07)" : "rgba(0,0,0,.05)"}` }}>
                          <div style={{ width:13, height:13, borderRadius:"50%", border:`1px solid ${o.featured ? "var(--go)" : "var(--fo)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:3, fontSize:".44rem", color: o.featured ? "var(--go)" : "var(--fo)", fontWeight:700 }}>✓</div>
                          <span style={{ fontSize:".84rem", color: o.featured ? "rgba(246,241,232,.7)" : "var(--sl2)", lineHeight:1.75 }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {o.bring && (
                      <div style={{ padding:"12px 14px", background: o.featured ? "rgba(246,241,232,.06)" : "var(--iv)", borderLeft:"2px solid var(--go)", marginBottom:20 }}>
                        <p style={{ fontSize:".75rem", fontWeight:600, color: o.featured ? "var(--go2)" : "var(--fo)", marginBottom:3 }}>Bring to your call:</p>
                        <p style={{ fontSize:".77rem", color: o.featured ? "rgba(246,241,232,.6)" : "var(--sl3)", lineHeight:1.7, fontStyle:"italic" }}>{o.bring}</p>
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

        {/* ─────────────────────────────────────────────────────────
            10. TESTIMONIALS
        ───────────────────────────────────────────────────────── */}
        <section id="testimonials" className="sec bg-wh">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">Patient Experiences</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">What our patients say</h2>
            </div>
            <div style={{ marginBottom: 40 }}>
              {testimonials.map((t,i) => (
                <div key={i} style={{ display: i === tIdx ? "block" : "none" }}>
                  <div style={{ background:"var(--fo)", padding:"clamp(32px,6vw,52px)", position:"relative", overflow:"hidden" }}>
                    <div className="cg" style={{ position:"absolute", top:-20, left:28, fontSize:"12rem", lineHeight:1, color:"rgba(200,168,75,.07)", userSelect:"none" }}>"</div>
                    <Stars n={t.stars}/>
                    <p className="cg" style={{ fontSize:"clamp(1.15rem,3vw,1.65rem)", fontWeight:400, fontStyle:"italic", color:"var(--iv)", lineHeight:1.75, marginBottom:26, position:"relative" }}>"{t.text}"</p>
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
                <div key={i} style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", padding:"clamp(24px,4vw,36px)", position:"relative" }}>
                  <div className="cg" style={{ position:"absolute", top:18, left:26, fontSize:"4rem", lineHeight:1, color:"var(--go)", opacity:.15 }}>"</div>
                  <Stars n={t.stars}/>
                  <p style={{ fontSize:".88rem", color:"var(--sl2)", lineHeight:1.9, marginBottom:18, paddingTop:4 }}>{t.text.length > 155 ? t.text.slice(0,155)+"…" : t.text}</p>
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

        {/* ─────────────────────────────────────────────────────────
            11. FRAMEWORK — FOUR DOMAINS (deeper detail, lower)
        ───────────────────────────────────────────────────────── */}
        <section id="domains" className="sec bg-iv">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">The Clinical Framework</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">Four domains. One clear picture.</h2>
              <p className="sh-body" style={{ fontSize: "1rem" }}>Each domain is scored 1–10. Together they explain the outcomes you care about most.</p>
            </div>
            <div className="g4">
              {domains.map(d => (
                <div key={d.title} className="card" style={{ display:"flex", flexDirection:"column" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                    <span className="lbl">{d.n}</span>
                    <span className={`spill ${bandClass[d.band as keyof typeof bandClass]}`}>{bandLabel[d.band as keyof typeof bandLabel]}</span>
                  </div>
                  <h3 className="cg" style={{ fontSize:"1.55rem", fontWeight:500, color:"var(--sl)", lineHeight:1.2, marginBottom:3 }}>{d.title}</h3>
                  <p style={{ fontSize:".78rem", letterSpacing:".06em", color:"var(--go)", marginBottom:10 }}>{d.sub}</p>
                  <p style={{ fontSize:".9rem", color:"var(--sl2)", lineHeight:1.9, marginBottom:14, flexGrow:1 }}>{d.desc}</p>
                  <div style={{ borderTop:"1px solid rgba(0,0,0,.06)", paddingTop:12, marginBottom:12 }}>
                    {d.metrics.map(m => (
                      <div key={m} style={{ display:"flex", alignItems:"center", gap:9, padding:"3px 0" }}>
                        <div style={{ width:4, height:4, borderRadius:"50%", background:"var(--fo)", flexShrink:0 }}/>
                        <span style={{ fontSize:".82rem", color:"var(--sl2)" }}>{m}</span>
                      </div>
                    ))}
                  </div>
                  <div className="sc-bar-track">
                    <div className={`sc-bar-fill ${fillClass[d.band as keyof typeof fillClass]}`} style={{ "--bw": d.pct } as React.CSSProperties}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            FAQ
        ───────────────────────────────────────────────────────── */}
        <section id="faq" className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sh text-center">
              <p className="lbl">FAQs</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">Common questions</h2>
            </div>
            {faqs.map(item => <FaqItem key={item.q} item={item}/>)}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            NEWSLETTER
        ───────────────────────────────────────────────────────── */}
        <section id="newsletter" className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 920 }}>
            <div style={{ background: "linear-gradient(135deg, rgba(13,40,24,1) 0%, rgba(19,31,46,1) 100%)", padding: "clamp(28px,6vw,54px)", display: "grid", gap: 28, border: "1px solid rgba(0,0,0,.08)" }}>
              <div>
                <p className="lbl" style={{ color: "var(--go2)", marginBottom: 14 }}>Veridian Intelligence</p>
                <h2 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.18, marginBottom: 12 }}>Longevity science, translated.</h2>
                <p style={{ fontSize: ".97rem", color: "rgba(246,241,232,.68)", lineHeight: 1.9, maxWidth: 620 }}>Weekly metabolic health insight and practical next steps from Veridian Clinic.</p>
              </div>
              <LeadCaptureForm source="homepage-newsletter" title="Join the newsletter" subtitle="Weekly metabolic health insight, longevity thinking, and practical next steps from Veridian Clinic." ctaLabel="Join the Newsletter →" buttonClassName="btn btn-go btn-full" compact />
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────
            FINAL CTA
        ───────────────────────────────────────────────────────── */}
        <section className="sec bg-fo" style={{ textAlign:"center" }}>
          <div style={{ maxWidth:720, margin:"0 auto" }}>
            <div className="vline"/>
            <h2 className="cg" style={{ fontSize:"clamp(1.9rem,4vw,2.9rem)", fontWeight:500, color:"var(--iv)", lineHeight:1.25, marginBottom:16 }}>
              Long-term health needs more than symptom management.<br/>
              <em style={{ fontStyle:"italic", color:"var(--go2)" }}>It needs clarity, structure, and follow-through.</em>
            </h2>
            <p style={{ fontSize:".97rem", color:"rgba(246,241,232,.55)", lineHeight:1.95, marginBottom:28 }}>
              Get clarity on what is driving decline, and a plan that combines CQC regulated medical care with meaningful health optimisation support.
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:32 }}>
              <Link href="/book?tier=discovery" className="btn btn-go">Book Discovery Call →</Link>
              <Link href="/metabolic-quiz" className="btn btn-ol-lt">Take the Metabolic Quiz</Link>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:14, justifyContent:"center", marginBottom:20 }}>
              <span style={{ fontSize:".66rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.35)" }}>CQC Regulated Services</span>
              <span style={{ color:"rgba(246,241,232,.18)" }}>|</span>
              <span style={{ fontSize:".66rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.35)" }}>GP-Led</span>
              <span style={{ color:"rgba(246,241,232,.18)" }}>|</span>
              <span style={{ fontSize:".66rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(246,241,232,.35)" }}>ApoB · Insulin · Homocysteine</span>
            </div>
            <p style={{ fontSize:".7rem", color:"rgba(246,241,232,.24)", lineHeight:1.8 }}>
              CQC regulated clinical services are delivered under the umbrella of thanksdoc.co.uk.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
