import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: { nombre?: string; correo?: string; mensaje?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "El cuerpo debe ser JSON válido." }, { status: 400 }); }

  const nombre = body.nombre?.trim() ?? "";
  const correo = body.correo?.trim() ?? "";
  const mensaje = body.mensaje?.trim() ?? "";

  if (nombre.length < 2) return NextResponse.json({ error: "Nombre inválido." }, { status: 422 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return NextResponse.json({ error: "Correo inválido." }, { status: 422 });
  if (mensaje.length < 10 || mensaje.length > 2000) return NextResponse.json({ error: "El mensaje debe tener entre 10 y 2000 caracteres." }, { status: 422 });

  // Aquí puedes enviar el correo con un servicio (Resend, Nodemailer...).
  // Las claves van en .env.local y en Vercel: process.env.RESEND_API_KEY
  console.log("Nuevo mensaje:", { nombre, correo, mensaje });

  return NextResponse.json({ message: "Mensaje enviado. ¡Gracias por pasar por el backstage!" }, { status: 200 });
}
