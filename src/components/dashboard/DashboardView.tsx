"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Plane } from "lucide-react";
import { activeDrones } from "@/lib/data/mock-drones";
import TopBar from "./TopBar";
import DronePanel from "./DronePanel";

export default function DashboardView() {
  const [mapStyle, setMapStyle] = useState<"satellite" | "standard">("satellite");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [panelOpen, setPanelOpen] = useState(true);
  const [selectedDroneId, setSelectedDroneId] = useState<string | null>(
    activeDrones[0]?.id ?? null
  );
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const isInitialMount = useRef(true);

  // Stable refs for state values used inside marker click handlers
  const panelOpenRef = useRef(panelOpen);
  panelOpenRef.current = panelOpen;

  const addDroneMarkers = useCallback(
    (map: mapboxgl.Map) => {
      // Clear existing markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      activeDrones.forEach((drone) => {
        // Drone marker -- green pulsing dot
        const el = document.createElement("div");
        el.className = "drone-marker";
        el.innerHTML = `
          <div style="width: 14px; height: 14px; background: #00FF94; border-radius: 50%; border: 2px solid #00FF94; position: relative; cursor: pointer; box-shadow: 0 0 10px rgba(0, 255, 148, 0.4);">
            <div style="position: absolute; inset: -4px; border-radius: 50%; border: 1px solid rgba(0, 255, 148, 0.3); animation: drone-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          </div>
        `;
        el.addEventListener("click", () => {
          setSelectedDroneId(drone.id);
          if (!panelOpenRef.current) setPanelOpen(true);
        });

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([drone.lon, drone.lat])
          .addTo(map);
        markersRef.current.push(marker);

        // Operator marker -- smaller amber dot (clickable)
        const opEl = document.createElement("div");
        opEl.style.cursor = "pointer";
        opEl.innerHTML = `<div style="width: 8px; height: 8px; background: #f59e0b; border-radius: 50%; border: 1px solid #fbbf24; opacity: 0.7;"></div>`;
        opEl.addEventListener("click", () => {
          setSelectedDroneId(drone.id);
          if (!panelOpenRef.current) setPanelOpen(true);
        });

        const opMarker = new mapboxgl.Marker({ element: opEl })
          .setLngLat([drone.operatorLon, drone.operatorLat])
          .addTo(map);
        markersRef.current.push(opMarker);
      });
    },
    [] // setSelectedDroneId and setPanelOpen are stable; panelOpenRef is a ref; activeDrones is a module constant
  );

  // Initialize map on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setMapError("Mapbox token is missing. Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local");
      return;
    }
    mapboxgl.accessToken = token;

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style:
          mapStyle === "satellite"
            ? "mapbox://styles/mapbox/satellite-streets-v12"
            : "mapbox://styles/mapbox/dark-v11",
        center: [-77.0369, 38.9072],
        zoom: 12,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.addControl(new mapboxgl.ScaleControl(), "bottom-right");

      mapRef.current = map;

      map.on("load", () => {
        map.resize();
        setMapLoaded(true);
        addDroneMarkers(map);
      });

      map.on("error", (e) => {
        console.error("Mapbox error:", e);
        setMapError(`Map error: ${e.error?.message || "Failed to load map resources"}`);
      });

      return () => {
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
        mapRef.current = null;
        map.remove();
      };
    } catch (err) {
      setMapError(`Failed to initialize map: ${err instanceof Error ? err.message : String(err)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally run only on mount
  }, []);

  // Handle map style changes (skip initial render)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!mapRef.current) return;

    const style =
      mapStyle === "satellite"
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/dark-v11";
    mapRef.current.setStyle(style);

    mapRef.current.once("style.load", () => {
      if (mapRef.current) {
        addDroneMarkers(mapRef.current);
      }
    });
  }, [mapStyle, addDroneMarkers]);

  const handleFocusLocation = useCallback((lat: number, lon: number) => {
    mapRef.current?.flyTo({ center: [lon, lat], zoom: 15, duration: 1500 });
  }, []);

  const handleSelectDrone = useCallback(
    (id: string) => {
      setSelectedDroneId((prev) => {
        if (prev === id) return null; // Toggle off
        const drone = activeDrones.find((d) => d.id === id);
        if (drone) {
          mapRef.current?.flyTo({
            center: [drone.lon, drone.lat],
            zoom: 14,
            duration: 1000,
          });
        }
        return id;
      });
    },
    []
  );

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col ${theme === "light" ? "bg-[#f0f1f3]" : "bg-[#080b12]"}`}>
      <TopBar mapStyle={mapStyle} onStyleChange={setMapStyle} theme={theme} onThemeChange={setTheme} />
      <div className="flex-1 flex relative overflow-hidden min-h-0">
        {/* Mobile backdrop when panel is open */}
        {panelOpen && (
          <div
            className="absolute inset-0 bg-black/50 z-10 sm:hidden"
            onClick={() => setPanelOpen(false)}
          />
        )}
        <DronePanel
          isOpen={panelOpen}
          onClose={() => setPanelOpen(false)}
          selectedDroneId={selectedDroneId}
          onSelectDrone={handleSelectDrone}
          onFocusDrone={handleFocusLocation}
          theme={theme}
        />
        <div className="flex-1 relative" style={{ minWidth: 0 }}>
          <div ref={mapContainerRef} className="absolute inset-0" style={{ width: "100%", height: "100%" }} />

          {/* Loading overlay */}
          {!mapLoaded && !mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#080b12] z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                <span className="text-white/40 text-xs font-mono">Initializing map...</span>
              </div>
            </div>
          )}

          {/* Error overlay */}
          {mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#080b12] z-10">
              <div className="text-center max-w-md px-6">
                <div className="text-red-400 text-sm font-mono mb-2">Map Error</div>
                <div className="text-white/50 text-xs">{mapError}</div>
              </div>
            </div>
          )}

          {!panelOpen && (
            <button
              aria-label="Open drone management panel"
              onClick={() => setPanelOpen(true)}
              className={`absolute top-4 left-4 z-10 border rounded-lg px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                theme === "light"
                  ? "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                  : "bg-[#080b12] border-white/[0.06] text-white hover:bg-white/[0.04]"
              }`}
            >
              <Plane className="w-4 h-4 text-accent/60 -rotate-45" />
              Drone Management
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
