import { SiteAdapter } from './types';

export class ChatGPTAdapter implements SiteAdapter {
  name = 'ChatGPT';

  isMatched(url: string): boolean {
    return url.includes('chatgpt.com') || url.includes('chat.openai.com');
  }

  getInputElement(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('#prompt-textarea') ||
      document.querySelector<HTMLElement>('div[contenteditable="true"]') ||
      document.querySelector<HTMLElement>('textarea')
    );
  }

  getSendButton(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('button[data-testid="send-button"]') ||
      document.querySelector<HTMLElement>('button[aria-label*="Send"]') ||
      document.querySelector<HTMLElement>('button[aria-label*="Gửi"]')
    );
  }

  insertText(text: string): boolean {
    const input = this.getInputElement();
    if (!input) return false;

    if (input.tagName === 'TEXTAREA') {
      const textarea = input as HTMLTextAreaElement;
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set;
      if (nativeSetter) {
        nativeSetter.call(textarea, text);
      } else {
        textarea.value = text;
      }
    } else {
      // ContentEditable element (ChatGPT Lexical Editor)
      input.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
    }

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.focus();
    return true;
  }

  triggerSend(): boolean {
    const btn = this.getSendButton();
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  }

  getLastResponse(): string | null {
    const assistantMessages = document.querySelectorAll('[data-message-author-role="assistant"], .markdown');
    if (assistantMessages.length > 0) {
      const lastMsg = assistantMessages[assistantMessages.length - 1];
      return lastMsg.textContent || null;
    }
    return null;
  }
}
