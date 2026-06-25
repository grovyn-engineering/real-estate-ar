import React, { useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';
import { assetUrl } from '@/config/assets';
import './ThreeDView.css';

const modelUrl = assetUrl('/models/Home.glb');

const COLORS = {
    wall: 0xe8e4df,
    floor: 0xc4b8a8,
    ceiling: 0xf5f3ef,
    trim: 0xd4af37,
    accent: 0xb8a88a,
};

function Model() {
    const { scene } = useGLTF(modelUrl);
    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        clone.traverse((node) => {
            if (node.isMesh && node.material) {
                const mats = Array.isArray(node.material) ? node.material : [node.material];
                const hasTexture = mats.some((m) => m?.map);
                if (!hasTexture) {
                    const box = new THREE.Box3().setFromObject(node);
                    const center = new THREE.Vector3();
                    box.getCenter(center);
                    let color = COLORS.wall;
                    if (center.y < 0.3) color = COLORS.floor;
                    else if (center.y > 2.5) color = COLORS.ceiling;
                    else if (node.geometry?.boundingSphere?.radius < 0.5) color = COLORS.trim;
                    const newMat = new THREE.MeshStandardMaterial({
                        color,
                        roughness: 0.7,
                        metalness: 0.1,
                    });
                    mats.forEach((m) => m.dispose?.());
                    node.material = newMat;
                }
            }
        });
        return clone;
    }, [scene]);
    return <primitive object={clonedScene} />;
}

function ThreeDContent() {
    return (
        <Stage environment="apartment" intensity={0.7} contactShadow shadows>
            <Model />
        </Stage>
    );
}

function LoaderFallback() {
    return (
        <div className="threed-loader">
            <div className="threed-spinner" />
            <span>Loading 3D Model...</span>
        </div>
    );
}

const ThreeDView = () => {
    return (
        <div className="threed-view-wrapper">
            <Suspense fallback={<LoaderFallback />}>
                <Canvas
                    camera={{ position: [6, 4, 8], fov: 50 }}
                    style={{ width: '100%', height: '100%', display: 'block', background: '#f1f5f9' }}
                    gl={{ antialias: true }}
                >
                    <ThreeDContent />
                    <OrbitControls
                        enablePan
                        enableDamping
                        dampingFactor={0.05}
                        maxPolarAngle={Math.PI / 2}
                        minDistance={2}
                        maxDistance={25}
                    />
                </Canvas>
            </Suspense>
            <div className="threed-overlay">
                <p>Interactive 3D Interior</p>
                <span>Drag to Rotate · Scroll to Zoom · Right-click to Pan</span>
            </div>
        </div>
    );
};

useGLTF.preload(modelUrl);

export default ThreeDView;
