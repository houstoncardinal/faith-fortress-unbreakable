import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// The Three Jamarat Pillars
function JamaratPillars() {
  const pillars = [
    { pos: [-8, 0, 0] as [number, number, number], name: 'Jamrat al-Ula', size: 0.8 },
    { pos: [0, 0, 0] as [number, number, number], name: 'Jamrat al-Wusta', size: 0.9 },
    { pos: [8, 0, 0] as [number, number, number], name: 'Jamrat al-Aqaba', size: 1.0 }
  ];

  return (
    <>
      {pillars.map((pillar, i) => (
        <group key={i} position={pillar.pos}>
          {/* Pillar base/basin */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[2.5 * pillar.size, 3 * pillar.size, 0.6, 32]} />
            <meshStandardMaterial color="#808080" roughness={0.6} />
          </mesh>
          
          {/* Main pillar structure */}
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.8 * pillar.size, 1 * pillar.size, 5, 16]} />
            <meshStandardMaterial 
              color="#606060"
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
          
          {/* Top cap */}
          <mesh position={[0, 5.6, 0]}>
            <cylinderGeometry args={[1 * pillar.size, 0.8 * pillar.size, 0.4, 16]} />
            <meshStandardMaterial color="#505050" roughness={0.4} />
          </mesh>
          
          {/* Pebbles in basin */}
          {[...Array(20)].map((_, j) => {
            const angle = (j / 20) * Math.PI * 2;
            const radius = 1.5 * pillar.size * Math.random();
            return (
              <mesh 
                key={j} 
                position={[
                  Math.cos(angle) * radius,
                  0.65,
                  Math.sin(angle) * radius
                ]}
              >
                <sphereGeometry args={[0.05 + Math.random() * 0.03, 8, 8]} />
                <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
              </mesh>
            );
          })}
        </group>
      ))}
    </>
  );
}

