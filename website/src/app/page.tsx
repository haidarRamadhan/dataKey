"use client";

import { useState } from "react";

// tipe hasil prediksi
type Estimate = {
  id: number;
  houseSize: number;
  price: number;
};

export default function HomePage() {
  const [houseSize, setHouseSize] = useState("");
  const [result, setResult] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");

  const handlePredict = async () => {
    if (!houseSize) return;

    setLoading(true);
    setWarning("");

    const res = await fetch("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ houseSize: Number(houseSize) }),
    });

    const json = await res.json();

    if (json.success === false) {
      setWarning(json.message);
      setLoading(false);
      return;
    }

    setResult(json.data);
    setHouseSize("");
    setLoading(false);
  };

  return (
    <main style={styles.container}>
      <div style={styles.cardWrapper}>
        <h1 style={styles.title}>🏠 House Price Predictor</h1>

        {/* FORM */}
        <div style={styles.form}>
          <input
            type="number"
            placeholder="Enter house size (m²)"
            value={houseSize}
            onChange={(e) => setHouseSize(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={handlePredict}
            style={{
              ...styles.primaryBtn,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Calculating..." : "Predict Price"}
          </button>
        </div>

        {warning && <div style={styles.warning}>⚠️ {warning}</div>}

        {result && !warning && (
          <div style={styles.result}>
            <div><b>House Size</b></div>
            <div>{result.houseSize} m²</div>

            <div style={{ marginTop: "12px" }}><b>Estimated Price</b></div>
            <div style={styles.price}>${result.price}</div>
          </div>
        )}
      </div>
    </main>
  );
}

// ==================
// STYLE — OUT OF THE BOX (CLEAN + BOLD)
// ==================
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at top, #1e293b, #020617)",
    padding: "40px 20px",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#e5e7eb",
  },

  cardWrapper: {
    width: "100%",
    maxWidth: "480px",
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "20px",
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "28px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
  },

  title: {
    textAlign: "center" as const,
    fontSize: "32px",
    fontWeight: 800,
    color: "#38bdf8",
    letterSpacing: "0.5px",
  },

  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "18px",
  },

  input: {
    padding: "18px 20px",
    fontSize: "18px",
    borderRadius: "14px",
    border: "1px solid #334155",
    background: "#020617",
    color: "#e5e7eb",
    outline: "none",
  },

  primaryBtn: {
    padding: "18px",
    fontSize: "18px",
    fontWeight: 700,
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
    color: "#020617",
    letterSpacing: "0.5px",
  },

  warning: {
    background: "#7f1d1d",
    color: "#fee2e2",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    textAlign: "center" as const,
  },

  result: {
    background: "#020617",
    border: "1px solid #38bdf8",
    borderRadius: "14px",
    padding: "20px",
    textAlign: "center" as const,
    fontSize: "16px",
  },

  price: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#22c55e",
    marginTop: "4px",
  },
};
