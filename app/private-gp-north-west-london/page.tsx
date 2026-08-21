import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

const PAGE_URL = "https://veridianclinic.com/private-gp-north-west-london";

export const metadata: Metadata = {
  title: { absolute: "Private GP in North West London | Metabolic, Longevity & Weight Loss Clinic | Veridian Clinic" },
  description:
    "Private GP serving North West London for advanced blood tests, weight loss (GLP-1) medicine, and metabolic & longevity care. GMC-registered doctor, in-person by appointment plus secure video consultations. No NHS referral needed.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Private GP in North West London | Veridian Clinic",
    description:
      "Advanced blood tests, weight loss medicine, and metabolic & longevity care from a GMC-registered private GP serving North West London. In-person and video consultations.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
  keywords: [
    "private GP North West London",
    "private GP NW London",
    "private doctor North West London",
    "private blood tests North West London",
    "weight loss clinic North West London",
    "Mounjaro North West London",
    "Wegovy North West London",
    "GLP-1 weight loss NW London",
    "longevity clinic North West London",
    "metabolic health North West London",
  ],
};

const pillars = [
  {
    href: "/discovery-call",
    tag: "Private GP",
    title: "Private GP consultations",
    body: "Unhurried appointments with a GMC-registered GP who has time to listen properly no ten-minute cap, no weeks on a waiting list. The place to bring the concern the NHS never had room for.",
  },
  {
    href: "/blood-tests",
    tag: "Screening",
    title: "Advanced blood tests & screening",
    body: "GP-ordered testing for the markers standard NHS panels leave out ApoB, fasting insulin, Lp(a), biological age and full metabolic screening, interpreted by a doctor with a written action plan.",
  },
  {
    href: "/weight-loss",
    tag: "Weight Loss",
    title: "Weight loss & GLP-1 medicine",
    body: "Clinically supervised weight loss with tirzepatide (Mounjaro) or semaglutide (Wegovy), selected for your profile after a full medical review. Private prescription, honest dosing, ongoing support.",
  },
  {
    href: "/assessments",
    tag: "Longevity",
    title: "Metabolic & longevity medicine",
    body: "The core of what we do: understand what is driving your weight, energy and long-term disease risk, then build a personalised plan to change the trajectory before symptoms appear.",
  },
];

