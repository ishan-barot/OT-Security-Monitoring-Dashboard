
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Activity, Bell, FileText, Network, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Detection Rules', href: '/detection-rules', icon: FileText },
  { name: 'Compliance', href: '/compliance', icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 flex flex-col">
      {/* logo and header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">OT Security</h1>
            <p className="text-xs text-slate-400">SOC Dashboard</p>
          </div>
        </div>
      </div>

      {/* navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems?.map?.((item) => {
          const Icon = item?.icon;
          const isActive = pathname === item?.href;
          
          return (
            <Link
              key={item?.href ?? ''}
              href={item?.href ?? '/'}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span className="font-medium">{item?.name ?? ''}</span>
            </Link>
          );
        })}
      </nav>

      {/* footer info */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Activity className="w-4 h-4 text-green-500" />
            <span>System Status: Online</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Bell className="w-4 h-4 text-orange-500" />
            <span>Active Alerts: Monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}
