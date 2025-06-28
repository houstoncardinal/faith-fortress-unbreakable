
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
      {/* Main Kaaba Structure - More accurate rectangular proportions */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[1.4, 3.6, 1.2]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      {/* Kiswah (Sacred Black Cloth) - Properly sized outer covering */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[1.42, 3.62, 1.22]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          metalness={0.01}
          roughness={0.98}
        />
      </mesh>

      {/* Main Golden Belt (Hizam) - Prominent central band */}
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[1.45, 0.5, 1.25]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.9}
          roughness={0.1}
          emissive="#B8860B"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Upper Calligraphy Band */}
      <mesh position={[0, 3.0, 0]}>
        <boxGeometry args={[1.44, 0.3, 1.24]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.85}
          roughness={0.15}
          emissive="#DAA520"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Lower Calligraphy Band */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.44, 0.25, 1.24]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.85}
          roughness={0.15}
          emissive="#DAA520"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Door of the Kaaba - More prominent and accurate positioning */}
      <mesh position={[0.71, 1.6, 0.2]}>
        <boxGeometry args={[0.08, 2.8, 1.0]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.95}
          roughness={0.05}
          emissive="#DAA520"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Door Frame - Ornate border */}
      <mesh position={[0.715, 1.6, 0.2]}>
        <boxGeometry args={[0.06, 2.9, 1.05]} />
        <meshStandardMaterial 
          color="#B8860B"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Door Handle */}
      <mesh position={[0.73, 1.4, 0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Hajar al-Aswad (Black Stone) - Accurately positioned */}
      <mesh position={[0.71, 1.0, 0.6]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Silver Frame around Black Stone */}
      <mesh position={[0.72, 1.0, 0.6]} rotation={[0, 0, Math.PI/2]}>
        <torusGeometry args={[0.15, 0.02, 16, 32]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Marble Base/Foundation - White marble platform */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[3.0, 3.0, 0.1, 64]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          metalness={0.02}
          roughness={0.1}
        />
      </mesh>

      {/* Hateem/Hijr Ismail - Semicircular sacred area */}
      <mesh position={[-1.0, 0.06, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <ringGeometry args={[0.8, 1.3, 32, 1, 0, Math.PI]} />
        <meshStandardMaterial 
          color="#F8F8FF"
          metalness={0.01}
          roughness={0.2}
        />
      </mesh>

      {/* Low marble wall of Hateem */}
      {Array.from({ length: 7 }).map((_, index) => {
        const angle = (index / 6) * Math.PI - Math.PI/2;
        const radius = 1.1;
        return (
          <mesh 
            key={index} 
            position={[
              -1.0 + Math.cos(angle) * radius, 
              0.2, 
              Math.sin(angle) * radius
            ]}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.4, 12]} />
            <meshStandardMaterial 
              color="#E6E6FA"
              metalness={0.05}
              roughness={0.4}
            />
          </mesh>
        );
      })}

      {/* Tawaf Area - Sacred circumambulation area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[8, 128]} />
        <meshStandardMaterial 
          color="#FAFAFA"
          metalness={0.01}
          roughness={0.15}
        />
      </mesh>

      {/* Tawaf guidance circles */}
      {[3.5, 4.5, 5.5, 6.5, 7.5].map((radius, index) => (
        <mesh key={index} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
          <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
          <meshStandardMaterial 
            color="#F0F0F0"
            metalness={0.02}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Detailed Calligraphy Panels - Each face */}
      {/* Front Face Calligraphy */}
      <mesh position={[0.715, 2.2, 0.7]}>
        <boxGeometry args={[0.01, 0.8, 0.4]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.85}
          roughness={0.15}
          emissive="#DAA520"
          emissiveIntensity={0.15}
        />
      </mesh>

      <mesh position={[0.715, 2.2, -0.3]}>
        <boxGeometry args={[0.01, 0.8, 0.4]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.85}
          roughness={0.15}
          emissive="#DAA520"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Back Face Calligraphy */}
      <mesh position={[-0.715, 2.2, 0]}>
        <boxGeometry args={[0.01, 1.0, 1.1]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.85}
          roughness={0.15}
          emissive="#DAA520"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Left Side Calligraphy */}
      <mesh position={[0, 2.2, 0.615]}>
        <boxGeometry args={[1.3, 1.0, 0.01]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.85}
          roughness={0.15}
          emissive="#DAA520"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Right Side Calligraphy */}
      <mesh position={[0, 2.2, -0.615]}>
        <boxGeometry args={[1.3, 1.0, 0.01]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.85}
          roughness={0.15}
          emissive="#DAA520"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Mizab ar-Rahmah - Golden waterspout */}
      <mesh position={[0, 3.7, 0.4]}>
        <cylinderGeometry args={[0.04, 0.08, 0.3, 12]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.95}
          roughness={0.05}
          emissive="#DAA520"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 3.65, 0]}>
        <boxGeometry args={[1.45, 0.1, 1.25]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.02}
          roughness={0.95}
        />
      </mesh>

      {/* Corner reinforcements */}
      {[
        [0.7, 1.8, 0.6], [0.7, 1.8, -0.6], 
        [-0.7, 1.8, 0.6], [-0.7, 1.8, -0.6]
      ].map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]}>
          <boxGeometry args={[0.03, 3.6, 0.03]} />
          <meshStandardMaterial 
            color="#333333"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      ))}

      {/* Corner decorative elements */}
      {[
        [0.7, 3.2, 0.6], [0.7, 3.2, -0.6], 
        [-0.7, 3.2, 0.6], [-0.7, 3.2, -0.6]
      ].map((pos, index) => (
        <mesh key={`corner-${index}`} position={pos as [number, number, number]}>
          <octahedronGeometry args={[0.04]} />
          <meshStandardMaterial 
            color="#FFD700"
            metalness={0.9}
            roughness={0.1}
            emissive="#DAA520"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}

      {/* Surrounding architectural elements - Pillars like in the image */}
      {Array.from({ length: 24 }).map((_, index) => {
        const angle = (index / 24) * Math.PI * 2;
        const radius = 10;
        return (
          <mesh 
            key={`pillar-${index}`} 
            position={[
              Math.cos(angle) * radius, 
              2, 
              Math.sin(angle) * radius
            ]}
          >
            <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
            <meshStandardMaterial 
              color="#F5F5F5"
              metalness={0.02}
              roughness={0.3}
            />
            {/* Pillar capital */}
            <mesh position={[0, 2.2, 0]}>
              <cylinderGeometry args={[0.2, 0.15, 0.4, 16]} />
              <meshStandardMaterial 
                color="#E0E0E0"
                metalness={0.05}
                roughness={0.2}
              />
            </mesh>
          </mesh>
        );
      })}

      {/* Subtle ambient light particles */}
      {Array.from({ length: 15 }).map((_, index) => {
        const angle = (index / 15) * Math.PI * 2;
        const radius = 5 + Math.sin(index * 3) * 0.5;
        const height = 1 + Math.cos(index * 2) * 0.5;
        return (
          <mesh 
            key={`light-${index}`} 
            position={[
              Math.cos(angle) * radius, 
              height, 
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial 
              color="#F0F8FF"
              metalness={0.7}
              roughness={0.3}
              emissive="#E6E6FA"
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default KaabaModel;
