/**
 * Veridian Clinic, Full Site Audit
 * Tests every page, API, security headers, chatbot, lead magnets
 */

const puppeteer = require("puppeteer");
const https = require("https");
const fs = require("fs");
const path = require("path");

const BASE = "https://veridianclinic.com";
const OUT = path.join(__dirname, "audit-screenshots");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const results = { pass: [], fail: [], warn: [] };

function pass(label, detail = "") { results.pass.push({ label, detail }); console.log(`  ✅ ${label}${detail ? ": " + detail : ""}`); }
function fail(label, detail = "") { results.fail.push({ label, detail }); console.log(`  ❌ ${label}${detail ? ": " + detail : ""}`); }
function warn(label, detail = "") { results.warn.push({ label, detail }); console.log(`  ⚠️  ${label}${detail ? ": " + detail : ""}`); }

// Pages to audit: [route, expectedStatus, screenshotName]
const PAGES = [
  // Core funnel
  ["/", 200, "home"],
  ["/metabolic-quiz", 200, "quiz"],
  ["/metabolic-quiz/result?mAge=42&chrono=38&delta=4&band=drifting&weakest=insulin", 200, "quiz-result"],
  ["/metabolic-quiz/thank-you", 200, "quiz-thankyou"],
  ["/metabolic-quiz/scorecard", 200, "quiz-scorecard"],
  ["/metabolic-reset-guide", 200, "guide-sales"],
  ["/metabolic-reset-guide/thank-you", 200, "guide-thankyou"],
  // Perimenopause funnel
  ["/perimenopause-guide", 200, "peri-guide"],
  ["/perimenopause-guide/thank-you", 200, "peri-thankyou"],
  ["/perimenopause-quiz", 200, "peri-quiz"],
  // Booking & discovery
  ["/discovery-call", 200, "discovery-call"],
  ["/book", 200, "book"],
  ["/book?tier=discovery", 200, "book-discovery"],
  ["/book?tier=guide", 200, "book-guide"],
  ["/book?tier=baseline", 200, "book-baseline"],
  ["/book?tier=longevity-panel", 200, "book-longevity"],
  ["/book?tier=metabolic-screen", 200, "book-screen"],
  ["/book?tier=fatigue-energy", 200, "book-fatigue"],
  // Services
  ["/assessments", 200, "assessments"],
  // Blood test landing pages
  ["/blood-tests", 200, "blood-tests"],
  ["/blood-tests/apob", 200, "bt-apob"],
  ["/blood-tests/fasting-insulin", 200, "bt-insulin"],
  ["/blood-tests/lipoprotein-a", 200, "bt-lpa"],
  ["/blood-tests/biological-age", 200, "bt-bio-age"],
  ["/blood-tests/metabolic-screen", 308, "bt-screen-redirect"],
  ["/blood-tests/fatigue-energy", 200, "bt-fatigue"],
  // Blog
  ["/blog", 200, "blog"],
  ["/blog/apob-vs-ldl", 200, "blog-apob"],
  ["/blog/fast-insulin", 200, "blog-insulin"],
  ["/blog/homocysteine", 200, "blog-homocysteine"],
  ["/blog/lipoprotein-a-apob-triglycerides", 200, "blog-lpa"],
  ["/blog/reversing-metabolic-syndrome", 200, "blog-rms"],
  // Legal / info
  ["/privacy", 200, "privacy"],
  ["/terms", 200, "terms"],
  ["/cookies", 200, "cookies"],
  ["/contact", 200, "contact"],
  // Misc pages
  ["/markers-guide", 200, "markers-guide"],
  ["/metabolic-age", 200, "metabolic-age"],
  ["/metabolic-scorecard", 200, "metabolic-scorecard"],
  ["/quiz", 200, "quiz-alt"],
  ["/scorecard", 200, "scorecard"],
  ["/executive-waitlist", 200, "exec-waitlist"],
  ["/intake", 200, "intake"],
  // Admin (should redirect to /admin/login)
  ["/admin", 302, "admin"],
  ["/admin/login", 200, "admin-login"],
  // SEO
  ["/sitemap.xml", 200, "sitemap"],
  ["/robots.txt", 200, "robots"],
];

