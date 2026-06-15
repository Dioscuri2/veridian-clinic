import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "The Metabolic Reset Guide | Veridian Clinic -- £19.99" },
  description: "A 21-day, GP-written metabolic reset programme. Includes meal plan, fasting protocols, supplement guide, and a daily tracker. Designed for people with insulin resistance, low energy, and weight gain.",
  alternates: { canonical: "https://veridianclinic.com/metabolic-reset-guide" },
  openGraph: {
    title: "The Metabolic Reset Guide | £19.99",
    description: "21-day GP-written metabolic reset. Meal plan, fasting guide, supplement stack, habit tracker.",
    url: "https://veridianclinic.com/metabolic-reset-guide",
    type: "website",
  },
};

export default function MetabolicResetGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
