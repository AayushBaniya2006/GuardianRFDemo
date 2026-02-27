import type { Region } from "./mock-drones";

export type Geofence = {
  id: string;
  name: string;
  vertices: [number, number][]; // [lon, lat] pairs
  color: string;
  region: Region;
};

/** Convert geofences to GeoJSON FeatureCollection for Mapbox layers */
export function geofencesToGeoJSON(
  geofences: Geofence[]
): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: geofences.map((gf) => ({
      type: "Feature" as const,
      properties: {
        id: gf.id,
        name: gf.name,
        color: gf.color,
      },
      geometry: {
        type: "Polygon" as const,
        // GeoJSON polygons require closing the ring (first vertex == last vertex)
        coordinates: [
          gf.vertices.length >= 3
            ? [...gf.vertices, gf.vertices[0]]
            : gf.vertices,
        ],
      },
    })),
  };
}

/** Preset geofences for the DC region */
export const defaultGeofences: Geofence[] = [
  {
    id: "gf-dc-001",
    name: "White House Exclusion Zone",
    vertices: [
      [-77.0405, 38.9005],
      [-77.0335, 38.9005],
      [-77.0335, 38.8945],
      [-77.0405, 38.8945],
    ],
    color: "#ff3b3b",
    region: "washington-dc",
  },
  {
    id: "gf-dc-002",
    name: "Capitol Perimeter",
    vertices: [
      [-77.0145, 38.8935],
      [-77.0065, 38.8935],
      [-77.0065, 38.8870],
      [-77.0145, 38.8870],
    ],
    color: "#ffaa00",
    region: "washington-dc",
  },
];
