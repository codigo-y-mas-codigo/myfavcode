
export type ViewMode = 'desktop' | 'mobile';
export type Platform = 'html' | 'react' | 'uniapp';

export interface HistoryEntry {
  id: string;
  prompt: string;
  code: string;
  timestamp: number;
}
