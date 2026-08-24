import type { Metadata } from "next";
import ClinicalArticleLayout from "@/components/ClinicalArticleLayout";
import Link from "next/link";
import { bookUrl } from "@/data/panels";

export const metadata: Metadata = {
  title: { absolute: "Perimenopause Blood Test UK: Private Women's Hormone Panel | Veridian Clinic" },
  description:
    "A private perimenopause and women's hormone blood test in the UK. Oestradiol, FSH, LH, progesterone, testosterone, thyroid, Lp(a) and fasting insulin. GP-reviewed written interpretation. Is It My Hormones? Panel, £375.",
  alternates: {
    canonical: "https://veridianclinic.com/blood-tests/womens-hormones",
  },
  openGraph: {
    title: "Perimenopause Blood Test UK: Private Women's Hormone Panel | Veridian Clinic",
    description:
      "Private perimenopause and female hormone testing in the UK. Oestradiol, FSH, progesterone, testosterone, thyroid, Lp(a) and fasting insulin, interpreted by a GP. £375.",
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
  headline: "Perimenopause Blood Test UK: Private Women's Hormone Panel",
  description:
    "A private perimenopause and female hormone blood test revealing oestradiol, FSH, LH, progesterone, testosterone, thyroid function, Lp(a) and fasting insulin, interpreted by a GP with a written clinical report.",
  author: { "@type": "Person", name: "Dr Oluwatosin Taiwo", url: "https://veridianclinic.com" },
  publisher: {
    "@type": "Organization",
    name: "Veridian Clinic",
    url: "https://veridianclinic.com",
    logo: { "@type": "ImageObject", url: "https://veridianclinic.com/og-image.jpg" },
  },
  datePublished: "2026-05-31",
  dateModified: "2026-06-10",
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
        intro="You are exhausted. Your mood has shifted. You wake at 3am and can't get back to sleep. You've gained weight around your middle and nothing is moving it. Your GP has done a blood test and told you everything looks fine. This panel measures what that test didn't."
        ctas={[
          { href: bookUrl("womens-hormones"), label: "Book Is It My Hormones? Panel £375 →" },
          { href: "/perimenopause-guide", label: "Download the Free Perimenopause Guide", variant: "secondary" },
        ]}
      >
        <p style={paragraph}>
          The perimenopause transition begins, on average, 4 to 10 years before the final menstrual period. During this phase hormone levels are not simply low and declining; they are chaotic and fluctuating. A single oestradiol measurement can return as entirely normal during a temporary surge while the overall pattern is one of progressive hormonal dysregulation. Standard NHS panels do not include the markers that would tell a different story. This panel does.
        </p>

        <div style={callout}>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--fo)" }}>Clinical note:</strong> NICE guidance states that menopause in women over 45 should be diagnosed clinically, on symptoms alone, without blood tests. This means women in their early-to-mid 40s with clear perimenopausal symptoms are routinely told blood tests are not needed, or that results are normal, without the relevant hormonal markers ever being measured.
          </p>
        </div>

        <h2 className="cg" style={sectionHeading}>Why your GP blood test came back normal</h2>
        <p style={paragraph}>
          A standard NHS blood test typically checks full blood count and, if thyroid disease is suspected, TSH. That is what &quot;normal bloods&quot; usually means. It does not include oestradiol, progesterone, FSH, LH, testosterone, SHBG, prolactin, or Lp(a). It does not measure fasting insulin, which is the primary metabolic driver of perimenopausal weight gain and hormonal disruption in PCOS.
        </p>
        <p style={paragraph}>
          Many women also carry elevated Lp(a), a genetically determined cardiovascular risk factor that rises in approximately 60% of women during hormonal transition and does not fall after menopause. A raised Lp(a) does not show on a standard cholesterol test. It requires a targeted cardiovascular lipid panel to find.
        </p>

        <h2 className="cg" style={sectionHeading}>What the Is It My Hormones? panel measures</h2>
        <ul className="chk">
          <li><strong>Oestradiol (E2):</strong> the primary oestrogen. Fluctuates widely in perimenopause and must be read alongside FSH, not in isolation.</li>
          <li><strong>FSH (Follicle Stimulating Hormone):</strong> rises as ovarian reserve declines. A sustained FSH above 25 IU/L with declining oestradiol is consistent with menopause transition. Early rises above 10 IU/L in a premenopausal context are clinically significant.</li>
          <li><strong>LH (Luteinising Hormone):</strong> the pituitary ovulation signal. LH:FSH ratio is informative for PCOS; LH elevation confirms the hormonal shift is originating at ovarian level.</li>
          <li><strong>Progesterone:</strong> meaningful in the luteal phase. Low luteal progesterone confirms anovulation, one of the earliest perimenopausal changes and a common driver of heavy periods, poor sleep and mood instability.</li>
          <li><strong>Prolactin:</strong> elevated prolactin suppresses FSH and LH, disrupts ovarian function and produces symptoms that precisely mimic perimenopause, including irregular cycles, low libido and mood changes. Must be ruled out.</li>
          <li><strong>SHBG (Sex Hormone Binding Globulin):</strong> determines how much testosterone and oestradiol is biologically active. High SHBG leaves total testosterone normal while free testosterone is functionally low, affecting energy, drive and mood.</li>
          <li><strong>Testosterone (total + free):</strong> frequently low in women over 40 and almost never requested in standard GP panels. Low testosterone in women causes fatigue, low drive, cognitive changes and difficulty maintaining muscle. The hormone most directly relevant to libido.</li>
          <li><strong>Thyroid (TSH, FT3, FT4 + TPO antibodies):</strong> thyroid dysfunction is 5 to 8 times more common in women than men and peaks during the perimenopausal decade. Subclinical hypothyroidism produces symptoms indistinguishable from perimenopause. TPO antibodies identify autoimmune thyroid disease before TSH becomes abnormal.</li>
          <li><strong>Lipoprotein(a):</strong> rises in approximately 60% of women during perimenopause. Genetically determined and hormonally modulated. A high Lp(a) carries significant lifetime cardiovascular risk that standard cholesterol tests will not detect.</li>
          <li><strong>Fasting insulin + HbA1c:</strong> insulin resistance worsens with oestrogen decline. This is the primary metabolic mechanism behind perimenopausal weight gain, particularly abdominal. High fasting insulin drives hormonal disruption and is the most commonly missed metabolic driver in this age group.</li>
          <li><strong>Vitamin D:</strong> deficiency is extremely common and worsens fatigue, mood and bone turnover, all of which worsen in perimenopause.</li>
        </ul>

        <h2 className="cg" style={sectionHeading}>Why a normal reference range is not the same as a normal result</h2>
        <p style={paragraph}>
          Laboratory reference ranges for sex hormones are built for the general population and treat menstrual cycle stage as a category, not a continuum. An oestradiol of 180 pmol/L sits within the follicular-phase reference range. But if the same woman has an FSH of 22 IU/L, low luteal progesterone, is sleeping poorly and having cycle changes, the clinical interpretation is perimenopause with declining ovarian reserve, not a normal hormonal picture.
        </p>
        <p style={paragraph}>
          The pattern across markers carries the clinical meaning. No single value does. This is why GP review is included as standard: results are interpreted in the context of your symptoms and cycle stage, not compared against a population average.
        </p>

        <h2 className="cg" style={sectionHeading}>Who should consider this panel</h2>
        <ul className="chk">
          <li><strong>Women in their late 30s to 50s</strong> with cycle changes, irregular periods, heavier bleeding or spotting.</li>
          <li><strong>Women experiencing fatigue, poor sleep, night sweats or hot flushes</strong> who have been told their blood tests are normal.</li>
          <li><strong>Women with unexplained low mood, anxiety or cognitive changes,</strong> particularly when new or worsening over the past 12 to 24 months.</li>
          <li><strong>Women with low libido, vaginal dryness or difficulty maintaining muscle.</strong> Testosterone deficiency is consistently under-investigated in this group.</li>
          <li><strong>Women with a family history of early cardiovascular disease.</strong> Lp(a) status matters most before hormonal transition accelerates vascular risk.</li>
          <li><strong>Women with PCOS</strong> to establish the current hormonal and metabolic baseline, which shifts significantly across the reproductive lifespan.</li>
          <li><strong>Women considering HRT.</strong> A baseline hormonal panel before starting hormone therapy allows changes over time to be tracked meaningfully.</li>
        </ul>

        <div style={callout}>
          <p style={{ fontWeight: 700, color: "var(--fo)", marginBottom: 6 }}>Is It My Hormones? Panel · £375</p>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.75 }}>
            Oestradiol, FSH, LH, Progesterone, Prolactin, Testosterone (total, with free testosterone calculated from SHBG), SHBG, Thyroid (TSH, FT3, FT4 + TPO antibodies), Lp(a), Fasting Insulin, HbA1c, Vitamin D<br />
            GP-reviewed written report with personalised clinical interpretation. No GP referral needed. Results in 5 working days.
          </p>
        </div>

        {/* Related tests */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,.08)", paddingTop: 24, marginTop: 8 }}>
          <p style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--go)", marginBottom: 16 }}>Related Tests</p>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { href: "/blood-tests/mens-testosterone", label: "Men's Testosterone & Hormone Panel", note: "£325" },
              { href: "/blood-tests/fatigue-energy", label: "Fatigue & Energy Deep Screen", note: "£249" },
              { href: "/blood-tests/lipoprotein-a", label: "Lipoprotein(a) Blood Test", note: "From £795" },
              { href: "/blood-tests/fasting-insulin", label: "Fasting Insulin Test", note: "From £249" },
              { href: "/assessments", label: "View All Panels & Pricing", note: "Assessments" },
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
