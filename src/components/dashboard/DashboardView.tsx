"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import { Plane, Shield } from "lucide-react";
import { activeDrones, REGIONS, type Region } from "@/lib/data/mock-drones";
import { sensors } from "@/lib/data/mock-sensors";
import { useDroneSimulation } from "@/hooks/useDroneSimulation";
import { useGeofences } from "@/hooks/useGeofences";
import { useDashboardEvents } from "@/hooks/useDashboardEvents";
import { pointInPolygon } from "@/lib/geo-utils";
import TopBar from "./TopBar";
import DronePanel from "./DronePanel";
import GeofencePanel from "./GeofencePanel";

type MarkerEntry = {
  droneMarker: mapboxgl.Marker;
  operatorMarker: mapboxgl.Marker;
};

const CONNECTION_LINE_SOURCE = "connection-line-source";
const CONNECTION_LINE_LAYER = "connection-line-layer";

export default function DashboardView() {
  const [mapStyle, setMapStyle] = useState<"satellite" | "standard">("satellite");
  const [region, setRegion] = useState<Region>("washington-dc");
  const [panelOpen, setPanelOpen] = useState(true);
  const [geofencePanelOpen, setGeofencePanelOpen] = useState(true);
  const [selectedDroneId, setSelectedDroneId] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersMapRef = useRef<Map<string, MarkerEntry>>(new Map());
  const sensorMarkersRef = useRef<mapboxgl.Marker[]>([]);
  const prevMapStyleRef = useRef(mapStyle);

  const regionDrones = useMemo(() => activeDrones.filter((d) => d.region === region), [region]);
  const regionSensors = useMemo(() => sensors.filter((s) => s.region === region), [region]);

  // Geofence system (declared before useDroneSimulation so geofences can be passed for avoidance)
  const {
    geofences,
    isDrawing,
    drawingVertices,
    selectedGeofenceId,
    startDrawing,
    addVertex,
    finishDrawing,
    cancelDrawing,
    deleteGeofence,
    focusGeofence,
    selectGeofence,
    reAddLayers,
  } = useGeofences(mapRef, region, mapLoaded);

  // Drone simulation with geofence avoidance
  const simulatedDrones = useDroneSimulation(regionDrones, geofences);

  // Stable refs for values used inside imperative handlers
  const panelOpenRef = useRef(panelOpen);
  panelOpenRef.current = panelOpen;
  const simulatedDronesRef = useRef(simulatedDrones);
  simulatedDronesRef.current = simulatedDrones;
  const isDrawingRef = useRef(isDrawing);
  isDrawingRef.current = isDrawing;
  const addVertexRef = useRef(addVertex);
  addVertexRef.current = addVertex;

  // Breach detection: check drones against geofences each tick
  const { breachingDrones, breachedGeofenceIds } = useMemo(() => {
    const droneSet = new Set<string>();
    const gfSet = new Set<string>();
    simulatedDrones.forEach((drone) => {
      geofences.forEach((gf) => {
        if (pointInPolygon([drone.lon, drone.lat], gf.vertices)) {
          droneSet.add(drone.id);
          gfSet.add(gf.id);
        }
      });
    });
    return { breachingDrones: droneSet, breachedGeofenceIds: gfSet };
  }, [simulatedDrones, geofences]);

  // Event log
  const events = useDashboardEvents(breachingDrones);

  // Create markers for drones in the current region
  const createMarkers = useCallback(
    (map: mapboxgl.Map) => {
      // Clear existing drone markers
      markersMapRef.current.forEach((entry) => {
        entry.droneMarker.remove();
        entry.operatorMarker.remove();
      });
      markersMapRef.current.clear();

      simulatedDronesRef.current.forEach((drone) => {
        // Drone marker -- color based on status (green=active, amber=unknown)
        const isUnknown = drone.status === "unknown";
        const color = isUnknown ? "#f59e0b" : "#00FF94";
        const rgba = isUnknown ? "rgba(245, 158, 11, 0.4)" : "rgba(0, 255, 148, 0.4)";
        const rgbaBorder = isUnknown ? "rgba(245, 158, 11, 0.3)" : "rgba(0, 255, 148, 0.3)";

        const shortModel = drone.model.split(" ").slice(0, 2).join(" ");
        const el = document.createElement("div");
        el.className = "drone-marker";
        el.dataset.droneId = drone.id;
        el.style.cssText = "display: flex; flex-direction: column; align-items: center; pointer-events: auto;";
        el.innerHTML = `
          <div class="drone-dot" style="width: 14px; height: 14px; background: ${color}; border-radius: 50%; border: 2px solid ${color}; position: relative; cursor: pointer; box-shadow: 0 0 10px ${rgba};">
            <div style="position: absolute; inset: -4px; border-radius: 50%; border: 1px solid ${rgbaBorder}; animation: drone-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          </div>
          <div style="margin-top: 4px; font-size: 9px; font-family: monospace; color: white; background: rgba(0,0,0,0.7); padding: 1px 4px; border-radius: 3px; white-space: nowrap; pointer-events: none;">${shortModel}</div>
        `;
        el.addEventListener("click", () => {
          setSelectedDroneId(drone.id);
          if (!panelOpenRef.current) setPanelOpen(true);
        });

        const droneMarker = new mapboxgl.Marker({ element: el })
          .setLngLat([drone.lon, drone.lat])
          .addTo(map);

        // Operator marker -- amber diamond with label
        const opEl = document.createElement("div");
        opEl.style.cssText = "display: flex; flex-direction: column; align-items: center; pointer-events: auto; cursor: pointer;";
        opEl.innerHTML = `
          <div style="width: 14px; height: 14px; background: #f59e0b; border: 2px solid #fbbf24; transform: rotate(45deg); position: relative; box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);">
            <div style="position: absolute; inset: -5px; border: 1px solid rgba(245, 158, 11, 0.3); transform: rotate(0deg);"></div>
          </div>
          <div style="margin-top: 4px; font-size: 9px; font-family: monospace; color: #fbbf24; background: rgba(0,0,0,0.7); padding: 1px 4px; border-radius: 3px; white-space: nowrap; pointer-events: none;">PILOT</div>
        `;
        opEl.addEventListener("click", () => {
          setSelectedDroneId(drone.id);
          if (!panelOpenRef.current) setPanelOpen(true);
        });

        const operatorMarker = new mapboxgl.Marker({ element: opEl })
          .setLngLat([drone.operatorLon, drone.operatorLat])
          .addTo(map);

        markersMapRef.current.set(drone.id, { droneMarker, operatorMarker });
      });
    },
    [] // setSelectedDroneId and setPanelOpen are stable; panelOpenRef is a ref
  );

  // Create sensor markers
  const createSensorMarkers = useCallback(
    (map: mapboxgl.Map) => {
      sensorMarkersRef.current.forEach((m) => m.remove());
      sensorMarkersRef.current = [];

      regionSensors.forEach((sensor) => {
        const el = document.createElement("div");
        el.title = `${sensor.name} (${sensor.model === "full-spectrum" ? "Full Spectrum" : "Scout"}) — ${sensor.status}`;
        const statusColor = sensor.status === "online" ? "#3b82f6" : "#6b7280";
        const statusOpacity = sensor.status === "online" ? "1" : "0.5";
        el.innerHTML = `
          <div style="width: 10px; height: 10px; background: ${statusColor}; opacity: ${statusOpacity}; transform: rotate(45deg); border: 1px solid rgba(59, 130, 246, 0.5); cursor: default;"></div>
        `;

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([sensor.lon, sensor.lat])
          .addTo(map);
        sensorMarkersRef.current.push(marker);
      });
    },
    [regionSensors]
  );

  // Stable refs for callbacks used inside imperative handlers (style change, region change)
  const createMarkersRef = useRef(createMarkers);
  createMarkersRef.current = createMarkers;
  const createSensorMarkersRef = useRef(createSensorMarkers);
  createSensorMarkersRef.current = createSensorMarkers;
  const reAddLayersRef = useRef(reAddLayers);
  reAddLayersRef.current = reAddLayers;

  // Update marker positions and breach colors on each simulation tick
  useEffect(() => {
    simulatedDrones.forEach((drone) => {
      const entry = markersMapRef.current.get(drone.id);
      if (!entry) return;

      entry.droneMarker.setLngLat([drone.lon, drone.lat]);

      // Update marker color if breaching
      const dot = entry.droneMarker.getElement().querySelector<HTMLElement>(".drone-dot");
      if (dot) {
        const isBreach = breachingDrones.has(drone.id);
        if (isBreach) {
          dot.style.background = "#ef4444";
          dot.style.borderColor = "#ef4444";
          dot.style.boxShadow = "0 0 14px rgba(239, 68, 68, 0.6)";
        } else {
          const isUnknown = drone.status === "unknown";
          const c = isUnknown ? "#f59e0b" : "#00FF94";
          const s = isUnknown ? "rgba(245, 158, 11, 0.4)" : "rgba(0, 255, 148, 0.4)";
          dot.style.background = c;
          dot.style.borderColor = c;
          dot.style.boxShadow = `0 0 10px ${s}`;
        }
      }
    });

    // Update connection line for selected drone
    const map = mapRef.current;
    if (map && map.isStyleLoaded()) {
      const selectedDrone = selectedDroneId
        ? simulatedDrones.find((d) => d.id === selectedDroneId)
        : null;

      const lineData: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: selectedDrone
          ? [{
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [selectedDrone.lon, selectedDrone.lat],
                  [selectedDrone.operatorLon, selectedDrone.operatorLat],
                ],
              },
            }]
          : [],
      };

      // Line color matches breach status of selected drone
      const isSelectedBreach = selectedDroneId ? breachingDrones.has(selectedDroneId) : false;
      const lineColor = isSelectedBreach ? "#ef4444" : "#00FF94";
      const lineOpacity = isSelectedBreach ? 0.6 : 0.4;

      if (map.getSource(CONNECTION_LINE_SOURCE)) {
        (map.getSource(CONNECTION_LINE_SOURCE) as mapboxgl.GeoJSONSource).setData(lineData);
        // Update paint to reflect breach status
        if (map.getLayer(CONNECTION_LINE_LAYER)) {
          map.setPaintProperty(CONNECTION_LINE_LAYER, "line-color", lineColor);
          map.setPaintProperty(CONNECTION_LINE_LAYER, "line-opacity", lineOpacity);
        }
      } else {
        map.addSource(CONNECTION_LINE_SOURCE, { type: "geojson", data: lineData });
        map.addLayer({
          id: CONNECTION_LINE_LAYER,
          type: "line",
          source: CONNECTION_LINE_SOURCE,
          paint: {
            "line-color": lineColor,
            "line-width": 1.5,
            "line-opacity": lineOpacity,
            "line-dasharray": [4, 4],
          },
        });
      }
    }
  }, [simulatedDrones, breachingDrones, selectedDroneId]);

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
        // Delay resize by one frame to ensure layout is committed
        requestAnimationFrame(() => map.resize());
        // Layer + marker setup runs immediately in the load handler
        // (style IS loaded here — delaying risks missing the window)
        setMapLoaded(true);
        createMarkers(map);
        createSensorMarkers(map);
        reAddLayersRef.current();
      });

      // Geofence drawing: click on map to add vertex
      map.on("click", (e) => {
        if (isDrawingRef.current) {
          addVertexRef.current([e.lngLat.lng, e.lngLat.lat]);
        }
      });

      map.on("error", (e) => {
        console.error("Mapbox error:", e);
        setMapError(`Map error: ${e.error?.message || "Failed to load map resources"}`);
      });

      return () => {
        markersMapRef.current.forEach((entry) => {
          entry.droneMarker.remove();
          entry.operatorMarker.remove();
        });
        markersMapRef.current.clear();
        sensorMarkersRef.current.forEach((m) => m.remove());
        sensorMarkersRef.current = [];
        mapRef.current = null;
        map.remove();
      };
    } catch (err) {
      setMapError(`Failed to initialize map: ${err instanceof Error ? err.message : String(err)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally run only on mount
  }, []);

  // Handle map style changes — only fires when mapStyle actually changes
  useEffect(() => {
    if (prevMapStyleRef.current === mapStyle) return; // Same style, skip (handles mount + strict mode)
    prevMapStyleRef.current = mapStyle;

    if (!mapRef.current) return;

    const style =
      mapStyle === "satellite"
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/dark-v11";
    mapRef.current.setStyle(style);

    mapRef.current.once("style.load", () => {
      if (mapRef.current) {
        createMarkersRef.current(mapRef.current);
        createSensorMarkersRef.current(mapRef.current);
        reAddLayersRef.current();
      }
    });
  }, [mapStyle]);

  // Recreate markers when region changes (runs after React state has settled)
  const prevRegionRef = useRef(region);
  useEffect(() => {
    if (prevRegionRef.current === region) return;
    prevRegionRef.current = region;
    // Small delay ensures simulatedDronesRef has the new region's drones
    requestAnimationFrame(() => {
      if (mapRef.current) {
        createMarkersRef.current(mapRef.current);
        createSensorMarkersRef.current(mapRef.current);
      }
    });
  }, [region]);

  // Fly to new region when region changes
  const handleRegionChange = useCallback(
    (newRegion: Region) => {
      setRegion(newRegion);
      const regionInfo = REGIONS.find((r) => r.id === newRegion);
      if (regionInfo && mapRef.current) {
        mapRef.current.flyTo({
          center: regionInfo.center,
          zoom: regionInfo.zoom,
          duration: 1500,
        });
      }
      // Select first drone in new region
      const drones = activeDrones.filter((d) => d.region === newRegion);
      setSelectedDroneId(drones[0]?.id ?? null);
    },
    []
  );

  const handleFocusLocation = useCallback((lat: number, lon: number) => {
    mapRef.current?.flyTo({ center: [lon, lat], zoom: 15, duration: 1500 });
  }, []);

  const handleSelectDrone = useCallback(
    (id: string) => {
      setSelectedDroneId((prev) => {
        if (prev === id) return null; // Toggle off
        const drone = simulatedDronesRef.current.find((d) => d.id === id);
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
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#080b12]">
      <TopBar
        mapStyle={mapStyle}
        onStyleChange={setMapStyle}
        region={region}
        onRegionChange={handleRegionChange}
        droneCount={simulatedDrones.length}
        breachCount={breachingDrones.size}
      />
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
          drones={simulatedDrones}
          breachingDrones={breachingDrones}
          events={events}
        />
        <div className="flex-1 relative min-w-0 h-full">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

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

          {/* Toggle buttons when panels are closed */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {!panelOpen && (
              <button
                aria-label="Open drone management panel"
                onClick={() => setPanelOpen(true)}
                className="border rounded-lg px-3 py-2 text-sm transition-colors flex items-center gap-2 bg-[#080b12] border-white/[0.06] text-white hover:bg-white/[0.04]"
              >
                <Plane className="w-4 h-4 text-accent/60 -rotate-45" />
                Drone Management
              </button>
            )}
            {!geofencePanelOpen && (
              <button
                aria-label="Open geofence panel"
                onClick={() => setGeofencePanelOpen(true)}
                className={`border rounded-lg px-3 py-2 text-sm transition-colors flex items-center gap-2 bg-[#080b12] text-white hover:bg-white/[0.04] ${
                  breachedGeofenceIds.size > 0 ? "border-red-500/30" : "border-white/[0.06]"
                }`}
              >
                <Shield className={`w-4 h-4 ${breachedGeofenceIds.size > 0 ? "text-red-400" : "text-accent/60"}`} />
                Geofences
                {geofences.length > 0 && (
                  <span className="text-[10px] font-mono text-white/30">({geofences.length})</span>
                )}
                {breachedGeofenceIds.size > 0 && (
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                )}
              </button>
            )}
          </div>

          {/* Geofence panel overlay */}
          <GeofencePanel
            isOpen={geofencePanelOpen}
            onClose={() => setGeofencePanelOpen(false)}
            geofences={geofences}
            breachedGeofenceIds={breachedGeofenceIds}
            isDrawing={isDrawing}
            drawingVertices={drawingVertices}
            selectedGeofenceId={selectedGeofenceId}
            onStartDrawing={startDrawing}
            onFinishDrawing={finishDrawing}
            onCancelDrawing={cancelDrawing}
            onDeleteGeofence={deleteGeofence}
            onFocusGeofence={focusGeofence}
            onSelectGeofence={selectGeofence}
          />
        </div>
      </div>
    </div>
  );
}
