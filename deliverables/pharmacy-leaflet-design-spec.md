# Veridian Clinic, A5 pharmacy leaflet, design specification

**Self-contained handoff.** Everything a designer or an AI design tool needs is in this file. No other document is required. The companion file `pharmacy-leaflet-brief.md` covers print production and legal reasoning; this one covers only what the artwork must look like and say.

**Status:** copy is final and approved. **Do not rewrite the copy.** Every sentence has been checked against UK advertising and consumer law, and several of them are worded the way they are for legal reasons, not stylistic ones.

---

## 1. What this is

A single-sheet, double-sided A5 leaflet that sits in a holder on a community pharmacy counter. A pharmacist tells a customer they need to see a GP, and hands them this.

**The reader is standing up, mildly worried, holding a prescription bag.** They give the front face about two seconds. The front has one job: make them scan the code or keep the leaflet. The back is read later, sitting down, and can be dense.

**Tone: calm, plain, unhurried.** This is a doctor's card, not a sale. No exclamation marks, no urgency, no "limited time", no stock photography of smiling models. The reader should feel they have been handed something considered.

---

## 2. Non-negotiable constraints

Breaking any of these makes the artwork unusable. They are listed first because they are the ones designers most often break.

| # | Constraint | Why |
|---|---|---|
| 1 | **Nothing meaningful in the bottom 45 mm of the front face** | The holder lip covers it. Anything there is invisible at the moment of choosing |
| 2 | **QR code 30 x 30 mm, pure black on white, 4 mm clear quiet zone on all four sides** | No type, rule or tint may enter the quiet zone. Never reverse it, never tint it, never place it on an image |
| 3 | **All text and rules 100% K only.** No rich black, no four-colour black | Small type in four-colour black shows registration fringing |
| 4 | **The accent colour `#C2371F` appears exactly once on each face** | Used three times it stops signalling anything |
| 5 | **Back face is two columns**, 7 mm gutter | A 138 mm single measure at 9.5 pt is ~95 characters per line and is unreadable |
| 6 | **No NHS blue, no NHS or CQC or GMC or RCGP logo, no clinical stock photography** | It must never be mistakable for NHS or pharmacy health information |
| 7 | **No photographs of medicines, pens, vials, syringes or pills** | Depicting a prescription-only medicine in public advertising is a criminal offence in the UK |
| 8 | **Body text never below 9 pt. Legal block never below 6.5 pt** | Accessibility and legibility under shop lighting |

---

## 3. Canvas

```
Trim          148 x 210 mm, A5 portrait
Artboard      154 x 216 mm  (3 mm bleed all round)
Safe zone     5 mm inside trim
Faces         2 (front and back), flat, no folds
Colour        CMYK
Orientation   Portrait, both faces
```

---

## 4. Palette

Named "Ink and Signal". It matches the live web page the QR code lands on, so paper and screen read as one brand.

| Token | Hex | Use |
|---|---|---|
| Ground | `#FBFBFA` | The page. Leave as unprinted stock |
| Ink | `#111111` | Headline, price figures, emphasis |
| Body | `#3F3F42` | Running text |
| Muted | `#57575A` | Captions, small print, legal block |
| Rule | `#E6E6E3` | Hairlines, chip backgrounds |
| **Signal** | **`#C2371F`** | **One element per face. Nothing else** |

It is a two-colour job: black plus one warm red, on a near-white stock. Restraint is the design. If the result looks colourful, it is wrong.

---

## 5. Type

| Role | Face | Size | Notes |
|---|---|---|---|
| Headline | Cormorant Garamond | 30 to 34 pt | Regular or Medium. Never bold. Tight leading, ~0.95 |
| Supporting line | Figtree | 13 pt | Regular. Max 60 characters per line even though the page is wider |
| Price figures | Cormorant Garamond | 26 pt | The `£59` and `£89` numerals |
| Price labels | Figtree | 11 pt | "15 minutes", "20 minutes" |
| Section labels | Figtree | 8 pt | Uppercase, letter-spacing 0.1em, colour Muted |
| Body, back face | Figtree | 9.5 pt | 14 pt leading |
| Legal block | Figtree | 7 pt | 10 pt leading, colour Muted. Never below 6.5 pt |

Both families are on Google Fonts and licensed for print. Pair them properly: Cormorant is the voice, Figtree is the information.

---

## 6. Front face layout

