# Defense Credibility Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Strip all SaaS patterns from the GuardianRF website, restructure the marketing homepage from 8 sections to 4, rewrite all CTA language for defense audiences, reduce animations from 15+ types to 5, and polish the 3D scene.

**Architecture:** Systematic 3-phase overhaul preserving the strong foundation (3D demo at root `/`, dashboard, data layer) while upgrading every marketing touchpoint. Phase 1 modifies shared UI primitives. Phase 2 restructures pages that consume them. Phase 3 polishes the 3D scene.

**Tech Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS 3.4, Framer Motion 12, React Three Fiber 8

**Design Document:** `docs/plans/2026-02-26-defense-credibility-overhaul-design.md`

---

## Phase 1 — Strip SaaS DNA (UI Primitives & Animations)

### Task 1: Remove GlitchText component and update all consumers

**Files:**
- Delete: `src/components/ui/GlitchText.tsx`
- Modify: `src/components/layout/Navbar.tsx:8,297-299`
- Modify: `src/app/(marketing)/about/story/page.tsx:7,42`
- Modify: `src/components/verticals/VerticalTemplate.tsx:7,22`

**Step 1: Update Navbar logo**

In `src/components/layout/Navbar.tsx`, remove the GlitchText import (line 8) and replace the Logo function (lines 293-301):

```tsx
// Before (lines 293-301):
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image src="/images/logo-symbol.png" alt="Guardian RF" width={20} height={20} />
      <GlitchText className="text-white font-medium tracking-[0.15em] text-xs uppercase">
        Guardian RF
      </GlitchText>
    </Link>
  );
}

// After:
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image src="/images/logo-symbol.png" alt="Guardian RF" width={20} height={20} />
      <span className="text-white font-medium tracking-[0.15em] text-xs uppercase font-mono">
        Guardian RF
      </span>
    </Link>
  );
}
```

**Step 2: Update Story page**

In `src/app/(marketing)/about/story/page.tsx`, remove import (line 7) and replace line 42:

```tsx
// Before:
<GlitchText>Built from the front lines</GlitchText>

// After:
Built from the front lines
```

**Step 3: Update VerticalTemplate**

In `src/components/verticals/VerticalTemplate.tsx`, remove import (line 7) and replace line 22:

```tsx
// Before:
<GlitchText>{vertical.tagline}</GlitchText>

// After:
{vertical.tagline}
```

**Step 4: Delete GlitchText component**

Delete `src/components/ui/GlitchText.tsx`

**Step 5: Build check**

Run: `npx next build 2>&1 | head -30`
Expected: No import errors for GlitchText

**Step 6: Commit**

```bash
git add -A && git commit -m "refactor: remove GlitchText — replace with static monospace text"
```

---

### Task 2: Remove CursorGlow component and update consumers

**Files:**
- Delete: `src/components/ui/CursorGlow.tsx`
- Modify: `src/app/(marketing)/layout.tsx:4,14`
- Modify: `src/app/page.tsx:11,33`

**Step 1: Update marketing layout**

In `src/app/(marketing)/layout.tsx`, remove import (line 4) and remove `<CursorGlow />` (line 14):

```tsx
// After (full file):
import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/visuals/NoiseOverlay";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <NoiseOverlay />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
```

**Step 2: Update root page**

In `src/app/page.tsx`, remove import (line 11) and remove `<CursorGlow />` (line 33).

**Step 3: Delete CursorGlow**

Delete `src/components/ui/CursorGlow.tsx`

**Step 4: Commit**

```bash
git add -A && git commit -m "refactor: remove CursorGlow — no cursor-following glow effects"
```

---

### Task 3: Remove TiltCard component and update all consumers

**Files:**
- Delete: `src/components/ui/TiltCard.tsx`
- Modify: `src/components/verticals/VerticalTemplate.tsx:6,55,78` (remove TiltCard wrapping Card)
- Modify: `src/app/(marketing)/platform/page.tsx:7,101`
- Modify: `src/app/(marketing)/hardware/page.tsx:7,59,148,185`
- Modify: `src/components/sections/ScoutShowcase.tsx:8,37`
- Modify: `src/components/sections/IndustryCards.tsx:7,38`
- Modify: `src/components/sections/Pipeline.tsx:8,102`

**Step 1: Update VerticalTemplate**

In `src/components/verticals/VerticalTemplate.tsx`, remove TiltCard import (line 6). Replace all `<TiltCard maxTilt={8}><Card>...</Card></TiltCard>` with just `<Card>`:

```tsx
// Lines 55-60, before:
<TiltCard maxTilt={8}>
  <Card>
    ...
  </Card>
</TiltCard>

// After:
<Card>
  ...
</Card>
```

