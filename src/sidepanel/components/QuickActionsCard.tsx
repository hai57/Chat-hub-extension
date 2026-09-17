import React from 'react';
import { Copy, Clipboard, Send } from 'lucide-react';
import { QuickActionType } from '../../shared/types';

interface QuickActionsCardProps {
  onExecuteAction: (action: QuickActionType) => void;
  isLoading?: boolean;
}

export const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onExecuteAction,
  isLoading = false,
}) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-3 shadow-sm">
      <h3 className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">
        Quick Actions
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {/* Copy Button */}
        <button
          onClick={() => onExecuteAction('COPY')}
          disabled={isLoading}
          className="flex flex-col items-center justify-center py-2.5 px-3 bg-dark-bg hover:bg-dark-hover border border-dark-border rounded-lg text-gray-200 hover:text-emerald-400 transition-all text-xs font-medium active:scale-95 disabled:opacity-50"
        >
          <Copy className="w-4 h-4 mb-1 text-emerald-400" />
          <span>Copy</span>
        </button>

        {/* Paste Button */}
        <button
          onClick={() => onExecuteAction('PASTE')}
          disabled={isLoading}
          className="flex flex-col items-center justify-center py-2.5 px-3 bg-dark-bg hover:bg-dark-hover border border-dark-border rounded-lg text-gray-200 hover:text-emerald-400 transition-all text-xs font-medium active:scale-95 disabled:opacity-50"
        >
          <Clipboard className="w-4 h-4 mb-1 text-emerald-400" />
          <span>Paste</span>
        </button>

        {/* Send Button */}
        <button
          onClick={() => onExecuteAction('SEND')}
          disabled={isLoading}
          className="flex flex-col items-center justify-center py-2.5 px-3 bg-dark-bg hover:bg-dark-hover border border-dark-border rounded-lg text-gray-200 hover:text-emerald-400 transition-all text-xs font-medium active:scale-95 disabled:opacity-50"
        >
          <Send className="w-4 h-4 mb-1 text-emerald-400" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
