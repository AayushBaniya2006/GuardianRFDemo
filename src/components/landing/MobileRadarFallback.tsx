"use client";

import { useEffect, useState } from "react";

/* ── Target data ── */
const targets = [
  { id: "TGT-001", angle: 25, dist: 22, model: "DJI M3", conf: 97, detected: true },
  { id: "TGT-002", angle: 68, dist: 42, model: "DJI Mini", conf: 91, detected: true },
  { id: "TGT-003", angle: 118, dist: 32, model: "Autel E2", conf: 88, detected: true },
  { id: "TGT-004", angle: 162, dist: 55, model: "Skydio 2", conf: 94, detected: true },
  { id: "TGT-005", angle: 208, dist: 38, model: "DJI FPV", conf: 85, detected: true },
  { id: "TGT-006", angle: 252, dist: 26, model: "Parrot", conf: 92, detected: true },
  { id: "TGT-007", angle: 298, dist: 48, model: "DJI M30", conf: 96, detected: true },
  { id: "TGT-008", angle: 338, dist: 72, model: "UNK", conf: 0, detected: false },
  { id: "TGT-009", angle: 14, dist: 78, model: "UNK", conf: 0, detected: false },
  { id: "TGT-010", angle: 184, dist: 76, model: "UNK", conf: 0, detected: false },
];

const rangeRings = [
  { pct: 20, label: "1km" },
  { pct: 40, label: "2km" },
  { pct: 60, label: "3km" },
  { pct: 80, label: "4km" },
];

/* ── Contact event log entries ── */
const eventPool = [
  "CLASSIFIED 97%",
  "REACQUIRED",
  "TRACK STABLE",
  "CLASSIFIED 91%",
  "DETECTED",
  "TRACK LOST",
  "CLASSIFIED 88%",
  "RANGE UPDATED",
];

