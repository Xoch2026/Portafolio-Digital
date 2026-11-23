// Textos de la interfaz (menú, títulos, botones, formulario) en español e inglés.
// El contenido del portafolio (proyectos, experiencia, etc.) está en lib/data.ts y lib/data.en.ts.
// Este archivo es pequeño a propósito: los componentes del navegador lo importan sin cargar todo el contenido.

export type Lang = "es" | "en";

/** Prefijo de la ruta: el español vive en "/" y el inglés en "/en". */
export const prefijo = (lang: Lang) => (lang === "en" ? "/en" : "");

type Textos = {
  nav: [string, string][];
  navAria: string;
  idioma: { etiqueta: string; titulo: string };
  enVivo: string;
  verSetlist: string;
  contacto: string;
  github: string;
  h2: Record<"sobreMi" | "experiencia" | "proyectos" | "habilidades" | "formacion" | "contacto", [string, string]>;
  sub: Record<"quien" | "estudio" | "intereses" | "objetivos" | "fortalezas" | "objPersonales" | "objProfesionales", string>;
  lado: (l: string) => string;
  fotoAlt: (nombre: string) => string;
  escribeAntes: string;
  escribeDespues: string;
  proyecto: {
    volver: string;
    problema: string;
    objetivo: string;
    solucion: string;
    resultados: string;
    salida: string;
    salidaNota: string;
    evidencias: string;
    archivos: string;
    codigoProyecto: string;
    codigoFuente: string;
    mapaTitulo: (titulo: string) => string;
    mapaPie: string;
    mapaAbrir: string;
    oVerloDesde: string;
    verCodigoDesde: string;
    verCanva: string;
    verGithub: string;
  };
  form: {
    nombre: string;
    correo: string;
    mensaje: string;
    enviar: string;
    enviando: string;
    errNombre: string;
    errCorreo: string;
    errMensaje: string;
    errGenerico: string;
  };
  codigo: { ocultar: string; verDe: (nombre: string) => string; noCargo: string; cargando: string; noEncontro: string };
  api: { json: string; nombre: string; correo: string; mensaje: string; ok: string };
};

