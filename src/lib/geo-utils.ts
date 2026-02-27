/** Haversine distance between two points in meters */
export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Ray-casting point-in-polygon test. Polygon is array of [lon, lat] pairs. */
export function pointInPolygon(
  point: [number, number],
  polygon: [number, number][]
): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/** Polygon area in square meters using Shoelace formula (approximation for small areas) */
export function polygonArea(vertices: [number, number][]): number {
  if (vertices.length < 3) return 0;
  const toRad = (d: number) => (d * Math.PI) / 180;
  // Convert to approximate meters from center
  const centerLat = vertices.reduce((s, v) => s + v[1], 0) / vertices.length;
  const mPerDegLat = 111320;
  const mPerDegLon = 111320 * Math.cos(toRad(centerLat));

  const pts = vertices.map(([lon, lat]) => [lon * mPerDegLon, lat * mPerDegLat] as const);
  let area = 0;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    area += pts[j][0] * pts[i][1] - pts[i][0] * pts[j][1];
  }
  return Math.abs(area) / 2;
}
