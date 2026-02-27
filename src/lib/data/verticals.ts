export type Vertical = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  problem: string;
  solution: string;
  capabilities: { title: string; description: string; icon?: string }[];
  deployments?: { name: string; description: string }[];
  metrics?: { value: string; label: string }[];
};

export const verticals: Vertical[] = [
  {
    slug: "defense",
    title: "Defense & National Security",
    shortTitle: "Defense",
    tagline: "Protect installations and force projection assets with persistent, passive RF sensing.",
    problem: "Persistent low-altitude incursions from inexpensive and adaptable drones threaten military installations, while traditional detection systems are costly, centralized, and poorly suited for continuous coverage across distributed environments.",
    solution: "Continuous, passive RF sensing that provides attribution without revealing posture, enabling persistent monitoring across installations with minimal footprint.",
    metrics: [
      { value: "99.7%", label: "Uptime" },
      { value: "60s", label: "Deploy" },
      { value: "3km+", label: "Range" },
      { value: "24/7", label: "Monitoring" },
    ],
    capabilities: [
      { title: "Persistent Passive Monitoring", description: "24/7 RF detection without emissions or spectrum interference.", icon: "eye" },
      { title: "Operator Geolocation & Attribution", description: "Identify and locate drone operators for investigative follow-up.", icon: "map-pin" },
      { title: "Cross-Installation Correlation", description: "Connect drone activity patterns across multiple military sites.", icon: "network" },
      { title: "Command System Integration", description: "Standardized outputs feed existing C2 and security workflows.", icon: "terminal" },
      { title: "Reconnaissance Detection", description: "Pattern analysis identifies surveillance and pre-attack reconnaissance.", icon: "search" },
      { title: "Field-Ready Hardware", description: "Low SWaP-C sensors deploy in 60 seconds, designed to be replaced not repaired.", icon: "cpu" },
    ],
    deployments: [
      { name: "Vandenberg Space Force Base", description: "Active Phase II SBIR — persistent passive RF monitoring of launch and airfield operations." },
      { name: "DIU C-UAS Challenge Winner", description: "Only downselected solution based exclusively on passive RF sensing." },
      { name: "Constellis Training Facility", description: "3,700-acre NC site providing live-fire range airspace awareness." },
    ],
  },
  {
    slug: "law-enforcement",
    title: "Law Enforcement & Public Safety",
    shortTitle: "Law Enforcement",
    tagline: "Enable regional drone awareness across jurisdictions without federal dependency.",
    problem: "Drone incidents are brief, local, and difficult to attribute. Law enforcement authority exists, but the visibility required to exercise it does not. Cross-jurisdictional coordination remains fragmented.",
    solution: "A shared regional data layer that supports investigations, reporting, and interagency coordination, enabling law enforcement to document and respond to drone activity independently.",
    metrics: [
      { value: "<60s", label: "Deploy" },
      { value: "5mi", label: "Range" },
      { value: "24/7", label: "Passive" },
      { value: "Multi", label: "Jurisdictional" },
    ],
    capabilities: [
      { title: "Municipal & Regional Deployment", description: "Scale from a single site to county-wide or regional coverage.", icon: "building" },
      { title: "Operator Geolocation", description: "Locate drone operators for investigative follow-up and accountability.", icon: "map-pin" },
      { title: "Cross-Jurisdictional Correlation", description: "Connect activity across agency boundaries for coordinated response.", icon: "network" },
      { title: "Historical Playback", description: "Review past detection events for post-incident investigation.", icon: "clock" },
      { title: "Evidence Logging", description: "Exportable incident documentation for legal proceedings.", icon: "file-text" },
      { title: "Workflow Integration", description: "Feed detection data into existing dispatch and reporting systems.", icon: "settings" },
    ],
  },
  {
    slug: "critical-infrastructure",
    title: "Critical Infrastructure & Energy",
    shortTitle: "Infrastructure",
    tagline: "Secure energy assets and industrial facilities with continuous airspace monitoring.",
    problem: "Energy and industrial sites face persistent drone activity with limited visibility and no baseline understanding of what normal airspace activity looks like around their facilities.",
    solution: "Continuous detection, attribution, and long-term intelligence across distributed infrastructure, establishing baselines and surfacing anomalies automatically.",
    metrics: [
      { value: "24/7", label: "Baseline" },
      { value: "3km+", label: "Range" },
      { value: "Multi", label: "Site" },
      { value: "Zero", label: "Emissions" },
    ],
    capabilities: [
      { title: "Perimeter & Asset Coverage", description: "Distributed sensors cover facilities and surrounding approach corridors.", icon: "shield" },
      { title: "Compliant & Non-Compliant Tracking", description: "Detect all drone types regardless of cooperation or registration.", icon: "radio" },
      { title: "Long-Term Pattern Analysis", description: "Identify trends and recurring activity over weeks and months.", icon: "trending-up" },
      { title: "Baseline & Anomaly Detection", description: "Automatically establish normal activity profiles and flag deviations.", icon: "activity" },
      { title: "Physical Security Integration", description: "Feed drone intelligence into existing security operations centers.", icon: "lock" },
      { title: "Multi-Site Enterprise Visibility", description: "Unified view across all facilities in a single platform.", icon: "globe" },
    ],
  },
  {
    slug: "venues",
    title: "Stadiums, Campuses & Events",
    shortTitle: "Venues",
    tagline: "Protect large gatherings with scalable, event-ready drone detection.",
    problem: "Events concentrate people, aircraft, and attention into short time windows where response timelines are compressed and the cost of a security failure is highest.",
    solution: "Rapid deployment and persistent coverage that feeds event security operations in real time, from setup through post-event analysis.",
    metrics: [
      { value: "60s", label: "Setup" },
      { value: "3km+", label: "Range" },
      { value: "Real-Time", label: "Alerts" },
      { value: "Active", label: "Geofencing" },
    ],
    capabilities: [
      { title: "Rapid Deployment", description: "Scout sensors deploy in ~60 seconds for event-ready coverage.", icon: "zap" },
      { title: "Permanent Venue Installations", description: "Fixed sensor networks for stadiums and campuses with ongoing monitoring.", icon: "building" },
      { title: "Live Alerts", description: "Real-time notifications to operations centers when drones are detected.", icon: "bell" },
      { title: "Geofencing", description: "Define protected zones and receive instant alerts on violations.", icon: "hexagon" },
      { title: "Multi-Venue Management", description: "Monitor multiple locations from a single platform interface.", icon: "layout-grid" },
      { title: "Operator Geolocation", description: "Locate drone operators for security response coordination.", icon: "map-pin" },
    ],
    deployments: [
      { name: "2026 CFP Championship", description: "University of Miami — continuous detection, geofencing, and alerting throughout championship week." },
    ],
  },
  {
    slug: "aviation",
    title: "Aviation & Emergency Response",
    shortTitle: "Aviation",
    tagline: "Safeguard airports and enable situational awareness for first responders.",
    problem: "Low-altitude congestion from drones threatens crewed aviation operations and emergency response corridors, with limited tools to detect or document incursions.",
    solution: "Continuous detection and historical context to support aviation safety decisions, from routine monitoring to emergency incident support.",
    metrics: [
      { value: "24/7", label: "Monitoring" },
      { value: "3km+", label: "Range" },
      { value: "Real-Time", label: "Detection" },
      { value: "FAA", label: "Compatible" },
    ],
    capabilities: [
      { title: "Perimeter & Approach Monitoring", description: "Detect drones near runways, helipads, and approach corridors.", icon: "shield" },
      { title: "Real-Time Alerts", description: "Immediate notification when drone activity threatens operations.", icon: "bell" },
      { title: "Operational Integration", description: "Feed detection data into existing aviation safety workflows.", icon: "settings" },
      { title: "Emergency Incident Support", description: "Situational awareness during wildfires, disasters, and emergency response.", icon: "activity" },
      { title: "Historical Data", description: "Queryable records for investigation, reporting, and compliance.", icon: "database" },
      { title: "Multi-Site Coverage", description: "Monitor airports, heliports, and emergency corridors from one platform.", icon: "globe" },
    ],
  },
];
