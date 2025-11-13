from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("model.joblib")  # trained model hehe


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    house_size = data.get("houseSize")
    if house_size is None:
        return jsonify({"error": "houseSize is missing"}), 400
    price = float(model.predict(np.array([[house_size]]))[0])

    return jsonify({"price": price})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
