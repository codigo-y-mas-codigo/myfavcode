import React, { useState, useEffect } from 'react';
import type { CardData, TemplateId, SavedDesign, AIFullDesign, ElementPositions, TextStyle, ChatMessage, CustomFont } from '../types';
import { ProfileIcon, TemplateIcon, AiIcon, DesignsIcon, PublishIcon } from './icons/IconComponents';
import ProfileForm from './ProfileForm';
import TemplateGallery from './TemplateGallery';
import AiAssistant from './AiAssistant';
import MyDesigns from './MyDesigns';
import DomainManager from './DomainManager';

interface TabButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 w-full transition-colors duration-200 ${
      isActive ? 'bg-indigo-500/20 text-white' : 'text-indigo-300 hover:bg-indigo-500/10'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cardData: CardData;
  onDataChange: (field: keyof CardData, value: string) => void;
  logo: string | null;
  onLogoUpload: (file: File) => void;
  onLogoRemove: () => void;
  font: string;
  onFontChange: (font: string) => void;
  customFonts: CustomFont[];
  onAddCustomFont: (name: string, url: string) => void;
  onIdentifyFont: (file: File) => Promise<void>;
  selectedElements: (keyof ElementPositions)[];
  textStyles: { name: TextStyle; details: TextStyle; };
  onTextStyleChange: (elementId: 'name' | 'details', key: keyof TextStyle, value: number) => void;
  onGenerateLogo: (prompt: string) => Promise<void>;
  onGenerateFullDesign: (prompt: string) => Promise<void>;
  onRefineDesign: (prompt: string) => Promise<void>;
  aiChatHistory: ChatMessage[];
  onGenerateFullCardImage: (prompt: string) => Promise<void>;
  templateId: TemplateId;
  onTemplateSelect: (id: TemplateId) => void;
  savedDesigns: SavedDesign[];
  onLoadDesign: (id: string) => void;
  onDeleteDesign: (id: string) => void;
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSetDomain: (designId: string, domainName: string) => void;
  onVerifyDomain: (designId: string) => void;
  onRemoveDomain: (designId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { activeTab, setActiveTab, isMobile, isOpen, setIsOpen } = props;
  const [contentId, setContentId] = useState(activeTab);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (activeTab !== contentId) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setContentId(activeTab);
        setIsFading(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeTab, contentId]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <ProfileIcon /> },
    { id: 'templates', label: 'Templates', icon: <TemplateIcon /> },
    { id: 'ai', label: 'AI', icon: <AiIcon /> },
    { id: 'designs', label: 'My Designs', icon: <DesignsIcon /> },
    { id: 'publish', label: 'Publish', icon: <PublishIcon /> },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
        setIsOpen(false);
    }
  };

  const renderContent = () => {
    switch (contentId) {
      case 'profile': return <ProfileForm {...props} />;
      case 'templates': return <TemplateGallery {...props} />;
      case 'ai': return <AiAssistant onGenerateLogo={props.onGenerateLogo} onGenerateFullDesign={props.onGenerateFullDesign} onGenerateFullCardImage={props.onGenerateFullCardImage} onRefineDesign={props.onRefineDesign} aiChatHistory={props.aiChatHistory} />;
      case 'designs': return <MyDesigns {...props} />;
      case 'publish': return <DomainManager savedDesigns={props.savedDesigns} onSetDomain={props.onSetDomain} onVerifyDomain={props.onVerifyDomain} onRemoveDomain={props.onRemoveDomain} />;
      default: return null;
    }
  };

  const sidebarClasses = `
    bg-brand-dark-accent flex flex-col
    transition-transform duration-300 ease-in-out z-40
    ${isMobile 
      ? `fixed top-0 left-0 h-full w-80 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
      : 'relative w-80 shrink-0'
    }
  `;

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <aside className={sidebarClasses}>
        <div className="flex w-full shrink-0 border-b border-white/10">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
            />
          ))}
        </div>
        <div 
          className={`flex-1 p-4 overflow-y-auto transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
        >
          {renderContent()}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;