---
name: veridian-publish-gate
description: "Decide whether Veridian Clinic content or an automated action can publish itself, or must stop for Dr Tosin to review. Use before publishing any patient-facing page, article, email, chatbot answer, social post, leaflet or newsjacked piece, before any auto-publishing loop ships, and whenever asked whether something needs a human gate, is safe to publish, or is compliant."
---

# Veridian Publish Gate

Veridian Clinic publishes under a named, GMC-registered GP (Dr Oluwatosin Taiwo, MBBS MRCGP MRCS). That is the whole commercial proposition and the whole regulatory exposure. A supplement shop can auto-publish and correct later. A clinical site cannot, because the wrong sentence is a GMC or ASA matter before it is a marketing one.

This skill decides one thing: **AUTO, GATE or BLOCK.** It is not a style review.

## The default

**GATE.** Anything patient-facing published under Dr Taiwo's name stops for human review unless it clearly meets the AUTO conditions below. Automated loops may draft, stage, alert and queue. They may not publish.

## BLOCK, do not publish at all, escalate to Dr Tosin

Any one of these ends it. Say which fired.

1. **A marker or panel claim not verifiable against `data/randox/nexus-analytes.json`.** Never claim a marker because it sounds plausible. Leptin, resistin, ApoC-II and ApoC-III are not sold by Randox in any form. Cortisol and DHEA-S exist only in Men's Health and Performance. hs-CRP only in Cardiovascular and Micronutrient; everything else measures standard CRP. Free testosterone is always calculated from total testosterone and SHBG, never measured directly. Cortisol is always a single morning serum sample, never a cortisol awakening response, diurnal profile, pattern, curve or rhythm.
2. **A price that does not match both `data/panels.ts` and the live ThanksDoc service.** These have drifted before by GBP 100 on a single product. Check both.
3. **Any reference to a prescription-only medicine in public-facing advertising.** Criminal offence under HMR 2012 reg 284, and enforced by CAP/ASA. This is WIDER than the brand name. It fires on all of: the brand name (Mounjaro, Wegovy, Ozempic, Saxenda), the generic name (tirzepatide, semaglutide, orlistat), the **drug class** (GLP-1, GLP1, GIP), the **route** (injection, injectable, jab, pen, vial), an image of a pen or vial, any efficacy figure ("up to 15% body weight"), before/after photos, POM pricing, and celebrity or health-professional endorsement. It also fires on stating or implying that the likely OUTCOME of a consultation is a prescription.
   **What is permitted:** advertising the consultation or assessment itself, the clinician, the clinic and location, BMI and eligibility criteria, and that services involve prescription options decided in consultation. Sell the consultation, never the medicine.
   Genuine editorial or news discussion of a drug class is different from advertising it, but the CTA under an editorial piece must not turn it into advertorial. If in doubt, BLOCK.
4. **A claim to cure, guarantee an outcome, or "reverse" a condition.** House rule is remission, never reversal. Reverse T3 and reverse cholesterol transport are anatomical terms and are fine.
5. **Anything disparaging the NHS**, or an unverifiable NHS waiting-time claim.
6. **A CQC, NHS, GMC or RCGP logo, or implied endorsement.** Veridian is not CQC registered. The only correct wording is that services run through ThanksDoc's CQC-registered framework.
7. **A safeguarding-sensitive question on an unmonitored channel.** Never ask about suicidal ideation, self-harm or mental health crisis on a web form, quiz or auto-reply that nobody watches in real time. Signpost to 111, 999 and Samaritans instead and screen it in consultation.
8. **A discount, rate or booking route that does not exist.** Every advertised code must exist in ThanksDoc booking discount codes, and every advertised service must be Active. An advertised rate with no bookable product is mis-selling.
9. **Eligibility stated as fact from self-reported data.** GPhC 2025 requires height and weight verified independently of what a patient types. A web form may say nothing here rules you out. It may never say you qualify.

## GATE, draft and alert, do not publish

- Any new patient-facing page, article, or landing page.
- Any newsjacked or news-reactive piece, without exception. Speed is the point of newsjacking and speed is exactly what makes it dangerous on a clinical site.
- Any change to a price, an inclusion, a cancellation term or a refund position.
- Any clinical explanation, symptom list, threshold, or reference range.
- Any claim about what a competitor does or charges.
- Any content mentioning a drug class, even editorially.
- Any email or chatbot answer template that quotes a price or a clinical fact.
- Anything printed, since it cannot be corrected after the run.

When gating, do not just stop. Produce the draft, state plainly what needs a human decision and why, and put the specific question to Dr Tosin.

## AUTO, may publish without review

Only if it meets all of these: it makes no clinical claim, quotes no price, names no medicine, is not printed, and is reversible in one action.

In practice that is: typo and punctuation fixes, dead link repairs, alt text, internal linking between pages that already passed the gate, sitemap and metadata plumbing, and formatting.

## House rules that apply to everything

- No em dashes, en dashes or non-breaking hyphens anywhere. Enforce in code, not by asking a model nicely; models ignore this instruction.
- UK English.
- Red-flag safety netting on any symptom content: chest pain, breathlessness at rest, stroke symptoms, uncontrolled bleeding, anaphylaxis, first or prolonged seizure go to 999.
- Adults 18 and over. Veridian does not see children.
- Never imply the service replaces NHS registration.

## Output format

1. **Verdict:** AUTO, GATE or BLOCK.
2. **What fired**, naming the numbered rule.
3. **What to change** to move it up a level, if anything can.
4. **The question for Dr Tosin**, if gated, phrased so it can be answered yes or no.

Close with: "Gate decision only. Publication and its clinical accuracy remain the responsibility of the named clinician."
