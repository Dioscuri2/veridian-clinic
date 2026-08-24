import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";
import { bookUrl } from "@/data/panels";

export const metadata: Metadata = {
  title: { absolute: "Do Multivitamins Work UK What the COSMOS Trials Actually Found | Veridian Clinic" },
  description:
    "Three large randomised controlled trials in adults 65+ found that a standard multivitamin slowed global cognitive ageing by roughly two years and episodic memory ageing by roughly five years compared to placebo. This GP-authored guide explains what the COSMOS trials found, why widespread nutrient shortfalls are more common than assumed, and when testing beats guessing.",
  alternates: { canonical: "https://veridianclinic.com/blog/multivitamins" },
  openGraph: {
    title: "Do Multivitamins Work? The COSMOS Trials Changed the Answer | Veridian Clinic",
    description:
      "Three large RCTs found multivitamins slowed cognitive ageing by ~2 years and episodic memory ageing by ~5 years vs placebo. Here is what that means.",
    url: "https://veridianclinic.com/blog/multivitamins",
    type: "article",
  },
  keywords: [
    "do multivitamins work UK evidence",
    "COSMOS trial multivitamin cognitive",
    "multivitamin cognitive health older adults UK",
    "vitamin deficiency UK adults",
    "micronutrient testing UK private",
    "nutrient deficiency blood test UK",
    "magnesium deficiency UK",
    "vitamin E deficiency UK",
    "vitamin K deficiency UK",
    "multivitamin episodic memory",
    "should I take a multivitamin UK",
    "private nutrition testing UK",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;
const callout = { padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Do Multivitamins Work UK: What the COSMOS Trials Actually Found",
  description:
    "Three large randomised controlled trials found that a standard multivitamin slowed cognitive ageing by roughly two years and episodic memory ageing by five years vs placebo. This GP-authored guide explains what the evidence means and when targeted testing is better.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: {
    "@type": "Organization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
    logo: { "@type": "ImageObject", url: "https://veridianclinic.com/og-image.jpg" },
  },
  datePublished: "2026-06-23",
  dateModified: "2026-06-23",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://veridianclinic.com/blog/multivitamins" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What did the COSMOS trials find about multivitamins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The COSMOS (COcoa Supplement and Multivitamin Outcomes Study) trials were three large randomised controlled trials in adults aged 65 and over, comparing a standard multivitamin to placebo over approximately two years. Across the trials, global cognitive ageing was slowed by roughly two years and episodic memory ageing, the ability to recall experiences, conversations, and people, by roughly five years in the multivitamin group. A follow-up analysis also found a modest slowing of epigenetic ageing. These effects were seen with a standard, inexpensive multivitamin available in pharmacies.",
      },
    },
    {
      "@type": "Question",
      name: "Should I take a multivitamin even if I eat a good diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A multivitamin is most useful as insurance against gaps that are difficult to identify through diet alone. Around 50% of UK adults do not get enough magnesium, 60% fall short on vitamin E, and 35% on vitamin K, nutrients that are commonly underprovided even in diets that appear broadly healthy. Processed foods and depleted soil both reduce micronutrient density compared to historical dietary patterns. A targeted approach based on testing your actual levels is always superior, but a standard multivitamin is a reasonable, low-cost backstop while that testing is arranged or when specific testing is not available.",
      },
    },
    {
      "@type": "Question",
      name: "Can a multivitamin replace a good diet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A multivitamin provides isolated micronutrients at modest doses. It does not replicate the fibre, phytonutrients, polyphenols, and macronutrient composition of a good diet. The COSMOS findings are relevant to people who may have specific nutrient shortfalls despite an otherwise reasonable diet, not as evidence that a multivitamin can substitute for dietary quality. Sleep, physical activity, blood glucose management, and dietary quality all have larger effects on health outcomes than any supplement.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find out which nutrients I am actually short on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A blood test is the most reliable way to identify specific nutrient deficiencies. Veridian Clinic's Fatigue and Energy Panel includes vitamin D, vitamin B12, folate, ferritin, and iron studies, which are among the most clinically significant nutrients commonly found to be suboptimal in UK adults. The Longevity Panel (150+ markers) provides a more comprehensive picture. Both panels include a GP-written interpretation that distinguishes between lab normal and genuinely optimal for your specific situation.",
      },
    },
  ],
};

