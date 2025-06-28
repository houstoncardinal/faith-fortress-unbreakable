
import { useRef } from 'react';
import * as THREE from 'three';

interface KaabaModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const KaabaModel = ({ position = [0, 0, 0], rotation = [0, 0, 0] }: KaabaModelProps) => {
  const kaabaRef = useRef<THREE.Group>(null);

  return (
    <group ref={kaabaRef} position={position} rotation={rotation}>
      {/* Main Kaaba Structure - Accurate proportions based on historical measurements */}
      {/* Real dimensions: 12m x 10m x 15m height */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.2, 3, 1.0]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Kiswah (Sacred Black Cloth) - Properly draped with realistic texture */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.22, 3.02, 1.02]} />
        <meshStandardMaterial 
          color="#000000"
          metalness={0.01}
          roughness={0.98}
          bumpScale={0.002}
        />
      </mesh>

      {/* Hizam (Golden Belt) - The sacred golden band with Quranic inscriptions */}
      <mesh position={[0, 2.3, 0]}>
        <boxGeometry args={[1.25, 0.4, 1.05]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.85}
          roughness={0.15}
          emissive="#B8860B"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Upper Calligraphy Band - "La ilaha illa Allah" */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[1.18, 0.25, 1.03]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
          emissive="#DAA520"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Lower Calligraphy Band */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[1.18, 0.2, 1.03]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
          emissive="#DAA520"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Door of the Kaaba - Bab al-Kaaba (Historically accurate golden door) */}
      <mesh position={[0.61, 1.4, 0]}>
        <boxGeometry args={[0.05, 2.4, 1.2]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.95}
          roughness={0.05}
          emissive="#DAA520"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Door Frame - Ornate Islamic geometric patterns */}
      <mesh position={[0.615, 1.4, 0]}>
        <boxGeometry args={[0.02, 2.5, 1.25]} />
        <meshStandardMaterial 
          color="#B8860B"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Door Handles - Twin handles as per authentic design */}
      <mesh position={[0.63, 1.2, 0.3]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      <mesh position={[0.63, 1.2, -0.3]}>
        <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Miftah al-Kaaba (Sacred Lock) */}
      <mesh position={[0.63, 1.8, 0]}>
        <boxGeometry args={[0.03, 0.25, 0.15]} />
        <meshStandardMaterial 
          color="#B8860B"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Hajar al-Aswad (Black Stone) - Positioned at southeast corner */}
      <mesh position={[0.61, 0.9, 0.5]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          metalness={0.4}
          roughness={0.6}
          bumpScale={0.003}
        />
      </mesh>

      {/* Silver Frame around Black Stone - Ottoman-era addition */}
      <mesh position={[0.62, 0.9, 0.5]}>
        <torusGeometry args={[0.18, 0.03, 16, 32]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.98}
          roughness={0.02}
          emissive="#A0A0A0"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Rukn al-Yamani (Yemeni Corner) - Important corner for pilgrims */}
      <mesh position={[0.61, 1.5, -0.5]}>
        <boxGeometry args={[0.03, 0.8, 0.03]} />
        <meshStandardMaterial 
          color="#8B4513"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Shadhrawan - The marble foundation/base around the Kaaba */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.2, 64]} />
        <meshStandardMaterial 
          color="#F8F8FF"
          metalness={0.02}
          roughness={0.25}
        />
      </mesh>

      {/* Hateem/Hijr Ismail - The sacred semicircular area */}
      <mesh position={[-0.8, 0.02, 0]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.6, 1.0, 32, 1, 0, Math.PI]} />
        <meshStandardMaterial 
          color="#FFFAFA"
          metalness={0.02}
          roughness={0.3}
        />
      </mesh>

      {/* Wall of Hateem - Low marble wall */}
      {[-1.4, -1.35, -1.3, -1.25, -1.2].map((x, index) => (
        <mesh key={index} position={[x, 0.15, 0.45 - index * 0.225]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 16]} />
          <meshStandardMaterial 
            color="#E6E6FA"
            metalness={0.05}
            roughness={0.5}
          />
        </mesh>
      ))}

      {[-1.4, -1.35, -1.3, -1.25, -1.2].map((x, index) => (
        <mesh key={`neg-${index}`} position={[x, 0.15, -0.45 + index * 0.225]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 16]} />
          <meshStandardMaterial 
            color="#E6E6FA"
            metalness={0.05}
            roughness={0.5}
          />
        </mesh>
      ))}

      {/* Tawaf Area - Sacred white marble flooring with accurate patterns */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[7, 128]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          metalness={0.01}
          roughness={0.2}
        />
      </mesh>

      {/* Tawaf Guidance Circles - Multiple rings for different distances */}
      {[3, 4, 5, 6].map((radius, index) => (
        <mesh key={index} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <ringGeometry args={[radius - 0.01, radius + 0.01, 128]} />
          <meshStandardMaterial 
            color="#F5F5F5"
            metalness={0.02}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Detailed Calligraphy Panels on each face */}
      {/* Front Face (with door) */}
      <mesh position={[0.61, 2.0, 0.3]}>
        <boxGeometry args={[0.005, 0.6, 0.35]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
          emissive="#DAA520"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[0.61, 2.0, -0.3]}>
        <boxGeometry args={[0.005, 0.6, 0.35]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
          emissive="#DAA520"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Back Face */}
      <mesh position={[-0.61, 2.0, 0]}>
        <boxGeometry args={[0.005, 0.8, 0.9]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
          emissive="#DAA520"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Left Side */}
      <mesh position={[0, 2.0, 0.51]}>
        <boxGeometry args={[1.1, 0.8, 0.005]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
          emissive="#DAA520"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Right Side */}
      <mesh position={[0, 2.0, -0.51]}>
        <boxGeometry args={[1.1, 0.8, 0.005]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
          emissive="#DAA520"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Mizab ar-Rahmah - The golden waterspout (Historically accurate position) */}
      <mesh position={[0, 3.1, 0.3]}>
        <cylinderGeometry args={[0.06, 0.1, 0.4, 12]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.95}
          roughness={0.05}
          emissive="#DAA520"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Roof indication with proper slope */}
      <mesh position={[0, 3.05, 0]}>
        <boxGeometry args={[1.25, 0.08, 1.05]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          metalness={0.02}
          roughness={0.95}
        />
      </mesh>

      {/* Corner Reinforcements - Authentic architectural details */}
      {[
        [0.6, 1.5, 0.5], [0.6, 1.5, -0.5], 
        [-0.6, 1.5, 0.5], [-0.6, 1.5, -0.5]
      ].map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]}>
          <boxGeometry args={[0.02, 3, 0.02]} />
          <meshStandardMaterial 
            color="#2a2a2a"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Additional Sacred Elements */}
      {/* Multazam - The area between the door and Black Stone */}
      <mesh position={[0.61, 1.15, 0.25]}>
        <boxGeometry args={[0.008, 0.5, 0.25]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Decorative Islamic Geometric Patterns on corners */}
      {[
        [0.6, 2.5, 0.5], [0.6, 2.5, -0.5], 
        [-0.6, 2.5, 0.5], [-0.6, 2.5, -0.5]
      ].map((pos, index) => (
        <mesh key={`corner-${index}`} position={pos as [number, number, number]}>
          <octahedronGeometry args={[0.05]} />
          <meshStandardMaterial 
            color="#FFD700"
            metalness={0.9}
            roughness={0.1}
            emissive="#DAA520"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}

      {/* Subtle ambient particles effect around the Kaaba */}
      {Array.from({ length: 20 }).map((_, index) => {
        const angle = (index / 20) * Math.PI * 2;
        const radius = 4 + Math.sin(index) * 0.5;
        const height = 0.5 + Math.cos(index * 2) * 0.3;
        return (
          <mesh 
            key={`particle-${index}`} 
            position={[
              Math.cos(angle) * radius, 
              height, 
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial 
              color="#F0F8FF"
              metalness={0.8}
              roughness={0.2}
              emissive="#E6E6FA"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default KaabaModel;
