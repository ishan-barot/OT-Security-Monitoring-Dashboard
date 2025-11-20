
import { Sidebar } from '@/components/sidebar';
import { ComplianceContent } from '@/components/compliance-content';

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Compliance Management
          </h1>
          <p className="text-slate-400">
            NIST 800-82 compliance tracking and IEC 62443 security level assessment
          </p>
        </div>

        <ComplianceContent />
      </main>
    </div>
  );
}
