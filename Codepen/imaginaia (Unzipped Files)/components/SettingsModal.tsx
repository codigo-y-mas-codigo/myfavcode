/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {

    const handleShare = async () => {
        const shareData = {
            title: 'Past Forward',
            text: '¡Mira esta increíble aplicación de IA para generar imágenes!',
            url: 'https://aistudio.google.com/apps'
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                alert('La función de compartir no es compatible con este navegador.');
            }
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl w-full max-w-md p-6 relative"
                    >
                        <h2 className="font-permanent-marker text-3xl text-yellow-400 mb-6 text-center">Configuración</h2>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:feedback@example.com?subject=Comentarios%20sobre%20Past%20Forward" className="block w-full text-left font-semibold text-neutral-200 bg-neutral-800/50 hover:bg-neutral-700/80 p-4 rounded-md transition-colors">
                                    Enviar comentarios
                                </a>
                            </li>
                            <li>
                                <a href="https://aistudio.google.com/apps" target="_blank" rel="noopener noreferrer" className="block w-full text-left font-semibold text-neutral-200 bg-neutral-800/50 hover:bg-neutral-700/80 p-4 rounded-md transition-colors">
                                    Calificar la app
                                </a>
                            </li>
                             <li>
                                <button onClick={handleShare} className="block w-full text-left font-semibold text-neutral-200 bg-neutral-800/50 hover:bg-neutral-700/80 p-4 rounded-md transition-colors">
                                    Compartir con amigos
                                </button>
                            </li>
                             <li>
                                <div className="text-left text-neutral-200 bg-neutral-800/50 p-4 rounded-md">
                                    <p className="font-semibold">Detalles de la versión</p>
                                    <p className="text-sm text-neutral-400 mt-1">Versión 1.2.0 - Interfaz en Español y Configuración</p>
                                </div>
                            </li>
                        </ul>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SettingsModal;