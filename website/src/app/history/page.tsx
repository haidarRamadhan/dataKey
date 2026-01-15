"use client";

import { useEffect, useState } from "react";

// ==================
// TIPE DATA
// ==================
// Representasi 1 data prediksi rumah
type Rumah = {
    id: number;
    houseSize: number;
    price: number; // masih dalam JUTA
};

// ==================
// FORMATTER
// ==================
// Mengubah harga dari juta → Rupiah (format Indonesia)
const formatRupiah = (priceInMillion: number) =>
    (priceInMillion * 1_000_000).toLocaleString("id-ID");

export default function HistoryPage() {
    // State untuk menyimpan data history
    const [data, setData] = useState<Rumah[]>([]);

    // ==================
    // FETCH DATA HISTORY
    // ==================
    // Ambil semua data prediksi dari API
    const fetchData = async () => {
        const res = await fetch("/api/estimate");
        const json = await res.json();
        setData(json.rumah); // simpan ke state
    };

    // ==================
    // DELETE DATA
    // ==================
    // Hapus data berdasarkan ID
    const handleDelete = async (id: number) => {
        await fetch(`/api/estimate/${id}`, { method: "DELETE" });
        fetchData(); // refresh data setelah delete
    };

    // ==================
    // SIDE EFFECT
    // ==================
    // Jalan sekali saat page pertama kali dibuka
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>📜 Prediction History</h1>

            <div style={styles.list}>
                {/* Jika belum ada data */}
                {data.length === 0 && (
                    <p style={styles.empty}>No prediction data yet.</p>
                )}

                {/* Render semua data history */}
                {data.map((item) => (
                    <div key={item.id} style={styles.card}>
                        {/* Info rumah */}
                        <div style={styles.info}>
                            <div>
                                <b>Size:</b> {item.houseSize} m²
                            </div>
                            <div>
                                <b>Price:</b> Rp {formatRupiah(item.price)}
                            </div>
                        </div>

                        {/* Tombol hapus */}
                        <button
                            style={styles.deleteBtn}
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

// ==================
// STYLES (DARK DASHBOARD)
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

    // Judul halaman
    title: {
        fontSize: "28px",
        fontWeight: "bold",
    },

    // Wrapper list card
    list: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "14px",
        width: "520px",
    },

    // Card tiap data
    card: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#020617",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        padding: "16px 20px",
    },

    // Info rumah (size + price)
    info: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "4px",
    },

    // Tombol delete
    deleteBtn: {
        background: "#ef4444",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
    },

    // Teks saat data kosong
    empty: {
        color: "#94a3b8",
        textAlign: "center" as const,
    },
};
