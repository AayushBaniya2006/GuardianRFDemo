import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTASection } from "@/components/sections/CTASection";
import { Card } from "@/components/ui/Card";
import {
  scoutSpecs,
  scoutFeatures,
  fullSpectrumCapabilities,
} from "@/lib/data/hardware";

export const metadata: Metadata = {
  title: "Hardware — Guardian RF",
  description:
    "Two complementary product lines for persistent RF-based awareness across the full spectrum of low-altitude drone activity.",
};

const comparisonRows = [
  { feature: "Target Set", scout: "COTS & GOTS drones", fullSpectrum: "Analog FPV, homebuilt, modified" },
  { feature: "RF Method", scout: "Control link & telemetry", fullSpectrum: "Wideband SDR" },
  { feature: "Key Use Case", scout: "Broad detection & classification", fullSpectrum: "Attribution & fingerprinting" },
  { feature: "Processing", scout: "Edge (at sensor)", fullSpectrum: "Edge (at sensor)" },
  { feature: "Form Factor", scout: "Low SWaP-C, 60s setup", fullSpectrum: "Field-deployable, low SWaP" },
];

export default function HardwarePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 pt-32">
        <div className="section-container max-w-4xl">
          <AnimatedSection>
            <SectionLabel>Hardware</SectionLabel>

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Two complementary product lines
            </h1>

            <p className="text-base text-gray-400 mt-6 max-w-lg leading-relaxed">
              Guardian RF hardware is designed to provide persistent RF-based
              awareness across the full spectrum of low-altitude drone activity.
              The platform is built around two complementary product lines that
              address distinct but overlapping threat classes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Scout Section */}
      <section id="scout" className="py-24 bg-gray-950">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <AnimatedSection>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/scoutrest.png"
                  alt="Guardian RF Scout Sensor"
                  fill
                  className="object-contain"
                />
              </div>
            </AnimatedSection>

            {/* Copy */}
            <AnimatedSection delay={0.1}>
              <SectionLabel>Scout Sensor</SectionLabel>

              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Detection and classification at scale
              </h2>

              <p className="text-gray-400 mb-8 leading-relaxed">
                Scout is optimized for the detection and classification of
                commercially available and government-operated drones. It
                passively observes control links and proprietary telemetry
                used by COTS and GOTS platforms to provide continuous
                visibility into routine and anomalous drone activity.
              </p>

              {/* Specs */}
              <div className="border-t border-gray-800">
                {scoutSpecs.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-4 border-b border-gray-800">
                    <span className="text-sm text-gray-500">{spec.label}</span>
                    <span className="text-sm font-mono text-gray-300">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-3">
                {scoutFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-sm text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Full Spectrum Section */}
      <section id="full-spectrum" className="py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Copy first on desktop */}
            <AnimatedSection>
              <SectionLabel>Full Spectrum</SectionLabel>

              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Extended detection for non-cooperative threats
              </h2>

              <p className="text-gray-400 mb-8 leading-relaxed">
                Full Spectrum extends detection to non-cooperative and
                non-compliant drones, including analog FPV and homebuilt
                systems. It employs a wideband SDR suite to capture RF activity
                outside standard telemetry channels, enabling signal
                fingerprinting, attribution, and pattern-of-life analysis.
              </p>

              <ul className="space-y-3">
                {fullSpectrumCapabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-sm text-gray-400">{cap}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection delay={0.1}>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/fullspectrum1.jpeg"
                  alt="Guardian RF Full Spectrum Sensor"
                  fill
                  className="object-contain"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="py-24 bg-gray-950">
        <div className="section-container">
          <AnimatedSection>
            <SectionLabel>Design Philosophy</SectionLabel>
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              Principles that diverge from traditional counter-UAS thinking
            </h2>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Low SWaP-C", description: "Small size, low power, affordable cost enables broad deployment." },
              { title: "Attritable", description: "Designed to be deployed, not protected. Replace, don't repair." },
              { title: "Passive", description: "RF receive only. No emissions, no interference, no spectrum issues." },
              { title: "Edge Processing", description: "Detection and classification at the sensor. Minimal backhaul." },
            ].map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.08}>
                <Card>
                  <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{pillar.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
              Choose the right sensor
            </h2>

            <div className="border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-950">
                    <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-[0.15em] text-gray-500">Feature</th>
                    <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-[0.15em] text-gray-500">Scout</th>
                    <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-[0.15em] text-gray-500">Full Spectrum</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-t border-gray-800 hover:bg-gray-950/50">
                      <td className="px-6 py-4 text-sm text-white font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{row.scout}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{row.fullSpectrum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection
        title="Ready to deploy persistent coverage?"
        primaryHref="/contact"
        primaryLabel="Request Hardware Information"
      />
    </>
  );
}
