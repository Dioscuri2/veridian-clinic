"use client";
import { useState } from "react";
import { FONTS, CSS } from "@/components/globalStyles";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const plans = [
 {
 name: "Metabolic Discovery",
 price: "£97",
 cadence: "Focused starting point",
 tier: "discovery",
 blurb: "A focused clinical discovery consultation to understand your symptoms, goals, family history and likely metabolic blind spots then recommend the right next diagnostic step.",
 feats: [
 "30-minute clinical discovery consultation",
 "Review of symptoms, weight, energy, sleep and family history",
 "Early risk direction on likely missing-link markers",
 "Written next-step recommendation",
 "Nationwide virtual delivery",
 ],
 cta: "Book Your Appointment",
 feat: false,
 right_for: "Right for you if you want expert metabolic direction before choosing a full assessment.",
 },
 {
 name: "Veridian Baseline",
 price: "£595",
 cadence: "Core assessment",
 tier: "baseline",
 blurb: "A longevity-focused baseline audit revealing the most actionable metabolic drivers of decline with two clinical consultations, advanced biomarker testing, and a 14-day CGM to capture what blood tests alone can't show.",
 feats: [
 "Consultation 1 initial clinical session: full history, goal-mapping and metabolic risk review",
 "Advanced panel: HbA1c, fasting insulin, ApoB, Lp(a), liver, kidney, inflammation and more",
 "14-day Lingo CGM personal glucose pattern analysis",
 "Consultation 2 results reviewed and explained in full with Dr Taiwo",
 "Personalised written clinical action plan with prioritised next steps",
 ],
 cta: "Book Veridian Baseline",
 feat: true,
 right_for: "Right for you if you want high-clarity answers on the markers most likely to explain drifting energy, weight and vascular risk with two dedicated clinical sessions to act on them.",
 },
 {
 name: "12-Week Metabolic Reset",
 price: "£1,895",
 cadence: "Structured intervention",
 tier: "programme",
 blurb: "A structured reset for patients who need guided implementation, accountability and follow-through not just a report.",
 feats: [
 "Everything in the Veridian Baseline",
 "Second CGM cycle extended glucose monitoring over a further 14 days",
 "Fortnightly coaching support",
 "Clinical review via partner providers where indicated",
 "Personalised nutrition, movement and recovery protocol",
 "End-of-programme review and forward plan",
 ],
 cta: "Apply for Reset",
 feat: false,
 right_for: "Right for you if metabolic dysfunction is already affecting how you feel and you want a supervised path back to control.",
 },
 {
 name: "Executive Healthspan",
 price: "Coming Soon",
 cadence: "Highest-touch pathway",
 tier: "executive",
 blurb: "A premium, high-touch pathway for leaders who want deeper review, broader oversight and an ongoing preventive strategy tailored to performance and longevity.",
 feats: [
 "Expanded physician oversight and strategic review",
 "Broader diagnostics and personalised sequencing",
 "Priority access and continuity planning",
 "Integrated longevity risk review",
 "Tailored implementation support",
 "Suitable for complex, high-demand lifestyles",
 ],
 cta: "Join Waitlist",
 feat: false,
 right_for: "Right for you if you want a premium healthspan strategy rather than a one-off assessment.",
 comingSoon: true,
 },
];

const comparisonRows = [
 { feature: "Clinical Consultation", discovery: true, baseline: true, programme: true, executive: true },
 { feature: "HbA1c, fasting glucose, fasting insulin", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "ApoB + full lipid profile", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "Homocysteine", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "ALT / AST", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "hs-CRP", discovery: false, baseline: true, programme: true, executive: true },
 { feature: "CGM cycle (14-day)", discovery: false, baseline: true, programme: "2nd cycle", executive: true },
 { feature: "Fortnightly coaching", discovery: false, baseline: false, programme: true, executive: true },
 { feature: "GP-led clinical review where indicated", discovery: false, baseline: false, programme: true, executive: true },
 { feature: "Written action plan", discovery: true, baseline: true, programme: true, executive: true },
 { feature: "Priority / premium pathway", discovery: false, baseline: false, programme: false, executive: true },
];

