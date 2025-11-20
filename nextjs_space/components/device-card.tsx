
'use client';

import { Server, Cpu, HardDrive, Activity, Clock, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeviceCardProps {
  device: {
    id: string;
    name: string;
    deviceType: string;
    ipAddress: string;
    zone: string;
    status: string;
    cpuUsage: number;
    memoryUsage: number;
    networkTraffic: number;
    protocol: string;
    lastSeen: Date;
    vendor: string;
    model: string;
  };
}

export function DeviceCard({ device }: DeviceCardProps) {
  // determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'warning':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'critical':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'offline':
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  // get last seen time diff
  const getTimeDiff = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-500/10">
      {/* header with status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">{device?.name ?? ''}</h3>
          </div>
          <p className="text-xs text-slate-400">{device?.deviceType ?? ''}</p>
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
          getStatusColor(device?.status ?? '')
        )}>
          <Circle className="w-2 h-2 fill-current" />
          <span className="capitalize">{device?.status ?? ''}</span>
        </div>
      </div>

      {/* network info */}
      <div className="space-y-2 mb-4 pb-4 border-b border-slate-800">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">IP Address</span>
          <span className="text-slate-200 font-mono">{device?.ipAddress ?? ''}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Zone</span>
          <span className="text-cyan-400 font-medium">{device?.zone ?? ''}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Protocol</span>
          <span className="text-purple-400 font-medium">{device?.protocol ?? ''}</span>
        </div>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>CPU</span>
          </div>
          <div className="text-sm font-semibold text-white">{device?.cpuUsage?.toFixed?.(1) ?? '0'}%</div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Memory</span>
          </div>
          <div className="text-sm font-semibold text-white">{device?.memoryUsage?.toFixed?.(1) ?? '0'}%</div>
        </div>
        <div className="space-y-1 col-span-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Activity className="w-3.5 h-3.5" />
            <span>Network Traffic</span>
          </div>
          <div className="text-sm font-semibold text-white">{device?.networkTraffic?.toFixed?.(1) ?? '0'} KB/s</div>
        </div>
      </div>

      {/* vendor info and last seen */}
      <div className="pt-3 border-t border-slate-800 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Vendor</span>
          <span className="text-slate-300">{device?.vendor ?? ''}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3 h-3" />
          <span>Last seen {getTimeDiff(device?.lastSeen ?? new Date())}</span>
        </div>
      </div>
    </div>
  );
}
