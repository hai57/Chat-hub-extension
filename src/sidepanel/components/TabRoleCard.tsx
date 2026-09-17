import React from 'react';
import { Tag, ArrowRightLeft } from 'lucide-react';
import { TabRole } from '../../shared/types';

interface TabRoleCardProps {
  currentRole: TabRole;
  onSelectRole: (role: TabRole) => void;
  onSwitchTab?: (targetRole: TabRole) => void;
}

export const TabRoleCard: React.FC<TabRoleCardProps> = ({
  currentRole,
  onSelectRole,
  onSwitchTab,
}) => {
  const roles: { id: TabRole; label: string }[] = [
    { id: 'dev', label: 'Dev' },
    { id: 'reviewer', label: 'Reviewer' },
    { id: 'summary', label: 'Summary' },
  ];

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[11px] font-bold tracking-wider text-gray-400 uppercase flex items-center space-x-1">
          <Tag className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tab Role</span>
        </h3>
        {currentRole !== 'none' && (
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
            Set: {currentRole}
          </span>
        )}
      </div>

      {/* Segmented Role Selector */}
      <div className="flex bg-dark-bg p-1 rounded-lg border border-dark-border gap-1 mb-3">
        {roles.map((role) => {
          const isSelected = currentRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-dark-hover'
              }`}
            >
              {role.label}
            </button>
          );
        })}
      </div>

      {/* Quick Switch Tab Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-dark-border/60">
        <button
          onClick={() => onSwitchTab && onSwitchTab('dev')}
          className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-dark-bg hover:bg-dark-hover border border-dark-border rounded-lg text-[11px] text-gray-300 transition-all"
        >
          <ArrowRightLeft className="w-3 h-3 text-emerald-400" />
          <span>Switch to Dev</span>
        </button>

        <button
          onClick={() => onSwitchTab && onSwitchTab('reviewer')}
          className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-dark-bg hover:bg-dark-hover border border-dark-border rounded-lg text-[11px] text-gray-300 transition-all"
        >
          <ArrowRightLeft className="w-3 h-3 text-emerald-400" />
          <span>Switch to Reviewer</span>
        </button>
      </div>
    </div>
  );
};
