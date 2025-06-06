
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SensorData } from '@/types/monitoring';
import { useState, useEffect } from 'react';

interface SeismicChartProps {
  sensors: SensorData[];
}

interface ChartData {
  time: string;
  magnitude: number;
  x: number;
  y: number;
  z: number;
}

const SeismicChart = ({ sensors }: SeismicChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Simula dados históricos para o gráfico
    const generateHistoricalData = () => {
      const data: ChartData[] = [];
      const now = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000); // Últimos 30 minutos
        const baseValue = 0.98 + Math.sin(i * 0.1) * 0.1;
        const noise = (Math.random() - 0.5) * 0.05;
        
        data.push({
          time: time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          magnitude: baseValue + noise,
          x: 0.02 + noise,
          y: 0.01 + noise,
          z: baseValue + noise
        });
      }
      
      return data;
    };

    setChartData(generateHistoricalData());

    // Atualiza dados a cada 30 segundos
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        const noise = (Math.random() - 0.5) * 0.1;
        const baseValue = 0.98;
        
        newData.push({
          time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          magnitude: baseValue + noise,
          x: 0.02 + noise,
          y: 0.01 + noise,
          z: baseValue + noise
        });
        
        return newData;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-50 flex items-center space-x-2">
          <div className="w-3 h-3 bg-seismic-500 rounded-full animate-pulse"></div>
          <span>Atividade Sísmica - Últimos 30 Minutos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8" 
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12}
                domain={[0.9, 1.3]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
                labelStyle={{ color: '#94a3b8' }}
              />
              
              {/* Linhas de referência para níveis de alerta */}
              <ReferenceLine y={1.1} stroke="#f97316" strokeDasharray="5 5" label="Alerta" />
              <ReferenceLine y={1.2} stroke="#ef4444" strokeDasharray="5 5" label="Crítico" />
              
              <Line 
                type="monotone" 
                dataKey="magnitude" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                name="Magnitude Total"
              />
              <Line 
                type="monotone" 
                dataKey="x" 
                stroke="#22c55e" 
                strokeWidth={1}
                dot={false}
                name="Eixo X"
              />
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke="#f59e0b" 
                strokeWidth={1}
                dot={false}
                name="Eixo Y"
              />
              <Line 
                type="monotone" 
                dataKey="z" 
                stroke="#ef4444" 
                strokeWidth={1}
                dot={false}
                name="Eixo Z"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-slate-300">Magnitude</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-slate-300">Eixo X</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-slate-300">Eixo Y</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-slate-300">Eixo Z</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeismicChart;
