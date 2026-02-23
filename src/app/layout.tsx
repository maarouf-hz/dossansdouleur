import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { WebSiteSchema } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dossansdouleur.com"),
  title: {
    default: "Dos Sans Douleur | Guide Expert de la Santé Vertébrale",
    template: "%s | Dos Sans Douleur"
  },
  description: "Solutions naturelles et exercices thérapeutiques pour soigner le mal de dos. Apprenez à corriger votre posture et soulager vos lombaires avec nos guides validés par des experts.",
  keywords: [
    "soulager mal de dos", 
    "exercices lombaires", 
    "remèdes naturels dos", 
    "ergonomie bureau", 
    "douleurs cervicales solutions",
    "santé vertébrale"
  ],
  alternates: {
    canonical: "https://dossansdouleur.com",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://dossansdouleur.com",
    siteName: "Dos Sans Douleur",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dos Sans Douleur - Expertise et Soins" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <WebSiteSchema />
      </head>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "min-h-screen bg-background font-sans antialiased flex flex-col selection:bg-emerald-100 selection:text-emerald-900"
        )}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}