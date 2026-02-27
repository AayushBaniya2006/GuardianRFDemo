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
