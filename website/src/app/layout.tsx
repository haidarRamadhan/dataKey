// Import ReactNode untuk typing children (isi dari page.tsx / route lain)
import type { ReactNode } from "react";
import Link from "next/link";

// RootLayout adalah layout utama (dibungkus ke SEMUA halaman)
export default function RootLayout({
  children, // children = konten dari page.tsx
}: {
  children: ReactNode;
}) {
  return (
    // HTML wrapper wajib di app router
    <html lang="en">
      {/* BODY utama */}
      <body style={styles.body}>

        {/* =====================
            NAVBAR GLOBAL
            muncul di semua halaman
        ====================== */}
        <nav style={styles.nav}>
          {/* Link Next.js → client-side navigation (lebih cepat) */}
          <Link href="/" style={styles.link}>Home</Link>
          <Link href="/dashboard" style={styles.link}>Dashboard</Link>
          <Link href="/history" style={styles.link}>History</Link>
          <Link href="/about" style={styles.link}>About</Link>
        </nav>

        {/* =====================
            MAIN CONTENT
            tempat page.tsx dirender
        ====================== */}
        <main style={styles.main}>
          {children}
        </main>

      </body>
    </html>
  );
}

// ==================
// CSS IN JS (GLOBAL LAYOUT STYLE)
// ==================
const styles = {
  // Style untuk <body>
  body: {
    margin: 0, // hilangkan default margin browser
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #0f172a, #020617)", // dark gradient
    color: "white",
    minHeight: "100vh", // full tinggi layar
  },

  // Navbar container
  nav: {
    display: "flex",
    justifyContent: "center", // menu rata tengah
    gap: "24px", // jarak antar menu
    padding: "20px",
    background: "#020617", // dark solid
    borderBottom: "1px solid #1e293b",
    position: "sticky" as const, // navbar nempel di atas saat scroll
    top: 0,
    zIndex: 100, // selalu di atas konten
  },

  // Style tiap link navbar
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.2s", // siap buat hover effect
  },

  // Container konten halaman
  main: {
    padding: "40px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "30px", // jarak antar elemen page
  },
};
