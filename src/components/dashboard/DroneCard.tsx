"use client";

import type { Drone } from "@/lib/data/mock-drones";

type DroneCardProps = {
  drone: Drone;
  isSelected: boolean;
  onSelect: () => void;
  onFocusDrone: () => void;
  onFocusOperator: () => void;
  theme?: "dark" | "light";
};

function DataBox({ label, value, theme = "dark" }: { label: string; value: string; theme?: "dark" | "light" }) {
  return (
    <div className={`rounded px-2 py-1.5 border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-black/30 border-white/[0.04]"}`}>
      <div className="text-[9px] text-accent/70 uppercase tracking-wider">{label}</div>
      <div className={`font-mono text-xs ${theme === "light" ? "text-gray-900" : "text-white"}`}>{value}</div>
    </div>
  );
}

export default function DroneCard({
  drone,
  isSelected,
  onSelect,
  onFocusDrone,
  onFocusOperator,
  theme = "dark",
}: DroneCardProps) {
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
      className={`border rounded-lg p-3 cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
        theme === "light"
          ? `bg-white ${isSelected ? "border-accent/40 shadow-sm" : "border-gray-200"}`
          : `bg-white/[0.02] ${isSelected ? "border-accent/30" : "border-white/[0.06]"}`
      }`}
    >
      {/* Top row: ID + badge */}
      <div className="flex items-center justify-between gap-2">
        <span className={`font-mono text-xs truncate flex-1 ${theme === "light" ? "text-gray-400" : "text-white/30"}`}>
          {drone.id}
        </span>
        <span className="bg-emerald-500/15 text-emerald-400 text-[10px] px-2 py-0.5 rounded">
          Active
        </span>
      </div>

      {/* Model name */}
      <div className={`text-sm mt-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>{drone.model}</div>

      {/* Expanded detail section */}
      {isSelected && (
        <div className="mt-2">
          {/* Drone Location */}
          <div className="flex items-center justify-between mt-3">
            <span className={`text-[10px] uppercase tracking-wider ${theme === "light" ? "text-gray-400" : "text-white/20"}`}>
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
            <DataBox theme={theme} label="LAT" value={drone.lat.toFixed(6)} />
            <DataBox theme={theme} label="LON" value={drone.lon.toFixed(6)} />
            <DataBox theme={theme} label="ALT" value={`${drone.alt.toFixed(1)}m`} />
            <DataBox theme={theme} label="HDG" value={`${drone.hdg}\u00B0`} />
            <DataBox theme={theme} label="SPD" value={`${drone.spd.toFixed(1)} m/s`} />
            <DataBox theme={theme} label="VSPD" value={`${drone.vspd.toFixed(1)} m/s`} />
          </div>

          {/* Operator Location */}
          <div className="flex items-center justify-between mt-3">
            <span className={`text-[10px] uppercase tracking-wider ${theme === "light" ? "text-gray-400" : "text-white/20"}`}>
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
            <DataBox theme={theme} label="LAT" value={drone.operatorLat.toFixed(6)} />
            <DataBox theme={theme} label="LON" value={drone.operatorLon.toFixed(6)} />
          </div>

          {/* Distance from nearest sensor */}
          <div className="mt-3">
            <span className={`text-[10px] uppercase tracking-wider ${theme === "light" ? "text-gray-400" : "text-white/20"}`}>
              Distance from Nearest Sensor
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            <DataBox theme={theme} label="DRONE" value={`${drone.sensorDist.toFixed(2)} km`} />
            <DataBox theme={theme} label="OPERATOR" value={`${drone.operatorSensorDist.toFixed(2)} km`} />
          </div>

          {/* RF Information */}
          {(drone.frequency || drone.signalStrength !== undefined) && (
            <>
              <div className="mt-3">
                <span className={`text-[10px] uppercase tracking-wider ${theme === "light" ? "text-gray-400" : "text-white/20"}`}>
                  RF Information
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                {drone.frequency && (
                  <DataBox theme={theme} label="FREQ" value={drone.frequency} />
                )}
                {drone.signalStrength !== undefined && (
                  <DataBox theme={theme} label="RSSI" value={`${drone.signalStrength} dBm`} />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
