import React from 'react';
import { Settings, Shield } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="p-3 space-y-3">
      <h2 className="text-xs font-bold text-gray-200 flex items-center space-x-1.5">
        <Settings className="w-4 h-4 text-emerald-400" />
        <span>Extension Settings</span>
      </h2>

      <div className="bg-dark-card border border-dark-border p-3 rounded-xl space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-200">Auto-focus Input</div>
            <div className="text-[10px] text-gray-400">Focus chat box after injecting prompt</div>
          </div>
          <input type="checkbox" defaultChecked className="accent-emerald-500" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-dark-border">
          <div>
            <div className="font-semibold text-gray-200">Dark Theme</div>
            <div className="text-[10px] text-gray-400">Sonsery Flow dark card theme</div>
          </div>
          <input type="checkbox" defaultChecked disabled className="accent-emerald-500" />
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border p-3 rounded-xl space-y-2 text-xs">
        <h3 className="font-semibold text-gray-200 flex items-center space-x-1">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Privacy & Storage</span>
        </h3>
        <p className="text-[10px] text-gray-400">
          All prompt templates and role configs are saved locally on your browser. No personal chat data is collected or sent to external servers.
        </p>
      </div>
    </div>
  );
};