```
┌───────────────────────────────────────┐
│  VERIDIAN CLINIC                      │  wordmark, 10pt, tracked, Ink
│                                       │
│                                       │
│  Told you need to see a GP?           │  Cormorant 30-34pt, Ink
│  You can speak to one this week.      │  2 lines, ranged left
│                                       │
│  Private GP appointments with         │  Figtree 13pt, Body
│  Dr Tosin Taiwo, an NHS-experienced   │
│  GP. By video or telephone,           │
│  including evenings.                  │
│                                       │
│  ┌──────────┐   £59 · 15 minutes      │  ← the key pairing
│  │          │   £89 · 20 minutes      │
│  │  QR      │                         │
│  │  30mm    │   One prescription      │  Figtree 10pt, Body
│  │          │   item, fit note or     │
│  └──────────┘   referral letter       │
│   Scan to book  included in the price │
│   ↑ Figtree 10pt, SIGNAL colour       │
│                                       │
│  veridianclinic.com/gp                │  Figtree 11pt, Ink
│  WhatsApp 07344 290497                │  Figtree 11pt, Ink
│                                       │
│  Adults 18 and over                   │  Figtree 8pt, Muted
├───────────────────────────────────────┤  ← 45 mm from bottom trim
│                                       │
│   HOLDER LIP ZONE, keep empty         │
│                                       │
└───────────────────────────────────────┘
```

**The single most important relationship on the page is the QR code sitting level with the price.** Those are the two things a browsing patient needs, and A5 is wide enough to put them on one horizontal line. That pairing is the whole reason this job moved up from DL.

**"Scan to book" is the one Signal-coloured element on this face.** The price stays in Ink. If you would rather signal the price, that is a legitimate alternative, but then "Scan to book" goes to Ink. Only one.

---

## 7. Back face layout

Two columns, 7 mm gutter, ranged left, ragged right. Section labels in the 8 pt tracked uppercase style, hairline rule in Rule colour above each.

**Left column:** What we can help with · What the price includes · When you can be seen
**Right column:** Four ways to book · No smartphone, or would rather not use video? · What we cannot do
**Full width at the foot:** the legal block, 7 pt, Muted, separated by a hairline rule

The Veridian wordmark repeats small at the top of this face. **This is a compliance requirement, not decoration:** the reader must never mistake the sheet for pharmacy or NHS information.

"What we cannot do" gets the Signal colour on its label only, because it is the section that protects both the patient and the clinic.

---

## 8. Copy, final, set exactly as written

Do not edit, shorten, reorder or "improve" any of this. Line breaks in the headline are intentional.

### FRONT

```
Told you need to see a GP?
You can speak to one this week.

Private GP appointments with Dr Tosin Taiwo, an NHS-experienced GP.
By video or telephone, including evenings.

£59 · 15 minutes
£89 · 20 minutes

One prescription item, fit note or referral letter included in the price.

Scan to book
or go to veridianclinic.com/gp
or message us on WhatsApp: 07344 290497

Adults 18 and over
```

### BACK

```
WHAT WE CAN HELP WITH
Chest and throat infections, urine infections, skin problems and rashes,
eye infections and stomach upsets. Private prescriptions and medication
reviews. Fit notes for your employer. Referral letters for private or NHS
onward care. Blood or scan results you have been given without an
explanation.

WHAT THE PRICE INCLUDES
One electronic prescription item where clinically appropriate, a fit note
or a referral letter where clinically indicated, and a written summary.
There is no separate charge for any of them. Further prescription items
can be issued at additional cost. You pay your pharmacy for the
medication itself at their own price. The longest course we can prescribe
is 28 days.

WHEN YOU CAN BE SEEN
Appointments run daytime and evening, including slots from 19:00, so you
do not have to give up a working day. Most people are seen within the
same week. Current times are shown when you book.

FOUR WAYS TO BOOK
Scan the code on the front. Message us on WhatsApp on 07344 290497. Type
veridianclinic.com/gp into any phone or computer. Or ask the pharmacist
to help you scan it.

NO SMARTPHONE, OR WOULD RATHER NOT USE VIDEO?
Telephone appointments cost exactly the same as video, with the same GP.
Say so when you book.

WHAT WE CANNOT DO
We cannot examine you, treat an emergency, prescribe controlled drugs, or
register you as an NHS patient. Please keep your NHS GP exactly as you
are. If something is urgent call 999, or NHS 111 if you are unsure.

Dr Oluwatosin Taiwo MBBS MRCGP MRCS
Veridian Clinic is a trading name of Olympus Premium Health Ltd, 82A James
Carter Road, Mildenhall, Bury St Edmunds, Suffolk IP28 7DE.
support@veridianclinic.com
Bookings and payments are handled by ThanksDoc, whose services run under a
CQC-registered framework. Prices shown are the total you pay and include
VAT where applicable. You have a legal right to cancel within 14 days of
booking; where you ask to be seen sooner, that right ends once the
consultation has taken place. Full terms at veridianclinic.com/terms

This is an advertisement for a private medical service.
```

