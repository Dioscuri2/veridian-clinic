import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MetabolicScorecard from "@/components/MetabolicScorecard";
import { FONTS, CSS } from "@/components/globalStyles";

export const metadata: Metadata = {
  title: "Metabolic Health Scorecard | Free GP-Led Risk Snapshot",
  description:
    "Take the Veridian Clinic Metabolic Health Scorecard. A 7-question clinical quiz using waist-to-height ratio, sleep, activity, and diet to reveal your metabolic risk snapshot.",
  alternates: {
    canonical: "https://veridian.clinic/metabolic-scorecard",
  },
  openGraph: {
    title: "Metabolic Health Scorecard | Veridian Clinic",
    description:
      "A free 7-question metabolic risk scorecard with waist-to-height ratio, sleep, activity, and diet scoring.",
    url: "https://veridian.clinic/metabolic-scorecard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metabolic Health Scorecard | Veridian Clinic",
    description:
      "A free metabolic scorecard using waist-to-height ratio, sleep, activity, and diet.",
  },
};

export default async function MetabolicScorecardPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) || {};
  const embed = params.embed === "true";

  return (
    <>
      <style>{FONTS + CSS}</style>
      {!embed ? <Navigation /> : null}
      <main style={{ paddingTop: embed ? 0 : "var(--nav-h)", minHeight: "100svh", background: "var(--iv)" }}>
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 1120 }}>
            {!embed ? (
              <div className="text-center" style={{ maxWidth: 760, margin: "0 auto 34px" }}>
                <p className="lbl">Free Tool</p>
                <div className="rule rule-c" />
                <h1 className="sh-title">Metabolic Health Scorecard</h1>
                <p className="sh-body" style={{ maxWidth: 720 }}>
                  A fast clinical screening tool to estimate metabolic drift before it becomes obvious disease.
                </p>
              </div>
            ) : null}
            <MetabolicScorecard />
          </div>
        </section>
      </main>
      {!embed ? <Footer /> : null}
    </>
  );
}
