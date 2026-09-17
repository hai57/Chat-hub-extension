export type TabRole = 'dev' | 'reviewer' | 'summary' | 'none';

export type QuickActionType = 'COPY' | 'PASTE' | 'SEND' | 'INJECT' | 'CLEAR';

export interface AgentContext {
  id: string;
  name: string;
  category: string;
  prompt: string;
}

export interface QuickActionMessage {
  type: 'EXECUTE_ACTION';
  action: QuickActionType;
  payload?: {
    text?: string;
    contextId?: string;
  };
}

export interface ActionResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface TabInfo {
  id: number;
  url: string;
  title: string;
  siteName: string;
  role: TabRole;
}
