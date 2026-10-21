
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import type { AppState, ElementPositions, Point, AlignmentType } from '../types';
import { TEMPLATES } from '../constants';

export interface CanvasRef {
  alignElements: (type: AlignmentType, selectedIds: (keyof ElementPositions)[]) => void;
}

interface CanvasProps {
  state: AppState;
  onPositionChange: (element: keyof ElementPositions, pos: Point) => void;
  onPositionsChange: (positions: ElementPositions) => void;
  onElementSelect: (elementId: keyof ElementPositions, e: React.MouseEvent) => void;
  cardRef: React.Ref<HTMLDivElement>;
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(({ state, onPositionChange, onPositionsChange, onElementSelect, cardRef }, ref) => {
  const { cardData, logo, font, templateId, aiStyle, positions, orientation, fullCardImage, selectedElements, elementOrder, textStyles } = state;
  const template = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];

  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const elementRefs = { logo: logoRef, name: nameRef, details: detailsRef };

  useImperativeHandle(ref, () => ({
    alignElements: (type, selectedIds) => {
      const rects = selectedIds.map(id => {
        const node = elementRefs[id].current;
        return { id, node, pos: positions[id] };
      }).filter((item): item is { id: keyof ElementPositions, node: HTMLDivElement, pos: Point } => !!item.node);

      if (rects.length < 2) return;

      const boundingBox = rects.reduce((acc, { node, pos }) => {
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        acc.left = Math.min(acc.left, pos.x);
        acc.top = Math.min(acc.top, pos.y);
        acc.right = Math.max(acc.right, pos.x + width);
        acc.bottom = Math.max(acc.bottom, pos.y + height);
        return acc;
      }, { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity });

      const newPositions = { ...positions };
      const hCenter = boundingBox.left + (boundingBox.right - boundingBox.left) / 2;
      const vMiddle = boundingBox.top + (boundingBox.bottom - boundingBox.top) / 2;

      rects.forEach(({ id, node }) => {
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const currentPos = newPositions[id];

        switch (type) {
          case 'left':   newPositions[id] = { ...currentPos, x: boundingBox.left }; break;
          case 'center': newPositions[id] = { ...currentPos, x: hCenter - width / 2 }; break;
          case 'right':  newPositions[id] = { ...currentPos, x: boundingBox.right - width }; break;
          case 'top':    newPositions[id] = { ...currentPos, y: boundingBox.top }; break;
          case 'middle': newPositions[id] = { ...currentPos, y: vMiddle - height / 2 }; break;
          case 'bottom': newPositions[id] = { ...currentPos, y: boundingBox.bottom - height }; break;
        }
      });
      onPositionsChange(newPositions);
    }
  }));

  const cardStyle: React.CSSProperties = {
    fontFamily: aiStyle.fontFamily || font,
    backgroundColor: aiStyle.backgroundColor || undefined,
    color: aiStyle.primaryTextColor || undefined,
    borderColor: aiStyle.accentColor || undefined,
  };
  
  const secondaryTextStyle: React.CSSProperties = {
      color: aiStyle.secondaryTextColor || undefined,
  }

  const handleStop = (element: keyof ElementPositions): DraggableEventHandler => (e, data) => {
    onPositionChange(element, { x: data.x, y: data.y });
  };

  const cardClassName = `relative shadow-lg rounded-lg transform transition-all duration-300 overflow-hidden ${orientation === 'horizontal' ? 'w-[350px] h-[200px]' : 'w-[200px] h-[350px]'}`;

  if (fullCardImage) {
    return (
      <div ref={cardRef} className={`${cardClassName} bg-black flex items-center justify-center`}>
        <img src={fullCardImage} alt="AI Generated Business Card" className="w-full h-full object-contain" />
      </div>
    );
  }

  const renderElement = (elementId: keyof ElementPositions) => {
    switch (elementId) {
      case 'logo':
        return logo && (
          <Draggable key="logo" nodeRef={elementRefs.logo} position={positions.logo} onStop={handleStop('logo')} bounds="parent">
            <div
              ref={elementRefs.logo}
              onClick={(e) => onElementSelect('logo', e)}
              className={`absolute cursor-move p-1 rounded-sm ${selectedElements.includes('logo') ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <img src={logo} alt="logo" className="w-16 h-16 object-contain" />
            </div>
          </Draggable>
        );
      case 'name':
        return (
          <Draggable key="name" nodeRef={elementRefs.name} position={positions.name} onStop={handleStop('name')} bounds="parent">
            <div
              ref={elementRefs.name}
              onClick={(e) => onElementSelect('name', e)}
              className={`absolute cursor-move p-1 rounded-sm ${selectedElements.includes('name') ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <div className="text-left" style={{ letterSpacing: `${textStyles.name.letterSpacing}px`, lineHeight: textStyles.name.lineHeight }}>
                <h2 className="text-2xl font-bold">{cardData.name}</h2>
                <p className="text-lg" style={secondaryTextStyle}>{cardData.title}</p>
                <p className="text-base font-semibold" style={{ color: aiStyle.accentColor }}>{cardData.company}</p>
              </div>
            </div>
          </Draggable>
        );
      case 'details':
        return (
          <Draggable key="details" nodeRef={elementRefs.details} position={positions.details} onStop={handleStop('details')} bounds="parent">
            <div
              ref={elementRefs.details}
              onClick={(e) => onElementSelect('details', e)}
              className={`absolute cursor-move p-1 rounded-sm ${selectedElements.includes('details') ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <div className="text-xs space-y-1 text-left" style={{ ...secondaryTextStyle, letterSpacing: `${textStyles.details.letterSpacing}px`, lineHeight: textStyles.details.lineHeight }}>
                <p>{cardData.phone}</p>
                <p>{cardData.email}</p>
                <p>{cardData.website}</p>
                <p>{cardData.address}</p>
              </div>
            </div>
          </Draggable>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={cardRef} className={`${cardClassName} ${template.className}`} style={cardStyle}>
       {elementOrder.map(elementId => renderElement(elementId))}
    </div>
  );
});

export default Canvas;