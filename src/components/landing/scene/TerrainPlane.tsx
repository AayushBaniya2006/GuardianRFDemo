import { useMemo, useEffect } from "react";
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

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={material}>
      <circleGeometry args={[18, 64]} />
    </mesh>
  );
}
