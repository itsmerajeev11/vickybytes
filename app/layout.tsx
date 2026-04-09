import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VickyBytes - Premium Live Streaming Platform",
  description: "Discover premium high-fidelity streams from the world's most talented creators. Experience live events like never before.",
  keywords: "streaming, live events, music, gaming, tech, workshops",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

import MainLayout from "@/components/layout/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="bg-background text-on-surface selection:bg-primary selection:text-on-primary-container overflow-x-hidden antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
