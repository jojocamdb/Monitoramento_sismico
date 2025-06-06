
export interface SensorData {
  id: string;
  deviceId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
    altitude?: number;
    country: string;
    region: string;
  };
  seismic: {
    x: number;
    y: number;
    z: number;
    magnitude: number;
    depth: number; // profundidade em km
  };
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'ACTIVE' | 'INACTIVE' | 'ALERT';
}

export interface AlertData {
  id: string;
  sensorId: string;
  type: 'EARTHQUAKE' | 'TREMOR' | 'AFTERSHOCK' | 'SYSTEM_ERROR';
  severity: 'INFO' | 'WARNING' | 'DANGER' | 'CRITICAL';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  location: {
    latitude: number;
    longitude: number;
    country: string;
    region: string;
  };
  magnitude: number;
  depth: number;
}

export interface EarthquakeEvent {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    country: string;
    region: string;
  };
  lastActivity: Date;
  magnitude: number;
  depth: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  activeSensors: number;
  recentAlerts: number;
  affectedPopulation?: number;
}
