
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Loader2 } from 'lucide-react';
import KaabaModel from './KaabaModel';
import * as THREE from 'three';

const CameraController = ({ autoRotate }: { autoRotate: boolean }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame((state) => {
    if (autoRotate && cameraRef.current) {
      const time = state.clock.elapsedTime * 0.1;
      cameraRef.current.position.x = Math.sin(time) * 8;
      cameraRef.current.position.z = Math.cos(time) * 8;
      cameraRef.current.lookAt(0, 1, 0);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[5, 3, 5]}
      fov={60}
    />
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex items-center gap-2 text-primary">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="font-arabic">جاري التحميل...</span>
    </div>
  </div>
);

interface KaabaSceneProps {
  autoRotate?: boolean;
  showControls?: boolean;
}

const KaabaScene = ({ autoRotate = false, showControls = true }: KaabaSceneProps) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [5, 3, 5], fov: 60 }}
        className="rounded-lg"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
          />
          <pointLight position={[0, 5, 0]} intensity={0.4} color="#ffd700" />
          
          {/* Camera Controller */}
          <CameraController autoRotate={autoRotate} />
          
          {/* Main Model */}
          <KaabaModel />
          
          {/* Controls */}
          {showControls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={15}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
              target={[0, 1, 0]}
            />
          )}
        </Suspense>
      </Canvas>
      
      {/* Islamic Overlay */}
      <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-3">
        <div className="font-arabic text-white text-lg">الكعبة المشرفة</div>
        <div className="text-white/80 text-sm">Al-Kaaba Al-Musharrafa</div>
      </div>
    </div>
  );
};

export default KaabaScene;
