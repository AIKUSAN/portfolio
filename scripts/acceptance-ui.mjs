import { resolve } from 'node:path';
import { verifyPrimaryNavigation } from './acceptance-navigation.mjs';

const focuses = ['support', 'systems', 'platform'];
const routes = ['/', '/work', '/experience', '/about', '/contact'];

export async function verifyPortfolioJourneys(browser, baseUrl, axeSource, reviewDir) {
  const report = { layouts: 0, axe: {}, screenshots: [], consoleErrors: [] };
  report.navigation = await verifyPrimaryNavigation(browser, baseUrl, axeSource, reviewDir);
  const failures = [];
  const assert = (condition, message) => { if (!condition) failures.push(message); };
  const audit = async (page, label) => {
    await page.addScriptTag({ content: axeSource });
    const violations = await page.evaluate(async () => (await axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }
    })).violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) })));
    report.axe[label] = violations;
    assert(!violations.length, label + ' accessibility: ' + JSON.stringify(violations));
  };
  for (const [width, height] of [[375, 812], [768, 1024], [1280, 720], [1440, 1024]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', bypassCSP: true });
    // Test-only network fixtures: never send contact messages or contact the verification service.
    await context.route('https://challenges.cloudflare.com/**', route => route.fulfill({
      status: 200, contentType: 'application/javascript', body: 'window.turnstile={render(){},reset(){}};'
    }));
    const page = await context.newPage();
    page.on('pageerror', error => report.consoleErrors.push(error.message));
    for (const focus of focuses) {
      for (const theme of ['light', 'dark']) {
        for (const path of routes) {
          const label = `${width}-${focus}-${theme}-${path === '/' ? 'home' : path.slice(1)}`;
          await page.goto(`${baseUrl}${path}?focus=${focus}`, { waitUntil: 'networkidle' });
          if (await page.locator('html').getAttribute('data-theme') !== theme) {
            await page.getByRole('button', { name: `Switch to ${theme} mode` }).click();
          }
          const state = await page.evaluate(() => ({
            overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
            heading: document.querySelector('main h1')?.textContent,
            clipped: [...document.querySelectorAll('.role-lens a')].some(link => link.scrollWidth > link.clientWidth + 1),
            nav: [...document.querySelectorAll('.site-header nav a')].map(link => link.getAttribute('href')),
            resumes: [...document.querySelectorAll('[data-resume-link]')].map(link => link.getAttribute('href'))
          }));
          assert(state.heading?.trim(), label + ' blank heading');
          assert(!state.overflow && !state.clipped, label + ' overflow/clipped role control');
          assert(state.nav.every(href => href.includes(`focus=${focus}`)), label + ' navigation lost role');
          const track = focus === 'support' ? 'it-support' : 'systems-cloud';
          assert(state.resumes.every(href => href === `/resume/lorenz-tazan-${track}.pdf`), label + ' wrong resume');
          if (path === '/') {
            const order = await page.locator('.operation-record').evaluateAll(nodes => nodes.map(node => node.dataset.projectId));
            assert(order.length === 3 && new Set(order).size === 3, label + ' duplicate featured work');
            assert((await page.locator('[data-featured-slot] article').getAttribute('data-project-focus')).includes(focus), label + ' wrong lead evidence');
            const layout = await page.evaluate(() => ({
              action: document.querySelector('.hero-actions').getBoundingClientRect().bottom,
              evidence: document.querySelector('.featured-evidence').getBoundingClientRect().bottom,
              rack: document.querySelector('.rack-plate').getBoundingClientRect().top
            }));
            if (width === 1280 || width === 375) assert(layout.action <= height, label + ' primary action below first screen');
            if (width < 900) assert(layout.evidence <= layout.rack, label + ' rack precedes brief evidence');
          }
          if (path === '/work') {
            const records = await page.locator('.operation-record').evaluateAll(nodes => nodes.map(node => ({
              id: node.id, focus: node.dataset.projectFocus.split(' '), top: node.getBoundingClientRect().top,
              index: Number(node.dataset.projectIndex)
            })));
            assert(records.length === 6, label + ' work is missing');
            const original = [...records].sort((a, b) => a.index - b.index);
            const expected = [...original.filter(item => item.focus.includes(focus)), ...original.filter(item => !item.focus.includes(focus))];
            assert(records.every((item, index) => item.id === expected[index].id), label + ' wrong DOM order');
            assert(records.every((item, index) => !index || item.top >= records[index - 1].top), label + ' visual order differs');
          }
          if (path === '/experience') assert(await page.locator('[data-capability-focus][data-focus-match]').getAttribute('data-capability-focus') === focus, label + ' capabilities mismatch');
          if (path === '/contact') assert(await page.locator('#focus').inputValue() === focus, label + ' contact role mismatch');
          if (path === '/about') assert((await page.locator('#education').textContent()).includes('Bachelor of Science in Computer Engineering'), 'Degree mismatch');
          if (focus === 'support' && (width === 375 || width === 1440)) {
            await audit(page, label);
            const screenshot = resolve(reviewDir, `ui-${label}.png`);
            await page.screenshot({ path: screenshot, fullPage: true });
            report.screenshots.push(screenshot);
          }
          report.layouts++;
        }
      }
    }
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce', bypassCSP: true });
  await context.route('https://challenges.cloudflare.com/**', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: 'window.turnstile={render(){},reset(){}};' }));
  const page = await context.newPage();
  for (const focus of focuses) {
    await page.goto(`${baseUrl}/?focus=${focus}`, { waitUntil: 'networkidle' });
    const projectHref = await page.locator('[data-featured-slot] a').first().getAttribute('href');
    await page.locator('[data-featured-slot] a').first().click();
    const id = new URL(projectHref, baseUrl).hash.slice(1);
    await page.waitForFunction(id => document.getElementById(id)?.querySelector('details')?.open, id);
    assert(await page.locator(`#${id} details`).getAttribute('open') !== null, 'Deep link did not open record');
    const summary = page.locator(`#${id} summary`);
    await summary.focus();
    await summary.press('Enter');
    assert(await summary.evaluate(node => getComputedStyle(node).outlineStyle !== 'none'), 'No visible keyboard focus');
    assert(await page.locator(`#${id} details`).getAttribute('open') === null, 'Keyboard disclosure did not close');
    for (const label of ['Experience', 'About', 'Contact']) {
      await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: label, exact: true }).click();
      await page.waitForLoadState('networkidle');
      assert(new URL(page.url()).searchParams.get('focus') === focus, 'Click journey lost focus');
    }
    assert(await page.locator('#focus').inputValue() === focus, 'Click journey selected wrong contact role');
    await page.goBack();
    await page.goForward();
    await page.waitForLoadState('networkidle');
    assert(await page.locator('#focus').inputValue() === focus, 'History navigation lost role');
  }

  let deliveries = 0;
  const responseStatuses = [400, 403, 500, 0, 200];
  await page.route('**/api/contact', route => {
    const status = responseStatuses[deliveries];
    deliveries++;
    if (status === 0) return route.abort('internetdisconnected');
    return route.fulfill({ status, contentType: 'application/json', body: JSON.stringify({ ok: status === 200 }) });
  });
  await page.getByLabel('Name', { exact: true }).fill('Local UI test');
  await page.getByLabel('Email address', { exact: true }).fill('local-test@example.com');
  const message = 'Local-only form recovery test. No email is delivered.';
  await page.getByLabel('Message', { exact: true }).fill(message);
  assert(await page.locator('#message').getAttribute('aria-describedby') === 'message-help', 'Message guidance is not linked');
  for (const expected of ['Check the form fields', 'Verification could not be completed', 'Sending is temporarily unavailable', 'No send confirmation was received']) {
    await page.getByRole('button', { name: 'Send message' }).click();
    await page.locator('[data-form-status][data-state="error"]').filter({ hasText: expected }).waitFor();
    assert(await page.locator('#message').inputValue() === message, 'Failure erased message');
    assert(await page.locator('#name').inputValue() === 'Local UI test', 'Failure erased name');
    assert(await page.locator('#email').inputValue() === 'local-test@example.com', 'Failure erased email');
    assert(await page.locator('#focus').inputValue() === 'platform', 'Failure erased role');
    const recovery = page.getByRole('link', { name: 'Email Lorenz instead' });
    assert(await recovery.isVisible(), 'Email recovery is hidden');
    assert(await recovery.getAttribute('href') === 'mailto:lorenztazan@gmail.com', 'Incorrect recovery address');
    await page.getByRole('button', { name: 'Send message' }).focus();
    await page.keyboard.press('Shift+Tab');
    assert(await recovery.evaluate(node => node === document.activeElement), 'Keyboard did not reach email recovery');
    assert(await recovery.evaluate(node => getComputedStyle(node).outlineStyle !== 'none'), 'Recovery focus is invisible');
    assert(await page.locator('form').getAttribute('aria-busy') === null, 'Failure left form busy');
  }
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1024 });
    for (const theme of ['light', 'dark']) {
      if (await page.locator('html').getAttribute('data-theme') !== theme) {
        await page.getByRole('button', { name: `Switch to ${theme} mode` }).click();
      }
      await page.locator('[data-form-recovery]').scrollIntoViewIfNeeded();
      await audit(page, `contact-recovery-${width}-${theme}`);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Contact recovery overflow');
      const screenshot = resolve(reviewDir, `contact-recovery-${width}-${theme}.png`);
      await page.screenshot({ path: screenshot, fullPage: true });
      report.screenshots.push(screenshot);
    }
  }
  await page.getByRole('button', { name: 'Send message' }).click();
  await page.locator('[data-form-status][data-state="success"]').waitFor();
  assert(await page.locator('#message').inputValue() === '', 'Successful form did not reset');
  assert(await page.locator('#focus').inputValue() === 'platform', 'Successful form lost role default');
  assert(await page.locator('[data-form-recovery]').isHidden(), 'Success did not hide error recovery');
  assert(deliveries === 5, 'Unexpected form requests');

  for (const path of routes) {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(`${baseUrl}${path}?focus=platform`);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path + ' 320px reflow');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path + ' text zoom overflow');
  }
  await context.close();

  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const staticPage = await noJS.newPage();
  await staticPage.goto(`${baseUrl}/work`);
  assert(await staticPage.locator('.operation-record').count() === 6, 'No-JS work incomplete');
  await staticPage.locator('.record-details summary').first().click();
  assert(await staticPage.locator('.record-details').first().getAttribute('open') !== null, 'Native no-JS disclosure failed');
  await noJS.close();
  assert(!report.consoleErrors.length, JSON.stringify(report.consoleErrors));
  if (failures.length) throw new Error(failures.join('\n'));
  report.journeys = 'Deep links, all role journeys, keyboard disclosures, history, contact recovery, 320px reflow, 200% text and no-JS passed';
  return report;
}
