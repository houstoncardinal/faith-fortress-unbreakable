
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
      {/* Main Kaaba Structure - Accurate proportions (12m x 9m x 15m high) */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.8, 3, 1.35]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Kiswah (Black Cloth) - Sacred covering with texture suggestion */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.82, 3.02, 1.37]} />
        <meshStandardMaterial 
          color="#000000"
          metalness={0.02}
          roughness={0.95}
          bumpScale={0.001}
        />
      </mesh>

      {/* Hizam (Gold Belt) - The sacred belt around the Kaaba */}
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[1.85, 0.35, 1.4]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.8}
          roughness={0.2}
          emissive="#B8860B"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Additional decorative bands on Kiswah */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[1.6, 0.15, 1.39]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[1.6, 0.12, 1.39]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Door of the Kaaba - Bab al-Kaaba (East side) */}
      <mesh position={[0.91, 1.4, 0]}>
        <boxGeometry args={[0.04, 2.2, 0.9]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#DAA520"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Door Handle - Ornate Islamic design */}
      <mesh position={[0.93, 1.1, 0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Door Lock (Miftah al-Kaaba) */}
      <mesh position={[0.93, 1.6, 0.3]}>
        <boxGeometry args={[0.02, 0.15, 0.08]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Hajar al-Aswad (Black Stone) - Southeast corner */}
      <mesh position={[0.91, 0.9, 0.67]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.3}
          roughness={0.7}
          bumpScale={0.002}
        />
      </mesh>

      {/* Silver frame around Black Stone - Ottoman era addition */}
      <mesh position={[0.92, 0.9, 0.67]}>
        <torusGeometry args={[0.15, 0.025, 8, 16]} />
        <meshStandardMaterial 
          color="#C0C0C0"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Rukn al-Yamani (Yemeni Corner) - Southwest corner marker */}
      <mesh position={[0.91, 1.2, -0.67]}>
        <boxGeometry args={[0.02, 0.3, 0.02]} />
        <meshStandardMaterial 
          color="#8B4513"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Shadhrawan - The marble base/foundation */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[2.8, 2.8, 0.3, 32]} />
        <meshStandardMaterial 
          color="#F5F5DC"
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Hateem/Hijr Ismail - The semicircular area */}
      <mesh position={[-1.2, 0.02, 0]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 16, 1, 0, Math.PI]} />
        <meshStandardMaterial 
          color="#E6E6E6"
          metalness={0.05}
          roughness={0.4}
        />
      </mesh>

      {/* Low wall of Hateem */}
      <mesh position={[-1.8, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial 
          color="#D3D3D3"
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>

      <mesh position={[-1.8, 0.2, 0.6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial 
          color="#D3D3D3"
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>

      <mesh position={[-1.8, 0.2, -0.6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial 
          color="#D3D3D3"
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>

      {/* Tawaf Area - White marble flooring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          metalness={0.02}
          roughness={0.3}
        />
      </mesh>

      {/* Tawaf guidance circles */}
      {[3.5, 5, 6.5].map((radius, index) => (
        <mesh key={index} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
          <meshStandardMaterial 
            color="#F0F0F0"
            metalness={0.05}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Calligraphy on Kiswah - Quranic verses and Islamic patterns */}
      {/* Upper band calligraphy */}
      <mesh position={[0, 2.6, 0.685]}>
        <boxGeometry args={[1.4, 0.25, 0.005]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Door area calligraphy */}
      <mesh position={[0.91, 2.0, 0.45]}>
        <boxGeometry args={[0.005, 0.8, 0.8]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Side panels calligraphy */}
      <mesh position={[0, 1.8, 0.685]}>
        <boxGeometry args={[1.2, 0.18, 0.005]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh position={[0, 1.2, 0.685]}>
        <boxGeometry args={[1.0, 0.15, 0.005]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Left side calligraphy */}
      <mesh position={[-0.685, 1.8, 0]}>
        <boxGeometry args={[0.005, 0.18, 1.2]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Right side calligraphy */}
      <mesh position={[0.685, 1.8, 0]}>
        <boxGeometry args={[0.005, 0.18, 1.2]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Back side calligraphy */}
      <mesh position={[0, 1.8, -0.685]}>
        <boxGeometry args={[1.2, 0.18, 0.005]} />
        <meshStandardMaterial 
          color="#DAA520"
          metalness={0.7}
          roughness={0.3}
          emissive="#B8860B"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Mizab ar-Rahmah - The golden waterspout on the roof */}
      <mesh position={[0, 3.1, 0.4]}>
        <cylinderGeometry args={[0.05, 0.08, 0.3, 8]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Subtle roof indication */}
      <mesh position={[0, 3.05, 0]}>
        <boxGeometry args={[1.85, 0.05, 1.4]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Corner reinforcements - Architectural details */}
      {[
        [0.9, 1.5, 0.675], [0.9, 1.5, -0.675], 
        [-0.9, 1.5, 0.675], [-0.9, 1.5, -0.675]
      ].map((pos, index) => (
        <mesh key={index} position={pos as [number, number, number]}>
          <boxGeometry args={[0.02, 3, 0.02]} />
          <meshStandardMaterial 
            color="#333333"
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

export default KaabaModel;