Same for lines 78-85 (deployment cards).

**Step 2: Update platform page**

In `src/app/(marketing)/platform/page.tsx`, remove TiltCard import (line 7). Unwrap TiltCard around Card at line 101.

**Step 3: Update hardware page**

In `src/app/(marketing)/hardware/page.tsx`, remove TiltCard import (line 7). Unwrap at lines 59, 148, 185.

**Step 4: Update ScoutShowcase, IndustryCards, Pipeline**

Remove TiltCard imports and unwrap in each:
- `ScoutShowcase.tsx`: line 8 (import), line 37 (usage)
- `IndustryCards.tsx`: line 7 (import), line 38 (usage)
- `Pipeline.tsx`: line 8 (import), line 102 (usage)

**Step 5: Delete TiltCard**

Delete `src/components/ui/TiltCard.tsx`

**Step 6: Commit**

```bash
git add -A && git commit -m "refactor: remove TiltCard — flat card interactions only"
```

---

### Task 4: Remove TypewriterText and update consumers

**Files:**
- Delete: `src/components/ui/TypewriterText.tsx`
- Modify: `src/app/(marketing)/about/story/page.tsx:6,67-72`
- Modify: `src/components/sections/SocialProof.tsx:7,50-55`

**Step 1: Update Story page blockquote**

In `src/app/(marketing)/about/story/page.tsx`, remove import (line 6) and replace lines 67-72:

```tsx
// Before:
&ldquo;<TypewriterText
  text="Persistence matters more than raw capability. Small, deployable sensors outperform sophisticated, slow systems."
  speed={30}
  delay={300}
  cursorPersist={false}
/>&rdquo;

// After:
&ldquo;Persistence matters more than raw capability. Small, deployable sensors outperform sophisticated, slow systems.&rdquo;
```

**Step 2: Update SocialProof blockquote**

In `src/components/sections/SocialProof.tsx`, remove import (line 7) and replace lines 50-55:

```tsx
// Before:
&ldquo;<TypewriterText
  text="Persistence matters more than raw capability. Small, deployable sensors outperform sophisticated, slow systems."
  speed={35}
  delay={600}
  cursorPersist={false}
/>&rdquo;

// After:
&ldquo;Persistence matters more than raw capability. Small, deployable sensors outperform sophisticated, slow systems.&rdquo;
```

Also remove `animate-pulse-accent` from the blockquote element (line 48):

```tsx
// Before:
<blockquote className="border-l-2 border-accent/30 pl-6 animate-pulse-accent" style={{ animationDuration: "4s" }}>

// After:
<blockquote className="border-l-2 border-accent/30 pl-6">
```

**Step 3: Delete TypewriterText**

Delete `src/components/ui/TypewriterText.tsx`

**Step 4: Commit**

```bash
git add -A && git commit -m "refactor: remove TypewriterText — static text rendering"
```

---

### Task 5: Remove ParticleMesh and create TacticalGrid

**Files:**
- Delete: `src/components/visuals/ParticleMesh.tsx`
- Create: `src/components/visuals/TacticalGrid.tsx`
- Modify: `src/components/sections/Hero.tsx:13-21,38`

**Step 1: Create TacticalGrid component**

Create `src/components/visuals/TacticalGrid.tsx`:

```tsx
type Props = {
  showScanLine?: boolean;
  className?: string;
};

export function TacticalGrid({ showScanLine = true, className = "" }: Props) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Center radial glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,255,148,0.02), transparent 70%)",
        }}
      />

      {/* Scan line */}
      {showScanLine && (
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-scan-line" />
      )}
    </div>
  );
}
```

**Step 2: Replace ParticleMesh with TacticalGrid in Hero**

In `src/components/sections/Hero.tsx`, replace the dynamic import (lines 13-21) and usage (line 38):

```tsx
// Remove lines 13-21 (ParticleMesh dynamic import)
// Add import:
import { TacticalGrid } from "@/components/visuals/TacticalGrid";

// Replace line 38:
// Before:
<ParticleMesh />
// After:
<TacticalGrid />
```

**Step 3: Delete ParticleMesh**

Delete `src/components/visuals/ParticleMesh.tsx`

**Step 4: Commit**

```bash
git add -A && git commit -m "refactor: replace ParticleMesh with TacticalGrid — defense-appropriate background"
```

---

### Task 6: Simplify Button — remove magnetic hover

**Files:**
- Modify: `src/components/ui/Button.tsx`

**Step 1: Rewrite Button.tsx**

Remove the `useMagneticHover` hook (lines 36-62) and all its references (lines 72, 79-81, 97-98):

