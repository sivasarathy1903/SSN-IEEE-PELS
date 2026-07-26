import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Text,
  Billboard,
  useTexture,
  Line,
} from "@react-three/drei";
import * as THREE from "three";

// Preload logo texture immediately on script parse
useTexture.preload("/logo.jpg");

// Global cached PCB texture for instant 0ms mount
let globalPCBTexture: THREE.CanvasTexture | null = null;

function getPCBTexture() {
  if (globalPCBTexture) return globalPCBTexture;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Matte black PCB base matching #050706 exactly
  ctx.fillStyle = "#050706";
  ctx.fillRect(0, 0, 1024, 1024);

  // Fiber weave pattern on right 60%
  ctx.fillStyle = "rgba(255, 255, 255, 0.025)";
  for (let i = 400; i < 1024; i += 8) {
    ctx.fillRect(i, 0, 4, 1024);
    ctx.fillRect(0, i, 1024, 4);
  }

  // Draw copper traces with fade-in gradient from left to right
  const chipCenterX = 640;
  const chipCenterY = 512;

  const nodes = [
    { x: 340, y: 240 },   // Inductor
    { x: 880, y: 210 },   // MOSFET
    { x: 940, y: 540 },   // Capacitor
    { x: 845, y: 825 },   // Gate Driver
    { x: 420, y: 810 },   // Diode
  ];

  // Copper traces
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#8b4822";
  ctx.lineCap = "round";
  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.moveTo(chipCenterX, chipCenterY);
    const midX = (chipCenterX + node.x) / 2;
    ctx.lineTo(midX, chipCenterY);
    ctx.lineTo(midX + (node.y > chipCenterY ? 40 : -40), node.y);
    ctx.lineTo(node.x, node.y);
    ctx.stroke();
  });

  // Glowing red power traces
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(235, 25, 55, 0.9)";
  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.moveTo(chipCenterX, chipCenterY);
    const midX = (chipCenterX + node.x) / 2;
    ctx.lineTo(midX, chipCenterY);
    ctx.lineTo(midX + (node.y > chipCenterY ? 40 : -40), node.y);
    ctx.lineTo(node.x, node.y);
    ctx.stroke();
  });

  // Vias & Solder Pads
  nodes.forEach((node) => {
    ctx.fillStyle = "#e5a83b";
    ctx.beginPath();
    ctx.arc(node.x, node.y, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#050706";
    ctx.beginPath();
    ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Scattered SMD 0805 pads on right side
  for (let i = 0; i < 70; i++) {
    const rx = Math.random() * 600 + 400;
    const ry = Math.random() * 900 + 50;
    ctx.fillStyle = "#d49b2c";
    ctx.fillRect(rx, ry, 9, 4.5);
    ctx.fillRect(rx + 13, ry, 9, 4.5);
  }

  // Soft gradient overlay fading left side (0..520px) to pure #050706
  const fadeGrad = ctx.createLinearGradient(0, 0, 520, 0);
  fadeGrad.addColorStop(0, "#050706");
  fadeGrad.addColorStop(0.55, "#050706");
  fadeGrad.addColorStop(1, "rgba(5, 7, 6, 0)");
  ctx.fillStyle = fadeGrad;
  ctx.fillRect(0, 0, 520, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  globalPCBTexture = texture;
  return texture;
}

// ─── Camera Rig (Mouse Parallax) ─────────────────────────────────────────────
function CameraRig({ mx, my }: { mx: number; my: number }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mx * 0.3 - camera.position.x) * 0.04;
    camera.position.y += (-my * 0.2 - camera.position.y) * 0.04;
    camera.rotation.x = -my * 0.02;
    camera.rotation.y = mx * 0.02;
  });
  return null;
}

// ─── PCB Surface Mesh ────────────────────────────────────────────────────────
function PCBSurface() {
  const pcbTexture = getPCBTexture();
  return (
    <mesh position={[0, -0.6, -0.4]} rotation={[-0.55, 0.12, 0.04]} receiveShadow>
      <planeGeometry args={[32, 20]} />
      <meshStandardMaterial
        map={pcbTexture}
        roughness={0.75}
        metalness={0.15}
      />
    </mesh>
  );
}

