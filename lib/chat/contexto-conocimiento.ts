import { getTemasActivosPorMateria } from "@/lib/db/queries";
import type { Materia } from "@/lib/materias";

export type TemaActivo = {
  nombre: string;
  contenido: string;
};

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/["']/g, "");
}

export async function obtenerTemasActivos(
  materia: Materia
): Promise<TemaActivo[]> {
  const temas = await getTemasActivosPorMateria(materia);
  return temas.map((t) => ({ nombre: t.nombre, contenido: t.contenido }));
}

export function construirListadoTemas(temas: TemaActivo[]) {
  if (temas.length === 0) return "";
  return temas
    .map((t, i) => `${i + 1}. ${t.nombre.replace(/["']/g, "")}`)
    .join(", ");
}

export function preguntaCoincideConTemas(
  pregunta: string,
  temas: TemaActivo[]
): boolean {
  if (temas.length === 0) return false;
  const preguntaNorm = normalizar(pregunta);
  return temas.some((tema) => {
    const nombreNorm = normalizar(tema.nombre);
    const palabrasClave = nombreNorm.split(/\s+/).filter((p) => p.length > 3);
    if (palabrasClave.length === 0) return preguntaNorm.includes(nombreNorm);
    return palabrasClave.some((palabra) => preguntaNorm.includes(palabra));
  });
}

export function construirMensajeTemaNoVisto(
  hayTemasActivos: boolean,
  listadoTemas: string
): string {
  if (!hayTemasActivos) {
    return "TEMA_NO_VISTO: Tu profesor todavía no ha subido temas para esta materia en EduBot. Avísale para que pueda activarlos y así pueda ayudarte con tus dudas.";
  }
  return `TEMA_NO_VISTO: Ese tema todavía no lo hemos visto en clase. Pregúntale a tu profesor cuándo lo verán, o revisa el temario del curso. Mientras tanto, puedo ayudarte con: ${listadoTemas}.`;
}
