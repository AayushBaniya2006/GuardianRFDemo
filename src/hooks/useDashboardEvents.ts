"use client";

import { useEffect, useRef, useState } from "react";

export type DashboardEvent = {
  id: string;
  timestamp: Date;
  level: "info" | "warn" | "critical";
  source: string;
  message: string;
};

const MAX_EVENTS = 50;
let eventCounter = 0;

function createEvent(
  level: DashboardEvent["level"],
  source: string,
  message: string
): DashboardEvent {
  return {
    id: `evt-${++eventCounter}`,
    timestamp: new Date(),
    level,
    source,
    message,
  };
}

/**
 * Tracks dashboard events generated from simulation state transitions.
 * Watches breaching drones set for BREACH/CLEAR transitions.
 */
export function useDashboardEvents(breachingDrones: Set<string>) {
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const prevBreachingRef = useRef<Set<string>>(new Set());
  const isFirstRender = useRef(true);

  // System online event on mount
  useEffect(() => {
    setEvents([createEvent("info", "SYSTEM", "Dashboard initialized — sensors online")]);
  }, []);

  // Watch for breach transitions
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const prev = prevBreachingRef.current;
    const newEvents: DashboardEvent[] = [];

    // New breaches
    breachingDrones.forEach((id) => {
      if (!prev.has(id)) {
        newEvents.push(
          createEvent("critical", id.slice(0, 12), "Geofence breach detected")
        );
      }
    });

    // Cleared breaches
    prev.forEach((id) => {
      if (!breachingDrones.has(id)) {
        newEvents.push(
          createEvent("info", id.slice(0, 12), "Exited geofence zone")
        );
      }
    });

    if (newEvents.length > 0) {
      setEvents((prev) => [...prev, ...newEvents].slice(-MAX_EVENTS));
    }

    prevBreachingRef.current = new Set(breachingDrones);
  }, [breachingDrones]);

  return events;
}
