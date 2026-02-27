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
        <ScanPulse scanRate={controls.scanRate} />
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
