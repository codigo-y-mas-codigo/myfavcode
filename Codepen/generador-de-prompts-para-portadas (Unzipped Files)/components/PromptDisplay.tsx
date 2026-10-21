
import React from 'react';
import useClipboard from '../hooks/useClipboard';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  const { copy, copied } = useClipboard();

  return (
    <div className="bg-cyber-surface/80 backdrop-blur-sm border border-cyber-border rounded-xl shadow-lg shadow-navy-trust/20 relative group">
      <div className="p-6">
        <h2 className="font-orbitron text-xl font-bold text-cyber-accent mb-4">🎨 Prompt Generado</h2>
        <pre className="text-cyber-text whitespace-pre-wrap text-sm leading-relaxed font-sans">{prompt}</pre>
      </div>
      <button
        onClick={() => copy(prompt)}
        className="absolute top-4 right-4 bg-cyber-border/80 text-cyber-accent p-2 rounded-lg 
                   opacity-50 group-hover:opacity-100 transition-all duration-300
                   hover:bg-pink-passion hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-passion"
        aria-label="Copiar prompt"
      >
        {copied ? (
            <CheckIcon className="w-5 h-5 text-green-400" />
        ) : (
            <CopyIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default PromptDisplay;
