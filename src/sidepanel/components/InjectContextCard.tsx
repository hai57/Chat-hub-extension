import React, { useState } from 'react';
import { Syringe, Check, AlertCircle } from 'lucide-react';
import { AgentContext } from '../../shared/types';

interface InjectContextCardProps {
  contexts: AgentContext[];
  onInjectContext: (context: AgentContext) => void;
  isLoading?: boolean;
}

export const InjectContextCard: React.FC<InjectContextCardProps> = ({
  contexts,
  onInjectContext,
  isLoading = false,
}) => {
  const [selectedId, setSelectedId] = useState<string>(contexts[0]?.id || '');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const selectedContext = contexts.find((c) => c.id === selectedId) || contexts[0];

  const handleInject = () => {
    if (!selectedContext) return;
    onInjectContext(selectedContext);
    setFeedback({ type: 'success', msg: `Injected context: "${selectedContext.name}"` });
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-3 shadow-sm">
      <h3 className="text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2 flex items-center space-x-1">
        <Syringe className="w-3.5 h-3.5 text-emerald-400" />
        <span>Inject Context / Agent</span>
      </h3>

      <div className="flex items-center space-x-2">
        {/* Dropdown Selection */}
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-emerald-500 transition-all truncate"
        >
          {contexts.map((c) => (
            <option key={c.id} value={c.id} className="bg-dark-card text-gray-200">
              {c.name} ({c.category})
            </option>
          ))}
        </select>

        {/* Inject Button */}
        <button
          onClick={handleInject}
          disabled={isLoading || !selectedContext}
          className="py-1.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow transition-all active:scale-95 disabled:opacity-50 flex items-center space-x-1 shrink-0"
        >
          <span>Inject</span>
        </button>
      </div>

      {/* Preview text */}
      {selectedContext && (
        <p className="mt-2 text-[10px] text-gray-400 italic line-clamp-2 bg-dark-bg/40 p-1.5 rounded border border-dark-border/40">
          "{selectedContext.prompt}"
        </p>
      )}

      {/* Status Feedback */}
      {feedback && (
        <div
          className={`mt-2 p-1.5 rounded text-[11px] flex items-center space-x-1 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}
        >
          {feedback.type === 'success' ? (
            <Check className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          )}
          <span className="truncate">{feedback.msg}</span>
        </div>
      )}
    </div>
  );
};
