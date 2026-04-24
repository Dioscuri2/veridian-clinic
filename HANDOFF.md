# Veridian Clinic — Developer Handoff Document

**Last updated:** 2026-04-24  
**Authored by:** Claude (Anthropic) — claude-sonnet-4-6  
**Purpose:** Source-of-truth handoff for any AI agent or developer continuing this project. Read this before touching any file.

---

## 1. What This Project Is

**Veridian Clinic** is a UK private longevity and metabolic health clinic run by Dr Oluwatosin Taiwo. The website is a Next.js 16 App Router application deployed on Vercel.

**Legal entity:** Veridian Clinic is a trading name of **Olympus Premium Health Ltd**. This distinction matters for Stripe account naming, email footers, and CQC regulatory references.

**Live URLs:**
- Primary: `https://veridianclinic.com` (custom domain, no hyphen)
- Vercel alias: `https://veridianclinic.vercel.app` (no hyphen — `veridian-clinic.vercel.app` with hyphen is wrong)

**The site does three commercial things:**
1. Sells a £19.99 PDF guide (Metabolic Reset Guide) via Stripe Checkout
2. Captures leads for clinical assessments (book page, intake forms)
3. Runs an executive waitlist

---

## 2. Canonical Paths and Repositories

| Resource | Location |
|---|---|
| Local project | `/Users/tosin/.openclaw/workspace-main/veridian-clinic` |
| Git remote | `https://github.com/Dioscuri2/veridian-clinic.git` (branch: `master`) |
| Credentials vault | `/Users/tosin/.openclaw/workspace-main/oph-vault/CREDENTIALS.md` |
| Vercel project | `dioscuri2-gmailcoms-projects/veridian-clinic` |
| Vercel project ID | `prj_V13DVO1HpObjQWVfBiBvO0tjye6N` |
| Vercel org ID | `team_pIkwwbPOmZSmacU0eMYRsQIk` |

**Always work from the canonical local path above.** Run `git pull origin master` before any session starts to sync.

---

## 3. Credential Management — The Rules

All secrets live in **two** places only:

### A. Vercel Environment Variables (production secrets)
The live app reads from here. Managed via Vercel CLI. Never hardcode a secret in source code.

```bash
# List current vars
npx vercel env ls --token=<VERCEL_TOKEN>

# Add or overwrite a var
echo "value" | npx vercel env add VAR_NAME production --token=<VERCEL_TOKEN> --force

# Pull production vars locally for testing (gitignored automatically)
npx vercel env pull .env.local --token=<VERCEL_TOKEN> --environment=production
```

### B. The OPH Vault (`/Users/tosin/.openclaw/workspace-main/oph-vault/CREDENTIALS.md`)
Single plaintext file. All API keys, tokens, and passwords for all OPH/Veridian services. Read this before asking the user for credentials — they are almost certainly already here.

### Vercel Token
```
vcp_6y6DlCCEclsGlOahCuC2tiyMCEqLHwNjuK9bC33uo85bceQK8H2aWStG
```
Used in every Vercel CLI command. Pass as `--token=<value>` (not `--token <value>` with a space — the space form fails).

---

## 4. All Environment Variables

These are the variables that must be set on Vercel. Current status as of 2026-04-24:

| Variable | Environment | Status | Purpose |
|---|---|---|---|
| `STRIPE_SECRET_KEY` | Production only | ✅ Set | Stripe restricted live key (`rk_live_...`). Creates checkout sessions, verifies payments, serves downloads. |
| `STRIPE_WEBHOOK_SECRET` | Production only | ❌ Missing | Webhook signature verification. See Section 8. |
| `BREVO_API_KEY` | Production + Preview | ✅ Set | Sends transactional email (guide delivery, newsletter) via Brevo. |
| `BREVO_NEWSLETTER_LIST_NAME` | Production + Preview | ✅ Set | Value: `"Veridian Leads"` |
| `BREVO_EXECUTIVE_WAITLIST_NAME` | Production + Preview | ✅ Set | Value: `"waitlist executive health span waitlist"` |
| `NEXT_PUBLIC_SITE_URL` | Production + Preview | ✅ Set | `https://veridianclinic.com` — used in redirect URLs and email links. |
| `SITE_URL` | Production + Preview | ✅ Set | Same as above, server-side alias. |
| `VERCEL_PROJECT_PRODUCTION_URL` | Production + Preview | ✅ Set | Vercel-injected production URL. Third fallback for base URL resolution. |

