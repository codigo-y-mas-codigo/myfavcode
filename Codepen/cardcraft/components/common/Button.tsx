
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark-accent focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variantClasses = {
    primary: 'bg-gradient-accent text-white hover:opacity-90',
    secondary: 'bg-brand-dark-accent hover:bg-indigo-500/20 text-brand-light',
    ghost: 'bg-transparent hover:bg-indigo-500/20 text-brand-light',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
