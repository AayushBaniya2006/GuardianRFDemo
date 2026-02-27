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
