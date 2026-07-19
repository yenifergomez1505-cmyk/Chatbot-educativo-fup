import type { ConsultaRespondida } from "@/types/respuestas-docente";

export async function fetchRespuestasDocente(
  materia: string
): Promise<ConsultaRespondida[]> {
  const params = new URLSearchParams();
  if (materia) {
    params.append("materia", materia);
  }
  const res = await fetch(`/api/respuestas-docente?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Error al cargar respuestas");
  }
  return res.json();
}
