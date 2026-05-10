/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

interface EditorPaneProps {
  selectedLines: number[];
  setSelectedLines: React.Dispatch<React.SetStateAction<number[]>>;
  disabled: boolean;
}

const mockCode = `export class PaymentService {
  constructor(private readonly db: Database) {}

  async processPayment(userId: string, amount: number) {
    const user = await this.db.users.findById(userId);
    
    // BUG: Missing check for user existence or balance
    user.balance -= amount;
    
    await this.db.users.save(user);
    
    return { success: true };
  }
}
`;

export default function EditorPane({ selectedLines, setSelectedLines, disabled }: EditorPaneProps) {
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);
  const decorationsCollectionRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monacoInstance: any) => {
    editorRef.current = editor;
    
    if (editor.createDecorationsCollection) {
      decorationsCollectionRef.current = editor.createDecorationsCollection([]);
    }

    editor.onMouseDown((e: any) => {
      if (disabled) return;
      
      const position = e.target.position;
      if (!position) return;
      
      const lineNumber = position.lineNumber;
      
      setSelectedLines((prev) => {
        if (prev.includes(lineNumber)) {
          return prev.filter((line) => line !== lineNumber);
        } else {
          return [...prev, lineNumber];
        }
      });
    });
  };

  useEffect(() => {
    if (disabled && selectedLines.length > 0) {
      setSelectedLines([]);
    }
  }, [disabled, selectedLines.length, setSelectedLines]);

  useEffect(() => {
    if (!editorRef.current || !monaco) return;

    const newDecorations = selectedLines.map((line) => ({
      range: new monaco.Range(line, 1, line, 1),
      options: {
        isWholeLine: true,
        className: "monaco-line-highlight",
      },
    }));

    if (decorationsCollectionRef.current) {
      decorationsCollectionRef.current.set(newDecorations);
    } else {
      // Fallback for older versions
      editorRef.current.deltaDecorations([], newDecorations);
    }
  }, [selectedLines, monaco]);

  return (
    <div className="flex-1 w-full h-full relative">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={mockCode}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 15,
          fontFamily: "monospace",
          lineHeight: 26,
          padding: { top: 24 },
          cursorStyle: "line-thin",
          matchBrackets: "never",
          selectionHighlight: false,
          occurrencesHighlight: "off",
          renderLineHighlight: "none",
        }}
        onMount={handleEditorDidMount}
      />
      {disabled && (
        <div className="absolute inset-0 bg-charcoal/40 z-10 flex items-center justify-center pointer-events-none transition-all duration-300">
          <div className="bg-charcoal border border-orange text-orange px-6 py-3 rounded-md font-mono text-sm tracking-wider shadow-[0_0_20px_rgba(255,140,0,0.15)]">
            LINE SELECTION DISABLED
          </div>
        </div>
      )}
    </div>
  );
}
