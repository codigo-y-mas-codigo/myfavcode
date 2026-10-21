import React from 'react';
import type { ViewMode } from '../types';
import Icon from './Icon';
import GeneratedPreview from './GeneratedPreview';

interface MainCanvasProps {
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  onExport: () => void;
  htmlContent: string;
  isExporting: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ViewButton: React.FC<{ view: ViewMode; activeView: ViewMode; onClick: (view: ViewMode) => void; icon: string; children: React.ReactNode }> = ({ view, activeView, onClick, icon, children }) => {
  const isActive = view === activeView;
  return (
    <button 
      onClick={() => onClick(view)}
      className={`px-3 py-1 text-sm flex items-center transition-colors rounded ${isActive ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
    >
      <Icon name={icon} className="mr-2" />
      {children}
    </button>
  );
};

const MainCanvas: React.FC<MainCanvasProps> = ({ activeView, setActiveView, onExport, htmlContent, isExporting, onUndo, onRedo, canUndo, canRedo }) => {
  const previewContainerClasses = `bg-white rounded-lg shadow-xl border border-gray-200 dark:border-transparent min-h-full transition-all duration-300 ease-in-out mx-auto ${
    activeView === 'mobile' ? 'max-w-sm' : 'w-full'
  }`;

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={onUndo} 
                disabled={!canUndo}
                className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors disabled:text-gray-400/50 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                aria-label="Undo"
                >
                <Icon name="arrow-go-back-line" />
              </button>
              <button 
                onClick={onRedo}
                disabled={!canRedo}
                className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors disabled:text-gray-400/50 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                aria-label="Redo"
                >
                <Icon name="arrow-go-forward-line" />
              </button>
            </div>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <ViewButton view="mobile" activeView={activeView} onClick={setActiveView} icon="smartphone-line">Móvil</ViewButton>
              <ViewButton view="desktop" activeView={activeView} onClick={setActiveView} icon="computer-line">Escritorio</ViewButton>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={onExport}
              disabled={isExporting}
              className="px-4 py-2 bg-green-600 text-white rounded-button font-medium hover:bg-green-700 transition-colors whitespace-nowrap flex items-center disabled:bg-green-600/70 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Icon name="loader-4-line" className="animate-spin mr-2" />
                  Exportando...
                </>
              ) : (
                <>
                  <Icon name="download-line" className="mr-2" />
                  Exportar
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className={previewContainerClasses}>
          <GeneratedPreview htmlContent={htmlContent} />
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;