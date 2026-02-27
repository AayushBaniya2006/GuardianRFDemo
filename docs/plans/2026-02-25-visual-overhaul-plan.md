# GuardianRF Visual Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the GuardianRF marketing site from flat/generic "vibecoded" look to a premium defense-tech aesthetic inspired by Anduril (color system, opacity hierarchy, stark minimalism), Palantir (bento grid layouts, information density), Shield AI (photography-first hero, accent contrast), and Linear (staggered grid animations, mechanical precision).

**Architecture:** Bottom-up visual overhaul — design tokens first, then primitives, then section components. Every change flows from a unified design system rather than ad-hoc hex codes. No new pages or routes; only visual polish to existing components. One commit at the end.

**Tech Stack:** Next.js 14 + Tailwind CSS v3 + Framer Motion (already installed). No new dependencies needed.

---

## Research Summary (What We Learned)

### Anduril
- **Color:** Pure black (#000) background, white text, off-white (#f1f0ea) secondary surfaces, body text at **60% opacity** (not a separate gray hex), near-zero accent colors — restraint is the aesthetic
- **Hero:** Full-bleed responsive imagery with typewriter cursor animation, `HelveticaNowDisplay` font
- **Interactions:** Clip-path polygon reveal animations, sticky scroll-scrubbing sections, draggable timelines
- **Mood:** Clinical, serious, military-grade — no neon, no flashy gradients

### Palantir
- **Bento grids:** Numbered cards (`—— A`, `—— B`), mixed 2-column and 4-column layouts, `size="100"` equal-weight cards
- **Media:** Full-bleed 16:9 hero imagery, embedded Vimeo, 3D icosiedodecahedron graphic
- **Typography:** Bold headings with semantic hierarchy, gray H3s for secondary content
- **Layout:** Light backgrounds (`backgroundColor:"light"`) in some sections for contrast breaks

### Shield AI
- **Accent:** Electric lime green (#9DFF20) on dark — single high-contrast accent
- **Hero:** Large background photography (no 3D/particles), centered content, one prominent CTA
- **Fonts:** DM Sans body, Source Serif Pro headlines — mixing serif for authority
- **Approach:** Photography-first, restrained elegance, minimal interactive effects

### Linear
- **Animations:** Staggered grid dot animations using `steps(1, end)` for mechanical precision, 3200ms intervals
- **Typography:** 4-tier text color system (primary → secondary → tertiary → quaternary)
- **Polish:** Text decoration at 2.5px offsets with 1.5px thickness, monospace system for data

### Bento Grid Best Practices
- Asymmetric compositions: large hero cards (2×2) alongside compact (1×1) widgets
- Gap: 16–24px, border-radius: 12–16px
- Large cards get full-bleed imagery; small cards get icon + stat
- Must feel intentional and balanced, not cramped

---

## Task Breakdown

### Task 1: Design System — Tailwind Config Overhaul

**Files:**
- Modify: `tailwind.config.ts`

**What to change:**

1. **Color system expansion** — Add Anduril-inspired opacity-based text hierarchy:
   - Keep `accent: #00d4ff` as primary accent
   - Add `accent-warm: #9DFF20` as secondary accent (Shield AI lime) for call-to-action contrast
   - Add surface tiers: `surface-1: #060609`, `surface-2: #0a0a0f`, `surface-3: #0f0f16`, `surface-4: #161622`
   - Standardize text: `white`, `white/80`, `white/60`, `white/40`, `white/20` (Anduril opacity model)

2. **Shadows** — Add a proper shadow system:
   ```
   glow-sm: "0 0 10px rgba(0,212,255,0.08)"
   glow-md: "0 0 20px rgba(0,212,255,0.12)"
   glow-lg: "0 0 40px rgba(0,212,255,0.15), 0 0 80px rgba(0,212,255,0.05)"
   surface: "0 1px 3px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)"
   ```

3. **Animations** — Add 6+ new animation utilities:
   - `shimmer`: horizontal light sweep (for loading states and card borders)
   - `glow-pulse`: shadow throb (for active indicators)
   - `float`: gentle Y oscillation (for hero elements)
   - `scan-line`: vertical line sweep (for platform mock)
   - `fade-in-up`: staggered entrance
   - `scale-in`: entrance from 0.95 to 1.0

4. **Border radius** — Add `rounded-xl` (16px) and `rounded-2xl` (20px) to design tokens

5. **Spacing** — Add `section` spacing: `py-32` (128px) for major sections, `py-20` (80px) for minor

**Verification:** `npx next build` passes.

---

### Task 2: Global CSS — Rich Utilities & Keyframes

**Files:**
- Modify: `src/styles/globals.css`

**What to add:**

1. **Grid pattern background** — Subtle dot grid for hero (Palantir-style):
   ```css
   .bg-grid-pattern {
     background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
     background-size: 32px 32px;
   }
   ```

2. **Gradient text utility**:
   ```css
   .text-gradient-accent {
     background: linear-gradient(135deg, #00d4ff 0%, #0891b2 50%, #00d4ff 100%);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
   }
   ```

3. **Noise texture overlay** (for subtle depth):
   ```css
   .noise-overlay::before {
     content: "";
     position: absolute;
     inset: 0;
     background: url("data:image/svg+xml,...") repeat;
     opacity: 0.03;
     pointer-events: none;
   }
   ```

4. **Shimmer border animation** (for premium card edges):
   ```css
   @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
   ```

5. **Scanning line animation** (for platform mock):
   ```css
   @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
   ```

6. **Glow pulse keyframe** for active elements

7. **Float keyframe** for hero decorative elements

8. **Better scrollbar** — slightly wider (8px), accent-tinted thumb on hover

9. **Radial gradient utility** for section spotlight effects:
   ```css
   .radial-spotlight {
     background: radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 60%);
   }
   ```

**Verification:** `npx next build` passes, dev server shows new CSS classes applied.

---

### Task 3: UI Primitive — Button Overhaul

**Files:**
- Modify: `src/components/ui/Button.tsx`

**Current problems:**
- Primary button is plain `bg-white text-black` — generic, no personality
- Secondary button has barely visible border
- No glow, no gradient, no letter-spacing

**Changes:**

1. **Primary variant**:
   - Background: `bg-white` → stays white but add `shadow-[0_0_20px_rgba(255,255,255,0.1)]` glow on hover
   - Add `tracking-wide uppercase text-xs font-semibold` for military precision
   - Hover: scale to 1.02, increase glow
   - Transition: `transition-all duration-300`

2. **Secondary variant**:
   - Border: `border-white/20` (visible but restrained, Anduril style)
   - Text: `text-white/80` default → `text-white` on hover
   - Hover: `border-white/50` + subtle background `bg-white/5`
   - Same tracking/text treatment as primary

3. **New "accent" variant** (for special CTAs):
   - Background: `bg-accent` with `text-black`
   - Glow: `shadow-[0_0_20px_rgba(0,212,255,0.3)]`
   - Hover: brighter glow, slight scale

**Verification:** Visual inspection on homepage — buttons should look intentional and premium.

---

### Task 4: UI Primitive — Card Overhaul

**Files:**
- Modify: `src/components/ui/Card.tsx`

**Current problems:**
- Flat `bg-[#0a0a0f]` with barely visible border
- Weak `-translate-y-1` hover — not noticeable
- No gradient, no glow, no depth

**Changes:**

1. **Background**: `bg-[#0a0a0f]` → `bg-gradient-to-b from-white/[0.03] to-transparent` layered over `bg-[#060609]`
   - This gives cards a subtle top-lit effect like they're in a spotlight

2. **Border**: `border-[#1a1a2e]` → `border-white/[0.06]` (more visible while still subtle)
   - On hover: `border-white/[0.12]` (Anduril opacity model)

3. **Hover effect**: Remove translate, add:
   - `bg-white/[0.04]` background shift
   - `shadow-[0_0_30px_rgba(0,212,255,0.06)]` subtle glow
   - `transition-all duration-500` (slower = more premium)

4. **Border radius**: `rounded-lg` → `rounded-xl` (16px, more modern)

5. **Add variant support**: `variant?: "default" | "highlight"` — highlight gets an accent top border

**Verification:** Cards on homepage Pipeline section should have visible depth.

---

### Task 5: UI Primitive — SectionLabel Overhaul

**Files:**
- Modify: `src/components/ui/SectionLabel.tsx`

**Current:** Plain `text-sm text-[#00d4ff]` — looks like every other startup.

**Change to:** Palantir-style numbered/bracketed label with horizontal line:
```
—— RADIOFREQUENCY DRONE INTELLIGENCE
```

Implementation:
- Left dash decorator (2 em-dashes or a short `<span>` line)
- `font-mono text-xs tracking-[0.2em] uppercase text-white/40` — NOT accent colored, more restrained
- The accent color comes from the content, not the label

This is a critical change — Anduril and Palantir both use restrained, nearly invisible section labels. The section label should disappear into the page, not scream "LOOK AT ME" in cyan.

**Verification:** All sections across the site pick up new label style.

---

### Task 6: UI Primitive — AnimatedSection Variants

**Files:**
- Modify: `src/components/ui/AnimatedSection.tsx`

**Current:** Every single element on the entire site uses the same `opacity: 0, y: 30 → opacity: 1, y: 0` animation. This is the #1 reason it looks vibecoded.

**Changes:**

Add a `variant` prop with these options:
- `"fade-up"` (default, existing behavior but with y: 20 not 30 — more subtle)
- `"fade-in"` (opacity only, no movement — for text blocks)
- `"scale-in"` (opacity + scale from 0.96 to 1.0 — for cards)
- `"slide-left"` (opacity + x: -20 to 0 — for left-aligned content)
- `"slide-right"` (opacity + x: 20 to 0 — for right-aligned content)

Also add `ease` prop: default `[0.25, 0.1, 0.25, 1]` (custom cubic-bezier that feels more polished than `"easeOut"`).

Duration: 0.6 → 0.7s (slightly slower = more premium).

**Verification:** Different sections use different variants, creating visual variety.

---

### Task 7: UI Primitive — MetricBlock Overhaul

**Files:**
- Modify: `src/components/ui/MetricBlock.tsx`

**Current:** Plain white bold text, tiny muted label. No visual impact.

**Changes:**
1. **Value**: `text-3xl font-bold text-white` → `text-4xl md:text-5xl font-bold text-gradient-accent` (gradient text, larger)
2. **Label**: `text-xs text-[#475569]` → `text-xs tracking-[0.15em] uppercase text-white/30 font-mono`
3. **Add top accent line**: 2px wide, 24px tall, `bg-accent/20` above the value
4. **Layout**: Center-align with more vertical spacing

**Verification:** MetricsBar on homepage has visual punch and looks like a data dashboard.

---

### Task 8: Homepage — Hero Section Overhaul

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Current problems:**
- Flat cyan dots with no glow/depth
- Plain white headline — no gradient, no impact
- Same fade-up as everything else
- Basic buttons
- Generic background

**Overhaul strategy (inspired by Anduril hero + Shield AI photography-first):**

1. **Background**: Replace dots/lines system entirely with:
   - `bg-grid-pattern` (subtle dot grid)
   - Large radial gradient spotlight from center: `radial-gradient(ellipse at 50% 40%, rgba(0,212,255,0.05) 0%, transparent 60%)`
   - This creates depth without looking fake

2. **Headline**:
   - `text-5xl md:text-6xl lg:text-7xl` (bigger)
   - `font-bold tracking-tight` (Anduril tight tracking on headlines)
   - "Persistent visibility" in white, "into low-altitude airspace" in `text-white/60` (Anduril opacity split)
   - OR: gradient text on the key phrase

3. **Subheadline**:
   - `text-lg md:text-xl text-white/50` (Anduril 50% opacity for body)
   - Max-width constraint, elegant line length

4. **Section label**: Use the new overem-dash style SectionLabel

5. **CTAs**:
   - Primary: "Launch Platform" with new accent variant (cyan bg, dark text, glow)
   - Secondary: "Explore Platform" with new secondary variant

6. **Entrance animation**:
   - Staggered: label → headline → paragraph → buttons, each 0.15s apart
   - `ease: [0.33, 1, 0.68, 1]` (custom spring-like ease)
   - Headline uses `scale-in` variant for subtle zoom

7. **Bottom transition**: Replace hard gradient with longer `h-48 bg-gradient-to-b from-transparent via-black/50 to-black`

8. **Remove**: All sensorNodes and connectingLines arrays — they look fake. The grid pattern + radial spotlight + typography is enough.

**Verification:** Hero looks dramatic, restrained, high-contrast. No more pulsing dots.

---

### Task 9: Homepage — MetricsBar Overhaul

**Files:**
- Modify: `src/components/sections/MetricsBar.tsx`

**Changes:**
1. Upgrade to use new MetricBlock component
2. Add subtle `bg-surface-1` background (not pure black — creates section separation)
3. Add vertical dividers between metrics (visible `w-px h-12 bg-white/10` separators)
4. More padding: `py-12` → `py-16`

**Verification:** Metrics feel like a data dashboard strip.

---

### Task 10: Homepage — PlatformPreview Overhaul

**Files:**
- Modify: `src/components/sections/PlatformPreview.tsx`

**Current:** Fake-looking flat mock with basic pulsing dots.

**Strategy:** Make it look more like the actual dashboard. Instead of a simulated map, create a more abstract but sophisticated data visualization aesthetic:

1. **Mock window chrome**: Better top bar with three colored dots (close/min/max), proper title text, connection indicator with glow
2. **Background**: Replace flat gradient with layered effect:
   - Dark base
   - Grid pattern overlay (suggests a map coordinate system)
   - Scan line animation sweeping vertically
   - Radial gradient from center (spotlight)
3. **Detection dots**: Replace pulsing dots with expanding ring animations (drone-ping from globals.css) with proper glow shadows
4. **Sidebar**: Add more realistic-looking data rows with labels and values
5. **Overall container**: `rounded-xl border-white/[0.08]` with glow shadow on the entire card
6. **Add**: Subtle shimmer effect on the container border

**Verification:** Platform mock looks sophisticated rather than placeholder-ish.

---

### Task 11: Homepage — Pipeline Section Overhaul

**Files:**
- Modify: `src/components/sections/Pipeline.tsx`

**Current:** Connecting line is 1px barely visible. Steps have same Card styling as everything.

**Changes:**

1. **Connecting line**: Upgrade from `h-px bg-[#00d4ff]/20` to:
   - Gradient line: `bg-gradient-to-r from-transparent via-accent/30 to-transparent`
   - Width animated with shimmer (light traveling along the line)
   - 2px height

2. **Step numbers**: Add glowing ring:
   - `w-10 h-10 rounded-full border border-accent/30` with inner number
   - Glow shadow: `shadow-[0_0_12px_rgba(0,212,255,0.2)]`
   - Positioned above the card, centered

3. **Step cards**: Use highlight variant with accent top border

4. **Animation**: Each step uses `scale-in` variant instead of `fade-up` (variety)

5. **Section heading**: Apply gradient text to headline

**Verification:** Pipeline section reads left-to-right with clear visual flow.

---

### Task 12: Homepage — ScoutShowcase Image Treatment

**Files:**
- Modify: `src/components/sections/ScoutShowcase.tsx`

**Changes:**
1. **Image container**: Add glow ring — `shadow-[0_0_40px_rgba(0,212,255,0.08)]` on the border
2. **Background**: Add subtle gradient behind image (`radial-gradient` spotlight)
3. **Feature bullets**: Replace plain cyan dots with small accent squares or dashes (more military)
4. **Link**: Style as proper "secondary" button instead of text link

**Verification:** Scout section feels like a product showcase, not a placeholder.

---

### Task 13: Homepage — IndustryCards as Bento Grid

**Files:**
- Modify: `src/components/sections/IndustryCards.tsx`

**Current:** 5 equal-width cards in a row. Generic, no hierarchy.

**Change to Palantir-style bento grid:**
- First 2 cards (Defense, Law Enforcement): `col-span-1 row-span-2` — tall cards with more content, icon larger
- Next 3 cards: standard 1×1 size
- Grid: `grid-cols-1 md:grid-cols-3` with first 2 spanning full height
- Large cards get: larger icon (w-10 h-10), full description, accent top border
- Small cards: compact, just icon + title + link

This creates the asymmetric-but-balanced bento layout.

**Verification:** Industry section has visual hierarchy with varied card sizes.

---

### Task 14: Homepage — SocialProof + CTA Overhaul

**Files:**
- Modify: `src/components/sections/SocialProof.tsx`
- Modify: `src/components/sections/CTASection.tsx`

**SocialProof changes:**
1. Badges: Currently plain text. Change to pill-style: `border border-white/10 rounded-full px-4 py-1.5 text-white/40 text-xs tracking-wider`
2. Add subtle hover: `hover:border-white/20 hover:text-white/60 transition-all`

**CTASection changes:**
1. Add radial gradient background spotlight behind the text
2. Headline: gradient text
3. Add top border: `border-t border-white/[0.06]` for section separation
4. Better spacing: `py-32` instead of `py-24`

**Verification:** Bottom of homepage feels like a strong, intentional close.

---

### Task 15: Layout — Navbar Glass Effect & Footer Polish

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Navbar changes:**
1. Background: `bg-black/80 backdrop-blur-md` → `bg-black/60 backdrop-blur-xl` (more glass)
2. Bottom border: `border-white/[0.06]` (Anduril opacity model)
3. CTA button: Use accent variant (cyan bg, dark text) instead of white border
4. Nav links: `text-white/50 hover:text-white` (Anduril 50% → 100% opacity pattern)
5. Dropdown: Better shadow, `bg-[#060609]/95 backdrop-blur-xl`, more visible border

**Footer changes:**
1. Background: subtle `bg-[#030305]` (not pure black — micro-contrast)
2. Links: `text-white/40 hover:text-white/70` (Anduril opacity model)
3. Section titles: `text-white/25 tracking-[0.15em]` (very restrained)
4. More top padding

**Verification:** Navbar feels glassy and premium, footer is restrained.

---

### Task 16: Inner Pages — Platform, Hardware, About, Contact, Verticals Polish

**Files:**
- Modify: `src/app/(marketing)/platform/page.tsx`
- Modify: `src/app/(marketing)/hardware/page.tsx`
- Modify: `src/app/(marketing)/about/story/page.tsx`
- Modify: `src/app/(marketing)/contact/page.tsx`
- Modify: `src/components/verticals/VerticalTemplate.tsx`

**Global changes to all inner pages:**
- All hardcoded `text-[#94a3b8]` → `text-white/50` or `text-white/60` (Anduril opacity model)
- All hardcoded `text-[#475569]` → `text-white/30`
- All hardcoded `text-[#00d4ff]` → `text-accent` (use Tailwind token)
- All hardcoded `bg-[#0a0a0f]` → `bg-surface-2` (use Tailwind token)
- All hardcoded `border-[#1a1a2e]` → `border-white/[0.06]` (Anduril model)
- All section headings: add `tracking-tight` for Anduril feel
- Replace stale `AnimatedSection` calls with varied `variant` props

**Platform page specific:**
- Platform mock: Apply same improvements as Task 10
- Transformation cards: Add arrow animation between before/after
- Capabilities grid: Use `scale-in` animation variant

**Hardware page specific:**
- Product image containers: Add glow shadow
- Comparison table: Better row hover (`bg-white/[0.02]`), header bg `bg-white/[0.03]`
- Spec table: Monospace values with `font-mono text-accent`

**About/Story page specific:**
- Timeline: Glow on the dot markers, accent line instead of plain border
- Blockquote: More impactful — larger text, gradient left border
- Founder cards: Initials circle with glow ring

**Contact page specific:**
- Form inputs: Better focus ring with accent glow
- Process steps: Number circles with subtle glow
- Clean up overall layout

**VerticalTemplate specific:**
- Problem card: Red accent glow on border
- Solution card: Accent left border with glow
- Use varied animation variants across sections

**Verification:** `npx next build` passes clean. All pages consistent with new design system.

---

### Task 17: Final Build Check & Single Commit

**Steps:**
1. Run `npx next build` — must pass with zero errors
2. Run `npx next lint` — fix any new warnings
3. Visual spot-check on dev server: homepage, platform, hardware, about, one vertical
4. Create single comprehensive commit with all changes

**Verification:** Clean build, all routes render.

---

## Execution Notes

- **No new dependencies** — everything is achievable with Tailwind + Framer Motion + CSS
- **One commit at end** — per user preference
- **No TDD** — this is a visual overhaul, not a feature with testable logic
- **Priority order**: Tasks 1-2 (foundation) → 3-7 (primitives) → 8-14 (homepage sections) → 15-16 (layout + inner pages) → 17 (final check)
- **Anduril opacity model** is the single most impactful change — replacing 6+ hardcoded grays with `white/XX` creates instant cohesion
