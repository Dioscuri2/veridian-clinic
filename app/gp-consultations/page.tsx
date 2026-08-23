import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { FONTS, CSS } from "@/components/globalStyles";

const PAGE_URL = "https://veridianclinic.com/gp-consultations";
const THANKSDOC_URL = process.env.NEXT_PUBLIC_THANKSDOC_BOOKING_URL || "https://notes.thanksdoc.co.uk/book/clinic/veridian";
const BOOK_15 = "https://notes.thanksdoc.co.uk/book/service/334/36";
const BOOK_20 = "https://notes.thanksdoc.co.uk/book/service/335/36";
const BOOK_REPEAT_RX = "https://notes.thanksdoc.co.uk/book/service/336/36";

export const metadata: Metadata = {
  title: { absolute: "Private GP Video Consultation UK | Evening Appointments, £59 or £89 | Veridian Clinic" },
  description:
    "Fast access to a named, NHS-experienced private GP by secure video, including evening appointments. 15 minutes £59 or 20 minutes £89. Adults 18 and over, UK-wide, no registration needed.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Private GP Video Consultation UK | Evening Appointments | Veridian Clinic",
    description:
      "Speak to the same named GP by secure video, with daytime and evening appointments. 15 minutes £59, 20 minutes £89. Adults 18 and over.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
  keywords: [
    "private GP video consultation UK",
    "evening GP appointment UK",
    "private GP online UK",
    "private GP appointment this week",
    "private prescription online UK",
    "private GP referral letter",
    "private GP Golders Green",
    "private GP NW11",
    "private GP Cambridge",
    "video GP consultation evening",
  ],
};

const consultations = [
  {
    duration: "15 minutes",
    price: "£59",
    lead: "One clear problem",
    bookUrl: BOOK_15,
    suitableFor: [
      "A single acute issue: a cough, a rash, a urinary infection, a sore throat",
      "A private prescription where the picture is already clear",
      "A quick question about medication you already take",
      "A short conversation about a fit note",
    ],
  },
  {
    duration: "20 minutes",
    price: "£89",
    lead: "More than one thing, or something that needs unpicking",
    bookUrl: BOOK_20,
    suitableFor: [
      "Two or three concerns in the same appointment",
      "A repeat medication review, or several medicines to go through",
      "Blood or scan results you want explained properly",
      "A referral letter that needs a proper history behind it",
      "Travel health, sexual health or general health advice with follow-up questions",
    ],
    featured: true,
  },
];

const included = [
  {
    title: "A private prescription where appropriate",
    body: "One electronic prescription item is included in your consultation where prescribing is clinically appropriate. Additional items are charged. The longest course we can issue is 28 days, at the discretion of the prescribing clinician. You pay the pharmacy for the medication itself, which is a cost we do not control and never mark up.",
  },
  {
    title: "Fit notes",
    body: "Where the clinical picture supports it, a fit note is issued at no extra charge. Some providers bill separately for this. Ours is in the consultation fee, and it is a clinical judgement rather than a purchase.",
  },
  {
    title: "Referral letters",
    body: "A letter for onward private care, or to support an NHS pathway, is included where a referral is clinically indicated. You are not charged again for the letter that makes the consultation useful.",
  },
  {
    title: "A written summary",
    body: "You receive a short written record of the consultation, what was decided and what to do if things change or do not settle.",
  },
];

const chargedSeparately = [
  {
    item: "Additional prescription items",
    price: "Charged",
    note: "One electronic prescription item is included in the consultation. Anything beyond that is charged, and we will tell you before it is issued.",
  },
  {
    item: "Repeat prescription requested outside a consultation",
    price: "£25",
    note: "Only when you have been seen before, the medicine is safe to continue, and no new consultation is clinically needed. Maximum 28 days.",
    href: BOOK_REPEAT_RX,
  },
  {
    item: "Insurance, medico-legal and complex reports",
    price: "Quoted individually",
    note: "These take substantial clinical time to prepare properly, so we quote before any work starts. You will never be billed for one without agreeing the fee first.",
  },
  {
    item: "Medication supplied by the pharmacy",
    price: "Pharmacy's own price",
    note: "The drug itself is dispensed and priced by the pharmacy, not by us.",
  },
];

