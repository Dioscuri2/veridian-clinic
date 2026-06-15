import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Your Metabolic Scorecard | Veridian Clinic" },
  description: "Get your free personalised metabolic scorecard emailed to you. Based on your quiz answers, it covers your key risk areas and the markers worth testing.",
  alternates: { canonical: "https://veridianclinic.com/metabolic-quiz/scorecard" },
};

export default function ScorecardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
