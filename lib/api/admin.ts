import type {
  ConsultaAdmin,
  Estadisticas,
  NuevoUsuario,
  Usuario,
} from "@/types/admin";

export async function fetchUsuarios(): Promise<Usuario[]> {
  const res = await fetch("/api/admin");
  if (res.status === 403) throw new Error("forbidden");
  if (!res.ok) throw new Error("Error al cargar usuarios");
  return res.json();
}

export async function fetchEstadisticas(): Promise<Estadisticas> {
  const res = await fetch("/api/admin?tipo=estadisticas");
  if (!res.ok) throw new Error("Error al cargar estadísticas");
  return res.json();
}

export async function fetchConsultasAdmin(): Promise<ConsultaAdmin[]> {
  const res = await fetch("/api/admin?tipo=consultas");
  if (!res.ok) throw new Error("Error al cargar consultas");
  return res.json();
}

export async function crearUsuario(usuario: NuevoUsuario): Promise<void> {
  const res = await fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
}

export async function cambiarRolUsuario(
  userId: string,
  role: string
): Promise<void> {
  const res = await fetch("/api/admin", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipo: "rol", userId, role }),
  });
  if (!res.ok) throw new Error("Error al actualizar rol");
}

export async function eliminarUsuario(userId: string): Promise<void> {
  const res = await fetch(`/api/admin?userId=${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar usuario");
}
export async function responderConsultaAdmin(
  consultaId: string,
  respuesta: string
): Promise<void> {
  const res = await fetch("/api/admin", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipo: "responder", consultaId, respuesta }),
  });
  if (!res.ok) throw new Error("Error al responder consulta");
}
