import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Book a private GP consultation with Veridian Clinic. GP Discovery Core, metabolic blood test panels, and 12-week programmes available. No referral needed.",
  alternates: { canonical: "https://veridianclinic.com/book" },
  robots: { index: true, follow: true },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
