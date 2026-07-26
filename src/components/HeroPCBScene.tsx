import { useRef, useState } from "react";
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

// ─── Camera rig: smooth mouse parallax ───────────────────────────────────────
function CameraRig({ mx, my }: { mx: number; my: number }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mx * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (-my * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.3, 0);
  });
  return null;
}

// ─── Central IEEE PELS Chip ───────────────────────────────────────────────────
function PELSChip({ mx, my }: { mx: number; my: number }) {
  const group = useRef<THREE.Group>(null!);
  const glow = useRef<THREE.Mesh>(null!);
  const logoTex = useTexture("/logo.jpg");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.38) * 0.18;
    group.current.rotation.x += (-my * 0.012 - group.current.rotation.x) * 0.05;
    group.current.rotation.y += (mx * 0.012 - group.current.rotation.y) * 0.05;
    const m = glow.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.28 + Math.sin(t * 0.6) * 0.18;
  });

  return (
    <group ref={group} position={[0, 0.3, 0]}>
      {/* Outer PCB substrate – 5.8 wide */}
      <RoundedBox args={[5.8, 5.8, 0.22]} radius={0.35} smoothness={8}>
        <meshStandardMaterial color="#060606" metalness={0.65} roughness={0.28} />
      </RoundedBox>

      {/* Metallic glowing border ring */}
      <RoundedBox args={[5.95, 5.95, 0.10]} radius={0.38} smoothness={8} position={[0, 0, 0.10]}>
        <meshStandardMaterial
          color="#130307"
          metalness={0.96}
          roughness={0.08}
          emissive="#C8102E"
          emissiveIntensity={0.55}
        />
        <Edges color="#C8102E" threshold={15} />
      </RoundedBox>

      {/* Logo texture – fills chip face */}
      <mesh position={[0, 0, 0.22]}>
        <planeGeometry args={[5.0, 5.0]} />
        <meshStandardMaterial
          map={logoTex}
          metalness={0.15}
          roughness={0.55}
        />
      </mesh>

      {/* Red glow disc underneath logo */}
      <mesh ref={glow} position={[0, 0, 0.18]}>
        <circleGeometry args={[2.8, 64]} />
        <meshBasicMaterial color="#C8102E" transparent opacity={0.32} depthWrite={false} />
      </mesh>

      {/* Corner gold pads × 4 */}
      {([[-2.5, -2.5], [2.5, -2.5], [-2.5, 2.5], [2.5, 2.5]] as [number, number][]).map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.22]}>
          <boxGeometry args={[0.28, 0.28, 0.06]} />
          <meshStandardMaterial color="#C8102E" metalness={0.92} roughness={0.08} emissive="#C8102E" emissiveIntensity={0.7} />
        </mesh>
      ))}

      {/* Chip ambient light */}
      <pointLight color="#C8102E" intensity={4} distance={6} position={[0, 0, 2]} />
    </group>
  );
}

