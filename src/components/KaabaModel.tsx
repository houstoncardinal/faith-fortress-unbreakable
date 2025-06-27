
import { useRef } from 'react';
import { Box, Plane } from '@react-three/drei';
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
      <Box args={[2, 2.5, 2]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>

      {/* Kiswah (Black Cloth) with gold pattern */}
      <Box args={[2.02, 2.52, 2.02]} position={[0, 1.25, 0]}>
        <meshStandardMaterial 
          color="#0a0a0a"
          metalness={0.1}
          roughness={0.8}
        />
      </Box>

      {/* Gold Band (Hizam) */}
      <Box args={[2.1, 0.3, 2.1]} position={[0, 1.8, 0]}>
        <meshStandardMaterial 
          color="#ffd700"
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Door */}
      <Box args={[0.02, 0.8, 0.4]} position={[0, 0.9, 1.01]}>
        <meshStandardMaterial 
          color="#ffd700"
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Hajar al-Aswad (Black Stone) indicator */}
      <Box args={[0.05, 0.2, 0.2]} position={[1.01, 0.8, 0.5]}>
        <meshStandardMaterial 
          color="#2a2a2a"
          metalness={0.1}
          roughness={0.9}
        />
      </Box>

      {/* Base/Foundation */}
      <Box args={[3, 0.2, 3]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#8b7355" />
      </Box>

      {/* Marble Floor Pattern */}
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#f5f5f5"
          metalness={0.1}
          roughness={0.3}
        />
      </Plane>
    </group>
  );
};

export default KaabaModel;
