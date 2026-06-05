import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Cardiovascular Risk Blood Test UK Beyond Cholesterol | Veridian Clinic",
  description:
    "Your cholesterol result misses the most important cardiovascular risk markers. ApoB, Lp(a), homocysteine, small dense LDL, fasting insulin — private GP-interpreted cardiovascular panel. £349.",
  alternates: { canonical: "https://veridianclinic.com/blood-tests/cardiovascular-risk" },
  openGraph: {
    title: "Private Cardiovascular Risk Blood Test UK Beyond Cholesterol | Veridian Clinic",
    description: "ApoB, Lp(a), homocysteine, small dense LDL — the cardiovascular markers your NHS test didn't include. GP-reviewed written report. £349.",
    url: "https://veridianclinic.com/blood-tests/cardiovascular-risk",
    type: "article",
  },
  keywords: [
    "cardiovascular risk blood test UK private",
    "ApoB blood test UK",
    "Lp(a) test private UK",
    "beyond cholesterol blood test UK",
    "homocysteine blood test UK",
    "small dense LDL test UK",
    "private heart risk test UK",
    "fasting insulin cardiovascular risk",
    "advanced lipid panel UK",
    "ApoB vs LDL test UK",
    "lipoprotein a test UK private",
    "what your cholesterol test missed UK",
    "cardiovascular risk markers private",
    "hsCRP inflammation test UK",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;
const callout = { padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Private Cardiovascular Risk Blood Test UK: Beyond Cholesterol",
  description: "A private cardiovascular risk panel including ApoB, Lp(a), homocysteine, small dense LDL, hsCRP and fasting insulin — the markers your standard cholesterol test does not include.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: { "@type": "Organization", name: "Veridian Clinic", url: "https://veridianclinic.com" },
  url: "https://veridianclinic.com/blood-tests/cardiovascular-risk",
};

export default function CardiovascularRiskPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClinicalArticleLayout
      eyebrow="Cardiovascular risk panel · £349"
      title="Your cholesterol test didn't tell you the whole story."
      intro="Total cholesterol is one number. Cardiovascular risk is built from twelve. The markers that actually predict a heart attack — ApoB, Lp(a), homocysteine, small dense LDL, fasting insulin — are almost never included in a standard NHS or GP cholesterol test."
      ctas={[
        { label: "Book What Your Cholesterol Test Missed — £349", href: "/book?tier=cardiovascular-risk", variant: "primary" },
        { label: "Book a GP Discovery Call first", href: "/book?tier=discovery" },
      ]}
    >
      <h2 className="cg" style={sectionHeading}>Why cholesterol alone is not enough</h2>
      <p style={paragraph}>
        For decades, total cholesterol — and later LDL cholesterol — was treated as the primary cardiovascular risk marker. The problem is that roughly half of all people who have a heart attack have a normal cholesterol level at the time. Cholesterol is carried in particles of varying size and density. It is the number and type of those particles, not the total amount of cholesterol, that determines whether they penetrate artery walls and trigger inflammation.
      </p>
      <p style={paragraph}>
        A standard cholesterol test measures how much cholesterol is circulating. It tells you almost nothing about the particles carrying it, the inflammation driving plaque formation, or the metabolic dysfunction that accelerates arterial damage over time.
      </p>

      <h2 className="cg" style={sectionHeading}>The markers your test almost certainly missed</h2>
      <p style={paragraph}>
        The What Your Cholesterol Test Missed panel checks twelve markers across cardiovascular risk, metabolic function, and inflammation:
      </p>
      <div style={{ display: "grid", gap: 12, margin: "20px 0" }}>
        {[
          { marker: "ApoB", why: "The single best predictor of cardiovascular risk. Counts every atherogenic particle — not just LDL. A normal LDL with high ApoB is a significant risk signal that standard tests miss entirely." },
          { marker: "Lp(a)", why: "Inherited and unaffected by diet or statins, Lp(a) is an independent risk factor for heart attack and stroke. One in five people carry elevated levels without knowing it." },
          { marker: "Homocysteine", why: "An amino acid that damages artery walls at elevated levels. Strongly associated with cardiovascular disease, stroke, and cognitive decline. Correctable with B vitamins — but only if measured." },
          { marker: "Small dense LDL", why: "Standard cholesterol tests measure LDL quantity, not particle size. Small dense LDL particles are far more atherogenic than large LDL. High small dense LDL with normal total LDL is a common hidden risk pattern." },
          { marker: "hs-CRP", why: "High-sensitivity C-reactive protein measures systemic inflammation — the process that drives plaque rupture. Independently predictive of cardiovascular events even with normal cholesterol." },
          { marker: "Fasting insulin and HbA1c", why: "Insulin resistance accelerates atherosclerosis years before glucose rises. The link between metabolic dysfunction and cardiovascular risk is causal, not just correlational." },
          { marker: "Full lipid profile", why: "Total cholesterol, LDL, HDL, triglycerides, and TC:HDL ratio — the context for interpreting ApoB and particle data." },
        ].map(item => (
          <div key={item.marker} style={callout}>
            <p style={{ fontWeight: 700, color: "var(--fo)", marginBottom: 6 }}>{item.marker}</p>
            <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.75 }}>{item.why}</p>
          </div>
        ))}
      </div>

      <h2 className="cg" style={sectionHeading}>Who should consider this panel</h2>
      <p style={paragraph}>
        This panel is most useful if any of the following apply:
      </p>
      <ul style={{ paddingLeft: 20, color: "var(--sl2)", lineHeight: 2.1, fontSize: ".95rem" }}>
        <li>You have been told your cholesterol is normal but you have a family history of early heart disease or stroke</li>
        <li>You have been prescribed a statin but want to understand your full risk picture</li>
        <li>You have risk factors — overweight, high blood pressure, type 2 diabetes, or heavy smoking history — that were not fully reflected in your last test</li>
        <li>You are a man over 40 or post-menopausal woman, where cardiovascular risk rises independently of cholesterol level</li>
        <li>You have previously had a cardiac event and want to understand your residual risk</li>
        <li>You simply want to know what your risk actually is, not just whether a single number is in range</li>
      </ul>

      <h2 className="cg" style={sectionHeading}>Optimal ranges vs lab normals</h2>
      <p style={paragraph}>
        Standard labs flag results as abnormal only when they are statistically unusual — not when they indicate elevated risk. Veridian uses cardiovascular optimal thresholds:
      </p>
      <div style={{ overflowX: "auto", margin: "16px 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".88rem" }}>
          <thead>
            <tr style={{ background: "var(--fo)", color: "var(--iv)" }}>
              <th style={{ padding: "10px 14px", textAlign: "left" }}>Marker</th>
              <th style={{ padding: "10px 14px", textAlign: "left" }}>Lab normal</th>
              <th style={{ padding: "10px 14px", textAlign: "left" }}>Veridian optimal target</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["ApoB", "Under 1.4 g/L", "Under 0.9 g/L (primary prevention)"],
              ["Lp(a)", "Under 75 nmol/L", "Under 50 nmol/L preferred"],
              ["Homocysteine", "Under 15 µmol/L", "Under 10 µmol/L"],
              ["hs-CRP", "Under 3 mg/L", "Under 1 mg/L"],
              ["Fasting insulin", "Under 25 mU/L", "Under 8 mU/L"],
              ["Triglycerides", "Under 1.7 mmol/L", "Under 1.1 mmol/L"],
            ].map(([m, lab, opt], i) => (
              <tr key={m} style={{ background: i % 2 === 0 ? "var(--iv)" : "var(--iv2)" }}>
                <td style={{ padding: "9px 14px", fontWeight: 600, color: "var(--fo)" }}>{m}</td>
                <td style={{ padding: "9px 14px", color: "var(--sl2)" }}>{lab}</td>
                <td style={{ padding: "9px 14px", color: "var(--sl2)" }}>{opt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="cg" style={sectionHeading}>What you get back</h2>
      <p style={paragraph}>
        Dr Tosin reviews every result personally and produces a written clinical report covering: your individual risk score across all twelve markers, the interaction between your metabolic and cardiovascular findings, a prioritised list of what to act on first, and specific next steps including whether statin or non-statin treatment, dietary change, or specialist referral is warranted.
      </p>
      <div style={callout}>
        <p style={{ fontWeight: 700, color: "var(--fo)", marginBottom: 6 }}>What Your Cholesterol Test Missed — £349</p>
        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.75 }}>
          ApoB · Lp(a) · Homocysteine · Small dense LDL · hs-CRP · Fasting insulin · HbA1c · Full lipid profile · ApoA-I<br />
          GP-reviewed written cardiovascular risk interpretation · No GP referral needed · Results in 5 working days
        </p>
      </div>
    </ClinicalArticleLayout>
    </>
  );
}
