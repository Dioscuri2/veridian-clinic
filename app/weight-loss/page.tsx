"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TurnstileWidget from "@/components/TurnstileWidget";
import { FONTS, CSS } from "@/components/globalStyles";
import { bookUrl } from "@/data/panels";

// ── Types ──────────────────────────────────────────────────────────────────

type Outcome = "glp1" | "orlistat" | "discovery" | "low";

type QuizState =
  | { screen: "start" }
  | { screen: "question"; step: number }
  | { screen: "stop"; reason: StopReason }
  | { screen: "result"; bmi: number; adjusted: boolean; outcome: Outcome };

type StopReason =
  | "age"
  | "pregnancy"
  | "thyroid"
  | "pancreatitis"
  | "type1"
  | "cancer"
  | "allergy"
  | "eating-disorder";

type Answers = Record<string, string | string[]>;

// ── Hard-stop messages ─────────────────────────────────────────────────────

const STOP_CONTENT: Record<StopReason, { title: string; body: string; extra?: string; cta: string; ctaHref: string }> = {
  age: {
    title: "This service is for adults aged 18 and over.",
    body: "Weight loss injections are not licensed for use under 18. Please speak to your GP about age-appropriate weight management support.",
    cta: "Return to home",
    ctaHref: "/",
  },
  pregnancy: {
    title: "Weight loss injections are not safe during pregnancy or breastfeeding.",
    body: "Tirzepatide and semaglutide must not be used if you are pregnant, breastfeeding, or planning to conceive. Please speak to your GP or midwife about safe weight management options.",
    cta: "Book a GP discovery call instead",
    ctaHref: bookUrl("discovery"),
  },
  thyroid: {
    title: "We are unable to prescribe this medicine for you.",
    body: "A personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia type 2 (MEN2) is an absolute contraindication for tirzepatide and semaglutide. Please speak to your GP or endocrinologist.",
    cta: "Return to home",
    ctaHref: "/",
  },
  pancreatitis: {
    title: "We need to assess your pancreatic history further.",
    body: "A history of acute or chronic pancreatitis is a contraindication for GLP-1 medicines. This does not mean treatment is impossible, but it requires a careful clinical assessment before any prescription.",
    cta: "Book a GP discovery call to discuss",
    ctaHref: bookUrl("discovery"),
  },
  type1: {
    title: "These medicines are not prescribed for type 1 diabetes.",
    body: "Tirzepatide and semaglutide are not licensed for weight loss in type 1 diabetes, and a previous episode of diabetic ketoacidosis makes them unsafe to start outside specialist care. Your diabetes team is the right place to raise weight management, and they can look at options that work safely alongside your insulin.",
    cta: "Return to home",
    ctaHref: "/",
  },
  cancer: {
    title: "This is not the right time to start a weight loss medicine.",
    body: "While you are having active treatment for a cancer, these medicines are not something we can safely start. They change appetite and weight, and your oncology team needs to see those signals clearly. Please raise weight management with the team looking after you. You are very welcome to come back to us once your treatment is complete and your team is happy for you to.",
    cta: "Return to home",
    ctaHref: "/",
  },
  allergy: {
    title: "A previous serious reaction rules out this class of medicine.",
    body: "A serious allergic reaction to a weight loss injection means neither tirzepatide nor semaglutide can be prescribed for you safely, because the risk of a further reaction is real. Please speak to your GP, who can consider non-injectable options and whether an allergy clinic review would help.",
    cta: "Return to home",
    ctaHref: "/",
  },
  "eating-disorder": {
    title: "Weight loss medication is not the right support here.",
    body: "Weight loss medicines are not safe or appropriate alongside an eating disorder, current or past, because they work by suppressing appetite and that can make things considerably worse. This is not a judgement and it is not the end of the road. Support exists, and it does help.",
    extra: "Beat runs a free confidential helpline on 0808 801 0677, and there is support online at beateatingdisorders.org.uk. Your GP can also refer you to specialist services, and that is a conversation worth having.",
    cta: "Book a GP discovery call to talk it through",
    ctaHref: bookUrl("discovery"),
  },
};

// ── Questions ──────────────────────────────────────────────────────────────

type Question = {
  id: string;
  label: string;
  helper?: string;
  type: "choice" | "number-pair" | "multi" | "text-pair" | "choice-pair";
  options?: { label: string; value: string; stop?: StopReason }[];
  fields?: { id: string; label: string; placeholder: string; unit: string; min: number; max: number }[];
  groups?: { id: string; label: string; note?: string; options: { label: string; value: string }[] }[];
  showIf?: (a: Answers) => boolean;
};

/*
 * DELIBERATE OMISSION, DO NOT "FIX" THIS.
 * There is no question anywhere in this quiz about suicidal ideation, self-harm
 * or mental health crisis, and none should be added. Current suicidal ideation is
 * a hard stop in the clinical triage skill, but it belongs in the consultation,
 * not on a web form. Nobody monitors this page in real time, so a disclosure made
 * here at 11pm would sit unread until morning, which is a safeguarding failure
 * rather than a safety net. The crisis signposting shown beside the quiz, and the
 * consultation itself, carry that duty of care instead.
 */

