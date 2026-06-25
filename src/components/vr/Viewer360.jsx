import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { useThreeScene } from "@/lib/useThreeScene";
import { makeHotspotSprite } from "@/lib/spriteUtils";

function loadPanoramaTexture(url, onLoad, onError) {
  if (url.endsWith(".exr")) {
    new EXRLoader().load(url, (tex) => {
      tex.mapping = THREE.EquirectangularReflectionMapping;
      onLoad(tex);
    }, undefined, onError);
  } else {
    new THREE.TextureLoader().load(url, onLoad, undefined, onError);
  }
}

export default function Viewer360({ rooms, currentRoomId, onRoomChange }) {
  const mountRef       = useRef(null);
  const sceneRef       = useRef(null);
  const cylinderRef    = useRef(null);
  const hotspotsRef    = useRef([]);
  const hotspotDataRef = useRef([]);
  const rafRef         = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;
    const three = useThreeScene(mountRef.current);
    sceneRef.current = three;

    const geo = new THREE.SphereGeometry(500, 60, 40);
    const mat = new THREE.MeshBasicMaterial({ side: THREE.BackSide });

    const firstPanorama = rooms[0]?.panorama ?? "";
    if (firstPanorama) {
      loadPanoramaTexture(
        firstPanorama,
        (tex) => {
          mat.map = tex;
          mat.needsUpdate = true;
          setIsLoading(false);
          setOpacity(1);
        },
        () => setIsLoading(false)
      );
    } else {
      setIsLoading(false);
      setOpacity(1);
    }

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

    setOpacity(0);
    setIsLoading(true);

    const mat = cylinderRef.current.material;
    loadPanoramaTexture(
      room.panorama,
      (tex) => {
        mat.map = tex;
        mat.needsUpdate = true;
        setIsLoading(false);
        setTimeout(() => setOpacity(1), 50);
      },
      () => {
        setIsLoading(false);
        setOpacity(1);
      }
    );
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
    <div className="relative w-full h-full">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ opacity, transition: "opacity 0.4s ease" }}
        onClick={handleClick}
      />

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3 pointer-events-none">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60 text-sm">Loading panorama…</p>
        </div>
      )}
    </div>
  );
}
