"use client";

import { useState } from "react";

// ==================
// TYPE
// ==================
type Estimate = {
  id: number;
  houseSize: number;
  price: number; // harga dari backend masih dalam JUTA
};

// ==================
// FORMATTER
// Mengubah JUTA -> RUPIAH
// contoh: 350 -> 350.000.000
// ==================
const formatRupiah = (priceInMillion: number) =>
  (priceInMillion * 1_000_000).toLocaleString("id-ID");

// ==================
// COMPONENT
// ==================
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

    setResult(json.data); // price masih dalam JUTA
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
          placeholder="House size (m²)"
          value={houseSize}
          onChange={(e) => setHouseSize(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handlePredict}
          style={styles.primaryBtn}
          disabled={loading}
        >
          {loading ? "Loading..." : "Predict"}
        </button>
      </div>

      {/* WARNING */}
      {warning && <div style={styles.warning}>⚠️ {warning}</div>}

      {/* RESULT */}
      {result && !warning && (
        <div style={styles.card}>
          <div><b>Size:</b> {result.houseSize} m²</div>
          <div>
            <b>Price:</b> Rp {formatRupiah(result.price)}
          </div>
        </div>
      )}
    </main>
  );
}

// ==================
// STYLES (TIDAK DIUBAH)
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
  warning: {
    color: "#facc15",
    fontWeight: "bold",
  },
  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    padding: "18px 24px",
    fontSize: "16px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  },
};