const QUESTIONS: Question[] = [
  {
    id: "age",
    label: "How old are you?",
    helper: "This is a private service for adults. Age also affects how we assess suitability.",
    type: "choice",
    options: [
      { label: "Under 18", value: "under-18", stop: "age" },
      { label: "18 to 24", value: "18-24" },
      { label: "25 to 39", value: "25-39" },
      { label: "40 to 54", value: "40-54" },
      { label: "55 to 74", value: "55-74" },
      { label: "75 or over", value: "75-plus" },
    ],
  },
  {
    id: "sex_ethnicity",
    label: "A little about you.",
    helper: "Both answers change how we read your BMI, so please answer as accurately as you can.",
    type: "choice-pair",
    groups: [
      {
        id: "sex",
        label: "Biological sex",
        options: [
          { label: "Female", value: "female" },
          { label: "Male", value: "male" },
          { label: "Prefer not to say", value: "unstated" },
        ],
      },
      {
        id: "ethnicity",
        label: "Ethnic background",
        note: "We ask this because it lets us apply the right BMI threshold for you. Health risk rises at a lower BMI in some backgrounds, so the standard figure would otherwise exclude people who are genuinely eligible.",
        options: [
          { label: "South Asian, including Indian, Pakistani, Bangladeshi and Sri Lankan", value: "south-asian" },
          { label: "Chinese", value: "chinese" },
          { label: "Other Asian", value: "other-asian" },
          { label: "Middle Eastern or North African", value: "middle-eastern" },
          { label: "Black African", value: "black-african" },
          { label: "African-Caribbean", value: "african-caribbean" },
          { label: "White", value: "white" },
          { label: "Other", value: "other" },
          { label: "Prefer not to say", value: "unstated" },
        ],
      },
    ],
  },
  {
    id: "height_weight",
    label: "What is your current height and weight?",
    helper: "We use this to calculate your BMI. Both are required. Your figures are verified again at the consultation.",
    type: "number-pair",
    fields: [
      { id: "height", label: "Height", placeholder: "e.g. 170", unit: "cm", min: 100, max: 250 },
      { id: "weight", label: "Weight", placeholder: "e.g. 95", unit: "kg", min: 30, max: 350 },
    ],
  },
  {
    id: "conditions",
    label: "Do you have any of these weight-related conditions? Select all that apply.",
    helper: "Below a BMI of 30, the licence requires at least one weight-related condition, so this answer matters.",
    type: "multi",
    options: [
      { label: "High blood pressure, treated or untreated", value: "hypertension" },
      { label: "High cholesterol or abnormal lipids", value: "dyslipidaemia" },
      { label: "Obstructive sleep apnoea, including CPAP use", value: "sleep-apnoea" },
      { label: "Type 2 diabetes", value: "type2-diabetes" },
      { label: "Prediabetes or borderline blood sugar", value: "prediabetes" },
      { label: "Heart disease, prior heart attack, or stroke", value: "cardiovascular" },
      { label: "Joint pain affecting your mobility", value: "joint-pain" },
      { label: "Fatty liver", value: "fatty-liver" },
      { label: "Polycystic ovary syndrome (PCOS)", value: "pcos" },
      { label: "None of these", value: "none" },
    ],
  },
  {
    id: "pregnancy",
    label: "Are you currently pregnant, breastfeeding, or actively trying to conceive?",
    helper: "Weight loss injections are not safe to use during pregnancy or breastfeeding.",
    type: "choice",
    showIf: a => a["sex"] === "female",
    options: [
      { label: "None of these apply", value: "no" },
      { label: "I am pregnant", value: "pregnant", stop: "pregnancy" },
      { label: "I am breastfeeding", value: "breastfeeding", stop: "pregnancy" },
      { label: "I am actively trying to conceive", value: "ttc", stop: "pregnancy" },
    ],
  },
  {
    id: "safety",
    label: "Do any of these apply to you? Select all that apply.",
    helper: "Each of these affects whether a weight loss injection can be prescribed safely. If none apply, say so and carry on.",
    type: "multi",
    options: [
      { label: "Type 1 diabetes, or a past episode of diabetic ketoacidosis", value: "type1", stop: "type1" },
      { label: "Personal or family history of medullary thyroid cancer, or MEN 2", value: "mtc", stop: "thyroid" },
      { label: "Past or present pancreatitis", value: "pancreatitis", stop: "pancreatitis" },
      { label: "A cancer currently under active treatment", value: "cancer", stop: "cancer" },
      { label: "A previous serious allergic reaction to a weight loss injection", value: "allergy", stop: "allergy" },
      { label: "A current or past eating disorder", value: "eating-disorder", stop: "eating-disorder" },
      { label: "None of these apply", value: "none" },
    ],
  },
  {
    id: "goal",
    label: "What is your main goal?",
    helper: "This helps us understand what matters most to you.",
    type: "choice",
    options: [
      { label: "Lose a significant amount of weight", value: "weight-loss" },
      { label: "Improve a health condition such as diabetes, blood pressure, or cholesterol", value: "health" },
      { label: "Reduce joint pain or improve mobility", value: "mobility" },
      { label: "Improve energy and general wellbeing", value: "energy" },
      { label: "I have struggled with weight for years and nothing else has worked", value: "long-term" },
    ],
  },
  {
    id: "contact",
    label: "Last step, where should we send your results?",
    helper: "We will send a copy of your triage summary and a link to book your consultation.",
    type: "text-pair",
    fields: [
      { id: "name", label: "Full name", placeholder: "Your full name", unit: "", min: 0, max: 999 },
      { id: "email", label: "Email address", placeholder: "you@email.com", unit: "", min: 0, max: 999 },
    ],
  },
];

// ── BMI helpers ────────────────────────────────────────────────────────────

