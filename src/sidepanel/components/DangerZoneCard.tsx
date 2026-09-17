import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DangerZoneCardProps {
  onClear: () => void;
}

export const DangerZoneCard: React.FC<DangerZoneCardProps> = ({ onClear }) => {
  return (
    <div className="bg-dark-card border border-red-500/20 rounded-xl p-3 shadow-sm">
      <h3 className="text-[11px] font-bold tracking-wider text-red-400 uppercase mb-2 flex items-center space-x-1">
        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
        <span>Danger Zone</span>
      </h3>

      <button
        onClick={onClear}
        className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs font-semibold transition-all active:scale-98"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Clear clipboard & result</span>
      </button>
    </div>
  );
};
