import { getAdapterForUrl } from './adapters/factory';
import { QuickActionMessage, ActionResponse } from '../shared/types';

console.log('[AI Chat Hub] Content Script initialized on:', window.location.href);

chrome.runtime.onMessage.addListener((message: QuickActionMessage, _sender, sendResponse: (response: ActionResponse) => void) => {
  const currentUrl = window.location.href;
  const adapter = getAdapterForUrl(currentUrl);

  if (message.type !== 'EXECUTE_ACTION') {
    return false;
  }

  if (!adapter) {
    sendResponse({
      success: false,
      message: `No adapter found for URL: ${currentUrl}`
    });
    return true;
  }

  try {
    switch (message.action) {
      case 'INJECT':
      case 'PASTE': {
        const textToInsert = message.payload?.text || '';
        const ok = adapter.insertText(textToInsert);
        sendResponse({
          success: ok,
          message: ok ? 'Text inserted successfully' : 'Failed to locate input box'
        });
        break;
      }
      case 'SEND': {
        const ok = adapter.triggerSend();
        sendResponse({
          success: ok,
          message: ok ? 'Triggered send button' : 'Failed to locate send button'
        });
        break;
      }
      case 'COPY': {
        const lastResp = adapter.getLastResponse();
        if (lastResp) {
          navigator.clipboard.writeText(lastResp).catch(() => {
            // Fallback copy
          });
          sendResponse({
            success: true,
            data: lastResp,
            message: 'Copied latest AI response'
          });
        } else {
          sendResponse({
            success: false,
            message: 'No response text found to copy'
          });
        }
        break;
      }
      case 'CLEAR': {
        const ok = adapter.insertText('');
        sendResponse({ success: ok, message: ok ? 'Cleared input' : 'Failed to clear input' });
        break;
      }
      default:
        sendResponse({ success: false, message: `Unknown action: ${message.action}` });
    }
  } catch (error: any) {
    sendResponse({ success: false, message: error.message || 'Execution error' });
  }

  return true;
});
