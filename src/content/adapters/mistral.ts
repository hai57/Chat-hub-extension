import { SiteAdapter } from './types';

export class MistralAdapter implements SiteAdapter {
  name = 'Mistral';

  isMatched(url: string): boolean {
    return url.includes('chat.mistral.ai');
  }

  getInputElement(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('textarea[placeholder*="Message"]') ||
      document.querySelector<HTMLElement>('textarea[placeholder*="Ask"]') ||
      document.querySelector<HTMLElement>('[contenteditable="true"][role="textbox"]') ||
      document.querySelector<HTMLElement>('div[contenteditable="true"]') ||
      document.querySelector<HTMLElement>('textarea')
    );
  }

  getSendButton(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('button[aria-label="Send message"]') ||
      document.querySelector<HTMLElement>('button[type="submit"]') ||
      document.querySelector<HTMLElement>('button[aria-label*="Send"]') ||
      document.querySelector<HTMLElement>('[data-testid="send-button"]')
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
      input.innerHTML = '';
      const p = document.createElement('p');
      p.textContent = text;
      input.appendChild(p);

      const range = document.createRange();
      const sel = window.getSelection();
      if (sel) {
        range.selectNodeContents(input);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
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
      '[class*="prose"], [class*="message"][class*="assistant"], [data-role="assistant"], [class*="response"]'
    );
    if (messages.length > 0) {
      return messages[messages.length - 1].textContent || null;
    }
    return null;
  }
}
