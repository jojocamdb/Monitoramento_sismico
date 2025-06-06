
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SensorData } from '@/types/monitoring';
import { Activity, MapPin, Clock, Wifi } from 'lucide-react';

interface SensorDetailsProps {
  sensors: SensorData[];
}

const SensorDetails = ({ sensors }: SensorDetailsProps) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW': return 'text-safe-500';
      case 'MEDIUM': return 'text-seismic-500';
      case 'HIGH': return 'text-volcanic-500';
      case 'CRITICAL': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  const getMagnitudeProgress = (magnitude: number) => {
    // Normaliza a magnitude para uma escala de 0-100
    return Math.min((magnitude / 2) * 100, 100);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-50 flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-500" />
          <span>Detalhes dos Sensores</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sensors.map((sensor) => (
            <div
              key={sensor.id}
              className="p-4 rounded-lg bg-slate-700/30 border border-slate-600 hover:bg-slate-700/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    sensor.status === 'ACTIVE' ? 'bg-safe-500 animate-pulse' : 
                    sensor.status === 'ALERT' ? 'bg-volcanic-500 animate-pulse-glow' : 'bg-slate-500'
                  }`}></div>
                  <h3 className="font-semibold text-slate-50">{sensor.deviceId}</h3>
                  <Badge 
                    variant={sensor.status === 'ACTIVE' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {sensor.status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="outline" 
                    className={`${getRiskColor(sensor.riskLevel)} border-current`}
                  >
                    {sensor.riskLevel}
                  </Badge>
                  <Wifi className={`w-4 h-4 ${
                    sensor.status === 'ACTIVE' ? 'text-safe-500' : 'text-red-500'
                  }`} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Informações de Localização */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <MapPin className="w-4 h-4" />
                    <span>Localização</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="text-slate-400">
                      Lat: <span className="text-slate-50">{sensor.location.latitude.toFixed(6)}</span>
                    </div>
                    <div className="text-slate-400">
                      Lng: <span className="text-slate-50">{sensor.location.longitude.toFixed(6)}</span>
                    </div>
                  </div>
                </div>

                {/* Dados Sísmicos */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-slate-300">
                    <Activity className="w-4 h-4" />
                    <span>Atividade Sísmica</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Magnitude</span>
                      <span className="text-slate-50 font-mono">{sensor.seismic.magnitude.toFixed(3)}</span>
                    </div>
                    <Progress 
                      value={getMagnitudeProgress(sensor.seismic.magnitude)}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>

              {/* Eixos XYZ */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                {['x', 'y', 'z'].map((axis) => (
                  <div key={axis} className="text-center">
                    <div className="text-xs text-slate-400 uppercase mb-1">Eixo {axis}</div>
                    <div className="text-lg font-mono text-slate-50">
                      {sensor.seismic[axis as keyof typeof sensor.seismic].toFixed(3)}
                    </div>
                    <div className={`w-full h-2 rounded-full mt-1 ${
                      axis === 'x' ? 'bg-green-500/20' :
                      axis === 'y' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                    }`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          axis === 'x' ? 'bg-green-500' :
                          axis === 'y' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${Math.min(Math.abs(sensor.seismic[axis as keyof typeof sensor.seismic]) * 50, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timestamp */}
              <div className="mt-3 flex items-center space-x-2 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                <span>Última atualização: {sensor.timestamp.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorDetails;
