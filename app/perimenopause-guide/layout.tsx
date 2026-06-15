import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Free Perimenopause Guide UK | Veridian Clinic" },
  description: "A free clinical guide to perimenopause symptoms, hormone changes, and what a GP-reviewed blood panel can tell you. Written for women in their 40s who have been told everything is normal.",
  alternates: { canonical: "https://veridianclinic.com/perimenopause-guide" },
  openGraph: {
    title: "Free Perimenopause Guide UK | Veridian Clinic",
    description: "Symptoms, science, and blood markers. A free guide for women navigating perimenopause.",
    url: "https://veridianclinic.com/perimenopause-guide",
    type: "website",
  },
};

export default function PerimenopauseGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
