from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

# Load model
model = joblib.load("model.joblib")


@app.post("/predict")
def predict(data: dict):
    # Expecting: { "houseSize": 120, "bedrooms": 3, "bathrooms": 2, "landSize": 180 }
    x = [[data["houseSize"], data["bedrooms"], data["bathrooms"], data["landSize"]]]

    pred = model.predict(x)[0]
    return {"Prediction": float(pred)}
