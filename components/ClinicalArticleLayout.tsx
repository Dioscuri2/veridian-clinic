import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import { FONTS, CSS } from "@/components/globalStyles";

type Cta = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
};

type Props = {
  eyebrow?: string;
  title: string;
  intro: string;
  children: ReactNode;
  ctas?: Cta[];
  heroImage?: string;
  heroAlt?: string;
};

export default function ClinicalArticleLayout({
  eyebrow = "Clinical Insights",
  title,
  intro,
  children,
  ctas = [],
  heroImage,
  heroAlt = "",
}: Props) {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <ReadingProgress />
      <main style={{ paddingTop: "var(--nav-h)", background: "var(--iv)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl">{eyebrow}</p>
            <div className="rule" />
            <h1 className="sh-title">{title}</h1>
            <p className="sh-body" style={{ margin: "16px 0 28px", maxWidth: 760 }}>
              {intro}
            </p>
            {heroImage && (
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", marginBottom: 28, overflow: "hidden" }}>
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 860px"
                />
              </div>
            )}
            <article className="card" style={{ display: "grid", gap: 20 }}>
              {children}
              <div style={{ fontSize: ".78rem", color: "var(--sl3)", borderTop: "1px solid rgba(44,42,38,.08)", paddingTop: 14, lineHeight: 1.75 }}>
                <strong style={{ color: "var(--sl2)" }}>Medical disclaimer:</strong> This article is for informational purposes only and does not constitute medical advice or a clinical diagnosis. Always consult a qualified healthcare professional before making any changes to your health management. Registered clinical activities at Veridian Clinic are delivered via ThanksDoc (thanksdoc.co.uk).
              </div>
              {ctas.length > 0 && (
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                  {ctas.map((cta) => (
                    <Link
                      key={cta.href + cta.label}
                      href={cta.href}
                      className={cta.variant === "secondary" ? "btn btn-ol" : cta.variant === "tertiary" ? "btn btn-fo" : "btn btn-go"}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
