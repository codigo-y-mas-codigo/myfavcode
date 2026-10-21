
import React from 'react';
import { TEMPLATES } from '../constants';
import type { TemplateId } from '../types';

interface TemplateGalleryProps {
  templateId: TemplateId;
  onTemplateSelect: (id: TemplateId) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ templateId, onTemplateSelect }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Templates</h3>
      <div className="grid grid-cols-2 gap-4">
        {TEMPLATES.map(template => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`cursor-pointer rounded-md overflow-hidden transition-all duration-200 ${templateId === template.id ? 'ring-2 ring-indigo-500' : 'ring-1 ring-white/20'}`}
          >
            <div className={`h-16 w-full ${template.className}`}></div>
            <div className="p-2 bg-brand-dark text-center text-sm">
              {template.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
