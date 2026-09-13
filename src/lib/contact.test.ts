import { afterEach, describe, expect, it, vi } from 'vitest';
import { contactEmailContent, escapeHtml, isSameOrigin, validateContactForm } from './contact';
import { handleContact } from './contact-handler';

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

const testEnvironment = (send = vi.fn().mockResolvedValue(undefined)) => ({
  EMAIL: { send },
  TURNSTILE_SECRET_KEY: 'fixture-secret-for-local-tests-only',
  TURNSTILE_EXPECTED_HOSTNAME: 'lorenztazan.com',
  CONTACT_FROM: 'portfolio@lorenztazan.com',
  CONTACT_RECIPIENT: 'lorenztazan@gmail.com'
});

const invokePost = (request: Request, env = testEnvironment()) => handleContact(request, env);

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
  it('fails closed when the runtime secret binding is absent', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const env = testEnvironment();
    Reflect.deleteProperty(env, 'TURNSTILE_SECRET_KEY');
    const response = await invokePost(requestFor(), env);
    expect(response.status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(env.EMAIL.send).not.toHaveBeenCalled();
  });

  it.each(['', ' ', '1x0000000000000000000000000000000AA', '2x0000000000000000000000000000000AA', '3x0000000000000000000000000000000AA'])(
    'fails closed without calling verification or email for an unconfigured secret (%s)', async secret => {
      const fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
      const send = vi.fn();
      const env = testEnvironment(send);
      env.TURNSTILE_SECRET_KEY = secret;
      const response = await invokePost(requestFor(), env);
      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({ ok: false });
      expect(fetchMock).not.toHaveBeenCalled();
      expect(send).not.toHaveBeenCalled();
    }
  );

  it.each(['dummy-key-pass', 'localhost', 'example.com'])(
    'rejects a successful response from an unexpected hostname (%s)', async hostname => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
        success: true, action: 'portfolio_contact', hostname
      }))));
      const send = vi.fn();
      const response = await invokePost(requestFor(), testEnvironment(send));
      expect(response.status).toBe(403);
      expect(send).not.toHaveBeenCalled();
    }
  );

  it('rejects the dummy hostname even if runtime hostname configuration is incorrect', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true, action: 'portfolio_contact', hostname: 'dummy-key-pass'
    }))));
    const env = testEnvironment();
    env.TURNSTILE_EXPECTED_HOSTNAME = 'dummy-key-pass';
    expect((await invokePost(requestFor(), env)).status).toBe(403);
    expect(env.EMAIL.send).not.toHaveBeenCalled();
  });

  it('accepts the current preview hostname without weakening the action check', async () => {
    const hostname = 'lorenztazan-portfolio.lorenztazan.workers.dev';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true, action: 'portfolio_contact', hostname
    }))));
    const request = new Request(`https://${hostname}/api/contact`, {
      method: 'POST', headers: { origin: `https://${hostname}` }, body: validForm()
    });
    expect((await invokePost(request)).status).toBe(200);
  });

  it('rejects a mismatched Turnstile action', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      success: true, action: 'another_form', hostname: 'lorenztazan.com'
    }))));
    const send = vi.fn();
    expect((await invokePost(requestFor(), testEnvironment(send))).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

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
    const env = testEnvironment(vi.fn().mockRejectedValue(new Error('delivery unavailable')));

    const response = await invokePost(requestFor(), env);
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
    const response = await invokePost(requestFor(), testEnvironment(send));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledOnce();
    expect(send.mock.calls[0]?.[0]).toMatchObject({
      to: 'lorenztazan@gmail.com',
      replyTo: { email: 'recruiter@example.com', name: 'Recruiter Name' }
    });
  });
});
