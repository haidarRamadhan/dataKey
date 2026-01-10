// Import ReactNode type for typing children
import type { ReactNode } from "react";

import Link from "next/link";

// Main component layout (Adapted in entire pages)
export default function RootLayout({
  children, // children = isi dari page.tsx
}: {
  children: ReactNode; // tipe data children adalah ReactNode
}) {
  return (
    // HTML root
    <html lang="en">
      <body>
        {/* Navbar muncul di semua halaman */}
        <nav>
          <Link href="/">Home</Link> | <Link href="/about">About</Link> | <Link href={"/history"}>History</Link >
        </nav>
        {/* Tempat page.tsx dirender */}
        <main>{children}</main>
      </body>
    </html>
  )
}