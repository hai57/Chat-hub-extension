import { SiteAdapter } from './types';

export class GeminiAdapter implements SiteAdapter {
  name = 'Gemini';

  isMatched(url: string): boolean {
    return url.includes('gemini.google.com');
  }

  getInputElement(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('rich-textarea .ql-editor') ||
      document.querySelector<HTMLElement>('.ql-editor[contenteditable="true"]') ||
      document.querySelector<HTMLElement>('[contenteditable="true"][data-placeholder]') ||
      document.querySelector<HTMLElement>('div[contenteditable="true"]') ||
      document.querySelector<HTMLElement>('textarea')
    );
  }

  getSendButton(): HTMLElement | null {
    return (
      document.querySelector<HTMLElement>('button[aria-label="Send message"]') ||
      document.querySelector<HTMLElement>('button[data-mat-icon-name="send"]') ||
      document.querySelector<HTMLElement>('.send-button') ||
      document.querySelector<HTMLElement>('button[aria-label*="Send"]') ||
      document.querySelector<HTMLElement>('mat-icon[data-mat-icon-name="send"]')?.closest('button') as HTMLElement | null
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
      // Quill / contenteditable editor used by Gemini
      input.innerHTML = '';
      const p = document.createElement('p');
      p.textContent = text;
      input.appendChild(p);
    }

    // Dispatch events so Gemini's Angular/Quill layer picks up the change
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));

    // Move caret to end for contenteditable
    if (input.tagName !== 'TEXTAREA') {
      const range = document.createRange();
      const sel = window.getSelection();
      if (sel) {
        range.selectNodeContents(input);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }

    return true;
  }

  triggerSend(): boolean {
    const btn = this.getSendButton();
    if (btn && !btn.hasAttribute('disabled')) {
      btn.click();
      return true;
    }
    // Fallback: Enter key on input
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
      'model-response .markdown, .response-content .markdown, message-content .markdown, [class*="response"] .markdown'
    );
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      return lastMsg.textContent || null;
    }
    // Fallback: any markdown block
    const markdowns = document.querySelectorAll('.markdown');
    if (markdowns.length > 0) {
      return markdowns[markdowns.length - 1].textContent || null;
    }
    return null;
  }
}
