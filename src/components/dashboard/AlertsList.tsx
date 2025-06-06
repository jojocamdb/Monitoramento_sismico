
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react';
import { AlertData } from '@/types/monitoring';

interface AlertsListProps {
  alerts: AlertData[];
  onAcknowledgeAlert: (alertId: string) => void;
}

const AlertsList = ({ alerts, onAcknowledgeAlert }: AlertsListProps) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
      case 'DANGER':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'WARNING':
        return <AlertTriangle className="w-4 h-4 text-seismic-500" />;
      case 'INFO':
        return <CheckCircle className="w-4 h-4 text-safe-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <Badge variant="destructive" className="bg-red-600">CRÍTICO</Badge>;
      case 'DANGER':
        return <Badge variant="destructive">PERIGO</Badge>;
      case 'WARNING':
        return <Badge className="bg-seismic-600 hover:bg-seismic-700">AVISO</Badge>;
      case 'INFO':
        return <Badge variant="secondary">INFO</Badge>;
      default:
        return <Badge variant="outline">DESCONHECIDO</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'EARTHQUAKE': return 'Terremoto';
      case 'TREMOR': return 'Tremor';
      case 'AFTERSHOCK': return 'Réplica';
      case 'SYSTEM_ERROR': return 'Erro Sistema';
      default: return type;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}min atrás`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d atrás`;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-volcanic-500" />
            <span>Alertas Sísmicos</span>
          </div>
          <Badge variant="outline" className="text-slate-300">
            {alerts.filter(a => !a.acknowledged).length} pendentes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum alerta registrado</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:bg-slate-700/50 ${
                  alert.acknowledged 
                    ? 'bg-slate-800/30 border-slate-600 opacity-75' 
                    : 'bg-slate-700/30 border-slate-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getSeverityIcon(alert.severity)}
                      {getSeverityBadge(alert.severity)}
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(alert.type)}
                      </Badge>
                      <div className="flex items-center space-x-1 text-slate-400 text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{alert.location.country}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-50 mb-2">{alert.message}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mb-2">
                      <div>Magnitude: <span className="text-slate-50 font-mono">{alert.magnitude}</span></div>
                      <div>Profundidade: <span className="text-slate-50">{alert.depth}km</span></div>
                      <div>Região: <span className="text-slate-50">{alert.location.region}</span></div>
                      <div>Sensor: <span className="text-slate-50">{alert.sensorId}</span></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                      
                      {!alert.acknowledged && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAcknowledgeAlert(alert.id)}
                          className="border-safe-500 text-safe-500 hover:bg-safe-500 hover:text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Confirmar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {alert.acknowledged && (
                  <div className="mt-2 text-sm text-safe-500 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Alerta confirmado
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsList;
