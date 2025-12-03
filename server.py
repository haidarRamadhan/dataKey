from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

# Load model
model = joblib.load("model.joblib")


@app.post("/predict")
def predit(data: dict):
    # Expecting: { "houseSize": 120, "bedrooms": 3, "bathrooms": 2, "landSize": 180 }
    x = [[data["houseSize"], data["bedrooms"], data["bathrooms"], data["landSize"]]]

    pred = model.predict(x)[0]
    return {"Prediction": pred}


if __name__ == "__main__":
    import os
    import uvicorn

    port = int(os.environ.geyt("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
