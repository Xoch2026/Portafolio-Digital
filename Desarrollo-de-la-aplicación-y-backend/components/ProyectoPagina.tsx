import Link from "next/link";
import { notFound } from "next/navigation";
import CodeViewer from "@/components/CodeViewer";
import IdiomaHtml from "@/components/IdiomaHtml";
import { getContenido } from "@/lib/contenido";
import { textos, prefijo, type Lang } from "@/lib/textos";

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="titulo text-3xl md:text-4xl text-[var(--cian)] mb-3">{children}</h2>
);

export default function ProyectoPagina({ lang, slug }: { lang: Lang; slug: string }) {
  const t = textos[lang];
  const tp = t.proyecto;
  const p = getContenido(lang).proyectos.find((x) => x.slug === slug);
  if (!p) notFound();
  const otro: Lang = lang === "es" ? "en" : "es";

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-10">
      <IdiomaHtml lang={lang} />
      <div>
        <div className="flex items-center justify-between gap-4">
          <Link href={lang === "en" ? "/en#proyectos" : "/#proyectos"} className="neon-cian">{tp.volver}</Link>
          <Link href={`${prefijo(otro)}/proyectos/${p.slug}`} hrefLang={otro} lang={otro} title={t.idioma.titulo} aria-label={t.idioma.titulo}
            className="shrink-0 titulo text-xl px-3 py-1 border border-[var(--cian)] hover:text-[var(--magenta)] hover:border-[var(--magenta)]">
            {t.idioma.etiqueta}
          </Link>
        </div>
        <p className="mt-8 text-[var(--ambar)]">{t.lado(p.lado)} · {p.semana}</p>
        <h1 className="titulo text-5xl md:text-6xl text-[var(--magenta)]">{p.titulo}</h1>
        <p className="mt-4 text-lg">{p.resumen}</p>
        {p.equipo && <p className="mt-2 text-[var(--cian)]">{p.equipo}</p>}
        {p.tecnologias.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-6">
            {p.tecnologias.map((x) => <li key={x} className="px-3 py-1 border border-[var(--cian)]">{x}</li>)}
          </ul>
        )}
      </div>

      <section><H2>{tp.problema}</H2><p className="text-lg">{p.problema}</p></section>
      <section><H2>{tp.objetivo}</H2><p className="text-lg">{p.objetivo}</p></section>

      <section><H2>{tp.solucion}</H2>
        <ol className="space-y-3 list-decimal pl-6 text-lg">{p.solucion.map((s) => <li key={s}>{s}</li>)}</ol>
      </section>

      <section><H2>{tp.resultados}</H2>
        <ul className="space-y-3 list-disc pl-6 text-lg">{p.resultados.map((r) => <li key={r}>{r}</li>)}</ul>
      </section>

      {p.salida && (
        <section><H2>{tp.salida}</H2>
          {tp.salidaNota && <p className="mb-2 text-sm opacity-80">{tp.salidaNota}</p>}
          <pre className="p-4 bg-[var(--panel)] border border-[#3a2d57] overflow-x-auto text-sm max-h-96"><code>{p.salida}</code></pre>
        </section>
      )}

      {(p.capturas.length > 0 || p.mapa) && (
      <section><H2>{tp.evidencias}</H2>
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
              <iframe src={p.mapa} title={tp.mapaTitulo(p.titulo)} className="w-full h-[480px] border-2 border-[var(--cian)] bg-white" loading="lazy" />
              <figcaption className="mt-2 text-sm opacity-80">
                {tp.mapaPie}<a className="underline" href={p.mapa} target="_blank" rel="noopener noreferrer">{tp.mapaAbrir}</a>.
              </figcaption>
            </figure>
          )}
        </div>
      </section>
      )}

      {(p.archivos.length > 0 || p.repo) && (
        <section><H2>{p.archivos.length > 0 ? tp.archivos : tp.codigoProyecto}</H2>
          {p.archivos.length > 0 && (
            <ul className="space-y-2">
              {p.archivos.map((a) => (
                <li key={a.ruta}><a href={a.ruta} download className="underline text-[var(--ambar)]">{a.nombre}</a></li>
              ))}
            </ul>
          )}
          {p.repo && (
            <p className="mt-4 text-lg">
              {p.archivos.length > 0 ? tp.oVerloDesde : tp.verCodigoDesde}
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="underline text-[var(--ambar)]">GitHub</a>.
            </p>
          )}
        </section>
      )}

      {p.codigo && <section><H2>{tp.codigoFuente}</H2><CodeViewer ruta={p.codigo.ruta} nombre={p.codigo.nombre} lang={lang} /></section>}

      <div className="flex flex-wrap gap-4">
        {p.canva && <a href={p.canva} target="_blank" rel="noopener noreferrer" className="boton">{tp.verCanva}</a>}
        {p.repo && <a href={p.repo} className="boton boton-cian">{tp.verGithub}</a>}
      </div>
    </main>
  );
}
