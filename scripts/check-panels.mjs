// Build-time consistency check for data/panels.ts (runs via npm prebuild).
// Fails the build — does not warn — when:
//   1. a panel's landingPage does not resolve to a real app route
//   2. a panel's checkoutTier is missing from app/api/checkout/route.ts
//   3. a panel's price disagrees with the Stripe amount for its tier
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const panelsSrc = readFileSync(join(root, "data/panels.ts"), "utf8");
const checkoutSrc = readFileSync(join(root, "app/api/checkout/route.ts"), "utf8");

// Extract panels: blocks between `{` after PANELS array entries. Regex-parse the
// four fields we validate; panels.ts is code-reviewed TS, this is a tripwire not a parser.
const panelBlocks = [...panelsSrc.matchAll(
  /slug:\s*"([^"]+)"[\s\S]*?pricePence:\s*GBP\(([\d.]+)\)[\s\S]*?landingPage:\s*(null|"[^"]+")[\s\S]*?checkoutTier:\s*(null|"[^"]+")/g
)].map((m) => ({
  slug: m[1],
  pricePence: Math.round(parseFloat(m[2]) * 100),
  landingPage: m[3] === "null" ? null : m[3].slice(1, -1),
  checkoutTier: m[4] === "null" ? null : m[4].slice(1, -1),
}));

if (panelBlocks.length === 0) {
  console.error("check-panels: could not parse any panels from data/panels.ts");
  process.exit(1);
}

// Extract Stripe tier amounts: `"tier": { name: ..., amount: NNNN` / `tier: {`
const tierAmounts = {};
for (const m of checkoutSrc.matchAll(/"?([\w-]+)"?:\s*\{\s*name:\s*"[^"]*",\s*amount:\s*(\d+)/g)) {
  tierAmounts[m[1]] = parseInt(m[2], 10);
}

const errors = [];
for (const p of panelBlocks) {
  if (p.landingPage) {
    const route = join(root, "app", ...p.landingPage.split("/").filter(Boolean), "page.tsx");
    if (!existsSync(route)) errors.push(`${p.slug}: landingPage ${p.landingPage} has no app route (${route})`);
  }
  if (p.checkoutTier) {
    if (!(p.checkoutTier in tierAmounts)) {
      errors.push(`${p.slug}: checkoutTier "${p.checkoutTier}" not found in checkout tierCatalog`);
    } else if (p.pricePence !== 0 && tierAmounts[p.checkoutTier] !== p.pricePence) {
      errors.push(
        `${p.slug}: price mismatch — panels.ts £${p.pricePence / 100} vs Stripe £${tierAmounts[p.checkoutTier] / 100} for tier "${p.checkoutTier}"`
      );
    }
  }
}

if (errors.length) {
  console.error("check-panels FAILED:\n  " + errors.join("\n  "));
  process.exit(1);
}
console.log(`check-panels OK: ${panelBlocks.length} panels consistent with routes and Stripe tiers`);
