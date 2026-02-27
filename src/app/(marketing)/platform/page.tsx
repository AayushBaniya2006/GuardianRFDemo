import type { Metadata } from "next";
import { Globe, TrendingUp, Crosshair, Brain, Lock, Plug, type LucideIcon } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";
import { Card } from "@/components/ui/Card";

import { AnimatedBorder } from "@/components/ui/AnimatedBorder";
import { capabilities } from "@/lib/data/capabilities";

const iconMap: Record<string, LucideIcon> = {
  Globe, TrendingUp, Crosshair, Brain, Lock, Plug,
};

export const metadata: Metadata = {
  title: "Intelligence Platform — Guardian RF",
  description:
    "Guardian RF converts passive RF observations into a structured intelligence product for low-altitude airspace.",
};

const transformations = [
  { before: "Discrete sightings", after: "Patterns of activity" },
  { before: "Short-duration incidents", after: "Documented events" },
  { before: "Local observations", after: "Regional awareness" },
  { before: "Raw detections", after: "Durable records" },
];

const architectureItems = [
  { title: "Cloud-Native", description: "Architecture for reliability and scalability" },
  { title: "On-Premise", description: "Deployment options for classified environments" },
  { title: "API-First", description: "Designed for integration and data sharing" },
  { title: "Role-Based Access", description: "Controlled access across organizations" },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 pt-32">
        <div className="section-container max-w-4xl">
          <AnimatedSection>
            <SectionLabel>Intelligence Platform</SectionLabel>

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Persistent Airspace Surveillance Platform
            </h1>

            <p className="text-base text-gray-400 mt-6 max-w-lg leading-relaxed">
              Guardian RF converts passive RF observations into a structured
              intelligence product for low-altitude airspace. Detections persist,
              correlate, and resolve across time and geography, enabling
              attribution, reporting, and coordinated action beyond individual
              sites.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Transformation */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection variant="fade-in">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
              Detection to Intelligence Pipeline
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transformations.map((item, i) => (
              <AnimatedSection key={item.before} delay={i * 0.08}>
                <Card>
                  <p className="text-sm text-gray-500">{item.before}</p>
                  <div className="my-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent/60" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 2 L8 14 M4 10 L8 14 L12 10">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                      </path>
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-white">{item.after}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-gray-950">
        <div className="section-container">
          <AnimatedSection variant="fade-in">
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
              Six pillars of airspace intelligence
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <AnimatedSection key={cap.title} delay={i * 0.08}>
                <Card>
                  {iconMap[cap.icon] && (() => {
                    const Icon = iconMap[cap.icon];
                    return <Icon className="w-5 h-5 text-accent/60 mb-4" />;
                  })()}
                  <h3 className="text-lg font-semibold text-white">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{cap.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection variant="fade-in">
            <SectionLabel>Built for Scale</SectionLabel>
            <p className="text-sm text-gray-400 max-w-lg leading-relaxed mt-2">
              Architecture supports regional and national airspace understanding
              without requiring regional ownership of sensing infrastructure.
            </p>
          </AnimatedSection>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {architectureItems.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <AnimatedBorder>
                  <Card>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                  </Card>
                </AnimatedBorder>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss platform requirements"
        primaryHref="/contact"
        primaryLabel="Request Platform Demonstration"
      />
    </>
  );
}
