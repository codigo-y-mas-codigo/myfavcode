import React, { useState, useCallback, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { toPng } from 'html-to-image';
import { useHistoryState, HistoryState } from './hooks/useHistoryState';
import { useMediaQuery } from './hooks/useMediaQuery';
import type { AppState, CardData, TemplateId, SavedDesign, ElementPositions, AIStyle, AIFullDesign, AlignmentType, TextStyle, ChatMessage, CustomFont } from './types';
import { TEMPLATES, GOOGLE_FONTS } from './constants';
import { generateLogo, generateFullCardDesign, generateFullCardImage, refineCardDesign, identifyFontFromImage } from './services/geminiService';
import * as storage from './utils/storage';
import { toBase64 } from './utils/fileUtils';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas, { CanvasRef } from './components/Canvas';
import Footer from './components/Footer';
import PrintOrderModal from './components/PrintOrderModal';
import { Loader } from './components/common/Loader';
import AlignmentToolbar from './components/AlignmentToolbar';

const initialCardData: CardData = {
  name: 'Alex Doe',
  title: 'UX Designer',
  company: 'Innovate Inc.',
  phone: '+1 (555) 123-4567',
  email: 'alex.doe@innovate.co',
  website: 'innovate.co',
  address: '456 Tech Avenue, Future City',
};

const initialPositions: ElementPositions = {
  logo: { x: 20, y: 20 },
  name: { x: 20, y: 120 },
  details: { x: 190, y: 60 },
};

const initialAIStyle: AIStyle = {};

// Simple abstract logo as a Base64 SVG
const initialLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAgMEwxMCA5MEg5MFoiIGZpbGw9IiM2MzY2RjEiLz48cGF0aCBkPSJNNTAgMEw5MCA5MEg3MEw1MCAzNVoiIGZpbGw9IiM4QjVDRjYiLz48L3N2Zz4=';

const initialState: AppState = {
  cardData: initialCardData,
  logo: initialLogo,
  font: 'Roboto',
  templateId: 'modern',
  aiStyle: initialAIStyle,
  positions: initialPositions,
  orientation: 'horizontal',
  fullCardImage: null,
  elementOrder: ['logo', 'name', 'details'],
  selectedElements: [],
  textStyles: {
    name: { letterSpacing: 0, lineHeight: 1.2 },
    details: { letterSpacing: 0, lineHeight: 1.4 },
  },
  customFonts: [],
  aiChatHistory: [],
};

export default function App() {
  const { state, setState, undo, redo, canUndo, canRedo } = useHistoryState<AppState>(initialState);
  const { cardData, logo, font, templateId, aiStyle, positions, orientation, selectedElements, textStyles, customFonts, aiChatHistory } = state;
  
  const [activeTab, setActiveTab] = useState('profile');
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [isPrintModalOpen, setPrintModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState('AI is crafting...');
  const [notification, setNotification] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<CanvasRef>(null);

  useEffect(() => {
    setSavedDesigns(storage.loadDesigns());
  }, []);

  // Close sidebar if screen resizes to desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const styleId = 'custom-fonts-style-sheet';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const fontFaces = customFonts.map(cf => `
      @font-face {
        font-family: "${cf.name}";
        src: url("${cf.url}");
      }
    `).join('\n');

    styleElement.innerHTML = fontFaces;
  }, [customFonts]);


  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStateChange = <K extends keyof AppState,>(key: K, value: AppState[K]) => {
    const newState: AppState = { ...state, [key]: value };
    if (key === 'templateId') {
      newState.fullCardImage = null; // When template changes, remove the full card image
      newState.selectedElements = []; // Deselect elements
      newState.elementOrder = ['logo', 'name', 'details']; // Reset element order
      newState.aiChatHistory = []; // Reset AI chat history
    }
    setState(newState);
  };
  
  const handleDataChange = (field: keyof CardData, value: string) => {
    handleStateChange('cardData', { ...cardData, [field]: value });
  };
  
  const handlePositionChange = (element: keyof ElementPositions, pos: { x: number; y: number }) => {
    handleStateChange('positions', { ...positions, [element]: pos });
  };
  
  const handlePositionsChange = (newPositions: ElementPositions) => {
    handleStateChange('positions', newPositions);
  };

  const handleTextStyleChange = (elementId: 'name' | 'details', key: keyof TextStyle, value: number) => {
    handleStateChange('textStyles', {
      ...textStyles,
      [elementId]: {
        ...textStyles[elementId],
        [key]: value,
      },
    });
  };

  const handleElementSelect = (elementId: keyof ElementPositions, e: React.MouseEvent) => {
    e.stopPropagation();
    const isMultiSelect = e.shiftKey || e.metaKey || e.ctrlKey;
    const isSelected = selectedElements.includes(elementId);

    if (isMultiSelect) {
      const newSelection = isSelected
        ? selectedElements.filter(id => id !== elementId)
        : [...selectedElements, elementId];
      handleStateChange('selectedElements', newSelection);
    } else {
      handleStateChange('selectedElements', isSelected && selectedElements.length === 1 ? [] : [elementId]);
    }
  };

  const handleClearSelection = () => {
    if (selectedElements.length > 0) {
      handleStateChange('selectedElements', []);
    }
  };

  const handleAlign = (type: AlignmentType) => {
    if (canvasRef.current && selectedElements.length > 1) {
      canvasRef.current.alignElements(type, selectedElements);
    }
  };

  const handleBringToFront = () => {
    if (selectedElements.length === 0) return;
    const { elementOrder } = state;
    const orderedSelected = elementOrder.filter(id => selectedElements.includes(id));
    const unselected = elementOrder.filter(id => !selectedElements.includes(id));
    const newElementOrder = [...unselected, ...orderedSelected];
    handleStateChange('elementOrder', newElementOrder);
  };

  const handleSendToBack = () => {
    if (selectedElements.length === 0) return;
    const { elementOrder } = state;
    const orderedSelected = elementOrder.filter(id => selectedElements.includes(id));
    const unselected = elementOrder.filter(id => !selectedElements.includes(id));
    const newElementOrder = [...orderedSelected, ...unselected];
    handleStateChange('elementOrder', newElementOrder);
  };

  const handleLogoUpload = async (file: File) => {
    try {
      const base64Logo = await toBase64(file);
      handleStateChange('logo', base64Logo as string);
    } catch (error) {
      console.error("Error converting file to base64", error);
      showNotification('Error uploading logo.');
    }
  };

  const handleAddCustomFont = (name: string, url: string) => {
    if (!name.trim() || !url.trim()) {
      showNotification("Font name and URL are required.");
      return;
    }
    if (customFonts.some(f => f.name.toLowerCase() === name.toLowerCase())) {
        showNotification(`Font with name "${name}" already exists.`);
        return;
    }
    const newFont = { name, url };
    setState({
        ...state,
        customFonts: [...customFonts, newFont],
        font: name,
    });
    showNotification(`Font "${name}" added successfully!`);
  };

  const handleIdentifyFont = async (file: File) => {
    setLoaderMessage('AI is identifying your font...');
    setIsLoading(true);
    try {
      const base64ImageWithPrefix = await toBase64(file) as string;
      const base64Image = base64ImageWithPrefix.split(',')[1];
      const fontName = await identifyFontFromImage(base64Image);
      handleStateChange('font', fontName);
      showNotification(`Font identified and applied: ${fontName}`);
    } catch (error) {
      console.error("Font identification failed:", error);
      showNotification('Failed to identify font from image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = useCallback(() => {
    if (cardRef.current === null) return;
    toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 }) // 300DPI-like quality
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'cardcraft-business-card.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
        showNotification('Failed to download card.');
      });
  }, [cardRef]);

  const handleSaveDesign = () => {
    const name = prompt("Enter a name for your design:", `Design ${new Date().toLocaleTimeString()}`);
    if (name) {
      const newDesign: SavedDesign = {
        id: Date.now().toString(),
        name,
        timestamp: new Date().toISOString(),
        state: { ...state, selectedElements: [] }, // Don't save selection state
      };
      storage.saveDesign(newDesign);
      setSavedDesigns(storage.loadDesigns());
      showNotification('Design saved successfully!');
    }
  };

  const handleLoadDesign = (id: string) => {
    const design = savedDesigns.find(d => d.id === id);
    if (design) {
      setState(design.state, true); // true to clear history
      showNotification(`Design "${design.name}" loaded.`);
      if (isMobile) setSidebarOpen(false);
    }
  };
  
  const handleDeleteDesign = (id: string) => {
    if (window.confirm("Are you sure you want to delete this design?")) {
      storage.deleteDesign(id);
      setSavedDesigns(storage.loadDesigns());
      showNotification('Design deleted.');
    }
  };

  const handleGenerateLogo = async (prompt: string) => {
    setLoaderMessage('AI is crafting your logo...');
    setIsLoading(true);
    try {
      const base64Image = await generateLogo(prompt);
      handleStateChange('logo', `data:image/png;base64,${base64Image}`);
    } catch (error) {
      console.error("Logo generation failed:", error);
      showNotification('Failed to generate logo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFullDesign = async (prompt: string) => {
    setLoaderMessage('AI is designing your card...');
    setIsLoading(true);
    try {
      const newDesign = await generateFullCardDesign(prompt);
      setState({
        ...state,
        aiStyle: newDesign.style,
        positions: newDesign.positions,
        fullCardImage: null,
        selectedElements: [],
        aiChatHistory: [
          { role: 'user', text: prompt },
          { role: 'model', text: 'Here is the initial design. How can I refine it?' }
        ],
      });
    } catch (error) {
      console.error("Full card design generation failed:", error);
      showNotification('Failed to generate design.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRefineDesign = async (prompt: string) => {
    setLoaderMessage('AI is refining your design...');
    setIsLoading(true);
    const currentDesign = { style: state.aiStyle, positions: state.positions };
    const updatedHistory: ChatMessage[] = [...state.aiChatHistory, { role: 'user', text: prompt }];

    try {
        const refinedDesign = await refineCardDesign(prompt, currentDesign);
        setState({
            ...state,
            aiStyle: refinedDesign.style,
            positions: refinedDesign.positions,
            aiChatHistory: [...updatedHistory, { role: 'model', text: 'I have updated the design as you requested.' }]
        });
    } catch (error) {
        console.error("Design refinement failed:", error);
        showNotification('Failed to refine design.');
    } finally {
        setIsLoading(false);
    }
  };


  const handleGenerateFullCardImage = async (prompt: string) => {
    setLoaderMessage('AI is generating your card image...');
    setIsLoading(true);
    try {
      const base64Image = await generateFullCardImage(prompt, cardData, orientation);
      setState({
        ...state,
        fullCardImage: `data:image/png;base64,${base64Image}`,
        selectedElements: [],
      });
    } catch (error) {
      console.error("Full card image generation failed:", error);
      showNotification('Failed to generate card image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetCustomDomain = (designId: string, domainName: string) => {
    const newDesigns = savedDesigns.map(d => {
        if (d.id === designId) {
            return { ...d, customDomain: { name: domainName, status: 'pending' as const } };
        }
        return d;
    });
    setSavedDesigns(newDesigns);
    storage.saveAllDesigns(newDesigns);
    showNotification(`Domain for "${newDesigns.find(d => d.id === designId)?.name}" set to pending.`);
  };

  const handleVerifyDomain = (designId: string) => {
    setLoaderMessage("Verifying domain configuration...");
    setIsLoading(true);
    setTimeout(() => {
        const newDesigns = savedDesigns.map(d => {
            if (d.id === designId && d.customDomain) {
                 return { ...d, customDomain: { ...d.customDomain, status: 'published' as const } };
            }
            return d;
        });
        setSavedDesigns(newDesigns);
        storage.saveAllDesigns(newDesigns);
        setIsLoading(false);
        showNotification(`Domain for "${newDesigns.find(d => d.id === designId)?.name}" published successfully!`);
    }, 2000);
  };

  const handleRemoveDomain = (designId: string) => {
      if (window.confirm("Are you sure you want to remove the custom domain for this design?")) {
        const newDesigns = savedDesigns.map(d => {
            if (d.id === designId) {
                const { customDomain, ...rest } = d;
                return rest;
            }
            return d;
        });
        setSavedDesigns(newDesigns);
        storage.saveAllDesigns(newDesigns);
        showNotification('Custom domain removed.');
      }
  };

  return (
    <div className="h-screen w-screen bg-brand-dark text-brand-light font-sans flex flex-col antialiased">
      {isLoading && <Loader message={loaderMessage} />}
      {notification && (
        <div className="absolute top-5 right-5 bg-gradient-accent text-white py-2 px-4 rounded-md shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
      
      <Header
        onSave={handleSaveDesign}
        onDownload={handleDownload}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onPrint={() => setPrintModalOpen(true)}
        isMobile={isMobile}
        onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-row h-full w-full overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cardData={cardData}
          onDataChange={handleDataChange}
          logo={logo}
          onLogoUpload={handleLogoUpload}
          onLogoRemove={() => handleStateChange('logo', null)}
          font={font}
          onFontChange={(f) => handleStateChange('font', f)}
          customFonts={customFonts}
          onAddCustomFont={handleAddCustomFont}
          onIdentifyFont={handleIdentifyFont}
          selectedElements={selectedElements}
          textStyles={textStyles}
          onTextStyleChange={handleTextStyleChange}
          onGenerateLogo={handleGenerateLogo}
          onGenerateFullDesign={handleGenerateFullDesign}
          onRefineDesign={handleRefineDesign}
          aiChatHistory={aiChatHistory}
          onGenerateFullCardImage={handleGenerateFullCardImage}
          templateId={templateId}
          onTemplateSelect={(id) => handleStateChange('templateId', id)}
          savedDesigns={savedDesigns}
          onLoadDesign={handleLoadDesign}
          onDeleteDesign={handleDeleteDesign}
          isMobile={isMobile}
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarOpen}
          onSetDomain={handleSetCustomDomain}
          onVerifyDomain={handleVerifyDomain}
          onRemoveDomain={handleRemoveDomain}
        />
        <main className="flex-1 flex flex-col bg-brand-dark-accent/50 p-4 md:p-8 items-center justify-center overflow-auto relative" onClick={handleClearSelection}>
          {selectedElements.length > 0 && (
            <AlignmentToolbar 
              onAlign={handleAlign} 
              onBringToFront={handleBringToFront}
              onSendToBack={handleSendToBack}
              showAlignmentTools={selectedElements.length > 1}
            />
          )}
          <Canvas
            ref={canvasRef}
            cardRef={cardRef}
            state={state}
            onPositionChange={handlePositionChange}
            onPositionsChange={handlePositionsChange}
            onElementSelect={handleElementSelect}
          />
          <Footer
            orientation={orientation}
            onOrientationChange={(o) => handleStateChange('orientation', o)}
            onZoom={() => {}} // Zoom functionality can be added here
          />
        </main>
      </div>

      {isPrintModalOpen && <PrintOrderModal onClose={() => setPrintModalOpen(false)} />}
    </div>
  );
}