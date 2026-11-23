// Devuelve todo el contenido del portafolio en el idioma pedido.
// Solo lo usan componentes de servidor (Home y ProyectoPagina).
import {
  perfil, proyectos, experiencia, habilidades, descripcionHabilidades, sobreMi, formacion,
  type Proyecto,
} from "./data";
import {
  perfilEn, textosProyectosEn, experienciaEn, habilidadesEn, descripcionHabilidadesEn,
  sobreMiEn, formacionEn, fortalezasEn,
} from "./data.en";
import type { Lang } from "./textos";

export type Contenido = {
  perfil: typeof perfil;
  proyectos: Proyecto[];
  experiencia: { cuando: string; tipo: string; titulo: string; lugar: string; detalle: string }[];
  habilidades: Record<string, string[]>;
  descripcionHabilidades: Record<string, string>;
  sobreMi: typeof sobreMi;
  formacion: { titulo: string; descripcion: string; items: string[] }[];
  fortalezas: string[];
};

// Une los textos en inglés con los datos que no cambian (imágenes, rutas, enlaces).
function proyectosEnIngles(): Proyecto[] {
  return proyectos.map((p) => {
    const t = textosProyectosEn[p.slug];
    if (!t) return p;
    return {
      ...p,
      titulo: t.titulo,
      semana: t.semana,
      resumen: t.resumen,
      problema: t.problema,
      objetivo: t.objetivo,
      solucion: t.solucion,
      resultados: t.resultados,
      tecnologias: t.tecnologias ?? p.tecnologias,
      equipo: t.equipo ?? p.equipo,
      capturas: p.capturas.map((c, i) => ({
        ...c,
        alt: t.capturas?.[i]?.alt ?? c.alt,
        pie: t.capturas?.[i]?.pie ?? c.pie,
      })),
      archivos: p.archivos.map((a, i) => ({ ...a, nombre: t.archivos?.[i] ?? a.nombre })),
    };
  });
}

export function getContenido(lang: Lang): Contenido {
  if (lang === "en") {
    return {
      perfil: perfilEn,
      proyectos: proyectosEnIngles(),
      experiencia: experienciaEn,
      habilidades: habilidadesEn,
      descripcionHabilidades: descripcionHabilidadesEn,
      sobreMi: sobreMiEn,
      formacion: formacionEn,
      fortalezas: fortalezasEn,
    };
  }
  return {
    perfil,
    proyectos,
    experiencia,
    habilidades,
    descripcionHabilidades,
    sobreMi,
    formacion,
    fortalezas: habilidades["Habilidades personales"],
  };
}
