
import React from 'react';
import type { Orientation } from '../types';
import { Button } from './common/Button';
import { HorizontalIcon, VerticalIcon } from './icons/IconComponents';

interface FooterProps {
  orientation: Orientation;
  onOrientationChange: (orientation: Orientation) => void;
  onZoom: (direction: 'in' | 'out') => void;
}

const Footer: React.FC<FooterProps> = ({ orientation, onOrientationChange, onZoom }) => {
  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-brand-dark-accent p-2 rounded-lg shadow-lg">
      <Button
        variant={orientation === 'horizontal' ? 'primary' : 'secondary'}
        onClick={() => onOrientationChange('horizontal')}
        title="Horizontal"
      >
        <HorizontalIcon />
      </Button>
      <Button
        variant={orientation === 'vertical' ? 'primary' : 'secondary'}
        onClick={() => onOrientationChange('vertical')}
        title="Vertical"
      >
        <VerticalIcon />
      </Button>
    </div>
  );
};

export default Footer;
