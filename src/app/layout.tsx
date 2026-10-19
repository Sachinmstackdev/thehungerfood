import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#eb4d23",
};

export const metadata: Metadata = {
  title: "The Hunger Food | Crispy, Juicy, Irresistible",
  description: "Order fresh and delicious gourmet burgers, biryanis, pizzas and starters directly on WhatsApp. Fast delivery & best prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased text-[#020202] bg-[#f8f6f0] selection:bg-[#eb4d23] selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}

