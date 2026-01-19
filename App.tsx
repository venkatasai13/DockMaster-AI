
import React, { useState, useCallback } from 'react';
import { ProjectConfig, WebFramework, DatabaseType, DockerizationResult } from './types';
import { GeminiService } from './services/geminiService';
import { ConfigForm } from './components/ConfigForm';
import { CodeViewer } from './components/CodeViewer';

const App: React.FC = () => {
  const [config, setConfig] = useState<ProjectConfig>({
    framework: WebFramework.FLASK,
    database: DatabaseType.POSTGRES,
    useNginx: true,
    useRedis: false,
    pythonVersion: '3.11-slim',
    entryPoint: 'app:app',
    projectName: 'dock-demo'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DockerizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConfigChange = useCallback((updates: Partial<ProjectConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const service = new GeminiService();
      const data = await service.generateDockerSetup(config);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">DockMaster AI</h1>
            <p className="text-xs text-slate-400 font-medium">Enterprise Docker Architect</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Templates</a>
          </nav>
          <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-slate-700">
            Support Project
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar - Controls */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-24">
            <ConfigForm 
              config={config} 
              onChange={handleConfigChange} 
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
            
            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <div className="mt-6 p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-lg">
              <h4 className="text-sm font-bold text-indigo-300 mb-2 uppercase tracking-wider">Quick Pro Tip</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Using <code className="text-indigo-300 font-mono">3.x-slim</code> or <code className="text-indigo-300 font-mono">alpine</code> images significantly reduces your attack surface and deployment time. Our generator always follows multi-stage build best practices.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Area - Code Result */}
        <div className="lg:col-span-8 flex flex-col min-h-[600px]">
          {result ? (
            <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CodeViewer files={result.files} explanation={result.explanation} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-2xl p-12 text-center group">
              <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-slate-600 group-hover:text-blue-500 transition-colors border border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-3">Ready to Containerize?</h3>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                Configure your stack on the left and click "Generate Docker Setup" to receive a battle-tested, production-ready environment setup.
              </p>
              <div className="mt-8 flex gap-3">
                <div className="px-3 py-1 bg-slate-800 text-xs font-mono text-slate-400 rounded border border-slate-700">Dockerfile</div>
                <div className="px-3 py-1 bg-slate-800 text-xs font-mono text-slate-400 rounded border border-slate-700">docker-compose.yml</div>
                <div className="px-3 py-1 bg-slate-800 text-xs font-mono text-slate-400 rounded border border-slate-700">nginx.conf</div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 DockMaster AI. Powered by Google Gemini 3 Flash.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              API Status: Operational
            </span>
            <div className="h-4 w-[1px] bg-slate-700"></div>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Terms</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
