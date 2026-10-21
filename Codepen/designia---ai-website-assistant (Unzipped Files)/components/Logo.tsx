import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
        {/* This SVG represents a "spark" or "magic" for AI generation */}
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.508 14.5L12 3L9.49202 14.5L3 12L9.49202 9.5L12 21L14.508 9.5L21 12L14.508 14.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="font-display text-2xl text-primary">
        DesignIA
      </span>
    </div>
  );
};

export default Logo;
