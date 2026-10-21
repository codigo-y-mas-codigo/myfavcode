
import React from 'react';

interface LoaderProps {
    message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = "AI is crafting..." }) => (
  <div className="fixed inset-0 bg-brand-dark/80 flex flex-col items-center justify-center z-[100]">
    <div className="w-16 h-16 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-semibold tracking-wider text-white">{message}</p>
  </div>
);
