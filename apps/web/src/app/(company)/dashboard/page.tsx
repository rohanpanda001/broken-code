"use client";

import { motion } from "framer-motion";

const MOCK_CANDIDATES = [
  { id: "CAN-001", name: "Alex Chen", challenge: "Payment Race Condition", ttd: "12m 45s", score: 92, status: "Evaluated" },
  { id: "CAN-002", name: "Sarah Jenkins", challenge: "Payment Race Condition", ttd: "4m 10s", score: 45, status: "Evaluated" },
  { id: "CAN-003", name: "Michael Wong", challenge: "Memory Leak in Cache", ttd: "28m 15s", score: 88, status: "Evaluated" },
  { id: "CAN-004", name: "Priya Patel", challenge: "Unindexed DB Query", ttd: "8m 20s", score: 96, status: "Evaluated" },
  { id: "CAN-005", name: "David Kim", challenge: "Memory Leak in Cache", ttd: "--", score: null, status: "In Progress" },
];

export default function CompanyDashboard() {
  return (
    <div className="flex-1 bg-charcoal text-cloud p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex justify-between items-end border-b border-cloud/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
              <span className="w-2 h-8 bg-electric inline-block rounded-sm" />
              Company Dashboard
            </h1>
            <p className="text-cloud/60">Overview of candidate assessments and AI evaluations.</p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm font-mono text-cloud/40">SYS.STATUS: ONLINE</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Quick Stats */}
          <div className="bg-cloud/5 border border-cloud/10 rounded-lg p-6 hover:border-cloud/20 transition-colors">
            <h3 className="text-sm font-medium text-cloud/60 mb-1">Total Candidates</h3>
            <p className="text-3xl font-bold">124</p>
          </div>
          <div className="bg-cloud/5 border border-cloud/10 rounded-lg p-6 relative overflow-hidden group hover:border-electric/30 transition-colors">
            <h3 className="text-sm font-medium text-cloud/60 mb-1">Avg. Time to Discover</h3>
            <p className="text-3xl font-bold text-electric">14m 20s</p>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-electric/10 rounded-full blur-2xl group-hover:bg-electric/20 transition-colors" />
          </div>
          <div className="bg-cloud/5 border border-cloud/10 rounded-lg p-6 relative overflow-hidden group hover:border-orange/30 transition-colors">
            <h3 className="text-sm font-medium text-cloud/60 mb-1">Avg. AI Accuracy Score</h3>
            <p className="text-3xl font-bold text-orange">84 / 100</p>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange/10 rounded-full blur-2xl group-hover:bg-orange/20 transition-colors" />
          </div>
        </div>

        <div className="bg-charcoal border border-cloud/10 rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cloud/5 border-b border-cloud/10">
                  <th className="p-5 text-xs font-semibold text-cloud/60 uppercase tracking-widest">Candidate ID</th>
                  <th className="p-5 text-xs font-semibold text-cloud/60 uppercase tracking-widest">Name</th>
                  <th className="p-5 text-xs font-semibold text-cloud/60 uppercase tracking-widest">Challenge</th>
                  <th className="p-5 text-xs font-semibold text-cloud/60 uppercase tracking-widest">TTD</th>
                  <th className="p-5 text-xs font-semibold text-cloud/60 uppercase tracking-widest">AI Score</th>
                  <th className="p-5 text-xs font-semibold text-cloud/60 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CANDIDATES.map((candidate, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={candidate.id} 
                    className="border-b border-cloud/5 hover:bg-cloud/5 transition-colors group cursor-pointer"
                  >
                    <td className="p-5 font-mono text-sm text-cloud/60 group-hover:text-electric transition-colors">{candidate.id}</td>
                    <td className="p-5 font-medium">{candidate.name}</td>
                    <td className="p-5 text-cloud/80">{candidate.challenge}</td>
                    <td className="p-5 font-mono text-sm">{candidate.ttd}</td>
                    <td className="p-5">
                      {candidate.score !== null ? (
                        <div className="flex items-center gap-3">
                          <span className={`font-bold w-6 text-right ${candidate.score >= 80 ? 'text-electric' : candidate.score < 50 ? 'text-red-400' : 'text-orange'}`}>
                            {candidate.score}
                          </span>
                          <div className="w-20 h-1.5 bg-cloud/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${candidate.score}%` }}
                              transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              className={`h-full ${candidate.score >= 80 ? 'bg-electric shadow-[0_0_10px_rgba(64,224,255,0.5)]' : candidate.score < 50 ? 'bg-red-400' : 'bg-orange'}`}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-cloud/30 italic">Pending</span>
                      )}
                    </td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 text-xs rounded-md font-medium tracking-wide ${
                        candidate.status === 'Evaluated' 
                          ? 'bg-cloud/10 text-cloud' 
                          : 'bg-orange/10 text-orange border border-orange/20'
                      }`}>
                        {candidate.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
