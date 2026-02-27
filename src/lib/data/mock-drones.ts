export type Drone = {
  id: string;
  model: string;
  status: "active" | "whitelisted" | "unknown";
  lat: number;
  lon: number;
  alt: number;
  hdg: number;
  spd: number;
  vspd: number;
  operatorLat: number;
  operatorLon: number;
  sensorDist: number;
  operatorSensorDist: number;
  frequency?: string;
  signalStrength?: number;
};

export const activeDrones: Drone[] = [
  {
    id: "1668BE10JA0012345678",
    model: "Skydio X2E SDR21V1/SDR21V2",
    status: "active",
    lat: 38.919457,
    lon: -77.049802,
    alt: 75.4,
    hdg: 188,
    spd: 8.8,
    vspd: 0.3,
    operatorLat: 38.925061,
    operatorLon: -77.042214,
    sensorDist: 2.34,
    operatorSensorDist: 7.34,
    frequency: "2.4 GHz",
    signalStrength: -42,
  },
  {
    id: "2847CF20KB1123456789",
    model: "DJI Mavic 3 Enterprise",
    status: "active",
    lat: 38.8977,
    lon: -77.0365,
    alt: 120.8,
    hdg: 45,
    spd: 5.2,
    vspd: -0.8,
    operatorLat: 38.9012,
    operatorLon: -77.0402,
    sensorDist: 1.87,
    operatorSensorDist: 3.21,
    frequency: "5.8 GHz",
    signalStrength: -38,
  },
  {
    id: "3926DA30LC2234567890",
    model: "Autel EVO II Pro",
    status: "active",
    lat: 38.8895,
    lon: -77.0501,
    alt: 95.2,
    hdg: 270,
    spd: 12.1,
    vspd: 1.5,
    operatorLat: 38.885,
    operatorLon: -77.055,
    sensorDist: 0.92,
    operatorSensorDist: 1.15,
    frequency: "2.4 GHz",
    signalStrength: -55,
  },
];

export type WhitelistedDrone = {
  id: string;
  model: string;
  owner: string;
  note: string;
};

export const whitelistedDrones: WhitelistedDrone[] = [
  { id: "WL-001", model: "DJI M30T", owner: "Metro PD Aviation Unit", note: "Authorized patrol drone" },
  { id: "WL-002", model: "Skydio X10", owner: "USSS Protective Division", note: "Executive protection" },
  { id: "WL-003", model: "DJI Matrice 350", owner: "DC Fire & EMS", note: "Emergency response" },
];
