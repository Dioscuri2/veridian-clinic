import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Perimenopause Blood Test UK Private Women's Hormone Panel | Veridian Clinic",
  description:
    "A private perimenopause and women's hormone blood test in the UK. Oestradiol, FSH, LH, progesterone, testosterone, thyroid, Lp(a) and fasting insulin GP-reviewed written interpretation. Is It My Hormones? Panel £325.",
  alternates: {
    canonical: "https://veridianclinic.com/blood-tests/womens-hormones",
  },
  openGraph: {
    title: "Perimenopause Blood Test UK Private Women's Hormone Panel | Veridian Clinic",
    description:
      "Private perimenopause and female hormone testing in the UK. Oestradiol, FSH, progesterone, testosterone, thyroid, Lp(a) and fasting insulin interpreted by a GP. £325.",
    url: "https://veridianclinic.com/blood-tests/womens-hormones",
    type: "article",
  },
  keywords: [
    "perimenopause blood test UK",
    "private hormone test women UK",
    "female hormone blood test UK",
    "am I in perimenopause blood test",
    "menopause blood test private UK",
    "oestradiol blood test UK",
    "FSH blood test perimenopause",
    "hormonal imbalance blood test UK",
    "private thyroid blood test women UK",
    "testosterone women blood test UK",
    "Lp(a) women heart risk test",
    "perimenopause symptoms blood test",
    "is it my hormones blood test",
    "women fatigue blood test UK",
  ],
};

const paragraph = { fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.95 } as const;
const sectionHeading = { fontSize: "2rem", fontWeight: 500, color: "var(--sl)" } as const;
const callout = { padding: "18px 20px", background: "var(--iv)", borderLeft: "3px solid var(--go)" } as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Perimenopause Blood Test UK Private Women's Hormone Panel",
  description:
    "A private perimenopause and female hormone blood test revealing oestradiol, FSH, LH, progesterone, testosterone, thyroid function, Lp(a) and fasting insulin interpreted by a GP with a written clinical report.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: {
    "@type": "Organization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
    logo: { "@type": "ImageObject", url: "https://veridianclinic.com/og-image.jpg" },
  },
  datePublished: "2026-05-31",
  dateModified: "2026-05-31",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://veridianclinic.com/blood-tests/womens-hormones" },
  image: "https://veridianclinic.com/og-image.jpg",
};

