import * as THREE from "three";

export function buildPlaceholderHouse(scene) {
  const wallMat = new THREE.MeshLambertMaterial({ color: 0xe8d5b7 });
  const roofMat = new THREE.MeshLambertMaterial({ color: 0x8b3a3a });
  const winMat  = new THREE.MeshLambertMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.7 });
  const doorMat = new THREE.MeshLambertMaterial({ color: 0x5c3317 });

  const walls = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 5), wallMat);
  walls.position.y = 1.5;
  scene.add(walls);

  const roof = new THREE.Mesh(new THREE.CylinderGeometry(0, 4.5, 2, 4), roofMat);
  roof.position.y = 4;
  roof.rotation.y = Math.PI / 4;
  scene.add(roof);

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 0.1), doorMat);
  door.position.set(0, 0.9, 2.55);
  scene.add(door);

  for (const x of [-2, 2]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.1), winMat);
    win.position.set(x, 1.5, 2.55);
    scene.add(win);
  }
}
