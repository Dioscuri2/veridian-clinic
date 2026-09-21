# Day 10 correction — DONE 2026-09-21

Both actions completed once LinkedIn OAuth was reconnected (token now valid to
2026-11-20, verified in Upstash rather than assumed).

## What happened

| Post | Action | Result |
|---|---|---|
| `urn:li:share:7475789939322998784` (day 10, cortisol) | deleted, replaced | `alreadyGone: false` |
| `urn:li:share:7478688989986762755` (day 15, Mounjaro/Wegovy) | deleted, no replacement | `alreadyGone: false` |
| replacement post | published | `urn:li:share:7507675673851899904` |

Day 15 got no rewrite because the drug names were its entire premise. Naming a
prescription-only medicine in public advertising breaches HMR 2012 reg 284, and
the CAP/ASA position covers the class term "GLP-1" as well as the brands.

## Verification done before publishing

All 14 marker claims in the replacement were checked against the Nexus-verified
`HSC10` list in `data/randox/panel-analytes.json`: fasting insulin (INS),
C-peptide (CPEP), HbA1c (HBA1_NEW), TSH, FT3, FT4, both thyroid antibodies
(TGA, ATA), ferritin, iron studies (FE, TIBC, TF, TFSAT), B12 (VITB12),
folate (FOL), vitamin D (25OH_VITD), CRP. Price GBP 249 matches `data/panels.ts`
and ThanksDoc service 237.

The replacement makes **no cortisol claim at all**, which was the original fault.
It says instead that stress physiology "is harder to capture in one blood draw
than the internet suggests" — an honest limit rather than a marker we cannot sell.

## no-ai-slop edits applied to the draft

The drafted rewrite carried three tells. Fixed before posting:

1. **Three binary contrasts** ("not a failure of discipline", "a signal, not a
   willpower problem", "not a PDF of numbers"). Kept the first, which is the
   emotional core and reads as human. Cut the other two: one negation is voice,
   three is a tic.
2. **Stacked one-line fragments** at the open, the classic LinkedIn engagement-bait
   rhythm. Merged into a single paragraph; the content is unchanged.
3. **Hashtags trimmed** 6 to 4.

## Caution for whoever publishes next

Do NOT route these API calls through curl. Cloudflare blocks
`POST /api/social/*` even with a browser user-agent, and repeated attempts risk a
one-hour IP ban. Run the fetch from the logged-in `/admin` page in the browser
instead, which is same-origin and carries the real session.
