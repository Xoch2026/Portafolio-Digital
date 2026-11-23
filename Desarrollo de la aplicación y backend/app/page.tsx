import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { perfil, proyectos, experiencia, habilidades, formacion, sobreMi, descripcionHabilidades } from "@/lib/data";

const nav = [["inicio","Inicio"],["sobre-mi","Sobre mí"],["experiencia","Experiencia"],["proyectos","Proyectos"],["habilidades","Habilidades"],["formacion","Formación"],["contacto","Contacto"]];
const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="titulo text-5xl md:text-6xl neon-cian mb-8">{children}</h2>;

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

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-[var(--asfalto)]/90 backdrop-blur border-b border-[#3a2d57]">
        <nav aria-label="Principal" className="max-w-6xl mx-auto px-4 py-3 flex gap-5 overflow-x-auto titulo text-xl">
          {nav.map(([id, l]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-[var(--magenta)]">{l}</a>)}
        </nav>
      </header>

      <main>
        <section id="inicio" className="relative overflow-hidden min-h-[88vh] grid place-items-center text-center px-6">
          <div className="rejilla absolute inset-x-0 bottom-0 h-1/2 -z-0" aria-hidden />
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/xochitl.jpg" alt="Fotografía de Xochitl Lisbeth Delgado Cano" className="mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full object-cover object-top border-4 border-[var(--magenta)] shadow-[0_0_30px_var(--magenta)]" />
            <p className="titulo text-2xl text-[var(--ambar)] mt-6">En vivo · Gira 2026</p>
            <h1 className="neon-nombre text-4xl md:text-7xl leading-tight my-4 max-w-4xl mx-auto">{perfil.nombre}</h1>
            <p className="titulo text-3xl">{perfil.carrera}</p>
            <p className="mt-2 text-lg">{perfil.frase}</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href="#proyectos" className="boton">Ver setlist</a>
              <a href="#contacto" className="boton boton-cian">Contacto</a>
              <a href={perfil.github} className="boton">GitHub</a>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 space-y-28 pb-28">
          <section id="sobre-mi">
            <H2>Backstage</H2>
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/xochitl.jpg" alt="Xochitl Lisbeth Delgado Cano" className="aspect-square w-full object-cover object-top border-4 border-[var(--magenta)]" />
              <Sub titulo="¿Quién soy?"><p>{sobreMi.quien}</p></Sub>
            </div>
            <Sub titulo="¿Qué estudio?"><p>{sobreMi.estudio}</p></Sub>
            <Sub titulo="¿Cuáles son mis intereses?"><Chips items={sobreMi.intereses} /></Sub>
            <Sub titulo="¿Cuáles son mis objetivos?">
              <h4 className="titulo text-2xl text-[var(--cian)]">Objetivos personales</h4>
              <ul className="space-y-1 list-disc pl-5">{sobreMi.objetivos.personales.map((o) => <li key={o}>{o}</li>)}</ul>
              <h4 className="titulo text-2xl text-[var(--cian)] pt-4">Objetivos profesionales</h4>
              <ul className="space-y-1 list-disc pl-5">{sobreMi.objetivos.profesionales.map((o) => <li key={o}>{o}</li>)}</ul>
            </Sub>
            <Sub titulo="¿Cuáles son mis fortalezas?"><Chips items={habilidades["Habilidades personales"]} /></Sub>
          </section>

          <section id="experiencia">
            <H2>Fechas de la gira</H2>
            <ol className="border-l-4 border-[var(--magenta)] pl-6 space-y-6">
              {experiencia.map((e, i) => (
                <li key={i}><p className="titulo text-2xl text-[var(--ambar)]">{e.cuando} · {e.tipo}</p>
                  <p className="text-xl font-semibold">{e.titulo}</p>
                  <p className="text-[var(--cian)]">{e.lugar}</p><p>{e.detalle}</p></li>
              ))}
            </ol>
          </section>

          <section id="proyectos">
            <H2>Setlist</H2>
            {(["A", "B"] as const).map((lado) => (
              <div key={lado} className="mb-10">
                <h3 className="titulo text-3xl text-[var(--ambar)] mb-3">Lado {lado}</h3>
                <ol className="space-y-4">
                  {proyectos.filter((p) => p.lado === lado).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/proyectos/${p.slug}`} className="entrada block p-5 hover:border-[var(--magenta)] hover:shadow-[0_0_24px_var(--magenta)] transition">
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
            <H2>Equipo en el escenario</H2>
            {Object.entries(habilidades).map(([cat, items]) => (
              <Sub key={cat} titulo={cat} descripcion={descripcionHabilidades[cat]}>
                <Chips items={items} />
              </Sub>
            ))}
          </section>

          <section id="formacion">
            <H2>Discografía académica</H2>
            {formacion.map((f) => (
              <Sub key={f.titulo} titulo={f.titulo} descripcion={f.descripcion}>
                <ul className="space-y-1 list-disc pl-5">{f.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </Sub>
            ))}
          </section>

          <section id="contacto" className="max-w-xl">
            <H2>Pase de backstage</H2>
            <p className="mb-6">Escríbeme a <a className="underline text-[var(--ambar)]" href={`mailto:${perfil.email}`}>{perfil.email}</a> o usa el formulario.</p>
            <ContactForm />
          </section>
        </div>
      </main>
    </>
  );
}
