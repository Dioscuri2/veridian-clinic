# Pharmacy leaflet, artwork brief

**Client:** Veridian Clinic (trading name of Olympus Premium Health Ltd)
**Job:** DL leaflet, handed to patients at two community pharmacy counters
**Sites:** Jethro's Pharmacy, Golders Green NW11 · pharmacy in Cherry Hinton, Cambridge
**Date:** 2026-08-24

---

## 1. The job in one line

A patient is told at the counter that they need to see a GP. The pharmacist hands them this. They scan it and book a private GP appointment, by video or telephone, usually within the same week.

The leaflet is a **referral tool the pharmacist is willing to hand over**, not an advert competing with the pharmacy. Nothing on it may criticise the NHS or the pharmacy, and nothing may look like NHS or pharmacy health information.

---

## 2. Two variants

Identical artwork except the QR code. Supply as two print files.

| Variant | QR encodes | Supplied file |
|---|---|---|
| Golders Green | `https://veridianclinic.com/gp?c=gg` | `qr-Golders-Green.svg` |
| Cherry Hinton | `https://veridianclinic.com/gp?c=ch` | `qr-Cherry-Hinton.svg` |

Both QR files are vector, error correction H, already generated. **Do not regenerate them** and do not re-encode the URLs; the `?c=` tag is how bookings are attributed to each counter.

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

**Commercial note for the printer:** this is effectively black plus one colour on uncoated-feel silk. Cheaper to print than full colour and it will look more expensive.

---

## 4. Layout map

Artboard **105 × 216 mm** (99 × 210 mm trim, 3 mm bleed). Safe zone 5 mm inside trim.

### FRONT

```
┌─────────────────────────────┐  ← 3mm bleed
│  VERIDIAN CLINIC            │  wordmark, small, top left
│                             │
│  Told you need              │  Cormorant Garamond
│  to see a GP?               │  the headline does the work
│                             │
│  You can speak to one       │  Figtree, supporting line
│  this week.                 │
│                             │
│  ┌────────┐   £59  15 min   │  price block, ink
│  │  QR    │   £89  20 min   │  QR middle-right
│  │ 25mm   │                 │  ≥45mm from bottom trim
│  └────────┘   Scan to book  │  CTA below QR, outside quiet zone
│                             │
│  veridianclinic.com/gp      │  typed fallback, essential
│                             │
├─────────────────────────────┤  ← 45 mm line
│   HOLDER LIP ZONE           │  ← NOTHING IMPORTANT BELOW HERE
│   decorative / blank only   │
└─────────────────────────────┘
```

**The 45 mm rule is the one that catches people.** Counter leaflet holders have a front lip covering the bottom 30 to 40 mm. Anything in that band is invisible while the leaflet sits in the dispenser, which is the browse-and-pick-up moment. Keep the QR, the price, the URL and the wordmark all above it.

### BACK

Back carries the detail and every legally required disclosure. Denser type is fine here; this face is read in the hand, not across a counter.

Order: what we help with · what is included · when you can be seen · how to book without a smartphone · what we cannot do · the legal block.

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
> Your prescription, fit note or referral letter is included in the price.
>
> [QR] **Scan to book**
> or go to **veridianclinic.com/gp**
>
> Adults 18 and over

### BACK

> **What we can help with**
> Chest and throat infections, urine infections, skin problems and rashes, eye infections and stomach upsets. Private prescriptions and medication reviews. Fit notes for your employer. Referral letters for private or NHS onward care. Blood or scan results you have been given without an explanation.
>
> **What the price includes**
> One electronic prescription item where clinically appropriate, a fit note or a referral letter where clinically indicated, and a written summary. There is no separate charge for any of them. You pay your pharmacy for the medication itself at their own price. The longest course we can prescribe is 28 days.
>
> **When you can be seen**
> Monday, Wednesday and Friday, 10:00 to 14:00 and 19:00 to 21:00. Most people are seen within the same week. Evening appointments mean you do not have to give up a working day.
>
> **No smartphone? You can still book.**
> Telephone appointments cost the same as video, with the same GP. Ask the pharmacist to help you scan the code, or visit veridianclinic.com/gp on any computer.
>
> **What we cannot do**
> We cannot examine you, treat an emergency, prescribe controlled drugs, or register you as an NHS patient. Please keep your NHS GP exactly as you are. If something is urgent call 999, or NHS 111 if you are unsure.
>
> **Dr Oluwatosin Taiwo** MBBS MRCGP MRCS
> Veridian Clinic is a trading name of Olympus Premium Health Ltd, 82A James Carter Road, Mildenhall, Bury St Edmunds, Suffolk IP28 7DE. support@veridianclinic.com
> Bookings and payments are handled by ThanksDoc, whose services run under a CQC-registered framework. Prices shown are the total you pay and include VAT where applicable. You have a legal right to cancel within 14 days of booking; where you ask to be seen sooner, that right ends once the consultation has taken place. Full terms at veridianclinic.com/terms
>
> *This is an advertisement for a private medical service.*

---

## 6. QR specification