export default function WomensHormonesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClinicalArticleLayout
        eyebrow="Private Blood Tests UK · Women's Health"
        title="Is it my hormones? Private perimenopause &amp; women&apos;s hormone blood test UK"
        intro="Fatigue, weight gain, poor sleep, low mood, brain fog, irregular cycles these are the symptoms most likely to be met with a normal blood test result and a reassurance that 'everything looks fine'. In the majority of cases, standard NHS panels do not include the hormonal markers that would tell a different story. This panel does."
        ctas={[
          { href: "/book?tier=womens-hormones", label: "Book Is It My Hormones? Panel £325 →" },
          { href: "/perimenopause-guide", label: "Download the Free Perimenopause Guide", variant: "secondary" },
        ]}
      >
        <p style={paragraph}>
          The perimenopause transition the years surrounding the final menstrual period is one of the most diagnostically overlooked periods in women&apos;s health. Hormone levels during this phase are not low and static; they are chaotic and fluctuating. A single oestradiol measurement taken on the wrong day of the cycle, or during a temporary surge, can return as entirely normal while the overall pattern is one of progressive hormonal dysregulation. A panel that captures the full picture FSH, LH, oestradiol, progesterone, testosterone, SHBG, prolactin and thyroid taken together with cardiovascular and metabolic markers, tells a far more complete story.
        </p>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>Clinical bottom line:</strong> the perimenopause transition typically begins 4–10 years before the final menstrual period. FSH rising above 10 IU/L, even with a &apos;normal&apos; oestradiol, is often the earliest measurable hormonal signal and standard GP panels frequently don&apos;t request it unless a woman is over 45 and already asking about menopause.
          </p>
        </div>

        <h2 className="cg" style={sectionHeading}>Why standard GP blood tests miss the perimenopause picture</h2>
        <p style={paragraph}>
          NHS guidance on diagnosing menopause changed in 2015: NICE explicitly states that menopause in women over 45 should be diagnosed clinically, based on symptoms alone, without blood tests. While this is sensible for confirmed menopause, it means that women in their early-to-mid 40s with clear perimenopausal symptoms are often told that blood tests are not needed or that their results are normal without the relevant markers ever being measured.
        </p>
        <p style={paragraph}>
          The standard NHS full blood count and thyroid screen, if requested, will catch gross thyroid disease and anaemia. But the markers that characterise perimenopause fluctuating oestradiol, rising FSH, declining progesterone, low-normal or frankly low free testosterone are not part of routine screening. They require a targeted hormonal panel.
        </p>
        <p style={paragraph}>
          Additionally, many women experience hormonal symptoms that originate not from ovarian function alone but from the interaction between sex hormones, thyroid function, cortisol, insulin, and inflammatory markers. A rising Lp(a) level which frequently elevates during hormonal transitions and carries significant cardiovascular implications will never appear on a standard cholesterol check. Fasting insulin the primary driver of hormonal disruption in conditions like PCOS and perimenopausal weight gain is also routinely omitted.
        </p>

        <h2 className="cg" style={sectionHeading}>What the Is It My Hormones? panel measures</h2>
        <p style={paragraph}>
          The panel is designed to assess ovarian function, adrenal and thyroid contribution to hormonal symptoms, and the metabolic-cardiovascular crossover that becomes increasingly important during the perimenopausal years:
        </p>
        <ul className="chk">
          <li><strong>Oestradiol (E2):</strong> the primary oestrogen. Fluctuates widely in perimenopause a single reading is informative but must be interpreted in the context of FSH and cycle stage where relevant.</li>
          <li><strong>FSH (Follicle Stimulating Hormone):</strong> rises as ovarian reserve declines. A sustained FSH above 25–30 IU/L, particularly with low oestradiol, is consistent with menopause transition. Even early rises above 10 IU/L in a premenopausal context are clinically significant.</li>
          <li><strong>LH (Luteinising Hormone):</strong> the pituitary signal to ovulate. LH:FSH ratio is informative in PCOS; LH elevation alongside FSH confirms primary ovarian insufficiency is driving the hormonal shift rather than a hypothalamic or pituitary cause.</li>
          <li><strong>Progesterone:</strong> meaningful in the luteal phase; a low luteal progesterone confirms anovulation one of the earliest perimenopausal changes and a common driver of heavy periods, mood disruption and poor sleep.</li>
          <li><strong>Prolactin:</strong> elevated prolactin suppresses FSH and LH, disrupts ovarian function, and causes symptoms that precisely mimic perimenopause including irregular cycles, low libido and mood changes. It must be ruled out before attributing symptoms to ovarian decline.</li>
          <li><strong>SHBG (Sex Hormone Binding Globulin):</strong> binds testosterone and oestradiol, determining how much is biologically available. High SHBG (often driven by elevated thyroid hormone, oestrogen therapy or liver disease) can leave a woman with adequate total testosterone but low free testosterone with functional consequences for energy, libido and mood.</li>
          <li><strong>Testosterone (total + free):</strong> frequently low in women over 40 and almost never tested in standard GP panels. Low testosterone in women is associated with fatigue, low drive, cognitive changes and difficulty maintaining muscle. It is also the hormone most directly relevant to libido.</li>
          <li><strong>Thyroid (TSH, FT3, FT4 + TPO antibodies):</strong> thyroid dysfunction is 5–8x more common in women than men and peaks in incidence during the perimenopausal decade. Subclinical hypothyroidism TSH between 4 and 10 mIU/L produces symptoms virtually identical to perimenopause. TPO antibodies identify autoimmune thyroid disease (Hashimoto&apos;s) before TSH becomes abnormal.</li>
          <li><strong>Cortisol:</strong> chronic physiological stress elevates cortisol, suppresses sex hormone production and disrupts sleep architecture amplifying perimenopausal symptoms. Cortisol also affects SHBG, thyroid conversion and insulin sensitivity.</li>
          <li><strong>Lipoprotein (a):</strong> Lp(a) rises in approximately 60% of women during the perimenopause and does not fall after menopause. It is genetically determined but hormonally modulated. A high Lp(a) in a woman in her 40s carries significant lifetime cardiovascular risk that standard cholesterol testing will never reveal.</li>
          <li><strong>Fasting insulin + HbA1c:</strong> insulin resistance worsens with oestrogen decline. This is the primary metabolic mechanism behind perimenopausal weight gain, particularly abdominal. High fasting insulin also elevates SHBG-independent testosterone (driving PCOS-pattern symptoms) and perpetuates the cycle of hormonal disruption.</li>
          <li><strong>Vitamin D:</strong> deficiency is extremely common and worsens fatigue, mood and bone turnover all issues that worsen in perimenopause.</li>
        </ul>

        <h2 className="cg" style={sectionHeading}>What a &apos;normal&apos; result actually means in perimenopause</h2>
        <p style={paragraph}>
          Laboratory reference ranges for sex hormones are designed for the general population and treat menstrual cycle stage as a categorical variable. They do not capture the dynamic, fluctuating nature of the perimenopausal transition. An oestradiol of 180 pmol/L is within the follicular-phase reference range but if the same woman&apos;s FSH is 22 IU/L, progesterone is low in the luteal phase, and she is having sleep disruption, hot flushes and cycle irregularity, the clinical interpretation is perimenopause with declining ovarian reserve, not a normal hormonal picture.
        </p>
        <p style={paragraph}>
          This is precisely why results require GP interpretation rather than a comparison to a reference range table. The pattern across markers not any single value carries the clinical meaning.
        </p>

        <h2 className="cg" style={sectionHeading}>Who should consider this panel?</h2>
        <ul className="chk">
          <li><strong>Women in their late 30s to 50s</strong> with cycle changes, irregular periods, heavier bleeding or spotting.</li>
          <li><strong>Women experiencing fatigue, poor sleep, night sweats or hot flushes</strong> who have been told their blood tests are normal.</li>
          <li><strong>Women with unexplained low mood, anxiety or cognitive changes</strong> particularly when these are new or have worsened over the past 12–24 months.</li>
          <li><strong>Women with low libido, vaginal dryness or difficulty maintaining muscle</strong> testosterone deficiency is consistently under-investigated.</li>
          <li><strong>Women with a family history of early cardiovascular disease</strong> Lp(a) status is particularly important to establish before hormonal transition accelerates cardiovascular risk.</li>
          <li><strong>Women with PCOS</strong> to establish the current hormonal and metabolic baseline, as the pattern shifts significantly across the reproductive lifespan.</li>
          <li><strong>Women considering HRT</strong> a baseline hormonal panel before starting hormone therapy allows changes over time to be tracked meaningfully.</li>
        </ul>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>What you get back:</strong> a GP-reviewed written report covering every marker in the context of your symptoms and cycle stage not just a comparison to a reference range. You will receive a clear written interpretation and a prioritised clinical recommendation for what to do next.
          </p>
        </div>

        <ul className="chk">
          <li>Full female hormonal profile including oestradiol, FSH, LH, progesterone, prolactin, testosterone and SHBG.</li>
          <li>Thyroid panel including TPO antibodies catches subclinical and autoimmune thyroid disease.</li>
          <li>Lp(a), fasting insulin, HbA1c and vitamin D the markers that connect hormonal and metabolic health.</li>
          <li>GP-reviewed written report with personalised clinical interpretation and next-step recommendation.</li>
          <li>Nationally accredited UK laboratory. Results typically within 48–72 hours of sample receipt.</li>
          <li>Home collection kit, walk-in centre, or nurse home visit your choice.</li>
        </ul>

        {/* Related tests */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,.08)", paddingTop: 24, marginTop: 8 }}>
          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>Related Tests</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { href: "/blood-tests/mens-testosterone", label: "Men's Testosterone & Hormone Panel", note: "£325" },
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
