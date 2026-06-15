import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Private Weight Loss Programme UK | Veridian Clinic" },
  description: "GP-led medical weight loss programme. Prescription medication where appropriate, metabolic blood testing, and a clinical plan built around your specific biology. No fad diets.",
  alternates: { canonical: "https://veridianclinic.com/weight-loss" },
  openGraph: {
    title: "Private Weight Loss Programme UK | Veridian Clinic",
    description: "GP-led. Medication where appropriate. Blood-test guided. Results focused.",
    url: "https://veridianclinic.com/weight-loss",
    type: "website",
  },
};

export default function WeightLossLayout({ children }: { children: React.ReactNode }) {
  return children;
}
