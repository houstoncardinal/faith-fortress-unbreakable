import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, Cloud } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// Mount Arafat (Jabal ar-Rahmah)
function MountArafat() {
  return (
    <group position={[0, -2, -8]}>
      {/* Main mountain */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[6, 5, 32]} />
        <meshStandardMaterial 
          color="#8B7355"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Summit */}
      <mesh position={[0, 5.2, 0]}>
        <coneGeometry args={[1.5, 2, 16]} />
        <meshStandardMaterial color="#9C8B6E" roughness={0.85} />
      </mesh>
      
      {/* White pillar at the top (marker) */}
      <mesh position={[0, 6.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.5, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      
      {/* Rocky texture additions */}
      {[...Array(15)].map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 3 + Math.random() * 2;
        const height = Math.random() * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius - 8]}>
            <dodecahedronGeometry args={[0.5 + Math.random() * 0.5]} />
            <meshStandardMaterial color="#7A6B5A" roughness={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}

// Pilgrims on the plain of Arafat
function ArafatPilgrims() {
  const pilgrimsRef = useRef<THREE.Group>(null);
  
  const pilgrims = useMemo(() => {
    const data: { pos: [number, number, number]; scale: number }[] = [];
    // Spread across the plain
    for (let i = 0; i < 200; i++) {
      const x = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 20;
      // Keep away from mount area
      if (z > -4 || Math.sqrt(x * x + (z + 8) * (z + 8)) > 7) {
        data.push({
          pos: [x, -1.9, z],
          scale: 0.8 + Math.random() * 0.3
        });
      }
    }
    return data;
  }, []);

  useFrame((state) => {
    if (pilgrimsRef.current) {
      // Subtle swaying motion representing supplication
      pilgrimsRef.current.children.forEach((child, i) => {
        child.position.y = -1.9 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.02;
      });
    }
  });

  return (
    <group ref={pilgrimsRef}>
      {pilgrims.map((pilgrim, i) => (
        <group key={i} position={pilgrim.pos} scale={pilgrim.scale}>
          <mesh position={[0, 0.12, 0]}>
            <capsuleGeometry args={[0.04, 0.12, 4, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Tents and structures
function ArafatTents() {
  const tentPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        positions.push([
          -12 + col * 3 + (row % 2) * 1.5,
          -2,
          8 + row * 4
        ]);
      }
    }
    return positions;
  }, []);

  return (
    <>
      {tentPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Tent structure */}
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[1.2, 1.5, 4]} />
            <meshStandardMaterial 
              color="#f5f5f0"
              roughness={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Desert ground
function DesertGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial 
        color="#C4A86B"
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}

// Divine sunset lighting
function ArafatLighting() {
  return (
    <group>
      {/* Warm sunset light */}
      <directionalLight 
        position={[20, 15, 10]} 
        intensity={1.5} 
        color="#FFD4A3"
        castShadow
      />
      
      {/* Sky ambient */}
      <ambientLight intensity={0.4} color="#FFF5E6" />
      
      {/* Atmospheric haze */}
      <hemisphereLight args={['#87CEEB', '#C4A86B', 0.4]} />
    </group>
  );
}

function ArafatScene() {
  return (
    <>
      <color attach="background" args={['#FFE4C4']} />
      
      <Stars radius={100} depth={50} count={1000} factor={2} saturation={0} fade speed={0.3} />
      
      <ArafatLighting />
      
      <Suspense fallback={null}>
        <MountArafat />
        <DesertGround />
        <ArafatPilgrims />
        <ArafatTents />
        
        <Sparkles count={50} scale={30} size={1} speed={0.2} color="#FFD700" opacity={0.3} />
      </Suspense>
      
      <fog attach="fog" args={['#FFE4C4', 20, 50]} />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={8}
        maxDistance={35}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  );
}

interface ArafatSceneProps {
  className?: string;
}

export default function Arafat3D({ className = '' }: ArafatSceneProps) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <Canvas
        shadows
        camera={{ position: [15, 8, 15], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ArafatScene />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </div>
  );
}
