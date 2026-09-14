import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium, firefox, webkit, request as apiRequest } from 'playwright';

const baseUrl = process.env.PORTFOLIO_TEST_URL ?? 'https://127.0.0.1:4338';
assert.equal(new URL(baseUrl).hostname, '127.0.0.1', 'This fixture runner is local-only.');
assert.equal(new URL(baseUrl).protocol, 'https:', 'Use Wrangler --local-protocol https so WebKit can enforce upgrade-insecure-requests.');
const reviewDir = process.env.PORTFOLIO_REVIEW_DIR;
assert(reviewDir, 'Set PORTFOLIO_REVIEW_DIR outside the source repository.');
await mkdir(reviewDir, { recursive: true });
const axeSource = await readFile(new URL('../node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
const routes = ['/', '/work', '/experience', '/about', '/contact'];
const report = { browsers: {}, headers: {}, schema: {}, limitations: ['Turnstile loading uses a local fixture; no messages sent.', 'The loopback development certificate is accepted only in this fixture; hosted TLS is not verified.', 'Framework-generated errors and hosted Access responses require separate verification.'] };

const client = await apiRequest.newContext({ ignoreHTTPSErrors: true });
try {
  for (const path of [...routes, '/blog', '/api/contact']) {
    const response = await client.get(`${baseUrl}${path}`);
    assert.equal(response.status(), path === '/blog' ? 410 : path === '/api/contact' ? 405 : 200);
    assert.equal(response.headers()['x-content-type-options'], 'nosniff', path);
    assert.equal(response.headers()['x-frame-options'], 'DENY', path);
    assert.match(response.headers()['content-security-policy'] ?? '', /frame-ancestors 'none'/, path);
    report.headers[path] = { status: response.status(), policyPresent: true };
  }
} finally { await client.dispose(); }

for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  console.log(`Checking ${name} with CSP enforcement enabled.`);
  const browser = await engine.launch({ headless: true });
  const errors = [];
  let checked = 0;
  try {
    for (const width of [375, 1440]) {
      // Accept only the local development certificate; keep CSP enforcement on.
      const context = await browser.newContext({ viewport: { width, height: 1024 }, reducedMotion: 'reduce', bypassCSP: false, ignoreHTTPSErrors: true });
      await context.route('https://challenges.cloudflare.com/**', route => route.fulfill({
        status: 200, contentType: 'application/javascript', body: 'window.turnstile={render(){},reset(){}};'
      }));
      await context.addInitScript(() => {
        window.policyViolations = [];
        document.addEventListener('securitypolicyviolation', event => window.policyViolations.push(`${event.effectiveDirective}: ${event.blockedURI}`));
      });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      for (const path of routes) {
        await page.goto(`${baseUrl}${path}?focus=platform`, { waitUntil: 'networkidle' });
        assert(await page.locator('main h1').isVisible(), `${name} ${path} missing heading`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${name} ${path} overflow`);
        assert((await page.locator('[data-resume-link]').first().getAttribute('href')).includes('systems-cloud'));
        const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
        assert.equal(data['@context'], 'https://schema.org');
        const expected = path === '/' ? ['Person', 'WebSite'] : path === '/about' ? ['Person', 'ProfilePage'] : path === '/contact' ? ['Person', 'ContactPage'] : ['Person'];
        assert.deepEqual(data['@graph'].map(node => node['@type']), expected);
        assert(!JSON.stringify(data).includes('?focus='));
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://lorenztazan.com${path}`);
        report.schema[path] = data;
        await page.addScriptTag({ content: axeSource });
        for (const theme of ['dark', 'light']) {
          await page.getByRole('button', { name: `Switch to ${theme} mode` }).click();
          assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          // Assert inherited foregrounds have caught up with the changed theme.
          // Attribute mutation alone can precede descendant style invalidation.
          await page.waitForFunction(() => {
            const selectors = '[data-nav-label], .theme-toggle > span, .button-manual > span, .record-links a, .tech-list li';
            return [...document.querySelectorAll(selectors)].every(element =>
              getComputedStyle(element).color === getComputedStyle(element.parentElement).color
            );
          }, undefined, { timeout: 5000 });
          const violations = await page.evaluate(async () => (await axe.run(document, {
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }
          })).violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })));
          assert.deepEqual(violations, [], `${name} ${width} ${path} ${theme} axe`);
        }
        assert.deepEqual(await page.evaluate(() => window.policyViolations), [], `${name} ${path} CSP`);
        checked++;
      }
      await context.close();
    }
    assert.deepEqual(errors, [], `${name} page errors`);
    report.browsers[name] = { status: 'passed', checked, cspBypassed: false, pageErrors: errors, axeViolations: 0 };
  } catch (error) {
    report.browsers[name] = { status: 'failed', checked, cspBypassed: false, error: error.message };
  } finally { await browser.close(); }
}
await writeFile(resolve(reviewDir, 'security-schema.json'), JSON.stringify(report, null, 2));
await writeFile(resolve(reviewDir, 'generated-schema.json'), JSON.stringify(report.schema, null, 2));
console.log(JSON.stringify(report.browsers));
assert(Object.values(report.browsers).every(result => result.status === 'passed'), 'Cross-browser acceptance incomplete; see security-schema.json.');
console.log('Static and Worker response policy, canonical JSON-LD, themes and axe checks passed. No contact submitted.');
