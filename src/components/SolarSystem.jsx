import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

function Sun() {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    glowRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 2) * 0.03);
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.15} />
      </mesh>
      <pointLight intensity={2} distance={80} color="#F59E0B" />
      <pointLight intensity={0.5} distance={100} color="#F59E0B" />
      <mesh ref={meshRef}>
        <sphereGeometry args={[3.5, 64, 64]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={1.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function Planet({ planet, isSelected, onClick }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * planet.orbitSpeed * 0.3 + initialAngle;
    const r = planet.orbitRadius;
    meshRef.current.position.x = Math.cos(t) * r;
    meshRef.current.position.z = Math.sin(t) * r;
    meshRef.current.rotation.y += 0.01;
    if (ringRef.current) {
      ringRef.current.position.x = Math.cos(t) * r;
      ringRef.current.position.z = Math.sin(t) * r;
    }
  });

  const scale = planet.size * 0.8 + 0.3;
  const [hovered, setHovered] = useState(false);

  return (
    <group>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.orbitRadius - 0.1, planet.orbitRadius + 0.1, 64]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={isSelected ? 0.25 : 0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(planet); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[scale, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.color}
          emissiveIntensity={hovered || isSelected ? 0.6 : 0.15}
          roughness={0.6}
          metalness={0.3}
        />
        {hovered && (
          <mesh>
            <sphereGeometry args={[scale * 1.3, 32, 32]} />
            <meshBasicMaterial color={planet.color} transparent opacity={0.15} />
          </mesh>
        )}
      </mesh>
      {hovered && (
        <sprite position={[0, scale + 1.5, 0]} scale={[5, 2, 1]}>
          <spriteMaterial>
            <canvasTexture
              attach="map"
              image={(() => {
                const c = document.createElement('canvas');
                c.width = 256; c.height = 64;
                const ctx = c.getContext('2d');
                ctx.fillStyle = 'rgba(0,0,0,0.6)';
                ctx.roundRect(0, 0, 256, 64, 16);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 28px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(planet.name, 128, 42);
                return c;
              })()}
            />
          </spriteMaterial>
        </sprite>
      )}
    </group>
  );
}

function CameraController({ selected }) {
  const { camera } = useThree();
  useEffect(() => {
    if (selected) {
      const targetZ = Math.min(selected.orbitRadius * 2.2 + 10, 70);
      camera.position.z = targetZ;
    } else {
      camera.position.z = 60;
    }
  }, [selected, camera]);
  return null;
}

function Stars() {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 3000; i++) {
      pos.push((Math.random() - 0.5) * 600);
      pos.push((Math.random() - 0.5) * 600);
      pos.push((Math.random() - 0.5) * 600);
    }
    return new Float32Array(pos);
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.8} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

export default function SolarSystem({ planets, selected, onSelect }) {
  return (
    <Canvas
      camera={{ position: [0, 20, 60], fov: 50 }}
      gl={{ antialias: true }}
      className="w-full h-full rounded-2xl"
    >
      <ambientLight intensity={0.2} />
      <Stars />
      <Sun />
      {planets.map(p => (
        <Planet
          key={p.id}
          planet={p}
          isSelected={selected?.id === p.id}
          onClick={onSelect}
        />
      ))}
      <CameraController selected={selected} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxDistance={120}
        minDistance={15}
        autoRotate={false}
      />
      <fog attach="fog" args={['#050814', 80, 200]} />
    </Canvas>
  );
}
