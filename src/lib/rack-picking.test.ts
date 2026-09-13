import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createRackPicker } from './rack-picking';
import { createRackModel, type RackLayer } from './rack-model';

const bounds = { left: 180, top: 120, width: 400, height: 400 };
const clientPoint = (world: THREE.Vector3, camera: THREE.Camera, rect = bounds) => {
  const projected = world.clone().project(camera);
  return { clientX: rect.left + (projected.x + 1) * rect.width / 2, clientY: rect.top + (1 - projected.y) * rect.height / 2 };
};
function frontCamera() {
  const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 30);
  camera.position.set(0, 0, 12);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  return camera;
}

describe('rack surface picking', () => {
  it('rejects empty space inside the old outline tolerance', () => {
    const root = new THREE.Group();
    root.userData.layer = 'storage';
    const shape = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(shape, new THREE.MeshBasicMaterial());
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(shape), new THREE.LineBasicMaterial());
    mesh.add(edges);
    root.add(mesh);
    root.updateMatrixWorld(true);
    const camera = frontCamera();
    const point = new THREE.Vector3(1.1, 0, 0);
    const legacy = new THREE.Raycaster();
    legacy.setFromCamera(new THREE.Vector2(point.x / 3, 0), camera);
    expect(legacy.intersectObject(root, true).some(hit => hit.object === edges)).toBe(true);
    expect(createRackPicker(root)(clientPoint(point, camera), bounds, camera)).toBeNull();
    shape.dispose(); edges.geometry.dispose(); mesh.material.dispose(); edges.material.dispose();
  });

  it('picks all four real chassis but not the gaps between them', () => {
    const model = createRackModel();
    const pick = createRackPicker(model.root);
    const camera = frontCamera();
    model.pose(1, null);
    for (const layer of ['compute', 'network', 'storage', 'power'] as const) {
      const point = new THREE.Vector3(0.5, model.groups[layer].position.y, 1.7);
      expect(pick(clientPoint(point, camera), bounds, camera)).toBe(layer);
    }
    for (const y of [1, -0.05, -1.5]) {
      expect(pick(clientPoint(new THREE.Vector3(0, y, 1.7), camera), bounds, camera)).toBeNull();
    }
    model.dispose();
  });

  it('uses the actual CSS canvas bounds after scrolling and resizing', () => {
    const model = createRackModel();
    const pick = createRackPicker(model.root);
    const camera = frontCamera();
    for (const rect of [bounds, { left: 12, top: -220, width: 330, height: 410 }, { left: 700, top: 44, width: 520, height: 480 }]) {
      const point = clientPoint(new THREE.Vector3(0, -0.8, 1.7), camera, rect);
      expect(pick(point, rect, camera)).toBe('storage');
      expect(pick({ clientX: rect.left - 1, clientY: rect.top + 10 }, rect, camera)).toBeNull();
    }
    model.dispose();
  });

  it('follows updated camera and model transforms, and ignores hidden chassis', () => {
    const model = createRackModel();
    const pick = createRackPicker(model.root);
    const camera = frontCamera();
    camera.position.set(3, 0, 12);
    camera.lookAt(0, 0, 0);
    camera.zoom = 1.4;
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    model.groups.storage.position.x = 1;
    const point = clientPoint(new THREE.Vector3(1, -0.8, 1.75), camera);
    expect(pick(point, bounds, camera)).toBe('storage');
    model.groups.storage.visible = false;
    expect(pick(point, bounds, camera)).toBeNull();
    model.dispose();
  });

  it('chooses the nearest solid surface, not a nearby front-layer outline', () => {
    const root = new THREE.Group();
    const shape = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial();
    for (const [layer, x, z] of [['compute', 0.7, 3], ['network', 0, 1]] as [RackLayer, number, number][]) {
      const mesh = new THREE.Mesh(shape, material);
      mesh.userData.layer = layer;
      mesh.position.set(x, 0, z);
      const outline = new THREE.LineSegments(new THREE.EdgesGeometry(shape), new THREE.LineBasicMaterial());
      mesh.add(outline);
      root.add(mesh);
    }
    const camera = frontCamera();
    expect(createRackPicker(root)(clientPoint(new THREE.Vector3(0, 0, 1), camera), bounds, camera)).toBe('network');
    root.traverse(object => { if (object instanceof THREE.LineSegments) { object.geometry.dispose(); (object.material as THREE.Material).dispose(); } });
    shape.dispose(); material.dispose();
  });
});
