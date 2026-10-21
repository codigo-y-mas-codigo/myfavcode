
import React from 'react';
import type { SavedDesign } from '../types';
import { Button } from './common/Button';
import { TrashIcon, PublishIcon } from './icons/IconComponents';

interface MyDesignsProps {
  savedDesigns: SavedDesign[];
  onLoadDesign: (id: string) => void;
  onDeleteDesign: (id: string) => void;
}

const MyDesigns: React.FC<MyDesignsProps> = ({ savedDesigns, onLoadDesign, onDeleteDesign }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">My Designs</h3>
      {savedDesigns.length === 0 ? (
        <p className="text-sm text-indigo-300">You have no saved designs. Click "Save" in the header to get started.</p>
      ) : (
        <ul className="space-y-3">
          {savedDesigns.map(design => (
            <li key={design.id} className="bg-brand-dark rounded-md p-3 flex justify-between items-center">
              <div>
                <p className="font-semibold">{design.name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <p className="text-xs text-indigo-300">{new Date(design.timestamp).toLocaleString()}</p>
                    {design.customDomain && (
                        <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${design.customDomain.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                            <PublishIcon />
                            <span className="font-mono">{design.customDomain.name}</span>
                        </div>
                    )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="py-1 px-2 text-xs" onClick={() => onLoadDesign(design.id)}>Load</Button>
                <Button variant="ghost" onClick={() => onDeleteDesign(design.id)} className="text-red-400 hover:bg-red-500/20">
                  <TrashIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDesigns;
