import { chromium } from 'playwright';

const URL = process.env.URL || 'http://localhost:3000';
const OUT = process.env.OUT || '/tmp/bio-shots';
const LABEL = process.env.LABEL || 'state';

import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(URL, { waitUntil: 'networkidle' });
// give R3F / fonts time to settle
await page.waitForTimeout(2500);

// 1. top of page
await page.screenshot({ path: `${OUT}/${LABEL}-01-top.png` });

// 2..n: scroll the document in viewport increments
const totalHeight = await page.evaluate(() => document.body.scrollHeight);
const vh = 900;
const steps = Math.min(10, Math.ceil(totalHeight / vh));
for (let i = 1; i < steps; i++) {
  const y = i * vh;
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/${LABEL}-${String(i + 1).padStart(2, '0')}-y${y}.png` });
}

console.log(JSON.stringify({ totalHeight, viewportH: vh, steps, out: OUT }, null, 2));
await browser.close();
