import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Free Metabolic Age Quiz | Veridian Clinic" },
  description: "Find out your metabolic age in 7 questions. Free quiz built by a private GP. Discover how your energy, weight, sleep and glucose balance compare to your chronological age.",
  alternates: { canonical: "https://veridianclinic.com/metabolic-quiz" },
  openGraph: {
    title: "Free Metabolic Age Quiz | Veridian Clinic",
    description: "7 questions. Your metabolic age. Free from a private GP clinic.",
    url: "https://veridianclinic.com/metabolic-quiz",
    type: "website",
  },
};

export default function MetabolicQuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
