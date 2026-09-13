import { describe, expect, it } from 'vitest';
import { localFocusTarget, orderByFocus, resolveFocus, resumeForFocus, withRoleFocus } from './role-focus';

describe('role journeys', () => {
  it('enhances only a same-page role destination while retaining its URL', () => {
    const current = new URL('http://127.0.0.1:4329/work?focus=support');
    expect(localFocusTarget(current, '?focus=platform#netops-automation-lab', { button: 0 })?.href)
      .toBe('http://127.0.0.1:4329/work?focus=platform#netops-automation-lab');
    for (const href of ['/about?focus=support', 'https://example.com/work?focus=support', '?focus=unknown', '/resume.pdf', 'mailto:a@example.com']) {
      expect(localFocusTarget(current, href, { button: 0 })).toBeNull();
    }
  });
  it('preserves modified and middle-click browser navigation', () => {
    const current = new URL('http://127.0.0.1:4329/');
    for (const activation of [{ button: 1 }, { button: 0, ctrlKey: true }, { button: 0, metaKey: true }, { button: 0, shiftKey: true }, { button: 0, altKey: true }]) {
      expect(localFocusTarget(current, '?focus=systems', activation)).toBeNull();
    }
  });
  it('uses systems for absent or invalid focus', () => {
    expect(resolveFocus(null)).toBe('systems');
    expect(resolveFocus('unknown')).toBe('systems');
    expect(resolveFocus('support')).toBe('support');
  });
  it('maps the approved resume tracks', () => {
    expect(resumeForFocus('support')).toBe('/resume/lorenz-tazan-it-support.pdf');
    expect(resumeForFocus('platform')).toBe(resumeForFocus('systems'));
  });
  it('preserves project anchors and replaces previous role queries', () => {
    expect(withRoleFocus('/work?focus=systems#regional-isp-core', 'support')).toBe('/work?focus=support#regional-isp-core');
    expect(withRoleFocus('/contact', 'platform')).toBe('/contact?focus=platform');
    for (const href of ['https://github.com/AIKUSAN', '//example.com', 'mailto:lorenztazan@gmail.com', '/resume/example.pdf', '#main-content', '/api/contact']) {
      expect(withRoleFocus(href, 'support')).toBe(href);
    }
  });
  it('prioritizes matches without hiding or disturbing their original sequence', () => {
    const items = [{ id: 'a', focus: ['systems'] }, { id: 'b', focus: ['support'] }, { id: 'c', focus: ['support', 'systems'] }];
    expect(orderByFocus(items, 'support', item => item.focus).map(item => item.id)).toEqual(['b', 'c', 'a']);
    expect(items.map(item => item.id)).toEqual(['a', 'b', 'c']);
  });
});
