"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HUDElement } from "@/components/visuals/HUDElement";
import { TacticalGrid } from "@/components/visuals/TacticalGrid";
import { RadarScope } from "@/components/visuals/RadarScope";

const metrics = [
  { value: "99.7%", label: "UPTIME" },
  { value: "60s", label: "DEPLOY" },
  { value: "24/7", label: "MONITORING" },
  { value: "3km+", label: "RANGE" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      <TacticalGrid />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-[2]" />

      <HUDElement corner="top-left" className="z-[4]" />
      <HUDElement corner="bottom-right" className="z-[4]" />

      <div className="relative z-10 w-full section-container py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left: Copy */}
          <div className="max-w-2xl flex-1">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            >
              <SectionLabel className="mb-4">
                Radiofrequency Drone Intelligence
              </SectionLabel>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-[-0.03em]">
                Persistent visibility into{" "}
                <span className="text-gray-400">low-altitude airspace</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
              className="text-lg text-gray-400 mt-5 max-w-lg leading-relaxed"
            >
              Guardian RF provides persistent RF sensing and intelligence for
              low-altitude airspace where drone activity cannot be continuously
              detected and attributed.
            </motion.p>

            {/* Inline metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
              className="flex flex-wrap gap-6 mt-6 font-mono text-xs"
            >
              {metrics.map((m) => (
                <div key={m.label} className="flex items-baseline gap-2">
                  <span className="text-white font-semibold text-sm">{m.value}</span>
                  <span className="text-gray-600 uppercase tracking-wider">{m.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
              className="mt-6 flex items-center gap-4"
            >
              <Button href="/contact">Request Briefing</Button>
              <Button href="/platform" variant="ghost">
                View Platform
              </Button>
            </motion.div>
          </div>

          {/* Right: Radar scope */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="hidden md:block md:w-[280px] lg:w-[340px] shrink-0"
          >
            <RadarScope className="w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
