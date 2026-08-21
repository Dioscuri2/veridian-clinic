# Day 10 correction — BLOCKED on LinkedIn reconnect

**Original post:** `urn:li:share:7475789939322998784`, published 2026-06-25, topic
"Cortisol and belly fat". **Still live and still wrong.**

## Why it has to come down

1. It claims **"The cortisol awakening response is not tested on any standard NHS
   panel. At Veridian it is included in the Energy Screen."** We do not test the CAR.
   The CAR is multiple timed *salivary* samples at waking, +30 and +45 minutes.
   Randox `CORTISOL` is a single serum draw. The claim is clinically inaccurate and
   it is published under a GMC-registered GP's name.
2. It sells the **Energy Screen at £195** — a product retired on 2026-08-21 and
   merged into Energy & Fatigue (£249).
3. Its link `/blood-tests/metabolic-screen` now 308s to the fatigue panel, which
   contains **neither cortisol nor testosterone** — the two markers the post
   advertises.

Do NOT simply repoint it at `/blood-tests/optimiser-baseline`. That page claims
morning cortisol and DHEA-S via `HSC12`, whose analyte list is **not yet verified
against Nexus**. That would relocate the unverified claim, not fix it.

## Approved plan (Dr Tosin, 2026-08-21): delete the original, then post the rewrite

Blocked because **LinkedIn is disconnected** — `/api/social/delete-post` returns
`{"error":"LinkedIn not connected"}`, i.e. `getLinkedInTokens()` found no tokens in
Upstash Redis. Reconnect at `https://veridianclinic.com/api/auth/linkedin` (admin
OAuth, needs a browser sign-in), then run the two commands at the bottom.

Do NOT add the rewrite to `schedule.json` as `pending`. The 07:00 cron would fire it
while the original is still live — which is the "leave it up" option that was
explicitly rejected. Delete first, post second.

## Rewrite (every marker below is on the Nexus-verified HSC10 analyte list)

You have tried cutting calories.
You are exercising three times a week.
The weight is still creeping up, mostly around your middle.

This is not a failure of discipline.

Weight that settles around the abdomen despite genuine effort is usually a signal, not a willpower problem. The most common driver is insulin resistance, the phase where your pancreas is working progressively harder to hold glucose normal, and fasting glucose and HbA1c still read as reassuringly fine. Thyroid function and chronic inflammation compound it. Stress physiology plays a part too, though it is harder to capture in a single blood draw than the internet suggests.

What a standard NHS panel rarely measures is fasting insulin. Without it you are looking at the end of the process and missing the decade that led there.

Our Energy & Fatigue panel measures fasting insulin and C-peptide alongside HbA1c, full thyroid function with both antibody types, ferritin with complete iron studies, B12, folate, vitamin D and CRP. Every result comes back with a written interpretation from a GP, not a PDF of numbers.

Book the Energy & Fatigue panel (£249): https://veridianclinic.com/blood-tests/fatigue-energy

#InsulinResistance #MetabolicHealth #WeightLoss #Fatigue #PrivateGP #VeridianClinic

## Commands, once LinkedIn is reconnected

```bash
cd scripts/linkedin-scheduler && source ./.env

# 1. delete the original
curl -s -X POST https://veridianclinic.com/api/social/delete-post \
  -H "Content-Type: application/json" -H "Cookie: $ADMIN_COOKIE" \
  -d '{"postId":"urn:li:share:7475789939322998784"}'

# 2. post the rewrite (body text above), then record the new post_id
#    against day 10 in schedule.json with a note that it supersedes the original.
```
