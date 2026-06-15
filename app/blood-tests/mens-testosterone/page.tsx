import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Testosterone Blood Test UK Private Men's Hormone Panel | Veridian Clinic" },
  description:
    "A private testosterone and men's hormone blood test in the UK. Total and free testosterone, SHBG, LH, FSH, DHEA-S, cortisol and Lp(a) GP-reviewed written interpretation. Running on Empty Panel £325.",
  alternates: {
    canonical: "https://veridianclinic.com/blood-tests/mens-testosterone",
  },
  openGraph: {
    title: "Testosterone Blood Test UK Private Men's Hormone Panel | Veridian Clinic",
    description:
      "Private testosterone and male hormone testing in the UK. Free testosterone, SHBG, LH, FSH, cortisol, Lp(a) and fasting insulin GP-reviewed written report. £325.",
    url: "https://veridianclinic.com/blood-tests/mens-testosterone",
    type: "article",
  },
  keywords: [
    "testosterone blood test UK",
    "private testosterone test UK",
    "low testosterone blood test UK",
    "free testosterone test UK",
    "male hormone blood test UK",
    "SHBG testosterone UK",
    "testosterone deficiency test UK",
    "men's hormone panel UK",
    "low testosterone symptoms test",
    "private men's health blood test UK",
    "DHEA-S blood test UK",
    "cortisol test men UK",
    "running on empty low testosterone",
    "testosterone GP test UK",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;
const callout = { padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Testosterone Blood Test UK Private Men's Hormone Panel",
  description:
    "A private men's hormone blood test covering total and free testosterone, SHBG, LH, FSH, DHEA-S, cortisol and Lp(a) GP-reviewed written interpretation with personalised clinical recommendations.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: {
    "@type": "Organization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
    logo: { "@type": "ImageObject", url: "https://veridianclinic.com/og-image.jpg" },
  },
  datePublished: "2026-05-31",
  dateModified: "2026-05-31",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://veridianclinic.com/blood-tests/mens-testosterone" },
  image: "https://veridianclinic.com/og-image.jpg",
};

