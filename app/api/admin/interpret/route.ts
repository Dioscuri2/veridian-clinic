import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import { generateInterpretationDraft, QuestionnaireAnswers } from "@/lib/bloodTestInterpret";
import { Redis } from "@upstash/redis";

function r(): Redis {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

export async function POST(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  try {
    const { email, resultsText } = await req.json();

    if (!email || !resultsText) {
      return NextResponse.json({ error: "email and resultsText are required" }, { status: 400 });
    }

    const key = `veridian:questionnaire:${email.toLowerCase().trim()}`;
    const raw = await r().get(key);
    const questionnaire: QuestionnaireAnswers = raw
      ? (typeof raw === "string" ? JSON.parse(raw) : (raw as QuestionnaireAnswers))
      : {
          email,
          tier: "unknown",
          age: "",
          sex: "",
          topSymptoms: [],
          medications: "",
          promptedBy: "",
          previousResults: "",
          primaryGoal: "",
        };

    const result = await generateInterpretationDraft(questionnaire, resultsText);
    return NextResponse.json(result);
  } catch (e) {
    console.error("interpret route error", e);
    return NextResponse.json({ error: "interpretation failed" }, { status: 500 });
  }
}
