
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
      const time = state.clock.elapsedTime * 0.08; // Slower, more respectful rotation
      cameraRef.current.position.x = Math.sin(time) * 6;
      cameraRef.current.position.z = Math.cos(time) * 6;
      cameraRef.current.lookAt(0, 1.5, 0);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[4, 2.5, 4]}
      fov={50} // Slightly narrower field of view for more focused view
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
        camera={{ position: [4, 2.5, 4], fov: 50 }}
        className="rounded-lg"
      >
        <Suspense fallback={null}>
          {/* Soft ambient lighting */}
          <ambientLight intensity={0.5} color="#F0F8FF" />
          
          {/* Main directional light - like sunlight */}
          <directionalLight
            position={[8, 12, 6]}
            intensity={0.9}
            color="#FFFACD"
          />
          
          {/* Secondary light for depth */}
          <directionalLight
            position={[-4, 8, -4]}
            intensity={0.4}
            color="#E6E6FA"
          />
          
          {/* Warm point light from above - divine light */}
          <pointLight 
            position={[0, 8, 0]} 
            intensity={0.6} 
            color="#FFE4B5"
            distance={15}
            decay={2}
          />
          
          {/* Subtle rim lighting */}
          <pointLight 
            position={[0, 2, -8]} 
            intensity={0.3} 
            color="#F0F8FF"
          />
          
          {/* Camera Controller */}
          <CameraController autoRotate={autoRotate} />
          
          {/* Main Model */}
          <KaabaModel />
          
          {/* Controls */}
          {showControls && (
            <OrbitControls
              enablePan={false} // Disable panning for more respectful interaction
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={12}
              minPolarAngle={Math.PI / 6} // Prevent looking from too low
              maxPolarAngle={Math.PI / 2.2} // Prevent looking from too high
              target={[0, 1.5, 0]} // Focus on center of Kaaba
              autoRotateSpeed={0.5} // Slower rotation
            />
          )}
        </Suspense>
      </Canvas>
      
      {/* Islamic Overlay with more respectful styling */}
      <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
        <div className="font-arabic text-white text-xl mb-1">بَيْتِ اللَّهِ الْحَرَامِ</div>
        <div className="text-white/90 text-sm font-medium">The Sacred House of Allah</div>
        <div className="text-white/70 text-xs mt-1 italic">Makkah Al-Mukarramah</div>
      </div>

      {/* Quranic verse overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur-sm rounded-lg p-3 text-center border border-accent/30">
        <div className="font-arabic text-white text-sm leading-relaxed mb-1">
          وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا
        </div>
        <div className="text-white/90 text-xs italic">
          "And pilgrimage to the House is a duty unto Allah for mankind, for him who can find a way thither."
        </div>
        <div className="text-white/70 text-xs mt-1">Surah Ali-Imran (3:97)</div>
      </div>
    </div>
  );
};

export default KaabaScene;