**URL resolution pattern** (used in checkout, webhook, thank-you page):
```ts
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  "https://veridianclinic.com"; // hardcoded last-resort fallback
```
Always follow this pattern in any new code that needs an absolute URL.

---

## 5. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16.2.2 (App Router) | SSR for SEO, server components for Stripe verification, API routes for backend |
| Styling | Inline styles + `globalStyles.js` CSS-in-JS | No CSS build step, fully portable, predictable cascade. No Tailwind classes used in page files — Tailwind is installed but not actively used. |
| Payments | Stripe Checkout (hosted, server-side redirect) | No PCI scope on our end, no publishable key needed in frontend, Klarna and bank transfer included for free |
| Email | Brevo (formerly Sendinblue) via REST API | Already integrated across OPH properties |
| Deployment | Vercel (auto-deploy on `master` push) | Zero-config Next.js, Fluid Compute for API routes |
| TypeScript | v6.0.2, strict mode | All new files must be `.ts` or `.tsx` |

**No UI component library.** All UI is hand-written using the shared design system in `components/globalStyles.js`. Never introduce shadcn, MUI, Chakra, or any external component library without explicit instruction.

---

## 6. Project Structure

```
veridian-clinic/
├── app/
│   ├── layout.tsx                        # Root layout, SEO metadata, JSON-LD schema
│   ├── page.tsx                          # Homepage
│   ├── api/
│   │   ├── checkout/route.ts             # POST — creates Stripe Checkout session
│   │   ├── guide-download/route.ts       # GET — verifies Stripe payment, serves PDF
│   │   ├── newsletter/route.ts           # POST — Brevo newsletter signup
│   │   └── webhooks/stripe/route.ts      # POST — Stripe webhook handler
│   ├── metabolic-reset-guide/
│   │   ├── page.tsx                      # Sales page + buy button (client component)
│   │   └── thank-you/page.tsx            # Post-payment page (server component)
│   ├── book/
│   │   ├── page.tsx                      # Clinical assessment booking
│   │   └── thank-you/page.tsx           # Booking confirmation
│   ├── assessments/page.tsx
│   ├── blog/                             # Three clinical articles
│   ├── executive-waitlist/page.tsx
│   ├── intake/page.tsx
│   ├── markers-guide/page.tsx
│   ├── metabolic-age/page.tsx
│   ├── metabolic-quiz/                   # Quiz flow (4 pages)
│   ├── metabolic-scorecard/page.tsx
│   ├── quiz/page.tsx
│   └── scorecard/page.tsx
├── components/
│   ├── globalStyles.js                   # THE design system — all CSS variables and classes
│   ├── Navigation.jsx                    # Shared nav
│   ├── Footer.jsx                        # Shared footer
│   ├── ClinicalArticleLayout.tsx         # Blog post wrapper
│   ├── LeadCaptureForm.tsx               # Email capture
│   └── MetabolicScorecard.tsx            # Interactive scorecard
├── lib/
│   └── guideEmail.ts                     # Brevo email sender for guide delivery
├── private/
│   └── guides/
│       └── metabolic-reset-guide.pdf     # The actual PDF (3.7MB, committed to git)
├── public/                               # Static assets (images, favicon, OG image)
├── next.config.js                        # Turbopack config + outputFileTracingIncludes
├── package.json
└── HANDOFF.md                            # This file
```

**Critical: `private/guides/metabolic-reset-guide.pdf`** is committed to git and must stay in git. The `next.config.js` explicitly bundles it into the `/api/guide-download` serverless function via `outputFileTracingIncludes`. If the PDF is removed from git, guide downloads will 500.

---

## 7. The Stripe Payment Flow — Complete

This is the most important piece of commerce logic. Understand it fully before modifying anything.

### Products defined in `/app/api/checkout/route.ts`

```
guide     → £19.99  (1999 pence)  → /metabolic-reset-guide/thank-you
baseline  → £595.00 (59500 pence) → /book/thank-you
programme → £1895.00 (189500 pence) → /book/thank-you
```

Tier alias: `advanced` maps to `programme`. This was added to support legacy URLs.

### Payment flow step by step

