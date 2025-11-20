
'use client';

import { useEffect, useState } from 'react';
import { AlertItem } from '@/components/alert-item';
import { Loader2 } from 'lucide-react';

export function AlertsTab() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [techniqueFilter, setTechniqueFilter] = useState('all');

  // unique mitre techniques for filter
  const [techniques, setTechniques] = useState<string[]>([]);

  useEffect(() => {
    // fetch alerts from api
    const fetchAlerts = async () => {
      try {
        const params = new URLSearchParams();
        if (severityFilter !== 'all') params.append('severity', severityFilter);
        if (techniqueFilter !== 'all') params.append('technique', techniqueFilter);
        
        const response = await fetch(`/api/alerts?${params?.toString?.()}`);
        if (response?.ok) {
          const data = await response?.json?.();
          setAlerts(data ?? []);
          
          // extract unique techniques
          const uniqueTechniques = Array.from(new Set(data?.map?.((a: any) => a?.mitreId) ?? [])) as string[];
          setTechniques(uniqueTechniques);
        }
      } catch (error) {
        console.error('error loading alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [severityFilter, techniqueFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e?.target?.value ?? 'all')}
          className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        
        <select
          value={techniqueFilter}
          onChange={(e) => setTechniqueFilter(e?.target?.value ?? 'all')}
          className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All MITRE Techniques</option>
          {techniques?.map?.((tech) => (
            <option key={tech ?? ''} value={tech ?? ''}>{tech?.toUpperCase?.() ?? ''}</option>
          ))}
        </select>
      </div>

      {/* alerts list */}
      {alerts?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400">No alerts found matching your criteria</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts?.map?.((alert) => (
            <AlertItem key={alert?.id ?? ''} alert={alert} />
          ))}
        </div>
      )}

      {/* summary */}
      <div className="mt-6 text-sm text-slate-400 text-center">
        Showing {alerts?.length ?? 0} security alerts
      </div>
    </div>
  );
}
