# GuardianRF — UI Overhaul Prompt

You are a senior UI systems designer performing a comprehensive visual overhaul of a defense-tech marketing site + drone monitoring dashboard. The codebase is Next.js 14, React 18, TypeScript, Tailwind CSS 3.4, Framer Motion 12. Fonts: Inter (sans), JetBrains Mono (mono). Accent color: #00FF94. Dark theme throughout.

The site has 11 marketing pages (homepage, platform, hardware, contact, about/story, 5 verticals) and a Mapbox-based drone dashboard at /dashboard. The marketing pages are broken — they look empty, sparse, and amateurish. Fix them all.

---

## CURRENT ARCHITECTURE

```
src/app/page.tsx                         — Homepage (outside marketing group)
src/app/(marketing)/layout.tsx           — Shared Navbar + Footer wrapper
src/app/(marketing)/platform/page.tsx    — Platform page
src/app/(marketing)/hardware/page.tsx    — Hardware page (Scout + Full Spectrum sensors)
src/app/(marketing)/contact/page.tsx     — Contact form page
src/app/(marketing)/about/story/page.tsx — Story/founding page
src/app/(marketing)/verticals/[5 pages] — Use VerticalTemplate component
src/components/sections/Hero.tsx         — Homepage hero (min-h-screen, radar scope)
src/components/sections/PlatformPreview.tsx — Dashboard iframe embed
src/components/sections/Pipeline.tsx     — 3-step detection pipeline
src/components/sections/SocialProof.tsx  — Credentials grid
src/components/sections/CTASection.tsx   — Reusable CTA block
src/components/verticals/VerticalTemplate.tsx — Template for all 5 vertical pages
src/components/ui/Card.tsx               — Reusable card (bg-gray-950 border-gray-800)
src/components/ui/Button.tsx             — Primary (white bg) + ghost variants
src/components/ui/SectionLabel.tsx       — Uppercase mono label (accent or muted)
src/components/ui/AnimatedSection.tsx    — Framer Motion whileInView wrapper
src/components/ui/AnimatedBorder.tsx     — Subtle accent border wrapper
src/components/layout/Navbar.tsx         — Desktop dropdowns + mobile drawer
src/styles/globals.css                   — Base styles, section-container, scrollbar, focus rings
tailwind.config.ts                       — Gray scale, accent, dash tokens, animations
```

---

## WHAT'S BROKEN — FIX ALL OF THIS

### 1. SPACING IS INCONSISTENT ACROSS EVERY PAGE

There is no standardized section spacing. Every page uses different values:

| Page | Hero padding | Section padding | Gap spacing |
|------|-------------|-----------------|-------------|
| Homepage hero | `py-24` inside `min-h-screen` | `py-20` | `gap-5` to `gap-8` |
| Platform | `pt-12 pb-16` | `py-20` | `gap-5` |
| Hardware | `pt-20 pb-16` | `py-20` | `gap-10 lg:gap-12` |
| Contact | `pt-12 pb-20` | N/A (single section) | `gap-10 lg:gap-12` |
| Story | `pt-12 pb-16` | `py-20` | varies |
| Verticals (5) | `pt-20 pb-16` | `py-20` | `gap-5` |
| CTA | `py-16 md:py-24` | N/A | N/A |

**Fix**: Establish exactly 3 section padding tiers and apply consistently:
- **Hero** (subpages): `pt-20 pb-12` — enough room after navbar, flows into content
- **Standard section**: `py-20` — consistent rhythm
- **CTA**: `py-20` — match standard sections

All card grid gaps should be `gap-5` (current standard in most places).

### 2. TYPOGRAPHY HIERARCHY IS BROKEN

Heading sizes are inconsistent:

| Element | Homepage | Platform | Hardware | Story | Verticals | CTA |
|---------|----------|----------|----------|-------|-----------|-----|
| h1 | `text-5xl md:text-6xl lg:text-7xl` | `text-4xl md:text-5xl` | `text-4xl md:text-5xl` | `text-4xl md:text-5xl` | `text-4xl md:text-5xl` | N/A |
| h2 | N/A | `text-3xl md:text-4xl` | `text-3xl md:text-4xl` | N/A | N/A | `text-3xl md:text-4xl lg:text-[2.75rem]` |
| h3 | N/A | `text-lg` | `text-lg` | `text-lg` | `text-lg` | N/A |

**Fix**: Standardize to this scale (and never use arbitrary values like `text-[2.75rem]` or `text-[17px]`):
- **h1 (homepage only)**: `text-5xl md:text-6xl lg:text-7xl`
- **h1 (subpages)**: `text-4xl md:text-5xl`
- **h2**: `text-3xl md:text-4xl`
- **h3**: `text-xl` (card titles)
- **Body**: `text-base` or `text-lg` for hero descriptions
- **Labels**: `text-xs font-mono uppercase tracking-[0.15em]` (SectionLabel already does this)

