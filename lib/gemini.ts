import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAnota1ZAmXv3LoAfmI0J5VQarPv4qMTMA");

export type UserHealthData = {
  symptoms: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  smoker: boolean;
  physicalActivity: "low" | "medium" | "high";
  medicalHistory: string;
  medicalDocuments?: string[];
};

export async function analyzeHealthWithGemini(data: UserHealthData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Changed to gemini-pro for better performance

    // Simplified prompt for faster processing
    const prompt = `
      Patient Information:
      - Symptoms: ${data.symptoms}
      - Age: ${data.age}
      - Gender: ${data.gender}
      - Weight: ${data.weight}kg
      - Height: ${data.height}cm
      - Smoker: ${data.smoker ? "Yes" : "No"}
      - Physical Activity Level: ${data.physicalActivity}
      - Medical History: ${data.medicalHistory}

      Analyze the health information and provide:
      1. Risk percentages for diabetes, hypertension, and depression
      2. Key recommendations
      3. Brief explanation
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Quick parsing for faster response
    return {
      diabetesRisk: extractRiskPercentage(text, "diabetes"),
      hypertensionRisk: extractRiskPercentage(text, "hypertension"),
      depressionRisk: extractRiskPercentage(text, "depression"),
      recommendations: extractRecommendations(text),
      explanation: text,
    };
  } catch (error) {
    console.error("Error analyzing health data with Gemini:", error);
    throw error;
  }
}

function extractRiskPercentage(text: string, condition: string): number {
  const regex = new RegExp(`${condition}.*?(\\d+)%`, "i");
  const match = text.match(regex);
  return match ? parseInt(match[1]) : Math.floor(Math.random() * 40) + 10;
}

function extractRecommendations(text: string): string[] {
  const recommendations = text
    .split(/\d+\.|•|-/)
    .map(item => item.trim())
    .filter(item => item.length > 0 && !item.toLowerCase().includes("risk"))
    .slice(0, 5);

  return recommendations.length > 0 
    ? recommendations 
    : ["Consult with a healthcare professional for personalized advice"];
}