const bloodPanels = [
  {
    name: "Energy Screen",
    subtitle: "The Fatigue & Thyroid Audit",
    price: "£195",
    tag: "Entry Level",
    tagColor: "var(--sl2)",
    description: "A targeted panel covering the most common hidden drivers of fatigue, weight plateau and brain fog the markers your GP rarely checks together in a single screen.",
    markers: [
      "Full Blood Count (FBC)",
      "Thyroid: TSH, FT3, FT4 + TPO antibodies",
      "Fasting Insulin + C-Peptide",
      "HbA1c + Fasting Glucose",
      "Iron Status + Ferritin",
      "Vitamin B12, Folate, Vitamin D",
      "hs-CRP (inflammation)",
      "Kidney function (eGFR, Creatinine)",
    ],
    youGet: "GP-reviewed digital report with written clinical interpretation not just reference ranges. Includes a clear recommendation for what to do next.",
    href: "/book?tier=metabolic-screen",
    featured: false,
  },
  {
    name: "Metabolic Baseline",
    subtitle: "The Cardiovascular & Metabolic Deep Dive",
    price: "£595",
    tag: "Most Popular",
    tagColor: "var(--go)",
    description: "A comprehensive audit revealing cardiovascular risk, insulin load and the liver/hormonal drivers of weight gain and metabolic ageing most of which routine NHS panels miss entirely.",
    markers: [
      "Everything in the Energy Screen",
      "ApoB + full cardiovascular risk scoring",
      "Apolipoprotein A-I + Apolipoprotein E",
      "Lipoprotein (a) + Small dense LDL",
      "Adiponectin the fat-cell hormone that tracks insulin sensitivity",
      "Liver health: ALT, AST, GGT",
      "Uric acid + advanced kidney markers",
      "14-day Lingo CGM glucose patterns, meal response, metabolic flexibility",
      "60+ data points in total",
    ],
    youGet: "Full metabolic blood panel + 14-day Lingo CGM + two GP consultations (initial clinical session and blood results review) + personalised written action plan with prioritised next steps.",
    href: "/book?tier=baseline",
    featured: true,
  },
  {
    name: "Longevity Panel",
    subtitle: "The Biological Age Audit",
    price: "£795",
    tag: "Premium",
    tagColor: "var(--fo)",
    description: "The most complete picture of your biological age trajectory 150+ data points spanning hormonal health, cardiovascular risk, gut integrity, Omega-3 status and pancreatic function.",
    markers: [
      "Everything in the Metabolic Baseline",
      "Full hormonal profile: Testosterone, SHBG, Oestradiol, FSH, LH, Progesterone",
      "Omega-3 index + Omega-6:3 ratio",
      "Gut integrity: H. pylori, Anti-TTG antibodies",
      "Pancreatic health: Amylase, Lipase",
      "Total Antioxidant Status",
      "150+ data points in total",
    ],
    youGet: "Premium longevity blood panel + two GP consultations (initial assessment + results deep-dive) + comprehensive longevity report with biological age assessment and a personalised optimisation strategy.",
    href: "/book?tier=longevity-panel",
    featured: false,
  },
];

