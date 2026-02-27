# GuardianRF Landing Page Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 10-page marketing site for GuardianRF with an Anduril/Palantir-inspired defense-tech aesthetic, deployable on Vercel for a cold-email job application demo.

**Architecture:** Next.js 14 App Router with Tailwind CSS, Framer Motion for animations, Mapbox GL for the hero map. All content is static — no backend. Shared vertical template for 5 industry pages. Component-driven with reusable UI primitives.

**Tech Stack:** Next.js 14, Tailwind CSS v3, Framer Motion, Mapbox GL JS, Lucide React, Inter + JetBrains Mono fonts, Vercel deployment.

**Design Doc:** `docs/plans/2026-02-24-guardianrf-landing-page-design.md`
**Product Analysis:** `GUARDIANRF_PRODUCT_ANALYSIS.md`

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`
- Create: `src/styles/globals.css`
- Create: `.env.local`

**Step 1: Initialize Next.js project**

Run:
```bash
cd /Volumes/CS_Stuff/GuardianRFDemo
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Expected: Project scaffolded with `src/app/` structure.

**Step 2: Install dependencies**

Run:
```bash
npm install framer-motion lucide-react mapbox-gl
npm install -D @types/mapbox-gl
```

**Step 3: Create `.env.local`**

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token_here
```

Note: User will need to add their own Mapbox token from https://account.mapbox.com/

**Step 4: Verify dev server runs**

Run: `npm run dev`
Expected: App running on http://localhost:3000 with default Next.js page.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 14 project with Tailwind, Framer Motion, Mapbox"
```

---

## Task 2: Design System — Tailwind Config & Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/styles/globals.css`

**Step 1: Configure Tailwind with custom design tokens**

`tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#000000",
          surface: "#0a0a0f",
          "surface-hover": "#111118",
        },
        border: {
          DEFAULT: "#1a1a2e",
        },
        accent: {
          DEFAULT: "#00d4ff",
          dim: "#0891b2",
        },
        "text-primary": "#ffffff",
        "text-secondary": "#94a3b8",
        "text-tertiary": "#475569",
        danger: "#ff3b3b",
        warning: "#ffaa00",
        success: "#00ff88",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Set up global styles**

`src/styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@layer base {
  body {
    @apply bg-bg-primary text-text-primary font-sans antialiased;
  }

  ::selection {
    @apply bg-accent/20 text-white;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-bg-primary;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-border rounded-full;
  }
}

@layer components {
  .section-container {
    @apply max-w-7xl mx-auto px-6 lg:px-8;
  }

  .section-label {
    @apply text-sm font-medium uppercase tracking-wider text-accent;
  }

  .glow-accent {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.15);
  }

  .glow-accent-strong {
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.25);
  }

  .border-glow {
    @apply border-accent/50;
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.1);
  }
}
```

**Step 3: Verify styles apply**

Update `src/app/page.tsx` to a minimal test:
```tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="section-label mb-4">RADIOFREQUENCY DRONE INTELLIGENCE</p>
        <h1 className="text-5xl font-bold mb-4">Guardian RF</h1>
        <p className="text-text-secondary">Design system test</p>
      </div>
    </div>
  );
}
```

Run: `npm run dev`
Expected: Black background, white text, cyan label, Inter font.

**Step 4: Commit**

```bash
git add tailwind.config.ts src/styles/globals.css src/app/page.tsx
git commit -m "feat: configure design system with custom colors, typography, and utility classes"
```

---

## Task 3: UI Primitives — Button, Card, SectionLabel

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/SectionLabel.tsx`
- Create: `src/components/ui/AnimatedSection.tsx`

**Step 1: Create Button component**

`src/components/ui/Button.tsx`:
```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base = "inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "border border-border text-white hover:border-accent hover:text-accent",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === "primary" && <ArrowRight className="w-4 h-4" />}
    </Link>
  );
}
```

**Step 2: Create Card component**

