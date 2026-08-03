import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Cormorant, Raleway } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
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
  themeColor: "#1C120E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${cormorant.variable} ${raleway.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased font-sans selection:bg-[#F5F4F2] selection:text-[#1C120E]">
        {children}
      </body>
    </html>
  );
}