// ─── PCB Surface ──────────────────────────────────────────────────────────────
function PCBSurface() {
  const planeRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    (planeRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.055 + Math.sin(t * 0.7) * 0.025;
  });

  return (
    <group position={[0, -4.2, -1.5]} rotation={[-Math.PI / 2.4, 0, 0]}>
      {/* Main PCB plane */}
      <mesh>
        <planeGeometry args={[22, 14]} />
        <meshStandardMaterial color="#020902" metalness={0.25} roughness={0.75} transparent opacity={0.88} />
      </mesh>
      {/* Trace glow overlay */}
      <mesh ref={planeRef} position={[0, 0, 0.01]}>
        <planeGeometry args={[22, 14]} />
        <meshBasicMaterial color="#C8102E" transparent opacity={0.06} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── Animated current pulse on PCB traces ─────────────────────────────────────
function PCBTraces() {
  const pulse1 = useRef<THREE.Mesh>(null!);
  const pulse2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Horizontal trace pulse
    pulse1.current.position.x = -9 + ((t * 1.8) % 18);
    (pulse1.current.material as THREE.MeshBasicMaterial).opacity =
      0.55 + Math.sin(t * 4) * 0.3;
    // Vertical trace pulse
    pulse2.current.position.y = -5 + ((t * 1.4) % 10);
    (pulse2.current.material as THREE.MeshBasicMaterial).opacity =
      0.4 + Math.sin(t * 3.5 + 1) * 0.25;
  });

  return (
    <group position={[0, -2.8, -0.3]}>
      {/* Static horizontal traces */}
      {([-2.5, -0.8, 0.8, 2.5] as number[]).map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <planeGeometry args={[18, 0.012]} />
          <meshBasicMaterial color="#C8102E" transparent opacity={0.10} />
        </mesh>
      ))}
      {/* Static vertical traces */}
      {([-4, -1, 1, 4] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[10, 0.012]} />
          <meshBasicMaterial color="#C8102E" transparent opacity={0.08} />
        </mesh>
      ))}
      {/* Animated pulses */}
      <mesh ref={pulse1} position={[-9, -0.8, 0.003]}>
        <planeGeometry args={[1.2, 0.012]} />
        <meshBasicMaterial color="#ff3355" transparent opacity={0.7} depthWrite={false} />
      </mesh>
      <mesh ref={pulse2} position={[-1, -5, 0.003]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[1.0, 0.012]} />
        <meshBasicMaterial color="#ff3355" transparent opacity={0.6} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── Hardware component ───────────────────────────────────────────────────────
type Shape = "mosfet" | "inductor" | "capacitor" | "diode" | "ic" | "regulator";

interface HWProps {
  position: [number, number, number];
  label: string;
  shape?: Shape;
  speed?: number;
  amp?: number;
  rotSpeed?: number;
  delay?: number;
  scale?: number;
}

