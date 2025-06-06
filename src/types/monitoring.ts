
export interface SensorData {
  id: string;
  deviceId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
    altitude?: number;
  };
  seismic: {
    x: number;
    y: number;
    z: number;
    magnitude: number;
  };
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'ACTIVE' | 'INACTIVE' | 'ALERT';
}

export interface AlertData {
  id: string;
  sensorId: string;
  type: 'SEISMIC_ACTIVITY' | 'GPS_ANOMALY' | 'SYSTEM_ERROR';
  severity: 'INFO' | 'WARNING' | 'DANGER' | 'CRITICAL';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface VolcanicEvent {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  lastActivity: Date;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  activeSensors: number;
  recentAlerts: number;
}
