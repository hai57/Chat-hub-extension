import React from 'react';
import { Zap } from 'lucide-react';

interface AutomationCardProps {
  isAutomationOn: boolean;
  onToggleAutomation: () => void;
}

export const AutomationCard: React.FC<AutomationCardProps> = ({
  isAutomationOn,
  onToggleAutomation,
}) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-gray-200">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Automation</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">Enable full AI workflow loop</p>
        </div>

        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAutomationOn}
            onChange={onToggleAutomation}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
        </label>
      </div>
    </div>
  );
};
