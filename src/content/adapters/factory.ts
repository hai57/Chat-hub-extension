import { SiteAdapter } from './types';
import { DeepSeekAdapter } from './deepseek';
import { ChatGPTAdapter } from './chatgpt';

const adapters: SiteAdapter[] = [
  new DeepSeekAdapter(),
  new ChatGPTAdapter(),
];

export function getAdapterForUrl(url: string): SiteAdapter | null {
  for (const adapter of adapters) {
    if (adapter.isMatched(url)) {
      return adapter;
    }
  }
  return null;
}
