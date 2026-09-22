import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, ActiveTab } from './components/Navigation';
import { AutomationCard } from './components/AutomationCard';
import { QuickActionsCard } from './components/QuickActionsCard';
import { TabRoleCard } from './components/TabRoleCard';
import { InjectContextCard } from './components/InjectContextCard';
import { DangerZoneCard } from './components/DangerZoneCard';
import { PromptsView } from './views/PromptsView';
import { StatsView } from './views/StatsView';
import { SettingsView } from './views/SettingsView';
import { AgentContext, TabRole, QuickActionType, ActionResponse } from '../shared/types';
import { getStoredContexts, saveStoredContexts, getTabRoles, saveTabRole } from '../shared/storage';

export const SidePanel: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('flow');
  const [isAutomationOn, setIsAutomationOn] = useState(false);

  // Active Tab state
  const [activeChromeTab, setActiveChromeTab] = useState<{
    id: number | null;
    url: string;
    siteName: string;
    role: TabRole;
  }>({
    id: null,
    url: '',
    siteName: 'Unknown',
    role: 'none',
  });

  const [contexts, setContexts] = useState<AgentContext[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load Contexts & Detect Active Tab
  useEffect(() => {
    getStoredContexts().then(setContexts);

    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const tab = tabs[0];
        if (tab && tab.id && tab.url) {
          let siteName = 'Unknown';
          if (tab.url.includes('chat.deepseek.com')) siteName = 'DeepSeek';
          else if (tab.url.includes('chatgpt.com') || tab.url.includes('chat.openai.com')) siteName = 'ChatGPT';
          else if (tab.url.includes('claude.ai')) siteName = 'Claude';
          else if (tab.url.includes('gemini.google.com')) siteName = 'Gemini';
          else if (tab.url.includes('grok.com') || tab.url.includes('x.com/i/grok')) siteName = 'Grok';
          else if (tab.url.includes('copilot.microsoft.com') || tab.url.includes('copilot.cloud.microsoft') || tab.url.includes('bing.com/chat')) siteName = 'Copilot';
          else if (tab.url.includes('perplexity.ai')) siteName = 'Perplexity';
          else if (tab.url.includes('chat.mistral.ai')) siteName = 'Mistral';

          const roles = await getTabRoles();
          const currentRole = roles[tab.id] || 'none';

          setActiveChromeTab({
            id: tab.id,
            url: tab.url,
            siteName,
            role: currentRole,
          });
        }
      });
    }
  }, []);

  // Send action to current active tab content script
  const handleExecuteAction = (action: QuickActionType, payloadText?: string) => {
    if (!activeChromeTab.id) {
      console.warn('No active tab detected');
      return;
    }

    setIsLoading(true);
    chrome.tabs.sendMessage(
      activeChromeTab.id,
      {
        type: 'EXECUTE_ACTION',
        action,
        payload: { text: payloadText },
      },
      (_res: ActionResponse) => {
        setIsLoading(false);
        if (chrome.runtime && chrome.runtime.lastError) {
          console.warn('Chrome runtime error:', chrome.runtime.lastError.message);
        }
      }
    );
  };

  // Handle Tab Role selection
  const handleRoleSelect = async (role: TabRole) => {
    if (activeChromeTab.id) {
      await saveTabRole(activeChromeTab.id, role);
      setActiveChromeTab((prev) => ({ ...prev, role }));
    }
  };

  // Handle Switch to Tab by Role
  const handleSwitchTab = (targetRole: TabRole) => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      getTabRoles().then((roles) => {
        const targetTabId = Object.keys(roles).find((id) => roles[Number(id)] === targetRole);
        if (targetTabId) {
          chrome.tabs.update(Number(targetTabId), { active: true });
        } else {
          alert(`No tab currently set with role: "${targetRole}"`);
        }
      });
    }
  };

  // Prompt Library Handlers
  const handleAddContext = (newCtx: AgentContext) => {
    const updated = [newCtx, ...contexts];
    setContexts(updated);
    saveStoredContexts(updated);
  };

  const handleDeleteContext = (id: string) => {
    const updated = contexts.filter((c) => c.id !== id);
    setContexts(updated);
    saveStoredContexts(updated);
  };

  const handleInjectContext = (context: AgentContext) => {
    handleExecuteAction('INJECT', context.prompt);
  };

  const handleClearAll = () => {
    navigator.clipboard.writeText('');
    handleExecuteAction('CLEAR');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        isEnabled={isEnabled}
        onToggleEnabled={() => setIsEnabled(!isEnabled)}
        siteName={activeChromeTab.siteName}
        tabId={activeChromeTab.id}
      />

      {/* Navigation Bar */}
      <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'flow' && (
          <div className="p-3 space-y-3">
            {/* Automation Toggle Card */}
            <AutomationCard
              isAutomationOn={isAutomationOn}
              onToggleAutomation={() => setIsAutomationOn(!isAutomationOn)}
            />

            {/* Quick Actions Card */}
            <QuickActionsCard
              onExecuteAction={handleExecuteAction}
              isLoading={isLoading}
            />

            {/* Tab Role Card */}
            <TabRoleCard
              currentRole={activeChromeTab.role}
              onSelectRole={handleRoleSelect}
              onSwitchTab={handleSwitchTab}
            />

            {/* Inject Context Card */}
            <InjectContextCard
              contexts={contexts}
              onInjectContext={handleInjectContext}
              isLoading={isLoading}
            />

            {/* Danger Zone Card */}
            <DangerZoneCard onClear={handleClearAll} />
          </div>
        )}

        {activeTab === 'prompts' && (
          <PromptsView
            contexts={contexts}
            onAddContext={handleAddContext}
            onDeleteContext={handleDeleteContext}
            onInject={handleInjectContext}
          />
        )}

        {activeTab === 'stats' && <StatsView />}

        {activeTab === 'settings' && <SettingsView />}
      </div>
    </div>
  );
};

export default SidePanel;
