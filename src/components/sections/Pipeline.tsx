"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    number: "01",
    title: "Detection",
    description:
      "Low-SWaP passive RF sensors observe drone emissions without transmitting or revealing posture. Always listening, never broadcasting.",
  },
  {
    number: "02",
    title: "Correlation",
    description:
      "Detections persist, de-duplicate, and correlate across time and space to identify repeat activity and behavioral patterns.",
  },
  {
    number: "03",
    title: "Intelligence",
    description:
      "Operators gain a durable record of what is normal, what is new, and what warrants attention across a site, region, or enterprise.",
  },
];

export function Pipeline() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            From sensing to understanding
          </h2>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.08}>
              <Card>
                <span className="text-sm font-mono text-accent">{step.number}</span>
                <h3 className="text-xl font-semibold text-white mt-3 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
