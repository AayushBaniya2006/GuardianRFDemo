# Defense Credibility Overhaul — Design Document

**Date:** 2026-02-26
**Scope:** Full overhaul — strip SaaS patterns, restructure marketing homepage, rewrite CTAs, rework animations globally
**Constraint:** 3D demo stays as root `/`. Dashboard untouched. No compliance section (deferred). Skip adding case study pages (content not available yet).

---

## Problem Statement

The GuardianRF website has strong technical substance (real deployments, accurate RF data, production-grade dashboard) wrapped in SaaS startup packaging that undermines defense credibility. The audit scored defense credibility at 6/10 and brand seriousness at 5/10, with the gap driven by visual microinteractions, marketing-funnel page structure, and startup CTA language.

## Design Decisions

### Homepage: 3D demo remains at root `/`

The tactical airspace demo is the company's strongest differentiator. It stays at `/` with no changes. The marketing homepage at `(marketing)/page.tsx` is what gets restructured.

### Hero Background: CSS tactical grid replaces ParticleMesh

New `TacticalGrid.tsx` component — CSS-only dark grid with subtle accent scan-line. Replaces the 220-particle floating mesh that reads as generic AI startup.

---

## Phase 1 — Strip SaaS DNA (UI Primitives & Animations)

### Components to DELETE

| Component | File | Reason |
|-----------|------|--------|
| GlitchText | `src/components/ui/GlitchText.tsx` | Cyberpunk red/cyan chromatic aberration. Not defense. |
| CursorGlow | `src/components/ui/CursorGlow.tsx` | Portfolio template cursor-following glow |
| TiltCard | `src/components/ui/TiltCard.tsx` | perspective(1000px) 3D tilt on hover. Dribbble pattern |
| TypewriterText | `src/components/ui/TypewriterText.tsx` | Character-by-character reveal. Content marketing |
| ParticleMesh | `src/components/visuals/ParticleMesh.tsx` | 220 floating particles. Generic AI startup hero |

### Components to MODIFY

**Button.tsx:**
- Remove magnetic hover (0.15px cursor attraction)
- Remove spring-based active state (`scale(0.98)` with spring config)
- Use `transition: all 150ms ease-out` for hover/active
- Active state: `scale(0.98)` with `ease-out 100ms` (not spring)

**Card.tsx:**
- Remove mouse-following radial glow overlay
- Remove TiltCard import/dependency
- Keep border-accent hover (`hover:border-accent/20`)
- Keep subtle hover shadow (`hover:shadow-[0_0_40px_rgba(0,255,148,0.08)]`)
- Remove `hover:-translate-y-0.5` lift effect

**AnimatedSection.tsx:**
- Remove variants: `blur-in`, `scale-reveal`
- Keep variants: `fade-up`, `fade-in`, `fade-left`, `clip-reveal`
- Replace spring easing with `type: "tween", ease: "easeOut", duration: 0.3`
- Remove stagger delay (set to 0 or remove staggerChildren)

**AnimatedBorder.tsx:**
- Remove rotating conic gradient animation
- Replace with static border: `border border-accent/[0.08]`
- Keep the component wrapper for layout compatibility

**SectionLabel.tsx:**
- Remove any TypewriterText integration
- Static monospace label rendering only

### New Component

**TacticalGrid.tsx** (`src/components/visuals/TacticalGrid.tsx`):
- CSS-only background component
- Dark base (`bg-gray-950`)
- Grid pattern: `repeating-linear-gradient` on both axes, white/[0.03], 48px spacing
- Faint accent radial gradient at center: `radial-gradient(ellipse at 50% 50%, rgba(0,255,148,0.02), transparent 70%)`
- Optional scan-line: horizontal gradient line, `animate-scan-line` (3s linear), accent/10
- Props: `showScanLine?: boolean`, `className?: string`

### Animation Keyframe Cleanup

**Keep:**
- `sweep` (6s linear) — radar sweep rotation
- `scan-line` (3s linear) — horizontal scan
- `blip` (2s ease-in-out) — radar target pulse (mobile fallback + dashboard)
- `drone-ping` — Mapbox expanding ring (dashboard only)
- Status `pulse` (default Tailwind) — connection indicators

**Remove from tailwind.config.ts + globals.css:**
- `grain` keyframe + `animate-grain` class
- `float` keyframe + `animate-float` class
- `pulse-accent` keyframe + `animate-pulse-accent` class
- `sweep-glow` keyframe + `animate-sweep-glow` class

**NoiseOverlay.tsx:** Keep but make static (remove `animate-grain` class, keep the noise texture at 3.5% opacity as fixed background).

### Global Framer Motion Changes

