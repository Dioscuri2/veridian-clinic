# ThanksDoc follow-up, round two

**For:** Benji
**Follows:** `thanksdoc-handover.md`
**Written:** 2026-09-16, after independent verification of round one

---

## First, what you got right

Verified independently against the public booking pages, not taken on trust.

- **Service 235 is live at £375.** This was the urgent one. It was losing £50 on every men's panel sold and it is now closed. Good.
- **Service 240 verified correctly:** Active, £149, 30 minutes. Matches your report exactly.
- **No descriptions were blanked.** Services 136, 235 and 240 all still carry their full patient-facing text. That was the main risk of editing a Laravel form and it did not happen.

The estate is in better shape than feared: **only one service had actually drifted.**

---

## Job A: service 136 rename did not take effect

You reported the rename from "GP Discovery Call" to "Discovery Core" as saved and verified. **It is not live.**

Checked with a cache-buster and no-cache headers on `https://notes.thanksdoc.co.uk/book/service/136/36`:

- The service card still reads **"GP Discovery Call"**
- The string **"Discovery Core" does not appear anywhere** on the page

### What to investigate, in this order

1. **Is there more than one name field?** Many booking platforms keep an internal/admin name separate from the public display name. If the edit form has both, you may have changed the internal one. Change whichever field feeds the public booking card.
2. **Did the save actually commit?** Reload the edit form itself and read the field back. Do not trust the success toast.
3. **Is there a cache?** If the edit form shows "Discovery Core" but the booking page shows "GP Discovery Call", it is a caching layer, not a failed save. Say so and stop, rather than saving repeatedly.

**Target state:** the public booking card at `/book/service/136/36` reads **Discovery Core**.

The website calls this product Discovery Core everywhere. A patient told to book Discovery Core currently lands on a page offering something apparently different, and a patient is being sent down this exact route this week.

---

## Job B: correction to your price audit

You listed this as a price that did not match:

> Service 136 (Discovery Core) was found at £127.00

**£127 is correct.** It is exactly what the table specified. Nothing is wrong with service 136's price and it must not be changed.

The only genuine mismatch in the entire estate was service 235, which you fixed. Worth knowing for next time: report a difference only when the live value differs from the target column.

---

## Job C: three confirmations still outstanding

You confirmed 137 and 139 are still inactive. Please also confirm:

```
233 (Energy Screen, retired) still OFF:     yes / no
292 still OFF:                              yes / no
320 still OFF:                              yes / no
no new services were created:               yes / no
```

These matter because ThanksDoc has **no separate visibility flag: any active service is publicly listed and bookable.** A service switched on by accident becomes a live product nobody intended to sell.

---

## Job D: report only, change nothing

Service 240 is named **"GP Results Consultation - Blood Test Patient Rate"** and its description says *"a 30-minute GP-led review of your **Veridian** blood test results"*.

That scopes it to patients who already bought a panel from Veridian. It is a follow-up rate, not a general results-interpretation service.

**Do not change it.** This is a product decision for Dr Tosin, not an error to correct. It is recorded here so it is not rediscovered later.

---

## Session handling

Unchanged from `thanksdoc-handover.md` section 0, and it still applies:

- **One keep-alive tab that never navigates**, all work in a different tab
- Install any pending **Chrome update before starting**, not during
- Dr Tosin is needed for **2FA**, so agree the window first

---

## Report back

```
JOB A  Service 136 public name
  separate display-name field found?   yes / no
  field changed:                       ____________________
  edit form now reads:                 ____________________
  public booking card now reads:       ____________________
  if still wrong, suspected cause:     ____________________

JOB C  Confirmations
  233 OFF:                yes / no
  292 OFF:                yes / no
  320 OFF:                yes / no
  no services created:    yes / no
```

If the public card still says "GP Discovery Call" after you have changed every name field you can find, **stop and say so.** That is a platform limitation worth knowing about rather than something to keep hammering at.
