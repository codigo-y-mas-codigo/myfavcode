import React, { useState } from 'react';
import type { Platform } from '../types';
import Icon from './Icon';

interface RightSidebarProps {
  activePlatform: Platform;
  setActivePlatform: (platform: Platform) => void;
}

const PlatformButton: React.FC<{ platform: Platform; activePlatform: Platform; onClick: (platform: Platform) => void; children: React.ReactNode }> = ({ platform, activePlatform, onClick, children }) => {
  const isActive = platform === activePlatform;
  return (
    <button 
      onClick={() => onClick(platform)}
      className={`px-3 py-1 text-sm font-medium transition-colors w-full rounded ${isActive ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
    >
      {children}
    </button>
  );
};

const ColorSwatch: React.FC<{ color: string; selectedColor: string; onClick: (color: string) => void }> = ({ color, selectedColor, onClick }) => {
  const isActive = color === selectedColor;
  return (
     <div 
      className={`w-8 h-8 rounded cursor-pointer ${color} ${isActive ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-primary' : ''}`}
      style={{ backgroundColor: color }}
      onClick={() => onClick(color)}
    ></div>
  );
};

const RightSidebar: React.FC<RightSidebarProps> = ({ activePlatform, setActivePlatform }) => {
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  
  return (
    <aside className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Propiedades</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Plataforma de Destino</label>
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded">
              <PlatformButton platform="html" activePlatform={activePlatform} onClick={setActivePlatform}>HTML</PlatformButton>
              <PlatformButton platform="react" activePlatform={activePlatform} onClick={setActivePlatform}>React</PlatformButton>
              <PlatformButton platform="uniapp" activePlatform={activePlatform} onClick={setActivePlatform}>UniApp</PlatformButton>
            </div>
            {activePlatform !== 'react' && (
               <button 
                  onClick={() => setActivePlatform('react')}
                  className="mt-2 w-full bg-primary/10 text-primary py-2 px-4 rounded-button font-medium hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors whitespace-nowrap flex items-center justify-center"
              >
                  <Icon name="reactjs-line" className="mr-2" />
                  Enable React Export
              </button>
            )}
             {activePlatform !== 'uniapp' && (
               <button 
                  onClick={() => setActivePlatform('uniapp')}
                  className="mt-2 w-full bg-secondary/10 text-secondary py-2 px-4 rounded-button font-medium hover:bg-secondary/20 dark:bg-secondary/20 dark:hover:bg-secondary/30 transition-colors whitespace-nowrap flex items-center justify-center"
              >
                  <Icon name="apps-2-line" className="mr-2" />
                  Enable UniApp Export
              </button>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tema de Color</label>
            <div className="flex space-x-2">
              <ColorSwatch color="#3b82f6" selectedColor={selectedColor} onClick={setSelectedColor} />
              <ColorSwatch color="#8b5cf6" selectedColor={selectedColor} onClick={setSelectedColor} />
              <ColorSwatch color="#22c55e" selectedColor={selectedColor} onClick={setSelectedColor} />
              <ColorSwatch color="#ef4444" selectedColor={selectedColor} onClick={setSelectedColor} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipografía</label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded text-sm focus:ring-primary focus:border-primary">
              <option>Inter (Recomendado)</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Poppins</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Vista de Código</h4>
            <button className="w-6 h-6 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <Icon name="code-line" />
            </button>
          </div>
          <div className="bg-gray-900 rounded p-4 text-xs text-green-400 font-mono overflow-auto max-h-40">
            <pre><code>
{`<div>
  <h1>Revoluciona...</h1>
  <p>Soluciones...</p>
</div>`}
            </code></pre>
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Integración</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded">
              <div className="flex items-center">
                <Icon name="wordpress-line" className="text-blue-600 text-2xl mr-3" />
                <span className="text-sm text-gray-700 dark:text-gray-300">WordPress</span>
              </div>
              <button className="text-xs text-primary hover:text-blue-600">Conectar</button>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded">
              <div className="flex items-center">
                <Icon name="shopping-bag-line" className="text-green-600 text-2xl mr-3" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Shopify</span>
              </div>
              <span className="text-xs text-green-600 font-medium">Conectado</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;