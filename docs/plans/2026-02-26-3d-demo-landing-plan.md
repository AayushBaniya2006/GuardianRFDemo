# 3D Defense Demo Landing — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the GuardianRF homepage with a tactical airspace 3D demo UI using React Three Fiber — minimal text, defense-grade aesthetic, interactive HUD panels.

**Architecture:** Full-screen R3F Canvas with HTML HUD overlay panels. Minimal DemoTopBar with hidden nav overlay. Mobile shows CSS radar fallback (no WebGL). Homepage moved out of `(marketing)` route group to bypass Navbar/Footer.

**Tech Stack:** React Three Fiber 8, drei 9, postprocessing, Three.js 0.183, Framer Motion 12, Tailwind CSS 3.4

**Design Doc:** `docs/plans/2026-02-26-3d-demo-landing-design.md`

---

### Task 1: Setup — Install Dependencies + Create Types

**Files:**
- Modify: `package.json`
- Create: `src/components/landing/scene/types.ts`

**Step 1: Install postprocessing packages**

```bash
cd /Volumes/CS_Stuff/GuardianRFDemo
npm install @react-three/postprocessing postprocessing
```

Expected: packages added to package.json dependencies.

**Step 2: Create directory structure**

```bash
mkdir -p src/components/landing/scene
```

**Step 3: Create scene types and constants**

Create `src/components/landing/scene/types.ts`:

```typescript
export interface TargetData {
  id: string;
  model: string;
  confidence: number;
  orbitRadiusX: number;
  orbitRadiusZ: number;
  orbitSpeed: number;
  orbitPhase: number;
  altitude: number;
  insideDome: boolean;
}

export interface SceneControls {
  scanRate: number;
  sensitivity: number;
  showTracks: boolean;
  showLabels: boolean;
}

export interface LogEvent {
  time: string;
  message: string;
  type: "detected" | "classified" | "reacquired" | "lost";
}

export interface TelemetryData {
  range: number;
  targets: number;
  classified: number;
  confidence: number;
  latency: number;
  scanRate: number;
}

export const SCENE_CONFIG = {
  dome: { radius: 14, wireframeOpacity: 0.04, fillOpacity: 0.015 },
  terrain: { radius: 18, gridDivisions: 36 },
  sensor: { radius: 0.4, height: 0.3 },
  pulse: { count: 4, periodSeconds: 3.5, maxRadius: 14, peakOpacity: 0.12 },
  camera: {
    position: [8, 10, 14] as const,
    target: [0, 3, 0] as const,
    fov: 50,
  },
  orbit: {
    autoRotateSpeed: 0.3,
    minPolarAngle: (15 / 180) * Math.PI,
    maxPolarAngle: (65 / 180) * Math.PI,
    minDistance: 12,
    maxDistance: 28,
    dampingFactor: 0.05,
  },
  colors: {
    accent: "#00FF94",
    accentVec3: [0, 1, 0.58] as const,
    background: "#08080a",
    surface: "#0a0a0e",
    dimGray: "#333333",
  },
  targets: [
    { id: "TGT-001", model: "DJI M3", confidence: 0.97, orbitRadiusX: 5, orbitRadiusZ: 4, orbitSpeed: 0.15, orbitPhase: 0, altitude: 4, insideDome: true },
    { id: "TGT-002", model: "DJI Mini", confidence: 0.91, orbitRadiusX: 8, orbitRadiusZ: 6, orbitSpeed: 0.12, orbitPhase: 1.2, altitude: 3.5, insideDome: true },
    { id: "TGT-003", model: "Autel E2", confidence: 0.88, orbitRadiusX: 3, orbitRadiusZ: 7, orbitSpeed: 0.18, orbitPhase: 2.4, altitude: 6, insideDome: true },
    { id: "TGT-004", model: "Skydio 2", confidence: 0.94, orbitRadiusX: 10, orbitRadiusZ: 5, orbitSpeed: 0.1, orbitPhase: 3.6, altitude: 5, insideDome: true },
    { id: "TGT-005", model: "DJI FPV", confidence: 0.85, orbitRadiusX: 6, orbitRadiusZ: 9, orbitSpeed: 0.14, orbitPhase: 4.8, altitude: 7, insideDome: true },
    { id: "TGT-006", model: "Parrot A4K", confidence: 0.92, orbitRadiusX: 4, orbitRadiusZ: 3, orbitSpeed: 0.2, orbitPhase: 0.8, altitude: 2.5, insideDome: true },
    { id: "TGT-007", model: "DJI M30", confidence: 0.96, orbitRadiusX: 7, orbitRadiusZ: 8, orbitSpeed: 0.11, orbitPhase: 5.5, altitude: 4.5, insideDome: true },
    { id: "TGT-008", model: "Unknown", confidence: 0, orbitRadiusX: 16, orbitRadiusZ: 14, orbitSpeed: 0.08, orbitPhase: 1.0, altitude: 5.5, insideDome: false },
    { id: "TGT-009", model: "Unknown", confidence: 0, orbitRadiusX: 18, orbitRadiusZ: 12, orbitSpeed: 0.06, orbitPhase: 3.2, altitude: 3, insideDome: false },
    { id: "TGT-010", model: "Unknown", confidence: 0, orbitRadiusX: 15, orbitRadiusZ: 17, orbitSpeed: 0.09, orbitPhase: 5.0, altitude: 6.5, insideDome: false },
  ] satisfies TargetData[],
} as const;

export const EVENT_TEMPLATES: Omit<LogEvent, "time">[] = [
  { message: "TGT-001 CLASSIFIED 97%", type: "classified" },
  { message: "TGT-009 DETECTED", type: "detected" },
  { message: "TGT-003 CLASSIFIED 94%", type: "classified" },
  { message: "TGT-007 REACQUIRED", type: "reacquired" },
  { message: "TGT-012 TRACK LOST", type: "lost" },
  { message: "TGT-005 CLASSIFIED 85%", type: "classified" },
  { message: "TGT-002 DETECTED", type: "detected" },
  { message: "TGT-006 CLASSIFIED 92%", type: "classified" },
  { message: "TGT-004 REACQUIRED", type: "reacquired" },
  { message: "TGT-010 DETECTED", type: "detected" },
];
```

**Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

Expected: no errors in the new file.

**Step 5: Commit**

```bash
git add package.json package-lock.json src/components/landing/
git commit -m "feat: setup 3D landing — install postprocessing, create scene types"
```

---

### Task 2: HUD Panel System

**Files:**
- Create: `src/components/landing/HudPanel.tsx`
- Create: `src/components/landing/TelemetryPanel.tsx`
- Create: `src/components/landing/EventLog.tsx`
- Create: `src/components/landing/ControlsPanel.tsx`

**Step 1: Create HudPanel (canonical glass panel wrapper)**

Create `src/components/landing/HudPanel.tsx`:

```tsx
"use client";

interface HudPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function HudPanel({ title, children, className = "" }: HudPanelProps) {
  return (
    <div
      className={`pointer-events-auto rounded-xl border border-white/[0.08] px-4 py-3 font-mono text-xs ${className}`}
      style={{
        background: "rgba(10, 10, 14, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
        {title}
      </div>
      <div className="border-t border-white/[0.06] pt-2">{children}</div>
    </div>
  );
}
```

**Step 2: Create TelemetryPanel**

Create `src/components/landing/TelemetryPanel.tsx`:

```tsx
"use client";

import { HudPanel } from "./HudPanel";
import type { TelemetryData } from "./scene/types";

interface TelemetryPanelProps {
  data: TelemetryData;
}

const rows: { key: keyof TelemetryData; label: string; unit: string; decimals: number }[] = [
  { key: "range", label: "RANGE", unit: "km", decimals: 1 },
  { key: "targets", label: "TARGETS", unit: "", decimals: 0 },
  { key: "classified", label: "CLASSIFIED", unit: "", decimals: 0 },
  { key: "confidence", label: "CONFIDENCE", unit: "%", decimals: 1 },
  { key: "latency", label: "LATENCY", unit: "ms", decimals: 0 },
  { key: "scanRate", label: "SCAN RATE", unit: "s", decimals: 1 },
];

export function TelemetryPanel({ data }: TelemetryPanelProps) {
  return (
    <HudPanel title="Telemetry" className="w-[200px]">
      <div className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between">
            <span className="text-white/50">{row.label}</span>
            <span className="tabular-nums text-white/90">
              {data[row.key].toFixed(row.decimals)}
              {row.unit && (
                <span className="ml-0.5 text-white/40">{row.unit}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </HudPanel>
  );
}
```

**Step 3: Create EventLog**

Create `src/components/landing/EventLog.tsx`:

