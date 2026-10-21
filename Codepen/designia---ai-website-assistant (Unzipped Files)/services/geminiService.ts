
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using mock data.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const mockHtmlResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mock Pet Adoption Agency</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-yellow-50">
    <div class="container mx-auto p-8">
        <h1 class="text-4xl font-bold text-yellow-800 text-center mb-8">Find Your Furry Friend! (Mock)</h1>
        <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <img src="https://picsum.photos/300/200?random=10" alt="Dog 1" class="w-full h-48 object-cover rounded-md mb-4">
                <h2 class="text-2xl font-semibold text-gray-800">Buddy</h2>
                <p class="text-gray-600 mt-2">A playful and friendly Golden Retriever looking for a loving home.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <img src="https://picsum.photos/300/200?random=11" alt="Cat 1" class="w-full h-48 object-cover rounded-md mb-4">
                <h2 class="text-2xl font-semibold text-gray-800">Whiskers</h2>
                <p class="text-gray-600 mt-2">A calm and affectionate cat who loves to cuddle.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <img src="https://picsum.photos/300/200?random=12" alt="Dog 2" class="w-full h-48 object-cover rounded-md mb-4">
                <h2 class="text-2xl font-semibold text-gray-800">Lucy</h2>
                <p class="text-gray-600 mt-2">An energetic Jack Russell Terrier that loves to play fetch.</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const generateWebsiteCode = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return new Promise(resolve => setTimeout(() => resolve(mockHtmlResponse), 1500));
  }
  
  try {
    const fullPrompt = `
      You are an expert web developer specializing in creating beautiful, responsive, and production-ready websites using HTML and Tailwind CSS.
      Based on the following user request, generate a complete, single HTML file.
      The HTML file must include:
      1. A <!DOCTYPE html> declaration.
      2. An <html> tag with lang="en".
      3. A <head> section with a <title>, <meta charset="UTF-8">, <meta name="viewport" content="width=device-width, initial-scale=1.0">, and a <script> tag to include Tailwind CSS from "https://cdn.tailwindcss.com".
      4. A <body> section containing the full page layout and content.
      5. Use semantic HTML5 tags where appropriate (e.g., <header>, <main>, <section>, <footer>).
      6. Style everything exclusively with Tailwind CSS classes. Do not use any inline styles or <style> blocks.
      7. Use placeholder images from https://picsum.photos/width/height if images are needed. Ensure the URLs are correct.
      
      User Request: "${prompt}"

      Generate only the raw HTML code for the file. Do not include any explanations, comments, or markdown formatting like \`\`\`html.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });
    
    // Extract the raw text and clean it up
    let code = response.text.trim();
    if (code.startsWith('```html')) {
        code = code.substring(7);
    }
    if (code.endsWith('```')) {
        code = code.substring(0, code.length - 3);
    }
    
    return code.trim();
  } catch (error) {
    console.error("Error generating website code:", error);
    return `<html><body><h1>Error Generating Design</h1><p>There was an issue connecting to the AI service. Please check the console for details.</p></body></html>`;
  }
};

const mockImageResponse = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEX/TQBcNTh/AAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADeDcYqAAE0IeAAAAASUVORK5CYII=';

export const generateImage = async (prompt: string): Promise<string> => {
    if (!API_KEY) {
        // Simulate network delay for mock response
        return new Promise(resolve => setTimeout(() => resolve(mockImageResponse), 1500));
    }

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        }
        throw new Error("No image was generated.");

    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. Please try again.");
    }
};
