import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { FONTS, CSS } from "@/components/globalStyles";

const benefits = [
  "High-touch, physician-led preventive oversight",
  "Priority access when enrolment opens",
  "Broader diagnostic sequencing for complex executive lifestyles",
  "Performance, resilience, and longevity strategy in one pathway",
];

const pillars = [
  {
    title: "Clinical depth",
    body: "A more expansive review of metabolic, cardiovascular, recovery, and longevity risk — built for people who need precision, not generic reassurance.",
  },
  {
    title: "Continuity",
    body: "Designed as an ongoing clinical relationship, with a stronger emphasis on physician oversight, interpretation, sequencing, and strategic follow-through.",
  },
  {
    title: "Executive fit",
    body: "Built for high-demand schedules, complex stress loads, travel, and performance expectations where standard annual check-ups leave too much unseen.",
  },
];

export const metadata = {
  title: "Executive Healthspan Waitlist | Veridian Clinic",
  description:
    "Apply for priority access to Veridian Clinic’s Executive Healthspan pathway — an exclusive, high-touch clinical experience.",
};

export default function ExecutiveWaitlistPage() {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)", background: "var(--iv)" }}>
        <section
          style={{
            padding: "36px var(--pad) 72px",
            background:
              "radial-gradient(ellipse 65% 55% at 72% 18%, rgba(200,168,75,.12) 0%, transparent 60%), linear-gradient(180deg, #f6f1e8 0%, #efe6d8 100%)",
          }}
        >
          <div className="wrap" style={{ maxWidth: 1180 }}>
            <div className="g2-hero" style={{ display: "grid", alignItems: "start" }}>
              <div>
                <div className="badge-row a1" style={{ marginBottom: 22 }}>
                  <span className="badge">Executive Healthspan</span>
                  <span className="badge">Priority Access</span>
                  <span className="badge">GP-Led</span>
                </div>
                <p className="lbl a1">Exclusive Clinical Pathway</p>
                <div className="rule a2" />
                <h1
                  className="cg a2"
                  style={{
                    fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
                    fontWeight: 500,
                    lineHeight: 1.04,
                    color: "var(--sl)",
                    marginBottom: 20,
                    maxWidth: 760,
                  }}
                >
                  Apply for Priority Access.
                  <br />
                  <em style={{ fontStyle: "italic", color: "var(--fo)" }}>Executive Healthspan</em>
                </h1>
                <p
                  className="a3"
                  style={{ fontSize: "1.03rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 700, marginBottom: 18 }}
                >
                  The Executive Healthspan pathway is an exclusive, high-touch clinical experience. Join the waitlist to be notified when enrollment opens.
                </p>
                <p
                  className="a3"
                  style={{ fontSize: ".95rem", color: "var(--sl3)", lineHeight: 1.9, maxWidth: 680, marginBottom: 28 }}
                >
                  For leaders, founders, clinicians, and high-performing operators who want deeper preventive oversight, broader diagnostics, and a more strategic plan for performance and longevity.
                </p>

                <div className="a4" style={{ display: "grid", gap: 12, maxWidth: 640, marginBottom: 32 }}>
                  {benefits.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        background: "rgba(255,255,255,.62)",
                        border: "1px solid rgba(13,40,24,.08)",
                      }}
                    >
                      <span
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "var(--fo)",
                          color: "var(--go2)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: ".72rem",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.75 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="a3">
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(13,40,24,1) 0%, rgba(19,31,46,1) 100%)",
                    padding: "clamp(24px, 5vw, 36px)",
                    border: "1px solid rgba(0,0,0,.08)",
                    boxShadow: "0 26px 80px rgba(13,40,24,.18)",
                  }}
                >
                  <LeadCaptureForm
                    source="executive-healthspan-waitlist"
                    list="executive_waitlist"
                    title="Request priority access"
                    subtitle="Complete the executive intake below. This waitlist is kept separate from Veridian’s general newsletter and standard lead capture."
                    successMessage="Your Executive Healthspan application has been received. We’ll contact you when priority access opens."
                    consentLabel="I agree to be contacted by Veridian Clinic about the Executive Healthspan pathway, including enrolment updates and relevant clinical follow-up."
                    ctaLabel="Apply for Priority Access →"
                    buttonClassName="btn btn-go btn-full"
                    compact
                    fields={["firstName", "email", "phone"]}
                  />
                </div>
                <div
                  style={{
                    marginTop: 16,
                    padding: "16px 18px",
                    background: "rgba(255,255,255,.72)",
                    border: "1px solid rgba(13,40,24,.08)",
                  }}
                >
                  <p style={{ fontSize: ".78rem", color: "var(--sl2)", lineHeight: 1.8 }}>
                    Executive waitlist submissions are segmented separately for clinical follow-up and priority-access communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec bg-wh">
          <div className="wrap" style={{ maxWidth: 1120 }}>
            <div className="sh text-center">
              <p className="lbl">Why this pathway exists</p>
              <div className="rule rule-c" />
              <h2 className="sh-title">A more strategic form of preventive medicine.</h2>
              <p className="sh-body" style={{ maxWidth: 760 }}>
                Executive Healthspan is designed for people whose health decisions carry disproportionate consequences — professionally, personally, and over the long term.
              </p>
            </div>

            <div className="g3">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="card">
                  <p className="lbl" style={{ marginBottom: 14 }}>
                    {pillar.title}
                  </p>
                  <h3 className="cg" style={{ fontSize: "1.8rem", fontWeight: 500, color: "var(--sl)", marginBottom: 14 }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.9 }}>{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
