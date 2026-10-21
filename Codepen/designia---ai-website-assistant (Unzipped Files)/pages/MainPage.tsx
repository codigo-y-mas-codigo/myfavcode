import React, { useState, useCallback } from 'react';
import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import MainCanvas from '../components/MainCanvas';
import RightSidebar from '../components/RightSidebar';
import Footer from '../components/Footer';
import ImageGenerationModal from '../components/ImageGenerationModal';
import ChatAssistant from '../components/ChatAssistant';
import { generateWebsiteCode } from '../services/geminiService';
import { initialHtmlContent } from '../constants';
import type { ViewMode, Platform, HistoryEntry } from '../types';

const MainPage: React.FC = () => {
    const initialEntry: HistoryEntry = {
        id: `hist_${Date.now()}`,
        prompt: 'A modern landing page for a tech startup with a hero section, key features, and testimonials.',
        code: initialHtmlContent,
        timestamp: Date.now(),
    };

    const [history, setHistory] = useState<HistoryEntry[]>([initialEntry]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
    
    const currentEntry = history[currentHistoryIndex];
    
    const [prompt, setPrompt] = useState<string>(initialEntry.prompt);
    const [generatedCode, setGeneratedCode] = useState<string>(initialEntry.code);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [activeView, setActiveView] = useState<ViewMode>('desktop');
    const [activePlatform, setActivePlatform] = useState<Platform>('html');
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isExporting, setIsExporting] = useState<boolean>(false);

    const canUndo = currentHistoryIndex < history.length - 1;
    const canRedo = currentHistoryIndex > 0;

    const handleGenerate = useCallback(async () => {
        if (!prompt || isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            const code = await generateWebsiteCode(prompt);
            const newEntry: HistoryEntry = {
                id: `hist_${Date.now()}`,
                prompt,
                code,
                timestamp: Date.now(),
            };

            // If we've undone, new generation creates a new branch, erasing the old "redo" path
            const newHistory = [...history].slice(currentHistoryIndex);

            setHistory([newEntry, ...newHistory]);
            setGeneratedCode(code);
            setCurrentHistoryIndex(0); // Reset pointer to the latest version
        } catch (err) {
            setError('Failed to generate design. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [prompt, isLoading, history, currentHistoryIndex]);

    const handleSelectHistory = useCallback((entry: HistoryEntry) => {
        const index = history.findIndex(h => h.id === entry.id);
        if (index !== -1) {
            setCurrentHistoryIndex(index);
            const selectedEntry = history[index];
            setPrompt(selectedEntry.prompt);
            setGeneratedCode(selectedEntry.code);
        }
    }, [history]);

    const handleUndo = useCallback(() => {
        if (canUndo) {
            const newIndex = currentHistoryIndex + 1;
            setCurrentHistoryIndex(newIndex);
            const entry = history[newIndex];
            setPrompt(entry.prompt);
            setGeneratedCode(entry.code);
        }
    }, [history, currentHistoryIndex, canUndo]);

    const handleRedo = useCallback(() => {
        if (canRedo) {
            const newIndex = currentHistoryIndex - 1;
            setCurrentHistoryIndex(newIndex);
            const entry = history[newIndex];
            setPrompt(entry.prompt);
            setGeneratedCode(entry.code);
        }
    }, [history, currentHistoryIndex, canRedo]);


    const handleExport = useCallback(() => {
        if (isExporting) return;
        setIsExporting(true);

        console.log(`Exporting for platform: ${activePlatform}`);
        
        setTimeout(() => {
            const blob = new Blob([generatedCode], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'designia-export.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setIsExporting(false);
        }, 500);
    }, [activePlatform, generatedCode, isExporting]);

    return (
        <div className="flex flex-col h-screen font-sans text-gray-900 dark:text-gray-200">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <LeftSidebar
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                    onOpenImageModal={() => setIsImageModalOpen(true)}
                    history={history}
                    activeHistoryId={currentEntry.id}
                    onSelectHistory={handleSelectHistory}
                />
                <main className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-950">
                    {error && <div className="bg-red-500 text-white p-2 text-center">{error}</div>}
                    <MainCanvas
                        activeView={activeView}
                        setActiveView={setActiveView}
                        onExport={handleExport}
                        isExporting={isExporting}
                        htmlContent={generatedCode}
                        onUndo={handleUndo}
                        onRedo={handleRedo}
                        canUndo={canUndo}
                        canRedo={canRedo}
                    />
                </main>
                <RightSidebar
                    activePlatform={activePlatform}
                    setActivePlatform={setActivePlatform}
                />
            </div>
            <Footer />
            <ImageGenerationModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
            />
            <ChatAssistant />
        </div>
    );
};

export default MainPage;