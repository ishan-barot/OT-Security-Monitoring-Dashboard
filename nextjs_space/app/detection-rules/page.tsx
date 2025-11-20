
import { Sidebar } from '@/components/sidebar';
import { DetectionRulesContent } from '@/components/detection-rules-content';

export default function DetectionRulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Detection Rules
          </h1>
          <p className="text-slate-400">
            ICS/SCADA security detection rules mapped to MITRE ATT&CK for ICS framework
          </p>
        </div>

        <DetectionRulesContent />
      </main>
    </div>
  );
}
