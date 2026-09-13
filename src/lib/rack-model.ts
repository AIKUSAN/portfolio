import * as THREE from 'three';

export const rackLayerIds = ['compute', 'network', 'storage', 'power'] as const;
export type RackLayer = typeof rackLayerIds[number];
export const isRackLayer = (value: unknown): value is RackLayer => rackLayerIds.includes(value as RackLayer);

type Finish = 'shell' | 'panel' | 'recess' | 'blue' | 'oxide' | 'edge';
const palettes: Record<'light' | 'dark', Record<Finish, number>> = {
  light: { shell: 0xb9c6c9, panel: 0xe4e6dd, recess: 0x172c39, blue: 0x3c7593, oxide: 0xab432a, edge: 0x253e4b },
  dark: { shell: 0x253e50, panel: 0x40586a, recess: 0x0a1723, blue: 0x82c6e7, oxide: 0xf08361, edge: 0x98bfd0 }
};

export function createRackModel() {
  const root = new THREE.Group();
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const boxCache = new Map<string, THREE.BoxGeometry>();
  const edgeCache = new Map<string, THREE.EdgesGeometry>();
  const groups = {} as Record<RackLayer, THREE.Group>;
  const finishes = {} as Record<RackLayer, Record<Finish, THREE.MeshLambertMaterial | THREE.LineBasicMaterial>>;
  const explodedY = { compute: 1.55, network: 0.4, storage: -0.8, power: -2.0 };
  const assembledY = { compute: 0.35, network: -0.17, storage: -0.82, power: -1.64 };

  function geometry(w: number, h: number, d: number) {
    const key = `${w}/${h}/${d}`;
    if (!boxCache.has(key)) {
      const shape = new THREE.BoxGeometry(w, h, d);
      geometries.add(shape);
      boxCache.set(key, shape);
    }
    return boxCache.get(key)!;
  }
  function box(layer: RackLayer, size: [number, number, number], at: [number, number, number], finish: Finish = 'shell', outlined = true) {
    const shape = geometry(...size);
    const mesh = new THREE.Mesh(shape, finishes[layer][finish] as THREE.MeshLambertMaterial);
    mesh.position.set(...at);
    groups[layer].add(mesh);
    if (outlined) {
      const key = size.join('/');
      if (!edgeCache.has(key)) {
        const edge = new THREE.EdgesGeometry(shape);
        geometries.add(edge);
        edgeCache.set(key, edge);
      }
      mesh.add(new THREE.LineSegments(edgeCache.get(key)!, finishes[layer].edge as THREE.LineBasicMaterial));
    }
    return mesh;
  }
  function repeat(layer: RackLayer, size: [number, number, number], positions: [number, number, number][], finish: Finish) {
    const mesh = new THREE.InstancedMesh(geometry(...size), finishes[layer][finish] as THREE.MeshLambertMaterial, positions.length);
    const matrix = new THREE.Matrix4();
    positions.forEach((at, index) => mesh.setMatrixAt(index, matrix.makeTranslation(...at)));
    mesh.instanceMatrix.needsUpdate = true;
    groups[layer].add(mesh);
    return mesh;
  }

  for (const layer of rackLayerIds) {
    const group = new THREE.Group();
    group.name = layer;
    group.userData.layer = layer;
    group.position.y = explodedY[layer];
    groups[layer] = group;
    root.add(group);
    finishes[layer] = Object.fromEntries(Object.entries(palettes.light).map(([kind, color]) => {
      const material = kind === 'edge'
        ? new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 })
        : new THREE.MeshLambertMaterial({ color });
      materials.add(material);
      return [kind, material];
    })) as typeof finishes[RackLayer];
  }

  // Four independent server sleds with faceplates, vents, handles and top seams.
  box('compute', [4.6, 0.06, 3.2], [0, -0.31, 0], 'panel');
  for (let i = 0; i < 4; i++) {
    const x = (i - 1.5) * 1.09;
    box('compute', [1.03, 0.5, 2.9], [x, 0, 0]);
    box('compute', [0.97, 0.43, 0.065], [x, 0, 1.49], 'panel');
    box('compute', [0.59, 0.17, 0.025], [x - 0.08, 0.08, 1.535], 'recess', false);
    box('compute', [0.59, 0.17, 0.025], [x - 0.08, -0.12, 1.535], 'recess', false);
    box('compute', [0.075, 0.3, 0.13], [x + 0.37, 0, 1.57], 'blue');
    repeat('compute', [0.025, 0.015, 0.018], [[x + 0.2, 0.14, 1.565], [x + 0.2, 0.09, 1.565]], 'oxide');
    repeat('compute', [0.022, 0.018, 1.55], Array.from({ length: 12 }, (_, k) => [x - 0.39 + k * 0.065, 0.257, -0.1]), 'recess');
  }
  // The floating lid is part of the compute assembly, not a fifth capability.
  const lid = new THREE.Group();
  lid.name = 'compute-lid';
  lid.position.y = 0.9;
  lid.add(
    box('compute', [4.6, 0.08, 3.2], [0, 0, 0], 'panel'),
    box('compute', [4.3, 0.035, 2.9], [0, 0.057, 0], 'shell'),
    repeat('compute', [0.055, 0.03, 0.055], [-2.12, 2.12].flatMap(x => [-1.42, 1.42].map(z => [x, 0.09, z] as [number, number, number])), 'recess')
  );
  groups.compute.add(lid);

  // Switch: ports are instanced, keeping detail without hundreds of draw calls.
  box('network', [4.4, 0.34, 2.65], [0, 0, 0]);
  box('network', [4.55, 0.36, 0.07], [0, 0, 1.36], 'panel');
  const ports: [number, number, number][] = [];
  const contacts: [number, number, number][] = [];
  for (let row = 0; row < 2; row++) for (let i = 0; i < 16; i++) {
    const x = -1.87 + i * 0.205;
    ports.push([x, row ? -0.086 : 0.086, 1.405]);
    contacts.push([x + 0.038, row ? -0.13 : 0.043, 1.422]);
  }
  repeat('network', [0.16, 0.11, 0.023], ports, 'recess');
  repeat('network', [0.024, 0.014, 0.012], contacts, 'blue');
  repeat('network', [0.2, 0.1, 0.025], [[1.65, 0.08, 1.408], [1.93, 0.08, 1.408], [1.65, -0.08, 1.408], [1.93, -0.08, 1.408]], 'blue');
  repeat('network', [1.3, 0.012, 0.025], Array.from({ length: 17 }, (_, i) => [0.4, 0.177, -0.9 + i * 0.09]), 'recess');

  // Storage enclosure: eight hot-swap caddies, latches and cooling fins.
  box('storage', [4.4, 0.91, 3.05], [0, 0, 0]);
  box('storage', [4.55, 0.92, 0.07], [0, 0, 1.56], 'panel');
  for (let i = 0; i < 8; i++) {
    const x = -1.89 + i * 0.54;
    box('storage', [0.47, 0.76, 0.085], [x, 0, 1.61], 'recess');
    box('storage', [0.35, 0.65, 0.075], [x - 0.022, 0, 1.66], 'shell');
    box('storage', [0.055, 0.48, 0.1], [x + 0.17, -0.04, 1.69], i === 2 || i === 6 ? 'oxide' : 'blue', false);
    repeat('storage', [0.25, 0.018, 0.016], Array.from({ length: 9 }, (_, k) => [x - 0.035, -0.25 + k * 0.06, 1.703]), 'recess');
    box('storage', [0.04, 0.025, 0.016], [x + 0.17, 0.3, 1.75], 'blue', false);
  }
  repeat('storage', [0.016, 0.48, 0.045], Array.from({ length: 18 }, (_, k) => [2.207, -0.05, -1.22 + k * 0.14]), 'recess');
  box('storage', [4.12, 0.026, 2.75], [0, 0.47, 0], 'panel');

  // Power modules with recessed displays and ventilation, without capacity labels.
  box('power', [4.4, 0.67, 3.05], [0, 0, 0]);
  box('power', [4.56, 0.69, 0.07], [0, 0, 1.57], 'panel');
  for (const x of [-1.07, 1.07]) {
    box('power', [1.94, 0.54, 0.07], [x, 0, 1.64], 'shell');
    box('power', [0.46, 0.23, 0.035], [x - 0.4, 0.035, 1.695], 'recess');
    box('power', [0.35, 0.12, 0.016], [x - 0.4, 0.045, 1.72], 'blue', false);
    box('power', [0.09, 0.09, 0.035], [x - 0.03, 0.025, 1.72], 'oxide');
    repeat('power', [0.033, 0.32, 0.02], Array.from({ length: 12 }, (_, i) => [x + 0.16 + i * 0.055, 0, 1.695]), 'recess');
  }
  // Rack ears, fasteners and rear service connectors complete every chassis.
  for (const layer of rackLayerIds) {
    const height = layer === 'storage' ? 0.88 : layer === 'power' ? 0.64 : layer === 'network' ? 0.32 : 0.49;
    for (const x of [-2.3, 2.3]) {
      box(layer, [0.16, height, 0.1], [x, 0, 1.53], 'panel');
      repeat(layer, [0.045, 0.045, 0.015], [[x, height * 0.3, 1.59], [x, -height * 0.3, 1.59]], 'recess');
    }
    repeat(layer, [0.31, 0.14, 0.05], [-1.6, -1.1, 1.1, 1.6].map(x => [x, 0, -1.54]), 'recess');
  }

  const guideMaterial = new THREE.LineDashedMaterial({ color: palettes.light.blue, transparent: true, opacity: 0.32, dashSize: 0.06, gapSize: 0.08 });
  materials.add(guideMaterial);
  const guideShape = new THREE.BufferGeometry().setFromPoints([-2.2, 2.2].flatMap(x => [-1.5, 1.5].flatMap(z => [new THREE.Vector3(x, -2.4, z), new THREE.Vector3(x, 2.65, z)])));
  geometries.add(guideShape);
  const guides = new THREE.LineSegments(guideShape, guideMaterial);
  guides.computeLineDistances();
  root.add(guides);
  let theme: 'light' | 'dark' = 'light';
  let active: RackLayer | null = null;

  function recolor() {
    const palette = palettes[theme];
    for (const layer of rackLayerIds) {
      const selected = active === layer;
      for (const [kind, material] of Object.entries(finishes[layer])) {
        const key = kind as Finish;
        material.color.setHex(selected && key === 'edge' ? palette.oxide : palette[key]);
        if (material instanceof THREE.MeshLambertMaterial) {
          material.emissive.setHex(selected ? palette.blue : 0x000000);
          material.emissiveIntensity = selected ? 0.08 : 0;
        }
      }
    }
    guideMaterial.color.setHex(palette.blue);
  }

  return {
    root, groups,
    setTheme(next: 'light' | 'dark') { theme = next; recolor(); },
    setActive(next: RackLayer | null) { active = next; recolor(); },
    pose(spread: number, selection: RackLayer | null, damping = 1) {
      lid.position.y = THREE.MathUtils.lerp(lid.position.y, THREE.MathUtils.lerp(0.31, 0.9, spread), damping);
      for (const layer of rackLayerIds) {
        const y = THREE.MathUtils.lerp(assembledY[layer], explodedY[layer], spread);
        groups[layer].position.y = THREE.MathUtils.lerp(groups[layer].position.y, y, damping);
        groups[layer].position.z = THREE.MathUtils.lerp(groups[layer].position.z, selection === layer ? 0.45 : 0, damping);
      }
      guides.visible = spread > 0.8;
    },
    dispose() { geometries.forEach(item => item.dispose()); materials.forEach(item => item.dispose()); }
  };
}
