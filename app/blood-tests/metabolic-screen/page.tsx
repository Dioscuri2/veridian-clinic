import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Fatigue & Energy Blood Test UK Metabolic Screen | Veridian Clinic" },
  description:
    "A private fatigue and energy blood test in the UK that tests thyroid function, fasting insulin, iron, B12, cortisol, and testosterone simultaneously. The Energy Screen (£195) identifies the metabolic causes of unexplained fatigue that standard GP panels routinely miss.",
  alternates: {
    canonical: "https://veridianclinic.com/blood-tests/metabolic-screen",
  },
  openGraph: {
    title: "Fatigue & Energy Blood Test UK Metabolic Screen | Veridian Clinic",
    description:
      "Private fatigue blood test UK. Tests thyroid, insulin resistance, iron, B12, cortisol, and testosterone in one panel with a GP interpretation that explains what is actually causing your fatigue.",
    url: "https://veridianclinic.com/blood-tests/metabolic-screen",
    type: "article",
  },
  keywords: [
    "fatigue blood test UK",
    "energy blood test UK private",
    "thyroid and insulin resistance test UK",
    "unexplained fatigue blood test UK",
    "why am I tired blood test UK",
    "metabolic screen UK",
    "private fatigue panel UK",
    "thyroid blood test UK private",
    "low energy blood test UK",
    "B12 fatigue test UK",
    "testosterone fatigue test UK",
    "iron deficiency blood test UK private",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;
const callout = { padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Fatigue & Energy Blood Test UK Metabolic Screen",
  description:
    "A private fatigue blood test that tests thyroid function, fasting insulin, iron, B12, cortisol, and testosterone in one panel with GP interpretation that identifies the metabolic causes of unexplained fatigue that standard NHS panels routinely miss.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: {
    "@type": "Organization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
    logo: { "@type": "ImageObject", url: "https://veridianclinic.com/og-image.jpg" },
  },
  datePublished: "2026-05-11",
  dateModified: "2026-05-11",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://veridianclinic.com/blood-tests/metabolic-screen" },
  image: "https://veridianclinic.com/og-image.jpg",
};

