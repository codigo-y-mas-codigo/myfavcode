import React from 'react';
import Icon from './Icon';
import type { HistoryEntry } from '../types';

interface LeftSidebarProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onOpenImageModal: () => void;
  history: HistoryEntry[];
  activeHistoryId: string | null;
  onSelectHistory: (entry: HistoryEntry) => void;
}

const ComponentButton: React.FC<{ icon: string; name: string }> = ({ icon, name }) => (
  <div className="p-3 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:border-primary bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex flex-col items-center justify-center text-center">
    <Icon name={icon} className="text-gray-600 dark:text-gray-400 text-2xl mb-2" />
    <div className="text-xs text-gray-700 dark:text-gray-300">{name}</div>
  </div>
);

const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};


const HistoryItem: React.FC<{ entry: HistoryEntry; isActive: boolean; onSelect: (entry: HistoryEntry) => void }> = ({ entry, isActive, onSelect }) => (
  <div
    onClick={() => onSelect(entry)}
    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
      isActive
        ? 'bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/50'
        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200/70 dark:hover:bg-gray-600/50'
    }`}
  >
    <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{entry.prompt}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatTimeAgo(entry.timestamp)}</p>
  </div>
);

const LeftSidebar: React.FC<LeftSidebarProps> = ({ prompt, setPrompt, onGenerate, isLoading, onOpenImageModal, history, activeHistoryId, onSelectHistory }) => {
  return (
    <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Generador de Diseño</h3>
        <div className="space-y-4">
          <textarea 
            placeholder="Describe tu diseño web aquí..."
            className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
           <div className="space-y-2">
            <button 
              onClick={onGenerate}
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-button font-medium hover:bg-blue-600 transition-colors whitespace-nowrap flex items-center justify-center disabled:bg-primary/50 dark:disabled:bg-primary/30 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Icon name="loader-4-line" className="animate-spin mr-2" />
                  Generando...
                </>
              ) : (
                <>
                  <Icon name="magic-line" className="mr-2" />
                  Generar Diseño
                </>
              )}
            </button>
             <button
              onClick={onOpenImageModal}
              className="w-full bg-secondary/10 text-secondary py-2 px-4 rounded-button font-medium hover:bg-secondary/20 dark:bg-secondary/20 dark:hover:bg-secondary/30 transition-colors whitespace-nowrap flex items-center justify-center"
            >
              <Icon name="image-add-line" className="mr-2" />
              Add Image Generation
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Componentes</h4>
          <div className="grid grid-cols-2 gap-3">
            <ComponentButton icon="layout-line" name="Header" />
            <ComponentButton icon="image-line" name="Hero" />
            <ComponentButton icon="grid-line" name="Grid" />
            <ComponentButton icon="chat-quote-line" name="Testimonios" />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Version History</h4>
           {history.length > 0 ? (
            <div className="space-y-2">
              {history.map(entry => (
                <HistoryItem
                  key={entry.id}
                  entry={entry}
                  isActive={entry.id === activeHistoryId}
                  onSelect={onSelectHistory}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
                <Icon name="history-line" className="text-3xl text-gray-400 dark:text-gray-500 mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400">Your design versions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;