// NICE practice lowers the BMI thresholds by 2.5 for these backgrounds, because
// cardiometabolic risk rises at a lower BMI. Adding 2.5 to the measured BMI and
// comparing against the standard thresholds is the same calculation.
const LOWER_THRESHOLD_ETHNICITIES = ["south-asian", "chinese", "other-asian", "middle-eastern", "black-african", "african-caribbean"];

const OUTCOME_SUMMARY: Record<Outcome, string> = {
  glp1: "passes triage for a GLP-1, licence threshold met",
  orlistat: "below the GLP-1 licence threshold, oral orlistat route to discuss",
  discovery: "below every weight loss medicine threshold, Discovery Core offered",
  low: "BMI in the healthy range, not appropriate, Discovery Core offered",
};

function calcBmi(a: Answers): number {
  const h = Number(a["height"] || 0);
  const w = Number(a["weight"] || 0);
  if (!h || !w) return 0;
  return w / ((h / 100) * (h / 100));
}

function usesAdjustedThreshold(a: Answers): boolean {
  return LOWER_THRESHOLD_ETHNICITIES.includes(String(a["ethnicity"] || ""));
}

function effectiveBmi(bmi: number, adjusted: boolean): number {
  return adjusted ? bmi + 2.5 : bmi;
}

function hasWeightCondition(a: Answers): boolean {
  const c = (a["conditions"] as string[] | undefined) ?? [];
  return c.some(v => v !== "none");
}

function triageOutcome(bmi: number, adjusted: boolean, a: Answers): Outcome {
  const eff = effectiveBmi(bmi, adjusted);
  if (eff >= 30) return "glp1";
  if (eff >= 27 && hasWeightCondition(a)) return "glp1";
  if (eff >= 28) return "orlistat";
  if (eff >= 25) return "discovery";
  return "low";
}

function bmiLabel(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy weight";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obese class I";
  if (bmi < 40) return "Obese class II";
  return "Obese class III";
}

function visibleQuestions(a: Answers): Question[] {
  return QUESTIONS.filter(q => !q.showIf || q.showIf(a));
}

function canAdvance(q: Question | undefined, a: Answers): boolean {
  if (!q) return false;
  if (q.type === "choice") return !!a[q.id];
  if (q.type === "multi") return Array.isArray(a[q.id]) && (a[q.id] as string[]).length > 0;
  if (q.type === "choice-pair") return q.groups!.every(g => !!a[g.id]);
  if (q.type === "number-pair") {
    return q.fields!.every(f => {
      const v = Number(a[f.id] || 0);
      return v >= f.min && v <= f.max;
    });
  }
  if (q.type === "text-pair") {
    const name = String(a["name"] || "").trim();
    const email = String(a["email"] || "").trim();
    return name.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  return false;
}

function getStop(q: Question | undefined, a: Answers): StopReason | null {
  if (!q) return null;
  if (q.type === "choice") {
    const opt = q.options?.find(o => o.value === (a[q.id] as string));
    return opt?.stop ?? null;
  }
  if (q.type === "multi") {
    const picked = (a[q.id] as string[] | undefined) ?? [];
    const hit = q.options?.find(o => o.stop && picked.includes(o.value));
    return hit?.stop ?? null;
  }
  return null;
}

// ── FAQ data ───────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What injections do you prescribe?",
    a: "Dr Tosin assesses patients for tirzepatide (Mounjaro) and semaglutide (Wegovy), the two licensed injectable weight management medicines in the UK. The choice depends on your medical history, diabetes status, and individual factors assessed during your consultation.",
  },
  {
    q: "Do I need a high BMI to be considered?",
    a: "Yes. Weight loss injections are licensed in the UK from a BMI of 30, or from 27 where you also have a weight-related condition such as high blood pressure, high cholesterol, sleep apnoea, prediabetes or type 2 diabetes. For some ethnic backgrounds, including South Asian, Chinese, other Asian, Middle Eastern, Black African and African-Caribbean, NICE practice lowers those thresholds by 2.5. Below the licensed threshold we will say so rather than take a consultation fee.",
  },
  {
    q: "Will I need a prescription after the consultation?",
    a: "Not automatically. Dr Tosin will assess whether a prescription is clinically appropriate for you during the consultation. If it is, you will receive a private prescription and guidance on obtaining the medicine from a registered UK pharmacy.",
  },
  {
    q: "Is this covered by the NHS?",
    a: "This is a private service. NHS prescribing of tirzepatide is being phased in through specialist weight management services. If you want to explore NHS routes, your GP is the correct starting point.",
  },
  {
    q: "What happens after the consultation?",
    a: "If a prescription is issued, Dr Tosin will explain how to start the medicine, the dose escalation schedule, what side effects to expect, and when to return for review. Ongoing monitoring appointments are available.",
  },
  {
    q: "Can I use this service if I have type 2 diabetes?",
    a: "Yes. Type 2 diabetes is one of the main qualifying conditions for tirzepatide and semaglutide. Dr Tosin will assess any interaction with your current diabetes medicines, particularly insulin or sulfonylureas.",
  },
];

// ── Quiz component ─────────────────────────────────────────────────────────

