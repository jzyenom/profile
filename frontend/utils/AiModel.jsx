import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const generateImage = async (prompt) => {
  try {
    const imageModel = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-vision",
    });

    const response = await imageModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const imageUrl = response.candidates[0]?.content.parts[0]?.text;

    if (!imageUrl) throw new Error("No image URL returned");

    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
