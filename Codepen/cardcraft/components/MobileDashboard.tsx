import React, { useState } from 'react';
import type { SavedDesign } from '../types';
import { Button } from './common/Button';
import { AiIcon } from './icons/IconComponents';
import { TEMPLATES } from '../constants';

interface MobileDashboardProps {
  onGenerateStyle: (prompt: string) => Promise<void>;
  savedDesigns: SavedDesign[];
  onLoadDesign: (id: string) => void;
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({ onGenerateStyle, savedDesigns, onLoadDesign }) => {
  const [stylePrompt, setStylePrompt] = useState('');

  return (
    <div className="p-4 space-y-8 overflow-y-auto h-full">
      {/* AI Generator CTA */}
      <div className="bg-brand-dark-accent p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Try the AI Designer</h2>
        <p className="text-sm text-indigo-300 mb-4">Describe your brand and let AI create a unique style for you.</p>
        <textarea
          value={stylePrompt}
          onChange={(e) => setStylePrompt(e.target.value)}
          placeholder="e.g., a friendly coffee shop with earthy tones"
          className="w-full bg-brand-dark p-2 rounded-md text-sm h-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={() => onGenerateStyle(stylePrompt)} disabled={!stylePrompt} className="mt-2 w-full">
          <AiIcon /> Generate Style
        </Button>
      </div>

      {/* Continue Designing */}
      {savedDesigns.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3">Continue Designing</h3>
          <div className="space-y-3">
            {savedDesigns.slice(0, 2).map(design => (
              <div key={design.id} onClick={() => onLoadDesign(design.id)} className="bg-brand-dark-accent rounded-md p-3 flex justify-between items-center cursor-pointer">
                <div>
                  <p className="font-semibold">{design.name}</p>
                  <p className="text-xs text-indigo-300">{new Date(design.timestamp).toLocaleDateString()}</p>
                </div>
                {/* Fix: The 'size' prop does not exist on the Button component. Replaced with className to adjust button size. */}
                <Button variant="secondary" className="py-1 px-2 text-xs">Load</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Templates */}
      <div>
        <h3 className="text-lg font-bold mb-3">Popular Templates</h3>
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.slice(0, 4).map(template => (
            <div key={template.id} className="cursor-pointer rounded-md overflow-hidden ring-1 ring-white/20">
              <div className={`h-16 w-full ${template.className}`}></div>
              <div className="p-2 bg-brand-dark text-center text-sm">
                {template.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;
