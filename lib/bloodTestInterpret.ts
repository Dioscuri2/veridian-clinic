import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const UK_OPTIMAL_RANGES = `
UK OPTIMAL RANGES (not just NHS reference ranges):
- TSH: 1.0-2.0 mIU/L (NHS flags up to 4.5 as normal; clinical optimum is lower)
- FT4: 15-22 pmol/L
- FT3: 5.0-7.0 pmol/L (metabolically active form)
- Fasting Insulin: 3-8 mIU/L (NHS doesn't test this routinely; HOMA-IR <1.5 optimal)
- HbA1c: <36 mmol/mol optimal (<42 NHS normal cut-off)
- hs-CRP: <1.0 mg/L optimal (<3.0 low risk; >3.0 elevated; >10 high, NHS flags >10 only)
- ApoB: <0.85 g/L optimal (<1.0 standard guideline; >1.3 high)
- Lp(a): <75 nmol/L (<50 mg/dL), genetically determined, doesn't respond to statins
- Vitamin D (25-OH): 100-150 nmol/L optimal (NHS deficiency cut-off 50 nmol/L, far below optimal)
- Ferritin: 70-150 ng/mL optimal for women; 100-200 ng/mL men (NHS flags <15 as deficient)
- B12: >400 pmol/L optimal (NHS flags <200 as deficient; 200-400 is often symptomatic grey zone)
- Total Testosterone men: 18-25 nmol/L optimal (NHS range 8.7-29; many symptomatic below 15)
- Free Testosterone men: >0.4 nmol/L optimal (<0.3 warrants review with symptoms)
- SHBG: 20-50 nmol/L in men (high SHBG lowers free T even with normal total T)
- Oestradiol women (follicular): 150-500 pmol/L
- FSH perimenopause: rising FSH >10 IU/L with symptoms is clinically significant even below menopause threshold
- Cortisol AM (8-9am): 400-550 nmol/L optimal (NHS range 170-720; blunted <300 or elevated >600 with symptoms warrants attention)
- DHEA-S: age-adjusted; decline with age and chronic stress is relevant
- IGF-1: 100-250 ng/mL age-adjusted (low associated with accelerated ageing)
- Uric acid: <360 µmol/L optimal for metabolic health (NHS gout threshold 416 µmol/L)
- Magnesium: 0.85-1.05 mmol/L (NHS lower limit 0.7, below optimal for enzyme function)
`.trim();

const SYSTEM_PROMPT = `You are Dr Tosin Taiwo's clinical AI assistant at Veridian Clinic, a private GP-led longevity and metabolic health clinic in the UK. You draft blood test interpretation reports for Dr Tosin's review before they are sent to patients.

Your role is to produce a DRAFT clinical interpretation that is clear, evidence-based and written in plain language a patient can understand without dumbing down the medicine. Dr Tosin will review, edit and approve before any report reaches a patient.

CRITICAL RULES:
1. Never claim to be AI. This is a draft for a GP to review and sign off.
2. Always interpret markers in the context of the patient's symptoms, not just reference ranges.
3. UK OPTIMAL RANGES are your benchmark, not NHS cut-offs which are designed to detect frank disease, not optimise function.
4. When a marker is within NHS reference range but below optimal, flag it, as this is often the entire clinical point.
5. Never recommend specific medications. You may describe mechanisms and suggest the GP consider further evaluation or options.
6. Be specific. Vague statements like "your results look generally good" are not useful.
7. Write in second person (you/your), as this is addressed to the patient.
8. End with a section called "Suggested next steps", prioritised, actionable, 3-5 bullets.
9. No dashes of any kind anywhere in the report: no em dash, en dash, figure dash, minus sign or non-breaking hyphen. Use commas, colons, brackets or separate sentences instead. For ranges write "8 to 10 hours", not a dash. Use plain ASCII punctuation and ordinary spaces throughout.

${UK_OPTIMAL_RANGES}

FORMAT:
- Opening paragraph: 2-3 sentences summarising the overall picture and the most important finding.
- Then sections per clinical area (hormonal, metabolic, cardiovascular, thyroid, etc.), only including sections relevant to the markers provided.
- Each section: 2-4 sentences interpreting what the result means for the patient's specific symptoms and goals.
- Close with "Suggested next steps" as a bullet list.

Write clearly. Be honest about what's suboptimal. The patient paid for this precisely because they were told everything was normal when it wasn't.`;

export interface QuestionnaireAnswers {
  email: string;
  tier: string;
  age: string;
  sex: string;
  menstrualStatus?: string;
  topSymptoms: string[];
  medications: string;
  promptedBy: string;
  previousResults: string;
  primaryGoal: string;
}

export interface InterpretationDraft {
  draft: string;
  model: string;
  tokensUsed: number;
}

export async function generateInterpretationDraft(
  questionnaire: QuestionnaireAnswers,
  resultsText: string
): Promise<InterpretationDraft> {
  const patientContext = `
PATIENT CONTEXT:
- Age: ${questionnaire.age || "not provided"}
- Sex: ${questionnaire.sex || "not provided"}
${questionnaire.menstrualStatus ? `- Menstrual status: ${questionnaire.menstrualStatus}` : ""}
- Top symptoms to address: ${questionnaire.topSymptoms.join(", ") || "not specified"}
- Current medications/supplements: ${questionnaire.medications || "none specified"}
- Reason for booking: ${questionnaire.promptedBy || "not specified"}
- Previous test history: ${questionnaire.previousResults || "not specified"}
- What the patient is hoping to understand: ${questionnaire.primaryGoal || "not specified"}

BLOOD TEST RESULTS:
${resultsText}
`.trim();

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Please draft a blood test interpretation report for Dr Tosin's review based on the following patient context and results.\n\n${patientContext}` },
    ],
    temperature: 0.4,
    max_tokens: 1800,
  });

  const draft = completion.choices[0]?.message?.content || "";
  const tokensUsed = completion.usage?.total_tokens || 0;

  return { draft, model: completion.model, tokensUsed };
}
