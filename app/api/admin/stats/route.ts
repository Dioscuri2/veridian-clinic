import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/adminAuth";
import Stripe from "stripe";
import { readFile } from "node:fs/promises";
import path from "node:path";

interface Lead {
  timestamp: string;
  email: string;
  firstName: string;
  source: string;
  list: string;
  resultBand?: string;
  quizScore?: number;
  metabolicAge?: number;
  destination?: string;
}

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });
  const now = new Date();
  const monthStart = Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000);
  const weekStart = Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000);

  // Fetch Stripe checkout sessions (last 100)
  const sessions = await stripe.checkout.sessions.list({ limit: 100 });

  let allTimeRevenue = 0;
  let monthRevenue = 0;
  let weekRevenue = 0;
  const byTier: Record<string, { count: number; amount: number; name: string }> = {};
  const recentPayments: Array<{
    id: string;
    amount: number;
    tier: string;
    tierName: string;
    customerName: string;
    email: string;
    createdAt: number;
  }> = [];

  const tierLabels: Record<string, string> = {
    guide: "Metabolic Reset Guide",
    discovery: "Discovery Call",
    "discovery-quiz": "Discovery Call (Quiz)",
    "metabolic-screen": "Energy Screen",
    baseline: "Metabolic Baseline",
    "longevity-panel": "Longevity Panel",
    programme: "12-Week Programme",
  };

  for (const s of sessions.data) {
    if (s.payment_status !== "paid") continue;
    const amount = s.amount_total || 0;
    const tier = s.metadata?.tier || "unknown";
    const label = tierLabels[tier] || tier;

    allTimeRevenue += amount;
    if (s.created >= monthStart) monthRevenue += amount;
    if (s.created >= weekStart) weekRevenue += amount;

    if (!byTier[tier]) byTier[tier] = { count: 0, amount: 0, name: label };
    byTier[tier].count++;
    byTier[tier].amount += amount;

    if (recentPayments.length < 15) {
      recentPayments.push({
        id: s.id,
        amount,
        tier,
        tierName: label,
        customerName: s.metadata?.name || s.customer_details?.name || "",
        email: s.customer_email || s.customer_details?.email || "",
        createdAt: s.created,
      });
    }
  }

  // Read local leads NDJSON
  let leads: Lead[] = [];
  try {
    const leadsPath = path.join(process.cwd(), "data", "newsletter-leads.ndjson");
    const raw = await readFile(leadsPath, "utf8");
    leads = raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try { return JSON.parse(line) as Lead; } catch { return null; }
      })
      .filter((l): l is Lead => l !== null);
  } catch {
    // File may not exist in serverless runtime
  }

  const byBand: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  for (const lead of leads) {
    if (lead.resultBand) byBand[lead.resultBand] = (byBand[lead.resultBand] || 0) + 1;
    if (lead.source) bySource[lead.source] = (bySource[lead.source] || 0) + 1;
  }

  // Funnel conversion estimates
  const guideCount = byTier["guide"]?.count || 0;
  const discoveryCount = (byTier["discovery"]?.count || 0) + (byTier["discovery-quiz"]?.count || 0);
  const bloodTestCount =
    (byTier["metabolic-screen"]?.count || 0) +
    (byTier["baseline"]?.count || 0) +
    (byTier["longevity-panel"]?.count || 0);
  const programmeCount = byTier["programme"]?.count || 0;
  const totalPaid = sessions.data.filter((s) => s.payment_status === "paid").length;
  const quizLeads = leads.filter((l) => l.resultBand).length;

  return NextResponse.json({
    revenue: {
      allTime: allTimeRevenue,
      thisMonth: monthRevenue,
      thisWeek: weekRevenue,
      byTier,
    },
    funnel: {
      quizCompletions: quizLeads,
      guidePurchases: guideCount,
      discoveryCalls: discoveryCount,
      bloodTests: bloodTestCount,
      programmes: programmeCount,
      totalPaidConversions: totalPaid,
      quizToGuideRate: quizLeads > 0 ? ((guideCount / quizLeads) * 100).toFixed(1) : "0",
    },
    leads: {
      total: leads.length,
      byBand,
      bySource,
      recent: leads.slice(-10).reverse(),
    },
    recentPayments,
    generatedAt: new Date().toISOString(),
  });
}
