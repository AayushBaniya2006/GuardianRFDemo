# GuardianRF Landing Page Redesign — Design Document

**Date:** 2026-02-24
**Purpose:** Cold-email demo for GuardianRF (YC S24) — full marketing site rebuild with Anduril/Palantir-inspired aesthetic to demonstrate frontend/UI engineering capability.
**Target Role:** Frontend/UI Software Engineering Intern + General SWE

---

## 1. Project Overview

Rebuild GuardianRF's entire marketing website (~10 pages) with a defense-tech aesthetic inspired by Anduril's minimal black UI and Palantir's information density. Same content structure, dramatically better visual execution.

### Goals
- Demonstrate ability to "transform complex RF and airspace data into clear, usable visualizations and workflows" (from job listing)
- Show understanding of their product, domain, and customers
- Deliver a deployable site that can be shared via URL in cold email

---

## 2. Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#000000` | Page backgrounds (pure black, Anduril-style) |
| `--bg-surface` | `#0a0a0f` | Card/panel backgrounds |
| `--bg-surface-hover` | `#111118` | Card hover states |
| `--border` | `#1a1a2e` | Borders, dividers (50% opacity) |
| `--accent` | `#00d4ff` | Primary accent — cyan (links, labels, glows) |
| `--accent-dim` | `#0891b2` | Dimmed accent for secondary elements |
| `--text-primary` | `#ffffff` | Headlines, primary text |
| `--text-secondary` | `#94a3b8` | Body text, descriptions |
| `--text-tertiary` | `#475569` | Metadata, timestamps |
| `--danger` | `#ff3b3b` | Non-compliant / threat indicators |
| `--warning` | `#ffaa00` | Unknown status |
| `--success` | `#00ff88` | Compliant / online |

### Typography
| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 (hero) | Inter | 700 | 4xl → 6xl responsive |
| H2 (section) | Inter | 700 | 3xl → 4xl responsive |
| H3 (card title) | Inter | 600 | xl |
| Body | Inter | 400 | base / lg |
| Label | Inter | 500 | sm, uppercase, tracking-wider |
| Mono data | JetBrains Mono | 400 | sm (specs, data) |

### Components
- **Cards**: `bg-surface`, `border` 1px, rounded-lg, hover → border-accent glow
- **Buttons**: Primary (white bg, black text), Secondary (bordered, transparent)
- **Section labels**: Uppercase, accent color, tracking-wider, text-sm
- **Feature pills**: Small rounded tags with icon + text
- **Stat blocks**: Large number + label below

### Animations (Framer Motion)
- Hero background: subtle pulsing dots on dark map/globe
- Scroll-triggered fade-up for sections
- Count-up animation on metrics bar
- Card hover: lift + border glow
- Pipeline section: sequential reveal left-to-right
- Page transitions: fade

---

## 3. Site Architecture

### Navigation
```
Header:
  Logo (⫸ GUARDIAN RF)
  Home
  Industries ▾ (dropdown → 5 verticals)
  Intelligence Platform
  Hardware
  About ▾ (dropdown → Story, Leadership, Partners, Press, News)
  [Request Demo →] (button)

Footer:
  4-column: Industries | Solutions | Company | Social
  Bottom: © 2026 Guardian RF Corporation
```

### Route Map
```
/                                    → Homepage
/platform                            → Intelligence Platform
/hardware                            → Hardware (Scout + Full Spectrum)
/verticals/defense                   → Defense & National Security
/verticals/law-enforcement           → Law Enforcement & Public Safety
/verticals/critical-infrastructure   → Critical Infrastructure & Energy
/verticals/venues                    → Stadiums, Campuses & Events
/verticals/aviation                  → Aviation & Emergency Response
/about/story                         → Company Story
/contact                             → Contact / Request Demo
```

10 pages total.

---

## 4. Page Designs

### 4.1 Homepage (/)

**Section 1: Hero (full viewport)**
- Background: animated dark map/globe with pulsing cyan sensor dots
- Section label: "RADIOFREQUENCY DRONE INTELLIGENCE"
- H1: "Persistent visibility into low-altitude airspace"
- Body: Same copy as theirs
- CTAs: [Request a Demo →] [Explore the Platform]

**Section 2: Metrics Bar**
- 4 columns, animated count-up on scroll
- 24/7 PERSISTENT MONITORING | Rapid DEPLOYMENT | Multi-Site INTELLIGENCE | Passive RF DETECTION

**Section 3: Shared Intelligence Layer**
- Split layout: text (left) + platform demo video/animation (right)
- Label: "SHARED INTELLIGENCE LAYER"
- H2: "The data layer for low-altitude airspace"
- Body: RF sensors → structured digital events → shared operational picture
- CTA: "Learn about the Intelligence Platform →"

**Section 4: How It Works Pipeline**
- 3 stages with connecting line, scroll-triggered sequential reveal
- 01 Detection → 02 Correlation → 03 Intelligence
- Each: icon, title, description

**Section 5: Scout Sensor**
- Split layout: product image with glow effect (left) + features (right)
- Label: "INTRODUCING SCOUT"
- H2: "The sensor that enables the network"
- 4 bullet features with cyan dots
- CTA: "View Hardware Solutions →"

**Section 6: Industry Solutions**
- Label: "INDUSTRY SOLUTIONS"
- H2: "Purpose-built for your mission"
- 5 cards in row: Defense, Law Enforcement, Infrastructure, Venues, Aviation
- Each: icon, title, one-line description, "Learn more →"
- Hover: lift + cyan border glow

**Section 7: Social Proof Bar (NEW — not on their current site)**
- Horizontal row of logos/badges:
- Vandenberg SFB | DIU Challenge Winner | Forbes 30 Under 30 | AFWERX Phase II | Constellis

