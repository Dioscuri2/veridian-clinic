# Veridian Clinic — Website

## File Structure

```
veridian-clinic/
├── app/
│   ├── layout.tsx          ← SEO metadata, structured data, Google fonts
│   └── page.tsx            ← Imports main component
├── components/
│   └── VeridianClinic.jsx  ← THE MAIN PAGE (all sections here)
├── package.json
├── next.config.js
└── README.md
```

## Deploying to Vercel

### Option A — Via GitHub (recommended)

1. Create a new GitHub repo and push this folder
2. Go to vercel.com → New Project → Import from GitHub
3. Select your repo → Vercel auto-detects Next.js → Click Deploy
4. Done. Live in ~2 minutes.

### Option B — Via Vercel CLI

```bash
npm install -g vercel
cd veridian-clinic
npm install
vercel
```

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Before Going Live — Checklist

1. **SEO** — In `app/layout.tsx`:
   - Replace `YOUR_GOOGLE_VERIFICATION_CODE` with your Google Search Console code
   - Update `https://veridian.clinic` with your actual domain
   - Add your phone number and email

2. **Booking form** — The form in the booking section currently has no backend.
   Options to wire it up:
   - **Formspree** (free): wrap inputs in `<form action="https://formspree.io/f/YOUR_ID">`
   - **Calendly embed**: replace the form with a Calendly inline widget
   - **Custom API route**: create `app/api/booking/route.ts` to handle submissions

3. **OG Image** — Add `/public/og-image.jpg` (1200×630px) for social sharing previews

4. **Favicon** — Add `/public/favicon.ico` and `/public/apple-touch-icon.png`

5. **Analytics** — Add Vercel Analytics (free) or Google Analytics:
   ```bash
   npm install @vercel/analytics
   ```
   Then import `<Analytics />` in `app/layout.tsx`

6. **Custom Domain** — In Vercel dashboard → Settings → Domains → Add `veridian.clinic`

## Pricing Updates

All pricing and content lives in `components/VeridianClinic.jsx` in the data arrays at the top of the file. Easy to update without touching any layout code.

## SEO Notes

The layout already includes:
- Full OpenGraph tags
- Twitter Card tags
- JSON-LD structured data (MedicalBusiness schema)
- Canonical URL
- Robot directives
- UK locale
- Medical specialty keywords

Add your Google Search Console verification code and submit the sitemap after deploy.
