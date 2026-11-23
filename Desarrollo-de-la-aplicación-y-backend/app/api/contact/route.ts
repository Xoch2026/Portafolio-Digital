import { NextResponse } from "next/server";
import { textos, type Lang } from "@/lib/textos";

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

  // Aquí puedes enviar el correo con un servicio (Resend, Nodemailer...).
  // Las claves van en .env.local y en Vercel: process.env.RESEND_API_KEY
  console.log("Nuevo mensaje:", { nombre, correo, mensaje });

  return NextResponse.json({ message: m.ok }, { status: 200 });
}
