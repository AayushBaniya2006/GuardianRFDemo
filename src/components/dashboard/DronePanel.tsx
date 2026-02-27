"use client";

import { useState } from "react";
import { Plane, X } from "lucide-react";
import { activeDrones, whitelistedDrones } from "@/lib/data/mock-drones";
import DroneCard from "./DroneCard";

type DronePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDroneId: string | null;
  onSelectDrone: (id: string) => void;
  onFocusDrone: (lat: number, lon: number) => void;
  theme: "dark" | "light";
};

export default function DronePanel({
  isOpen,
  onClose,
  selectedDroneId,
  onSelectDrone,
  onFocusDrone,
  theme,
}: DronePanelProps) {
  const [activeTab, setActiveTab] = useState<"active" | "whitelisted">("active");

  if (!isOpen) return null;

  return (
    <div className={`w-full sm:w-[380px] h-full border-r flex flex-col z-20 sm:z-auto ${theme === "light" ? "bg-white border-gray-200" : "bg-[#080b12] border-white/[0.06]"}`}>
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b ${theme === "light" ? "border-gray-200" : "border-white/[0.06]"}`}>
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-accent/60 -rotate-45" />
          <span className={`font-semibold text-sm ${theme === "light" ? "text-gray-900" : "text-white"}`}>Drone Management</span>
        </div>
        <button
          aria-label="Close drone panel"
          onClick={onClose}
          className={`cursor-pointer transition-colors ${theme === "light" ? "text-gray-400 hover:text-gray-600" : "text-white/25 hover:text-white/50"}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div role="tablist" className={`flex border-b px-4 ${theme === "light" ? "border-gray-200" : "border-white/[0.06]"}`}>
        <button
          role="tab"
          aria-selected={activeTab === "active"}
          onClick={() => setActiveTab("active")}
          className={`text-[12px] py-2.5 px-1 mr-4 cursor-pointer transition-colors ${
            activeTab === "active"
              ? "text-accent border-b-2 border-accent"
              : theme === "light" ? "text-gray-400 hover:text-gray-600" : "text-white/30 hover:text-white/50"
          }`}
        >
          Active Drones
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "whitelisted"}
          onClick={() => setActiveTab("whitelisted")}
          className={`text-[12px] py-2.5 px-1 cursor-pointer transition-colors ${
            activeTab === "whitelisted"
              ? "text-accent border-b-2 border-accent"
              : theme === "light" ? "text-gray-400 hover:text-gray-600" : "text-white/30 hover:text-white/50"
          }`}
        >
          Whitelisted Drones ({whitelistedDrones.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {activeTab === "active" &&
          activeDrones.map((drone) => (
            <DroneCard
              key={drone.id}
              drone={drone}
              isSelected={selectedDroneId === drone.id}
              onSelect={() => onSelectDrone(drone.id)}
              onFocusDrone={() => onFocusDrone(drone.lat, drone.lon)}
              onFocusOperator={() => onFocusDrone(drone.operatorLat, drone.operatorLon)}
              theme={theme}
            />
          ))}

        {activeTab === "whitelisted" &&
          whitelistedDrones.map((drone) => (
            <div
              key={drone.id}
              className={`border rounded-lg p-3 ${theme === "light" ? "bg-white border-gray-200" : "bg-white/[0.02] border-white/[0.06]"}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-xs ${theme === "light" ? "text-gray-400" : "text-white/30"}`}>{drone.id}</span>
                <span className="bg-blue-500/15 text-blue-400 text-[10px] px-2 py-0.5 rounded">
                  Whitelisted
                </span>
              </div>
              <div className={`text-sm mt-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>{drone.model}</div>
              <div className={`text-xs mt-1 ${theme === "light" ? "text-gray-500" : "text-white/30"}`}>{drone.owner}</div>
              <div className={`text-xs mt-0.5 ${theme === "light" ? "text-gray-400" : "text-white/20"}`}>{drone.note}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
