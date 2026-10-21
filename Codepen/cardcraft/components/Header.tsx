
import React from 'react';
import { Button } from './common/Button';
import { SaveIcon, DownloadIcon, UndoIcon, RedoIcon, PrintIcon, MenuIcon } from './icons/IconComponents';

interface HeaderProps {
  onSave: () => void;
  onDownload: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onPrint: () => void;
  isMobile: boolean;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSave, onDownload, onUndo, onRedo, canUndo, canRedo, onPrint, isMobile, onMenuClick }) => {
  return (
    <header className="w-full bg-brand-dark-accent p-3 flex justify-between items-center shadow-md z-10 shrink-0">
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button onClick={onMenuClick} variant="ghost" className="p-2 -ml-2">
            <MenuIcon />
          </Button>
        )}
        <div className="text-2xl font-logo text-white">CardCraft</div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onUndo} disabled={!canUndo} variant="secondary" title="Undo"><UndoIcon /></Button>
        <Button onClick={onRedo} disabled={!canRedo} variant="secondary" title="Redo"><RedoIcon /></Button>
        <Button onClick={onSave} variant="secondary"><SaveIcon /> <span className="hidden md:inline">Save</span></Button>
        <Button onClick={onDownload} variant="primary"><DownloadIcon /> <span className="hidden md:inline">Download</span></Button>
        <Button onClick={onPrint} variant="primary"><PrintIcon /> <span className="hidden md:inline">Order Print</span></Button>
      </div>
    </header>
  );
};

export default Header;