export default function MultivitaminsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ClinicalArticleLayout
        datePublished="2026-06-23"
        dateModified="2026-06-23"
        eyebrow="Longevity Medicine · Nutrition"
        title='"Multivitamins are useless" is officially outdated'
        intro="Three large randomised controlled trials in adults 65 and over found that a standard off-the-shelf multivitamin slowed global cognitive ageing by roughly two years and episodic memory ageing by roughly five years compared to placebo. This is not the finding medicine expected. Here is what the COSMOS trials actually showed, why widespread micronutrient shortfalls are more common than most people assume, and why testing beats guessing."
        ctas={[
          { href: bookUrl("fatigue-energy"), label: "Book Fatigue and Energy Panel £249, includes key micronutrients →" },
          { href: bookUrl("longevity-panel"), label: "Book Longevity Panel 150+ markers £795", variant: "secondary" },
          { href: "/metabolic-quiz", label: "Check your metabolic age free →", variant: "tertiary" },
        ]}
      >
        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>Clinical bottom line:</strong> the COSMOS trials found meaningful slowing of cognitive and episodic memory ageing with a standard multivitamin in adults 65+. The likely mechanism is widespread micronutrient shortfalls that produce slow, invisible deterioration over years. A targeted approach based on tested nutrient levels is superior, but a standard multivitamin is considerably better than assuming your diet covers everything.
          </p>
        </div>

        <h2 className="cg" style={sectionHeading}>Why "multivitamins are useless" was partly right, and partly wrong</h2>
        <p style={paragraph}>
          The view that multivitamins are a waste of money became dominant in medicine for a reason. Several large observational studies and earlier trials failed to show benefit for well-nourished adults. The supplement industry had consistently overclaimed what a multivitamin could do. And the logic seemed sound: if you eat a reasonable diet, supplementing with a broad-spectrum low-dose product should not make much difference. For truly well-nourished people, that may still be broadly true.
        </p>
        <p style={paragraph}>
          The problem is that the assumption of adequate nutrition turned out to be less reliable than expected. Modern diets, shaped by processing, convenience, and soil depletion, are nutritionally different from historical dietary patterns in ways that affect multiple micronutrients simultaneously. The combination of processing-related nutrient loss, lower phytonutrient density, and the distribution of calorie intake away from nutrient-dense foods has produced a population where specific micronutrient shortfalls are common even among people who do not consider themselves to have a poor diet.
        </p>

        <h2 className="cg" style={sectionHeading}>What the COSMOS trials actually found</h2>
        <p style={paragraph}>
          The COSMOS programme, standing for COcoa Supplement and Multivitamin Outcomes Study, was a series of three large, well-designed randomised controlled trials in adults aged 65 and over. The trials randomised participants to either a standard off-the-shelf multivitamin or an identical placebo and followed them for approximately two years. The primary outcome of interest in the cognitive arm was the trajectory of cognitive ageing, measured through validated assessments of memory, attention, and executive function.
        </p>
        <p style={paragraph}>
          The results were more striking than most expected. Global cognitive ageing was slowed by roughly two years in the multivitamin group compared to placebo. Episodic memory ageing, which refers specifically to the capacity to recall experiences, conversations, faces, and events, was slowed by roughly five years. Episodic memory is among the first cognitive domains to show age-related decline, and the five-year slowing observed is a clinically meaningful effect. A follow-up analysis of the trial participants also found a modest but statistically significant slowing of epigenetic ageing in the multivitamin group.
        </p>
        <p style={paragraph}>
          These findings emerged from standard multivitamins available in any pharmacy, not expensive proprietary formulations. The implications for the clinical view of multivitamins are significant.
        </p>

        <h2 className="cg" style={sectionHeading}>Why widespread micronutrient shortfalls are more common than assumed</h2>
        <p style={paragraph}>
          The likely explanation for the COSMOS findings is not that multivitamins are doing something extraordinary. It is that a large proportion of participants had suboptimal levels of one or more micronutrients that were silently impairing background physiological processes. Restoring those nutrients to adequate levels removed a brake on systems that depended on them.
        </p>
        <p style={paragraph}>
          The scale of nutrient shortfalls in the UK adult population is larger than most people expect. Estimates from nutritional surveillance data suggest that around 50% of adults do not achieve recommended intakes for magnesium, around 60% fall short on vitamin E, approximately 35% do not reach recommended vitamin K intake, and around 25% fall short on vitamin C. These are not edge-case micronutrients. They are involved in nerve signalling, antioxidant defence, blood coagulation, immune function, and cellular energy production. Running them below optimal for years produces the kind of quiet, incremental deterioration that is not felt acutely but accumulates in measurable ways at the population level.
        </p>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>Nutrients commonly suboptimal in UK adults:</strong> magnesium (~50% fall short) · vitamin E (~60%) · vitamin K (~35%) · vitamin C (~25%) · vitamin D (~70%) · vitamin B12 (common in over 50s and plant-based diets) · folate. These nutrients run background physiological machinery. Slow deficiency produces slow, invisible damage.
          </p>
        </div>

        <h2 className="cg" style={sectionHeading}>What a multivitamin can and cannot do</h2>
        <p style={paragraph}>
          A multivitamin is not a substitute for a good diet. It does not replicate the fibre, polyphenols, phytonutrients, and macronutrient composition of whole foods. The COSMOS findings do not suggest that a multivitamin can make up for poor dietary quality, inadequate sleep, or physical inactivity. Those interventions have substantially larger effects on health outcomes than any supplement.
        </p>
        <p style={paragraph}>
          What a standard multivitamin can do is function as low-effort, low-cost insurance against the nutritional gaps that most people cannot reliably identify through diet alone. The benefit from filling those gaps appears to be real, to compound over time, and to be meaningful in absolute terms for cognitive ageing in particular. The cost is small, the risk is minimal at standard doses, and the evidence now supports rather than undermines the practice for most adults.
        </p>
        <p style={paragraph}>
          The important caveat is that a multivitamin does not address clinically significant deficiencies of specific nutrients. If your vitamin D level is 30 nmol/L, a multivitamin containing 400 IU will not meaningfully correct it. Specific, identified deficiencies require targeted supplementation at appropriate doses, which requires knowing the deficiency exists. That requires testing.
        </p>

        <h2 className="cg" style={sectionHeading}>Why targeted testing beats guessing</h2>
        <p style={paragraph}>
          A blanket multivitamin is better than guessing that your diet covers everything. Targeted supplementation based on tested blood levels is better still. The reason is straightforward: a multivitamin provides a modest dose of many nutrients, some of which you may already be sufficient in, and may not provide enough of the specific nutrients where you are actually deficient. If your B12 is 150 pmol/L (below the NHS lower limit of 180 pmol/L), a multivitamin providing 6 micrograms is not going to correct that. You need to know the number.
        </p>
        <p style={paragraph}>
          Private blood testing at Veridian allows a clinically meaningful snapshot of the nutrients most likely to be suboptimal in UK adults, interpreted against optimal rather than just disease-prevention thresholds. The output is a specific, prioritised list of what to address rather than broad supplementation across every possible nutrient at a dose that may not be sufficient for the deficiencies that actually matter.
        </p>

        <h2 className="cg" style={sectionHeading}>Frequently asked questions</h2>
        <div style={{ display: "grid", gap: 18 }}>
          {[
            {
              q: "What did the COSMOS trials find about multivitamins?",
              a: "Three large RCTs in adults 65+ found that a standard multivitamin slowed global cognitive ageing by roughly two years and episodic memory ageing by roughly five years compared to placebo. A follow-up analysis found modest slowing of epigenetic ageing. These effects were seen with a standard, inexpensive off-the-shelf multivitamin.",
            },
            {
              q: "Should I take a multivitamin if I eat a good diet?",
              a: "A multivitamin is most useful as insurance against gaps that are difficult to identify through diet alone. Around 50% of UK adults fall short on magnesium, 60% on vitamin E, and 35% on vitamin K, even among people who consider their diet broadly healthy. A targeted approach based on testing your actual levels is superior, but a standard multivitamin is a reasonable, low-cost backstop.",
            },
            {
              q: "Can a multivitamin replace a good diet?",
              a: "No. A multivitamin provides isolated micronutrients at modest doses and does not replicate the fibre, phytonutrients, and macronutrient quality of whole foods. The COSMOS findings are relevant to people with specific nutrient shortfalls, not as evidence that supplementation substitutes for dietary quality.",
            },
            {
              q: "How do I find out which nutrients I am actually short on?",
              a: "A blood test is the most reliable approach. Veridian Clinic's Fatigue and Energy Panel includes vitamin D, B12, folate, ferritin, and iron studies. The Longevity Panel provides a more comprehensive picture across 150+ markers. Both include a GP-written interpretation that distinguishes lab normal from optimal.",
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ borderTop: "1px solid rgba(44,42,38,.08)", paddingTop: 16 }}>
              <p style={{ fontSize: ".96rem", fontWeight: 600, color: "var(--sl)", marginBottom: 8, lineHeight: 1.5 }}>{q}</p>
              <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.9 }}>{a}</p>
            </div>
          ))}
        </div>

        <ul className="chk">
          <li>Three COSMOS trials in adults 65+ found standard multivitamins slowed global cognitive ageing by ~2 years and episodic memory ageing by ~5 years vs placebo.</li>
          <li>Around 50% of UK adults are below recommended magnesium intake, 60% vitamin E, 35% vitamin K, and 25% vitamin C.</li>
          <li>A multivitamin is low-effort insurance against gaps; targeted supplementation based on tested levels is always superior.</li>
          <li>A multivitamin does not correct clinically significant specific deficiencies, which require appropriate doses of the specific nutrient identified by testing.</li>
          <li>The benefit of filling micronutrient gaps is slow, quiet, and compounds over years, not something felt acutely.</li>
        </ul>

        <p style={{ fontSize: ".9rem", color: "var(--sl3)", lineHeight: 1.8, borderTop: "1px solid rgba(0,0,0,.08)", paddingTop: 16 }}>
          Related reading:{" "}
          <Link href="/blog/vitamin-d" style={{ color: "var(--go)", textDecoration: "underline" }}>Vitamin D: why normal isn't optimal</Link>
          {" · "}
          <Link href="/blog/fast-insulin" style={{ color: "var(--go)", textDecoration: "underline" }}>Fasting insulin and early metabolic dysfunction</Link>
          {" · "}
          <Link href="/blood-tests/fatigue-energy" style={{ color: "var(--go)", textDecoration: "underline" }}>Private Fatigue and Energy Blood Test UK</Link>
          {" · "}
          <Link href="/blood-tests/biological-age" style={{ color: "var(--go)", textDecoration: "underline" }}>Longevity Panel 150+ markers</Link>
        </p>
      </ClinicalArticleLayout>
    </>
  );
}