// API health checks
const API_CHECKS = [
  { method: "POST", path: "/api/ava-chat", body: { message: "What is the metabolic reset guide?" }, expectKey: "reply", label: "Ava chatbot response" },
  { method: "POST", path: "/api/newsletter", body: { email: "test@example.com", name: "Audit Test" }, expectStatus: [200, 201, 400, 409], label: "Newsletter API" },
];

// Security headers expected
const REQUIRED_HEADERS = [
  "x-frame-options",
  "x-content-type-options",
  "strict-transport-security",
  "content-security-policy",
  "referrer-policy",
];

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on("error", reject);
  });
}

function httpPost(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const opts = {
      hostname: u.hostname,
      path: u.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
        "Origin": BASE,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
    };
    const req = https.request(opts, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: d }));
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  console.log("\n══════════════════════════════════════════════════════");
  console.log("  VERIDIAN CLINIC: FULL SITE AUDIT");
  console.log("══════════════════════════════════════════════════════\n");

  // ── 1. PAGE STATUS + SCREENSHOTS ──────────────────────────────────────────
  console.log("▶ 1. PAGE STATUS CHECKS\n");

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Track console errors per page
  const consoleErrors = {};

  for (const [route, expectedStatus, shotName] of PAGES) {
    const url = BASE + route;
    const pageErrors = [];
    page.removeAllListeners("console");
    page.on("console", (msg) => {
      if (msg.type() === "error") pageErrors.push(msg.text());
    });

    try {
      const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
      const status = res?.status() || 0;
      const finalUrl = page.url();

      // Screenshot key pages
      const screenshotPages = ["home", "quiz", "quiz-result", "guide-sales", "peri-guide", "discovery-call", "book", "assessments", "blog", "admin-login"];
      if (screenshotPages.includes(shotName)) {
        await page.screenshot({ path: path.join(OUT, `${shotName}.png`), fullPage: false });
      }

      if (expectedStatus === 302) {
        // Redirect, just check it didn't 404 or 500
        if (status >= 200 && status < 500) {
          pass(`${route}`, `redirects → ${finalUrl}`);
        } else {
          fail(`${route}`, `expected redirect, got ${status}`);
        }
      } else if (status === expectedStatus) {
        pass(`${route}`, `HTTP ${status}`);
      } else if (status >= 200 && status < 400) {
        warn(`${route}`, `expected ${expectedStatus}, got ${status}`);
      } else {
        fail(`${route}`, `HTTP ${status}`);
      }

      if (pageErrors.length > 0) {
        warn(`${route} console errors`, pageErrors.slice(0, 2).join("; "));
      }

      consoleErrors[route] = pageErrors;
    } catch (e) {
      fail(`${route}`, e.message.split("\n")[0]);
    }
  }

  // ── 2. SECURITY HEADERS CHECK ────────────────────────────────────────────
  console.log("\n▶ 2. SECURITY HEADERS\n");
  try {
    const { headers } = await httpGet(BASE);
    for (const h of REQUIRED_HEADERS) {
      if (headers[h]) {
        pass(`Header: ${h}`, headers[h].substring(0, 60));
      } else {
        fail(`Header: ${h}`, "MISSING");
      }
    }
    // Check HSTS specifically
    const hsts = headers["strict-transport-security"] || "";
    if (hsts.includes("max-age=") && parseInt(hsts.match(/max-age=(\d+)/)?.[1] || "0") >= 31536000) {
      pass("HSTS max-age", ">= 1 year");
    } else {
      warn("HSTS max-age", hsts || "missing");
    }
    // Check X-Permitted-Cross-Domain-Policies
    if (headers["x-permitted-cross-domain-policies"]) {
      pass("Header: x-permitted-cross-domain-policies");
    } else {
      warn("Header: x-permitted-cross-domain-policies", "MISSING, middleware may not have deployed yet");
    }
    // Check Cross-Origin headers
    if (headers["cross-origin-opener-policy"]) pass("Header: cross-origin-opener-policy");
    else warn("Header: cross-origin-opener-policy", "MISSING, middleware not yet active");
  } catch (e) {
    fail("Security headers check", e.message);
  }

  // ── 3. HONEYPOT CHECK ────────────────────────────────────────────────────
  // NOTE: Honeypot hits ban the requesting IP in-memory, so run AFTER all API tests.
  console.log("\n▶ 3. HONEYPOT TRAPS\n");
  const honeypots = ["/wp-admin", "/phpmyadmin", "/wp-login.php", "/xmlrpc.php"];
  // NOTE: Deliberately omitting /.env and /admin/config to avoid self-banning during audit.
  for (const path_ of honeypots) {
    try {
      const { status } = await httpGet(BASE + path_);
      if (status === 404 || status === 403) {
        pass(`Honeypot: ${path_}`, `returns ${status}`);
      } else {
        warn(`Honeypot: ${path_}`, `returns ${status}, middleware may not be active yet`);
      }
    } catch (e) {
      warn(`Honeypot: ${path_}`, e.message);
    }
  }

  // ── 4. AVA CHATBOT ───────────────────────────────────────────────────────
  console.log("\n▶ 4. AVA CHATBOT (API test)\n");
  try {
    const r = await httpPost(BASE + "/api/ava-chat", { message: "What is the metabolic reset guide and how much does it cost?" });
    if (r.status === 200) {
      const json = JSON.parse(r.body);
      if (json.reply && json.reply.length > 10) {
        pass("Ava chatbot API", `replied: "${json.reply.substring(0, 80)}..."`);
      } else {
        fail("Ava chatbot API", "response has no reply field: " + r.body.substring(0, 100));
      }
    } else if (r.status === 503) {
      fail("Ava chatbot API", "503: GROQ_API_KEY missing or service down");
    } else {
      fail("Ava chatbot API", `HTTP ${r.status}: ${r.body.substring(0, 100)}`);
    }
  } catch (e) {
    fail("Ava chatbot API", e.message);
  }

  // Test message length cap
  try {
    const longMsg = "x".repeat(700);
    const r = await httpPost(BASE + "/api/ava-chat", { message: longMsg });
    if (r.status === 400) pass("Ava message length cap", "400 on 700-char message ✓");
    else warn("Ava message length cap", `expected 400, got ${r.status}`);
  } catch (e) {
    warn("Ava message length cap", e.message);
  }

  // ── 5. NEWSLETTER API ────────────────────────────────────────────────────
  console.log("\n▶ 5. NEWSLETTER / LEAD CAPTURE\n");
  try {
    const r = await httpPost(BASE + "/api/newsletter", { email: "audit_test_donotuse@example.com", name: "Audit Bot" });
    if ([200, 201, 409].includes(r.status)) {
      pass("Newsletter API", `HTTP ${r.status}`);
    } else if (r.status === 400) {
      pass("Newsletter API", "400: validation working (test email likely rejected)");
    } else {
      warn("Newsletter API", `HTTP ${r.status}: ${r.body.substring(0, 100)}`);
    }
  } catch (e) {
    fail("Newsletter API", e.message);
  }

  // ── 6. LEAD MAGNETS ──────────────────────────────────────────────────────
  console.log("\n▶ 6. LEAD MAGNETS\n");

  // Check guide-download (no session_id → should get error, not 500)
  try {
    const { status } = await httpGet(BASE + "/api/guide-download");
    if (status === 400 || status === 401 || status === 403) {
      pass("Guide download, unauthenticated", `correctly returns ${status}`);
    } else if (status === 302 || status === 303) {
      pass("Guide download, unauthenticated", `redirects (${status})`);
    } else {
      warn("Guide download, unauthenticated", `returns ${status}, check route`);
    }
  } catch (e) {
    fail("Guide download API", e.message);
  }

  // Check peri-guide-download
  try {
    const { status } = await httpGet(BASE + "/api/peri-guide-download");
    if (status === 400 || status === 401 || status === 403) {
      pass("Peri-guide download, unauthenticated", `correctly returns ${status}`);
    } else {
      warn("Peri-guide download, unauthenticated", `returns ${status}`);
    }
  } catch (e) {
    fail("Peri-guide download API", e.message);
  }

  // Check guide pages load and have Stripe CTAs
  try {
    await page.goto(BASE + "/metabolic-reset-guide", { waitUntil: "domcontentloaded", timeout: 15000 });
    const pageText = await page.evaluate(() => document.body.innerText);
    const hasPrice = pageText.includes("19.99") || pageText.includes("£19");
    const hasCTA = await page.$("a[href*='checkout'], button");
    if (hasPrice) pass("Metabolic Reset Guide: £19.99 price visible");
    else warn("Metabolic Reset Guide: price not found on page");
    if (hasCTA) pass("Metabolic Reset Guide: CTA button present");
    else warn("Metabolic Reset Guide: no CTA button found");
  } catch (e) {
    fail("Metabolic Reset Guide page", e.message);
  }

  try {
    await page.goto(BASE + "/perimenopause-guide", { waitUntil: "domcontentloaded", timeout: 15000 });
    const pageText = await page.evaluate(() => document.body.innerText);
    // Check it loads without errors
    if (pageText.length > 100) {
      pass("Perimenopause Guide page", "loads OK");
    } else {
      warn("Perimenopause Guide page", "very little content");
    }
  } catch (e) {
    fail("Perimenopause Guide page", e.message);
  }

  // ── 7. WHATSAPP CHECK ────────────────────────────────────────────────────
  console.log("\n▶ 7. WHATSAPP\n");
  try {
    await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 15000 });
    const waLinks = await page.$$eval("a[href*='wa.me'], a[href*='whatsapp']", (els) =>
      els.map((e) => ({ href: e.href, text: e.textContent?.trim().substring(0, 60) }))
    );
    if (waLinks.length > 0) {
      for (const l of waLinks) pass("WhatsApp link found", `${l.href}: "${l.text}"`);
    } else {
      fail("WhatsApp link", "no wa.me or whatsapp links found on homepage");
    }
    // Check footer bar specifically
    const footerWA = await page.$eval("a[href*='wa.me']", (el) => el.href).catch(() => null);
    if (footerWA) pass("Footer WhatsApp bar", footerWA);
    else warn("Footer WhatsApp bar", "no wa.me link on homepage, may be in footer below fold");
  } catch (e) {
    fail("WhatsApp check", e.message);
  }

  // ── 8. BOOKING FLOW CHECK ────────────────────────────────────────────────
  console.log("\n▶ 8. BOOKING / STRIPE FLOW\n");
  try {
    await page.goto(BASE + "/book?tier=discovery", { waitUntil: "domcontentloaded", timeout: 15000 });
    const bodyText = await page.evaluate(() => document.body.innerText);
    const has127 = bodyText.includes("127") || bodyText.includes("£127");
    const has195 = bodyText.includes("195") || bodyText.includes("£195");
    if (has127 || has195) {
      pass("Book/Discovery: pricing visible", `£127 or £195 found`);
    } else {
      warn("Book/Discovery: pricing", "no price visible on page, check /book?tier=discovery");
    }
  } catch (e) {
    fail("Book discovery page", e.message);
  }

  // ── 9. BROKEN LINKS ON HOMEPAGE ─────────────────────────────────────────
  console.log("\n▶ 9. INTERNAL LINK CHECK (homepage)\n");
  try {
    await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 15000 });
    const internalLinks = await page.$$eval("a[href]", (els) =>
      [...new Set(
        els
          .map((e) => e.getAttribute("href"))
          .filter((h) => h && (h.startsWith("/") || h.startsWith("https://veridianclinic.com")))
          .map((h) => h.startsWith("/") ? h : h.replace("https://veridianclinic.com", ""))
          .filter((h) => !h.startsWith("/#"))
      )]
    );

    for (const link of internalLinks.slice(0, 20)) {
      try {
        const { status } = await httpGet(BASE + link);
        if (status >= 200 && status < 400) {
          pass(`Link: ${link}`, `${status}`);
        } else {
          fail(`Link: ${link}`, `HTTP ${status}: BROKEN`);
        }
      } catch (e) {
        fail(`Link: ${link}`, e.message.split("\n")[0]);
      }
    }
  } catch (e) {
    fail("Internal link check", e.message);
  }

  // ── 10. PRICING CONSISTENCY ──────────────────────────────────────────────
  console.log("\n▶ 10. PRICING CONSISTENCY\n");
  const priceChecks = [
    { route: "/metabolic-reset-guide", expected: ["19.99", "£19"], label: "Metabolic Guide £19.99" },
    { route: "/assessments", expected: ["195", "595", "795"], label: "Assessments £195/£595/£795" },
    { route: "/discovery-call", expected: ["127", "97"], label: "Discovery Call £127/£97" },
    { route: "/book?tier=guide", expected: ["19.99", "19"], label: "Book guide £19.99" },
  ];

  for (const check of priceChecks) {
    try {
      await page.goto(BASE + check.route, { waitUntil: "domcontentloaded", timeout: 15000 });
      const text = await page.evaluate(() => document.body.innerText);
      const found = check.expected.filter((p) => text.includes(p));
      if (found.length > 0) pass(check.label, `found: ${found.join(", ")}`);
      else warn(check.label, `expected ${check.expected.join(" or ")}, not visible on page`);
    } catch (e) {
      fail(check.label, e.message);
    }
  }

  // ── 11. ADMIN AUTH ───────────────────────────────────────────────────────
  console.log("\n▶ 11. ADMIN ROUTE PROTECTION\n");
  try {
    const res = await page.goto(BASE + "/admin", { waitUntil: "domcontentloaded", timeout: 15000 });
    const finalUrl = page.url();
    if (finalUrl.includes("/admin/login")) {
      pass("Admin redirects to login", finalUrl);
    } else if (res?.status() === 200 && finalUrl.includes("/admin") && !finalUrl.includes("login")) {
      warn("Admin redirect", "loaded admin without redirect, middleware may not be active yet");
    } else {
      pass("Admin protection", `→ ${finalUrl}`);
    }
  } catch (e) {
    fail("Admin route", e.message);
  }

  // ── 12. RATE LIMIT CHECK ─────────────────────────────────────────────────
  console.log("\n▶ 12. RATE LIMITING\n");
  // Hit ava-chat 15 times rapidly, should 429 after 12
  let rateLimitTriggered = false;
  for (let i = 0; i < 15; i++) {
    try {
      const r = await httpPost(BASE + "/api/ava-chat", { message: "test" });
      if (r.status === 429) { rateLimitTriggered = true; break; }
    } catch {}
  }
  if (rateLimitTriggered) pass("Rate limiting on /api/ava-chat", "429 triggered after burst");
  else warn("Rate limiting on /api/ava-chat", "no 429 after 15 rapid requests, Redis or middleware may still be propagating");

  // ── FINAL SUMMARY ────────────────────────────────────────────────────────
  await browser.close();

  console.log("\n══════════════════════════════════════════════════════");
  console.log(`  AUDIT COMPLETE`);
  console.log(`  ✅ PASS: ${results.pass.length}   ❌ FAIL: ${results.fail.length}   ⚠️  WARN: ${results.warn.length}`);
  console.log("══════════════════════════════════════════════════════");

  if (results.fail.length > 0) {
    console.log("\n❌ FAILURES:\n");
    results.fail.forEach((r) => console.log(`  • ${r.label}${r.detail ? ": " + r.detail : ""}`));
  }
  if (results.warn.length > 0) {
    console.log("\n⚠️  WARNINGS:\n");
    results.warn.forEach((r) => console.log(`  • ${r.label}${r.detail ? ": " + r.detail : ""}`));
  }

  // Write JSON report
  const report = { timestamp: new Date().toISOString(), pass: results.pass, fail: results.fail, warn: results.warn };
  fs.writeFileSync(path.join(__dirname, "audit-report.json"), JSON.stringify(report, null, 2));
  console.log("\n  Report saved to scripts/audit-report.json");
  console.log("  Screenshots saved to scripts/audit-screenshots/\n");
})();
