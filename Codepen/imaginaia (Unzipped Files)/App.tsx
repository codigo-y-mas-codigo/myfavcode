/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JSZip from 'jszip';
import { generateImageFromPrompt } from './services/geminiService';
import PolaroidCard from './components/PolaroidCard';
import Footer from './components/Footer';
import CategorySelector from './components/TemplateSelector';
import HistoryPanel from './components/HistoryPanel';
import type { Theme } from './lib/templates';

// --- Interfaces & Types ---
export interface HistoryItem {
    id: string;
    imageUrls: (string | null)[];
    title: string;
    timestamp: number;
    isFavorite: boolean;
}

interface Polaroid {
    id: number;
    imageUrl: string | null;
    status: 'pending' | 'done' | 'error';
    error?: string;
}

type AppState = 'upload' | 'selecting' | 'generating' | 'results' | 'history';

// --- Constants ---
const NUM_IMAGES_TO_GENERATE = 4;
const primaryButtonClasses = "font-permanent-marker text-xl text-center text-black bg-yellow-400 py-3 px-8 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:-rotate-2 hover:bg-yellow-300 shadow-[2px_2px_0px_2px_rgba(0,0,0,0.2)]";
const secondaryButtonClasses = "font-permanent-marker text-lg text-center text-white bg-white/10 backdrop-blur-sm border-2 border-white/80 py-2 px-6 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-white hover:text-black";

