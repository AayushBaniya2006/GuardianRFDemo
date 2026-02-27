"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

const metrics = [
  { value: "24/7", label: "Persistent Monitoring" },
  { value: "Rapid", label: "Deployment" },
  { value: "Multi-Site", label: "Intelligence" },
  { value: "Passive", label: "RF Detection" },
];

export function MetricsBar() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, i) => (
              <AnimatedSection key={metric.label} delay={i * 0.08}>
                <p className="text-3xl font-bold text-white">
                  {metric.value}
                </p>
                <p className="text-sm uppercase tracking-wide text-gray-500 mt-2">
                  {metric.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
