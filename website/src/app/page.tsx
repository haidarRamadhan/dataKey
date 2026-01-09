"use client";

import { useEffect, useState } from "react";

type Estimate = {
  id: number;
  houseSize: number;
  price: number;
};

export default function HomePage() {
  const [houseSize, setHouseSize] = useState("");
  const [data, setData] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(false);

  // GET
  const fetchData = async () => {
    const res = await fetch("/api/estimate"); // 🔥 PROXY
    const json = await res.json();
    setData(json.rumah);
  };

  // POST
  const handlePredict = async () => {
    if (!houseSize) return;

    setLoading(true);

    await fetch("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ houseSize: Number(houseSize) }),
    });

    setHouseSize("");
    setLoading(false);
    fetchData();
  };

  // DELETE
  const handleDelete = async (id: number) => {
    await fetch(`/api/estimate/${id}`, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main style={styles.container}>
      <h1>House Price Prediction</h1>

      <div style={styles.form}>
        <input
          type="number"
          placeholder="House size"
          value={houseSize}
          onChange={(e) => setHouseSize(e.target.value)}
          style={styles.input}
        />
        <button onClick={handlePredict} style={styles.button}>
          {loading ? "Loading..." : "Predict"}
        </button>
      </div>

      <div style={styles.list}>
        {data.map((item) => (
          <div key={item.id} style={styles.card}>
            <span>
              Size: {item.houseSize} | Price: {item.price}
            </span>
            <button
              style={styles.delete}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "40px",
    gap: "20px",
  },
  form: { display: "flex", gap: "10px" },
  input: { padding: "8px", fontSize: "16px" },
  button: { padding: "8px 16px", cursor: "pointer" },
  list: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    width: "400px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    padding: "10px",
  },
  delete: {
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
