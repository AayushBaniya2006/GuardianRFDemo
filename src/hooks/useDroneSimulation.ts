"use client";

import { useEffect, useRef, useState } from "react";
import type { Drone } from "@/lib/data/mock-drones";
import type { Geofence } from "@/lib/data/mock-geofences";
import { haversine, pointInPolygon } from "@/lib/geo-utils";

type MovementState = {
  heading: number; // degrees
  speed: number; // degrees per tick
  originLat: number;
  originLon: number;
};

const TICK_MS = 50; // 20fps — smooth enough, not wasteful
const MAX_DRIFT_METERS = 500;
const MIN_SPEED = 0.00002;
const MAX_SPEED = 0.00007;

/** Simulates drone movement — smooth wandering tethered to origin, avoids geofences */
export function useDroneSimulation(drones: Drone[], geofences: Geofence[] = []): Drone[] {
  const [positions, setPositions] = useState<Map<string, { lat: number; lon: number }>>(new Map());
  const positionsRef = useRef<Map<string, { lat: number; lon: number }>>(new Map());
  const movementRef = useRef<Map<string, MovementState>>(new Map());
  const dronesRef = useRef(drones);
  dronesRef.current = drones;
  const geofencesRef = useRef(geofences);
  geofencesRef.current = geofences;

  // Initialize movement state for new drones
  useEffect(() => {
    const existing = movementRef.current;
    const next = new Map<string, MovementState>();

    drones.forEach((drone) => {
      if (existing.has(drone.id)) {
        next.set(drone.id, existing.get(drone.id)!);
      } else {
        next.set(drone.id, {
          heading: Math.random() * 360,
          speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
          originLat: drone.lat,
          originLon: drone.lon,
        });
      }
    });

    movementRef.current = next;
  }, [drones]);

  // Run simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDrones = dronesRef.current;
      const movements = movementRef.current;
      const prevPositions = positionsRef.current;
      const nextPositions = new Map<string, { lat: number; lon: number }>();

      currentDrones.forEach((drone) => {
        const state = movements.get(drone.id);
        if (!state) return;

        // Current position (use last simulated position or initial)
        const prev = prevPositions.get(drone.id);
        const currentLat = prev?.lat ?? drone.lat;
        const currentLon = prev?.lon ?? drone.lon;

        // Heading adjustment: random drift + pull toward origin
        let headingDelta = (Math.random() - 0.5) * 15; // up to ±7.5° random turn

        // Pull back toward origin when drifting too far
        const distFromOrigin = haversine(currentLat, currentLon, state.originLat, state.originLon);
        if (distFromOrigin > MAX_DRIFT_METERS * 0.6) {
          const pullStrength = Math.min((distFromOrigin - MAX_DRIFT_METERS * 0.6) / (MAX_DRIFT_METERS * 0.4), 1);
          const toOriginAngle = Math.atan2(
            state.originLon - currentLon,
            state.originLat - currentLat
          ) * (180 / Math.PI);
          const angleDiff = ((toOriginAngle - state.heading + 540) % 360) - 180;
          headingDelta += angleDiff * pullStrength * 0.3;
        }

        state.heading = (state.heading + headingDelta + 360) % 360;

        // Vary speed slightly
        state.speed += (Math.random() - 0.5) * 0.00002;
        state.speed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, state.speed));

        // Move
        const rad = (state.heading * Math.PI) / 180;
        let newLat = currentLat + Math.cos(rad) * state.speed;
        let newLon = currentLon + Math.sin(rad) * state.speed;

        // Geofence avoidance + escape
        const currentGeofences = geofencesRef.current;
        if (currentGeofences.length > 0) {
          // Check if currently INSIDE a geofence (need to escape)
          const insideGf = currentGeofences.find((gf) =>
            pointInPolygon([currentLon, currentLat], gf.vertices)
          );
          if (insideGf) {
            // Steer away from geofence centroid to escape toward nearest edge
            const cx = insideGf.vertices.reduce((s, v) => s + v[0], 0) / insideGf.vertices.length;
            const cy = insideGf.vertices.reduce((s, v) => s + v[1], 0) / insideGf.vertices.length;
            state.heading = Math.atan2(currentLon - cx, currentLat - cy) * (180 / Math.PI);
            state.speed = MAX_SPEED; // boost to escape faster
            const escRad = (state.heading * Math.PI) / 180;
            newLat = currentLat + Math.cos(escRad) * state.speed;
            newLon = currentLon + Math.sin(escRad) * state.speed;
          } else {
            // Not inside yet — check if next position would enter one
            const wouldBreach = currentGeofences.some((gf) =>
              pointInPolygon([newLon, newLat], gf.vertices)
            );
            if (wouldBreach) {
              state.heading = (state.heading + 150 + Math.random() * 60) % 360;
              const avoidRad = (state.heading * Math.PI) / 180;
              newLat = currentLat + Math.cos(avoidRad) * state.speed;
              newLon = currentLon + Math.sin(avoidRad) * state.speed;
            }
          }
        }

        nextPositions.set(drone.id, { lat: newLat, lon: newLon });
      });

      // Update ref first (for next tick), then trigger render
      positionsRef.current = nextPositions;
      setPositions(nextPositions);
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  // Merge simulated positions into drone data
  return drones.map((drone) => {
    const pos = positions.get(drone.id);
    if (!pos) return drone;
    return {
      ...drone,
      lat: pos.lat,
      lon: pos.lon,
      // Update heading to match movement direction
      hdg: Math.round(movementRef.current.get(drone.id)?.heading ?? drone.hdg),
    };
  });
}
