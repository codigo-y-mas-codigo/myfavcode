/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// FIX: Add Modality to imports for use in the generateContent config.
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });


// --- Helper Functions ---

/**
 * Processes the Gemini API response, extracting the image or throwing an error if none is found.
 * @param response The response from the generateContent call.
 * @returns A data URL string for the generated image.
 */
function processGeminiResponse(response: GenerateContentResponse): string {
    const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePartFromResponse?.inlineData) {
        const { mimeType, data } = imagePartFromResponse.inlineData;
        return `data:${mimeType};base64,${data}`;
    }

    const textResponse = response.text;
    console.error("API did not return an image. Response:", response);
    throw new Error(`The AI model responded with text instead of an image: "${textResponse || 'No text response received.'}"`);
}

/**
 * A wrapper for the Gemini API call that includes a retry mechanism for internal server errors.
 * @param imageParts The image parts of the request payload.
 * @param textPart The text part of the request payload.
 * @returns The GenerateContentResponse from the API.
 */
async function callGeminiWithRetry(imageParts: object[], textPart: object): Promise<GenerateContentResponse> {
    const maxRetries = 3;
    const initialDelay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Note: The 'gemini-2.5-flash-image' model is specialized for image editing and generation.
            // FIX: Add the required `responseModalities` config for the 'gemini-2.5-flash-image' model.
            return await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [...imageParts, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });
        } catch (error) {
            console.error(`Error calling Gemini API (Attempt ${attempt}/${maxRetries}):`, error);
            const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
            // Check for common retriable error codes/messages
            const isRetriableError = errorMessage.includes('"code":500') || 
                                     errorMessage.includes('INTERNAL') ||
                                     errorMessage.includes('unavailable');

            if (isRetriableError && attempt < maxRetries) {
                const delay = initialDelay * Math.pow(2, attempt - 1);
                console.log(`Retriable error detected. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            throw error; // Re-throw if not a retriable error or if max retries are reached.
        }
    }
    throw new Error("Gemini API call failed after all retries.");
}


/**
 * Generates an image from source images and a specific prompt.
 * @param imageDataUrls An array of data URL strings of the source images.
 * @param prompt The creative prompt to guide image generation.
 * @returns A promise that resolves to a base64-encoded image data URL of the generated image.
 */
export async function generateImageFromPrompt(
    imageDataUrls: string[], 
    prompt: string,
): Promise<string> {
    const imageParts = imageDataUrls.map(url => {
        const match = url.match(/^data:(image\/\w+);base64,(.*)$/);
        if (!match) throw new Error("Invalid image data URL format.");
        const [, mimeType, data] = match;
        return { inlineData: { mimeType, data } };
    });

    console.log(`Attempting generation with prompt: "${prompt.substring(0, 100)}..."`);
    const textPart = { text: prompt };
    
    try {
        const response = await callGeminiWithRetry(imageParts, textPart);
        return processGeminiResponse(response);
    } catch (error) {
        console.error("An unrecoverable error occurred during image generation.", error);
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        throw new Error(`The AI model failed to generate an image. Details: ${errorMessage}`);
    }
}
