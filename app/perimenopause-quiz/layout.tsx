import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Free Perimenopause Quiz UK | Veridian Clinic" },
  description: "Are your symptoms perimenopause? Take this free 5-question quiz built by a private GP. Sleep disruption, mood changes, irregular cycles, and cognitive shifts -- find out if perimenopause is likely.",
  alternates: { canonical: "https://veridianclinic.com/perimenopause-quiz" },
  openGraph: {
    title: "Free Perimenopause Quiz UK | Veridian Clinic",
    description: "5 questions. A clinical read on whether your symptoms fit perimenopause.",
    url: "https://veridianclinic.com/perimenopause-quiz",
    type: "website",
  },
};

export default function PerimenopauseQuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
