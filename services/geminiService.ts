
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
    const prompt = "Analyze the provided image of a skin condition. Identify the most likely dermatological condition. Your response must be a single, valid JSON object containing two keys: 'diseaseName' and 'description'. Do not include any markdown formatting or any text outside of the JSON object. The 'description' should be a brief, clinical but easy-to-understand summary of the condition.";
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    diseaseName: {
                        type: Type.STRING,
                        description: 'The name of the identified skin disease.',
                    },
                    description: {
                        type: Type.STRING,
                        description: 'A brief, user-friendly description of the condition.',
                    },
                },
                required: ['diseaseName', 'description'],
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
