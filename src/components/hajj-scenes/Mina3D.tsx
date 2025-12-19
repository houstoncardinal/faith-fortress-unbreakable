import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// Tent city of Mina
function MinaTents() {
  const tents = useMemo(() => {
    const data: { pos: [number, number, number]; color: string; scale: number }[] = [];
    
    // Create a grid pattern representing the massive tent city
    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 15; col++) {
        // Skip some positions for pathways
        if (col % 5 === 2 || row % 4 === 2) continue;
        
        data.push({
          pos: [
            -18 + col * 2.5 + (row % 2) * 0.5,
            0,
            -15 + row * 2.5
          ],
          color: row % 3 === 0 ? '#f5f5f0' : row % 3 === 1 ? '#e8e4d8' : '#fff8f0',
          scale: 0.9 + Math.random() * 0.2
        });
      }
    }
    return data;
  }, []);

  return (
    <>
      {tents.map((tent, i) => (
        <group key={i} position={tent.pos} scale={tent.scale}>
          {/* Tent frame/structure */}
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[1.8, 1.2, 2.2]} />
            <meshStandardMaterial 
              color={tent.color}
              roughness={0.6}
            />
          </mesh>
          
          {/* Air conditioning unit */}
          <mesh position={[0.7, 1.3, 0]}>
            <boxGeometry args={[0.4, 0.3, 0.6]} />
            <meshStandardMaterial color="#a0a0a0" roughness={0.4} metalness={0.3} />
          </mesh>
          
          {/* Tent entrance */}
          <mesh position={[0, 0.4, 1.11]}>
            <planeGeometry args={[0.6, 0.8]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Pilgrims walking through Mina
function MinaPilgrims() {
  const pilgrimsRef = useRef<THREE.Group>(null);
  
  const pilgrims = useMemo(() => {
    const data: { pos: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < 150; i++) {
      // Place along pathways
      const isOnPath = Math.random() > 0.5;
      const pathRow = Math.floor(Math.random() * 3) * 4 + 2;
      const pathCol = Math.floor(Math.random() * 3) * 5 + 2;
      
      data.push({
        pos: isOnPath 
          ? [-18 + pathCol * 2.5 + Math.random() * 2, 0, -15 + Math.random() * 28]
          : [-18 + Math.random() * 35, 0, -15 + pathRow * 2.5 + Math.random() * 2],
        scale: 0.8 + Math.random() * 0.3
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (pilgrimsRef.current) {
      pilgrimsRef.current.children.forEach((child, i) => {
        // Walking animation
        child.position.z += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.002;
      });
    }
  });

  return (
    <group ref={pilgrimsRef}>
      {pilgrims.map((pilgrim, i) => (
        <group key={i} position={pilgrim.pos} scale={pilgrim.scale}>
          <mesh position={[0, 0.15, 0]}>
            <capsuleGeometry args={[0.05, 0.15, 4, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Mountain backdrop
function MinaMountains() {
  return (
    <group>
      {/* Background mountains */}
      {[[-20, -25], [0, -28], [20, -25], [-15, -30], [15, -30]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 2, pos[1]]}>
          <coneGeometry args={[8 + i * 2, 8 + i, 6]} />
          <meshStandardMaterial color="#8B7355" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Ground
function MinaGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial 
        color="#d4c4a8"
        roughness={0.8}
      />
    </mesh>
  );
}

function MinaLighting() {
  return (
    <group>
      <directionalLight position={[15, 20, 10]} intensity={1.2} color="#FFF5E6" castShadow />
      <ambientLight intensity={0.5} color="#FFF8F0" />
      <hemisphereLight args={['#87CEEB', '#d4c4a8', 0.3]} />
    </group>
  );
}

function MinaScene() {
  return (
    <>
      <color attach="background" args={['#E8DCC8']} />
      
      <Stars radius={100} depth={50} count={500} factor={2} saturation={0} fade speed={0.2} />
      
      <MinaLighting />
      
      <Suspense fallback={null}>
        <MinaTents />
        <MinaPilgrims />
        <MinaMountains />
        <MinaGround />
        
        <Sparkles count={30} scale={25} size={1} speed={0.15} color="#FFD700" opacity={0.2} />
      </Suspense>
      
      <fog attach="fog" args={['#E8DCC8', 25, 60]} />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={10}
        maxDistance={40}
        autoRotate
        autoRotateSpeed={0.15}
      />
    </>
  );
}

interface MinaSceneProps {
  className?: string;
}

export default function Mina3D({ className = '' }: MinaSceneProps) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <Canvas
        shadows
        camera={{ position: [20, 12, 20], fov: 50 }}
        gl={{ antialias: true }}
      >
        <MinaScene />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </div>
  );
}
