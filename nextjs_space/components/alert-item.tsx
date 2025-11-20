
'use client';

import { AlertTriangle, AlertCircle, Info, AlertOctagon, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertItemProps {
  alert: {
    id: string;
    timestamp: Date;
    severity: string;
    title: string;
    description: string;
    mitreId: string;
    mitreTechnique: string;
    affectedDevice: string;
    zone: string;
    detectionRule: string;
    status: string;
  };
}

export function AlertItem({ alert }: AlertItemProps) {
  // severity config
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: AlertOctagon,
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          border: 'border-red-500/30'
        };
      case 'high':
        return {
          icon: AlertTriangle,
          color: 'text-orange-500',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30'
        };
      case 'medium':
        return {
          icon: AlertCircle,
          color: 'text-yellow-500',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30'
        };
      case 'low':
        return {
          icon: Info,
          color: 'text-blue-500',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30'
        };
      default:
        return {
          icon: Info,
          color: 'text-gray-500',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/30'
        };
    }
  };

  const config = getSeverityConfig(alert?.severity ?? '');
  const Icon = config?.icon;

  // format timestamp
  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d?.toLocaleString?.('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) ?? '';
  };

  return (
    <div className={cn(
      "bg-gradient-to-br from-slate-900 to-slate-950 border rounded-lg p-4 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-500/10",
      config?.border ?? ''
    )}>
      <div className="flex gap-4">
        {/* severity icon */}
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
          config?.bg ?? ''
        )}>
          {Icon && <Icon className={cn("w-5 h-5", config?.color ?? '')} />}
        </div>

        {/* alert content */}
        <div className="flex-1 min-w-0">
          {/* header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white mb-1">{alert?.title ?? ''}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{alert?.description ?? ''}</p>
            </div>
            <div className={cn(
              "flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold uppercase border",
              config?.bg ?? '',
              config?.color ?? '',
              config?.border ?? ''
            )}>
              {alert?.severity ?? ''}
            </div>
          </div>

          {/* mitre technique */}
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30">
              <Tag className="w-3 h-3 text-purple-400" />
              <span className="text-xs font-mono font-medium text-purple-300">{alert?.mitreId?.toUpperCase?.() ?? ''}</span>
            </div>
            <span className="text-xs text-purple-400">{alert?.mitreTechnique ?? ''}</span>
          </div>

          {/* metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Affected Device</p>
              <p className="text-xs font-medium text-slate-200">{alert?.affectedDevice ?? ''}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Zone</p>
              <p className="text-xs font-medium text-cyan-400">{alert?.zone ?? ''}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Detection Rule</p>
              <p className="text-xs font-medium text-slate-200 truncate">{alert?.detectionRule ?? ''}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Timestamp</p>
              <p className="text-xs font-medium text-slate-200">{formatTime(alert?.timestamp ?? new Date())}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
