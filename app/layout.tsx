import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HiveMicroRitual",
  description: "A 10-second ritual for clarity, resonance, and relief.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="site-footer">
          <p>No ads. No investors. No agenda.</p>
          <p>Free at the base tier, forever.</p>
        </footer>
      </body>
    </html>
  );
}