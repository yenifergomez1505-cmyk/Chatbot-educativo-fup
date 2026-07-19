import type { Recurso } from "@/types/recursos";

export async function fetchRecursos(): Promise<Recurso[]> {
  const res = await fetch("/api/auth/recursos");
  if (!res.ok) {
    throw new Error("Error al cargar los recursos");
  }
  return res.json();
}

export async function eliminarRecurso(id: string): Promise<void> {
  const res = await fetch(`/api/auth/recursos?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error al eliminar el recurso");
  }
}
