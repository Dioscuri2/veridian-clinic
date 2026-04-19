import type { Metadata } from "next";

export const metadata: Metadata = {
 metadataBase: new URL("https://veridian.clinic"),
 title: {
 default: "Veridian Clinic | Longevity & Metabolic Health Clinic",
 template: "%s | Veridian Clinic",
 },
 description: "Longevity-focused clinic for metabolic health, advanced biomarker testing, CGM monitoring, and personalised optimisation plans. Regulated medical services are available via CQC-registered clinical partners.",
 keywords: ["metabolic health clinic UK","longevity clinic UK","health optimisation clinic","CGM monitoring UK","ApoB testing UK","HbA1c private test","12 week metabolic reset","longevity medicine UK","Dr Oluwatosin Taiwo","Veridian Clinic"],
 authors: [{ name: "Dr Oluwatosin Taiwo" }],
 openGraph: {
 type: "website", locale: "en_GB", url: "https://veridian.clinic", siteName: "Veridian Clinic",
 title: "Veridian Clinic | Longevity & Metabolic Health",
 description: "Understand what's driving your weight, energy, and long-term health — then fix it.",
 images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Veridian Clinic" }],
 },
 twitter: { card: "summary_large_image", title: "Veridian Clinic", description: "Advanced biomarker testing, CGM, and personalised optimisation plans.", images: ["/og-image.jpg"] },
 robots: { index: true, follow: true },
 alternates: { canonical: "https://veridian.clinic" },
};

const schema = {
 "@context": "https://schema.org", "@type": "MedicalBusiness",
 name: "Veridian Clinic",
 description: "Longevity and metabolic health clinic with regulated medical services available via clinical partners",
 url: "https://veridian.clinic",
 medicalSpecialty: ["Metabolic Health","Longevity Medicine","Preventive Medicine"],
 availableService: [
  { "@type": "MedicalProcedure", name: "Initial Clinical Discovery Consultation", offers: { "@type": "Offer", price: "195", priceCurrency: "GBP" } },
 { "@type": "MedicalProcedure", name: "Core Metabolic Assessment", offers: { "@type": "Offer", price: "495", priceCurrency: "GBP" } },
 { "@type": "MedicalProcedure", name: "Advanced Longevity Assessment", offers: { "@type": "Offer", price: "895", priceCurrency: "GBP" } },
 { "@type": "MedicalProcedure", name: "12-Week Metabolic Reset", offers: { "@type": "Offer", price: "1895", priceCurrency: "GBP" } },
 ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
 <html lang="en-GB">
 <head>
 <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
 <meta name="theme-color" content="#0d2818" />
 <link rel="icon" href="/favicon.ico" />
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 </head>
 <body style={{ margin: 0 }}>{children}</body>
 </html>
 );
}
