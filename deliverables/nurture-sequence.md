# T2: Email Nurture Sequence (Quiz Completion to Discovery Call)

**Trigger:** User completes metabolic quiz and submits email (scorecard request)  
**Goal:** Discovery Call booking within 5-7 days  
**Sender name:** Dr Tosin Taiwo, Veridian Clinic  
**From address:** dr.tosin@veridianclinic.com  
**List:** Brevo "Veridian Leads"  
**Compliance:** No clinical outcome promises. No urgency tactics using health fear. GDPR compliant (double opt-in on scorecard submit).

---

## EMAIL 1: Immediate (send on quiz submit)

**Subject:** Your metabolic scorecard, Dr Tosin

**Body:**

Hi [first name],

Your metabolic age result: **[mAge] years** (you are [chrono] chronologically).

[CONDITIONAL: if delta > 0] That gap suggests your metabolism is running ahead of your biological age. It is not a diagnosis, and it does not mean anything is wrong, but it is worth understanding.

[CONDITIONAL: if delta <= 0] That alignment is encouraging. The question worth asking is whether it is sustainable and what the specific numbers underneath it look like.

The scorecard you asked for is below. Three things stand out as the most impactful for your score:

1. **[weakest marker area 1]** - this is the lever most people underestimate
2. **[weakest marker area 2]** - often invisible without blood testing
3. **[weakest marker area 3]** - the one most GPs do not routinely check

I have written a short clinical overview of each one. You will find it useful whether or not you go further with us.

[SCORECARD CONTENT BLOCK - dynamically inserted based on quiz result band]

One thing I want to be honest about: the quiz gives you a direction, not a diagnosis. The markers that matter most for your specific situation require a blood test to see. If you want to know what is actually happening inside your body rather than estimating from symptoms, that is what we do.

If you want to talk through what your score means in more detail, I do a free 30-minute discovery call. No pitch, no pressure, just a clinical conversation.

[BOOK A FREE DISCOVERY CALL - button]

Dr Tosin Taiwo  
GP, Veridian Clinic  
CQC regulated

---

## EMAIL 2: Day 2 (first clinical article)

**Subject:** The blood test result that changes everything (most GPs don't run it)

**Body:**

Hi [first name],

Most people assume that normal fasting glucose means their metabolism is fine.

It does not. Fasting insulin can be elevated for years before glucose rises. Insulin resistance is the underlying driver of weight that won't shift, afternoon energy crashes, and the slow accumulation of visceral fat, and it is completely invisible on a standard NHS blood test.

I wrote a short article on what fasting insulin actually shows and what a genuinely meaningful range looks like (not just "within normal limits"):

[Read: Fasting insulin, the missing early signal in metabolic disease](https://veridianclinic.com/blog/fast-insulin)

If fasting insulin has never been on your blood test request form, you are not alone. It is not on the standard NHS metabolic screen. It is on ours.

The only question worth asking about your own fasting insulin is: have you ever had it tested?

Dr Tosin

---

## EMAIL 3: Day 4 (social proof + programme framing)

**Subject:** What a GP actually does with 70 blood markers

**Body:**

Hi [first name],

The most common question I get before people book a discovery call is this: "I have had private blood tests before. What will be different?"

Fair question.

The difference is not the number of markers, though ours covers things most panels ignore. The difference is what happens after the results come in.

A standard blood test gives you numbers and reference ranges. A Veridian interpretation session gives you a GP who has looked at the full pattern, not individual markers in isolation, and can explain what the pattern means for your physiology, your symptoms, and what to actually do next.

The Metabolic Turnaround programme includes:

- A 70+ marker private blood panel
- A 60-minute GP interpretation session
- A written personalised plan
- Fortnightly GP check-ins for 90 days
- A Complete Picture Guarantee: if we do not find at least three things your previous testing missed, we extend your programme at no charge

Investment: £1,895 (or 3 x £695)

If you want to understand what this looks like for your specific situation, the discovery call is the right next step. It is 30 minutes, free, and there is no obligation.

[BOOK A FREE DISCOVERY CALL - button]

Dr Tosin

---

## EMAIL 4: Day 6 (objection handling: "is this for me?")

**Subject:** This programme is probably not for you if...

**Body:**

Hi [first name],

I want to be direct about who the Metabolic Turnaround is not designed for.

It is not right for you if you want a quick fix. The 90-day structure exists because metabolic health does not shift in a week. If you are looking for a single supplement or a shortcut, we are not the right fit.

It is not right for you if you are currently under investigation for a serious medical condition. We can help with a lot, but this programme is designed for proactive optimisation, not acute clinical management.

It is not right for you if you are unlikely to engage with fortnightly check-ins. The programme only works if we can actually track how you are responding and adjust.

If none of those apply to you, and you have been walking around feeling like something is not quite right while every test comes back normal, this was built for that exact experience.

The discovery call is where we work out together whether this fits your situation. Thirty minutes, no charge, no sales pressure.

[BOOK YOUR DISCOVERY CALL - button]

Dr Tosin

---

## EMAIL 5: Day 8 (final send, light urgency on places)

**Subject:** Last note from me (for now)

**Body:**

Hi [first name],

This is my last email in this sequence. I do not want to crowd your inbox.

A short summary of where we are:

Your metabolic age score from the quiz was **[mAge] years**. [one-sentence personalised comment based on band.]

If that result has stayed with you and you want to understand the numbers behind it properly, the Metabolic Turnaround is designed exactly for that.

We take on ten new patients per month to maintain the level of clinical attention each programme requires. If you want to talk it through, the discovery call is free and available most weekday mornings.

[BOOK YOUR FREE DISCOVERY CALL - button]

If now is not the right time, that is completely fine. You can always come back to us when it is.

With best wishes,

Dr Tosin Taiwo  
Veridian Clinic  
020 3633 9518  
[veridianclinic.com](https://veridianclinic.com)

CQC regulated | Confidential | Unsubscribe

---

## SEQUENCE TECHNICAL SETUP (Brevo)

**Automation trigger:** Contact added to "Veridian Leads" list  
**Segments used:** Quiz band (strong/drifting/high-risk) for conditional personalisation in Email 1  
**Delays:**
- Email 1: Immediately
- Email 2: +2 days
- Email 3: +4 days
- Email 4: +6 days
- Email 5: +8 days

**Exit conditions:**
- Contact books a discovery call (UTM param or Calendly webhook)
- Contact replies to any email (flag for manual follow-up)
- Contact unsubscribes

**Dynamic fields required in Brevo:**
- {{contact.FIRSTNAME}} or fallback "there"
- {{contact.METABOLIC_AGE}} (mAge from quiz result)
- {{contact.CHRONO_AGE}} (chrono from quiz result)
- {{contact.DELTA}} (delta = mAge - chrono)
- {{contact.BAND}} (strong / drifting / high-risk)
- {{contact.WEAKEST}} (weakest area from quiz)

**Note:** Dynamic scoring personalisation requires passing quiz result params as contact attributes at email capture. The scorecard form at /metabolic-quiz/thank-you should POST these to the Brevo API alongside the email address.