export function MobileRadarFallback() {
  const [activeBlip, setActiveBlip] = useState(-1);
  const [events, setEvents] = useState<{ time: string; text: string; type: string }[]>([]);

  // Cycle through blips — "acquisition flash" effect
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const detectedTargets = targets.filter((t) => t.detected);
      const target = detectedTargets[idx % detectedTargets.length];
      const targetIdx = targets.indexOf(target);
      setActiveBlip(targetIdx);

      // Add event
      const now = new Date();
      const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
        .map((n) => String(n).padStart(2, "0"))
        .join(":");
      const evt = eventPool[idx % eventPool.length];
      const isLost = evt.includes("LOST");
      setEvents((prev) =>
        [{ time, text: `${target.id} ${evt}`, type: isLost ? "lost" : "ok" }, ...prev].slice(0, 4)
      );

      idx++;
      // Clear active after 800ms
      setTimeout(() => setActiveBlip(-1), 800);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#08080a] px-4">
      {/* Radar scope — responsive square */}
      <div className="relative w-[min(80vw,80vh,400px)]" style={{ aspectRatio: "1" }}>
        {/* Ambient glow */}
        <div
          className="absolute inset-[-20%] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,255,148,0.03) 0%, transparent 50%)",
          }}
        />

        {/* Concentric range rings */}
        {rangeRings.map(({ pct, label }) => (
          <div key={pct}>
            <div
              className="absolute rounded-full border border-white/[0.06]"
              style={{
                width: `${pct}%`,
                height: `${pct}%`,
                top: `${(100 - pct) / 2}%`,
                left: `${(100 - pct) / 2}%`,
              }}
            />
            {/* Range label */}
            <span
              className="absolute font-mono text-[7px] text-accent/25 sm:text-[8px]"
              style={{ top: `${50 - pct / 2 - 1}%`, left: "51.5%" }}
            >
              {label}
            </span>
          </div>
        ))}

        {/* Cardinal crosshairs */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.04]" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.04]" />
          {/* Diagonal crosshairs */}
          <div
            className="absolute inset-0"
            style={{ transform: "rotate(45deg)" }}
          >
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.02]" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.02]" />
          </div>
        </div>

        {/* Cardinal labels */}
        <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[7px] text-white/15">N</span>
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[7px] text-white/15">S</span>
        <span className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[7px] text-white/15">W</span>
        <span className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[7px] text-white/15">E</span>

        {/* Rotating sweep beam */}
        <div
          className="absolute inset-0 animate-sweep"
          style={{ transformOrigin: "center center" }}
        >
          <div
            className="absolute left-1/2 top-0 h-1/2 w-1/2"
            style={{
              transformOrigin: "bottom left",
              background:
                "conic-gradient(from 0deg at 0% 100%, rgba(0,255,148,0.18) 0deg, rgba(0,255,148,0.06) 20deg, transparent 50deg)",
            }}
          />
        </div>

        {/* Secondary ghost sweep (offset) */}
        <div
          className="absolute inset-0 animate-sweep"
          style={{
            transformOrigin: "center center",
            animationDuration: "6s",
            animationDelay: "-3s",
            opacity: 0.3,
          }}
        >
          <div
            className="absolute left-1/2 top-0 h-1/2 w-1/2"
            style={{
              transformOrigin: "bottom left",
              background:
                "conic-gradient(from 0deg at 0% 100%, rgba(0,255,148,0.08) 0deg, transparent 30deg)",
            }}
          />
        </div>

        {/* Target blips */}
        {targets.map((t, i) => {
          const rad = ((t.angle - 90) * Math.PI) / 180; // -90 so 0° = North
          const r = t.dist / 2;
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          const isActive = activeBlip === i;
          const isDetected = t.detected;

          return (
            <div
              key={t.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Ping ring — detected targets pulse outward */}
              {isDetected && (
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full border border-accent/30 animate-blip-ping"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              )}

              {/* Acquisition flash — when this blip is "active" */}
              {isActive && isDetected && (
                <>
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(0,255,148,0.25) 0%, transparent 70%)",
                      animation: "blipPing 0.8s ease-out forwards",
                    }}
                  />
                  {/* Lock bracket */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 border border-accent/50 rotate-45" />
                </>
              )}

              {/* Core blip dot */}
              <div
                className={`h-1.5 w-1.5 rounded-full animate-blip ${
                  isDetected ? "bg-accent" : "bg-white/20"
                } ${isActive && isDetected ? "!scale-150" : ""}`}
                style={{
                  animationDelay: `${i * 0.25}s`,
                  animationDuration: isDetected ? "2s" : "4s",
                  boxShadow: isDetected
                    ? `0 0 ${isActive ? "12px 4px" : "6px 2px"} rgba(0,255,148,${isActive ? "0.6" : "0.25"})`
                    : "none",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
              />

              {/* Label — detected targets only */}
              {isDetected && (
                <div
                  className="absolute left-3 top-[-4px] whitespace-nowrap font-mono"
                  style={{
                    opacity: isActive ? 0.9 : 0.35,
                    transition: "opacity 0.3s",
                  }}
                >
                  <span className="text-[7px] text-accent sm:text-[8px]">{t.id}</span>
                  {isActive && (
                    <span className="ml-1 text-[6px] text-white/40 sm:text-[7px]">
                      {t.model} · {t.conf}%
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Center sensor node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Pulse ring from center */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-accent/20 animate-blip-ping"
            style={{ animationDuration: "3s" }}
          />
          {/* Sensor dot */}
          <div
            className="relative h-2.5 w-2.5 rounded-full bg-accent/70"
            style={{ boxShadow: "0 0 10px 2px rgba(0,255,148,0.4)" }}
          />
        </div>

        {/* Outer ring border */}
        <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
      </div>

      {/* Mini event log below radar */}
      <div className="mt-4 w-[min(80vw,400px)] space-y-1 font-mono">
        {events.length === 0 ? (
          <div className="text-center text-[9px] text-white/20 animate-blip-fade">
            AWAITING CONTACTS...
          </div>
        ) : (
          events.map((evt, i) => (
            <div
              key={`${evt.time}-${i}`}
              className="flex items-center gap-2 text-[9px] sm:text-[10px]"
              style={{ opacity: 1 - i * 0.2 }}
            >
              <span className="text-white/25 tabular-nums">{evt.time}</span>
              <span className={evt.type === "lost" ? "text-red-400/70" : "text-accent/60"}>
                {evt.text}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Bottom status bar */}
      <div className="mt-3 flex items-center gap-4 font-mono text-[8px] sm:text-[9px] text-white/25">
        <span>
          TRK <span className="text-accent/50 tabular-nums">{targets.filter((t) => t.detected).length}</span>
        </span>
        <span>
          RNG <span className="text-white/40 tabular-nums">3.2km</span>
        </span>
        <span>
          CNF <span className="text-white/40 tabular-nums">94.2%</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-1 w-1 rounded-full bg-accent/50" />
          ACTIVE
        </span>
      </div>
    </div>
  );
}
