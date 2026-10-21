
import React from 'react';
import { Button } from './common/Button';
import {
  AlignLeftIcon,
  AlignHorizontalCenterIcon,
  AlignRightIcon,
  AlignTopIcon,
  AlignVerticalCenterIcon,
  AlignBottomIcon,
  BringToFrontIcon,
  SendToBackIcon,
} from './icons/IconComponents';
import type { AlignmentType } from '../types';

interface AlignmentToolbarProps {
  onAlign: (type: AlignmentType) => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  showAlignmentTools: boolean;
}

const AlignmentToolbar: React.FC<AlignmentToolbarProps> = ({ onAlign, onBringToFront, onSendToBack, showAlignmentTools }) => {
  const alignmentTools = [
    { type: 'left', icon: <AlignLeftIcon />, title: 'Align Left' },
    { type: 'center', icon: <AlignHorizontalCenterIcon />, title: 'Align Horizontal Center' },
    { type: 'right', icon: <AlignRightIcon />, title: 'Align Right' },
    { type: 'top', icon: <AlignTopIcon />, title: 'Align Top' },
    { type: 'middle', icon: <AlignVerticalCenterIcon />, title: 'Align Vertical Middle' },
    { type: 'bottom', icon: <AlignBottomIcon />, title: 'Align Bottom' },
  ] as const;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-brand-dark-accent p-1 rounded-lg shadow-lg z-20">
      <Button onClick={onBringToFront} title="Bring to Front" variant="secondary" className="p-2">
        <BringToFrontIcon />
      </Button>
      <Button onClick={onSendToBack} title="Send to Back" variant="secondary" className="p-2">
        <SendToBackIcon />
      </Button>
      
      {showAlignmentTools && (
          <>
            <div className="w-px h-6 bg-white/20 mx-1"></div>
            {alignmentTools.map(tool => (
                <Button
                key={tool.type}
                variant="secondary"
                onClick={() => onAlign(tool.type)}
                title={tool.title}
                className="p-2"
                >
                {tool.icon}
                </Button>
            ))}
          </>
      )}
    </div>
  );
};

export default AlignmentToolbar;