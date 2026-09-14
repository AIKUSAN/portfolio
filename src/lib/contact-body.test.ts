import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handleContact } from './contact-handler';

const values = {
  name: 'Local fixture', email: 'Fixture@Example.com',
  message: 'A local-only contact test with no real email delivery.',
  'cf-turnstile-response': 'fixture-token', website: ''
};
const form = () => {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
};
const encoded = () => new URLSearchParams(values).toString();
const sizedEncoded = (size: number) => {
  const prefix = `${encoded()}&ignored=`;
  return prefix + 'x'.repeat(size - prefix.length);
};
const sizedMultipart = (size: number) => {
  const boundary = 'portfolio-local-fixture';
  const prefix = Object.entries(values).map(([key, value]) =>
    `--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}\r\n`
  ).join('') + `--${boundary}\r\nContent-Disposition: form-data; name="ignored"\r\n\r\n`;
  const suffix = `\r\n--${boundary}--\r\n`;
  return { body: prefix + 'x'.repeat(size - prefix.length - suffix.length) + suffix, contentType: `multipart/form-data; boundary=${boundary}` };
};
const request = (body: BodyInit | null, headers: Record<string, string> = {}) => new Request('https://lorenztazan.com/api/contact', {
  method: 'POST', body, headers: { origin: 'https://lorenztazan.com', ...headers },
  ...(body instanceof ReadableStream ? { duplex: 'half' } : {})
});
const env = () => ({
  EMAIL: { send: vi.fn().mockResolvedValue(undefined) },
  TURNSTILE_SECRET_KEY: 'fixture-secret-for-local-tests-only', TURNSTILE_EXPECTED_HOSTNAME: 'lorenztazan.com',
  CONTACT_FROM: 'portfolio@lorenztazan.com', CONTACT_RECIPIENT: 'lorenztazan@gmail.com'
});

beforeEach(() => vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => new Response(JSON.stringify({
  success: true, action: 'portfolio_contact', hostname: 'lorenztazan.com'
})))));
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('contact body budget', () => {
  it.each([undefined, '1', 'invalid', '-1'])('rejects oversized ignored data with declared length %s before parsing', async declared => {
    const parser = vi.spyOn(Request.prototype, 'formData');
    const boundedParser = vi.spyOn(Response.prototype, 'formData');
    const environment = env();
    const response = await handleContact(request(sizedEncoded(12_001), {
      'content-type': 'application/x-www-form-urlencoded', ...(declared ? { 'content-length': declared } : {})
    }), environment);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false });
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
    expect(response.headers.get('content-security-policy')).toContain("frame-ancestors 'none'");
    expect(parser).not.toHaveBeenCalled();
    expect(boundedParser).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
    expect(environment.EMAIL.send).not.toHaveBeenCalled();
  });

  it.each(['urlencoded', 'multipart'])('accepts exactly 12000 bytes and rejects 12001 in %s', async encoding => {
    for (const size of [12_000, 12_001]) {
      const input = encoding === 'multipart' ? sizedMultipart(size) : { body: sizedEncoded(size), contentType: 'application/x-www-form-urlencoded' };
      expect(new TextEncoder().encode(input.body).byteLength).toBe(size);
      const environment = env();
      const response = await handleContact(request(input.body, { 'content-type': input.contentType }), environment);
      expect(response.status).toBe(size === 12_000 ? 200 : 400);
      expect(environment.EMAIL.send).toHaveBeenCalledTimes(size === 12_000 ? 1 : 0);
    }
  });

  it.each(['duplicate', 'whitespace', 'unicode', 'file'])('counts excess %s data, not only validated strings', async variant => {
    const data = form();
    if (variant === 'duplicate') data.append('name', 'x'.repeat(12_001));
    if (variant === 'whitespace') data.set('name', `Local fixture${' '.repeat(12_001)}`);
    if (variant === 'unicode') data.set('ignored', '🛠'.repeat(3100));
    if (variant === 'file') data.set('ignored', new Blob(['x'.repeat(12_001)]), 'fixture.txt');
    const environment = env();
    expect((await handleContact(request(data), environment)).status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
    expect(environment.EMAIL.send).not.toHaveBeenCalled();
  });

  it('cancels a multi-chunk stream on overflow without draining it', async () => {
    const cancel = vi.fn();
    let reads = 0;
    const body = new ReadableStream<Uint8Array>({
      pull(controller) { reads++; controller.enqueue(new Uint8Array(7000)); }, cancel
    }, { highWaterMark: 0 });
    expect((await handleContact(request(body, { 'content-type': 'application/x-www-form-urlencoded' }), env())).status).toBe(400);
    expect(reads).toBe(2);
    expect(cancel).toHaveBeenCalledOnce();
    expect(body.locked).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('preserves the early declared-size rejection', async () => {
    const parser = vi.spyOn(Request.prototype, 'formData');
    expect((await handleContact(request(form(), { 'content-length': '12001' }), env())).status).toBe(400);
    expect(parser).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns 400 on stream errors and releases its reader', async () => {
    const body = new ReadableStream<Uint8Array>({ pull(controller) { controller.error(new Error('fixture read failure')); } });
    expect((await handleContact(request(body, { 'content-type': 'application/x-www-form-urlencoded' }), env())).status).toBe(400);
    expect(body.locked).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([null, '', 'not a form'])('rejects absent/unsupported form bodies (%s)', async body => {
    expect((await handleContact(request(body, { 'content-type': 'application/json' }), env())).status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('preserves first-field semantics for ordinary duplicate fields', async () => {
    const data = form();
    data.append('name', 'Ignored second value');
    const environment = env();
    expect((await handleContact(request(data), environment)).status).toBe(200);
    expect(environment.EMAIL.send.mock.calls[0]?.[0]).toMatchObject({ replyTo: { name: 'Local fixture', email: 'fixture@example.com' } });
  });
});
