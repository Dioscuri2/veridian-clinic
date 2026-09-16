# ThanksDoc handover, all outstanding changes

**For:** Benji, working with Dr Tosin present for 2FA
**Platform:** ThanksDoc EPR, `https://notes.thanksdoc.co.uk`
**Written:** 2026-09-16
**Supersedes:** `thanksdoc-price-fix.md`

ThanksDoc is where patients actually pay. The website is only advertising. When the two disagree, **ThanksDoc wins and the website has been lying**, so every change below is about making them agree.

There are **five jobs**. Job 1 is losing money every day. The rest are correctness.

---

## 0. Before you start

### You cannot do this alone

There is **2FA on the login**. A code goes to Dr Tosin's phone. Agree a window when he is free, because the session will need re-establishing if it lapses.

- Login: `https://notes.thanksdoc.co.uk/login`
- Email: `dioscuri2@gmail.com`
- Password: vault at `~/.openclaw/workspace-main/oph-vault/CREDENTIALS.md`

`https://notes.thanksdoc.co.uk/staff` redirects to `/login` when the session has gone. That is normal, not a fault.

### Keeping the session alive, this is the part people get wrong

The ThanksDoc session drops quickly, and the keep-alive is more fragile than it looks.

**The rule: one tab that never moves, all work in a different tab.**

1. After logging in, open a **dedicated keep-alive tab** on a harmless authenticated page such as `/staff`
2. **Never navigate, reload, or close that tab.** The keep-alive dies on *any* navigation of its own tab, not only on closing it. This has caught us out before
3. Open a **second tab** and do every edit there
4. If you need a third view, open a third tab. Never reuse the keep-alive tab

**Also: do not let Chrome restart.** Chrome was seen running with a `--restart` flag on 2026-09-16 and it took the session and the browser automation with it. If there is a pending Chrome update, install it *before* starting, not during.

If the session dies you will need Dr Tosin for 2FA again, so protect it.

### Record before you change

For every field you touch, write down the **old value** before overwriting it. If something goes wrong, that note is the only way back. Put them in the report at section 6.

---

## 1. URGENT: Men's Health price, service 235

**This is live revenue loss. Every men's panel booked right now takes £50 less than advertised.**

The website and Stripe were repriced to £375 on 2026-09-16. ThanksDoc was not.

| | |
|---|---|
| URL | `https://notes.thanksdoc.co.uk/staff/doctor-services/235/edit` |
| Service | Men's Health, "Running on Empty" |
| Field | **`default_price`** |
| From | `325` |
| To | **`375`** |

Change that one field. Save. Reload the page and confirm it reads `375`.

---

## 2. Discovery Core name mismatch, service 136

The website calls this product **Discovery Core**. ThanksDoc calls it **"GP Discovery Call"**. A patient told to book Discovery Core arrives at a page offering something apparently different.

| | |
|---|---|
| URL | `https://notes.thanksdoc.co.uk/staff/doctor-services/136/edit` |
| Field | **`name`** |
| From | `GP Discovery Call` |
| To | **`Discovery Core`** |

Leave the price at £127 and the description alone.

---

## 3. Results Consultation, service 240, verify only

This service exists but is invisible on the website, and we are about to start pointing people at it. **Do not change anything yet. Report what you find.**

Check and report:

1. Is it **Active**?
2. What is the **price**? It should be £149
3. What is the **duration**? It needs to be **30 minutes**. If it is 15 or 20, say so and stop, because we would be charging more than Discovery Core (£127 for 30 minutes) for less time, which Dr Tosin needs to decide on
4. What does the **description** say?

---

## 4. Discount codes, verify

At `https://notes.thanksdoc.co.uk/staff/booking-discount-codes`.

| Code | Should be | Action |
|---|---|---|
| `QUIZRATE` | **£30** off service **136** (£127 to £97) | Verify amount, service and that it is active and unexpired |
| `WLQUIZRATE` | **£12** off service **138** (£60 to £48) | Verify only |
| `VIPCALL1` | 100% off, 5 uses, **expired 13 Sep 2026** | Confirm it has expired. Do not renew |

