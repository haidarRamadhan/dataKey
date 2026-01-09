"use client";

import { useState } from "react";

// ==================
// TYPE
// ==================
type Estimate = {
  id: number;
  houseSize: number;
  price: number;
};

export default function HomePage() {
  const [houseSize, setHouseSize] = useState("");
  const [result, setResult] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(false);

  // ==================
  // POST (PREDICT ONLY)
  // ==================
  const handlePredict = async () => {
    if (!houseSize) return;

    setLoading(true);

    const res = await fetch("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ houseSize: Number(houseSize) }),
    });

    const json = await res.json();
    setResult(json.data); // ⬅️ hanya simpan hasil terakhir

    setHouseSize("");
    setLoading(false);
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>🏠 House Price Prediction</h1>

      {/* INPUT */}
      <div style={styles.form}>
        <input
          type="number"
          placeholder="House size"
          value={houseSize}
          onChange={(e) => setHouseSize(e.target.value)}
          style={styles.input}
        />
        <button onClick={handlePredict} style={styles.primaryBtn}>
          {loading ? "Loading..." : "Predict"}
        </button>
      </div>

      {/* RESULT (ONLY ONE) */}
      {result && (
        <div style={styles.card}>
          <span>
            <b>Size:</b> {result.houseSize} |{" "}
            <b>Price:</b> {result.price}
          </span>
        </div>
      )}
    </main>
  );
}

// ==================
// STYLES
// ==================
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "40px",
    gap: "30px",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "white",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    width: "200px",
  },
  primaryBtn: {
    padding: "10px 18px",
    background: "#22c55e",
    color: "#022c22",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    padding: "16px 20px",
    fontSize: "16px",
  },
};
