export interface SiteAdapter {
  name: string;
  isMatched(url: string): boolean;
  getInputElement(): HTMLTextAreaElement | HTMLElement | null;
  getSendButton(): HTMLElement | null;
  insertText(text: string): boolean;
  triggerSend(): boolean;
  getLastResponse(): string | null;
}
