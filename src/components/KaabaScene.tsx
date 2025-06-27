
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Html } from '@react-three/drei';
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
  <Html center>
    <div className="flex items-center gap-2 text-primary">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="font-arabic">جاري التحميل...</span>
    </div>
  </Html>
);

interface KaabaSceneProps {
  autoRotate?: boolean;
  showControls?: boolean;
}

const KaabaScene = ({ autoRotate = false, showControls = true }: KaabaSceneProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        camera={{ position: [5, 3, 5], fov: 60 }}
        onCreated={() => setIsLoading(false)}
        className="rounded-lg"
      >
        <Suspense fallback={<LoadingSpinner />}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffd700" />
          
          {/* Environment */}
          <Environment preset="sunset" background={false} />
          
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
