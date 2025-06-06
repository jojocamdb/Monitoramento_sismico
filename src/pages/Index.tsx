
import { useState, useEffect } from 'react';
import Header from '@/components/dashboard/Header';
import StatsCards from '@/components/dashboard/StatsCards';
import SeismicChart from '@/components/dashboard/SeismicChart';
import SensorMap from '@/components/dashboard/SensorMap';
import AlertsList from '@/components/dashboard/AlertsList';
import SensorDetails from '@/components/dashboard/SensorDetails';
import { mockSensorData, mockAlerts, generateSeismicData } from '@/data/mockData';
import { SensorData, AlertData } from '@/types/monitoring';
import { toast } from 'sonner';

const Index = () => {
  const [sensors, setSensors] = useState<SensorData[]>(mockSensorData);
  const [alerts, setAlerts] = useState<AlertData[]>(mockAlerts);

  // Simula atualizações em tempo real dos sensores
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prevSensors => 
        prevSensors.map(sensor => {
          const updatedSensor = generateSeismicData(sensor);
          
          // Verifica se deve gerar um novo alerta
          if (updatedSensor.seismic.magnitude > 1.1 && Math.random() < 0.1) {
            const newAlert: AlertData = {
              id: `alert-${Date.now()}`,
              sensorId: updatedSensor.id,
              type: 'SEISMIC_ACTIVITY',
              severity: updatedSensor.seismic.magnitude > 1.2 ? 'DANGER' : 'WARNING',
              message: `Atividade sísmica ${updatedSensor.seismic.magnitude > 1.2 ? 'elevada' : 'moderada'} detectada - Magnitude ${updatedSensor.seismic.magnitude.toFixed(3)}`,
              timestamp: new Date(),
              acknowledged: false,
              location: updatedSensor.location
            };
            
            setAlerts(prev => [newAlert, ...prev]);
            
            toast.error(newAlert.message, {
              description: `Sensor ${updatedSensor.deviceId} - ${updatedSensor.location.latitude.toFixed(3)}, ${updatedSensor.location.longitude.toFixed(3)}`,
              action: {
                label: 'Ver Detalhes',
                onClick: () => console.log('Navegando para detalhes do sensor')
              }
            });
          }
          
          // Atualiza o nível de risco baseado na magnitude
          if (updatedSensor.seismic.magnitude > 1.2) {
            updatedSensor.riskLevel = 'CRITICAL';
            updatedSensor.status = 'ALERT';
          } else if (updatedSensor.seismic.magnitude > 1.1) {
            updatedSensor.riskLevel = 'HIGH';
            updatedSensor.status = 'ALERT';
          } else if (updatedSensor.seismic.magnitude > 1.05) {
            updatedSensor.riskLevel = 'MEDIUM';
            updatedSensor.status = 'ALERT';
          } else {
            updatedSensor.riskLevel = 'LOW';
            updatedSensor.status = 'ACTIVE';
          }
          
          return updatedSensor;
        })
      );
    }, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, acknowledged: true }
          : alert
      )
    );
    
    toast.success('Alerta confirmado com sucesso');
  };

  const unreadAlerts = alerts.filter(alert => !alert.acknowledged).length;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background pattern */}
      <div className="fixed inset-0 dashboard-grid opacity-5 pointer-events-none"></div>
      
      <Header unreadAlerts={unreadAlerts} />
      
      <main className="container mx-auto px-6 py-6 relative z-10">
        {/* Cards de estatísticas */}
        <StatsCards sensors={sensors} alerts={alerts} />
        
        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico sísmico - ocupa 2 colunas */}
          <div className="lg:col-span-2">
            <SeismicChart sensors={sensors} />
          </div>
          
          {/* Lista de alertas */}
          <div className="lg:col-span-1">
            <AlertsList 
              alerts={alerts} 
              onAcknowledgeAlert={handleAcknowledgeAlert} 
            />
          </div>
        </div>
        
        {/* Segunda linha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mapa de sensores */}
          <SensorMap sensors={sensors} />
          
          {/* Detalhes dos sensores */}
          <SensorDetails sensors={sensors} />
        </div>
      </main>
    </div>
  );
};

export default Index;
