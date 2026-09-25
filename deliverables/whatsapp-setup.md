# WhatsApp booking channel, setup and message copy

**Number:** 020 3633 9518 (Tamar Telecommunications VoIP number, superseded the
2026-09-10 decision to use the mobile 07344 290497 — see below)
**Route chosen:** WhatsApp Business **App** on the handset, not the Cloud API
**Status:** REGISTERED. Linked to WhatsApp Business as "Veridian Clinic" on
2026-09-25 via Tamar's voice-call verification (SMS fails on VoIP numbers;
WhatsApp reads the 6-digit code out on a call to the number instead). This
directly contradicts the earlier finding that VoIP numbers cannot register at
all — that finding was based on repeated failed attempts with no "call me"
option appearing; whatever changed, it worked this time. Business hours,
greeting/away messages, quick replies and the test message below are still
outstanding.

---

## 1. What is actually achievable, and what is not

**Achievable, free, today: instant response.** The Business App sends a greeting message to a first-time sender and an away message outside business hours, both immediately. That is the sub-minute reply time the market is competing on.

**Not achievable at any price: instant booking.** ThanksDoc has no public API. No tool, vendor or AI agent can place a booking into the ThanksDoc calendar programmatically. The best any of them can do is reply quickly with a link the patient taps. Which is exactly what the free app does.

So the goal is: **reply in seconds with the right link**, and let ThanksDoc take the booking.

---

## 2. Setup order — do these in the app, in this order

1. ~~Release the stale Cloud API registration~~ — not applicable to this number. `020 3633 9518` has never touched Meta Business Manager, so there is no conflicting registration to clear. (This step was written for `07344 290497`, which did have one; see [[feedback_whatsapp_landline]].)
2. ~~Install WhatsApp Business on the handset and register the number~~ — DONE 2026-09-25.
3. ~~Business Hours~~ — DONE. Dr Tosin set every day to **"By appointment only"** rather than the fixed grid originally proposed in §3 below (kept for reference only, not used). See §3 for the one thing still to check on the phone.
4. **Greeting message** (Settings → Business tools → Greeting message, **phone app only, not on web**): paste §4, toggle it ON. Still outstanding.
5. **Away message** (Settings → Business tools → Away message, **phone app only, not on web**): paste §5. **Check what schedule options are offered now that hours are "By appointment only"** — if there is no "outside of business hours" trigger available, choose "Always send" instead so the away message still fires. Still outstanding.
6. ~~Quick replies~~ — DONE 2026-09-25, built directly via WhatsApp Web (web.whatsapp.com → Settings → Business tools → Quick replies), all 10 shortcuts in §6 confirmed live and correct. Quick replies and Business profile (hours, catalogue, links, contact) ARE editable on web; greeting/away messages are NOT — confirmed empirically, not assumed.
7. **Labels** (chat list → long-press a chat, or Settings → Business tools → Labels — not found under the web Business tools menu, phone app only): create New enquiry, Sent booking link, Booked, No reply needed. Still outstanding.
8. Send a test message from a phone that is not yours and confirm it arrives, the greeting fires, and a quick reply sends correctly. Still outstanding.

Also done while in the web session: the blank **Contact email** on the Business profile was filled with `support@veridianclinic.com` (was empty).

If the app truncates any message below when you paste it, shorten it rather than leave it cut off mid-sentence or mid-link — a broken link is worse than a shorter message.

---

## 3. Business hours — SUPERSEDED, Dr Tosin chose "By appointment only" instead

This table was the original proposal. **Not used** — Dr Tosin set every day to "By appointment only" in the app before this doc was finalised, and that's a reasonable call for an appointment-only clinic with no walk-ins. Kept here only so a future session knows what was considered and rejected.

| Day | Hours |
|---|---|
| Monday | 10:00–14:00 and 19:00–21:00 |
| Tuesday | Closed |
| Wednesday | 10:00–14:00 and 19:00–21:00 |
| Thursday | Closed |
| Friday | 10:00–14:00 and 19:00–21:00 |
| Saturday | Closed |
| Sunday | Closed |

**The one open question**: WhatsApp's away message normally triggers "outside of business hours". With no fixed hours set, it's unverified whether that trigger still works or whether the away message needs to be set to "Always send" instead. Check this when setting the away message on the phone (§2 step 5) — the app's away-message screen will show whatever schedule options it actually offers.

---

## 4. Greeting message

Sent automatically to anyone messaging for the first time, or after 14 days of no contact.

```
Thanks for messaging Veridian Clinic. You have reached the practice of
Dr Tosin Taiwo, a GMC-registered GP.

To book a private GP appointment by video or telephone:

15 minutes, £59
https://notes.thanksdoc.co.uk/book/service/334/36

20 minutes, £89
https://notes.thanksdoc.co.uk/book/service/335/36

Most appointments are within 24 hours. Your prescription item, fit note
or referral letter is included in the price.

We read messages personally and will reply. Please use this channel for
booking and admin only, and bring anything medical to the appointment
itself.

If you need urgent advice, call NHS 111. In an emergency, call 999.
```

