import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

// Accurate Kaaba dimensions (real proportions: 13.1m x 11.03m x 12.86m height)
const SCALE = 0.2;
const KAABA_WIDTH = 13.1 * SCALE;
const KAABA_DEPTH = 11.03 * SCALE;
const KAABA_HEIGHT = 12.86 * SCALE;
const GROUND_Y = 0;

// ─── Procedural texture helpers ────────────────────────────────────────

function useMarbleTexture(baseColor: string, veinColor: string, size = 512) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = veinColor;
    ctx.lineWidth = 1;
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      let x = Math.random() * size;
      let y = Math.random() * size;
      ctx.moveTo(x, y);
      for (let j = 0; j < 8; j++) {
        x += (Math.random() - 0.5) * 70;
        y += (Math.random() - 0.5) * 70;
        ctx.lineTo(x, y);
      }
      ctx.globalAlpha = 0.12 + Math.random() * 0.12;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.035})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
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
    ctx.fillStyle = '#040404';
    ctx.fillRect(0, 0, size, size);
    // Silk weave
    ctx.strokeStyle = 'rgba(18,18,18,0.5)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < size; i += 3) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
    }
    // Sheen variation
    for (let i = 0; i < 25; i++) {
      const grd = ctx.createRadialGradient(
        Math.random() * size, Math.random() * size, 0,
        Math.random() * size, Math.random() * size, 60 + Math.random() * 100
      );
      grd.addColorStop(0, 'rgba(25,25,30,0.12)');
      grd.addColorStop(1, 'rgba(4,4,4,0)');
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
    const grd = ctx.createLinearGradient(0, 0, size, size);
    grd.addColorStop(0, '#c9a227');
    grd.addColorStop(0.25, '#d4af37');
    grd.addColorStop(0.5, '#ffd700');
    grd.addColorStop(0.75, '#d4af37');
    grd.addColorStop(1, '#b8860b');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 3000; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [size]);
}