function HardwareComp({
  position,
  label,
  shape = "ic",
  speed = 0.32,
  amp = 0.22,
  rotSpeed = 0.003,
  delay = 0,
  scale = 1,
}: HWProps) {
  const ref = useRef<THREE.Group>(null!);
  const [hov, setHov] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    ref.current.position.y = position[1] + Math.sin(t * speed) * amp;
    ref.current.rotation.y += rotSpeed * (hov ? 2.5 : 1);
    ref.current.rotation.x = Math.sin(t * 0.22) * 0.06;
  });

  const body = () => {
    switch (shape) {
      case "mosfet":
        return (
          <>
            <mesh scale={[scale, scale, scale]}>
              <boxGeometry args={[0.9, 1.3, 0.38]} />
              <meshStandardMaterial color="#0d0d0d" metalness={0.85} roughness={0.18} />
            </mesh>
            {([-0.28, 0, 0.28] as number[]).map((x, i) => (
              <mesh key={i} position={[x * scale, -1.05 * scale, 0]} scale={[scale, scale, scale]}>
                <boxGeometry args={[0.07, 0.38, 0.07]} />
                <meshStandardMaterial color="#999" metalness={1} roughness={0.08} />
              </mesh>
            ))}
            <Edges color="#C8102E" threshold={15} />
          </>
        );

      case "inductor":
        return (
          <>
            <mesh scale={[scale, scale, scale]}>
              <torusGeometry args={[0.72, 0.26, 20, 48]} />
              <meshStandardMaterial color="#7a3a0a" metalness={0.5} roughness={0.38} />
            </mesh>
            <mesh scale={[scale, scale, scale]}>
              <torusGeometry args={[0.72, 0.29, 10, 48]} />
              <meshBasicMaterial color="#C8102E" transparent opacity={0.18} wireframe />
            </mesh>
          </>
        );

      case "capacitor":
        return (
          <>
            <mesh scale={[scale, scale, scale]}>
              <cylinderGeometry args={[0.38, 0.38, 1.1, 40]} />
              <meshStandardMaterial color="#141414" metalness={0.72} roughness={0.28} />
            </mesh>
            <mesh position={[0, 0.56 * scale, 0]} scale={[scale, scale, scale]}>
              <cylinderGeometry args={[0.38, 0.38, 0.06, 40]} />
              <meshStandardMaterial color="#555" metalness={0.92} roughness={0.08} />
            </mesh>
            <mesh position={[0.32 * scale, 0, 0]} scale={[scale, scale, scale]}>
              <boxGeometry args={[0.1, 1.05, 0.18]} />
              <meshBasicMaterial color="#fff" transparent opacity={0.45} />
            </mesh>
          </>
        );

      case "diode":
        return (
          <>
            <mesh scale={[scale, scale, scale]}>
              <cylinderGeometry args={[0.18, 0.18, 0.82, 20]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.65} roughness={0.42} />
            </mesh>
            {([0.48, -0.48] as number[]).map((y, i) => (
              <mesh key={i} position={[0, y * scale, 0]} scale={[scale, scale, scale]}>
                <cylinderGeometry args={[0.07, 0.07, 0.22, 14]} />
                <meshStandardMaterial color="#aaa" metalness={1} roughness={0.08} />
              </mesh>
            ))}
            <mesh position={[-0.15 * scale, 0, 0]} scale={[scale, scale, scale]}>
              <boxGeometry args={[0.07, 0.76, 0.22]} />
              <meshBasicMaterial color="#C8102E" transparent opacity={0.65} />
            </mesh>
          </>
        );

      case "regulator":
        return (
          <>
            <mesh scale={[scale, scale, scale]}>
              <boxGeometry args={[1.1, 0.7, 0.22]} />
              <meshStandardMaterial color="#080808" metalness={0.82} roughness={0.2} />
            </mesh>
            {([-0.35, -0.12, 0.12, 0.35] as number[]).map((x, i) => (
              <>
                <mesh key={`t${i}`} position={[x * scale, 0.48 * scale, 0]} scale={[scale, scale, scale]}>
                  <boxGeometry args={[0.07, 0.2, 0.06]} />
                  <meshStandardMaterial color="#ccc" metalness={1} roughness={0.1} />
                </mesh>
                <mesh key={`b${i}`} position={[x * scale, -0.48 * scale, 0]} scale={[scale, scale, scale]}>
                  <boxGeometry args={[0.07, 0.2, 0.06]} />
                  <meshStandardMaterial color="#ccc" metalness={1} roughness={0.1} />
                </mesh>
              </>
            ))}
            <Edges color="#C8102E" threshold={15} />
          </>
        );

      default: // ic
        return (
          <>
            <mesh scale={[scale, scale, scale]}>
              <boxGeometry args={[1.1, 0.82, 0.2]} />
              <meshStandardMaterial color="#080808" metalness={0.82} roughness={0.2} />
            </mesh>
            {([-0.34, -0.11, 0.11, 0.34] as number[]).map((x, i) => (
              <>
                <mesh key={`t${i}`} position={[x * scale, 0.52 * scale, 0]} scale={[scale, scale, scale]}>
                  <boxGeometry args={[0.08, 0.22, 0.06]} />
                  <meshStandardMaterial color="#bbb" metalness={1} roughness={0.1} />
                </mesh>
                <mesh key={`b${i}`} position={[x * scale, -0.52 * scale, 0]} scale={[scale, scale, scale]}>
                  <boxGeometry args={[0.08, 0.22, 0.06]} />
                  <meshStandardMaterial color="#bbb" metalness={1} roughness={0.1} />
                </mesh>
              </>
            ))}
            <Edges color="#C8102E" threshold={15} />
          </>
        );
    }
  };

  return (
    <group
      ref={ref}
      position={position}
      onPointerEnter={() => setHov(true)}
      onPointerLeave={() => setHov(false)}
    >
      {body()}
      <pointLight color="#C8102E" intensity={hov ? 5 : 2} distance={3.5} />
      {hov && (
        <Billboard position={[0, 1.4 * scale, 0]}>
          <mesh>
            <planeGeometry args={[1.8, 0.42]} />
            <meshBasicMaterial color="#C8102E" transparent opacity={0.14} />
          </mesh>
          <Text
            fontSize={0.17}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            {label}
          </Text>
        </Billboard>
      )}
    </group>
  );
}

