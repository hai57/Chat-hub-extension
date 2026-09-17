import React from 'react';
import { Workflow, BookOpen, BarChart3, Settings } from 'lucide-react';

export type ActiveTab = 'flow' | 'prompts' | 'stats' | 'settings';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'flow', label: 'Flow', icon: <Workflow className="w-3.5 h-3.5" /> },
    { id: 'prompts', label: 'Prompts', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'stats', label: 'Stats', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex items-center justify-between p-1.5 bg-dark-bg border-b border-dark-border gap-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
              isActive
                ? 'bg-dark-card text-emerald-400 border border-dark-border shadow-sm'
                : 'text-gray-400 hover:text-gray-200 hover:bg-dark-hover'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
