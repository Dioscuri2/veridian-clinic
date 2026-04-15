"use client";

import Link from "next/link";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Fasting Insulin: The Missing Link in Early Metabolic Disease",
      description:
        "A clinical explainer on fasting insulin, hyperinsulinemia, Kraft patterns, and proactive metabolic medicine.",
      author: {
        "@type": "Person",
        name: "Dr Oluwatosin Taiwo",
      },
      publisher: {
        "@type": "Organization",
        name: "Veridian Clinic",
        url: "https://veridian-clinic.vercel.app",
      },
      mainEntityOfPage: "https://veridian.clinic/blog/fast-insulin",
      articleSection: "Metabolic Health",
      keywords: [
        "fasting insulin",
        "hyperinsulinemia",
        "metabolic dysfunction",
        "ApoB",
        "insulin resistance",
        "Kraft curve",
      ],
    },
    {
      "@type": "MedicalWebPage",
      name: "Fasting Insulin Clinical Guide",
      url: "https://veridian.clinic/blog/fast-insulin",
      about: [
        { "@type": "MedicalCondition", name: "Insulin Resistance" },
        { "@type": "MedicalCondition", name: "Hyperinsulinemia" },
      ],
      audience: {
        "@type": "MedicalAudience",
        audienceType: "Patient",
      },
      publisher: {
        "@type": "MedicalBusiness",
        name: "Veridian Clinic",
      },
    },
  ],
};

const whyItMatters = [
  "Often abnormal years before glucose markers.",
  "Tracks early insulin resistance and compensatory hyperinsulinemia.",
  "Helps explain visceral fat gain, post-meal crashes, and stubborn weight loss.",
  "Becomes more powerful when paired with ApoB, waist metrics, and body composition.",
];

const protocols = [
  {
    title: "Chronological nutrition",
    copy:
      "means reducing the constant insulin demand created by grazing, late eating, and disordered meal timing. Many patients benefit from clearly defined meal windows, higher-protein first meals, fewer refined carbohydrate exposures, and a longer overnight fast. The aim is not dietary ideology. The aim is giving insulin time to return to baseline.",
  },
  {
    title: "Strength training",
    copy:
      "is one of the most powerful tools in the system. Skeletal muscle is the primary glucose sink. Build more of it, use it regularly, and insulin sensitivity tends to improve. This is why a serious resistance programme often outperforms endless cardio when the goal is durable metabolic change.",
  },
  {
    title: "Clinical measurement",
    copy:
      "matters because guesswork is expensive. In practice we want fasting insulin interpreted alongside fasting glucose, HbA1c, triglycerides, HDL, liver markers, waist metrics, blood pressure, body composition, and ideally ApoB. The value is in the pattern, not in one number alone.",
  },
];

const faqs = [
  {
    question: "What is a healthy fasting insulin level?",
    answer:
      "Context matters, but in preventive metabolic medicine we generally want fasting insulin comfortably low rather than merely 'within range'. Many high-functioning adults with levels above 5 to 7 mIU/L are already compensating for declining insulin sensitivity, even if fasting glucose still looks normal.",
  },
  {
    question: "Can I have normal HbA1c and still be metabolically unwell?",
    answer:
      "Yes. HbA1c and fasting glucose are late markers. The pancreas can keep glucose artificially normal for years by secreting more insulin. That compensation delays diagnosis and is exactly why fasting insulin can be so clinically useful earlier in the timeline.",
  },
  {
    question: "Does high fasting insulin mean I have diabetes?",
    answer:
      "Not necessarily. It often signals pre-pre-diabetic physiology, meaning the body is under metabolic strain before diabetes thresholds are crossed. That is precisely the stage where intervention is most valuable, because the system is still highly reversible.",
  },
  {
    question: "Why is ApoB relevant if we are talking about insulin?",
    answer:
      "Because hyperinsulinemia and insulin resistance often travel with a more atherogenic lipid pattern. ApoB reflects the number of circulating atherogenic particles. If insulin is elevated and ApoB is also high, the concern is no longer just weight or energy, but long-term vascular risk.",
  },
  {
    question: "What actually lowers fasting insulin?",
    answer:
      "Usually not a single hack. The strongest levers are improved body composition, resistance training, better sleep, reduced grazing, strategic meal timing, adequate protein, and overall energy balance. In clinic, the goal is to combine those levers in a way a patient can sustain.",
  },
];

function LuxeSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="fi-section fi-shell">
      <div className="fi-section-head">
        <p className="fi-eyebrow">{eyebrow}</p>
        <h2 className="fi-h2">{title}</h2>
      </div>
      <div className="fi-copy">{children}</div>
    </section>
  );
}

function InsightRow({ text }: { text: string }) {
  return (
    <div className="fi-insight-row">
      <span className="fi-insight-icon" aria-hidden="true">
        ✦
      </span>
      <p>{text}</p>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`fi-faq ${open ? "is-open" : ""}`}>
      <button className="fi-faq-trigger" onClick={() => setOpen((v) => !v)}>
        <span>{question}</span>
        <span className="fi-faq-plus" aria-hidden="true">
          +
        </span>
      </button>
      {open && <p className="fi-faq-answer">{answer}</p>}
    </div>
  );
}

function KraftCurve() {
  const W = 620;
  const H = 320;
  const PAD = { top: 30, right: 30, bottom: 54, left: 58 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;

  const times = [0, 0.5, 1, 2, 3];
  const maxT = 3;
  const maxY = 200;

  const tx = (t: number) => PAD.left + (t / maxT) * cW;
  const ty = (v: number) => PAD.top + cH - (v / maxY) * cH;

  const patterns = [
    { id: "I", label: "Pattern I — Normal", color: "#4CAF7C", values: [8, 72, 55, 18, 8], dash: "" },
    { id: "II", label: "Pattern II — Delayed Peak (early IR)", color: "#C9A84C", values: [10, 45, 88, 60, 18], dash: "6,3" },
    { id: "III", label: "Pattern III — Late Peak (established IR)", color: "#E08A3C", values: [12, 30, 55, 110, 75], dash: "4,4" },
    { id: "IV", label: "Pattern IV — Overt IR (high fasting)", color: "#D94F4F", values: [55, 80, 130, 170, 145], dash: "8,3,2,3" },
    { id: "V", label: "Pattern V — Insulinopenic", color: "#7B9EB8", values: [6, 14, 18, 14, 8], dash: "3,3" },
  ];

  function smoothPath(pts: Array<[number, number]>) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpX = (prev[0] + curr[0]) / 2;
      d += ` C ${cpX},${prev[1]} ${cpX},${curr[1]} ${curr[0]},${curr[1]}`;
    }
    return d;
  }

  const xLabels = ["Fasting", "30 min", "1 hr", "2 hr", "3 hr"];
  const yTicks = [0, 50, 100, 150, 200];

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", maxWidth: W, display: "block", margin: "0 auto" }}
        aria-label="Kraft Insulin Response Curve Patterns I–V"
        role="img"
      >
        <style>{`
          .kraft-label { font-family: 'DM Sans', sans-serif; fill: #8BA898; }
          .kraft-axis { font-family: 'DM Sans', sans-serif; fill: #8BA898; font-size: 11px; }
          .kraft-title { font-family: 'Cormorant Garamond', serif; fill: #F5F0E8; }
        `}</style>
        <rect width={W} height={H} fill="#0A1915" rx="6" />
        {yTicks.map((v) => (
          <line key={v} x1={PAD.left} y1={ty(v)} x2={PAD.left + cW} y2={ty(v)} stroke="rgba(201,168,76,0.1)" strokeWidth="1" />
        ))}
        <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + cH + 6} stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
        <line x1={PAD.left - 6} y1={PAD.top + cH} x2={PAD.left + cW} y2={PAD.top + cH} stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
        {yTicks.map((v) => (
          <text key={v} x={PAD.left - 8} y={ty(v) + 4} textAnchor="end" className="kraft-axis">{v}</text>
        ))}
        {times.map((t, i) => (
          <text key={t} x={tx(t)} y={PAD.top + cH + 18} textAnchor="middle" className="kraft-axis">{xLabels[i]}</text>
        ))}
        <text x={PAD.left + cW / 2} y={H - 4} textAnchor="middle" className="kraft-axis" style={{ fontSize: 11, fill: "#8BA898" }}>
          Time after 100g glucose challenge
        </text>
        <text
          x={14}
          y={PAD.top + cH / 2}
          textAnchor="middle"
          className="kraft-axis"
          style={{ fontSize: 11, fill: "#8BA898" }}
          transform={`rotate(-90, 14, ${PAD.top + cH / 2})`}
        >
          Insulin (µU/mL)
        </text>
        {patterns.map((p) => {
          const pts = times.map((t, i) => [tx(t), ty(p.values[i])] as [number, number]);
          return (
            <path
              key={p.id}
              d={smoothPath(pts)}
              fill="none"
              stroke={p.color}
              strokeWidth={p.id === "I" ? 2.5 : 2}
              strokeDasharray={p.dash}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.9}
            />
          );
        })}
        {patterns.map((p) =>
          times.map((t, i) => (
            <circle key={`${p.id}-${i}`} cx={tx(t)} cy={ty(p.values[i])} r={p.id === "I" ? 3.5 : 2.8} fill={p.color} opacity={0.85} />
          ))
        )}
        {patterns.map((p, i) => (
          <g key={p.id} transform={`translate(${PAD.left + 10}, ${PAD.top + 8 + i * 20})`}>
            <line x1="0" y1="6" x2="18" y2="6" stroke={p.color} strokeWidth="2" strokeDasharray={p.dash} />
            <circle cx="9" cy="6" r="2.5" fill={p.color} />
            <text x="24" y="10" className="kraft-axis" style={{ fontSize: 10 }}>{p.label}</text>
          </g>
        ))}
        <text x={W / 2} y={PAD.top - 10} textAnchor="middle" className="kraft-title" style={{ fontSize: 13, letterSpacing: 1 }}>
          Kraft Insulin Response Patterns (OGTT)
        </text>
      </svg>
    </div>
  );
}

