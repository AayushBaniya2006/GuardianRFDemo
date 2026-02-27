"use client";

import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { DataStream } from "@/components/visuals/DataStream";

const mockDrones = [
  { id: "DJI-M30T", alt: "120m", status: "ACTIVE" },
  { id: "SKY-X2E", alt: "75m", status: "ACTIVE" },
  { id: "AUT-EVO2", alt: "95m", status: "ACTIVE" },
];

const blipPositions = [
  { left: "35%", top: "28%", id: "TGT-001", alt: "120m" },
  { left: "62%", top: "55%", id: "TGT-002", alt: "75m" },
  { left: "48%", top: "72%", id: "TGT-003", alt: "95m" },
  { left: "75%", top: "35%", id: "TGT-004", alt: "140m" },
];

function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function PlatformPreview() {
  const [timestamp, setTimestamp] = useState("--:--:--");
  const [threats, setThreats] = useState(3);
  const [hoveredBlip, setHoveredBlip] = useState<number | null>(null);

  useEffect(() => {
    setTimestamp(formatTime());
    const timer = setInterval(() => {
      setTimestamp(formatTime());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setThreats((prev) => (prev < 6 ? prev + 1 : 3));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gray-950 overflow-hidden">
      <div className="section-container mb-12">
        <AnimatedSection>
          <SectionLabel>Intelligence Platform</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-2xl">
            Persistent Airspace Surveillance Platform
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
              View Platform
            </Button>
          </div>
        </AnimatedSection>
      </div>

      {/* Full-width platform mock */}
      <AnimatedSection variant="fade-in" delay={0.2}>
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Platform container with perspective tilt */}
          <div
            className="relative rounded-xl overflow-hidden bg-surface-1 border border-white/[0.06]"
            style={{
              aspectRatio: "16 / 9",
            }}
          >
            {/* Grid pattern as map */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40" />

            {/* Scan line with afterimage */}
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-scan-line" />
            <div className="absolute left-0 right-0 h-4 bg-gradient-to-b from-accent/[0.03] to-transparent animate-scan-line" style={{ animationDelay: "-0.1s" }} />

            {/* DataStream decorative overlay on right */}
            <div className="absolute right-0 top-8 bottom-7 w-10 z-[6] overflow-hidden opacity-30">
              <DataStream columns={1} opacity={0.15} />
            </div>

            {/* === Top Bar === */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-black/40 border-b border-white/[0.04] flex items-center justify-between px-3 z-10">
              <div className="flex items-center gap-2">
                <span className="text-accent/60 font-mono text-[9px]">&gt;&gt;</span>
                <span className="text-[10px] font-semibold text-white/80 tracking-wide">GUARDIAN RF</span>
                <span className="flex items-center gap-1 ml-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-mono text-emerald-400/70">CONNECTED</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-[8px] font-mono text-white/30">
                <span>{timestamp}</span>
                <span>SECTOR 7-A</span>
              </div>
            </div>

            {/* === Left Sidebar === */}
            <div className="absolute top-8 left-0 bottom-0 w-[140px] md:w-[180px] bg-black/30 border-r border-white/[0.04] z-10">
              <div className="px-2 py-2">
                <div className="text-[8px] font-mono uppercase tracking-wider text-white/20 mb-2 px-1">
                  Active Drones
                </div>
                {mockDrones.map((drone) => (
                  <div
                    key={drone.id}
                    className="px-2 py-1.5 rounded mb-1 bg-white/[0.02] border border-white/[0.04]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-white/60">{drone.id}</span>
                      <span className="text-[7px] font-mono text-emerald-400/80 bg-emerald-500/10 px-1 rounded">
                        {drone.status}
                      </span>
                    </div>
                    <div className="text-[8px] font-mono text-white/25 mt-0.5">
                      ALT {drone.alt}
                    </div>
                  </div>
                ))}

                <div className="mt-3 px-1">
                  <div className="text-[8px] font-mono uppercase tracking-wider text-white/20 mb-1.5">
                    Sensors
                  </div>
                  {["SENSOR_01", "SENSOR_02", "SENSOR_03", "SENSOR_04"].map((s) => (
                    <div key={s} className="flex items-center gap-1.5 mb-1">
                      <span className="w-1 h-1 rounded-full bg-accent/60" />
                      <span className="text-[8px] font-mono text-white/30">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* === Main Map Area — Drone Blips with Hover Tooltips === */}
            {blipPositions.map((pos, i) => (
              <div
                key={i}
                className="absolute z-10 group cursor-pointer"
                style={{ left: pos.left, top: pos.top }}
                onMouseEnter={() => setHoveredBlip(i)}
                onMouseLeave={() => setHoveredBlip(null)}
              >
                {/* Blip dot */}
                <div
                  className="w-2 h-2 rounded-full bg-accent"
                  style={{ boxShadow: "0 0 6px 1px rgba(0, 255, 148, 0.3)" }}
                />
                {/* Tooltip on hover */}
                {hoveredBlip === i && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/90 border border-accent/20 rounded px-2 py-1 whitespace-nowrap z-20">
                    <div className="text-[8px] font-mono text-accent">{pos.id}</div>
                    <div className="text-[7px] font-mono text-white/40">ALT {pos.alt}</div>
                  </div>
                )}
                {/* Signal wave SVG */}
                <svg className="absolute -right-3 -top-1 w-4 h-3 opacity-40" viewBox="0 0 16 12">
                  <path d="M2 6 Q4 2 6 6 Q8 10 10 6 Q12 2 14 6" fill="none" stroke="rgba(0,255,148,0.5)" strokeWidth="0.8">
                    <animate attributeName="d" dur="2s" repeatCount="indefinite"
                      values="M2 6 Q4 2 6 6 Q8 10 10 6 Q12 2 14 6;M2 6 Q4 4 6 6 Q8 8 10 6 Q12 4 14 6;M2 6 Q4 2 6 6 Q8 10 10 6 Q12 2 14 6" />
                  </path>
                </svg>
              </div>
            ))}

            {/* Operator markers (amber) */}
            <div className="absolute z-10" style={{ left: "38%", top: "35%" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" style={{ boxShadow: "0 0 6px 1px rgba(245, 158, 11, 0.3)" }} />
            </div>
            <div className="absolute z-10" style={{ left: "65%", top: "60%" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" style={{ boxShadow: "0 0 6px 1px rgba(245, 158, 11, 0.3)" }} />
            </div>

            {/* Connection lines (subtle) */}
            <svg className="absolute inset-0 w-full h-full z-[5] pointer-events-none" preserveAspectRatio="none">
              <line x1="35%" y1="28%" x2="38%" y2="35%" stroke="rgba(0,255,148,0.08)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="62%" y1="55%" x2="65%" y2="60%" stroke="rgba(0,255,148,0.08)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* === Bottom Status Bar === */}
            <div className="absolute bottom-0 left-0 right-0 h-7 bg-black/40 border-t border-white/[0.04] flex items-center justify-between px-3 z-10">
              <div className="flex items-center gap-4 text-[9px] font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-accent/60" />
                  <span className="text-white/40">{threats} Active</span>
                </span>
                <span className="text-white/25">4/4 Sensors Online</span>
                <span className="text-white/25">99.7% Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-[8px] font-mono text-white/20">
                <span>LAST EVENT {timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
