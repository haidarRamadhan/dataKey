export default function AboutPage() {
    return (
        <main style={aboutStyles.container}>
            <h1 style={aboutStyles.title}>ℹ️ About This App</h1>

            <div style={aboutStyles.list}>
                <div style={aboutStyles.card}>
                    <span>Application</span>
                    <span>House Price Prediction</span>
                </div>

                <div style={aboutStyles.card}>
                    <span>Institution</span>
                    <span>Universitas Teknokrat Indonesia</span>
                </div>

                <div style={aboutStyles.card}>
                    <span>Tech Stack</span>
                    <span>Next.js · Prisma · Flask · ML</span>
                </div>
            </div>
        </main>
    );
}

const aboutStyles = {
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
    list: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "12px",
        width: "480px",
    },
    card: {
        display: "flex",
        justifyContent: "space-between",
        background: "#020617",
        border: "1px solid #1e293b",
        borderRadius: "10px",
        padding: "16px",
    },
};
