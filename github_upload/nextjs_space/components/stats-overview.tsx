
'use client';

import { useEffect, useState } from 'react';
import { Server, AlertTriangle, Shield, Activity } from 'lucide-react';

export function StatsOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch stats from api
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response?.ok) {
          const data = await response?.json?.();
          setStats(data);
        }
      } catch (error) {
        console.error('error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4]?.map?.((i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 animate-pulse">
            <div className="h-20"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Devices',
      value: stats?.devices?.total ?? 0,
      subtitle: `${stats?.devices?.online ?? 0} online, ${stats?.devices?.critical ?? 0} critical`,
      icon: Server,
      color: 'from-blue-500 to-cyan-500',
      bgGlow: 'shadow-blue-500/20'
    },
    {
      title: 'Active Alerts',
      value: stats?.alerts?.total ?? 0,
      subtitle: `${stats?.alerts?.critical ?? 0} critical, ${stats?.alerts?.high ?? 0} high priority`,
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500',
      bgGlow: 'shadow-orange-500/20'
    },
    {
      title: 'Compliance Score',
      value: `${stats?.compliance?.score ?? 0}%`,
      subtitle: `${stats?.compliance?.compliant ?? 0} of ${stats?.compliance?.total ?? 0} controls met`,
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      bgGlow: 'shadow-green-500/20'
    },
    {
      title: 'Detection Rules',
      value: '8',
      subtitle: 'all active and monitoring',
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      bgGlow: 'shadow-purple-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map?.((card) => {
        const Icon = card?.icon;
        
        return (
          <div
            key={card?.title ?? ''}
            className={`bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:${card?.bgGlow ?? ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card?.color ?? ''} flex items-center justify-center shadow-lg ${card?.bgGlow ?? ''}`}>
                {Icon && <Icon className="w-6 h-6 text-white" />}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{card?.value ?? ''}</h3>
            <p className="text-sm text-slate-400 mb-1">{card?.title ?? ''}</p>
            <p className="text-xs text-slate-500">{card?.subtitle ?? ''}</p>
          </div>
        );
      })}
    </div>
  );
}
