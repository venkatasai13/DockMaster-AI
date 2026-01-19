
import React from 'react';
import { ProjectConfig, WebFramework, DatabaseType } from '../types';

interface ConfigFormProps {
  config: ProjectConfig;
  onChange: (updates: Partial<ProjectConfig>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ config, onChange, onSubmit, isLoading }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14V8"/><path d="M12 18h.01"/><path d="M16 12h-8"/></svg>
        App Configuration
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Project Name</label>
          <input
            type="text"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={config.projectName}
            onChange={(e) => onChange({ projectName: e.target.value })}
            placeholder="my-web-app"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Framework</label>
            <select
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={config.framework}
              onChange={(e) => onChange({ framework: e.target.value as WebFramework })}
            >
              <option value={WebFramework.FLASK}>{WebFramework.FLASK}</option>
              <option value={WebFramework.DJANGO}>{WebFramework.DJANGO}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Database</label>
            <select
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={config.database}
              onChange={(e) => onChange({ database: e.target.value as DatabaseType })}
            >
              <option value={DatabaseType.POSTGRES}>{DatabaseType.POSTGRES}</option>
              <option value={DatabaseType.MYSQL}>{DatabaseType.MYSQL}</option>
              <option value={DatabaseType.SQLITE}>{DatabaseType.SQLITE}</option>
              <option value={DatabaseType.NONE}>{DatabaseType.NONE}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Python Version</label>
            <input
              type="text"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={config.pythonVersion}
              onChange={(e) => onChange({ pythonVersion: e.target.value })}
              placeholder="3.11-slim"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Entry Point</label>
            <input
              type="text"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={config.entryPoint}
              onChange={(e) => onChange({ entryPoint: e.target.value })}
              placeholder="app:app"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
              checked={config.useNginx}
              onChange={(e) => onChange({ useNginx: e.target.checked })}
            />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Include Nginx Proxy</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
              checked={config.useRedis}
              onChange={(e) => onChange({ useRedis: e.target.checked })}
            />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Include Redis Cache</span>
          </label>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-lg transition-all transform active:scale-95 ${
            isLoading 
              ? 'bg-slate-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/20'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Dockerizing...
            </span>
          ) : (
            'Generate Docker Setup'
          )}
        </button>
      </div>
    </div>
  );
};
