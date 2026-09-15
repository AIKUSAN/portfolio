import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.PORTFOLIO_TEST_URL ?? 'https://127.0.0.1:4340';
assert.equal(new URL(baseUrl).hostname, '127.0.0.1', 'This acceptance runner is local-only.');
const reviewDir = process.env.PORTFOLIO_REVIEW_DIR;
assert(reviewDir, 'Set PORTFOLIO_REVIEW_DIR outside the source repository.');
await mkdir(reviewDir, { recursive: true });
const axeSource = await readFile(new URL('../node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
const routes = ['/', '/work', '/experience', '/about', '/contact'];
const resumes = ['/resume/lorenz-tazan-it-support.pdf', '/resume/lorenz-tazan-systems-cloud.pdf'];
const report = { layouts: 0, faqStates: 0, axeViolations: 0, noJavaScript: false, reflow: false, pageErrors: [] };
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [375, 768, 1280, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1024 }, reducedMotion: 'reduce', ignoreHTTPSErrors: true, bypassCSP: false });
    await context.route('https://challenges.cloudflare.com/**', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: 'window.turnstile={render(){},reset(){}};' }));
    await context.route('**/api/contact', route => route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => report.pageErrors.push(error.message));
    for (const focus of ['support', 'systems', 'platform']) {
      for (const theme of ['light', 'dark']) {
        for (const path of routes) {
          const label = `${width}-${focus}-${theme}-${path}`;
          await page.goto(`${baseUrl}${path}?focus=${focus}`, { waitUntil: 'networkidle' });
          if (await page.locator('html').getAttribute('data-theme') !== theme) await page.getByRole('button', { name: `Switch to ${theme} mode` }).click();
          const footer = page.locator('.site-footer');
          const hrefs = await footer.getByRole('navigation', { name: 'Footer navigation', exact: true }).getByRole('link').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
          assert.deepEqual(hrefs, routes.map(route => `${route}?focus=${focus}`), label);
          assert.equal(await footer.getByRole('link', { name: 'For hiring teams' }).getAttribute('href'), `/contact?focus=${focus}#hiring-faq`, label);
          assert.equal(await footer.getByRole('link', { name: 'Contact privacy' }).getAttribute('href'), `/contact?focus=${focus}#contact-privacy`, label);
          assert.equal(await footer.locator('[data-resume-link]').count(), 0);
          assert.match(await footer.textContent(), /© \d{4} Lorenz Tazan/);
          assert(await footer.getByRole('link').evaluateAll(nodes => nodes.every(node => node.getBoundingClientRect().height >= 44)), `${label} touch targets`);
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${label} overflow`);
          report.layouts++;
          if (path !== '/contact') continue;
          const summaries = page.locator('#hiring-faq summary');
          assert.equal(await summaries.count(), 4);
          assert.equal(await page.locator('#contact-form').getAttribute('aria-describedby'), 'contact-privacy-text');
          for (let index = 0; index < 4; index++) {
            await summaries.nth(index).focus();
            assert.notEqual(await summaries.nth(index).evaluate(node => getComputedStyle(node).outlineStyle), 'none', `${label} focus outline`);
            await page.keyboard.press(index % 2 ? 'Space' : 'Enter');
            assert.equal(await page.locator('#hiring-faq details[open]').count(), index + 1, `${label} independent disclosure`);
          }
          assert.deepEqual(await page.locator('.faq-resumes a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), resumes);
          assert.equal(await page.locator('.faq-resumes [data-resume-link]').count(), 0);
          assert(!(await page.locator('script[type="application/ld+json"]').textContent()).includes('FAQPage'));
          await page.addScriptTag({ content: axeSource });
          const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })));
          assert.deepEqual(violations, [], `${label} expanded FAQ axe`);
          if (focus === 'support' && [375, 1440].includes(width)) {
            await page.locator('#hiring-faq').screenshot({ path: resolve(reviewDir, `faq-${width}-${theme}.png`) });
            await footer.screenshot({ path: resolve(reviewDir, `footer-${width}-${theme}.png`) });
          }
          await footer.getByRole('link', { name: 'Contact privacy' }).click();
          assert.equal(new URL(page.url()).hash, '#contact-privacy');
          assert.equal(new URL(page.url()).searchParams.get('focus'), focus);
          await footer.getByRole('link', { name: 'For hiring teams' }).click();
          assert.equal(new URL(page.url()).hash, '#hiring-faq');
          report.faqStates++;
        }
      }
    }
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 }, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/contact?focus=support#hiring-faq`);
  for (const summary of await page.locator('#hiring-faq summary').all()) { await summary.focus(); await page.keyboard.press('Enter'); }
  assert.equal(await page.locator('#hiring-faq details[open]').count(), 4);
  assert.deepEqual(await page.locator('.faq-resumes a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), resumes);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, '320px reflow');
  assert(await page.locator('#contact-privacy-text').isVisible());
  report.noJavaScript = true;
  report.reflow = true;
  await context.close();
  assert.deepEqual(report.pageErrors, []);
} finally {
  await browser.close();
  await writeFile(resolve(reviewDir, 'footer-faq.json'), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report));
