import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { buildPlaceholderHouse } from "@/lib/placeholderHouse";

export default function GLBViewer({ modelPath }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    setProgress(0);
    setLoaded(false);
    setError(false);

    let rafId;
    let renderer;
    let resizeObserver;

    const setup = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;

      resizeObserver?.disconnect();

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x080f20);

      const camera = new THREE.PerspectiveCamera(75, w / h, 0.05, 500);
      camera.position.set(5, 3, 8);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 2.0;
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.target.set(0, 1, 0);

      scene.add(new THREE.AmbientLight(0xffffff, 3.0));
      const fill = new THREE.DirectionalLight(0xffffff, 2.0);
      fill.position.set(10, 20, 10);
      scene.add(fill);
      const fill2 = new THREE.DirectionalLight(0xffffff, 1.0);
      fill2.position.set(-10, 5, -10);
      scene.add(fill2);

      if (modelPath) {
        const draco = new DRACOLoader();
        draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
        const loader = new GLTFLoader();
        loader.setDRACOLoader(draco);

        loader.load(
          modelPath,
          (gltf) => {
            const model = gltf.scene;
            model.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

            const raw = new THREE.Box3().setFromObject(model);
            const rawSize = new THREE.Vector3(); raw.getSize(rawSize);
            const rawCenter = new THREE.Vector3(); raw.getCenter(rawCenter);
            const scale = 10 / Math.max(rawSize.x, rawSize.z);
            model.scale.setScalar(scale);
            model.position.sub(rawCenter.multiplyScalar(scale));
            const grounded = new THREE.Box3().setFromObject(model);
            model.position.y -= grounded.min.y;
            scene.add(model);

            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3(); box.getSize(size);
            const cx = (box.min.x + box.max.x) / 2;
            const cz = (box.min.z + box.max.z) / 2;
            const eyeY = box.min.y + Math.min(1.65, size.y * 0.45);

            camera.position.set(cx, eyeY, cz + size.z * 0.15);
            camera.near = 0.05;
            camera.far = Math.max(size.x, size.y, size.z) * 6;
            camera.updateProjectionMatrix();

            controls.target.set(cx, eyeY, cz - size.z * 0.25);
            controls.minDistance = 0.1;
            controls.maxDistance = Math.max(size.x, size.z) * 1.5;
            controls.update();

            setLoaded(true);
          },
          (xhr) => {
            if (xhr.total > 0) {
              setProgress(Math.round((xhr.loaded / xhr.total) * 100));
            }
          },
          () => {
            setError(true);
            setLoaded(true);
          }
        );
      } else {
        buildPlaceholderHouse(scene);
        setLoaded(true);
      }

      const handleResize = () => {
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        if (!nw || !nh) return;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener("resize", handleResize);

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      container._glbCleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", handleResize);
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        renderer.dispose();
        delete container._glbCleanup;
      };
    };

    setup();
    if (!renderer) {
      resizeObserver = new ResizeObserver(() => { if (!renderer) setup(); });
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver?.disconnect();
      container._glbCleanup?.();
    };
  }, [modelPath]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mountRef}
        className="w-full h-full"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
      />

      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080f20] gap-4">
          <div className="relative w-16 h-16">
            <svg className="animate-spin w-16 h-16" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <circle
                cx="32" cy="32" r="28"
                stroke="white" strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28 * progress / 100} ${2 * Math.PI * 28}`}
                transform="rotate(-90 32 32)"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {progress}%
            </span>
          </div>
          <p className="text-white/60 text-sm">Loading 3D Model…</p>
        </div>
      )}

      {!modelPath && loaded && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-yellow-500/90 text-black text-xs font-semibold px-3 py-1.5 rounded-full">
          Demo 3D Model - No GLB uploaded for this property
        </div>
      )}

      {error && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          Failed to load model
        </div>
      )}

      {loaded && (
        <div className="absolute bottom-3 right-3 text-white/40 text-xs">
          Drag to orbit · Scroll to zoom
        </div>
      )}
    </div>
  );
}
