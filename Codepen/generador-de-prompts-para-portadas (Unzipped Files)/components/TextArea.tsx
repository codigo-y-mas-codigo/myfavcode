
import React from 'react';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange, placeholder, rows = 4 }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-cyber-accent tracking-wider">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="bg-cyber-bg/50 border-2 border-cyber-border rounded-md px-4 py-2 text-cyber-text placeholder-cyber-accent/50 focus:outline-none focus:ring-2 focus:ring-pink-passion focus:border-pink-passion transition-all duration-300 resize-y"
      />
    </div>
  );
};

export default TextArea;