| Parameter | Requirement |
|---|---|
| Printed size | **25 × 25 mm** (never below 20 mm) |
| Quiet zone | **4 mm clear on all four sides**, no type, no rule, no tint |
| Colour | **Pure black on white only.** Never reversed, never on a tint, never on a photo |
| Position | Middle-right of front face, **≥45 mm from bottom trim**, ≥10 mm from all other trims |
| Error correction | H (as supplied). If a logo is placed in the centre it must cover **no more than 20% of the code area** |
| Resolution | Vector. Do not rasterise |
| Call to action | "Scan to book" immediately below, **outside** the quiet zone |

**Do not enlarge the code by scaling the artboard.** Printers auto-enlarge artwork submitted without correct bleed, which distorts the quiet zone and breaks the scan.

---

## 7. Compliance, mapped to where it must appear

Everything here is a requirement, not a preference. The Consumer Protection provisions of the **DMCC Act 2024** (in force 6 April 2025) apply because the leaflet is an invitation to purchase, and the **CAP Code** applies because a leaflet that can be taken away is in scope even at point of sale.

**Must appear on the printed face. A QR code cannot carry these.**

| # | Requirement | Face |
|---|---|---|
| 1 | Total price, £59 and £89 | Front |
| 2 | What the service is: private GP consultation, video or telephone, 15 or 20 minutes | Front |
| 3 | Trader identity: **Olympus Premium Health Ltd**, with the trading name | Back |
| 4 | Business address and business email | Back |
| 5 | Statement that a 14-day cancellation right exists | Back |
| 6 | That the price is inclusive and what extras exist, if any | Back |

**Must not appear anywhere**

- No CQC, NHS, RCGP or GMC logo, and nothing implying their endorsement
- No claim to cure or guarantee an outcome
- No named or pictured prescription-only medicine. Naming one in public advertising is a criminal offence
- No NHS waiting-time claim, and nothing disparaging the NHS or the pharmacy
- No testimonials, unless evidence and contact details are held on file

**Must be obviously an advertisement.** Handed across a pharmacy counter, it must not be mistakable for pharmacy or NHS health information. This is the highest contextual risk in this scenario, which is why the back face ends with a plain statement that it is an advertisement.

**Print the qualifications.** MBBS MRCGP MRCS is protection, not decoration: it evidences that a suitably qualified health professional stands behind the claims.

---

## 8. Print specification

```
SIZE        DL, 99 x 210 mm portrait, flat, double-sided
STOCK       350gsm silk
FINISH      None, or MATT lamination. NEVER gloss.
QUANTITY    1,000 (the second 500 costs about £13 more than the first)
COST        ~£63 to £80 for 1,000. UK leaflets are VAT zero-rated.
PRINTER     instantprint or Solopress
BLEED       3 mm all sides, artboard 105 x 216 mm
SAFE ZONE   5 mm from trim
COLOUR      CMYK, 300 dpi minimum, maximum 300% total ink coverage
            ALL TEXT AND FINE RULES 100% K, no rich black
LINE WEIGHT Minimum 0.25pt, 2pt preferred
CROP MARKS  Solopress: OFF. Tradeprint: ON. Confirm before export.
PROFILE     Solopress: PDF/X-1a:2001, FOGRA39
            Tradeprint: ISOcoated_v2_eci
```

**Gloss is the single biggest risk.** A glossy surface reduces the reflective difference between dark and light modules, and under pharmacy strip lighting that can defeat the scan entirely. Silk unlaminated is both cheaper and more reliable. Matt lamination is acceptable if durability is wanted; it is also writable, so staff can pencil a name on it.

---

## 9. Pre-flight checklist, before approving the run

- [ ] **Test-scan the physical proof**, not the PDF, under shop lighting, with an older Android phone as well as an iPhone
- [ ] Scan both variants and confirm one resolves to `?c=gg` and the other to `?c=ch`
- [ ] Hold the proof in a leaflet holder and confirm the QR, price and URL are all visible above the lip
- [ ] Confirm nothing important sits in the bottom 45 mm
- [ ] Check every text element is 100% K, not a four-colour black
- [ ] Confirm both pharmacies have a DL holder, or supply one at about £2 to £3 each
- [ ] Warn counter staff that a 32 mm pocket holds only about 80 leaflets at 350gsm

---

## 10. Open items, needing Dr Tosin's decision before print

1. **A telephone number.** The patients most likely to want a telephone consultation are the least likely to scan a QR to discover it exists. The leaflet currently offers the typed URL and "ask the pharmacist" as non-digital routes. A published phone number would be stronger. `02036339518` is voice-only and could serve, but only if it is monitored.
2. **Is the Cambridge pharmacy also Jethro's?** The QR tags are location-based (`gg`, `ch`) so they work either way, but the copy may want the name.
3. **Is any commission or referral fee being paid to either pharmacy?** If so it must be disclosed, and it engages GMC conflict-of-interest guidance. Unpaid display is near-unregulated; payment changes the position.
4. **The 48-hour cancellation policy is deliberately not printed here.** ThanksDoc's terms give no refund inside 48 hours, while consumer law gives a 14-day right to cancel a distance-sold service. Printing both on one leaflet publishes an apparent contradiction. The 14-day right is stated because it is legally required; the 48-hour operational policy belongs in the booking terms, not on paper.
5. **Separately, and more urgently than this leaflet:** confirm with ThanksDoc that the booking flow captures the patient's express request to be seen inside 14 days and their acknowledgement that they lose the cancellation right. Without it, a patient seen inside 14 days can lawfully owe nothing. That affects every booking, not only leaflet ones.
