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
    description: "Geolocation and signal fingerprinting to support investigative follow-up and accountability where real-time intervention is constrained.",
    icon: "Crosshair",
  },
  {
    title: "Pattern Recognition",
    description: "Cross-site correlation to surface shared tactics, anomalous behavior, and recurring activity not observable at the single-site level.",
    icon: "Brain",
  },
  {
    title: "Secure Architecture",
    description: "Designed for government and critical infrastructure with controlled access and mission-aligned data governance.",
    icon: "Lock",
  },
  {
    title: "Open Integration",
    description: "Standardized outputs integrate with existing security, aviation, and reporting workflows, enabling upward data flow without operational disruption.",
    icon: "Plug",
  },
];
