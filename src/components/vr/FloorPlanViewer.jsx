import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function makeLabel(text, hovered) {
  const W = 560, H = 120;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  const r = 28;

  if (hovered) {
    ctx.shadowColor = "rgba(255,255,255,0.5)"; ctx.shadowBlur = 28;
    ctx.fillStyle = "rgba(255,255,255,0.97)";
  } else {
    ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowBlur = 16;
    ctx.fillStyle = "rgba(14,14,14,0.82)";
  }
  ctx.beginPath();
  ctx.moveTo(r,0); ctx.lineTo(W-r,0); ctx.quadraticCurveTo(W,0,W,r);
  ctx.lineTo(W,H-r); ctx.quadraticCurveTo(W,H,W-r,H);
  ctx.lineTo(r,H); ctx.quadraticCurveTo(0,H,0,H-r);
  ctx.lineTo(0,r); ctx.quadraticCurveTo(0,0,r,0);
  ctx.closePath(); ctx.fill();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = hovered ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";
  ctx.lineWidth = 2; ctx.stroke();

  ctx.fillStyle = hovered ? "#111" : "#fff";
  ctx.font = `${hovered ? "700" : "600"} 44px -apple-system,'Segoe UI',sans-serif`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(hovered ? `Enter ${text}` : text, W / 2, H / 2);

  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(canvas),
    transparent: true,
    depthTest: false,
  }));
  sp.scale.set(3.8, 0.82, 1);
  return sp;
}