`src/components/ui/Card.tsx`:
```tsx
type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-bg-surface border border-border rounded-lg p-6 transition-all duration-300 ${
        hover ? "hover:border-accent/50 hover:glow-accent hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 3: Create SectionLabel component**

`src/components/ui/SectionLabel.tsx`:
```tsx
type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return <p className={`section-label mb-4 ${className}`}>{children}</p>;
}
```

**Step 4: Create AnimatedSection wrapper (Framer Motion)**

`src/components/ui/AnimatedSection.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedSection({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI primitives — Button, Card, SectionLabel, AnimatedSection"
```

---

## Task 4: Layout — Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

**Step 1: Build Navbar with dropdowns**

`src/components/layout/Navbar.tsx`:
```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const industries = [
  { label: "Defense & National Security", href: "/verticals/defense" },
  { label: "Law Enforcement & Public Safety", href: "/verticals/law-enforcement" },
  { label: "Critical Infrastructure & Energy", href: "/verticals/critical-infrastructure" },
  { label: "Stadiums, Campuses & Events", href: "/verticals/venues" },
  { label: "Aviation & Emergency Response", href: "/verticals/aviation" },
];

const about = [
  { label: "The Guardian RF Story", href: "/about/story" },
];

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors">
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-bg-surface border border-border rounded-lg py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-bg-surface-hover transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border/50">
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-accent font-mono text-lg">⫸</span>
          <span className="text-white font-semibold text-sm tracking-wide">GUARDIAN RF</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-text-secondary hover:text-white transition-colors">Home</Link>
          <Dropdown label="Industries" items={industries} />
          <Link href="/platform" className="text-sm text-text-secondary hover:text-white transition-colors">Intelligence Platform</Link>
          <Link href="/hardware" className="text-sm text-text-secondary hover:text-white transition-colors">Hardware</Link>
          <Dropdown label="About" items={about} />
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-white text-white rounded-md hover:bg-white hover:text-black transition-all"
          >
            Request Demo
          </Link>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-bg-primary/95 backdrop-blur-md">
          <div className="section-container py-4 space-y-3">
            <Link href="/" className="block text-sm text-text-secondary py-2" onClick={() => setMobileOpen(false)}>Home</Link>
            <p className="text-xs text-text-tertiary uppercase tracking-wider pt-2">Industries</p>
            {industries.map((item) => (
              <Link key={item.href} href={item.href} className="block text-sm text-text-secondary py-1.5 pl-3" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/platform" className="block text-sm text-text-secondary py-2" onClick={() => setMobileOpen(false)}>Intelligence Platform</Link>
            <Link href="/hardware" className="block text-sm text-text-secondary py-2" onClick={() => setMobileOpen(false)}>Hardware</Link>
            <Link href="/about/story" className="block text-sm text-text-secondary py-2" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/contact" className="block text-sm text-accent py-2 font-medium" onClick={() => setMobileOpen(false)}>Request Demo</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar with dropdown menus and mobile responsive menu"
```

---

## Task 5: Layout — Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Step 1: Build Footer**

`src/components/layout/Footer.tsx`:
```tsx
import Link from "next/link";

const footerLinks = {
  Industries: [
    { label: "Defense & National Security", href: "/verticals/defense" },
    { label: "Law Enforcement", href: "/verticals/law-enforcement" },
    { label: "Critical Infrastructure", href: "/verticals/critical-infrastructure" },
    { label: "Stadiums & Events", href: "/verticals/venues" },
    { label: "Aviation & Emergency", href: "/verticals/aviation" },
  ],
  Solutions: [
    { label: "Intelligence Platform", href: "/platform" },
    { label: "Scout Sensor", href: "/hardware#scout" },
    { label: "Full Spectrum", href: "/hardware#full-spectrum" },
  ],
  Company: [
    { label: "Our Story", href: "/about/story" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "https://www.ycombinator.com/companies/guardian-rf/jobs" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-bg-primary">
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-accent font-mono text-lg">⫸</span>
              <span className="text-white font-semibold text-sm tracking-wide">GUARDIAN RF</span>
            </div>
            <p className="text-text-tertiary text-sm">
              Persistent visibility into low-altitude airspace.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-tertiary text-xs">&copy; 2026 Guardian RF Corporation</p>
          <Link
            href="https://www.linkedin.com/company/guardian-rf"
            target="_blank"
            className="text-text-tertiary text-xs hover:text-white transition-colors"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Wire Navbar + Footer into root layout**

`src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Guardian RF — Persistent Airspace Intelligence",
  description: "Radiofrequency drone intelligence for low-altitude airspace monitoring.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 3: Verify layout renders**

Run: `npm run dev`
Expected: Navbar at top (fixed, blurred), footer at bottom, test content in middle.

**Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx src/app/layout.tsx
git commit -m "feat: add Footer and wire layout shell with Navbar + Footer"
```

---

## Task 6: Static Data Files

**Files:**
- Create: `src/lib/data/verticals.ts`
- Create: `src/lib/data/capabilities.ts`
- Create: `src/lib/data/hardware.ts`

**Step 1: Create verticals data**

`src/lib/data/verticals.ts` — contains all 5 industry verticals with: slug, title, icon name, description, problem, solution, capabilities array, and deployments array. Pull all content from `GUARDIANRF_PRODUCT_ANALYSIS.md` sections 6A-6E.

Each vertical object shape:
```ts
export type Vertical = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string; // lucide icon name
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  capabilities: { title: string; description: string }[];
  deployments?: { name: string; description: string }[];
};

export const verticals: Vertical[] = [
  {
    slug: "defense",
    title: "Defense & National Security",
    shortTitle: "Defense",
    icon: "Shield",
    tagline: "Protect installations and force projection assets with persistent, passive RF sensing.",
    description: "...",
    problem: "Persistent low-altitude incursions from inexpensive and adaptable drones...",
    solution: "Continuous, passive RF sensing that provides attribution without revealing posture.",
    capabilities: [
      { title: "Persistent Passive Monitoring", description: "..." },
      { title: "Operator Geolocation & Attribution", description: "..." },
      { title: "Cross-Installation Correlation", description: "..." },
      { title: "Command System Integration", description: "..." },
      { title: "Pattern Analysis", description: "..." },
      { title: "Field-Ready Hardware", description: "..." },
    ],
    deployments: [
      { name: "Vandenberg Space Force Base", description: "Active Phase II SBIR, persistent passive RF monitoring of launch and airfield operations." },
      { name: "DIU C-UAS Challenge Winner", description: "Only downselected solution based exclusively on passive RF sensing." },
      { name: "Constellis Training Facility", description: "3,700-acre NC site, live-fire range airspace awareness." },
    ],
  },
  // ... remaining 4 verticals with full content from analysis
];
```

Fill all 5 verticals using exact copy from the product analysis. The implementer should reference `GUARDIANRF_PRODUCT_ANALYSIS.md` sections 6A–6E for the full text.

**Step 2: Create capabilities data**

`src/lib/data/capabilities.ts`:
```ts
export type Capability = {
  title: string;
  description: string;
  icon: string;
};

export const capabilities: Capability[] = [
  {
    title: "Multi-Site Visibility",
    description: "Unified views across facilities, jurisdictions, and regions, supporting coordinated awareness across distributed environments.",
    icon: "Globe",
  },
  {
    title: "Longitudinal Intelligence",
    description: "Retention of detections over time to establish baselines, identify repetition, and support post-event analysis.",
    icon: "TrendingUp",
  },
  {
    title: "Operator Attribution",
    description: "Geolocation and signal fingerprinting to support investigative follow-up and accountability.",
    icon: "Crosshair",
  },
  {
    title: "Pattern Recognition",
    description: "Cross-site correlation to surface shared tactics, anomalous behavior, and recurring activity.",
    icon: "Brain",
  },
  {
    title: "Secure Architecture",
    description: "Designed for government and critical infrastructure with controlled access, auditability, and data governance.",
    icon: "Lock",
  },
  {
    title: "Open Integration",
    description: "Standardized outputs integrate with existing security, aviation, and reporting workflows.",
    icon: "Plug",
  },
];
```

**Step 3: Create hardware data**

`src/lib/data/hardware.ts`:
```ts
export const scoutSpecs = [
  { label: "Power Draw", value: "10W average" },
  { label: "Connectivity", value: "LTE + LEO satellite" },
  { label: "Setup Time", value: "~60 seconds" },
  { label: "Operation", value: "Persistent, unattended" },
  { label: "Processing", value: "Edge (at sensor)" },
  { label: "Networking", value: "Self-contained" },
];

export const scoutFeatures = [
  "Low SWaP-C for broad deployment",
  "Passive RF collection with no emissions",
  "Real-time data to the intelligence platform",
  "Attritable design for persistent presence",
];

export const scoutMountings = [
  { name: "Tripod", description: "Standard rapid deployment configuration" },
  { name: "Pole Mount", description: "Range extender for extended coverage" },
  { name: "Field Mount", description: "Complete field deployment configuration" },
];

export const fullSpectrumCapabilities = [
  "Signal fingerprinting",
  "Attribution analysis",
  "Pattern-of-life analysis",
  "Wideband SDR RF capture",
  "Analog FPV drone detection",
  "Homebuilt/modified drone detection",
];
```

**Step 4: Commit**

```bash
git add src/lib/data/
git commit -m "feat: add static data files for verticals, capabilities, and hardware"
```

---

## Task 7: Homepage — Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build Hero with animated background**

`src/components/sections/Hero.tsx` — Full-viewport hero with:
- Pure black background with animated pulsing cyan dots (CSS-only, positioned absolutely)
- Section label: "RADIOFREQUENCY DRONE INTELLIGENCE"
- H1: "Persistent visibility into low-altitude airspace"
- Body paragraph (same copy as GuardianRF)
- Two CTA buttons: primary "Request a Demo" + secondary "Explore the Platform"
- Framer Motion fade-in on mount

The animated dots should be 6-8 small cyan circles (`bg-accent`) with `animate-pulse-slow` at different positions and delays, creating a sensor-network feel without requiring Mapbox (keeping the hero lightweight).

**Step 2: Wire into homepage**

Replace `src/app/page.tsx` content with:
```tsx
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return <Hero />;
}
```

**Step 3: Verify hero renders fullscreen**

Run: `npm run dev`
Expected: Full-viewport hero with animated dots, correct typography, buttons working.

**Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section with animated sensor dots and CTAs"
```

---

## Task 8: Homepage — Metrics Bar

**Files:**
- Create: `src/components/sections/MetricsBar.tsx`
- Create: `src/components/ui/MetricBlock.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build MetricBlock with count-up animation**

`src/components/ui/MetricBlock.tsx` — "use client" component that:
- Takes `value` (string like "24/7") and `label` (string)
- Uses `whileInView` from Framer Motion to trigger
- For numeric values, animates count-up; for text values ("24/7", "Rapid"), just fades in
- Large bold value on top, small uppercase label below

**Step 2: Build MetricsBar**

`src/components/sections/MetricsBar.tsx` — 4-column grid of MetricBlocks:
- 24/7 / PERSISTENT MONITORING
- Rapid / DEPLOYMENT
- Multi-Site / INTELLIGENCE
- Passive / RF DETECTION

Separated from hero by a thin border line (border-t border-border/50).

**Step 3: Add to homepage**

```tsx
import { Hero } from "@/components/sections/Hero";
import { MetricsBar } from "@/components/sections/MetricsBar";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsBar />
    </>
  );
}
```

**Step 4: Commit**

```bash
git add src/components/ui/MetricBlock.tsx src/components/sections/MetricsBar.tsx src/app/page.tsx
git commit -m "feat: add MetricsBar with animated metric blocks"
```

---

## Task 9: Homepage — Platform Preview Section

**Files:**
- Create: `src/components/sections/PlatformPreview.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build PlatformPreview**

`src/components/sections/PlatformPreview.tsx` — Split layout section:
- Left side: SectionLabel "SHARED INTELLIGENCE LAYER" + H2 "The data layer for low-altitude airspace" + body paragraph + CTA link to /platform
- Right side: A stylized mock of the platform interface — a dark card with a gradient map background, some fake drone dots, and a "Manage Geofences" sidebar overlay. This should be a pure CSS/HTML mock (no actual Mapbox), giving the impression of the platform. Use absolute-positioned elements inside a rounded card with `bg-bg-surface` and `overflow-hidden`.
- AnimatedSection wrapper for scroll reveal

**Step 2: Add to homepage**

**Step 3: Commit**

```bash
git add src/components/sections/PlatformPreview.tsx src/app/page.tsx
git commit -m "feat: add PlatformPreview section with mock platform UI"
```

---

## Task 10: Homepage — How It Works Pipeline

**Files:**
- Create: `src/components/sections/Pipeline.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build Pipeline**

`src/components/sections/Pipeline.tsx` — 3-stage horizontal pipeline:
- Section label: "HOW IT WORKS"
- H2: "From sensing to understanding"
- 3 cards in a row connected by a horizontal line (thin border or SVG)
- Each card: step number (01/02/03), icon from Lucide, title, description
- Staggered scroll-reveal: each card appears 0.2s after the previous
- Icons: Radio (Detection), Building (Correlation), Database (Intelligence)

The connecting line can be a `before` pseudo-element or a simple `<div>` with `border-t border-accent/30` running behind the cards.

**Step 2: Add to homepage**

**Step 3: Commit**

```bash
git add src/components/sections/Pipeline.tsx src/app/page.tsx
git commit -m "feat: add How It Works pipeline section with staggered reveal"
```

---

## Task 11: Homepage — Scout Showcase

**Files:**
- Create: `src/components/sections/ScoutShowcase.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build ScoutShowcase**

`src/components/sections/ScoutShowcase.tsx` — Split layout (reversed: image left, text right):
- Left: A dark card with a gradient/glow effect representing the Scout sensor. Since we don't have actual product images, create a stylized placeholder — a dark rectangle with the Guardian RF logo mark, subtle cyan glow around edges, and text "SCOUT" in monospace.
- Right: SectionLabel "INTRODUCING SCOUT" + H2 "The sensor that enables the network" + 4 bullet features (cyan dot + text) + CTA "View Hardware Solutions →"
- AnimatedSection wrapper

**Step 2: Add to homepage**

**Step 3: Commit**

```bash
git add src/components/sections/ScoutShowcase.tsx src/app/page.tsx
git commit -m "feat: add Scout sensor showcase section"
```

---

## Task 12: Homepage — Industry Cards

**Files:**
- Create: `src/components/sections/IndustryCards.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build IndustryCards**

`src/components/sections/IndustryCards.tsx`:
- Section label: "INDUSTRY SOLUTIONS"
- H2: "Purpose-built for your mission"
- 5 cards in a responsive grid (1 col mobile, 3 col tablet, 5 col desktop)
- Each card: Lucide icon + title + one-line description + "Learn more →" link
- Card uses the Card component with hover lift + glow
- Import vertical data from `src/lib/data/verticals.ts` for titles and taglines
- Icons: Shield (Defense), Users (Law Enforcement), Zap (Infrastructure), Building (Venues), Plane (Aviation)

**Step 2: Add to homepage**

**Step 3: Commit**

```bash
git add src/components/sections/IndustryCards.tsx src/app/page.tsx
git commit -m "feat: add Industry Solutions card grid"
```

---

## Task 13: Homepage — Social Proof + CTA + Assembly

**Files:**
- Create: `src/components/sections/SocialProof.tsx`
- Create: `src/components/sections/CTASection.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Build SocialProof**

`src/components/sections/SocialProof.tsx` — Horizontal bar of achievement badges:
- "Vandenberg SFB" | "DIU Challenge Winner" | "Forbes 30 Under 30" | "AFWERX Phase II" | "Constellis"
- Each as a subtle pill/badge with border, faded text that brightens slightly on hover
- Separated by thin vertical dividers
- AnimatedSection wrapper

**Step 2: Build CTASection**

`src/components/sections/CTASection.tsx` — Reusable final CTA:
- Takes `title`, `description`, `primaryHref`, `primaryLabel`, `secondaryHref?`, `secondaryLabel?`
- Centered text, two buttons
- Defaults: "Ready to see what's in your airspace?" + demo request

**Step 3: Assemble full homepage**

`src/app/page.tsx`:
```tsx
import { Hero } from "@/components/sections/Hero";
import { MetricsBar } from "@/components/sections/MetricsBar";
import { PlatformPreview } from "@/components/sections/PlatformPreview";
import { Pipeline } from "@/components/sections/Pipeline";
import { ScoutShowcase } from "@/components/sections/ScoutShowcase";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsBar />
      <PlatformPreview />
      <Pipeline />
      <ScoutShowcase />
      <IndustryCards />
      <SocialProof />
      <CTASection
        title="Ready to see what's in your airspace?"
        description="Schedule a demonstration to see how Guardian RF can provide persistent, attributable visibility into low-altitude activity around your sites."
        primaryHref="/contact"
        primaryLabel="Request a Demo"
        secondaryHref="/about/story"
        secondaryLabel="Learn About Guardian RF"
      />
    </>
  );
}
```

**Step 4: Full visual check**

Run: `npm run dev`
Expected: Complete homepage with all 8 sections, scroll animations, proper spacing.

**Step 5: Commit**

```bash
git add src/components/sections/SocialProof.tsx src/components/sections/CTASection.tsx src/app/page.tsx
git commit -m "feat: complete homepage with SocialProof, CTA, and full section assembly"
```

---

## Task 14: Intelligence Platform Page

**Files:**
- Create: `src/app/platform/page.tsx`

**Step 1: Build platform page**

`src/app/platform/page.tsx` — Full page with these sections:

1. **Hero**: SectionLabel "INTELLIGENCE PLATFORM" + H1 "The data layer for low-altitude airspace" + description paragraph
2. **Transformation grid**: 4-column layout showing "From Detections to Answers" — each column has a "before" (gray) → arrow → "after" (white/accent) pair
3. **6 Capability cards**: 2x3 grid using Card component. Import from `capabilities.ts`. Each card: Lucide icon + title + description.
4. **Platform visual**: Full-width dark mock (similar to PlatformPreview but larger — a wide card with fake map UI elements)
5. **Architecture section**: H2 "Built for Scale" + 4 horizontal pills (Cloud-native, On-premise, API-first, RBAC) each with short description below
6. **CTA**: Reuse CTASection — "See the platform in action"

All sections wrapped in AnimatedSection for scroll reveal.

**Step 2: Verify page**

Navigate to `/platform`. Expected: All sections render, nav link works.

**Step 3: Commit**

```bash
git add src/app/platform/page.tsx
git commit -m "feat: add Intelligence Platform page with capabilities and architecture"
```

---

## Task 15: Hardware Page

**Files:**
- Create: `src/app/hardware/page.tsx`

**Step 1: Build hardware page**

`src/app/hardware/page.tsx` — Full page with sections:

1. **Hero**: SectionLabel "HARDWARE" + H1 "Purpose-built sensing for persistent coverage"
2. **Scout section** (`id="scout"`): Split layout — left: stylized product placeholder (dark card with glow, "SCOUT" in mono, key spec badges), right: description + spec table (using data from `hardware.ts`) + feature bullet list + mounting config tabs (3 tabs that switch content — use client-side state)
3. **Full Spectrum section** (`id="full-spectrum"`): Split layout (reversed) — left: description + capabilities list from `hardware.ts`, right: stylized placeholder
4. **Comparison table**: 2-column table — Scout vs Full Spectrum — comparing target set, RF method, key use case, form factor
5. **CTA**: "Find the right configuration →" → /contact

**Step 2: Verify page**

Navigate to `/hardware`, `/hardware#scout`, `/hardware#full-spectrum`. Expected: Sections render, hash links scroll to correct positions.

**Step 3: Commit**

```bash
git add src/app/hardware/page.tsx
git commit -m "feat: add Hardware page with Scout specs, Full Spectrum, and comparison table"
```

---

## Task 16: Vertical Template Component

**Files:**
- Create: `src/components/verticals/VerticalTemplate.tsx`

**Step 1: Build shared vertical template**

`src/components/verticals/VerticalTemplate.tsx` — Reusable page template that takes a `Vertical` object and renders:

1. **Hero**: SectionLabel with vertical title category + H1 with vertical title + description
2. **Problem/Solution**: Two-column layout — left card "THE CHALLENGE" (dark bg, white text, problem statement), right card "THE SOLUTION" (accent border-left, solution statement)
3. **Capabilities**: Responsive grid (2 or 3 cols) of Card components, one per capability
4. **Deployments** (if present): Section with deployment spotlight cards showing name + description
5. **CTA**: "Schedule a Consultation →" + "View Hardware Solutions →"

All sections with AnimatedSection.

```tsx
import { Vertical } from "@/lib/data/verticals";
// ... component that receives { vertical: Vertical } as props
```

**Step 2: Commit**

```bash
git add src/components/verticals/VerticalTemplate.tsx
git commit -m "feat: add shared VerticalTemplate component for industry pages"
```

---

## Task 17: Five Industry Vertical Pages

**Files:**
- Create: `src/app/verticals/defense/page.tsx`
- Create: `src/app/verticals/law-enforcement/page.tsx`
- Create: `src/app/verticals/critical-infrastructure/page.tsx`
- Create: `src/app/verticals/venues/page.tsx`
- Create: `src/app/verticals/aviation/page.tsx`

**Step 1: Create all 5 vertical pages**

Each page follows the same pattern — import the vertical data by slug and pass to VerticalTemplate:

```tsx
// src/app/verticals/defense/page.tsx
import { verticals } from "@/lib/data/verticals";
import { VerticalTemplate } from "@/components/verticals/VerticalTemplate";

const vertical = verticals.find((v) => v.slug === "defense")!;

export const metadata = { title: `${vertical.title} — Guardian RF` };

export default function DefensePage() {
  return <VerticalTemplate vertical={vertical} />;
}
```

Repeat for all 5 slugs: `defense`, `law-enforcement`, `critical-infrastructure`, `venues`, `aviation`.

**Step 2: Verify all pages**

Navigate to each `/verticals/*` route. Expected: All render with correct industry content.

**Step 3: Commit**

```bash
git add src/app/verticals/
git commit -m "feat: add all 5 industry vertical pages using shared template"
```

---

## Task 18: About / Story Page

**Files:**
- Create: `src/app/about/story/page.tsx`

**Step 1: Build story page**

`src/app/about/story/page.tsx` — Full page:

1. **Hero**: SectionLabel "OUR STORY" + H1 "Built from the front lines"
2. **Origin timeline**: Vertical timeline layout (left border line with dots at each milestone):
   - Georgetown University — Physics & signal processing
   - Ukraine deployment — Signal intelligence & drone detection
   - Key insight — "Persistence > raw capability"
   - Guardian RF founded — Low-SWaP attritable RF sensing + intelligence
   - Y Combinator S24 — Accelerator backing
   - First deployments — Vandenberg, Constellis, CFP Championship
3. **Blockquote callout**: Large styled quote — "Persistence matters more than raw capability. Small, deployable sensors outperform sophisticated, slow systems."
4. **Team section**: 3-column grid — each co-founder: placeholder avatar (initials circle), name, title, brief description
   - Lucas Raskin — Co-Founder & CEO
   - Eli Kerstein — Co-Founder & CTO
   - John Andrzejewski — Co-Founder & COO
5. **Investors bar**: Logo placeholders for YC, Space Capital, Valor, D3VC, General Catalyst
6. **CTA**: CTASection — "Join the mission"

**Step 2: Verify page**

Navigate to `/about/story`. Expected: Full story page renders with timeline and team.

**Step 3: Commit**

```bash
git add src/app/about/story/page.tsx
git commit -m "feat: add About/Story page with origin timeline and team section"
```

---

## Task 19: Contact Page

**Files:**
- Create: `src/app/contact/page.tsx`

**Step 1: Build contact page**

`src/app/contact/page.tsx` — Split layout:

**Left side (form)**:
- H1: "Get in touch"
- Form fields (all UI-only, no submission handler):
  - Full Name (text input, required)
  - Work Email (email input, required)
  - Organization (text input, required)
  - Title (text input, optional)
  - Inquiry Type (select dropdown: Request a Demo, Sales Inquiry, Partnership, Media, Career, Other)
  - Industry (select dropdown: the 5 verticals + Other)
  - Message (textarea, optional)
  - Submit button: "Send Message →"
- Form styling: inputs with `bg-bg-surface border border-border rounded-md px-4 py-3 text-white focus:border-accent focus:outline-none`

**Right side (info)**:
- "What to expect" — 3-step mini-timeline:
  1. "We'll respond within 24 hours"
  2. "Schedule a platform walkthrough"
  3. "Discuss your specific requirements"
- Contact details: contact@guardianrf.com, (202) 937-9821
- Small note: "For career inquiries, visit our YC jobs page"

**Step 2: Verify page**

Navigate to `/contact`. Expected: Form renders, inputs are interactive (but don't submit).

**Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add Contact page with form and info panel"
```

---

## Task 20: Polish Pass — Animations, Spacing, Responsiveness

**Files:**
- Modify: Multiple component files as needed

**Step 1: Review all pages on mobile viewport**

Run: `npm run dev` and use browser devtools at 375px, 768px, 1024px, 1440px.

Fix any:
- Overflow issues
- Text size problems on mobile
- Grid layout breaks
- Spacing inconsistencies
- Navigation issues on mobile

**Step 2: Verify all page transitions**

Click through every nav link. Ensure:
- No layout shift
- Navbar stays fixed and blurred
- Footer is consistent
- No broken links

**Step 3: Add metadata to all pages**

Ensure every `page.tsx` exports a `metadata` object with appropriate `title` and `description`.

**Step 4: Commit**

```bash
git add -A
git commit -m "fix: polish pass — responsive fixes, spacing, metadata for all pages"
```

---

## Task 21: Build Check & Deployment Prep

**Files:**
- Possibly modify: `next.config.js`, various components

**Step 1: Run production build**

Run: `npm run build`
Expected: Clean build with no errors. Fix any TypeScript or build errors.

**Step 2: Run production server locally**

Run: `npm start`
Navigate all pages, verify everything works in production mode.

**Step 3: Verify .env.local has placeholder Mapbox token**

If the hero uses Mapbox, ensure it degrades gracefully without a token (fallback to CSS dots only).

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "chore: fix build errors and prepare for Vercel deployment"
```

---

## Task 22: Deploy to Vercel

**Step 1: Install Vercel CLI (if not already)**

Run: `npm install -g vercel`

**Step 2: Deploy**

Run: `vercel --prod`

Follow prompts to link project. Set environment variable `NEXT_PUBLIC_MAPBOX_TOKEN` in Vercel dashboard if using Mapbox.

**Step 3: Verify live URL**

Open the Vercel URL. Navigate all 10 pages. Verify:
- All pages load
- Animations work
- Mobile responsive
- No console errors

**Step 4: Final commit with deploy URL**

```bash
git add -A
git commit -m "chore: deploy to Vercel — site live"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Project scaffold | package.json, next.config |
| 2 | Design system | tailwind.config, globals.css |
| 3 | UI primitives | Button, Card, SectionLabel, AnimatedSection |
| 4 | Navbar | Navbar.tsx (dropdowns, mobile) |
| 5 | Footer + Layout | Footer.tsx, layout.tsx |
| 6 | Data files | verticals.ts, capabilities.ts, hardware.ts |
| 7 | Hero section | Hero.tsx |
| 8 | Metrics bar | MetricsBar.tsx, MetricBlock.tsx |
| 9 | Platform preview | PlatformPreview.tsx |
| 10 | Pipeline | Pipeline.tsx |
| 11 | Scout showcase | ScoutShowcase.tsx |
| 12 | Industry cards | IndustryCards.tsx |
| 13 | Social proof + CTA + homepage assembly | SocialProof.tsx, CTASection.tsx, page.tsx |
| 14 | Platform page | platform/page.tsx |
| 15 | Hardware page | hardware/page.tsx |
| 16 | Vertical template | VerticalTemplate.tsx |
| 17 | 5 vertical pages | verticals/*/page.tsx |
| 18 | About/Story page | about/story/page.tsx |
| 19 | Contact page | contact/page.tsx |
| 20 | Polish pass | Responsive fixes, animations, metadata |
| 21 | Build check | Production build, error fixes |
| 22 | Deploy | Vercel deployment |

**Total: 22 tasks. Estimated: ~40 component files across 10 pages.**
