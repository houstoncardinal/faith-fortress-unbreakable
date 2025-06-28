
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
      {/* Kaaba Structure */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[2, 2.5, 2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Kiswah (Black Cloth) with gold pattern */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[2.02, 2.52, 2.02]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Gold Band (Hizam) */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[2.1, 0.3, 2.1]} />
        <meshStandardMaterial 
          color="#ffd700"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.9, 1.01]}>
        <boxGeometry args={[0.02, 0.8, 0.4]} />
        <meshStandardMaterial 
          color="#ffd700"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Hajar al-Aswad (Black Stone) indicator */}
      <mesh position={[1.01, 0.8, 0.5]}>
        <boxGeometry args={[0.05, 0.2, 0.2]} />
        <meshStandardMaterial 
          color="#2a2a2a"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Base/Foundation */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      {/* Marble Floor Pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#f5f5f5"
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

export default KaabaModel;
