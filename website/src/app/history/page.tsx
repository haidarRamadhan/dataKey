"use client";
import { useEffect, useState } from "react";

type Rumah = {
    id: number;
    houseSize: number;
    price: number;
};

export default function HistoryPage() {
    const [data, setData] = useState<Rumah[]>([]);

    const fetchData = async () => {
        const res = await fetch("/api/estimate");
        const json = await res.json();
        setData(json.rumah);
    };

    const handleDelete = async (id: number) => {
        await fetch(`/api/estimate/${id}`, { method: "DELETE" });
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main>
            <h1>History</h1>
            {data.map((item) => (
                <div key={item.id}>
                    Size: {item.houseSize} | Price: {item.price}
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            ))}
        </main>
    );
}
