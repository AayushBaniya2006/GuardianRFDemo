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
    const elapsed = clock.getElapsedTime();
    const t = elapsed * data.orbitSpeed + data.orbitPhase;
    const p = data.orbitPhase;

    // Multi-frequency drift prevents deterministic loop detection
    const driftX = Math.sin(elapsed * 0.3 + p) * 0.4 + Math.sin(elapsed * 0.17 + p * 2.1) * 0.2;
    const driftZ = Math.cos(elapsed * 0.2 + p * 1.5) * 0.4 + Math.cos(elapsed * 0.13 + p * 1.8) * 0.2;
    const driftY = Math.sin(elapsed * 0.15 + p * 0.7) * 0.15;

    groupRef.current.position.set(
      Math.cos(t) * data.orbitRadiusX + driftX,
      data.altitude + Math.sin(t * 1.3) * 0.4 + driftY,
      Math.sin(t) * data.orbitRadiusZ + driftZ
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
            scale={hovered && isDetected ? 1.47 : 1}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
          >
            <octahedronGeometry args={[0.15]} />
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
