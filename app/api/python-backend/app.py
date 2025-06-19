from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import joblib
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import uvicorn
import os
import json

# Download NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

app = FastAPI(title="HealthInsight AI API")

# In a real application, these would be actual trained models
# For this demo, we're creating mock models
class MockModel:
    def predict_proba(self, features):
        # Return random probabilities for demo purposes
        return np.array([[1 - np.random.random() * 0.7, np.random.random() * 0.7]])

# Load or create models
try:
    diabetes_model = joblib.load('models/diabetes_model.pkl')
    hypertension_model = joblib.load('models/hypertension_model.pkl')
    depression_model = joblib.load('models/depression_model.pkl')
except:
    # Create mock models for demo
    diabetes_model = MockModel()
    hypertension_model = MockModel()
    depression_model = MockModel()

# Define symptom keywords for each condition
diabetes_keywords = [
    'thirst', 'urination', 'hunger', 'weight loss', 'fatigue', 'blurred vision', 
    'sugar', 'glucose', 'insulin', 'family history', 'obesity', 'overweight'
]

hypertension_keywords = [
    'headache', 'dizziness', 'blurred vision', 'nosebleed', 'shortness of breath', 
    'chest pain', 'blood pressure', 'salt', 'sodium', 'stress', 'alcohol', 'smoking'
]

depression_keywords = [
    'sad', 'hopeless', 'depressed', 'interest', 'pleasure', 'sleep', 'energy', 
    'fatigue', 'appetite', 'concentration', 'worthless', 'thoughts', 'suicide', 'anxiety'
]

# Input model
class HealthInput(BaseModel):
    text: str
    age: Optional[int] = None
    gender: Optional[str] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    medical_history: Optional[str] = None

# Response model
class HealthPrediction(BaseModel):
    diabetes_risk: float
    hypertension_risk: float
    depression_risk: float
    recommendations: List[str]
    explanation: str

def extract_features(text, keywords):
    """Extract features from text based on keyword presence"""
    tokens = word_tokenize(text.lower())
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [w for w in tokens if w not in stop_words]
    
    # Count keyword occurrences
    keyword_counts = sum(1 for token in filtered_tokens if any(keyword in token for keyword in keywords))
    
    # Create a simple feature vector (would be more sophisticated in a real app)
    features = np.array([[
        keyword_counts / max(1, len(filtered_tokens)),  # Keyword density
        len(filtered_tokens),                           # Message length
        np.random.random()                              # Random feature for demo
    ]])
    
    return features

def generate_recommendations(diabetes_risk, hypertension_risk, depression_risk):
    """Generate health recommendations based on risk factors"""
    recommendations = []
    
    # General recommendations
    recommendations.append("Maintain a balanced diet rich in fruits, vegetables, and whole grains.")
    recommendations.append("Stay physically active with at least 150 minutes of moderate exercise weekly.")
    
    # Condition-specific recommendations
    if diabetes_risk > 0.3:
        recommendations.append("Monitor your blood sugar levels regularly.")
        recommendations.append("Limit intake of refined carbohydrates and sugary foods.")
    
    if hypertension_risk > 0.3:
        recommendations.append("Reduce sodium intake to help manage blood pressure.")
        recommendations.append("Practice stress-reduction techniques such as meditation.")
    
    if depression_risk > 0.3:
        recommendations.append("Consider mindfulness practices to improve mental wellbeing.")
        recommendations.append("Maintain social connections and seek support when needed.")
    
    if any(risk > 0.5 for risk in [diabetes_risk, hypertension_risk, depression_risk]):
        recommendations.append("Consult with a healthcare professional for a comprehensive evaluation.")
    
    return recommendations

def generate_explanation(text, diabetes_risk, hypertension_risk, depression_risk):
    """Generate an explanation for the risk predictions"""
    tokens = word_tokenize(text.lower())
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [w for w in tokens if w not in stop_words]
    
    # Identify potential risk factors from text
    diabetes_factors = [keyword for keyword in diabetes_keywords if any(keyword in token for token in filtered_tokens)]
    hypertension_factors = [keyword for keyword in hypertension_keywords if any(keyword in token for token in filtered_tokens)]
    depression_factors = [keyword for keyword in depression_keywords if any(keyword in token for token in filtered_tokens)]
    
    explanation = "Based on your input, our AI analysis has identified the following potential risk factors:\n\n"
    
    if diabetes_factors:
        explanation += f"For diabetes: {', '.join(diabetes_factors)}\n"
    
    if hypertension_factors:
        explanation += f"For hypertension: {', '.join(hypertension_factors)}\n"
    
    if depression_factors:
        explanation += f"For depression: {', '.join(depression_factors)}\n"
    
    explanation += "\nPlease note that this assessment is based solely on the text you provided and is not a medical diagnosis. "
    explanation += "For a comprehensive evaluation, consult with a healthcare professional."
    
    return explanation

@app.post("/predict", response_model=HealthPrediction)
async def predict_health_risks(input_data: HealthInput):
    try:
        text = input_data.text
        
        # Extract features for each condition
        diabetes_features = extract_features(text, diabetes_keywords)
        hypertension_features = extract_features(text, hypertension_keywords)
        depression_features = extract_features(text, depression_keywords)
        
        # Make predictions
        diabetes_prob = diabetes_model.predict_proba(diabetes_features)[0][1] * 100
        hypertension_prob = hypertension_model.predict_proba(hypertension_features)[0][1] * 100
        depression_prob = depression_model.predict_proba(depression_features)[0][1] * 100
        
        # Generate recommendations
        recommendations = generate_recommendations(
            diabetes_prob/100, hypertension_prob/100, depression_prob/100
        )
        
        # Generate explanation
        explanation = generate_explanation(
            text, diabetes_prob/100, hypertension_prob/100, depression_prob/100
        )
        
        return HealthPrediction(
            diabetes_risk=float(diabetes_prob),
            hypertension_risk=float(hypertension_prob),
            depression_risk=float(depression_prob),
            recommendations=recommendations,
            explanation=explanation
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)