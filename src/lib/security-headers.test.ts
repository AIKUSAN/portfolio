import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { securityHeaders } from './security-headers';

it('keeps Worker and static security policies identical without overriding cache policy', () => {
  const rule = readFileSync(new URL('../../public/_headers', import.meta.url), 'utf8').split('\n\n')[0]!;
  const headers = Object.fromEntries(rule.split('\n').slice(1).map(line => {
    const separator = line.indexOf(':');
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
  }));
  expect(securityHeaders).toEqual(headers);
  expect(securityHeaders).not.toHaveProperty('Cache-Control');
});