const targetedPanels = [
  {
    name: "Is It My Hormones?",
    subtitle: "Women's Hormonal Deep Dive",
    price: "£375",
    tag: "Women's Health",
    tagColor: "#9d5c8a",
    guideBonus: "Perimenopause Reset Guide (worth £19.99, included free)",
    description: "You're exhausted, your mood has shifted, you're not sleeping, and you've been told your blood tests are normal. This panel measures what standard GP panels don't: the full hormonal picture behind perimenopause, thyroid dysfunction, and the metabolic changes that make these symptoms worse.",
    markers: [
      "Full female hormones: Oestradiol, FSH, LH, Progesterone, Prolactin, SHBG",
      "Testosterone (total + free) for energy, mood and drive, rarely tested in women",
      "Thyroid: TSH, FT3, FT4 + TPO antibodies including autoimmune thyroid disease",
      "Cortisol stress and adrenal contribution to hormonal symptoms",
      "Lipoprotein (a) rises in 60% of women during hormonal transition, missed by standard cholesterol tests",
      "Fasting insulin + HbA1c the metabolic driver of perimenopausal weight gain",
      "Vitamin D",
    ],
    youGet: "GP-reviewed written interpretation of your full hormonal picture, with a clear explanation of what your results mean for your specific symptoms not just reference ranges.",
    href: "/book?tier=womens-hormones",
  },
  {
    name: "Running on Empty",
    subtitle: "Men's Energy & Hormone Panel",
    price: "£325",
    tag: "Men's Health",
    tagColor: "#3d7ab5",
    description: "Low drive, poor recovery, foggy thinking, a body that won't respond the way it used to. This panel tests the hormonal and metabolic drivers that most GPs don't screen for together.",
    markers: [
      "Total + Free Testosterone the functional metric GPs rarely test",
      "SHBG, LH, FSH, Prolactin, DHEA-S",
      "Cortisol adrenal function and stress axis",
      "Lipoprotein (a) cardiovascular risk often missed in men",
      "Fasting insulin + HbA1c",
      "Full Blood Count + hs-CRP",
    ],
    youGet: "GP-reviewed interpretation of your hormonal and metabolic markers, with a written clinical summary and a clear next-step recommendation tailored to your results.",
    href: "/book?tier=mens-testosterone",
  },
  {
    name: "What Your Cholesterol Test Missed",
    subtitle: "Advanced Cardiovascular Risk Panel",
    price: "£349",
    tag: "Cardiovascular",
    tagColor: "#b04040",
    description: "A normal cholesterol result does not mean a normal cardiovascular risk. This panel reveals the markers your GP rarely checks and that research shows matter far more than total cholesterol.",
    markers: [
      "ApoB the most predictive cardiovascular risk marker",
      "Lipoprotein (a) genetic risk factor missed by standard cholesterol tests",
      "Small dense LDL the dangerous LDL sub-fraction",
      "Homocysteine endothelial damage and inflammation",
      "hs-CRP systemic inflammatory load",
      "Full lipid profile + ApoA-I",
      "Fasting insulin + HbA1c metabolic driver of vascular risk",
    ],
    youGet: "GP-reviewed cardiovascular risk summary with a written interpretation of your ApoB, Lp(a) and inflammatory markers and a clear recommendation on what to do next.",
    href: "/book?tier=cardiovascular-risk",
  },
  {
    name: "Tired of Being Told You're Fine",
    subtitle: "Energy & Fatigue Deep Screen",
    price: "£249",
    tag: "Energy & Fatigue",
    tagColor: "#8a6a25",
    guideBonus: "Metabolic Reset Guide (worth £19.99, included free)",
    description: "Persistent fatigue, brain fog and low energy with a normal GP blood test result every time. This panel goes beyond standard screening to find what those tests miss.",
    markers: [
      "Full Blood Count anaemia, immune load",
      "Thyroid: TSH, FT3, FT4 + TPO antibodies including subclinical dysfunction",
      "Ferritin + full iron studies",
      "Vitamin B12, Folate, Vitamin D",
      "Fasting insulin the commonest missed energy driver",
      "Uric acid linked to mitochondrial fatigue",
      "hs-CRP + kidney function",
    ],
    youGet: "GP-reviewed written report identifying which markers are likely driving your fatigue with clinical interpretation and actionable next steps.",
    href: "/book?tier=fatigue-energy",
  },
  {
    name: "Why Won't The Weight Budge?",
    subtitle: "Metabolic Weight Resistance Panel",
    price: "£199",
    tag: "Weight & Metabolism",
    tagColor: "#4a7a40",
    guideBonus: "Metabolic Reset Guide (worth £19.99, included free)",
    description: "You're eating well. You're moving. But the weight won't shift. This panel identifies the metabolic blockers insulin resistance, hormonal imbalance and hidden inflammation that make fat loss physiologically difficult.",
    markers: [
      "Fasting insulin + HbA1c + HOMA-IR (insulin resistance index)",
      "Uric acid linked to metabolic syndrome and fat-loss resistance",
      "Lipoprotein (a) elevated in metabolic dysfunction",
      "Adiponectin fat-cell signalling and insulin sensitivity",
      "TSH thyroid contribution to weight regulation",
      "Liver markers: ALT, AST",
      "Fasting lipid profile",
    ],
    youGet: "GP-reviewed metabolic interpretation identifying why your body is resisting fat loss with a written, prioritised recommendation for what to address first.",
    href: "/book?tier=metabolic-weight",
  },
  {
    name: "The Optimiser's Baseline",
    subtitle: "Performance & Longevity Panel",
    price: "£449",
    tag: "Performance",
    tagColor: "var(--fo)",
    description: "You track your training, your sleep, your HRV. But if you don't know your IGF-1, your ApoB, your cortisol, your Lp(a) or whether your insulin is quietly driving inflammation, you're optimising blind. This panel gives you the full picture, across longevity, cardiovascular risk, hormones, body composition and organ safety.",
    markers: [
      "IGF-1 growth hormone and biological ageing axis, almost never tested in standard care",
      "ApoB + Lp(a) + sdLDL + ApoA-I the cardiovascular markers that matter more than total cholesterol",
      "Adiponectin fat-cell signalling and insulin sensitivity",
      "Fasting insulin + HbA1c metabolic foundation of performance and recovery",
      "Cortisol (AM) + DHEA-S adrenal function and recovery capacity",
      "Total + Free Testosterone, SHBG, LH, FSH the complete hormonal axis",
      "Cystatin C + Red Cell Magnesium + Uric Acid precision organ and metabolic markers",
      "Full Blood Count + Liver (ALT/AST/GGT) + Kidney + eGFR complete organ safety baseline",
      "hs-CRP systemic inflammation load",
    ],
    youGet: "GP-reviewed baseline report across longevity, cardiovascular risk, hormonal, body composition and organ-safety markers. A documented clinical benchmark to return to each year.",
    href: "/book?tier=optimiser-baseline",
  },
];

