import React from 'react';
import { Sparkles, Power } from 'lucide-react';

interface HeaderProps {
  isEnabled: boolean;
  onToggleEnabled: () => void;
  siteName: string;
  tabId: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  isEnabled,
  onToggleEnabled,
  siteName,
  tabId,
}) => {
  return (
    <div className="p-4 border-b border-dark-border bg-dark-card/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-gray-100 tracking-wide">AI Chat Hub</h1>
            <p className="text-[10px] text-gray-400">Multi-agent Flow & Prompt Copilot</p>
          </div>
        </div>

        {/* Power Switch Button */}
        <button
          onClick={onToggleEnabled}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            isEnabled
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'bg-gray-800 text-gray-400 border border-gray-700'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>{isEnabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Connected Tab Status Indicator */}
      <div className="mt-2 text-[11px] text-gray-400 flex items-center justify-between bg-dark-bg/60 px-2.5 py-1.5 rounded-md border border-dark-border/60">
        <span className="flex items-center space-x-1.5 truncate max-w-[200px]">
          <span className={`w-2 h-2 rounded-full ${siteName !== 'Unknown' ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`}></span>
          <span className="truncate">
            {siteName !== 'Unknown' ? `Connected: ${siteName}` : 'No AI tab active'}
          </span>
        </span>
        {tabId && <span className="text-[10px] text-gray-500 font-mono">ID: {tabId}</span>}
      </div>
    </div>
  );
};
