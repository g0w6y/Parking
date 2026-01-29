
import { GoogleGenAI } from "@google/genai";

// Always use the process.env.API_KEY directly as a named parameter for initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getParkingAssistantResponse = async (query: string, context: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Query: ${query}\nContext: ${JSON.stringify(context)}`,
      config: {
        systemInstruction: "You are an AI Parking Assistant for Garvasis College. Help users find vehicle information, explain check-in/out procedures, or direct them to tutors if their vehicle is blocked. Keep responses concise and friendly for mobile users.",
      },
    });
    // Use the .text property directly (do not call it as a function).
    return response.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the smart assistant. Please use the manual search or contact a tutor.";
  }
};
