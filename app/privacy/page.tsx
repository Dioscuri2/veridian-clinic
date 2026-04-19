import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Veridian Clinic, including how we collect, use, store, and protect personal and health information.",
  alternates: { canonical: "https://veridian-clinic.vercel.app/privacy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Who we are",
    body: [
      "Veridian Clinic is a UK-based longevity and metabolic health clinic offering health optimisation, preventive support and educational services. Where regulated medical services are arranged through our clinical partners, those partner providers are identified separately where relevant.",
      "This policy explains how we collect, use, share, store and protect your personal information when you visit our website, enquire about our services, join our waitlist, complete forms, or become a patient.",
    ],
  },
  {
    title: "2. The information we collect",
    body: [
      "We may collect identity and contact information such as your name, email address, telephone number, date of birth and address.",
      "We may collect health and clinical information you choose to share with us, including symptoms, medical history, medications, test results, lifestyle details, goals, and information relevant to suitability for treatment or clinical assessment.",
      "We may collect technical and website usage information such as IP address, browser type, device type, operating system, referring pages, pages viewed, and approximate location derived from your IP address.",
      "We may also collect marketing and communication preferences, enquiry details, appointment history, payment-related records where relevant, and any correspondence you send to us.",
    ],
  },
  {
    title: "3. How we collect your data",
    body: [
      "We collect information directly from you when you complete forms, subscribe to updates, book an appointment, contact us by email or phone, submit clinical questionnaires, or communicate with our team.",
      "We also collect limited technical information automatically through cookies and similar technologies when you use our website. More detail is available in our Cookie Policy.",
      "In some cases, we may receive relevant information from third parties involved in your care, such as laboratories, payment providers, technology platforms, or other clinicians, where this is appropriate and lawful.",
    ],
  },
  {
    title: "4. Why we use your information",
    body: [
      "We use your personal data to respond to enquiries, manage bookings, provide requested services, deliver clinical care, assess suitability for treatment, communicate with you about appointments, and maintain appropriate medical records.",
      "We may use your information to operate, improve and secure our website and services; to monitor performance and service quality; to comply with legal, regulatory and professional obligations; and to investigate or respond to incidents, complaints, or safeguarding concerns.",
      "Where you have given permission, we may also use your contact details to send relevant service updates, educational content, or marketing communications. You can unsubscribe from marketing at any time.",
    ],
  },
  {
    title: "5. Lawful bases for processing",
    body: [
      "We process personal data where it is necessary for our legitimate interests, such as running and improving our services, provided those interests are not overridden by your rights.",
      "We process data where it is necessary to take steps at your request before entering into a contract, or to perform a contract with you, such as arranging consultations or delivering paid services.",
      "We process data where it is necessary to comply with legal or regulatory obligations, including medical, tax, accounting and safeguarding requirements.",
      "Where special category health data is involved, we rely on the relevant lawful bases and conditions permitted under UK GDPR and the Data Protection Act 2018, including the provision of health care and management of health services. In some circumstances we may also rely on your explicit consent.",
    ],
  },
  {
    title: "6. How we share information",
    body: [
      "We only share your information where there is a clear need and lawful basis to do so. This may include sharing with clinicians involved in your care, CQC-registered partner providers, diagnostic laboratories, secure technology providers, payment processors, website and analytics providers, regulators, insurers, legal advisers, and other service providers who help us operate the clinic.",
      "We may also share information where required by law, court order, regulatory request, safeguarding duty, or to protect the vital interests of a patient or another person.",
      "We do not sell your personal information.",
    ],
  },
  {
    title: "7. International transfers",
    body: [
      "Some of the suppliers we use may process personal data outside the UK. Where this happens, we take reasonable steps to ensure appropriate safeguards are in place, such as adequacy regulations, standard contractual clauses, or equivalent protective measures.",
    ],
  },
  {
    title: "8. Data retention",
    body: [
      "We keep personal data only for as long as necessary for the purposes for which it was collected, including legal, accounting, regulatory and clinical record-keeping requirements.",
      "Clinical records may need to be retained for extended periods in line with professional standards and applicable law. Website analytics and marketing data are typically retained for shorter periods unless a longer retention period is required for security, compliance or dispute resolution.",
    ],
  },
  {
    title: "9. Data security",
    body: [
      "We use appropriate technical and organisational measures designed to protect your information against accidental loss, misuse, unauthorised access, disclosure, alteration or destruction. These measures may include access controls, encryption, secure hosting, audit logging, role-based permissions and contractual controls with our suppliers.",
      "No online system can ever be guaranteed completely secure, but we work to maintain security practices that are appropriate for the sensitivity of the information we handle, particularly health-related data.",
    ],
  },
  {
    title: "10. Your rights",
    body: [
      "Subject to the limits set by law, you may have the right to request access to the personal data we hold about you, ask for inaccurate information to be corrected, request erasure in certain circumstances, restrict or object to processing, and request portability of certain information.",
      "If we rely on consent, you also have the right to withdraw that consent at any time. Withdrawal will not affect processing already carried out lawfully before that point.",
      "To exercise your rights, please contact us using the details below. We may need to verify your identity before responding.",
    ],
  },
  {
    title: "11. Cookies and analytics",
    body: [
      "Our website may use cookies and similar technologies to enable core functionality, understand site usage, improve performance and support relevant marketing activity. For detailed information about the cookies we use and how to manage them, please read our Cookie Policy.",
    ],
  },
  {
    title: "12. Children",
    body: [
      "Our services and website are generally intended for adults. We do not knowingly collect personal data from children through the website without appropriate authority or legal basis. If you believe a child has provided personal information inappropriately, please contact us so we can investigate.",
    ],
  },
  {
    title: "13. Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect legal, clinical, operational or technology changes. The latest version will always be posted on this page with the effective date shown below.",
    ],
  },
];

