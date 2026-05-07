"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

const hd: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 600,
  color: "#2c2a26",
  margin: "24px 0 8px",
  letterSpacing: "0.01em",
};
const p: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#5a534a",
  lineHeight: 1.9,
  margin: "0 0 12px",
};
const ul: React.CSSProperties = {
  paddingLeft: "1.3em",
  margin: "0 0 12px",
  color: "#5a534a",
  fontSize: "0.9rem",
  lineHeight: 1.9,
};

const THANKSDOC_TERMS = (
  <>
    <h3 style={hd}>Introduction and Responsibilities</h3>
    <p style={p}>ThanksDoc, operated by Endura Health LTD (Company No. 15418491, registered in England and Wales), provides online video consultations and in-person medical appointments through partner premises. Registered with the Care Quality Commission (registration number 1-18826835219). By using services delivered through the ThanksDoc regulatory framework, users agree to these terms and conditions.</p>
    <p style={p}>Contact: info@thanksdoc.co.uk · 0800 246 2458 · 639 High Road, The Trampery, N17 8AA, United Kingdom.</p>

    <h3 style={hd}>Not an Emergency Service</h3>
    <p style={p}>This service is <strong>not an emergency service</strong>. If you are experiencing a medical emergency — including difficulty breathing, severe bleeding, chest pain, severe allergic reactions, loss of consciousness, major trauma, or suspected heart attack or stroke — call <strong>999</strong> immediately or go to your nearest A&amp;E. If unsure, call NHS 111.</p>

    <h3 style={hd}>Professional Standards</h3>
    <p style={p}>Clinicians are registered with the General Medical Council and comply with GMC guidelines on remote prescribing. Services follow standards set by the Care Quality Commission and healthcare regulators.</p>

    <h3 style={hd}>Medications Not Prescribed</h3>
    <p style={p}>The following will not be prescribed under any circumstances:</p>
    <ul style={ul}>
      <li>Class A, B, or C drugs</li>
      <li>Schedule 1–5 controlled medications</li>
      <li>Z-drugs (Zopiclone, Zolpidem, Zaleplon)</li>
      <li>Opioids, benzodiazepines, barbiturates, gabapentinoids</li>
      <li>Strong stimulants or substances with abuse potential</li>
      <li>All controlled drugs under the Misuse of Drugs Act 1971</li>
    </ul>

    <h3 style={hd}>Conditions and Services Not Covered</h3>
    <ul style={ul}>
      <li>Emergency conditions (severe chest pain, seizures, heavy bleeding, stroke, severe pain, breathing difficulties, fever with confusion, severe mental health crises)</li>
      <li>Controlled drug prescriptions</li>
      <li>Patients physically located outside the UK during consultation</li>
      <li>Repeat prescriptions (except through specific membership packages)</li>
      <li>Pregnancy complications</li>
      <li>Major trauma or head injuries</li>
      <li>Chemotherapy patients with suspected infection</li>
      <li>Dental problems</li>
      <li>NHS referrals or NHS prescriptions</li>
    </ul>

    <h3 style={hd}>Registration and Patient Commitments</h3>
    <p style={p}>Users aged 18 or over can use services without formal registration. Minors require a responsible carer or parent present. By using services, patients agree to: answer questions truthfully and completely; not register multiple times or for others; follow clinician instructions carefully; accept clinician decisions regarding prescribed medicines; treat staff respectfully; permit GP notification of prescribed medicines; and report side effects or medication ineffectiveness.</p>

    <h3 style={hd}>Privacy and Security</h3>
    <p style={p}>ThanksDoc complies with UK data protection legislation. Patient information is protected through security technology including firewalls and Secure Socket Layers. Electronic transmissions carry inherent risks of interception. Users must not introduce malicious code, attempt unauthorised access, or launch denial-of-service attacks. Such breaches constitute criminal offences under the Computer Misuse Act 1990.</p>

    <h3 style={hd}>Pricing and Payment</h3>
    <p style={p}>All prices are in pounds sterling and include VAT unless stated otherwise. Users authorise payment card charges for orders, delivery fees, and associated charges. Refunds via payment gateway may take up to five working days. Prescriptions are valid for six months from issue date. Medicines uncollected within this period are non-refundable.</p>

    <h3 style={hd}>Refunds and Cancellations</h3>
    <p style={p}>No refunds are provided for consultations cancelled within 48 hours or those not resulting in a preferred prescription. Third-party services including blood tests and scans are non-refundable. Clinicians are under no obligation to supply prescriptions — treatment suitability is determined by clinical judgement and legislation.</p>

    <h3 style={hd}>Liability</h3>
    <p style={p}>Nothing in these terms limits liability for death or personal injury from negligence or fraud. Endura Health Ltd accepts full clinical responsibility as required by law. ThanksDoc is not liable for losses from inaccurate or incomplete information, emotional well-being loss, lost income, lost opportunities, or indirect, consequential, special, or exemplary damages.</p>

    <h3 style={hd}>Customer Service and Complaints</h3>
    <p style={p}>For cancellations, refunds, or damaged/faulty products: <strong>patienthelp@thanksdoc.co.uk</strong>. For complaints regarding regulated clinical care: <strong>complaints@thanksdoc.co.uk</strong>.</p>

    <h3 style={hd}>International Use</h3>
    <p style={p}>All services comply with UK law. Non-UK residents must be physically located in the UK during medical consultations. ThanksDoc makes no claims that services are lawful outside the United Kingdom.</p>

    <h3 style={hd}>Governing Law</h3>
    <p style={p}>These terms are governed by the laws of England and Wales. Both parties submit to non-exclusive English and Welsh court jurisdiction. ThanksDoc reserves the right to change these terms at any time; continued use after updates indicates agreement.</p>
    <p style={{ ...p, color: "#8a8278", fontSize: "0.8rem" }}>ThanksDoc Terms last updated: 05/02/2026. Source: thanksdoc.co.uk/terms-and-conditions/</p>
  </>
);

