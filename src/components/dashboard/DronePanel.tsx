"use client";

import { useState } from "react";
import { Plane, X } from "lucide-react";
import { whitelistedDrones, type Drone } from "@/lib/data/mock-drones";
import type { DashboardEvent } from "@/hooks/useDashboardEvents";
import DroneCard from "./DroneCard";
import EventLog from "./EventLog";

type DronePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDroneId: string | null;
  onSelectDrone: (id: string) => void;
  onFocusDrone: (lat: number, lon: number) => void;
  drones: Drone[];
  breachingDrones: Set<string>;
  events: DashboardEvent[];
};

export default function DronePanel({
  isOpen,
  onClose,
  selectedDroneId,
  onSelectDrone,
  onFocusDrone,
  drones,
  breachingDrones,
  events,
}: DronePanelProps) {
  const [activeTab, setActiveTab] = useState<"active" | "whitelisted" | "events">("active");

  if (!isOpen) return null;

  return (
    <div className="w-full sm:w-[380px] h-full border-r flex flex-col z-20 sm:z-auto bg-[#080b12] border-white/[0.06]">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-accent/60 -rotate-45" />
          <span className="font-semibold text-sm text-white">Drone Management</span>
        </div>
        <button
          aria-label="Close drone panel"
          onClick={onClose}
          className="cursor-pointer transition-colors text-white/25 hover:text-white/50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div role="tablist" className="flex border-b px-4 border-white/[0.06]">
        <button
          role="tab"
          aria-selected={activeTab === "active"}
          onClick={() => setActiveTab("active")}
          className={`text-[12px] py-2.5 px-1 mr-4 cursor-pointer transition-colors ${
            activeTab === "active"
              ? "text-accent border-b-2 border-accent"
              : "text-white/30 hover:text-white/50"
          }`}
        >
          Active ({drones.length})
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "whitelisted"}
          onClick={() => setActiveTab("whitelisted")}
          className={`text-[12px] py-2.5 px-1 mr-4 cursor-pointer transition-colors ${
            activeTab === "whitelisted"
              ? "text-accent border-b-2 border-accent"
              : "text-white/30 hover:text-white/50"
          }`}
        >
          Whitelisted ({whitelistedDrones.length})
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "events"}
          onClick={() => setActiveTab("events")}
          className={`text-[12px] py-2.5 px-1 cursor-pointer transition-colors ${
            activeTab === "events"
              ? "text-accent border-b-2 border-accent"
              : "text-white/30 hover:text-white/50"
          }`}
        >
          Events
          {events.some((e) => e.level === "critical") && (
            <span className="ml-1.5 w-1.5 h-1.5 bg-red-400 rounded-full inline-block" />
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === "events" ? (
        <EventLog events={events} />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {activeTab === "active" &&
            drones.map((drone) => (
              <DroneCard
                key={drone.id}
                drone={drone}
                isSelected={selectedDroneId === drone.id}
                isBreach={breachingDrones.has(drone.id)}
                onSelect={() => onSelectDrone(drone.id)}
                onFocusDrone={() => onFocusDrone(drone.lat, drone.lon)}
                onFocusOperator={() => onFocusDrone(drone.operatorLat, drone.operatorLon)}
              />
            ))}

          {activeTab === "whitelisted" &&
            whitelistedDrones.map((drone) => (
              <div
                key={drone.id}
                className="border rounded-lg p-3 bg-white/[0.02] border-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/30">{drone.id}</span>
                  <span className="bg-blue-500/15 text-blue-400 text-[10px] px-2 py-0.5 rounded">
                    Whitelisted
                  </span>
                </div>
                <div className="text-sm mt-1 text-white">{drone.model}</div>
                <div className="text-xs mt-1 text-white/30">{drone.owner}</div>
                <div className="text-xs mt-0.5 text-white/20">{drone.note}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