function PolicySection({ title, body }: { title: string; body: string[] }) {
  return (
    <section style={{ padding: "30px 0", borderTop: "1px solid rgba(0,0,0,.08)" }}>
      <h2
        className="cg"
        style={{
          fontSize: "clamp(1.6rem, 3.2vw, 2.1rem)",
          fontWeight: 500,
          color: "var(--sl)",
          lineHeight: 1.2,
          marginBottom: 14,
        }}
      >
        {title}
      </h2>
      <div style={{ display: "grid", gap: 14 }}>
        {body.map((paragraph) => (
          <p
            key={paragraph}
            style={{ fontSize: ".98rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 880 }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ background: "var(--iv)" }}>
        <section
          style={{
            paddingTop: "calc(var(--nav-h) + 56px)",
            paddingBottom: 28,
            paddingLeft: "var(--pad)",
            paddingRight: "var(--pad)",
            background:
              "radial-gradient(ellipse 62% 48% at 70% 22%, rgba(200,168,75,.08) 0%, transparent 60%), var(--iv)",
          }}
        >
          <div className="wrap" style={{ maxWidth: 980 }}>
            <p className="lbl">Legal</p>
            <div className="rule" />
            <h1
              className="cg"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                fontWeight: 500,
                color: "var(--sl)",
                lineHeight: 1.05,
                marginBottom: 18,
              }}
            >
              Privacy Policy
            </h1>
            <p style={{ fontSize: "1.05rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 760 }}>
              This policy explains how Veridian Clinic collects, uses and protects your personal
              information, including health information provided through our website and clinical
              services.
            </p>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                alignItems: "center",
              }}
            >
              <span className="badge">Effective date: 9 April 2026</span>
              <Link href="/cookies" className="btn btn-ol" style={{ width: "auto" }}>
                View Cookie Policy
              </Link>
            </div>
          </div>
        </section>

        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 980 }}>
            <div
              style={{
                background: "var(--wh)",
                border: "1px solid rgba(0,0,0,.08)",
                boxShadow: "0 24px 70px rgba(13,40,24,.08)",
                padding: "clamp(24px, 5vw, 52px)",
              }}
            >
              <div
                style={{
                  marginBottom: 20,
                  paddingBottom: 20,
                  borderBottom: "1px solid rgba(0,0,0,.08)",
                }}
              >
                <p style={{ fontSize: ".78rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--fo)" }}>
                  Data controller
                </p>
                <p style={{ fontSize: ".96rem", color: "var(--sl2)", lineHeight: 1.9, marginTop: 8 }}>
                  Veridian Clinic. For privacy or data protection enquiries, please contact us via
                  the clinic contact details published on the website. Where regulated medical
                  services are delivered by a partner provider, that provider may act as a separate
                  controller for the care it delivers.
                </p>
              </div>

              {sections.map((section) => (
                <PolicySection key={section.title} title={section.title} body={section.body} />
              ))}

              <section style={{ paddingTop: 30, borderTop: "1px solid rgba(0,0,0,.08)" }}>
                <h2
                  className="cg"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.1rem)", fontWeight: 500, color: "var(--sl)", marginBottom: 14 }}
                >
                  14. Complaints
                </h2>
                <p style={{ fontSize: ".98rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 880 }}>
                  If you have concerns about how your data has been handled, please contact Veridian
                  Clinic first so we can try to resolve the matter. You also have the right to lodge a
                  complaint with the Information Commissioner’s Office (ICO) if you believe your data
                  protection rights have been infringed.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
