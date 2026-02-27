"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export function PlatformPreview() {
  return (
    <section className="py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <AnimatedSection>
          <SectionLabel>Intelligence Platform</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-2xl">
            The data layer for low-altitude airspace
          </h2>
          <p className="text-base text-gray-400 mt-6 max-w-lg leading-relaxed">
            Guardian RF builds the data layer for low-altitude airspace.
            Distributed RF sensors continuously observe drone activity and
            convert detections into structured digital events. Those events
            persist over time, correlate across locations, and form a shared
            operational picture.
          </p>
          <div className="mt-8">
            <Button href="/platform" variant="ghost">
              Explore the platform
            </Button>
          </div>
        </AnimatedSection>
      </div>

      {/* Full-width platform mock */}
      <AnimatedSection variant="fade-in" delay={0.2}>
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Platform container with perspective tilt */}
          <div
            className="relative rounded-xl overflow-hidden bg-surface-1 aspect-[16/9]"
            style={{
              transform: "perspective(1200px) rotateX(2deg)",
            }}
          >
            {/* Grid pattern as map */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40" />

            {/* Scan line */}
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-scan-line" />

            {/* Status overlay - bottom left */}
            <div className="absolute bottom-4 left-4 flex items-center gap-4 text-[10px] font-mono text-gray-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent/60" />
                3 Active
              </span>
              <span>4/4 Sensors</span>
              <span>99.7% Uptime</span>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
