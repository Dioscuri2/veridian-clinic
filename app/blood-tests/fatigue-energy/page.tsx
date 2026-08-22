import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Private Fatigue Blood Test UK Thyroid, Insulin & Iron Panel | Veridian Clinic" },
  description:
    "A private fatigue blood test in the UK that goes beyond standard GP screening. Thyroid (including TPO antibodies), fasting insulin, ferritin with full iron studies, uric acid, B12, folate, vitamin D and CRP GP-reviewed written interpretation. £249.",
  alternates: {
    canonical: "https://veridianclinic.com/blood-tests/fatigue-energy",
  },
  openGraph: {
    title: "Private Fatigue Blood Test UK Thyroid, Insulin & Iron Panel | Veridian Clinic",
    description:
      "Private fatigue and energy blood testing in the UK. Thyroid including TPO antibodies, fasting insulin, ferritin, uric acid, B12 and vitamin D interpreted by a GP. £249.",
    url: "https://veridianclinic.com/blood-tests/fatigue-energy",
    type: "article",
  },
  keywords: [
    "private fatigue blood test UK",
    "unexplained fatigue blood test UK",
    "chronic fatigue blood test UK",
    "thyroid blood test private UK",
    "subclinical hypothyroidism test UK",
    "TPO antibodies blood test UK",
    "ferritin fatigue blood test UK",
    "fasting insulin fatigue UK",
    "uric acid mitochondrial fatigue",
    "B12 deficiency test UK",
    "vitamin D fatigue blood test UK",
    "told normal blood test still tired",
    "tired all the time blood test UK",
    "fatigue panel UK private",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;
const callout = { padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Private Fatigue Blood Test UK Thyroid, Insulin & Iron Panel",
  description:
    "A private fatigue blood test covering thyroid including TPO antibodies, fasting insulin, ferritin with full iron studies, uric acid, B12, folate, vitamin D and CRP GP-reviewed with written clinical interpretation and next-step recommendations.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: {
    "@type": "Organization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
    logo: { "@type": "ImageObject", url: "https://veridianclinic.com/og-image.jpg" },
  },
  datePublished: "2026-05-31",
  dateModified: "2026-05-31",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://veridianclinic.com/blood-tests/fatigue-energy" },
  image: "https://veridianclinic.com/og-image.jpg",
};

