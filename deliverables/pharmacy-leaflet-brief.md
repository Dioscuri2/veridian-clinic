# Pharmacy leaflet, artwork brief

**Client:** Veridian Clinic (trading name of Olympus Premium Health Ltd)
**Job:** **A5 leaflet**, handed to patients at two community pharmacy counters
**Sites:** Jethro's Pharmacy, Golders Green NW11 · pharmacy in Cherry Hinton, Cambridge
**Date:** 2026-08-24, **revised to A5 2026-09-09**

> **Revision note.** This job was specified as DL (99 x 210 mm) and is now **A5 (148 x 210 mm)**. Same height, 49 mm wider. Every dimension, the layout map, the QR size and the print quote below have been changed accordingly. The extra width is spent on air and on a "how it works" strip, not on more words.

---

## 1. The job in one line

A patient is told at the counter that they need to see a GP. The pharmacist hands them this. They scan it and book a private GP appointment, by video or telephone, usually within the same week.

The leaflet is a **referral tool the pharmacist is willing to hand over**, not an advert competing with the pharmacy. Nothing on it may criticise the NHS or the pharmacy, and nothing may look like NHS or pharmacy health information.

**Deliberately not on this leaflet: weight management.** Both pharmacies dispense weight management medication themselves. Putting it here competes with the counter that is handing the leaflet out, and it drags the leaflet into the strictest advertising regime we deal with (see §7). The leaflet sells one thing: access to a GP.

---

## 2. Two variants

Identical artwork except the QR code. Supply as two print files.

| Variant | QR encodes | WhatsApp link | Supplied file |
|---|---|---|---|
| Golders Green | `https://veridianclinic.com/gp?c=gg` | `wa.me/447344290497?text=...%28Golders%20Green%29` | `qr-Golders-Green.svg` |
| Cherry Hinton | `https://veridianclinic.com/gp?c=ch` | `wa.me/447344290497?text=...%28Cherry%20Hinton%29` | `qr-Cherry-Hinton.svg` |

ThanksDoc has no booking API, so there are exactly four ways in: **WhatsApp, the QR code, the QR link, and the typed URL.** All four must appear on the leaflet.

The WhatsApp link carries a prefilled message naming the pharmacy. WhatsApp gives no tracking of its own, so that prefilled text is the only way to know which counter a WhatsApp enquiry came from. It arrives as the patient's first message.

Both QR files are vector, error correction H, already generated. **Do not regenerate them** and do not re-encode the URLs; the `?c=` tag is how bookings are attributed to each counter.

**Verified 2026-09-09:** `/gp` is a live redirect to `/gp-consultations` in `next.config.js` and **query strings are forwarded**, so `?c=gg` and `?c=ch` survive the hop. The short URL works. Do not "helpfully" change the printed URL to `/gp-consultations`; it is longer, no more correct, and breaks nothing but the eye.

---

## 3. Palette and type

Palette is **Ink and Signal**, matching the live landing page the QR lands on, so paper and screen read as one thing.

| Role | Hex | CMYK guidance |
|---|---|---|
| Ground | `#FBFBFA` | leave as unprinted stock |
| Ink: headings, price, body emphasis | `#111111` | **100% K, no rich black** |
| Body text | `#3F3F42` | 100% K at ~80% tint |
| Muted: captions, small print | `#57575A` | 100% K at ~65% tint |
| Rules, chip grounds | `#E6E6E3` | 100% K at ~10% tint |
| **Signal, one use only** | **`#C2371F`** | the single spot colour |

**The signal colour appears once.** On the price block or the scan prompt, not both. If it appears three times it stops meaning anything.

**Type:** Cormorant Garamond for the headline and the price. Figtree for everything else. Both are on Google Fonts and licensed for print.

**A5 type sizes.** The wider measure needs a size bump or the page reads as a blown-up DL:

| Element | Size |
|---|---|
| Headline (Cormorant Garamond) | 30 to 34 pt |
| Supporting line (Figtree) | 13 pt |
| Price figures (Cormorant Garamond) | 26 pt |
| Body, back face (Figtree) | 9.5 pt, 14 pt leading |
| Small print and legal block | 7 pt, never below 6.5 pt |
| Section labels (Figtree, uppercase, tracked) | 8 pt |

**Keep the back face to two columns.** A 138 mm measure of 9.5 pt text is about 95 characters per line, which is unreadable. Two columns with a 7 mm gutter brings it to a comfortable 45.

