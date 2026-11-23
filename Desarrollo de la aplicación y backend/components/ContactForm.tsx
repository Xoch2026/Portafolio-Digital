"use client";
import { useState } from "react";

type Estado = { tipo: "idle" | "enviando" | "ok" | "error"; msg?: string };

export default function ContactForm() {
  const [estado, setEstado] = useState<Estado>({ tipo: "idle" });
  const [errores, setErrores] = useState<Record<string, string>>({});

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = Object.fromEntries(new FormData(f)) as Record<string, string>;
    const err: Record<string, string> = {};
    if (d.nombre.trim().length < 2) err.nombre = "Escribe tu nombre (mínimo 2 letras).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.correo)) err.correo = "Escribe un correo válido.";
    if (d.mensaje.trim().length < 10) err.mensaje = "El mensaje necesita al menos 10 caracteres.";
    setErrores(err);
    if (Object.keys(err).length) return;

    setEstado({ tipo: "enviando" });
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "No se pudo enviar.");
      setEstado({ tipo: "ok", msg: j.message }); f.reset();
    } catch (x) {
      setEstado({ tipo: "error", msg: (x as Error).message });
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-4" aria-live="polite">
      {[["nombre", "Nombre", "text"], ["correo", "Correo electrónico", "email"]].map(([n, l, t]) => (
        <div key={n}><label htmlFor={n} className="block mb-1">{l}</label>
          <input id={n} name={n} type={t} />
          {errores[n] && <p className="text-[var(--magenta)] text-sm mt-1">{errores[n]}</p>}</div>
      ))}
      <div><label htmlFor="mensaje" className="block mb-1">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows={5} />
        {errores.mensaje && <p className="text-[var(--magenta)] text-sm mt-1">{errores.mensaje}</p>}</div>
      <button className="boton" disabled={estado.tipo === "enviando"}>
        {estado.tipo === "enviando" ? "Enviando..." : "Enviar mensaje"}
      </button>
      {estado.tipo === "ok" && <p className="neon-cian">{estado.msg}</p>}
      {estado.tipo === "error" && <p className="text-[var(--magenta)]">{estado.msg}</p>}
    </form>
  );
}
