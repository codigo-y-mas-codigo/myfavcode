import { GoogleGenAI, Type } from "@google/genai";
import type { AIFullDesign, CardData, Orientation } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll alert and throw to stop execution.
  const errorMsg = "API_KEY environment variable not set. Please set it to use the AI features.";
  alert(errorMsg);
  throw new Error(errorMsg);
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const designSchema = {
  type: Type.OBJECT,
  properties: {
    style: {
      type: Type.OBJECT,
      properties: {
        backgroundColor: { type: Type.STRING, description: 'A hex code for the card background color (e.g., "#FFFFFF").' },
        primaryTextColor: { type: Type.STRING, description: 'A hex code for the main text color (e.g., "#000000").' },
        secondaryTextColor: { type: Type.STRING, description: 'A hex code for secondary text, like contact info (e.g., "#555555").' },
        accentColor: { type: Type.STRING, description: 'A hex code for an accent color, for lines or highlights (e.g., "#4A90E2").' },
        fontFamily: { type: Type.STRING, description: 'A Google Font name (e.g., "Roboto").' },
      }
    },
    positions: {
      type: Type.OBJECT,
      properties: {
        logo: {
          type: Type.OBJECT,
          properties: { x: { type: Type.NUMBER }, y: { type: Type.NUMBER } }
        },
        name: {
          type: Type.OBJECT,
          properties: { x: { type: Type.NUMBER }, y: { type: Type.NUMBER } }
        },
        details: {
          type: Type.OBJECT,
          properties: { x: { type: Type.NUMBER }, y: { type: Type.NUMBER } }
        },
      }
    }
  },
};

export async function generateLogo(prompt: string): Promise<string> {
  const fullPrompt = `Generate a logo for a business card. The logo should be in a vector style on a transparent background. The design should be based on the following user prompt, paying close attention to any specified styles (like minimalist, vintage, modern), color palettes, or themes: "${prompt}"`;
  
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: fullPrompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/png',
      aspectRatio: '1:1',
    },
  });

  if (response.generatedImages && response.generatedImages.length > 0) {
    return response.generatedImages[0].image.imageBytes;
  } else {
    throw new Error("No image was generated.");
  }
}

export async function generateFullCardDesign(prompt: string): Promise<AIFullDesign> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Based on the following description, create a complete design for a business card, including style and element positions. Description: "${prompt}"`,
    config: {
      systemInstruction: "You are an expert graphic designer specializing in business cards. Your task is to generate a JSON object representing a full card design. This includes a style object for colors and fonts, and a positions object for the layout of elements (logo, name, details). The positions should be within a 350x200 canvas. Provide only the JSON object and nothing else.",
      responseMimeType: "application/json",
      responseSchema: designSchema,
    },
  });

  try {
    const jsonString = response.text.trim();
    const designObject = JSON.parse(jsonString);
    
    // Basic validation to ensure we have a valid object
    if (typeof designObject === 'object' && designObject !== null && designObject.style && designObject.positions) {
        return designObject as AIFullDesign;
    } else {
        throw new Error("Parsed JSON is not a valid AIFullDesign object.");
    }
  } catch (e) {
    console.error("Failed to parse AI design response:", response.text, e);
    throw new Error("AI returned an invalid design format.");
  }
}

export async function refineCardDesign(prompt: string, currentDesign: AIFullDesign): Promise<AIFullDesign> {
  const fullPrompt = `
Based on the current business card design provided as a JSON object, apply the following change requested by the user.
The positions should be within a 350x200 canvas.

Current Design:
\`\`\`json
${JSON.stringify(currentDesign, null, 2)}
\`\`\`

User's requested change: "${prompt}"
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullPrompt,
    config: {
      systemInstruction: "You are an expert graphic designer specializing in business cards. Your task is to modify a JSON object representing a card design based on a user's request. You must return the *entire*, updated JSON object. Provide only the JSON object and nothing else.",
      responseMimeType: "application/json",
      responseSchema: designSchema,
    },
  });

  try {
    const jsonString = response.text.trim();
    const designObject = JSON.parse(jsonString);
    
    if (typeof designObject === 'object' && designObject !== null && designObject.style && designObject.positions) {
        return designObject as AIFullDesign;
    } else {
        throw new Error("Parsed JSON is not a valid AIFullDesign object.");
    }
  } catch (e) {
    console.error("Failed to parse AI refinement response:", response.text, e);
    throw new Error("AI returned an invalid design format.");
  }
}

export async function identifyFontFromImage(base64Image: string): Promise<string> {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };
    const textPart = {
      text: "Analyze the image and identify the primary font used. Respond with the name of the closest matching, freely available Google Font. Your entire response should be ONLY the name of the font (e.g., 'Montserrat' or 'Playfair Display')."
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });

    const fontName = response.text.trim();
    if (!fontName) {
        throw new Error("AI did not return a font name.");
    }

    return fontName.replace(/["'`]/g, '');
}


export async function generateFullCardImage(prompt: string, cardData: CardData, orientation: Orientation): Promise<string> {
    const textContent = `
    - Name: ${cardData.name}
    - Title: ${cardData.title}
    - Company: ${cardData.company}
    - Phone: ${cardData.phone}
    - Email: ${cardData.email}
    - Website: ${cardData.website}
    - Address: ${cardData.address}`;

    const fullPrompt = `Generate a single, complete, photorealistic, high-resolution business card image, ready for printing.
    - Style and theme description: "${prompt}".
    - The card MUST legibly include this exact text: ${textContent}.
    - The orientation of the card must be ${orientation}.
    - Do not include any logos unless specifically asked for in the style description.
    - The output should be only the business card image itself, with no background or margins.`;

    const aspectRatio = orientation === 'horizontal' ? '16:9' : '9:16';


    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        return response.generatedImages[0].image.imageBytes;
    } else {
        throw new Error("No image was generated for the card.");
    }
}