
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
      {/* Main Kaaba Structure - More accurate proportions */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.8, 3, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Kiswah (Black Cloth) - Slightly larger to show it covers the structure */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.82, 3.02, 1.42]} />
        <meshStandardMaterial 
          color="#000000"
          metalness={0.05}
          roughness={0.9}
        />
      </mesh>

      {/* Hizam (Gold Band) - More prominent and properly positioned */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[1.85, 0.4, 1.45]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#DAA520"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Door of the Kaaba - More accurate size and position */}
      <mesh position={[0.91, 1.2, 0]}>
        <boxGeometry args={[0.03, 1.8, 0.8]} />
        <meshStandardMaterial 
          color="#B8860B"
          metalness={0.8}
          roughness={0.2}
          emissive="#B8860B"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Door Frame */}
      <mesh position={[0.92, 1.2, 0]}>
        <boxGeometry args={[0.01, 2, 1]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Hajar al-Aswad (Black Stone) - Sacred cornerstone */}
      <mesh position={[0.91, 0.8, 0.7]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Silver frame around Black Stone */}
      <mesh position={[0.92, 0.8, 0.7]}>
        <torusGeometry args={[0.18, 0.02, 8, 16]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Foundation/Base - More realistic marble */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.3, 32]} />
        <meshStandardMaterial 
          color="#F5F5DC"
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>

      {/* Marble Floor - Tawaf area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          metalness={0.05}
          roughness={0.4}
        />
      </mesh>

      {/* Circular pattern on floor for Tawaf guidance */}
      {[3, 4.5, 6].map((radius, index) => (
        <mesh key={index} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
          <meshStandardMaterial 
            color="#E6E6FA"
            metalness={0.1}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Subtle calligraphy indication on Kiswah */}
      <mesh position={[0, 2.5, 0.71]}>
        <boxGeometry args={[1.2, 0.3, 0.01]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.6}
          roughness={0.4}
          emissive="#DAA520"
          emissiveIntensity={0.05}
        />
      </mesh>

      <mesh position={[0, 1.8, 0.71]}>
        <boxGeometry args={[1.4, 0.2, 0.01]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.6}
          roughness={0.4}
          emissive="#DAA520"
          emissiveIntensity={0.05}
        />
      </mesh>
    </group>
  );
};

export default KaabaModel;
