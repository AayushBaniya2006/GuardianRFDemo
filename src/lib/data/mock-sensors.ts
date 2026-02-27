import type { Region } from "./mock-drones";

export type Sensor = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  model: "scout" | "full-spectrum";
  status: "online" | "offline";
  region: Region;
};

export const sensors: Sensor[] = [
  // Washington, DC
  { id: "SNS-DC-001", name: "Ellipse South", lat: 38.8935, lon: -77.0366, model: "scout", status: "online", region: "washington-dc" },
  { id: "SNS-DC-002", name: "Georgetown Rooftop", lat: 38.9065, lon: -77.0635, model: "scout", status: "online", region: "washington-dc" },
  { id: "SNS-DC-003", name: "Capitol East", lat: 38.8900, lon: -77.0090, model: "full-spectrum", status: "online", region: "washington-dc" },

  // London
  { id: "SNS-LON-001", name: "Westminster Bridge", lat: 51.5007, lon: -0.1222, model: "scout", status: "online", region: "london" },
  { id: "SNS-LON-002", name: "Tower Hill", lat: 51.5100, lon: -0.0760, model: "full-spectrum", status: "online", region: "london" },
  { id: "SNS-LON-003", name: "Regent Park North", lat: 51.5300, lon: -0.1530, model: "scout", status: "offline", region: "london" },

  // Tel Aviv
  { id: "SNS-TLV-001", name: "Azrieli Tower", lat: 32.0745, lon: 34.7920, model: "scout", status: "online", region: "tel-aviv" },
  { id: "SNS-TLV-002", name: "Sarona Market", lat: 32.0715, lon: 34.7870, model: "full-spectrum", status: "online", region: "tel-aviv" },

  // Seoul
  { id: "SNS-SEL-001", name: "Namsan Tower", lat: 37.5512, lon: 126.9882, model: "scout", status: "online", region: "seoul" },
  { id: "SNS-SEL-002", name: "Gwanghwamun Gate", lat: 37.5760, lon: 126.9770, model: "full-spectrum", status: "online", region: "seoul" },

  // Sydney
  { id: "SNS-SYD-001", name: "Harbour Bridge", lat: -33.8523, lon: 151.2108, model: "scout", status: "online", region: "sydney" },
  { id: "SNS-SYD-002", name: "Darling Harbour", lat: -33.8700, lon: 151.2010, model: "full-spectrum", status: "online", region: "sydney" },

  // Dubai
  { id: "SNS-DXB-001", name: "Marina Walk", lat: 25.0800, lon: 55.1400, model: "scout", status: "online", region: "dubai" },
  { id: "SNS-DXB-002", name: "Downtown Tower", lat: 25.1970, lon: 55.2740, model: "full-spectrum", status: "online", region: "dubai" },

  // Berlin
  { id: "SNS-BER-001", name: "Brandenburg Gate", lat: 52.5163, lon: 13.3777, model: "scout", status: "online", region: "berlin" },
  { id: "SNS-BER-002", name: "Alexanderplatz", lat: 52.5219, lon: 13.4133, model: "full-spectrum", status: "online", region: "berlin" },

  // Tokyo
  { id: "SNS-TYO-001", name: "Shibuya Station", lat: 35.6580, lon: 139.7016, model: "scout", status: "online", region: "tokyo" },
  { id: "SNS-TYO-002", name: "Imperial Palace East", lat: 35.6852, lon: 139.7528, model: "full-spectrum", status: "online", region: "tokyo" },
];