```tsx
"use client";

import Link from "next/link";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
};

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonNativeProps = ButtonBaseProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

type ButtonProps = ButtonLinkProps | ButtonNativeProps;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const variants = {
  primary: `bg-white text-black font-medium rounded-md px-6 py-3 text-sm hover:bg-gray-100 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,255,148,0.15)] active:scale-[0.98] ${focusRing}`,
  secondary: `border border-gray-700 text-white/80 rounded-md px-6 py-3 text-sm hover:border-gray-500 hover:text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_16px_rgba(0,255,148,0.08)] active:scale-[0.98] ${focusRing}`,
  ghost: `text-sm text-gray-400 hover:text-white inline-flex items-center gap-2 transition-colors duration-150 ${focusRing}`,
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex items-center gap-2 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {variant === "ghost" && <span aria-hidden="true">&rarr;</span>}
      </Link>
    );
  }

  const { type = "button", onClick } = rest as ButtonNativeProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
```

Key changes: removed `useMagneticHover`, removed `useRef`/`useCallback` imports, removed `ref`/`onMouseMove`/`onMouseLeave` from both Link and button elements, changed `duration-200` to `duration-150`.

**Step 2: Commit**

```bash
git add src/components/ui/Button.tsx && git commit -m "refactor: remove magnetic hover from Button"
```

---

### Task 7: Simplify Card — remove tilt and mouse-following glow

**Files:**
- Modify: `src/components/ui/Card.tsx`

**Step 1: Rewrite Card.tsx**

Remove all tilt logic, mouse-following glow, and hover lift:

```tsx
type CardProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
};

export function Card({ children, className = "", interactive = false }: CardProps) {
  return (
    <div
      className={`group relative bg-gray-950 border border-gray-800 rounded-lg p-8 hover:border-accent/20 hover:shadow-[0_0_40px_rgba(0,255,148,0.08)] transition-all duration-200 ${interactive ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
```

Key changes: removed `"use client"` directive (no longer needed), removed `useRef`/`useState`/`useCallback` imports, removed `glowPos`/`tiltStyle` state, removed `handleMove`/`handleLeave`, removed mouse-following glow div, removed `hover:-translate-y-0.5`, changed `duration-300` to `duration-200`.

**Step 2: Commit**

```bash
git add src/components/ui/Card.tsx && git commit -m "refactor: remove tilt and glow from Card — flat defense aesthetic"
```

---

### Task 8: Simplify AnimatedSection — remove dramatic variants, fix easing

**Files:**
- Modify: `src/components/ui/AnimatedSection.tsx`

**Step 1: Update AnimatedSection**

Remove `blur-in` and `scale-reveal` variants. Change easing from custom cubic-bezier to easeOut, reduce duration from 0.5 to 0.3:

In `src/components/ui/AnimatedSection.tsx`:

Remove lines 37-44 (scale-reveal and blur-in variants from variantMap).

Update the Variant type (line 6-13) to remove `"scale-reveal"` and `"blur-in"`.

Update transition in the main AnimatedSection (lines 83-87):

```tsx
// Before:
transition={{
  duration: 0.5,
  delay,
  ease: [0.25, 0.1, 0.25, 1],
}}

// After:
transition={{
  duration: 0.3,
  delay,
  ease: "easeOut",
}}
```

Update StaggerItem transition (line 133):

```tsx
// Before:
transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}

// After:
transition={{ duration: 0.3, ease: "easeOut" }}
```

**Step 2: Commit**

```bash
git add src/components/ui/AnimatedSection.tsx && git commit -m "refactor: simplify AnimatedSection — remove dramatic variants, faster easing"
```

---

### Task 9: Simplify AnimatedBorder — static border

**Files:**
- Modify: `src/components/ui/AnimatedBorder.tsx`

**Step 1: Rewrite AnimatedBorder**

Replace rotating conic gradient with static accent border:

```tsx
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: number;
  active?: boolean;
};

export function AnimatedBorder({
  children,
  className = "",
}: Props) {
  return (
    <div className={`relative p-px rounded-lg overflow-hidden ${className}`}>
      <div className="absolute inset-0 rounded-lg border border-accent/[0.08]" />
      <div className="relative bg-gray-950 rounded-lg">
        {children}
      </div>
    </div>
  );
}
```

Key changes: removed rotating conic gradient, removed `<style jsx>` block, removed animation. Kept the structural wrapper for layout compatibility. `speed` and `active` props preserved in type but unused (prevents consumer breakage).

**Step 2: Commit**

```bash
git add src/components/ui/AnimatedBorder.tsx && git commit -m "refactor: simplify AnimatedBorder — static accent border"
```

---

### Task 10: Make NoiseOverlay static — remove grain animation

**Files:**
- Modify: `src/components/visuals/NoiseOverlay.tsx`

**Step 1: Remove animate-grain class**

In `src/components/visuals/NoiseOverlay.tsx`, change:

```tsx
// Before (line 7):
className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay animate-grain"

