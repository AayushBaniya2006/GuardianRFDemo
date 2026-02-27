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