// ─── Central Processor Package (IEEE PELS SSN Microprocessor) ────────────────
function CentralChip({ mx, my }: { mx: number; my: number }) {
  const group = useRef<THREE.Group>(null!);
  const logoTexture = useTexture("/logo.jpg");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.position.y = 0.1 + Math.sin(t * 0.35) * 0.05;
    group.current.rotation.x = -0.55 + (-my * 0.012);
    group.current.rotation.y = 0.12 + (mx * 0.012);
  });

  return (
    <group ref={group} position={[2.5, 0.1, 0.2]} rotation={[-0.55, 0.12, 0.04]}>
      {/* Black Ceramic Base Substrate */}
      <RoundedBox args={[4.2, 4.2, 0.32]} radius={0.35} smoothness={8}>
        <meshStandardMaterial
          color="#0a0b0e"
          roughness={0.25}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Brushed Metal Bevel Outer Ring */}
      <RoundedBox args={[4.34, 4.34, 0.10]} radius={0.38} smoothness={8} position={[0, 0, 0.1]}>
        <meshStandardMaterial
          color="#1b1c24"
          metalness={0.92}
          roughness={0.12}
          emissive="#C8102E"
          emissiveIntensity={0.25}
        />
      </RoundedBox>

      {/* Crisp IEEE PELS SSN Logo Printed Flat on Surface with Vibrant Self-Glow */}
      <mesh position={[0, 0, 0.17]}>
        <planeGeometry args={[3.6, 3.6]} />
        <meshStandardMaterial
          map={logoTexture}
          emissiveMap={logoTexture}
          emissive="#ffffff"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.0}
        />
      </mesh>

      {/* Soft Ambient Red Under-Edge Glow Lip */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[4.8, 4.8]} />
        <meshBasicMaterial color="#C8102E" transparent opacity={0.6} depthWrite={false} />
      </mesh>

      {/* Direct Point Light under Chip & onto Logo casting intense vivid glow */}
      <pointLight color="#ffffff" intensity={6.0} distance={5} position={[0, 0, 1.2]} />
      <pointLight color="#C8102E" intensity={8.0} distance={7} position={[0, 0, 0.4]} />
    </group>
  );
}

// ─── Toroidal Inductor (Upper Left) ──────────────────────────────────────────
function ToroidalInductor({ position, label }: { position: [number, number, number]; label: string }) {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.position.y = position[1] + Math.sin(t * 0.3 + 0.5) * 0.08;
    group.current.rotation.y = Math.sin(t * 0.15) * 0.04;
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[-0.55, 0.12, 0.04]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Dark Ferrite Torus Core */}
      <mesh castShadow>
        <torusGeometry args={[0.9, 0.38, 24, 48]} />
        <meshStandardMaterial color="#141416" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Copper Wire Windings (28 radial Turns) */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <torusGeometry args={[0.42, 0.07, 12, 24]} />
            <meshStandardMaterial
              color="#B87333"
              metalness={0.96}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      {/* Solder Legs */}
      <mesh position={[-0.5, -1.0, -0.2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.4, 12]} />
        <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.5, -1.0, -0.2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.4, 12]} />
        <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Sleek Floating Holographic Label */}
      <HoloLabel label={label} hovered={hovered} leaderStart={[0, 1.1, 0]} labelPos={[-0.6, 1.8, 0]} />
    </group>
  );
}