```tsx
"use client";

import { HudPanel } from "./HudPanel";
import type { LogEvent } from "./scene/types";

interface EventLogProps {
  events: LogEvent[];
}

const typeColors: Record<LogEvent["type"], string> = {
  detected: "text-accent",
  classified: "text-accent",
  reacquired: "text-amber-400",
  lost: "text-red-400",
};

export function EventLog({ events }: EventLogProps) {
  return (
    <HudPanel title="Event Log" className="w-[280px]">
      <div className="space-y-1">
        {events.length === 0 && (
          <div className="text-white/30">Awaiting events...</div>
        )}
        {events.map((evt, i) => (
          <div
            key={`${evt.time}-${i}`}
            className="flex items-start gap-2"
            style={{
              opacity: 1 - i * 0.15,
            }}
          >
            <span className="shrink-0 text-white/30">{evt.time}</span>
            <span className={typeColors[evt.type]}>{evt.message}</span>
          </div>
        ))}
      </div>
    </HudPanel>
  );
}
```

**Step 4: Create ControlsPanel**

Create `src/components/landing/ControlsPanel.tsx`:

```tsx
"use client";

import { HudPanel } from "./HudPanel";
import type { SceneControls } from "./scene/types";

interface ControlsPanelProps {
  controls: SceneControls;
  onChange: (controls: SceneControls) => void;
}

export function ControlsPanel({ controls, onChange }: ControlsPanelProps) {
  return (
    <HudPanel title="Controls" className="w-[240px]">
      <div className="space-y-3">
        {/* Scan Rate Slider */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-white/50">Scan Rate</span>
            <span className="tabular-nums text-white/90">{controls.scanRate}s</span>
          </div>
          <input
            type="range"
            min={2}
            max={12}
            step={0.5}
            value={controls.scanRate}
            onChange={(e) =>
              onChange({ ...controls, scanRate: parseFloat(e.target.value) })
            }
            className="hud-slider w-full"
          />
        </div>

        {/* Sensitivity Slider */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-white/50">Sensitivity</span>
            <span className="tabular-nums text-white/90">
              {Math.round(controls.sensitivity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={controls.sensitivity}
            onChange={(e) =>
              onChange({ ...controls, sensitivity: parseFloat(e.target.value) })
            }
            className="hud-slider w-full"
          />
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-4 pt-1 border-t border-white/[0.06]">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={controls.showTracks}
              onChange={(e) =>
                onChange({ ...controls, showTracks: e.target.checked })
              }
              className="hud-checkbox"
            />
            <span className="text-white/60">Tracks</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={controls.showLabels}
              onChange={(e) =>
                onChange({ ...controls, showLabels: e.target.checked })
              }
              className="hud-checkbox"
            />
            <span className="text-white/60">Labels</span>
          </label>
        </div>
      </div>
    </HudPanel>
  );
}
```

**Step 5: Add HUD slider/checkbox styles to globals.css**

Append to `src/styles/globals.css` inside the `@layer components` block:

```css
  .hud-slider {
    @apply appearance-none h-1 rounded-full bg-white/10 cursor-pointer;
  }
  .hud-slider::-webkit-slider-thumb {
    @apply appearance-none w-3 h-3 rounded-full bg-accent border-0 cursor-pointer;
    box-shadow: 0 0 6px rgba(0, 255, 148, 0.4);
  }
  .hud-slider::-moz-range-thumb {
    @apply w-3 h-3 rounded-full bg-accent border-0 cursor-pointer;
    box-shadow: 0 0 6px rgba(0, 255, 148, 0.4);
  }

  .hud-checkbox {
    @apply appearance-none w-3.5 h-3.5 rounded-sm border border-white/20 bg-transparent cursor-pointer relative;
  }
  .hud-checkbox:checked {
    @apply bg-accent border-accent;
  }
  .hud-checkbox:checked::after {
    content: '';
    @apply absolute inset-0.5 bg-[#08080a] rounded-[1px];
  }
```

**Step 6: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

**Step 7: Commit**

```bash
git add src/components/landing/HudPanel.tsx src/components/landing/TelemetryPanel.tsx src/components/landing/EventLog.tsx src/components/landing/ControlsPanel.tsx src/styles/globals.css
git commit -m "feat: add HUD panel system — telemetry, event log, controls"
```

---

### Task 3: Navigation — DemoTopBar + NavOverlay

**Files:**
- Create: `src/components/landing/DemoTopBar.tsx`
- Create: `src/components/landing/NavOverlay.tsx`

**Step 1: Create NavOverlay**