export default function FatigueEnergyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClinicalArticleLayout
        eyebrow="Private Blood Tests UK · Energy & Fatigue"
        title="Tired of being told you&apos;re fine Private fatigue &amp; energy blood test UK"
        intro="The most frustrating clinical experience is persistent fatigue paired with a normal blood test. It is also, in our experience, one of the most common. Standard GP panels test for anaemia and gross thyroid failure. They do not test for the markers that explain the majority of cases: subclinical thyroid dysfunction, functional iron deficiency, early insulin resistance, and the mitochondrial contributors that most primary care panels omit entirely."
        ctas={[
          { href: "/book?tier=fatigue-energy", label: "Book Fatigue & Energy Panel £249 →" },
        ]}
      >
        <p style={paragraph}>
          Most people who arrive at this page have already had blood tests. The GP ordered a full blood count, thyroid function and perhaps a vitamin B12. Everything came back normal. They were told there was nothing wrong or that it was stress, or low mood, or to try sleeping better. The fatigue remained. This page explains why those tests frequently miss the actual drivers, and what a more complete panel looks at instead.
        </p>

        <p style={paragraph}>
          There is one fatigue panel at Veridian, not a ladder of them. We previously offered a smaller entry-level screen alongside this one. It has been withdrawn, because the laboratory cost difference between the two was under £7 and the cheaper panel left out markers that change what we would advise fasting insulin, C-peptide, vitamin D, both thyroid antibody types, full iron studies and cystatin C among them. Selling a thinner investigation for a fatigue that has already been investigated once and missed is not a saving. Everything below is in the single £249 panel.
        </p>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>Clinical bottom line:</strong> the most common missed causes of persistent fatigue in people with &apos;normal&apos; blood tests are: (1) subclinical hypothyroidism with normal TSH but elevated TPO antibodies, (2) ferritin in the low-normal range (30-60 µg/L) where the NHS flags no deficiency but symptoms persist, (3) undetected insulin resistance, and (4) uric acid elevation impairing mitochondrial energy production.
          </p>
        </div>

        <h2 className="cg" style={sectionHeading}>Why standard thyroid tests miss subclinical dysfunction</h2>
        <p style={paragraph}>
          NHS thyroid screening typically measures TSH alone. If TSH is below 4.0-4.5 mIU/L, the result is reported as normal and thyroid disease is excluded. But TSH is a pituitary signal it tells you how hard the pituitary is working to stimulate the thyroid, not how well the thyroid is actually functioning or how much active thyroid hormone is reaching the tissues.
        </p>
        <p style={paragraph}>
          Three clinically important thyroid scenarios escape detection from TSH alone:
        </p>
        <ul className="chk">
          <li><strong>Subclinical hypothyroidism with normal TSH:</strong> TSH between 2.5 and 4.0 mIU/L with low-normal FT4 and FT3 can produce significant fatigue, weight gain, cold intolerance, and cognitive slowing particularly in women while registering as normal on standard screening.</li>
          <li><strong>Hashimoto&apos;s thyroiditis with normal TSH:</strong> TPO antibodies (anti-thyroid peroxidase antibodies) indicate autoimmune attack on the thyroid gland. TSH may remain normal for years while the inflammatory process degrades thyroid function. Early detection of elevated TPO antibodies identifies the cause and allows monitoring before overt hypothyroidism develops. The NHS does not routinely test TPO antibodies in the initial fatigue workup.</li>
          <li><strong>Impaired T4 to T3 conversion:</strong> FT3 is the metabolically active form of thyroid hormone. Some individuals particularly those with chronic stress, caloric restriction, liver dysfunction, or nutrient deficiencies convert T4 to the inactive reverse T3 preferentially, leaving FT3 low despite normal TSH and FT4. This pattern requires FT3 measurement to identify and is invisible to TSH-only testing.</li>
        </ul>

        <h2 className="cg" style={sectionHeading}>The ferritin threshold problem</h2>
        <p style={paragraph}>
          Ferritin is the storage form of iron. NHS reference ranges typically flag ferritin below 12-15 µg/L as deficient. But clinical and research evidence consistently shows that symptoms fatigue, hair loss, poor exercise tolerance, restless legs, brain fog begin to resolve only when ferritin rises above 50-70 µg/L in most people, and closer to 80-100 µg/L in women of reproductive age.
        </p>
        <p style={paragraph}>
          This creates a large symptomatic grey zone: a ferritin of 22 µg/L is above the NHS lower limit of normal, so no deficiency is flagged and no treatment is recommended. Yet a substantial body of evidence supports iron supplementation targeting ferritin above 50 µg/L in symptomatic patients. This panel measures ferritin alongside full iron studies serum iron, transferrin, transferrin saturation to give a complete picture of iron status rather than a single marker that can be misleading in isolation.
        </p>

        <h2 className="cg" style={sectionHeading}>Fasting insulin the most commonly missed energy driver</h2>
        <p style={paragraph}>
          Insulin resistance produces fatigue through two distinct mechanisms. First, glucose uptake into energy-producing cells (particularly muscle) is impaired, reducing the efficiency of ATP production from carbohydrate. Second, compensatory hyperinsulinaemia the elevated insulin levels required to maintain normal blood glucose in the face of insulin resistance drives increased fat storage, impairs fatty acid oxidation, and generates the familiar pattern of energy crashes after meals and progressive afternoon fatigue.
        </p>
        <p style={paragraph}>
          Critically, this can occur with entirely normal HbA1c and fasting glucose. The pancreas is simply working harder to maintain those normal numbers. Fasting insulin reveals the compensatory burden directly and is not included in any standard GP fatigue panel.
        </p>

        <h2 className="cg" style={sectionHeading}>Uric acid and mitochondrial fatigue</h2>
        <p style={paragraph}>
          Uric acid best known as the marker elevated in gout has increasingly recognised roles in metabolic and mitochondrial health beyond joint inflammation. Elevated uric acid inhibits key enzymes in the mitochondrial electron transport chain, reduces nitric oxide bioavailability (impairing vascular and cellular energy delivery), and is associated with increased oxidative stress. In the context of fatigue, uric acid levels in the upper normal range are associated with worse energy metabolism a relationship that standard fatigue panels never explore.
        </p>
        <p style={paragraph}>
          Uric acid also rises with dietary fructose intake, with insulin resistance, with dehydration, and with impaired kidney clearance. Its inclusion in this panel allows a specific metabolic contributor to fatigue to be identified and addressed one that is entirely absent from standard NHS investigations.
        </p>

        <h2 className="cg" style={sectionHeading}>What is tested, and why each marker is on the list</h2>
        <p style={paragraph}>
          This is the complete list. Nothing on this page is aspirational: every marker below is on the laboratory requisition we send, and nothing we do not measure is described as if we did.
        </p>
        <ul className="chk">
          <li><strong>Full Blood Count:</strong> haemoglobin, haematocrit, red cell count and indices (MCV, MCH, MCHC), platelets, white cell count with the full differential neutrophils, lymphocytes, monocytes, eosinophils, basophils. This is the anaemia and immune-burden layer, and MCV is the first clue to a B12 or folate pattern.</li>
          <li><strong>Complete thyroid function TSH, free T4, free T3, and both antibody types:</strong> TSH alone is a pituitary signal. FT4 and FT3 show what is actually circulating, and FT3 is the metabolically active hormone. Both autoimmune markers are measured thyroid peroxidase antibodies and thyroglobulin antibodies because either can be raised in autoimmune thyroid disease, and TSH may sit inside the reference range for years while that process runs.</li>
          <li><strong>Ferritin with full iron studies:</strong> ferritin, serum iron, transferrin, total iron-binding capacity and transferrin saturation. Ferritin alone is misleading it rises with inflammation and can look reassuring in someone who is genuinely iron-depleted. Transferrin saturation and TIBC are what separate the two.</li>
          <li><strong>Vitamin B12 and folate:</strong> both are required for red cell production and neurological function, and low-normal levels of either can produce fatigue and cognitive change before any anaemia appears.</li>
          <li><strong>Vitamin D (25-OH):</strong> deficiency is common in the UK, is a genuinely correctable contributor to low energy and low mood, and is not routinely measured in a standard fatigue workup.</li>
          <li><strong>Fasting insulin and C-peptide:</strong> the two markers that show how hard the pancreas is working to hold glucose normal. C-peptide is co-secreted with insulin and gives a more stable picture of endogenous output. This is the layer that reveals the compensatory phase of insulin resistance the phase where HbA1c and glucose are still normal.</li>
          <li><strong>HbA1c and fasting glucose:</strong> the conventional glycaemic picture, read alongside insulin rather than instead of it.</li>
          <li><strong>Uric acid:</strong> elevated uric acid is associated with impaired mitochondrial function and reduced nitric oxide availability, and rises with fructose intake, insulin resistance and reduced renal clearance. It is a specific, modifiable metabolic contributor to fatigue.</li>
          <li><strong>CRP:</strong> systemic inflammation suppresses energy, motivation and concentration through cytokine signalling. A raised CRP with otherwise unremarkable markers redirects the whole investigation.</li>
          <li><strong>Kidney function including cystatin C:</strong> creatinine, urea, eGFR, cystatin C, sodium and chloride. Cystatin C is included because it is less affected by muscle mass than creatinine, so it detects reduced filtration in people whose creatinine-based eGFR reads normally.</li>
          <li><strong>Magnesium, adjusted calcium and phosphate:</strong> the mineral markers relevant to muscle function, cramp, palpitations and sleep quality, and the ones most often assumed rather than measured.</li>
          <li><strong>Albumin and alkaline phosphatase:</strong> protein status and the liver/bone enzyme layer. Low albumin also changes how calcium and thyroid results should be read, which is why adjusted calcium is reported.</li>
        </ul>
        <p style={paragraph}>
          What this panel does not measure is as important as what it does. It does not include cortisol, and it does not include testosterone or the sex hormones. If your symptom picture points that way morning-heavy exhaustion with weight redistribution, or fatigue alongside low libido, low mood and loss of muscle then the panel you want is{" "}
          <Link href="/blood-tests/optimiser-baseline" style={{ color: "var(--go)", textDecoration: "underline" }}>the Optimiser&apos;s Baseline</Link>, which measures morning cortisol and total testosterone, with free testosterone calculated from SHBG. We would rather send you to the right panel than sell you this one and imply it answers a question it cannot.
        </p>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>When fatigue needs urgent assessment, not a private panel:</strong> unintentional weight loss, drenching night sweats, coughing blood, a new lump, blood in the stool or urine, fatigue with breathlessness at rest or chest pain, or fatigue that has come on abruptly and is worsening by the day these need same-day NHS assessment through your GP or 111, not a blood panel booked for next week. Please seek that first. This panel is for persistent, stable fatigue that has already been assessed and not explained.
          </p>
        </div>

        <h2 className="cg" style={sectionHeading}>Who should consider this panel?</h2>
        <ul className="chk">
          <li><strong>Anyone with persistent fatigue who has had a standard GP panel and been told everything is normal.</strong></li>
          <li><strong>People with low energy that worsens through the afternoon</strong> the classic pattern of insulin-driven energy dysregulation.</li>
          <li><strong>Women with hair thinning, cold hands and feet, or weight gain alongside fatigue</strong> Hashimoto&apos;s and iron deficiency are particularly common causes in this group.</li>
          <li><strong>People with brain fog, poor concentration or word-finding difficulties</strong> B12, folate, thyroid and insulin resistance all affect cognitive clarity independently.</li>
          <li><strong>People whose fatigue is worse after meals or with carbohydrate-heavy eating patterns</strong> the hallmark of postprandial insulin dysregulation.</li>
          <li><strong>Anyone who has been treated for thyroid disease and remains symptomatic</strong> TSH alone does not confirm adequate tissue-level thyroid hormone delivery; FT3 is the more informative follow-up marker.</li>
        </ul>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>What you get back:</strong> a GP-reviewed written report that works through each marker in the context of your symptoms identifying which drivers are likely contributing to your fatigue and providing a prioritised, actionable recommendation for what to address first.
          </p>
        </div>

        <ul className="chk">
          <li>Thyroid panel including FT3, FT4, TSH and both thyroid antibody types.</li>
          <li>Ferritin + full iron studies, B12, folate, vitamin D.</li>
          <li>Fasting insulin, C-peptide and uric acid the markers standard panels miss.</li>
          <li>CRP + Full Blood Count + kidney function including cystatin C.</li>
          <li>Magnesium, adjusted calcium, phosphate, albumin and alkaline phosphatase.</li>
          <li>GP-reviewed written report with personalised interpretation and next-step action plan.</li>
          <li>Nationally accredited UK laboratory. Results typically within 48-72 hours.</li>
          <li>Home collection kit, walk-in centre, or nurse home visit.</li>
        </ul>

        <h2 className="cg" style={sectionHeading}>Optional: talk the results through with a GP</h2>
        <p style={paragraph}>
          The £249 panel already includes a GP-written report you do not need to buy anything else to understand your results. The report names which markers are contributing, in what order, and what to do about each.
        </p>
        <p style={paragraph}>
          Some people still want the conversation. If you would rather sit with a GP and work through the report out loud ask what the borderline numbers mean for you specifically, decide what to change first, or plan when to retest{" "}
          <Link href="/discovery-call" style={{ color: "var(--go)", textDecoration: "underline" }}>Discovery Core</Link>{" "}
          is a 30-minute live consultation with Dr Taiwo for £97. It is entirely optional, it can be booked before or after your results arrive, and nothing in your report depends on it.
        </p>
        <div style={{ display: "grid", gap: 10, marginBottom: 8 }}>
          <Link href="/discovery-call" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--iv)", border: "1px solid rgba(0,0,0,.07)", textDecoration: "none" }}>
            <span style={{ fontSize: ".88rem", color: "var(--sl)", fontWeight: 500 }}>Discovery Core 30-minute GP consultation (optional)</span>
            <span style={{ fontSize: ".78rem", color: "var(--sl3)" }}>£97 →</span>
          </Link>
        </div>

        {/* Related tests */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,.08)", paddingTop: 24, marginTop: 8 }}>
          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>Related Tests</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { href: "/blood-tests/fasting-insulin", label: "Fasting Insulin Blood Test", note: "From £249" },
              { href: "/blood-tests/womens-hormones", label: "Women's Hormone & Perimenopause Panel", note: "£375" },
              { href: "/blood-tests/mens-testosterone", label: "Men's Testosterone & Hormone Panel", note: "£325" },
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
