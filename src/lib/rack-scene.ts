import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createRackModel, type RackLayer } from './rack-model';
import { createRackPicker } from './rack-picking';

interface SceneOptions {
  reducedMotion: boolean;
  intro: boolean;
  onSelect: (layer: RackLayer | null) => void;
  onHover: (layer: RackLayer | null) => void;
  onContextLost: () => void;
}

// Separate GPU setup, geometry creation and compilation into browser tasks so
// navigation and theme controls can respond while the poster is still visible.
const yieldToBrowser = () => new Promise<void>(resolve => setTimeout(resolve, 0));

export async function mountRackScene(host: HTMLElement, options: SceneOptions) {
  const canvas = document.createElement('canvas');
  canvas.className = 'rack-webgl-canvas';
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Interactive 3D infrastructure rack. Drag to rotate; use arrow keys to rotate, plus and minus to zoom, Home to reset. Select equipment with the layer buttons.');
  canvas.setAttribute('aria-describedby', 'rack-view-help');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, host.clientWidth < 600 ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  await yieldToBrowser();

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0.1, 60);
  const home = new THREE.Vector3(8, 5.8, 10);
  camera.position.copy(home);
  const ambient = new THREE.HemisphereLight(0xe8f3ff, 0x697785, 2.6);
  const key = new THREE.DirectionalLight(0xffffff, 3.1);
  key.position.set(4, 9, 8);
  const rim = new THREE.DirectionalLight(0xa4cde9, 1.8);
  rim.position.set(-6, 3, -5);
  scene.add(ambient, key, rim);
  const model = createRackModel();
  scene.add(model.root);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0.1, 0);
  controls.enablePan = false;
  controls.enableZoom = false; // Explicit zoom buttons leave page scrolling alone.
  controls.enableDamping = !options.reducedMotion;
  controls.dampingFactor = 0.12;
  controls.rotateSpeed = 0.65;
  controls.minPolarAngle = 0.42;
  controls.maxPolarAngle = 1.5;
  canvas.style.touchAction = 'pan-y';
  controls.update();

  const listeners = new AbortController();
  const pickSurface = createRackPicker(model.root);
  let frame = 0;
  let disposed = false;
  let ready = false;
  let visible = true;
  let active: RackLayer | null = null;
  let selected: RackLayer | null = null;
  let currentSpread = options.reducedMotion || !options.intro ? 1 : 0.65;
  let targetSpread = 1;
  let animateUntil = options.reducedMotion || !options.intro ? 0 : performance.now() + 950;
  let pointerStart: { x: number; y: number } | null = null;
  let dragged = false;
  let lastHover: RackLayer | null = null;
  let pointerClient: { clientX: number; clientY: number } | null = null;
  let viewRevision = 0;

  function draw(now: number) {
    frame = 0;
    if (disposed || !ready || !visible || document.hidden) return;
    const moving = controls.update();
    const ease = options.reducedMotion ? 1 : 0.16;
    currentSpread = THREE.MathUtils.lerp(currentSpread, targetSpread, ease);
    model.pose(currentSpread, selected, now < animateUntil ? ease : 1);
    renderer.render(scene, camera);
    if (pointerClient && !pointerStart) updateHover(pointerClient);
    if (now < animateUntil || moving) invalidate();
  }
  function invalidate() {
    if (!frame && ready && !disposed && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function resize() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height || disposed) return;
    const aspect = width / height;
    const halfHeight = Math.max(7.4, 6.5 / aspect) / 2;
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    invalidate();
  }
  function pick(point: { clientX: number; clientY: number }): RackLayer | null {
    return pickSurface(point, canvas.getBoundingClientRect(), camera);
  }
  function updateHover(point: { clientX: number; clientY: number }) {
    const hit = pick(point);
    if (hit !== lastHover) { lastHover = hit; options.onHover(hit); }
    canvas.style.cursor = hit ? 'pointer' : 'grab';
  }
  function clearHover() {
    pointerClient = null;
    lastHover = null;
    options.onHover(null);
    canvas.style.cursor = pointerStart ? 'grabbing' : 'grab';
  }
  function reset() {
    camera.position.copy(home);
    camera.zoom = 1;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0.1, 0);
    controls.update();
    invalidate();
  }
  function zoom(amount: number) {
    camera.zoom = THREE.MathUtils.clamp(camera.zoom + amount, 0.8, 1.6);
    camera.updateProjectionMatrix();
    invalidate();
  }
  const onControlsChange = () => {
    host.dataset.viewRevision = String(++viewRevision);
    invalidate();
  };
  controls.addEventListener('change', onControlsChange);
  const eventOptions = { signal: listeners.signal };
  canvas.addEventListener('pointerdown', event => {
    pointerStart = { x: event.clientX, y: event.clientY };
    dragged = false;
    clearHover();
  }, eventOptions);
  canvas.addEventListener('pointermove', event => {
    if (pointerStart) {
      dragged ||= Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 5;
      return;
    }
    if (event.pointerType !== 'mouse') return;
    pointerClient = { clientX: event.clientX, clientY: event.clientY };
    updateHover(pointerClient);
  }, eventOptions);
  canvas.addEventListener('pointerup', event => {
    if (pointerStart && !dragged) options.onSelect(pick(event));
    pointerStart = null;
    if (event.pointerType === 'mouse') {
      pointerClient = { clientX: event.clientX, clientY: event.clientY };
      updateHover(pointerClient);
    }
  }, eventOptions);
  canvas.addEventListener('pointercancel', () => { pointerStart = null; clearHover(); }, eventOptions);
  canvas.addEventListener('pointerleave', clearHover, eventOptions);
  window.addEventListener('scroll', () => { if (pointerClient) invalidate(); }, { ...eventOptions, passive: true, capture: true });
  canvas.addEventListener('keydown', event => {
    if (event.key === 'Escape') { clearHover(); options.onSelect(null); return; }
    if (event.key === 'Home') { event.preventDefault(); reset(); return; }
    if (['+', '=', '-'].includes(event.key)) { event.preventDefault(); zoom(event.key === '-' ? -0.15 : 0.15); return; }
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const orbit = new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));
    orbit.theta += event.key === 'ArrowLeft' ? 0.12 : event.key === 'ArrowRight' ? -0.12 : 0;
    orbit.phi = THREE.MathUtils.clamp(orbit.phi + (event.key === 'ArrowUp' ? -0.1 : event.key === 'ArrowDown' ? 0.1 : 0), 0.42, 1.5);
    camera.position.copy(new THREE.Vector3().setFromSpherical(orbit).add(controls.target));
    controls.update();
    invalidate();
  }, eventOptions);
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    options.onContextLost();
  }, eventOptions);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else invalidate();
  }, eventOptions);
  const resizeObserver = new ResizeObserver(resize);
  const visibilityObserver = new IntersectionObserver(entries => {
    visible = entries[0]?.isIntersecting ?? false;
    if (visible) invalidate(); else { cancelAnimationFrame(frame); frame = 0; }
  });
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    listeners.abort();
    controls.removeEventListener('change', onControlsChange);
    controls.dispose();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    model.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  }
  try {
    host.appendChild(canvas);
    resizeObserver.observe(host);
    visibilityObserver.observe(host);
    model.setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    resize();
    model.pose(currentSpread, null);
    await yieldToBrowser();
    // Compile shaders in parallel while the accessible poster stays visible.
    await renderer.compileAsync(scene, camera);
    renderer.render(scene, camera); // Keep the poster until a real WebGL frame succeeds.
    ready = true;
    animateUntil = options.reducedMotion || !options.intro ? 0 : performance.now() + 950;
    invalidate();
  } catch (error) {
    dispose();
    throw error;
  }

  return {
    select(layer: RackLayer | null, lockedLayer: RackLayer | null) {
      if (layer === active && lockedLayer === selected) return;
      if (lockedLayer !== selected) animateUntil = options.reducedMotion ? 0 : performance.now() + 420;
      active = layer;
      selected = lockedLayer;
      model.setActive(layer);
      invalidate();
    },
    setExploded(exploded: boolean) { targetSpread = exploded ? 1 : 0; animateUntil = options.reducedMotion ? 0 : performance.now() + 950; invalidate(); },
    setTheme(theme: 'light' | 'dark') { model.setTheme(theme); invalidate(); },
    reset, zoom, dispose
  };
}
