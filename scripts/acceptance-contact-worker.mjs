import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

async function withLocalWorker(check) {
  const worker = spawn(process.execPath, [
    fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url)),
    'dev', '--local', '--ip', '127.0.0.1', '--port', '0', '--inspector-port', '0',
    // Force a rejected fixture, even if a developer has configured local secrets.
    '--var', 'TURNSTILE_SECRET_KEY:dummy-local-contact-fixture-only'
  ], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });

  let output = '';
  try {
    const baseUrl = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Local Worker did not start within 30 seconds.')), 30_000);
      const collect = chunk => {
        output = (output + chunk.toString()).slice(-20_000);
        const match = output.match(/Ready on (http:\/\/127\.0\.0\.1:\d+)/);
        if (match) { clearTimeout(timer); resolve(match[1]); }
      };
      worker.stdout.on('data', collect);
      worker.stderr.on('data', collect);
      worker.once('error', error => { clearTimeout(timer); reject(error); });
      worker.once('exit', code => { clearTimeout(timer); reject(new Error(`Local Worker exited before readiness (${code}).`)); });
    });

    assert.equal(new URL(baseUrl).hostname, '127.0.0.1');
    await check(baseUrl);
  } finally {
    if (worker.exitCode === null) {
      const stopped = once(worker, 'exit');
      worker.kill('SIGINT');
      const timer = setTimeout(() => worker.kill('SIGTERM'), 5_000);
      await stopped;
      clearTimeout(timer);
    }
  }
}

const form = (overrides = {}) => {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: 'Local fixture', email: 'local-fixture@example.com',
    message: 'Local Worker contract test. No message may be delivered.',
    'cf-turnstile-response': 'fixture-token', website: '', ...overrides
  })) data.set(key, value);
  return data;
};
const checks = [
  { name: 'unconfigured-secret', expected: 500 },
  { name: 'cross-origin', expected: 403, origin: 'https://example.com' },
  { name: 'invalid-input', expected: 400, fields: { message: 'short' } },
  { name: 'oversized-input', expected: 400, fields: { message: 'x'.repeat(13_000) } },
  { name: 'honeypot', expected: 200, fields: { website: 'bot.example.com' } },
  { name: 'unsupported-method', expected: 405, method: 'GET' }
];

// Keep each request in a fresh local proxy: rejected, unread request bodies can
// break Wrangler's next connection (workers-sdk#15203). Do not weaken production
// rejection rules or retry a failed assertion. Hosted sequence recovery remains
// a separate acceptance check: https://github.com/cloudflare/workers-sdk/issues/15203
for (const check of checks) {
  await withLocalWorker(async baseUrl => {
    const method = check.method ?? 'POST';
    const response = await fetch(`${baseUrl}/api/contact`, {
      method, headers: { origin: check.origin ?? baseUrl },
      ...(method === 'POST' ? { body: form(check.fields) } : {}), redirect: 'manual'
    });
    assert.equal(response.status, check.expected, check.name);
    // Astro can reject cross-origin requests before our JSON handler runs.
    if (check.name === 'cross-origin') { await response.body?.cancel(); return; }
    if (method === 'GET') {
      assert.equal(response.headers.get('allow'), 'POST');
      await response.body?.cancel();
      return;
    }
    assert.match(response.headers.get('content-type') ?? '', /application\/json/, check.name);
    assert.equal(response.headers.get('cache-control'), 'no-store', check.name);
    assert.deepEqual(await response.json(), { ok: check.expected === 200 }, check.name);
  });
  console.log(`Local Worker: ${check.name} passed.`);
}
console.log('6 isolated contact contract checks passed; fixture secret forced; no messages sent.');
