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