// After:
className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
```

**Step 2: Commit**

```bash
git add src/components/visuals/NoiseOverlay.tsx && git commit -m "refactor: make NoiseOverlay static — no grain animation"
```

---

### Task 11: Clean up animation keyframes from design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/styles/globals.css`

**Step 1: Remove animation classes from tailwind.config.ts**

Remove these animation class definitions (lines 61-64):

```ts
// Remove:
grain: "grain 0.5s steps(6) infinite",
float: "float 6s ease-in-out infinite",
"pulse-accent": "pulse-accent 3s ease-in-out infinite",
"sweep-glow": "sweep-glow 8s linear infinite",
```

Remove corresponding keyframe definitions (lines 79-97):

```ts
// Remove grain, float, pulse-accent, sweep-glow keyframes
```

Keep: `sweep`, `scan-line`, `blip`, `drone-ping`, and any other operational animations.

**Step 2: Remove duplicate keyframes from globals.css**

Remove these keyframe blocks from `src/styles/globals.css`:
- `@keyframes grain` (lines 107-118)
- `@keyframes sweep-glow` (lines 121-124)
- `@keyframes pulse-accent` (lines 127-130)
- `@keyframes float` (lines 133-136)

Update the `prefers-reduced-motion` media query (lines 148-157) to remove references to deleted animations:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .animate-spin {
    animation: none !important;
  }
}
```

**Step 3: Commit**

```bash
git add tailwind.config.ts src/styles/globals.css && git commit -m "chore: remove unused animation keyframes — grain, float, pulse-accent, sweep-glow"
```

---

### Task 12: Fix Framer Motion spring configs globally

**Files:**
- Modify: `src/components/layout/Navbar.tsx:121,195`

**Step 1: Fix Navbar dropdown spring**

In `src/components/layout/Navbar.tsx`, replace the spring transition on dropdown (line 121):

```tsx
// Before:
transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}

// After:
transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
```

Replace the mobile nav spring (line 195):

```tsx
// Before:
transition={{ type: "spring", stiffness: 300, damping: 30 }}

// After:
transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
```

**Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx && git commit -m "refactor: replace spring animations with tween easeOut in Navbar"
```

---

### Task 13: Phase 1 build verification

**Step 1: Full build**

Run: `npx next build 2>&1 | tail -30`
Expected: Build succeeds with no errors. All deleted components have no remaining imports.

**Step 2: Commit (if any fixes needed)**

---

## Phase 2 — Restructure Marketing Pages

### Task 14: Restructure the root homepage (page.tsx)

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Restructure from 8 sections to 4**

Rewrite `src/app/page.tsx` — remove Pipeline, ScoutShowcase, IndustryCards, SocialProof. Keep DemoLanding, then below-fold: MetricsBar (will be inlined into Hero later), PlatformPreview, new DeploymentsAndVerticals section, CTASection:

```tsx
import type { Metadata } from "next";
import { DemoLanding } from "@/components/landing/DemoLanding";
import { Hero } from "@/components/sections/Hero";
import { PlatformPreview } from "@/components/sections/PlatformPreview";
import { DeploymentsAndVerticals } from "@/components/sections/DeploymentsAndVerticals";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/visuals/NoiseOverlay";

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
      <DemoLanding />

      <div className="relative">
        <NoiseOverlay />
        <Hero />
        <PlatformPreview />
        <DeploymentsAndVerticals />
        <CTASection
          title="Discuss your requirements"
          primaryHref="/contact"
          primaryLabel="Request Briefing"
        />
        <Footer />
      </div>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/page.tsx && git commit -m "refactor: restructure homepage — 8 sections to 4, defense-focused"
```

---

### Task 15: Update Hero section — inline metrics, remove DataStream

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Step 1: Rewrite Hero**

Replace ParticleMesh with TacticalGrid (already done in Task 5). Remove DataStream columns. Shorten body copy to 2 sentences. Inline 4 metrics as static monospace. Change CTA from "Launch Platform" to "Request Briefing" + "View Platform" ghost:

```tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HUDElement } from "@/components/visuals/HUDElement";
import { TacticalGrid } from "@/components/visuals/TacticalGrid";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const metrics = [
  { value: "99.7%", label: "UPTIME" },
  { value: "60s", label: "DEPLOY" },
  { value: "24/7", label: "MONITORING" },
  { value: "3km+", label: "RANGE" },
];

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gray-950">
      <TacticalGrid />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-[2]" />

      <HUDElement corner="top-left" className="z-[4]" />
      <HUDElement corner="bottom-right" className="z-[4]" />

      <div className="relative z-10 w-full section-container py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          >
            <SectionLabel className="mb-8">
              Radiofrequency Drone Intelligence
            </SectionLabel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Persistent visibility into{" "}
              <span className="text-gray-400">low-altitude airspace</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
            className="text-lg text-gray-400 mt-8 max-w-md leading-relaxed"
          >
            Guardian RF provides persistent RF sensing and intelligence for
            low-altitude airspace where drone activity cannot be continuously
            detected and attributed.
          </motion.p>

          {/* Inline metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap gap-6 mt-8 font-mono text-xs"
          >
            {metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-2">
                <span className="text-white font-semibold text-sm">{m.value}</span>
                <span className="text-gray-600 uppercase tracking-wider">{m.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
            className="mt-8 flex items-center gap-4"
          >
            <Button href="/contact">Request Briefing</Button>
            <Button href="/platform" variant="ghost">
              View Platform
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

Key changes: removed ParticleMesh, DataStream, RadarScope, HeroScene imports. Removed right-side 3D scene column (the 3D demo is already at root `/` above this). Inlined metrics as static monospace. Shortened body copy. Changed CTA language. Removed clip-path and spring animations. Removed `typing` prop from SectionLabel.

**Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx && git commit -m "refactor: simplify Hero — inline metrics, remove DataStream, defense CTAs"
```

---

### Task 16: Create DeploymentsAndVerticals section

**Files:**
- Create: `src/components/sections/DeploymentsAndVerticals.tsx`

**Step 1: Create the new combined section**

```tsx
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const deployments = [
  { name: "Vandenberg Space Force Base", detail: "Active Phase II SBIR — persistent passive RF monitoring" },
  { name: "DIU C-UAS Challenge", detail: "Downselected passive RF solution" },
  { name: "AFWERX Phase II", detail: "Air Force contract" },
  { name: "Constellis Training Facility", detail: "3,700-acre NC site — live-fire range airspace awareness" },
  { name: "CFP Championship 2026", detail: "University of Miami — continuous detection and alerting" },
];

const recognition = ["Forbes 30 Under 30", "Y Combinator S24"];

const verticals = [
  { name: "Defense & National Security", href: "/verticals/defense", tagline: "Protect installations with persistent, passive RF sensing." },
  { name: "Law Enforcement", href: "/verticals/law-enforcement", tagline: "Regional drone awareness across jurisdictions." },
  { name: "Critical Infrastructure", href: "/verticals/critical-infrastructure", tagline: "Continuous airspace monitoring for energy and industrial sites." },
  { name: "Venues & Events", href: "/verticals/venues", tagline: "Scalable, event-ready drone detection." },
  { name: "Aviation", href: "/verticals/aviation", tagline: "Safeguard airports and emergency response corridors." },
];

export function DeploymentsAndVerticals() {
  return (
    <section className="py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left — Deployments */}
          <AnimatedSection className="lg:col-span-7">
            <SectionLabel>Deployments &amp; Recognition</SectionLabel>
            <div className="mt-6 space-y-4">
              {deployments.map((dep) => (
                <div
                  key={dep.name}
                  className="flex items-start gap-3 py-3 border-b border-gray-800/50 last:border-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">{dep.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{dep.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {recognition.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs font-mono text-gray-500 border border-gray-800 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Right — Verticals */}
          <AnimatedSection className="lg:col-span-5" delay={0.1}>
            <SectionLabel>Verticals</SectionLabel>
            <div className="mt-6 space-y-3">
              {verticals.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className="group block py-3 border-b border-gray-800/50 last:border-0 hover:border-accent/10 transition-colors duration-150"
                >
                  <p className="text-sm font-medium text-white group-hover:text-accent/90 transition-colors duration-150">
                    {v.name} <span className="text-gray-600 group-hover:text-gray-500">&rarr;</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{v.tagline}</p>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/DeploymentsAndVerticals.tsx && git commit -m "feat: add DeploymentsAndVerticals — combined deployment evidence and vertical links"
```

---

### Task 17: Update PlatformPreview — remove perspective tilt, fix copy

**Files:**
- Modify: `src/components/sections/PlatformPreview.tsx`

**Step 1: Fix heading and section label**

In `src/components/sections/PlatformPreview.tsx`:

