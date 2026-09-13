import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createRackModel, isRackLayer, rackLayerIds } from './rack-model';

describe('procedural rack model', () => {
  it('accepts only the four established capability layers', () => {
    expect(rackLayerIds).toEqual(['compute', 'network', 'storage', 'power']);
    for (const layer of rackLayerIds) expect(isRackLayer(layer)).toBe(true);
    for (const value of ['', null, undefined, 'cloud', 0]) expect(isRackLayer(value)).toBe(false);
  });

  it('builds pickable, volumetric chassis with instanced detail and no textures', () => {
    const model = createRackModel();
    for (const layer of rackLayerIds) {
      const group = model.groups[layer];
      expect(group.userData.layer).toBe(layer);
      const size = new THREE.Box3().setFromObject(group).getSize(new THREE.Vector3());
      expect(size.x).toBeGreaterThan(4);
      expect(size.y).toBeGreaterThan(0.3);
      expect(size.z).toBeGreaterThan(2.6);
      expect(group.children.some(child => child instanceof THREE.InstancedMesh)).toBe(true);
      group.traverse(child => {
        if (child instanceof THREE.Mesh) expect(child.material.map).toBeNull();
      });
    }
    model.dispose();
  });

  it('assembles entire chassis and pulls only the selected layer forward', () => {
    const model = createRackModel();
    model.pose(1, null);
    const top = model.groups.compute.position.y;
    const bottom = model.groups.power.position.y;
    model.pose(0, 'storage');
    expect(model.groups.compute.position.y).toBeLessThan(top);
    expect(model.groups.compute.getObjectByName('compute-lid')?.position.y).toBe(0.31);
    expect(model.groups.power.position.y).toBeGreaterThan(bottom);
    expect(model.groups.storage.position.z).toBe(0.45);
    expect(model.groups.compute.position.z).toBe(0);
    model.pose(1, null);
    expect(model.groups.storage.position.z).toBe(0);
    model.dispose();
  });

  it('updates material colors without replacing geometry or losing selection', () => {
    const model = createRackModel();
    const chassis = model.groups.network.children.find(child => child instanceof THREE.Mesh) as THREE.Mesh<THREE.BufferGeometry, THREE.MeshLambertMaterial>;
    const shape = chassis.geometry;
    const light = chassis.material.color.getHex();
    model.setActive('network');
    model.setTheme('dark');
    expect(chassis.material.color.getHex()).not.toBe(light);
    expect(chassis.material.emissiveIntensity).toBeGreaterThan(0);
    expect(chassis.geometry).toBe(shape);
    model.setActive(null);
    expect(chassis.material.emissiveIntensity).toBe(0);
    model.dispose();
  });

  it('releases shared GPU resources once per model disposal', () => {
    const model = createRackModel();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    model.root.traverse(child => {
      if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
        geometries.add(child.geometry);
        for (const material of Array.isArray(child.material) ? child.material : [child.material]) materials.add(material);
      }
    });
    let disposed = 0;
    [...geometries, ...materials].forEach(resource => resource.addEventListener('dispose', () => disposed++));
    model.dispose();
    expect(disposed).toBe(geometries.size + materials.size);
  });
});
