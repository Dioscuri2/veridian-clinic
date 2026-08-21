/**
 * SINGLE SOURCE OF TRUTH for Veridian blood panels and programmes.
 *
 * Rules (from the 2026-08-20 growth handover, adapted to verified reality):
 * - Supplier is Randox (ordered via Nexus). Panel codes and trade costs below
 *   were read from the LIVE Nexus catalogue on 2026-08-19 where
 *   `supplier.verified` is true. Do NOT add supplier codes or marker claims
 *   from memory, competitor sites, or old reseller catalogues (the LT843
 *   JUN24 PDF lists markers Randox no longer sells — Leptin, Resistin,
 *   ApoC-II/III).
 * - A panel with `supplier.verified: false` must NOT have its marker list
 *   rendered to patient-facing pages from this file until the Nexus audit
 *   confirms its composition. Prices are still authoritative.
 * - PAYMENTS RULE (Dr Tosin, 2026-08-20): ALL blood-test and service payments
 *   run through ThanksDoc — never build a new Stripe checkout flow for them.
 *   `thanksDocServiceId` is the canonical purchase route; /book redirects to
 *   the ThanksDoc clinic page (NEXT_PUBLIC_THANKSDOC_BOOKING_URL). The
 *   `checkoutTier` field references the LEGACY Stripe tierCatalog only so the
 *   build-time price-drift check keeps old copy honest while it still exists.
 * - Prices are retail GBP. Stripe amounts in app/api/checkout/route.ts must
 *   match `price` here (checked by scripts/check-panels.mjs at build time).
 * - The £30 Randox phlebotomy fee is paid by the patient on the day and is
 *   not Veridian revenue. All GP3-based panels are In Clinic draw only.
 */

export type SupplierOrderLine = {
  /** Randox Nexus catalogue code, e.g. "TBLHSC9_M", "OMEGA_6_3" */
  code: string;
  name: string;
  /** Trade cost in pence, as shown in Nexus "Your Price" */
  tradePence: number;
};

export type SupplierOrder = {
  /** True only when the composition was read from the live Nexus catalogue */
  verified: boolean;
  /** ISO date the composition was last verified against Nexus */
  verifiedOn?: string;
  lines: SupplierOrderLine[];
  notes?: string;
};

export type Panel = {
  slug: string;
  productName: string;
  positioningLine: string;
  /** Retail price in pence */
  pricePence: number;
  /** Route on veridianclinic.com; null if sold via checkout deep-link only */
  landingPage: string | null;
  /** LEGACY Stripe tier id (price-drift check only — do NOT build new Stripe flows) */
  checkoutTier: string | null;
  /** ThanksDoc service id — the CANONICAL payment route. null = service not yet created in ThanksDoc */
  thanksDocServiceId: number | null;
  targetKeyword: string;
  adGroup: string;
  status: "live" | "coming-soon";
  kind: "panel" | "programme" | "consultation";
  /** Female/male order compositions can differ (GP3 asymmetry) */
  supplier: {
    female?: SupplierOrder;
    male?: SupplierOrder;
    unisex?: SupplierOrder;
  };
};

const GBP = (pounds: number) => Math.round(pounds * 100);