**Commercial note for the printer:** this is effectively black plus one colour on uncoated-feel silk. Cheaper to print than full colour and it will look more expensive.

---

## 4. Layout map, A5

Artboard **154 x 216 mm** (148 x 210 mm trim, 3 mm bleed). Safe zone 5 mm inside trim.

### FRONT

```
┌───────────────────────────────────────┐  ← 3mm bleed
│  VERIDIAN CLINIC                      │  wordmark, small, top left
│                                       │
│  Told you need to see a GP?           │  Cormorant Garamond, 30-34pt
│  You can speak to one this week.      │  the headline does the work
│                                       │
│  Private GP appointments with         │  Figtree 13pt, max 60 characters
│  Dr Tosin Taiwo. Video or telephone,  │  per line even though the page
│  including evenings.                  │  is wide enough for more
│                                       │
│  ┌──────────┐    £59  ·  15 minutes   │  QR left, price right
│  │          │    £89  ·  20 minutes   │  price is the reason to look
│  │   QR     │                         │
│  │  30mm    │    One prescription     │
│  │          │    item, fit note or    │
│  └──────────┘    referral letter      │
│   Scan to book   included             │
│                                       │
│  veridianclinic.com/gp                │  typed fallback, essential
│  WhatsApp 07344 290497                │  fourth route, above the lip
│                                       │
│  Adults 18 and over                   │
├───────────────────────────────────────┤  ← 45 mm line
│   HOLDER LIP ZONE                     │  ← NOTHING IMPORTANT BELOW HERE
│   decorative / blank only             │
└───────────────────────────────────────┘
```

**The 45 mm rule is the one that catches people.** Counter leaflet holders have a front lip covering the bottom 30 to 40 mm. Anything in that band is invisible while the leaflet sits in the dispenser, which is the browse-and-pick-up moment. Keep the QR, the price, the URL and the wordmark all above it. **This rule does not relax on A5;** A5 acrylic holders have the same lip depth as DL holders, sometimes deeper.

**Use the extra 49 mm for air, not words.** The QR and the price block now sit side by side instead of stacked, which is the single biggest gain over the DL version: the two things a browsing patient needs are on one horizontal line.

### BACK

Two columns, 7 mm gutter. Denser type is fine here; this face is read in the hand, not across a counter.

| Left column | Right column |
|---|---|
| What we can help with | Four ways to book |
| What the price includes | No smartphone, or would rather not use video? |
| When you can be seen | What we cannot do |
| | The legal block, set across the full width at the foot |

---

## 5. Final copy, set as written

### FRONT

> **Told you need to see a GP?**
> **You can speak to one this week.**
>
> Private GP appointments with Dr Tosin Taiwo, an NHS-experienced GP. By video or telephone, including evenings.
>
> **£59** · 15 minutes
> **£89** · 20 minutes
>
> One prescription item, fit note or referral letter included in the price.
>
> [QR] **Scan to book**
> or go to **veridianclinic.com/gp**
> or message us on WhatsApp: **07344 290497**
>
> Adults 18 and over

### BACK

> **What we can help with**
> Chest and throat infections, urine infections, skin problems and rashes, eye infections and stomach upsets. Private prescriptions and medication reviews. Fit notes for your employer. Referral letters for private or NHS onward care. Blood or scan results you have been given without an explanation.
>
> **What the price includes**
> One electronic prescription item where clinically appropriate, a fit note or a referral letter where clinically indicated, and a written summary. There is no separate charge for any of them. Further prescription items can be issued at additional cost. You pay your pharmacy for the medication itself at their own price. The longest course we can prescribe is 28 days.
>
> **When you can be seen**
> Appointments run daytime and evening, including slots from 19:00, so you do not have to give up a working day. Most people are seen within the same week. Current times are shown when you book.
>
> **Four ways to book**
> Scan the code on the front. Message us on WhatsApp on 07344 290497. Type veridianclinic.com/gp into any phone or computer. Or ask the pharmacist to help you scan it.
>
> **No smartphone, or would rather not use video?**
> Telephone appointments cost exactly the same as video, with the same GP. Say so when you book.
>
> **What we cannot do**
> We cannot examine you, treat an emergency, prescribe controlled drugs, or register you as an NHS patient. Please keep your NHS GP exactly as you are. If something is urgent call 999, or NHS 111 if you are unsure.
>
> **Dr Oluwatosin Taiwo** MBBS MRCGP MRCS
> Veridian Clinic is a trading name of Olympus Premium Health Ltd, 82A James Carter Road, Mildenhall, Bury St Edmunds, Suffolk IP28 7DE. support@veridianclinic.com
> Bookings and payments are handled by ThanksDoc, whose services run under a CQC-registered framework. Prices shown are the total you pay and include VAT where applicable. You have a legal right to cancel within 14 days of booking; where you ask to be seen sooner, that right ends once the consultation has taken place. Full terms at veridianclinic.com/terms
>
> *This is an advertisement for a private medical service.*