// --- Helper Functions ---
const downloadAlbum = async (images: (string | null)[], themeTitle: string) => {
    const zip = new JSZip();
    const imagePromises = images
        .filter((url): url is string => url !== null)
        .map(async (imageUrl, index) => {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            zip.file(`${themeTitle.replace(/\s+/g, '_')}_${index + 1}.jpg`, blob);
        });

    await Promise.all(imagePromises);
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = `ImaginaIA_${themeTitle.replace(/\s+/g, '_')}_Album.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// --- Main App Component ---
function App() {
    const [appState, setAppState] = useState<AppState>('upload');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<Polaroid[]>([]);
    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    
    const constraintsRef = useRef(null);

    // Load history from localStorage on initial render
    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('imaginaia-history');
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Failed to parse history from localStorage:", error);
            localStorage.removeItem('imaginaia-history');
        }
    }, []);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('imaginaia-history', JSON.stringify(history));
    }, [history]);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setGeneratedImages([]);
                setAppState('selecting');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async (theme: Theme) => {
        if (!uploadedImage) return;

        setAppState('generating');
        setSelectedTheme(theme);
        const initialPlaceholders: Polaroid[] = Array.from({ length: NUM_IMAGES_TO_GENERATE }, (_, i) => ({
            id: i,
            imageUrl: null,
            status: 'pending',
        }));
        setGeneratedImages(initialPlaceholders);

        const generationPromises = initialPlaceholders.map(async (_, index) => {
            try {
                const promptHasHighDetail = theme.prompt.length > 200;
                const promptVariation = promptHasHighDetail ? '' : ` Style variation ${index + 1}/${NUM_IMAGES_TO_GENERATE}.`;
                const finalPrompt = theme.prompt + promptVariation;

                const resultUrl = await generateImageFromPrompt([uploadedImage], finalPrompt);
                return { id: index, imageUrl: resultUrl, status: 'done' as const };
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                console.error(`Failed to generate image ${index + 1}:`, err);
                return { id: index, imageUrl: null, status: 'error' as const, error: errorMessage };
            }
        });

        // Update UI as each image finishes
        generationPromises.forEach(promise => {
            promise.then(result => {
                setGeneratedImages(prev => prev.map(p => p.id === result.id ? { ...p, ...result } : p));
            });
        });
        
        // Wait for all to settle before changing state and saving to history
        const results = await Promise.allSettled(generationPromises);
        
        const finalImageUrls = results.map(r => r.status === 'fulfilled' ? r.value.imageUrl : null);
        
        const newHistoryItem: HistoryItem = {
            id: `hist-${Date.now()}`,
            imageUrls: finalImageUrls,
            title: theme.title,
            timestamp: Date.now(),
            isFavorite: false,
        };
        setHistory(prev => [newHistoryItem, ...prev]);

        setAppState('results');
    };

    const handleReset = () => {
        setUploadedImage(null);
        setGeneratedImages([]);
        setSelectedTheme(null);
        setAppState('upload');
    };

    const handleBackToSelection = () => {
        setGeneratedImages([]);
        setSelectedTheme(null);
        setAppState('selecting');
    };
    
    const handleToggleFavorite = (id: string) => {
        setHistory(prev => prev.map(item =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
        ));
    };

    const renderContent = () => {
        switch (appState) {
            case 'history':
                return <HistoryPanel history={history} setHistory={setHistory} onBack={() => setAppState('selecting')} onToggleFavorite={handleToggleFavorite} />;

            case 'results':
            case 'generating':
                return (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center w-full h-full"
                    >
                        <div ref={constraintsRef} className="w-full h-[450px] relative mb-6">
                            {generatedImages.map((polaroid, index) => (
                                 <motion.div
                                    key={polaroid.id}
                                    drag
                                    dragConstraints={constraintsRef}
                                    initial={{
                                        x: Math.random() * 200 - 100,
                                        y: Math.random() * 50 - 25,
                                        rotate: Math.random() * 20 - 10,
                                        scale: 0.9,
                                    }}
                                    animate={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 100, delay: index * 0.1 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                                >
                                    <PolaroidCard
                                        caption={`${selectedTheme?.title || 'Creación'} #${polaroid.id + 1}`}
                                        status={polaroid.status}
                                        imageUrl={polaroid.imageUrl ?? undefined}
                                        error={polaroid.error}
                                    />
                                 </motion.div>
                            ))}
                        </div>
                        {appState === 'results' && (
                             <div className="flex flex-col sm:flex-row items-center gap-4">
                                <button onClick={() => downloadAlbum(generatedImages.map(i => i.imageUrl), selectedTheme?.title ?? 'ImaginaIA')} className={primaryButtonClasses}>Descargar Álbum</button>
                                <button onClick={handleBackToSelection} className={secondaryButtonClasses}>Elegir Otro Tema</button>
                                <button onClick={handleReset} className="font-permanent-marker text-lg text-neutral-400 hover:text-white transition-colors">Empezar de Nuevo</button>
                             </div>
                        )}
                         {appState === 'generating' && (
                            <p className="font-permanent-marker text-xl text-yellow-400 animate-pulse">Generando tu pack de imágenes...</p>
                         )}
                    </motion.div>
                );

            case 'selecting':
                return <CategorySelector onSelect={handleGenerate} uploadedImage={uploadedImage!} onViewHistory={() => setAppState('history')} />;

            case 'upload':
            default:
                return (
                     <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8, type: 'spring' }} className="flex flex-col items-center">
                         <label htmlFor="file-upload" className="cursor-pointer group transform hover:scale-105 transition-transform duration-300">
                             <PolaroidCard caption="Subir una Foto" status="done" />
                         </label>
                         <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                     </motion.div>
                );
        }
    };

    return (
        <main className="bg-black text-neutral-200 min-h-screen w-full flex flex-col items-center justify-center p-4 pb-24 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05]"></div>
            
            <div className="z-10 flex flex-col items-center justify-center w-full h-full flex-1 min-h-0">
                <div className="text-center mb-6">
                   <h1 className="text-4xl md:text-5xl font-caveat font-bold text-neutral-100">ImaginaIA</h1>
                   <p className="font-permanent-marker text-neutral-300 mt-1 text-lg tracking-wide">Genera tu imagen a través del tiempo y la imaginación.</p>
                </div>
                
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>
            
            <Footer />
        </main>
    );
}

export default App;