# Subpage Spacing & Visual Separation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix spacing and visual separation on Industries, Hardware, About/Story, and Platform subpages so sections feel intentionally spaced rather than lost in darkness.

**Architecture:** Create a reusable SectionDivider component (gradient horizontal line), bump gray-950 for better alternating-section contrast, widen content containers on all subpage heroes and key sections. No content or structural changes.

**Tech Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS 3.4

---

### Task 1: Create SectionDivider Component

**Files:**
- Create: `src/components/ui/SectionDivider.tsx`

**Step 1: Create the component**

```tsx
export function SectionDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
  );
}
```

**Step 2: Verify it builds**

Run: `npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/ui/SectionDivider.tsx
git commit -m "feat: add SectionDivider gradient divider component"
```

---

### Task 2: Bump gray-950 for Better Background Contrast

**Files:**
- Modify: `tailwind.config.ts:12`

**Step 1: Change gray-950 color**

In `tailwind.config.ts`, change:
```
950: "#0a0a0f",
```
to:
```
950: "#0d0d14",
```

**Step 2: Verify it builds**

Run: `npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "fix: bump gray-950 to #0d0d14 for visible section alternation"
```

---

### Task 3: Fix VerticalTemplate (affects 5 industry pages)

**Files:**
- Modify: `src/components/verticals/VerticalTemplate.tsx`

**Step 1: Add SectionDivider import at top**

Add to the existing imports:
```tsx
import { SectionDivider } from "@/components/ui/SectionDivider";
```

**Step 2: Widen the hero section**

Change line 68:
```tsx
<div className="section-container max-w-4xl">
```
to:
```tsx
<div className="section-container">
```

Change line 74 (paragraph):
```tsx
<p className="mt-4 text-lg text-gray-400 max-w-xl leading-relaxed">
```
to:
```tsx
<p className="mt-4 text-lg text-gray-400 max-w-2xl leading-relaxed">
```

**Step 3: Widen the Challenge/Solution section**

Change line 101:
```tsx
<div className="section-container max-w-4xl py-20">
```
to:
```tsx
<div className="section-container py-20">
```

**Step 4: Add SectionDividers between sections**

Add `<SectionDivider />` before the Challenge/Solution section (before line 100):
```tsx
      <SectionDivider />

      {/* Challenge / Solution */}
      <section className="bg-gray-950">
```

Add `<SectionDivider />` before the Capabilities section (before line 129):
```tsx
      <SectionDivider />

      {/* Capabilities */}
      <section className="py-20">
```

Add `<SectionDivider />` before the Deployments section (before line 162):
```tsx
      {vertical.deployments && vertical.deployments.length > 0 && (
        <>
          <SectionDivider />
          <section className="py-20 bg-gray-950">
```

And close the fragment after the section's closing `</section>`:
```tsx
          </section>
        </>
      )}
```

Add `<SectionDivider />` before the CTA section (before line 190):
```tsx
      <SectionDivider />

      <CTASection
```

**Step 5: Verify it builds**

Run: `npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add src/components/verticals/VerticalTemplate.tsx
git commit -m "fix: widen verticals layout + add section dividers"
```

---

### Task 4: Fix Hardware Page

**Files:**
- Modify: `src/app/(marketing)/hardware/page.tsx`

**Step 1: Add SectionDivider import**

Add to existing imports:
```tsx
import { SectionDivider } from "@/components/ui/SectionDivider";
```

**Step 2: Widen the hero**

Change line 34:
```tsx
<div className="section-container max-w-4xl">
```
to:
```tsx
<div className="section-container">
```

Change line 42 (paragraph):
```tsx
<p className="text-lg text-gray-400 mt-4 max-w-xl leading-relaxed">
```
to:
```tsx
<p className="text-lg text-gray-400 mt-4 max-w-2xl leading-relaxed">
```

**Step 3: Add SectionDividers between all sections**

Add before Scout section (before line 53):
```tsx
      <SectionDivider />

      {/* Scout Section */}
```

Add before Full Spectrum section (before line 113):
```tsx
      <SectionDivider />

      {/* Full Spectrum Section */}
```

