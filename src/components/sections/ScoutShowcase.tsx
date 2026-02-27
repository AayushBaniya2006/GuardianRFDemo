"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

const features = [
  "Low SWaP-C",
  "Passive RF",
  "Real-time data",
  "Attritable design",
];

export function ScoutShowcase() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <SectionLabel className="text-center">Introducing Scout</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            The sensor that enables the network
          </h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Scout is Guardian RF&apos;s deployable RF sensing platform. Designed
            for dense, distributed deployment, Scout provides continuous airspace
            awareness where traditional radars and episodic systems cannot
            operate. Scout enables scale, persistence, and discretion.
          </p>
        </AnimatedSection>

        {/* Floating product image */}
        <AnimatedSection variant="fade-in" delay={0.1}>
          <div className="relative mx-auto w-full max-w-md aspect-square my-12">
            <Image
              src="/images/scoutrest.png"
              alt="Guardian RF Scout Sensor"
              fill
              className="object-contain relative z-10"
            />
          </div>
        </AnimatedSection>

        {/* Inline features */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((f) => (
              <span
                key={f}
                className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-gray-400 border border-gray-800 rounded-full bg-gray-950/50"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/hardware" variant="secondary">
              View hardware
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