```
1. User lands on /metabolic-reset-guide
   └── Client component renders buy button

2. User clicks "Get the Guide for £19.99 →"
   └── POST /api/checkout  { tier: "guide" }

3. /api/checkout/route.ts
   ├── Reads STRIPE_SECRET_KEY from env
   ├── Looks up product in tierCatalog
   ├── Resolves baseUrl (NEXT_PUBLIC_SITE_URL || SITE_URL || VERCEL_PROJECT_PRODUCTION_URL || fallback)
   ├── Creates stripe.checkout.sessions.create({
   │     mode: "payment",
   │     payment_method_types: ["card", "klarna", "customer_balance"],
   │     customer_balance → gb_bank_transfer,
   │     billing_address_collection: "required",
   │     phone_number_collection: { enabled: true },
   │     success_url: baseUrl + "/metabolic-reset-guide/thank-you?tier=guide&session_id={CHECKOUT_SESSION_ID}",
   │     cancel_url: baseUrl + "/metabolic-reset-guide?tier=guide&cancelled=1",
   │     metadata: { tier, name, email, phone, notes }
   │   })
   └── Returns { url: session.url }

4. Frontend redirects: window.location.href = data.url
   └── User lands on Stripe-hosted checkout page (branded as Olympus Premium Health)

5. User completes payment on Stripe

6. Stripe redirects to success_url
   └── /metabolic-reset-guide/thank-you?tier=guide&session_id=cs_live_...

7. /metabolic-reset-guide/thank-you/page.tsx (server component)
   ├── Retrieves session: stripe.checkout.sessions.retrieve(session_id)
   ├── Verifies: session.payment_status === "paid"
   ├── Builds downloadUrl: siteUrl + "/api/guide-download?session_id=" + session_id
   ├── Calls sendGuideEmail({ email, name, downloadUrl }) → Brevo sends email
   └── Renders page with:
       ├── Direct download button: /api/guide-download?session_id=...
       └── Discovery call upsell

8. /api/guide-download/route.ts (on download click)
   ├── Reads session_id from query param
   ├── stripe.checkout.sessions.retrieve(session_id)
   ├── Verifies payment_status === "paid" and metadata.tier === "guide"
   └── Serves PDF from private/guides/metabolic-reset-guide.pdf
       Content-Disposition: attachment
       Cache-Control: private, no-store

9. [Parallel] Stripe fires checkout.session.completed webhook
   └── /api/webhooks/stripe/route.ts
       ├── Verifies signature if STRIPE_WEBHOOK_SECRET is set (currently missing — see Section 8)
       ├── If tier === "guide" and payment_status === "paid":
       └── Calls sendGuideEmail() as a backup delivery path
```

### Why Stripe Checkout (hosted) not Stripe Elements?

Stripe Checkout = zero PCI scope for us, zero JavaScript SDK on the frontend, built-in fraud detection, Klarna and bank transfer included, mobile-optimised by Stripe. We redirect the user to Stripe's domain for payment. The downside is we can't fully customise the checkout UI — but the guide product doesn't need it.

### Why dynamic pricing (`price_data`) not Stripe Products/Prices?

Flexibility. We can change amounts, names, and descriptions without touching the Stripe dashboard. All tiers are defined in the `tierCatalog` object in the checkout route — one place to update.

---

## 8. What Is Currently Incomplete

### STRIPE_WEBHOOK_SECRET — Not Set

**Risk:** Medium. Functionality is not broken because the thank-you page sends the guide email directly on redirect. But the webhook backup delivery is unsigned and will accept any POST to `/api/webhooks/stripe` — a spoofing vector.

