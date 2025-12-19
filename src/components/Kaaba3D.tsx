import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles, Cloud } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// Accurate Kaaba dimensions (real proportions: 13.1m x 11.03m x 12.86m height)
// Scaled down proportionally
const KAABA_WIDTH = 2.62; // 13.1m scaled
const KAABA_DEPTH = 2.21; // 11.03m scaled
const KAABA_HEIGHT = 2.57; // 12.86m scaled

// Kaaba Main Structure - Highly detailed
function KaabaStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const kiswahRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    // Subtle cloth movement simulation
    if (kiswahRef.current) {
      const material = kiswahRef.current.material as THREE.MeshStandardMaterial;
      material.displacementScale = 0.002 + Math.sin(state.clock.elapsedTime * 0.5) * 0.001;
    }
  });

  return (
    <group ref={groupRef} position={[0, KAABA_HEIGHT / 2 - 0.5, 0]}>
      {/* Inner structure (stone) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[KAABA_WIDTH - 0.02, KAABA_HEIGHT, KAABA_DEPTH - 0.02]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
      
      {/* Kiswah (black silk covering) - Front */}
      <mesh ref={kiswahRef} position={[0, 0, KAABA_DEPTH / 2 + 0.01]} castShadow>
        <planeGeometry args={[KAABA_WIDTH, KAABA_HEIGHT, 32, 32]} />
        <meshStandardMaterial 
          color="#050505"
          roughness={0.7}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Kiswah - Back */}
      <mesh position={[0, 0, -KAABA_DEPTH / 2 - 0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[KAABA_WIDTH, KAABA_HEIGHT]} />
        <meshStandardMaterial color="#050505" roughness={0.7} metalness={0.15} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Kiswah - Left */}
      <mesh position={[-KAABA_WIDTH / 2 - 0.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[KAABA_DEPTH, KAABA_HEIGHT]} />
        <meshStandardMaterial color="#050505" roughness={0.7} metalness={0.15} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Kiswah - Right */}
      <mesh position={[KAABA_WIDTH / 2 + 0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[KAABA_DEPTH, KAABA_HEIGHT]} />
        <meshStandardMaterial color="#050505" roughness={0.7} metalness={0.15} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Hizam - Gold embroidered band (2/3 up the Kaaba) */}
      <GoldBand position={[0, KAABA_HEIGHT * 0.17, 0]} width={KAABA_WIDTH} depth={KAABA_DEPTH} />
      
      {/* Top gold trim */}
      <mesh position={[0, KAABA_HEIGHT / 2 - 0.05, 0]}>
        <boxGeometry args={[KAABA_WIDTH + 0.04, 0.08, KAABA_DEPTH + 0.04]} />
        <meshStandardMaterial 
          color="#c9a227"
          roughness={0.25}
          metalness={0.85}
          emissive="#d4af37"
          emissiveIntensity={0.15}
        />
      </mesh>
      
      {/* Door of the Kaaba (Bab al-Kaaba) - Eastern wall */}
      <KaabaDoor position={[0, -0.35, KAABA_DEPTH / 2 + 0.02]} />
      
      {/* Detailed calligraphy panels on each side */}
      <CalligraphyPanels width={KAABA_WIDTH} depth={KAABA_DEPTH} height={KAABA_HEIGHT} />
      
      {/* Shadharwan (marble base/apron) */}
      <Shadharwan width={KAABA_WIDTH} depth={KAABA_DEPTH} />
      
      {/* Meezab (golden rainwater spout) */}
      <Meezab />
      
      {/* Hateem/Hijr Ismail */}
      <HijrIsmail />
    </group>
  );
}

