import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const URL = process.env.URL || 'http://localhost:3000';
const OUT = '/tmp/bio-modes';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

// --- Visual mode (default) ---
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/visual-01-hero.png` });
const h = await page.evaluate(() => document.body.scrollHeight);
for (const [i, y] of [900, 1800, 2700, 3600, 4600].entries()) {
  if (y > h) break;
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/visual-0${i + 2}-y${y}.png` });
}

// --- Vim mode ---
await page.evaluate(() => window.scrollTo(0, 0));
await page.getByRole('button', { name: 'Vim', exact: true }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/vim-01-index.png` });
await page.keyboard.press('j');
await page.keyboard.press('j');
await page.keyboard.press('Enter');
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/vim-02-open.png` });

// --- k9s mode ---
await page.getByRole('button', { name: 'k9s', exact: true }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/k9s-01-table.png` });
await page.keyboard.press('Enter');
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/k9s-02-describe.png` });

// --- /experience ---
await page.goto(`${URL}/experience/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/experience-01.png`, fullPage: false });
await page.evaluate(() => window.scrollTo(0, 1400));
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/experience-02.png` });

console.log(JSON.stringify({ scrollHeight: h, errors }, null, 2));
await browser.close();