export default function MensTestosteronePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClinicalArticleLayout
        eyebrow="Private Blood Tests UK · Men's Health"
        title="Running on empty Private testosterone &amp; men&apos;s hormone blood test UK"
        intro="Persistent fatigue, poor recovery, low drive, difficulty maintaining muscle, brain fog that won't clear these are the symptoms men are most likely to dismiss as normal ageing, and most likely to have dismissed by a GP as well. In most cases, an NHS testosterone test if ordered at all measures total testosterone only. That misses the picture in the majority of men where the real problem lies."
        ctas={[
          { href: "/book?tier=mens-testosterone", label: "Book Running on Empty Panel £325 →" },
          { href: "/book?tier=discovery", label: "Speak to a GP First £195", variant: "secondary" },
        ]}
      >
        <p style={paragraph}>
          Testosterone is the hormone most associated with men&apos;s energy, drive, recovery and body composition and the one most incompletely tested in primary care. An NHS GP who does request a testosterone test will typically measure total testosterone, which includes both the testosterone bound to carrier proteins (primarily SHBG and albumin) and the small free fraction that is biologically active. The problem is that total testosterone can sit comfortably within the reference range while free testosterone the fraction the body actually uses is significantly below optimal. A man with a total testosterone of 14 nmol/L and an SHBG of 60 nmol/L has a free testosterone that is functionally low, but his standard test will return as normal.
        </p>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>Clinical bottom line:</strong> in the UK, the NHS reference range for total testosterone is typically 8.7-29 nmol/L. A result of 10 nmol/L will be reported as normal. But clinical experience consistently shows that many men do not feel well below 15-17 nmol/L and that free testosterone, not total, is the more accurate reflection of functional hormonal status.
          </p>
        </div>

        <h2 className="cg" style={sectionHeading}>The SHBG problem why total testosterone misleads</h2>
        <p style={paragraph}>
          SHBG Sex Hormone Binding Globulin is a protein produced by the liver that binds tightly to testosterone, rendering it biologically inactive. SHBG rises with age, with elevated thyroid hormone, with liver disease, with high oestrogen, and with caloric restriction. The consequence is that two men with identical total testosterone levels can have dramatically different free testosterone concentrations depending on their SHBG.
        </p>
        <p style={paragraph}>
          This is not an edge case. It is the mechanism by which many men in their late 30s and beyond develop symptomatic testosterone deficiency often diagnosed as depression, burnout or simply &apos;stress&apos; while their total testosterone blood test returns as entirely normal. Measuring SHBG alongside total testosterone allows free testosterone to be calculated directly. Without SHBG, the total testosterone figure is clinically incomplete.
        </p>

        <h2 className="cg" style={sectionHeading}>What the Running on Empty panel measures</h2>
        <ul className="chk">
          <li><strong>Total testosterone:</strong> the aggregate measure necessary context but insufficient alone.</li>
          <li><strong>Free testosterone (calculated):</strong> the biologically active fraction. Calculated from total testosterone and SHBG using the Vermeulen formula the standard clinical method in UK endocrinology. A value below 0.2 nmol/L is typically considered deficient; below 0.3 nmol/L warrants clinical review in a symptomatic man.</li>
          <li><strong>SHBG:</strong> the binding protein that determines free testosterone availability. Elevated SHBG in the context of low-normal total testosterone is one of the most common and most missed causes of symptomatic androgen deficiency.</li>
          <li><strong>LH (Luteinising Hormone):</strong> the pituitary signal that drives testosterone production. Low LH alongside low testosterone indicates a hypothalamic or pituitary cause (secondary hypogonadism). Normal or elevated LH with low testosterone indicates primary testicular failure. This distinction changes the clinical approach entirely.</li>
          <li><strong>FSH (Follicle Stimulating Hormone):</strong> elevations suggest primary gonadal dysfunction; suppression is consistent with exogenous testosterone or anabolic steroid use.</li>
          <li><strong>Prolactin:</strong> hyperprolactinaemia suppresses the hypothalamic-pituitary axis, reducing LH and FSH, and consequently testosterone. It is a reversible cause of low testosterone that is missed whenever prolactin is not tested which is almost always in standard primary care.</li>
          <li><strong>DHEA-S:</strong> the adrenal androgen precursor that contributes to energy, mood and libido. DHEA-S declines with age and with chronic physiological stress, and low levels are associated with fatigue and poor recovery independent of testosterone status.</li>
          <li><strong>Cortisol (AM):</strong> chronically elevated cortisol from psychological stress, poor sleep, or HPA axis dysregulation directly suppresses testosterone production and amplifies the hormonal deficit. It also worsens insulin sensitivity and drives abdominal adiposity, which in turn promotes aromatisation of testosterone to oestradiol, further lowering free testosterone.</li>
          <li><strong>Lipoprotein (a):</strong> cardiovascular risk in men is frequently underestimated, and Lp(a) is the most commonly missed risk marker in standard cholesterol panels. It is genetically determined and does not respond to statins making early identification important for longer-term risk management.</li>
          <li><strong>Fasting insulin + HbA1c:</strong> insulin resistance and testosterone deficiency form a bidirectional cycle. Low testosterone impairs insulin sensitivity; high insulin suppresses SHBG, which paradoxically can increase total testosterone while worsening free testosterone availability and metabolic health. Understanding both sides of this relationship is essential for meaningful clinical management.</li>
          <li><strong>Full Blood Count + hs-CRP:</strong> anaemia affects energy and recovery; systemic inflammation (elevated hs-CRP) suppresses gonadal function and amplifies the clinical picture.</li>
        </ul>

        <h2 className="cg" style={sectionHeading}>What optimal testosterone looks like vs laboratory normal</h2>
        <p style={paragraph}>
          UK laboratory reference ranges for total testosterone (typically 8.7-29 nmol/L) encompass a very wide population including men in their 80s, men with obesity-related hypogonadism, and men who are functionally low but not below the diagnostic cut-off. In preventive and longevity medicine, the clinically meaningful thresholds are different:
        </p>
        <ul className="chk">
          <li><strong>Total testosterone above 18-20 nmol/L + free testosterone above 0.4 nmol/L:</strong> associated with maintained energy, muscle mass, libido and cognitive function in most men.</li>
          <li><strong>Total testosterone 12-17 nmol/L:</strong> a grey zone clinical significance depends on free testosterone, SHBG and symptom burden. Many symptomatic men in this range benefit from intervention.</li>
          <li><strong>Total testosterone below 12 nmol/L + symptoms:</strong> consistent with androgen deficiency warranting active management, regardless of whether it falls within the NHS &apos;normal&apos; range.</li>
        </ul>
        <p style={paragraph}>
          These are working thresholds, not diagnostic absolutes. A man with a total testosterone of 11 nmol/L who is asymptomatic, lean and maintaining muscle is a different clinical picture from a man with the same value who is exhausted, gaining visceral fat and struggling with recovery. The panel provides the data; the GP report provides the interpretation in context.
        </p>

        <h2 className="cg" style={sectionHeading}>Who should consider this panel?</h2>
        <ul className="chk">
          <li><strong>Men over 35</strong> experiencing persistent fatigue that is not explained by sleep quality or workload alone.</li>
          <li><strong>Men with low libido, difficulty maintaining erections, or reduced morning erections</strong> these are often the earliest androgen-sensitive symptoms.</li>
          <li><strong>Men finding it harder to build or maintain muscle despite consistent training</strong> testosterone is the primary anabolic driver of muscle protein synthesis.</li>
          <li><strong>Men with increased abdominal fat, particularly visceral</strong> adipose tissue converts testosterone to oestradiol via aromatase; this is self-reinforcing and hormonally measurable.</li>
          <li><strong>Men experiencing low mood, reduced motivation or cognitive changes</strong> testosterone has direct effects on dopamine signalling and mood regulation that are clinically distinct from depression.</li>
          <li><strong>Men who have been told their testosterone is &apos;normal&apos; but remain symptomatic</strong> free testosterone calculation from SHBG frequently reveals the picture a total-testosterone-only result obscures.</li>
          <li><strong>Men with a family history of early cardiovascular disease</strong> Lp(a) identification in this context carries preventive significance.</li>
        </ul>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>What you get back:</strong> a GP-reviewed written report covering every marker with a clinical interpretation of what the pattern means for your symptoms including free testosterone calculation, cortisol and adrenal context, and cardiovascular risk picture. Clear next-step recommendation included.
          </p>
        </div>

        <ul className="chk">
          <li>Total + free testosterone (calculated), SHBG, LH, FSH, prolactin, DHEA-S, cortisol.</li>
          <li>Lp(a), fasting insulin, HbA1c metabolic and cardiovascular crossover.</li>
          <li>Full Blood Count + hs-CRP.</li>
          <li>GP-reviewed written report with personalised clinical interpretation and next-step plan.</li>
          <li>Nationally accredited UK laboratory. Results typically within 48-72 hours.</li>
        </ul>

        {/* Related tests */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,.08)", paddingTop: 24, marginTop: 8 }}>
          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>Related Tests</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { href: "/blood-tests/womens-hormones", label: "Women's Hormone & Perimenopause Panel", note: "£375" },
              { href: "/blood-tests/fatigue-energy", label: "Fatigue & Energy Deep Screen", note: "£249" },
              { href: "/blood-tests/lipoprotein-a", label: "Lipoprotein(a) Blood Test", note: "From £795" },
              { href: "/blood-tests/fasting-insulin", label: "Fasting Insulin Test", note: "From £195" },
              { href: "/assessments", label: "View All Panels & Pricing", note: "Assessments →" },
            ].map((t) => (
              <Link key={t.href} href={t.href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--iv)", border: "1px solid rgba(0,0,0,.07)", textDecoration: "none" }}>
                <span style={{ fontSize: ".88rem", color: "var(--sl)", fontWeight: 500 }}>{t.label}</span>
                <span style={{ fontSize: ".78rem", color: "var(--sl3)" }}>{t.note} →</span>
              </Link>
            ))}
          </div>
        </div>
      </ClinicalArticleLayout>
    </>
  );
}
