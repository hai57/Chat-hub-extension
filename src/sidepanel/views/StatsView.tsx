import React from 'react';
import { BarChart3, Zap, Copy, Syringe } from 'lucide-react';

export const StatsView: React.FC = () => {
  return (
    <div className="p-3 space-y-3">
      <h2 className="text-xs font-bold text-gray-200 flex items-center space-x-1.5">
        <BarChart3 className="w-4 h-4 text-emerald-400" />
        <span>Usage Statistics</span>
      </h2>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-dark-card border border-dark-border p-3 rounded-xl">
          <div className="text-gray-400 text-[10px] uppercase font-semibold flex items-center space-x-1">
            <Syringe className="w-3 h-3 text-emerald-400" />
            <span>Prompts Injected</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1">24</div>
        </div>

        <div className="bg-dark-card border border-dark-border p-3 rounded-xl">
          <div className="text-gray-400 text-[10px] uppercase font-semibold flex items-center space-x-1">
            <Copy className="w-3 h-3 text-emerald-400" />
            <span>Copies Made</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1">42</div>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border p-3 rounded-xl space-y-2">
        <h3 className="text-xs font-semibold text-gray-300 flex items-center space-x-1">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Site Adapters</span>
        </h3>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-gray-300">
            <span>DeepSeek (chat.deepseek.com)</span>
            <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">READY</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>ChatGPT (chatgpt.com)</span>
            <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