Remove every instance of `lg:text-[2.75rem]` and `text-[17px]`.

### 3. CARD STYLING IS INCONSISTENT

Multiple card patterns exist with no clear system:

1. **`Card.tsx`**: `bg-gray-950 border-gray-800 p-6 md:p-8 hover:border-gray-700` — used on Platform, Pipeline
2. **Vertical deployment cards**: `bg-accent/[0.02] border-gray-800 border-l-2 border-l-accent/40 p-6` — custom one-off
3. **Contact steps**: No card wrapper, just flex layout
4. **SocialProof**: `bg-gray-950 px-5 py-5` inside a `gap-px bg-gray-800` grid (pixel-border trick)
5. **Investor badges**: `border-gray-800 rounded-full bg-gray-950` with hover shadow

**Fix**: Use `Card.tsx` everywhere cards appear. Remove one-off card patterns. The Card component should be the single source of truth. If a variant is needed (e.g., accent left border for deployments), add it as a Card prop, not inline styles.

### 4. HOVER STATES ARE INCONSISTENT

- `Card.tsx`: `hover:border-gray-700` (border lightens)
- Investor badges: `hover:border-accent/20 hover:shadow-[0_0_12px_rgba(0,255,148,0.06)]` (accent glow)
- Deployment cards: `hover:border-gray-700` (same as Card)
- Nav links: `hover:text-white` (color only)

**Fix**: Pick ONE hover pattern for cards and apply everywhere. Recommended: `hover:border-gray-700` (subtle, consistent). Save accent hover effects only for interactive CTAs and buttons.

### 5. ICON USAGE IS INCONSISTENT

- Platform capabilities: Icons at `w-5 h-5 text-accent/60 mb-4` (visible, spaced)
- Vertical capabilities: Icons at `w-4 h-4 text-accent/40` (smaller, fainter, no margin)
- Pipeline cards: No icons at all, uses step numbers

**Fix**: Standardize capability card icons to `w-5 h-5 text-accent/50 mb-3`. All capability grids should look the same whether they're on the Platform page or a Vertical page.

### 6. SectionLabel SPACING IS WRONG

`SectionLabel` has `mb-2`, but the h1/h2 after it has no top margin. This creates inconsistent visual distance between the label and heading depending on the heading's line-height.

**Fix**: Change SectionLabel to `mb-3` and ensure headings after it have no extra top margin.

### 7. NAVBAR PADDING DOESN'T ALIGN WITH CONTENT

Navbar inner container: `px-6` (no responsive)
Section container: `px-6 lg:px-8`

At `lg` breakpoint, navbar edges are 8px misaligned with page content.

**Fix**: Update Navbar inner container to `px-6 lg:px-8` to match `.section-container`.

### 8. CONTACT FORM HAS NO INLINE ERROR MESSAGES

Form validation only changes border color to red. No text tells the user what's wrong. This is bad UX.

**Fix**: Add inline error messages below each required field:
- "Full name is required"
- "Valid email is required"
- "Organization is required"

Use `text-xs text-danger mt-1` styling. Add `aria-invalid` and `aria-describedby` for accessibility.

### 9. FORM INPUT STYLING IS HARDCODED

The contact page defines `inputClasses` as an 180-char string with hardcoded colors, shadows, and spacing. This should be a reusable component.

**Fix**: Create `src/components/ui/FormInput.tsx` (and FormSelect, FormTextarea) that encapsulates this styling. The contact page should use these components instead of raw HTML.

### 10. ALTERNATING SECTION BACKGROUNDS ARE INCONSISTENT

The pattern should be: default (black) → gray-950 → default → gray-950. But several pages break this:

- Hardware: hero (default) → Scout (gray-950) → Full Spectrum (default) → Design Philosophy (gray-950) → Comparison (default) ✓
- Platform: hero (default) → Transformation (default) → Capabilities (gray-950) → Architecture (default) ✗ (two default in a row at top)
- Story: hero (default) → Timeline (gray-950) → Blockquote (default) → Team (gray-950) → Investors (default) ✓
- Verticals: hero (default) → Challenge/Solution (gray-950) → Capabilities (default) → Deployments (gray-950) ✓

**Fix**: Platform page's "Transformation" section should be `bg-gray-950` so the alternation works: default → gray-950 → default → gray-950.

### 11. CTA SECTION HEADING SIZE DOESN'T MATCH

