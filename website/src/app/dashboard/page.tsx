"use client";

import { useEffect, useState } from "react";

type Rumah = {
    id: number;
    houseSize: number;
    price: number; // masih dalam JUTA
};

// ==================
// FORMATTER
// ==================
const formatRupiah = (priceInMillion: number) =>
    (priceInMillion * 1_000_000).toLocaleString("id-ID");

export default function DashboardPage() {
    const [data, setData] = useState<Rumah[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/estimate");
            const json = await res.json();
            setData(json.rumah);
        })();
    }, []);

    const total = data.length;

    const avg =
        total > 0
            ? Math.round(data.reduce((a, b) => a + b.price, 0) / total)
            : 0;

    const max = total > 0 ? Math.max(...data.map((d) => d.price)) : 0;
    const min = total > 0 ? Math.min(...data.map((d) => d.price)) : 0;

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>📊 Dashboard</h1>

            <div style={styles.grid}>
                <div style={styles.card}>
                    <span>Total Data</span>
                    <b>{total}</b>
                </div>

                <div style={styles.card}>
                    <span>Average Price</span>
                    <b>Rp {formatRupiah(avg)}</b>
                </div>

                <div style={styles.card}>
                    <span>Highest Price</span>
                    <b>Rp {formatRupiah(max)}</b>
                </div>

                <div style={styles.card}>
                    <span>Lowest Price</span>
                    <b>Rp {formatRupiah(min)}</b>
                </div>
            </div>
        </main>
    );
}

// ==================
// STYLES
// ==================
const styles = {
    container: {
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #0f172a, #020617)",
        color: "white",
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "30px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        maxWidth: "620px",
    },
    card: {
        background: "#020617",
        border: "1px solid #1e293b",
        borderRadius: "14px",
        padding: "24px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "8px",
        fontSize: "18px",
    },
};