const canHelp = [
  {
    tag: "Acute",
    title: "Acute illness",
    body: "Chest and throat infections, urine infections, skin problems and rashes, eye infections, gastrointestinal upsets, coughs, fevers and the everyday illnesses that need a decision quickly rather than a three week wait.",
  },
  {
    tag: "Prescriptions",
    title: "Prescriptions and repeat medication reviews",
    body: "A private prescription where clinically appropriate, and structured reviews of medicines you already take: whether they are still doing what they should, whether the dose still fits, and whether anything can safely stop. Courses are limited to 28 days.",
  },
  {
    tag: "Results",
    title: "Results interpretation",
    body: "Blood tests, scans and reports you have been handed without an explanation. We go through what the numbers mean for you, what is reassuring, and what genuinely needs following up.",
  },
  {
    tag: "Referrals",
    title: "Referral letters",
    body: "Letters to private consultants, physiotherapy, psychology and diagnostics, or a letter to support an NHS onward pathway. Written by the GP who actually spoke to you.",
  },
  {
    tag: "Advice",
    title: "Travel, general and sexual health advice",
    body: "Pre-travel advice and risk planning, general health questions, contraception and sexual health advice, and screening guidance appropriate to your age and history.",
  },
  {
    tag: "Paperwork",
    title: "Fit notes",
    body: "A fit note for your employer where the clinical picture supports one, discussed properly rather than issued blind, and issued inside the consultation fee.",
  },
];

const exclusions = [
  {
    title: "Anyone under 18",
    body: "These appointments are for adults only. We do not see children or young people under 18 by video or in person, in any circumstances. If a child needs to be seen, contact your NHS GP, NHS 111, or 999 in an emergency.",
  },
  {
    title: "Anything needing a physical examination",
    body: "An abdomen that needs palpating, a joint that needs testing, a heart or chest that needs listening to, an ear that needs looking into. A camera cannot do any of it.",
  },
  {
    title: "Medical emergencies",
    body: "A booked video call is the wrong tool for anything that is deteriorating in front of you. Call 999, or use NHS 111 if you are unsure and it is not an emergency.",
  },
  {
    title: "Controlled drugs",
    body: "We do not prescribe controlled drugs remotely. Please do not book expecting one.",
  },
  {
    title: "Medication needing ongoing monitoring or shared care",
    body: "Medicines that require blood monitoring, titration under specialist supervision, or a shared care arrangement with your NHS GP cannot be safely started or continued through a one-off remote consultation.",
  },
  {
    title: "NHS registration",
    body: "Veridian Clinic is a private service and cannot take you on as an NHS patient. Keep your NHS GP registration exactly as it is.",
  },
  {
    title: "A fit note or referral letter the clinical picture does not support",
    body: "Both are included when they are clinically indicated. Neither is automatic, and booking a consultation is not buying a document.",
  },
  {
    title: "Ongoing supply beyond 28 days",
    body: "The longest duration of medication we can prescribe is 28 days, at the discretion of the prescribing clinician. If you need a long-term or repeat supply, that belongs with your regular GP.",
  },
];

const differences = [
  {
    title: "Appointments in the evening, not only office hours",
    body: "The booking calendar runs 10:00 to 14:00 and 19:00 to 21:00, with evening starts available up to 20:45. Most people can be seen within the same week without taking time off work.",
  },
  {
    title: "You always know how long you have got",
    body: "The consultation length is on the price, in writing, before you book: 15 minutes at £59, or 20 minutes at £89. Some national services do not publish an appointment duration at all, and a £49 headline elsewhere can buy you ten minutes.",
  },
  {
    title: "You always see the same named GP",
    body: "Dr Oluwatosin Taiwo, MBBS MRCGP MRCS, NHS-experienced and GMC-registered. Some national services state that, depending on your symptoms, you may be seen by a GP, an Advanced Clinical Practitioner or a Physiotherapist. Here it is a GP, and it is the same one each time.",
  },
  {
    title: "No surprise fees at the end",
    body: "Most local private clinics do not publish what they charge for a fit note or a referral letter, so patients often find out after they have booked. Our consultation fees, what is included, and what is charged separately are all set out on this page before you pay.",
  },
];

