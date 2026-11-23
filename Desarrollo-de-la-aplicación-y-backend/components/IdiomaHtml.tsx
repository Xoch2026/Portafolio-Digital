"use client";
import { useEffect } from "react";
import type { Lang } from "@/lib/textos";

// Actualiza <html lang="..."> según el idioma de la página (el layout es compartido por /es y /en).
export default function IdiomaHtml({ lang }: { lang: Lang }) {
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return null;
}
