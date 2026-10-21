
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Header from './components/Header';
import Footer from './components/Footer';
import Input from './components/Input';
import Button from './components/Button';
import PromptDisplay from './components/PromptDisplay';
import TextArea from './components/TextArea';
import SuggestionsDisplay from './components/SuggestionsDisplay';
import { LoadingSpinner } from './components/icons/LoadingSpinner';
import { SparklesIcon } from './components/icons/SparklesIcon';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Suggestions {
  titles: string[];
  subtitles: string[];
  seals: string[];
}

const App: React.FC = () => {
  const [title, setTitle] = useState<string>('CONEXIÓN MODERNA');
  const [subtitle, setSubtitle] = useState<string>('Navegando el amor y la identidad en la era digital');
  const [author, setAuthor] = useState<string>('Luis Ángel Maciel');
  const [seal, setSeal] = useState<string>('Incluye Prompts Poderosos');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  const [bookContent, setBookContent] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const handleGenerateSuggestions = useCallback(async () => {
    if (!bookContent) {
      setError('Por favor, introduce un resumen o contenido del libro.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    const systemInstruction = `Eres un experto en marketing editorial y un creativo publicitario especializado en portadas de libros de ciencia ficción, cyberpunk y realismo mágico. Basado en el siguiente texto de un libro, genera 3 propuestas de título, 3 propuestas de subtítulo y 3 propuestas de texto para un sello promocional. El tono debe ser moderno, masculino, y alineado con una estética cyberpunk minimalista con toques culturales (como alebrijes oaxaqueños). Los títulos y subtítulos deben ser concisos, potentes y comerciales. El sello debe ser una frase corta y llamativa.`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
          titles: { type: Type.ARRAY, items: { type: Type.STRING } },
          subtitles: { type: Type.ARRAY, items: { type: Type.STRING } },
          seals: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['titles', 'subtitles', 'seals'],
    };

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: bookContent,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema,
        }
      });
      
      const suggestionsJson = JSON.parse(response.text);
      setSuggestions(suggestionsJson);

    } catch (e) {
      console.error(e);
      setError('Hubo un error al generar las sugerencias. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [bookContent]);

  const handleSelectSuggestion = useCallback((type: 'title' | 'subtitle' | 'seal', value: string) => {
    switch (type) {
      case 'title':
        setTitle(value);
        break;
      case 'subtitle':
        setSubtitle(value);
        break;
      case 'seal':
        setSeal(value);
        break;
    }
  }, []);

  const generatePrompt = useCallback(() => {
    if (!title || !subtitle || !author || !seal) {
        setGeneratedPrompt("Por favor, completa todos los campos para generar el prompt.");
        return;
    }

    const promptTemplate = `Ultra-detailed 8K book cover. Spanish title: "**${title}**" (large, futuristic holographic font).
Subtitle: "**${subtitle}**" (minimal font).
Main concept: Two digital male silhouettes made of binary code facing each other, with a glowing abstract heart between them.
Background: subtle Oaxacan alebrije patterns in minimalist cyberpunk style.
Colors: #000080 (trust) + #FF2D55 (passion).

Bottom-right corner: Author name — *${author}*.
Bottom-left or circular badge: label that says "**${seal}**" in bold tech-style typography.

Aesthetic: modern masculine, cinematic lighting, Amazon Kindle trending style, 3:4 aspect ratio.`;
    
    setGeneratedPrompt(promptTemplate);
  }, [title, subtitle, author, seal]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 bg-cyber-bg bg-grid-cyber-border/[0.2] relative">
       <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-cyber-bg [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col flex-grow">
        <Header />
        <main className="flex-grow space-y-8">
            {/* AI Assistant */}
            <div className="bg-cyber-surface/80 backdrop-blur-sm border border-cyber-border rounded-xl shadow-lg shadow-navy-trust/20 p-6 md:p-8 space-y-4">
                 <h2 className="font-orbitron text-2xl font-bold text-cyber-accent">✨ Asistente IA para Ideas</h2>
                 <p className="text-cyber-accent/80">¿Necesitas inspiración? Pega un resumen de tu libro y la IA te sugerirá títulos, subtítulos y sellos promocionales.</p>
                 <TextArea 
                    label="Sinopsis o contenido del libro"
                    value={bookContent}
                    onChange={(e) => setBookContent(e.target.value)}
                    placeholder="Pega aquí un capítulo, la sinopsis o las ideas clave de tu libro..."
                    rows={8}
                 />
                 <div className="text-center">
                    <Button onClick={handleGenerateSuggestions} disabled={isLoading || !bookContent}>
                        {isLoading ? <LoadingSpinner className="w-5 h-5 mr-2" /> : <SparklesIcon className="w-5 h-5 mr-2" />}
                        {isLoading ? 'Generando...' : 'Generar Ideas'}
                    </Button>
                 </div>
            </div>

            {error && <p className="text-center text-red-400 bg-red-900/50 border border-red-500 rounded-md p-3">{error}</p>}
            {suggestions && <SuggestionsDisplay suggestions={suggestions} onSelect={handleSelectSuggestion} />}


          {/* Prompt Configuration */}
          <div className="bg-cyber-surface/80 backdrop-blur-sm border border-cyber-border rounded-xl shadow-lg shadow-navy-trust/20 p-6 md:p-8 space-y-6">
            <h2 className="font-orbitron text-2xl font-bold text-cyber-accent">⚙️ Configuración del Prompt</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Título del libro"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. CONEXIÓN MODERNA"
              />
              <Input
                label="Subtítulo"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ej. Navegando el amor y la identidad en la era digital"
              />
              <Input
                label="Autor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ej. Luis Ángel Maciel"
              />
              <Input
                label="Texto del sello o etiqueta"
                value={seal}
                onChange={(e) => setSeal(e.target.value)}
                placeholder="Ej. Incluye Prompts Poderosos"
              />
            </div>
            <div className="text-center pt-4">
               <Button onClick={generatePrompt}>
                 <SparklesIcon className="w-5 h-5 mr-2" />
                 Generar Prompt Final
               </Button>
            </div>
          </div>
          
          {generatedPrompt && <PromptDisplay prompt={generatedPrompt} />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
