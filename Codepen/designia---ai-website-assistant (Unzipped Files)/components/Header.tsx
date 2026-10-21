
import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Use a try-catch block for environments where pushState might be restricted
    try {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (error) {
      console.error("Could not use pushState, falling back to full navigation:", error);
      window.location.href = href;
    }
  };
  
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="/" onClick={(e) => handleNav(e, '/')} aria-label="DesignIA Homepage">
            <Logo />
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" onClick={(e) => handleNav(e, '/')} className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">Inicio</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">Plantillas</a>
            <a href="/community" onClick={(e) => handleNav(e, '/community')} className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">Comunidad</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
           <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            <Icon name={isDarkMode ? 'sun-line' : 'moon-line'} className="text-xl" />
          </button>
          
           <a href="/app" onClick={(e) => handleNav(e, '/app')} className="bg-primary text-white px-5 py-2.5 rounded-button font-medium hover:bg-blue-600 transition-colors whitespace-nowrap flex items-center justify-center">
              Ir a la App
              <Icon name="arrow-right-s-line" className="ml-1" />
            </a>

          <div className="hidden sm:flex items-center space-x-3 pl-2">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">María González</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Plan Pro</div>
            </div>
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
              MG
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
