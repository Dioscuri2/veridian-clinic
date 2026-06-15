import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Veridian Clinic",
  description: "Get in touch with Veridian Clinic. Ask a question about our blood test panels, private GP services, or how to get started. Based in the UK, serving patients nationally.",
  alternates: { canonical: "https://veridianclinic.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