// ─── TO-220 MOSFET (Upper Right) ─────────────────────────────────────────────
function MOSFETComponent({ position, label }: { position: [number, number, number]; label: string }) {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.position.y = position[1] + Math.sin(t * 0.32 + 1.2) * 0.07;
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[-0.55, 0.12, 0.04]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Black Plastic Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 1.5, 0.4]} />
        <meshStandardMaterial color="#0d0e12" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Silver Metallic Heatsink Tab */}
      <mesh position={[0, 1.1, -0.1]}>
        <boxGeometry args={[1.2, 0.8, 0.12]} />
        <meshStandardMaterial color="#c5c8d0" metalness={0.98} roughness={0.1} />
      </mesh>

      {/* Tab Mounting Hole */}
      <mesh position={[0, 1.2, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 3 Metal Leads */}
      {[-0.35, 0, 0.35].map((x, i) => (
        <mesh key={i} position={[x, -1.2, 0]}>
          <boxGeometry args={[0.08, 0.9, 0.06]} />
          <meshStandardMaterial color="#b0b5c0" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      <HoloLabel label={label} hovered={hovered} leaderStart={[0, 1.6, 0]} labelPos={[0, 2.2, 0]} />
    </group>
  );
}

// ─── Electrolytic Capacitor (Far Right) ──────────────────────────────────────
function ElectrolyticCapacitor({ position, label }: { position: [number, number, number]; label: string }) {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.position.y = position[1] + Math.sin(t * 0.28 + 2.0) * 0.08;
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[-0.55, 0.12, 0.04]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Aluminum Cylinder Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.85, 2.0, 48]} />
        <meshStandardMaterial color="#121620" metalness={0.82} roughness={0.25} />
      </mesh>

      {/* Silver Top Vent Aluminum Cap */}
      <mesh position={[0, 1.01, 0]}>
        <cylinderGeometry args={[0.84, 0.84, 0.04, 48]} />
        <meshStandardMaterial color="#d0d5e0" metalness={0.98} roughness={0.08} />
      </mesh>

      {/* Silver Negative Stripe */}
      <mesh position={[0.7, 0, 0]}>
        <boxGeometry args={[0.15, 1.95, 0.3]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>

      <HoloLabel label={label} hovered={hovered} leaderStart={[0, 1.3, 0]} labelPos={[0.8, 1.9, 0]} />
    </group>
  );
}

// ─── Gate Driver IC - QFP (Lower Right) ──────────────────────────────────────
function GateDriverIC({ position, label }: { position: [number, number, number]; label: string }) {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.position.y = position[1] + Math.sin(t * 0.34 + 0.8) * 0.06;
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[-0.55, 0.12, 0.04]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Square IC Molded Case */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.7, 1.7, 0.32]} />
        <meshStandardMaterial color="#0b0c10" roughness={0.25} metalness={0.75} />
      </mesh>

      {/* Pin 1 Dimple Dot */}
      <mesh position={[-0.6, 0.6, 0.17]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshBasicMaterial color="#333" />
      </mesh>

      {/* 16 Gull-Wing Metal Pins */}
      {[-0.5, -0.18, 0.18, 0.5].map((pos, i) => (
        <group key={i}>
          {/* Top side pins */}
          <mesh position={[pos, 0.95, -0.05]}>
            <boxGeometry args={[0.08, 0.3, 0.05]} />
            <meshStandardMaterial color="#b5bac5" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Bottom side pins */}
          <mesh position={[pos, -0.95, -0.05]}>
            <boxGeometry args={[0.08, 0.3, 0.05]} />
            <meshStandardMaterial color="#b5bac5" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Left side pins */}
          <mesh position={[-0.95, pos, -0.05]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.08, 0.3, 0.05]} />
            <meshStandardMaterial color="#b5bac5" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Right side pins */}
          <mesh position={[0.95, pos, -0.05]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.08, 0.3, 0.05]} />
            <meshStandardMaterial color="#b5bac5" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}

      <HoloLabel label={label} hovered={hovered} leaderStart={[0, -1.1, 0]} labelPos={[0, -1.8, 0]} />
    </group>
  );
}

// ─── Axial Schottky Diode (Lower Left) ───────────────────────────────────────
function AxialDiode({ position, label }: { position: [number, number, number]; label: string }) {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.position.y = position[1] + Math.sin(t * 0.31 + 1.7) * 0.07;
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={[-0.55, 0.12, 0.8]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Cylindrical Diode Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1.4, 32]} />
        <meshStandardMaterial color="#101217" roughness={0.35} metalness={0.65} />
      </mesh>

      {/* Silver Cathode Band */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.305, 0.305, 0.22, 32]} />
        <meshStandardMaterial color="#c0c5d0" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Axial Silver Leads */}
      {[-0.95, 0.95].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 12]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      <HoloLabel label={label} hovered={hovered} leaderStart={[0, -1.0, 0]} labelPos={[0, -1.7, 0]} />
    </group>
  );
}

