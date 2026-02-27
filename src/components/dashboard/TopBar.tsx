"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { Plane, AlertTriangle } from "lucide-react";
import { REGIONS, type Region } from "@/lib/data/mock-drones";

type MapStyle = "satellite" | "standard";

type TopBarProps = {
  mapStyle: MapStyle;
  onStyleChange: (style: MapStyle) => void;
  region: Region;
  onRegionChange: (region: Region) => void;
  droneCount: number;
  breachCount: number;
};

function useUtcClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default memo(function TopBar({ mapStyle, onStyleChange, region, onRegionChange, droneCount, breachCount }: TopBarProps) {
  const utc = useUtcClock();

  return (
    <div className="border-b border-white/[0.06] h-11 px-2 sm:px-4 flex items-center justify-between bg-[#080b12]">
      {/* Left: Region selector */}
      <div className="flex items-center gap-2">
        <select
          value={region}
          onChange={(e) => onRegionChange(e.target.value as Region)}
          className="text-[11px] font-mono px-2 py-1 rounded border transition-colors appearance-none cursor-pointer bg-white/[0.04] border-white/[0.08] text-white"
        >
          {REGIONS.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
      </div>

      {/* Center: Status pills */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity mr-2">
          <span className="text-accent/60 font-mono text-xs">&gt;&gt;</span>
          <span className="text-sm font-semibold text-white hidden sm:inline">Guardian RF</span>
        </Link>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-white/50">
          <Plane className="w-3 h-3 text-accent/60 -rotate-45" />
          {droneCount} ACTIVE
        </span>

        {breachCount > 0 && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3" />
            {breachCount} BREACH
          </span>
        )}

        <span
          aria-label="System status: connected"
          className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full"
        >
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          Connected
        </span>
      </div>

      {/* Right: UTC clock + Map style toggle */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-[10px] font-mono text-white/25">
          {utc} UTC
        </span>
        <div className="flex items-center gap-1">
          <button
            aria-label="Standard map view"
            aria-pressed={mapStyle === "standard"}
            onClick={() => onStyleChange("standard")}
            className={`text-[11px] px-2 py-1 rounded transition-colors ${
              mapStyle === "standard"
                ? "text-white bg-white/[0.06]"
                : "text-white/25 hover:text-white/50"
            }`}
          >
            Standard
          </button>
          <button
            aria-label="Satellite map view"
            aria-pressed={mapStyle === "satellite"}
            onClick={() => onStyleChange("satellite")}
            className={`text-[11px] px-2 py-1 rounded transition-colors ${
              mapStyle === "satellite"
                ? "text-white bg-white/[0.06]"
                : "text-white/25 hover:text-white/50"
            }`}
          >
            Satellite
          </button>
        </div>
      </div>
    </div>
  );
});