Line 57 — remove `typing` prop from SectionLabel:
```tsx
// Before:
<SectionLabel typing>Intelligence Platform</SectionLabel>
// After:
<SectionLabel>Intelligence Platform</SectionLabel>
```

Lines 59-61 — replace heading:
```tsx
// Before:
<ClipRevealText>
  <h2 ...>The data layer for low-altitude airspace</h2>
</ClipRevealText>
// After:
<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-2xl">
  Persistent Airspace Surveillance Platform
</h2>
```

Remove `ClipRevealText` import (line 7).

Line 71-73 — update CTA:
```tsx
// Before:
<Button href="/platform" variant="ghost">Explore the platform</Button>
// After:
<Button href="/platform" variant="ghost">View Platform</Button>
```

**Step 2: Remove perspective tilt**

Lines 84-86:
```tsx
// Before:
style={{
  transform: "perspective(1200px) rotateX(2deg)",
  aspectRatio: "16 / 9",
}}
// After:
style={{
  aspectRatio: "16 / 9",
}}
```

**Step 3: Replace blur-in variant**

Line 79:
```tsx
// Before:
<AnimatedSection variant="blur-in" delay={0.2}>
// After:
<AnimatedSection variant="fade-in" delay={0.2}>
```

**Step 4: Commit**

```bash
git add src/components/sections/PlatformPreview.tsx && git commit -m "refactor: update PlatformPreview — remove tilt, defense-appropriate copy"
```

---

### Task 18: Update CTASection — remove decorators

**Files:**
- Modify: `src/components/sections/CTASection.tsx`

**Step 1: Simplify CTASection**

Remove AnimatedBorder, DataStream, GridBackground decorators:

```tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { HUDElement } from "@/components/visuals/HUDElement";

type CTASectionProps = {
  title: string;
  primaryHref: string;
  primaryLabel: string;
};

export function CTASection({
  title,
  primaryHref,
  primaryLabel,
}: CTASectionProps) {
  return (
    <section className="py-32 bg-gray-950">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-lg border border-accent/[0.08] px-8 py-16 md:py-20 text-center">
          <HUDElement corner="top-left" />
          <HUDElement corner="bottom-right" />

          <div className="relative z-10">
            <AnimatedSection variant="fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {title}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="mt-8">
                <Button href={primaryHref}>{primaryLabel}</Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/sections/CTASection.tsx && git commit -m "refactor: simplify CTASection — remove AnimatedBorder, DataStream, GridBackground"
```

---

### Task 19: Update Navbar — remove scroll progress bar, fix brand

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

GlitchText was already removed in Task 1. Now remove scroll progress bar and Platform button changes.

**Step 1: Remove scroll progress bar**

Remove `scrollProgress` state (line 309) and the progress bar div (lines 331-334):

```tsx
// Remove line 309:
const [scrollProgress, setScrollProgress] = useState(0);

// Remove from handleScroll (lines 314-315):
const docHeight = document.documentElement.scrollHeight - window.innerHeight;
setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);

// Remove lines 331-334 (progress bar div):
<div
  className="absolute top-0 left-0 h-[1px] bg-accent/60 transition-none"
  style={{ width: `${scrollProgress}%`, boxShadow: "0 0 8px rgba(0,255,148,0.3)" }}
/>
```

**Step 2: Change Platform button to Contact link**

Lines 359-363:
```tsx
// Before:
<Link
  href="/dashboard"
  className="hidden lg:inline-flex border border-gray-700 rounded-md px-4 py-1.5 text-sm text-white/80 hover:border-gray-500 hover:text-white transition-colors duration-200"
>
  Platform
</Link>

// After:
<Link
  href="/contact"
  className="hidden lg:inline-flex border border-gray-700 rounded-md px-4 py-1.5 text-sm text-white/80 hover:border-gray-500 hover:text-white transition-colors duration-150"
>
  Contact
</Link>
```

Same for mobile nav (line 278-284).

**Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx && git commit -m "refactor: remove scroll progress bar from Navbar, change CTA to Contact"
```

---

### Task 20: Update Footer — remove decorators, add export notice

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Step 1: Remove SignalWave, dot grid, whileInView animations, cursor pulse**

Rewrite Footer to remove all decorative elements:

Remove SignalWave import (line 6) and its rendering (lines 52-54).
Remove dot grid div (lines 42-49).
Replace `motion.div` wrappers with plain `div` elements (lines 59-76, 80-124).
Remove animated cursor pulse (line 133).
Add export control notice before copyright.

```tsx
// Replace lines 59-76 (logo section) — remove motion.div:
<div className="col-span-2 md:col-span-1">
  ...same content, no motion wrapper...