const collectionMethods = [
  { icon: "📦", label: "Post to your door", desc: "We send a home collection kit. Fingerprick sample taken at your convenience, returned by pre-paid post." },
  { icon: "📍", label: "Walk-in near you", desc: "Book at a collection centre near you including Holland & Barrett and Superdrug locations nationwide." },
  { icon: "🩺", label: "Nurse home visit", desc: "A trained phlebotomist visits your home for a venous draw. Ideal for larger panels." },
];

function BloodPanelAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: "grid", gap: 2 }}>
      {bloodPanels.map((panel, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{
            border: panel.featured
              ? "1.5px solid var(--go)"
              : "1px solid rgba(0,0,0,.09)",
            background: panel.featured
              ? "var(--fo)"
              : isOpen ? "var(--iv)" : "var(--wh)",
            transition: "background .2s",
          }}>
            {/* Header row always visible */}
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "20px 24px",
                background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
              }}
              aria-expanded={isOpen}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{
                    fontSize: ".62rem", fontWeight: 700, letterSpacing: ".12em",
                    textTransform: "uppercase", color: panel.tagColor,
                    background: panel.featured ? "rgba(200,168,75,.18)" : "rgba(0,0,0,.06)",
                    padding: "2px 8px",
                  }}>{panel.tag}</span>
                  {panel.featured && (
                    <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: "var(--go)", color: "var(--fo)", padding: "2px 8px" }}>
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  <span className="cg" style={{
                    fontSize: "1.2rem", fontWeight: 500,
                    color: panel.featured ? "var(--iv)" : "var(--sl)",
                  }}>{panel.name}</span>
                  <span style={{
                    fontSize: ".82rem",
                    color: panel.featured ? "rgba(246,241,232,.55)" : "var(--sl3)",
                    letterSpacing: ".03em",
                  }}>{panel.subtitle}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                <span className="cg" style={{
                  fontSize: "1.5rem", fontWeight: 600,
                  color: panel.featured ? "var(--go)" : "var(--fo)",
                }}>{panel.price}</span>
                <span style={{
                  fontSize: "1rem",
                  color: panel.featured ? "var(--go)" : "var(--sl3)",
                  transition: "transform .2s",
                  display: "inline-block",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}>▾</span>
              </div>
            </button>

            {/* Expanded content */}
            {isOpen && (
              <div style={{ padding: "0 24px 28px" }}>
                <p style={{ fontSize: ".9rem", color: panel.featured ? "rgba(246,241,232,.72)" : "var(--sl2)", lineHeight: 1.9, marginBottom: 24, borderTop: panel.featured ? "1px solid rgba(246,241,232,.12)" : "1px solid rgba(0,0,0,.07)", paddingTop: 20 }}>
                  {panel.description}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))", gap: 24, marginBottom: 24 }}>
                  {/* Markers */}
                  <div>
                    <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 12 }}>
                      What&apos;s tested
                    </p>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 7 }}>
                      {panel.markers.map((m, mi) => (
                        <li key={mi} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: ".85rem", color: panel.featured ? "rgba(246,241,232,.78)" : "var(--sl2)", lineHeight: 1.5 }}>
                          <span style={{ color: "var(--go)", flexShrink: 0, marginTop: 2 }}>✓</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right column: what you get + collection options */}
                  <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
                    {/* What you get back */}
                    <div style={{ padding: "14px 16px", background: panel.featured ? "rgba(246,241,232,.07)" : "var(--iv2)", borderLeft: "3px solid var(--go)" }}>
                      <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 8 }}>
                        What you get back
                      </p>
                      <p style={{ fontSize: ".85rem", color: panel.featured ? "rgba(246,241,232,.72)" : "var(--sl2)", lineHeight: 1.8 }}>
                        {panel.youGet}
                      </p>
                    </div>

                    {/* Collection options */}
                    <div>
                      <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 10 }}>
                        How your sample is collected
                      </p>
                      <div style={{ display: "grid", gap: 8 }}>
                        {collectionMethods.map((method, mi) => (
                          <div key={mi} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", background: panel.featured ? "rgba(246,241,232,.07)" : "var(--wh)", border: panel.featured ? "1px solid rgba(246,241,232,.1)" : "1px solid rgba(0,0,0,.07)" }}>
                            <span style={{ fontSize: "1rem", flexShrink: 0, lineHeight: 1.4 }}>{method.icon}</span>
                            <div>
                              <p style={{ fontSize: ".78rem", fontWeight: 600, color: panel.featured ? "rgba(246,241,232,.9)" : "var(--sl)", marginBottom: 2 }}>{method.label}</p>
                              <p style={{ fontSize: ".76rem", color: panel.featured ? "rgba(246,241,232,.55)" : "var(--sl3)", lineHeight: 1.6 }}>{method.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: ".72rem", color: panel.featured ? "rgba(246,241,232,.4)" : "var(--sl3)", lineHeight: 1.6, marginTop: 10 }}>
                        Processed by a nationally accredited UK pathology laboratory with centres across the country. Results typically within 48-72 hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link href={panel.href} className={`btn ${panel.featured ? "btn-go" : "btn-fo"}`} style={{ flex: "1 1 200px" }}>
                    Book {panel.name} {panel.price} →
                  </Link>
                  <Link href="/book?tier=discovery" className={`btn ${panel.featured ? "btn-ol-lt" : "btn-ol"}`} style={{ flex: "1 1 200px" }}>
                    Speak to a GP first →
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TargetedPanelAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: "grid", gap: 2 }}>
      {targetedPanels.map((panel, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{
            border: "1px solid rgba(0,0,0,.09)",
            background: isOpen ? "var(--iv)" : "var(--wh)",
            transition: "background .2s",
          }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "20px 24px",
                background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
              }}
              aria-expanded={isOpen}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{
                    fontSize: ".62rem", fontWeight: 700, letterSpacing: ".12em",
                    textTransform: "uppercase", color: panel.tagColor,
                    background: "rgba(0,0,0,.06)", padding: "2px 8px",
                  }}>{panel.tag}</span>
                  {(panel as { guideBonus?: string }).guideBonus && (
                    <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#145226", background: "rgba(20,82,38,.1)", padding: "2px 8px" }}>
                      Free guide included
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  <span className="cg" style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--sl)" }}>{panel.name}</span>
                  <span style={{ fontSize: ".82rem", color: "var(--sl3)", letterSpacing: ".03em" }}>{panel.subtitle}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                <span className="cg" style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--fo)" }}>{panel.price}</span>
                <span style={{
                  fontSize: "1rem", color: "var(--sl3)", transition: "transform .2s",
                  display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}>▾</span>
              </div>
            </button>

            {isOpen && (
              <div style={{ padding: "0 24px 28px" }}>
                <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 24, borderTop: "1px solid rgba(0,0,0,.07)", paddingTop: 20 }}>
                  {panel.description}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))", gap: 24, marginBottom: 24 }}>
                  <div>
                    <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 12 }}>
                      What&apos;s tested
                    </p>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 7 }}>
                      {panel.markers.map((m, mi) => (
                        <li key={mi} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: ".85rem", color: "var(--sl2)", lineHeight: 1.5 }}>
                          <span style={{ color: "var(--go)", flexShrink: 0, marginTop: 2 }}>✓</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
                    <div style={{ padding: "14px 16px", background: "var(--iv2)", borderLeft: "3px solid var(--go)" }}>
                      <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 8 }}>
                        What you get back
                      </p>
                      <p style={{ fontSize: ".85rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                        {panel.youGet}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 10 }}>
                        How your sample is collected
                      </p>
                      <div style={{ display: "grid", gap: 8 }}>
                        {collectionMethods.map((method, mi) => (
                          <div key={mi} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", background: "var(--wh)", border: "1px solid rgba(0,0,0,.07)" }}>
                            <span style={{ fontSize: "1rem", flexShrink: 0, lineHeight: 1.4 }}>{method.icon}</span>
                            <div>
                              <p style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--sl)", marginBottom: 2 }}>{method.label}</p>
                              <p style={{ fontSize: ".76rem", color: "var(--sl3)", lineHeight: 1.6 }}>{method.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: ".72rem", color: "var(--sl3)", lineHeight: 1.6, marginTop: 10 }}>
                        Processed by a nationally accredited UK pathology laboratory. Results typically within 48-72 hours.
                      </p>
                    </div>
                  </div>
                </div>
                {(panel as { guideBonus?: string }).guideBonus && (
                  <div style={{ padding: "12px 16px", background: "rgba(20,82,38,.06)", borderLeft: "3px solid #145226", marginBottom: 16 }}>
                    <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#145226", margin: "0 0 4px" }}>Also included free</p>
                    <p style={{ fontSize: ".84rem", color: "var(--sl2)", margin: 0, lineHeight: 1.7 }}>{(panel as { guideBonus?: string }).guideBonus}</p>
                  </div>
                )}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link href={panel.href} className="btn btn-fo" style={{ flex: "1 1 200px" }}>
                    Book {panel.name} {panel.price} →
                  </Link>
                  <Link href="/book?tier=discovery" className="btn btn-ol" style={{ flex: "1 1 200px" }}>
                    Speak to a GP first →
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Check({ val }: { val: boolean | string }) {
 if (typeof val === "string") return <span style={{ fontSize: ".82rem", fontWeight: 500, color: "var(--fo)" }}>{val}</span>;
 return val
 ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="var(--fo)"/><path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="var(--go2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
 : <span style={{ fontSize: "1rem", color: "var(--sl3)", opacity: .4 }}> </span>;
}

export default function AssessmentsPage() {
 return (
 <>
 <style>{FONTS + CSS}</style>
 <Navigation />
 <main style={{ paddingTop: "var(--nav-h)" }}>
 <section className="sec bg-iv" style={{ textAlign: "center", paddingBottom: 40 }}>
 <div className="wrap" style={{ maxWidth: 860 }}>
 <p className="lbl a1">Assessments & Pricing</p>
 <div className="rule rule-c a1" />
 <h1 className="cg a2" style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15 }}>
 Choose the right level of insight.
 <br /><em style={{ fontStyle: "italic", color: "var(--fo)" }}>From first clarity to full metabolic reset.</em>
 </h1>
 <p className="a3" style={{ fontSize: "clamp(1rem,2.4vw,1.12rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 700, margin: "20px auto 0" }}>
 Every pathway is clinically structured and designed to surface the markers that standard screening often misses the hidden drivers behind low energy, weight gain, poor sleep and early vascular risk.
 </p>
 <div className="badge-row a4" style={{ justifyContent: "center", marginTop: 24 }}>
 <span className="badge"><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1L2 3.8v3.2c0 2.4 1.9 4.5 4.5 5.2 2.6-.7 4.5-2.8 4.5-5.2V3.8z" fill="var(--fo)" stroke="var(--go)" strokeWidth=".6"/><path d="M4.5 6.5l1.5 1.5 2.5-2.5" stroke="var(--go)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>GP-Led · Registered via ThanksDoc</span>
 <span className="badge">Longevity Focus</span>
 <span className="badge">Virtual UK Care</span>
 <span className="badge">Actionable Marker Focus</span>
 </div>
 </div>
 </section>
 {/* Blood Test Panels anchor target for quiz "strong" band CTA */}
 <section id="metabolic-panel" className="sec bg-wh" style={{ paddingTop: 56, paddingBottom: 56 }}>
   <div className="wrap" style={{ maxWidth: 860 }}>
     <div className="sh text-center">
       <p className="lbl">Veridian Blood Panels</p>
       <div className="rule rule-c" />
       <h2 className="sh-title">GP-analysed blood tests. Not just numbers a clinical interpretation.</h2>
       <p className="sh-body" style={{ maxWidth: 680 }}>
         Every panel is processed by a nationally accredited UK pathology laboratory and reviewed by a Veridian GP. You receive a written clinical interpretation not a PDF of reference ranges. Tap any panel to see what&apos;s included.
       </p>
     </div>
     <BloodPanelAccordion />
     <p style={{ fontSize: ".76rem", color: "var(--sl3)", textAlign: "center", lineHeight: 1.7, marginTop: 20 }}>
       Not a substitute for NHS care. Results typically available within 48-72 hours of sample receipt.
     </p>
   </div>
 </section>

 {/* Targeted Blood Panels */}
 <section id="targeted-panels" className="sec bg-wh" style={{ paddingTop: 56, paddingBottom: 56 }}>
   <div className="wrap" style={{ maxWidth: 860 }}>
     <div className="sh text-center">
       <p className="lbl">Targeted Blood Panels</p>
       <div className="rule rule-c" />
       <h2 className="sh-title">Test for your specific symptoms not just a general screen.</h2>
       <p className="sh-body" style={{ maxWidth: 680 }}>
         Each panel is built around a specific clinical question the one you&apos;ve been asking but haven&apos;t been given a straight answer to. Tested at a nationally accredited UK laboratory and reviewed by a Veridian GP.
       </p>
     </div>
     <TargetedPanelAccordion />
     <p style={{ fontSize: ".76rem", color: "var(--sl3)", textAlign: "center", lineHeight: 1.7, marginTop: 20 }}>
       Blood test only GP-reviewed written report included. Add a GP Discovery Call (£195) if you&apos;d like clinical interpretation by video.
     </p>
   </div>
 </section>

 <section className="sec bg-wh" style={{ paddingTop: 20 }}><div className="wrap"><div className="g4">{plans.map(p => (<div key={p.name} className={`card${p.feat ? " card-featured" : ""}`} style={{ position: "relative", display: "flex", flexDirection: "column" }}>{p.feat && <span className="plan-pill">Recommended</span>}<p className="plan-cadence">{p.cadence}</p><h2 className="cg" style={{ fontSize: "1.45rem", fontWeight: 500, lineHeight: 1.2, color: p.feat ? "var(--iv)" : "var(--sl)", marginBottom: 16 }}>{p.name}</h2><span className="plan-price">{p.price}</span><p style={{ fontSize: ".9rem", lineHeight: 1.9, color: p.feat ? "rgba(246,241,232,.72)" : "var(--sl2)", margin: "16px 0 20px" }}>{p.blurb}</p><div style={{ padding: "14px 16px", background: p.feat ? "rgba(246,241,232,.07)" : "var(--iv)", borderLeft: `3px solid ${p.feat ? "var(--go)" : "var(--fo)"}`, marginBottom: 20 }}><p style={{ fontSize: ".8rem", fontStyle: "italic", color: p.feat ? "rgba(246,241,232,.75)" : "var(--sl2)", lineHeight: 1.75 }}>{p.right_for}</p></div><ul className="chk" style={{ marginBottom: 28, flexGrow: 1 }}>{p.feats.map(f => <li key={f}>{f}</li>)}</ul>{p.comingSoon ? <Link href="/executive-waitlist" className={`btn btn-full ${p.feat ? "btn-go" : "btn-ol"}`}>{p.cta} →</Link> : <Link href={`/book?tier=${p.tier}`} className={`btn btn-full ${p.feat ? "btn-go" : "btn-fo"}`}>{p.cta} →</Link>}</div>))}</div></div></section>
 <section className="sec bg-iv"><div className="wrap" style={{ maxWidth: 980 }}><div className="sh text-center"><p className="lbl">Baseline Marker List</p><div className="rule rule-c" /><h2 className="sh-title">What the Veridian Baseline is designed to surface</h2><p className="sh-body" style={{ fontSize: "1rem", maxWidth: 760 }}>This is the core value proposition: we focus on the markers most likely to reveal early metabolic decline and future vascular risk, not just whether a routine panel says you are “normal”.</p></div><div className="g2"><div className="card"><p className="lbl" style={{ marginBottom: 14 }}>Exact markers visible</p><ul className="chk"><li>HbA1c</li><li>Fasting glucose</li><li>Fasting insulin</li><li>ApoB</li><li>Homocysteine</li><li>Full lipid profile</li><li>ALT</li><li>AST</li><li>hs-CRP</li></ul></div><div className="card"><p className="lbl" style={{ marginBottom: 14 }}>What you get back</p><ul className="chk"><li>Clinical interpretation of what matters now</li><li>Explanation of how your markers connect to weight, energy and cardiovascular risk</li><li>Clear written action plan</li><li>Advice on whether you need further testing, CGM or structured follow-up</li><li>A practical next-step pathway rather than isolated lab numbers</li></ul></div></div></div></section>
 <section className="sec bg-wh"><div className="wrap"><div className="sh text-center"><p className="lbl">Side by Side</p><div className="rule rule-c" /><h2 className="sh-title">What’s included in each pathway</h2></div><div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}><thead><tr><th style={{ textAlign: "left", padding: "12px 16px", fontSize: ".74rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)", borderBottom: "2px solid var(--iv3)" }}>Feature</th>{["Discovery\n£195", "Baseline\n£595", "Reset\n£1,895", "Executive\nComing Soon"].map((h, i) => (<th key={i} style={{ textAlign: "center", padding: "12px 16px", fontSize: ".74rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: i === 1 ? "var(--fo)" : "var(--sl3)", borderBottom: `2px solid ${i === 1 ? "var(--go)" : "var(--iv3)"}`, whiteSpace: "pre-line" }}>{h}</th>))}</tr></thead><tbody>{comparisonRows.map((row, idx) => (<tr key={row.feature} style={{ background: idx % 2 === 0 ? "var(--wh)" : "var(--iv)" }}><td style={{ padding: "13px 16px", fontSize: ".88rem", color: "var(--sl2)" }}>{row.feature}</td>{[row.discovery, row.baseline, row.programme, row.executive].map((v, i) => (<td key={i} style={{ padding: "13px 16px", textAlign: "center" }}><Check val={v as boolean | string} /></td>))}</tr>))}</tbody></table></div></div></section>
 <section className="bg-fo" style={{ padding: "60px 24px" }}><div className="wrap" style={{ maxWidth: 860, textAlign: "center" }}><p className="lbl" style={{ color: "var(--go2)" }}>The structured intervention pathway</p><div className="rule rule-c" style={{ background: "var(--go)" }} /><h2 className="cg" style={{ fontSize: "clamp(1.9rem,4vw,2.9rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.25, marginBottom: 16 }}>12-Week Metabolic Reset £1,895</h2><p style={{ fontSize: ".97rem", color: "rgba(246,241,232,.68)", lineHeight: 1.95, marginBottom: 28, maxWidth: 640, margin: "0 auto 28px" }}>For people who already know something is off and want accountability, structured follow-through and integrated clinical support not just another information pack.</p><div className="g3" style={{ textAlign: "left" }}><div className="card-fo"><p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>Includes</p><ul className="chk"><li>Everything in the Veridian Baseline</li><li>Second CGM cycle extended glucose monitoring</li><li>Fortnightly coaching touchpoints</li></ul></div><div className="card-fo"><p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>Clinical oversight</p><ul className="chk"><li>Clinical review via partner providers where indicated</li><li>Programme adaptation based on response</li><li>Medication or therapy review where clinically appropriate</li></ul></div><div className="card-fo"><p className="lbl" style={{ color: "var(--go2)", marginBottom: 12 }}>Outcome focus</p><ul className="chk"><li>Better glucose stability and energy control</li><li>More consistent adherence and behaviour change</li><li>Clear next-stage forward plan</li></ul></div></div><div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}><Link href="/metabolic-turnaround" className="btn btn-go">Explore the 90-Day Metabolic Turnaround →</Link><Link href="/book?tier=baseline" className="btn btn-ol-lt">Book Baseline Audit</Link></div></div></section>
 <section className="sec bg-wh"><div className="wrap" style={{ maxWidth: 800, textAlign: "center" }}><p className="lbl">Need help choosing?</p><div className="rule rule-c" /><h2 className="cg" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.25, marginBottom: 16 }}>If you want the highest-value entry point, start with the Baseline.</h2><p style={{ fontSize: ".97rem", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 32, maxWidth: 620, margin: "0 auto 32px" }}>It gives you the clearest early read on metabolic risk and the markers most often missed in routine care with a straightforward clinical plan for what to do next.</p><div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}><Link href="/book?tier=baseline" className="btn btn-fo">Book Baseline Audit →</Link><Link href="/book?tier=discovery" className="btn btn-ol">Start with Discovery</Link></div></div></section>
 </main>
 <Footer />
 </>
 );
}
