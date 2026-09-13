import { mkdir, mkdtemp, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { chromium, request as apiRequest } from 'playwright';
import { verifyPortfolioJourneys } from './acceptance-ui.mjs';

const baseUrl = process.env.PORTFOLIO_TEST_URL ?? 'http://127.0.0.1:4329';
const root = resolve(import.meta.dirname, '..');
const reviewDir = process.env.PORTFOLIO_REVIEW_DIR ?? await mkdtemp(resolve(tmpdir(), 'portfolio-ui-review-'));
const axeSource = await readFile(resolve(root, 'node_modules/axe-core/axe.min.js'), 'utf8');
await mkdir(reviewDir, { recursive: true });
const report = { screenshots: [], axe: {}, inspector: {}, consoleErrors: [] };
const layers = ['compute', 'network', 'storage', 'power'];
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const mode = page => page.locator('[data-rack-artwork]');
const stage = page => page.locator('[data-rack-stage]');
const waitFor3D = async page => {
  await mode(page).scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('[data-rack-artwork]')?.dataset.mode === 'webgl');
  assert(await page.locator('canvas.rack-webgl-canvas').count() === 1, 'Expected exactly one real WebGL canvas');
  assert(await page.locator('.rack-picture-layer').count() === 0, 'Obsolete raster slices remain');
  assert(await page.locator('[data-rack-control]:enabled').count() === 4, 'Layer controls disabled');
};
const noOverflow = async page => {
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), 'Horizontal overflow');
};
const poster = async (page, theme) => {
  await page.locator('.rack-picture-base img').evaluate(async (image, expected) => {
    await image.decode();
    if (!image.currentSrc.includes('rack-' + expected) || !image.naturalWidth) throw new Error('Poster failed: ' + image.currentSrc);
  }, theme);
};
const audit = async (page, label) => {
  await page.addScriptTag({ content: axeSource });
  report.axe[label] = await page.evaluate(async () => (await axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }
  })).violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(node => node.target) })));
};
const screenshot = async (page, label) => {
  const path = resolve(reviewDir, 'webgl-' + label + '.png');
  await page.screenshot({ path, fullPage: true });
  report.screenshots.push(path);
};
const browser = await chromium.launch({
  headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']
});
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1024 }, colorScheme: 'light', bypassCSP: true });
  const page = await context.newPage();
  page.on('pageerror', error => report.consoleErrors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push(message.text()); });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  assert(await page.locator('main h1').first().innerText() === 'IT Systems & Infrastructure Professional', 'Default headline mismatch');
  assert(await page.locator('.operation-record').count() >= 3, 'Evidence missing');
  await waitFor3D(page);
  assert(await page.evaluate(() => sessionStorage.getItem('portfolio:rack-webgl-seen')) === 'true', '3D intro session flag missing');
  const requests = await page.evaluate(() => performance.getEntriesByType('resource').map(resource => resource.name));
  assert(requests.filter(url => /rack-light.*\.(avif|webp)/.test(url)).length === 1, 'Poster downloaded more than once');
  for (const layer of layers) {
    const control = page.locator('[data-rack-control][data-layer="' + layer + '"]');
    await control.click();
    assert(await stage(page).getAttribute('data-locked-layer') === layer, layer + ' did not lock');
    assert(await control.getAttribute('aria-pressed') === 'true', layer + ' aria-pressed missing');
    await control.click();
    assert(await stage(page).getAttribute('data-locked-layer') === '', layer + ' did not clear');
  }
  await page.locator('[data-layer="network"][data-rack-control]').focus();
  await page.keyboard.press('Enter');
  assert(await stage(page).getAttribute('data-locked-layer') === 'network', 'Keyboard lock failed');
  await page.keyboard.press('Escape');
  assert(await stage(page).getAttribute('data-locked-layer') === '', 'Escape failed');
  await page.getByRole('button', { name: 'Assemble', exact: true }).click();
  assert(await stage(page).getAttribute('data-assembly') === 'assembled', 'Assemble failed');
  await page.getByRole('button', { name: 'Reset view' }).click();
  assert(await stage(page).getAttribute('data-assembly') === 'exploded', 'Reset assembly failed');
  const canvas = page.locator('canvas.rack-webgl-canvas');
  await canvas.focus();
  const beforeKeyboard = await page.locator('[data-rack-webgl]').getAttribute('data-view-revision');
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(before => document.querySelector('[data-rack-webgl]').dataset.viewRevision !== before, beforeKeyboard);
  await page.keyboard.press('+');
  await page.keyboard.press('Home');
  const bounds = await canvas.boundingBox();
  const beforeDrag = await page.locator('[data-rack-webgl]').getAttribute('data-view-revision');
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width / 2 + 70, bounds.y + bounds.height / 2 + 12, { steps: 12 });
  await page.mouse.up();
  assert(await page.locator('[data-rack-webgl]').getAttribute('data-view-revision') !== beforeDrag, 'Drag did not rotate model');
  assert(await stage(page).getAttribute('data-locked-layer') === '', 'Drag incorrectly selected equipment');
  await page.getByRole('button', { name: 'Reset view' }).click();
  await canvas.click({ position: { x: bounds.width * 0.5, y: bounds.height * 0.7 } });
  assert(layers.includes(await stage(page).getAttribute('data-locked-layer')), 'Real geometry raycast did not select equipment');
  await page.getByRole('button', { name: 'Reset view' }).click();
  await page.locator('[data-rack-control][data-layer="storage"]').click();
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await poster(page, 'dark');
  assert(await stage(page).getAttribute('data-locked-layer') === 'storage', 'Theme change lost selection');
  await audit(page, 'desktop-dark');
  await screenshot(page, 'desktop-selected-dark');
  await page.getByRole('button', { name: 'Use static illustration' }).click();
  assert(await mode(page).getAttribute('data-mode') === 'static', 'Static toggle failed');
  assert(await canvas.count() === 0, 'Static toggle leaked canvas');
  assert(await page.locator('.rack-picture-base').isVisible(), 'Static poster is hidden');
  await page.getByRole('button', { name: 'Enable 3D view' }).click();
  await waitFor3D(page);
  await page.reload({ waitUntil: 'networkidle' });
  await waitFor3D(page);
  assert(await page.evaluate(() => sessionStorage.getItem('portfolio:rack-webgl-seen')) === 'true', 'Repeat visit lost intro session flag');
  const hoverBounds = await canvas.boundingBox();
  await page.mouse.move(hoverBounds.x + hoverBounds.width * 0.04, hoverBounds.y + hoverBounds.height * 0.63);
  assert(await stage(page).getAttribute('data-active-layer') === '', 'Empty space near rack outlines incorrectly hovered a chassis');
  assert(await canvas.evaluate(element => getComputedStyle(element).cursor) === 'grab', 'Empty space showed a selection cursor');
  for (const [layer, y] of [['compute', 0.37], ['network', 0.52], ['storage', 0.65], ['power', 0.82]]) {
    await page.mouse.move(hoverBounds.x + hoverBounds.width * 0.42, hoverBounds.y + hoverBounds.height * y);
    assert(await stage(page).getAttribute('data-active-layer') === layer, 'Pointer did not hit visible ' + layer + ' face');
    assert(await canvas.evaluate(element => getComputedStyle(element).cursor) === 'pointer', 'Equipment surface did not show selection cursor');
    await page.mouse.move(hoverBounds.x + hoverBounds.width * 0.42 + 1, hoverBounds.y + hoverBounds.height * y);
    assert(await stage(page).getAttribute('data-active-layer') === layer, 'Tiny pointer movement changed the hover target');
  }
  await page.mouse.move(hoverBounds.x + hoverBounds.width * 0.42, hoverBounds.y + hoverBounds.height * 0.52);
  await page.mouse.down();
  await page.mouse.up();
  assert(await stage(page).getAttribute('data-locked-layer') === 'network', 'Click did not lock the equipment shown by hover');
  await page.keyboard.press('Escape');
  await page.mouse.move(hoverBounds.x + hoverBounds.width * 0.42, hoverBounds.y + hoverBounds.height * 0.65);
  await page.mouse.wheel(0, 90);
  await page.waitForFunction(() => document.querySelector('[data-rack-stage]')?.dataset.activeLayer === 'power');
  report.inspector.hover = 'all four visible faces, empty space, subpixel stability, matching click and stationary-pointer scrolling passed';
  report.inspector.desktop = 'selection, keyboard, raycast, drag, assembly, theme, reset, static toggle and reload passed';
  await context.close();

  for (const [width, height] of [[1440, 1024], [1280, 720], [768, 1024], [375, 812]]) {
    const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: 'light', bypassCSP: true });
    const p = await ctx.newPage();
    p.on('pageerror', error => report.consoleErrors.push(error.message));
    for (const focus of ['support', 'systems', 'platform']) {
      await p.goto(baseUrl + '/?focus=' + focus, { waitUntil: 'networkidle' });
      await waitFor3D(p);
      for (const theme of ['light', 'dark']) {
        const current = await p.locator('html').getAttribute('data-theme');
        if (current !== theme) await p.getByRole('button', { name: 'Switch to ' + theme + ' mode' }).click();
        await poster(p, theme);
        await p.locator('[data-rack-control][data-layer="power"]').click();
        assert(await stage(p).getAttribute('data-locked-layer') === 'power', width + ' ' + focus + ' selection failed');
        await p.getByRole('button', { name: 'Reset view' }).click();
        await noOverflow(p);
        const resume = focus === 'support' ? 'it-support' : 'systems-cloud';
        assert(await p.locator('[data-resume-link]').first().getAttribute('href') === '/resume/lorenz-tazan-' + resume + '.pdf', 'Role resume mismatch');
        if (focus === 'support') {
          await audit(p, width + '-' + theme);
          await screenshot(p, width + '-' + theme);
        }
      }
    }
    report.inspector[width] = 'all three role lenses in both themes passed';
    await ctx.close();
  }

  const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1024 } });
  const rp = await reduced.newPage();
  await rp.goto(baseUrl, { waitUntil: 'networkidle' });
  assert(await mode(rp).getAttribute('data-mode') === 'static', 'Reduced motion auto-started 3D');
  assert(await rp.locator('canvas').count() === 0, 'Reduced motion allocated canvas');
  assert(!(await rp.evaluate(() => performance.getEntriesByType('resource').some(resource => /rack-scene/.test(resource.name)))), 'Reduced motion downloaded Three.js');
  await rp.getByRole('button', { name: 'Enable 3D view' }).click();
  await waitFor3D(rp);
  await rp.locator('[data-rack-control][data-layer="compute"]').click();
  assert(await stage(rp).getAttribute('data-locked-layer') === 'compute', 'Reduced-motion opt-in not interactive');
  report.inspector.reducedMotion = 'static by default, explicit no-animation 3D opt-in passed';
  await reduced.close();

  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const np = await noScript.newPage();
  await np.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await poster(np, 'light');
  assert(await np.locator('.rack-picture-base').isVisible(), 'No-JS poster hidden');
  assert(await np.locator('[data-rack-control]:disabled').count() === 4, 'No-JS controls incorrectly interactive');
  assert(await np.locator('canvas').count() === 0, 'No-JS canvas unexpected');
  await noOverflow(np);
  await noScript.close();

  const unavailable = await browser.newContext({ viewport: { width: 1440, height: 1024 } });
  await unavailable.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      return type.includes('webgl') ? null : original.call(this, type, ...args);
    };
  });
  const up = await unavailable.newPage();
  await up.goto(baseUrl, { waitUntil: 'networkidle' });
  await up.waitForFunction(() => document.querySelector('[data-rack-status]')?.textContent.includes('unavailable'));
  assert(await up.locator('.rack-picture-base').isVisible(), 'WebGL unavailable fallback hidden');
  assert(await up.locator('canvas').count() === 0, 'Failed init leaked canvas');
  await unavailable.close();

  const lost = await browser.newContext({ viewport: { width: 1440, height: 1024 } });
  const lp = await lost.newPage();
  await lp.goto(baseUrl, { waitUntil: 'networkidle' });
  await waitFor3D(lp);
  await lp.locator('canvas').evaluate(canvas => canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
  await lp.waitForFunction(() => document.querySelector('[data-rack-status]')?.textContent.includes('paused'));
  assert(await lp.locator('.rack-picture-base').isVisible(), 'Context loss hid poster');
  assert(await lp.locator('canvas').count() === 0, 'Context loss leaked canvas');
  await lp.getByRole('button', { name: 'Enable 3D view' }).click();
  await waitFor3D(lp);
  await lost.close();
  report.inspector.fallbacks = 'no-JS, WebGL unavailable, context loss and retry passed';

  const request = await apiRequest.newContext();
  assert((await request.get(baseUrl + '/blog')).status() === 410, '/blog did not return 410');
  assert((await request.get(baseUrl + '/record-not-found')).status() === 404, 'Unknown route did not return 404');
  for (const [legacy, destination] of [['/projects', '/work'], ['/skills', '/experience'], ['/education', '/about']]) {
    const response = await request.get(baseUrl + legacy, { maxRedirects: 0 });
    assert(response.status() === 301 && response.headers().location === destination, legacy + ' redirect mismatch');
  }
  for (const resume of ['it-support', 'systems-cloud']) {
    const response = await request.get(baseUrl + '/resume/lorenz-tazan-' + resume + '.pdf');
    assert(response.ok() && response.headers()['content-type']?.includes('application/pdf'), 'Resume failed');
    assert((await response.body()).length > 10000, 'Resume unexpectedly small');
  }
  await request.dispose();
  if (process.env.PORTFOLIO_TEST_SCOPE !== 'rack') {
    report.ui = await verifyPortfolioJourneys(browser, baseUrl, axeSource, reviewDir);
  }
} finally {
  await browser.close();
}
assert(Object.values(report.axe).every(violations => violations.length === 0), 'axe violations: ' + JSON.stringify(report.axe));
assert(report.consoleErrors.length === 0, 'Console errors: ' + JSON.stringify(report.consoleErrors));
console.log(JSON.stringify(report, null, 2));
