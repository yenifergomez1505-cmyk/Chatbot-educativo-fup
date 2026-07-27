import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db } from "../client";
import { temaConocimiento } from "../schema";

export async function getTemasConocimiento() {
  return await db
    .select()
    .from(temaConocimiento)
    .orderBy(desc(temaConocimiento.creadoEn));
}

export async function getTemasActivosPorMateria(materia: string) {
  return await db
    .select()
    .from(temaConocimiento)
    .where(
      and(
        eq(temaConocimiento.materia, materia),
        eq(temaConocimiento.activo, true)
      )
    )
    .orderBy(desc(temaConocimiento.creadoEn));
}

export async function createTemaConocimiento({
  materia,
  nombre,
  contenido,
  activo,
  creadoPor,
}: {
  materia: string;
  nombre: string;
  contenido: string;
  activo: boolean;
  creadoPor: string;
}) {
  return await db
    .insert(temaConocimiento)
    .values({ materia, nombre, contenido, activo, creadoPor });
}

export async function updateTemaConocimiento(
  id: string,
  {
    materia,
    nombre,
    contenido,
    activo,
  }: { materia: string; nombre: string; contenido: string; activo: boolean }
) {
  return await db
    .update(temaConocimiento)
    .set({ materia, nombre, contenido, activo })
    .where(eq(temaConocimiento.id, id));
}

export async function deleteTemaConocimiento(id: string) {
  return await db.delete(temaConocimiento).where(eq(temaConocimiento.id, id));
}
