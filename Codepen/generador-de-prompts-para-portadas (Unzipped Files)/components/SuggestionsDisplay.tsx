
import React from 'react';

interface Suggestions {
  titles: string[];
  subtitles: string[];
  seals: string[];
}

interface SuggestionsDisplayProps {
  suggestions: Suggestions;
  onSelect: (type: 'title' | 'subtitle' | 'seal', value: string) => void;
}

const SuggestionCard: React.FC<{ title: string; items: string[]; type: 'title' | 'subtitle' | 'seal'; onSelect: (type: 'title' | 'subtitle' | 'seal', value: string) => void }> = ({ title, items, type, onSelect }) => (
    <div className="flex flex-col space-y-3">
        <h3 className="font-orbitron text-lg font-bold text-pink-passion">{title}</h3>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index}>
                    <button 
                        onClick={() => onSelect(type, item)}
                        className="w-full text-left p-3 bg-cyber-bg/50 border border-cyber-border rounded-md text-cyber-text hover:bg-pink-passion/20 hover:border-pink-passion transition-all duration-200"
                    >
                        {item}
                    </button>
                </li>
            ))}
        </ul>
    </div>
);


const SuggestionsDisplay: React.FC<SuggestionsDisplayProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="bg-cyber-surface/80 backdrop-blur-sm border border-cyber-border rounded-xl shadow-lg shadow-navy-trust/20 p-6 md:p-8">
        <h2 className="font-orbitron text-xl font-bold text-cyber-accent mb-6 text-center">💡 Ideas Generadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SuggestionCard title="Títulos Sugeridos" items={suggestions.titles} type="title" onSelect={onSelect} />
            <SuggestionCard title="Subtítulos Sugeridos" items={suggestions.subtitles} type="subtitle" onSelect={onSelect} />
            <SuggestionCard title="Sellos Sugeridos" items={suggestions.seals} type="seal" onSelect={onSelect} />
        </div>
    </div>
  );
};

export default SuggestionsDisplay;
