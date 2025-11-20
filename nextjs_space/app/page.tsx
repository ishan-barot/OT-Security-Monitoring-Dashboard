
import { Sidebar } from '@/components/sidebar';
import { DashboardTabs } from '@/components/dashboard-tabs';
import { StatsOverview } from '@/components/stats-overview';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />
      
      <main className="ml-64 p-8">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            OT Security Monitoring Dashboard
          </h1>
          <p className="text-slate-400">
            Industrial Control Systems Security Operations Center - Real-time ICS/SCADA threat detection and monitoring
          </p>
        </div>

        {/* stats overview */}
        <StatsOverview />

        {/* main dashboard with tabs */}
        <DashboardTabs />
      </main>
    </div>
  );
}
