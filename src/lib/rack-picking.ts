import * as THREE from 'three';
import { isRackLayer, type RackLayer } from './rack-model';

interface ClientPoint { clientX: number; clientY: number }
interface CanvasBounds { left: number; top: number; width: number; height: number }

export function createRackPicker(root: THREE.Object3D) {
  const surfaces: THREE.Mesh[] = [];
  root.traverse(object => {
    // Do not recurse through edges during picking: Three's default line hit
    // tolerance is one world unit, much wider than these drafting outlines.
    if (object instanceof THREE.Mesh) surfaces.push(object);
  });
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  return (point: ClientPoint, bounds: CanvasBounds, camera: THREE.Camera): RackLayer | null => {
    if (bounds.width <= 0 || bounds.height <= 0) return null;
    const x = (point.clientX - bounds.left) / bounds.width;
    const y = (point.clientY - bounds.top) / bounds.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return null;
    // Use CSS pixels, not the device-pixel-scaled drawing buffer dimensions.
    pointer.set(x * 2 - 1, 1 - y * 2);
    root.updateWorldMatrix(true, true);
    camera.updateWorldMatrix(true, false);
    raycaster.setFromCamera(pointer, camera);
    for (const intersection of raycaster.intersectObjects(surfaces, false)) {
      let object: THREE.Object3D | null = intersection.object;
      let layer: RackLayer | null = null;
      let visible = true;
      while (object) {
        visible &&= object.visible;
        if (isRackLayer(object.userData.layer)) layer ??= object.userData.layer;
        object = object.parent;
      }
      if (visible && layer) return layer;
    }
    return null;
  };
}
