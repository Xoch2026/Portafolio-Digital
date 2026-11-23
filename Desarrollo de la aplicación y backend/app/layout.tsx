import type { Metadata } from "next";
import { Monoton, Bebas_Neue, Barlow } from "next/font/google";
import "./globals.css";
import Animaciones from "@/components/Animaciones";

const neon = Monoton({ weight: "400", subsets: ["latin"], variable: "--font-neon" });
const titulo = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-titulo" });
const cuerpo = Barlow({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-cuerpo" });

export const metadata: Metadata = {
  title: "Xochitl Delgado · Portafolio",
  description: "Portafolio digital de Xochitl Lisbeth Delgado Cano, bachiller y becaria del Centro ¡Supérate!.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${neon.variable} ${titulo.variable} ${cuerpo.variable}`}>
      <body>
        {children}
        <Animaciones />
      </body>
    </html>
  );
}
