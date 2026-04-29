import type { ReactNode } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
};

export default function ClinicalArticleLayout({
  eyebrow = "Clinical Insights",
  title,
  intro,
  children,
  ctas = [],
}: Props) {
  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)", background: "var(--iv)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <p className="lbl">{eyebrow}</p>
            <div className="rule" />
            <h1 className="sh-title">{title}</h1>
            <p className="sh-body" style={{ margin: "16px 0 28px", maxWidth: 760 }}>
              {intro}
            </p>
            <article className="card" style={{ display: "grid", gap: 20 }}>
              {children}
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
