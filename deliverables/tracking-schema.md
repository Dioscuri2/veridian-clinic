# T5: Funnel Tracking Schema

**Purpose:** Track every lead from first touch to revenue. Identify drop-off, measure CPL/CPB/LTV.  
**Tool:** Google Sheet (owner: dr.tosin@veridianclinic.com)  
**Update frequency:** Daily for active leads, weekly rollup for metrics

---

## SHEET 1: LEADS

| Column | Type | Values / Notes |
|--------|------|----------------|
| Lead ID | Auto | VER-001, VER-002, etc. |
| Date captured | Date | YYYY-MM-DD |
| Source | Dropdown | Organic Search / LinkedIn / Quiz Direct / Referral / Google Ads / Email / Other |
| Medium | Dropdown | Blog / Social / Paid / Direct / Email / Unknown |
| Campaign | Text | LinkedIn post slug, ad group name, or blank |
| Entry point | Dropdown | Quiz / Blog / Homepage / Direct |
| Quiz completed? | Boolean | Yes / No |
| Metabolic age | Number | From quiz result |
| Chrono age | Number | From quiz result |
| Band | Dropdown | Strong / Drifting / High-Risk |
| Email captured | Boolean | Yes / No |
| Email | Text | Encrypted / stored separately in Brevo |
| First name | Text | For merge fields |
| Nurture email opened (E1) | Boolean | |
| Nurture email opened (E2) | Boolean | |
| Nurture email opened (E3) | Boolean | |
| Nurture email click | Boolean | Any email CTAclick |
| Discovery call booked | Boolean | |
| Discovery call date | Date | |
| Discovery call attended | Boolean | |
| Outcome | Dropdown | Not a fit / Follow-up / Booked programme |
| Notes | Text | Freeform clinical context |

---

## SHEET 2: PATIENTS

| Column | Type | Values / Notes |
|--------|------|----------------|
| Patient ID | Auto | PAT-001, PAT-002, etc. |
| Lead ID | Reference | Links to LEADS sheet |
| Programme start date | Date | |
| Payment structure | Dropdown | Full £1895 / 3x £695 |
| Payment 1 received | Date | |
| Payment 2 received | Date | |
| Payment 3 received | Date | |
| Total received | Currency | |
| Blood panel booked | Boolean | |
| Blood panel completed | Date | |
| Interpretation session | Date | |
| Plan delivered | Boolean | |
| Check-in 1 | Date | |
| Check-in 2 | Date | |
| Check-in 3 | Date | |
| Check-in 4 | Date | |
| Check-in 5 | Date | |
| Programme status | Dropdown | Active / Completed / Paused / Cancelled |
| NPS score | Number | 0-10, from end-of-programme survey |
| Testimonial consent | Boolean | |
| Renewal / referral | Text | Freeform |
| Notes | Text | |

---

## SHEET 3: GOOGLE ADS (populated from Ads account export)

| Column | Type | Notes |
|--------|------|-------|
| Week | Date | Monday of the week |
| Campaign | Text | |
| Ad Group | Text | |
| Impressions | Number | |
| Clicks | Number | |
| CTR | % | Auto-calculated |
| Avg CPC | Currency | |
| Spend | Currency | |
| Conversions (leads) | Number | From GA4 goal |
| Conversions (calls) | Number | Call tracking |
| CPL | Currency | Spend / Leads |
| Discovery calls booked | Number | Manual + from Ads |
| CPB | Currency | Spend / Bookings |

---

## SHEET 4: WEEKLY METRICS ROLLUP

| Metric | This Week | Last Week | 4-Week Avg | Target |
|--------|-----------|-----------|------------|--------|
| Total leads | | | | 20/week at scale |
| Quiz completions | | | | |
| Email captures | | | | |
| Discovery calls booked | | | | 5/month |
| Discovery calls attended | | | | 80% of booked |
| Programmes started | | | | 2-3/month |
| Revenue | | | | £5,000/month |
| CPL (paid only) | | | | < £30 |
| CPB (paid only) | | | | < £100 |
| Discovery-to-close rate | | | | 30%+ |
| Organic traffic (GA4) | | | | |
| Blog sessions | | | | |
| LinkedIn impressions | | | | |

---

## REVENUE BRIDGE (monthly target model)

| Stage | Number | Rate | Output |
|-------|--------|------|--------|
| Site visitors | 1,000 | 5% quiz | 50 quiz starts |
| Quiz completions | 50 | 60% | 30 completions |
| Email captures | 30 | 50% | 15 emails |
| Discovery calls booked | 15 | 70% attend | 10 attended |
| Programmes closed | 10 | 30% | 3 patients |
| Revenue per patient | 3 | £1,895 avg | £5,685/month |

**Note:** This is the model target. Actual will differ. Measure actuals weekly.  
**Net profit target £5,000/month** requires approximately 3 full-price patients, or 4-5 patients on payment plans.

---

## DATA SOURCES

| Data | Source | Frequency |
|------|--------|-----------|
| Site traffic | Google Analytics 4 | Weekly |
| Lead emails | Brevo | Daily |
| Quiz results | GA4 custom events | Weekly |
| Calls booked | ThanksDoc / manual | Daily |
| Ads performance | Google Ads dashboard | Weekly |
| Payments | Stripe dashboard | Daily |
| Patient progress | ThanksDoc notes | Per session |

---

## SETUP INSTRUCTIONS

1. Create Google Sheet titled "Veridian Funnel Tracker"
2. Create 4 sheets as above
3. Share with dr.tosin@veridianclinic.com (owner)
4. Set up GA4 custom events:
   - quiz_start (on /metabolic-quiz load)
   - quiz_complete (on /metabolic-quiz/result load)
   - email_capture (on /metabolic-quiz/thank-you load)
   - discovery_call_booked (on /book/thank-you load where tier=discovery)
5. Link GA4 to Google Ads (for conversion import)
6. Set up Stripe webhook or manual export to update PATIENTS sheet

**Note on GA4 custom events:** These require adding `gtag('event', ...)` calls to the relevant page components. This is a separate dev task; add to backlog before the ads go live.
