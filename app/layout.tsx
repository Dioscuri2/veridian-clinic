import type { Metadata } from "next";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import AOSInit from "@/components/AOSInit";
import AvaChat from "@/components/AvaChat";

export const metadata: Metadata = {
 metadataBase: new URL("https://veridianclinic.com"),
 title: {
 default: "Veridian Clinic | Longevity & Metabolic Health Clinic",
 template: "%s | Veridian Clinic",
 },
 description: "Longevity-focused clinic for metabolic health, advanced biomarker testing, CGM monitoring, and personalised optimisation plans. Registered clinical activities via ThanksDoc (thanksdoc.co.uk).",
 keywords: ["metabolic health clinic UK","longevity clinic UK","health optimisation clinic","CGM monitoring UK","ApoB testing UK","HbA1c private test","12 week metabolic reset","longevity medicine UK","Dr Oluwatosin Taiwo","Veridian Clinic"],
 authors: [{ name: "Dr Oluwatosin Taiwo" }],
 openGraph: {
 type: "website", locale: "en_GB", url: "https://veridianclinic.com", siteName: "Veridian Clinic",
 title: "Veridian Clinic | Longevity & Metabolic Health",
 description: "Understand what's driving your weight, energy, and long-term health then fix it.",
 images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Veridian Clinic" }],
 },
 twitter: { card: "summary_large_image", title: "Veridian Clinic", description: "Advanced biomarker testing, CGM, and personalised optimisation plans.", images: ["/og-image.jpg"] },
 robots: { index: true, follow: true },
 alternates: { canonical: "https://veridianclinic.com" },
};

const schema = {
 "@context": "https://schema.org", "@type": "MedicalBusiness",
 name: "Veridian Clinic",
 description: "Longevity and metabolic health clinic with registered clinical activities via ThanksDoc (thanksdoc.co.uk).",
 url: "https://veridianclinic.com",
 medicalSpecialty: ["Metabolic Health","Longevity Medicine","Preventive Medicine"],
 availableService: [
  { "@type": "MedicalProcedure", name: "Discovery Core Consultation", offers: { "@type": "Offer", price: "127", priceCurrency: "GBP" } },
 { "@type": "MedicalProcedure", name: "Energy & Fatigue", offers: { "@type": "Offer", price: "249", priceCurrency: "GBP" } },
 { "@type": "MedicalProcedure", name: "Core Metabolic Assessment", offers: { "@type": "Offer", price: "595", priceCurrency: "GBP" } },
 { "@type": "MedicalProcedure", name: "Advanced Longevity Assessment", offers: { "@type": "Offer", price: "795", priceCurrency: "GBP" } },
 { "@type": "MedicalProcedure", name: "12-Week Metabolic Reset", offers: { "@type": "Offer", price: "1895", priceCurrency: "GBP" } },
 ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
 <html lang="en-GB">
 <head>
 <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
 <meta name="theme-color" content="#111009" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 {process.env.NEXT_PUBLIC_CF_BEACON_TOKEN && (
   <script
     defer
     src="https://static.cloudflareinsights.com/beacon.min.js"
     data-cf-beacon={JSON.stringify({ token: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN })}
   />
 )}
 </head>
 <body style={{ margin: 0 }}><AOSInit />{children}<AvaChat /><CookieConsent /><Analytics /></body>
 </html>
 );
}