</div>

// Replace lines 80-124 (link columns) — remove motion.div:
{allLinkGroups.map((group) => (
  <div key={group.title}>
    ...same content, no motion wrapper...
  </div>
))}

// Replace copyright section (lines 129-135):
<div className="relative section-container pb-8 border-t border-gray-800 pt-8">
  <p className="font-mono text-[10px] uppercase tracking-wider text-white/20 mb-3">
    This website contains information subject to U.S. export control regulations.
  </p>
  <p className="text-sm text-gray-600 font-mono">
    &copy; 2026 Guardian RF Corporation. All rights reserved.
  </p>
</div>
```

**Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx && git commit -m "refactor: simplify Footer — remove decorators, add export control notice"
```

---

### Task 21: Update all subpage CTAs

**Files:**
- Modify: `src/app/(marketing)/about/story/page.tsx:125-128`
- Modify: `src/app/(marketing)/platform/page.tsx:44-45,145-148`
- Modify: `src/app/(marketing)/hardware/page.tsx:231-234`
- Modify: `src/app/(marketing)/contact/page.tsx:12,15-18,151-152`
- Modify: `src/components/verticals/VerticalTemplate.tsx:93-96`

**Step 1: Story page**

```tsx
// Before (lines 125-128):
<CTASection
  title="Join the mission"
  primaryHref="/dashboard"
  primaryLabel="Launch Platform"
/>

// After:
<CTASection
  title="Contact us"
  primaryHref="/contact"
  primaryLabel="Request Briefing"
/>
```

**Step 2: Platform page**

```tsx
// Line 44-45, heading:
// Before:
The data layer for low-altitude airspace
// After:
Persistent Airspace Surveillance Platform

// Lines 145-148, CTA:
// Before:
<CTASection
  title="See the platform in action"
  primaryHref="/dashboard"
  primaryLabel="Launch Platform"
/>
// After:
<CTASection
  title="Request platform demonstration"
  primaryHref="/contact"
  primaryLabel="Request Briefing"
/>
```

**Step 3: Hardware page**

```tsx
// Lines 231-234:
// Before:
<CTASection
  title="Ready to deploy persistent coverage?"
  primaryHref="/contact"
  primaryLabel="Request Hardware Information"
/>
// After:
<CTASection
  title="Ready to deploy persistent coverage?"
  primaryHref="/contact"
  primaryLabel="Request Technical Brief"
/>
```

**Step 4: Contact page**

```tsx
// Line 12 — inquiry types:
// Before:
const inquiryTypes = ["", "Request a Demo", ...];
// After:
const inquiryTypes = ["", "Schedule Capability Demonstration", "Sales Inquiry", "Partnership Opportunity", "Media Inquiry", "Career Inquiry", "Other"];

// Lines 15-18 — steps:
const steps = [
  { number: "01", title: "Initial Response", description: "Response within one business day." },
  { number: "02", title: "Capability Demonstration", description: "Platform demonstration tailored to your operational environment." },
  { number: "03", title: "Deployment Planning", description: "Sensor configuration, integration requirements, and deployment timeline." },
];

// Lines 151-152 — button:
// Before:
{isSubmitting ? "Sending..." : "Send Message"}
// After:
{isSubmitting ? "Submitting..." : "Submit Inquiry"}
```

**Step 5: VerticalTemplate**

```tsx
// Lines 93-96:
// Before:
<CTASection
  title={`Secure your ${vertical.shortTitle.toLowerCase()} airspace`}
  primaryHref="/dashboard"
  primaryLabel="Launch Platform"
/>
// After:
<CTASection
  title={`Discuss ${vertical.shortTitle.toLowerCase()} requirements`}
  primaryHref="/contact"
  primaryLabel="Request Briefing"
/>
```

**Step 6: Also remove stagger delay on VerticalTemplate capability cards**

Line 54:
```tsx
// Before:
<AnimatedSection key={cap.title} delay={i * 0.08}>
// After:
<AnimatedSection key={cap.title}>
```

Same for deployment cards (line 77):
```tsx
// Before:
<AnimatedSection key={dep.name} delay={i * 0.08}>
// After:
<AnimatedSection key={dep.name}>
```

**Step 7: Commit**

```bash
git add -A && git commit -m "refactor: update all CTAs — defense language, contact-bound actions"
```

---

### Task 22: Phase 2 build verification

**Step 1: Full build**

Run: `npx next build 2>&1 | tail -30`
Expected: Build succeeds with all routes generating correctly.

**Step 2: Commit any fixes**

---

## Phase 3 — Polish

### Task 23: Wire sensitivity slider to DetectionDome

