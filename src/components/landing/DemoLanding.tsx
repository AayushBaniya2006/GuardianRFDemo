"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DemoTopBar } from "./DemoTopBar";
import { TelemetryPanel } from "./TelemetryPanel";
import { EventLog } from "./EventLog";
import { ControlsPanel } from "./ControlsPanel";
import { MobileRadarFallback } from "./MobileRadarFallback";
import {
  type SceneControls,
  type LogEvent,
  type TelemetryData,
  EVENT_TEMPLATES,
} from "./scene/types";

const Hero3DScene = dynamic(
  () =>
    import("./scene/Hero3DScene").then((m) => ({
      default: m.Hero3DScene,
    })),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-[#08080a]" />,
  }
);

export function DemoLanding() {
  const [useStatic, setUseStatic] = useState(true); // default to static, upgrade to 3D on mount
  const [controls, setControls] = useState<SceneControls>({
    scanRate: 6,
    sensitivity: 0.8,
    showTracks: true,
    showLabels: true,
  });
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    range: 3.2,
    targets: 10,
    classified: 7,
    confidence: 94.2,
    latency: 12,
    scanRate: 6,
  });

  // Detect mobile / reduced-motion → use static fallback
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setUseStatic(mq.matches || rmq.matches);
    check();
    mq.addEventListener("change", check);
    rmq.addEventListener("change", check);
    return () => {
      mq.removeEventListener("change", check);
      rmq.removeEventListener("change", check);
    };
  }, []);

  // Generate events on a timer
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const template = EVENT_TEMPLATES[idx % EVENT_TEMPLATES.length];
      const now = new Date();
      const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
        .map((n) => String(n).padStart(2, "0"))
        .join(":");
      setEvents((prev) => [{ ...template, time }, ...prev].slice(0, 5));

      // Drift telemetry — sensitivity affects classified count and confidence
      const sens = controls.sensitivity;
      const baseClassified = Math.floor(3 + sens * 7); // 3-10 based on sensitivity
      setTelemetry((prev) => ({
        ...prev,
        confidence: Math.round((85 + sens * 12 + Math.random() * 3) * 10) / 10,
        latency: Math.round(8 + Math.random() * 10),
        classified: baseClassified + Math.floor(Math.random() * 2),
      }));

      idx++;
    }, 3500);
    return () => clearInterval(interval);
  }, [controls.sensitivity]);

  // Sync scan rate control → telemetry
  useEffect(() => {
    setTelemetry((prev) => ({ ...prev, scanRate: controls.scanRate }));
  }, [controls.scanRate]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#08080a]">
      <DemoTopBar />

      {/* 3D Scene or Mobile Fallback — fills viewport */}
      <div className="absolute inset-0">
        {useStatic ? (
          <MobileRadarFallback />
        ) : (
          <Hero3DScene controls={controls} />
        )}
      </div>

      {/* SEO-accessible heading + subtle visual label */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="sr-only">Guardian RF — Persistent Airspace Intelligence</h1>
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/25 sm:text-sm">
          Airspace Intelligence
        </span>
      </div>

      {/* HUD Overlay — bottom panels */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute bottom-4 left-4 right-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:justify-between sm:bottom-6 sm:left-6 sm:right-6">
          <TelemetryPanel data={telemetry} />
          <div className="hidden sm:block">
            <ControlsPanel controls={controls} onChange={setControls} />
          </div>
          <EventLog events={events} />
        </div>
      </div>
    </section>
  );
}
