"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import type { Geofence } from "@/lib/data/mock-geofences";
import { geofencesToGeoJSON, defaultGeofences } from "@/lib/data/mock-geofences";
import type { Region } from "@/lib/data/mock-drones";

const GEOFENCE_SOURCE = "geofences-source";
const GEOFENCE_FILL_LAYER = "geofences-fill";
const GEOFENCE_LINE_LAYER = "geofences-line";
const DRAWING_SOURCE = "drawing-source";
const DRAWING_LINE_LAYER = "drawing-line";
const DRAWING_POINTS_SOURCE = "drawing-points-source";
const DRAWING_POINTS_LAYER = "drawing-points";
const VERTEX_HANDLES_SOURCE = "vertex-handles-source";
const VERTEX_HANDLES_LAYER = "vertex-handles";

/** Helper: build fill/line paint accounting for an optional selected geofence.
 *  Returns values typed for both addLayer paint and setPaintProperty. */
function buildSelectionPaint(selId: string | null) {
  type Expr = mapboxgl.Expression;
  return {
    fillColor: (selId
      ? ["case", ["==", ["get", "id"], selId], "#d1d5db", ["get", "color"]]
      : ["get", "color"]) as Expr,
    fillOpacity: (selId
      ? ["case", ["==", ["get", "id"], selId], 0.55, 0.4]
      : 0.4) as unknown as Expr,
    lineColor: (selId
      ? ["case", ["==", ["get", "id"], selId], "#d1d5db", ["get", "color"]]
      : ["get", "color"]) as Expr,
    lineWidth: (selId
      ? ["case", ["==", ["get", "id"], selId], 3.5, 2.5]
      : 2.5) as unknown as Expr,
  };
}

