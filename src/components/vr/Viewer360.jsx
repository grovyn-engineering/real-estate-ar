import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { useThreeScene } from "@/lib/useThreeScene";
import { makeHotspotSprite } from "@/lib/spriteUtils";

function loadPanoramaTexture(url, onLoad) {
  if (url.endsWith(".exr")) {
    new EXRLoader().load(url, (tex) => {
      tex.mapping = THREE.EquirectangularReflectionMapping;
      onLoad(tex);
    });
  } else {
    new THREE.TextureLoader().load(url, onLoad);
  }
}

export default function Viewer360({ rooms, currentRoomId, onRoomChange }) {
  const mountRef       = useRef(null);
  const sceneRef       = useRef(null);
  const cylinderRef    = useRef(null);
  const hotspotsRef    = useRef([]);
  const hotspotDataRef = useRef([]);
  const rafRef         = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;
    const three = useThreeScene(mountRef.current);
    sceneRef.current = three;

    const geo      = new THREE.SphereGeometry(500, 60, 40);
    const mat      = new THREE.MeshBasicMaterial({ side: THREE.BackSide });
    loadPanoramaTexture(rooms[0]?.panorama ?? "", (tex) => { mat.map = tex; mat.needsUpdate = true; });
    const cylinder = new THREE.Mesh(geo, mat);
    three.scene.add(cylinder);
    cylinderRef.current = cylinder;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      three.controls.update();
      three.renderer.render(three.scene, three.camera);
    };
    animate();

    return () => { cancelAnimationFrame(rafRef.current); three.cleanup(); };
  }, []);

  useEffect(() => {
    const room = rooms.find((r) => r.id === currentRoomId);
    if (!room || !cylinderRef.current) return;
    const mat = cylinderRef.current.material;
    loadPanoramaTexture(room.panorama, (tex) => { mat.map = tex; mat.needsUpdate = true; });
  }, [currentRoomId, rooms]);

  useEffect(() => {
    if (!sceneRef.current) return;
    const { scene } = sceneRef.current;

    hotspotsRef.current.forEach((s) => scene.remove(s));
    hotspotsRef.current    = [];
    hotspotDataRef.current = [];

    const room = rooms.find((r) => r.id === currentRoomId);
    room?.hotspots.forEach((h) => {
      const sprite = makeHotspotSprite(h.label);
      sprite.position.set(h.position[0] * 30, h.position[1] * 30 + 20, h.position[2] * 30);
      scene.add(sprite);
      hotspotsRef.current.push(sprite);
      hotspotDataRef.current.push({ sprite, targetRoomId: h.targetRoomId });
    });
  }, [currentRoomId, rooms]);

  const handleClick = useCallback((e) => {
    if (!sceneRef.current || !mountRef.current) return;
    const { camera, renderer } = sceneRef.current;
    const rect  = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(hotspotsRef.current);
    if (hits.length > 0) {
      const data = hotspotDataRef.current.find((d) => d.sprite === hits[0].object);
      if (data) onRoomChange(data.targetRoomId);
    }
  }, [onRoomChange]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onClick={handleClick}
    />
  );
}
