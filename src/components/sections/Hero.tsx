"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { RadarScope } from "@/components/visuals/RadarScope";

const ease: [number, number, number, number] = [0.33, 1, 0.68, 1];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Main content — left-aligned editorial */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: 0 }}
              className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-8"
            >
              Radiofrequency Drone Intelligence
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              Persistent visibility into{" "}
              <span className="text-gray-400">low-altitude airspace</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="text-lg text-gray-400 mt-8 max-w-md leading-relaxed"
            >
              Low-altitude airspace is dense, cheap to access, and largely
              ungoverned. Drone activity is local, fleeting, and repeatable.
              When it cannot be continuously detected and attributed,
              deterrence does not exist. Guardian RF provides the persistent
              sensing and intelligence layer that closes that gap.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.5 }}
              className="mt-8"
            >
              <Button href="/dashboard">Launch Platform</Button>
            </motion.div>
          </div>

          {/* Right — radar scope */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
            className="hidden lg:block"
          >
            <RadarScope className="w-full max-w-[500px] mx-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
