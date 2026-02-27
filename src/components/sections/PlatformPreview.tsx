"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export function PlatformPreview() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section className="py-20 bg-gray-950 overflow-hidden">
      <div className="section-container mb-10">
        <AnimatedSection>
          <SectionLabel>Intelligence Platform</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.03em] text-white max-w-2xl">
            Persistent Airspace Surveillance Platform
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-xl leading-relaxed">
            Guardian RF builds the data layer for low-altitude airspace.
            Distributed RF sensors continuously observe drone activity and
            convert detections into structured digital events. Those events
            persist over time, correlate across locations, and form a shared
            operational picture.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button href="/dashboard" variant="ghost">
              Open Full Dashboard
            </Button>
            <Button href="/platform" variant="ghost">
              View Platform Details
            </Button>
          </div>
        </AnimatedSection>
      </div>

      {/* Live dashboard embed */}
      <AnimatedSection variant="fade-in" delay={0.2}>
        <div className="relative mx-auto max-w-6xl px-6">
          <div
            className="relative rounded-xl overflow-hidden border border-white/[0.06]"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* Loading skeleton shown until iframe loads */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#080b12] z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                  <span className="text-white/40 text-xs font-mono">Loading live dashboard...</span>
                </div>
              </div>
            )}
            <iframe
              src="/dashboard"
              title="Guardian RF Live Dashboard Demo"
              className="w-full h-full border-0"
              style={{ position: "absolute", inset: 0 }}
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
