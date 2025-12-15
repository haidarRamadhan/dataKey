from fastapi import FastAPI
import joblib
import numpy as np
import os

app = FastAPI()

print("FILES:", os.listdir("."))
# Load model
model = joblib.load("model.joblib")

print("MODEL LOADED")


@app.post("/predict")
def predict(data: dict):
    # Expecting: { "houseSize": 120, "bedrooms": 3, "bathrooms": 2, "landSize": 180 }
    x = [[data["houseSize"], data["bedrooms"], data["bathrooms"], data["landSize"]]]

    pred = model.predict(x)[0]
    return {"Prediction": float(pred)}
