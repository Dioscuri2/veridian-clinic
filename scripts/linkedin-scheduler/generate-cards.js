// Generates two on-brand LinkedIn card images per day (data infographic + quote card)
// from scripts/linkedin-scheduler/card-content.json, for the split-test posting flow.
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const CONTENT = JSON.parse(fs.readFileSync(path.join(__dirname, "card-content.json"), "utf8"));
const OUT_DIR = path.join(__dirname, "..", "..", "public", "linkedin-cards");

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Figtree:wght@300;600&display=swap');
`;

function infographicHtml(day, data) {
  const items = data.items
    .map(
      (it, i) => `
      <div class="item">
        <div class="bullet">${String(i + 1).padStart(2, "0")}</div>
        <div class="item-text">
          <div class="item-title">${it.title}</div>
          <div class="item-desc">${it.desc}</div>
        </div>
      </div>`
    )
    .join("\n");

  return `
  <html><head><style>
    ${FONTS}
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1080px; height: 1350px; background: #f6f1e8; font-family: 'Figtree', sans-serif; display: flex; flex-direction: column; }
    .band { background: #0d2818; padding: 40px 64px; }
    .eyebrow { color: #c8a84b; font-family: 'Figtree', sans-serif; font-weight: 600; font-size: 22px; letter-spacing: 0.26em; text-transform: uppercase; }
    .brand { color: #ede5d4; font-family: 'Figtree', sans-serif; font-weight: 600; font-size: 20px; letter-spacing: 0.2em; text-transform: uppercase; float: right; opacity: 0.8; }
    .middle { flex: 1; display: flex; flex-direction: column; justify-content: center; }
    .headline { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 64px; line-height: 1.15; color: #131f2e; padding: 0 64px 48px; }
    .items { padding: 0 64px; }
    .item { display: flex; align-items: flex-start; padding: 32px 0; border-bottom: 1px solid #e2d8c4; }
    .item:last-child { border-bottom: none; }
    .bullet { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 40px; color: #c8a84b; width: 90px; flex-shrink: 0; }
    .item-title { font-weight: 600; font-size: 30px; color: #131f2e; margin-bottom: 6px; }
    .item-desc { font-weight: 300; font-size: 22px; line-height: 1.5; color: #2e4258; max-width: 820px; }
    .footer { padding: 24px 64px 48px; display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #c8a84b; }
    .footer-text { font-weight: 600; font-size: 22px; letter-spacing: 0.1em; color: #131f2e; text-transform: uppercase; }
  </style></head>
  <body>
    <div class="band"><span class="eyebrow">${data.eyebrow}</span><span class="brand">Veridian Clinic</span></div>
    <div class="middle">
      <div class="headline">${data.headline}</div>
      <div class="items">${items}</div>
    </div>
    <div class="footer"><div class="footer-text">${data.footer}</div></div>
  </body></html>`;
}

function quoteHtml(day, data) {
  return `
  <html><head><style>
    ${FONTS}
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1080px; height: 1350px; background: #0d2818; font-family: 'Figtree', sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 100px; }
    .rule { width: 120px; height: 3px; background: #c8a84b; margin-bottom: 48px; }
    .quote { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 58px; line-height: 1.3; color: #f6f1e8; text-align: center; max-width: 880px; }
    .attribution { margin-top: 56px; font-weight: 600; font-size: 20px; letter-spacing: 0.2em; color: #c8a84b; text-transform: uppercase; }
  </style></head>
  <body>
    <div class="rule"></div>
    <div class="quote">&ldquo;${data.quote}&rdquo;</div>
    <div class="attribution">${data.attribution}</div>
  </body></html>`;
}

async function render(html, outPath) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.screenshot({ path: outPath });
  await browser.close();
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const day of Object.keys(CONTENT)) {
    const data = CONTENT[day];
    await render(infographicHtml(day, data), path.join(OUT_DIR, `day${day}-data.png`));
    console.log(`day${day}-data.png done`);
    await render(quoteHtml(day, data), path.join(OUT_DIR, `day${day}-quote.png`));
    console.log(`day${day}-quote.png done`);
  }
})();
