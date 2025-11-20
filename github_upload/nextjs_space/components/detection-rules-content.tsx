
'use client';

import { useEffect, useState } from 'react';
import { Shield, AlertTriangle, Activity, Loader2, Tag, FileCode } from 'lucide-react';

export function DetectionRulesContent() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch detection rules from api
    const fetchRules = async () => {
      try {
        const response = await fetch('/api/detection-rules');
        if (response?.ok) {
          const data = await response?.json?.();
          setRules(data ?? []);
        }
      } catch (error) {
        console.error('error loading detection rules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' };
      case 'high':
        return { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
      case 'medium':
        return { icon: Activity, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
      default:
        return { icon: Shield, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* rules grid */}
      <div className="grid grid-cols-1 gap-6">
        {rules?.map?.((rule) => {
          const config = getSeverityIcon(rule?.severity ?? '');
          const Icon = config?.icon;
          
          return (
            <div
              key={rule?.id ?? ''}
              className={`bg-gradient-to-br from-slate-900 to-slate-950 border rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 shadow-lg ${config?.border ?? ''}`}
            >
              <div className="flex items-start gap-4">
                {/* icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${config?.bg ?? ''}`}>
                  {Icon && <Icon className={`w-6 h-6 ${config?.color ?? ''}`} />}
                </div>

                {/* content */}
                <div className="flex-1 space-y-4">
                  {/* header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{rule?.name ?? ''}</h3>
                      <p className="text-sm text-slate-400">{rule?.description ?? ''}</p>
                    </div>
                    <div className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold uppercase border ${config?.bg ?? ''} ${config?.color ?? ''} ${config?.border ?? ''}`}>
                      {rule?.severity ?? ''}
                    </div>
                  </div>

                  {/* mitre mapping */}
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-500/10 border border-purple-500/30">
                      <Tag className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-mono font-bold text-purple-300">{rule?.mitreId?.toUpperCase?.() ?? ''}</span>
                    </div>
                    <span className="text-sm text-purple-400">{rule?.mitreTechnique ?? ''}</span>
                  </div>

                  {/* detection logic */}
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                      <FileCode className="w-4 h-4 text-cyan-400" />
                      Detection Logic
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-mono">{rule?.detectionLogic ?? ''}</p>
                  </div>

                  {/* example alert */}
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-xs text-blue-400 font-semibold mb-1">Example Alert:</p>
                    <p className="text-sm text-blue-200 italic">{rule?.exampleAlert ?? ''}</p>
                  </div>

                  {/* status */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${rule?.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <span className="text-xs text-slate-400">
                        Status: <span className={rule?.isActive ? 'text-green-400' : 'text-gray-400'}>{rule?.isActive ? 'Active' : 'Inactive'}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* summary */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Detection Coverage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">{rules?.length ?? 0}</div>
            <div className="text-sm text-slate-400">Total Rules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{rules?.filter?.(r => r?.isActive)?.length ?? 0}</div>
            <div className="text-sm text-slate-400">Active Rules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">{new Set(rules?.map?.(r => r?.mitreId) ?? [])?.size ?? 0}</div>
            <div className="text-sm text-slate-400">MITRE Techniques</div>
          </div>
        </div>
      </div>
    </div>
  );
}
