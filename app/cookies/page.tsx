import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Veridian Clinic, including cookie categories, analytics, and cookie settings information.",
  alternates: { canonical: "https://veridian-clinic.vercel.app/cookies" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. What are cookies?",
    paragraphs: [
      "Cookies are small text files placed on your device when you visit a website. They help websites function properly, remember preferences, understand how visitors use the site, and support performance, security and marketing activities.",
      "Some cookies are set by Veridian Clinic directly. Others may be set by trusted third-party services we use to support website functionality, analytics, booking workflows or communications.",
    ],
  },
  {
    title: "2. Why we use cookies",
    paragraphs: [
      "We use cookies and similar technologies to keep the website functioning, maintain security, understand how visitors use the site, improve performance, measure the effectiveness of pages and campaigns, and support a more relevant user experience.",
      "Some cookies are strictly necessary for the site to operate. Others are optional and may be used only where you have given consent, depending on the category and your location.",
    ],
  },
  {
    title: "3. Types of cookies we may use",
    paragraphs: [
      "Strictly necessary cookies: these are required for core site functionality, navigation, form handling, security and fraud prevention. The website may not function properly without them.",
      "Performance and analytics cookies: these help us understand traffic sources, page usage, device types, and how visitors interact with the site, so we can improve content, journeys and technical performance.",
      "Functionality cookies: these remember settings or choices you make, such as form state, consent preferences or region/language-related behaviour where applicable.",
      "Advertising and marketing cookies: these may be used to help measure campaigns, build audiences, or show more relevant content on other platforms. We only use these where appropriate and subject to consent requirements.",
    ],
  },
  {
    title: "4. Third-party technologies",
    paragraphs: [
      "Our website may use third-party providers for analytics, forms, booking workflows, communications, hosting, content delivery, or advertising attribution. These providers may set cookies or use similar technologies in accordance with their own privacy documentation.",
      "Where required, we aim to configure these services in a privacy-conscious way and request consent before non-essential technologies are activated.",
    ],
  },
  {
    title: "5. How long cookies stay on your device",
    paragraphs: [
      "Some cookies are session cookies and expire when you close your browser. Others are persistent cookies and remain on your device for a defined period or until deleted manually. Retention varies depending on the cookie’s purpose and the provider that sets it.",
    ],
  },
  {
    title: "6. Managing cookies in your browser",
    paragraphs: [
      "Most browsers let you review, block or delete cookies through their settings. You can usually also configure your browser to notify you when cookies are being set. Blocking some cookies may affect the functionality or performance of this website.",
      "You can also use browser controls or device settings to limit certain types of tracking technologies. The exact steps depend on your browser and device.",
    ],
  },
  {
    title: "7. Updates to this policy",
    paragraphs: [
      "We may update this Cookie Policy from time to time to reflect changes in law, technology, suppliers, or how we operate the site. The latest version will always appear on this page with the effective date below.",
    ],
  },
];

const cookieRows = [
  {
    category: "Strictly necessary",
    purpose: "Core site operation, navigation, security, consent preferences, load balancing and fraud prevention.",
    required: "Always active",
  },
  {
    category: "Performance & analytics",
    purpose: "Understand website traffic, popular pages, form completion trends and technical performance.",
    required: "Optional",
  },
  {
    category: "Functionality",
    purpose: "Remember preferences or choices to improve user experience across visits.",
    required: "Optional",
  },
  {
    category: "Advertising & marketing",
    purpose: "Measure campaigns, attribution and audience performance across external platforms.",
    required: "Optional",
  },
];