**Section 8: Final CTA**
- H2: "Ready to see what's in your airspace?"
- Body: Schedule a demonstration...
- CTAs: [Request a Demo →] [Learn About Guardian RF]

**Section 9: Footer**

---

### 4.2 Intelligence Platform (/platform)

**Hero**: "The data layer for low-altitude airspace" + animated platform preview

**Transformation Section**: 4-column "From Detections to Answers"
- Discrete sightings → Patterns of activity
- Short-duration incidents → Documented events
- Local observations → Regional awareness
- Raw detections → Durable records

**6 Capability Cards** (2x3 grid, expandable on hover):
1. Multi-Site Visibility
2. Longitudinal Intelligence
3. Operator Attribution
4. Pattern Recognition
5. Secure Architecture
6. Open Integration

**Platform Visual**: Full-width screenshot/mock of the platform UI

**Architecture Section**: "Built for Scale"
- 4 architecture pills: Cloud-native | On-premise | API-first | RBAC

**CTA**: "See the platform in action"

---

### 4.3 Hardware (/hardware)

**Hero**: "Purpose-built sensing for persistent coverage"

**Scout Section** (#scout):
- Split: product image (left) | specs + features (right)
- Spec table: 10W power, LTE/LEO backhaul, 60s setup, edge processing
- 3 mounting config tabs: Tripod | Pole | Field
- 4 design principles: Low SWaP-C, Attritable, Passive, Edge Processing

**Full Spectrum Section** (#full-spectrum):
- Split: features (left) | image placeholder (right)
- Capabilities: wideband SDR, signal fingerprinting, FPV/homebuilt detection

**Comparison Table**: Scout vs Full Spectrum side-by-side

**CTA**: "Find the right configuration →"

---

### 4.4–4.8 Industry Verticals (/verticals/*)

All 5 use the same template with industry-specific content:

**Hero**: Industry-specific headline + background

**Problem/Solution**: Two-column contrast
- Left (dark): "The challenge" with problem statement
- Right (cyan accent border): "The solution"

**Key Capabilities**: 4-6 feature cards specific to vertical

**Deployment Spotlight** (where applicable):
- Defense: Vandenberg SFB, DIU Winner, Constellis
- Venues: CFP Championship
- Others: generic deployment context

**CTA**: "Schedule a Consultation →"

Content per vertical pulled from analysis document.

---

### 4.9 About — Story (/about/story)

**Hero**: "Built from the front lines"

**Origin Timeline** (vertical scroll):
- Georgetown → Ukraine deployment → Persistence insight → Founded → YC → Deployments

**Key Insight Callout**: Large blockquote — "Persistence > raw capability"

**Team Preview**: 3 co-founders with photos + brief bios
- CTA: Meet the full team

**Investors/Partners**: Logo bar

---

### 4.10 Contact (/contact)

**Split Layout**:
- Left: Contact form (Name, Email, Org, Title, Inquiry Type dropdown, Industry dropdown, Message)
- Right: Contact info (email, phone), "What to expect" timeline, office location

---

## 5. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 (App Router) | Matches their stack, SSR, file-based routing |
| Styling | Tailwind CSS v3 | Matches their stack, rapid iteration |
| Animations | Framer Motion | Scroll-triggered, page transitions, hover |
| Map (hero) | Mapbox GL JS | Animated globe/sensor network visualization |
| Icons | Lucide React | Clean, minimal |
| Font | Inter (Google Fonts) | Clean sans-serif |
| Mono font | JetBrains Mono (Google Fonts) | Spec data, technical details |
| Deployment | Vercel | Free tier, instant deploy, shareable URL |

### Project Structure
```
src/
  app/
    layout.tsx              — root layout (nav + footer)
    page.tsx                — homepage
    platform/page.tsx       — intelligence platform
    hardware/page.tsx       — hardware
    verticals/
      defense/page.tsx
      law-enforcement/page.tsx
      critical-infrastructure/page.tsx
      venues/page.tsx
      aviation/page.tsx
    about/
      story/page.tsx
    contact/page.tsx
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    ui/
      Button.tsx
      Card.tsx
      SectionLabel.tsx
      MetricBlock.tsx
    sections/
      Hero.tsx
      MetricsBar.tsx
      PlatformPreview.tsx
      Pipeline.tsx
      ScoutShowcase.tsx
      IndustryCards.tsx
      SocialProof.tsx
      CTASection.tsx
    verticals/
      VerticalTemplate.tsx  — shared template for all 5 verticals
  lib/
    data/
      verticals.ts          — content for each vertical
      capabilities.ts       — platform capability data
      hardware.ts           — scout/fullspectrum specs
  styles/
    globals.css             — Tailwind base + custom properties
```

---

## 6. Key Differentiators vs. Their Current Site

1. **Animated hero** with live-looking sensor network vs. static dots
2. **Social proof front and center** — DIU/Forbes/AFWERX wins visible on homepage
3. **Scroll-triggered animations** throughout vs. static sections
4. **Interactive hover effects** on cards vs. basic border changes
5. **Consistent Anduril/Palantir aesthetic** — pure black, cyan accents, defense-grade
6. **Cleaner industry vertical template** — problem/solution framing
7. **Better information hierarchy** — section labels, visual progression
8. **Modern Next.js App Router** — fast page transitions, optimized images

---

## 7. Scope & Constraints

- All data is static/hardcoded (no backend needed)
- No authentication or user accounts
- Contact form is UI-only (no submission handler)
- Platform demo is a video/animation mock, not a functional app
- Mapbox requires free API key (50k loads/month free tier)
- Target: deployable on Vercel with shareable URL for cold email
