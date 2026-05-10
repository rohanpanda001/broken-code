"use client";

import { useState } from "react";
import EditorPane from "./EditorPane";
import Sidebar from "./Sidebar";

export default function PracticePage() {
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [isArchitectureIssue, setIsArchitectureIssue] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-charcoal text-cloud overflow-hidden">
      <div className="flex-grow flex flex-col h-[60vh] lg:h-full relative border-b lg:border-b-0 lg:border-r border-cloud/10">
        {/* Header for Editor */}
        <div className="h-14 border-b border-cloud/10 flex items-center px-6 bg-charcoal">
          <div className="flex gap-2 items-center">
            <span className="w-3 h-3 rounded-full bg-electric opacity-80" />
            <h2 className="font-mono text-sm tracking-wider text-cloud/70">src/services/payment.ts</h2>
          </div>
        </div>
        
        <EditorPane 
          selectedLines={selectedLines} 
          setSelectedLines={setSelectedLines} 
          disabled={isArchitectureIssue} 
        />
      </div>

      <Sidebar 
        isArchitectureIssue={isArchitectureIssue} 
        setIsArchitectureIssue={setIsArchitectureIssue} 
        selectedLinesCount={selectedLines.length}
      />
    </div>
  );
}
