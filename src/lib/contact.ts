import type { RoleFocus } from '@/types/site';

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  message: 4000
} as const;

const roleFocusValues: RoleFocus[] = ['support', 'systems', 'platform'];

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  focus?: RoleFocus;
  turnstileToken: string;
  website: string;
};

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; reason: 'invalid_request' };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const readText = (form: FormData, name: string) => {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
};

export function validateContactForm(form: FormData): ContactValidation {
  const name = readText(form, 'name');
  const email = readText(form, 'email').toLowerCase();
  const message = readText(form, 'message');
  const focusValue = readText(form, 'focus');
  const turnstileToken = readText(form, 'cf-turnstile-response');
  const website = readText(form, 'website');

  if (
    name.length < 2 ||
    name.length > CONTACT_LIMITS.name ||
    email.length > CONTACT_LIMITS.email ||
    !emailPattern.test(email) ||
    message.length < 20 ||
    message.length > CONTACT_LIMITS.message ||
    turnstileToken.length < 1 ||
    turnstileToken.length > 2048
  ) {
    return { ok: false, reason: 'invalid_request' };
  }

  const focus = roleFocusValues.includes(focusValue as RoleFocus)
    ? (focusValue as RoleFocus)
    : undefined;

  return {
    ok: true,
    data: {
      name,
      email,
      message,
      ...(focus ? { focus } : {}),
      turnstileToken,
      website
    }
  };
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character] ?? character);
}

export function contactEmailContent(data: ContactInput) {
  const focus = data.focus ?? 'not specified';
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeFocus = escapeHtml(focus);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />');

  return {
    subject: `Portfolio inquiry from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nRole focus: ${focus}\n\n${data.message}`,
    html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Role focus:</strong> ${safeFocus}</p><hr /><p>${safeMessage}</p>`
  };
}