export default function MetabolicScreenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClinicalArticleLayout
        eyebrow="Private Blood Tests UK"
        title="Fatigue blood test UK finding the metabolic cause of unexplained tiredness that standard panels miss"
        intro="Unexplained fatigue is one of the most common presenting complaints in general practice and one of the most inadequately investigated. A standard NHS blood test typically checks full blood count, thyroid (TSH only), ferritin or iron studies, and sometimes B12 and folate. This misses fasting insulin, free thyroid hormones, testosterone, cortisol pattern, and ApoB the markers most likely to explain persistent low energy in working-age adults who otherwise appear healthy."
        ctas={[
          { href: "/book?tier=metabolic-screen", label: "Book Energy Screen £195 →" },
          { href: "/metabolic-quiz", label: "Check Your Metabolic Age Free →", variant: "secondary" },
        ]}
      >
        <p style={paragraph}>
          If you have been told your blood tests are &apos;normal&apos; but you still feel persistently tired, your results may genuinely be normal or those results may be normal by population-level reference ranges while your individual physiology is operating significantly below its optimal level. The difference matters clinically, and it is why a targeted metabolic fatigue screen covers different ground to a standard GP panel.
        </p>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>Clinical bottom line:</strong> the six most common reversible biochemical causes of unexplained fatigue in working-age UK adults are thyroid dysfunction (including subclinical), insulin resistance, iron/ferritin depletion, B12 or folate deficiency, testosterone decline, and disrupted cortisol output. A standard NHS panel rarely checks all six simultaneously and never includes fasting insulin.
          </p>
        </div>

        <h2 className="cg" style={sectionHeading}>Six causes of fatigue that standard panels miss</h2>

        <p style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--sl)", marginBottom: 4 }}>1. Subclinical thyroid dysfunction</p>
        <p style={paragraph}>
          A standard NHS thyroid test measures TSH only. TSH (thyroid stimulating hormone) is produced by the pituitary and reflects what the brain thinks the thyroid is doing not necessarily what the thyroid is actually delivering in terms of active hormone. Measuring free T3 and free T4 alongside TSH gives a far more complete picture of thyroid output and peripheral conversion. Patients with TSH at the upper end of the normal range, low-normal free T3, or poor T4-to-T3 conversion can experience significant fatigue, weight resistance, brain fog, and cold intolerance while being told their &apos;thyroid is fine&apos; on the basis of TSH alone.
        </p>

        <p style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--sl)", marginBottom: 4 }}>2. Fasting insulin and early insulin resistance</p>
        <p style={paragraph}>
          Insulin resistance is the metabolic condition most commonly missed by standard fatigue panels because fasting insulin is not a routine NHS test. When tissues become resistant to insulin&apos;s signal, glucose handling becomes less efficient, and the associated postprandial glucose variability drives the classic pattern of energy spikes and crashes often interpreted as simply &apos;being tired in the afternoon&apos; or needing caffeine to function. This pattern is measurable and reversible, but only if fasting insulin and HOMA-IR are actually tested.
        </p>

        <p style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--sl)", marginBottom: 4 }}>3. Iron and ferritin depletion</p>
        <p style={paragraph}>
          Iron deficiency anaemia will eventually show up on a full blood count as low haemoglobin. But depleted ferritin the body&apos;s iron storage protein causes significant fatigue, exercise intolerance, poor concentration, hair thinning, and restless legs well before anaemia develops. A ferritin below 30-40 ng/mL is associated with symptoms in a significant proportion of patients even when haemoglobin remains normal. Standard panels may check iron studies but will often not flag low-normal ferritin as clinically significant unless haemoglobin is already affected.
        </p>

        <p style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--sl)", marginBottom: 4 }}>4. B12 and folate</p>
        <p style={paragraph}>
          B12 deficiency causes fatigue, neurological symptoms (tingling, numbness, poor balance), and megaloblastic changes in red cell production. NHS B12 reference ranges vary significantly between laboratories, and there is strong clinical evidence that many symptomatic patients have serum B12 in the &apos;low normal&apos; range. Active B12 (holotranscobalamin) is a more sensitive marker of functional B12 availability but is not standard on most NHS panels. Folate deficiency has similar haematological and neurological consequences and is particularly relevant in individuals with high alcohol intake, poor diet, or certain medications.
        </p>

        <p style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--sl)", marginBottom: 4 }}>5. Testosterone decline</p>
        <p style={paragraph}>
          Low testosterone whether in men (below approximately 12 nmol/L total, or sub-optimal free testosterone) or women (where even small declines matter significantly for energy, mood, and libido) is among the most treatable and most frequently missed causes of persistent fatigue in working-age adults. NHS testosterone testing is generally reserved for formal hypogonadism investigation; SHBG (sex hormone binding globulin), which determines the biologically active free fraction, is often not tested alongside total testosterone, making results harder to interpret correctly.
        </p>

        <p style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--sl)", marginBottom: 4 }}>6. Disrupted cortisol pattern</p>
        <p style={paragraph}>
          Cortisol is the body&apos;s primary glucocorticoid stress hormone, and its diurnal rhythm high in the morning to drive alertness, declining through the day is closely linked to energy, mood, and cognitive function. Morning cortisol is easily measured via a blood test or saliva sample and gives a useful indicator of hypothalamic-pituitary-adrenal (HPA) axis output. Chronically elevated or suppressed morning cortisol is associated with fatigue, disrupted sleep architecture, immune dysregulation, and reduced stress resilience.
        </p>

        <h2 className="cg" style={sectionHeading}>Why a standard GP fatigue workup often misses the diagnosis</h2>
        <p style={paragraph}>
          A typical NHS fatigue workup will include FBC, ferritin or iron studies, thyroid (TSH), CRP or ESR, LFTs, renal function, glucose, and sometimes B12 and folate. This is a reasonable first screen for haematological causes, liver disease, renal impairment, and overt thyroid disease. It is not a metabolic fatigue screen.
        </p>
        <p style={paragraph}>
          The markers most likely to explain fatigue in metabolically healthy-appearing working-age adults fasting insulin, HOMA-IR, free T3, free T4, testosterone, SHBG, morning cortisol, and vitamin D are not standard components of a GP fatigue panel. The result is that a significant proportion of patients with genuinely reversible biochemical causes of fatigue are told their tests are normal, given lifestyle advice, and discharged without a diagnosis.
        </p>

        <h2 className="cg" style={sectionHeading}>Who should consider a private fatigue blood test in the UK?</h2>
        <ul className="chk">
          <li>Anyone experiencing persistent fatigue, low energy, or poor exercise recovery for more than six weeks without a clear cause.</li>
          <li>Anyone who has had a standard GP fatigue workup that returned &apos;normal&apos; results but still feels significantly below their baseline.</li>
          <li>Women over 35 experiencing unexplained fatigue, weight resistance, or mood changes thyroid and hormonal factors are often relevant in this group.</li>
          <li>Men over 40 with fatigue, reduced drive, and poor gym recovery testosterone decline and insulin resistance are the most common modifiable causes in this demographic.</li>
          <li>Anyone with PCOS or a history of hormonal imbalance insulin resistance and thyroid dysfunction are disproportionately common and frequently under-investigated.</li>
          <li>Anyone wanting to understand whether their fatigue has a metabolic basis before committing to a longer, more expensive investigation pathway.</li>
        </ul>

        <h2 className="cg" style={sectionHeading}>What the Energy Screen includes</h2>
        <p style={paragraph}>
          Veridian&apos;s Energy Screen (£195) is designed specifically for the metabolic causes of fatigue. It includes:
        </p>
        <ul className="chk">
          <li>Full thyroid function: TSH, free T4, and free T3 not just TSH in isolation.</li>
          <li>Fasting insulin and HOMA-IR calculation the insulin resistance markers no NHS fatigue panel includes.</li>
          <li>Full blood count with differential haemoglobin, MCV, MCH, and white cell differential.</li>
          <li>Ferritin and iron studies including storage iron to identify depletion before anaemia develops.</li>
          <li>Vitamin B12 and folate.</li>
          <li>Vitamin D (25-OH vitamin D) deficiency is extremely common in the UK and directly affects energy, mood, and immune function.</li>
          <li>Testosterone (total) and SHBG free testosterone calculated from these values.</li>
          <li>Morning cortisol.</li>
          <li>Liver function tests and renal function to exclude organ-driven fatigue.</li>
          <li>Fasting glucose and HbA1c alongside fasting insulin, this allows full insulin resistance assessment.</li>
          <li>Magnesium frequently depleted in stressed, high-output adults and directly linked to fatigue and sleep quality.</li>
        </ul>
        <p style={paragraph}>
          Every result is accompanied by a GP-written report that explains which markers are optimal, which are within normal ranges but at levels that may be contributing to symptoms, and which are clearly abnormal and require active intervention. The report includes a prioritised action plan specifying which interventions are most likely to improve energy based on your specific pattern of results.
        </p>

        <h2 className="cg" style={sectionHeading}>What happens after the Energy Screen?</h2>
        <p style={paragraph}>
          Most patients find that the Energy Screen either identifies a specific modifiable cause for their fatigue elevated fasting insulin and low ferritin being the most common combination or provides reassurance that the primary drivers are not biochemical, which itself redirects the clinical focus usefully toward sleep, stress, or training load.
        </p>
        <p style={paragraph}>
          Where the Energy Screen identifies significant insulin resistance, hormonal dysfunction, or thyroid abnormality, Veridian&apos;s Metabolic Baseline (£595) provides the next level of investigation a broader panel that adds ApoB, cardiovascular risk markers, and inflammatory profile. For patients who want the most comprehensive picture, the Longevity Panel (£795) includes 150+ markers with a biological age estimate and all Energy Screen components included.
        </p>

        <ul className="chk">
          <li>Energy Screen: £195 targeted fatigue investigation covering all six major metabolic causes.</li>
          <li>Nationally accredited UK laboratory processing.</li>
          <li>Three sample collection options: home kit, walk-in draw, nurse home visit.</li>
          <li>GP-written results report with personalised action plan.</li>
        </ul>

        <p style={{ fontSize: ".9rem", color: "var(--sl3)", lineHeight: 1.8, borderTop: "1px solid rgba(0,0,0,.08)", paddingTop: 16 }}>
          Related reading:{" "}
          <Link href="/blog/fast-insulin" style={{ color: "var(--go)", textDecoration: "underline" }}>
            Fasting insulin the missing early signal in metabolic disease
          </Link>
          {" · "}
          <Link href="/blog/reversing-metabolic-syndrome" style={{ color: "var(--go)", textDecoration: "underline" }}>
            Reversing metabolic syndrome what the evidence supports
          </Link>
          {" · "}
          <Link href="/blog/apob-vs-ldl" style={{ color: "var(--go)", textDecoration: "underline" }}>
            ApoB vs LDL cardiovascular particle count explained
          </Link>
        </p>

        {/* Related tests */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,.08)", paddingTop: 24, marginTop: 8 }}>
          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>Related Tests</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { href: "/blood-tests/fasting-insulin", label: "Fasting Insulin Test", note: "From £195 Energy Screen" },
              { href: "/blood-tests/apob", label: "ApoB Blood Test", note: "From £595 Metabolic Baseline" },
              { href: "/blood-tests/lipoprotein-a", label: "Lipoprotein(a) Test", note: "From £795 Longevity Panel" },
              { href: "/blood-tests/biological-age", label: "Biological Age Test", note: "£795 Longevity Panel" },
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
