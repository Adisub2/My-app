
import { GoogleGenAI, Type } from "@google/genai";
import { SearchResult } from "../types";

export const performSearch = async (query: string): Promise<SearchResult | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a detailed, up-to-date summary for this query about Uttarakhand: "${query}". Include travel tips, current relevance, and cultural context.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources: any[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const formattedSources = sources
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      }));

    return {
      text: response.text || "No information found.",
      sources: formattedSources
    };
  } catch (error) {
    console.error("Search Error:", error);
    return null;
  }
};

export const getMapInformation = async (query: string, lat?: number, lng?: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide travel and facility information for: ${query} in Uttarakhand. Include specific place details and travel advice.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: lat && lng ? { latitude: lat, longitude: lng } : undefined
          }
        }
      }
    });
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return {
      text: response.text,
      grounding: groundingChunks
    };
  } catch (error) {
    console.error("Map AI Error:", error);
    return {
      text: "I encountered an issue fetching live map data. However, I can tell you that Uttarakhand's sacred sites are generally accessible via well-maintained mountain roads. Please check local weather conditions before traveling.",
      grounding: []
    };
  }
};

export const generateTripPlan = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Plan a detailed spiritual and cultural trip for Uttarakhand based on this request: "${query}". Take into account current conditions, weather, and seasonal accessibility.`,
      config: {
        tools: [{ googleSearch: {} }], // Use search grounding to check if sites are currently open
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.INTEGER },
              location: { type: Type.STRING },
              activity: { type: Type.STRING },
              time: { type: Type.STRING },
              costEstimate: { type: Type.STRING },
              safetyTip: { type: Type.STRING }
            },
            required: ["day", "location", "activity", "time", "costEstimate", "safetyTip"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Planning Error:", error);
    return null;
  }
};
