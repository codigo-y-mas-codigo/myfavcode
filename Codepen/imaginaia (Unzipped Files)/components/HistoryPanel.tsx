/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HistoryItem } from '../App';
import { cn } from '../lib/utils';
import JSZip from 'jszip';

interface HistoryPanelProps {
    history: HistoryItem[];
    setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
    onBack: () => void;
    onToggleFavorite: (id: string) => void;
}

const secondaryButtonClasses = "font-permanent-marker text-lg text-center text-white bg-white/10 backdrop-blur-sm border-2 border-white/80 py-2 px-6 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-white hover:text-black";

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, setHistory, onBack, onToggleFavorite }) => {
    const [filter, setFilter] = useState<'all' | 'favorites'>('all');

    const handleDelete = (id: string) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta creación?")) {
            setHistory(prev => prev.filter(item => item.id !== id));
        }
    };
    
    const handleDownload = async (item: HistoryItem) => {
        const zip = new JSZip();
        const imagePromises = item.imageUrls
            .filter((url): url is string => url !== null)
            .map(async (imageUrl, index) => {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                zip.file(`${item.title.replace(/\s+/g, '_')}_${index + 1}.jpg`, blob);
            });
    
        await Promise.all(imagePromises);
        const zipBlob = await zip.generateAsync({ type: 'blob' });
    
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = `ImaginaIA_${item.title.replace(/\s+/g, '_')}_Album.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredHistory = history.filter(item => filter === 'favorites' ? item.isFavorite : true);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-7xl flex flex-col items-center"
        >
            <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-8 gap-4">
                <h2 className="font-permanent-marker text-3xl md:text-4xl text-neutral-200">Tus Creaciones</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-neutral-800 rounded-md p-1">
                         <button onClick={() => setFilter('all')} className={cn('py-1 px-4 rounded-md font-semibold transition-colors', filter === 'all' ? 'bg-yellow-400 text-black' : 'text-neutral-300')}>Todas</button>
                         <button onClick={() => setFilter('favorites')} className={cn('py-1 px-4 rounded-md font-semibold transition-colors flex items-center gap-1', filter === 'favorites' ? 'bg-yellow-400 text-black' : 'text-neutral-300')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            Favoritas
                         </button>
                    </div>
                    <button onClick={onBack} className={secondaryButtonClasses}>&larr; Volver</button>
                </div>
            </div>
            
            {filteredHistory.length === 0 ? (
                <div className="text-center text-neutral-500 mt-16">
                    <p className="text-2xl">{filter === 'favorites' ? 'No tienes favoritos todavía.' : 'Tu galería está vacía.'}</p>
                    <p>{filter === 'favorites' ? '¡Marca una creación con una estrella para verla aquí!' : '¡Anímate y crea algo increíble!'}</p>
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[70vh] p-2">
                    <AnimatePresence>
                        {filteredHistory.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg group relative"
                            >
                                <img src={item.imageUrls[0] ?? 'https://via.placeholder.com/300?text=Error'} alt={item.title} className="w-full h-64 object-cover" />
                                <button onClick={() => onToggleFavorite(item.id)} className={cn("absolute top-2 right-2 p-2 rounded-full transition-all duration-200", item.isFavorite ? 'text-yellow-400 bg-black/50' : 'text-white/70 bg-black/30 opacity-0 group-hover:opacity-100')} aria-label="Añadir a favoritos">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                                <div className="p-4">
                                    <h3 className="font-permanent-marker text-lg text-neutral-100 truncate">{item.title}</h3>
                                    <p className="text-xs text-neutral-400">{new Date(item.timestamp).toLocaleDateString()}</p>
                                </div>
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                                    <button onClick={() => handleDownload(item)} className="text-white hover:text-yellow-400 transition-colors text-sm font-bold bg-white/10 backdrop-blur-sm border border-white/50 py-2 px-4 rounded-md w-full">Descargar Pack</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-white hover:text-red-400 transition-colors text-sm font-bold bg-white/10 backdrop-blur-sm border border-white/50 py-2 px-4 rounded-md w-full">Eliminar</button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
};

export default HistoryPanel;