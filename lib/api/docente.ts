import type { Consulta, Tema, TemaFormValues } from "@/types/docente";

export async function fetchConsultas(
  materia: string,
  todas: boolean
): Promise<Consulta[]> {
  const params = new URLSearchParams({ tipo: "consultas" });
  if (materia !== "") {
    params.append("materia", materia);
  }
  if (todas) {
    params.append("todas", "true");
  }
  const res = await fetch(`/api/admin?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Error al cargar consultas");
  }
  return res.json();
}

export async function responderConsulta(
  consultaId: string,
  respuesta: string
): Promise<void> {
  const res = await fetch("/api/admin", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "responder",
      consultaId,
      respuesta,
    }),
  });
  if (!res.ok) {
    throw new Error("Error al guardar la respuesta");
  }
}

// ── Base de conocimiento ──
export async function fetchTemas(): Promise<Tema[]> {
  const res = await fetch("/api/docente/conocimiento");
  if (!res.ok) {
    throw new Error("Error al cargar los temas");
  }
  return res.json();
}

export async function crearTema(datos: TemaFormValues): Promise<void> {
  const res = await fetch("/api/docente/conocimiento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!res.ok) {
    throw new Error("Error al crear el tema");
  }
}

export async function editarTema(
  id: string,
  datos: TemaFormValues
): Promise<void> {
  const res = await fetch("/api/docente/conocimiento", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...datos }),
  });
  if (!res.ok) {
    throw new Error("Error al editar el tema");
  }
}

export async function eliminarTema(id: string): Promise<void> {
  const res = await fetch(`/api/docente/conocimiento?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error al eliminar el tema");
  }
}