// Multi-level bridge structure
function JamaratBridge() {
  return (
    <group>
      {/* Main bridge platform */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[30, 0.3, 20]} />
        <meshStandardMaterial color="#d4d4d4" roughness={0.5} />
      </mesh>
      
      {/* Bridge railings */}
      {[-9.5, 9.5].map((z, i) => (
        <group key={i}>
          <mesh position={[0, 0.6, z]}>
            <boxGeometry args={[30, 0.8, 0.1]} />
            <meshStandardMaterial color="#a0a0a0" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Railing posts */}
          {[...Array(16)].map((_, j) => (
            <mesh key={j} position={[-14 + j * 2, 0.4, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
              <meshStandardMaterial color="#808080" metalness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Upper levels (visible in background) */}
      {[1, 2].map((level) => (
        <mesh key={level} position={[0, level * 4 - 0.1, 0]} visible={true}>
          <boxGeometry args={[30, 0.3, 20]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.5} transparent opacity={0.5} />
        </mesh>
      ))}
      
      {/* Support columns */}
      {[[-12, -7], [-12, 7], [12, -7], [12, 7], [0, -7], [0, 7]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 3.5, pos[1]]}>
          <cylinderGeometry args={[0.4, 0.5, 8, 8]} />
          <meshStandardMaterial color="#b0b0b0" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// Pilgrims throwing pebbles
function StoningPilgrims() {
  const pilgrimsRef = useRef<THREE.Group>(null);
  const pebbleRefs = useRef<THREE.Mesh[]>([]);
  
  const pilgrims = useMemo(() => {
    const data: { pos: [number, number, number]; targetPillar: number }[] = [];
    
    // Around each pillar
    for (let pillar = 0; pillar < 3; pillar++) {
      const pillarX = -8 + pillar * 8;
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 3 + Math.random() * 2;
        data.push({
          pos: [
            pillarX + Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
          ],
          targetPillar: pillar
        });
      }
    }
    return data;
  }, []);

  useFrame((state) => {
    if (pilgrimsRef.current) {
      pilgrimsRef.current.children.forEach((child, i) => {
        // Throwing motion
        const throwPhase = (state.clock.elapsedTime + i * 0.5) % 3;
        if (throwPhase < 0.5) {
          child.rotation.x = -throwPhase * 0.5;
        } else {
          child.rotation.x = 0;
        }
      });
    }
  });

  return (
    <group ref={pilgrimsRef}>
      {pilgrims.map((pilgrim, i) => (
        <group key={i} position={pilgrim.pos}>
          <mesh position={[0, 0.15, 0]}>
            <capsuleGeometry args={[0.05, 0.15, 4, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </mesh>
          {/* Raised arm */}
          <mesh position={[0.08, 0.28, 0]} rotation={[0, 0, -0.8]}>
            <capsuleGeometry args={[0.015, 0.08, 4, 4]} />
            <meshStandardMaterial color="#ffffff" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Flying pebbles effect
function FlyingPebbles() {
  const pebblesRef = useRef<THREE.Points>(null);
  
  const { positions, velocities } = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const velocities: [number, number, number][] = [];
    
    for (let i = 0; i < count; i++) {
      const pillarIndex = Math.floor(Math.random() * 3);
      const pillarX = -8 + pillarIndex * 8;
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      
      positions[i * 3] = pillarX + Math.cos(angle) * radius;
      positions[i * 3 + 1] = 1 + Math.random() * 2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      velocities.push([
        -Math.cos(angle) * 0.05,
        0.02,
        -Math.sin(angle) * 0.05
      ]);
    }
    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (pebblesRef.current) {
      const posArray = pebblesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArray.length / 3; i++) {
        const phase = (state.clock.elapsedTime * 2 + i) % 1;
        posArray[i * 3] += velocities[i][0] * phase;
        posArray[i * 3 + 1] += velocities[i][1] - phase * 0.04; // Gravity
        posArray[i * 3 + 2] += velocities[i][2] * phase;
        
        // Reset when fallen
        if (posArray[i * 3 + 1] < 0.5) {
          const pillarIndex = Math.floor(Math.random() * 3);
          const pillarX = -8 + pillarIndex * 8;
          const angle = Math.random() * Math.PI * 2;
          const radius = 3 + Math.random() * 2;
          posArray[i * 3] = pillarX + Math.cos(angle) * radius;
          posArray[i * 3 + 1] = 1.5;
          posArray[i * 3 + 2] = Math.sin(angle) * radius;
        }
      }
      pebblesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pebblesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={50} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#4a4a4a" />
    </points>
  );
}

function JamaratLighting() {
  return (
    <group>
      <directionalLight position={[10, 20, 10]} intensity={1.3} color="#FFF5E6" castShadow />
      <ambientLight intensity={0.5} color="#FFF8F0" />
      <pointLight position={[-8, 5, 0]} intensity={0.3} color="#FFD700" distance={10} />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#FFD700" distance={10} />
      <pointLight position={[8, 5, 0]} intensity={0.3} color="#FFD700" distance={10} />
    </group>
  );
}

function JamaratScene() {
  return (
    <>
      <color attach="background" args={['#87CEEB']} />
      
      <Stars radius={100} depth={50} count={200} factor={2} saturation={0} fade speed={0.1} />
      
      <JamaratLighting />
      
      <Suspense fallback={null}>
        <JamaratBridge />
        <JamaratPillars />
        <StoningPilgrims />
        <FlyingPebbles />
        
        <Sparkles count={20} scale={20} size={1} speed={0.1} color="#FFD700" opacity={0.2} />
      </Suspense>
      
      <fog attach="fog" args={['#E8E8E8', 30, 60]} />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={10}
        maxDistance={35}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  );
}

interface JamaratSceneProps {
  className?: string;
}

export default function Jamarat3D({ className = '' }: JamaratSceneProps) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <Canvas
        shadows
        camera={{ position: [18, 12, 18], fov: 50 }}
        gl={{ antialias: true }}
      >
        <JamaratScene />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </div>
  );
}
