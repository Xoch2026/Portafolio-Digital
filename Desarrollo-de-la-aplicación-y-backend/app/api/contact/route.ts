import { NextResponse } from "next/server";
import { perfil } from "@/lib/data";
import { textos, type Lang } from "@/lib/textos";

// Evita que el texto de quien escribe se interprete como HTML dentro del correo.
const escapar = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let body: { nombre?: string; correo?: string; mensaje?: string; lang?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: textos.es.api.json }, { status: 400 }); }

  // El idioma es opcional: si no viene (o es otro), se responde en español.
  const lang: Lang = body.lang === "en" ? "en" : "es";
  const m = textos[lang].api;

  const nombre = body.nombre?.trim() ?? "";
  const correo = body.correo?.trim() ?? "";
  const mensaje = body.mensaje?.trim() ?? "";

  if (nombre.length < 2) return NextResponse.json({ error: m.nombre }, { status: 422 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return NextResponse.json({ error: m.correo }, { status: 422 });
  if (mensaje.length < 10 || mensaje.length > 2000) return NextResponse.json({ error: m.mensaje }, { status: 422 });

  // Las claves van en .env.local (en tu computadora) y en Vercel; nunca en el código.
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACT_TO_EMAIL ?? perfil.email;
  const remitente = process.env.CONTACT_FROM_EMAIL ?? "Portafolio <onboarding@resend.dev>";

  if (!apiKey) {
    // Sin clave configurada el proyecto sigue funcionando, pero NO se envía ningún correo.
    console.warn("RESEND_API_KEY no está configurada: el mensaje no se envió por correo.");
    console.log("Nuevo mensaje:", { nombre, correo, mensaje });
    return NextResponse.json({ message: m.ok }, { status: 200 });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: remitente,
        to: [destino],
        reply_to: correo, // al darle "Responder" le contestas a quien escribió
        subject: `Nuevo mensaje del portafolio: ${nombre.slice(0, 60)}`,
        text: `Nombre: ${nombre}\nCorreo: ${correo}\nIdioma de la página: ${lang}\n\n${mensaje}`,
        html: `<h2>Nuevo mensaje desde tu portafolio</h2>
               <p><strong>Nombre:</strong> ${escapar(nombre)}</p>
               <p><strong>Correo:</strong> ${escapar(correo)}</p>
               <p><strong>Idioma de la página:</strong> ${lang}</p>
               <p style="white-space:pre-wrap">${escapar(mensaje)}</p>`,
      }),
    });

    if (!r.ok) {
      console.error("Resend respondió con error:", r.status, await r.text());
      return NextResponse.json({ error: m.errorEnvio }, { status: 502 });
    }
  } catch (e) {
    console.error("No se pudo conectar con Resend:", e);
    return NextResponse.json({ error: m.errorEnvio }, { status: 502 });
  }

  return NextResponse.json({ message: m.ok }, { status: 200 });
}