function WlQuiz() {
  const [state, setState] = useState<QuizState>({ screen: "start" });
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const quizRef = useRef<HTMLDivElement>(null);

  function scrollToQuiz() {
    quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function start() {
    setState({ screen: "question", step: 0 });
    setTimeout(scrollToQuiz, 100);
  }

  function setAnswer(key: string, val: string | string[]) {
    setAnswers(prev => ({ ...prev, [key]: val }));
  }

  function toggleMulti(key: string, val: string) {
    const cur = (answers[key] as string[] | undefined) ?? [];
    if (val === "none") {
      setAnswer(key, ["none"]);
      return;
    }
    const without = cur.filter(v => v !== "none");
    const next = without.includes(val) ? without.filter(v => v !== val) : [...without, val];
    setAnswer(key, next.length ? next : []);
  }

  async function advance(step: number) {
    const qs = visibleQuestions(answers);
    const q = qs[step];
    const stop = getStop(q, answers);
    if (stop) { setState({ screen: "stop", reason: stop }); scrollToQuiz(); return; }

    const next = step + 1;
    if (next < qs.length) {
      setState({ screen: "question", step: next });
    } else {
      // Final step, submit lead + show result
      setSubmitting(true);
      const bmi = calcBmi(answers);
      const adjusted = usesAdjustedThreshold(answers);
      const outcome = triageOutcome(bmi, adjusted, answers);

      // Set quiz cookie for quiz-rate unlock, on the paths where we offer the
      // weight loss consultation at all.
      if (outcome === "glp1" || outcome === "orlistat") {
        document.cookie = "wl_quiz=1; path=/; max-age=86400";
      }

      // Honeypot check, bots fill hidden fields, humans don't
      if (answers["_hp"] && String(answers["_hp"]).trim().length > 0) {
        setSubmitting(false);
        return; // silent drop
      }

      const conditions = ((answers["conditions"] as string[]) ?? []).join(", ") || "not answered";

      // Send lead to book-enquiry API
      try {
        await fetch("/api/book-enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: String(answers["name"] || ""),
            email: String(answers["email"] || ""),
            phone: "",
            tier: "weight-loss-quiz",
            turnstileToken,
            message:
              `Triage outcome: ${OUTCOME_SUMMARY[outcome]}` +
              ` | Stated BMI: ${bmi.toFixed(1)}` +
              ` | Threshold-adjusted BMI: ${effectiveBmi(bmi, adjusted).toFixed(1)}` +
              ` | Ethnicity adjustment applied: ${adjusted ? "yes, 2.5 added per NICE practice" : "no"}` +
              ` | Ethnicity: ${answers["ethnicity"]}` +
              ` | Age band: ${answers["age"]}` +
              ` | Sex: ${answers["sex"]}` +
              ` | Weight-related conditions: ${conditions}` +
              ` | Goal: ${answers["goal"]}` +
              ` | Height and weight are self-reported and must be verified at consultation.`,
          }),
        });
      } catch { /* silent */ }

      setSubmitting(false);
      setState({ screen: "result", bmi, adjusted, outcome });
    }
    scrollToQuiz();
  }

  function renderQuestion(step: number) {
    const qs = visibleQuestions(answers);
    const q = qs[step];
    if (!q) return null;
    const progress = Math.round(((step + 1) / qs.length) * 100);
    const ready = canAdvance(q, answers);

    return (
      <div>
        {/* Progress */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: ".72rem", color: "var(--sl3)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
              Step {step + 1} of {qs.length}
            </span>
            <span style={{ fontSize: ".72rem", color: "var(--go)", fontWeight: 700 }}>{progress}%</span>
          </div>
          <div style={{ height: 4, background: "var(--iv2)", borderRadius: 2 }}>
            <div style={{ height: 4, background: "var(--go)", borderRadius: 2, width: `${progress}%`, transition: "width .4s ease" }} />
          </div>
        </div>

        {/* Label */}
        <h3 className="cg" style={{ fontSize: "clamp(1.1rem,2.2vw,1.4rem)", fontWeight: 600, color: "var(--fo)", lineHeight: 1.35, marginBottom: 8 }}>
          {q.label}
        </h3>
        {q.helper && <p style={{ fontSize: ".83rem", color: "var(--sl2)", lineHeight: 1.7, marginBottom: 22 }}>{q.helper}</p>}

        {/* Choice */}
        {q.type === "choice" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options!.map(opt => {
              const sel = answers[q.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setAnswer(q.id, opt.value);
                    if (opt.stop) {
                      setState({ screen: "stop", reason: opt.stop });
                      scrollToQuiz();
                    }
                  }}
                  style={{
                    textAlign: "left", padding: "14px 18px", border: `1.5px solid ${sel ? "var(--fo)" : "rgba(0,0,0,.1)"}`,
                    background: sel ? "var(--fo)" : "#fff", color: sel ? "var(--iv)" : "var(--sl)",
                    cursor: "pointer", borderRadius: 0, fontSize: ".88rem", lineHeight: 1.5, transition: "all .15s",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Choice pair, two grouped single-select fields on one screen */}
        {q.type === "choice-pair" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {q.groups!.map(g => (
              <div key={g.id}>
                <p style={{ fontSize: ".76rem", fontWeight: 700, color: "var(--sl2)", marginBottom: 6, letterSpacing: ".06em", textTransform: "uppercase" }}>{g.label}</p>
                {g.note && <p style={{ fontSize: ".8rem", color: "var(--sl2)", lineHeight: 1.7, marginBottom: 12 }}>{g.note}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {g.options.map(opt => {
                    const sel = answers[g.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setAnswer(g.id, opt.value)}
                        style={{
                          textAlign: "left", padding: "12px 16px", border: `1.5px solid ${sel ? "var(--fo)" : "rgba(0,0,0,.1)"}`,
                          background: sel ? "var(--fo)" : "#fff", color: sel ? "var(--iv)" : "var(--sl)",
                          cursor: "pointer", borderRadius: 0, fontSize: ".85rem", lineHeight: 1.5, transition: "all .15s",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Multi-select */}
        {q.type === "multi" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options!.map(opt => {
              const sel = ((answers[q.id] as string[]) ?? []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleMulti(q.id, opt.value)}
                  style={{
                    textAlign: "left", padding: "14px 18px", border: `1.5px solid ${sel ? "var(--fo)" : "rgba(0,0,0,.1)"}`,
                    background: sel ? "var(--fo)" : "#fff", color: sel ? "var(--iv)" : "var(--sl)",
                    cursor: "pointer", borderRadius: 0, fontSize: ".88rem", lineHeight: 1.5, display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span style={{ width: 16, height: 16, border: `1.5px solid ${sel ? "var(--iv)" : "var(--sl3)"}`, borderRadius: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: ".6rem", color: sel ? "var(--iv)" : "transparent" }}>✓</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Number pair */}
        {q.type === "number-pair" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {q.fields!.map(f => (
              <div key={f.id}>
                <label style={{ display: "block", fontSize: ".76rem", fontWeight: 700, color: "var(--sl2)", marginBottom: 6, letterSpacing: ".06em", textTransform: "uppercase" }}>{f.label}</label>
                <div style={{ display: "flex", alignItems: "center", border: "1.5px solid rgba(0,0,0,.12)", background: "#fff" }}>
                  <input
                    type="number"
                    placeholder={f.placeholder}
                    min={f.min}
                    max={f.max}
                    value={answers[f.id] ?? ""}
                    onChange={e => setAnswer(f.id, e.target.value)}
                    style={{ flex: 1, padding: "12px 14px", border: "none", outline: "none", fontSize: ".92rem", color: "var(--fo)", background: "transparent" }}
                  />
                  <span style={{ padding: "0 14px", fontSize: ".8rem", color: "var(--sl3)", fontWeight: 600 }}>{f.unit}</span>
                </div>
                {/* Live BMI preview */}
                {f.id === "weight" && calcBmi(answers) > 0 && (
                  <p style={{ marginTop: 8, fontSize: ".78rem", color: "var(--go)", fontWeight: 700 }}>
                    BMI: {calcBmi(answers).toFixed(1)}, {bmiLabel(calcBmi(answers))}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Text pair */}
        {q.type === "text-pair" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Honeypot, hidden from humans, bots fill it */}
            <div style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
              <input tabIndex={-1} type="text" name="_hp" autoComplete="off" value={String(answers["_hp"] ?? "")} onChange={e => setAnswer("_hp", e.target.value)} />
            </div>
            {q.fields!.map(f => (
              <div key={f.id}>
                <label style={{ display: "block", fontSize: ".76rem", fontWeight: 700, color: "var(--sl2)", marginBottom: 6, letterSpacing: ".06em", textTransform: "uppercase" }}>{f.label}</label>
                <input
                  type={f.id === "email" ? "email" : "text"}
                  placeholder={f.placeholder}
                  value={String(answers[f.id] ?? "")}
                  onChange={e => setAnswer(f.id, e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", border: "1.5px solid rgba(0,0,0,.12)", outline: "none", fontSize: ".92rem", color: "var(--fo)", background: "#fff", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <TurnstileWidget onVerify={token => setTurnstileToken(token)} theme="light" />
          </div>
        )}

        {/* Advance */}
        {q.type !== "choice" && (
          <button
            type="button"
            onClick={() => advance(step)}
            disabled={!ready || submitting}
            className="btn btn-fo"
            style={{ marginTop: 24, width: "100%", opacity: ready ? 1 : .45 }}
          >
            {submitting ? "Processing…" : step === qs.length - 1 ? "See my results" : "Continue"}
          </button>
        )}
        {q.type === "choice" && answers[q.id] && !getStop(q, answers) && (
          <button
            type="button"
            onClick={() => advance(step)}
            className="btn btn-fo"
            style={{ marginTop: 18, width: "100%" }}
          >
            Continue
          </button>
        )}
      </div>
    );
  }

  // ── Screens ──────────────────────────────────────────────────────────────

  if (state.screen === "start") {
    return (
      <div style={{ textAlign: "center" }}>
        <p className="lbl">Free eligibility check</p>
        <div className="rule rule-c" />
        <h2 className="cg" style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", fontWeight: 600, color: "var(--fo)", lineHeight: 1.25, marginBottom: 14 }}>
          Find out if a weight loss injection is right for you
        </h2>
        <p style={{ fontSize: ".92rem", color: "var(--sl2)", lineHeight: 1.85, maxWidth: 540, margin: "0 auto 28px" }}>
          Up to 8 questions. Takes about 3 minutes. No commitment required. It checks whether anything rules you out before you spend anything, and it is a triage check rather than an eligibility decision.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 28 }}>
          {["No account needed", "Clinically designed", "Private and confidential"].map(t => (
            <span key={t} style={{ fontSize: ".74rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--go2)", background: "var(--fo)", padding: "5px 12px" }}>{t}</span>
          ))}
        </div>
        <button type="button" onClick={start} className="btn btn-fo" style={{ minWidth: 220 }}>
          Start eligibility check
        </button>
      </div>
    );
  }

  if (state.screen === "stop") {
    const c = STOP_CONTENT[state.reason];
    return (
      <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
        <div style={{ width: 56, height: 56, background: "rgba(200,168,75,.12)", border: "1.5px solid var(--go)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 7v5M11 14.5v.5" stroke="var(--go)" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="11" r="9" stroke="var(--go)" strokeWidth="1.5"/></svg>
        </div>
        <h3 className="cg" style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--fo)", marginBottom: 14, lineHeight: 1.35 }}>{c.title}</h3>
        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: c.extra ? 16 : 28 }}>{c.body}</p>
        {c.extra && (
          <div style={{ padding: "16px 20px", background: "var(--iv2)", borderLeft: "3px solid var(--go)", textAlign: "left", marginBottom: 28 }}>
            <p style={{ fontSize: ".85rem", color: "var(--sl2)", lineHeight: 1.85 }}>{c.extra}</p>
          </div>
        )}
        <Link href={c.ctaHref} className="btn btn-fo">{c.cta}</Link>
        <button type="button" onClick={() => { setState({ screen: "start" }); setAnswers({}); }} style={{ display: "block", margin: "14px auto 0", fontSize: ".8rem", color: "var(--sl3)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
          Start again
        </button>
      </div>
    );
  }

  if (state.screen === "result") {
    const { bmi, adjusted, outcome } = state;

    const adjustmentNote = adjusted ? (
      <p style={{ fontSize: ".78rem", color: "var(--sl2)", lineHeight: 1.75, marginBottom: 20, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
        We have applied the lower BMI threshold that NICE recommends for your ethnic background, which is 2.5 points below the standard figure. Your BMI has been assessed as {effectiveBmi(bmi, adjusted).toFixed(1)} against the standard thresholds.
      </p>
    ) : null;

    // Not licensed at this BMI. We do not sell the weight loss consultation here.
    if (outcome === "discovery" || outcome === "low") {
      const isLow = outcome === "low";
      return (
        <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
          <p className="lbl">Your result</p>
          <div className="rule rule-c" />
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--fo)", lineHeight: 1 }}>{bmi.toFixed(1)}</div>
          <p style={{ fontSize: ".76rem", color: "var(--sl3)", marginBottom: 20 }}>Your BMI, {bmiLabel(bmi)}</p>
          {adjustmentNote}
          <h3 className="cg" style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--fo)", lineHeight: 1.3, marginBottom: 14 }}>
            {isLow
              ? "A weight loss injection would not be appropriate for you."
              : "Weight loss injections are not licensed at this BMI."}
          </h3>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 16 }}>
            {isLow
              ? "Your BMI sits in the healthy range, and these medicines are neither licensed nor safe to use at a healthy weight. We would rather tell you that now than take a consultation fee for a prescription that could not follow."
              : "GLP-1 injections are licensed from a BMI of 30, or from 27 where there is a weight-related health condition. Your figures do not meet either threshold, so we are not going to sell you a weight loss consultation that could not end in a prescription."}
          </p>
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 24 }}>
            {isLow
              ? "If your weight, your energy or your appetite still does not feel right, that is worth taking seriously. Discovery Core is a GP consultation that starts from the metabolic picture rather than the scales, and it can point to what is actually going on."
              : "A metabolic assessment is the more useful next step. Looking at insulin, thyroid, hormones and inflammation gives Dr Tosin a far more precise picture of what is driving weight resistance for you, and what will actually shift it."}
          </p>
          <Link href={bookUrl("discovery")} className="btn btn-fo" style={{ display: "inline-block", marginBottom: 12 }}>Book a GP Discovery Core, £127</Link>
          <br />
          <Link href="/assessments" style={{ fontSize: ".82rem", color: "var(--sl2)", textDecoration: "underline" }}>View metabolic blood panels instead</Link>
          <p style={{ fontSize: ".74rem", color: "var(--sl3)", marginTop: 20, lineHeight: 1.7 }}>
            This is a triage check based on the figures you entered, not a clinical decision.
          </p>
        </div>
      );
    }

    // Nothing rules the patient out. Triage passed, eligibility is NOT decided here.
    const isOrlistat = outcome === "orlistat";
    return (
      <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto" }}>
        <div style={{ width: 60, height: 60, background: "rgba(200,168,75,.12)", border: "1.5px solid var(--go)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M6 13.5l4.5 4.5L20 9" stroke="var(--go)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <p className="lbl" style={{ color: "var(--go)" }}>Nothing in your answers rules you out</p>
        <div className="rule rule-c" style={{ background: "var(--go)" }} />
        <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--fo)", lineHeight: 1 }}>{bmi.toFixed(1)}</div>
        <p style={{ fontSize: ".76rem", color: "var(--sl3)", marginBottom: 20 }}>Your BMI, {bmiLabel(bmi)}</p>
        {adjustmentNote}
        <h3 className="cg" style={{ fontSize: "clamp(1.1rem,2.2vw,1.4rem)", fontWeight: 600, color: "var(--fo)", lineHeight: 1.3, marginBottom: 14 }}>
          {isOrlistat
            ? "Weight loss injections are not licensed at your BMI, but there may still be an option worth discussing."
            : "Nothing you have told us rules out a GLP-1 weight loss medicine."}
        </h3>
        {isOrlistat && (
          <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 16 }}>
            Tirzepatide and semaglutide are licensed from a BMI of 30, or from 27 where there is a weight-related condition, so neither is licensed for you at this BMI. Orlistat, a licensed oral treatment, is licensed from a BMI of 28 where risk factors are present. A consultation can explore honestly whether an oral option is appropriate for you, and it may conclude that it is not.
          </p>
        )}
        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 16 }}>
          This is a triage check, not an eligibility decision, and it cannot be one. Final eligibility is confirmed at the consultation, where your height and weight are verified independently of the figures you typed here and Dr Tosin takes your full medical history. That verification is a GPhC 2025 requirement, not a formality, and it means a prescription is never guaranteed.
        </p>
        <p style={{ fontSize: ".88rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 28 }}>
          The next step is a 15-minute private consultation with Dr Tosin. As you have completed the triage check, your consultation is at the reduced rate.
        </p>
        <div className="card" style={{ textAlign: "left", marginBottom: 24 }}>
          <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--go)", marginBottom: 12 }}>Your quiz rate consultation includes</p>
          {[
            "Full medical history and safety review",
            "Independent verification of your height and weight",
            isOrlistat ? "Review of oral options, including whether orlistat is appropriate" : "Medicine selection: Mounjaro or Wegovy based on your profile",
            "Dose titration plan and what to expect",
            "Side effect management and monitoring schedule",
            "Private prescription if clinically appropriate",
            "Written post-consultation summary",
          ].map(item => (
            <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "5px 0", borderBottom: "1px solid rgba(0,0,0,.05)" }}>
              <span style={{ color: "var(--go)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
              <span style={{ fontSize: ".84rem", color: "var(--sl2)", lineHeight: 1.65 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "18px 22px", background: "var(--fo)", marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: ".7rem", color: "rgba(246,241,232,.55)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 2 }}>Quiz rate</p>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "var(--iv)", lineHeight: 1 }}>£48 <span style={{ fontSize: ".9rem", fontWeight: 400, color: "rgba(246,241,232,.5)" }}>was £60</span></p>
            </div>
            <p style={{ fontSize: ".78rem", color: "rgba(246,241,232,.6)", lineHeight: 1.6, maxWidth: 200 }}>15-minute virtual consultation. Private prescription pathway if appropriate.</p>
          </div>
        </div>
        <Link href="/weight-loss/consultation?quiz=1" className="btn btn-go" style={{ display: "block", textAlign: "center", width: "100%", boxSizing: "border-box" }}>
          Book my Weight Loss Consultation £48
        </Link>
        <p style={{ fontSize: ".74rem", color: "var(--sl3)", marginTop: 10, lineHeight: 1.6 }}>
          Enter code WLQUIZRATE at the payment step for your £48 rate. Secure payment via ThanksDoc. A confirmation email is sent immediately after booking.
        </p>
      </div>
    );
  }

  if (state.screen === "question") {
    return renderQuestion(state.step);
  }

  return null;
}

// ── FAQ accordion ──────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,.07)" }}>
      <button type="button" onClick={() => setOpen(o => !o)} style={{ width: "100%", textAlign: "left", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", gap: 12 }}>
        <span style={{ fontSize: ".92rem", fontWeight: 600, color: "var(--fo)", lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: "1.2rem", color: "var(--fo)", fontWeight: 300, flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform .2s", display: "inline-block" }}>+</span>
      </button>
      {open && <p style={{ fontSize: ".86rem", color: "var(--sl2)", lineHeight: 1.85, paddingBottom: 16 }}>{a}</p>}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function WeightLossPage() {
  const quizSectionRef = useRef<HTMLElement>(null);

  return (
    <>
      <style>{FONTS + CSS}</style>
      <Navigation />
      <main style={{ paddingTop: "var(--nav-h)" }}>

        {/* ── Hero ── */}
        <section className="sec bg-fo" style={{ paddingTop: 64, paddingBottom: 72 }}>
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div style={{ maxWidth: 680 }}>
              <p className="lbl">Private weight loss · GP-led</p>
              <div className="rule" />
              <h1 className="cg" style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 500, color: "var(--iv)", lineHeight: 1.15, marginBottom: 20 }}>
                Weight loss injections,<br />
                <em style={{ fontStyle: "italic", color: "var(--go)" }}>prescribed by a GP.</em>
              </h1>
              <p style={{ fontSize: "1rem", color: "rgba(246,241,232,.7)", lineHeight: 1.9, maxWidth: 560, marginBottom: 32 }}>
                Tirzepatide (Mounjaro) and semaglutide (Wegovy) are licensed weight management medicines in the UK. Dr Tosin Taiwo, a practising UK GP, assesses suitability, selects the right medicine, and supports you through treatment. Complete the free eligibility check to get started.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => quizSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="btn btn-go"
                >
                  Check my eligibility free
                </button>
                <Link href="/weight-loss/consultation" className="btn btn-ol">
                  Book consultation £60
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── What we offer ── */}
        <section className="sec bg-iv2">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div className="sh text-center">
              <p className="lbl">Licensed medicines · UK GP prescribed</p>
              <div className="rule rule-c" />
              <h2 className="cg sh-title">Two medicines. One clinical assessment.</h2>
              <p className="sh-body">Dr Tosin will advise on the right medicine for your specific history, goals, and existing medications.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
              {[
                {
                  name: "Mounjaro (tirzepatide)",
                  badge: "Dual mechanism",
                  body: "Tirzepatide activates both GLP-1 and GIP receptors, a dual action that produces greater average weight loss than semaglutide in clinical trials. Licensed in the UK for weight management in adults with a BMI of 30 or over, or 27 with a qualifying condition.",
                  points: ["Up to 22.5% average body weight loss in trials", "Weekly self-injection", "Dose escalation over 20 weeks", "Also licensed for type 2 diabetes management"],
                },
                {
                  name: "Wegovy (semaglutide)",
                  badge: "GLP-1 receptor agonist",
                  body: "Semaglutide mimics the GLP-1 hormone to reduce appetite and slow gastric emptying. A well-established medicine with an extensive evidence base, also available as Ozempic for type 2 diabetes.",
                  points: ["Up to 15% average body weight loss in trials", "Weekly self-injection", "Dose escalation over 16 weeks", "Option if tirzepatide is not suitable"],
                },
              ].map(m => (
                <div key={m.name} className="card">
                  <span style={{ display: "inline-block", fontSize: ".66rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--go2)", background: "var(--fo)", padding: "3px 10px", marginBottom: 14 }}>{m.badge}</span>
                  <h3 className="cg" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--fo)", marginBottom: 10 }}>{m.name}</h3>
                  <p style={{ fontSize: ".85rem", color: "var(--sl2)", lineHeight: 1.85, marginBottom: 14 }}>{m.body}</p>
                  {m.points.map(p => (
                    <div key={p} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: "1px solid rgba(0,0,0,.05)" }}>
                      <span style={{ color: "var(--go)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: ".82rem", color: "var(--sl2)", lineHeight: 1.65 }}>{p}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quiz section ── */}
        <section ref={quizSectionRef} className="sec bg-iv" style={{ scrollMarginTop: "var(--nav-h)" }}>
          <div className="wrap" style={{ maxWidth: 620 }}>
            <div className="card" style={{ padding: "clamp(28px,5vw,48px)" }}>
              <WlQuiz />
            </div>
            {/* Permanent crisis signposting. This stays visible on every screen of the
                quiz. It is here precisely because the form itself asks nothing about
                mental health, and nobody monitors this page in real time. */}
            <p style={{ marginTop: 20, fontSize: ".78rem", color: "var(--sl2)", lineHeight: 1.85, textAlign: "center" }}>
              If you are struggling with your mental health, or having thoughts of harming yourself, please contact your GP or call 111. In an emergency call 999. Samaritans are free to call on 116 123, at any hour of the day or night.
            </p>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="sec bg-iv2">
          <div className="wrap" style={{ maxWidth: 860 }}>
            <div className="sh text-center">
              <p className="lbl">Simple process</p>
              <div className="rule rule-c" />
              <h2 className="cg sh-title">From eligibility check to treatment</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 2 }}>
              {[
                { n: "01", t: "Eligibility check", d: "Complete the free check above, up to 8 short questions. It screens for the main contraindications and calculates your BMI against the licensed thresholds. No commitment required." },
                { n: "02", t: "Book consultation", d: "Book your 15-minute virtual consultation with Dr Tosin. £48 at the quiz rate. He reviews your case and selects the right medicine." },
                { n: "03", t: "Prescription", d: "If appropriate, Dr Tosin issues a private prescription. You collect from any UK pharmacy or use a registered online pharmacy." },
                { n: "04", t: "Ongoing support", d: "Monitoring appointments available as you titrate your dose. Dr Tosin is available for review as your treatment progresses." },
              ].map((step, i) => (
                <div key={step.n} style={{ padding: "clamp(24px,4vw,36px)", background: i === 1 ? "var(--fo)" : "var(--iv)", borderRight: i < 3 ? "1px solid var(--iv2)" : "none" }}>
                  <p style={{ fontSize: ".62rem", fontWeight: 700, letterSpacing: ".28em", color: i === 1 ? "var(--go2)" : "var(--go)", marginBottom: 10 }}>{step.n}</p>
                  <h3 className="cg" style={{ fontSize: "1.1rem", fontWeight: 600, color: i === 1 ? "var(--iv)" : "var(--fo)", marginBottom: 10 }}>{step.t}</h3>
                  <p style={{ fontSize: ".83rem", color: i === 1 ? "rgba(246,241,232,.7)" : "var(--sl2)", lineHeight: 1.8 }}>{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="sec bg-fo" style={{ padding: "32px 0" }}>
          <div className="wrap" style={{ maxWidth: 760 }}>
            <p style={{ fontSize: ".76rem", color: "rgba(246,241,232,.45)", lineHeight: 1.8, textAlign: "center" }}>
              This is a private service. Veridian Clinic does not prescribe based solely on an online questionnaire. All prescriptions are issued following a two-way clinical consultation and independent verification. Not suitable for pregnant or breastfeeding patients. Weight loss medicines are not a substitute for lifestyle intervention. Always inform your registered GP of any new private prescription.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="sec bg-iv">
          <div className="wrap" style={{ maxWidth: 680 }}>
            <div className="sh text-center">
              <p className="lbl">Questions</p>
              <div className="rule rule-c" />
              <h2 className="cg sh-title">Common questions</h2>
            </div>
            <div className="card">
              {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="sec bg-iv2" style={{ padding: "48px 0" }}>
          <div className="wrap" style={{ maxWidth: 620, textAlign: "center" }}>
            <h2 className="cg" style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", fontWeight: 500, color: "var(--fo)", marginBottom: 16 }}>
              Ready to take the next step?
            </h2>
            <p style={{ fontSize: ".9rem", color: "var(--sl2)", lineHeight: 1.8, marginBottom: 28 }}>
              Complete the eligibility check above for a quiz-rate consultation, or book directly at the standard rate.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => quizSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="btn btn-fo"
              >
                Take the eligibility quiz
              </button>
              <Link href="/weight-loss/consultation" className="btn btn-ol">Book at standard rate £60</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