const faqs = [
  {
    q: "Do I need an NHS referral to see a private GP in North West London?",
    a: "No. You can book directly with Veridian Clinic no GP referral is required. We handle all clinical ordering, including blood tests and private prescriptions where appropriate.",
  },
  {
    q: "Where are you based in North West London?",
    a: "A face-to-face consulting location on Golders Green Road, NW11 is opening soon for in-person metabolic and longevity consultations convenient for Golders Green, Hampstead, Highgate, Finchley, Hendon and Temple Fortune. Until it opens, consultations are held by secure video, available now.",
  },
  {
    q: "Where are the blood tests actually done?",
    a: "Blood tests are carried out at a Randox clinic, or through a home phlebotomy kit posted to you they are not taken at the consultation location. Your GP orders the right panel, and the results come back with a written interpretation and action plan.",
  },
  {
    q: "Can I be seen by video instead of in person?",
    a: "Yes. Most consultations, results reviews and weight loss follow-ups can be done by secure video from home. In-person appointments across North West London are available for metabolic and longevity consultations.",
  },
  {
    q: "Who is the doctor?",
    a: "All consultations are led personally by Dr Oluwatosin Taiwo, a UK GMC-registered GP. Clinical services are delivered through ThanksDoc, a CQC-registered clinical framework.",
  },
  {
    q: "How quickly can I be seen?",
    a: "Far faster than the NHS wait. Discovery consultations are typically available within days, and blood test results are returned with a written GP interpretation, not just a PDF of numbers.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Veridian Clinic Private GP, North West London",
  description:
    "Private GP serving North West London for advanced blood tests, weight loss (GLP-1) medicine, and metabolic and longevity care. GMC-registered doctor, in-person and video consultations.",
  url: PAGE_URL,
  areaServed: [
    { "@type": "City", name: "North West London" },
    { "@type": "Place", name: "Golders Green" },
    { "@type": "Place", name: "Hampstead" },
    { "@type": "Place", name: "Highgate" },
    { "@type": "Place", name: "Finchley" },
    { "@type": "Place", name: "Hendon" },
    { "@type": "Place", name: "Temple Fortune" },
    { "@type": "Place", name: "Mill Hill" },
    { "@type": "Place", name: "Cricklewood" },
    { "@type": "Place", name: "St John's Wood" },
    { "@type": "Place", name: "Muswell Hill" },
    { "@type": "Place", name: "Barnet" },
    { "@type": "Place", name: "Edgware" },
    { "@type": "Place", name: "Harrow" },
    { "@type": "Place", name: "Borehamwood" },
  ],
  medicalSpecialty: ["Metabolic Health", "Longevity Medicine", "Preventive Medicine"],
  availableService: [
    { "@type": "MedicalProcedure", name: "Private GP Consultation" },
    { "@type": "MedicalProcedure", name: "Advanced Metabolic & Longevity Blood Tests" },
    { "@type": "MedicalProcedure", name: "GLP-1 Weight Loss Consultation" },
    { "@type": "MedicalProcedure", name: "Metabolic & Longevity Assessment" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PrivateGpNorthWestLondonPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Hero */}
        <section className="sec bg-iv" style={{ paddingBottom: 0 }}>
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl a1">Private GP North West London</p>
            <div className="rule a1" />
            <h1 className="cg a2" style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 16 }}>
              Private GP care across North West London, beyond the ten-minute appointment.
            </h1>
            <p className="a3" style={{ fontSize: "clamp(.92rem,2vw,1rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 660, marginBottom: 0 }}>
              For people across North West London who want a doctor with time to look properly. Advanced blood testing, clinically supervised weight loss, and metabolic and longevity medicine from a GMC-registered GP in person by appointment, or by secure video.
            </p>
          </div>
        </section>

        {/* Local context */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 720 }}>
              From Hampstead and Highgate to Finchley, St John&apos;s Wood, Harrow and Wembley, North West London is home to people who take their health seriously and are used to expecting more from it. But the standard NHS panel still omits the markers that matter most for long-term health, and a ten-minute appointment rarely leaves room for the whole picture. Veridian Clinic exists to fill that gap: doctor-led, evidence-based, and built around prevention rather than crisis.
            </p>
          </div>
        </section>

        {/* Coming soon + areas served */}
        <section className="sec bg-iv" style={{ paddingTop: 0 }}>
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ padding: "20px 24px", background: "rgba(200,168,75,.08)", borderLeft: "2px solid var(--go)", marginBottom: 32 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--go)", marginBottom: 8 }}>
                Coming soon &middot; Golders Green Road, NW11
              </p>
              <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.85 }}>
                A face-to-face consulting location on Golders Green Road is opening soon for in-person metabolic and longevity consultations. Secure video consultations with Dr Tosin are available across North West London now, and blood testing is arranged either at a Randox clinic or through a home kit posted to you.
              </p>
            </div>
            <p className="lbl">Areas we serve across North West London</p>
            <div className="rule" />
            <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 2, maxWidth: 720, marginTop: 8 }}>
              Golders Green &middot; Temple Fortune &middot; Hampstead &middot; Hampstead Garden Suburb &middot; Highgate &middot; Finchley &middot; Hendon &middot; Mill Hill &middot; Cricklewood &middot; Willesden &middot; Kilburn &middot; St John&apos;s Wood &middot; Swiss Cottage &middot; Muswell Hill &middot; Totteridge &middot; Whetstone &middot; Barnet &middot; Edgware &middot; Stanmore &middot; Harrow &middot; Wembley &middot; Borehamwood &middot; Elstree &middot; Bushey &middot; Watford &middot; St Albans
            </p>
          </div>
        </section>

        {/* Service pillars */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl">What we offer in North West London</p>
            <div className="rule" />
            <div className="g2" style={{ gap: 2, marginTop: 8 }}>
              {pillars.map((p) => (
                <Link key={p.href} href={p.href} style={{ textDecoration: "none" }}>
                  <article style={{ padding: "28px 0", borderBottom: "1px solid rgba(0,0,0,.07)", cursor: "pointer" }}>
                    <span style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", padding: "3px 8px", border: "1px solid rgba(200,168,75,.3)", background: "rgba(200,168,75,.06)" }}>
                      {p.tag}
                    </span>
                    <h2 className="cg" style={{ fontSize: "clamp(1.1rem,2.5vw,1.45rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.3, margin: "12px 0 10px" }}>
                      {p.title}
                    </h2>
                    <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, maxWidth: 680 }}>{p.body}</p>
                    <span style={{ fontSize: ".8rem", color: "var(--fo)", fontWeight: 600, display: "inline-block", marginTop: 12 }}>Learn more →</span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <p className="lbl">North West London patients frequently ask</p>
            <div className="rule" />
            <div style={{ marginTop: 8 }}>
              {faqs.map((f) => (
                <div key={f.q} style={{ padding: "22px 0", borderBottom: "1px solid rgba(0,0,0,.07)" }}>
                  <h3 style={{ fontSize: ".98rem", fontWeight: 600, color: "var(--sl)", marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <p className="lbl">Start here</p>
            <div className="rule rule-c" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}>
              See where your health is really tracking.
            </h2>
            <p style={{ fontSize: ".95rem", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 28, maxWidth: 520, margin: "0 auto 28px" }}>
              Book a discovery call with Dr Tosin, or check your metabolic age free in 60 seconds to find the right starting point.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/discovery-call" className="btn btn-fo">Book a Discovery Core →</Link>
              <Link href="/metabolic-quiz" className="btn btn-ol">Check My Metabolic Age Free</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
