import type { Metadata, Viewport } from "next";
import { Archivo, Roboto, Roboto_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const body = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

// Stand-in for the design's Akira Expanded (a licensed font): Archivo at its widest, heaviest setting.
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://travel7lanka.com"),
  title: {
    default: "Travel 7 — Visas, Air Tickets & Travel Solutions in Colombo",
    template: "%s | Travel 7",
  },
  description:
    "Travel 7 (Pvt) Ltd, Colombo — IATA-accredited agency for visa assistance, air tickets, travel insurance and holiday packages.",
  openGraph: {
    title: "Travel 7",
    description: "Your gateway to world-class travel solutions.",
    type: "website",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
