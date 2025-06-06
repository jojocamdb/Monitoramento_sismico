
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Wifi, WifiOff } from 'lucide-react';
import { SensorData } from '@/types/monitoring';

interface SensorMapProps {
  sensors: SensorData[];
}

const SensorMap = ({ sensors }: SensorMapProps) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return 'bg-safe-500';
      case 'MEDIUM': return 'bg-seismic-500';
      case 'HIGH': return 'bg-volcanic-500';
      case 'CRITICAL': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return 'default';
      case 'MEDIUM': return 'secondary';
      case 'HIGH': return 'destructive';
      case 'CRITICAL': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-50 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span>Mapa de Sensores - Brasil</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simulação de mapa com coordenadas */}
        <div className="relative bg-slate-900 rounded-lg p-6 h-80 overflow-hidden">
          {/* Grid de fundo simulando um mapa */}
          <div className="absolute inset-0 dashboard-grid opacity-20"></div>
          
          {/* Contorno simplificado do Brasil */}
          <div className="absolute inset-4 border-2 border-slate-600 rounded-lg opacity-30"></div>
          
          {/* Sensores no mapa */}
          {sensors.map((sensor, index) => {
            // Posicionamento relativo baseado nas coordenadas
            const x = ((sensor.location.longitude + 75) / 45) * 100; // Normalizado para o Brasil
            const y = ((sensor.location.latitude + 35) / 25) * 100;
            
            return (
              <div
                key={sensor.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ 
                  left: `${Math.max(10, Math.min(90, x))}%`, 
                  top: `${Math.max(10, Math.min(90, 100 - y))}%` 
                }}
              >
                {/* Ponto do sensor */}
                <div 
                  className={`w-4 h-4 rounded-full ${getRiskColor(sensor.riskLevel)} 
                    ${sensor.status === 'ALERT' ? 'animate-pulse-glow' : 'animate-pulse'}
                    transition-all duration-300 hover:scale-150`}
                ></div>
                
                {/* Ondas de atividade sísmica */}
                {sensor.riskLevel !== 'LOW' && (
                  <div className="absolute inset-0 -m-2">
                    <div className={`w-8 h-8 rounded-full ${getRiskColor(sensor.riskLevel)} opacity-20 animate-ping`}></div>
                  </div>
                )}
                
                {/* Tooltip do sensor */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl min-w-48">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-50">{sensor.deviceId}</span>
                      {sensor.status === 'ACTIVE' ? 
                        <Wifi className="w-4 h-4 text-safe-500" /> : 
                        <WifiOff className="w-4 h-4 text-red-500" />
                      }
                    </div>
                    
                    <div className="space-y-1 text-sm text-slate-300">
                      <div>Lat: {sensor.location.latitude.toFixed(4)}</div>
                      <div>Lng: {sensor.location.longitude.toFixed(4)}</div>
                      <div>Magnitude: {sensor.seismic.magnitude.toFixed(3)}</div>
                    </div>
                    
                    <div className="mt-2">
                      <Badge variant={getRiskBadgeVariant(sensor.riskLevel)} className="text-xs">
                        {sensor.riskLevel}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-slate-400 mt-1">
                      {sensor.timestamp.toLocaleTimeString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Legenda */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-safe-500 rounded-full"></div>
            <span className="text-sm text-slate-300">Baixo Risco</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-seismic-500 rounded-full"></div>
            <span className="text-sm text-slate-300">Médio Risco</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-volcanic-500 rounded-full"></div>
            <span className="text-sm text-slate-300">Alto Risco</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-sm text-slate-300">Crítico</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorMap;
