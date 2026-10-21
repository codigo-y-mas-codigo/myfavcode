
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center text-cyber-accent/60 mt-8 md:mt-12 py-4 z-10">
      <p>&copy; {new Date().getFullYear()} PromptCraft. Creado con IA y React.</p>
    </footer>
  );
};

export default Footer;
