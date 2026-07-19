import type { Perfil } from "@/types/perfil";

export async function fetchPerfil(): Promise<Perfil> {
  const res = await fetch("/api/auth/perfil");
  if (!res.ok) {
    throw new Error("Error al cargar el perfil");
  }
  return res.json();
}

export async function actualizarPerfil(datos: {
  name: string;
  image?: string;
  password?: string;
  currentPassword?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("/api/auth/perfil", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  const data = await res.json();
  if (!res.ok) {
    return { ok: false, error: data.error ?? "Error al guardar" };
  }
  return { ok: true };
}