Create `src/components/landing/NavOverlay.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/hardware", label: "Hardware" },
  { href: "/verticals/defense", label: "Defense" },
  { href: "/verticals/critical-infrastructure", label: "Infrastructure" },
  { href: "/verticals/aviation", label: "Aviation" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

export function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{
            background: "rgba(8, 8, 10, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 text-white/60 hover:text-white/90 transition-colors"
            aria-label="Close navigation"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block font-mono text-lg tracking-widest uppercase text-white/60 transition-colors hover:text-white/90"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Create DemoTopBar**

Create `src/components/landing/DemoTopBar.tsx`:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NavOverlay } from "./NavOverlay";

export function DemoTopBar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex h-12 items-center justify-between px-5"
        style={{
          background: "rgba(8, 8, 10, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-symbol.png"
            alt=""
            width={20}
            height={20}
            className="opacity-90"
          />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
            GuardianRF
          </span>
        </Link>

        {/* Center: Status pill */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
            Simulation
          </span>
        </div>

        {/* Right: Nav + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNavOpen(true)}
            className="p-1.5 text-white/50 transition-colors hover:text-white/80"
            aria-label="Open navigation"
          >
            <Menu size={18} />
          </button>
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-md border border-white/[0.12] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-accent/30 hover:text-accent"
          >
            Request Access
          </Link>
        </div>
      </header>

      <NavOverlay isOpen={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}
```

**Step 3: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

**Step 4: Commit**

```bash
git add src/components/landing/DemoTopBar.tsx src/components/landing/NavOverlay.tsx
git commit -m "feat: add DemoTopBar with minimal nav overlay"
```

---

### Task 4: 3D Scene Foundation — Terrain, Sensor, Dome, Pulse, Camera

**Files:**
- Create: `src/components/landing/scene/TerrainPlane.tsx`
- Create: `src/components/landing/scene/SensorNode.tsx`
- Create: `src/components/landing/scene/DetectionDome.tsx`
- Create: `src/components/landing/scene/ScanPulse.tsx`
- Create: `src/components/landing/scene/SceneCamera.tsx`

**Step 1: Create TerrainPlane**

Create `src/components/landing/scene/TerrainPlane.tsx`:

```tsx
import { useMemo } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vec2 centered = vUv - 0.5;
    float dist = length(centered) * 2.0;

    // Radial fade at edges
    float fade = 1.0 - smoothstep(0.7, 1.0, dist);

    // Grid lines
    vec2 grid = fract(vUv * 36.0);
    float gridLine = step(0.97, grid.x) + step(0.97, grid.y);
    gridLine = min(gridLine, 1.0);

    // Dot pattern
    vec2 dotUv = fract(vUv * 36.0) - 0.5;
    float dot = 1.0 - smoothstep(0.02, 0.04, length(dotUv));

    float combined = max(gridLine * 0.04, dot * 0.06);

    gl_FragColor = vec4(1.0, 1.0, 1.0, combined * fade);
  }
`;

export function TerrainPlane() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={material}>
      <circleGeometry args={[18, 64]} />
    </mesh>
  );
}
```

**Step 2: Create SensorNode**

Create `src/components/landing/scene/SensorNode.tsx`:

```tsx
import { SCENE_CONFIG } from "./types";

const { accent } = SCENE_CONFIG.colors;

export function SensorNode() {
  return (
    <group position={[0, 0, 0]}>
      {/* Base octagonal prism */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.3, 8]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive={accent}
          emissiveIntensity={0.15}
          roughness={0.8}
          metalness={0.3}
        />
      </mesh>

      {/* Top accent ring */}
      <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.4, 8]} />
        <meshBasicMaterial color={accent} opacity={0.35} transparent />
      </mesh>

      {/* Center emissive dot */}
      <mesh position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={accent} />
      </mesh>
    </group>
  );
}
```

**Step 3: Create DetectionDome**

Create `src/components/landing/scene/DetectionDome.tsx`:

```tsx
import * as THREE from "three";
import { SCENE_CONFIG } from "./types";

const { dome, colors } = SCENE_CONFIG;