**To fix:**
1. Go to [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://veridianclinic.com/api/webhooks/stripe`
3. Select event: `checkout.session.completed`
4. Copy the signing secret (`whsec_...`)
5. Run:
```bash
echo "whsec_..." | npx vercel env add STRIPE_WEBHOOK_SECRET production --token=vcp_6y6DlCCEclsGlOahCuC2tiyMCEqLHwNjuK9bC33uo85bceQK8H2aWStG --force
```
6. Redeploy (see Section 10).

### Stripe Account Branding

The Stripe account (`51KF3R6EpNyYBy2JC`) is registered under **Olympus Premium Health**. Users see this name on the Stripe-hosted checkout page. The `PAYMENT_DESCRIPTOR` in the checkout route already says `"Olympus Premium Health"` to match.

To change this: Stripe Dashboard → Settings → Business details → Business name. This is a Stripe account setting, not a code change.

### `STRIPE_SECRET_KEY` is a Restricted Key (`rk_live_`)

The current key is a restricted key, not a full secret key. If any API call fails with a Stripe permission error, check that the key has these permissions enabled in Stripe Dashboard → Developers → Restricted keys:

- `checkout.sessions` — Write
- `payment_intents` — Read  
- `customers` — Write
- `checkout.sessions` — Read (for `guide-download` verification)

---

## 9. Coding Conventions and Guardrails

These are non-negotiable. Any AI or developer continuing this project must follow them.

### No over-engineering
Do exactly what the task requires. No abstractions "for future use." No helper functions that are only called once. Three similar lines of code is better than a premature abstraction.

### No comments unless the WHY is non-obvious
Never comment what the code does — the code says that. Only comment hidden constraints, surprising invariants, or external service quirks. No multi-line comment blocks.

### No error handling for impossible scenarios
Only validate at system boundaries (user input arriving at API routes, Stripe API responses). Trust Next.js and TypeScript within the app.

### No new dependencies without a clear reason
Current deps: `next`, `react`, `react-dom`, `stripe`. That's it. The `stripe` npm package is the only third-party runtime dep. If you need something, implement it with the standard library or with a fetch call first.

### Styling: always use the design system
All visual styling comes from `components/globalStyles.js`. It exports `FONTS` (Google Fonts link tags) and `CSS` (a large CSS-in-JS string with all variables, utility classes, and component classes). Every page imports and injects both:

```tsx
import { FONTS, CSS } from "@/components/globalStyles";
// Inside JSX:
<style>{FONTS + CSS}</style>
```

**Never introduce Tailwind classes, inline colour hex codes, or magic pixel values directly.** Use CSS custom properties from the design system:

```
--sl       dark slate (primary text)
--sl2      medium slate (body text)  
--sl3      light slate (captions, meta)
--fo       forest/olive (primary CTA colour)
--go2      gold/amber (accent)
--amr      amber warning
--red      error red
--bg-iv    ivory background
--bg-wh    white background
```

Button classes: `btn btn-fo` (primary), `btn btn-ol` (outline), `btn btn-go` (gold).

### Client vs Server Components
- Pages with `useState`, event handlers, or `useSearchParams` must be `"use client"` and wrapped in `<Suspense>` at the parent
- Pages that verify Stripe sessions or call Brevo should be async server components (no `"use client"`)
- The thank-you page is a server component — it verifies payment and sends email on render, which is intentional

### URL resolution
Never hardcode `veridianclinic.com` in logic. Always use the pattern from Section 4. The hardcoded fallback at the end is a last resort.

### TypeScript
Strict mode. All API route handlers must type their payloads:
```ts
type CheckoutPayload = { tier?: string; email?: string; ... };
const payload = (await request.json()) as CheckoutPayload;
```

---

## 10. Deploy Process — Exact Commands

Always run from the canonical local path. Never deploy from a different directory.

```bash
cd /Users/tosin/.openclaw/workspace-main/veridian-clinic

# 1. Sync from remote
git pull origin master

# 2. Make changes

# 3. Stage and commit (only specific files, never git add -A)
git add app/path/to/file.tsx lib/something.ts
git commit -m "Short description of what and why"

# 4. Push to trigger auto-deploy (Vercel watches master)
git push origin master

# OR: manual deploy to production
npx vercel --prod --yes --token=vcp_6y6DlCCEclsGlOahCuC2tiyMCEqLHwNjuK9bC33uo85bceQK8H2aWStG

# 5. If you need to re-alias the deployment
npx vercel alias set <deployment-url> veridianclinic.vercel.app --token=vcp_6y6DlCCEclsGlOahCuC2tiyMCEqLHwNjuK9bC33uo85bceQK8H2aWStG
```

**After any env var change, redeploy.** `NEXT_PUBLIC_` vars are baked at build time. Server-side vars (like `STRIPE_SECRET_KEY`) are read at runtime in API routes — but a fresh deploy is still safest.

**Do not use `git add -A` or `git add .`.** Stage files explicitly to avoid accidentally committing `.env.local` or other sensitive files.

---

## 11. AI Agent Operating Principles

These are the meta-rules that govern how Claude approaches this project. Any AI taking over should follow the same principles.

### Read before you act
Before modifying any file, read it. Before claiming a credential exists, check the vault. Before saying a route works, trace the code path.

### Credentials first, vault first
Before asking the user for any key or token, check `CREDENTIALS.md` in the vault. It contains nearly everything. Only ask the user if it genuinely isn't there.

### Verify claims against code
Session memory and this document describe state at a point in time. If you're told "X is set," verify it with `npx vercel env ls`. If you're told "the PDF exists," check the file. Memory can be stale.

### Never expose secrets in output
When referencing keys, show the prefix only (e.g. `rk_live_...`, `sk_live_...`). Never print the full key value in a response. The vault file is the record.

### Minimum blast radius
Only change what the task requires. A bug fix is not an invitation to refactor surrounding code. A new page does not need a new shared component unless two pages genuinely share it.

### Confirm before destructive actions
Git force-push, env var deletion, dropping database tables, removing committed assets — these need user confirmation. Env var overwriting (`--force`) is acceptable without confirmation because the vault holds the previous value.

### Deployment is the last step
Make all changes, commit, verify locally if possible, then deploy. Never deploy one file at a time. One commit, one deploy.

---

## 12. Third-Party Service Map

| Service | Account | Credential location | Purpose |
|---|---|---|---|
| Stripe | Olympus Premium Health (`51KF3R6EpNyYBy2JC`) | Vercel env: `STRIPE_SECRET_KEY` | Payment processing |
| Brevo | OPH account | Vercel env: `BREVO_API_KEY` | Transactional email (guide delivery, confirmations) |
| Vercel | `dioscuri2@gmail.com` | Vault: `vcp_6y...` | Hosting, env var management |
| GitHub | `Dioscuri2` | Standard SSH/HTTPS | Source code |
| Hostinger | OPH account | Vault: `FZFEPbMmvE2y...` | DNS management for custom domains |

### Brevo email sender
All emails send from: `hello@veridianclinic.com`, display name `"Veridian Clinic"`.  
This address must be verified in the Brevo account. If emails stop sending, check Brevo domain verification status.

---

## 13. Known Gotchas

**1. Vercel alias has no hyphen.**  
`veridianclinic.vercel.app` ✅ — `veridian-clinic.vercel.app` ❌  
The hyphenated alias was set by mistake. Custom domain `veridianclinic.com` is canonical.

**2. The Stripe key is a restricted key, not a full secret key.**  
`rk_live_` prefix. If checkout fails with a permission error, check the restricted key's permissions in Stripe Dashboard → Developers → Restricted keys.

**3. `mk_` is not a Stripe key prefix.**  
If a key starting with `mk_` appears, it is not from Stripe. Do not use it.

**4. The `out/` directory is stale.**  
There is an `out/` directory in the repo from a previous static export attempt. It is not used. Vercel builds the Next.js app fresh on every deploy. Ignore `out/`.

**5. Vercel CLI `--token` flag requires `=` not space.**  
`--token=VALUE` ✅ — `--token VALUE` ❌  
The space form parses incorrectly and throws `"missing a value"`.

**6. `metadataBase` in `layout.tsx` points to `veridian.clinic`.**  
The layout's `metadataBase` says `https://veridian.clinic` (dot, not hyphen, no "ian"). This is a secondary domain. The primary is `veridianclinic.com`. If OG images or canonical URLs look wrong, this may be why. Align with the owner before changing it.

**7. Stripe Checkout shows "Olympus Premium Health."**  
This is the Stripe account's registered business name. The legal entity (Veridian Clinic is a trading name of Olympus Premium Health Ltd) makes this technically correct. Changing it requires a Stripe account settings change, not a code change.

---

## 14. Handoff Checklist — What to Do When Starting a New Session

Run through this every time:

- [ ] Read this file from top to bottom
- [ ] `git pull origin master` from `/Users/tosin/.openclaw/workspace-main/veridian-clinic`
- [ ] `npx vercel env ls --token=vcp_6y6DlCCEclsGlOahCuC2tiyMCEqLHwNjuK9bC33uo85bceQK8H2aWStG` — confirm env vars match Section 4
- [ ] Check `CREDENTIALS.md` in the vault before asking the user for any credentials
- [ ] Understand what the user's task touches before opening any files
- [ ] Read every file you intend to modify before modifying it

---

## 15. What Was Built in This Session (2026-04-24)

This session focused on the Stripe payment integration for the £19.99 Metabolic Reset Guide.

**What was confirmed already in place:**
- Full Stripe Checkout flow: buy button → `/api/checkout` → Stripe hosted page → success redirect
- Thank-you page with server-side payment verification, email delivery, and direct PDF download link
- Guide download API route with Stripe payment gate
- PDF committed to git and bundled via `outputFileTracingIncludes`
- Stripe webhook handler (signature verification pending `STRIPE_WEBHOOK_SECRET`)

**What was changed this session:**
- `STRIPE_SECRET_KEY` on Vercel Production updated from `sk_live_...` to `rk_live_...` (restricted key provided by the account owner)
- Full production redeployment completed — build successful, all 29 pages generated, aliased to `veridianclinic.com`

**What remains:**
- Register Stripe webhook endpoint in Stripe Dashboard → add `STRIPE_WEBHOOK_SECRET` to Vercel (see Section 8)
- Confirm Stripe restricted key permissions cover all required API calls
- Test a live end-to-end purchase (guide buy → Stripe → thank-you page → email → PDF download)
