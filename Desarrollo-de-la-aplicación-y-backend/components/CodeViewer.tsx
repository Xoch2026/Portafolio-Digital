"use client";
import { useState } from "react";
import { textos, type Lang } from "@/lib/textos";

export default function CodeViewer({ ruta, nombre, lang = "es" }: { ruta: string; nombre: string; lang?: Lang }) {
  const t = textos[lang].codigo;
  const [abierto, setAbierto] = useState(false);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [error, setError] = useState(false);

  async function alternar() {
    const nuevo = !abierto;
    setAbierto(nuevo);
    if (nuevo && codigo === null) {
      try {
        const r = await fetch(ruta);
        if (!r.ok) throw new Error(t.noEncontro);
        setCodigo(await r.text());
      } catch {
        setError(true);
      }
    }
  }

  return (
    <div>
      <button type="button" onClick={alternar} className="boton boton-cian" aria-expanded={abierto}>
        {abierto ? t.ocultar : t.verDe(nombre)}
      </button>
      {abierto && (
        <pre className="mt-4 p-4 bg-[var(--panel)] border border-[#3a2d57] overflow-x-auto text-sm max-h-[32rem]">
          <code>{error ? t.noCargo : codigo ?? t.cargando}</code>
        </pre>
      )}
    </div>
  );
}