**Two copy changes made at the A5 revision, both deliberate:**

1. **"Your prescription ... is included" became "One prescription item ... included", and the back face now says further items cost extra.** ThanksDoc's terms include exactly one electronic prescription item per consultation. The old front-face wording implied all of them. Under the DMCC Act 2024 an omission that misleads on price is the offence, so the limit belongs where the price is, not only in the small print.
2. **The named days came out of "When you can be seen".** The previous copy printed "Monday, Wednesday and Friday". Booking availability changes, days get blocked for appraisals and leave, and paper cannot be corrected. The copy now promises the pattern, not the timetable, and points to the live calendar. **If you want specific days printed, confirm them and I will put them back.**

---

## 6. QR specification

| Parameter | Requirement |
|---|---|
| Printed size | **30 x 30 mm** on A5 (never below 20 mm) |
| Quiet zone | **4 mm clear on all four sides**, no type, no rule, no tint |
| Colour | **Pure black on white only.** Never reversed, never on a tint, never on a photo |
| Position | Left of the price block, **≥45 mm from bottom trim**, ≥10 mm from all other trims |
| Error correction | H (as supplied). If a logo is placed in the centre it must cover **no more than 20% of the code area** |
| Resolution | Vector. Do not rasterise |
| Call to action | "Scan to book" immediately below, **outside** the quiet zone |

The code goes to 30 mm from the DL version's 25 mm because the page can carry it and a larger code scans faster in poor light. Do not go beyond 32 mm; it starts to look like the point of the leaflet.

**Do not enlarge the code by scaling the artboard.** Printers auto-enlarge artwork submitted without correct bleed, which distorts the quiet zone and breaks the scan.

---

## 7. Compliance, mapped to where it must appear

Everything here is a requirement, not a preference. The Consumer Protection provisions of the **DMCC Act 2024** (in force 6 April 2025) apply because the leaflet is an invitation to purchase, and the **CAP Code** applies because a leaflet that can be taken away is in scope even at point of sale.

**Must appear on the printed face. A QR code cannot carry these.**

| # | Requirement | Face |
|---|---|---|
| 1 | Total price, £59 and £89 | Front |
| 2 | What the service is: private GP consultation, video or telephone, 15 or 20 minutes | Front |
| 3 | The one-prescription-item limit, stated with the price | Front and back |
| 4 | Trader identity: **Olympus Premium Health Ltd**, with the trading name | Back |
| 5 | Business address and business email | Back |
| 6 | Statement that a 14-day cancellation right exists | Back |
| 7 | That the price is inclusive and what extras exist | Back |

**Must not appear anywhere**

- No CQC, NHS, RCGP or GMC logo, and nothing implying their endorsement
- No claim to cure or guarantee an outcome
- **No reference to a prescription-only medicine, of any kind.** This is wider than the brand name: it also covers the generic name, the **drug class** (GLP-1), the **route** (injection, jab, pen), an image of a pen or vial, any efficacy figure, and before/after photographs. Naming one in public advertising is a criminal offence under HMR 2012 reg 284 and is actively enforced by the ASA. This is the main reason weight management is off this leaflet entirely
- No NHS waiting-time claim, and nothing disparaging the NHS or the pharmacy
- No testimonials, unless evidence and contact details are held on file

**Must be obviously an advertisement.** Handed across a pharmacy counter, it must not be mistakable for pharmacy or NHS health information. This is the highest contextual risk in this scenario, which is why the back face ends with a plain statement that it is an advertisement. **A5 raises this risk**, because A5 is the format NHS and pharmacy patient information leaflets actually use. Keep the Veridian wordmark prominent on both faces and keep the palette away from NHS blue.

**Print the qualifications.** MBBS MRCGP MRCS is protection, not decoration: it evidences that a suitably qualified health professional stands behind the claims.

---

## 8. Print specification

