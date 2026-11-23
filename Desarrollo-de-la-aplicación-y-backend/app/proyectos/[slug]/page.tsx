import { proyectos } from "@/lib/data";
import ProyectoPagina from "@/components/ProyectoPagina";

export function generateStaticParams() { return proyectos.map((p) => ({ slug: p.slug })); }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProyectoPagina lang="es" slug={slug} />;
}
