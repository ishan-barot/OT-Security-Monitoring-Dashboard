
'use client';

import { useEffect, useState } from 'react';
import { Shield, CheckCircle2, AlertCircle, XCircle, Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ComplianceContent() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    // fetch compliance items from api
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/compliance');
        if (response?.ok) {
          const data = await response?.json?.();
          setItems(data ?? []);
        }
      } catch (error) {
        console.error('error loading compliance items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // calculate stats
  const stats = {
    total: items?.length ?? 0,
    compliant: items?.filter?.(i => i?.status === 'compliant')?.length ?? 0,
    partial: items?.filter?.(i => i?.status === 'partial')?.length ?? 0,
    nonCompliant: items?.filter?.(i => i?.status === 'non-compliant')?.length ?? 0
  };

  const score = stats?.total > 0 ? Math.round((stats?.compliant / stats?.total) * 100) : 0;

  // unique categories
  const categories = Array.from(new Set(items?.map?.(i => i?.category) ?? []));

  // filter items
  const filteredItems = categoryFilter === 'all' 
    ? items 
    : items?.filter?.(i => i?.category === categoryFilter) ?? [];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'compliant':
        return {
          icon: CheckCircle2,
          color: 'text-green-500',
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          label: 'Compliant'
        };
      case 'partial':
        return {
          icon: AlertCircle,
          color: 'text-yellow-500',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          label: 'Partial'
        };
      case 'non-compliant':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          label: 'Non-Compliant'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-500',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/30',
          label: 'Unknown'
        };
    }
  };

  // mock export function
  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      complianceScore: score,
      statistics: stats,
      items: items
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nist-800-82-compliance-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* compliance score overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-slate-400 mb-4">Overall Compliance Score</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-slate-800"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                  className="text-green-500 transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{score}%</span>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-slate-400">
            NIST 800-82 Rev 2 Compliance
          </div>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-400">Compliance Statistics</h3>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">{stats?.total ?? 0}</div>
              <div className="text-xs text-slate-400">Total Controls</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{stats?.compliant ?? 0}</div>
              <div className="text-xs text-slate-400">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">{stats?.partial ?? 0}</div>
              <div className="text-xs text-slate-400">Partial</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">{stats?.nonCompliant ?? 0}</div>
              <div className="text-xs text-slate-400">Non-Compliant</div>
            </div>
          </div>
        </div>
      </div>

      {/* iec 62443 levels */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">IEC 62443 Security Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { level: 'SL 1', title: 'Protection Against Casual', color: 'bg-blue-500', status: 'Achieved' },
            { level: 'SL 2', title: 'Protection Against Intentional', color: 'bg-cyan-500', status: 'Achieved' },
            { level: 'SL 3', title: 'Protection Against Sophisticated', color: 'bg-yellow-500', status: 'In Progress' },
            { level: 'SL 4', title: 'Protection Against Extensive Resources', color: 'bg-red-500', status: 'Not Achieved' }
          ].map((item) => (
            <div key={item?.level ?? ''} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <div className={`w-8 h-8 rounded-lg ${item?.color ?? ''} flex items-center justify-center mb-3`}>
                <span className="text-sm font-bold text-white">{item?.level?.split?.(' ')?.[1] ?? ''}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{item?.level ?? ''}</h4>
              <p className="text-xs text-slate-400 mb-2">{item?.title ?? ''}</p>
              <div className={cn(
                "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                item?.status === 'Achieved' ? 'bg-green-500/10 text-green-400' :
                item?.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-gray-500/10 text-gray-400'
              )}>
                {item?.status ?? ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* controls list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">NIST 800-82 Controls</h3>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e?.target?.value ?? 'all')}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories?.map?.((cat) => (
              <option key={cat ?? ''} value={cat ?? ''}>{cat ?? ''}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {filteredItems?.map?.((item) => {
            const config = getStatusConfig(item?.status ?? '');
            const Icon = config?.icon;
            
            return (
              <div
                key={item?.id ?? ''}
                className={cn(
                  "bg-gradient-to-br from-slate-900 to-slate-950 border rounded-lg p-4 hover:border-blue-500/30 transition-all duration-300",
                  config?.border ?? ''
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center", config?.bg ?? '')}>
                    {Icon && <Icon className={cn("w-5 h-5", config?.color ?? '')} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-mono font-bold text-blue-400">{item?.controlId ?? ''}</span>
                          <span className="text-xs text-slate-500">|</span>
                          <span className="text-xs text-slate-400">{item?.category ?? ''}</span>
                        </div>
                        <p className="text-sm text-slate-300">{item?.description ?? ''}</p>
                      </div>
                      <div className={cn(
                        "flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border",
                        config?.bg ?? '',
                        config?.color ?? '',
                        config?.border ?? ''
                      )}>
                        {config?.label ?? ''}
                      </div>
                    </div>
                    
                    {item?.notes && (
                      <div className="mt-2 text-xs text-slate-400 bg-slate-900/50 rounded p-2">
                        <span className="font-semibold">Notes:</span> {item?.notes ?? ''}
                      </div>
                    )}
                    
                    <div className="mt-2 text-xs text-slate-500">
                      Last assessed: {new Date(item?.lastAssessed ?? new Date())?.toLocaleDateString?.('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) ?? ''}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
