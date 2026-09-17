import { SiteAdapter } from './types';

export class DeepSeekAdapter implements SiteAdapter {
  name = 'DeepSeek';

  isMatched(url: string): boolean {
    return url.includes('chat.deepseek.com');
  }

  getInputElement(): HTMLTextAreaElement | null {
    return (
      document.querySelector<HTMLTextAreaElement>('#chat-input') ||
      document.querySelector<HTMLTextAreaElement>('textarea[placeholder*="DeepSeek"]') ||
      document.querySelector<HTMLTextAreaElement>('textarea')
    );
  }

  getSendButton(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('div[class*="send-button"]') ||
      document.querySelector<HTMLElement>('button[aria-label*="Send"]') ||
      document.querySelector<HTMLElement>('.ds-icon-button')
    );
  }

  insertText(text: string): boolean {
    const input = this.getInputElement();
    if (!input) return false;

    // React/Vue DOM setter helper
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )?.set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(input, text);
    } else {
      input.value = text;
    }

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.focus();
    return true;
  }

  triggerSend(): boolean {
    const btn = this.getSendButton();
    if (btn && !btn.hasAttribute('disabled')) {
      btn.click();
      return true;
    }
    const input = this.getInputElement();
    if (input) {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
      return true;
    }
    return false;
  }

  getLastResponse(): string | null {
    const messages = document.querySelectorAll('.ds-markdown, .ds-message, [class*="markdown"]');
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      return lastMsg.textContent || null;
    }
    return null;
  }
}
