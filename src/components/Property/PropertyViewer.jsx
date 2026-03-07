import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import './PropertyViewer.css';

const PropertyModel = ({ type }) => {
    // Placeholder for real 3D models. Using primitives to represent types.
    return (
        <mesh castShadow receiveShadow>
            {type === 'Villa' ? (
                <boxGeometry args={[2, 1, 3]} />
            ) : type === 'Penthouse' ? (
                <cylinderGeometry args={[1, 1, 4, 32]} />
            ) : (
                <sphereGeometry args={[1.5, 32, 32]} />
            )}
            <meshStandardMaterial color="#cba135" metalness={0.6} roughness={0.2} />
        </mesh>
    );
};

const PropertyViewer = ({ propertyType }) => {
    return (
        <div className="viewer-container">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5} contactShadow={false}>
                        <PropertyModel type={propertyType} />
                    </Stage>
                    <Environment preset="city" />
                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
                </Suspense>
                <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
            </Canvas>
            <div className="viewer-overlay">
                <p>Interactive 3D Walkthrough</p>
                <span>Drag to Rotate • Scroll to Zoom</span>
            </div>
        </div>
    );
};

export default PropertyViewer;
