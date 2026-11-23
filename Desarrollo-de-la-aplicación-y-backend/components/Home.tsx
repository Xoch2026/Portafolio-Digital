import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import IdiomaHtml from "@/components/IdiomaHtml";
import { getContenido } from "@/lib/contenido";
import { textos, prefijo, type Lang } from "@/lib/textos";

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="titulo text-5xl md:text-6xl neon-cian mb-8">{children}</h2>;
const Aparte = ({ children }: { children: React.ReactNode }) => <span className="text-2xl md:text-3xl text-[var(--cromo)] opacity-80 [text-shadow:none]">{children}</span>;

const Sub = ({ titulo, descripcion, children }: { titulo: string; descripcion?: string; children: React.ReactNode }) => (
  <div className="border-l-4 border-[var(--magenta)] pl-6 py-1 mb-10">
    <h3 className="titulo text-3xl md:text-4xl text-[var(--ambar)]">{titulo}</h3>
    {descripcion && <p className="text-[var(--cian)] mt-1">{descripcion}</p>}
    <div className="mt-3 text-lg space-y-2">{children}</div>
  </div>
);
const Chips = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-2">{items.map((i) => <li key={i} className="px-3 py-1 border border-[#3a2d57] bg-[var(--panel)]">{i}</li>)}</ul>
);

export default function Home({ lang }: { lang: Lang }) {
  const t = textos[lang];
  const c = getContenido(lang);
  const { perfil, sobreMi } = c;
  const otro: Lang = lang === "es" ? "en" : "es";

  return (
    <>
      <IdiomaHtml lang={lang} />
      <header className="sticky top-0 z-10 bg-[var(--asfalto)]/90 backdrop-blur border-b border-[#3a2d57]">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
          <nav aria-label={t.navAria} className="flex-1 min-w-0 py-3 flex gap-5 overflow-x-auto titulo text-xl">
            {t.nav.map(([id, l]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-[var(--magenta)]">{l}</a>)}
          </nav>
          <Link href={prefijo(otro) || "/"} hrefLang={otro} lang={otro} title={t.idioma.titulo} aria-label={t.idioma.titulo}
            className="shrink-0 titulo text-xl px-3 py-1 border border-[var(--cian)] hover:text-[var(--magenta)] hover:border-[var(--magenta)]">
            {t.idioma.etiqueta}
          </Link>
        </div>
      </header>

      <main>
        <section id="inicio" className="relative overflow-hidden min-h-[88vh] grid place-items-center text-center px-6">
          <div className="rejilla absolute inset-x-0 bottom-0 h-1/2 -z-0" aria-hidden />
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/xochitl.jpg" alt={t.fotoAlt(perfil.nombre)} className="mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full object-cover object-top border-4 border-[var(--magenta)] shadow-[0_0_30px_var(--magenta)]" />
            <p className="titulo text-2xl text-[var(--ambar)] mt-6">{t.enVivo}</p>
            <h1 className="neon-nombre text-4xl md:text-7xl leading-tight my-4 max-w-4xl mx-auto">{perfil.nombre}</h1>
            <p className="titulo text-3xl">{perfil.carrera}</p>
            <p className="mt-2 text-lg">{perfil.frase}</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href="#proyectos" className="boton">{t.verSetlist}</a>
              <a href="#contacto" className="boton boton-cian">{t.contacto}</a>
              <a href={perfil.github} className="boton">{t.github}</a>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 space-y-28 pb-28">
          <section id="sobre-mi">
            <H2>{t.h2.sobreMi[0]} <Aparte>{t.h2.sobreMi[1]}</Aparte></H2>
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/xochitl.jpg" alt={perfil.nombre} className="aspect-square w-full object-cover object-top border-4 border-[var(--magenta)]" />
              <Sub titulo={t.sub.quien}><p>{sobreMi.quien}</p></Sub>
            </div>
            <Sub titulo={t.sub.estudio}><p>{sobreMi.estudio}</p></Sub>
            <Sub titulo={t.sub.intereses}><Chips items={sobreMi.intereses} /></Sub>
            <Sub titulo={t.sub.objetivos}>
              <h4 className="titulo text-2xl text-[var(--cian)]">{t.sub.objPersonales}</h4>
              <ul className="space-y-1 list-disc pl-5">{sobreMi.objetivos.personales.map((o) => <li key={o}>{o}</li>)}</ul>
              <h4 className="titulo text-2xl text-[var(--cian)] pt-4">{t.sub.objProfesionales}</h4>
              <ul className="space-y-1 list-disc pl-5">{sobreMi.objetivos.profesionales.map((o) => <li key={o}>{o}</li>)}</ul>
            </Sub>
            <Sub titulo={t.sub.fortalezas}><Chips items={c.fortalezas} /></Sub>
          </section>

          <section id="experiencia">
            <H2>{t.h2.experiencia[0]} <Aparte>{t.h2.experiencia[1]}</Aparte></H2>
            <ol className="border-l-4 border-[var(--magenta)] pl-6 space-y-6">
              {c.experiencia.map((e, i) => (
                <li key={i}><p className="titulo text-2xl text-[var(--ambar)]">{e.cuando} · {e.tipo}</p>
                  <p className="text-xl font-semibold">{e.titulo}</p>
                  <p className="text-[var(--cian)]">{e.lugar}</p><p>{e.detalle}</p></li>
              ))}
            </ol>
          </section>

          <section id="proyectos">
            <H2>{t.h2.proyectos[0]} <Aparte>{t.h2.proyectos[1]}</Aparte></H2>
            {(["A", "B"] as const).map((lado) => (
              <div key={lado} className="mb-10">
                <h3 className="titulo text-3xl text-[var(--ambar)] mb-3">{t.lado(lado)}</h3>
                <ol className="space-y-4">
                  {c.proyectos.filter((p) => p.lado === lado).map((p) => (
                    <li key={p.slug}>
                      <Link href={`${prefijo(lang)}/proyectos/${p.slug}`} className="entrada block p-5 hover:border-[var(--magenta)] hover:shadow-[0_0_24px_var(--magenta)] transition">
                        <span className="titulo text-3xl text-[var(--magenta)]">{p.titulo}</span>
                        <span className="block text-[var(--cian)]">{p.semana}</span>
                        <span className="block mt-1">{p.resumen}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </section>

          <section id="habilidades">
            <H2>{t.h2.habilidades[0]} <Aparte>{t.h2.habilidades[1]}</Aparte></H2>
            {Object.entries(c.habilidades).map(([cat, items]) => (
              <Sub key={cat} titulo={cat} descripcion={c.descripcionHabilidades[cat]}>
                <Chips items={items} />
              </Sub>
            ))}
          </section>

          <section id="formacion">
            <H2>{t.h2.formacion[0]} <Aparte>{t.h2.formacion[1]}</Aparte></H2>
            {c.formacion.map((f) => (
              <Sub key={f.titulo} titulo={f.titulo} descripcion={f.descripcion}>
                <ul className="space-y-1 list-disc pl-5">{f.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </Sub>
            ))}
          </section>

          <section id="contacto" className="max-w-xl">
            <H2>{t.h2.contacto[0]} <Aparte>{t.h2.contacto[1]}</Aparte></H2>
            <p className="mb-6">{t.escribeAntes}<a className="underline text-[var(--ambar)]" href={`mailto:${perfil.email}`}>{perfil.email}</a>{t.escribeDespues}</p>
            <ContactForm lang={lang} />
          </section>
        </div>
      </main>
    </>
  );
}
