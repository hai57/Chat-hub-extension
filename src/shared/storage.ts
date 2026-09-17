import { AgentContext, TabRole } from './types';

export const DEFAULT_CONTEXTS: AgentContext[] = [
  {
    id: 'agent-dev',
    name: 'Senior Fullstack Dev',
    category: 'Development',
    prompt: 'You are an expert Senior Fullstack Software Engineer. Provide clean, modular, type-safe code with clear explanations and best practices.'
  },
  {
    id: 'agent-reviewer',
    name: 'Code Reviewer & Security Audit',
    category: 'Development',
    prompt: 'You are a Strict Code Reviewer & Security Auditor. Analyze the provided code for bugs, edge cases, security vulnerabilities, and performance bottlenecks.'
  },
  {
    id: 'agent-summarizer',
    name: 'Technical Summarizer',
    category: 'Productivity',
    prompt: 'Summarize the given technical content into concise bullet points focusing on key architectural decisions, algorithms, and implementation steps.'
  },
  {
    id: 'agent-translator',
    name: 'Tech Translator (EN -> VI)',
    category: 'Translation',
    prompt: 'Dịch đoạn văn bản kỹ thuật sau sang tiếng Việt chuyên ngành IT mượt mà, tự nhiên và giữ nguyên các thuật ngữ thuật toán/code.'
  }
];

export async function getStoredContexts(): Promise<AgentContext[]> {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    const data = await chrome.storage.local.get('agent_contexts');
    return data.agent_contexts || DEFAULT_CONTEXTS;
  }
  return DEFAULT_CONTEXTS;
}

export async function saveStoredContexts(contexts: AgentContext[]): Promise<void> {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    await chrome.storage.local.set({ agent_contexts: contexts });
  }
}

export async function getTabRoles(): Promise<Record<number, TabRole>> {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    const data = await chrome.storage.local.get('tab_roles');
    return data.tab_roles || {};
  }
  return {};
}

export async function saveTabRole(tabId: number, role: TabRole): Promise<void> {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    const current = await getTabRoles();
    current[tabId] = role;
    await chrome.storage.local.set({ tab_roles: current });
  }
}
