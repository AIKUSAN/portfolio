import type { RackLayer } from './rack-model';

type RackScene = Awaited<ReturnType<typeof import('./rack-scene').mountRackScene>>;

export function bootRackInspector(figure: HTMLElement) {
  const artwork = figure.querySelector<HTMLElement>('[data-rack-artwork]')!;
  const host = figure.querySelector<HTMLElement>('[data-rack-webgl]')!;
  const stage = figure.querySelector<HTMLElement>('[data-rack-stage]')!;
  const status = figure.querySelector<HTMLElement>('[data-rack-status]')!;
  const toggle = figure.querySelector<HTMLButtonElement>('[data-rack-toggle]')!;
  const reset = figure.querySelector<HTMLButtonElement>('[data-rack-reset]')!;
  const assemble = figure.querySelector<HTMLButtonElement>('[data-rack-assemble]')!;
  const zoomButtons = Array.from(figure.querySelectorAll<HTMLButtonElement>('[data-rack-zoom]'));
  const controls = Array.from(figure.querySelectorAll<HTMLButtonElement>('[data-rack-control]'));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  let scene: RackScene | null = null;
  let locked: RackLayer | null = null;
  let preview: RackLayer | null = null;
  let exploded = true;
  let loading = false;
  let generation = 0;
  let userChoseStatic = false;

  function renderSelection() {
    const active = preview ?? locked;
    stage.dataset.activeLayer = active ?? '';
    stage.dataset.lockedLayer = locked ?? '';
    controls.forEach(control => {
      control.disabled = !scene;
      control.dataset.active = String(active === control.dataset.layer);
      control.setAttribute('aria-pressed', String(locked === control.dataset.layer));
    });
    scene?.select(active, locked);
  }
  function syncTheme() {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const picture = figure.querySelector<HTMLPictureElement>('[data-rack-base]')!;
    picture.querySelectorAll<HTMLSourceElement>('source').forEach(source => {
      source.srcset = (theme === 'dark' ? source.dataset.darkSrcset : source.dataset.lightSrcset) ?? '';
    });
    const image = picture.querySelector<HTMLImageElement>('img')!;
    image.src = (theme === 'dark' ? image.dataset.darkSrc : image.dataset.lightSrc) ?? image.src;
    scene?.setTheme(theme);
  }
  function showStatic(message = 'Static illustration') {
    generation++;
    loading = false;
    scene?.dispose();
    scene = null;
    locked = preview = null;
    artwork.dataset.mode = 'static';
    stage.dataset.assembly = 'exploded';
    exploded = true;
    reset.disabled = assemble.disabled = true;
    assemble.textContent = 'Assemble';
    assemble.setAttribute('aria-pressed', 'false');
    zoomButtons.forEach(button => { button.disabled = true; });
    toggle.disabled = false;
    toggle.textContent = 'Enable 3D view';
    status.textContent = message;
    renderSelection();
  }
  async function start() {
    if (scene || loading) return;
    loading = true;
    const token = ++generation;
    toggle.disabled = true;
    status.textContent = 'Loading 3D model…';
    artwork.dataset.mode = 'loading';
    try {
      const { mountRackScene } = await import('./rack-scene');
      if (token !== generation) return;
      let intro = true;
      try { intro = sessionStorage.getItem('portfolio:rack-webgl-seen') !== 'true'; } catch { /* Storage is optional. */ }
      const nextScene = await mountRackScene(host, {
        reducedMotion: reducedMotion.matches,
        intro,
        onSelect(layer) { locked = layer === locked ? null : layer; preview = null; renderSelection(); },
        onHover(layer) { preview = layer; renderSelection(); },
        onContextLost() {
          if (token !== generation) return;
          userChoseStatic = true;
          showStatic('3D paused. Static illustration shown; enable 3D to retry.');
        }
      });
      if (token !== generation) { nextScene.dispose(); return; }
      scene = nextScene;
      syncTheme();
      try { sessionStorage.setItem('portfolio:rack-webgl-seen', 'true'); } catch { /* Storage is optional. */ }
      artwork.dataset.mode = 'webgl';
      stage.dataset.assembly = 'exploded';
      status.textContent = 'Drag to rotate · Select a layer';
      toggle.textContent = 'Use static illustration';
      reset.disabled = assemble.disabled = false;
      zoomButtons.forEach(button => { button.disabled = false; });
      renderSelection();
    } catch {
      if (token === generation) showStatic('3D unavailable in this browser. Static illustration shown.');
    } finally {
      if (token === generation) { loading = false; toggle.disabled = false; }
    }
  }

  controls.forEach(control => {
    const layer = control.dataset.layer as RackLayer;
    control.addEventListener('click', () => { locked = locked === layer ? null : layer; preview = null; renderSelection(); });
    control.addEventListener('focus', () => { preview = layer; renderSelection(); });
    control.addEventListener('blur', () => { preview = null; renderSelection(); });
    control.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { preview = layer; renderSelection(); } });
    control.addEventListener('pointerleave', () => { preview = null; renderSelection(); });
  });
  reset.addEventListener('click', () => {
    locked = preview = null;
    exploded = true;
    stage.dataset.assembly = 'exploded';
    assemble.textContent = 'Assemble';
    assemble.setAttribute('aria-pressed', 'false');
    scene?.setExploded(true);
    scene?.reset();
    renderSelection();
  });
  assemble.addEventListener('click', () => {
    exploded = !exploded;
    stage.dataset.assembly = exploded ? 'exploded' : 'assembled';
    assemble.textContent = exploded ? 'Assemble' : 'Explode';
    assemble.setAttribute('aria-pressed', String(!exploded));
    scene?.setExploded(exploded);
  });
  zoomButtons.forEach(button => button.addEventListener('click', () => scene?.zoom(button.dataset.rackZoom === 'in' ? 0.15 : -0.15)));
  toggle.disabled = false;
  toggle.addEventListener('click', () => {
    if (scene) { userChoseStatic = true; showStatic(); }
    else { userChoseStatic = false; void start(); }
  });
  figure.addEventListener('keydown', event => {
    if (event.key === 'Escape') { locked = preview = null; renderSelection(); }
  });
  document.addEventListener('portfolio:themechange', syncTheme);
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) showStatic('Reduced motion · Static illustration'); });
  window.addEventListener('pagehide', () => { showStatic(); });
  window.addEventListener('pageshow', event => { if (event.persisted && !userChoseStatic && !reducedMotion.matches) void start(); });
  syncTheme();

  if (reducedMotion.matches || connection?.saveData) {
    showStatic(reducedMotion.matches ? 'Reduced motion · Static illustration' : 'Data saving · Static illustration');
  } else {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        if (!userChoseStatic && !reducedMotion.matches && !connection?.saveData) void start();
      }
    }, { rootMargin: '100px' });
    observer.observe(artwork);
  }
}
