import { createManualMotion } from './manual-motion';
import { localFocusTarget, orderByFocus, resolveFocus, resumeForFocus, resumeLabelForFocus, withRoleFocus } from './role-focus';
import type { RoleFocus } from '@/types/site';

export function bootRoleLenses() {
  let focus: RoleFocus | undefined;
  const motion = createManualMotion();
  const lenses = [...document.querySelectorAll<HTMLElement>('.role-lens')];
  const records = [...document.querySelectorAll<HTMLElement>('[data-project-focus]')]
    .sort((a, b) => Number(a.dataset.projectIndex) - Number(b.dataset.projectIndex));
  const featuredSlot = document.querySelector<HTMLElement>('[data-featured-slot]');
  const additional = document.querySelector<HTMLElement>('[data-additional-records]');
  const register = document.querySelector<HTMLElement>('.records-list');
  const status = document.querySelector<HTMLElement>('[data-role-status]');

  const positionMarkers = (animate = false) => {
    lenses.forEach(lens => {
      const selected = lens.querySelector<HTMLElement>('[data-focus-link][aria-current="true"]');
      const marker = lens.querySelector<HTMLElement>('[data-role-indicator]');
      if (!selected || !marker) return;
      const previous = marker.style.transform;
      const next = `translate(${selected.offsetLeft + 12}px, ${selected.offsetTop - 1}px)`;
      marker.style.transform = next;
      marker.hidden = false;
      if (animate && previous) motion.marker(marker, previous, next);
    });
  };

  const apply = (next: RoleFocus, animate = false) => {
    if (next === focus) return;
    motion.cancel();
    focus = next;
    document.documentElement.dataset.focus = focus;
    document.querySelectorAll('[data-focus-link]').forEach(link => {
      link.setAttribute('aria-current', String(link.getAttribute('data-focus-link') === focus));
    });
    document.querySelectorAll('[data-focus-value]').forEach(node => {
      const value = node.getAttribute(`data-${focus}`);
      if (value) node.textContent = value;
    });
    document.querySelectorAll('[data-resume-link]').forEach(link => {
      link.setAttribute('href', resumeForFocus(next));
      link.setAttribute('aria-label', `View résumé — ${resumeLabelForFocus(next)}`);
    });
    document.querySelectorAll('[data-resume-label]').forEach(node => { node.textContent = resumeLabelForFocus(next); });
    document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(link => {
      if (!link.hasAttribute('data-focus-link')) link.setAttribute('href', withRoleFocus(link.getAttribute('href') ?? '', next));
    });
    const ordered = orderByFocus(records, next, record => (record.dataset.projectFocus ?? '').split(' '));
    ordered.forEach((record, index) => {
      record.toggleAttribute('data-focus-match', (record.dataset.projectFocus ?? '').split(' ').includes(next));
      if (featuredSlot && additional) (index === 0 ? featuredSlot : additional).appendChild(record);
      else register?.appendChild(record);
    });
    document.querySelectorAll<HTMLElement>('[data-capability-focus]').forEach(section => {
      const selected = section.dataset.capabilityFocus === next;
      section.toggleAttribute('data-focus-match', selected);
      const label = section.querySelector<HTMLElement>('[data-capability-selected]');
      if (label) label.hidden = !selected;
    });
    positionMarkers(animate);
    if (animate) {
      motion.evidence(ordered[0]);
      const label = document.querySelector(`[data-focus-link="${next}"] strong`)?.textContent;
      if (status && label) status.textContent = `${label} selected. Matching résumé and evidence shown.`;
    }
  };

  apply(resolveFocus(new URLSearchParams(location.search).get('focus')));
  lenses.forEach(lens => {
    lens.querySelectorAll<HTMLAnchorElement>('[data-focus-link]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.defaultPrevented || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
        const target = localFocusTarget(new URL(location.href), link.href, event);
        if (!target) return;
        const next = resolveFocus(target.searchParams.get('focus'));
        // Keep ordinary anchor navigation as the fallback if History is unavailable.
        if (next !== focus) {
          try { history.pushState(history.state, '', target); } catch { return; }
        }
        event.preventDefault();
        apply(next, true);
      });
    });
  });
  window.addEventListener('popstate', () => apply(resolveFocus(new URLSearchParams(location.search).get('focus')), true));
  window.addEventListener('pageshow', () => positionMarkers());
  window.addEventListener('resize', () => { motion.cancel(); positionMarkers(); });
  // Font loading and text reflow can change the stacked mobile selector geometry.
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => positionMarkers());
    lenses.forEach(lens => observer.observe(lens));
  }
  void document.fonts?.ready.then(() => positionMarkers());
}
