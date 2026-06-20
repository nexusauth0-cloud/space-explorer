import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const TILT_ANGLE = 0.35;
const ELLIPTICITY = 0.15;

function Sun() {
  const meshRef = useRef();
  const glowOuterRef = useRef();
  const glowInnerRef = useRef();
  const bloomRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.05;
    glowOuterRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.02);
    glowInnerRef.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.025);
    bloomRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.04);
    bloomRef.current.material.opacity = 0.08 + Math.sin(t * 1.2) * 0.03;
  });

  return (
    <group>
      <mesh ref={bloomRef}>
        <sphereGeometry args={[14, 32, 32]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh ref={glowOuterRef}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh ref={glowInnerRef}>
        <sphereGeometry args={[5.5, 32, 32]} />
        <meshBasicMaterial color="#FBBF24" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      <pointLight intensity={3} distance={90} color="#F59E0B" decay={1} />
      <pointLight intensity={1} distance={120} color="#FBBF24" decay={0.5} />
      <pointLight intensity={0.3} distance={150} color="#F59E0B" decay={0.3} />
      <mesh ref={meshRef} rotation={[0, 0, 0]}>
        <sphereGeometry args={[3.5, 64, 64]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({ radius, color, isSelected, eccentricity }) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 96;
    const a = radius;
    const b = radius * (1 - eccentricity);
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(Math.cos(theta) * a);
      pts.push(0);
      pts.push(Math.sin(theta) * b);
    }
    return new Float32Array(pts);
  }, [radius, eccentricity]);

  const geomRef = useRef();

  useFrame(({ clock }) => {
    if (geomRef.current) {
      const pulse = isSelected ? 1 + Math.sin(clock.getElapsedTime() * 2) * 0.15 : 1;
      const positions = geomRef.current.attributes.position.array;
      const a = radius * pulse;
      const b = radius * (1 - eccentricity) * pulse;
      for (let i = 0; i <= 96; i++) {
        const theta = (i / 96) * Math.PI * 2;
        positions[i * 3] = Math.cos(theta) * a;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = Math.sin(theta) * b;
      }
      geomRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <line>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={isSelected ? 0.4 : 0.1}
        linewidth={isSelected ? 2 : 1}
      />
    </line>
  );
}

const Planet = React.memo(function Planet({ planet, isSelected, onClick, index, total }) {
  const meshRef = useRef();
  const pulseRef = useRef();
  const labelRef = useRef();
  const initialAngle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);
  const zOffset = useMemo(() => (Math.random() - 0.5) * 2, []);
  const eccentricity = ELLIPTICITY * (1 + Math.random() * 0.5);

  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * planet.orbitSpeed * 0.25 + initialAngle;
    const a = planet.orbitRadius;
    const b = planet.orbitRadius * (1 - eccentricity);

    const x = Math.cos(t) * a;
    const z = Math.sin(t) * b;
    const y = Math.sin(t * 0.5) * 0.3 + zOffset * 0.15;

    meshRef.current.position.set(x, y, z);
    meshRef.current.rotation.y += 0.015;

    if (labelRef.current) {
      labelRef.current.position.set(x, y + planet.size * 0.8 + 1, z);
    }

    if (isSelected && pulseRef.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.08;
      pulseRef.current.scale.setScalar(pulse);
    }
  });

  const scale = planet.size * 0.7 + 0.35;
  return (
    <group>
      <OrbitRing
        radius={planet.orbitRadius}
        color={planet.color}
        isSelected={isSelected}
        eccentricity={eccentricity}
      />
      <group
        ref={pulseRef}
        onClick={(e) => { e.stopPropagation(); onClick(planet); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        {isSelected && (
          <mesh>
            <sphereGeometry args={[scale * 1.6, 32, 32]} />
            <meshBasicMaterial
              color={planet.color}
              transparent
              opacity={0.08}
              depthWrite={false}
            />
          </mesh>
        )}
        <mesh ref={meshRef}>
          <sphereGeometry args={[scale, 32, 32]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={planet.color}
            emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.12}
            roughness={0.5}
            metalness={0.3}
            transparent
            opacity={isSelected ? 1 : hovered ? 0.95 : 0.75}
          />
        </mesh>
      </group>
    </group>
  );
});

