export type Vertical = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
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
    problem: "Persistent low-altitude incursions from inexpensive and adaptable drones threaten military installations, while traditional detection systems are costly, centralized, and poorly suited for continuous coverage across distributed environments.",
    solution: "Continuous, passive RF sensing that provides attribution without revealing posture, enabling persistent monitoring across installations with minimal footprint.",
    capabilities: [
      { title: "Persistent Passive Monitoring", description: "24/7 RF detection without emissions or spectrum interference." },
      { title: "Operator Geolocation & Attribution", description: "Identify and locate drone operators for investigative follow-up." },
      { title: "Cross-Installation Correlation", description: "Connect drone activity patterns across multiple military sites." },
      { title: "Command System Integration", description: "Standardized outputs feed existing C2 and security workflows." },
      { title: "Reconnaissance Detection", description: "Pattern analysis identifies surveillance and pre-attack reconnaissance." },
      { title: "Field-Ready Hardware", description: "Low SWaP-C sensors deploy in 60 seconds, designed to be replaced not repaired." },
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
    icon: "Users",
    tagline: "Enable regional drone awareness across jurisdictions without federal dependency.",
    problem: "Drone incidents are brief, local, and difficult to attribute. Law enforcement authority exists, but the visibility required to exercise it does not. Cross-jurisdictional coordination remains fragmented.",
    solution: "A shared regional data layer that supports investigations, reporting, and interagency coordination, enabling law enforcement to document and respond to drone activity independently.",
    capabilities: [
      { title: "Municipal & Regional Deployment", description: "Scale from a single site to county-wide or regional coverage." },
      { title: "Operator Geolocation", description: "Locate drone operators for investigative follow-up and accountability." },
      { title: "Cross-Jurisdictional Correlation", description: "Connect activity across agency boundaries for coordinated response." },
      { title: "Historical Playback", description: "Review past detection events for post-incident investigation." },
      { title: "Evidence Logging", description: "Exportable incident documentation for legal proceedings." },
      { title: "Workflow Integration", description: "Feed detection data into existing dispatch and reporting systems." },
    ],
  },
  {
    slug: "critical-infrastructure",
    title: "Critical Infrastructure & Energy",
    shortTitle: "Infrastructure",
    icon: "Zap",
    tagline: "Secure energy assets and industrial facilities with continuous airspace monitoring.",
    problem: "Energy and industrial sites face persistent drone activity with limited visibility and no baseline understanding of what normal airspace activity looks like around their facilities.",
    solution: "Continuous detection, attribution, and long-term intelligence across distributed infrastructure, establishing baselines and surfacing anomalies automatically.",
    capabilities: [
      { title: "Perimeter & Asset Coverage", description: "Distributed sensors cover facilities and surrounding approach corridors." },
      { title: "Compliant & Non-Compliant Tracking", description: "Detect all drone types regardless of cooperation or registration." },
      { title: "Long-Term Pattern Analysis", description: "Identify trends and recurring activity over weeks and months." },
      { title: "Baseline & Anomaly Detection", description: "Automatically establish normal activity profiles and flag deviations." },
      { title: "Physical Security Integration", description: "Feed drone intelligence into existing security operations centers." },
      { title: "Multi-Site Enterprise Visibility", description: "Unified view across all facilities in a single platform." },
    ],
  },
  {
    slug: "venues",
    title: "Stadiums, Campuses & Events",
    shortTitle: "Venues",
    icon: "Building",
    tagline: "Protect large gatherings with scalable, event-ready drone detection.",
    problem: "Events concentrate people, aircraft, and attention into short time windows where response timelines are compressed and the cost of a security failure is highest.",
    solution: "Rapid deployment and persistent coverage that feeds event security operations in real time, from setup through post-event analysis.",
    capabilities: [
      { title: "Rapid Deployment", description: "Scout sensors deploy in ~60 seconds for event-ready coverage." },
      { title: "Permanent Venue Installations", description: "Fixed sensor networks for stadiums and campuses with ongoing monitoring." },
      { title: "Live Alerts", description: "Real-time notifications to operations centers when drones are detected." },
      { title: "Geofencing", description: "Define protected zones and receive instant alerts on violations." },
      { title: "Multi-Venue Management", description: "Monitor multiple locations from a single platform interface." },
      { title: "Operator Geolocation", description: "Locate drone operators for security response coordination." },
    ],
    deployments: [
      { name: "2026 CFP Championship", description: "University of Miami — continuous detection, geofencing, and alerting throughout championship week." },
    ],
  },
  {
    slug: "aviation",
    title: "Aviation & Emergency Response",
    shortTitle: "Aviation",
    icon: "Plane",
    tagline: "Safeguard airports and enable situational awareness for first responders.",
    problem: "Low-altitude congestion from drones threatens crewed aviation operations and emergency response corridors, with limited tools to detect or document incursions.",
    solution: "Continuous detection and historical context to support aviation safety decisions, from routine monitoring to emergency incident support.",
    capabilities: [
      { title: "Perimeter & Approach Monitoring", description: "Detect drones near runways, helipads, and approach corridors." },
      { title: "Real-Time Alerts", description: "Immediate notification when drone activity threatens operations." },
      { title: "Operational Integration", description: "Feed detection data into existing aviation safety workflows." },
      { title: "Emergency Incident Support", description: "Situational awareness during wildfires, disasters, and emergency response." },
      { title: "Historical Data", description: "Queryable records for investigation, reporting, and compliance." },
      { title: "Multi-Site Coverage", description: "Monitor airports, heliports, and emergency corridors from one platform." },
    ],
  },
];
