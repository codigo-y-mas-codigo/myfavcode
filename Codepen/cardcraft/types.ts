export interface CardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export type TemplateId = 'professional' | 'minimalist' | 'modern' | 'creative';

export interface Template {
  id: TemplateId;
  name: string;
  className: string;
}

export interface AIStyle {
  backgroundColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  accentColor?: string;
  fontFamily?: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface ElementPositions {
  logo: Point;
  name: Point;
  details: Point;
}

export interface AIFullDesign {
  style: AIStyle;
  positions: ElementPositions;
}

export type Orientation = 'horizontal' | 'vertical';

export type AlignmentType = 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom';

export interface TextStyle {
  letterSpacing: number;
  lineHeight: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CustomFont {
  name: string;
  url: string;
}

export interface AppState {
  cardData: CardData;
  logo: string | null;
  font: string;
  templateId: TemplateId;
  aiStyle: AIStyle;
  positions: ElementPositions;
  orientation: Orientation;
  fullCardImage: string | null;
  elementOrder: (keyof ElementPositions)[];
  selectedElements: (keyof ElementPositions)[];
  textStyles: {
    name: TextStyle;
    details: TextStyle;
  };
  customFonts: CustomFont[];
  aiChatHistory: ChatMessage[];
}

export interface CustomDomain {
  name: string;
  status: 'pending' | 'published';
}

export interface SavedDesign {
  id: string;
  name: string;
  timestamp: string;
  state: AppState;
  customDomain?: CustomDomain;
}