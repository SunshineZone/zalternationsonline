import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Zalternations.Online | Building Digital Ideas Into Real Products",
  description: "Interactive portfolio of Zalternations.Online featuring a playable pixel art Flappy Bird hero game, Three.js 3D voxel engine, and real-world digital products.",
  keywords: ["Zalternations.Online", "Portfolio", "Next.js", "Three.js", "Pixel Art", "Flappy Bird", "EdTech", "AI"],
  authors: [{ name: "Zalternations" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0b111e] min-h-screen text-white selection:bg-yellow-300 selection:text-black">
        {children}
      </body>
    </html>
  );
}
