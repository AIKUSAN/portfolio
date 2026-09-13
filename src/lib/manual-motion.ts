/** Small, optional effects: content and navigation never wait for an animation. */
export function createManualMotion() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set<Animation>();
  const play = (element: HTMLElement, frames: Keyframe[], duration: number) => {
    if (reduced.matches || !element.animate) return;
    try {
      const animation = element.animate(frames, { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      active.add(animation);
      void animation.finished.then(() => active.delete(animation), () => active.delete(animation));
    } catch { /* Optional visual enhancement; the final DOM is already in place. */ }
  };
  const cancel = () => {
    active.forEach(animation => animation.cancel());
    active.clear();
  };
  reduced.addEventListener('change', () => { if (reduced.matches) cancel(); });
  window.addEventListener('pagehide', cancel);
  return {
    cancel,
    marker(element: HTMLElement, previous: string, next: string) {
      if (previous !== next) play(element, [{ transform: previous }, { transform: next }], 220);
    },
    evidence(element: HTMLElement | undefined) {
      if (element) play(element, [{ transform: 'translateY(6px)', opacity: 0.9 }, { transform: 'translateY(0)', opacity: 1 }], 260);
    }
  };
}
