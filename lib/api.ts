"use client";

// This would connect to your Python backend in production
// For now, we'll simulate responses

import { toast } from "@/hooks/use-toast";

export type HealthInput = {
  text: string;
  age?: number;
  gender?: string;
  weight?: number;
  height?: number;
  medicalHistory?: string;
};

export type HealthPrediction = {
  diabetesRisk: number;
  hypertensionRisk: number;
  depressionRisk: number;
  recommendations: string[];
  explanation: string;
};

// Function to extract health-related keywords from text
const extractKeywords = (text: string, keywords: string[]): number => {
  const normalizedText = text.toLowerCase();
  let count = 0;
  
  keywords.forEach(keyword => {
    if (normalizedText.includes(keyword.toLowerCase())) {
      count++;
    }
  });
  
  return count;
};

// Keywords for each condition (same as in Python backend)
const diabetesKeywords = [
  'thirst', 'urination', 'hunger', 'weight loss', 'fatigue', 'blurred vision', 
  'sugar', 'glucose', 'insulin', 'family history', 'diabetes', 'overweight'
];

const hypertensionKeywords = [
  'headache', 'dizziness', 'blurred vision', 'nosebleed', 'shortness of breath', 
  'chest pain', 'blood pressure', 'salt', 'sodium', 'stress', 'alcohol', 'smoking'
];

const depressionKeywords = [
  'sad', 'hopeless', 'depressed', 'interest', 'pleasure', 'sleep', 'energy', 
  'fatigue', 'appetite', 'concentration', 'worthless', 'thoughts', 'suicide', 'anxiety'
];

export async function analyzeHealth(input: HealthInput): Promise<HealthPrediction> {
  try {
    // In production, this would be:
    // const response = await fetch('/api/health-prediction', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(input)
    // });
    // return await response.json();
    
    // For demo, we'll generate a simulated response
    // Removed setTimeout to fix compatibility issue
    
    // Extract keyword counts for each condition
    const diabetesCount = extractKeywords(input.text, diabetesKeywords);
    const hypertensionCount = extractKeywords(input.text, hypertensionKeywords);
    const depressionCount = extractKeywords(input.text, depressionKeywords);
    
    // Calculate risk scores (0-100) with some randomness
    // Base risk on keyword density but add randomness for demo purposes
    const calculateRisk = (count: number, max: number) => {
      const base = (count / max) * 70; // Base score up to 70%
      const random = Math.random() * 30; // Random component up to 30%
      return Math.min(Math.round(base + random), 100); // Cap at 100%
    };
    
    const diabetesRisk = calculateRisk(diabetesCount, diabetesKeywords.length);
    const hypertensionRisk = calculateRisk(hypertensionCount, hypertensionKeywords.length);
    const depressionRisk = calculateRisk(depressionCount, depressionKeywords.length);
    
    // Generate recommendations
    const recommendations: string[] = [
      "Maintain a balanced diet rich in fruits, vegetables, and whole grains.",
      "Stay physically active with at least 150 minutes of moderate exercise weekly."
    ];
    
    // Add condition-specific recommendations
    if (diabetesRisk > 30) {
      recommendations.push("Monitor your blood sugar levels regularly.");
      recommendations.push("Limit intake of refined carbohydrates and sugary foods.");
    }
    
    if (hypertensionRisk > 30) {
      recommendations.push("Reduce sodium intake to help manage blood pressure.");
      recommendations.push("Practice stress-reduction techniques such as meditation.");
    }
    
    if (depressionRisk > 30) {
      recommendations.push("Consider mindfulness practices to improve mental wellbeing.");
      recommendations.push("Maintain social connections and seek support when needed.");
    }
    
    if (diabetesRisk > 50 || hypertensionRisk > 50 || depressionRisk > 50) {
      recommendations.push("Consult with a healthcare professional for a comprehensive evaluation.");
    }
    
    // Generate explanation
    let explanation = "Based on your input, our AI analysis has identified potential risk factors:\n\n";
    
    if (diabetesCount > 0) {
      explanation += `For diabetes: We detected ${diabetesCount} keywords related to diabetes risk factors.\n`;
    }
    
    if (hypertensionCount > 0) {
      explanation += `For hypertension: We detected ${hypertensionCount} keywords related to hypertension risk factors.\n`;
    }
    
    if (depressionCount > 0) {
      explanation += `For depression: We detected ${depressionCount} keywords related to depression risk factors.\n`;
    }
    
    explanation += "\nPlease note that this assessment is based solely on the text you provided and is not a medical diagnosis. ";
    explanation += "For a comprehensive evaluation, consult with a healthcare professional.";
    
    return {
      diabetesRisk,
      hypertensionRisk,
      depressionRisk,
      recommendations,
      explanation
    };
  } catch (error) {
    toast({
      title: "Error analyzing health data",
      description: "There was a problem processing your request. Please try again.",
      variant: "destructive",
    });
    
    throw error;
  }
}