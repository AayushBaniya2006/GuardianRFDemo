# Subpage Spacing & Visual Separation — Design

**Date:** 2026-02-27
**Scope:** Industries (5 verticals), Hardware, About/Story, Platform (hero only)
**Problem:** Subpages feel simultaneously too close together and too spaced apart. Sections blend into one dark mass because `bg-black` vs `bg-gray-950` (#0a0a0f) is imperceptible. Content is too narrow (max-w-4xl heroes, max-w-xl paragraphs), leaving 60%+ of the viewport as dead space.

## Design Decisions

### 1. SectionDivider Component
A subtle gradient horizontal line placed between major sections:
```
<div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
```
Visually anchors the gap so padding feels intentional rather than empty.

### 2. Better Background Contrast
Bump `gray-950` from `#0a0a0f` to `#0d0d14` in tailwind.config.ts so alternating section backgrounds are actually distinguishable.

### 3. Wider Content Containers
- Heroes: Remove `max-w-4xl`, use full `section-container` (max-w-7xl)
- Paragraphs: Widen from `max-w-xl` to `max-w-2xl`
- Story timeline: Widen from `max-w-3xl` to `max-w-4xl`

### 4. No Content Changes
All text, data, and structure remain unchanged. This is purely a spacing and visual separation fix.

## Files Affected

| File | Changes |
|------|---------|
| `src/components/ui/SectionDivider.tsx` | **NEW** — reusable gradient divider |
| `tailwind.config.ts` | Bump gray-950 color |
| `src/components/verticals/VerticalTemplate.tsx` | Widen hero, widen challenge/solution, add dividers |
| `src/app/(marketing)/hardware/page.tsx` | Widen hero, add dividers between sections |
| `src/app/(marketing)/about/story/page.tsx` | Widen hero, widen timeline, add dividers |
| `src/app/(marketing)/platform/page.tsx` | Widen hero only (rest is fine) |

## Pages NOT Changed
- Homepage (`src/app/page.tsx`) — already has visual richness
- Contact page — already well-structured with 2-col layout
- Dashboard — separate concern