CTASection uses `text-3xl md:text-4xl lg:text-[2.75rem]` — the arbitrary `lg:text-[2.75rem]` should be removed. Use `text-3xl md:text-4xl` to match h2 across the site.

### 12. AnimatedSection SHOULD EXPOSE VIEWPORT MARGIN AS PROP

Currently hardcoded to `margin: "0px 0px -15% 0px", amount: 0.05`. Some sections (especially above-the-fold content) should animate immediately, not wait for scroll.

**Fix**: Add an optional `immediate` prop that sets `initial` to the `whileInView` values (no animation, content visible immediately). Use this for hero sections and any content visible on page load.

### 13. MISSING `prefers-reduced-motion` COVERAGE

`globals.css` has reduced-motion handling for some animations but misses Framer Motion. AnimatedSection should respect `prefers-reduced-motion`.

**Fix**: In AnimatedSection, check `useReducedMotion()` from Framer Motion. If true, skip animation (set initial = whileInView).

### 14. BUTTON COMPONENT NEEDS A SECONDARY VARIANT

Currently only `primary` (white bg) and `ghost` (text link with arrow). There's no outlined/secondary button for less prominent CTAs.

**Fix**: Add a `secondary` variant: `border border-gray-700 text-white rounded-md px-6 py-3 text-sm hover:border-gray-500 transition-colors`.

### 15. HOMEPAGE SECTIONS NEED MORE VISUAL WEIGHT

The homepage flows: Hero → PlatformPreview → Pipeline → DeploymentsAndVerticals → SocialProof → CTA.

Currently:
- PlatformPreview section is just text + an iframe. The iframe takes time to load and shows a loading spinner.
- Pipeline is 3 small cards that look like an afterthought.
- SocialProof is a flat grid of text — no visual interest.

**Fix**:
- PlatformPreview: Add a subtle gradient border or glow around the iframe container. Make the loading state less jarring (fade in the iframe).
- Pipeline: Add step numbers that are more visually prominent (larger, accent-colored circle instead of just text).
- SocialProof: Add subtle icons or visual marks per credential. The "Vandenberg Space Force Base" should feel more impressive than a plain text cell.

### 16. FOOTER IS MISSING FROM AUDIT BUT SHOULD BE CONSISTENT

Ensure Footer uses `section-container` for alignment and matches the overall spacing system.

---

## DESIGN TOKENS TO ADD TO `tailwind.config.ts`

```ts
// Add to theme.extend:
spacing: {
  'section': '5rem',      // 80px — standard section py
  'section-sm': '3rem',   // 48px — compact sections
  'section-lg': '6rem',   // 96px — spacious sections
},
```

---

## EXECUTION ORDER

1. **tailwind.config.ts** — Add spacing tokens, remove arbitrary values
2. **globals.css** — Update section-container if needed
3. **AnimatedSection.tsx** — Add `immediate` prop, reduced-motion support
4. **SectionLabel.tsx** — Fix spacing (mb-2 → mb-3)
5. **Card.tsx** — Ensure it's the single card pattern
6. **Button.tsx** — Add `secondary` variant
7. **CTASection.tsx** — Fix heading size
8. **Navbar.tsx** — Fix px-6 → px-6 lg:px-8
9. **Hero.tsx** — No changes needed (homepage hero is fine)
10. **PlatformPreview.tsx** — Visual polish
11. **Pipeline.tsx** — Visual polish
12. **SocialProof.tsx** — Visual polish
13. **platform/page.tsx** — Fix bg alternation, heading sizes, icon sizes
14. **hardware/page.tsx** — Fix heading sizes, remove text-[17px]
15. **contact/page.tsx** — Add error messages, extract FormInput component
16. **about/story/page.tsx** — Fix hero padding to match system
17. **VerticalTemplate.tsx** — Fix icon sizes, heading sizes, card patterns
18. **All pages** — Verify section padding matches the 3-tier system

---

## RULES

- Do NOT touch the dashboard (/dashboard, DashboardView, DronePanel, GeofencePanel, TopBar, EventLog, or any hooks). The dashboard is separate and works correctly.
- Do NOT change the accent color (#00FF94), font choices (Inter/JetBrains Mono), or dark theme.
- Do NOT add new dependencies.
- Do NOT create documentation files.
- Do NOT change any data files in src/lib/data/ (verticals, hardware, capabilities, etc).
- Do NOT remove any existing pages or routes.
- Prefer editing existing files over creating new ones.
- Keep the defense-tech aesthetic — dark, minimal, technical, monospaced labels. Think Bloomberg terminal meets defense contractor.
- Every marketing page should feel complete above the fold — no blank voids, no invisible content.
- Build must pass: `npx next build` with zero errors.
