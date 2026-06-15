import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Metabolic Health Assessment | Veridian Clinic" },
  description: "Your personalised metabolic health assessment from Veridian Clinic. Covering body strength, energy and metabolism, sleep, and stress -- with clinical context and next steps.",
  alternates: { canonical: "https://veridianclinic.com/assessments" },
  openGraph: {
    title: "Metabolic Health Assessment | Veridian Clinic",
    description: "See your four metabolic health domains scored. Private GP-built assessment.",
    url: "https://veridianclinic.com/assessments",
    type: "website",
  },
};

export default function AssessmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
