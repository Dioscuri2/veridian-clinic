# ThanksDoc price fix, step by step

**For:** whoever has a logged-in ThanksDoc session
**Urgency:** live revenue leak. Every Men's Health panel booked right now takes **£50 less** than the site advertises.
**Time:** about 2 minutes for the fix, 10 if you also do the audit in section 4.

---

## 1. The one change that matters

The website and Stripe were repriced to **£375** on 2026-09-16. ThanksDoc was not. They must match, because **ThanksDoc is where the patient actually pays**.

| | Value |
|---|---|
| Service ID | **235** |
| Service name | Men's Health, "Running on Empty" |
| Edit URL | `https://notes.thanksdoc.co.uk/staff/doctor-services/235/edit` |
| Field to change | **`default_price`** |
| From | `325` |
| To | **`375`** |

**Change nothing else on that form.** Not the name, not the description, not `is_active`.

---

## 2. Access

- Login: `https://notes.thanksdoc.co.uk/login`
- Email: `dioscuri2@gmail.com`
- Password: in the vault at `~/.openclaw/workspace-main/oph-vault/CREDENTIALS.md`
- **There is 2FA.** A code goes to Dr Tosin's phone. Nobody gets past this step without him, so agree the timing before starting.

`https://notes.thanksdoc.co.uk/staff` redirects to `/login` when the session has expired. That is normal, not an error.

---

## 3. Two ways to do it

### Option A, by hand (recommended)

1. Log in, complete 2FA
2. Go to `https://notes.thanksdoc.co.uk/staff/doctor-services/235/edit`
3. Find **Price** / `default_price`. It will read `325`
4. Change it to `375`
5. Save
6. Reload the page and confirm it now reads `375`

### Option B, programmatically

**Do not build a partial POST.** The form is plain Laravel and posts the entire record, so any field you leave out is written back empty and you will silently wipe the service description.

The safe sequence is:

1. `GET` the edit page with the session cookie
2. Parse **every** `<input>`, `<select>` and `<textarea>` on the form, including the hidden `_token` CSRF field
3. Rebuild the FormData from all of them exactly as found
4. Override **only** `default_price` to `375`
5. `POST` back to the form's own action URL
6. `GET` the page again and assert `default_price` is `375`

---

## 4. While you are in there, check the rest

This is the **second** time ThanksDoc has drifted from the site. In August, Performance sat £100 below the advertised price for weeks and the quiz funnels were dead. So it is worth verifying all of them against the source of truth, `data/panels.ts`.

Edit each at `https://notes.thanksdoc.co.uk/staff/doctor-services/<ID>/edit`

| ID | Service | Correct price |
|---|---|---|
| **235** | **Men's Health** | **£375** ← the fix |
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

Report back **only the ones that differ**. Do not fix anything beyond 235 without checking with Dr Tosin first, because a price that looks wrong may have been changed deliberately.

---

## 5. Do not touch these

Getting any of this wrong causes a real problem, not a cosmetic one.

- **Services 137 and 139** ("Quiz Rate" duplicates) are **deactivated on purpose**. There is no separate visibility flag in ThanksDoc: **an active service is publicly listed and bookable by anyone.** Activating them lets people book the discounted rate without ever taking the quiz. Quiz rates are delivered by discount code on the standard service instead. **Do not reactivate them.**
- **Service 233** (Energy Screen, £195) is retired and deliberately OFF. It was collapsed into the £249 Energy & Fatigue panel.
- **Services 292 and 320** are deliberately OFF.
- **Do not create new services.** Every service the site links to already exists.
- **Do not edit discount codes.** `QUIZRATE` is £30 off service 136, `WLQUIZRATE` is £12 off service 138, and `VIPCALL1` is Dr Tosin's own.

---

## 6. Keep the session alive

The ThanksDoc session drops quickly, and the in-page keep-alive dies on **any navigation or reload of its own tab**, not only when the tab is closed.

So: **keep one dedicated tab open doing nothing**, and do all the actual admin browsing in a **different** tab. If you reload the keep-alive tab, the keep-alive is gone and you will be logging in and doing 2FA again.

---

## 7. When it is done

Confirm back:

1. Service 235 reloads showing **£375**
2. Its name, description and active status are unchanged
3. Any other prices that did not match the table in section 4

That last point matters more than the fix itself. If a second service has drifted, we want to know now rather than in another six weeks.
