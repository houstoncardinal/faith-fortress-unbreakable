
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
      const time = state.clock.elapsedTime * 0.05; // Even slower, more reverent rotation
      cameraRef.current.position.x = Math.sin(time) * 7;
      cameraRef.current.position.z = Math.cos(time) * 7;
      cameraRef.current.lookAt(0, 1.8, 0);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[5, 3, 5]}
      fov={45}
    />
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full bg-gradient-to-b from-slate-900 to-slate-800">
    <div className="flex items-center gap-3 text-white p-6 rounded-lg bg-black/40 backdrop-blur-sm">
      <Loader2 className="w-6 h-6 animate-spin text-gold" />
      <div>
        <div className="font-arabic text-lg">جاري التحميل...</div>
        <div className="text-sm opacity-75">Loading the Sacred House...</div>
      </div>
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
        camera={{ position: [5, 3, 5], fov: 45 }}
        className="rounded-lg"
      >
        <Suspense fallback={null}>
          {/* Divine Lighting Setup */}
          <ambientLight intensity={0.4} color="#F8F8FF" />
          
          {/* Main divine light from above */}
          <directionalLight
            position={[0, 15, 0]}
            intensity={1.2}
            color="#FFFACD"
            castShadow
          />
          
          {/* Blessed light from the east */}
          <directionalLight
            position={[10, 8, 5]}
            intensity={0.8}
            color="#FFE4B5"
          />
          
          {/* Soft light from the west */}
          <directionalLight
            position={[-8, 6, -3]}
            intensity={0.5}
            color="#F0F8FF"
          />
          
          {/* Sacred point light above Kaaba */}
          <pointLight 
            position={[0, 10, 0]} 
            intensity={0.8} 
            color="#FFFACD"
            distance={20}
            decay={1.5}
          />
          
          {/* Gentle rim lighting */}
          <pointLight 
            position={[0, 3, -10]} 
            intensity={0.4} 
            color="#E6E6FA"
          />

          {/* Blessed light particles */}
          <pointLight 
            position={[5, 8, 5]} 
            intensity={0.3} 
            color="#F0F8FF"
          />
          <pointLight 
            position={[-5, 8, -5]} 
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
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={4}
              maxDistance={15}
              minPolarAngle={Math.PI / 8}
              maxPolarAngle={Math.PI / 2.1}
              target={[0, 1.8, 0]}
              autoRotateSpeed={0.3}
            />
          )}
        </Suspense>
      </Canvas>
      
      {/* Sacred Overlay */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-xl p-5 border border-gold/30 shadow-2xl">
        <div className="font-arabic text-white text-2xl mb-2 leading-relaxed">بَيْتِ اللَّهِ الْحَرَامِ</div>
        <div className="text-white/95 text-sm font-medium mb-1">The Sacred House of Allah</div>
        <div className="text-white/80 text-xs italic">Makkah Al-Mukarramah, Saudi Arabia</div>
        <div className="text-white/70 text-xs mt-2">القِبْلَة • The Direction of Prayer</div>
      </div>

      {/* Quranic Verse with Enhanced Styling */}
      <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-primary/95 to-accent/90 backdrop-blur-md rounded-xl p-5 text-center border border-gold/40 shadow-2xl">
        <div className="font-arabic text-white text-lg leading-relaxed mb-3">
          إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ مُبَارَكًا وَهُدًى لِّلْعَالَمِينَ
        </div>
        <div className="text-white/95 text-sm italic font-medium leading-relaxed mb-2">
          "Indeed, the first House [of worship] established for mankind was that at Bakkah - blessed and a guidance for the worlds."
        </div>
        <div className="text-white/80 text-xs">Surah Ali-Imran (3:96)</div>
      </div>

      {/* Subtle floating particles for blessed atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 10}%`,
              top: `${15 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default KaabaScene;
