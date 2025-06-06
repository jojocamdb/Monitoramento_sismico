
import { Bell, Settings, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  unreadAlerts: number;
}

const Header = ({ unreadAlerts }: HeaderProps) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 volcanic-gradient rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-50">
                Sistema de Monitoramento Vulcânico
              </h1>
              <p className="text-sm text-slate-400">Global Solution 2025.1</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Shield className="w-4 h-4 text-safe-500" />
            <span className="text-slate-300">Sistema Operacional</span>
            <div className="w-2 h-2 bg-safe-500 rounded-full animate-pulse"></div>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {unreadAlerts > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                {unreadAlerts}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
