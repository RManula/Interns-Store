"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function OpportunityCard({
  position,
  color,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  rotation?: [number, number, number];
  scale?: number;
}) {
  return (
    <Float speed={1.7} rotationIntensity={0.18} floatIntensity={0.45}>
      <group position={position} rotation={rotation} scale={scale}>
        <RoundedBox args={[2.45, 1.42, 0.14]} radius={0.14} smoothness={4}>
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.03} />
        </RoundedBox>
        <mesh position={[-0.82, 0.37, 0.09]}>
          <circleGeometry args={[0.19, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0.2, 0.43, 0.09]}>
          <boxGeometry args={[1.3, 0.12, 0.03]} />
          <meshStandardMaterial color="#14346b" />
        </mesh>
        <mesh position={[0.02, 0.15, 0.09]}>
          <boxGeometry args={[1.65, 0.08, 0.03]} />
          <meshStandardMaterial color="#b9c7df" />
        </mesh>
        <mesh position={[-0.23, -0.08, 0.09]}>
          <boxGeometry args={[1.15, 0.08, 0.03]} />
          <meshStandardMaterial color="#d7e0ef" />
        </mesh>
        <RoundedBox
          args={[0.88, 0.27, 0.04]}
          radius={0.1}
          smoothness={4}
          position={[-0.54, -0.43, 0.1]}
        >
          <meshStandardMaterial color={color} />
        </RoundedBox>
      </group>
    </Float>
  );
}

function OrbitingScene() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.14,
      0.035,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.08,
      0.035,
    );
  });

  return (
    <group ref={group}>
      <OpportunityCard
        position={[-1.05, 0.82, 0]}
        rotation={[0.1, 0.18, -0.08]}
        color="#246bfe"
      />
      <OpportunityCard
        position={[1.05, -0.15, 0.4]}
        rotation={[-0.1, -0.2, 0.08]}
        color="#ff6b4a"
        scale={0.9}
      />
      <OpportunityCard
        position={[-0.55, -1.25, -0.5]}
        rotation={[0.1, 0.28, -0.03]}
        color="#22c7a9"
        scale={0.72}
      />
      <mesh position={[0.15, 0.1, -1.4]}>
        <torusGeometry args={[2.15, 0.018, 16, 100]} />
        <meshBasicMaterial color="#4b8dff" transparent opacity={0.35} />
      </mesh>
      <Sparkles count={36} scale={[6, 5, 3]} size={2.4} speed={0.35} color="#9dc1ff" />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="h-full min-h-[430px] w-full" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[4, 6, 5]} intensity={2.4} color="#dfeaff" />
        <pointLight position={[-4, -2, 3]} intensity={18} color="#246bfe" />
        <OrbitingScene />
      </Canvas>
    </div>
  );
}
