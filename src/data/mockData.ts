
import { SensorData, AlertData, EarthquakeEvent } from '../types/monitoring';

// Dados simulados de sensores sísmicos globais
export const mockSensorData: SensorData[] = [
  {
    id: '1',
    deviceId: 'ESP32-JPN-001',
    timestamp: new Date(),
    location: { 
      latitude: 35.6762, 
      longitude: 139.6503, 
      country: 'Japão', 
      region: 'Tóquio' 
    },
    seismic: { x: 0.02, y: 0.01, z: 0.98, magnitude: 2.1, depth: 15 },
    riskLevel: 'MEDIUM',
    status: 'ALERT'
  },
  {
    id: '2',
    deviceId: 'ESP32-USA-002',
    timestamp: new Date(Date.now() - 30000),
    location: { 
      latitude: 37.7749, 
      longitude: -122.4194, 
      country: 'EUA', 
      region: 'São Francisco' 
    },
    seismic: { x: 0.45, y: 0.32, z: 1.15, magnitude: 3.2, depth: 8 },
    riskLevel: 'HIGH',
    status: 'ALERT'
  },
  {
    id: '3',
    deviceId: 'ESP32-CHL-003',
    timestamp: new Date(Date.now() - 60000),
    location: { 
      latitude: -33.4489, 
      longitude: -70.6693, 
      country: 'Chile', 
      region: 'Santiago' 
    },
    seismic: { x: 0.78, y: 0.65, z: 1.45, magnitude: 4.1, depth: 25 },
    riskLevel: 'CRITICAL',
    status: 'ALERT'
  },
  {
    id: '4',
    deviceId: 'ESP32-TUR-004',
    timestamp: new Date(Date.now() - 120000),
    location: { 
      latitude: 41.0082, 
      longitude: 28.9784, 
      country: 'Turquia', 
      region: 'Istambul' 
    },
    seismic: { x: 0.15, y: 0.08, z: 1.02, magnitude: 1.8, depth: 12 },
    riskLevel: 'LOW',
    status: 'ACTIVE'
  },
  {
    id: '5',
    deviceId: 'ESP32-ITA-005',
    timestamp: new Date(Date.now() - 180000),
    location: { 
      latitude: 40.8518, 
      longitude: 14.2681, 
      country: 'Itália', 
      region: 'Nápoles' 
    },
    seismic: { x: 0.25, y: 0.18, z: 1.08, magnitude: 2.5, depth: 18 },
    riskLevel: 'MEDIUM',
    status: 'ALERT'
  },
  {
    id: '6',
    deviceId: 'ESP32-IDN-006',
    timestamp: new Date(Date.now() - 240000),
    location: { 
      latitude: -6.2088, 
      longitude: 106.8456, 
      country: 'Indonésia', 
      region: 'Jacarta' 
    },
    seismic: { x: 0.12, y: 0.09, z: 0.99, magnitude: 1.9, depth: 22 },
    riskLevel: 'LOW',
    status: 'ACTIVE'
  }
];

export const mockAlerts: AlertData[] = [
  {
    id: 'alert-1',
    sensorId: '3',
    type: 'EARTHQUAKE',
    severity: 'CRITICAL',
    message: 'Terremoto de magnitude 4.1 detectado - Possível tremor principal',
    timestamp: new Date(Date.now() - 60000),
    acknowledged: false,
    location: { 
      latitude: -33.4489, 
      longitude: -70.6693, 
      country: 'Chile', 
      region: 'Santiago' 
    },
    magnitude: 4.1,
    depth: 25
  },
  {
    id: 'alert-2',
    sensorId: '2',
    type: 'EARTHQUAKE',
    severity: 'DANGER',
    message: 'Atividade sísmica significativa - Magnitude 3.2',
    timestamp: new Date(Date.now() - 30000),
    acknowledged: false,
    location: { 
      latitude: 37.7749, 
      longitude: -122.4194, 
      country: 'EUA', 
      region: 'São Francisco' 
    },
    magnitude: 3.2,
    depth: 8
  },
  {
    id: 'alert-3',
    sensorId: '5',
    type: 'TREMOR',
    severity: 'WARNING',
    message: 'Tremor moderado detectado - Magnitude 2.5',
    timestamp: new Date(Date.now() - 180000),
    acknowledged: false,
    location: { 
      latitude: 40.8518, 
      longitude: 14.2681, 
      country: 'Itália', 
      region: 'Nápoles' 
    },
    magnitude: 2.5,
    depth: 18
  },
  {
    id: 'alert-4',
    sensorId: '1',
    type: 'AFTERSHOCK',
    severity: 'INFO',
    message: 'Réplica detectada - Magnitude 2.1',
    timestamp: new Date(Date.now() - 300000),
    acknowledged: true,
    location: { 
      latitude: 35.6762, 
      longitude: 139.6503, 
      country: 'Japão', 
      region: 'Tóquio' 
    },
    magnitude: 2.1,
    depth: 15
  }
];

export const mockEarthquakeEvents: EarthquakeEvent[] = [
  {
    id: 'eq-1',
    name: 'Anel de Fogo do Pacífico - Japão',
    location: { 
      latitude: 35.6762, 
      longitude: 139.6503, 
      country: 'Japão', 
      region: 'Tóquio' 
    },
    lastActivity: new Date(Date.now() - 3600000),
    magnitude: 2.1,
    depth: 15,
    riskLevel: 'MEDIUM',
    activeSensors: 8,
    recentAlerts: 3,
    affectedPopulation: 13960000
  },
  {
    id: 'eq-2',
    name: 'Falha de San Andreas - Califórnia',
    location: { 
      latitude: 37.7749, 
      longitude: -122.4194, 
      country: 'EUA', 
      region: 'São Francisco' 
    },
    lastActivity: new Date(Date.now() - 30000),
    magnitude: 3.2,
    depth: 8,
    riskLevel: 'HIGH',
    activeSensors: 12,
    recentAlerts: 5,
    affectedPopulation: 884000
  },
  {
    id: 'eq-3',
    name: 'Cordilheira dos Andes - Chile',
    location: { 
      latitude: -33.4489, 
      longitude: -70.6693, 
      country: 'Chile', 
      region: 'Santiago' 
    },
    lastActivity: new Date(Date.now() - 60000),
    magnitude: 4.1,
    depth: 25,
    riskLevel: 'CRITICAL',
    activeSensors: 6,
    recentAlerts: 8,
    affectedPopulation: 6160000
  }
];

// Função para gerar dados sísmicos em tempo real
export const generateSeismicData = (baseData: SensorData): SensorData => {
  const variation = 0.2;
  const newMagnitude = Math.max(0.5, baseData.seismic.magnitude + (Math.random() - 0.5) * variation);
  
  return {
    ...baseData,
    timestamp: new Date(),
    seismic: {
      x: baseData.seismic.x + (Math.random() - 0.5) * variation,
      y: baseData.seismic.y + (Math.random() - 0.5) * variation,
      z: baseData.seismic.z + (Math.random() - 0.5) * variation,
      magnitude: newMagnitude,
      depth: Math.max(1, baseData.seismic.depth + (Math.random() - 0.5) * 5)
    }
  };
};
