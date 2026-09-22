import { SiteAdapter } from './types';
import { DeepSeekAdapter } from './deepseek';
import { ChatGPTAdapter } from './chatgpt';
import { ClaudeAdapter } from './claude';
import { GeminiAdapter } from './gemini';
import { GrokAdapter } from './grok';
import { CopilotAdapter } from './copilot';
import { PerplexityAdapter } from './perplexity';
import { MistralAdapter } from './mistral';

const adapters: SiteAdapter[] = [
  new DeepSeekAdapter(),
  new ChatGPTAdapter(),
  new ClaudeAdapter(),
  new GeminiAdapter(),
  new GrokAdapter(),
  new CopilotAdapter(),
  new PerplexityAdapter(),
  new MistralAdapter(),
];

export function getAdapterForUrl(url: string): SiteAdapter | null {
  for (const adapter of adapters) {
    if (adapter.isMatched(url)) {
      return adapter;
    }
  }
  return null;
}