export function useGeofences(
  mapRef: React.RefObject<mapboxgl.Map | null>,
  region: Region | "all",
  mapLoaded: boolean
) {
  const [geofences, setGeofences] = useState<Geofence[]>(defaultGeofences);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingVertices, setDrawingVertices] = useState<[number, number][]>([]);
  const [selectedGeofenceId, setSelectedGeofenceId] = useState<string | null>(null);
  const layersAddedRef = useRef(false);
  const geofenceCounterRef = useRef(100);

  // Refs for event handler access (avoid stale closures)
  const selectedGeofenceIdRef = useRef(selectedGeofenceId);
  selectedGeofenceIdRef.current = selectedGeofenceId;
  const geofencesRef = useRef(geofences);
  geofencesRef.current = geofences;
  const isDrawingLocalRef = useRef(isDrawing);
  isDrawingLocalRef.current = isDrawing;

  // Drag state refs (imperative — updated during mousemove without React re-renders)
  const isDraggingVertexRef = useRef(false);
  const dragVertexIndexRef = useRef<number | null>(null);
  const dragVerticesRef = useRef<[number, number][] | null>(null);

  // Handler registration tracking (persist across style changes)
  const clickHandlerRegisteredRef = useRef(false);
  const dragHandlerRegisteredRef = useRef(false);

  // Memoize to keep downstream callbacks stable (prevents unnecessary setStyle calls)
  const regionGeofences = useMemo(
    () => (region === "all" ? geofences : geofences.filter((gf) => gf.region === region)),
    [region, geofences]
  );

  const regionGeofencesRef = useRef(regionGeofences);
  regionGeofencesRef.current = regionGeofences;

  // ──────────────────────────────────────────────
  // Apply selection paint to existing layers
  // ──────────────────────────────────────────────
  const applySelectionPaint = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer(GEOFENCE_FILL_LAYER)) return;
    const p = buildSelectionPaint(selectedGeofenceIdRef.current);
    map.setPaintProperty(GEOFENCE_FILL_LAYER, "fill-color", p.fillColor as unknown as string);
    map.setPaintProperty(GEOFENCE_FILL_LAYER, "fill-opacity", p.fillOpacity as unknown as number);
    map.setPaintProperty(GEOFENCE_LINE_LAYER, "line-color", p.lineColor as unknown as string);
    map.setPaintProperty(GEOFENCE_LINE_LAYER, "line-width", p.lineWidth as unknown as number);
  }, [mapRef]);

  // ──────────────────────────────────────────────
  // Geofence polygon layers
  // ──────────────────────────────────────────────
  const updateMapLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // If style isn't loaded yet, retry when it becomes idle
    if (!map.isStyleLoaded()) {
      map.once("idle", () => updateMapLayers());
      return;
    }

    const geoJSON = geofencesToGeoJSON(regionGeofences);

    const sourceExists = !!map.getSource(GEOFENCE_SOURCE);
    const fillLayerExists = !!map.getLayer(GEOFENCE_FILL_LAYER);
    const lineLayerExists = !!map.getLayer(GEOFENCE_LINE_LAYER);

    if (sourceExists && fillLayerExists && lineLayerExists) {
      // Source + layers exist — just update data
      (map.getSource(GEOFENCE_SOURCE) as mapboxgl.GeoJSONSource).setData(geoJSON);
    } else {
      // Clean up partial state: remove orphaned layers/source
      if (lineLayerExists) map.removeLayer(GEOFENCE_LINE_LAYER);
      if (fillLayerExists) map.removeLayer(GEOFENCE_FILL_LAYER);
      if (sourceExists) map.removeSource(GEOFENCE_SOURCE);

      // Build paint with current selection so freshly-created layers are correct
      const p = buildSelectionPaint(selectedGeofenceIdRef.current);

      map.addSource(GEOFENCE_SOURCE, { type: "geojson", data: geoJSON });
      map.addLayer({
        id: GEOFENCE_FILL_LAYER,
        type: "fill",
        source: GEOFENCE_SOURCE,
        paint: {
          "fill-color": p.fillColor,
          "fill-opacity": p.fillOpacity,
        } as Record<string, unknown>,
      });
      map.addLayer({
        id: GEOFENCE_LINE_LAYER,
        type: "line",
        source: GEOFENCE_SOURCE,
        paint: {
          "line-color": p.lineColor,
          "line-width": p.lineWidth,
          "line-opacity": 1,
        } as Record<string, unknown>,
      });
      layersAddedRef.current = true;
    }

    // Register geofence interaction handlers (once, persist across style changes)
    if (!clickHandlerRegisteredRef.current && layersAddedRef.current) {
      // Click on geofence fill to select
      map.on("click", GEOFENCE_FILL_LAYER, (e) => {
        if (isDrawingLocalRef.current || isDraggingVertexRef.current) return;
        // Don't toggle if click was on a vertex handle
        if (map.getLayer(VERTEX_HANDLES_LAYER)) {
          const vFeats = map.queryRenderedFeatures(e.point, { layers: [VERTEX_HANDLES_LAYER] });
          if (vFeats.length > 0) return;
        }
        const feature = e.features?.[0];
        const id = feature?.properties?.id;
        if (id) setSelectedGeofenceId(id);
      });

      // Cursor on geofence hover
      map.on("mouseenter", GEOFENCE_FILL_LAYER, () => {
        if (!isDrawingLocalRef.current && !isDraggingVertexRef.current) {
          map.getCanvas().style.cursor = "pointer";
        }
      });
      map.on("mouseleave", GEOFENCE_FILL_LAYER, () => {
        if (!isDraggingVertexRef.current) {
          map.getCanvas().style.cursor = "";
        }
      });

      // Click outside geofences to deselect
      map.on("click", (e) => {
        if (isDrawingLocalRef.current || !selectedGeofenceIdRef.current || isDraggingVertexRef.current) return;
        const checkLayers: string[] = [];
        if (map.getLayer(GEOFENCE_FILL_LAYER)) checkLayers.push(GEOFENCE_FILL_LAYER);
        if (map.getLayer(VERTEX_HANDLES_LAYER)) checkLayers.push(VERTEX_HANDLES_LAYER);
        if (checkLayers.length === 0) return;
        const features = map.queryRenderedFeatures(e.point, { layers: checkLayers });
        if (features.length === 0) setSelectedGeofenceId(null);
      });

      clickHandlerRegisteredRef.current = true;
    }
  }, [mapRef, regionGeofences]);

  // ──────────────────────────────────────────────
  // Selection paint effect — runs when selection changes
  // ──────────────────────────────────────────────
  useEffect(() => {
    applySelectionPaint();
  }, [applySelectionPaint, selectedGeofenceId]);

  // ──────────────────────────────────────────────
  // Vertex handles for selected geofence
  // ──────────────────────────────────────────────
  const updateVertexHandles = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    // If nothing selected, clear vertex handles
    if (!selectedGeofenceId) {
      if (map.getSource(VERTEX_HANDLES_SOURCE)) {
        const empty: GeoJSON.FeatureCollection = { type: "FeatureCollection", features: [] };
        (map.getSource(VERTEX_HANDLES_SOURCE) as mapboxgl.GeoJSONSource).setData(empty);
      }
      return;
    }

    const selectedGf = regionGeofences.find((gf) => gf.id === selectedGeofenceId);
    if (!selectedGf) return;

    const pointsGeoJSON: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: selectedGf.vertices.map((v, i) => ({
        type: "Feature" as const,
        properties: { index: i, geofenceId: selectedGf.id },
        geometry: { type: "Point" as const, coordinates: v },
      })),
    };

    if (map.getSource(VERTEX_HANDLES_SOURCE)) {
      (map.getSource(VERTEX_HANDLES_SOURCE) as mapboxgl.GeoJSONSource).setData(pointsGeoJSON);
    } else {
      map.addSource(VERTEX_HANDLES_SOURCE, { type: "geojson", data: pointsGeoJSON });
      map.addLayer({
        id: VERTEX_HANDLES_LAYER,
        type: "circle",
        source: VERTEX_HANDLES_SOURCE,
        paint: {
          "circle-radius": 7,
          "circle-color": "#ffffff",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#9ca3af",
        },
      });
    }

    // Register drag handlers (once, persist across style changes)
    if (!dragHandlerRegisteredRef.current && map.getLayer(VERTEX_HANDLES_LAYER)) {
      // Mousedown on vertex → start drag
      map.on("mousedown", VERTEX_HANDLES_LAYER, (e) => {
        if (isDrawingLocalRef.current) return;
        const feature = e.features?.[0];
        if (!feature) return;

        e.preventDefault();
        isDraggingVertexRef.current = true;
        // Mapbox serializes GeoJSON properties to strings — parse back to number
        const rawIndex = feature.properties?.index;
        dragVertexIndexRef.current = rawIndex != null ? Number(rawIndex) : null;

        // Snapshot current vertices for imperative updates during drag
        const gf = geofencesRef.current.find((g) => g.id === selectedGeofenceIdRef.current);
        if (gf) dragVerticesRef.current = gf.vertices.map((v) => [...v] as [number, number]);

        map.getCanvas().style.cursor = "grabbing";
        map.dragPan.disable();
      });

      // Mousemove → update vertex position imperatively (no React state for performance)
      map.on("mousemove", (e: mapboxgl.MapMouseEvent) => {
        if (!isDraggingVertexRef.current || dragVertexIndexRef.current === null || !dragVerticesRef.current) return;

        const idx = dragVertexIndexRef.current;
        dragVerticesRef.current[idx] = [e.lngLat.lng, e.lngLat.lat];

        // Update vertex handles source directly
        const pts: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: dragVerticesRef.current.map((v, i) => ({
            type: "Feature" as const,
            properties: { index: i },
            geometry: { type: "Point" as const, coordinates: v },
          })),
        };
        const hSrc = map.getSource(VERTEX_HANDLES_SOURCE) as mapboxgl.GeoJSONSource;
        if (hSrc) hSrc.setData(pts);

        // Update geofence polygon source directly
        const updated = regionGeofencesRef.current.map((gf) => {
          if (gf.id !== selectedGeofenceIdRef.current) return gf;
          return { ...gf, vertices: dragVerticesRef.current!.map((v) => [...v] as [number, number]) };
        });
        const geoJSON = geofencesToGeoJSON(updated);
        const gfSrc = map.getSource(GEOFENCE_SOURCE) as mapboxgl.GeoJSONSource;
        if (gfSrc) gfSrc.setData(geoJSON);
      });

      // Mouseup → commit final position to React state
      map.on("mouseup", () => {
        if (!isDraggingVertexRef.current) return;

        const finalVertices = dragVerticesRef.current;
        const selectedId = selectedGeofenceIdRef.current;

        isDraggingVertexRef.current = false;
        dragVertexIndexRef.current = null;
        dragVerticesRef.current = null;
        map.getCanvas().style.cursor = "";
        map.dragPan.enable();

        if (finalVertices && selectedId) {
          setGeofences((prev) =>
            prev.map((gf) => {
              if (gf.id !== selectedId) return gf;
              return { ...gf, vertices: finalVertices };
            })
          );
        }
      });

      // Cursor hints on vertex hover
      map.on("mouseenter", VERTEX_HANDLES_LAYER, () => {
        if (!isDraggingVertexRef.current) map.getCanvas().style.cursor = "grab";
      });
      map.on("mouseleave", VERTEX_HANDLES_LAYER, () => {
        if (!isDraggingVertexRef.current) map.getCanvas().style.cursor = "";
      });

      dragHandlerRegisteredRef.current = true;
    }
  }, [mapRef, selectedGeofenceId, regionGeofences]);

  // ──────────────────────────────────────────────
  // Drawing layers (in-progress polygon)
  // ──────────────────────────────────────────────
  const updateDrawingLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const lineGeoJSON: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: drawingVertices.length >= 2
        ? [{
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: drawingVertices,
            },
          }]
        : [],
    };

    if (map.getSource(DRAWING_SOURCE)) {
      (map.getSource(DRAWING_SOURCE) as mapboxgl.GeoJSONSource).setData(lineGeoJSON);
    } else {
      map.addSource(DRAWING_SOURCE, { type: "geojson", data: lineGeoJSON });
      map.addLayer({
        id: DRAWING_LINE_LAYER,
        type: "line",
        source: DRAWING_SOURCE,
        paint: {
          "line-color": "#00FF94",
          "line-width": 2,
          "line-dasharray": [3, 2],
        },
      });
    }

    const pointsGeoJSON: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: drawingVertices.map((v) => ({
        type: "Feature" as const,
        properties: {},
        geometry: { type: "Point" as const, coordinates: v },
      })),
    };

    if (map.getSource(DRAWING_POINTS_SOURCE)) {
      (map.getSource(DRAWING_POINTS_SOURCE) as mapboxgl.GeoJSONSource).setData(pointsGeoJSON);
    } else {
      map.addSource(DRAWING_POINTS_SOURCE, { type: "geojson", data: pointsGeoJSON });
      map.addLayer({
        id: DRAWING_POINTS_LAYER,
        type: "circle",
        source: DRAWING_POINTS_SOURCE,
        paint: {
          "circle-radius": 5,
          "circle-color": "#00FF94",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
    }
  }, [mapRef, drawingVertices]);

  // ──────────────────────────────────────────────
  // Re-add layers after style changes
  // ──────────────────────────────────────────────
  const reAddLayers = useCallback(() => {
    layersAddedRef.current = false;
    // Don't reset click/drag handler refs — they survive style changes
    updateMapLayers();
    if (isDrawing) updateDrawingLayers();
    updateVertexHandles();
    // Re-apply selection paint since freshly-created layers already have it,
    // but call it anyway for safety
    applySelectionPaint();
  }, [updateMapLayers, updateDrawingLayers, isDrawing, updateVertexHandles, applySelectionPaint]);

  // Sync layers when dependencies change (mapLoaded ensures retry after map init)
  useEffect(() => {
    if (mapLoaded) updateMapLayers();
  }, [updateMapLayers, mapLoaded]);

  useEffect(() => {
    if (isDrawing) updateDrawingLayers();
  }, [isDrawing, updateDrawingLayers]);

  useEffect(() => {
    updateVertexHandles();
  }, [updateVertexHandles]);

  // ──────────────────────────────────────────────
  // CRUD operations
  // ──────────────────────────────────────────────
  const startDrawing = useCallback(() => {
    setIsDrawing(true);
    setDrawingVertices([]);
    setSelectedGeofenceId(null);
  }, []);

  const addVertex = useCallback((lngLat: [number, number]) => {
    setDrawingVertices((prev) => [...prev, lngLat]);
  }, []);

  const finishDrawing = useCallback(
    (name: string) => {
      if (drawingVertices.length < 3) return;

      const colors = ["#ff3b3b", "#ffaa00", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];
      const newGeofence: Geofence = {
        id: `gf-user-${++geofenceCounterRef.current}`,
        name,
        vertices: drawingVertices,
        color: colors[geofences.length % colors.length],
        region: region === "all" ? "washington-dc" : region,
      };

      setGeofences((prev) => [...prev, newGeofence]);
      setIsDrawing(false);
      setDrawingVertices([]);

      const map = mapRef.current;
      if (map) {
        // Clear drawing layers
        const empty: GeoJSON.FeatureCollection = { type: "FeatureCollection", features: [] };
        if (map.getSource(DRAWING_SOURCE)) {
          (map.getSource(DRAWING_SOURCE) as mapboxgl.GeoJSONSource).setData(empty);
        }
        if (map.getSource(DRAWING_POINTS_SOURCE)) {
          (map.getSource(DRAWING_POINTS_SOURCE) as mapboxgl.GeoJSONSource).setData(empty);
        }

        // Immediately update geofence source — don't wait for React effect chain
        const allGeofences = [...geofencesRef.current, newGeofence];
        const regionGfs = region === "all" ? allGeofences : allGeofences.filter((gf) => gf.region === region);
        const geoJSON = geofencesToGeoJSON(regionGfs);
        if (map.getSource(GEOFENCE_SOURCE) && map.getLayer(GEOFENCE_FILL_LAYER)) {
          (map.getSource(GEOFENCE_SOURCE) as mapboxgl.GeoJSONSource).setData(geoJSON);
        }
      }
    },
    [drawingVertices, geofences.length, region, mapRef]
  );

  const cancelDrawing = useCallback(() => {
    setIsDrawing(false);
    setDrawingVertices([]);

    const map = mapRef.current;
    if (map) {
      const empty: GeoJSON.FeatureCollection = { type: "FeatureCollection", features: [] };
      if (map.getSource(DRAWING_SOURCE)) {
        (map.getSource(DRAWING_SOURCE) as mapboxgl.GeoJSONSource).setData(empty);
      }
      if (map.getSource(DRAWING_POINTS_SOURCE)) {
        (map.getSource(DRAWING_POINTS_SOURCE) as mapboxgl.GeoJSONSource).setData(empty);
      }
    }
  }, [mapRef]);

  const deleteGeofence = useCallback(
    (id: string) => {
      setGeofences((prev) => prev.filter((gf) => gf.id !== id));
      setSelectedGeofenceId((prev) => (prev === id ? null : prev));
    },
    []
  );

  const focusGeofence = useCallback(
    (id: string) => {
      const gf = geofencesRef.current.find((g) => g.id === id);
      if (!gf || !mapRef.current || gf.vertices.length === 0) return;

      const bounds = new mapboxgl.LngLatBounds(gf.vertices[0], gf.vertices[0]);
      gf.vertices.forEach((v) => bounds.extend(v));
      mapRef.current.fitBounds(bounds, { padding: 80, duration: 1000 });
    },
    [mapRef]
  );

  const selectGeofence = useCallback((id: string | null) => {
    setSelectedGeofenceId(id);
  }, []);

  return {
    geofences: regionGeofences,
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
  };
}
