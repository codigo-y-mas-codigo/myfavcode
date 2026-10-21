
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './common/Button';
import { AiIcon } from './icons/IconComponents';
import type { ChatMessage } from '../types';

interface AiAssistantProps {
  onGenerateLogo: (prompt: string) => Promise<void>;
  onGenerateFullDesign: (prompt: string) => Promise<void>;
  onGenerateFullCardImage: (prompt: string) => Promise<void>;
  onRefineDesign: (prompt: string) => Promise<void>;
  aiChatHistory: ChatMessage[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ onGenerateLogo, onGenerateFullDesign, onGenerateFullCardImage, onRefineDesign, aiChatHistory }) => {
  const [logoPrompt, setLogoPrompt] = useState('');
  const [stylePrompt, setStylePrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [refinePrompt, setRefinePrompt] = useState('');
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [aiChatHistory]);

  const handleRefineSubmit = () => {
    if (refinePrompt.trim()) {
      onRefineDesign(refinePrompt);
      setRefinePrompt('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Logo Generator</h3>
        <p className="text-sm text-indigo-300 mb-2">Describe the logo you want. e.g., "an abstract fox with origami style".</p>
        <textarea
          value={logoPrompt}
          onChange={(e) => setLogoPrompt(e.target.value)}
          placeholder="A clean, minimalist logo..."
          className="w-full bg-brand-dark p-2 rounded-md mt-1 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={() => onGenerateLogo(logoPrompt)} disabled={!logoPrompt} className="mt-2 w-full">
          <AiIcon /> Generate Logo
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-2">Full AI Card Designer</h3>
        <p className="text-sm text-indigo-300 mb-2">Describe the style and layout. e.g., "for a law firm, serious and confident, using blues and grays, with the logo on the left".</p>
        <textarea
          value={stylePrompt}
          onChange={(e) => setStylePrompt(e.target.value)}
          placeholder="A modern tech startup feel..."
          className="w-full bg-brand-dark p-2 rounded-md mt-1 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={() => onGenerateFullDesign(stylePrompt)} disabled={!stylePrompt} className="mt-2 w-full">
          <AiIcon /> Generate Initial Design
        </Button>
      </div>

      {aiChatHistory.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h4 className="text-md font-bold text-white -mt-1">Refine with AI</h4>
          <p className="text-xs -mt-3 text-indigo-300">Your design is ready. Chat with the AI to make changes.</p>
          
          <div ref={chatContainerRef} className="bg-brand-dark p-3 rounded-md h-40 overflow-y-auto space-y-3 text-sm">
            {aiChatHistory.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-brand-dark-accent text-indigo-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={refinePrompt}
              onChange={(e) => setRefinePrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleRefineSubmit()}
              placeholder="e.g., Make the background black"
              className="flex-1 bg-brand-dark p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button onClick={handleRefineSubmit} disabled={!refinePrompt}>
              Send
            </Button>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold text-white mb-2">Image Card Generator</h3>
        <p className="text-sm text-indigo-300 mb-2">Describe a full card design. The AI will generate it as a single image. Your current profile data will be included as text.</p>
        <textarea
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          placeholder="A cyberpunk-themed card for a software developer, with a neon city background..."
          className="w-full bg-brand-dark p-2 rounded-md mt-1 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={() => onGenerateFullCardImage(imagePrompt)} disabled={!imagePrompt} className="mt-2 w-full">
          <AiIcon /> Generate Card Image
        </Button>
      </div>
    </div>
  );
};

export default AiAssistant;