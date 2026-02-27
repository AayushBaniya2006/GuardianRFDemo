"use client";

import { HudPanel } from "./HudPanel";
import type { TelemetryData } from "./scene/types";

interface TelemetryPanelProps {
  data: TelemetryData;
}

const rows: { key: keyof TelemetryData; label: string; unit: string; decimals: number }[] = [
  { key: "range", label: "RANGE", unit: "km", decimals: 1 },
  { key: "targets", label: "TARGETS", unit: "", decimals: 0 },
  { key: "classified", label: "CLASSIFIED", unit: "", decimals: 0 },
  { key: "confidence", label: "CONFIDENCE", unit: "%", decimals: 1 },
  { key: "latency", label: "LATENCY", unit: "ms", decimals: 0 },
  { key: "scanRate", label: "SCAN RATE", unit: "s", decimals: 1 },
];

export function TelemetryPanel({ data }: TelemetryPanelProps) {
  return (
    <HudPanel title="Telemetry" className="w-[200px]">
      <div className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between">
            <span className="text-white/50">{row.label}</span>
            <span className="tabular-nums text-white/90">
              {data[row.key].toFixed(row.decimals)}
              {row.unit && (
                <span className="ml-0.5 text-white/40">{row.unit}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </HudPanel>
  );
}