Replace all spring configs:
```
// Before
type: "spring", stiffness: 400, damping: 30, mass: 0.8

// After
type: "tween", ease: "easeOut", duration: 0.2
```

Replace all stagger configs on marketing sections:
```
// Before
staggerChildren: 0.08

// After
staggerChildren: 0 (or remove)
```

Keep stagger on NavOverlay (functional loading indicator).

### Consumers to Update

Every file that imports a deleted component must be updated:
- `GlitchText` → static monospace `<span>` with same className
- `CursorGlow` → remove from marketing layout
- `TiltCard` → unwrap children, apply styles to parent/Card directly
- `TypewriterText` → static text render
- `ParticleMesh` → replace with `TacticalGrid` in Hero section

---

## Phase 2 — Restructure Marketing Pages

### Marketing Homepage (`src/app/(marketing)/page.tsx`)

**Current structure (8 sections):**
```
Hero → MetricsBar → PlatformPreview → Pipeline → ScoutShowcase → IndustryCards → SocialProof → CTASection
```

**New structure (4 sections):**
```
Hero (with inline metrics) → PlatformPreview → DeploymentsAndVerticals → CTASection
```

**Section 1 — Hero (merged with MetricsBar):**
- Background: TacticalGrid (replaces ParticleMesh)
- Headline: "Persistent visibility into low-altitude airspace" (keep)
- Body: Shorten to 2 sentences max. Current 4-sentence paragraph → trim the last 2 sentences.
- Metrics: 4 values inline as static monospace text below body copy. No animated counters, no progress bars. Format: `99.7% UPTIME · 60s DEPLOY · 24/7 MONITORING · 3km+ RANGE`
- CTA: "Request Briefing" (primary), "View Platform" (ghost → /platform)
- Keep HUD corners
- Remove DataStream columns from edges

**Section 2 — PlatformPreview (elevated):**
- Move from position 3 → position 2
- Section label: "Intelligence Platform" (static, no typewriter)
- Heading: "Persistent Airspace Surveillance Platform" (replaces "The data layer for low-altitude airspace")
- Remove perspective tilt (`rotateX(2deg)`) — flat presentation
- Keep scan-line, status bar, blips, drone list
- CTA: "View Platform" (ghost → /platform)

**Section 3 — Deployments & Verticals (new combined section):**
Replaces: Pipeline + ScoutShowcase + IndustryCards + SocialProof

Two-column layout (responsive: stack on mobile):
- **Left (lg:col-span-7):** "Deployments & Recognition" heading. Compact list:
  - Vandenberg Space Force Base — Active Phase II SBIR
  - DIU C-UAS Challenge — Downselected passive RF solution
  - AFWERX Phase II — Air Force contract
  - Constellis Training Facility — 3,700-acre NC site
  - CFP Championship 2026 — University of Miami
  - Forbes 30 Under 30 · Y Combinator S24
- **Right (lg:col-span-5):** "Verticals" heading. 5 items as compact links:
  - Defense & National Security → /verticals/defense
  - Law Enforcement → /verticals/law-enforcement
  - Critical Infrastructure → /verticals/critical-infrastructure
  - Venues & Events → /verticals/venues
  - Aviation → /verticals/aviation
  Each with one-sentence tagline from verticals.ts data.

**Section 4 — CTASection (compact):**
- Title: "Discuss your requirements"
- Button: "Request Briefing" → /contact
- Remove AnimatedBorder wrapper (use static accent border)
- Remove DataStream/GridBackground decorators
- Keep HUD corners

### CTA Language Changes (All Pages)

| Page | Current CTA | New CTA |
|------|-------------|---------|
| Homepage | "Launch Platform" | "Request Briefing" |
| Platform | "Launch Platform" | "Request Platform Demonstration" |
| Hardware | "Request Hardware Information" | "Request Technical Brief" |
| Story | "Join the mission" / "Launch Platform" | "Contact Us" |
| Contact form button | "Send Message" | "Submit Inquiry" |
| Contact dropdown default | "Request a Demo" | "Schedule Capability Demonstration" |
| Verticals | "Launch Platform" | "Request Briefing" |
| Verticals CTA title | "Secure your {vertical} airspace" | "Discuss {Vertical} Requirements" |

### Navbar Changes

- Replace GlitchText with static `<span className="font-mono text-sm uppercase tracking-[0.15em] text-white/80">GUARDIANRF</span>`
- Remove scroll progress bar (the accent-colored horizontal line)
- Replace spring animation on dropdowns with `type: "tween", ease: "easeOut", duration: 0.15`
- Change "Platform" button from secondary variant to ghost link

### Footer Changes