export const PANELS: Panel[] = [
  // ── Tier 1 panels ────────────────────────────────────────────────
  {
    slug: "metabolic-baseline",
    productName: "Metabolic Baseline",
    positioningLine: "The Cardiovascular & Metabolic Deep Dive",
    pricePence: GBP(595),
    landingPage: "/assessments",
    checkoutTier: "baseline",
    thanksDocServiceId: null,
    targetKeyword: "metabolic blood test uk",
    adGroup: "Metabolic Blood Test",
    status: "live",
    kind: "panel",
    supplier: {}, // NOT yet audited
  },
  {
    slug: "longevity-panel",
    productName: "Longevity Panel",
    positioningLine: "The Biological Age Audit",
    pricePence: GBP(795),
    landingPage: "/blood-tests/biological-age",
    checkoutTier: "longevity-panel",
    thanksDocServiceId: null,
    targetKeyword: "biological age blood test uk",
    adGroup: "Health MOT",
    status: "live",
    kind: "panel",
    supplier: {
      female: {
        verified: true,
        verifiedOn: "2026-08-19",
        lines: [
          { code: "HSC9F", name: "Advanced GP3 Female", tradePence: GBP(185.9) },
          { code: "OMEGA_6_3", name: "Omega 3 Index", tradePence: GBP(56.5) },
        ],
        notes:
          "HSC9F already contains Adiponectin, FSH, LH, Oestradiol, Progesterone, Prolactin, CA-125, C3, C4. Total trade £242.40.",
      },
      male: {
        verified: true,
        verifiedOn: "2026-08-19",
        lines: [
          { code: "TBLHSC9_M", name: "Advanced GP3 Male (full hormone profile)", tradePence: GBP(185.9) },
          { code: "OMEGA_6_3", name: "Omega 3 Index", tradePence: GBP(56.5) },
        ],
        notes:
          "Use TBLHSC9_M, NOT HSC9M — plain HSC9M has no sex hormones. Do NOT order GP3 + TBLHSC9 together (no deduplication, wastes ~£57). Adiponectin add-on (ADIP £98.10) decision pending with Dr Tosin — if dropped, keep Adiponectin off male-facing copy. H. pylori, Anti-TTG, TAS, amylase, lipase, HbA1c and hs-CRP are already inside GP3 — Nexus greys them out as add-ons.",
      },
    },
  },

  // ── Tier 2 targeted panels ───────────────────────────────────────
  {
    slug: "fatigue-energy",
    productName: "Energy & Fatigue",
    positioningLine: "Tired of Being Told You're Fine",
    pricePence: GBP(249),
    landingPage: "/blood-tests/fatigue-energy",
    checkoutTier: "fatigue-energy",
    thanksDocServiceId: null,
    targetKeyword: "tired all the time blood tests normal",
    adGroup: "Tired Bloods Normal",
    status: "live",
    kind: "panel",
    supplier: {
      unisex: {
        verified: true,
        verifiedOn: "2026-08-21",
        lines: [
          { code: "HSC10", name: "Tired All The Time", tradePence: GBP(86.2) },
          { code: "URIC_ACID", name: "Uric Acid", tradePence: GBP(8.7) },
        ],
        notes:
          "Total trade £94.90 — 61.9% margin at £249. Do NOT add INS (Insulin) or 25OH_VITD (Vitamin D): HSC10 already contains both, and ordering them on top wastes £59.60 per patient.",
      },
    },
  },
  {
    slug: "metabolic-weight",
    productName: "Weight & Metabolism",
    positioningLine: "Why Won't The Weight Budge?",
    pricePence: GBP(199),
    landingPage: "/blood-tests/metabolic-weight",
    checkoutTier: "metabolic-weight",
    thanksDocServiceId: null,
    targetKeyword: "insulin resistance test uk",
    adGroup: "Insulin Resistance",
    status: "live",
    kind: "panel",
    supplier: {}, // NOT yet audited — likely the tightest margin, audit first
  },
  {
    slug: "cardiovascular-risk",
    productName: "Cardiovascular",
    positioningLine: "What Your Cholesterol Test Missed",
    pricePence: GBP(349),
    landingPage: "/blood-tests/cardiovascular-risk",
    checkoutTier: "cardiovascular-risk",
    thanksDocServiceId: null,
    targetKeyword: "apob test uk",
    adGroup: "Metabolic Blood Test",
    status: "live",
    kind: "panel",
    supplier: {}, // NOT yet audited
  },
  {
    slug: "womens-hormones",
    productName: "Women's Health",
    positioningLine: "Is It My Hormones?",
    pricePence: GBP(375),
    landingPage: "/blood-tests/womens-hormones",
    checkoutTier: "womens-hormones",
    thanksDocServiceId: null,
    targetKeyword: "hormone blood test women uk",
    adGroup: "Hormones",
    status: "live",
    kind: "panel",
    supplier: {}, // NOT yet audited
  },
  {
    slug: "mens-testosterone",
    productName: "Men's Health",
    positioningLine: "Running on Empty",
    pricePence: GBP(325),
    landingPage: "/blood-tests/mens-testosterone",
    checkoutTier: "mens-testosterone",
    thanksDocServiceId: null,
    targetKeyword: "testosterone blood test uk",
    adGroup: "Hormones",
    status: "live",
    kind: "panel",
    supplier: {}, // NOT yet audited
  },
  {
    slug: "optimiser-baseline",
    productName: "Performance",
    positioningLine: "The Optimiser's Baseline",
    pricePence: GBP(449),
    landingPage: "/blood-tests/optimiser-baseline",
    checkoutTier: "optimiser-baseline",
    thanksDocServiceId: null,
    targetKeyword: "executive health screening london",
    adGroup: "Health MOT",
    status: "live",
    kind: "panel",
    supplier: {}, // NOT yet audited — HSC8M/F Advanced GP2 (£106.30 trade) is the likely base
  },
  {
    slug: "micronutrient-panel",
    productName: "Micronutrient Panel",
    positioningLine: "The 17-Marker Micronutrient Audit",
    pricePence: GBP(295),
    landingPage: "/micronutrient-test",
    checkoutTier: "micronutrient-panel",
    thanksDocServiceId: 318,
    targetKeyword: "micronutrient blood test uk",
    adGroup: "Micronutrients",
    status: "live",
    kind: "panel",
    supplier: {
      unisex: {
        verified: true,
        verifiedOn: "2026-08-19",
        lines: [
          { code: "RP30", name: "Extended Vitamins & Minerals", tradePence: GBP(131.5) },
          { code: "hsCRP", name: "hs-CRP", tradePence: GBP(14) },
        ],
        notes:
          "Trade £145.50 → 51% margin at £295. Iodine is NOT available from Randox in any form — never claim it. In Clinic draw only; £30 Randox phlebotomy fee on the day.",
      },
    },
  },
  {
    slug: "micronutrient-panel-selenium",
    productName: "Micronutrient Panel + Red Cell Selenium",
    positioningLine: "The Micronutrient Audit, plus selenium status",
    pricePence: GBP(335),
    landingPage: "/micronutrient-test",
    checkoutTier: "micronutrient-panel-selenium",
    thanksDocServiceId: 319,
    targetKeyword: "selenium blood test uk",
    adGroup: "Micronutrients",
    status: "live",
    kind: "panel",
    supplier: {
      unisex: {
        verified: true,
        verifiedOn: "2026-08-19",
        lines: [
          { code: "RP30", name: "Extended Vitamins & Minerals", tradePence: GBP(131.5) },
          { code: "hsCRP", name: "hs-CRP", tradePence: GBP(14) },
          { code: "RED_CELL_SELENIUM", name: "Red Cell Selenium", tradePence: GBP(54.4) },
        ],
        notes:
          "Selenium upgrade deliberately sold below its £54.40 cost (charged £40), absorbed by base margin — Dr Tosin approved 2026-08-19.",
      },
    },
  },
  {
    slug: "perimenopause-panel",
    productName: "Perimenopause Panel",
    positioningLine: "The Perimenopause Blood Audit",
    pricePence: GBP(375),
    landingPage: null, // no dedicated page yet; sold via checkout deep-link
    checkoutTier: "perimenopause-panel",
    thanksDocServiceId: null,
    targetKeyword: "perimenopause blood test uk",
    adGroup: "Hormones",
    status: "live",
    kind: "panel",
    supplier: {
      female: {
        verified: true,
        verifiedOn: "2026-08-19",
        lines: [
          { code: "HSC9F", name: "Advanced GP3 Female", tradePence: GBP(185.9) },
        ],
        notes:
          "Repriced £295 → £375 on 2026-08-21 to match the Women's Health headline price. Ordered as HSC9F £185.90 + DHEA-S (DHEAS) £16.00 + Free Testosterone (FREE_TEST) £30.30 = £232.20 trade = 38.1% at £375 (was 21.3% at £295). NOTE: this does NOT match Women's Health's 49.8% — same price, higher trade cost, because Women's Health runs on the cheaper HSC7F_RP7 £100.50 bundle. DHEA-S and Free Testosterone are assumed add-ons: HSC9F's analyte list has NOT been read from Nexus, so if GP3F already contains them the real trade is £185.90 (50.4%). Verify before treating 38.1% as final. Checkout copy listing H. pylori and Anti-TTG is ACCURATE (both are in GP3F).",
      },
    },
  },

  // ── Programmes & consultations ───────────────────────────────────
  {
    slug: "metabolic-discovery",
    productName: "Discovery Core",
    positioningLine: "30-minute GP consultation",
    pricePence: GBP(97),
    landingPage: "/discovery-call",
    checkoutTier: "discovery",
    thanksDocServiceId: null,
    targetKeyword: "private gp consultation uk",
    adGroup: "Brand",
    status: "live",
    kind: "consultation",
    supplier: {},
  },
  {
    slug: "twelve-week-reset",
    productName: "12-Week Metabolic Reset",
    positioningLine: "Structured remission-focused programme, CGM included",
    pricePence: GBP(1895),
    landingPage: "/assessments",
    checkoutTier: "programme",
    thanksDocServiceId: null,
    targetKeyword: "type 2 diabetes remission programme private",
    adGroup: "Programmes",
    status: "live",
    kind: "programme",
    supplier: {},
  },
  {
    slug: "executive-healthspan",
    productName: "Executive Healthspan",
    positioningLine: "The Executive Health Audit",
    pricePence: 0, // price not published
    landingPage: "/executive-waitlist",
    checkoutTier: null,
    thanksDocServiceId: null,
    targetKeyword: "executive health assessment london",
    adGroup: "Health MOT",
    status: "coming-soon",
    kind: "programme",
    supplier: {},
  },
];

export const getPanel = (slug: string): Panel | undefined =>
  PANELS.find((p) => p.slug === slug);

export const formatPrice = (p: Panel): string =>
  `£${(p.pricePence / 100).toLocaleString("en-GB")}`;

/** Trade cost in pence for one supplier order (sum of lines). */
export const tradePence = (o: SupplierOrder): number =>
  o.lines.reduce((s, l) => s + l.tradePence, 0);