export const textos: Record<Lang, Textos> = {
  es: {
    nav: [["inicio", "Inicio"], ["sobre-mi", "Sobre mí"], ["experiencia", "Experiencia"], ["proyectos", "Proyectos"], ["habilidades", "Habilidades"], ["formacion", "Formación"], ["contacto", "Contacto"]],
    navAria: "Principal",
    idioma: { etiqueta: "EN", titulo: "Read this page in English" },
    enVivo: "En vivo · Gira 2026",
    verSetlist: "Ver setlist",
    contacto: "Contacto",
    github: "GitHub",
    h2: {
      sobreMi: ["Backstage", "(Sobre mí)"],
      experiencia: ["Fechas de la gira", "(Experiencia)"],
      proyectos: ["Setlist", "(Proyectos)"],
      habilidades: ["Equipo en el escenario", "(Habilidades)"],
      formacion: ["Discografía académica", "(Formación académica)"],
      contacto: ["Pase de backstage", "(Contacto)"],
    },
    sub: {
      quien: "¿Quién soy?",
      estudio: "¿Qué estudio?",
      intereses: "¿Cuáles son mis intereses?",
      objetivos: "¿Cuáles son mis objetivos?",
      fortalezas: "¿Cuáles son mis fortalezas?",
      objPersonales: "Objetivos personales",
      objProfesionales: "Objetivos profesionales",
    },
    lado: (l) => `Lado ${l}`,
    fotoAlt: (n) => `Fotografía de ${n}`,
    escribeAntes: "Escríbeme a ",
    escribeDespues: " o usa el formulario.",
    proyecto: {
      volver: "Volver al setlist",
      problema: "Problema que busca resolver",
      objetivo: "Objetivo de la actividad",
      solucion: "Solución implementada",
      resultados: "Resultados obtenidos",
      salida: "Salida de la ejecución",
      salidaNota: "",
      evidencias: "Visualizaciones y evidencias",
      archivos: "Archivos del proyecto",
      codigoProyecto: "Código del proyecto",
      codigoFuente: "Código fuente",
      mapaTitulo: (t) => `Mapa interactivo de ${t}`,
      mapaPie: "Mapa interactivo del proyecto. ",
      mapaAbrir: "Abrir en pantalla completa",
      oVerloDesde: "O puedes verlo desde ",
      verCodigoDesde: "Puedes ver el código desde ",
      verCanva: "Ver presentación en Canva",
      verGithub: "Ver código en GitHub",
    },
    form: {
      nombre: "Nombre",
      correo: "Correo electrónico",
      mensaje: "Mensaje",
      enviar: "Enviar mensaje",
      enviando: "Enviando...",
      errNombre: "Escribe tu nombre (mínimo 2 letras).",
      errCorreo: "Escribe un correo válido.",
      errMensaje: "El mensaje necesita al menos 10 caracteres.",
      errGenerico: "No se pudo enviar.",
    },
    codigo: {
      ocultar: "Ocultar código",
      verDe: (n) => `Ver código de ${n}`,
      noCargo: "No se pudo cargar el archivo.",
      cargando: "Cargando...",
      noEncontro: "No se encontró el archivo",
    },
    api: {
      json: "El cuerpo debe ser JSON válido.",
      nombre: "Nombre inválido.",
      correo: "Correo inválido.",
      mensaje: "El mensaje debe tener entre 10 y 2000 caracteres.",
      ok: "Mensaje enviado. ¡Gracias por pasar por el backstage!",
    },
  },

  en: {
    nav: [["inicio", "Home"], ["sobre-mi", "About me"], ["experiencia", "Experience"], ["proyectos", "Projects"], ["habilidades", "Skills"], ["formacion", "Education"], ["contacto", "Contact"]],
    navAria: "Main",
    idioma: { etiqueta: "ES", titulo: "Leer esta página en español" },
    enVivo: "Live · 2026 Tour",
    verSetlist: "View setlist",
    contacto: "Contact",
    github: "GitHub",
    h2: {
      sobreMi: ["Backstage", "(About me)"],
      experiencia: ["Tour Dates", "(Experience)"],
      proyectos: ["Setlist", "(Projects)"],
      habilidades: ["Gear on Stage", "(Skills)"],
      formacion: ["Academic Discography", "(Education)"],
      contacto: ["Backstage Pass", "(Contact)"],
    },
    sub: {
      quien: "Who am I?",
      estudio: "What do I study?",
      intereses: "What are my interests?",
      objetivos: "What are my goals?",
      fortalezas: "What are my strengths?",
      objPersonales: "Personal goals",
      objProfesionales: "Professional goals",
    },
    lado: (l) => `Side ${l}`,
    fotoAlt: (n) => `Photo of ${n}`,
    escribeAntes: "Write to me at ",
    escribeDespues: " or use the form.",
    proyecto: {
      volver: "Back to the setlist",
      problema: "Problem it aims to solve",
      objetivo: "Goal of the activity",
      solucion: "Implemented solution",
      resultados: "Results",
      salida: "Program output",
      salidaNota: "This is the real output of the program, which prints in Spanish.",
      evidencias: "Visualizations and evidence",
      archivos: "Project files",
      codigoProyecto: "Project code",
      codigoFuente: "Source code",
      mapaTitulo: (t) => `Interactive map of ${t}`,
      mapaPie: "Interactive project map. ",
      mapaAbrir: "Open full screen",
      oVerloDesde: "Or you can view it on ",
      verCodigoDesde: "You can view the code on ",
      verCanva: "View presentation on Canva",
      verGithub: "View code on GitHub",
    },
    form: {
      nombre: "Name",
      correo: "Email",
      mensaje: "Message",
      enviar: "Send message",
      enviando: "Sending...",
      errNombre: "Enter your name (at least 2 letters).",
      errCorreo: "Enter a valid email.",
      errMensaje: "The message needs at least 10 characters.",
      errGenerico: "The message could not be sent.",
    },
    codigo: {
      ocultar: "Hide code",
      verDe: (n) => `View code of ${n}`,
      noCargo: "The file could not be loaded.",
      cargando: "Loading...",
      noEncontro: "File not found",
    },
    api: {
      json: "The body must be valid JSON.",
      nombre: "Invalid name.",
      correo: "Invalid email.",
      mensaje: "The message must be between 10 and 2000 characters.",
      ok: "Message sent. Thanks for stopping by the backstage!",
    },
  },
};
