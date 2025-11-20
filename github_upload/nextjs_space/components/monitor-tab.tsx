
'use client';

import { useEffect, useState } from 'react';
import { DeviceCard } from '@/components/device-card';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function MonitorTab() {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // fetch devices from api
    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/devices');
        if (response?.ok) {
          const data = await response?.json?.();
          setDevices(data ?? []);
        }
      } catch (error) {
        console.error('error loading devices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  // filter devices
  const filteredDevices = devices?.filter?.((device) => {
    const matchesSearch = device?.name?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.() ?? '') || 
                          device?.ipAddress?.includes?.(searchTerm ?? '') ||
                          device?.zone?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.() ?? '');
    const matchesStatus = statusFilter === 'all' || device?.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) ?? [];

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
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search devices by name, IP, or zone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value ?? '')}
            className="pl-10 bg-slate-900 border-slate-700 text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e?.target?.value ?? 'all')}
          className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* device grid */}
      {filteredDevices?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400">No devices found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDevices?.map?.((device) => (
            <DeviceCard key={device?.id ?? ''} device={device} />
          ))}
        </div>
      )}

      {/* summary */}
      <div className="mt-6 text-sm text-slate-400 text-center">
        Showing {filteredDevices?.length ?? 0} of {devices?.length ?? 0} devices
      </div>
    </div>
  );
}
