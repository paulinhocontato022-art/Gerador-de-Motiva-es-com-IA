import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
    // API Key is injected by the environment
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found in environment");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateMotivationalQuote = async (topic: string = "superação e sucesso"): Promise<string> => {
    try {
        const ai = getAiClient();
        
        // Using gemini-2.5-flash as recommended for basic text tasks
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Gere uma única e curta citação motivacional poderosa sobre: ${topic}. Foque em ação, estoicismo ou sucesso. NÃO inclua o nome de um autor fictício, apenas a frase.`,
            config: {
                systemInstruction: "Você é um mentor estoico e motivacional. Suas frases são curtas, impactantes e diretas.",
                temperature: 1, // High temperature for creativity
            }
        });

        const text = response.text;
        if (!text) {
            throw new Error("No text returned from API");
        }

        return `⭐ IA: ${text.trim()}`;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};
