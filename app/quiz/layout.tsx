import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Weight Loss Eligibility Quiz | Veridian Clinic" },
  description: "Check whether you are a suitable candidate for a private medical weight loss consultation at Veridian Clinic. Takes 2 minutes.",
  alternates: { canonical: "https://veridianclinic.com/quiz" },
  robots: { index: true, follow: true },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