**`QUIZRATE` is the one that matters this week.** A patient is about to be sent through the quiz to earn it. If it is wrong, stale, or inactive, she hits a dead code at payment and that lands on a new referral relationship. It was corrected from £20 to £30 on 24 August, but verify it live rather than trusting the record.

**Do not create new codes** without asking. A code scoped to the Golders Green referral was discussed and then dropped in favour of the quiz route.

---

## 5. Price audit, all services

Second drift in six weeks, so check the lot against `data/panels.ts`.

Each at `https://notes.thanksdoc.co.uk/staff/doctor-services/<ID>/edit`

| ID | Service | Correct price |
|---|---|---|
| **235** | **Men's Health** | **£375** ← job 1 |
| 234 | Women's Health | £375 |
| 232 | Longevity Panel | £795 |
| 231 | Metabolic Baseline | £595 |
| 239 | Performance | £549 |
| 236 | Cardiovascular | £349 |
| 229 | Women's Advanced Health | £375 |
| 237 | Energy & Fatigue | £249 |
| 238 | Weight & Metabolism | £199 |
| 318 | Micronutrient | £295 |
| 319 | Micronutrient + Red Cell Selenium | £335 |
| 240 | Results Consult | £149 |
| 230 | 12-Week Reset | £1,895 |
| 136 | Discovery Core | £127 |
| 138 | Weight Loss Consult | £60 |
| 334 | GP Consultation 15 min | £59 |
| 335 | GP Consultation 20 min | £89 |
| 336 | Repeat Prescription | £25 |

**Report differences. Do not fix anything except 235 without checking**, because a price that looks wrong may have been changed deliberately.

---

## 6. How to save without breaking things

### If you are clicking through the UI

Change the field, save, then **reload and confirm**. Do not trust the success toast.

### If you are doing it over HTTP

**The form is plain Laravel and posts the entire record. A partial POST writes empty values over every field you omit**, including the patient-facing description.

1. `GET` the edit page with the session cookie
2. Parse **every** `input`, `select` and `textarea`, including the hidden `_token` CSRF field
3. Rebuild the FormData from all of them, exactly as found
4. Override **only** the field you are changing
5. `POST` back to the form's own action URL
6. `GET` again and assert the new value, and that the description is still intact

---

## 7. Do not touch, this is the dangerous list

Getting any of these wrong causes a real problem, not a cosmetic one.

- **Services 137 and 139** ("Quiz Rate" duplicates) are **OFF on purpose**. ThanksDoc has **no separate visibility flag: an active service is publicly listed and bookable by anyone.** Activating these lets strangers book the discounted rate without ever taking a quiz. This exact mistake was made in August. **Do not reactivate them.**
- **Service 233** (Energy Screen £195) is retired, collapsed into the £249 Energy & Fatigue panel. Stays OFF.
- **Services 292 and 320** stay OFF.
- **Do not change `is_active` on anything.**
- **Do not create new services.** Everything the website links to already exists.
- **Do not edit the clinic bio or availability.**
- **Do not touch appointments or patient records.** This job is services and codes only.

---

## 8. Report back

Copy this and fill it in.

```
JOB 1  Service 235 price
  old value seen:        £____
  new value saved:       £____
  reloaded and verified: yes / no

JOB 2  Service 136 name
  old name seen:         ____________________
  new name saved:        Discovery Core
  reloaded and verified: yes / no

JOB 3  Service 240 (verify only, no changes)
  active:                yes / no
  price:                 £____
  duration:              ____ minutes
  description:           ____________________

JOB 4  Discount codes
  QUIZRATE:    amount £____  service ____  active? ____  expires ____
  WLQUIZRATE:  amount £____  service ____  active? ____
  VIPCALL1:    expired? ____

JOB 5  Price audit
  services that did NOT match the table: ____________________
  (report only, do not fix)

CONFIRMATIONS
  137 and 139 still INACTIVE:        yes / no
  233, 292, 320 still OFF:           yes / no
  no services created:               yes / no
  no descriptions blanked:           yes / no
```

Anything unexpected, stop and ask rather than guessing. A wrong price costs money; a blanked description or a reactivated quiz-rate service costs more.
