import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

export async function verifyPrimaryNavigation(browser, baseUrl, axeSource, reviewDir) {
  const report = { layouts: 0, axe: {}, screenshots: [], consoleErrors: [] };
  const context = await browser.newContext({ viewport: { width: 393, height: 852 }, bypassCSP: true, reducedMotion: 'reduce' });
  await context.route('https://challenges.cloudflare.com/**', route => route.fulfill({
    status: 200, contentType: 'application/javascript', body: 'window.turnstile={render(){},reset(){}};'
  }));
  const page = await context.newPage();
  page.on('pageerror', error => report.consoleErrors.push(error.message));
  const menu = page.locator('.nav-toggle');
  const nav = page.locator('#primary-navigation');
  const overflow = async label => {
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${label}: page overflow`);
    assert(await page.locator('.manual-title').evaluate(node => node.scrollWidth <= node.clientWidth + 1), `${label}: manual title overlaps controls`);
    const links = await nav.locator('a').evaluateAll(nodes => nodes.map(node => {
      const box = node.getBoundingClientRect();
      return { left: box.left, right: box.right, width: box.width, height: box.height, clipped: node.scrollWidth > node.clientWidth + 1 };
    }));
    assert(links.every(link => !link.clipped && link.width >= 44 && link.height >= 44), `${label}: small or clipped navigation target`);
    assert(links.every(link => link.left >= 0 && link.right <= page.viewportSize().width + 1), `${label}: offscreen link`);
  };
  const audit = async label => {
    await page.addScriptTag({ content: axeSource });
    report.axe[label] = await page.evaluate(async () => (await axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }
    })).violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) })));
    assert.deepEqual(report.axe[label], [], `${label}: accessibility violations`);
  };
  const capture = async label => {
    const path = resolve(reviewDir, `navigation-${label}.png`);
    await page.screenshot({ path });
    report.screenshots.push(path);
  };
  try {
    const confirmation = process.env.PORTFOLIO_NAV_CONFIRMATION === 'true';
    for (const width of confirmation ? [393, 768, 1440] : [320, 375, 393, 620, 621, 768, 1180, 1280, 1440]) {
      await page.setViewportSize({ width, height: width < 621 ? 852 : 1024 });
      for (const focus of confirmation ? ['support'] : ['support', 'systems', 'platform']) {
        for (const theme of ['light', 'dark']) {
          for (const route of confirmation ? ['/work'] : ['/', '/work', '/experience', '/about', '/contact']) {
            const label = `${width}-${focus}-${theme}-${route || 'home'}`;
            await page.goto(`${baseUrl}${route}?focus=${focus}`, { waitUntil: 'networkidle' });
            if (await page.locator('html').getAttribute('data-theme') !== theme) {
              await page.getByRole('button', { name: `Switch to ${theme} mode` }).click();
            }
            const mobile = width <= 620;
            assert.equal(await menu.isVisible(), mobile, `${label}: incorrect menu breakpoint`);
            assert.equal(await nav.isVisible(), !mobile, `${label}: incorrect initial navigation visibility`);
            if (mobile) {
              const target = await menu.boundingBox();
              assert(target.width >= 44 && target.height >= 44, `${label}: small menu target`);
              if (width === 393 && focus === 'support' && route === '/work') {
                await audit(`393-${theme}-closed`);
                await capture(`393-${theme}-closed`);
              }
              await menu.click();
              assert.equal(await menu.getAttribute('aria-expanded'), 'true');
              assert(await nav.isVisible(), `${label}: menu did not open`);
            }
            await overflow(label);
            assert.equal(await nav.locator('a').count(), 5, `${label}: missing links`);
            assert.equal(await nav.locator('[aria-current="page"]').count(), 1, `${label}: missing current page`);
            const hrefs = await nav.locator('a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
            assert(hrefs.every(href => new URL(href, baseUrl).searchParams.get('focus') === focus), `${label}: role focus lost`);
            if ([393, 1440].includes(width) && focus === 'support' && route === '/work') {
              await audit(`${width}-${theme}-open`);
              await capture(`${width}-${theme}-open`);
            }
            if (mobile) {
              await menu.click();
              assert.equal(await menu.getAttribute('aria-expanded'), 'false');
              assert(await nav.isHidden(), `${label}: menu did not close`);
            }
            report.layouts++;
          }
        }
      }
    }

    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto(`${baseUrl}/work?focus=platform`, { waitUntil: 'networkidle' });
    await menu.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    assert(await page.locator('.theme-toggle').evaluate(node => node === document.activeElement), 'Theme not next in visual/keyboard order');
    await page.keyboard.press('Tab');
    assert(await nav.locator('a').first().evaluate(node => node === document.activeElement), 'Keyboard cannot reach first navigation link');
    assert(await nav.locator('a').first().evaluate(node => getComputedStyle(node).outlineStyle !== 'none'), 'Navigation focus ring missing');
    await page.keyboard.press('Escape');
    assert(await nav.isHidden(), 'Escape did not close menu');
    assert(await menu.evaluate(node => node === document.activeElement), 'Escape did not restore focus');
    await page.keyboard.press('Space');
    assert(await nav.isVisible(), 'Space did not open menu');
    await page.locator('main h1').click();
    assert(await nav.isHidden(), 'Outside click did not close menu');
    await menu.click();
    await nav.locator('a').last().focus();
    await page.keyboard.press('Tab');
    assert(await nav.isHidden(), 'Leaving header did not close menu');
    await menu.focus();
    await page.setViewportSize({ width: 768, height: 1024 });
    await nav.waitFor({ state: 'visible' });
    await menu.waitFor({ state: 'hidden' });
    assert(await nav.isVisible() && await menu.isHidden(), 'Tablet resize left navigation hidden');
    assert(await nav.locator('[aria-current="page"]').evaluate(node => node === document.activeElement), 'Resize lost focus');
    await page.setViewportSize({ width: 393, height: 852 });
    await menu.waitFor({ state: 'visible' });
    await nav.waitFor({ state: 'hidden' });
    assert(await menu.evaluate(node => node === document.activeElement), 'Mobile resize stranded focus');
    await menu.click();
    await page.getByRole('button', { name: 'Switch to light mode' }).click();
    assert(await nav.isVisible(), 'Theme change closed menu');
    await nav.getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForLoadState('networkidle');
    assert.equal(new URL(page.url()).searchParams.get('focus'), 'platform', 'Navigation journey lost role');
    assert.equal(await page.locator('#focus').inputValue(), 'platform', 'Contact preselection lost');
    assert(await nav.isHidden(), 'New page should start with menu collapsed');

    await page.setViewportSize({ width: 393, height: 852 });
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    await menu.click();
    await overflow('393px 200% text');
  } finally {
    await context.close();
  }

  for (const blockedScript of [false, true]) {
    const fallback = await browser.newContext({ javaScriptEnabled: blockedScript, viewport: { width: 393, height: 852 } });
    // The second case deliberately fails only the menu initializer.
    if (blockedScript) await fallback.addInitScript(() => {
      const match = window.matchMedia.bind(window);
      window.matchMedia = query => { if (query === '(max-width: 620px)') throw new Error('test initialization failure'); return match(query); };
    });
    const staticPage = await fallback.newPage();
    await staticPage.goto(`${baseUrl}/work`, { waitUntil: 'networkidle' });
    assert(await staticPage.locator('.nav-toggle').isHidden(), 'Fallback exposed nonfunctional menu button');
    assert(await staticPage.locator('#primary-navigation').isVisible(), 'Fallback lost navigation');
    await staticPage.locator('#primary-navigation').getByRole('link', { name: 'Experience', exact: true }).click();
    await staticPage.waitForLoadState('networkidle');
    assert.equal(new URL(staticPage.url()).pathname, '/experience', 'Fallback navigation failed');
    await fallback.close();
  }
  assert.deepEqual(report.consoleErrors, []);
  report.interactions = 'Click, Enter, Space, Escape, focus return, outside click, tab-away close, responsive DOM order, role journey, theme, 200% text, no-JS and initialization failure passed';
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = resolve(import.meta.dirname, '..');
  const reviewDir = process.env.PORTFOLIO_REVIEW_DIR ?? await mkdtemp(resolve(tmpdir(), 'portfolio-navigation-'));
  const axeSource = await readFile(resolve(root, 'node_modules/axe-core/axe.min.js'), 'utf8');
  const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  try {
    console.log(JSON.stringify(await verifyPrimaryNavigation(browser, process.env.PORTFOLIO_TEST_URL ?? 'http://127.0.0.1:4329', axeSource, reviewDir), null, 2));
  } finally {
    await browser.close();
  }
}