export function DetectionDome() {
  return (
    <group>
      {/* Wireframe hemisphere */}
      <mesh>
        <sphereGeometry
          args={[dome.radius, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshBasicMaterial
          color={colors.accent}
          wireframe
          opacity={dome.wireframeOpacity}
          transparent
        />
      </mesh>

      {/* Solid fill hemisphere (slightly smaller to avoid z-fighting) */}
      <mesh>
        <sphereGeometry
          args={[dome.radius - 0.1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshBasicMaterial
          color={colors.accent}
          opacity={dome.fillOpacity}
          transparent
          side={THREE.BackSide}
        />
      </mesh>

      {/* Base ring on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[dome.radius - 0.15, dome.radius, 64]} />
        <meshBasicMaterial
          color={colors.accent}
          opacity={0.08}
          transparent
        />
      </mesh>
    </group>
  );
}
```

**Step 4: Create ScanPulse**

Create `src/components/landing/scene/ScanPulse.tsx`:

```tsx
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { SCENE_CONFIG } from "./types";

const { pulse, colors } = SCENE_CONFIG;

export function ScanPulse() {
  const groupRef = useRef<THREE.Group>(null!);
  const materials = useMemo(
    () =>
      Array.from({ length: pulse.count }, () =>
        new THREE.MeshBasicMaterial({
          color: colors.accent,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      ),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((ring, i) => {
      const phase =
        ((t / pulse.periodSeconds + i / pulse.count) % 1 + 1) % 1;
      const scale = 0.01 + phase * pulse.maxRadius;
      ring.scale.set(scale, scale, scale);
      materials[i].opacity = (1 - phase) * pulse.peakOpacity;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {materials.map((mat, i) => (
        <mesh key={i} material={mat}>
          <ringGeometry args={[0.95, 1, 64]} />
        </mesh>
      ))}
    </group>
  );
}
```

**Step 5: Create SceneCamera**

Create `src/components/landing/scene/SceneCamera.tsx`:

```tsx
import { OrbitControls } from "@react-three/drei";
import { SCENE_CONFIG } from "./types";

const { orbit, camera } = SCENE_CONFIG;

export function SceneCamera() {
  return (
    <OrbitControls
      target={camera.target as unknown as [number, number, number]}
      autoRotate
      autoRotateSpeed={orbit.autoRotateSpeed}
      enablePan={false}
      enableDamping
      dampingFactor={orbit.dampingFactor}
      minPolarAngle={orbit.minPolarAngle}
      maxPolarAngle={orbit.maxPolarAngle}
      minDistance={orbit.minDistance}
      maxDistance={orbit.maxDistance}
    />
  );
}
```

**Step 6: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

**Step 7: Commit**

```bash
git add src/components/landing/scene/
git commit -m "feat: add 3D scene foundation — terrain, sensor, dome, pulse, camera"
```

---

### Task 5: 3D Targets — TargetSwarm

This is the most complex scene component. Each target has: orbit animation, trail, confidence ring, track line to sensor, and a classification label.

**Files:**
- Create: `src/components/landing/scene/TargetSwarm.tsx`

**Step 1: Create TargetSwarm**

Create `src/components/landing/scene/TargetSwarm.tsx`:

```tsx
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Trail, Html } from "@react-three/drei";
import { SCENE_CONFIG, type TargetData, type SceneControls } from "./types";

const { colors, targets } = SCENE_CONFIG;

/* ── Track line from target to sensor ── */

function TrackLine({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const geoRef = useRef<THREE.BufferGeometry>(null!);
  const posArray = useMemo(() => new Float32Array([0, 0, 0, 0, 0.3, 0]), []);

  useEffect(() => {
    if (geoRef.current) {
      geoRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );
    }
  }, [posArray]);

  useFrame(() => {
    if (!groupRef.current || !geoRef.current?.attributes.position) return;
    const p = groupRef.current.position;
    posArray[0] = p.x;
    posArray[1] = p.y;
    posArray[2] = p.z;
    (geoRef.current.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    // @ts-expect-error — R3F maps <line> to THREE.Line inside Canvas
    <line frustumCulled={false}>
      <bufferGeometry ref={geoRef} />
      <lineBasicMaterial color={colors.accent} opacity={0.08} transparent />
    </line>
  );
}

/* ── Single target ── */

function Target({
  data,
  showTracks,
  showLabels,
}: {
  data: TargetData;
  showTracks: boolean;
  showLabels: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const isDetected = data.insideDome;
  const color = isDetected ? colors.accent : colors.dimGray;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * data.orbitSpeed + data.orbitPhase;
    groupRef.current.position.set(
      Math.cos(t) * data.orbitRadiusX,
      data.altitude + Math.sin(t * 1.3) * 0.4,
      Math.sin(t) * data.orbitRadiusZ
    );
  });

  return (
    <>
      <group ref={groupRef}>
        <Trail
          width={0.5}
          length={15}
          color={color}
          decay={1.5}
          attenuation={(t) => t * t}
        >
          <mesh
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
          >
            <octahedronGeometry args={[hovered && isDetected ? 0.22 : 0.15]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isDetected ? (hovered ? 0.8 : 0.5) : 0}
              roughness={0.4}
            />
          </mesh>
        </Trail>

        {/* Confidence ring */}
        {isDetected && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[
                data.confidence * 0.6 - 0.02,
                data.confidence * 0.6,
                32,
              ]}
            />
            <meshBasicMaterial
              color={colors.accent}
              opacity={hovered ? 0.3 : 0.12}
              transparent
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Classification label */}
        {isDetected && showLabels && (
          <Html
            position={[0, 0.6, 0]}
            center
            style={{
              pointerEvents: hovered ? "auto" : "none",
              transition: "opacity 0.2s",
              opacity: hovered ? 1 : 0.7,
            }}
          >
            <div
              className="whitespace-nowrap rounded-md border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-white/80"
              style={{
                background: "rgba(8, 8, 10, 0.8)",
                backdropFilter: "blur(8px)",
              }}
            >
              {data.id} · {data.model} · {Math.round(data.confidence * 100)}%
            </div>
          </Html>
        )}
      </group>

      {/* Track line (rendered at scene root, not inside group) */}
      {isDetected && showTracks && <TrackLine groupRef={groupRef} />}
    </>
  );
}

/* ── Target swarm ── */

interface TargetSwarmProps {
  controls: SceneControls;
}

export function TargetSwarm({ controls }: TargetSwarmProps) {
  return (
    <group>
      {targets.map((data) => (
        <Target
          key={data.id}
          data={data}
          showTracks={controls.showTracks}
          showLabels={controls.showLabels}
        />
      ))}
    </group>
  );
}
```

**Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

**Step 3: Commit**

```bash
git add src/components/landing/scene/TargetSwarm.tsx
git commit -m "feat: add TargetSwarm — orbiting targets with trails, labels, track lines"
```

---

### Task 6: 3D Scene Composition — Hero3DScene

**Files:**
- Create: `src/components/landing/scene/Hero3DScene.tsx`

**Step 1: Create Hero3DScene**

Create `src/components/landing/scene/Hero3DScene.tsx`:

```tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { TerrainPlane } from "./TerrainPlane";
import { SensorNode } from "./SensorNode";
import { DetectionDome } from "./DetectionDome";
import { ScanPulse } from "./ScanPulse";
import { TargetSwarm } from "./TargetSwarm";
import { SceneCamera } from "./SceneCamera";
import { SCENE_CONFIG, type SceneControls } from "./types";

const { camera, colors } = SCENE_CONFIG;

interface Hero3DSceneProps {
  controls: SceneControls;
}

export function Hero3DScene({ controls }: Hero3DSceneProps) {
  return (
    <Canvas
      camera={{
        position: [...camera.position],
        fov: camera.fov,
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ background: colors.background }}
      dpr={[1, 1.5]}
    >
      <fog attach="fog" args={[colors.background, 20, 45]} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 10, 5]} intensity={0.08} />

      <SceneCamera />

      <Suspense fallback={null}>
        <TerrainPlane />
        <SensorNode />
        <DetectionDome />
        <ScanPulse />
        <TargetSwarm controls={controls} />
      </Suspense>

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.85}
          luminanceSmoothing={0.4}
          intensity={0.25}
        />
      </EffectComposer>
    </Canvas>
  );
}
```

**Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

**Step 3: Commit**

```bash
git add src/components/landing/scene/Hero3DScene.tsx
git commit -m "feat: compose Hero3DScene — Canvas, lighting, fog, bloom"
```

---

### Task 7: Mobile Fallback — MobileRadarFallback

**Files:**
- Create: `src/components/landing/MobileRadarFallback.tsx`

**Step 1: Create MobileRadarFallback**

Adapt the existing `RadarScope` pattern with enhancements:

Create `src/components/landing/MobileRadarFallback.tsx`:

```tsx
"use client";

const blips = [
  { angle: 25, distance: 25, delay: "0s", label: "TGT-001" },
  { angle: 70, distance: 50, delay: "0.6s", label: "TGT-002" },
  { angle: 120, distance: 35, delay: "1.2s", label: "TGT-003" },
  { angle: 165, distance: 60, delay: "1.8s", label: "TGT-004" },
  { angle: 210, distance: 45, delay: "2.4s", label: "TGT-005" },
  { angle: 255, distance: 30, delay: "3.0s", label: "TGT-006" },
  { angle: 300, distance: 55, delay: "3.6s", label: "TGT-007" },
  { angle: 340, distance: 40, delay: "4.2s", label: "" },
  { angle: 15, distance: 70, delay: "4.8s", label: "" },
  { angle: 185, distance: 72, delay: "5.4s", label: "" },
];

const rangeLabels = ["1km", "2km", "3km", "4km"];

export function MobileRadarFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#08080a]">
      <div
        className="relative w-[min(85vw,85vh)]"
        style={{ aspectRatio: "1" }}
      >
        {/* Glow halo */}
        <div
          className="absolute inset-[-15%]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,148,0.04) 0%, transparent 55%)",
          }}
        />

        {/* Concentric rings */}
        {[20, 40, 60, 80, 100].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-white/[0.05]"
            style={{
              width: `${size}%`,
              height: `${size}%`,
              top: `${(100 - size) / 2}%`,
              left: `${(100 - size) / 2}%`,
            }}
          />
        ))}

        {/* Range labels */}
        {rangeLabels.map((label, i) => {
          const pct = 20 + (i + 1) * 16;
          return (
            <span
              key={label}
              className="absolute font-mono text-[8px] text-accent/20"
              style={{ top: `${50 - pct / 2}%`, left: "51%" }}
            >
              {label}
            </span>
          );
        })}

        {/* Crosshairs */}
        <div className="absolute bottom-0 left-1/2 top-0 w-px bg-white/[0.03]" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.03]" />

        {/* Rotating sweep */}
        <div
          className="absolute inset-0 animate-sweep"
          style={{ transformOrigin: "center center" }}
        >
          <div
            className="absolute left-1/2 top-0 h-1/2 w-1/2"
            style={{
              transformOrigin: "bottom left",
              background:
                "conic-gradient(from 0deg at 0% 100%, rgba(0,255,148,0.15) 0deg, transparent 45deg)",
            }}
          />
        </div>

        {/* Blips */}
        {blips.map((blip, i) => {
          const rad = (blip.angle * Math.PI) / 180;
          const x = 50 + (blip.distance / 2) * Math.cos(rad);
          const y = 50 + (blip.distance / 2) * Math.sin(rad);
          const isOutside = blip.distance > 65;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: blip.delay,
              }}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full animate-blip ${
                  isOutside ? "bg-white/20" : "bg-accent"
                }`}
                style={{
                  animationDelay: blip.delay,
                  boxShadow: isOutside
                    ? "none"
                    : "0 0 8px 2px rgba(0,255,148,0.3)",
                }}
              />
              {blip.label && !isOutside && (
                <span className="absolute left-3 top-[-3px] whitespace-nowrap font-mono text-[7px] text-accent/40">
                  {blip.label}
                </span>
              )}
            </div>
          );
        })}

        {/* Center sensor dot */}
        <div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60"
          style={{ boxShadow: "0 0 8px rgba(0,255,148,0.5)" }}
        />
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/landing/MobileRadarFallback.tsx
git commit -m "feat: add MobileRadarFallback — CSS radar for non-WebGL devices"
```

---

### Task 8: Orchestrator — DemoLanding

**Files:**
- Create: `src/components/landing/DemoLanding.tsx`

**Step 1: Create DemoLanding**

Create `src/components/landing/DemoLanding.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DemoTopBar } from "./DemoTopBar";
import { TelemetryPanel } from "./TelemetryPanel";
import { EventLog } from "./EventLog";
import { ControlsPanel } from "./ControlsPanel";
import { MobileRadarFallback } from "./MobileRadarFallback";
import {
  type SceneControls,
  type LogEvent,
  type TelemetryData,
  EVENT_TEMPLATES,
} from "./scene/types";

const Hero3DScene = dynamic(
  () =>
    import("./scene/Hero3DScene").then((m) => ({
      default: m.Hero3DScene,
    })),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-[#08080a]" />,
  }
);

export function DemoLanding() {
  const [useStatic, setUseStatic] = useState(true); // default to static, upgrade to 3D on mount
  const [controls, setControls] = useState<SceneControls>({
    scanRate: 6,
    sensitivity: 0.8,
    showTracks: true,
    showLabels: true,
  });
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    range: 3.2,
    targets: 10,
    classified: 7,
    confidence: 94.2,
    latency: 12,
    scanRate: 6,
  });

  // Detect mobile / reduced-motion → use static fallback
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setUseStatic(mq.matches || rmq.matches);
    check();
    mq.addEventListener("change", check);
    rmq.addEventListener("change", check);
    return () => {
      mq.removeEventListener("change", check);
      rmq.removeEventListener("change", check);
    };
  }, []);

  // Generate events on a timer
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const template = EVENT_TEMPLATES[idx % EVENT_TEMPLATES.length];
      const now = new Date();
      const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
        .map((n) => String(n).padStart(2, "0"))
        .join(":");
      setEvents((prev) => [{ ...template, time }, ...prev].slice(0, 5));

      // Drift telemetry slightly
      setTelemetry((prev) => ({
        ...prev,
        confidence: Math.round((92 + Math.random() * 6) * 10) / 10,
        latency: Math.round(8 + Math.random() * 10),
        classified: 6 + Math.floor(Math.random() * 4),
      }));

      idx++;
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Sync scan rate control → telemetry
  useEffect(() => {
    setTelemetry((prev) => ({ ...prev, scanRate: controls.scanRate }));
  }, [controls.scanRate]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#08080a]">
      <DemoTopBar />

      {/* 3D Scene or Mobile Fallback — fills viewport */}
      <div className="absolute inset-0">
        {useStatic ? (
          <MobileRadarFallback />
        ) : (
          <Hero3DScene controls={controls} />
        )}
      </div>

      {/* Subtle center headline */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-white/25 sm:text-sm">
          Airspace Intelligence
        </h1>
      </div>

      {/* HUD Overlay — bottom panels */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute bottom-4 left-4 right-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:justify-between sm:bottom-6 sm:left-6 sm:right-6">
          <TelemetryPanel data={telemetry} />
          <div className="hidden sm:block">
            <ControlsPanel controls={controls} onChange={setControls} />
          </div>
          <EventLog events={events} />
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

**Step 3: Commit**

```bash
git add src/components/landing/DemoLanding.tsx
git commit -m "feat: add DemoLanding orchestrator — scene, panels, event generation"
```

---

### Task 9: Integration — Move Homepage + Verify Build

**Files:**
- Delete: `src/app/(marketing)/page.tsx` (current home)
- Create: `src/app/page.tsx` (new home, outside marketing group)

Moving the homepage out of `(marketing)` means it no longer gets the marketing layout (Navbar + Footer). This is exactly what we want — the new landing is a full-screen 3D experience with its own DemoTopBar.

**Step 1: Create new homepage at app root**

Create `src/app/page.tsx`:

```tsx
import type { Metadata } from "next";
import { DemoLanding } from "@/components/landing/DemoLanding";

export const metadata: Metadata = {
  title: "Guardian RF — Persistent Airspace Intelligence",
  description:
    "RF-based drone detection, classification, and intelligence for low-altitude airspace monitoring.",
  openGraph: {
    title: "Guardian RF — Persistent Airspace Intelligence",
    description:
      "Persistent RF-based drone detection and intelligence for low-altitude airspace.",
  },
};

export default function Home() {
  return <DemoLanding />;
}
```

**Step 2: Delete old homepage**

```bash
rm src/app/\(marketing\)/page.tsx
```

**Step 3: Add Three.js to transpilePackages in next.config.mjs (if needed)**

Check if the build works first. If it fails with Three.js ESM resolution errors, add:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
```

**Step 4: Run the dev server and verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- 3D scene loads with terrain grid, sensor node, dome, pulsing rings, orbiting targets
- Targets have trails and classification labels
- Hovering a target enlarges it and brightens the label
- HUD panels display at the bottom: Telemetry (left), Controls (center), Event Log (right)
- Controls sliders and toggles work (tracks/labels toggle on/off)
- DemoTopBar shows with logo, SIMULATION pill, hamburger menu
- Hamburger opens NavOverlay with links to all pages
- Marketing pages still work at their URLs (e.g., `/platform`, `/hardware`)
- Dashboard still works at `/dashboard`
- On mobile viewport (< 1024px): CSS radar fallback instead of 3D
- Controls panel hidden on mobile

**Step 5: Run production build**

```bash
npm run build
```

Verify: no build errors, all routes generate successfully.

**Step 6: Commit**

```bash
git add src/app/page.tsx src/app/\(marketing\)/ next.config.mjs
git commit -m "feat: replace homepage with 3D tactical airspace demo landing"
```

---

## Risks

| Risk | Mitigation |
|---|---|
| Three.js ESM issues with Next.js bundler | Add `transpilePackages: ["three"]` to next.config if needed |
| Bloom post-processing performance | `dpr={[1, 1.5]}` limits pixel ratio; bloom threshold 0.85 limits affected pixels |
| Trail component memory with 10 instances | Each Trail stores 15 vec3 points — negligible. Monitor with Chrome DevTools. |
| `<Html>` labels janky during fast orbit | Labels have `pointer-events: none` by default, only interactive on hover |
| postprocessing package SSR crash | Hero3DScene loaded via `dynamic(import, { ssr: false })` — never runs server-side |

## Success Criteria

- [ ] Landing page feels like a defense product demo, not a marketing page
- [ ] 3D scene shows tactical airspace with dome, RF pulses, tracked/untracked drones
- [ ] Text on page limited to: "Airspace Intelligence" headline, HUD data, micro-labels, 1 CTA
- [ ] Interactive controls affect 3D scene (tracks toggle, labels toggle)
- [ ] Mobile shows CSS radar fallback, no WebGL loaded
- [ ] All existing marketing pages and dashboard work unchanged
- [ ] Production build succeeds with no errors
- [ ] 60fps on modern desktop (Chrome/Safari)
- [ ] First load JS < 400KB (Three.js + R3F + scene, excluding marketing routes)
