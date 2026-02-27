# 3D Landing Page Integration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire up the existing 3D tactical demo (in `src/components/landing/`) as the landing page hero, with all existing marketing sections below the fold.

**Architecture:** Create a root-level `src/app/page.tsx` (outside the `(marketing)` route group) that renders: DemoTopBar → DemoLanding (100vh hero with 3D scene + HUD) → existing marketing sections (MetricsBar, PlatformPreview, Pipeline, ScoutShowcase, IndustryCards, SocialProof, CTASection) → Footer. Delete the old `src/app/(marketing)/page.tsx` to avoid route conflict.

**Tech Stack:** Next.js 14 (App Router), React Three Fiber 8, drei 9, postprocessing 2, Framer Motion 12, Tailwind CSS 3.4

---

## Pre-flight: Existing Component Inventory

All 16 landing components already exist in `src/components/landing/`:
- `DemoLanding.tsx` — orchestrator (needs adaptation from full-page to hero section)
- `DemoTopBar.tsx` — minimal navbar
- `NavOverlay.tsx` — hamburger nav
- `HudPanel.tsx` — glass panel wrapper
- `TelemetryPanel.tsx`, `EventLog.tsx`, `ControlsPanel.tsx` — HUD content
- `MobileRadarFallback.tsx` — CSS radar for mobile
- `scene/Hero3DScene.tsx` — R3F Canvas
- `scene/TerrainPlane.tsx`, `SensorNode.tsx`, `DetectionDome.tsx`, `ScanPulse.tsx`, `TargetSwarm.tsx`, `SceneCamera.tsx` — 3D elements
- `scene/types.ts` — shared types + config

**Gaps to fill:**
1. `hud-slider` and `hud-checkbox` CSS classes (used by ControlsPanel, not yet defined)
2. `DemoLanding.tsx` uses `h-screen w-screen overflow-hidden` — needs to be a section, not full-page
3. No `src/app/page.tsx` exists — the landing is still at `src/app/(marketing)/page.tsx` using old Hero
4. The old `src/app/(marketing)/page.tsx` must be deleted to avoid route conflict

---

### Task 1: Add missing HUD CSS classes

**Files:**
- Modify: `src/styles/globals.css`

**Step 1: Add hud-slider and hud-checkbox styles to globals.css**

Add inside the existing `@layer components` block, after `.bg-grid-pattern`:

```css
  /* HUD slider — used by landing ControlsPanel */
  .hud-slider {
    @apply h-1 appearance-none rounded-full bg-white/10 cursor-pointer;
  }
  .hud-slider::-webkit-slider-thumb {
    @apply appearance-none h-3 w-3 rounded-full bg-accent border-0 cursor-pointer;
    box-shadow: 0 0 6px rgba(0, 255, 148, 0.4);
  }
  .hud-slider::-moz-range-thumb {
    @apply h-3 w-3 rounded-full bg-accent border-0 cursor-pointer;
    box-shadow: 0 0 6px rgba(0, 255, 148, 0.4);
  }

  /* HUD checkbox — used by landing ControlsPanel */
  .hud-checkbox {
    @apply h-3 w-3 appearance-none rounded-sm border border-white/20 bg-transparent cursor-pointer;
  }
  .hud-checkbox:checked {
    @apply bg-accent border-accent;
  }
```

**Step 2: Verify no syntax errors**

Run: `npx tailwindcss --input src/styles/globals.css --output /dev/null 2>&1 | head -5`
Expected: No errors

**Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "style: add hud-slider and hud-checkbox CSS classes for landing controls"
```

---

### Task 2: Adapt DemoLanding from full-page to hero section

**Files:**
- Modify: `src/components/landing/DemoLanding.tsx`

**Step 1: Change the root container**

Change line 90 from:
```tsx
<div className="relative h-screen w-screen overflow-hidden bg-[#08080a]">
```
to:
```tsx
<section className="relative h-screen w-full overflow-hidden bg-[#08080a]">
```

And the closing `</div>` on line 119 to `</section>`.

This makes it a proper section element that fills viewport height but uses `w-full` (respects parent width) instead of `w-screen` (which can cause horizontal overflow).

**Step 2: Verify the component still compiles**

Run: `npx next build 2>&1 | tail -5`
Expected: `✓ Compiled successfully`

**Step 3: Commit**

```bash
git add src/components/landing/DemoLanding.tsx
git commit -m "refactor: adapt DemoLanding from full-page to hero section"
```

---

### Task 3: Create root-level landing page

**Files:**
- Create: `src/app/page.tsx`
- Delete: `src/app/(marketing)/page.tsx`

**Step 1: Delete the old marketing landing page**

```bash
rm src/app/(marketing)/page.tsx
```

**Step 2: Create the new root-level landing page**

Create `src/app/page.tsx`:

```tsx
import type { Metadata } from "next";
import { DemoLanding } from "@/components/landing/DemoLanding";
import { MetricsBar } from "@/components/sections/MetricsBar";
import { PlatformPreview } from "@/components/sections/PlatformPreview";
import { Pipeline } from "@/components/sections/Pipeline";
import { ScoutShowcase } from "@/components/sections/ScoutShowcase";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

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
  return (
    <>
      {/* 3D Hero — full viewport, own TopBar */}
      <DemoLanding />

      {/* Below-fold marketing sections */}
      <MetricsBar />
      <PlatformPreview />
      <Pipeline />
      <ScoutShowcase />
      <IndustryCards />
      <SocialProof />
      <CTASection
        title="Ready to see what's in your airspace?"
        primaryHref="/dashboard"
        primaryLabel="Launch Platform"
      />

      {/* Footer */}
      <Footer />
    </>
  );
}
```

**Why root-level?** The page sits outside `(marketing)` route group, so it does NOT get the marketing layout (Navbar + Footer + CursorGlow + NoiseOverlay). Instead:
- DemoTopBar (inside DemoLanding) provides the minimal navbar
- Footer is explicitly imported and rendered
- No CursorGlow or NoiseOverlay (they'd conflict with the R3F canvas)

**Step 3: Build to verify no route conflicts**

Run: `npx next build 2>&1 | tail -20`
Expected: `✓ Compiled successfully` with `/` route present, all 14+ routes listed

**Step 4: Commit**

```bash
git add src/app/page.tsx
git add -u src/app/(marketing)/page.tsx
git commit -m "feat: wire up 3D landing hero with existing sections below the fold"
```

---

### Task 4: Verify and fix any issues

**Step 1: Run full build**

Run: `npx next build 2>&1 | tail -25`
Expected: All routes compile, no errors

**Step 2: Start dev server and manually verify**

Run: `npx next dev`

Check:
- [ ] `/` loads with 3D scene hero (or mobile radar fallback on small screens)
- [ ] DemoTopBar shows at top (logo, SIMULATION pill, hamburger, Request Access)
- [ ] HUD panels appear at bottom (Telemetry, Controls, Event Log)
- [ ] Sliders in Controls panel work (scan rate changes scene)
- [ ] Scroll down reveals MetricsBar, PlatformPreview, Pipeline, etc.
- [ ] Hamburger opens NavOverlay with links to all pages
- [ ] `/platform`, `/hardware`, `/verticals/defense`, etc. still work with full Navbar
- [ ] `/dashboard` still works
- [ ] No console errors
- [ ] No hydration mismatches

**Step 3: If any issues found, fix them and commit**

**Step 4: Final commit if all passes**

```bash
git add -A
git commit -m "chore: verify 3D landing integration — all routes pass"
```

---

## Risk Register

| Risk | Mitigation |
|------|-----------|
| Route conflict between root page.tsx and (marketing)/page.tsx | Delete (marketing)/page.tsx BEFORE creating root page.tsx |
| DemoLanding "use client" prevents metadata export | metadata is in the SERVER page.tsx, DemoLanding is a client child — this works fine |
| Existing sections expect marketing layout CSS | All sections are self-contained with own backgrounds/padding — verified in audit |
| R3F Canvas layout shift | DemoLanding uses h-screen which reserves 100vh immediately |
| Missing hud-slider/hud-checkbox CSS | Task 1 adds them |

## Success Criteria

- Build passes with 0 errors
- Landing loads: 3D hero visible on desktop, CSS radar on mobile
- All 7 existing sections render below the fold
- DemoTopBar shows (not the full Navbar)
- All marketing subpages + dashboard still work
- No console errors, no hydration mismatches
