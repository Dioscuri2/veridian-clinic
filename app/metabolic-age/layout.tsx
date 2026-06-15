import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Check Your Metabolic Age | Veridian Clinic" },
  description: "A free tool to estimate your metabolic age based on energy, sleep, exercise, stress and recovery. Built by a private GP. Discover where your metabolism is ahead or behind your years.",
  alternates: { canonical: "https://veridianclinic.com/metabolic-age" },
  openGraph: {
    title: "Check Your Metabolic Age | Veridian Clinic",
    description: "How old is your metabolism? Free 5-minute assessment from a private GP clinic.",
    url: "https://veridianclinic.com/metabolic-age",
    type: "website",
  },
};

export default function MetabolicAgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
