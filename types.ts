export interface ModalConfig {
  isOpen: boolean;
  title: string;
  content: string;
  type: 'success' | 'error' | 'info';
}

export interface QuoteState {
  text: string;
  isAiGenerated: boolean;
}
