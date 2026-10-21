import React, { useState, useRef, useMemo } from 'react';
import type { CardData, ElementPositions, TextStyle, CustomFont } from '../types';
import { GOOGLE_FONTS } from '../constants';
import { Button } from './common/Button';
import { UploadIcon, TrashIcon } from './icons/IconComponents';

interface ProfileFormProps {
  cardData: CardData;
  onDataChange: (field: keyof CardData, value: string) => void;
  logo: string | null;
  onLogoUpload: (file: File) => void;
  onLogoRemove: () => void;
  font: string;
  onFontChange: (font: string) => void;
  customFonts: CustomFont[];
  onAddCustomFont: (name: string, url: string) => void;
  onIdentifyFont: (file: File) => Promise<void>;
  selectedElements: (keyof ElementPositions)[];
  textStyles: { name: TextStyle; details: TextStyle; };
  onTextStyleChange: (elementId: 'name' | 'details', key: keyof TextStyle, value: number) => void;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <div>
    <label className="text-xs font-semibold text-indigo-300">{label}</label>
    <input
      className="w-full bg-brand-dark p-2 rounded-md mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      {...props}
    />
  </div>
);

const AddFontUrlModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, url: string) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(name, url);
    onClose();
    setName('');
    setUrl('');
  };

  return (
    <div className="fixed inset-0 bg-brand-dark/80 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-dark-accent rounded-lg shadow-xl w-full max-w-sm p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
        <h3 className="text-lg font-bold text-white mb-4">Add Font from URL</h3>
        <div className="space-y-4">
          <InputField label="Font Name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., 'My Custom Font'" />
          <InputField label="Font URL" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/font.woff2" />
        </div>
        <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} disabled={!name.trim() || !url.trim()}>Save Font</Button>
        </div>
      </div>
    </div>
  );
};


const ProfileForm: React.FC<ProfileFormProps> = ({ cardData, onDataChange, logo, onLogoUpload, onLogoRemove, font, onFontChange, customFonts, onAddCustomFont, onIdentifyFont, selectedElements, textStyles, onTextStyleChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fontImageInputRef = useRef<HTMLInputElement>(null);
  const [isUrlModalOpen, setUrlModalOpen] = useState(false);

  const selectedTextElementId = useMemo(() => {
    if (selectedElements.length !== 1) return null;
    const selectedId = selectedElements[0];
    return (selectedId === 'name' || selectedId === 'details') ? selectedId : null;
  }, [selectedElements]);

  const currentStyles = selectedTextElementId ? textStyles[selectedTextElementId] : null;

  const allFonts = useMemo(() => {
    const customFontNames = customFonts.map(f => f.name);
    return [...new Set([...GOOGLE_FONTS, ...customFontNames])].sort();
  }, [customFonts]);

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onLogoUpload(e.target.files[0]);
    }
  };

  const handleFontImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onIdentifyFont(e.target.files[0]);
    }
  };

  return (
    <>
      <AddFontUrlModal isOpen={isUrlModalOpen} onClose={() => setUrlModalOpen(false)} onSave={onAddCustomFont} />
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Profile</h3>
        {(Object.keys(cardData) as Array<keyof CardData>).map(key => (
          <InputField
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={cardData[key]}
            onChange={(e) => onDataChange(key, e.target.value)}
          />
        ))}
        <div>
          <label className="text-xs font-semibold text-indigo-300">Logo</label>
          <div className="mt-1 space-y-2">
            {logo && (
              <div className="relative group">
                <img src={logo} alt="logo" className="w-24 h-24 object-contain rounded-md bg-white/10 p-1" />
                <button onClick={onLogoRemove} className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <TrashIcon />
                </button>
              </div>
            )}
            <input type="file" accept="image/png, image/jpeg, image/svg+xml" ref={fileInputRef} onChange={handleLogoFileChange} className="hidden" />
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
              <UploadIcon /> {logo ? 'Change Logo' : 'Upload Logo'}
            </Button>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-indigo-300">Base Font</label>
          <select value={font} onChange={(e) => onFontChange(e.target.value)} className="w-full bg-brand-dark p-2 rounded-md mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {allFonts.map(f => <option key={f} value={f} style={{fontFamily: f}}>{f}</option>)}
          </select>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button variant="secondary" className="text-xs" onClick={() => setUrlModalOpen(true)}>Add from URL</Button>
            <Button variant="secondary" className="text-xs" onClick={() => fontImageInputRef.current?.click()}>Find from Image</Button>
            <input type="file" accept="image/png, image/jpeg" ref={fontImageInputRef} onChange={handleFontImageFileChange} className="hidden" />
          </div>
        </div>

        {currentStyles && selectedTextElementId && (
          <div className="space-y-4 pt-4 border-t border-white/10">
             <h4 className="text-md font-bold text-white -mt-1 capitalize">Typography: {selectedTextElementId}</h4>
             <p className="text-xs -mt-3 text-indigo-300">Adjust styling for the selected text block.</p>
            <div>
              <label className="text-xs font-semibold text-indigo-300 flex justify-between items-center">
                <span>Letter Spacing</span>
                <span className="font-mono text-white/70">{currentStyles.letterSpacing.toFixed(1)}px</span>
              </label>
              <input
                type="range"
                min="-2"
                max="5"
                step="0.1"
                value={currentStyles.letterSpacing}
                onChange={(e) => onTextStyleChange(selectedTextElementId, 'letterSpacing', parseFloat(e.target.value))}
                className="w-full h-2 bg-brand-dark rounded-lg appearance-none cursor-pointer mt-1 accent-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-indigo-300 flex justify-between items-center">
                <span>Line Height</span>
                <span className="font-mono text-white/70">{currentStyles.lineHeight.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.8"
                max="2.5"
                step="0.05"
                value={currentStyles.lineHeight}
                onChange={(e) => onTextStyleChange(selectedTextElementId, 'lineHeight', parseFloat(e.target.value))}
                className="w-full h-2 bg-brand-dark rounded-lg appearance-none cursor-pointer mt-1 accent-indigo-500"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileForm;