import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { SCENE_CONFIG } from "./types";

const { pulse, colors } = SCENE_CONFIG;

export function ScanPulse({ scanRate = 3.5 }: { scanRate?: number }) {
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

  useEffect(() => {
    return () => {
      materials.forEach((m) => m.dispose());
    };
  }, [materials]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((ring, i) => {
      const phase =
        ((t / scanRate + i / pulse.count) % 1 + 1) % 1;
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
