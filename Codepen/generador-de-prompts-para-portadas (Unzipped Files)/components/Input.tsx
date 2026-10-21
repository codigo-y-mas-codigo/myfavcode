
import React from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-cyber-accent tracking-wider">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-cyber-bg/50 border-2 border-cyber-border rounded-md px-4 py-2 text-cyber-text placeholder-cyber-accent/50 focus:outline-none focus:ring-2 focus:ring-pink-passion focus:border-pink-passion transition-all duration-300"
      />
    </div>
  );
};

export default Input;
