import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, useTexture, Text } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// Kaaba Main Structure
function KaabaStructure() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Main Kaaba Body - Black cube */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 3, 2.5]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Gold trim band at top */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.52, 0.3, 2.52]} />
        <meshStandardMaterial 
          color="#d4af37"
          roughness={0.3}
          metalness={0.8}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Gold calligraphy band */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.51, 0.15, 2.51]} />
        <meshStandardMaterial 
          color="#c9a227"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>
      
      {/* Kiswah embroidered patterns - vertical lines */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={`line-front-${i}`} position={[x * 0.6, 0, 1.252]}>
          <boxGeometry args={[0.02, 2.5, 0.01]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            roughness={0.9}
          />
        </mesh>
      ))}
      
      {/* Door of the Kaaba (Bab al-Kaaba) */}
      <mesh position={[0, -0.2, 1.251]}>
        <boxGeometry args={[0.8, 1.2, 0.02]} />
        <meshStandardMaterial 
          color="#d4af37"
          roughness={0.2}
          metalness={0.9}
          emissive="#d4af37"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Door frame decoration */}
      <mesh position={[0, -0.2, 1.255]}>
        <boxGeometry args={[0.9, 1.3, 0.01]} />
        <meshStandardMaterial 
          color="#b8860b"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

// Black Stone (Al-Hajar Al-Aswad)
function BlackStone() {
  const stoneRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (stoneRef.current && stoneRef.current.material) {
      const material = stoneRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={[1.3, 0.5, 1.3]}>
        {/* Silver frame */}
        <mesh>
          <torusGeometry args={[0.25, 0.04, 16, 32]} />
          <meshStandardMaterial 
            color="#c0c0c0"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        
        {/* The Black Stone itself */}
        <mesh ref={stoneRef}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial 
            color="#1a1a1a"
            roughness={0.4}
            metalness={0.3}
            emissive="#4a0080"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Inner glow effect */}
        <mesh>
          <sphereGeometry args={[0.19, 32, 32]} />
          <meshBasicMaterial 
            color="#4a0080"
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Mataaf (circumambulation area) floor
function MataafFloor() {
  return (
    <group>
      {/* Main marble floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial 
          color="#f5f5f0"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Concentric circles for Tawaf path */}
      {[3, 4.5, 6, 7.5].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.99, 0]}>
          <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
          <meshStandardMaterial 
            color="#d4af37"
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Pilgrims performing Tawaf
function Pilgrims() {
  const pilgrimsRef = useRef<THREE.Group>(null);
  
  const pilgrimPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 60; i++) {
      const radius = 3.5 + Math.random() * 3;
      const angle = (i / 60) * Math.PI * 2 + Math.random() * 0.2;
      positions.push([
        Math.cos(angle) * radius,
        -0.5,
        Math.sin(angle) * radius
      ]);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pilgrimsRef.current) {
      pilgrimsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={pilgrimsRef}>
      {pilgrimPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <capsuleGeometry args={[0.08, 0.25, 4, 8]} />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Minarets
function Minarets() {
  const minaretPositions: [number, number, number][] = [
    [-7, 0, -7],
    [7, 0, -7],
    [-7, 0, 7],
    [7, 0, 7]
  ];

  return (
    <>
      {minaretPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Main tower */}
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 5, 16]} />
            <meshStandardMaterial 
              color="#f5f5f0"
              roughness={0.4}
            />
          </mesh>
          
          {/* Balcony */}
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
            <meshStandardMaterial 
              color="#d4af37"
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          
          {/* Spire */}
          <mesh position={[0, 5.5, 0]}>
            <coneGeometry args={[0.2, 1.5, 16]} />
            <meshStandardMaterial 
              color="#d4af37"
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
          
          {/* Crescent */}
          <mesh position={[0, 6.5, 0]}>
            <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial 
              color="#d4af37"
              roughness={0.2}
              metalness={0.9}
              emissive="#d4af37"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Ambient particles/dust
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03}
        color="#d4af37"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Divine light rays
function DivineLights() {
  return (
    <group>
      {/* Central light from above */}
      <spotLight
        position={[0, 15, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ffffd0"
        castShadow
      />
      
      {/* Warm ambient lights */}
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffd700" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ffd700" />
      
      {/* Subtle blue moonlight */}
      <directionalLight position={[10, 10, -5]} intensity={0.3} color="#b0c4de" />
    </group>
  );
}

// Camera animation
function CameraAnimation() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.1;
    camera.position.x = Math.sin(t) * 12;
    camera.position.z = Math.cos(t) * 12;
    camera.position.y = 5 + Math.sin(t * 0.5) * 2;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#333333" wireframe />
    </mesh>
  );
}

// Main 3D Scene
function Scene({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      <color attach="background" args={['#0a0a15']} />
      
      {/* Stars background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      <DivineLights />
      
      <ambientLight intensity={0.3} />
      
      <Suspense fallback={<LoadingFallback />}>
        <KaabaStructure />
        <BlackStone />
        <MataafFloor />
        <Pilgrims />
        <Minarets />
        <AmbientParticles />
      </Suspense>
      
      {autoRotate ? (
        <CameraAnimation />
      ) : (
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={25}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      )}
    </>
  );
}

interface Kaaba3DProps {
  autoRotate?: boolean;
  className?: string;
}

export default function Kaaba3D({ autoRotate = false, className = '' }: Kaaba3DProps) {
  return (
    <div className={`relative w-full h-full min-h-[400px] ${className}`}>
      <Canvas
        shadows
        camera={{ position: [10, 6, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene autoRotate={autoRotate} />
      </Canvas>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/50 via-transparent to-transparent" />
    </div>
  );
}
