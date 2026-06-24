# T6: Metabolic Turnaround Launch Checklist

**Goal:** Go-live readiness for the Metabolic Turnaround programme acquisition engine  
**Target launch date:** TBC (set after offer page approval)  
**Owner:** Dr Tosin Taiwo  
**Status tracking:** Update each item as complete

---

## PHASE 1: CONTENT AND COPY (prerequisite to everything)

### Offer Page
- [ ] /metabolic-turnaround page built from offer-page.md copy
- [ ] Compliance review: no outcome promises, no prohibited health claims
- [ ] GLP-1 framing: eligibility assessment only, no prescribing guarantee
- [ ] Complete Picture Guarantee and Engagement Guarantee copy approved
- [ ] CTA button wired to /book?tier=turnaround or Calendly
- [ ] Mobile layout reviewed
- [ ] Page speed 80+ (PageSpeed Insights)
- [ ] Canonical URL set

### Payment
- [ ] Stripe product created: Metabolic Turnaround Full (£1,895)
- [ ] Stripe product created: Metabolic Turnaround Payment 1 (£695)
- [ ] Payment link or /api/checkout integration live
- [ ] /book/thank-you fires confirmation for turnaround tier
- [ ] Test purchase completed and verified

### Navigation
- [ ] "Metabolic Turnaround" added to navigation or landing page link
- [ ] /assessments page links to /metabolic-turnaround

---

## PHASE 2: FUNNEL INFRASTRUCTURE

### Quiz to Lead Pipeline
- [ ] /metabolic-quiz/thank-you email capture POSTs to Brevo "Veridian Leads" list
- [ ] Quiz result params (mAge, chrono, band, weakest) passed as Brevo contact attributes
- [ ] Email 1 (scorecard) sends immediately on subscribe
- [ ] Brevo automation sequence (E1-E5) built and tested with test email
- [ ] Unsubscribe and GDPR compliance verified in all emails

### Tracking
- [ ] GA4 property live and receiving data
- [ ] Custom events wired: quiz_start, quiz_complete, email_capture, discovery_call_booked
- [ ] Google Ads conversion tracking tag installed (fires on /book/thank-you for turnaround)
- [ ] Phone call conversion tracking set up
- [ ] Google Sheet funnel tracker created (tracking-schema.md)
- [ ] GA4 linked to Google Ads account

---

## PHASE 3: ORGANIC ACQUISITION

### Blog Content
- [x] vigorous-exercise post live
- [x] sulforaphane post live
- [x] multivitamins post live
- [x] omega-3 post live
- [x] vitamin-d post live
- [x] homocysteine post live
- [x] fasting-insulin post live
- [x] reversing-metabolic-syndrome post live
- [x] apob-vs-ldl post live
- [x] lipoprotein-a-apob-triglycerides post live
- [x] should-i-take-a-statin post live
- [ ] /metabolic-turnaround CTA added to relevant blog post footers (homocysteine, fasting-insulin, reversing-metabolic-syndrome as priority)
- [ ] Internal linking: 3+ blog posts link to /metabolic-turnaround

### SEO
- [ ] Google Search Console verified and /metabolic-turnaround submitted
- [ ] Google Business Profile live: Veridian Clinic, CQC regulated, GP-led
- [ ] Blog sitemap auto-updating (check /sitemap.xml)
- [ ] Core Web Vitals green on all new pages

---

## PHASE 4: LINKEDIN CONTENT SCHEDULE

- [x] Days 1-7: posted
- [x] Days 8-14: scheduled in schedule.json
- [ ] Days 15-21: batch needed (conference content to fill Day 12 / June 27 slot)
- [ ] Metabolic Turnaround announcement post drafted for launch day
- [ ] LinkedIn personal profile updated: Veridian Clinic + Metabolic Turnaround mention

---

## PHASE 5: GOOGLE ADS (DO NOT ACTIVATE UNTIL APPROVED)

Review 500-test.md fully before this phase.

- [ ] Google Ads account created
- [ ] Billing verified
- [ ] Negative keyword list uploaded
- [ ] Campaign 1 (Metabolic Symptoms) built, paused
- [ ] Campaign 2 (Intent Keywords) built, paused
- [ ] Campaign 3 (Remarketing) built, paused
- [ ] Conversion tracking verified with test event
- [ ] Landing page (offer page) approved by Dr Tosin
- [ ] Ad copy reviewed for CAP Code compliance
- **[ ] DR TOSIN FINAL APPROVAL BEFORE ANY CAMPAIGN GOES LIVE**
- [ ] Campaign 1 activated at £30/day
- [ ] Daily check-in for first 7 days

---

## PHASE 6: OPERATIONAL READINESS

### Discovery Calls
- [ ] ThanksDoc discovery call slot open (Mon-Fri, suggest 8am-10am and 12pm-2pm)
- [ ] Calendar blocked: minimum 5 discovery call slots per week
- [ ] Discovery script reviewed (discovery-script.md)
- [ ] Post-call follow-up email template saved as draft
- [ ] Brevo segment "Discovery - Attended" created

### Clinical Operations
- [ ] RANDOX collection centre list ready to share with patients (or confirm integration)
- [ ] Blood panel order process confirmed (RANDOX platform access)
- [ ] Patient portal (ThanksDoc or replacement) ready for result storage
- [ ] Plan template drafted for written plan delivery
- [ ] Check-in call template / notes structure ready

---

## PHASE 7: LAUNCH WEEK

### Day -3
- [ ] All Phase 1-4 items complete
- [ ] Soft announcement: personal LinkedIn post from Dr Tosin (not corporate)
- [ ] One blog post added with /metabolic-turnaround CTA

### Day 0 (Launch)
- [ ] /metabolic-turnaround page live
- [ ] LinkedIn launch post published
- [ ] Email to existing lead list: "New programme announcement"
- [ ] Google Ads Campaign 1 activated (post Dr Tosin approval)

### Day 7 (First Review)
- [ ] Ads: CTR, CPC, CPL check
- [ ] Discovery calls: booked vs attended ratio
- [ ] Quiz: conversion rate from visitor to completion
- [ ] Any page speed or UX issues flagged
- [ ] Weekly Metrics Rollup Sheet updated

---

## FLAGS FOR DR TOSIN

The following require a decision or approval before the checklist can be completed:

1. **Offer page live date** - ready to build the Next.js page from offer-page.md once approved
2. **Google Ads activation** - account can be set up but NO ads go live without explicit approval
3. **GLP-1 pathway** - if including in the programme, the eligibility criteria and process need defining before any marketing references it
4. **3-payment Stripe setup** - needs a decision: single payment link at £695 x3, or a Stripe subscription with installment plan?
5. **Day 12 LinkedIn content** - June 27 slot is empty (omega-3 skipped, no panel). Conference content needed.
6. **WhatsApp Business** - still blocked on mobile SIM. Decision needed on whether to proceed with a new SIM or hold this.
