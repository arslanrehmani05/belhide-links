import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Belhide Links — Handcrafted Leather Goods",
  description: "Official product links, store regions, leather care guides, and custom bespoke orders for Belhide handcrafted leather outerwear.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Belhide Links — Handcrafted Leather Goods",
    description: "Official product links & care guides for Belhide handcrafted leather jackets.",
    url: "https://links.belhide.com",
    siteName: "Belhide",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F5F1EA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased selection:bg-[#B08D57] selection:text-white">
        {children}
      </body>
    </html>
  );
}
