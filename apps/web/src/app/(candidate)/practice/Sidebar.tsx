"use client";

interface SidebarProps {
  isArchitectureIssue: boolean;
  setIsArchitectureIssue: (val: boolean) => void;
  selectedLinesCount: number;
}

export default function Sidebar({
  isArchitectureIssue,
  setIsArchitectureIssue,
  selectedLinesCount,
}: SidebarProps) {
  return (
    <div className="w-full lg:w-[450px] flex flex-col bg-charcoal h-[40vh] lg:h-full border-t lg:border-t-0 border-cloud/10">
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-6 tracking-tight text-cloud flex items-center gap-2">
          <span className="w-1.5 h-6 bg-electric rounded-sm inline-block" />
          Critique & Fix
        </h2>

        <div className="flex items-center justify-between p-4 bg-cloud/5 rounded-lg border border-cloud/10 mb-6">
          <div>
            <h3 className="font-medium text-cloud tracking-wide">Architecture Issue</h3>
            <p className="text-xs text-cloud/50 mt-1 max-w-[200px] leading-relaxed">
              Check this if the issue spans the entire design, not specific lines.
            </p>
          </div>
          <button
            onClick={() => setIsArchitectureIssue(!isArchitectureIssue)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 focus:ring-offset-charcoal ${
              isArchitectureIssue ? "bg-orange" : "bg-cloud/20"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-charcoal transition-transform duration-300 ease-in-out ${
                isArchitectureIssue ? "translate-x-7 bg-cloud" : "translate-x-1 bg-cloud/50"
              }`}
            />
          </button>
        </div>

        {!isArchitectureIssue && (
          <div className="mb-4">
            <span className="text-xs font-mono text-electric bg-electric/10 border border-electric/20 px-2 py-1 rounded">
              {selectedLinesCount} LINE{selectedLinesCount !== 1 ? 'S' : ''} SELECTED
            </span>
          </div>
        )}

        <div className="flex-1 flex flex-col min-h-0">
          <label className="text-sm font-medium text-cloud/70 mb-2">
            Your Critique
          </label>
          <textarea
            className="w-full flex-1 bg-charcoal border border-cloud/20 rounded-md p-4 text-cloud focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric resize-none font-mono text-sm leading-relaxed"
            placeholder="Identify the fault, explain why it fails, and propose a robust solution..."
          />
        </div>

        <button className="mt-6 w-full py-4 bg-electric text-charcoal font-bold rounded-md hover:bg-electric/90 transition-all shadow-[0_0_15px_rgba(64,224,255,0.2)] hover:shadow-[0_0_25px_rgba(64,224,255,0.4)]">
          Submit Analysis
        </button>
      </div>
    </div>
  );
}
