import { SiteAdapter } from './types';

export class GrokAdapter implements SiteAdapter {
  name = 'Grok';

  isMatched(url: string): boolean {
    return url.includes('grok.com') || url.includes('x.com/i/grok');
  }

  getInputElement(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('textarea[placeholder*="Ask"]') ||
      document.querySelector<HTMLElement>('textarea[data-testid="grok-input"]') ||
      document.querySelector<HTMLElement>('div[contenteditable="true"]') ||
      document.querySelector<HTMLElement>('textarea')
    );
  }

  getSendButton(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('button[aria-label="Send message"]') ||
      document.querySelector<HTMLElement>('button[type="submit"]') ||
      document.querySelector<HTMLElement>('[data-testid="send-button"]') ||
      document.querySelector<HTMLElement>('button[aria-label*="Send"]')
    );
  }

  insertText(text: string): boolean {
    const input = this.getInputElement();
    if (!input) return false;

    input.focus();

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
      input.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
    }

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
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
      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true })
      );
      return true;
    }
    return false;
  }

  getLastResponse(): string | null {
    const messages = document.querySelectorAll(
      '[class*="message-content"], [class*="response"], .prose, [data-testid*="message"]'
    );
    if (messages.length > 0) {
      return messages[messages.length - 1].textContent || null;
    }
    return null;
  }
}
