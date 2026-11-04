import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "BestCar | Estética Automotiva em Mafra - SC • PRO Detail";
const DESCRIPTION =
  "Detailing automotivo de alto nível em Mafra/SC e Rio Negro/PR: lavação detalhada, polimento técnico, vitrificação cerâmica e higienização interna. Agende pelo WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/estetica/hero-desktop.jpg", width: 2000, height: 1116 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-dvh bg-zinc-950 font-sans text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
