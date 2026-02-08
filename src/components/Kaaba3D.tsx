import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// Accurate Kaaba dimensions (real proportions: 13.1m x 11.03m x 12.86m height)
// Scaled to 1 unit = 5m for comfortable viewing
const SCALE = 0.2;
const KAABA_WIDTH = 13.1 * SCALE;   // ~2.62
const KAABA_DEPTH = 11.03 * SCALE;  // ~2.21
const KAABA_HEIGHT = 12.86 * SCALE; // ~2.57

// Ground level — everything sits ON this plane
const GROUND_Y = 0;

// ─── Procedural texture helpers ────────────────────────────────────────
function useMarbleTexture(baseColor: string, veinColor: string, size = 512) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Base
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, size, size);

    // Marble veins
    ctx.strokeStyle = veinColor;
    ctx.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      let x = Math.random() * size;
      let y = Math.random() * size;
      ctx.moveTo(x, y);
      for (let j = 0; j < 6; j++) {
        x += (Math.random() - 0.5) * 80;
        y += (Math.random() - 0.5) * 80;
        ctx.lineTo(x, y);
      }
      ctx.globalAlpha = 0.15 + Math.random() * 0.15;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Subtle grain
    for (let i = 0; i < 4000; i++) {
      const gx = Math.random() * size;
      const gy = Math.random() * size;
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.04})`;
      ctx.fillRect(gx, gy, 1, 1);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, [baseColor, veinColor, size]);
}

function useKiswahTexture(size = 1024) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Deep black silk base
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, size, size);

    // Subtle silk weave pattern
    ctx.strokeStyle = 'rgba(20,20,20,0.6)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < size; i += 4) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();
    }

    // Subtle sheen variation
    for (let i = 0; i < 20; i++) {
      const grd = ctx.createRadialGradient(
        Math.random() * size, Math.random() * size, 0,
        Math.random() * size, Math.random() * size, 80 + Math.random() * 120
      );
      grd.addColorStop(0, 'rgba(30,30,35,0.15)');
      grd.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [size]);
}

function useGoldTexture(size = 512) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Gold base
    const grd = ctx.createLinearGradient(0, 0, size, size);
    grd.addColorStop(0, '#c9a227');
    grd.addColorStop(0.3, '#d4af37');
    grd.addColorStop(0.5, '#ffd700');
    grd.addColorStop(0.7, '#d4af37');
    grd.addColorStop(1, '#b8860b');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);

    // Hammered metal texture
    for (let i = 0; i < 2000; i++) {
      const gx = Math.random() * size;
      const gy = Math.random() * size;
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
      ctx.fillRect(gx, gy, 2, 2);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [size]);
}

// ─── Kaaba Main Structure ──────────────────────────────────────────────
function KaabaStructure() {
  const kiswahRef = useRef<THREE.Mesh>(null);
  const kiswahTex = useKiswahTexture();
  const goldTex = useGoldTexture();

  useFrame((state) => {
    if (kiswahRef.current) {
      const mat = kiswahRef.current.material as THREE.MeshStandardMaterial;
      mat.displacementScale = 0.002 + Math.sin(state.clock.elapsedTime * 0.5) * 0.001;
    }
  });

  // Kaaba bottom at GROUND_Y, center at GROUND_Y + height/2
  const baseY = GROUND_Y + KAABA_HEIGHT / 2;

  return (
    <group position={[0, baseY, 0]}>
      {/* Inner stone structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[KAABA_WIDTH - 0.02, KAABA_HEIGHT, KAABA_DEPTH - 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Kiswah — 4 sides with procedural silk texture */}
      {[
        { pos: [0, 0, KAABA_DEPTH / 2 + 0.01] as [number, number, number], rot: [0, 0, 0] as [number, number, number], size: [KAABA_WIDTH, KAABA_HEIGHT] as [number, number] },
        { pos: [0, 0, -KAABA_DEPTH / 2 - 0.01] as [number, number, number], rot: [0, Math.PI, 0] as [number, number, number], size: [KAABA_WIDTH, KAABA_HEIGHT] as [number, number] },
        { pos: [-KAABA_WIDTH / 2 - 0.01, 0, 0] as [number, number, number], rot: [0, -Math.PI / 2, 0] as [number, number, number], size: [KAABA_DEPTH, KAABA_HEIGHT] as [number, number] },
        { pos: [KAABA_WIDTH / 2 + 0.01, 0, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number], size: [KAABA_DEPTH, KAABA_HEIGHT] as [number, number] },
      ].map((side, i) => (
        <mesh key={i} ref={i === 0 ? kiswahRef : undefined} position={side.pos} rotation={side.rot} castShadow>
          <planeGeometry args={[side.size[0], side.size[1], 32, 32]} />
          <meshStandardMaterial
            map={kiswahTex}
            color="#080808"
            roughness={0.65}
            metalness={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Hizam — gold embroidered band at 2/3 height */}
      <GoldBand position={[0, KAABA_HEIGHT * 0.17, 0]} width={KAABA_WIDTH} depth={KAABA_DEPTH} goldTex={goldTex} />

      {/* Top gold trim */}
      <mesh position={[0, KAABA_HEIGHT / 2 - 0.05, 0]}>
        <boxGeometry args={[KAABA_WIDTH + 0.04, 0.08, KAABA_DEPTH + 0.04]} />
        <meshStandardMaterial map={goldTex} color="#c9a227" roughness={0.25} metalness={0.85} emissive="#d4af37" emissiveIntensity={0.12} />
      </mesh>

      {/* Bottom gold trim */}
      <mesh position={[0, -KAABA_HEIGHT / 2 + 0.04, 0]}>
        <boxGeometry args={[KAABA_WIDTH + 0.04, 0.06, KAABA_DEPTH + 0.04]} />
        <meshStandardMaterial map={goldTex} color="#b8860b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Door (Bab al-Kaaba) — front face */}
      <KaabaDoor position={[0, -0.35, KAABA_DEPTH / 2 + 0.02]} goldTex={goldTex} />

      {/* Calligraphy panels */}
      <CalligraphyPanels width={KAABA_WIDTH} depth={KAABA_DEPTH} height={KAABA_HEIGHT} goldTex={goldTex} />

      {/* Shadharwan (marble apron at base) */}
      <Shadharwan width={KAABA_WIDTH} depth={KAABA_DEPTH} />

      {/* Meezab (golden rainwater spout on roof) */}
      <Meezab goldTex={goldTex} />

      {/* Hijr Ismail (semi-circular wall) */}
      <HijrIsmail />
    </group>
  );
}

// ─── Gold Band ─────────────────────────────────────────────────────────
function GoldBand({ position, width, depth, goldTex }: { position: [number, number, number]; width: number; depth: number; goldTex: THREE.Texture }) {
  const bandHeight = 0.35;
  const sides = [
    { pos: [0, 0, depth / 2 + 0.015] as [number, number, number], rot: [0, 0, 0] as [number, number, number], w: width },
    { pos: [0, 0, -depth / 2 - 0.015] as [number, number, number], rot: [0, Math.PI, 0] as [number, number, number], w: width },
    { pos: [-width / 2 - 0.015, 0, 0] as [number, number, number], rot: [0, -Math.PI / 2, 0] as [number, number, number], w: depth },
    { pos: [width / 2 + 0.015, 0, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number], w: depth },
  ];

  return (
    <group position={position}>
      {sides.map((s, i) => (
        <group key={i}>
          <mesh position={s.pos} rotation={s.rot}>
            <planeGeometry args={[s.w, bandHeight]} />
            <meshStandardMaterial map={goldTex} color="#b8860b" roughness={0.3} metalness={0.8} emissive="#d4af37" emissiveIntensity={0.1} />
          </mesh>
          {/* Calligraphy detail lines */}
          {[-0.12, 0, 0.12].map((y, j) => (
            <mesh key={j} position={[s.pos[0], s.pos[1] + y, s.pos[2] + (i < 2 ? 0.005 : 0)] as [number, number, number]} rotation={s.rot}>
              <planeGeometry args={[s.w * 0.9, 0.02]} />
              <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// ─── Door ──────────────────────────────────────────────────────────────
function KaabaDoor({ position, goldTex }: { position: [number, number, number]; goldTex: THREE.Texture }) {
  const doorWidth = 0.42;
  const doorHeight = 0.68;

  return (
    <group position={position}>
      {/* Outer gold frame */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[doorWidth + 0.15, doorHeight + 0.15, 0.03]} />
        <meshStandardMaterial map={goldTex} color="#d4af37" roughness={0.2} metalness={0.9} emissive="#d4af37" emissiveIntensity={0.15} />
      </mesh>
      {/* Inner decorative border */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[doorWidth + 0.08, doorHeight + 0.08, 0.02]} />
        <meshStandardMaterial map={goldTex} color="#b8860b" roughness={0.25} metalness={0.85} />
      </mesh>
      {/* Main door surface */}
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[doorWidth, doorHeight, 0.02]} />
        <meshStandardMaterial map={goldTex} color="#c9a227" roughness={0.3} metalness={0.85} emissive="#d4af37" emissiveIntensity={0.12} />
      </mesh>
      {/* Decorative panels */}
      {[-0.1, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0.035]}>
          <boxGeometry args={[0.12, 0.35, 0.01]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      {/* Door handles */}
      {[-0.08, 0.08].map((x, i) => (
        <group key={i} position={[x, -0.15, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 0.06, 16]} />
            <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
          </mesh>
        </group>
      ))}
      {/* Quranic inscription above door */}
      <mesh position={[0, doorHeight / 2 + 0.12, 0.02]}>
        <boxGeometry args={[doorWidth + 0.1, 0.12, 0.015]} />
        <meshStandardMaterial map={goldTex} color="#ffd700" roughness={0.2} metalness={0.9} emissive="#ffd700" emissiveIntensity={0.08} />
      </mesh>
      {/* Steps leading to door — grounded relative to Kaaba base */}
      {[0, 1, 2].map((step) => (
        <mesh key={step} position={[0, -doorHeight / 2 - 0.05 - step * 0.08, 0.15 + step * 0.1]}>
          <boxGeometry args={[doorWidth + 0.3 + step * 0.1, 0.06, 0.08]} />
          <meshStandardMaterial color="#e8e4d8" roughness={0.35} metalness={0.08} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Calligraphy Panels ────────────────────────────────────────────────
function CalligraphyPanels({ width, depth, height, goldTex }: { width: number; depth: number; height: number; goldTex: THREE.Texture }) {
  const panelPositions = useMemo(() => {
    const positions: { pos: [number, number, number]; rot: [number, number, number]; size: [number, number] }[] = [];
    for (let i = 0; i < 3; i++) {
      positions.push({ pos: [-0.5 + i * 0.5, -height * 0.25, depth / 2 + 0.018], rot: [0, 0, 0], size: [0.35, 0.5] });
    }
    for (let i = 0; i < 2; i++) {
      positions.push({ pos: [-width / 2 - 0.018, -height * 0.25, -0.3 + i * 0.6], rot: [0, -Math.PI / 2, 0], size: [0.35, 0.5] });
      positions.push({ pos: [width / 2 + 0.018, -height * 0.25, -0.3 + i * 0.6], rot: [0, Math.PI / 2, 0], size: [0.35, 0.5] });
    }
    return positions;
  }, [width, depth, height]);

  return (
    <>
      {panelPositions.map((panel, i) => (
        <group key={i} position={panel.pos} rotation={panel.rot}>
          <mesh>
            <planeGeometry args={panel.size} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.8} transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.001]}>
            <ringGeometry args={[panel.size[0] * 0.45, panel.size[0] * 0.48, 32]} />
            <meshStandardMaterial map={goldTex} color="#d4af37" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.002]}>
            <circleGeometry args={[panel.size[0] * 0.35, 32]} />
            <meshStandardMaterial map={goldTex} color="#c9a227" roughness={0.35} metalness={0.75} />
          </mesh>
        </group>
      ))}
    </>
  );
}

// ─── Shadharwan (marble base / apron) ──────────────────────────────────
function Shadharwan({ width, depth }: { width: number; depth: number }) {
  return (
    <group position={[0, -KAABA_HEIGHT / 2, 0]}>
      {/* Sloped marble apron — sits flush at Kaaba base */}
      <mesh receiveShadow>
        <boxGeometry args={[width + 0.2, 0.15, depth + 0.2]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Gold trim */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[width + 0.22, 0.02, depth + 0.22]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

// ─── Meezab ────────────────────────────────────────────────────────────
function Meezab({ goldTex }: { goldTex: THREE.Texture }) {
  return (
    <group position={[0, KAABA_HEIGHT / 2 - 0.3, -KAABA_DEPTH / 2 - 0.15]} rotation={[-0.3, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.25, 0.08, 0.4]} />
        <meshStandardMaterial map={goldTex} color="#d4af37" roughness={0.2} metalness={0.9} emissive="#d4af37" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 0.02, 0.1]}>
        <boxGeometry args={[0.15, 0.04, 0.45]} />
        <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
      </mesh>
      <mesh position={[0, 0, 0.25]}>
        <cylinderGeometry args={[0.08, 0.12, 0.1, 8]} />
        <meshStandardMaterial map={goldTex} color="#d4af37" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

// ─── Hijr Ismail ───────────────────────────────────────────────────────
function HijrIsmail() {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI;
      points.push(new THREE.Vector3(Math.cos(angle) * 1.8, 0, -Math.sin(angle) * 1.2 - KAABA_DEPTH / 2));
    }
    return points;
  }, []);

  return (
    <group position={[0, -KAABA_HEIGHT / 2 + 0.3, 0]}>
      {curve.slice(0, -1).map((point, i) => {
        const nextPoint = curve[i + 1];
        const midX = (point.x + nextPoint.x) / 2;
        const midZ = (point.z + nextPoint.z) / 2;
        const angle = Math.atan2(nextPoint.x - point.x, nextPoint.z - point.z);
        const length = point.distanceTo(nextPoint);
        return (
          <group key={i}>
            <mesh position={[midX, 0.15, midZ]} rotation={[0, angle, 0]} castShadow>
              <boxGeometry args={[0.08, 0.35, length]} />
              <meshStandardMaterial color="#f5f5f0" roughness={0.35} metalness={0.05} />
            </mesh>
            <mesh position={[midX, 0.34, midZ]} rotation={[0, angle, 0]}>
              <boxGeometry args={[0.1, 0.03, length]} />
              <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
            </mesh>
          </group>
        );
      })}
      {/* Marble floor inside Hijr */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -KAABA_DEPTH / 2 - 0.5]}>
        <circleGeometry args={[1.5, 32, 0, Math.PI]} />
        <meshStandardMaterial color="#f0ece0" roughness={0.4} metalness={0.05} />
      </mesh>
    </group>
  );
}

// ─── Black Stone (Al-Hajar Al-Aswad) ──────────────────────────────────
function BlackStone() {
  const stoneRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (stoneRef.current?.material) {
      const mat = stoneRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.25 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  // Eastern corner, ~1.5m above ground (scaled)
  const stoneY = GROUND_Y + KAABA_HEIGHT * 0.12 + KAABA_HEIGHT / 2 * 0; // relative to structure center
  const stonePosition: [number, number, number] = [KAABA_WIDTH / 2, GROUND_Y + 0.5, KAABA_DEPTH / 2];

  return (
    <group position={stonePosition}>
      {/* Silver frame (Tawq) */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 8]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Inner silver ring */}
      <mesh>
        <torusGeometry args={[0.15, 0.025, 16, 32]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.1} metalness={0.95} />
      </mesh>
      {/* The Stone */}
      <mesh ref={stoneRef}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color="#1a0a0a" roughness={0.5} metalness={0.2} emissive="#2a0020" emissiveIntensity={0.25} />
      </mesh>
      {/* Fragment details */}
      {[0, 72, 144, 216, 288].map((a, i) => (
        <mesh key={i} rotation={[0, (a * Math.PI) / 180, 0]} position={[0.08, 0, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#150808" roughness={0.6} metalness={0.15} />
        </mesh>
      ))}
      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#4a0040" transparent opacity={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#3a0030" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

// ─── Mataaf Floor (with procedural marble) ─────────────────────────────
function MataafFloor() {
  const marbleTex = useMarbleTexture('#f5f3ee', '#d5d0c0');
  const innerMarbleTex = useMarbleTexture('#ece8dc', '#c8c0b0', 256);

  return (
    <group>
      {/* Main marble floor — flush at GROUND_Y */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y - 0.01, 0]} receiveShadow>
        <circleGeometry args={[14, 128]} />
        <meshStandardMaterial
          map={marbleTex}
          color="#f5f3ee"
          roughness={0.22}
          metalness={0.06}
        />
      </mesh>

      {/* Tawaf guidance rings */}
      {[2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y, 0]}>
          <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#ddd8c8' : '#ccc7b8'}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Darker border tiles — outer ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y - 0.005, 0]}>
        <ringGeometry args={[13, 14, 128]} />
        <meshStandardMaterial color="#b8b0a0" roughness={0.4} metalness={0.03} />
      </mesh>

      {/* Maqam Ibrahim — sits on ground */}
      <group position={[0, GROUND_Y, 2.5]}>
        {/* Gold & glass enclosure */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.6, 32]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.85} transparent opacity={0.7} />
        </mesh>
        {/* Stone base */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 0.08, 32]} />
          <meshStandardMaterial color="#d4c8a0" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Inner footprint stone */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.25]} />
          <meshStandardMaterial color="#8b7355" roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Dome top */}
        <mesh position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.85} transparent opacity={0.55} />
        </mesh>
      </group>

      {/* Zamzam well area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, GROUND_Y + 0.005, 3]} receiveShadow>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial map={innerMarbleTex} color="#e8e4d8" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Extended courtyard beyond Mataaf */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y - 0.02, 0]} receiveShadow>
        <ringGeometry args={[14, 25, 128]} />
        <meshStandardMaterial color="#e0dcd0" roughness={0.45} metalness={0.03} />
      </mesh>
    </group>
  );
}

// ─── Pilgrims ──────────────────────────────────────────────────────────
function Pilgrims() {
  const pilgrimsRef = useRef<THREE.Group>(null);

  const pilgrims = useMemo(() => {
    const data: { pos: [number, number, number]; scale: number; color: string }[] = [];
    for (let ring = 0; ring < 5; ring++) {
      const radius = 3 + ring * 1.2;
      const count = 15 + ring * 8;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.15;
        const rv = radius + (Math.random() - 0.5) * 0.4;
        data.push({
          pos: [Math.cos(angle) * rv, GROUND_Y, Math.sin(angle) * rv],
          scale: 0.85 + Math.random() * 0.3,
          color: Math.random() > 0.15 ? '#ffffff' : '#f5f5dc',
        });
      }
    }
    return data;
  }, []);

  useFrame((state) => {
    if (pilgrimsRef.current) {
      pilgrimsRef.current.rotation.y = -state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={pilgrimsRef}>
      {pilgrims.map((p, i) => (
        <group key={i} position={p.pos} scale={p.scale}>
          {/* Body — bottom at y=0, so person stands on ground */}
          <mesh position={[0, 0.17, 0]}>
            <capsuleGeometry args={[0.045, 0.15, 4, 8]} />
            <meshStandardMaterial color={p.color} roughness={0.7} />
          </mesh>
          {/* Head */}
          <mesh position={[0, 0.33, 0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#d4a574" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Minarets ──────────────────────────────────────────────────────────
function Minarets() {
  const positions: [number, number, number][] = [
    [-10, 0, -10], [10, 0, -10], [-10, 0, 10], [10, 0, 10],
    [-10, 0, 0], [10, 0, 0], [0, 0, -10],
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} position={[pos[0], GROUND_Y, pos[2]]}>
          {/* Base — bottom at ground */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.5, 0.6, 0.6, 8]} />
            <meshStandardMaterial color="#f5f5f0" roughness={0.4} />
          </mesh>
          {/* Main tower */}
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.25, 0.45, 5, 16]} />
            <meshStandardMaterial color="#f8f8f5" roughness={0.35} />
          </mesh>
          {/* First balcony */}
          <mesh position={[0, 5.5, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.25, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.8} />
          </mesh>
          {/* Upper tower */}
          <mesh position={[0, 6.8, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 2.2, 16]} />
            <meshStandardMaterial color="#f8f8f5" roughness={0.35} />
          </mesh>
          {/* Second balcony */}
          <mesh position={[0, 8, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.8} />
          </mesh>
          {/* Spire */}
          <mesh position={[0, 9.2, 0]}>
            <coneGeometry args={[0.18, 2, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.85} />
          </mesh>
          {/* Crescent */}
          <group position={[0, 10.4, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.12, 0.015, 8, 24, Math.PI * 1.6]} />
              <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} emissive="#ffd700" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[0.08, 0, 0]}>
              <octahedronGeometry args={[0.04]} />
              <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} emissive="#ffd700" emissiveIntensity={0.3} />
            </mesh>
          </group>
          <pointLight position={[0, 7, 0]} intensity={0.3} color="#ffd700" distance={5} />
        </group>
      ))}
    </>
  );
}

// ─── Ambient Particles ─────────────────────────────────────────────────
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 8;
      const radius = 2 + (i / count) * 12;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = GROUND_Y + 0.5 + Math.random() * 14;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
      const isGold = Math.random() > 0.5;
      colors[i * 3] = isGold ? 0.83 : 1;
      colors[i * 3 + 1] = isGold ? 0.69 : 0.98;
      colors[i * 3 + 2] = isGold ? 0.22 : 0.9;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={600} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={600} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ─── Lighting ──────────────────────────────────────────────────────────
function SceneLighting() {
  const lightRayRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (lightRayRef.current) {
      lightRayRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      const mat = lightRayRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group>
      {/* Primary divine spotlight from above */}
      <spotLight
        position={[0, 25, 0]}
        angle={0.35}
        penumbra={1}
        intensity={3}
        color="#fffef0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Volumetric light cone */}
      <mesh ref={lightRayRef} position={[0, 12, 0]}>
        <coneGeometry args={[8, 24, 32, 1, true]} />
        <meshBasicMaterial color="#ffffd0" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>

      {/* Warm accent lights */}
      <pointLight position={[8, 6, 8]} intensity={0.5} color="#ffd700" distance={15} />
      <pointLight position={[-8, 6, -8]} intensity={0.5} color="#ffd700" distance={15} />
      <pointLight position={[8, 6, -8]} intensity={0.35} color="#fff5e0" distance={12} />
      <pointLight position={[-8, 6, 8]} intensity={0.35} color="#fff5e0" distance={12} />

      {/* Directional moonlight */}
      <directionalLight position={[15, 20, -10]} intensity={0.4} color="#e0e8ff" castShadow />

      {/* Ambient + hemisphere */}
      <ambientLight intensity={0.2} color="#fff8f0" />
      <hemisphereLight args={['#1a1a3a', '#0a0a0a', 0.3]} />
    </group>
  );
}

// ─── Camera ────────────────────────────────────────────────────────────
function CameraAnimation() {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.08;
    const radius = 14 + Math.sin(t * 0.5) * 3;
    camera.position.x = Math.sin(t) * radius;
    camera.position.z = Math.cos(t) * radius;
    camera.position.y = GROUND_Y + 6 + Math.sin(t * 0.3) * 3;
    camera.lookAt(0, GROUND_Y + KAABA_HEIGHT * 0.4, 0);
  });
  return null;
}

// ─── Loading fallback ──────────────────────────────────────────────────
function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.y = state.clock.elapsedTime;
  });
  return (
    <mesh ref={meshRef} position={[0, GROUND_Y + 1.25, 0]}>
      <boxGeometry args={[2, 2.5, 2]} />
      <meshBasicMaterial color="#333333" wireframe />
    </mesh>
  );
}

// ─── Main Scene ────────────────────────────────────────────────────────
function Scene({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      <color attach="background" args={['#05050f']} />

      <Stars radius={150} depth={80} count={8000} factor={5} saturation={0.1} fade speed={0.5} />

      <Sparkles count={150} scale={20} size={2} speed={0.3} color="#ffd700" opacity={0.35} />

      <SceneLighting />

      <Suspense fallback={<LoadingFallback />}>
        <KaabaStructure />
        <BlackStone />
        <MataafFloor />
        <Pilgrims />
        <Minarets />
        <AmbientParticles />
      </Suspense>

      <fog attach="fog" args={['#0a0a15', 18, 55]} />

      {autoRotate ? (
        <CameraAnimation />
      ) : (
        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={5}
          maxDistance={30}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, GROUND_Y + KAABA_HEIGHT * 0.35, 0]}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
      )}
    </>
  );
}

// ─── Export ─────────────────────────────────────────────────────────────
interface Kaaba3DProps {
  autoRotate?: boolean;
  className?: string;
}

export default function Kaaba3D({ autoRotate = false, className = '' }: Kaaba3DProps) {
  return (
    <div className={`relative w-full h-full min-h-[400px] ${className}`}>
      <Canvas
        shadows
        camera={{ position: [12, 7, 12], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        dpr={[1, 2]}
      >
        <Scene autoRotate={autoRotate} />
      </Canvas>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)' }}
      />
      {/* Bottom gradient blend */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
    </div>
  );
}
