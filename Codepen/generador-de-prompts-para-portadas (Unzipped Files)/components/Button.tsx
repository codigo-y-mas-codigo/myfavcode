
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-orbitron font-bold bg-pink-passion text-white px-8 py-3 rounded-md
                 transform transition-all duration-300
                 hover:bg-white hover:text-pink-passion hover:scale-105
                 focus:outline-none focus:ring-4 focus:ring-pink-passion/50
                 shadow-lg shadow-pink-passion/30 hover:shadow-2xl hover:shadow-pink-passion/50
                 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
    >
      {children}
    </button>
  );
};

export default Button;
