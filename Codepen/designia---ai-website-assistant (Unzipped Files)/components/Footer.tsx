import React from 'react';
import Icon from './Icon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Todos los sistemas operativos</span>
            </div>
            <a href="#" className="text-sm text-primary hover:text-blue-600 flex items-center">
              <Icon name="discord-line" className="mr-1" />
              Únete a Discord
            </a>
            <a href="#" className="text-sm text-primary hover:text-blue-600 flex items-center">
              <Icon name="road-map-line" className="mr-1" />
              Roadmap Público
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-500">v2.1.4 - Última actualización: 15 Nov 2024</span>
            <button className="text-sm text-primary hover:text-blue-600">Ver Changelog</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;