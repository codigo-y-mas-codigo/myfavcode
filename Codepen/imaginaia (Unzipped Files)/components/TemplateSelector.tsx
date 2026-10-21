/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES, THEMES } from '../lib/templates';
import { cn } from '../lib/utils';
import type { Theme, CategoryId } from '../lib/templates';

interface CategorySelectorProps {
    onSelect: (theme: Theme) => void;
    uploadedImage: string;
    onViewHistory: () => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect, uploadedImage, onViewHistory }) => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryId>('creative');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl"
        >
            <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-6 text-center sm:text-left">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <img src={uploadedImage} alt="Vista previa" className="w-16 h-16 rounded-md object-cover border-2 border-neutral-600"/>
                    <div>
                        <h2 className="font-permanent-marker text-3xl md:text-4xl text-neutral-200">Elige un Tema</h2>
                        <p className="text-neutral-400">Para generar tu nuevo pack de imágenes.</p>
                    </div>
                </div>
                <button 
                    onClick={onViewHistory}
                    className="font-permanent-marker text-lg text-center text-white bg-white/10 backdrop-blur-sm border-2 border-white/80 py-2 px-6 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-white hover:text-black"
                >
                    Ver Historial
                </button>
            </div>


            <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
                {Object.entries(CATEGORIES).map(([id, { title }]) => (
                    <button
                        key={id}
                        onClick={() => setSelectedCategory(id as CategoryId)}
                        className={cn(
                            'font-permanent-marker text-lg py-2 px-5 rounded-sm transition-all duration-200 transform hover:scale-105',
                            selectedCategory === id
                                ? 'bg-yellow-400 text-black shadow-md'
                                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        )}
                    >
                        {title}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {THEMES.filter(theme => theme.category === selectedCategory).map(theme => (
                    <motion.div
                        key={theme.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                        onClick={() => onSelect(theme)}
                        className="cursor-pointer bg-neutral-800/50 p-4 rounded-lg border border-neutral-700 hover:border-yellow-400 transition-colors"
                    >
                        <h3 className="font-permanent-marker text-xl text-yellow-400">{theme.title}</h3>
                        <p className="text-sm text-neutral-400 mt-1">{theme.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default CategorySelector;