function useBlackStoneTexture(size = 512) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    // Deep dark reddish-black base
    ctx.fillStyle = '#0e0508';
    ctx.fillRect(0, 0, size, size);
    // Cracked surface pattern
    ctx.strokeStyle = 'rgba(40, 10, 15, 0.8)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      let x = Math.random() * size;
      let y = Math.random() * size;
      ctx.moveTo(x, y);
      for (let j = 0; j < 4; j++) {
        x += (Math.random() - 0.5) * 60;
        y += (Math.random() - 0.5) * 60;
        ctx.lineTo(x, y);
      }
      ctx.globalAlpha = 0.5 + Math.random() * 0.4;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // Polished spots (from centuries of kissing/touching)
    for (let i = 0; i < 8; i++) {
      const grd = ctx.createRadialGradient(
        Math.random() * size, Math.random() * size, 0,
        Math.random() * size, Math.random() * size, 20 + Math.random() * 40
      );
      grd.addColorStop(0, 'rgba(30, 15, 20, 0.4)');
      grd.addColorStop(1, 'rgba(10, 5, 8, 0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
    }
    // Subtle metallic flecks
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = `rgba(60, 30, 40, ${Math.random() * 0.3})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
    }
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, [size]);
}

// ─── Kaaba Structure ───────────────────────────────────────────────────

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

  const baseY = GROUND_Y + KAABA_HEIGHT / 2;

  return (
    <group position={[0, baseY, 0]}>
      {/* Inner stone structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[KAABA_WIDTH - 0.02, KAABA_HEIGHT, KAABA_DEPTH - 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Kiswah — 4 sides */}
      {[
        { pos: [0, 0, KAABA_DEPTH / 2 + 0.01] as [number, number, number], rot: [0, 0, 0] as [number, number, number], size: [KAABA_WIDTH, KAABA_HEIGHT] as [number, number] },
        { pos: [0, 0, -KAABA_DEPTH / 2 - 0.01] as [number, number, number], rot: [0, Math.PI, 0] as [number, number, number], size: [KAABA_WIDTH, KAABA_HEIGHT] as [number, number] },
        { pos: [-KAABA_WIDTH / 2 - 0.01, 0, 0] as [number, number, number], rot: [0, -Math.PI / 2, 0] as [number, number, number], size: [KAABA_DEPTH, KAABA_HEIGHT] as [number, number] },
        { pos: [KAABA_WIDTH / 2 + 0.01, 0, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number], size: [KAABA_DEPTH, KAABA_HEIGHT] as [number, number] },
      ].map((side, i) => (
        <mesh key={i} ref={i === 0 ? kiswahRef : undefined} position={side.pos} rotation={side.rot} castShadow>
          <planeGeometry args={[side.size[0], side.size[1], 32, 32]} />
          <meshStandardMaterial map={kiswahTex} color="#080808" roughness={0.65} metalness={0.18} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Hizam — gold band */}
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

      {/* Roof parapet wall */}
      <RoofParapet width={KAABA_WIDTH} depth={KAABA_DEPTH} height={KAABA_HEIGHT} />

      {/* Door */}
      <KaabaDoor position={[0, -0.35, KAABA_DEPTH / 2 + 0.02]} goldTex={goldTex} />

      {/* Calligraphy panels */}
      <CalligraphyPanels width={KAABA_WIDTH} depth={KAABA_DEPTH} height={KAABA_HEIGHT} goldTex={goldTex} />

      {/* Shadharwan */}
      <Shadharwan width={KAABA_WIDTH} depth={KAABA_DEPTH} />

      {/* Meezab */}
      <Meezab goldTex={goldTex} />

      {/* Hijr Ismail */}
      <HijrIsmail />
    </group>
  );
}

// ─── Roof Parapet ──────────────────────────────────────────────────────

function RoofParapet({ width, depth, height }: { width: number; depth: number; height: number }) {
  const wallThickness = 0.04;
  const wallHeight = 0.18;
  const y = height / 2 + wallHeight / 2;

  return (
    <group>
      {/* Low wall around the roof perimeter */}
      {/* Front */}
      <mesh position={[0, y, depth / 2]}>
        <boxGeometry args={[width + 0.08, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Back */}
      <mesh position={[0, y, -depth / 2]}>
        <boxGeometry args={[width + 0.08, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Left */}
      <mesh position={[-width / 2, y, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, depth + 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Right */}
      <mesh position={[width / 2, y, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, depth + 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
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
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[doorWidth + 0.15, doorHeight + 0.15, 0.03]} />
        <meshStandardMaterial map={goldTex} color="#d4af37" roughness={0.2} metalness={0.9} emissive="#d4af37" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[doorWidth + 0.08, doorHeight + 0.08, 0.02]} />
        <meshStandardMaterial map={goldTex} color="#b8860b" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[doorWidth, doorHeight, 0.02]} />
        <meshStandardMaterial map={goldTex} color="#c9a227" roughness={0.3} metalness={0.85} emissive="#d4af37" emissiveIntensity={0.12} />
      </mesh>
      {[-0.1, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0.035]}>
          <boxGeometry args={[0.12, 0.35, 0.01]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      {[-0.08, 0.08].map((x, i) => (
        <group key={i} position={[x, -0.15, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 0.06, 16]} />
            <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, doorHeight / 2 + 0.12, 0.02]}>
        <boxGeometry args={[doorWidth + 0.1, 0.12, 0.015]} />
        <meshStandardMaterial map={goldTex} color="#ffd700" roughness={0.2} metalness={0.9} emissive="#ffd700" emissiveIntensity={0.08} />
      </mesh>
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
    // Front
    for (let i = 0; i < 3; i++) {
      positions.push({ pos: [-0.5 + i * 0.5, -height * 0.25, depth / 2 + 0.018], rot: [0, 0, 0], size: [0.35, 0.5] });
    }
    // Back
    for (let i = 0; i < 3; i++) {
      positions.push({ pos: [-0.5 + i * 0.5, -height * 0.25, -depth / 2 - 0.018], rot: [0, Math.PI, 0], size: [0.35, 0.5] });
    }
    // Sides
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

// ─── Shadharwan ────────────────────────────────────────────────────────

function Shadharwan({ width, depth }: { width: number; depth: number }) {
  return (
    <group position={[0, -KAABA_HEIGHT / 2, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[width + 0.2, 0.15, depth + 0.2]} />
        <meshStandardMaterial color="#e8e4d8" roughness={0.3} metalness={0.05} />
      </mesh>
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
  const marbleTex = useMarbleTexture('#f0ece0', '#d8d0c0', 256);

  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const angle = (i / 40) * Math.PI;
      points.push(new THREE.Vector3(Math.cos(angle) * 1.8, 0, -Math.sin(angle) * 1.2 - KAABA_DEPTH / 2));
    }
    return points;
  }, []);

  return (
    <group position={[0, -KAABA_HEIGHT / 2 + 0.3, 0]}>
      {/* Semi-circular marble wall segments */}
      {curve.slice(0, -1).map((point, i) => {
        const nextPoint = curve[i + 1];
        const midX = (point.x + nextPoint.x) / 2;
        const midZ = (point.z + nextPoint.z) / 2;
        const angle = Math.atan2(nextPoint.x - point.x, nextPoint.z - point.z);
        const length = point.distanceTo(nextPoint);
        return (
          <group key={i}>
            <mesh position={[midX, 0.15, midZ]} rotation={[0, angle, 0]} castShadow>
              <boxGeometry args={[0.1, 0.4, length]} />
              <meshStandardMaterial color="#f5f5f0" roughness={0.3} metalness={0.05} />
            </mesh>
            {/* Gold capping */}
            <mesh position={[midX, 0.36, midZ]} rotation={[0, angle, 0]}>
              <boxGeometry args={[0.12, 0.03, length]} />
              <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
            </mesh>
          </group>
        );
      })}

      {/* Green carpet/floor inside Hijr (as in reality) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -KAABA_DEPTH / 2 - 0.5]}>
        <circleGeometry args={[1.45, 40, 0, Math.PI]} />
        <meshStandardMaterial color="#1a5c2a" roughness={0.7} metalness={0.02} />
      </mesh>

      {/* Marble border inside */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, -KAABA_DEPTH / 2 - 0.5]}>
        <ringGeometry args={[1.4, 1.5, 40, 1, 0, Math.PI]} />
        <meshStandardMaterial map={marbleTex} color="#e8e4d8" roughness={0.35} metalness={0.05} />
      </mesh>
    </group>
  );
}

// ─── Black Stone (Al-Hajar Al-Aswad) — Highly Detailed ─────────────────

function BlackStone() {
  const stoneRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const stoneTex = useBlackStoneTexture();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (stoneRef.current?.material) {
      const mat = stoneRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 1.5) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.2 + Math.sin(t * 1.8) * 0.08;
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.05);
      const mat = outerGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.1 + Math.sin(t * 1.0) * 0.04;
    }
  });

  // Real position: eastern corner, ~1.5m above ground (0.3 scaled)
  const stonePosition: [number, number, number] = [
    KAABA_WIDTH / 2 + 0.02,
    GROUND_Y + 0.3,
    KAABA_DEPTH / 2 + 0.02
  ];

  return (
    <group position={stonePosition}>
      {/* ── Silver frame (Tawq) — ornate octagonal ── */}

      {/* Outer silver border ring */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.1, 8]} />
        <meshStandardMaterial color="#a8a8a8" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Inner silver frame */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.12, 8]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Polished inner ring */}
      <mesh>
        <torusGeometry args={[0.18, 0.02, 16, 32]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.08} metalness={0.98} />
      </mesh>

      {/* Second inner ring */}
      <mesh>
        <torusGeometry args={[0.14, 0.015, 16, 32]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* ── The Black Stone itself — fragmented appearance ── */}

      {/* Main stone body with procedural texture */}
      <mesh ref={stoneRef}>
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial
          map={stoneTex}
          color="#120508"
          roughness={0.45}
          metalness={0.15}
          emissive="#3a0025"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 8 fragments around the main stone (historically it broke into pieces) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angleDeg, i) => {
        const rad = (angleDeg * Math.PI) / 180;
        const dist = 0.09 + (i % 3) * 0.015;
        const fragSize = 0.025 + Math.random() * 0.02;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(rad) * dist,
              (i % 2 === 0 ? 0.02 : -0.02),
              Math.sin(rad) * dist
            ]}
          >
            <dodecahedronGeometry args={[fragSize, 0]} />
            <meshStandardMaterial
              map={stoneTex}
              color="#0e0306"
              roughness={0.55}
              metalness={0.12}
              emissive="#2a0018"
              emissiveIntensity={0.15}
            />
          </mesh>
        );
      })}

      {/* Cement/resin between fragments (lighter color) */}
      {[30, 110, 190, 250, 330].map((angleDeg, i) => {
        const rad = (angleDeg * Math.PI) / 180;
        return (
          <mesh
            key={`cement-${i}`}
            position={[Math.cos(rad) * 0.07, 0, Math.sin(rad) * 0.07]}
          >
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#3a2a1a" roughness={0.8} metalness={0.05} />
          </mesh>
        );
      })}

      {/* ── Divine glow layers ── */}

      {/* Inner glow - warm divine light */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#5a0040" transparent opacity={0.2} />
      </mesh>

      {/* Mid glow */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial color="#3a0030" transparent opacity={0.1} />
      </mesh>

      {/* Outermost ethereal aura */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#2a0020" transparent opacity={0.05} />
      </mesh>

      {/* Dedicated spotlight on the Black Stone */}
      <spotLight
        position={[0.5, 1, 0.5]}
        target-position={[0, 0, 0]}
        angle={0.5}
        penumbra={0.8}
        intensity={2}
        color="#fff0e8"
        distance={5}
        castShadow
      />

      {/* Close-range warm point light */}
      <pointLight position={[0, 0.3, 0.3]} intensity={0.8} color="#ffd700" distance={3} />

      {/* Subtle divine accent light */}
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#8b0060" distance={1.5} />
    </group>
  );
}

// ─── Mataaf Floor ──────────────────────────────────────────────────────

function MataafFloor() {
  const marbleTex = useMarbleTexture('#f5f3ee', '#d5d0c0');
  const innerMarbleTex = useMarbleTexture('#ece8dc', '#c8c0b0', 256);

  return (
    <group>
      {/* Main marble floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y - 0.01, 0]} receiveShadow>
        <circleGeometry args={[14, 128]} />
        <meshStandardMaterial map={marbleTex} color="#f5f3ee" roughness={0.22} metalness={0.06} />
      </mesh>

      {/* Tawaf guidance rings */}
      {[2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y, 0]}>
          <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#ddd8c8' : '#ccc7b8'} roughness={0.35} metalness={0.05} />
        </mesh>
      ))}

      {/* Darker border ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y - 0.005, 0]}>
        <ringGeometry args={[13, 14, 128]} />
        <meshStandardMaterial color="#b8b0a0" roughness={0.4} metalness={0.03} />
      </mesh>

      {/* Black Stone start line (Tawaf starting marker on the ground) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[KAABA_WIDTH / 2 + 0.5, GROUND_Y + 0.005, KAABA_DEPTH / 2]}>
        <planeGeometry args={[1.5, 0.06]} />
        <meshStandardMaterial color="#1a6b2a" roughness={0.5} emissive="#0a3a15" emissiveIntensity={0.2} />
      </mesh>

      {/* Maqam Ibrahim */}
      <group position={[0, GROUND_Y, 2.5]}>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 0.08, 32]} />
          <meshStandardMaterial color="#d4c8a0" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.6, 32]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.85} transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.25]} />
          <meshStandardMaterial color="#8b7355" roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.85} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Zamzam well area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, GROUND_Y + 0.005, 3]} receiveShadow>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial map={innerMarbleTex} color="#e8e4d8" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Extended courtyard */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, GROUND_Y - 0.02, 0]} receiveShadow>
        <ringGeometry args={[14, 25, 128]} />
        <meshStandardMaterial color="#e0dcd0" roughness={0.45} metalness={0.03} />
      </mesh>
    </group>
  );
}

// ─── Colonnade (Arcade arches around courtyard) ────────────────────────

function Colonnade() {
  const archPositions = useMemo(() => {
    const positions: { pos: [number, number, number]; rot: number }[] = [];
    const radius = 16;
    const count = 28;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions.push({
        pos: [Math.cos(angle) * radius, GROUND_Y, Math.sin(angle) * radius],
        rot: angle + Math.PI / 2,
      });
    }
    return positions;
  }, []);

  return (
    <group>
      {archPositions.map((arch, i) => (
        <group key={i} position={arch.pos} rotation={[0, arch.rot, 0]}>
          {/* Column */}
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 5, 12]} />
            <meshStandardMaterial color="#f0ece0" roughness={0.35} metalness={0.05} />
          </mesh>
          {/* Column base */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 0.2, 12]} />
            <meshStandardMaterial color="#e8e4d8" roughness={0.35} metalness={0.05} />
          </mesh>
          {/* Column capital */}
          <mesh position={[0, 5.0, 0]}>
            <cylinderGeometry args={[0.35, 0.2, 0.3, 12]} />
            <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Arch top (simplified) */}
          <mesh position={[0, 5.5, 0]}>
            <boxGeometry args={[0.8, 0.15, 0.3]} />
            <meshStandardMaterial color="#e8e4d8" roughness={0.35} metalness={0.05} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Pilgrims ──────────────────────────────────────────────────────────

function Pilgrims() {
  const pilgrimsRef = useRef<THREE.Group>(null);

  const pilgrims = useMemo(() => {
    const data: { pos: [number, number, number]; scale: number; color: string; skinTone: string }[] = [];
    const skinTones = ['#d4a574', '#c68642', '#8d5524', '#e0ac69', '#f1c27d', '#6b4226'];
    for (let ring = 0; ring < 6; ring++) {
      const radius = 3 + ring * 1.1;
      const count = 16 + ring * 9;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.15;
        const rv = radius + (Math.random() - 0.5) * 0.4;
        data.push({
          pos: [Math.cos(angle) * rv, GROUND_Y, Math.sin(angle) * rv],
          scale: 0.8 + Math.random() * 0.35,
          color: Math.random() > 0.12 ? '#ffffff' : '#f5f5dc',
          skinTone: skinTones[Math.floor(Math.random() * skinTones.length)],
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
          <mesh position={[0, 0.17, 0]}>
            <capsuleGeometry args={[0.045, 0.15, 4, 8]} />
            <meshStandardMaterial color={p.color} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.33, 0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color={p.skinTone} roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Minarets ──────────────────────────────────────────────────────────

function Minarets() {
  const positions: [number, number, number][] = [
    [-12, 0, -12], [12, 0, -12], [-12, 0, 12], [12, 0, 12],
    [-12, 0, 0], [12, 0, 0], [0, 0, -12],
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} position={[pos[0], GROUND_Y, pos[2]]}>
          {/* Base */}
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
          {/* Railing posts */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => {
            const a = (j / 8) * Math.PI * 2;
            return (
              <mesh key={`rail-${j}`} position={[Math.cos(a) * 0.5, 5.8, Math.sin(a) * 0.5]}>
                <cylinderGeometry args={[0.02, 0.02, 0.35, 6]} />
                <meshStandardMaterial color="#e8e4d8" roughness={0.4} />
              </mesh>
            );
          })}
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
      mat.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group>
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
      <mesh ref={lightRayRef} position={[0, 12, 0]}>
        <coneGeometry args={[8, 24, 32, 1, true]} />
        <meshBasicMaterial color="#ffffd0" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[8, 6, 8]} intensity={0.5} color="#ffd700" distance={15} />
      <pointLight position={[-8, 6, -8]} intensity={0.5} color="#ffd700" distance={15} />
      <pointLight position={[8, 6, -8]} intensity={0.35} color="#fff5e0" distance={12} />
      <pointLight position={[-8, 6, 8]} intensity={0.35} color="#fff5e0" distance={12} />
      <directionalLight position={[15, 20, -10]} intensity={0.4} color="#e0e8ff" castShadow />
      <ambientLight intensity={0.22} color="#fff8f0" />
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
        <Colonnade />
        <Pilgrims />
        <Minarets />
        <AmbientParticles />
      </Suspense>
      <fog attach="fog" args={['#0a0a15', 20, 60]} />
      {autoRotate ? (
        <CameraAnimation />
      ) : (
        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={4}
          maxDistance={35}
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)' }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
    </div>
  );
}