const THANKSDOC_PRIVACY = (
  <>
    <p style={p}>ThanksDoc is committed to protecting and respecting your privacy. This Privacy Policy explains how Endura Health LTD (operating as ThanksDoc) collects, uses, stores, and safeguards your personal information.</p>
    <p style={p}><strong>Data Protection Officer:</strong> Dr Linda Odogwu · info@thanksdoc.co.uk · 0800 246 5824 · 639 The Trampery, ThanksDoc, High Road, N17 8AA.</p>

    <h3 style={hd}>What Data We Collect</h3>
    <p style={p}><em>Personal Identification:</em> Full name, date of birth, contact details (address, email, phone), NHS number (if applicable).</p>
    <p style={p}><em>Health Information:</em> Medical history, current medications, health concerns or symptoms you disclose, diagnoses, prescriptions, treatment plans, and results of diagnostic tests.</p>
    <p style={p}><em>Technical Data:</em> IP address, device information (browser type, operating system), usage data relating to how you interact with the website or app.</p>
    <p style={p}><em>Financial Information:</em> Payment details for services.</p>

    <h3 style={hd}>How We Use Your Data</h3>
    <ul style={ul}>
      <li>Diagnosis and treatment: to assess symptoms and medical history, offer diagnoses, and prescribe appropriate treatment</li>
      <li>Appointments: to schedule and manage consultations</li>
      <li>Medical records: to maintain accurate records in line with legal and regulatory requirements</li>
      <li>Communication: to contact you about appointments, test results, and follow-up care</li>
      <li>Data sharing: to share your data with third parties when necessary for your care (e.g., specialist referrals, diagnostic tests)</li>
      <li>Payments: to process payments for appointments and other services</li>
    </ul>

    <h3 style={hd}>Legal Basis for Processing</h3>
    <p style={p}>Under UK GDPR, we process your data under: consent; performance of a contract (delivering healthcare services); legal obligation (compliance with applicable laws); vital interests (emergency situations); and public interest (public health reporting obligations).</p>

    <h3 style={hd}>How We Share Your Data</h3>
    <p style={p}>We may share your personal data with: healthcare providers (doctors, specialists, facilities) involved in your care; the NHS for continuity of care; pharmacies to fulfil prescriptions; regulatory bodies (CQC, GMC); and third-party IT service providers for data security and compliance.</p>
    <p style={p}>In exceptional circumstances, we may share your information without consent if required by law or to protect vital interests, including safeguarding vulnerable individuals or responding to public health emergencies. <strong>We do not sell your personal information.</strong></p>

    <h3 style={hd}>Data Security</h3>
    <p style={p}>We use encryption when transmitting and storing sensitive data; access controls limiting data access to authorised personnel; regular security audits; and incident management with regulatory reporting for any data breaches.</p>

    <h3 style={hd}>Data Retention</h3>
    <p style={p}>Your medical records will be retained in accordance with NHS and healthcare regulatory guidelines — typically for at least 8 years after your last interaction with the service, or longer if required by law. We keep personal data only for as long as necessary for the purposes for which it was collected.</p>

    <h3 style={hd}>Your Rights</h3>
    <ul style={ul}>
      <li>Right to access the personal data we hold about you</li>
      <li>Right to rectification of inaccurate or incomplete data</li>
      <li>Right to erasure in certain circumstances</li>
      <li>Right to restrict processing in certain circumstances</li>
      <li>Right to data portability</li>
      <li>Right to object to processing based on legitimate interests</li>
      <li>Right to withdraw consent at any time (without affecting prior lawful processing)</li>
    </ul>
    <p style={p}>To exercise your rights, contact the Data Protection Officer above.</p>

    <h3 style={hd}>Complaints</h3>
    <p style={p}>If you have concerns about how your data has been handled, contact ThanksDoc first at info@thanksdoc.co.uk. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk if you believe your data protection rights have been infringed.</p>

    <p style={{ ...p, color: "#8a8278", fontSize: "0.8rem" }}>ThanksDoc Privacy Policy last updated: 12/04/2025. Source: thanksdoc.co.uk/privacy-policy/</p>
  </>
);

