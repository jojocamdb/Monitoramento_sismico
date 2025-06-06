
import { Activity, MapPin, AlertTriangle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SensorData, AlertData } from '@/types/monitoring';

interface StatsCardsProps {
  sensors: SensorData[];
  alerts: AlertData[];
}

const StatsCards = ({ sensors, alerts }: StatsCardsProps) => {
  const activeSensors = sensors.filter(s => s.status === 'ACTIVE').length;
  const alertSensors = sensors.filter(s => s.status === 'ALERT').length;
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged).length;
  const significantEarthquakes = alerts.filter(a => a.magnitude >= 3.0).length;

  const cards = [
    {
      title: 'Sensores Ativos',
      value: activeSensors,
      total: sensors.length,
      icon: Activity,
      color: 'text-safe-500',
      bgColor: 'bg-safe-500/10'
    },
    {
      title: 'Alertas Sísmicos',
      value: alertSensors,
      total: sensors.length,
      icon: AlertTriangle,
      color: 'text-seismic-500',
      bgColor: 'bg-seismic-500/10'
    },
    {
      title: 'Alertas Pendentes',
      value: unacknowledgedAlerts,
      total: alerts.length,
      icon: MapPin,
      color: 'text-volcanic-500',
      bgColor: 'bg-volcanic-500/10'
    },
    {
      title: 'Terremotos Significativos',
      value: significantEarthquakes,
      total: alerts.length,
      icon: Shield,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              {card.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg ${card.bgColor} flex items-center justify-center`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-50">
              {card.value}
              <span className="text-lg text-slate-400">/{card.total}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    card.color.includes('safe') ? 'bg-safe-500' :
                    card.color.includes('seismic') ? 'bg-seismic-500' :
                    card.color.includes('volcanic') ? 'bg-volcanic-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(card.value / card.total) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-400">
                {Math.round((card.value / card.total) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