- Remove SignalWave import and rendering
- Remove dot grid background pattern
- Remove animated cursor pulse in copyright
- Add export control notice before copyright: `"This website contains information subject to U.S. export control regulations."` — `font-mono text-[10px] uppercase tracking-wider text-white/20`
- Remove `whileInView` animations on footer columns

### Subpage Changes

**Story (/about/story):**
- Remove TypewriterText on blockquote → static `<blockquote>` with left accent border
- Remove stagger on timeline items
- CTA: "Contact Us"

**Platform (/platform):**
- H1: "Persistent Airspace Surveillance Platform"
- "From detections to answers" → "Detection to Intelligence Pipeline"
- Remove TypewriterText/GlitchText instances
- CTA: "Request Platform Demonstration"

**Hardware (/hardware):**
- Remove GlitchText/TypewriterText instances
- CTA: "Request Technical Brief"

**Verticals (5 pages via VerticalTemplate):**
- Remove GlitchText on hero heading
- Remove stagger on capability cards
- CTA title: "Discuss {Vertical} Requirements"
- CTA button: "Request Briefing"

---

## Phase 3 — Polish

### 3D Scene Improvements

**Wire sensitivity slider:**
- DemoLanding passes `sensitivity` value to Hero3DScene
- Hero3DScene passes to DetectionDome
- DetectionDome adjusts wireframe material opacity: `opacity = 0.06 + (sensitivity * 0.06)` (range 0.06–0.12)
- DetectionDome adjusts fill material opacity similarly

**Target orbit drift (Perlin-like noise):**
- In TargetSwarm, add per-target position offset using compound sine waves:
  ```
  offsetX = sin(time * 0.3 + target.phase) * 0.4
  offsetZ = cos(time * 0.2 + target.phase * 1.5) * 0.4
  offsetY = sin(time * 0.15 + target.phase * 0.7) * 0.15
  ```
- Small enough to not break orbital structure, large enough to prevent loop detection

**Target spawn/despawn (optional, lower priority):**
- Every 18-25s, fade one target out (opacity → 0 over 2s) and spawn a replacement at different orbital params
- Update telemetry target count accordingly
- Keep total at ~10 targets

### Design Token Cleanup

- Remove orphaned CSS classes that reference deleted components
- Remove unused color tokens if any
- Verify no import errors from deleted components
- Clean up any duplicate keyframe definitions between globals.css and tailwind.config.ts

---

## Files Affected (Estimated)

### Phase 1 (~15 files)
- DELETE: GlitchText.tsx, CursorGlow.tsx, TiltCard.tsx, TypewriterText.tsx, ParticleMesh.tsx
- MODIFY: Button.tsx, Card.tsx, AnimatedSection.tsx, AnimatedBorder.tsx, SectionLabel.tsx, NoiseOverlay.tsx
- CREATE: TacticalGrid.tsx
- MODIFY: tailwind.config.ts, globals.css
- UPDATE: All consumers of deleted components (Navbar, Footer, Hero, SocialProof, Card, marketing layout, VerticalTemplate, etc.)

### Phase 2 (~20 files)
- MODIFY: (marketing)/page.tsx, Hero.tsx, MetricsBar.tsx (inline into Hero or remove), PlatformPreview.tsx, CTASection.tsx
- CREATE: DeploymentsAndVerticals.tsx (new combined section)
- DELETE (or orphan): Pipeline.tsx, ScoutShowcase.tsx, IndustryCards.tsx, SocialProof.tsx
- MODIFY: Navbar.tsx, Footer.tsx
- MODIFY: story/page.tsx, platform/page.tsx, hardware/page.tsx, VerticalTemplate.tsx
- MODIFY: contact/page.tsx

### Phase 3 (~8 files)
- MODIFY: DemoLanding.tsx, Hero3DScene.tsx, DetectionDome.tsx, TargetSwarm.tsx, types.ts
- MODIFY: ControlsPanel.tsx (sensitivity wiring)
- CLEANUP: tailwind.config.ts, globals.css

**Total: ~35-40 files touched across 3 phases**

---

## What We Are NOT Changing

- Root homepage (`src/app/page.tsx`) — 3D demo landing stays as-is structurally
- Dashboard (`src/components/dashboard/*`) — 95% operational credibility, untouched
- Data layer (`src/lib/data/*`) — real specs, real coordinates, untouched
- 3D scene structure — same components, same Canvas, same lighting. Only adding sensitivity wiring and orbit drift
- Route structure — same URLs, same route groups
- Fonts — Inter + JetBrains Mono stay
- Core color palette — `#00FF94` accent, dark grays stay. We're disciplining usage, not changing the palette
