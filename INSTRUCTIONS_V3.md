PROMPT FOR BENJI — Veridian Clinic Website
Build
Use this verbatim as your task brief

You are building and deploying a production-ready Next.js website for Veridian Clinic
to Vercel.

Project Structure
The project folder is called veridian-clinic and has this structure:
veridian-clinic/
├── app/
│

├── layout.tsx

│

└── page.tsx

├── components/
│

└── VeridianClinic.jsx

← MAIN PAGE (all content lives here)

├── public/
│

└── (place favicon.ico and og-image.jpg here)

├── package.json
├── next.config.js
└── README.md

Step 1 — Create the project
mkdir veridian-clinic && cd veridian-clinic

npx create-next-app@latest . --typescript --no-tailwind --no-eslint --no-src-dir --app --no-i

When prompted, accept all defaults.

Step 2 — Install dependencies

npm install

No extra packages are needed. The component uses inline CSS-in-JS (style tags +
className). No Tailwind, no styled-components.

Step 3 — Replace files
Replace the contents of the following files exactly as provided:
app/layout.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
title: "Veridian Clinic | GP-Led Longevity & Metabolic Health | CQC Registered",

description: "Doctor-led longevity and metabolic health clinic. Advanced biomarker testing,

keywords: ["metabolic health doctor UK","longevity clinic UK","private GP metabolic health"
authors: [{ name: "Dr Oluwatosin Taiwo" }],
openGraph: {
type: "website", locale: "en_GB", url: "https://veridian.clinic",
siteName: "Veridian Clinic",
title: "Veridian Clinic | GP-Led Longevity & Metabolic Health",
description: "Understand what's driving your weight, energy, and long-term health — then
images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Veridian Clinic" }],
},

twitter: { card: "summary_large_image", title: "Veridian Clinic", description: "Advanced bi
robots: { index: true, follow: true },
alternates: { canonical: "https://veridian.clinic" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en-GB">
<head>

<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cove
<meta name="theme-color" content="#0d2818" />
<link rel="icon" href="/favicon.ico" />

<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
"@context": "https://schema.org",
"@type": "MedicalBusiness",
"name": "Veridian Clinic",
"description": "CQC-registered GP-led longevity and metabolic health clinic",
"url": "https://veridian.clinic",

"medicalSpecialty": ["Metabolic Health","Longevity Medicine","Preventive Medicine"]
"availableService": [

{ "@type": "MedicalProcedure", "name": "Initial GP Consultation", "offers": { "@t

{ "@type": "MedicalProcedure", "name": "Core Metabolic Assessment", "offers": { "

{ "@type": "MedicalProcedure", "name": "Advanced Longevity Assessment", "offers":

{ "@type": "MedicalProcedure", "name": "12-Week Metabolic Reset Programme", "offe
]
})}} />
</head>
<body style={{ margin: 0 }}>{children}</body>
</html>
);
}

app/page.tsx
import VeridianClinic from "@/components/VeridianClinic";
export default function Home() {
return <VeridianClinic />;
}

components/VeridianClinic.jsx

→ Paste the full content of the VeridianClinic.jsx file provided to you separately.
next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
module.exports = nextConfig;

tsconfig.json — ensure paths include components:
{
"compilerOptions": {
"paths": { "@/*": ["./*"] }
}
}

Step 4 — Test locally

npm run dev

Open http://localhost:3000 . Verify:
Hero headline renders correctly on mobile (375px viewport)
Domain cards stack to 1 column on mobile
Pricing cards stack to 1 column on mobile
Nav mobile menu opens and closes
All sections scroll correctly
Fonts load (Cormorant Garamond + Figtree from Google Fonts)

Step 5 — Deploy to Vercel
Option A — Via Vercel CLI (fastest):
npm install -g vercel
vercel --prod

Follow prompts: link to your Veridian account, use project name veridian-clinic .

Option B — Via GitHub:
1. Create new GitHub repo: veridian-clinic
2. Push: git init && git add . && git commit -m "init" && git remote add origin
YOUR_REPO_URL && git push -u origin main

3. Go to vercel.com → New Project → Import from GitHub → Select repo → Deploy

Step 6 — Post-deploy checklist
After live URL is confirmed:
1. Custom domain: In Vercel Dashboard → Project → Settings → Domains → Add
veridian.clinic

2. Booking form: Wire up the form to Formspree (free):

Go to formspree.io → New Form → Copy your form ID
In VeridianClinic.jsx , find the <button className="btn btn-fo btnfull">Request Booking →</button> and wrap the form inputs in: <form
action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

Change button type to submit
3. OG image: Create a 1200×630px image using the Veridian logo on forest
background, save as /public/og-image.jpg
4. Favicon: Export the Veridian logo mark as 32×32px ICO, save as
/public/favicon.ico

5. Analytics: npm install @vercel/analytics then add import { Analytics } from
'@vercel/analytics/react' and <Analytics /> inside layout.tsx

6. Testimonials: Replace the 4 placeholder testimonials in VeridianClinic.jsx with
verified patient reviews. Find the testimonials array near the top of the file.

Key Design Notes for Benji
Fonts: Cormorant Garamond (display/headings) + Figtree (body). Loaded via Google
Fonts in the <style> tag inside the component.
Palette: Forest #0d2818 · Ivory #f6f1e8 · Gold #c8a84b
Mobile: All grids use CSS class names ( g2 , g3 , g4 , gproc ) — NOT inline
gridTemplateColumns . This is critical. Do not change layouts to inline styles or the

mobile breakpoints will break.
No Tailwind: All CSS is in the CSS constant string at the top of VeridianClinic.jsx
Programme price: £1,895 (updated from previous version)

If anything breaks
Common issues and fixes:
Problem

Fix
Check Google Fonts URL in FONTS constant — needs @import at

Font not loading

top of style block

Mobile grid not

Ensure you haven’t added inline gridTemplateColumns to any grid

collapsing

div — use class names only

Overflow on
mobile
@/* path not

resolving
Vercel build fails

Check overflow-x: hidden is on body in CSS

Check tsconfig.json paths config above
Run npm run build locally first to catch errors

