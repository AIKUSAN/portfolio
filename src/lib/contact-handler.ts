import { contactEmailContent, isSameOrigin, validateContactForm } from '@/lib/contact';
import { isConfiguredTurnstileKey } from '@/lib/turnstile.mjs';

const json = (body: { ok: boolean }, status: number) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  }
});

export const handleContact = async (request: Request, env: PortfolioEnv): Promise<Response> => {
  if (!isSameOrigin(request)) return json({ ok: false }, 403);

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 12_000) return json({ ok: false }, 400);

  let form: FormData;
  try {
    form = await request.formData();
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