```
SIZE        A5, 148 x 210 mm portrait, flat, double-sided
STOCK       350gsm silk  (300gsm is acceptable and slightly cheaper;
            do not go below 300gsm at A5, it will curl in a holder)
FINISH      None, or MATT lamination. NEVER gloss.
QUANTITY    1,000
COST        ~£75 to £110 for 1,000 double-sided A5 on 350gsm silk.
            UK leaflets are VAT zero-rated.
PRINTER     instantprint or Solopress
BLEED       3 mm all sides, artboard 154 x 216 mm
SAFE ZONE   5 mm from trim
COLOUR      CMYK, 300 dpi minimum, maximum 300% total ink coverage
            ALL TEXT AND FINE RULES 100% K, no rich black
LINE WEIGHT Minimum 0.25pt, 2pt preferred
CROP MARKS  Solopress: OFF. Tradeprint: ON. Confirm before export.
PROFILE     Solopress: PDF/X-1a:2001, FOGRA39
            Tradeprint: ISOcoated_v2_eci
```

**Gloss is the single biggest risk.** A glossy surface reduces the reflective difference between dark and light modules, and under pharmacy strip lighting that can defeat the scan entirely. Silk unlaminated is both cheaper and more reliable. Matt lamination is acceptable if durability is wanted; it is also writable, so staff can pencil a name on it.

**Holders change with the format.** A5 counter holders cost more than DL (about £4 to £7 each rather than £2 to £3) and take fewer leaflets: a standard A5 acrylic pocket holds roughly 50 to 60 sheets at 350gsm, against about 80 for DL. Budget two holders and plan a refill visit.

---

## 9. Pre-flight checklist, before approving the run

- [ ] **Confirm the WhatsApp number actually receives messages** (see §10, item 1). This is printed 1,000 times and cannot be corrected
- [ ] **Test-scan the physical proof**, not the PDF, under shop lighting, with an older Android phone as well as an iPhone
- [ ] Scan both variants and confirm one resolves to `?c=gg` and the other to `?c=ch`, and that both land on the GP consultations page
- [ ] Hold the proof in an **A5** holder and confirm the QR, price and URL are all visible above the lip
- [ ] Confirm nothing important sits in the bottom 45 mm
- [ ] Check every text element is 100% K, not a four-colour black
- [ ] Confirm the back face is set in two columns, not one full-width measure
- [ ] Confirm both pharmacies have an **A5** holder, or supply one
- [ ] Read the whole leaflet once looking only for a prescription-only medicine reference, including the class and the route

---

## 10. Open items, needing Dr Tosin's decision before print

1. **Does WhatsApp on 07344 290497 actually work?** *(Raised to the top of the list at this revision.)* The number appears three times on the leaflet and is one of the four booking routes. Our own notes record that the Meta Cloud API number never completed registration (status PENDING, verification EXPIRED), that you messaged it and saw no reply and no delivery, and that installing WhatsApp Business on a physical SIM was still outstanding. `lib/siteConfig.ts` calls it "verified", which contradicts that. **Send one message to it from a phone that is not yours and confirm it arrives before this goes to print.** If it does not work, the honest fix is to drop WhatsApp from the leaflet rather than print a dead route.
2. **A telephone number.** The patients most likely to want a telephone consultation are the least likely to scan a QR to discover it exists. `02036339518` is voice-only and could serve, but only if it is monitored.
3. **Are the booking days fixed enough to print?** Removed at this revision in favour of "daytime and evening, including slots from 19:00". Confirm the days if you want them back.
4. **Is the Cambridge pharmacy also Jethro's?** The QR tags are location-based (`gg`, `ch`) so they work either way, but the copy may want the name.
5. **Is any commission or referral fee being paid to either pharmacy?** If so it must be disclosed, and it engages GMC conflict-of-interest guidance. Unpaid display is near-unregulated; payment changes the position.
6. **The 48-hour cancellation policy is deliberately not printed.** ThanksDoc's terms give no refund inside 48 hours, while consumer law gives a 14-day right to cancel a distance-sold service. Printing both on one leaflet publishes an apparent contradiction. The 14-day right is stated because it is legally required; the 48-hour operational policy belongs in the booking terms, not on paper.
7. **Separately, and more urgently than this leaflet:** confirm with ThanksDoc that the booking flow captures the patient's express request to be seen inside 14 days and their acknowledgement that they lose the cancellation right. Without it, a patient seen inside 14 days can lawfully owe nothing. That affects every booking, not only leaflet ones.