const faqs = [
  {
    q: "When can I actually be seen?",
    a: "The booking calendar offers appointments between 10:00 and 14:00 and between 19:00 and 21:00, with the latest evening appointment starting at 20:45. Availability varies by day, but most people can be seen within the same week, and often sooner. We do not promise same-day appointments, because the honest answer is that it depends on what is free on the calendar when you book.",
  },
  {
    q: "Who can book, and do you see children?",
    a: "These consultations are for adults aged 18 and over only. We do not see children or under 18s, by video or in person. If your child needs medical attention, please contact your NHS GP, call NHS 111, or call 999 in an emergency.",
  },
  {
    q: "Who will I actually see?",
    a: "Dr Oluwatosin Taiwo, MBBS MRCGP MRCS, a GMC-registered, NHS-experienced GP. You will not be allocated to a rotating pool of clinicians, and you will not find yourself speaking to a non-GP practitioner without being told in advance.",
  },
  {
    q: "What is included in the fee?",
    a: "The consultation itself, one electronic prescription item where prescribing is clinically appropriate, a fit note where the clinical picture supports it, a referral letter where a referral is indicated, and a written summary of the consultation.",
  },
  {
    q: "Can you issue a prescription, and does it cost more?",
    a: "Yes, where it is clinically appropriate and safe to prescribe remotely. One electronic prescription item is included in your consultation fee; additional items are charged. The longest duration we can prescribe is 28 days, at the discretion of the prescribing clinician. The medication itself is dispensed by a pharmacy of your choice and you pay the pharmacy directly for it, at their price. A repeat prescription requested outside a consultation is £25.",
  },
  {
    q: "Can I get a fit note?",
    a: "Yes, where the clinical assessment supports it, and at no extra charge. It is a clinical judgement rather than a purchase, so we will discuss what is going on before issuing one. If a fit note is not appropriate, we will explain why.",
  },
  {
    q: "Can I register with you as an NHS patient?",
    a: "No. Veridian Clinic is a private service and does not offer NHS registration. Keep your NHS GP; this is for the times when you want to be seen sooner, or want longer with a doctor than a routine appointment allows. With your consent we are happy to write to your NHS GP so your records stay joined up.",
  },
  {
    q: "What happens if I need to be physically examined?",
    a: "We tell you, and we tell you where to go: an in-person appointment, an urgent care service, or your NHS GP, depending on what is needed. If it becomes clear within the first few minutes that the problem cannot be safely assessed by video and nothing useful can be done for you remotely, Dr Taiwo will refund the consultation personally. That is our own commitment to you, separate from the booking platform's standard policy.",
  },
  {
    q: "What if my problem turns out to be something bigger?",
    a: "Some people arrive with a specific request and it becomes clear the real issue is longstanding fatigue, weight that will not shift, or a general sense that something is off. In that case we will say so and point you at the right assessment rather than repeatedly selling you short appointments.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Bookings are handled by ThanksDoc and their terms apply. If you cancel less than 48 hours before your consultation starts, you are not entitled to a refund or exchange and you would need to rebook. Cancel or reschedule with more than 48 hours' notice and you can change the appointment. If we ever have to cancel on you, you are refunded in full.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Veridian Clinic Private GP Consultations",
  description:
    "Private GP video consultations across the UK with a named, GMC-registered, NHS-experienced GP, including evening appointments. 15 minute and 20 minute appointments for adults aged 18 and over.",
  url: PAGE_URL,
  areaServed: { "@type": "Country", name: "United Kingdom" },
  medicalSpecialty: ["Primary Care"],
  availableService: [
    { "@type": "MedicalProcedure", name: "Private GP Video Consultation, 15 minutes" },
    { "@type": "MedicalProcedure", name: "Private GP Video Consultation, 20 minutes" },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Private GP Video Consultation, 15 minutes",
      price: "59.00",
      priceCurrency: "GBP",
      url: PAGE_URL,
    },
    {
      "@type": "Offer",
      name: "Private GP Video Consultation, 20 minutes",
      price: "89.00",
      priceCurrency: "GBP",
      url: PAGE_URL,
    },
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

export default function GpConsultationsPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* Hero */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <p className="lbl a1">Private GP Consultations</p>
            <div className="rule a1" />
            <h1 className="cg a2" style={{ fontSize: "clamp(2.1rem,5vw,3.4rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.15, marginBottom: 16 }}>
              A named GP by video, including evenings, usually within the same week.
            </h1>
            <p className="a3" style={{ fontSize: "clamp(.94rem,2vw,1rem)", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 700, marginBottom: 22 }}>
              A secure video consultation with Dr Oluwatosin Taiwo, a GMC-registered, NHS-experienced GP. Appointments run from 10:00 to 14:00 and from 19:00 to 21:00, so you do not have to give up a working day to be heard properly. You know how many minutes you are booking, you know who you are speaking to, and you know the full price before you start. For adults aged 18 and over.
            </p>
            <div className="badge-row a4" style={{ flexWrap: "wrap" }}>
              <span className="badge">Evening Appointments</span>
              <span className="badge">Same Named GP</span>
              <span className="badge">Often Seen This Week</span>
              <span className="badge">UK-Wide By Video</span>
              <span className="badge">Adults 18+</span>
            </div>
          </div>
        </section>

        {/* Price cards */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="sh text-center">
              <p className="lbl">The two appointments</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Pick the length that fits the problem</h2>
              <p className="sh-body">Both are with the same GP, and both draw on the same daytime and evening calendar. The only difference is how much time you have.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))", gap: 20 }}>
              {consultations.map((c) => {
                // The featured card sits on --fo (#0d2818 forest green), so every
                // colour inside it has to flip. Painting --fo text on a --fo card
                // is what made the 20 minute option unreadable.
                const onDark = !!c.featured;
                const eyebrow = onDark ? "var(--go3)" : "var(--go)";
                const priceCol = onDark ? "var(--iv)" : "var(--fo)";
                const bodyCol = onDark ? "rgba(246,241,232,.9)" : "var(--sl2)";
                const quietCol = onDark ? "rgba(246,241,232,.68)" : "var(--sl3)";
                const hairline = onDark ? "1px solid rgba(246,241,232,.22)" : "1px solid rgba(0,0,0,.07)";
                return (
                <div key={c.duration} className={c.featured ? "card card-featured" : "card"} style={{ padding: "clamp(26px,5vw,36px)", display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "clamp(.79rem,2.1vw,.83rem)", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: eyebrow, marginBottom: 12 }}>
                    Video consultation
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                    <span className="cg" style={{ fontSize: "clamp(2.7rem,9vw,3.3rem)", fontWeight: 600, color: priceCol, lineHeight: 1 }}>{c.price}</span>
                    <span style={{ fontSize: "clamp(1rem,3vw,1.1rem)", color: bodyCol, fontWeight: 600 }}>{c.duration}</span>
                  </div>
                  <p style={{ fontSize: "clamp(.97rem,2.7vw,1.04rem)", color: bodyCol, lineHeight: 1.8, marginBottom: 20 }}>{c.lead}</p>

                  <p style={{ fontSize: "clamp(.85rem,2.3vw,.9rem)", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: quietCol, marginBottom: 12 }}>
                    Suitable for
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 12 }}>
                    {c.suitableFor.map((s) => (
                      <li key={s} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 11, alignItems: "start" }}>
                        <svg width="17" height="17" viewBox="0 0 34 34" fill="none" style={{ marginTop: 5 }}>
                          <path d="M8 17l5 5 13-13" stroke={eyebrow} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: "clamp(.95rem,2.6vw,1.01rem)", color: bodyCol, lineHeight: 1.75 }}>{s}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "auto" }}>
                    <p style={{ fontSize: "clamp(.9rem,2.4vw,.95rem)", color: bodyCol, lineHeight: 1.8, marginBottom: 16, paddingTop: 18, borderTop: hairline }}>
                      Includes one electronic prescription item where clinically appropriate, plus a fit note or referral letter where indicated, at no extra charge.
                    </p>
                    <a href={c.bookUrl || THANKSDOC_URL} className={onDark ? "btn btn-go btn-full" : "btn btn-fo btn-full"} target="_blank" rel="noopener noreferrer">
                      Book {c.duration}, {c.price} →
                    </a>
                  </div>
                </div>
                );
              })}
            </div>

            <p style={{ fontSize: "clamp(.85rem,2.3vw,.9rem)", color: "var(--sl3)", lineHeight: 1.85, textAlign: "center", marginTop: 22 }}>
              Bookings and payments are handled securely through ThanksDoc. Services run through ThanksDoc&apos;s CQC-registered framework. UK patients, adults aged 18 and over only.
            </p>
          </div>
        </section>

        {/* Red flag safety netting */}
        <section className="sec bg-iv" style={{ paddingBottom: 0 }}>
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ padding: "24px 26px", background: "rgba(122,22,22,.06)", borderLeft: "3px solid var(--red)" }}>
              <p style={{ fontSize: "clamp(.78rem,2.1vw,.82rem)", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--red)", marginBottom: 10 }}>
                Do not book a video call for these
              </p>
              <p style={{ fontSize: "clamp(.97rem,2.6vw,1.03rem)", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 12 }}>
                <strong style={{ color: "var(--fo)" }}>Call 999 now, or go to your nearest emergency department,</strong> if you have chest pain or chest tightness, breathlessness at rest, sudden face or arm weakness or slurred speech, heavy or uncontrolled bleeding, a severe allergic reaction with swelling of the face, lips or throat, a first or prolonged seizure, or a sudden severe headache unlike any you have had before.
              </p>
              <p style={{ fontSize: "clamp(.97rem,2.6vw,1.03rem)", color: "var(--sl2)", lineHeight: 1.9, marginBottom: 12 }}>
                These need urgent hands-on assessment within minutes. A booked video consultation cannot deliver that, and waiting for one costs time you may not have. If you are unsure how urgent something is and it is not an emergency, NHS 111 is available 24 hours a day.
              </p>
              <p style={{ fontSize: "clamp(.97rem,2.6vw,1.03rem)", color: "var(--sl2)", lineHeight: 1.9 }}>
                We do not see anyone under the age of 18. If you are worried about a child, please contact your NHS GP or call NHS 111, and call 999 if the child is floppy, unrousable, struggling to breathe or has a rash that does not fade under pressure.
              </p>
            </div>
          </div>
        </section>

        {/* What we can help with */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="sh">
              <p className="lbl">Scope</p>
              <div className="rule" />
              <h2 className="sh-title">What we can help with</h2>
              <p className="sh-body">The everyday work of general practice, done properly, by video, for adults.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,270px),1fr))", gap: 16 }}>
              {canHelp.map((item) => (
                <div key={item.title} className="card" style={{ padding: "24px 22px" }}>
                  <span style={{ fontSize: "clamp(.72rem,2vw,.76rem)", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", padding: "3px 8px", border: "1px solid rgba(200,168,75,.3)", background: "rgba(200,168,75,.06)" }}>
                    {item.tag}
                  </span>
                  <h3 className="cg" style={{ fontSize: "1.08rem", fontWeight: 500, color: "var(--sl)", margin: "12px 0 8px" }}>{item.title}</h3>
                  <p style={{ fontSize: "clamp(.93rem,2.5vw,.98rem)", color: "var(--sl2)", lineHeight: 1.85 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exclusion criteria */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="sh">
              <p className="lbl">Being straight with you</p>
              <div className="rule" />
              <h2 className="sh-title">Who should not book this consultation</h2>
              <p className="sh-body">
                A video call is a good tool for a large slice of general practice and a poor tool for the rest. Please read this before you pay. If any of the following applies to you, this appointment is not the right one, and we would rather say so here than after you have handed over your card.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px),1fr))", gap: 16 }}>
              {exclusions.map((item) => (
                <div key={item.title} style={{ padding: "22px 20px", background: "rgba(122,22,22,.04)", borderLeft: "3px solid var(--red)" }}>
                  <h3 style={{ fontSize: "clamp(1rem,2.7vw,1.06rem)", fontWeight: 600, color: "var(--sl)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: "clamp(.93rem,2.5vw,.98rem)", color: "var(--sl2)", lineHeight: 1.85 }}>{item.body}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "clamp(.95rem,2.5vw,1rem)", color: "var(--sl2)", lineHeight: 1.9, marginTop: 24 }}>
              If it becomes clear in the first few minutes that nothing useful can be done for you remotely, Dr Taiwo will refund the consultation personally. That promise is Veridian&apos;s own, made directly to you.
            </p>
          </div>
        </section>

        {/* Included in the fee */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="sh">
              <p className="lbl">The price you see</p>
              <div className="rule" />
              <h2 className="sh-title">Included in the consultation fee</h2>
              <p className="sh-body">These are the things other providers most often bill for separately. Here they are part of what you already paid.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px),1fr))", gap: 16, marginBottom: 40 }}>
              {included.map((item) => (
                <div key={item.title} className="card" style={{ padding: "24px 22px" }}>
                  <div style={{ width: 32, height: 32, background: "var(--fo)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <svg width="16" height="16" viewBox="0 0 34 34" fill="none">
                      <path d="M8 17l5 5 13-13" stroke="var(--go2)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "clamp(1rem,2.7vw,1.06rem)", fontWeight: 600, color: "var(--sl)", marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: "clamp(.93rem,2.5vw,.98rem)", color: "var(--sl2)", lineHeight: 1.85 }}>{item.body}</p>
                </div>
              ))}
            </div>

            <p className="lbl">Charged separately, so you are never surprised</p>
            <div className="rule" />
            <div style={{ marginTop: 8 }}>
              {chargedSeparately.map((row, i) => (
                <div key={row.item} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "start", padding: "20px 0", borderBottom: i < chargedSeparately.length - 1 ? "1px solid rgba(0,0,0,.07)" : "none" }}>
                  <div>
                    <p style={{ fontSize: "clamp(.98rem,2.6vw,1.04rem)", fontWeight: 600, color: "var(--sl)", marginBottom: 6 }}>{row.item}</p>
                    <p style={{ fontSize: "clamp(.91rem,2.4vw,.95rem)", color: "var(--sl2)", lineHeight: 1.8 }}>{row.note}</p>
                    {row.href && (
                      <a href={row.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 10, fontSize: "clamp(.89rem,2.4vw,.94rem)", fontWeight: 600, color: "var(--fo)", textDecoration: "underline" }}>
                        Request a repeat prescription &rarr;
                      </a>
                    )}
                  </div>
                  <p className="cg" style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--fo)", whiteSpace: "nowrap" }}>{row.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why this differs */}
        <section className="sec bg-fo">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl" style={{ color: "var(--go2)" }}>How we compare</p>
            <div className="rule" style={{ background: "var(--go)" }} />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.25, margin: "8px 0 14px" }}>
              Four things we publish that most of the market does not.
            </h2>
            <p style={{ fontSize: "clamp(.98rem,2.6vw,1.04rem)", color: "rgba(246,241,232,.7)", lineHeight: 1.9, maxWidth: 660, marginBottom: 32 }}>
              None of this is a criticism of the NHS. Your NHS GP is doing careful work inside a system under enormous pressure, and we would encourage you to stay registered. This is about what you are entitled to know before you hand your card over to a private provider.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px),1fr))", gap: 14 }}>
              {differences.map((d) => (
                <div key={d.title} style={{ padding: "22px 20px", background: "rgba(246,241,232,.07)", border: "1px solid rgba(246,241,232,.1)" }}>
                  <h3 className="cg" style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--iv)", marginBottom: 10 }}>{d.title}</h3>
                  <p style={{ fontSize: "clamp(.91rem,2.4vw,.95rem)", color: "rgba(246,241,232,.7)", lineHeight: 1.85 }}>{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* In-person waiting list */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px),1fr))", gap: 44, alignItems: "start" }}>
              <div>
                <p className="lbl">Opening soon</p>
                <div className="rule" />
                <h2 className="sh-title" style={{ marginTop: 8 }}>Face-to-face rooms in Golders Green and Cambridge</h2>
                <p style={{ fontSize: "clamp(.97rem,2.6vw,1.03rem)", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 16 }}>
                  In-person consulting rooms are opening in Golders Green (NW11) and in Cambridge, for the appointments that genuinely need a doctor in the room. We are not taking in-person bookings yet and we are not publishing a date or a price for them, because we would rather tell you nothing than tell you something we cannot hold to.
                </p>
                <p style={{ fontSize: "clamp(.97rem,2.6vw,1.03rem)", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 16 }}>
                  Join the waiting list and we will email you once, when in-person appointments open, with the location and the fees. This is a waiting list, not a booking, and it does not reserve an appointment or take any payment.
                </p>
                <p style={{ fontSize: "clamp(.95rem,2.5vw,1rem)", color: "var(--sl2)", lineHeight: 1.9 }}>
                  If you are looking specifically for local care, we have separate pages for{" "}
                  <Link href="/private-gp-north-west-london" style={{ color: "var(--fo)", fontWeight: 600 }}>private GP care in North West London</Link>{" "}
                  and{" "}
                  <Link href="/private-gp-cambridge" style={{ color: "var(--fo)", fontWeight: 600 }}>private GP care in Cambridge</Link>.
                </p>
              </div>

              <div className="card" style={{ padding: "clamp(24px,4vw,34px)" }}>
                <LeadCaptureForm
                  source="gp-consultations-in-person-waitlist"
                  title="In-person waiting list"
                  subtitle="Golders Green (NW11) and Cambridge. One email when the rooms open, with location and fees. No booking, no payment, no appointment held."
                  ctaLabel="Join the In-Person Waiting List →"
                  submittingLabel="Adding you..."
                  consentLabel="I agree to Veridian Clinic emailing me about in-person appointments and occasional clinic updates. I understand this is a waiting list and not a booking."
                  buttonClassName="btn btn-fo btn-full"
                  fields={["firstName", "email"]}
                  metadata={{ interest: "in-person-consultations", locations: "Golders Green NW11, Cambridge" }}
                  compact
                />
                <p style={{ fontSize: "clamp(.79rem,2.1vw,.83rem)", color: "var(--sl3)", lineHeight: 1.7, marginTop: 16 }}>
                  Video consultations are available now, UK-wide, with daytime and evening slots, and you do not need to wait for a room to open to be seen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Soft bridge to the premium products */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl">A different kind of problem</p>
            <div className="rule" />
            <h2 className="sh-title" style={{ marginTop: 8 }}>If the real question is &quot;why do I feel like this?&quot;</h2>
            <p style={{ fontSize: "clamp(.97rem,2.6vw,1.03rem)", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 16, maxWidth: 700 }}>
              A 15 or 20 minute appointment is the right tool for a defined problem: an infection, a prescription, a letter. It is the wrong tool for &quot;I am tired all the time and my bloods keep coming back normal&quot;, or &quot;my weight will not shift no matter what I do&quot;, or &quot;I just want to know where I actually stand&quot;. Those need testing and time, not a longer chat.
            </p>
            <p style={{ fontSize: "clamp(.97rem,2.6vw,1.03rem)", color: "var(--sl2)", lineHeight: 1.95, marginBottom: 26, maxWidth: 700 }}>
              If that is closer to your situation, say so when you book and we will point you to the right starting point rather than selling you a second short appointment. There is no obligation to go anywhere near it, and the consultations above stand on their own.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,250px),1fr))", gap: 16 }}>
              <Link href="/discovery-call" style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "24px 22px", height: "100%" }}>
                  <p style={{ fontSize: "clamp(.74rem,2vw,.78rem)", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 8 }}>Discovery Core</p>
                  <p className="cg" style={{ fontSize: "1.5rem", fontWeight: 500, color: "var(--fo)", marginBottom: 8 }}>£127</p>
                  <p style={{ fontSize: "clamp(.93rem,2.5vw,.98rem)", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 12 }}>
                    A 30 minute GP-led review of the whole picture, with a written pathway recommendation within 24 hours. For working out what to investigate, and why.
                  </p>
                  <span style={{ fontSize: "clamp(.87rem,2.3vw,.92rem)", color: "var(--fo)", fontWeight: 600 }}>See Discovery Core →</span>
                </div>
              </Link>
              <Link href="/blood-tests" style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "24px 22px", height: "100%" }}>
                  <p style={{ fontSize: "clamp(.74rem,2vw,.78rem)", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--go)", marginBottom: 8 }}>Blood panels</p>
                  <p className="cg" style={{ fontSize: "1.5rem", fontWeight: 500, color: "var(--fo)", marginBottom: 8 }}>GP-reviewed</p>
                  <p style={{ fontSize: "clamp(.93rem,2.5vw,.98rem)", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 12 }}>
                    Targeted panels for fatigue, metabolic health, hormones and long-term risk, each returned with a written GP interpretation rather than a PDF of numbers.
                  </p>
                  <span style={{ fontSize: "clamp(.87rem,2.3vw,.92rem)", color: "var(--fo)", fontWeight: 600 }}>See the panels →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sh text-center">
              <p className="lbl">Common Questions</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">Before you book</h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={f.q} style={{ padding: "24px 0", borderBottom: i < faqs.length - 1 ? "1px solid rgba(0,0,0,.07)" : "none" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--sl)", marginBottom: 10 }}>{f.q}</h3>
                  <p style={{ fontSize: "clamp(.96rem,2.6vw,1.01rem)", color: "var(--sl2)", lineHeight: 1.9 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 720, textAlign: "center" }}>
            <p className="lbl">Book now</p>
            <div className="rule rule-c" />
            <h2 className="cg" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 14 }}>
              15 minutes at £59, or 20 minutes at £89.
            </h2>
            <p style={{ fontSize: "clamp(.99rem,2.7vw,1.05rem)", color: "var(--sl2)", lineHeight: 1.9, maxWidth: 560, margin: "0 auto 28px" }}>
              Daytime and evening appointments with the same named GP, at a published price. Adults aged 18 and over.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={BOOK_15} className="btn btn-fo" target="_blank" rel="noopener noreferrer">
                Book 15 Minutes, £59 →
              </a>
              <a href={BOOK_20} className="btn btn-fo" target="_blank" rel="noopener noreferrer">
                Book 20 Minutes, £89 →
              </a>
            </div>
            <p style={{ fontSize: "clamp(.79rem,2.1vw,.83rem)", color: "var(--sl3)", lineHeight: 1.85, marginTop: 32, borderTop: "1px solid rgba(0,0,0,.07)", paddingTop: 20 }}>
              Consultations are delivered by Dr Oluwatosin Taiwo, MBBS MRCGP MRCS, and run through ThanksDoc&apos;s CQC-registered framework. ThanksDoc is a trading name of Endura Health Limited (company number 15418491), CQC registration number 1-18826835219. Bookings, payments and cancellations are subject to ThanksDoc&apos;s terms, including a 48 hour cancellation policy. Veridian Clinic is a private service for adults aged 18 and over, and is not a substitute for NHS GP registration or for emergency care.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