export default function FastInsulinClient() {
  return (
    <div className="fi-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navigation />

      <main className="fi-main">
        <section className="fi-hero fi-shell">
          <div className="fi-hero-grid">
            <div className="fi-hero-copy">
              <p className="fi-kicker">Clinical Metabolic Medicine</p>
              <h1 className="fi-h1">
                Fasting Insulin is often the earliest warning sign that metabolism is drifting off course.
              </h1>
              <p className="fi-subtitle">
                Long before HbA1c rises or fasting glucose breaches a lab threshold, insulin can be climbing in the background,
                silently buying "normality" at a physiological cost. If you care about performance, body composition, and long-term
                vascular health, this is one of the most informative markers to understand.
              </p>
              <div className="fi-hero-actions">
                <Link href="/book?tier=baseline" className="fi-btn fi-btn-primary">
                  Book Baseline Audit
                </Link>
                <Link href="/assessments" className="fi-btn fi-btn-secondary">
                  View Assessments
                </Link>
              </div>
            </div>

            <aside className="fi-hero-panel">
              <p className="fi-panel-label">Why it matters</p>
              <div className="fi-insight-list">
                {whyItMatters.map((item) => (
                  <InsightRow key={item} text={item} />
                ))}
              </div>
            </aside>
          </div>
        </section>

        <LuxeSection id="why-it-matters" eyebrow="Why It Matters" title="Why standard glucose tests can miss early metabolic dysfunction">
          <p>
            In conventional medicine, metabolic disease is often detected relatively late. A patient develops impaired fasting glucose,
            HbA1c drifts upward, and only then does the conversation become urgent. The problem is that glucose is usually the last
            thing to move. The body fights hard to keep blood sugar in a narrow range, and it does so by increasing insulin output.
          </p>
          <p>
            That means a person can appear "normal" on standard screening while already living in a state of escalating metabolic stress.
            The pancreas is working harder, skeletal muscle is becoming less responsive, visceral fat is accumulating, and energy regulation
            becomes less stable. On paper, nothing looks dramatic. Under the surface, compensation is underway.
          </p>
          <p>
            This is why fasting insulin matters. It gives you a glimpse of how much hormonal effort is required to maintain normal glucose.
            In practical terms, it can reveal early dysfunction while there is still a large window to reverse course.
          </p>
        </LuxeSection>

        <LuxeSection eyebrow="The Problem" title="Why standard glucose tests can miss early metabolic dysfunction">
          <p>
            In conventional medicine, metabolic disease is often detected relatively late. A patient develops impaired fasting glucose,
            HbA1c drifts upward, and only then does the conversation become urgent. The problem is that glucose is usually the last
            thing to move. The body fights hard to keep blood sugar in a narrow range, and it does so by increasing insulin output.
          </p>
          <p>
            That means a person can appear "normal" on standard screening while already living in a state of escalating metabolic stress.
            The pancreas is working harder, skeletal muscle is becoming less responsive, visceral fat is accumulating, and energy regulation
            becomes less stable. On paper, nothing looks dramatic. Under the surface, compensation is underway.
          </p>
          <p>
            This is why fasting insulin matters. It gives you a glimpse of how much hormonal effort is required to maintain normal glucose.
            In practical terms, it can reveal early dysfunction while there is still a large window to reverse course.
          </p>
        </LuxeSection>

        <LuxeSection eyebrow="The Science" title="Hyperinsulinemia, Kraft curves, and the biological age penalty">
          <p>
            Hyperinsulinemia simply means insulin levels are inappropriately high relative to the metabolic task at hand. It is often the
            earliest detectable stage of insulin resistance. Dr Joseph Kraft demonstrated decades ago that many people with normal glucose
            tolerance tests showed abnormal insulin response curves, patterns that revealed metabolic disease hiding in plain sight.
          </p>
          <div className="fi-figure-card">
            <div className="fi-figure-meta">Kraft Insulin Response Patterns</div>
            <div className="fi-figure-body fi-figure-body-graphic">
              <KraftCurve />
            </div>
          </div>
          <p>
            That insight still matters. Two people can share the same glucose reading, but one may require far more insulin to hold that line.
            Clinically, those are not equivalent states. Higher insulin exposure alters substrate partitioning, suppresses lipolysis, encourages
            fat storage, and reflects a system becoming less metabolically flexible.
          </p>
          <p>
            I think of this as a biological age penalty. You may be chronologically 38, 44, or 51, but if your insulin dynamics resemble someone
            much further along the cardiometabolic disease curve, your tissues are paying interest on that mismatch. The cost shows up as reduced
            resilience, poorer body composition, less stable energy, and greater downstream vascular risk.
          </p>
        </LuxeSection>

        <LuxeSection eyebrow="The Missing Link" title="Why elevated insulin can drive visceral fat, fatigue, and vascular risk">
          <p>
            Elevated insulin is not just a lab curiosity. It changes how the body behaves. High insulin makes it harder to access stored fat,
            which is one reason some people feel they are doing "everything right" yet cannot meaningfully change waist circumference. It also
            contributes to the feast-and-crash rhythm many high-performers describe, especially when meals are frequent, sleep is poor, or training
            is inconsistent.
          </p>
          <p>
            It also intersects with vascular biology. Insulin resistance commonly clusters with elevated triglycerides, lower HDL, rising blood
            pressure, inflammatory drift, and more atherogenic lipoprotein patterns. This is where ApoB becomes crucial. ApoB tells us how many
            atherogenic particles are circulating. If fasting insulin is high and ApoB is also elevated, the story is bigger than weight management.
            We are now looking at the mechanics of accelerated cardiovascular risk.
          </p>
          <div className="fi-figure-card fi-figure-wide">
            <div className="fi-figure-meta">Pathway Placeholder</div>
            <div className="fi-figure-body">[Insulin, Visceral Fat, and ApoB Risk Pathway]</div>
          </div>
          <p>
            For patients who want a Medicine 3.0 approach, this is the point. Do not wait for obvious disease. Identify the pattern early, quantify
            it properly, and intervene while physiology is still adaptable.
          </p>
        </LuxeSection>

        <LuxeSection eyebrow="Practical Protocols" title="What actually moves fasting insulin in the right direction">
          <p>The answer is rarely a supplement or a gimmick. It is usually a structured reduction in metabolic friction.</p>
          <div className="fi-protocol-stack">
            {protocols.map((protocol) => (
              <article key={protocol.title} className="fi-protocol-card">
                <h3>{protocol.title}</h3>
                <p>{protocol.copy}</p>
              </article>
            ))}
          </div>
        </LuxeSection>

        <section className="fi-section fi-shell">
          <div className="fi-cta-block">
            <div>
              <p className="fi-eyebrow">Clinical next step</p>
              <h2 className="fi-h2 fi-cta-title">Build a baseline before symptoms become disease.</h2>
              <p className="fi-cta-copy">
                If your energy, waistline, or recovery feel off despite "normal" labs, a metabolic baseline can show whether insulin is the hidden driver.
              </p>
            </div>
            <div className="fi-cta-actions">
              <Link href="/book?tier=baseline" className="fi-btn fi-btn-primary">
                Book Baseline Audit
              </Link>
              <Link href="/assessments" className="fi-btn fi-btn-secondary">
                View Assessments
              </Link>
            </div>
          </div>
        </section>

        <LuxeSection eyebrow="FAQ" title="Common patient questions about fasting insulin">
          <div className="fi-faq-list">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </LuxeSection>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');

        :global(html) {
          scroll-behavior: smooth;
        }

        :global(body) {
          margin: 0;
          background: #0d1f1a;
          color: #f5f0e8;
          font-family: 'DM Sans', sans-serif;
        }

        :global(.nav) {
          background: rgba(13, 31, 26, 0.88);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201, 168, 76, 0.14);
        }

        :global(.nav-scroll) {
          background: rgba(13, 31, 26, 0.94);
          box-shadow: none;
          border-bottom: 1px solid rgba(201, 168, 76, 0.18);
        }

        :global(.nav-link),
        :global(.footer-link),
        :global(.cg) {
          font-family: 'DM Sans', sans-serif;
        }

        :global(.nav-link) {
          color: #f5f0e8;
        }

        :global(.footer-link) {
          color: #8ba898;
        }

        :global(.btn) {
          border-radius: 0;
          box-shadow: none;
          font-family: 'DM Sans', sans-serif;
        }

        :global(.btn-fo) {
          background: #c9a84c;
          color: #0d1f1a;
        }

        :global(.btn-fo:hover),
        :global(.btn-go:hover),
        :global(.btn-ol:hover),
        :global(.btn-ol-lt:hover) {
          transform: none;
          box-shadow: none;
        }

        :global(footer) {
          background: #0b1714 !important;
          border-top: 1px solid rgba(201, 168, 76, 0.14);
        }

        .fi-page {
          background:
            radial-gradient(circle at top right, rgba(201, 168, 76, 0.12), transparent 22%),
            linear-gradient(180deg, #0d1f1a 0%, #102621 50%, #0b1714 100%);
          min-height: 100vh;
        }

        .fi-main {
          padding-top: 68px;
        }

        .fi-shell {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
        }

        .fi-hero,
        .fi-section {
          padding: 120px 0;
        }

        .fi-hero {
          border-bottom: 1px solid rgba(201, 168, 76, 0.12);
        }

        .fi-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.75fr);
          gap: 48px;
          align-items: start;
        }

        .fi-kicker,
        .fi-eyebrow,
        .fi-panel-label,
        .fi-figure-meta {
          margin: 0 0 18px;
          color: #8ba898;
          font-size: 0.82rem;
          line-height: 1.4;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .fi-h1,
        .fi-h2,
        .fi-protocol-card h3,
        .fi-cta-title,
        .fi-faq-trigger span:first-child {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .fi-h1 {
          margin: 0 0 28px;
          max-width: 11ch;
          color: #f5f0e8;
          font-size: clamp(3.5rem, 8vw, 6.8rem);
          line-height: 0.9;
        }

        .fi-subtitle,
        .fi-copy p,
        .fi-cta-copy,
        .fi-protocol-card p,
        .fi-faq-answer,
        .fi-insight-row p {
          margin: 0;
          color: rgba(245, 240, 232, 0.82);
          font-size: 1.1rem;
          line-height: 1.95;
        }

        .fi-subtitle {
          max-width: 760px;
        }

        .fi-hero-actions,
        .fi-cta-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 36px;
        }

        .fi-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 15px 24px;
          border: 1px solid transparent;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .fi-btn-primary {
          background: #c9a84c;
          color: #0d1f1a;
          border-color: #c9a84c;
        }

        .fi-btn-secondary {
          background: transparent;
          color: #f5f0e8;
          border-color: rgba(245, 240, 232, 0.24);
        }

        .fi-hero-panel,
        .fi-figure-card,
        .fi-protocol-card,
        .fi-cta-block,
        .fi-faq {
          background: rgba(11, 23, 20, 0.62);
          border: 1px solid rgba(201, 168, 76, 0.16);
        }

        .fi-hero-panel {
          padding: 32px 28px;
          position: sticky;
          top: 110px;
        }

        .fi-insight-list {
          display: grid;
          gap: 16px;
        }

        .fi-insight-row {
          display: grid;
          grid-template-columns: 16px 1fr;
          gap: 14px;
          padding: 0 0 0 18px;
          border-left: 2px solid #c9a84c;
        }

        .fi-insight-icon {
          color: #c9a84c;
          font-size: 0.9rem;
          line-height: 1.8;
        }

        .fi-section {
          display: grid;
          grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
          gap: 36px;
          border-bottom: 1px solid rgba(201, 168, 76, 0.08);
        }

        .fi-section-head {
          padding-top: 4px;
        }

        .fi-h2 {
          margin: 0;
          color: #f5f0e8;
          font-size: clamp(2.5rem, 5vw, 4.4rem);
          line-height: 0.96;
        }

        .fi-copy {
          display: grid;
          gap: 22px;
          max-width: 820px;
        }

        .fi-figure-card {
          padding: 34px 32px;
          margin: 12px 0;
        }

        .fi-figure-wide {
          min-height: 260px;
        }

        .fi-figure-body {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 180px;
          color: #c9a84c;
          border: 1px solid rgba(201, 168, 76, 0.22);
          font-size: 0.95rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .fi-figure-body-graphic {
          padding: 20px;
          min-height: 0;
          text-transform: none;
          letter-spacing: normal;
        }

        .fi-protocol-stack {
          display: grid;
          gap: 20px;
        }

        .fi-protocol-card {
          padding: 28px 28px 28px 34px;
          border-left: 3px solid #c9a84c;
        }

        .fi-protocol-card h3 {
          margin: 0 0 10px;
          color: #f5f0e8;
          font-size: 2rem;
          line-height: 1;
        }

        .fi-cta-block {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) auto;
          gap: 28px;
          align-items: end;
          padding: 40px;
          border-left: 3px solid #c9a84c;
        }

        .fi-cta-title {
          margin: 0 0 16px;
        }

        .fi-faq-list {
          display: grid;
          gap: 0;
        }

        .fi-faq {
          border-left: 3px solid transparent;
          padding: 0 26px;
        }

        .fi-faq + .fi-faq {
          margin-top: 14px;
        }

        .fi-faq.is-open {
          border-left-color: #c9a84c;
        }

        .fi-faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 24px 0;
          background: transparent;
          border: 0;
          color: #f5f0e8;
          text-align: left;
          cursor: pointer;
        }

        .fi-faq-trigger span:first-child {
          font-size: 1.9rem;
          line-height: 1.02;
        }

        .fi-faq-plus {
          color: #c9a84c;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .fi-faq-answer {
          padding: 0 0 24px;
          max-width: 760px;
        }

        @media (max-width: 960px) {
          .fi-shell {
            width: min(100%, calc(100% - 32px));
          }

          .fi-hero-grid,
          .fi-section,
          .fi-cta-block {
            grid-template-columns: 1fr;
          }

          .fi-hero-panel {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .fi-main {
            padding-top: 72px;
          }

          .fi-hero,
          .fi-section {
            padding: 120px 0;
          }

          .fi-h1 {
            max-width: none;
          }

          .fi-btn {
            width: 100%;
          }

          .fi-faq-trigger span:first-child {
            font-size: 1.5rem;
          }

          .fi-hero-panel,
          .fi-figure-card,
          .fi-protocol-card,
          .fi-cta-block,
          .fi-faq {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </div>
  );
}