// Gold embroidered band around the Kaaba
function GoldBand({ position, width, depth }: { position: [number, number, number], width: number, depth: number }) {
  const bandHeight = 0.35;
  
  return (
    <group position={position}>
      {/* Main gold band - all 4 sides */}
      {/* Front */}
      <mesh position={[0, 0, depth / 2 + 0.015]}>
        <planeGeometry args={[width, bandHeight]} />
        <meshStandardMaterial 
          color="#b8860b"
          roughness={0.3}
          metalness={0.8}
          emissive="#d4af37"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0, -depth / 2 - 0.015]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, bandHeight]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.8} emissive="#d4af37" emissiveIntensity={0.1} />
      </mesh>
      {/* Left */}
      <mesh position={[-width / 2 - 0.015, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[depth, bandHeight]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.8} emissive="#d4af37" emissiveIntensity={0.1} />
      </mesh>
      {/* Right */}
      <mesh position={[width / 2 + 0.015, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[depth, bandHeight]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.8} emissive="#d4af37" emissiveIntensity={0.1} />
      </mesh>
      
      {/* Quranic calligraphy detail lines */}
      {[-0.12, 0, 0.12].map((y, i) => (
        <mesh key={i} position={[0, y, depth / 2 + 0.02]}>
          <planeGeometry args={[width * 0.9, 0.025]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Detailed door with frame and curtain
function KaabaDoor({ position }: { position: [number, number, number] }) {
  const doorWidth = 0.42; // 2.1m scaled
  const doorHeight = 0.68; // 3.4m scaled
  
  return (
    <group position={position}>
      {/* Door frame - outer gold */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[doorWidth + 0.15, doorHeight + 0.15, 0.03]} />
        <meshStandardMaterial 
          color="#d4af37"
          roughness={0.2}
          metalness={0.9}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Door frame - inner decorative border */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[doorWidth + 0.08, doorHeight + 0.08, 0.02]} />
        <meshStandardMaterial color="#b8860b" roughness={0.25} metalness={0.85} />
      </mesh>
      
      {/* Main door surface */}
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[doorWidth, doorHeight, 0.02]} />
        <meshStandardMaterial 
          color="#c9a227"
          roughness={0.3}
          metalness={0.85}
          emissive="#d4af37"
          emissiveIntensity={0.15}
        />
      </mesh>
      
      {/* Door panels (decorative) */}
      {[-0.1, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0.035]}>
          <boxGeometry args={[0.12, 0.35, 0.01]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      
      {/* Door handles */}
      {[-0.08, 0.08].map((x, i) => (
        <group key={i} position={[x, -0.15, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 0.06, 16]} />
            <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
          </mesh>
        </group>
      ))}
      
      {/* Quranic inscription above door */}
      <mesh position={[0, doorHeight / 2 + 0.12, 0.02]}>
        <boxGeometry args={[doorWidth + 0.1, 0.12, 0.015]} />
        <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} emissive="#ffd700" emissiveIntensity={0.1} />
      </mesh>
      
      {/* Steps leading to door */}
      {[0, 1, 2].map((step) => (
        <mesh key={step} position={[0, -doorHeight / 2 - 0.05 - step * 0.08, 0.15 + step * 0.1]}>
          <boxGeometry args={[doorWidth + 0.3 + step * 0.1, 0.06, 0.08]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.4} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// Calligraphy panels
function CalligraphyPanels({ width, depth, height }: { width: number, depth: number, height: number }) {
  const panelPositions = useMemo(() => {
    const positions: { pos: [number, number, number], rot: [number, number, number], size: [number, number] }[] = [];
    
    // Front panels
    for (let i = 0; i < 3; i++) {
      positions.push({
        pos: [-0.5 + i * 0.5, -height * 0.25, depth / 2 + 0.018],
        rot: [0, 0, 0],
        size: [0.35, 0.5]
      });
    }
    
    // Side panels (left and right)
    for (let i = 0; i < 2; i++) {
      positions.push({
        pos: [-width / 2 - 0.018, -height * 0.25, -0.3 + i * 0.6],
        rot: [0, -Math.PI / 2, 0],
        size: [0.35, 0.5]
      });
      positions.push({
        pos: [width / 2 + 0.018, -height * 0.25, -0.3 + i * 0.6],
        rot: [0, Math.PI / 2, 0],
        size: [0.35, 0.5]
      });
    }
    
    return positions;
  }, [width, depth, height]);

  return (
    <>
      {panelPositions.map((panel, i) => (
        <group key={i} position={panel.pos} rotation={panel.rot}>
          {/* Panel background */}
          <mesh>
            <planeGeometry args={panel.size} />
            <meshStandardMaterial 
              color="#0a0a0a"
              roughness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Gold border */}
          <mesh position={[0, 0, 0.001]}>
            <ringGeometry args={[panel.size[0] * 0.45, panel.size[0] * 0.48, 32]} />
            <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Inner calligraphy representation */}
          <mesh position={[0, 0, 0.002]}>
            <circleGeometry args={[panel.size[0] * 0.35, 32]} />
            <meshStandardMaterial color="#c9a227" roughness={0.35} metalness={0.75} />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Shadharwan (marble base)
function Shadharwan({ width, depth }: { width: number, depth: number }) {
  return (
    <group position={[0, -KAABA_HEIGHT / 2 - 0.08, 0]}>
      {/* Marble apron around base */}
      <mesh>
        <boxGeometry args={[width + 0.15, 0.12, depth + 0.15]} />
        <meshStandardMaterial 
          color="#e8e8e0"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      {/* Gold trim on top */}
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[width + 0.17, 0.02, depth + 0.17]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

// Meezab (golden rainwater spout)
function Meezab() {
  return (
    <group position={[0, KAABA_HEIGHT / 2 - 0.3, -KAABA_DEPTH / 2 - 0.15]} rotation={[-0.3, 0, 0]}>
      {/* Spout base */}
      <mesh>
        <boxGeometry args={[0.25, 0.08, 0.4]} />
        <meshStandardMaterial 
          color="#d4af37"
          roughness={0.2}
          metalness={0.9}
          emissive="#d4af37"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Spout channel */}
      <mesh position={[0, 0.02, 0.1]}>
        <boxGeometry args={[0.15, 0.04, 0.45]} />
        <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Decorative end */}
      <mesh position={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.08, 0.12, 0.1, 8]} />
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

// Hijr Ismail (semi-circular wall)
function HijrIsmail() {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI;
      points.push(new THREE.Vector3(Math.cos(angle) * 1.8, 0, -Math.sin(angle) * 1.2 - KAABA_DEPTH / 2));
    }
    return points;
  }, []);

  return (
    <group position={[0, -KAABA_HEIGHT / 2 + 0.3, 0]}>
      {/* Semi-circular marble wall */}
      {curve.slice(0, -1).map((point, i) => {
        const nextPoint = curve[i + 1];
        const midX = (point.x + nextPoint.x) / 2;
        const midZ = (point.z + nextPoint.z) / 2;
        const angle = Math.atan2(nextPoint.x - point.x, nextPoint.z - point.z);
        const length = point.distanceTo(nextPoint);
        
        return (
          <mesh key={i} position={[midX, 0.15, midZ]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.08, 0.35, length]} />
            <meshStandardMaterial 
              color="#f5f5f0"
              roughness={0.35}
              metalness={0.05}
            />
          </mesh>
        );
      })}
      
      {/* Gold trim on top of Hijr */}
      {curve.slice(0, -1).map((point, i) => {
        const nextPoint = curve[i + 1];
        const midX = (point.x + nextPoint.x) / 2;
        const midZ = (point.z + nextPoint.z) / 2;
        const angle = Math.atan2(nextPoint.x - point.x, nextPoint.z - point.z);
        const length = point.distanceTo(nextPoint);
        
        return (
          <mesh key={`gold-${i}`} position={[midX, 0.34, midZ]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.1, 0.03, length]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
          </mesh>
        );
      })}
      
      {/* Marble floor inside Hijr */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -KAABA_DEPTH / 2 - 0.5]}>
        <circleGeometry args={[1.5, 32, 0, Math.PI]} />
        <meshStandardMaterial color="#f0ece0" roughness={0.4} metalness={0.05} />
      </mesh>
    </group>
  );
}

// Black Stone (Al-Hajar Al-Aswad) - Highly detailed
function BlackStone() {
  const stoneRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (stoneRef.current && stoneRef.current.material) {
      const material = stoneRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.25 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  // Position at the eastern corner of the Kaaba
  const stonePosition: [number, number, number] = [KAABA_WIDTH / 2, 0.2, KAABA_DEPTH / 2];

  return (
    <group position={stonePosition}>
      {/* Silver frame (Tawq) - octagonal shape */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 8]} />
        <meshStandardMaterial 
          color="#c0c0c0"
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>
      
      {/* Inner silver ring */}
      <mesh>
        <torusGeometry args={[0.15, 0.025, 16, 32]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.1} metalness={0.95} />
      </mesh>
      
      {/* The Black Stone itself - fragmented appearance */}
      <mesh ref={stoneRef}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial 
          color="#1a0a0a"
          roughness={0.5}
          metalness={0.2}
          emissive="#2a0020"
          emissiveIntensity={0.25}
        />
      </mesh>
      
      {/* Stone fragments/cracks representation */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <mesh key={i} rotation={[0, (angle * Math.PI) / 180, 0]} position={[0.08, 0, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#150808" roughness={0.6} metalness={0.15} />
        </mesh>
      ))}
      
      {/* Divine glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial 
          color="#4a0040"
          transparent
          opacity={0.15}
        />
      </mesh>
      
      {/* Outer ethereal glow */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial 
          color="#3a0030"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

// Enhanced Mataaf floor with realistic marble patterns
function MataafFloor() {
  return (
    <group>
      {/* Main marble floor - large area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -KAABA_HEIGHT / 2 - 0.15, 0]} receiveShadow>
        <circleGeometry args={[12, 128]} />
        <meshStandardMaterial 
          color="#f8f8f5"
          roughness={0.25}
          metalness={0.08}
        />
      </mesh>
      
      {/* Concentric circles for Tawaf guidance */}
      {[2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -KAABA_HEIGHT / 2 - 0.14, 0]}>
          <ringGeometry args={[radius - 0.015, radius + 0.015, 128]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#e0dcd0" : "#d0ccc0"}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>
      ))}
      
      {/* Maqam Ibrahim (Station of Ibrahim) */}
      <group position={[0, -KAABA_HEIGHT / 2 - 0.05, 2.5]}>
        {/* Glass and gold enclosure */}
        <mesh>
          <cylinderGeometry args={[0.35, 0.35, 0.6, 32]} />
          <meshStandardMaterial 
            color="#ffd700"
            roughness={0.2}
            metalness={0.85}
            transparent
            opacity={0.7}
          />
        </mesh>
        {/* Inner footprint stone */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.25]} />
          <meshStandardMaterial color="#8b7355" roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Dome top */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.85} transparent opacity={0.6} />
        </mesh>
      </group>
      
      {/* Zamzam well area indication */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -KAABA_HEIGHT / 2 - 0.13, 3]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.4} metalness={0.05} />
      </mesh>
    </group>
  );
}

// Realistic pilgrims with varied appearances
function Pilgrims() {
  const pilgrimsRef = useRef<THREE.Group>(null);
  
  const pilgrims = useMemo(() => {
    const data: { pos: [number, number, number], scale: number, color: string }[] = [];
    
    // Multiple rings of pilgrims
    for (let ring = 0; ring < 5; ring++) {
      const radius = 3 + ring * 1.2;
      const count = 15 + ring * 8;
      
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.15;
        const radiusVariation = radius + (Math.random() - 0.5) * 0.4;
        
        data.push({
          pos: [
            Math.cos(angle) * radiusVariation,
            -KAABA_HEIGHT / 2 + 0.08,
            Math.sin(angle) * radiusVariation
          ],
          scale: 0.85 + Math.random() * 0.3,
          color: Math.random() > 0.15 ? '#ffffff' : '#f5f5dc' // Most in ihram white
        });
      }
    }
    return data;
  }, []);

  useFrame((state) => {
    if (pilgrimsRef.current) {
      // Counter-clockwise rotation (direction of Tawaf)
      pilgrimsRef.current.rotation.y = -state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={pilgrimsRef}>
      {pilgrims.map((pilgrim, i) => (
        <group key={i} position={pilgrim.pos} scale={pilgrim.scale}>
          {/* Body */}
          <mesh position={[0, 0.12, 0]}>
            <capsuleGeometry args={[0.045, 0.15, 4, 8]} />
            <meshStandardMaterial color={pilgrim.color} roughness={0.7} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Detailed Minarets of Masjid al-Haram
function Minarets() {
  const minaretPositions: [number, number, number][] = [
    [-10, 0, -10],
    [10, 0, -10],
    [-10, 0, 10],
    [10, 0, 10],
    [-10, 0, 0],
    [10, 0, 0],
    [0, 0, -10],
  ];

  return (
    <>
      {minaretPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Base */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 0.6, 8]} />
            <meshStandardMaterial color="#f5f5f0" roughness={0.4} />
          </mesh>
          
          {/* Main tower - tapered */}
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.25, 0.45, 5, 16]} />
            <meshStandardMaterial color="#f8f8f5" roughness={0.35} />
          </mesh>
          
          {/* First balcony */}
          <mesh position={[0, 4.5, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.25, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.8} />
          </mesh>
          
          {/* Upper tower */}
          <mesh position={[0, 5.8, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 2.2, 16]} />
            <meshStandardMaterial color="#f8f8f5" roughness={0.35} />
          </mesh>
          
          {/* Second balcony */}
          <mesh position={[0, 6.8, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.8} />
          </mesh>
          
          {/* Spire */}
          <mesh position={[0, 8, 0]}>
            <coneGeometry args={[0.18, 2, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.85} />
          </mesh>
          
          {/* Crescent and star */}
          <group position={[0, 9.2, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.12, 0.015, 8, 24, Math.PI * 1.6]} />
              <meshStandardMaterial 
                color="#ffd700" 
                roughness={0.15} 
                metalness={0.95}
                emissive="#ffd700"
                emissiveIntensity={0.3}
              />
            </mesh>
            {/* Star */}
            <mesh position={[0.08, 0, 0]}>
              <octahedronGeometry args={[0.04]} />
              <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} emissive="#ffd700" emissiveIntensity={0.3} />
            </mesh>
          </group>
          
          {/* Minaret lights */}
          <pointLight position={[0, 7, 0]} intensity={0.3} color="#ffd700" distance={5} />
        </group>
      ))}
    </>
  );
}

// Enhanced ambient particles with divine atmosphere
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Spiral distribution around the Kaaba
      const angle = (i / count) * Math.PI * 8;
      const radius = 2 + (i / count) * 12;
      const height = Math.random() * 15;
      
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
      
      // Gold/white color variation
      const isGold = Math.random() > 0.5;
      colors[i * 3] = isGold ? 0.83 : 1;
      colors[i * 3 + 1] = isGold ? 0.69 : 0.98;
      colors[i * 3 + 2] = isGold ? 0.22 : 0.9;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      
      // Gentle vertical movement
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArray.length / 3; i++) {
        posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={800} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={800} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// Volumetric divine light rays
function DivineLights() {
  const lightRayRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (lightRayRef.current) {
      lightRayRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      const material = lightRayRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group>
      {/* Central divine spotlight */}
      <spotLight
        position={[0, 20, 0]}
        angle={0.4}
        penumbra={1}
        intensity={3}
        color="#fffef0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Volumetric light cone */}
      <mesh ref={lightRayRef} position={[0, 10, 0]}>
        <coneGeometry args={[8, 20, 32, 1, true]} />
        <meshBasicMaterial 
          color="#ffffd0"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Warm accent lights */}
      <pointLight position={[8, 6, 8]} intensity={0.6} color="#ffd700" distance={15} />
      <pointLight position={[-8, 6, -8]} intensity={0.6} color="#ffd700" distance={15} />
      <pointLight position={[8, 6, -8]} intensity={0.4} color="#fff5e0" distance={12} />
      <pointLight position={[-8, 6, 8]} intensity={0.4} color="#fff5e0" distance={12} />
      
      {/* Soft moonlight */}
      <directionalLight 
        position={[15, 20, -10]} 
        intensity={0.4} 
        color="#e0e8ff"
        castShadow
      />
      
      {/* Ambient fill */}
      <ambientLight intensity={0.25} color="#fff8f0" />
      
      {/* Hemisphere light for natural sky/ground color */}
      <hemisphereLight args={['#1a1a3a', '#0a0a0a', 0.3]} />
    </group>
  );
}

// Camera animation with cinematic movement
function CameraAnimation() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.08;
    const radius = 14 + Math.sin(t * 0.5) * 3;
    
    camera.position.x = Math.sin(t) * radius;
    camera.position.z = Math.cos(t) * radius;
    camera.position.y = 6 + Math.sin(t * 0.3) * 3;
    camera.lookAt(0, 1, 0);
  });
  
  return null;
}

// Loading fallback
function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2.5, 2]} />
      <meshBasicMaterial color="#333333" wireframe />
    </mesh>
  );
}

