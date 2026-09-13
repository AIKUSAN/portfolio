import type { RoleFocus } from '@/types/site';

export const roleFocuses: RoleFocus[] = ['support', 'systems', 'platform'];
export const resolveFocus = (value: string | null): RoleFocus =>
  roleFocuses.includes(value as RoleFocus) ? value as RoleFocus : 'systems';

export const resumeForFocus = (focus: RoleFocus) =>
  `/resume/lorenz-tazan-${focus === 'support' ? 'it-support' : 'systems-cloud'}.pdf`;

export const resumeLabelForFocus = (focus: RoleFocus) =>
  focus === 'support' ? 'IT Support · PDF' : 'Systems & Cloud · PDF';

/** Only portfolio page links carry the lens; files, email and external URLs do not. */
export function withRoleFocus(href: string, focus: RoleFocus): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const url = new URL(href, 'https://lorenztazan.com');
  if (!['/', '/work', '/experience', '/about', '/contact'].includes(url.pathname)) return href;
  url.searchParams.set('focus', focus);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function orderByFocus<T>(items: readonly T[], focus: RoleFocus, getFocus: (item: T) => readonly string[]): T[] {
  return [...items.filter(item => getFocus(item).includes(focus)), ...items.filter(item => !getFocus(item).includes(focus))];
}

/** Enhance only an unmodified, same-page role link; preserve native browser gestures. */
export function localFocusTarget(current: URL, href: string, activation: {
  button: number; altKey?: boolean; ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean;
}): URL | null {
  if (activation.button !== 0 || activation.altKey || activation.ctrlKey || activation.metaKey || activation.shiftKey) return null;
  let target: URL;
  try { target = new URL(href, current); } catch { return null; }
  if (target.origin !== current.origin || target.pathname !== current.pathname) return null;
  if (!roleFocuses.includes(target.searchParams.get('focus') as RoleFocus)) return null;
  return target;
}