## 5. Away message

Sent automatically outside business hours.

```
Thanks for messaging Veridian Clinic. Nobody is at the desk right now,
and we will reply when we are.

You do not have to wait for us to book. Appointments are bookable at any
hour:

15 minutes, £59
https://notes.thanksdoc.co.uk/book/service/334/36

20 minutes, £89
https://notes.thanksdoc.co.uk/book/service/335/36

If you need urgent advice tonight, call NHS 111. In an emergency, call 999.
```

## 6. Quick replies

Saved canned replies, triggered by typing a shortcut while in a chat. Every answer here is drawn straight from `lib/ava-knowledge.ts`, the same compliance-reviewed source the website chatbot uses, so nothing here contradicts what the site or Ava says. Add all ten; the shortcuts are short on purpose so they are fast to type mid-conversation.

| Shortcut | Message |
|---|---|
| `/book` | Here is the booking link for a 15 minute GP appointment, £59: https://notes.thanksdoc.co.uk/book/service/334/36 and for 20 minutes, £89: https://notes.thanksdoc.co.uk/book/service/335/36 |
| `/bloods` | Our blood panels are listed at https://veridianclinic.com/blood-tests with prices and what each one covers. Results come back in 3 to 5 working days with a written GP interpretation included. |
| `/phone` | Yes, telephone appointments cost exactly the same as video and are with the same GP. Just say so when you book. |
| `/urgent` | This channel is not monitored around the clock, so please do not use it for anything urgent. Call NHS 111 for urgent advice, or 999 in an emergency. |
| `/nhs` | We are a private clinic, not NHS. Services run through ThanksDoc's CQC-registered framework. Please keep your NHS GP registration exactly as it is; we do not replace it. |
| `/results` | Blood test results are returned within 3 to 5 working days, with full written clinical interpretation from Dr Taiwo included in every panel. |
| `/cancel` | Bookings are handled by ThanksDoc and their terms apply. Cancelling less than 48 hours before your appointment means no refund or exchange, and you would need to rebook. |
| `/price` | GP consultations are £59 (15 min) or £89 (20 min). Blood test panels start from £199. Full pricing: https://veridianclinic.com/blood-tests |
| `/location` | We are virtual-first. Blood draws use Randox Health collection points across the UK. In-person rooms in Golders Green and Cambridge are opening soon, join the waitlist at https://veridianclinic.com/gp-consultations |
| `/weightloss` | Dr Taiwo offers a private GP-led weight management assessment. Take the free eligibility check first at https://veridianclinic.com/weight-loss (about 3 minutes), it tells you whether anything rules you out and unlocks a reduced consultation rate. |

---

## 7. Rules for anything sent on this channel

These apply to the automated messages and to anything typed by hand.

- **No clinical advice.** Booking and admin only. Anything medical belongs in the consultation
- **Never name or describe a prescription-only medicine**, including the drug class or the route. The same rule that applies to the website applies here
- **Never state that a patient qualifies for treatment.** Only that nothing rules them out, and that the consultation decides
- **Every automated message carries the 111 and 999 signpost.** This channel is not monitored in real time and must say so
- **Prices must match `data/panels.ts` and the live ThanksDoc service.** Currently £59 for service 334 and £89 for service 335
- **No typographic dashes**

---

## 8. Why not an AI receptionist vendor (this is Tier 0; an in-house AI tier is a separate later decision)

Assessed 2026-09-11 after a cold approach from askaidn.com, revisited 2026-09-25.

- **It cannot do the thing that would justify it.** No vendor can book into ThanksDoc, because there is no API. The differentiator on offer is fast replies, which the free app already does
- **It requires the Cloud API.** Meta's per-message charging for service/free-form replies starts **1 October 2026**, but **this applies only to the Cloud API/Business Platform, not the free Business App** — and the first **1,000 service messages per number per month are free** even on the Cloud API. Veridian's WhatsApp volume is almost certainly far under that, so cost is unlikely to be the blocker it first looked like. Corrected 2026-09-25; the app stays free either way
- **A third-party vendor would process patient messages**, which are special category health data under UK GDPR. That needs a data processing agreement and a lawful basis before a single message is shared, and it puts an outside company inside a clinical channel. This objection applies to a paid vendor, not to reusing Ava, Veridian's own compliance-reviewed chatbot, which already processes the equivalent data on the website today
- **We already own most of an in-house version.** `app/api/webhooks/whatsapp/route.ts` persists messages, alerts Discord and sends a fixed canned auto-reply. It currently has no AI in it at all, and is dormant because it needs the Cloud API, which needs Meta **Coexistence** (links the Cloud API to this same app-registered number without losing the app or chat history) to be set up first

**Revisit if** reply volume or delay becomes a real problem for hand-replying via Tier 0 below. At that point the next step is Coexistence + extending the webhook to call Ava's logic instead of the static text, not a paid vendor.
