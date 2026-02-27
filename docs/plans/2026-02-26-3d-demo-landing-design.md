# 3D Defense Demo Landing Page — Design Document

**Date:** 2026-02-26
**Status:** Approved

## Summary

Add a full-viewport 3D tactical airspace demo as the hero section of the landing page. All existing marketing sections (MetricsBar, PlatformPreview, Pipeline, ScoutShowcase, IndustryCards, SocialProof, CTASection) remain below the fold on scroll. The landing page uses a minimal DemoTopBar instead of the full Navbar.

All existing marketing subpages and the dashboard remain untouched.

## Decisions

| Decision | Choice |
|---|---|
| Architecture | Full-screen R3F Canvas + HTML overlay panels |
| 3D library | React Three Fiber + drei + postprocessing |
| Scene type | Tactical Airspace View (dome, sensor, detected drones) |
| Mobile | Static CSS radar fallback (no WebGL < 1024px) |
| Navigation | Minimal topbar on landing + hamburger overlay nav |
| Existing pages | All stay. Navbar/Footer render on marketing subpages, not on home. |

## Color System

- Background: `#08080a` (near-black graphite)
- Surface: `#0a0a0e` (panel backgrounds)
- Border: `rgba(255,255,255,0.08)`
- Text primary: `rgba(255,255,255,0.9)`
- Text secondary: `rgba(255,255,255,0.5)`
- Accent: `#00FF94` (detection, active elements — used sparingly)
- Accent dim: `rgba(0,255,148,0.08)` (fills, backgrounds)

## 3D Scene Design

### Camera
- Perspective FOV 50, position `[8, 10, 14]`, lookAt `[0, 3, 0]`
- Auto-orbit: 120s/revolution, damping 0.05
- User orbit: polar 15-65deg, zoom 12-28, pan disabled

### Elements

**TerrainPlane** — Circular disc r=18 at y=0. Custom shader: dark graphite + faint dot-grid (32px, white 3%). Radial edge fade.

**SensorNode** — Octagonal prism at origin, r=0.4, h=0.3. Matte dark + accent edge emissive. Emits hemispheric RF pulse rings every 3.5s (accent 12% -> 0% over 2s, 3-4 visible).

**DetectionDome** — Wireframe icosphere r=14 at accent 6% opacity. Solid fill 2%. Subtle grid shimmer effect.

**TargetSwarm** — 10 diamond/octahedron targets on seeded elliptical orbits at y=2-8.
- 7 inside dome (detected): accent emissive, confidence ring, dashed track line to sensor, drei Trail (15pts), Html classification label
- 3 outside dome (undetected): dim gray, no tracking data
- Crossing event: flash ring + confidence ring builds (scale 0->1 over 0.5s)

**Classification Labels** — drei Html per detected target. Monospace: `TGT-003 . DJI M3 . 94%`. Glass bg. Hover expands to show alt/hdg/spd.

### Post-processing
- Bloom: intensity 0.25, threshold 0.85, smoothing 0.4
- No other effects

## HUD Panels

All panels use canonical `HudPanel` component:
- `bg: rgba(10,10,14,0.75)`, `backdrop-blur: 12px`
- `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 12px`
- `font: JetBrains Mono`, `pointer-events: auto` on `pointer-events-none` overlay

### TelemetryPanel (bottom-left, ~200px)
6 metric rows: RANGE, TARGETS, CLASSIFIED, CONFIDENCE, LATENCY, SCAN RATE. Values animate with spring interpolation.

### EventLog (bottom-right, ~280px)
5 visible log lines, newest first. Events sync with 3D scene (crossing = DETECTED). Timestamp is real clock. New events slide in with accent border flash.

### ControlsPanel (bottom-center, ~240px)
2 sliders (Scan Rate, Sensitivity) + 2 toggles (Show Tracks, Labels). Controls affect the 3D scene in real-time.

## TopBar (DemoTopBar)

- Left: logo mark + "GUARDIANRF" monospace uppercase
- Center: "SIMULATION" status pill with pulsing green dot
- Right: hamburger icon + "Request Access" ghost button
- Height 48px, fixed, z-50, glass bg + bottom border

## Nav Overlay

Full-screen overlay triggered by hamburger. Links: Home, Platform, Hardware, Industries, About, Contact, Dashboard. Framer Motion staggered entrance. Close button top-right.

## Mobile Fallback (< 1024px)

Enhanced CSS RadarScope: SVG rings, CSS rotating sweep, 8 blip dots with ping animations, range labels. HUD panels stack below. R3F not loaded (dynamic import with ssr:false).

## File Structure

```
src/components/landing/
  DemoLanding.tsx         — orchestrator
  DemoTopBar.tsx          — minimal topbar
  NavOverlay.tsx          — full-screen nav
  HudPanel.tsx            — canonical glass panel
  TelemetryPanel.tsx      — telemetry content
  EventLog.tsx            — event log content
  ControlsPanel.tsx       — interactive controls
  MobileRadarFallback.tsx — CSS radar fallback
  scene/
    Hero3DScene.tsx       — R3F Canvas + effects
    TerrainPlane.tsx      — ground grid
    SensorNode.tsx        — RF emitter + pulses
    DetectionDome.tsx     — coverage hemisphere
    TargetSwarm.tsx       — targets + trails + labels
    ScanPulse.tsx         — expanding rings
    SceneCamera.tsx       — camera rig + orbit controls
```

## Modified Files

- `src/app/(marketing)/page.tsx` — **DELETED** (route conflict)
- `src/app/page.tsx` — **NEW** root-level landing page: DemoTopBar + DemoLanding (hero) + existing sections + Footer
- `src/styles/globals.css` — add `hud-slider` and `hud-checkbox` CSS classes
- `src/components/landing/DemoLanding.tsx` — adapt from full-page to 100vh hero section

## New Dependencies

```
@react-three/fiber
@react-three/drei
@react-three/postprocessing
three
```

## What Stays Untouched

All marketing subpages, all section components (Hero, MetricsBar, Pipeline, etc. — Hero no longer rendered but kept in codebase), dashboard, all data files, all hooks, all utils, Navbar (used by subpages), Footer (used by subpages + landing).

## Acceptance Criteria

- Landing hero feels like a defense-grade product demo, not a marketing page
- 3D scene communicates RF detection capability without text
- All existing sections render below the fold on scroll
- DemoTopBar provides minimal navigation; other pages keep full Navbar
- Interactive controls affect the 3D scene
- Mobile shows static CSS fallback, no WebGL loaded
- All existing marketing pages and dashboard continue to work
- No build errors, no console errors, no hydration mismatches
- Performance: 60fps on modern desktop, < 3s load
