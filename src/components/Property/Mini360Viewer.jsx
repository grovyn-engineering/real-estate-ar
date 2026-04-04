import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '../../lib/useThreeScene';

export default function Mini360Viewer({ src }) {
    const mountRef = useRef(null);
    const rafRef   = useRef(0);
    const dragging = useRef(false);

    useEffect(() => {
        if (!mountRef.current) return;
        const three = useThreeScene(mountRef.current);
        const { scene, camera, renderer, controls, cleanup } = three;

        controls.rotateSpeed = -0.4;
        controls.autoRotate  = false;

        const geo = new THREE.SphereGeometry(500, 60, 40);
        const mat = new THREE.MeshBasicMaterial({ side: THREE.BackSide });
        new THREE.TextureLoader().load(src, (tex) => {
            mat.map = tex;
            mat.needsUpdate = true;
        });
        const sphere = new THREE.Mesh(geo, mat);
        scene.add(sphere);

        let autoYaw = 0;

        const el = renderer.domElement;
        const onPointerDown = () => { dragging.current = true; };
        const onPointerUp   = () => { dragging.current = false; };
        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('pointerup',   onPointerUp);

        const animate = () => {
            rafRef.current = requestAnimationFrame(animate);
            if (!dragging.current) {
                autoYaw += 0.0015;
                camera.position.x = Math.sin(autoYaw) * 0.01;
                camera.position.z = Math.cos(autoYaw) * 0.01;
                camera.lookAt(Math.sin(autoYaw + 0.5) * 10, 0, Math.cos(autoYaw + 0.5) * 10);
            }
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(rafRef.current);
            el.removeEventListener('pointerdown', onPointerDown);
            el.removeEventListener('pointerup',   onPointerUp);
            cleanup();
        };
    }, [src]);

    return (
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    );
}
