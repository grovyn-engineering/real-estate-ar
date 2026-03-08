import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function HouseModel() {
    const groupRef = useRef();
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
                <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
                    <boxGeometry args={[1.8, 1.2, 1.4]} />
                    <meshStandardMaterial
                        color="#e8e4df"
                        roughness={0.6}
                        metalness={0.1}
                        emissive="#2a2520"
                    />
                </mesh>
                <mesh castShadow position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <coneGeometry args={[1.3, 0.8, 4]} />
                    <meshStandardMaterial
                        color="#c4a35a"
                        roughness={0.5}
                        metalness={0.2}
                        emissive="#3d3528"
                    />
                </mesh>
                <mesh castShadow position={[0, 0.2, 0.71]}>
                    <boxGeometry args={[0.8, 1, 0.05]} />
                    <meshStandardMaterial
                        color="#1a1a1a"
                        roughness={0.8}
                        metalness={0.1}
                        emissive="#0a0a0a"
                    />
                </mesh>
                <mesh castShadow position={[-0.5, 0.4, 0.71]}>
                    <boxGeometry args={[0.35, 0.5, 0.05]} />
                    <meshStandardMaterial
                        color="#2a2520"
                        roughness={0.7}
                        metalness={0.1}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
                <mesh castShadow position={[0.5, 0.4, 0.71]}>
                    <boxGeometry args={[0.35, 0.5, 0.05]} />
                    <meshStandardMaterial
                        color="#2a2520"
                        roughness={0.7}
                        metalness={0.1}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            </group>
        </Float>
    );
}

export default function Hero3DScene() {
    return (
        <div className="hero-3d-container">
            <Canvas
                camera={{ position: [0, 0.8, 3.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize={[512, 512]}
                    shadow-camera-far={20}
                    shadow-camera-left={-3}
                    shadow-camera-right={3}
                    shadow-camera-top={3}
                    shadow-camera-bottom={-3}
                />
                <directionalLight position={[-3, 2, 2]} intensity={0.5} />
                <pointLight position={[0, 3, 2]} intensity={0.6} color="#f5d580" />
                <HouseModel />
            </Canvas>
        </div>
    );
}
