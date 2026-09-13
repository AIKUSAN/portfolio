import { describe, expect, it } from 'vitest';
import { contactFailureMessage } from './contact-feedback';

describe('contact recovery guidance', () => {
  it('asks visitors to review fields and verification for an invalid request', () => {
    expect(contactFailureMessage(400)).toContain('Check the form fields');
    expect(contactFailureMessage(400)).toContain('complete spam verification');
  });

  it('gives verification recovery without disclosing security checks', () => {
    expect(contactFailureMessage(403)).toContain('complete it again');
    expect(contactFailureMessage(403)).not.toMatch(/origin|hostname|token|Cloudflare/i);
  });

  it('does not blame verification when delivery is unavailable', () => {
    expect(contactFailureMessage(500)).toContain('try again later');
    expect(contactFailureMessage(500)).not.toContain('verification');
    expect(contactFailureMessage(503)).toBe(contactFailureMessage(500));
  });

  it('does not claim delivery failed when confirmation is lost', () => {
    expect(contactFailureMessage()).toContain('No send confirmation was received');
    expect(contactFailureMessage()).toContain('Check your connection');
  });

  it('reassures visitors that entered content is retained for every failure', () => {
    for (const status of [400, 403, 500, undefined]) {
      expect(contactFailureMessage(status)).toContain('Your message is still here');
    }
  });
});