Add before Design Philosophy section (before line 163):
```tsx
      <SectionDivider />

      {/* Design Philosophy */}
```

Add before Comparison section (before line 192):
```tsx
      <SectionDivider />

      {/* Comparison */}
```

Add before CTA (before line 225):
```tsx
      <SectionDivider />

      <CTASection
```

**Step 4: Verify it builds**

Run: `npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/app/(marketing)/hardware/page.tsx
git commit -m "fix: widen hardware hero + add section dividers"
```

---

### Task 5: Fix About/Story Page

**Files:**
- Modify: `src/app/(marketing)/about/story/page.tsx`

**Step 1: Add SectionDivider import**

Add to existing imports:
```tsx
import { SectionDivider } from "@/components/ui/SectionDivider";
```

**Step 2: Widen the hero**

Change line 37:
```tsx
<div className="section-container max-w-4xl">
```
to:
```tsx
<div className="section-container">
```

Change line 45 (paragraph):
```tsx
<p className="text-lg text-gray-400 mt-4 max-w-xl leading-relaxed">
```
to:
```tsx
<p className="text-lg text-gray-400 mt-4 max-w-2xl leading-relaxed">
```

**Step 3: Widen the timeline container**

Change line 56:
```tsx
<div className="section-container max-w-3xl">
```
to:
```tsx
<div className="section-container max-w-4xl">
```

**Step 4: Add SectionDividers between all sections**

Add before Timeline section (before line 55):
```tsx
      <SectionDivider />

      {/* Timeline */}
```

Add before Blockquote section (before line 62):
```tsx
      <SectionDivider />

      {/* Blockquote */}
```

Add before Team section (before line 74):
```tsx
      <SectionDivider />

      {/* Team */}
```

Add before Investors section (before line 99):
```tsx
      <SectionDivider />

      {/* Investors */}
```

Add before CTA (before line 120):
```tsx
      <SectionDivider />

      <CTASection
```

**Step 5: Verify it builds**

Run: `npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add src/app/(marketing)/about/story/page.tsx
git commit -m "fix: widen story layout + add section dividers"
```

---

### Task 6: Fix Platform Page (hero only)

**Files:**
- Modify: `src/app/(marketing)/platform/page.tsx`

**Step 1: Add SectionDivider import**

Add to existing imports:
```tsx
import { SectionDivider } from "@/components/ui/SectionDivider";
```

**Step 2: Widen the hero**

Change line 40:
```tsx
<div className="section-container max-w-4xl">
```
to:
```tsx
<div className="section-container">
```

Change line 48 (paragraph):
```tsx
<p className="text-lg text-gray-400 mt-4 max-w-xl leading-relaxed">
```
to:
```tsx
<p className="text-lg text-gray-400 mt-4 max-w-2xl leading-relaxed">
```

**Step 3: Add SectionDividers between sections for consistency**

Add before Transformation section (before line 59):
```tsx
      <SectionDivider />

      {/* Transformation */}
```

Add before Capabilities section (before line 88):
```tsx
      <SectionDivider />

      {/* Capabilities */}
```

Add before Architecture section (before line 117):
```tsx
      <SectionDivider />

      {/* Architecture */}
```

Add before CTA (before line 143):
```tsx
      <SectionDivider />

      <CTASection
```

**Step 4: Verify it builds**

Run: `npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/app/(marketing)/platform/page.tsx
git commit -m "fix: widen platform hero + add section dividers"
```

---

### Task 7: Final Verification

**Step 1: Full build check**

Run: `npx next build 2>&1 | tail -20`
Expected: All 15 routes build successfully, no errors

**Step 2: Visual spot-check**

Run: `npx next dev`

Check these pages in browser:
- `/verticals/critical-infrastructure` — hero wider, dividers between sections
- `/verticals/defense` — same treatment
- `/hardware` — hero wider, dividers between Scout/Full Spectrum/etc
- `/about/story` — hero wider, timeline wider, dividers between all sections
- `/platform` — hero wider, dividers between sections
- `/` — homepage unchanged (sanity check)

**Step 3: Final commit if any tweaks needed**
