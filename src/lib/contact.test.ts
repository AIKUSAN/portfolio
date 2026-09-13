import { afterEach, describe, expect, it, vi } from 'vitest';
import { contactEmailContent, escapeHtml, isSameOrigin, validateContactForm } from './contact';
import { POST } from '@/pages/api/contact';

const validForm = (overrides: Record<string, string> = {}) => {
  const form = new FormData();
  const values = {
    name: 'Recruiter Name',
    email: 'Recruiter@Example.com',
    message: 'I would like to discuss an infrastructure support role.',
    focus: 'systems',
    'cf-turnstile-response': 'valid-token',
    website: '',
    ...overrides
  };

  for (const [key, value] of Object.entries(values)) form.set(key, value);
  return form;
};

const requestFor = (form = validForm(), origin = 'https://lorenztazan.com') => new Request(
  'https://lorenztazan.com/api/contact',
  { method: 'POST', headers: { origin }, body: form }
);

const runtimeLocals = (send = vi.fn().mockResolvedValue(undefined)) => ({
  runtime: {
    env: {
      EMAIL: { send },
      TURNSTILE_SECRET_KEY: 'test-secret',
      TURNSTILE_EXPECTED_HOSTNAME: 'lorenztazan.com',
      CONTACT_FROM: 'portfolio@lorenztazan.com',
      CONTACT_RECIPIENT: 'lorenztazan@gmail.com'
    },
    ctx: {},
    cf: {},
    caches: {}
  }
});

const invokePost = async (request: Request, locals = runtimeLocals()) => POST({ request, locals } as never);

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('contact validation and formatting', () => {
  it('normalizes valid form data and rejects short messages', () => {
    const valid = validateContactForm(validForm());
    expect(valid).toMatchObject({
      ok: true,
      data: { email: 'recruiter@example.com', focus: 'systems' }
    });

    expect(validateContactForm(validForm({ message: 'Too short' }))).toEqual({
      ok: false,
      reason: 'invalid_request'
    });
  });

  it('escapes message content before constructing HTML email', () => {
    expect(escapeHtml('<script>"unsafe" & more</script>')).toBe(
      '&lt;script&gt;&quot;unsafe&quot; &amp; more&lt;/script&gt;'
    );

    const validation = validateContactForm(validForm({
      message: '<b>Please review this role & reply.</b>'
    }));
    expect(validation.ok).toBe(true);
    if (!validation.ok) return;

    const content = contactEmailContent(validation.data);
    expect(content.html).toContain('&lt;b&gt;Please review this role &amp; reply.&lt;/b&gt;');
    expect(content.html).not.toContain('<b>');
  });

  it('requires an exact same-origin request', () => {
    expect(isSameOrigin(requestFor())).toBe(true);
    expect(isSameOrigin(requestFor(validForm(), 'https://example.com'))).toBe(false);
  });
});

describe('contact Worker route', () => {
  it('returns 403 before external calls for a cross-origin request', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const response = await invokePost(requestFor(validForm(), 'https://example.com'));

    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 403 when Turnstile verification fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: false
    }), { headers: { 'content-type': 'application/json' } })));

    const response = await invokePost(requestFor());
    expect(response.status).toBe(403);
  });

  it('returns 500 when verified delivery is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true,
      action: 'portfolio_contact',
      hostname: 'lorenztazan.com'
    }), { headers: { 'content-type': 'application/json' } })));
    const locals = runtimeLocals(vi.fn().mockRejectedValue(new Error('delivery unavailable')));

    const response = await invokePost(requestFor(), locals);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ ok: false });
  });

  it('sends once and returns the public success contract', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true,
      action: 'portfolio_contact',
      hostname: 'lorenztazan.com'
    }), { headers: { 'content-type': 'application/json' } })));
    const send = vi.fn().mockResolvedValue(undefined);
    const response = await invokePost(requestFor(), runtimeLocals(send));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledOnce();
    expect(send.mock.calls[0]?.[0]).toMatchObject({
      to: 'lorenztazan@gmail.com',
      replyTo: { email: 'recruiter@example.com', name: 'Recruiter Name' }
    });
  });
});