function TwinklingStars() {
  const ref = useRef();
  const count = 1500;

  const [positions, sizes, opacities] = useMemo(() => {
    const pos = [];
    const sz = [];
    const op = [];
    for (let i = 0; i < count; i++) {
      pos.push((Math.random() - 0.5) * 600);
      pos.push((Math.random() - 0.5) * 600);
      pos.push((Math.random() - 0.5) * 600 - 100);
      sz.push(0.3 + Math.random() * 0.8);
      op.push(0.3 + Math.random() * 0.7);
    }
    return [
      new Float32Array(pos),
      new Float32Array(sz),
      new Float32Array(op),
    ];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.003;
      const opAttr = ref.current.geometry.attributes.opacity;
      const array = opAttr.array;
      for (let i = 0; i < count; i++) {
        array[i] = opacities[i] * (0.5 + 0.5 * Math.sin(clock.getElapsedTime() * (0.5 + i * 0.001) + i));
      }
      opAttr.needsUpdate = true;
    }
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
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-opacity"
          count={opacities.length}
          array={opacities}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.6}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingParticles() {
  const ref = useRef();
  const count = 200;

  const [positions, velocities] = useMemo(() => {
    const pos = [];
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos.push((Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400);
      vel.push((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02);
    }
    return [new Float32Array(pos), vel];
  }, []);

  useFrame(() => {
    if (ref.current) {
      const pos = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i * 3] += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        pos[i * 3 + 2] += velocities[i * 3 + 2];
        if (Math.abs(pos[i * 3]) > 200) velocities[i * 3] *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 200) velocities[i * 3 + 1] *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 200) velocities[i * 3 + 2] *= -1;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
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
      <pointsMaterial
        size={0.3}
        color="#3B82F6"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraController({ selected }) {
  const { camera } = useThree();
  const targetRef = useRef({ x: 0, y: 20, z: 60 });
  const lookRef = useRef({ x: 0, y: 0, z: 0 });

  useFrame(() => {
    const target = targetRef.current;
    camera.position.x += (target.x - camera.position.x) * 0.04;
    camera.position.y += (target.y - camera.position.y) * 0.04;
    camera.position.z += (target.z - camera.position.z) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    if (selected) {
      const dist = Math.min(selected.orbitRadius * 1.8 + 8, 55);
      const angle = selected.orbitRadius * 0.015;
      targetRef.current = {
        x: Math.sin(angle) * dist * 0.3,
        y: 15 + selected.orbitRadius * 0.1,
        z: dist,
      };
    } else {
      targetRef.current = { x: 0, y: 20, z: 60 };
    }
  }, [selected]);

  return null;
}

function ParallaxDrift() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 0.02,
        y: (e.clientY / window.innerHeight - 0.5) * 0.02,
      };
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 3 - (camera.position.x - 0)) * 0.01;
    camera.position.y += (-mouseRef.current.y * 3 - (camera.position.y - 20)) * 0.01;
  });

  return null;
}

export default function SolarSystem({ planets, selected, onSelect }) {
  return (
    <Canvas
      camera={{ position: [0, 22, 60], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      className="w-full h-full rounded-2xl"
      dpr={[1, 1.5]}
      style={{ background: '#050814' }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 20, 10]} intensity={0.1} />
      <group rotation={[TILT_ANGLE, 0, 0.1]}>
        <Sun />
        {planets.map((p, i) => (
          <Planet
            key={p.id}
            planet={p}
            index={i}
            total={planets.length}
            isSelected={selected?.id === p.id}
            onClick={onSelect}
          />
        ))}
      </group>
      <TwinklingStars />
      <FloatingParticles />
      <CameraController selected={selected} />
      <ParallaxDrift />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxDistance={120}
        minDistance={15}
        autoRotate={false}
        rotateSpeed={0.5}
      />
      <fog attach="fog" args={['#050814', 60, 180]} />
    </Canvas>
  );
}