// ─── Floating Holographic Label Component ─────────────────────────────────────
function HoloLabel({
  label,
  hovered,
  leaderStart,
  labelPos,
}: {
  label: string;
  hovered: boolean;
  leaderStart: [number, number, number];
  labelPos: [number, number, number];
}) {
  return (
    <Billboard position={[0, 0, 0]}>
      {/* Subtle Leader Line matching screenshot */}
      <Line
        points={[leaderStart, labelPos]}
        color={hovered ? "#C8102E" : "#ffffff"}
        lineWidth={hovered ? 2 : 1}
        transparent
        opacity={hovered ? 0.9 : 0.45}
      />
      {/* Label Text Box */}
      <group position={labelPos}>
        <mesh>
          <planeGeometry args={[label.length * 0.16 + 0.4, 0.42]} />
          <meshBasicMaterial
            color={hovered ? "#C8102E" : "#05070a"}
            transparent
            opacity={hovered ? 0.85 : 0.6}
          />
        </mesh>
        <Text
          fontSize={0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
          fontWeight="bold"
        >
          {label}
        </Text>
      </group>
    </Billboard>
  );
}

// ─── Trace Electrical Current Pulses ──────────────────────────────────────────
function TraceCurrentPulses() {
  const pulseRef1 = useRef<THREE.Mesh>(null!);
  const pulseRef2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Pulse 1 towards MOSFET
    pulseRef1.current.position.x = 1.8 + Math.cos(t * 1.5) * 3.5;
    pulseRef1.current.position.y = 0.15 + Math.sin(t * 1.5) * 2.2;
    // Pulse 2 towards Diode
    pulseRef2.current.position.x = 1.8 - Math.cos(t * 1.2) * 3.8;
    pulseRef2.current.position.y = 0.15 - Math.sin(t * 1.2) * 2.5;
  });

  return (
    <group rotation={[-0.55, 0.12, 0.04]}>
      <mesh ref={pulseRef1} position={[1.8, 0.15, 0.1]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ff3355" transparent opacity={0.85} />
      </mesh>
      <mesh ref={pulseRef2} position={[1.8, 0.15, 0.1]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ff3355" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

// ─── Scene Master ─────────────────────────────────────────────────────────────
function Scene({ mx, my }: { mx: number; my: number }) {
  return (
    <>
      {/* Realistic Cinematic Lighting */}
      <ambientLight intensity={0.5} />
      {/* Key Light: Soft White positioned overhead center-right */}
      <directionalLight position={[4, 8, 5]} intensity={3.2} color="#ffffff" castShadow />
      {/* Fill Light: IEEE Red bottom-right */}
      <pointLight position={[8, -5, 4]} intensity={7.0} color="#C8102E" distance={20} />
      {/* Rim Light: White behind chip */}
      <pointLight position={[1.8, 3, -6]} intensity={4.5} color="#ffffff" distance={15} />

      <CameraRig mx={mx} my={my} />

      {/* Ground PCB */}
      <PCBSurface />
      <TraceCurrentPulses />

      {/* Central IEEE PELS SSN Microprocessor */}
      <CentralChip mx={mx} my={my} />

      {/* 5 Surrounding Engineering Components matching screenshot */}
      <ToroidalInductor position={[-1.4, 2.2, 0.4]} label="INDUCTOR" />
      <MOSFETComponent position={[5.8, 2.5, 0.5]} label="MOSFET" />
      <ElectrolyticCapacitor position={[6.8, -0.4, 0.6]} label="CAPACITOR" />
      <GateDriverIC position={[5.2, -2.8, 0.4]} label="GATE DRIVER" />
      <AxialDiode position={[-0.4, -2.7, 0.5]} label="DIODE" />
    </>
  );
}

// ─── Exported 3D Scene Component ──────────────────────────────────────────────
export default function HeroPCBScene() {
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  return (
    <div
      className="w-full h-full absolute inset-0 pointer-events-auto"
    >
      <Canvas
        camera={{ position: [0, 0, 12.8], fov: 42 }}
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
        <Suspense fallback={null}>
          <Scene mx={mx} my={my} />
        </Suspense>
      </Canvas>
    </div>
  );
}
