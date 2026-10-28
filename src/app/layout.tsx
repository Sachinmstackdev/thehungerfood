import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#eb4d23",
};

export const metadata: Metadata = {
  title: "The Hunger Food | Crispy, Juicy, Irresistible",
  description: "Order fresh and delicious gourmet burgers, noodles, soya chaap and fast food directly on WhatsApp. Fast delivery & best prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased text-[#12100e] bg-[#f8f6f0] selection:bg-[#eb4d23] selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}