// Main 3D Scene
function Scene({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      {/* Deep night sky background */}
      <color attach="background" args={['#05050f']} />
      
      {/* Enhanced starfield */}
      <Stars 
        radius={150} 
        depth={80} 
        count={8000} 
        factor={5} 
        saturation={0.1} 
        fade 
        speed={0.5}
      />
      
      {/* Subtle clouds/atmosphere */}
      <Cloud
        position={[0, 25, 0]}
        opacity={0.1}
        speed={0.1}
        segments={20}
      />
      
      {/* Divine sparkle effects */}
      <Sparkles
        count={200}
        scale={20}
        size={2}
        speed={0.3}
        color="#ffd700"
        opacity={0.4}
      />
      
      <DivineLights />
      
      <Suspense fallback={<LoadingFallback />}>
        <KaabaStructure />
        <BlackStone />
        <MataafFloor />
        <Pilgrims />
        <Minarets />
        <AmbientParticles />
      </Suspense>
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a15', 15, 50]} />
      
      {autoRotate ? (
        <CameraAnimation />
      ) : (
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={30}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
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
        camera={{ position: [12, 7, 12], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        dpr={[1, 2]}
      >
        <Scene autoRotate={autoRotate} />
      </Canvas>
      
      {/* Cinematic vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)'
        }}
      />
      
      {/* Bottom gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
    </div>
  );
}
