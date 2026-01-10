// Import ReactNode type for typing children
import type { ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({
  children, // children = isi dari page.tsx
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body style={styles.body}>
        {/* Navbar muncul di semua halaman */}
        <nav style={styles.nav}>
          <Link href="/" style={styles.link}>Home</Link>
          <Link href="/dashboard" style={styles.link}>Dashboard</Link>
          <Link href="/history" style={styles.link}>History</Link>
          <Link href="/about" style={styles.link}>About</Link>
        </nav>

        {/* Tempat page.tsx dirender */}
        <main style={styles.main}>{children}</main>
      </body>
    </html>
  );
}

// ==================
// CSS IN JS
// ==================
const styles = {
  body: {
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "white",
    minHeight: "100vh",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    padding: "20px",
    background: "#020617",
    borderBottom: "1px solid #1e293b",
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.2s",
  },
  main: {
    padding: "40px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "30px",
  },
};
