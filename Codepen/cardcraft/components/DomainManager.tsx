
import React, { useState } from 'react';
import type { SavedDesign } from '../types';
import { Button } from './common/Button';

interface DomainManagerProps {
  savedDesigns: SavedDesign[];
  onSetDomain: (designId: string, domainName: string) => void;
  onVerifyDomain: (designId:string) => void;
  onRemoveDomain: (designId:string) => void;
}

const DnsInstructions: React.FC<{ domain: string }> = ({ domain }) => (
  <div className="mt-4 p-3 bg-brand-dark rounded-md border border-indigo-500/50 text-sm">
    <p className="font-semibold text-indigo-300">Action Required: Configure DNS</p>
    <p className="mt-2">To publish your card to <span className="font-mono text-white">{domain}</span>, add the following CNAME record in your domain provider's DNS settings:</p>
    <div className="mt-3 p-2 bg-black/30 rounded-md font-mono text-xs">
      <div><span className="text-indigo-400">Type:</span> CNAME</div>
      <div><span className="text-indigo-400">Host/Name:</span> {domain.split('.')[0]}</div>
      <div><span className="text-indigo-400">Value/Target:</span> publish.cardcraft.app</div>
    </div>
    <p className="mt-2 text-xs text-indigo-400/80">DNS changes can take up to 24 hours to propagate. Once configured, click "Verify".</p>
  </div>
);


const DomainManager: React.FC<DomainManagerProps> = ({ savedDesigns, onSetDomain, onVerifyDomain, onRemoveDomain }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [domainInput, setDomainInput] = useState('');

  const handleEdit = (design: SavedDesign) => {
    setEditingId(design.id);
    setDomainInput(design.customDomain?.name || '');
  };

  const handleCancel = () => {
    setEditingId(null);
    setDomainInput('');
  };

  const handleSave = (designId: string) => {
    if (domainInput.trim()) {
        onSetDomain(designId, domainInput.trim());
    }
    handleCancel();
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Publish Your Card</h3>
      <p className="text-sm text-indigo-300 mb-4">Assign a custom domain to your saved designs to share them professionally.</p>
       {savedDesigns.length === 0 ? (
        <p className="text-sm text-indigo-300">You must save a design before you can publish it.</p>
      ) : (
      <ul className="space-y-4">
        {savedDesigns.map(design => (
          <li key={design.id} className="bg-brand-dark rounded-md p-3">
            <p className="font-semibold">{design.name}</p>
            {editingId === design.id ? (
              <div className="mt-2">
                 <label className="text-xs font-semibold text-indigo-300">Custom Domain</label>
                <input
                  type="text"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder="e.g., card.yourdomain.com"
                  className="w-full bg-black/30 p-2 rounded-md mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex gap-2 mt-2">
                    <Button variant="primary" className="py-1 px-2 text-xs" onClick={() => handleSave(design.id)}>Save</Button>
                    <Button variant="ghost" className="py-1 px-2 text-xs" onClick={handleCancel}>Cancel</Button>
                </div>
              </div>
            ) : design.customDomain ? (
                <div className='mt-2'>
                    <div className='flex justify-between items-center'>
                         <div>
                            <p className="font-mono text-indigo-300 text-sm">{design.customDomain.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${design.customDomain.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                {design.customDomain.status}
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <Button variant="secondary" className="py-1 px-2 text-xs" onClick={() => handleEdit(design)}>Edit</Button>
                            <Button variant="ghost" className="py-1 px-2 text-xs text-red-400 hover:bg-red-500/20" onClick={() => onRemoveDomain(design.id)}>Remove</Button>
                        </div>
                    </div>
                     {design.customDomain.status === 'pending' && (
                        <>
                            <DnsInstructions domain={design.customDomain.name} />
                            <Button variant="primary" className="mt-3 w-full" onClick={() => onVerifyDomain(design.id)}>Verify Configuration</Button>
                        </>
                    )}
                </div>
            ) : (
              <Button variant="secondary" className="mt-2 py-1 px-2 text-xs" onClick={() => handleEdit(design)}>
                Set Custom Domain
              </Button>
            )}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default DomainManager;