export default function FloorPlanViewer({ rooms, onEnterRoom }) {
  const mountRef   = useRef(null);
  const onEnterRef = useRef(onEnterRoom);
  onEnterRef.current = onEnterRoom;

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080f20);
    scene.fog = new THREE.Fog(0x080f20, 38, 80);

    const camera = new THREE.PerspectiveCamera(
      48, container.clientWidth / container.clientHeight, 0.01, 200
    );
    camera.position.set(0, 15, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.3));
    const sun = new THREE.DirectionalLight(0xffffff, 1.5);
    sun.position.set(8, 20, 8); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); scene.add(sun);
    const fill = new THREE.DirectionalLight(0xaaccff, 0.5);
    fill.position.set(-10, 5, -10); scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.07;
    controls.minPolarAngle = 0.2; controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 5; controls.maxDistance = 45;

    const zones = [];
    let splitAxis = "x";
    const modelMeshes = [];

    new GLTFLoader().load("/models/low-poly-house/scene.gltf", (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true; child.receiveShadow = true;
          modelMeshes.push(child);
        }
      });

      const raw = new THREE.Box3().setFromObject(model);
      const rawSize = new THREE.Vector3(); raw.getSize(rawSize);
      const rawCenter = new THREE.Vector3(); raw.getCenter(rawCenter);
      const scale = 10 / Math.max(rawSize.x, rawSize.z);
      model.scale.setScalar(scale);
      model.position.sub(rawCenter.multiplyScalar(scale));
      const b2 = new THREE.Box3().setFromObject(model);
      model.position.y -= b2.min.y;
      scene.add(model);

      const box = new THREE.Box3().setFromObject(model);
      const sz  = new THREE.Vector3(); box.getSize(sz);
      const mc  = new THREE.Vector3(); box.getCenter(mc);

      controls.target.copy(mc);
      camera.position.set(mc.x, mc.y + 12, mc.z + 14);
      controls.update();

      splitAxis = sz.x >= sz.z ? "x" : "z";
      const mainLen  = splitAxis === "x" ? sz.x : sz.z;
      const crossLen = splitAxis === "x" ? sz.z : sz.x;
      const mainMin  = splitAxis === "x" ? box.min.x : box.min.z;
      const crossMin = splitAxis === "x" ? box.min.z : box.min.x;
      const sliceLen = mainLen / rooms.length;
      const floorY   = box.min.y + 0.12;
      const labelY   = box.max.y + 1.3;

      rooms.forEach((room, i) => {
        const sMin = mainMin + i * sliceLen;
        const sMax = sMin + sliceLen;
        const sCx  = sMin + sliceLen / 2;
        const cCx  = crossMin + crossLen / 2;

        const cx = splitAxis === "x" ? sCx : cCx;
        const cz = splitAxis === "x" ? cCx : sCx;
        const hw = (splitAxis === "x" ? sliceLen : crossLen) / 2 - 0.05;
        const hd = (splitAxis === "x" ? crossLen : sliceLen) / 2 - 0.05;

        const ovGeo = new THREE.BoxGeometry(hw * 2, 0.18, hd * 2);
        const ovMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          depthTest: false,
          depthWrite: false,
        });
        const overlay = new THREE.Mesh(ovGeo, ovMat);
        overlay.position.set(cx, floorY, cz);
        overlay.renderOrder = 2;
        scene.add(overlay);

        const bPts = [
          new THREE.Vector3(-hw, 0, -hd),
          new THREE.Vector3( hw, 0, -hd),
          new THREE.Vector3( hw, 0,  hd),
          new THREE.Vector3(-hw, 0,  hd),
        ];
        const bGeo = new THREE.BufferGeometry().setFromPoints(bPts);
        const bMat = new THREE.LineBasicMaterial({
          color: 0xffffff, transparent: true, opacity: 0.2, depthTest: false,
        });
        const border = new THREE.LineLoop(bGeo, bMat);
        border.position.set(cx, floorY + 0.1, cz);
        border.renderOrder = 3;
        scene.add(border);

        const labelIdle  = makeLabel(room.name, false);
        labelIdle.position.set(cx, labelY, cz);
        scene.add(labelIdle);

        const labelHover = makeLabel(room.name, true);
        labelHover.position.set(cx, labelY, cz);
        labelHover.visible = false;
        scene.add(labelHover);

        zones.push({
          roomId: room.id, name: room.name,
          min: sMin, max: sMax,
          overlay, border, labelIdle, labelHover,
          opCurrent: 0, opTarget: 0,
        });
      });

      for (let i = 1; i < rooms.length; i++) {
        const divAt = mainMin + i * sliceLen;
        const p1 = splitAxis === "x"
          ? new THREE.Vector3(divAt, floorY + 0.12, crossMin)
          : new THREE.Vector3(crossMin, floorY + 0.12, divAt);
        const p2 = splitAxis === "x"
          ? new THREE.Vector3(divAt, floorY + 0.12, crossMin + crossLen)
          : new THREE.Vector3(crossMin + crossLen, floorY + 0.12, divAt);
        const dGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        const dMat = new THREE.LineBasicMaterial({
          color: 0xffffff, transparent: true, opacity: 0.12, depthTest: false,
        });
        const divLine = new THREE.Line(dGeo, dMat);
        divLine.renderOrder = 3;
        scene.add(divLine);
      }
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredIdx = -1;

    function zoneIndexForPoint(pt) {
      const coord = splitAxis === "x" ? pt.x : pt.z;
      return zones.findIndex((z) => coord >= z.min && coord < z.max);
    }

    function setHover(idx) {
      if (idx === hoveredIdx) return;

      if (hoveredIdx >= 0) {
        zones[hoveredIdx].opTarget = 0;
        zones[hoveredIdx].labelIdle.visible  = true;
        zones[hoveredIdx].labelHover.visible = false;
        zones[hoveredIdx].border.material.opacity = 0.2;
      }

      hoveredIdx = idx;

      if (idx >= 0) {
        zones[idx].opTarget = 0.45;
        zones[idx].labelIdle.visible  = false;
        zones[idx].labelHover.visible = true;
        zones[idx].border.material.opacity = 1.0;
        container.style.cursor = "pointer";
      } else {
        container.style.cursor = "grab";
      }
    }

    const onMouseMove = (e) => {
      if (!modelMeshes.length) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.set(
        ((e.clientX - rect.left) / rect.width)  *  2 - 1,
        ((e.clientY - rect.top)  / rect.height) * -2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(modelMeshes, false);
      setHover(hits.length ? zoneIndexForPoint(hits[0].point) : -1);
    };

    const onClick = (e) => {
      if (!modelMeshes.length) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.set(
        ((e.clientX - rect.left) / rect.width)  *  2 - 1,
        ((e.clientY - rect.top)  / rect.height) * -2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(modelMeshes, false);
      if (hits.length) {
        const idx = zoneIndexForPoint(hits[0].point);
        if (idx >= 0) onEnterRef.current(zones[idx].roomId);
      }
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onClick);

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      zones.forEach((z) => {
        z.opCurrent += (z.opTarget - z.opCurrent) * 0.18;
        const mat = z.overlay.material;
        if (Math.abs(mat.opacity - z.opCurrent) > 0.001) {
          mat.opacity = z.opCurrent;
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onClick);
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [rooms]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" style={{ cursor: "grab" }} />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full border border-white/20 backdrop-blur pointer-events-none">
        Hover a room · Click to enter 360°
      </div>
    </div>
  );
}
