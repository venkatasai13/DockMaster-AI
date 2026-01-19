
import React, { useState } from 'react';
import { GeneratedFile } from '../types';

interface CodeViewerProps {
  files: GeneratedFile[];
  explanation: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ files, explanation }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = files[activeIdx];

  const handleCopy = () => {
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!files || files.length === 0) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex bg-slate-900 border-b border-slate-700 overflow-x-auto scrollbar-hide">
        {files.map((file, idx) => (
          <button
            key={file.name}
            onClick={() => setActiveIdx(idx)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
              activeIdx === idx 
                ? 'text-blue-400 border-blue-400 bg-slate-800' 
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      <div className="relative group flex-1 min-h-[500px] bg-slate-900 p-4">
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-slate-600 flex items-center gap-2"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Copy</span>
            </>
          )}
        </button>

        <pre className="mono text-sm text-slate-300 overflow-auto h-full p-4 whitespace-pre-wrap leading-relaxed">
          {activeFile.content}
        </pre>
      </div>

      <div className="bg-slate-800 p-6 border-t border-slate-700 rounded-b-xl mt-4">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          DevOps Insights
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
          {explanation}
        </p>
      </div>
    </div>
  );
};
