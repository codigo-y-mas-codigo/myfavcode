import React, { useState, useCallback } from 'react';
import Icon from './Icon';
import { generateImage } from '../services/geminiService';

interface ImageGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageGenerationModal: React.FC<ImageGenerationModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt || isLoading) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const handleDownloadImage = useCallback(() => {
    if (!generatedImageUrl || isDownloading) return;
    setIsDownloading(true);

    // Simulate a short delay for better UX
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = generatedImageUrl;
      link.download = 'designia-generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 500);
  }, [generatedImageUrl, isDownloading]);


  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Generador de Imágenes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <Icon name="close-line" className="text-2xl" />
          </button>
        </header>

        <main className="p-6 flex-1 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 flex flex-col">
            <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Describe la imagen
            </label>
            <textarea
              id="image-prompt"
              placeholder="Ej: A futuristic city skyline at sunset, with flying cars and neon lights..."
              className="w-full flex-1 p-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg aspect-square">
            {isLoading ? (
              <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                <Icon name="loader-4-line" className="animate-spin text-4xl mb-2" />
                <span>Generando...</span>
              </div>
            ) : generatedImageUrl ? (
              <img src={generatedImageUrl} alt="Generated image" className="w-full h-full object-contain rounded-lg" />
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                <Icon name="image-line" className="text-5xl mb-2" />
                <p>La vista previa de la imagen aparecerá aquí</p>
              </div>
            )}
          </div>
        </main>

        <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            {generatedImageUrl && (
               <button
                  onClick={handleDownloadImage}
                  disabled={isDownloading}
                  className="px-4 py-2 bg-green-600 text-white rounded-button font-medium hover:bg-green-700 transition-colors flex items-center disabled:bg-green-600/70 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Icon name="loader-4-line" className="animate-spin mr-2" />
                      Descargando...
                    </>
                  ) : (
                    <>
                      <Icon name="download-line" className="mr-2" />
                      Descargar
                    </>
                  )}
                </button>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-button font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleGenerateImage}
              disabled={isLoading || !prompt}
              className="px-4 py-2 bg-primary text-white rounded-button font-medium hover:bg-blue-600 transition-colors flex items-center justify-center disabled:bg-primary/50 dark:disabled:bg-primary/30 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Icon name="loader-4-line" className="animate-spin mr-2" />
              ) : (
                <Icon name="magic-line" className="mr-2" />
              )}
              Generar Imagen
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ImageGenerationModal;
