import React, { useState } from 'react';
import { AgentContext } from '../../shared/types';
import { Plus, Search, Trash2, Syringe } from 'lucide-react';

interface PromptsViewProps {
  contexts: AgentContext[];
  onAddContext: (context: AgentContext) => void;
  onDeleteContext: (id: string) => void;
  onInject: (context: AgentContext) => void;
}

export const PromptsView: React.FC<PromptsViewProps> = ({
  contexts,
  onAddContext,
  onDeleteContext,
  onInject,
}) => {
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [promptText, setPromptText] = useState('');

  const filtered = contexts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.prompt.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !promptText.trim()) return;

    const newCtx: AgentContext = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category: category.trim() || 'General',
      prompt: promptText.trim(),
    };

    onAddContext(newCtx);
    setName('');
    setPromptText('');
    setIsAdding(false);
  };

  return (
    <div className="p-3 space-y-3">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-gray-200">Prompt & Agent Library</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-1 py-1 px-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-xs font-semibold shadow transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Prompt</span>
        </button>
      </div>

      {/* Add Form Modal/Card */}
      {isAdding && (
        <form onSubmit={handleCreate} className="bg-dark-card border border-emerald-500/30 rounded-xl p-3 space-y-2">
          <input
            type="text"
            placeholder="Prompt Title (e.g. Code Refactor Assistant)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded px-2.5 py-1 text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
            required
          />
          <input
            type="text"
            placeholder="Category (e.g. Coding, Writing)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded px-2.5 py-1 text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
          />
          <textarea
            placeholder="System Prompt / Template..."
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={3}
            className="w-full bg-dark-bg border border-dark-border rounded px-2.5 py-1 text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
            required
          />
          <div className="flex justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-2.5 py-1 bg-dark-bg text-gray-400 rounded text-xs hover:bg-dark-hover"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-emerald-500 text-white rounded text-xs font-semibold hover:bg-emerald-600"
            >
              Save Prompt
            </button>
          </div>
        </form>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
        <input
          type="text"
          placeholder="Search prompts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-dark-card border border-dark-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* List of Prompts */}
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {filtered.map((item) => (
          <div key={item.id} className="bg-dark-card border border-dark-border rounded-xl p-2.5 hover:border-dark-border/80 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-gray-200">{item.name}</span>
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                {item.category}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 italic">"{item.prompt}"</p>
            <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-dark-border/60">
              <button
                onClick={() => onDeleteContext(item.id)}
                className="text-gray-500 hover:text-red-400 text-xs p-1"
                title="Delete prompt"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onInject(item)}
                className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[11px] font-medium transition-all"
              >
                <Syringe className="w-3 h-3" />
                <span>Inject Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
