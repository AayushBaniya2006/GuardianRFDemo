"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";

const badges = [
  "Vandenberg SFB",
  "DIU Challenge Winner",
  "Forbes 30 Under 30",
  "AFWERX Phase II",
  "Constellis",
];

export function SocialProof() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection variant="fade-in">
          <SectionLabel className="text-center">Trusted By</SectionLabel>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-gray-400 border border-gray-800 rounded-full bg-gray-950"
              >
                {badge}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
