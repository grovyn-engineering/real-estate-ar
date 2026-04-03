import * as THREE from "three";
import { makeLabelSprite } from "./spriteUtils";

const COLORS = {
  floor:         0xf5f0e8,
  floorSelected: 0xdce8ff,
  wall:          0x8899aa,
  wallSelected:  0x3366ff,
};

export function buildFloorRooms(scene, rooms, currentRoomId) {
  const entries = [];

  rooms.forEach((room) => {
    const [rx, rz, rw, rd] = room.bounds;
    const isSelected = room.id === currentRoomId;

    const geo  = new THREE.BoxGeometry(rw, 0.2, rd);
    const mat  = new THREE.MeshLambertMaterial({ color: isSelected ? COLORS.floorSelected : COLORS.floor });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(rx + rw / 2, 0, rz + rd / 2);
    mesh.receiveShadow = true;
    scene.add(mesh);
    entries.push({ mesh, roomId: room.id });

    const edges     = new THREE.EdgesGeometry(geo);
    const edgeMat   = new THREE.LineBasicMaterial({ color: isSelected ? COLORS.wallSelected : COLORS.wall });
    const wireframe = new THREE.LineSegments(edges, edgeMat);
    wireframe.position.copy(mesh.position);
    scene.add(wireframe);

    const sprite = makeLabelSprite(room.name, isSelected);
    sprite.position.set(rx + rw / 2, 2, rz + rd / 2);
    sprite.scale.set(rw * 0.8, 1.5, 1);
    scene.add(sprite);
  });

  return entries;
}
