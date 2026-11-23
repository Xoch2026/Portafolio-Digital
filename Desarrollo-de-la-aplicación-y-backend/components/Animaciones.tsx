"use client";
import { useEffect, useRef } from "react";

// Elementos que aparecen con animación al hacer scroll.
const OBJETIVOS = [
  "main section > h2",
  "#sobre-mi img",
  "main section div.border-l-4",
  "#experiencia ol > li",
  "#proyectos h3",
  "#proyectos ol > li",
  "#contacto form",
].join(",");

export default function Animaciones() {
  const barra = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Barra de progreso de lectura
    let raf = 0;
    const actualizar = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barra.current) barra.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(actualizar); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    actualizar();

    // Aparición al hacer scroll (se omite si la persona prefiere menos movimiento)
    let io: IntersectionObserver | undefined;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducir && "IntersectionObserver" in window) {
      const els = Array.from(document.querySelectorAll<HTMLElement>(OBJETIVOS));
      els.forEach((el) => el.classList.add("reveal"));
      els.forEach((el) => {
        let n = 0;
        let s = el.previousElementSibling;
        while (s) { if (s.classList.contains("reveal")) n++; s = s.previousElementSibling; }
        el.style.transitionDelay = `${Math.min(n, 5) * 90}ms`;
      });
      io = new IntersectionObserver((entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); io?.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      els.forEach((el) => io!.observe(el));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return <div ref={barra} aria-hidden="true" className="barra-progreso" />;
}
