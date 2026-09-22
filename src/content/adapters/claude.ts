import { SiteAdapter } from './types';

export class ClaudeAdapter implements SiteAdapter {
  name = 'Claude';

  isMatched(url: string): boolean {
    return url.includes('claude.ai');
  }

  getInputElement(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('div[contenteditable="true"].ProseMirror') ||
      document.querySelector<HTMLElement>('[contenteditable="true"][data-placeholder]') ||
      document.querySelector<HTMLElement>('div[contenteditable="true"]') ||
      document.querySelector<HTMLElement>('textarea')
    );
  }

  getSendButton(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('button[aria-label="Send message"]') ||
      document.querySelector<HTMLElement>('button[aria-label*="Send"]') ||
      document.querySelector<HTMLElement>('button[type="submit"]') ||
      document.querySelector<HTMLElement>('button[data-testid="send-button"]')
    );
  }

  insertText(text: string): boolean {
    const input = this.getInputElement();
    if (!input) return false;

    // Claude uses ProseMirror contenteditable
    input.focus();

    // Clear existing content
    input.innerHTML = '';

    // Insert text as paragraph nodes (ProseMirror compatible)
    const lines = text.split('\n');
    lines.forEach((line, index) => {
      const p = document.createElement('p');
      p.textContent = line || (index < lines.length - 1 ? '\u200B' : ''); // zero-width space for empty lines
      input.appendChild(p);
    });

    // Dispatch input events to trigger React/ProseMirror state update
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));

    // Move caret to end
    const range = document.createRange();
    const sel = window.getSelection();
    if (sel) {
      range.selectNodeContents(input);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    return true;
  }

  triggerSend(): boolean {
    const btn = this.getSendButton();
    if (btn && !btn.hasAttribute('disabled')) {
      btn.click();
      return true;
    }
    // Fallback: dispatch Enter key on the input
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
      '[data-is-streaming="false"] .prose, .font-claude-message, [class*="prose"], .claude-message'
    );
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      return lastMsg.textContent || null;
    }
    return null;
  }
}
