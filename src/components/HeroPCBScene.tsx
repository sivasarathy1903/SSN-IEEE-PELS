import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Text,
  Edges,
  Billboard,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// ─── Mouse parallax context ───────────────────────────────────────────────────
function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── IEEE PELS Central Chip ───────────────────────────────────────────────────
function PELSChip({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const logoTexture = useTexture("/logo.jpg");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Breathing float
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.12;
    // Very gentle tilt from mouse
    groupRef.current.rotation.x += (-mouseY * 0.008 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (mouseX * 0.008 - groupRef.current.rotation.y) * 0.04;
    // Glow pulse
    const glowMat = glowRef.current.material as THREE.MeshBasicMaterial;
    glowMat.opacity = 0.3 + Math.sin(t * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* PCB Board base */}
      <RoundedBox args={[3.2, 3.2, 0.14]} radius={0.22} smoothness={6} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#080808"
          metalness={0.6}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Metallic border ring */}
      <RoundedBox args={[3.3, 3.3, 0.06]} radius={0.24} smoothness={6} position={[0, 0, 0.05]}>
        <meshStandardMaterial
          color="#1a0508"
          metalness={0.95}
          roughness={0.1}
          emissive="#C8102E"
          emissiveIntensity={0.4}
        />
        <Edges color="#C8102E" threshold={15} />
      </RoundedBox>

      {/* Logo plane embedded in chip */}
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[2.6, 2.6]} />
        <meshStandardMaterial
          map={logoTexture}
          transparent={false}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>

      {/* Inner red glow disc */}
      <mesh ref={glowRef} position={[0, 0, 0.08]}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial color="#C8102E" transparent opacity={0.35} depthWrite={false} />
      </mesh>

      {/* Corner contact pads */}
      {[
        [-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.12]}>
          <boxGeometry args={[0.18, 0.18, 0.04]} />
          <meshStandardMaterial color="#C8102E" metalness={0.9} roughness={0.1} emissive="#C8102E" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// ─── PCB Surface ──────────────────────────────────────────────────────────────
function PCBSurface() {
  const lineRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mat = lineRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.06 + Math.sin(t * 0.8) * 0.03;
  });

  return (
    <group position={[0, -2.2, -0.5]} rotation={[-Math.PI / 2.1, 0, 0]}>
      {/* PCB plane */}
      <mesh>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial
          color="#030b02"
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Glowing trace overlay */}
      <mesh ref={lineRef} position={[0, 0, 0.005]}>
        <planeGeometry args={[14, 8]} />
        <meshBasicMaterial
          color="#C8102E"
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Generic floating hardware component ──────────────────────────────────────
interface ComponentProps {
  position: [number, number, number];
  label: string;
  shape?: "mosfet" | "inductor" | "capacitor" | "diode" | "ic" | "buck";
  floatSpeed?: number;
  floatAmp?: number;
  rotSpeed?: number;
  delay?: number;
}

function HardwareComponent({
  position,
  label,
  shape = "ic",
  floatSpeed = 0.35,
  floatAmp = 0.18,
  rotSpeed = 0.003,
  delay = 0,
}: ComponentProps) {
  const ref = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    ref.current.position.y = position[1] + Math.sin(t * floatSpeed) * floatAmp;
    ref.current.rotation.y += rotSpeed * (hovered ? 2 : 1);
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.04;
  });

  const color = "#C8102E";

  const renderShape = () => {
    switch (shape) {
      case "mosfet":
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.5, 0.7, 0.2]} />
              <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Legs */}
            {[-0.15, 0, 0.15].map((x, i) => (
              <mesh key={i} position={[x, -0.55, 0]}>
                <boxGeometry args={[0.04, 0.2, 0.04]} />
                <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
              </mesh>
            ))}
            <Edges color={color} threshold={15} />
          </group>
        );

      case "inductor":
        return (
          <group>
            {/* Toroid torus */}
            <mesh>
              <torusGeometry args={[0.38, 0.14, 16, 40]} />
              <meshStandardMaterial color="#8B4513" metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Winding glow */}
            <mesh>
              <torusGeometry args={[0.38, 0.16, 8, 40]} />
              <meshBasicMaterial color={color} transparent opacity={0.15} wireframe />
            </mesh>
          </group>
        );

      case "capacitor":
        return (
          <group>
            <mesh>
              <cylinderGeometry args={[0.22, 0.22, 0.6, 32]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.31, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.04, 32]} />
              <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Stripe */}
            <mesh position={[0.18, 0, 0]}>
              <boxGeometry args={[0.06, 0.58, 0.1]} />
              <meshBasicMaterial color="#fff" transparent opacity={0.5} />
            </mesh>
          </group>
        );

      case "diode":
        return (
          <group>
            <mesh>
              <cylinderGeometry args={[0.1, 0.1, 0.45, 16]} />
              <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
            </mesh>
            {[0.25, -0.25].map((y, i) => (
              <mesh key={i} position={[0, y, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
                <meshStandardMaterial color="#aaa" metalness={1} roughness={0.1} />
              </mesh>
            ))}
            <mesh position={[-0.08, 0, 0]}>
              <boxGeometry args={[0.04, 0.42, 0.15]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} />
            </mesh>
          </group>
        );

      case "ic":
      default:
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.7, 0.5, 0.12]} />
              <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
            </mesh>
            {[-0.22, 0, 0.22].map((x, i) => (
              <>
                <mesh key={`t${i}`} position={[x, 0.31, 0]}>
                  <boxGeometry args={[0.05, 0.12, 0.04]} />
                  <meshStandardMaterial color="#bbb" metalness={1} roughness={0.1} />
                </mesh>
                <mesh key={`b${i}`} position={[x, -0.31, 0]}>
                  <boxGeometry args={[0.05, 0.12, 0.04]} />
                  <meshStandardMaterial color="#bbb" metalness={1} roughness={0.1} />
                </mesh>
              </>
            ))}
            <Edges color={color} threshold={15} />
          </group>
        );
    }
  };

  return (
    <group
      ref={ref}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {renderShape()}

      {/* Red ambient glow */}
      <pointLight color="#C8102E" intensity={hovered ? 3 : 1.2} distance={1.8} />

      {/* Holographic hover label */}
      {hovered && (
        <Billboard position={[0, 0.8, 0]}>
          <mesh>
            <planeGeometry args={[1.2, 0.32]} />
            <meshBasicMaterial color="#C8102E" transparent opacity={0.15} />
          </mesh>
          <Text
            fontSize={0.14}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font={undefined}
            letterSpacing={0.08}
          >
            {label}
          </Text>
        </Billboard>
      )}
    </group>
  );
}

