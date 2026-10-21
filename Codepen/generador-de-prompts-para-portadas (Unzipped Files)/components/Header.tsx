
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-passion to-cyber-accent animate-pulse">
        PromptCraft
      </h1>
      <p className="mt-3 text-lg text-cyber-accent max-w-2xl mx-auto">
        Genera prompts detallados para portadas de libros con estética futurista, cyberpunk y cultural.
      </p>
    </header>
  );
};

export default Header;
