import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { isConfiguredTurnstileKey, resolveTurnstileSiteKey } from './turnstile.mjs';

// Deliberately nonfunctional values; no live credentials or verification calls.
const fixtureKey = 'fixture-key-for-local-tests-only';
const dummyKeys = [
  '1x00000000000000000000AA',
  '2x00000000000000000000AB',
  '1x00000000000000000000BB',
  '2x00000000000000000000BB',
  '3x00000000000000000000FF',
  '1x0000000000000000000000000000000AA',
  '2x0000000000000000000000000000000AA',
  '3x0000000000000000000000000000000AA'
];

describe('Turnstile deployment configuration', () => {
  it.each([undefined, null, '', ' ', 'too-short', 'your_real_sitekey_here', ...dummyKeys])(
    'rejects absent, placeholder, or dummy credentials (%s)', value => {
      expect(isConfiguredTurnstileKey(value)).toBe(false);
      expect(() => resolveTurnstileSiteKey(value, true)).toThrow('Deployment requires a real');
      expect(resolveTurnstileSiteKey(value, false)).toBe('');
    }
  );

  it('retains configured keys without claiming they are active', () => {
    expect(resolveTurnstileSiteKey(fixtureKey, true)).toBe(fixtureKey);
    expect(resolveTurnstileSiteKey(fixtureKey, false)).toBe(fixtureKey);
  });

  it('never includes a rejected value in the build error', () => {
    const rejectedValue = 'do-not-log-this-value!';
    try {
      resolveTurnstileSiteKey(rejectedValue, true);
    } catch (error) {
      expect(String(error)).not.toContain(rejectedValue);
    }
  });

  it.each(['WORKERS_CI', 'PORTFOLIO_DEPLOYMENT_CHECK'])(
    'enforces the real build-host entrypoint for %s', flag => {
      for (const key of ['', ...dummyKeys, fixtureKey]) {
        const result = spawnSync(process.execPath, [
          fileURLToPath(new URL('../../scripts/check-deployment-env.mjs', import.meta.url))
        ], {
          encoding: 'utf8',
          env: {
            ...process.env,
            WORKERS_CI: '',
            PORTFOLIO_DEPLOYMENT_CHECK: '',
            [flag]: '1',
            PUBLIC_TURNSTILE_SITE_KEY: key
          }
        });
        expect(result.status).toBe(key === fixtureKey ? 0 : 1);
        if (key) expect(result.stderr).not.toContain(key);
      }
    }
  );

  it('allows credential-free validation builds without supplying a dummy key', () => {
    const result = spawnSync(process.execPath, [
      fileURLToPath(new URL('../../scripts/check-deployment-env.mjs', import.meta.url))
    ], {
      encoding: 'utf8',
      env: { ...process.env, WORKERS_CI: '', PORTFOLIO_DEPLOYMENT_CHECK: '', PUBLIC_TURNSTILE_SITE_KEY: '' }
    });
    expect(result.status).toBe(0);
  });
});