function Section({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section style={{ padding: "30px 0", borderTop: "1px solid rgba(0,0,0,.08)" }}>
      <h2
        className="cg"
        style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.1rem)", fontWeight: 500, color: "var(--sl)", marginBottom: 14 }}
      >
        {title}
      </h2>
      <div style={{ display: "grid", gap: 14 }}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} style={{ fontSize: ".98rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 880 }}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function CookiePolicyPage() {
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
              "radial-gradient(ellipse 58% 46% at 72% 20%, rgba(13,40,24,.06) 0%, transparent 60%), var(--iv)",
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
              Cookie Policy
            </h1>
            <p style={{ fontSize: "1.05rem", color: "var(--sl2)", lineHeight: 1.95, maxWidth: 760 }}>
              This page explains how Veridian Clinic uses cookies and similar technologies on this
              website, what they do, and how you can manage your preferences.
            </p>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <span className="badge">Effective date: 9 April 2026</span>
              <Link href="/privacy" className="btn btn-ol" style={{ width: "auto" }}>
                View Privacy Policy
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
                  padding: "20px 22px",
                  marginBottom: 26,
                  background: "var(--iv)",
                  borderLeft: "3px solid var(--go)",
                }}
              >
                <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.9 }}>
                  If a cookie banner or consent tool is available on this website, your choices there
                  will apply to optional cookies. Strictly necessary cookies remain active because they
                  are required for core functionality and security.
                </p>
              </div>

              {sections.map((section) => (
                <Section key={section.title} title={section.title} paragraphs={section.paragraphs} />
              ))}

              <section style={{ padding: "30px 0", borderTop: "1px solid rgba(0,0,0,.08)" }}>
                <h2
                  className="cg"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.1rem)", fontWeight: 500, color: "var(--sl)", marginBottom: 14 }}
                >
                  8. Cookie categories in use
                </h2>
                <div style={{ overflowX: "auto", border: "1px solid rgba(0,0,0,.08)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720, background: "var(--wh)" }}>
                    <thead>
                      <tr style={{ background: "var(--fo)" }}>
                        <th style={thStyle}>Category</th>
                        <th style={thStyle}>Purpose</th>
                        <th style={thStyle}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cookieRows.map((row, index) => (
                        <tr key={row.category} style={{ background: index % 2 === 0 ? "var(--wh)" : "rgba(246,241,232,.45)" }}>
                          <td style={tdStyleStrong}>{row.category}</td>
                          <td style={tdStyle}>{row.purpose}</td>
                          <td style={tdStyle}>{row.required}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section style={{ padding: "30px 0", borderTop: "1px solid rgba(0,0,0,.08)" }}>
                <h2
                  className="cg"
                  style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.1rem)", fontWeight: 500, color: "var(--sl)", marginBottom: 14 }}
                >
                  9. Cookie Settings
                </h2>
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(13,40,24,.98) 0%, rgba(19,31,46,.98) 100%)",
                    padding: "clamp(22px, 5vw, 34px)",
                    border: "1px solid rgba(0,0,0,.08)",
                  }}
                >
                  <p style={{ fontSize: ".96rem", color: "rgba(246,241,232,.78)", lineHeight: 1.95, marginBottom: 18 }}>
                    You can manage your cookie preferences through any consent banner or cookie prompt
                    made available on the site. If no dedicated settings panel is currently visible,
                    you can still control cookies through your browser settings by clearing stored
                    cookies or blocking optional categories.
                  </p>
                  <div style={{ display: "grid", gap: 12 }}>
                    {[
                      "Keep strictly necessary cookies enabled to ensure forms, security features and core navigation work correctly.",
                      "Disable optional analytics cookies in your consent tool or browser if you do not want site usage measured.",
                      "Delete existing cookies from your browser at any time to reset stored preferences.",
                      "Review our Privacy Policy for more information about how personal data related to cookies may be used.",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "var(--go2)",
                            marginTop: 10,
                            flexShrink: 0,
                          }}
                        />
                        <p style={{ fontSize: ".92rem", color: "rgba(246,241,232,.72)", lineHeight: 1.9 }}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 12 }}>
                    <Link href="/privacy" className="btn btn-go" style={{ width: "auto" }}>
                      Read Privacy Policy
                    </Link>
                    <Link href="/book" className="btn btn-ol-lt" style={{ width: "auto" }}>
                      Return to Veridian Clinic
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "16px 18px",
  fontSize: ".74rem",
  fontWeight: 700,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "rgba(246,241,232,.8)",
};

const tdStyle: React.CSSProperties = {
  padding: "16px 18px",
  borderTop: "1px solid rgba(0,0,0,.08)",
  fontSize: ".9rem",
  color: "var(--sl2)",
  lineHeight: 1.8,
  verticalAlign: "top",
};

const tdStyleStrong: React.CSSProperties = {
  ...tdStyle,
  fontWeight: 600,
  color: "var(--sl)",
};