**Files:**
- Modify: `src/components/landing/scene/Hero3DScene.tsx:16-18,42`
- Modify: `src/components/landing/scene/DetectionDome.tsx`

**Step 1: Add sensitivity prop to DetectionDome**

```tsx
// src/components/landing/scene/DetectionDome.tsx — full rewrite:
import * as THREE from "three";
import { SCENE_CONFIG } from "./types";

const { dome, colors } = SCENE_CONFIG;

interface DetectionDomeProps {
  sensitivity?: number;
}

export function DetectionDome({ sensitivity = 0.8 }: DetectionDomeProps) {
  const wireOpacity = dome.wireframeOpacity + sensitivity * 0.06;
  const fillOpacity = dome.fillOpacity + sensitivity * 0.01;

  return (
    <group>
      <mesh>
        <sphereGeometry
          args={[dome.radius, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshBasicMaterial
          color={colors.accent}
          wireframe
          opacity={wireOpacity}
          transparent
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[dome.radius - 0.1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshBasicMaterial
          color={colors.accent}
          opacity={fillOpacity}
          transparent
          side={THREE.BackSide}
        />
      </mesh>

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
```

**Step 2: Pass sensitivity through Hero3DScene**

In `src/components/landing/scene/Hero3DScene.tsx`, change line 42:

```tsx
// Before:
<DetectionDome />
// After:
<DetectionDome sensitivity={controls.sensitivity} />
```

**Step 3: Commit**

```bash
git add src/components/landing/scene/DetectionDome.tsx src/components/landing/scene/Hero3DScene.tsx && git commit -m "feat: wire sensitivity slider to DetectionDome opacity"
```

---

### Task 24: Add drift to target orbits

**Files:**
- Modify: `src/components/landing/scene/TargetSwarm.tsx:58-64`

**Step 1: Add sine-based noise to orbit positions**

In `src/components/landing/scene/TargetSwarm.tsx`, update the useFrame in the Target component (lines 58-65):

```tsx
// Before:
useFrame(({ clock }) => {
  const t = clock.getElapsedTime() * data.orbitSpeed + data.orbitPhase;
  groupRef.current.position.set(
    Math.cos(t) * data.orbitRadiusX,
    data.altitude + Math.sin(t * 1.3) * 0.4,
    Math.sin(t) * data.orbitRadiusZ
  );
});

// After:
useFrame(({ clock }) => {
  const elapsed = clock.getElapsedTime();
  const t = elapsed * data.orbitSpeed + data.orbitPhase;
  const p = data.orbitPhase;

  // Add multi-frequency drift to prevent deterministic loop detection
  const driftX = Math.sin(elapsed * 0.3 + p) * 0.4 + Math.sin(elapsed * 0.17 + p * 2.1) * 0.2;
  const driftZ = Math.cos(elapsed * 0.2 + p * 1.5) * 0.4 + Math.cos(elapsed * 0.13 + p * 1.8) * 0.2;
  const driftY = Math.sin(elapsed * 0.15 + p * 0.7) * 0.15;

  groupRef.current.position.set(
    Math.cos(t) * data.orbitRadiusX + driftX,
    data.altitude + Math.sin(t * 1.3) * 0.4 + driftY,
    Math.sin(t) * data.orbitRadiusZ + driftZ
  );
});
```

**Step 2: Commit**

```bash
git add src/components/landing/scene/TargetSwarm.tsx && git commit -m "feat: add drift to target orbits — prevent deterministic loop detection"
```

---

### Task 25: Final build and verification

**Step 1: Full build**

Run: `npx next build 2>&1 | tail -40`
Expected: All 15 routes build successfully. No TypeScript errors. No missing imports.

**Step 2: Check route output**

Expected routes:
- `/` (root — 3D demo + 4 marketing sections)
- `/dashboard`
- `/about/story`
- `/contact`
- `/hardware`
- `/platform`
- `/verticals/defense`
- `/verticals/law-enforcement`
- `/verticals/critical-infrastructure`
- `/verticals/venues`
- `/verticals/aviation`

**Step 3: Visual spot check**

Run: `npx next dev` and manually verify:
- No GlitchText on any page
- No tilting cards
- No cursor glow
- No particle mesh
- No typewriter text
- No rotating border animations
- No scroll progress bar in Navbar
- Export control notice in Footer
- "Request Briefing" CTAs throughout
- Tactical grid on marketing hero
- PlatformPreview has no perspective tilt
- 3D demo targets have visible drift

**Step 4: Final commit**

```bash
git add -A && git commit -m "chore: defense credibility overhaul complete — Phase 1-3"
```
