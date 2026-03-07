import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './ThreeDView.css';

const ThreeDView = ({ propertyType }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // ── Scene ────────────────────────────────────────────────
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0b);
        scene.fog = new THREE.Fog(0x0a0a0b, 15, 55);

        const camera = new THREE.PerspectiveCamera(
            70,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(8, 5, 10);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.9;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxPolarAngle = Math.PI / 2.1;
        controls.minDistance = 3;
        controls.maxDistance = 20;

        // ── Materials ────────────────────────────────────────────
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x1e1e22, roughness: 0.9 });
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.08, metalness: 0.25 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.85, roughness: 0.15 });

        const sofaColor = propertyType === 'Villa' ? 0x2c3e50 : propertyType === 'Penthouse' ? 0x1a2535 : 0x334155;
        const sofaMat = new THREE.MeshStandardMaterial({ color: sofaColor, roughness: 0.85 });
        const cushionMat = new THREE.MeshStandardMaterial({ color: sofaColor + 0x111111, roughness: 0.8 });

        // ── Floor ────────────────────────────────────────────────
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Floor rug
        const rug = new THREE.Mesh(
            new THREE.PlaneGeometry(9, 6),
            new THREE.MeshStandardMaterial({ color: 0x1e1e2e, roughness: 0.98 })
        );
        rug.rotation.x = -Math.PI / 2;
        rug.position.set(-2, 0.005, -2.5);
        scene.add(rug);

        // ── Walls ────────────────────────────────────────────────
        const backWall = new THREE.Mesh(new THREE.BoxGeometry(22, 9, 0.4), wallMat);
        backWall.position.set(0, 4.5, -9);
        backWall.receiveShadow = true;
        scene.add(backWall);

        const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 9, 22), wallMat);
        leftWall.position.set(-9, 4.5, 0);
        leftWall.receiveShadow = true;
        scene.add(leftWall);

        // Ceiling
        const ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(22, 22),
            new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 1.0 })
        );
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.set(-0.5, 9, -1);
        scene.add(ceiling);

        // ── Sofa ─────────────────────────────────────────────────
        const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.75, 2.6), sofaMat);
        sofaBase.position.set(-2, 0.375, -4);
        sofaBase.castShadow = true;
        scene.add(sofaBase);

        const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(6.2, 1.3, 0.5), sofaMat);
        sofaBack.position.set(-2, 1.3, -5.1);
        sofaBack.castShadow = true;
        scene.add(sofaBack);

        // Arm rests
        [-2.85, 2.85].forEach(x => {
            const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 2.6), sofaMat);
            arm.position.set(-2 + x, 0.75, -4);
            arm.castShadow = true;
            scene.add(arm);
        });

        // Cushions
        [-1.8, 0, 1.8].forEach(x => {
            const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.48, 2.0), cushionMat);
            cushion.position.set(-2 + x, 0.99, -4);
            cushion.castShadow = true;
            scene.add(cushion);
        });

        // Back cushions
        [-1.8, 0, 1.8].forEach(x => {
            const bc = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 0.4), cushionMat);
            bc.position.set(-2 + x, 1.3, -4.85);
            bc.castShadow = true;
            scene.add(bc);
        });

        // ── Coffee Table ─────────────────────────────────────────
        const tableTop = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.1, 1.7), goldMat);
        tableTop.position.set(-2, 0.55, -1.4);
        tableTop.castShadow = true;
        scene.add(tableTop);

        // Legs
        [[-1.2, -0.6], [1.2, -0.6], [-1.2, 0.6], [1.2, 0.6]].forEach(([x, z]) => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.5, 8), goldMat);
            leg.position.set(-2 + x, 0.25, -1.4 + z);
            scene.add(leg);
        });

        // Decorative bowl on table
        const bowl = new THREE.Mesh(
            new THREE.SphereGeometry(0.22, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
            new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.9, roughness: 0.1, side: THREE.DoubleSide })
        );
        bowl.position.set(-2, 0.62, -1.4);
        scene.add(bowl);

        // ── Floor Lamp ───────────────────────────────────────────
        const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 0.08, 16), goldMat);
        lampBase.position.set(3.5, 0.04, -3);
        scene.add(lampBase);

        const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 5.5, 8), goldMat);
        lampPole.position.set(3.5, 2.8, -3);
        scene.add(lampPole);

        const lampHead = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.55, 0.7, 16, 1, true),
            new THREE.MeshStandardMaterial({ color: 0xf5f0e0, emissive: 0xffeeaa, emissiveIntensity: 0.35, side: THREE.DoubleSide })
        );
        lampHead.position.set(3.5, 5.7, -3);
        scene.add(lampHead);

        // ── Art on back wall ─────────────────────────────────────
        // Frame
        const artInner = new THREE.Mesh(
            new THREE.PlaneGeometry(3.2, 4.2),
            new THREE.MeshStandardMaterial({ color: 0x0f1117, roughness: 0.5 })
        );
        artInner.position.set(1.5, 4.5, -8.78);
        scene.add(artInner);

        // Gold border strips
        [[3.6, 0.08, 0], [3.6, 0.08, 0], [0.08, 4.4, 0]].forEach(() => {}); // skip, use frame mesh
        const artFrame = new THREE.Mesh(
            new THREE.PlaneGeometry(3.6, 4.6),
            new THREE.MeshStandardMaterial({ color: 0xD4AF37, emissive: 0xD4AF37, emissiveIntensity: 0.12 })
        );
        artFrame.position.set(1.5, 4.5, -8.8);
        scene.add(artFrame);

        // ── Side table ───────────────────────────────────────────
        const sideTable = new THREE.Mesh(
            new THREE.CylinderGeometry(0.4, 0.35, 0.55, 16),
            new THREE.MeshStandardMaterial({ color: 0x2a2a2e, roughness: 0.6 })
        );
        sideTable.position.set(1.2, 0.275, -4);
        sideTable.castShadow = true;
        scene.add(sideTable);

        const sideTableTop = new THREE.Mesh(
            new THREE.CylinderGeometry(0.42, 0.42, 0.04, 16),
            goldMat
        );
        sideTableTop.position.set(1.2, 0.57, -4);
        scene.add(sideTableTop);

        // ── Window light slits on left wall ─────────────────────
        const winMat = new THREE.MeshStandardMaterial({
            color: 0xfff0dd,
            emissive: 0xfff0dd,
            emissiveIntensity: 0.55,
            side: THREE.DoubleSide,
        });
        [0, 2.8, 5.6].forEach(z => {
            const win = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 5.5), winMat);
            win.position.set(-8.78, 4, -1.5 + z);
            win.rotation.y = Math.PI / 2;
            scene.add(win);
        });

        // ── Lighting ─────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));

        const sunLight = new THREE.PointLight(0xffcc77, 180, 45);
        sunLight.position.set(10, 12, 6);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 1024;
        sunLight.shadow.mapSize.height = 1024;
        scene.add(sunLight);

        const fillLight = new THREE.PointLight(0xaabbff, 40, 18);
        fillLight.position.set(-5, 7, -4);
        scene.add(fillLight);

        const lampLight = new THREE.PointLight(0xffeeaa, 35, 8);
        lampLight.position.set(3.5, 5.5, -3);
        scene.add(lampLight);

        const artLight = new THREE.SpotLight(0xffffff, 60, 10, Math.PI / 6, 0.4);
        artLight.position.set(1.5, 8.5, -6);
        artLight.target.position.set(1.5, 4.5, -8.8);
        scene.add(artLight);
        scene.add(artLight.target);

        // ── Animation ────────────────────────────────────────────
        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // ── Resize ───────────────────────────────────────────────
        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [propertyType]);

    return (
        <div className="threed-view-wrapper">
            <div ref={containerRef} className="threed-canvas" />
            <div className="threed-overlay">
                <p>Interactive 3D Interior</p>
                <span>Drag to Rotate · Scroll to Zoom · Right-click to Pan</span>
            </div>
        </div>
    );
};

export default ThreeDView;