// ─── Full scene ───────────────────────────────────────────────────────────────
function Scene({ mx, my }: { mx: number; my: number }) {
  return (
    <>
      {/* Cinematic 3-point lighting */}
      <ambientLight intensity={0.12} />
      <directionalLight position={[-5, 8, 4]} intensity={2.8} color="#ffffff" />
      <pointLight position={[7, -4, 3]} intensity={5} color="#C8102E" distance={18} />
      <pointLight position={[0, 3, -7]} intensity={2.2} color="#ffffff" distance={12} />
      <spotLight
        position={[0, 10, 3]}
        intensity={1.6}
        angle={0.38}
        penumbra={1}
        color="#fff4f4"
        castShadow={false}
      />

      <CameraRig mx={mx} my={my} />

      {/* Central chip – hero centerpiece */}
      <PELSChip mx={mx} my={my} />

      {/* PCB base surface */}
      <PCBSurface />
      <PCBTraces />

      {/* ── 6 hardware components distributed around chip ── */}
      {/* Upper-left: Toroidal Inductor */}
      <HardwareComp
        position={[-5.8, 2.4, 0.8]}
        label="INDUCTOR"
        shape="inductor"
        speed={0.26}
        amp={0.24}
        delay={0}
        scale={1.4}
      />
      {/* Upper-right: MOSFET */}
      <HardwareComp
        position={[5.6, 2.8, 0.5]}
        label="MOSFET"
        shape="mosfet"
        speed={0.3}
        amp={0.20}
        rotSpeed={0.005}
        delay={1.5}
        scale={1.3}
      />
      {/* Far right: Electrolytic Capacitor */}
      <HardwareComp
        position={[6.8, -0.4, -0.5]}
        label="CAPACITOR"
        shape="capacitor"
        speed={0.24}
        amp={0.28}
        delay={0.8}
        scale={1.35}
      />
      {/* Lower-right: Gate Driver IC */}
      <HardwareComp
        position={[4.8, -3.4, 0.3]}
        label="GATE DRIVER"
        shape="ic"
        speed={0.28}
        amp={0.18}
        rotSpeed={0.004}
        delay={2.5}
        scale={1.3}
      />
      {/* Lower-left: Diode */}
      <HardwareComp
        position={[-4.4, -3.2, 0.6]}
        label="SCHOTTKY DIODE"
        shape="diode"
        speed={0.36}
        amp={0.16}
        delay={2.0}
        scale={1.3}
      />
      {/* Left: Voltage Regulator */}
      <HardwareComp
        position={[-6.5, -0.6, -0.4]}
        label="VOLTAGE REGULATOR"
        shape="regulator"
        speed={0.22}
        amp={0.22}
        delay={0.5}
        scale={1.35}
      />

      {/* Ambient sparkle dust */}
      <Sparkles
        count={70}
        scale={16}
        size={0.55}
        speed={0.12}
        color="#C8102E"
        opacity={0.2}
      />
    </>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function HeroPCBScene() {
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  return (
    <motion.div
      className="w-full h-full absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
    >
      <Canvas
        camera={{ position: [0, 1, 11], fov: 52 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          alpha: true,
        }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        onPointerMove={(e) => {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          setMx(((e.clientX - rect.left) / rect.width - 0.5) * 2);
          setMy(((e.clientY - rect.top) / rect.height - 0.5) * 2);
        }}
        onPointerLeave={() => { setMx(0); setMy(0); }}
      >
        <Scene mx={mx} my={my} />
      </Canvas>
    </motion.div>
  );
}
