import type { Tema } from "@/types/docente";

export async function fetchTemasActivos(materia: string): Promise<Tema[]> {
  const res = await fetch(
    `/api/materias/temas-activos?materia=${encodeURIComponent(materia)}`
  );
  if (!res.ok) {
    throw new Error("Error al cargar los temas activos");
  }
  return res.json();
}
