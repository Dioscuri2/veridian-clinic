# Veridian Clinic — Project Context

## What This Is

Private metabolic and longevity clinic. GP-led (Dr Tosin Taiwo). CQC regulated services delivered via Thanksdoc/Thanks.co.uk. Trading name of Olympus Premium Health Ltd.

**Live site:** https://veridianclinic.com  
**Vercel alias:** https://veridianclinic.vercel.app

## Deploy Flow

```bash
git add [files]
git commit -m "message"
git push origin master
npx vercel --prod --yes --token "$VERCEL_TOKEN"
```

Token location: `/Users/tosin/.openclaw/workspace-main/oph-vault/CREDENTIALS.md`

## Stack

- **Framework:** Next.js 16.2 App Router, TypeScript
- **Styling:** CSS custom properties + inline styles (NO Tailwind). Global styles in `components/globalStyles.js`
- **Payments:** Stripe (GBP, card only)
- **Email:** Brevo (transactional + newsletter lists)
- **Hosting:** Vercel (project: dioscuri2-gmailcoms-projects/veridian-clinic)
- **GitHub:** https://github.com/Dioscuri2/veridian-clinic.git (branch: master)

## Funnel Architecture

```
Homepage
  └── "Check Your Metabolic Age — Free" → /metabolic-quiz
        └── 7 questions → /metabolic-quiz/result?mAge=X&chrono=Y&delta=Z&band=X&weakest=X
              ├── PRIMARY CTA: "Get the Metabolic Reset Guide" → /metabolic-reset-guide (£19.99)
              │     └── Stripe checkout → /metabolic-reset-guide/thank-you?session_id=X
              │           ├── PDF download via /api/guide-download?session_id=X
              │           ├── Confirmation email via Brevo (lib/guideEmail.ts)
              │           └── CTA: "Book Free Discovery Call" → /book?tier=discovery
              └── SECONDARY CTA: "Email me my free scorecard" → /metabolic-quiz/scorecard
                    └── Email capture → /metabolic-quiz/thank-you
```

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage (hero, quiz bar, sections, FAQ) |
| `components/Navigation.jsx` | Nav — How It Works / Metabolic Quiz / About Us / Book Discovery Call |
| `components/Footer.jsx` | Footer with CQC note, Patient Portal "coming soon" |
| `components/globalStyles.js` | All CSS custom properties and shared styles |
| `app/metabolic-quiz/page.tsx` | Quiz entry page |
| `app/metabolic-quiz/result/page.tsx` | Results page — shows metabolic age, guide CTA |
| `app/metabolic-reset-guide/page.tsx` | Guide sales page (£19.99) |
| `app/metabolic-reset-guide/thank-you/page.tsx` | Post-payment: verify session, download, email |
| `app/api/checkout/route.ts` | Stripe checkout API (tiers: guide £19.99, baseline £595, programme £1,895) |
| `app/api/guide-download/route.ts` | Verifies Stripe payment, streams PDF |
| `app/api/webhooks/stripe/route.ts` | Stripe webhook — sends guide email on payment |
| `app/api/newsletter/route.ts` | Lead capture to Brevo |
| `lib/guideEmail.ts` | Brevo transactional email for guide purchase |
| `private/guides/metabolic-reset-guide.pdf` | The paid PDF (NOT in /public — served via API) |

## CSS Custom Properties (key ones)

```css
--fo: #2c2a26  /* dark charcoal — primary text/buttons */
--go: #c8a84b  /* gold */
--go2: #f6f1e8 /* off-white/cream */
--iv: #f6f1e8  /* ivory background */
--iv2: #ede8df /* slightly darker ivory */
--sl: #2c2a26  /* slate/dark */
--sl2: #5a534a /* medium slate */
--sl3: #8a8278 /* light slate */
--grn: #145226 /* green (band: strong) */
--amr: #8a5500 /* amber (band: drifting) */
--red: #7a1616 /* red (band: high-risk) */
--nav-h: 68px  /* nav height (72px mobile) */
```

## Env Vars (on Vercel)

- `STRIPE_SECRET_KEY` — Stripe live key
- `STRIPE_WEBHOOK_SECRET` — needed for /api/webhooks/stripe (add in Stripe dashboard)
- `BREVO_API_KEY` — Brevo transactional
- `BREVO_NEWSLETTER_LIST_NAME` — "Veridian Leads"
- `NEXT_PUBLIC_SITE_URL` / `SITE_URL` — https://veridianclinic.com

## Stripe Webhook Setup (pending)

Go to Stripe Dashboard → Webhooks → Add endpoint:
- URL: `https://veridianclinic.com/api/webhooks/stripe`
- Event: `checkout.session.completed`
- Copy the signing secret → add as `STRIPE_WEBHOOK_SECRET` in Vercel env vars

## Next Planned Features

- WhatsApp Business API integration (Twilio UK number + Claude chatbot)
- Discovery call booking flow improvement
- Post-purchase thank-you → discovery call conversion tracking
