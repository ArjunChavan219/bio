import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// scroll to the projects grid and click the first card
await page.evaluate(() => window.scrollTo(0, 4500));
await page.waitForTimeout(600);
await page.getByRole('button', { name: /Little Go AI Player/i }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: '/tmp/bio-shots/fixed-overlay.png' });

const overlayText = await page.evaluate(() => {
  const h = document.querySelector('h3');
  return document.body.innerText.includes('Key decisions');
});
console.log(JSON.stringify({ overlayShowsKeyDecisions: overlayText }));
await browser.close();
