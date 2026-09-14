import { contactEmailContent, isSameOrigin, validateContactForm } from '@/lib/contact';
import { isConfiguredTurnstileKey } from '@/lib/turnstile.mjs';
import { securityHeaders } from '@/lib/security-headers';

const MAX_CONTACT_BODY_BYTES = 12_000;

async function readContactForm(request: Request): Promise<FormData> {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_CONTACT_BODY_BYTES) {
    void request.body?.cancel().catch(() => {});
    throw new Error('Invalid contact body');
  }
  if (!request.body) throw new Error('Invalid contact body');

  // Bound retained bytes, including multipart overhead and ignored fields,
  // before giving any data to the native form parser.
  const bytes = new Uint8Array(MAX_CONTACT_BODY_BYTES);
  const reader = request.body.getReader();
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value.byteLength > MAX_CONTACT_BODY_BYTES - size) {
        void reader.cancel().catch(() => {});
        throw new Error('Invalid contact body');
      }
      bytes.set(value, size);
      size += value.byteLength;
    }
  } finally {
    reader.releaseLock();
  }

  return new Response(bytes.subarray(0, size), {
    headers: { 'content-type': request.headers.get('content-type') ?? '' }
  }).formData();
}

const json = (body: { ok: boolean }, status: number) => new Response(JSON.stringify(body), {
  status,
  headers: {
    ...securityHeaders,
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  }
});

export const handleContact = async (request: Request, env: PortfolioEnv): Promise<Response> => {
  if (!isSameOrigin(request)) return json({ ok: false }, 403);

  let form: FormData;
  try {
    form = await readContactForm(request);
  } catch {
    return json({ ok: false }, 400);
  }

  const validation = validateContactForm(form);
  if (!validation.ok) return json({ ok: false }, 400);
  if (validation.data.website) return json({ ok: true }, 200);

  if (!isConfiguredTurnstileKey(env.TURNSTILE_SECRET_KEY)) return json({ ok: false }, 500);
  const turnstileBody = new FormData();
  turnstileBody.set('secret', env.TURNSTILE_SECRET_KEY);
  turnstileBody.set('response', validation.data.turnstileToken);
  const remoteIp = request.headers.get('CF-Connecting-IP');
  if (remoteIp) turnstileBody.set('remoteip', remoteIp);
  turnstileBody.set('idempotency_key', crypto.randomUUID());

  try {
    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: turnstileBody,
      signal: AbortSignal.timeout(8_000)
    });

    const result = await turnstileResponse.json() as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };
    const requestHostname = new URL(request.url).hostname;
    const allowedHostnames = new Set([
      requestHostname,
      env.TURNSTILE_EXPECTED_HOSTNAME,
      `www.${env.TURNSTILE_EXPECTED_HOSTNAME}`
    ]);

    if (!result.success || result.action !== 'portfolio_contact' || !result.hostname || result.hostname === 'dummy-key-pass' || !allowedHostnames.has(result.hostname)) {
      return json({ ok: false }, 403);
    }
  } catch {
    return json({ ok: false }, 403);
  }

  const email = contactEmailContent(validation.data);
  try {
    await env.EMAIL.send({
      from: { email: env.CONTACT_FROM, name: 'Lorenz Tazan Portfolio' },
      to: env.CONTACT_RECIPIENT,
      replyTo: { email: validation.data.email, name: validation.data.name },
      subject: email.subject,
      text: email.text,
      html: email.html
    });
  } catch {
    return json({ ok: false }, 500);
  }

  return json({ ok: true }, 200);
};
