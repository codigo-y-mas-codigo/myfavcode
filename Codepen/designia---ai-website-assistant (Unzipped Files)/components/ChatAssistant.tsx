import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import Icon from './Icon';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; }[]>([]);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const chatInstance = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: 'You are a helpful AI assistant for a web design application called DesignIA. Your goal is to help users with their web design questions and suggest ideas. You can also provide guidance on how to use the application. Keep your responses concise and friendly.',
          },
        });
        setChat(chatInstance);
        setMessages([
          { role: 'model', text: 'Hello! How can I help you with your design today?' }
        ]);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages([
            { role: 'model', text: 'Sorry, the chat assistant could not be initialized.' }
        ]);
      }
    };
    initChat();
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat || isLoading) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat.sendMessage(input);
      const modelMessage = { role: 'model' as const, text: result.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { role: 'model' as const, text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-transform transform hover:scale-110"
          aria-label="Open chat"
        >
          <Icon name="chat-3-line" className="text-3xl" />
        </button>
      </div>

      <div className={`fixed bottom-6 right-6 z-50 w-[380px] h-[550px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
             <Icon name="robot-2-line" className="text-primary text-xl" />
             <h3 className="font-semibold text-gray-900 dark:text-gray-100">AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <Icon name="subtract-line" className="text-xl" />
          </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-bl-none'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-bl-none">
                 <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-button font-medium hover:bg-blue-600 transition-colors disabled:bg-primary/50 dark:disabled:bg-primary/30 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <Icon name="send-plane-line" className="text-lg" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;
