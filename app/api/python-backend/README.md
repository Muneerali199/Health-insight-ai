# HealthInsight AI - Python Backend

This directory contains the Python backend for the HealthInsight AI virtual health assistant.

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On Unix/MacOS: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```
   uvicorn app:app --reload
   ```

## API Endpoints

### POST /predict

Analyzes user health data and returns risk predictions.

**Request Body:**
```json
{
  "text": "I've been feeling very thirsty lately and urinate frequently. I also have a family history of diabetes.",
  "age": 45,
  "gender": "male",
  "weight": 85,
  "height": 175,
  "medical_history": "High cholesterol 2 years ago"
}
```

**Response:**
```json
{
  "diabetes_risk": 65.3,
  "hypertension_risk": 42.8,
  "depression_risk": 12.5,
  "recommendations": [
    "Monitor your blood sugar levels regularly",
    "Reduce sodium intake to help manage blood pressure",
    "Maintain regular physical activity"
  ],
  "explanation": "Based on your input, our AI analysis has identified the following potential risk factors..."
}
```

### GET /health

Health check endpoint to verify the API is running.

**Response:**
```json
{
  "status": "healthy"
}
```

## Implementation Notes

This implementation uses:
- FastAPI for the API framework
- NLTK for natural language processing
- scikit-learn for machine learning models
- Pydantic for data validation

In a production environment, you would:
1. Use properly trained models instead of mock models
2. Add proper authentication and security measures
3. Implement more sophisticated NLP techniques
4. Add comprehensive logging and monitoring