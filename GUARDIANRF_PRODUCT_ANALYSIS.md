# GuardianRF Complete Product & UI Analysis

## Crawl Date: February 24, 2026
## Source: https://www.guardianrf.com

---

## TABLE OF CONTENTS

1. [Company Overview](#1-company-overview)
2. [Site Architecture & Navigation](#2-site-architecture--navigation)
3. [Homepage Analysis](#3-homepage-analysis)
4. [Intelligence Platform (Core Product)](#4-intelligence-platform-core-product)
5. [Hardware Products](#5-hardware-products)
6. [Industry Verticals](#6-industry-verticals)
7. [Company Pages](#7-company-pages)
8. [Design System & Visual Language](#8-design-system--visual-language)
9. [Platform UI Elements (Inferred from All Sources)](#9-platform-ui-elements-inferred-from-all-sources)
10. [Complete Feature Inventory](#10-complete-feature-inventory)
11. [Data Types & Intelligence Outputs](#11-data-types--intelligence-outputs)
12. [User Workflows](#12-user-workflows)

---

## 1. COMPANY OVERVIEW

**Company:** Guardian RF Corporation
**Tagline:** "Persistent Airspace Intelligence"
**Mission:** Make low-altitude airspace observable, persistent, and accountable
**Founded by:** Former Georgetown University classmates (physics & signal processing backgrounds)
**Origin story:** Founders traveled to Ukraine, observed that cheap drones outpaced institutional responses. Learned persistence > raw capability. Built Guardian RF around low-SWaP attritable RF sensing + intelligence layer.
**Backing:** Y Combinator, Space Capital, Valor Equity Partners, D3VC, General Catalyst
**Forbes 30 Under 30:** Transportation & Aerospace (December 2025)
**Contact:** contact@guardianrf.com | (202) 937-9821

### Leadership Team
- **Lucas Raskin** - Co-Founder & CEO
- **Eli Kerstein** - Co-Founder & CTO
- **John Andrzejewski** - Co-Founder & COO

### Advisory Board
- **William McNulty (USMC)** - Founder, Team Rubicon
- **Hon. Jane Holl Lute** - Former Deputy Secretary DHS (2009-2013)
- **Lt. Gen. (ret) Douglas Lute** - Former Deputy National Security Advisor (2007-2013)

### Integration Partners
- **Picogrid** - Trusted Integration Partner
- **Constellis** - Trusted Integration Partner

### Notable Deployments & Wins
- Vandenberg Space Force Base (Phase II SBIR - active deployment)
- AFWERX SBIR Phase II Award ($1,195,000 contract)
- DIU Low-Cost Counter-Drone Sensing Challenge WINNER (passive RF category)
- Constellis Training Facility (3,700-acre NC site, largest private security training facility in US)
- University of Miami 2026 CFP Championship (detection, geofencing, alerting)

---

## 2. SITE ARCHITECTURE & NAVIGATION

### Primary Navigation (Header)
```
Home (/)
Industries (dropdown)
  -> Intelligence Platform (/platform)
  -> Hardware (/hardware)
About (dropdown)
  -> Contact (/contact)
  -> Request Demo (/contact)
```

### Footer Navigation - Full Structure

**Industries:**
- Defense & National Security (/verticals/defense)
- Law Enforcement & Public Safety (/verticals/law-enforcement)
- Critical Infrastructure & Energy (/verticals/critical-infrastructure)
- Stadiums, Campuses & Events (/verticals/venues)
- Aviation & Emergency Response (/verticals/aviation)

**Solutions:**
- Intelligence Platform (/platform)
- Scout Sensor (/hardware#scout)
- Full Spectrum (/hardware#full-spectrum)

**Company:**
- The Guardian RF Story (/about/story)
- Leadership (/about/leadership)
- Partners (/about/partners)
- Press Releases (/about/press-releases)
- In the News (/about/news)
- Careers (external: ycombinator.com/companies/guardian-rf/jobs)

**Social:** LinkedIn (linkedin.com/company/guardian-rf)

### Complete URL Map
```
/                                    - Homepage
/platform                            - Intelligence Platform
/hardware                            - Hardware (Scout + Full Spectrum)
/hardware#scout                      - Scout sensor section
/hardware#full-spectrum              - Full Spectrum section
/verticals/defense                   - Defense & National Security
/verticals/law-enforcement           - Law Enforcement & Public Safety
/verticals/critical-infrastructure   - Critical Infrastructure & Energy
/verticals/venues                    - Stadiums, Campuses & Events
/verticals/aviation                  - Aviation & Emergency Response
/about/story                         - Company Story
/about/leadership                    - Leadership Team
/about/partners                      - Partners & Investors
/about/press-releases                - Press Releases
/about/news                          - In the News
/contact                             - Contact / Request Demo
```

### Tech Stack (Inferred)
- **Framework:** Next.js (/_next/ URL patterns, image optimization)
- **Hosting:** Likely Vercel or similar
- **Design:** Tailwind CSS (utility class patterns observed)

---

## 3. HOMEPAGE ANALYSIS (/)

### Hero Section
- **Headline:** "Persistent visibility into low-altitude airspace"
- **Sub-headline:** "Radiofrequency Drone Intelligence"
- **Body:** Describes low-altitude airspace as "dense, cheap to access, and largely ungoverned" with activity that is "local, fleeting, and repeatable." Without continuous detection and attribution, "deterrence does not exist."
- **CTAs:**
  - "Request a Demo" (white button with arrow -> /contact)
  - "Explore the Platform" (bordered button -> /platform)

### Key Metrics Bar (4 columns)
| Metric | Label |
|--------|-------|
| 24/7 | Persistent Monitoring |
| Rapid | Deployment |
| Multi-Site | Intelligence |
| Passive | RF Detection |

### Shared Intelligence Layer Section
- **Title:** "The data layer for low-altitude airspace"
- **Content:** Distributed RF sensors observe drone activity, convert detections into structured digital events. Events persist over time, correlate across locations, form shared operational picture.
- **CTA:** "Learn about the Intelligence Platform" (/platform)
- **Media:** Embedded video (platformdemo.mp4) - autoplay, looping, showing platform demonstration

### How It Works - 3-Stage Pipeline
| Stage | Name | Icon | Description |
|-------|------|------|-------------|
| 01 | Detection | RF symbol | Low-SWaP passive RF sensors observe drone emissions without transmitting or revealing posture. Always listening, never broadcasting. |
| 02 | Correlation | Building symbol | Detections persist, de-duplicate, and correlate across time and space to identify repeat activity and behavioral patterns. |
| 03 | Intelligence | Database symbol | Operators gain a durable record of what is normal, what is new, and what warrants attention across a site, region, or enterprise. |

### Scout Sensor Feature Section
- **Headline:** "The sensor that enables the network"
- **Features (bulleted):**
  - Low SWaP-C for broad deployment
  - Passive RF collection with no emissions
  - Real-time data to the intelligence platform
  - Attritable design for persistent presence
- **CTA:** "View Hardware Solutions" (/hardware)
- **Image:** scoutrest.png (product shot)

### Industry Solutions Section
- **Title:** "Purpose-built for your mission"
- **5 cards, each with icon, description, and "Learn more" link:**
  1. Defense & National Security (Shield icon) - "Protect installations and force projection assets with persistent, passive RF sensing."
  2. Law Enforcement & Public Safety (Users icon) - "Enable regional drone awareness across jurisdictions without federal dependency."
  3. Critical Infrastructure & Energy (Lightning icon) - "Secure energy assets and industrial facilities with continuous airspace monitoring."
  4. Stadiums, Campuses & Events (Building icon) - "Protect large gatherings with scalable, event-ready drone detection."
  5. Aviation & Emergency Response (Airplane icon) - "Safeguard airports and enable situational awareness for first responders."

### Final CTA Section
- **Headline:** "Ready to see what's in your airspace?"
- **Body:** "Schedule a demonstration to see how Guardian RF can provide persistent, attributable visibility into low-altitude activity around your sites."
- **CTAs:** "Request a Demo" + "Learn About Guardian RF"

---

## 4. INTELLIGENCE PLATFORM (Core Product - /platform)

### Hero Section
- **Headline:** "The data layer for low-altitude airspace"
- **Value Prop:** Converts passive RF observations into structured intelligence product. Detections persist, correlate, and resolve across time and geography, enabling attribution, reporting, and coordinated action beyond individual sites.

### Core Transformation: "From Detections to Answers"
The platform transforms:
- Discrete sightings -> Patterns of activity
- Short-duration incidents -> Documented events
- Local observations -> Regional and national airspace awareness
- Raw detections -> Durable, queryable records of unmanned activity

### Structural Problem Solved
"Drone activity occurs locally, while compliance, oversight, and enforcement responsibilities are distributed across higher levels of government and enterprise." The platform bridges this gap.

### 6 Core Platform Capabilities

| # | Capability | Description |
|---|-----------|-------------|
| 1 | **Multi-Site Visibility** | Unified views across facilities, jurisdictions, and regions, supporting coordinated awareness across distributed environments |
| 2 | **Longitudinal Intelligence** | Retention of detections over time to establish baselines, identify repetition, and support post-event analysis |
| 3 | **Operator Attribution** | Geolocation and signal fingerprinting to support investigative follow-up and accountability where real-time intervention is constrained |
| 4 | **Pattern Recognition** | Cross-site correlation to surface shared tactics, anomalous behavior, and recurring activity not observable at the single-site level |
| 5 | **Secure Architecture** | Designed for government and critical infrastructure environments with controlled access, auditability, and data governance aligned to mission requirements |
| 6 | **Open Integration** | Standardized outputs integrate with existing security, aviation, and reporting workflows, enabling upward data flow without operational disruption at the local level |

### Platform Interface Visual
- Screenshot/image labeled "Guardian RF Platform Interface" (mapping2.png)
- Shows a **map-based visualization** for monitoring low-altitude airspace activity

### Technical Architecture: "Built for Scale"

**Data Flow Model:**
- Distributed sensors feed a common data model
- Supports site-level operations, regional fusion, and enterprise-level analysis using the same underlying data
- Local entities focus on detection and documentation
- Higher-level organizations manage aggregation, compliance, and long-term intelligence functions

**Platform Characteristics:**
| Characteristic | Detail |
|---------------|--------|
| Cloud-native | Architecture for reliability and scalability |
| On-premise | Deployment options for classified/restricted environments |
| Role-based access | Control across organizations |
| API-first | Design supporting integration, reporting, data sharing |

---

## 5. HARDWARE PRODUCTS (/hardware)

### Product Line A: SCOUT SENSOR

**Purpose:** Detection and classification of commercially available and government-operated drones
**Target Set:** COTS (Commercial Off-The-Shelf) and GOTS (Government Off-The-Shelf) drones
**Detection Method:** Passively observes control links and proprietary telemetry

#### Technical Specifications
| Spec | Value |
|------|-------|
| Power Draw | 10W average |
| Connectivity | LTE and LEO (Low Earth Orbit satellite) backhaul |
| Setup Time | ~60 seconds |
| Operation | Persistent, unattended |
| Detection | Control links & telemetry |
| Processing | Edge processing (detection/classification at sensor) |
| Networking | Self-contained (no infrastructure dependency) |

#### Mounting Configurations (3 form factors)
1. **Scout Unit** - Tripod-mounted (standard deployment)
2. **Range Extender** - Pole-mounted (extended coverage)
3. **Mounted Setup** - Complete field deployment configuration

#### Design Philosophy
- **Low SWaP-C:** Small size, low power, affordable cost enables broad deployment
- **Attritable:** "Designed to be deployed, not protected. Replace, don't repair."
- **Passive:** RF receive only. No emissions, no interference, no spectrum issues
- **Edge Processing:** Detection and classification at the sensor. Minimal backhaul

---

### Product Line B: FULL SPECTRUM

**Purpose:** Extends detection to non-cooperative and non-compliant drones
**Target Set:** Analog FPV, homebuilt, and modified systems
**RF Capture:** Wideband SDR (Software Defined Radio) suite

#### Capabilities
- Signal fingerprinting
- Attribution analysis
- Pattern-of-life analysis
- Captures RF activity outside standard telemetry channels
- Works where cooperative identification mechanisms are absent

#### Specifications
| Spec | Value |
|------|-------|
| Form Factor | Field-deployable |
| Design | Low-SWaP, attritable |
| RF Method | Wideband SDR |
| Role | Complements Scout deployments |

---

## 6. INDUSTRY VERTICALS

### 6A. Defense & National Security (/verticals/defense)

**Problem:** "Persistent low-altitude incursions from inexpensive and adaptable drones" while "traditional systems are costly, centralized, and poorly suited for continuous coverage."

**Solution:** "Continuous, passive RF sensing that provides attribution without revealing posture"

**Key Capabilities:**
- Persistent passive monitoring
- Operator geolocation and attribution
- Cross-installation correlation
- Integration with existing command and security systems
- Pattern analysis for reconnaissance detection
- Field-ready, attritable hardware

**Notable Deployments:**
- **Vandenberg Space Force Base** - Active Phase II SBIR, persistent passive RF detection monitoring launch and airfield operations
- **DIU Low-Cost Sensing Challenge** - Winner; only downselected solution based exclusively on passive RF sensing
- **Constellis Training Facility** - 3,700-acre NC site, live-fire range airspace awareness

**CTAs:** Schedule a Consultation, View Hardware Solutions

---

### 6B. Law Enforcement & Public Safety (/verticals/law-enforcement)

**Problem:** "Drone incidents are brief, local, and difficult to attribute. Authority exists, but visibility does not."

**Solution:** "A shared regional data layer that supports investigations, reporting, and interagency coordination."

**Key Capabilities:**
- Municipal and regional deployment options
- Operator geolocation for follow-up investigations
- Cross-jurisdictional correlation across agency boundaries
- Historical playback and evidence logging functionality
- Workflow integration with existing systems
- Exportable incident documentation

**CTAs:** Schedule a Consultation, View Hardware Solutions

---

### 6C. Critical Infrastructure & Energy (/verticals/critical-infrastructure)

**Problem:** "Energy and industrial sites face persistent drone activity with limited visibility and no baseline understanding."

**Solution:** "Continuous detection, attribution, and long-term intelligence across distributed infrastructure."

**Key Capabilities:**
- Perimeter and asset coverage
- Tracking of compliant and non-compliant drones
- Long-term pattern analysis
- Baseline and anomaly detection
- Physical security system integration
- Multi-site enterprise visibility

**CTAs:** Schedule a Consultation, View Hardware Solutions

---

### 6D. Stadiums, Campuses & Events (/verticals/venues)

**Problem:** "Events concentrate people, aircraft, and attention into short time windows where response timelines are compressed."

**Solution:** "Rapid deployment and persistent coverage that feeds event security operations in real time."

**Key Capabilities:**
- Rapid deployment capability
- Permanent venue installations
- Live alerts to operations centers
- Multi-venue management
- Scalable coverage for high-profile events
- Operator geolocation
- Continuous detection
- Geofencing functionality
- Passive (no emissions or disruption)

**Notable Deployment:**
- University of Miami 2026 CFP Championship - continuous detection, geofencing, and alerting throughout championship week

**CTAs:** Schedule a Consultation, View Hardware Solutions

---

### 6E. Aviation & Emergency Response (/verticals/aviation)

**Problem:** "Low-altitude congestion threatens crewed aviation and emergency response operations."

**Solution:** "Continuous detection and historical context to support aviation safety decisions."

**Key Capabilities:**
- Perimeter and approach monitoring
- Real-time alerts
- Operational integration with existing workflows
- Emergency incident support
- Wildfire and disaster response visibility
- Historical data for investigation and reporting

**Deployment Contexts:** Airports, Heliports, Emergency corridors, Wildfire response areas, Disaster zones

**CTAs:** Schedule a Consultation, View Hardware Solutions

---

## 7. COMPANY PAGES

### 7A. The Guardian RF Story (/about/story)
- Founded by Georgetown classmates (physics + signal processing)
- Deployed to Ukraine to assist with signal intelligence and drone detection
- Key insight: persistence > raw capability; small deployable sensors > sophisticated slow systems
- Built around low-SWaP attritable RF sensing + intelligence layer
- Goal: "create visibility, attribution, and memory in low-altitude airspace"

### 7B. Leadership (/about/leadership)
- 3 co-founders + 3 advisors (detailed in Section 1)

### 7C. Partners (/about/partners)
- 5 investors: Y Combinator, Space Capital, Valor Equity Partners, D3VC, General Catalyst
- 2 integration partners: Picogrid, Constellis

### 7D. Press Releases (/about/press-releases)
- July 2025: DIU Low-Cost Counter-Drone Sensing Challenge Finalist
- June 2025: AFWERX SBIR Phase II Award ($1,195,000)

### 7E. In the News (/about/news)
- Dec 12, 2025: DIU C-UAS Challenge Winner (passive RF category)
- Dec 2, 2025: Forbes 30 Under 30 (Transportation & Aerospace)
- July 21, 2025: DIU Finalist Announcement

### 7F. Contact (/contact)
**Form Fields:**
| Field | Required | Type |
|-------|----------|------|
| Full Name | Yes | Text |
| Work Email | Yes | Email |
| Organization | Yes | Text |
| Title | No | Text |
| Inquiry Type | Yes | Dropdown |
| Industry | No | Dropdown |
| Message | No | Textarea |

**Inquiry Type Options:** Request a Demo, Sales Inquiry, Partnership Opportunity, Media Inquiry, Career Inquiry, Other

**Industry Options:** Defense & National Security, Law Enforcement & Public Safety, Critical Infrastructure & Energy, Stadiums Campuses & Events, Aviation & Emergency Response, Other

**Direct Contact:** contact@guardianrf.com | (202) 937-9821

---

## 8. DESIGN SYSTEM & VISUAL LANGUAGE

### Color Palette
| Token | Usage |
|-------|-------|
| `bg-black` / `bg-gray-950` | Primary backgrounds |
| `bg-gray-900` | Secondary/card backgrounds |
| `border-gray-800` | Card/section borders |
| `text-blue-400` | Accent text, links |
| `bg-blue-500` | Primary buttons, highlights |
| Blue/cyan pulsing dots | Animated accent elements |
| White | Primary text |
| Gray-400 | Secondary/body text |

### Typography Scale
| Class | Usage |
|-------|-------|
| `text-4xl md:text-5xl lg:text-6xl` | Hero headlines |
| `text-3xl md:text-4xl` | Section headlines |
| `text-xl` | Sub-headlines |
| `text-base` / `text-lg` | Body text |
| `text-sm` | Labels, metadata |
| Font weight: Bold | Headlines |
| Font weight: Medium | Sub-headlines |
| Font weight: Normal | Body |

### Layout Patterns
- **Grid system:** `grid`, `md:grid-cols-2`, `lg:grid-cols-3`, `lg:grid-cols-5`
- **Max width containers:** Content constrained to max-width
- **Card pattern:** Border + rounded corners + hover state
- **Section spacing:** Large vertical padding between sections

### Interactive Elements
- Buttons with arrow icons (-> SVG)
- Hover state transitions (color, border, opacity)
- Autoplay looping video embeds
- Card hover effects (border color change)
- Link hover underlines

### Media Assets Referenced
| File | Description |
|------|-------------|
| `logo-symbol.png` | Company logo/symbol |
| `scoutrest.png` | Scout sensor product image |
| `platformdemo.mp4` | Platform demo video (autoplay, loop) |
| `mapping2.png` | Platform map interface screenshot |
| `lucas.jpeg` | CEO headshot |
| `eli.png` | CTO headshot |
| `john.jpeg` | COO headshot |
| `will.png` | Advisor headshot |
| `jane.png` | Advisor headshot |
| `doug.png` | Advisor headshot |

---

## 9. PLATFORM UI ELEMENTS (Inferred from All Sources)

Based on all descriptions, screenshots, videos, and capability descriptions across the entire site, here is what the Intelligence Platform UI contains:

### 9A. Map-Based Primary Interface
- **Central map display** showing airspace activity (confirmed via mapping2.png screenshot)
- **Multi-site map** with ability to view across facilities, jurisdictions, and regions
- **Drone detection markers/icons** on map showing detected drone positions
- **Operator geolocation** markers showing pilot/controller positions
- **Sensor placement** visualization showing Scout/Full Spectrum sensor locations
- **Geofencing** boundary overlays on map (confirmed via venues vertical)
- **Coverage area** visualization for sensor networks

### 9B. Detection & Alert System
- **Real-time detection feed** showing live drone observations
- **Live alerts** to operations centers (confirmed via venues vertical)
- **Detection classification** (COTS vs GOTS vs FPV/homebuilt)
- **Alert notifications** for anomalous activity
- **Geofence violation alerts** (confirmed via CFP Championship deployment)

### 9C. Intelligence & Analysis Views
- **Longitudinal timeline** showing detections over time
- **Historical playback** (confirmed via law enforcement vertical)
- **Pattern recognition** visualization for recurring activity
- **Baseline establishment** showing normal vs anomalous activity
- **Cross-site correlation** views connecting activity across locations
- **Signal fingerprinting** data display
- **Pattern-of-life** analysis visualization
- **Post-event analysis** capabilities

### 9D. Reporting & Documentation
- **Incident documentation** and event logging
- **Exportable reports** (confirmed via law enforcement vertical)
- **Evidence logging** (confirmed via law enforcement vertical)
- **Queryable detection records** (durable, queryable records)
- **Audit trail** (confirmed via secure architecture)

### 9E. Multi-Site & Enterprise Management
- **Site-level views** for individual installations
- **Regional fusion** views aggregating multiple sites
- **Enterprise-level analysis** dashboard
- **Multi-venue management** (confirmed via venues vertical)
- **Role-based access control** across organizations
- **Organization hierarchy** management

### 9F. Integration & Data Flow
- **API-first architecture** for external integration
- **Standardized outputs** for security/aviation/reporting workflows
- **Physical security system integration** (confirmed via critical infrastructure)
- **Command system integration** (confirmed via defense vertical)
- **Data sharing** capabilities between organizations

### 9G. Sensor Management
- **Sensor status monitoring** (connected/disconnected)
- **Sensor deployment tracking** across sites
- **Edge processing status** from sensor nodes
- **LTE/LEO connectivity status**

---

## 10. COMPLETE FEATURE INVENTORY

### Detection Features
1. Passive RF drone detection (no emissions)
2. COTS drone detection and classification
3. GOTS drone detection and classification
4. Analog FPV drone detection (Full Spectrum)
5. Homebuilt/modified drone detection (Full Spectrum)
6. Control link observation
7. Proprietary telemetry observation
8. Wideband SDR RF capture
9. Edge processing at sensor
10. Continuous 24/7 monitoring
11. Persistent unattended operation

### Intelligence Features
12. Detection persistence over time
13. Detection de-duplication
14. Cross-time correlation
15. Cross-space correlation
16. Cross-site correlation
17. Baseline establishment (what is normal)
18. Anomaly detection (what is new)
19. Pattern recognition (recurring activity)
20. Signal fingerprinting
21. Operator attribution
22. Operator geolocation
23. Pattern-of-life analysis
24. Shared tactics identification
25. Behavioral analysis

### Operational Features
26. Multi-site unified visibility
27. Real-time alerting
28. Geofencing
29. Geofence violation detection
30. Historical playback
31. Post-event analysis
32. Incident documentation
33. Evidence logging
34. Exportable incident reports
35. Queryable detection database
36. Role-based access control
37. Audit trail / auditability
38. Data governance controls

### Architecture Features
39. Cloud-native deployment
40. On-premise deployment option
41. API-first design
42. Standardized output formats
43. Physical security system integration
44. Aviation system integration
45. Command system integration
46. Reporting workflow integration
47. Multi-organization data sharing
48. Distributed sensor common data model

### Hardware Features
49. 60-second setup time (Scout)
50. 10W power draw (Scout)
51. LTE backhaul connectivity
52. LEO satellite backhaul connectivity
53. Self-contained networking
54. Tripod mounting (Scout)
55. Pole mounting (Range Extender)
56. Field deployment mounting
57. Low SWaP-C design
58. Attritable (replace, don't repair)
59. No RF emissions
60. Minimal backhaul requirements

---

## 11. DATA TYPES & INTELLIGENCE OUTPUTS

### Raw Data
- RF signal detections
- Control link observations
- Telemetry captures
- Wideband RF captures (Full Spectrum)
- Signal fingerprints
- Timestamps
- Sensor location data

### Processed Data
- Drone type classifications (COTS/GOTS/FPV/homebuilt)
- Operator geolocation coordinates
- Drone flight paths/positions
- De-duplicated detection events
- Correlated detection chains

### Intelligence Products
- Baseline activity patterns (normal behavior profiles)
- Anomaly flags (deviations from baseline)
- Repeat activity patterns
- Cross-site shared tactics
- Pattern-of-life profiles
- Behavioral analysis reports
- Historical activity timelines

### Operational Outputs
- Real-time alerts
- Geofence violation notifications
- Incident documentation/reports
- Evidence packages (exportable)
- Queryable historical records
- API data feeds
- Integration payloads (security, aviation, reporting systems)

---

## 12. USER WORKFLOWS

### Workflow 1: Real-Time Monitoring
1. Sensors passively detect drone RF emissions
2. Edge processing classifies detection at sensor
3. Detection transmitted to platform via LTE/LEO
4. Platform displays detection on map in real-time
5. Alert generated if anomalous or geofence violation
6. Operator views detection details (type, location, operator position)
7. Operator takes action or documents incident

### Workflow 2: Investigation & Attribution
1. Detection or alert triggers investigation
2. Operator views operator geolocation on map
3. Signal fingerprint analyzed for identification
4. Historical data queried for repeat activity
5. Cross-site correlation checked for related activity
6. Evidence logged and exported for follow-up
7. Incident documentation created

### Workflow 3: Pattern Analysis
1. Detections accumulate over time
2. Platform de-duplicates and correlates observations
3. Baseline of normal activity established
4. Anomalous deviations surfaced automatically
5. Recurring patterns identified across sites
6. Shared tactics flagged across regions
7. Intelligence reports generated

### Workflow 4: Multi-Site Enterprise Management
1. Multiple sites each running distributed sensors
2. Site-level operators monitor local activity
3. Regional view aggregates cross-site data
4. Enterprise analysts review correlation patterns
5. Role-based access controls what each level sees
6. Data flows upward from local to regional to enterprise
7. Compliance and reporting handled at appropriate levels

### Workflow 5: Event Security (Temporary Deployment)
1. Scout sensors rapidly deployed (~60 seconds each)
2. Geofences configured for event perimeter
3. Live monitoring during event
4. Real-time alerts to operations center
5. Geofence violations flagged immediately
6. Continuous detection throughout event duration
7. Post-event analysis and reporting

### Workflow 6: Sensor Deployment & Management
1. Scout sensor physically positioned (tripod/pole/field mount)
2. Sensor powers on (10W draw)
3. Sensor connects via LTE or LEO satellite
4. Sensor begins passive RF listening
5. Edge processing handles classification locally
6. Minimal data backhauled to platform
7. Sensor operates persistently unattended

---

## SUMMARY: KEY DIFFERENTIATORS

1. **Passive-only RF sensing** - Never transmits, never reveals posture
2. **Persistence** - 24/7 continuous monitoring, not episodic
3. **Low SWaP-C** - Enables dense, distributed deployment affordably
4. **Attritable hardware** - Replace don't repair philosophy
5. **Intelligence layer** - Not just detection; correlation, attribution, pattern analysis
6. **Multi-site architecture** - Local to regional to enterprise data flow
7. **60-second deployment** - Rapid field setup
8. **Dual hardware lines** - Scout (COTS/GOTS) + Full Spectrum (FPV/homebuilt)
9. **Edge processing** - Minimal bandwidth requirements
10. **Cloud + On-prem** - Flexible deployment for classified environments
