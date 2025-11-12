import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (base64Data: string) => {
    const match = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
        throw new Error('Invalid base64 string');
    }
    const mimeType = match[1];
    const data = match[2];

    return {
        inlineData: {
            mimeType,
            data,
        },
    };
};

export const analyzeSkinCondition = async (imageBase64: string): Promise<AnalysisResponse> => {
    const imagePart = fileToGenerativePart(imageBase64);
    const prompt = "Analyze the provided image of a skin condition. Identify the most likely dermatological condition. Your response must be a single, valid JSON object. Do not include any markdown formatting or any text outside of the JSON object. The object must contain four keys: 'diseaseNameEN' (the disease name in English), 'diseaseNameVI' (the disease name in Vietnamese), 'descriptionEN' (a brief, clinical but easy-to-understand summary in English), and 'descriptionVI' (the same summary translated into Vietnamese).";
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    diseaseNameEN: {
                        type: Type.STRING,
                        description: 'The name of the identified skin disease in English.',
                    },
                    diseaseNameVI: {
                        type: Type.STRING,
                        description: 'The name of the identified skin disease in Vietnamese.',
                    },
                    descriptionEN: {
                        type: Type.STRING,
                        description: 'A brief, user-friendly description of the condition in English.',
                    },
                    descriptionVI: {
                        type: Type.STRING,
                        description: 'A brief, user-friendly description of the condition in Vietnamese.',
                    },
                },
                required: ['diseaseNameEN', 'diseaseNameVI', 'descriptionEN', 'descriptionVI'],
            },
        }
    });

    const jsonText = response.text.trim();
    try {
        return JSON.parse(jsonText) as AnalysisResponse;
    } catch (e) {
        console.error("Failed to parse JSON response:", jsonText);
        throw new Error("The analysis returned an invalid format.");
    }
};
