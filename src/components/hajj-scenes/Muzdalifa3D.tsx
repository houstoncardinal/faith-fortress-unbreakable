import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// Pilgrims resting under the night sky
function MuzdalifaPilgrims() {
  const pilgrims = useMemo(() => {
    const data: { pos: [number, number, number]; isLying: boolean }[] = [];
    for (let i = 0; i < 200; i++) {
      data.push({
        pos: [
          (Math.random() - 0.5) * 30,
          0,
          (Math.random() - 0.5) * 25
        ],
        isLying: Math.random() > 0.4 // Most are resting
      });
    }
    return data;
  }, []);

  return (
    <>
      {pilgrims.map((pilgrim, i) => (
        <group key={i} position={pilgrim.pos}>
          {pilgrim.isLying ? (
            // Lying down/resting
            <mesh position={[0, 0.05, 0]} rotation={[0, Math.random() * Math.PI, Math.PI / 2]}>
              <capsuleGeometry args={[0.05, 0.2, 4, 8]} />
              <meshStandardMaterial color="#ffffff" roughness={0.7} />
            </mesh>
          ) : (
            // Sitting/praying
            <group>
              <mesh position={[0, 0.1, 0]}>
                <capsuleGeometry args={[0.05, 0.1, 4, 8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.7} />
              </mesh>
              <mesh position={[0, 0.22, 0]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial color="#d4a574" roughness={0.6} />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </>
  );
}

// Small campfires/lights
function CampLights() {
  const lights = useMemo(() => {
    const data: [number, number, number][] = [];
    for (let i = 0; i < 15; i++) {
      data.push([
        (Math.random() - 0.5) * 25,
        0.1,
        (Math.random() - 0.5) * 20
      ]);
    }
    return data;
  }, []);

  return (
    <>
      {lights.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#FFA500" transparent opacity={0.8} />
          </mesh>
          <pointLight color="#FFA500" intensity={0.5} distance={5} />
        </group>
      ))}
    </>
  );
}

// Pebbles on the ground (for collection)
function ScatteredPebbles() {
  const pebbles = useMemo(() => {
    const data: { pos: [number, number, number]; size: number }[] = [];
    for (let i = 0; i < 300; i++) {
      data.push({
        pos: [
          (Math.random() - 0.5) * 35,
          0.02,
          (Math.random() - 0.5) * 30
        ],
        size: 0.03 + Math.random() * 0.04
      });
    }
    return data;
  }, []);

  return (
    <>
      {pebbles.map((pebble, i) => (
        <mesh key={i} position={pebble.pos}>
          <sphereGeometry args={[pebble.size, 6, 6]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.9} />
        </mesh>
      ))}
    </>
  );
}

// Mountains in the distance
function MuzdalifaMountains() {
  return (
    <group>
      {[
        { pos: [-15, 3, -18] as [number, number, number], size: 6 },
        { pos: [0, 4, -20] as [number, number, number], size: 8 },
        { pos: [15, 3, -18] as [number, number, number], size: 6 },
        { pos: [-8, 2.5, -15] as [number, number, number], size: 4 },
        { pos: [10, 2.5, -15] as [number, number, number], size: 4 }
      ].map((mountain, i) => (
        <mesh key={i} position={mountain.pos}>
          <coneGeometry args={[mountain.size, mountain.size * 1.5, 8]} />
          <meshStandardMaterial color="#3a3a45" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Ground
function MuzdalifaGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial 
        color="#4a4535"
        roughness={0.95}
      />
    </mesh>
  );
}

// Night sky lighting
function MuzdalifaLighting() {
  return (
    <group>
      {/* Moonlight */}
      <directionalLight position={[10, 15, -10]} intensity={0.4} color="#E0E8FF" castShadow />
      
      {/* Ambient darkness */}
      <ambientLight intensity={0.15} color="#404060" />
      
      {/* Moon */}
      <mesh position={[20, 25, -30]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#ffffd0" />
      </mesh>
      <pointLight position={[20, 25, -30]} intensity={0.3} color="#ffffd0" distance={100} />
    </group>
  );
}

// Stars with enhanced visibility
function NightSky() {
  const starsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Stars 
      ref={starsRef}
      radius={80} 
      depth={60} 
      count={8000} 
      factor={6} 
      saturation={0.2} 
      fade 
      speed={0.3}
    />
  );
}

function MuzdalifaScene() {
  return (
    <>
      <color attach="background" args={['#0a0a15']} />
      
      <NightSky />
      
      <MuzdalifaLighting />
      
      <Suspense fallback={null}>
        <MuzdalifaGround />
        <MuzdalifaMountains />
        <MuzdalifaPilgrims />
        <CampLights />
        <ScatteredPebbles />
        
        <Sparkles count={100} scale={40} size={2} speed={0.1} color="#ffffff" opacity={0.5} />
      </Suspense>
      
      <fog attach="fog" args={['#0a0a15', 20, 50]} />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={8}
        maxDistance={35}
        autoRotate
        autoRotateSpeed={0.1}
      />
    </>
  );
}

interface MuzdalifaSceneProps {
  className?: string;
}

export default function Muzdalifa3D({ className = '' }: MuzdalifaSceneProps) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <Canvas
        shadows
        camera={{ position: [15, 8, 15], fov: 50 }}
        gl={{ antialias: true }}
      >
        <MuzdalifaScene />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </div>
  );
}