---

## 9. Two variants

Identical artwork. Only the QR code changes. Supply two print-ready files.

| Variant | QR encodes | File to place |
|---|---|---|
| Golders Green | `https://veridianclinic.com/gp?c=gg` | `assets/qr-Golders-Green.svg` |
| Cherry Hinton | `https://veridianclinic.com/gp?c=ch` | `assets/qr-Cherry-Hinton.svg` |

Both QR files already exist as vector, error correction H. **Place them, do not regenerate them.** The `?c=` tag is how a booking is attributed to a pharmacy, and re-encoding loses it.

---

## 10. Deliberately absent, do not add

A designer or a generative tool will be tempted to add these. All are wrong here.

- **A photograph of a doctor, a patient, a pharmacy or any medicine.** The leaflet is typographic. No stock imagery
- **Any weight loss or medication offer.** Both pharmacies dispense weight management medication themselves; advertising it here competes with the counter handing out the leaflet, and it is the most heavily policed advertising category in UK healthcare
- **Testimonials, star ratings, "trusted by" counts**
- **A discount, an offer, a deadline or any urgency device**
- **Icons for each service.** Tempting on the back face, and it turns a doctor's card into a flyer
- **A map or an address as a place to visit.** The consulting rooms are not open yet. The address on the leaflet is the registered company address and is there for legal identification only
- **Rounded corners, drop shadows, gradients, or a coloured header band**

---

## 11. Paste-ready prompt for an AI design tool

> Design a two-sided A5 print leaflet, 148 x 210 mm portrait, 3 mm bleed, CMYK, for a UK private GP clinic. Typographic only, no photography, no icons, no illustration.
>
> Palette, use exactly: ground `#FBFBFA`, ink `#111111`, body text `#3F3F42`, muted `#57575A`, hairline rules `#E6E6E3`, and a single accent `#C2371F` used once per face and nowhere else.
>
> Typefaces: Cormorant Garamond for the headline and the price numerals, Figtree for everything else. Headline 30 to 34 pt, body 9.5 pt on 14 pt, legal small print 7 pt.
>
> Front face, ranged left: a small tracked wordmark "VERIDIAN CLINIC" at the top; a two-line Cormorant headline; a short supporting paragraph; then a horizontal pairing of a 30 x 30 mm QR code placeholder on the left and the prices "£59 · 15 minutes" and "£89 · 20 minutes" on the right. Below the QR, the words "Scan to book" in the accent colour. Then a website address and a WhatsApp number. The bottom 45 mm of the front must be completely empty, because a leaflet holder lip covers it. The QR needs 4 mm of clear space on every side with no type or rule intruding.
>
> Back face: two columns with a 7 mm gutter, six short sections under small uppercase tracked labels with hairline rules above them, and a full-width 7 pt legal paragraph across the foot.
>
> Tone: calm, plain, expensive-feeling restraint. It is a doctor's card, not a flyer. No urgency, no offers, no gradients, no rounded corners, no coloured header bands, and nothing resembling NHS branding or NHS blue.

Paste the copy from section 8 alongside this prompt. The tool should typeset that copy, not invent its own.

---

## 12. Before it is signed off

- [ ] Test-scan a **printed** proof under shop lighting, on an old Android as well as an iPhone
- [ ] Confirm both variants resolve, one to `?c=gg` and one to `?c=ch`
- [ ] Stand the proof in an A5 holder and confirm the QR, the price and the URL all sit above the lip
- [ ] Confirm every text element is 100% K, not four-colour black
- [ ] Confirm the accent colour appears exactly once per face
- [ ] Read it once looking only for anything that names or depicts a prescription medicine
- [ ] **Confirm the WhatsApp number is live and receiving messages before printing.** It appears three times
