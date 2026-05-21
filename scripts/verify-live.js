const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "screenshots");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const SECTIONS = [
  { name: "01-hero", y: 0 },
  { name: "02-who-is-this-for", y: 900 },
  { name: "03-meet-doctor", y: 1900 },
  { name: "04-pricing", y: 3000 },
  { name: "05-quiz-strip", y: 4200 },
  { name: "06-about-story", y: 4700 },
  { name: "07-veridian-method", y: 5400 },
  { name: "08-how-it-works", y: 6300 },
  { name: "09-scorecard", y: 7400 },
  { name: "10-what-we-measure", y: 8200 },
  { name: "11-testimonials", y: 9200 },
  { name: "12-domains", y: 10400 },
  { name: "13-faq", y: 11600 },
  { name: "14-newsletter", y: 12600 },
  { name: "15-final-cta", y: 13400 },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log("Loading https://veridianclinic.com ...");
  await page.goto("https://veridianclinic.com", {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Page height: ${pageHeight}px`);

  for (const section of SECTIONS) {
    if (section.y > pageHeight) {
      console.log(`  skip ${section.name} (beyond page)`);
      continue;
    }
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), section.y);
    await new Promise((r) => setTimeout(r, 900));
    const file = path.join(OUT, `${section.name}.png`);
    await page.screenshot({ path: file });
    console.log(`  ✓ ${section.name}`);
  }

  await browser.close();
  console.log(`\nAll screenshots saved to: ${OUT}`);
})();
