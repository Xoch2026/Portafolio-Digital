"use client";
import { useState } from "react";
import { textos, type Lang } from "@/lib/textos";

type Estado = { tipo: "idle" | "enviando" | "ok" | "error"; msg?: string };

export default function ContactForm({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang].form;
  const [estado, setEstado] = useState<Estado>({ tipo: "idle" });
  const [errores, setErrores] = useState<Record<string, string>>({});

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = Object.fromEntries(new FormData(f)) as Record<string, string>;
    const err: Record<string, string> = {};
    if (d.nombre.trim().length < 2) err.nombre = t.errNombre;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.correo)) err.correo = t.errCorreo;
    if (d.mensaje.trim().length < 10) err.mensaje = t.errMensaje;
    setErrores(err);
    if (Object.keys(err).length) return;

    setEstado({ tipo: "enviando" });
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...d, lang }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? t.errGenerico);
      setEstado({ tipo: "ok", msg: j.message }); f.reset();
    } catch (x) {
      setEstado({ tipo: "error", msg: (x as Error).message });
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-4" aria-live="polite">
      {[["nombre", t.nombre, "text"], ["correo", t.correo, "email"]].map(([n, l, tipo]) => (
        <div key={n}><label htmlFor={n} className="block mb-1">{l}</label>
          <input id={n} name={n} type={tipo} />
          {errores[n] && <p className="text-[var(--magenta)] text-sm mt-1">{errores[n]}</p>}</div>
      ))}
      <div><label htmlFor="mensaje" className="block mb-1">{t.mensaje}</label>
        <textarea id="mensaje" name="mensaje" rows={5} />
        {errores.mensaje && <p className="text-[var(--magenta)] text-sm mt-1">{errores.mensaje}</p>}</div>
      <button className="boton" disabled={estado.tipo === "enviando"}>
        {estado.tipo === "enviando" ? t.enviando : t.enviar}
      </button>
      {estado.tipo === "ok" && <p className="neon-cian">{estado.msg}</p>}
      {estado.tipo === "error" && <p className="text-[var(--magenta)]">{estado.msg}</p>}
    </form>
  );
}