export default function LegalModal({
  type,
  onClose,
}: {
  type: "terms" | "privacy";
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const isTerms = type === "terms";
  const title = isTerms ? "Terms & Conditions" : "Privacy Policy";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`ThanksDoc ${title}`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(13,11,8,0.82)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#f6f1e8",
          width: "100%",
          maxWidth: "820px",
          height: "92vh",
          borderRadius: "16px 16px 0 0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 -24px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#2c2a26",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span
                style={{
                  background: "#c8a84b",
                  color: "#2c2a26",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  textTransform: "uppercase",
                }}
              >
                Powered by ThanksDoc
              </span>
            </div>
            <p style={{ color: "#f6f1e8", fontSize: "1rem", fontWeight: 600, margin: 0 }}>
              {title}
            </p>
            <p style={{ color: "rgba(246,241,232,0.5)", fontSize: "0.75rem", margin: "3px 0 0" }}>
              Veridian Clinic operates under the ThanksDoc regulatory framework · CQC reg. 1-18826835219
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "rgba(246,241,232,0.1)",
              border: "1px solid rgba(246,241,232,0.2)",
              color: "#f6f1e8",
              width: 36,
              height: 36,
              borderRadius: "50%",
              fontSize: "1.1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 48px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {isTerms ? THANKSDOC_TERMS : THANKSDOC_PRIVACY}
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            padding: "14px 28px",
            borderTop: "1px solid rgba(44,42,38,0.12)",
            background: "#ede8df",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.78rem", color: "#8a8278" }}>
            Complaints regarding regulated clinical care:{" "}
            <a href="mailto:complaints@thanksdoc.co.uk" style={{ color: "#2c2a26" }}>
              complaints@thanksdoc.co.uk
            </a>
          </p>
          <button
            onClick={onClose}
            style={{
              background: "#2c2a26",
              color: "#f6f1e8",
              border: "none",
              padding: "9px 22px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
