import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "Terms of Service | Veridian Clinic",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://veridianclinic.com/terms" },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 36 }}>
    <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--sl)", marginBottom: 12, letterSpacing: ".01em" }}>{title}</h2>
    <div style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.95 }}>{children}</div>
  </div>
);

export default function TermsPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <p className="lbl">Legal</p>
            <div className="rule" />
            <h1 className="cg" style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 500, color: "var(--sl)", lineHeight: 1.2, marginBottom: 8 }}>
              Terms of Service
            </h1>
            <p style={{ fontSize: ".82rem", color: "var(--sl3)", marginBottom: 32 }}>Last updated: May 2026</p>

            {/* ThanksDoc regulatory banner */}
            <div style={{
              background: "var(--fo)",
              borderRadius: 10,
              padding: "20px 24px",
              marginBottom: 32,
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
            }}>
              <div style={{
                background: "var(--go)",
                color: "var(--fo)",
                fontSize: ".7rem",
                fontWeight: 700,
                letterSpacing: ".1em",
                padding: "4px 10px",
                borderRadius: 4,
                whiteSpace: "nowrap",
                flexShrink: 0,
                marginTop: 2,
                textTransform: "uppercase",
              }}>
                Powered by ThanksDoc
              </div>
              <p style={{ color: "rgba(246,241,232,.85)", fontSize: ".88rem", lineHeight: 1.75, margin: 0 }}>
                Regulated clinical services at Veridian Clinic are delivered under the umbrella of{" "}
                <a href="https://thanksdoc.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: "var(--go)", textDecoration: "underline" }}>
                  ThanksDoc
                </a>{" "}
                (Endura Health Ltd · CQC Registration: 1-18826835219). By using our clinical services, you are also subject to ThanksDoc's terms and conditions, which are set out in full below.
              </p>
            </div>

            {/* Veridian terms */}
            <div className="card" style={{ padding: "clamp(24px,5vw,48px)", marginBottom: 40 }}>
              <p style={{ fontSize: ".82rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)", marginBottom: 28 }}>
                Part A — Veridian Clinic Terms
              </p>

              <Section title="1. About Veridian Clinic">
                <p>Veridian Clinic is a trading name of Olympus Premium Health Ltd, registered in England and Wales (Company No. 13621708). Registered address: 82A James Carter Road, Mildenhall, Bury St. Edmunds, Suffolk, IP28 7DE.</p>
                <p style={{ marginTop: 10 }}>CQC regulated clinical services, including prescribing where indicated, are delivered under the umbrella of ThanksDoc (thanksdoc.co.uk · CQC reg. 1-18826835219).</p>
              </Section>

              <Section title="2. Services">
                <p>Veridian Clinic provides health optimisation and longevity services, including metabolic assessments, GP-led consultations, and digital health tools. Our services complement, but do not replace, NHS care.</p>
                <p style={{ marginTop: 10 }}>The free metabolic age quiz, guides, and digital content provided on this website are for informational purposes only and do not constitute medical advice or a clinical diagnosis.</p>
              </Section>

              <Section title="3. Not an Emergency Service">
                <p>Veridian Clinic is <strong>not an emergency service</strong>. If you are experiencing a medical emergency — including chest pain, difficulty breathing, severe bleeding, loss of consciousness, stroke symptoms, or severe allergic reactions — call <strong>999 immediately</strong> or attend your nearest A&amp;E. If unsure, call NHS 111.</p>
              </Section>

              <Section title="4. Purchases and Payments">
                <p>All prices are displayed in GBP and are inclusive of VAT where applicable. Payments are processed securely via Stripe. Payment descriptors on bank statements may appear as &quot;Olympus Premium Health&quot;.</p>
                <p style={{ marginTop: 10 }}>Digital products (such as the Metabolic Reset Guide) are delivered electronically and are non-refundable once downloaded. If you experience any issue with delivery, please contact us at hello@veridianclinic.com within 14 days.</p>
              </Section>

              <Section title="5. Clinical Services and Cancellations">
                <p>Consultations cancelled with less than 24 hours notice may be subject to a cancellation fee of up to 50% of the session cost. We reserve the right to reschedule appointments where necessary and will provide at least 24 hours notice where possible.</p>
              </Section>

              <Section title="6. Intellectual Property">
                <p>All content on this website, including articles, tools, guides, and design, is the intellectual property of Olympus Premium Health Ltd. You may not reproduce, distribute, or use our content for commercial purposes without written permission.</p>
              </Section>

              <Section title="7. Privacy">
                <p>Our collection and use of personal data is governed by our <a href="/privacy" style={{ color: "var(--fo)" }}>Privacy Policy</a>. By using our services, you agree to the terms of that policy.</p>
              </Section>

              <Section title="8. Governing Law">
                <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
              </Section>

              <Section title="9. Contact">
                <p>For questions about these terms, contact us at <a href="mailto:hello@veridianclinic.com" style={{ color: "var(--fo)" }}>hello@veridianclinic.com</a> or via the <a href="/contact" style={{ color: "var(--fo)" }}>contact page</a>.</p>
              </Section>
            </div>

            {/* ThanksDoc full T&Cs */}
            <div className="card" style={{ padding: "clamp(24px,5vw,48px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid rgba(44,42,38,.1)" }}>
                <span style={{ background: "var(--fo)", color: "var(--go)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", padding: "4px 10px", borderRadius: 4, textTransform: "uppercase", flexShrink: 0 }}>
                  Powered by ThanksDoc
                </span>
                <p style={{ fontSize: ".82rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--sl3)", margin: 0 }}>
                  Part B — ThanksDoc Regulatory Terms (Full)
                </p>
              </div>
              <p style={{ fontSize: ".85rem", color: "var(--sl3)", marginBottom: 24, lineHeight: 1.7 }}>
                The following terms and conditions are those of ThanksDoc (Endura Health Ltd), our regulatory partner. As Veridian Clinic delivers regulated clinical services under ThanksDoc's CQC-registered umbrella, these terms apply to all clinical consultations, prescribing, and regulated services accessed through Veridian Clinic.
              </p>

              <Section title="Introduction and Responsibilities">
                <p>ThanksDoc, operated by Endura Health LTD, provides online video consultations and in-person medical appointments through partner premises. Endura Health Limited is incorporated in England and Wales (Company Number: 15418491) and registered with the Care Quality Commission (registration number 1-18826835219). Contact: info@thanksdoc.co.uk · 0800 246 2458 · 639 High Road, The Trampery, N17 8AA.</p>
                <p style={{ marginTop: 10 }}>By using services delivered through the ThanksDoc regulatory framework, users agree to these terms and conditions.</p>
              </Section>

              <Section title="Not an Emergency Service">
                <p>The service is <strong>not an emergency service</strong> and does not treat medical emergencies. Users experiencing emergencies should contact 999 immediately, particularly for: difficulty breathing, severe bleeding, chest pain, severe allergic reactions, loss of consciousness, major trauma, or suspected heart attacks or strokes.</p>
              </Section>

              <Section title="Professional Standards">
                <p>Clinicians are registered with the General Medical Council and comply with GMC guidelines on remote prescribing. The service follows standards set by the Care Quality Commission and healthcare regulators. Each clinician commits to taking professional responsibility equivalent to face-to-face consultations, providing identification when prescribing, prescribing only in the patient's best interest, and protecting patient privacy.</p>
              </Section>

              <Section title="Medications Not Prescribed">
                <p>ThanksDoc will not prescribe: Class A, B, or C drugs; Schedule 1–5 controlled medications; Z-drugs (Zopiclone, Zolpidem, Zaleplon); opioids, benzodiazepines, barbiturates, gabapentinoids; strong stimulants; substances with abuse potential; or all controlled drugs under the Misuse of Drugs Act 1971.</p>
              </Section>

              <Section title="Conditions and Services Not Covered">
                <p>The service does not cover: controlled drug prescriptions; patients outside the UK; repeat prescriptions (except through membership packages); emergency conditions (severe chest pain, seizures, heavy bleeding, strokes, severe pain, breathing difficulties, fever with confusion, severe mental health crises); pregnancy complications; major trauma or head injuries; patients undergoing chemotherapy with suspected infection; dental problems; NHS referrals or prescriptions; or translation services.</p>
              </Section>

              <Section title="Registration and Patient Commitments">
                <p>Users aged 18 or over can use services without formal registration. Minors require a responsible carer or parent present during booking. Users must provide accurate information and may be asked to upload photographic ID. By using services, patients agree to: answer questions truthfully and completely; not register multiple times or for others; follow clinician instructions carefully; accept clinician decisions regarding prescribed medicines; treat staff respectfully; permit GP notification of prescribed medicines; protect medicines from unauthorised access; and report side effects or medication ineffectiveness.</p>
                <p style={{ marginTop: 10 }}>In emergencies, ThanksDoc may contact healthcare professionals, social services, or emergency services without consent if there are concerns about abuse, serious crime, significant harm, or serious addiction.</p>
              </Section>

              <Section title="Privacy and Security">
                <p>ThanksDoc complies with UK data protection legislation. Patient information is protected through security technology including firewalls and Secure Socket Layers. Users must not introduce malicious code, attempt unauthorised access, or launch denial-of-service attacks — such breaches constitute criminal offences under the Computer Misuse Act 1990 and will be reported to law enforcement.</p>
              </Section>

              <Section title="Subscription Plans and Pricing">
                <p>Users agree to repeat charges on their payment card (Continuous Payment Authority) where applicable. If payment fails and card details are not updated, plans terminate automatically. Clinicians may terminate subscription plans if users are deemed unsuitable. All prices are in pounds sterling and include VAT unless stated otherwise. Overcharges will be refunded.</p>
              </Section>

              <Section title="Refunds and Cancellations">
                <p>No refunds are provided for consultations cancelled within 48 hours or those not resulting in preferred prescriptions. Third-party services including blood tests and scans are non-refundable. Clinicians are under no obligation to supply prescriptions — treatment suitability is determined by clinical judgement and strict legislation. Unused postal testing kits and non-prescription goods can be cancelled within fourteen calendar days of delivery; tampered, used, or opened kits cannot be returned for health reasons.</p>
              </Section>

              <Section title="Liability">
                <p>Nothing limits liability for death or personal injury from negligence or fraud. Endura Health Ltd accepts full clinical responsibility as required by law. ThanksDoc is not liable for losses from inaccurate or incomplete information, emotional well-being loss or embarrassment, lost income or anticipated profits, lost opportunities or goodwill damage, third-party losses, or indirect, consequential, special, or exemplary damages.</p>
              </Section>

              <Section title="Customer Service and Complaints">
                <p>For cancellations, refunds, or damaged/faulty products: <a href="mailto:patienthelp@thanksdoc.co.uk" style={{ color: "var(--fo)" }}>patienthelp@thanksdoc.co.uk</a>. For complaints regarding regulated clinical care: <a href="mailto:complaints@thanksdoc.co.uk" style={{ color: "var(--fo)" }}>complaints@thanksdoc.co.uk</a>.</p>
              </Section>

              <Section title="International Use and Governing Law">
                <p>ThanksDoc makes no claims that services are lawful outside the United Kingdom. Non-UK residents must be physically located in the UK during medical consultations. These terms are subject to England and Wales law. ThanksDoc reserves the right to change these terms at any time; new versions posted on the website take immediate effect.</p>
              </Section>

              <p style={{ fontSize: ".78rem", color: "var(--sl3)", marginTop: 16, borderTop: "1px solid rgba(44,42,38,.08)", paddingTop: 16 }}>
                Source: thanksdoc.co.uk/terms-and-conditions/ · ThanksDoc terms last updated: 05/02/2026.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
