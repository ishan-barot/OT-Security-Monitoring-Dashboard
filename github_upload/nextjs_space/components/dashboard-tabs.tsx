
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MonitorTab } from '@/components/monitor-tab';
import { AlertsTab } from '@/components/alerts-tab';
import { NetworkTab } from '@/components/network-tab';
import { Monitor, Bell, Network } from 'lucide-react';

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('monitor');

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b border-slate-800 bg-slate-900/50 rounded-none p-0">
          <TabsTrigger
            value="monitor"
            className="flex items-center gap-2 px-6 py-4 text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-none border-r border-slate-800"
          >
            <Monitor className="w-4 h-4" />
            Monitor
          </TabsTrigger>
          <TabsTrigger
            value="alerts"
            className="flex items-center gap-2 px-6 py-4 text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-none border-r border-slate-800"
          >
            <Bell className="w-4 h-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger
            value="network"
            className="flex items-center gap-2 px-6 py-4 text-sm font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-none"
          >
            <Network className="w-4 h-4" />
            Network Topology
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitor" className="p-6 m-0">
          <MonitorTab />
        </TabsContent>

        <TabsContent value="alerts" className="p-6 m-0">
          <AlertsTab />
        </TabsContent>

        <TabsContent value="network" className="p-6 m-0">
          <NetworkTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
