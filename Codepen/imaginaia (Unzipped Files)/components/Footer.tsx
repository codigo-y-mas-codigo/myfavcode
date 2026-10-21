/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REMIX_IDEAS = [
    "para probar diferentes peinados.",
    "para convertir a tu mascota en un dibujo animado.",
    "para crear una versión fantástica de ti mismo.",
    "para diseñar un superhéroe basado en tu foto.",
    "para situarte en eventos históricos famosos.",
    "para generar un avatar de videojuego personalizado.",
];

const Footer = () => {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const textIntervalId = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % REMIX_IDEAS.length);
        }, 3500); // Change text every 3.5 seconds

        const visibilityTimeoutId = setTimeout(() => {
            setIsVisible(false);
        }, 7000); // Hide footer after 7 seconds

        return () => {
            clearInterval(textIntervalId);
            clearTimeout(visibilityTimeoutId);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.footer
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-3 z-50 text-neutral-300 text-xs sm:text-sm border-t border-white/10"
                >
                    <div className="relative max-w-screen-xl mx-auto flex justify-between items-center gap-4 px-4">
                        {/* Left Side */}
                        <div className="hidden md:flex items-center gap-4 text-neutral-500 whitespace-nowrap">
                            <p>Desarrollado con Gemini 2.5 Flash Image Preview</p>
                            <span className="text-neutral-700" aria-hidden="true">|</span>
                            <p>
                                Creado por{' '}
                                <a
                                    href="https://x.com/ammaar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-400 hover:text-yellow-400 transition-colors duration-200"
                                >
                                    @ammaar
                                </a>
                            </p>
                        </div>

                        {/* Right Side */}
                        <div className="flex-grow flex justify-end items-center gap-4 sm:gap-6 pr-8"> {/* Added pr-8 for spacing from X button */}
                            <div className="hidden lg:flex items-center gap-2 text-neutral-400 text-right min-w-0">
                                <span className="flex-shrink-0">Remezcla esta app...</span>
                                <div className="relative w-64 h-5">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="absolute inset-0 font-medium text-neutral-200 whitespace-nowrap text-left"
                                        >
                                            {REMIX_IDEAS[index]}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 sm:gap-6">
                                <a
                                    href="https://aistudio.google.com/apps"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-permanent-marker text-sm sm:text-base text-center text-black bg-yellow-400 py-2 px-4 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:-rotate-2 hover:bg-yellow-300 shadow-[1px_1px_0px_1px_rgba(0,0,0,0.2)] whitespace-nowrap"
                                >
                                    Apps en AI Studio
                                </a>
                                <a
                                    href="https://gemini.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-permanent-marker text-sm sm:text-base text-center text-white bg-white/10 backdrop-blur-sm border border-white/50 py-2 px-4 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-white hover:text-black whitespace-nowrap"
                                >
                                    Chatea con Gemini
                                </a>
                            </div>
                        </div>

                         {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute -right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-white transition-colors rounded-full"
                            aria-label="Cerrar"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </motion.footer>
            )}
        </AnimatePresence>
    );
};

export default Footer;