// ─── Ambient PCB trace current pulses (lines) ─────────────────────────────────
function PCBTraces() {
  const pulseRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    pulseRef.current.position.x = -6 + ((t * 1.2) % 12);
    (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(t * 3) * 0.3;
  });

  return (
    <group position={[0, -1.5, -0.2]}>
      {/* Static trace lines */}
      {[[-3, 0], [0, 0.5], [2, -0.3], [-1, -0.6]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0]} rotation={[0, 0, (i % 2 === 0 ? 0 : Math.PI / 2)]}>
          <planeGeometry args={[3.5, 0.008]} />
          <meshBasicMaterial color="#C8102E" transparent opacity={0.12} />
        </mesh>
      ))}
      {/* Current pulse */}
      <mesh ref={pulseRef} position={[-6, 0, 0.002]}>
        <planeGeometry args={[0.5, 0.008]} />
        <meshBasicMaterial color="#ff4466" transparent opacity={0.7} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── Scene composition ────────────────────────────────────────────────────────
function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.15} />
      {/* Key light – soft white top-left */}
      <directionalLight position={[-4, 6, 3]} intensity={2.2} color="#ffffff" />
      {/* Fill light – IEEE red bottom-right */}
      <pointLight position={[5, -3, 2]} intensity={3} color="#C8102E" distance={12} />
      {/* Rim light – white behind */}
      <pointLight position={[0, 2, -5]} intensity={1.5} color="#ffffff" distance={8} />
      {/* Subtle top glow */}
      <spotLight position={[0, 8, 2]} intensity={1} angle={0.4} penumbra={1} color="#fff5f5" />

      <CameraRig mouseX={mouseX} mouseY={mouseY} />

      {/* Central IEEE PELS chip */}
      <PELSChip mouseX={mouseX} mouseY={mouseY} />

      {/* PCB surface below chip */}
      <PCBSurface />
      <PCBTraces />

      {/* 6 floating hardware components */}
      <HardwareComponent
        position={[-3.4, 1.6, 0.4]}
        label="INDUCTOR"
        shape="inductor"
        floatSpeed={0.28}
        floatAmp={0.15}
        delay={0}
      />
      <HardwareComponent
        position={[3.2, 1.8, 0.2]}
        label="MOSFET"
        shape="mosfet"
        floatSpeed={0.32}
        floatAmp={0.12}
        rotSpeed={0.004}
        delay={1.5}
      />
      <HardwareComponent
        position={[3.6, -1.2, 0.3]}
        label="CAPACITOR"
        shape="capacitor"
        floatSpeed={0.25}
        floatAmp={0.2}
        delay={0.8}
      />
      <HardwareComponent
        position={[-1.2, -2.6, 0.5]}
        label="DIODE"
        shape="diode"
        floatSpeed={0.38}
        floatAmp={0.1}
        delay={2.2}
      />
      <HardwareComponent
        position={[1.4, -2.4, 0.4]}
        label="GATE DRIVER IC"
        shape="ic"
        floatSpeed={0.3}
        floatAmp={0.14}
        rotSpeed={0.003}
        delay={3.0}
      />
      <HardwareComponent
        position={[-3.6, -1.0, 0.3]}
        label="BUCK CONVERTER"
        shape="ic"
        floatSpeed={0.22}
        floatAmp={0.18}
        delay={1.0}
      />

      {/* Sparkle dust */}
      <Sparkles
        count={55}
        scale={10}
        size={0.4}
        speed={0.15}
        color="#C8102E"
        opacity={0.25}
      />
    </>
  );
}

// ─── Loading fallback ─────────────────────────────────────────────────────────
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-2 border-primary/40 border-t-primary rounded-full animate-spin"></div>
        <span className="text-xs font-mono-data text-primary/60 tracking-widest uppercase">Loading 3D Scene</span>
      </div>
    </div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
export default function HeroPCBScene() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    setMouseY(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  return (
    <motion.div
      className="w-full h-full min-h-[500px] relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4 }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          dpr={[1, 2]}
          style={{ background: "transparent" }}
        >
          <Scene mouseX={mouseX} mouseY={mouseY} />
        </Canvas>
      </Suspense>
    </motion.div>
  );
}
