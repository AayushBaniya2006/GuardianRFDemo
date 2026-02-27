"use client";

import { memo } from "react";
import type { Drone } from "@/lib/data/mock-drones";

type DroneCardProps = {
  drone: Drone;
  isSelected: boolean;
  isBreach: boolean;
  onSelect: () => void;
  onFocusDrone: () => void;
  onFocusOperator: () => void;
};

const STATUS_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-emerald-500/15", text: "text-emerald-400", label: "Active" },
  unknown: { bg: "bg-amber-500/15", text: "text-amber-400", label: "Unknown" },
  whitelisted: { bg: "bg-blue-500/15", text: "text-blue-400", label: "Whitelisted" },
};

function DataBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded px-2 py-1.5 border bg-black/30 border-white/[0.04]">
      <div className="text-[9px] text-accent/70 uppercase tracking-wider">{label}</div>
      <div className="font-mono text-xs text-white">{value}</div>
    </div>
  );
}

export default memo(function DroneCard({
  drone,
  isSelected,
  isBreach,
  onSelect,
  onFocusDrone,
  onFocusOperator,
}: DroneCardProps) {
  const badge = isBreach
    ? { bg: "bg-red-500/15", text: "text-red-400", label: "BREACH" }
    : STATUS_BADGE[drone.status] ?? STATUS_BADGE.active;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Drone ${drone.model}, ID ${drone.id}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`border rounded-lg p-3 cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent/50 bg-white/[0.02] ${
        isBreach ? "border-red-500/30" : isSelected ? "border-accent/30" : "border-white/[0.06]"
      }`}
    >
      {/* Top row: ID + badges */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs truncate flex-1 text-white/30">
          {drone.id}
        </span>
        <div className="flex items-center gap-1">
          {isBreach && (
            <span className="bg-red-500/15 text-red-400 text-[10px] px-2 py-0.5 rounded font-semibold">
              BREACH
            </span>
          )}
          <span className={`${badge.bg} ${badge.text} text-[10px] px-2 py-0.5 rounded`}>
            {isBreach ? STATUS_BADGE[drone.status]?.label ?? "Active" : badge.label}
          </span>
        </div>
      </div>

      {/* Model name */}
      <div className="text-sm mt-1 text-white">{drone.model}</div>

      {/* Expanded detail section */}
      {isSelected && (
        <div className="mt-2">
          {/* Drone Location */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] uppercase tracking-wider text-white/20">
              Drone Location
            </span>
            <button
              aria-label="Focus map on drone location"
              onClick={(e) => {
                e.stopPropagation();
                onFocusDrone();
              }}
              className="text-accent/70 text-xs cursor-pointer hover:text-accent transition-colors"
            >
              + Focus
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5 mt-1.5">
            <DataBox label="LAT" value={drone.lat.toFixed(6)} />
            <DataBox label="LON" value={drone.lon.toFixed(6)} />
            <DataBox label="ALT" value={`${drone.alt.toFixed(1)}m`} />
            <DataBox label="HDG" value={`${drone.hdg}\u00B0`} />
            <DataBox label="SPD" value={`${drone.spd.toFixed(1)} m/s`} />
            <DataBox label="VSPD" value={`${drone.vspd.toFixed(1)} m/s`} />
          </div>

          {/* Operator Location */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] uppercase tracking-wider text-white/20">
              Operator Location
            </span>
            <button
              aria-label="Focus map on operator location"
              onClick={(e) => {
                e.stopPropagation();
                onFocusOperator();
              }}
              className="text-accent/70 text-xs cursor-pointer hover:text-accent transition-colors"
            >
              + Focus
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            <DataBox label="LAT" value={drone.operatorLat.toFixed(6)} />
            <DataBox label="LON" value={drone.operatorLon.toFixed(6)} />
          </div>

          {/* Distance from nearest sensor */}
          <div className="mt-3">
            <span className="text-[10px] uppercase tracking-wider text-white/20">
              Distance from Nearest Sensor
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            <DataBox label="DRONE" value={`${drone.sensorDist.toFixed(2)} km`} />
            <DataBox label="OPERATOR" value={`${drone.operatorSensorDist.toFixed(2)} km`} />
          </div>

          {/* RF Information */}
          {(drone.frequency || drone.signalStrength !== undefined) && (
            <>
              <div className="mt-3">
                <span className="text-[10px] uppercase tracking-wider text-white/20">
                  RF Information
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                {drone.frequency && (
                  <DataBox label="FREQ" value={drone.frequency} />
                )}
                {drone.signalStrength !== undefined && (
                  <DataBox label="RSSI" value={`${drone.signalStrength} dBm`} />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}, (prev, next) => {
  // Skip re-render if nothing visually changed
  if (prev.isSelected !== next.isSelected || prev.isBreach !== next.isBreach) return false;
  if (prev.drone.id !== next.drone.id || prev.drone.status !== next.drone.status) return false;
  // Unselected cards don't show position — skip position-driven re-renders
  if (!next.isSelected) return true;
  // Selected card shows telemetry — re-render on position changes
  return (
    prev.drone.lat === next.drone.lat &&
    prev.drone.lon === next.drone.lon &&
    prev.drone.alt === next.drone.alt &&
    prev.drone.hdg === next.drone.hdg &&
    prev.drone.spd === next.drone.spd &&
    prev.drone.vspd === next.drone.vspd
  );
});
