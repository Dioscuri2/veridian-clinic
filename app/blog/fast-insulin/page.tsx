import type { Metadata } from "next";
import FastInsulinClient from "./FastInsulinClient";

export const metadata: Metadata = {
  title: "Fasting Insulin, Hyperinsulinemia, and Early Metabolic Risk",
  description:
    "A clinical deep dive into fasting insulin, why normal glucose markers can miss early metabolic dysfunction, and how to act before cardiometabolic disease becomes obvious.",
  alternates: {
    canonical: "https://veridian-clinic.vercel.app/blog/fast-insulin",
  },
  openGraph: {
    title: "Fasting Insulin: The Missing Link in Early Metabolic Disease",
    description:
      "Why fasting glucose and HbA1c can look normal while hyperinsulinemia silently drives visceral fat, fatigue, and vascular risk.",
    url: "https://veridian-clinic.vercel.app/blog/fast-insulin",
    type: "article",
  },
};

export default function FastInsulinPage() {
  return <FastInsulinClient />;
}
