
'use client';

import { Shield, Server, Activity, Lock } from 'lucide-react';

export function NetworkTab() {
  // network zones data
  const zones = [
    {
      name: 'Corporate Network',
      color: 'bg-blue-500',
      devices: ['FIREWALL-OT-DMZ', 'VPN Gateway'],
      vlan: 'VLAN 10',
      description: 'business systems and user workstations'
    },
    {
      name: 'DMZ',
      color: 'bg-purple-500',
      devices: ['EWS-ENGINEERING-01', 'HMI-SCADA-SERVER-01', 'HISTORIAN-DB-SERVER', 'FIREWALL-OT-DMZ'],
      vlan: 'VLAN 20',
      description: 'demilitarized zone for data exchange'
    },
    {
      name: 'OT Network',
      color: 'bg-cyan-500',
      devices: ['RTU-PUMP-STATION-3', 'HMI-CONTROL-ROOM-A', 'PLC-CONVEYOR-CTRL-08', 'RTU-PIPELINE-MONITOR-12', 'RTU-WATER-TREATMENT-06', 'PLC-HVAC-CONTROLLER'],
      vlan: 'VLAN 30',
      description: 'operational technology devices and controllers'
    },
    {
      name: 'Safety Systems',
      color: 'bg-red-500',
      devices: ['PLC-REACTOR-01', 'PLC-TURBINE-CTRL-02', 'PLC-COOLING-SYSTEM-04', 'PLC-VALVE-CONTROL-05', 'PLC-EMERGENCY-SHUTDOWN'],
      vlan: 'VLAN 40',
      description: 'critical safety instrumented systems'
    }
  ];

  const firewallRules = [
    { from: 'Corporate', to: 'DMZ', status: 'Allowed', ports: '443, 3389' },
    { from: 'Corporate', to: 'OT Network', status: 'Denied', ports: 'All' },
    { from: 'Corporate', to: 'Safety Systems', status: 'Denied', ports: 'All' },
    { from: 'DMZ', to: 'OT Network', status: 'Allowed', ports: '502, 4840' },
    { from: 'DMZ', to: 'Safety Systems', status: 'Restricted', ports: 'Read-Only' },
    { from: 'OT Network', to: 'Safety Systems', status: 'Allowed', ports: '502, 44818' }
  ];

  return (
    <div className="space-y-8">
      {/* network topology visualization */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Network Zones & Segmentation
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {zones?.map?.((zone) => (
            <div
              key={zone?.name ?? ''}
              className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-3 h-3 rounded-full ${zone?.color ?? ''} mt-1.5 flex-shrink-0`}></div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-white mb-1">{zone?.name ?? ''}</h4>
                  <p className="text-xs text-slate-400 mb-3">{zone?.description ?? ''}</p>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-xs font-mono text-slate-300">
                    <Lock className="w-3 h-3" />
                    {zone?.vlan ?? ''}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-500 mb-2">Devices in Zone:</p>
                <div className="flex flex-wrap gap-2">
                  {zone?.devices?.map?.((device) => (
                    <div
                      key={device ?? ''}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/50 text-xs text-slate-300"
                    >
                      <Server className="w-3 h-3 text-blue-400" />
                      {device ?? ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* firewall rules */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          Firewall Rules & Access Control
        </h3>
        
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Source Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Destination Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Allowed Ports/Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {firewallRules?.map?.((rule, index) => (
                  <tr key={index} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{rule?.from ?? ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{rule?.to ?? ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        rule?.status === 'Allowed' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                        rule?.status === 'Denied' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {rule?.status ?? ''}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-400">{rule?.ports ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* security notes */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h4 className="text-sm font-bold text-blue-300 mb-2">Network Security Architecture</h4>
        <ul className="text-xs text-blue-200 space-y-1 list-disc list-inside">
          <li>purdue model reference architecture implemented with strict zone segmentation</li>
          <li>industrial firewalls with deep packet inspection for ot protocols</li>
          <li>unidirectional gateways between safety systems and upper levels</li>
          <li>network intrusion detection system monitoring all inter-zone traffic</li>
          <li>zero trust principles applied with explicit allow-list policies</li>
        </ul>
      </div>
    </div>
  );
}
