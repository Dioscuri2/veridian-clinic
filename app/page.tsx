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
      "Guidance on whether the Veridian Baseline is right for you",
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
      "Clear guidance on next steps including CGM or structured programme",
    ],
    bring: null,
    cta: "Book Baseline",
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
  { q:"What blood tests are included?", a:"The Veridian Baseline includes HbA1c, fasting insulin, fasting glucose, ApoB, homocysteine, full lipid panel, ALT, AST, hs-CRP and broader metabolic markers." },
  { q:"Can I access GLP-1 therapy?", a:"Where clinically indicated, prescribing pathways including GLP-1 options may be available through our CQC regulated clinical structure — never as an isolated shortcut, always as part of a structured programme." },
  { q:"How soon can I be seen?", a:"Initial consultations are typically available within 5–7 working days." },
];

const whoItems = [
  { title: "Weight gaining around the middle", detail: "Often driven by insulin resistance or metabolic adaptation that standard diet advice does not address. We identify the exact driver so the plan can target it directly." },
  { title: "Low energy and persistent fatigue", detail: "Consistent fatigue and afternoon energy crashes are often linked to glucose dysregulation, poor sleep architecture, or early adrenal strain — not just 'being busy'." },
  { title: "Poor sleep and slow recovery", detail: "You sleep enough hours but wake unrefreshed. HRV and sleep architecture often reveal what a mattress upgrade cannot. Recovery is a measurable metabolic signal." },
  { title: "Stress, burnout or difficulty switching off", detail: "How often and how long your body stays in a stress state directly affects appetite, blood pressure, glucose control, sleep quality and long-term cardiovascular risk." },
  { title: "Blood pressure or blood sugar drifting", detail: "Your GP says everything is 'normal' — but fasting insulin, ApoB and homocysteine tell a different story if anyone bothers to check them. We check them." },
  { title: "Feeling older than you should", detail: "Reduced performance, heavier, slower recovery — these are often early metabolic signals, not inevitable ageing. The right biomarker picture tells us what is actually happening." },
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

function WhoCard({ title, detail }: { title: string; detail: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(o => !o)}
      style={{
        width: "100%",
        textAlign: "left",
        background: open ? "var(--wh)" : "var(--wh)",
        border: `1px solid ${open ? "var(--fo)" : "rgba(0,0,0,.08)"}`,
        borderLeft: `3px solid ${open ? "var(--fo)" : "rgba(0,0,0,.1)"}`,
        padding: "16px 20px",
        cursor: "pointer",
        transition: "border-color .2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: ".95rem", fontWeight: 500, color: "var(--sl)", lineHeight: 1.4 }}>{title}</span>
        <span style={{ fontSize: "1.2rem", color: "var(--fo)", fontWeight: 300, flexShrink: 0, transition: "transform .2s", transform: open ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
      </div>
      {open && (
        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,.06)" }}>
          {detail}
        </p>
      )}
    </button>
  );
}

function MethodCard({ num, title, points, dark }: { num: string; title: string; points: string[]; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen(o => !o)}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "clamp(24px,4vw,36px)",
        background: dark ? "var(--fo)" : "var(--iv)",
        border: dark ? "2px solid var(--go)" : "1px solid rgba(0,0,0,.07)",
        cursor: "pointer",
        transition: "opacity .15s",
      }}
    >
      <div style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".28em", color: dark ? "var(--go2)" : "var(--go)", marginBottom: 10 }}>{num}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h3 className="cg" style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", fontWeight: 500, color: dark ? "var(--iv)" : "var(--sl)", lineHeight: 1.2 }}>{title}</h3>
        <span style={{ fontSize: "1.4rem", color: dark ? "var(--go2)" : "var(--fo)", fontWeight: 300, flexShrink: 0, transition: "transform .2s", transform: open ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
      </div>
      {open && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 18 }}>
          {points.map(item => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", borderBottom: `1px solid ${dark ? "rgba(246,241,232,.08)" : "rgba(0,0,0,.05)"}`, fontSize: ".88rem", color: dark ? "rgba(246,241,232,.75)" : "var(--sl2)", lineHeight: 1.65 }}>
              <span style={{ color: dark ? "var(--go2)" : "var(--fo)", flexShrink: 0, fontWeight: 700, marginTop: 1 }}>{dark ? "✓" : "—"}</span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {!open && (
        <p style={{ fontSize: ".8rem", color: dark ? "rgba(246,241,232,.45)" : "var(--sl3)", marginTop: 10, fontStyle: "italic" }}>
          Tap to learn more
        </p>
      )}
    </button>
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
          order: 1;
        }
        .hero-img-col {
          position: relative;
          overflow: hidden;
          background: var(--fo);
          order: 2;
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
          .hero-split {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .hero-text-col {
            padding: 36px 20px 44px;
            order: 1;
          }
          .hero-img-col {
            height: 380px;
            order: 2;
          }
        }

        /* ── Meet the doctor ── */
        .doc-editorial {
          display: grid;
          grid-template-columns: 460px 1fr;
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
          padding: clamp(32px,5vw,56px);
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
          .doc-editorial-img { min-height: 400px; }
          .doc-cred-grid { grid-template-columns: 1fr; }
        }

        /* ── Offer cards ── */
        .offer-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
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
        .offer-card-head { padding: 24px 24px 18px; border-bottom: 1px solid rgba(0,0,0,.07); }
        .offer-card-featured .offer-card-head { border-bottom-color: rgba(246,241,232,.1); }
        .offer-card-body { padding: 20px 24px; flex-grow: 1; display: flex; flex-direction: column; }
        .offer-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem;
          font-weight: 500;
          color: var(--sl);
          line-height: 1;
          margin-bottom: 4px;
        }
        .offer-card-featured .offer-price { color: var(--go2); }

        /* ── Method cards ── */
        .method-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media(max-width:700px) { .method-grid { grid-template-columns: 1fr; } }

        /* ── Who-is-for grid ── */
        .who-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        @media(max-width:700px) { .who-grid { grid-template-columns: 1fr; } }
      `}</style>
      <Navigation />
      <main>

        {/* ══════════════════════════════════════════════════
            1. HERO — text first (desktop + mobile), image below on mobile
        ══════════════════════════════════════════════════ */}
        <section className="hero-split">
          <div className="hero-text-col">
            <p className="lbl a1" style={{ marginBottom: 10 }}>Metabolic &amp; Longevity Medicine</p>
            <div className="rule a1" style={{ marginBottom: 22 }}/>
            <h1
              className="cg a2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.6rem,5.8vw,4.6rem)",
                fontWeight: 600,
                lineHeight: 1.08,
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
              <span style={{ color:"rgba(0,0,0,.2)" }}>·</span>
              <span>CQC regulated</span>
              <span style={{ color:"rgba(0,0,0,.2)" }}>·</span>
              <span>Nationwide</span>
            </p>
            <div className="a3" style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 380 }}>
              <Link href="/book?tier=discovery" className="btn btn-go" style={{ textAlign: "center", padding: "16px 24px" }}>
                Book a Discovery Call →
              </Link>
              <Link href="/metabolic-quiz" className="btn btn-fo" style={{ textAlign: "center", padding: "14px 24px" }}>
                Check your metabolic age — Free
              </Link>
            </div>
          </div>
          <div className="hero-img-col">
            <img src="/dr-tosin.jpg" alt="Dr Tosin Taiwo GP — Veridian Clinic" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            2. WHO IS THIS FOR — clickable accordion cards
        ══════════════════════════════════════════════════ */}
        <section className="sec bg-iv2">
          <div className="wrap" style={{ maxWidth: 1000 }}>
            <div className="sh text-center" style={{ marginBottom: 32 }}>
              <p className="lbl">Who Is This For?</p>
              <div className="rule rule-c"/>
              <h2 className="cg sh-title" style={{ marginBottom: 8 }}>Built for adults 40+</h2>
              <p className="sh-body" style={{ maxWidth: 600, margin: "0 auto" }}>
                High-functioning adults who feel something is shifting — and want clarity, not guesswork.
              </p>
            </div>
            <div className="who-grid" style={{ marginBottom: 32 }}>
              {whoItems.map(item => (
                <WhoCard key={item.title} title={item.title} detail={item.detail} />
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <Link href="/book?tier=discovery" className="btn btn-fo">Book your discovery call →</Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            3. MEET THE DOCTOR — restored editorial image
        ══════════════════════════════════════════════════ */}
        <section id="team" className="sec bg-iv">
          <div className="wrap">
            <div className="sh text-center" style={{ marginBottom: 36 }}>
              <p className="lbl">Meet the Doctor</p>
              <div className="rule rule-c"/>
            </div>
            <div className="doc-editorial">
              <div className="doc-editorial-img">
                <img src="/dr-oluwatosin-taiwo.jpg" alt="Dr Tosin Taiwo — Founder and Lead GP, Veridian Clinic" />
                <div className="doc-editorial-overlay">
                  <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--go2)", marginBottom: 6 }}>Founder &amp; Lead GP</p>
                  <h3 className="cg" style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)", color: "#fff", fontWeight: 500, marginBottom: 5, lineHeight: 1.15 }}>Dr Tosin Taiwo</h3>
                  <p style={{ fontSize: ".82rem", color: "rgba(246,241,232,.72)" }}>MBBS &nbsp;·&nbsp; MRCGP &nbsp;·&nbsp; MRCS</p>
                </div>
              </div>
              <div className="doc-editorial-bio">
                <p className="lbl" style={{ marginBottom: 14 }}>GP-Led Metabolic Medicine</p>
                <div className="rule" style={{ marginBottom: 20 }}/>
                <h2
                  className="cg"
                  style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, marginBottom: 18 }}
                >
                  Doctor-led metabolic and longevity care for adults who feel something is drifting.
                </h2>
                <p style={{ fontSize: ".93rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 14 }}>
                  Dr Taiwo is a qualified GP with a background spanning general practice, surgery and metabolic health. He leads all Veridian consultations personally — you speak to a doctor, not a health coach or AI tool.
                </p>
                <p style={{ fontSize: ".91rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 26 }}>
                  His focus is identifying the hidden drivers — insulin burden, ApoB trajectory, sleep disruption, and stress load — and building precise, structured pathways to address them before they become harder to reverse.
                </p>
                <div className="doc-cred-grid">
                  {[
                    ["MBBS", "Bachelor of Medicine and Surgery"],
                    ["MRCGP", "Member of the Royal College of GPs"],
                    ["MRCS", "Member of the Royal College of Surgeons"],
                    ["CQC Regulated", "Regulated clinical services via thanksdoc.co.uk"],
                  ].map(([tag, desc]) => (
                    <div key={tag} style={{ padding: "11px 13px", background: "var(--iv)", borderLeft: "2px solid var(--go)" }}>
                      <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--fo)", marginBottom: 2 }}>{tag}</p>
                      <p style={{ fontSize: ".76rem", color: "var(--sl3)", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  ))}
                </div>
                <Link href="/book?tier=discovery" className="btn btn-fo">Book a Discovery Call →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            4. PRICING — moved up, directly after Meet the Doctor
        ══════════════════════════════════════════════════ */}
        <section id="assessments" className="sec bg-iv2">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">Assessments &amp; Pathways</p>
              <div className="rule rule-c"/>
              <h2 className="cg sh-title">A clear pathway from first conversation to lasting change.</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 620 }}>
                Choose the level of precision that matches where you are right now.
              </p>
            </div>
            <div className="offer-grid">
              {offers.map((o) => (
                <div key={o.name} className={`offer-card${o.featured ? " offer-card-featured" : ""}`}>
                  {o.featured && (
                    <div style={{ position:"absolute", top:-1, left:24, background:"var(--go)", padding:"3px 12px", fontSize:".66rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--fo)" }}>
                      Most popular
                    </div>
                  )}
                  <div className="offer-card-head" style={{ paddingTop: o.featured ? 34 : 24 }}>
                    <p style={{ fontSize:".7rem", fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color: o.featured ? "var(--go2)" : "var(--fo)", marginBottom:5 }}>{o.tag}</p>
                    <h3 className="cg" style={{ fontSize:"1.55rem", fontWeight:500, color: o.featured ? "var(--iv)" : "var(--sl)", lineHeight:1.2, marginBottom:10 }}>{o.name}</h3>
                    <div className="offer-price">{o.price}</div>
                    <p style={{ fontSize:".8rem", color: o.featured ? "rgba(246,241,232,.55)" : "var(--sl3)", marginTop:3, fontStyle:"italic" }}>
                      {o.name === "12-Week Metabolic Reset" ? "Payment plans available" : "One-off consultation"}
                    </p>
                  </div>
                  <div className="offer-card-body">
                    <p style={{ fontSize:".9rem", color: o.featured ? "rgba(246,241,232,.78)" : "var(--sl2)", lineHeight:1.9, marginBottom:18 }}>{o.blurb}</p>
                    <p style={{ fontSize:".7rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color: o.featured ? "var(--go2)" : "var(--fo)", marginBottom:8 }}>What you leave with</p>
                    <ul style={{ listStyle:"none", marginBottom:18, flexGrow:1 }}>
                      {o.leave_with.map(f => (
                        <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:9, padding:"4px 0", borderBottom:`1px solid ${o.featured ? "rgba(246,241,232,.07)" : "rgba(0,0,0,.05)"}` }}>
                          <div style={{ width:13, height:13, borderRadius:"50%", border:`1px solid ${o.featured ? "var(--go)" : "var(--fo)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:3, fontSize:".44rem", color: o.featured ? "var(--go)" : "var(--fo)", fontWeight:700 }}>✓</div>
                          <span style={{ fontSize:".83rem", color: o.featured ? "rgba(246,241,232,.7)" : "var(--sl2)", lineHeight:1.7 }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {o.bring && (
                      <div style={{ padding:"11px 13px", background: o.featured ? "rgba(246,241,232,.06)" : "var(--iv)", borderLeft:"2px solid var(--go)", marginBottom:18 }}>
                        <p style={{ fontSize:".74rem", fontWeight:600, color: o.featured ? "var(--go2)" : "var(--fo)", marginBottom:2 }}>Bring to your call:</p>
                        <p style={{ fontSize:".76rem", color: o.featured ? "rgba(246,241,232,.6)" : "var(--sl3)", lineHeight:1.7, fontStyle:"italic" }}>{o.bring}</p>
                      </div>
                    )}
                    <Link href={`/book?tier=${o.tier}`} className={`btn btn-full ${o.featured ? "btn-go" : "btn-fo"}`} style={{ marginTop:"auto" }}>
                      {o.cta} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:24 }}>
              <Link href="/assessments" className="btn btn-ol">Compare all assessments →</Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            5. ABOUT / STORY
        ══════════════════════════════════════════════════ */}
        <section id="about" className="sec bg-sl">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <p className="lbl" style={{ color: "var(--go2)", textAlign: "center", marginBottom: 12 }}>Why Veridian Exists</p>
            <div className="rule rule-c" style={{ background: "var(--go)", marginBottom: 36 }}/>
            <blockquote
              className="cg"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.55rem,3.6vw,2.6rem)",
                fontWeight: 500,
                fontStyle: "italic",
                color: "var(--iv)",
                lineHeight: 1.35,
                borderLeft: "3px solid var(--go)",
                paddingLeft: "clamp(18px,4vw,32px)",
                marginBottom: 36,
              }}
            >
              "Conventional medicine often waits for disease.<br/>
              I built Veridian to act long before it arrives."
            </blockquote>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
              <p style={{ fontSize: ".94rem", color: "rgba(246,241,232,.7)", lineHeight: 1.95 }}>
                Many of my patients were being told their blood tests were 'normal' while feeling tired, heavier, struggling with energy and sleep, and sensing something was off. Routine care had no clear answer.
              </p>
              <p style={{ fontSize: ".94rem", color: "rgba(246,241,232,.7)", lineHeight: 1.95 }}>
                Veridian bridges that gap — using the biomarkers that routine care rarely checks, structured assessment, and personalised doctor-led plans to help patients act earlier and track real progress.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            6. QUIZ CTA — simple strip
        ══════════════════════════════════════════════════ */}
        <section id="scorecard" className="sec bg-wh" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div style={{
            background: "linear-gradient(135deg, #0d1f1a 0%, #13212e 100%)",
            padding: "clamp(28px,5vw,44px) clamp(24px,6vw,80px)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}>
            <div>
              <p className="lbl" style={{ color: "var(--go2)", marginBottom: 6 }}>Free · Instant · No account needed</p>
              <h2 className="cg" style={{ fontSize: "clamp(1.5rem,3.5vw,2.4rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.15, margin: 0 }}>
                Check your metabolic age for free
              </h2>
            </div>
            <Link href="/metabolic-quiz" className="btn btn-go" style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
              Take the quiz →
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            7. IDENTIFY ROOT CAUSE / BUILD A PLAN — clickable
        ══════════════════════════════════════════════════ */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 940 }}>
            <div className="sh text-center" style={{ marginBottom: 32 }}>
              <p className="lbl">The Veridian Method</p>
              <div className="rule rule-c"/>
              <h2 className="cg sh-title">Understand the cause. Build the plan.</h2>
            </div>
            <div className="method-grid">
              <MethodCard
                num="01"
                title="Identify the root cause"
                points={[
                  "Insulin burden & glucose variability",
                  "ApoB-driven cardiovascular risk",
                  "Homocysteine & methylation stress",
                  "Sleep, HRV & recovery signals",
                  "Inflammation markers (hs-CRP, ALT, AST)",
                ]}
              />
              <MethodCard
                num="02"
                title="Build a plan"
                dark
                points={[
                  "Clear written priorities and next steps",
                  "CGM where clinically appropriate",
                  "Fortnightly coaching & accountability",
                  "GP review at programme midpoint",
                  "12-month forward plan at completion",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            8. HOW IT WORKS — clear pathway
        ══════════════════════════════════════════════════ */}
        <section id="process" className="sec bg-iv">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">How It Works</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">A clear pathway from first conversation to lasting change.</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 660 }}>
                Every patient starts with a conversation. From there, the pathway is structured, measurable, and GP-led at every stage.
              </p>
            </div>
            <div className="gproc">
              {[
                { n:"01", t:"Discovery Call", d:"A 30-minute GP-led consultation to understand your symptoms, history and goals. You leave with clarity and a written next-step recommendation — useful even if you do not progress immediately." },
                { n:"02", t:"Veridian Baseline", d:"A full diagnostic assessment. The biomarkers most likely to reveal insulin burden, ApoB-driven risk, and metabolic dysfunction — with clinical interpretation and a clear action plan." },
                { n:"03", t:"Personalised Plan", d:"A written, prioritised plan built around your data. CGM, nutrition, movement and behaviour protocols. Where clinically indicated, prescribing pathways including GLP-1 options are available." },
                { n:"04", t:"Structured Follow-Up", d:"Fortnightly coaching, GP-led clinical review at midpoint, and an end-of-programme review with a 12-month forward plan. Progress is measured, not assumed." },
              ].map(s => (
                <div key={s.n} style={{ padding:"26px 0", borderBottom:"1px solid rgba(0,0,0,.07)" }}>
                  <div style={{ fontSize:".62rem", fontWeight:700, letterSpacing:".28em", color:"var(--go)", marginBottom:10 }}>{s.n}</div>
                  <div style={{ width:1, height:26, background:"var(--go)", opacity:.4, marginBottom:12 }}/>
                  <h3 className="cg" style={{ fontSize:"1.55rem", fontWeight:500, color:"var(--fo)", marginBottom:7 }}>{s.t}</h3>
                  <p style={{ fontSize:".92rem", color:"var(--sl2)", lineHeight:1.9 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            9. SAMPLE SCORECARD — after How It Works
        ══════════════════════════════════════════════════ */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="sh text-center" style={{ marginBottom: 32 }}>
              <p className="lbl">Sample Output</p>
              <div className="rule rule-c"/>
              <h2 className="cg sh-title">Four domains, one clear picture.</h2>
              <p className="sh-body" style={{ fontSize: "1rem", maxWidth: 580 }}>
                Each domain is scored 1–10. Together they explain the outcomes you care about most.
              </p>
            </div>
            <div style={{ background: "var(--wh)", border: "1px solid rgba(0,0,0,.09)", padding: "clamp(28px,5vw,48px)", position: "relative", maxWidth: 600, margin: "0 auto" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 48, height: 3, background: "var(--go)" }}/>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 48, background: "var(--go)" }}/>
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
              <div style={{ marginTop: 22, padding: "14px 16px", background: "var(--iv)", borderLeft: "3px solid var(--fo)" }}>
                <p style={{ fontSize: ".8rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                  <strong style={{ color: "var(--fo)" }}>Illustrative example.</strong> Your real score is built from blood tests, CGM data, sleep metrics and clinical questionnaires.
                </p>
              </div>
              <div style={{ marginTop: 18, textAlign: "center" }}>
                <Link href="/metabolic-quiz" className="btn btn-fo">Check your metabolic age — Free →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            10. WHAT WE MEASURE
        ══════════════════════════════════════════════════ */}
        <section className="sec bg-iv">
          <div className="wrap">
            <div className="g2-wide" style={{ display:"grid", alignItems:"center" }}>
              <div>
                <p className="lbl">What We Measure</p>
                <div className="rule" style={{ marginBottom: 22 }}/>
                <h2 className="cg" style={{ fontSize:"clamp(1.9rem,3.8vw,2.7rem)", fontWeight:500, color:"var(--sl)", lineHeight:1.25, marginBottom: 16 }}>
                  The symptoms are obvious.<br/>
                  <em style={{ fontStyle:"italic", color:"var(--fo2)" }}>The drivers are often hidden.</em>
                </h2>
                <p style={{ fontSize:".95rem", color:"var(--sl2)", lineHeight:1.95, marginBottom:28 }}>
                  A routine check-up can miss the very markers most relevant to future decline. Veridian surfaces the missing links early.
                </p>
                <Link href="/assessments" className="btn btn-fo">See Our Assessments →</Link>
              </div>
              <div style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", overflow:"hidden" }}>
                <div style={{ background:"var(--fo)", padding:"14px 24px" }}>
                  <p className="lbl" style={{ color:"var(--go2)" }}>What We Measure — and Why</p>
                </div>
                {[
                  { o:"Insulin burden", d:"Fasting insulin · HbA1c · CGM patterns", m:"Explains weight gain, cravings, energy crashes and early insulin resistance" },
                  { o:"ApoB-driven vascular risk", d:"ApoB · full lipid panel", m:"Shows particle burden linked to long-term cardiovascular risk" },
                  { o:"Homocysteine load", d:"Homocysteine", m:"Flags methylation stress associated with vascular and neurological risk" },
                  { o:"Inflammation & liver stress", d:"hs-CRP · ALT · AST", m:"Reveals inflammatory load that routine screening may miss" },
                  { o:"Sleep & recovery", d:"HRV · sleep architecture · recovery signals", m:"Sleep quality directly affects glucose, appetite, and metabolic function" },
                ].map((r, i, a) => (
                  <div key={r.o} style={{ padding:"15px 24px", borderBottom:i < a.length-1 ? "1px solid rgba(0,0,0,.06)" : "none" }}>
                    <p style={{ fontSize:".92rem", fontWeight:600, color:"var(--sl)", marginBottom:2 }}>{r.o}</p>
                    <p style={{ fontSize:".77rem", color:"var(--fo2)", marginBottom:2 }}>{r.d}</p>
                    <p style={{ fontSize:".76rem", color:"var(--sl3)", lineHeight: 1.7 }}>{r.m}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            11. TESTIMONIALS
        ══════════════════════════════════════════════════ */}
        <section id="testimonials" className="sec bg-wh">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">Patient Experiences</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">What our patients say</h2>
            </div>
            <div style={{ marginBottom: 36 }}>
              {testimonials.map((t,i) => (
                <div key={i} style={{ display: i === tIdx ? "block" : "none" }}>
                  <div style={{ background:"var(--fo)", padding:"clamp(28px,5vw,48px)", position:"relative", overflow:"hidden" }}>
                    <div className="cg" style={{ position:"absolute", top:-20, left:28, fontSize:"10rem", lineHeight:1, color:"rgba(200,168,75,.07)", userSelect:"none" }}>"</div>
                    <Stars n={t.stars}/>
                    <p className="cg" style={{ fontSize:"clamp(1.1rem,2.8vw,1.6rem)", fontWeight:400, fontStyle:"italic", color:"var(--iv)", lineHeight:1.75, marginBottom:24, position:"relative" }}>"{t.text}"</p>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ width:42, height:42, background:"var(--go)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:"var(--fo)", fontWeight:600 }}>{t.name[0]}</div>
                      <div>
                        <p style={{ fontSize:".86rem", fontWeight:600, color:"var(--iv)", letterSpacing:".04em" }}>{t.name}, {t.age}</p>
                        <p style={{ fontSize:".74rem", color:"var(--go2)" }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", gap:9, justifyContent:"center", marginTop:14 }}>
                {testimonials.map((_,i) => (
                  <button key={i} onClick={() => setTIdx(i)} style={{ width:i===tIdx?24:7, height:7, background:i===tIdx?"var(--fo)":"var(--iv3)", border:"none", cursor:"pointer", transition:"all .3s" }}/>
                ))}
              </div>
            </div>
            <div className="g2">
              {testimonials.map((t,i) => (
                <div key={i} style={{ background:"var(--wh)", border:"1px solid rgba(0,0,0,.07)", padding:"clamp(20px,4vw,32px)", position:"relative" }}>
                  <div className="cg" style={{ position:"absolute", top:16, left:22, fontSize:"3.5rem", lineHeight:1, color:"var(--go)", opacity:.14 }}>"</div>
                  <Stars n={t.stars}/>
                  <p style={{ fontSize:".87rem", color:"var(--sl2)", lineHeight:1.9, marginBottom:16, paddingTop:4 }}>{t.text.length > 155 ? t.text.slice(0,155)+"…" : t.text}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:12, borderTop:"1px solid rgba(0,0,0,.06)", paddingTop:12 }}>
                    <div style={{ width:32, height:32, background:"var(--fo)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"'Cormorant Garamond',serif", fontSize:".88rem", color:"var(--go2)", fontWeight:500 }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize:".82rem", fontWeight:600, color:"var(--sl)" }}>{t.name}, {t.age}</p>
                      <p style={{ fontSize:".72rem", color:"var(--sl3)" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            12. FRAMEWORK — FOUR DOMAINS (one instance, at bottom)
        ══════════════════════════════════════════════════ */}
        <section id="domains" className="sec bg-iv">
          <div className="wrap">
            <div className="sh text-center">
              <p className="lbl">The Clinical Framework</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">Four domains, one clear picture.</h2>
              <p className="sh-body" style={{ fontSize: "1rem" }}>Each domain is scored 1–10. Together they explain the outcomes you care about most.</p>
            </div>
            <div className="g4">
              {domains.map(d => (
                <div key={d.title} className="card" style={{ display:"flex", flexDirection:"column" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                    <span className="lbl">{d.n}</span>
                    <span className={`spill ${bandClass[d.band as keyof typeof bandClass]}`}>{bandLabel[d.band as keyof typeof bandLabel]}</span>
                  </div>
                  <h3 className="cg" style={{ fontSize:"1.5rem", fontWeight:500, color:"var(--sl)", lineHeight:1.2, marginBottom:3 }}>{d.title}</h3>
                  <p style={{ fontSize:".78rem", letterSpacing:".06em", color:"var(--go)", marginBottom:10 }}>{d.sub}</p>
                  <p style={{ fontSize:".9rem", color:"var(--sl2)", lineHeight:1.9, marginBottom:14, flexGrow:1 }}>{d.desc}</p>
                  <div style={{ borderTop:"1px solid rgba(0,0,0,.06)", paddingTop:12, marginBottom:12 }}>
                    {d.metrics.map(m => (
                      <div key={m} style={{ display:"flex", alignItems:"center", gap:8, padding:"3px 0" }}>
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

        {/* ══════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════ */}
        <section id="faq" className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 740 }}>
            <div className="sh text-center">
              <p className="lbl">FAQs</p>
              <div className="rule rule-c"/>
              <h2 className="sh-title">Common questions</h2>
            </div>
            {faqs.map(item => <FaqItem key={item.q} item={item}/>)}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            NEWSLETTER
        ══════════════════════════════════════════════════ */}
        <section id="newsletter" className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div style={{ background: "linear-gradient(135deg, rgba(13,40,24,1) 0%, rgba(19,31,46,1) 100%)", padding: "clamp(28px,6vw,52px)", display: "grid", gap: 24, border: "1px solid rgba(0,0,0,.08)" }}>
              <div>
                <p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>Veridian Intelligence</p>
                <h2 className="cg" style={{ fontSize: "clamp(1.7rem,3.8vw,2.7rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.2, marginBottom: 10 }}>Longevity science, translated.</h2>
                <p style={{ fontSize: ".95rem", color: "rgba(246,241,232,.65)", lineHeight: 1.9, maxWidth: 580 }}>Weekly metabolic health insight and practical next steps from Veridian Clinic.</p>
              </div>
              <LeadCaptureForm source="homepage-newsletter" title="Join the newsletter" subtitle="Weekly metabolic health insight, longevity thinking, and practical next steps from Veridian Clinic." ctaLabel="Join the Newsletter →" buttonClassName="btn btn-go btn-full" compact />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════════════ */}
        <section className="sec bg-fo" style={{ textAlign:"center" }}>
          <div style={{ maxWidth:680, margin:"0 auto" }}>
            <div className="vline"/>
            <h2 className="cg" style={{ fontSize:"clamp(1.8rem,3.8vw,2.8rem)", fontWeight:500, color:"var(--iv)", lineHeight:1.25, marginBottom:14 }}>
              Long-term health needs clarity, structure, and follow-through.
            </h2>
            <p style={{ fontSize:".95rem", color:"rgba(246,241,232,.55)", lineHeight:1.95, marginBottom:28 }}>
              Get a clear picture of what is driving decline, and a plan built around your data.
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
              <Link href="/book?tier=discovery" className="btn btn-go">Book Discovery Call →</Link>
              <Link href="/metabolic-quiz" className="btn btn-ol-lt">Take the Metabolic Quiz</Link>
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
