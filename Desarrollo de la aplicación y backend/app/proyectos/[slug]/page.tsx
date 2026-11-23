import Link from "next/link";
import { notFound } from "next/navigation";
import { proyectos } from "@/lib/data";
import CodeViewer from "@/components/CodeViewer";

export function generateStaticParams() { return proyectos.map((p) => ({ slug: p.slug })); }

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="titulo text-3xl md:text-4xl text-[var(--cian)] mb-3">{children}</h2>
);

export default async function Proyecto({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = proyectos.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-10">
      <div>
        <Link href="/#proyectos" className="neon-cian">Volver al setlist</Link>
        <p className="mt-8 text-[var(--ambar)]">Lado {p.lado} · {p.semana}</p>
        <h1 className="titulo text-5xl md:text-6xl text-[var(--magenta)]">{p.titulo}</h1>
        <p className="mt-4 text-lg">{p.resumen}</p>
        {p.equipo && <p className="mt-2 text-[var(--cian)]">{p.equipo}</p>}
        {p.tecnologias.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-6">
            {p.tecnologias.map((t) => <li key={t} className="px-3 py-1 border border-[var(--cian)]">{t}</li>)}
          </ul>
        )}
      </div>

      <section><H2>Problema que busca resolver</H2><p className="text-lg">{p.problema}</p></section>
      <section><H2>Objetivo de la actividad</H2><p className="text-lg">{p.objetivo}</p></section>

      <section><H2>Solución implementada</H2>
        <ol className="space-y-3 list-decimal pl-6 text-lg">{p.solucion.map((s) => <li key={s}>{s}</li>)}</ol>
      </section>

      <section><H2>Resultados obtenidos</H2>
        <ul className="space-y-3 list-disc pl-6 text-lg">{p.resultados.map((r) => <li key={r}>{r}</li>)}</ul>
      </section>

      {p.salida && (
        <section><H2>Salida de la ejecución</H2>
          <pre className="p-4 bg-[var(--panel)] border border-[#3a2d57] overflow-x-auto text-sm max-h-96"><code>{p.salida}</code></pre>
        </section>
      )}

      {(p.capturas.length > 0 || p.mapa) && (
      <section><H2>Visualizaciones y evidencias</H2>
        <div className="grid gap-8">
          {p.capturas.map((c) => (
            <figure key={c.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt={c.alt} className="w-full border-2 border-[var(--magenta)] bg-white" />
              {c.pie && <figcaption className="mt-2 text-sm opacity-80">{c.pie}</figcaption>}
            </figure>
          ))}
          {p.mapa && (
            <figure>
              <iframe src={p.mapa} title={`Mapa interactivo de ${p.titulo}`} className="w-full h-[480px] border-2 border-[var(--cian)] bg-white" loading="lazy" />
              <figcaption className="mt-2 text-sm opacity-80">
                Mapa interactivo del proyecto. <a className="underline" href={p.mapa} target="_blank" rel="noopener noreferrer">Abrir en pantalla completa</a>.
              </figcaption>
            </figure>
          )}
        </div>
      </section>
      )}

      {(p.archivos.length > 0 || p.repo) && (
        <section><H2>{p.archivos.length > 0 ? "Archivos del proyecto" : "Código del proyecto"}</H2>
          {p.archivos.length > 0 && (
            <ul className="space-y-2">
              {p.archivos.map((a) => (
                <li key={a.ruta}><a href={a.ruta} download className="underline text-[var(--ambar)]">{a.nombre}</a></li>
              ))}
            </ul>
          )}
          {p.repo && (
            <p className="mt-4 text-lg">
              {p.archivos.length > 0 ? "O puedes verlo desde " : "Puedes ver el código desde "}
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="underline text-[var(--ambar)]">GitHub</a>.
            </p>
          )}
        </section>
      )}

      {p.codigo && <section><H2>Código fuente</H2><CodeViewer ruta={p.codigo.ruta} nombre={p.codigo.nombre} /></section>}

      <div className="flex flex-wrap gap-4">
        {p.canva && <a href={p.canva} target="_blank" rel="noopener noreferrer" className="boton">Ver presentación en Canva</a>}
        {p.repo && <a href={p.repo} className="boton boton-cian">Ver código en GitHub</a>}
      </div>
    </main>
  );
}
