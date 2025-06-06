
import { SensorData, AlertData, VolcanicEvent } from '../types/monitoring';

// Dados simulados de sensores sísmicos
export const mockSensorData: SensorData[] = [
  {
    id: '1',
    deviceId: 'ESP32-001',
    timestamp: new Date(),
    location: { latitude: -22.9068, longitude: -43.1729 }, // Rio de Janeiro
    seismic: { x: 0.02, y: 0.01, z: 0.98, magnitude: 0.98 },
    riskLevel: 'LOW',
    status: 'ACTIVE'
  },
  {
    id: '2',
    deviceId: 'ESP32-002',
    timestamp: new Date(Date.now() - 30000),
    location: { latitude: -23.5505, longitude: -46.6333 }, // São Paulo
    seismic: { x: 0.15, y: 0.08, z: 1.02, magnitude: 1.04 },
    riskLevel: 'MEDIUM',
    status: 'ALERT'
  },
  {
    id: '3',
    deviceId: 'ESP32-003',
    timestamp: new Date(Date.now() - 60000),
    location: { latitude: -19.9191, longitude: -43.9378 }, // Belo Horizonte
    seismic: { x: 0.45, y: 0.32, z: 1.15, magnitude: 1.25 },
    riskLevel: 'HIGH',
    status: 'ALERT'
  },
  {
    id: '4',
    deviceId: 'ESP32-004',
    timestamp: new Date(Date.now() - 120000),
    location: { latitude: -30.0346, longitude: -51.2177 }, // Porto Alegre
    seismic: { x: 0.01, y: 0.02, z: 0.97, magnitude: 0.97 },
    riskLevel: 'LOW',
    status: 'ACTIVE'
  }
];

export const mockAlerts: AlertData[] = [
  {
    id: 'alert-1',
    sensorId: '2',
    type: 'SEISMIC_ACTIVITY',
    severity: 'WARNING',
    message: 'Atividade sísmica moderada detectada - Magnitude 1.04',
    timestamp: new Date(Date.now() - 30000),
    acknowledged: false,
    location: { latitude: -23.5505, longitude: -46.6333 }
  },
  {
    id: 'alert-2',
    sensorId: '3',
    type: 'SEISMIC_ACTIVITY',
    severity: 'DANGER',
    message: 'Atividade sísmica elevada - Magnitude 1.25 - Possível precursor vulcânico',
    timestamp: new Date(Date.now() - 60000),
    acknowledged: false,
    location: { latitude: -19.9191, longitude: -43.9378 }
  },
  {
    id: 'alert-3',
    sensorId: '1',
    type: 'SYSTEM_ERROR',
    severity: 'INFO',
    message: 'Calibração de sensor concluída com sucesso',
    timestamp: new Date(Date.now() - 300000),
    acknowledged: true,
    location: { latitude: -22.9068, longitude: -43.1729 }
  }
];

export const mockVolcanicEvents: VolcanicEvent[] = [
  {
    id: 'volcano-1',
    name: 'Região Sudeste',
    location: { latitude: -22.9068, longitude: -43.1729 },
    lastActivity: new Date(Date.now() - 3600000),
    riskLevel: 'LOW',
    activeSensors: 4,
    recentAlerts: 1
  },
  {
    id: 'volcano-2',
    name: 'Grande São Paulo',
    location: { latitude: -23.5505, longitude: -46.6333 },
    lastActivity: new Date(Date.now() - 30000),
    riskLevel: 'MEDIUM',
    activeSensors: 6,
    recentAlerts: 3
  },
  {
    id: 'volcano-3',
    name: 'Região Centro-Oeste',
    location: { latitude: -19.9191, longitude: -43.9378 },
    lastActivity: new Date(Date.now() - 60000),
    riskLevel: 'HIGH',
    activeSensors: 2,
    recentAlerts: 5
  }
];

// Função para gerar dados sísmicos em tempo real
export const generateSeismicData = (baseData: SensorData): SensorData => {
  const variation = 0.1;
  return {
    ...baseData,
    timestamp: new Date(),
    seismic: {
      x: baseData.seismic.x + (Math.random() - 0.5) * variation,
      y: baseData.seismic.y + (Math.random() - 0.5) * variation,
      z: baseData.seismic.z + (Math.random() - 0.5) * variation,
      magnitude: Math.sqrt(
        Math.pow(baseData.seismic.x + (Math.random() - 0.5) * variation, 2) +
        Math.pow(baseData.seismic.y + (Math.random() - 0.5) * variation, 2) +
        Math.pow(baseData.seismic.z + (Math.random() - 0.5) * variation, 2)
      )
    }
  };
};
