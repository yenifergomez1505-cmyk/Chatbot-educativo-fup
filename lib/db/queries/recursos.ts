import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db } from "../client";
import { recursoGuardado } from "../schema";

export async function saveRecurso({
  userId,
  chatId,
  messageId,
  contenido,
  materia,
  etiqueta,
}: {
  userId: string;
  chatId: string;
  messageId: string;
  contenido: string;
  materia: string;
  etiqueta?: string;
}) {
  return await db.insert(recursoGuardado).values({
    userId,
    chatId,
    messageId,
    contenido,
    materia,
    etiqueta: etiqueta ?? null,
  });
}

export async function getRecursosByUserId(userId: string) {
  return await db
    .select()
    .from(recursoGuardado)
    .where(eq(recursoGuardado.userId, userId))
    .orderBy(desc(recursoGuardado.creadoEn));
}

export async function deleteRecurso(id: string, userId: string) {
  return await db
    .delete(recursoGuardado)
    .where(and(eq(recursoGuardado.id, id), eq(recursoGuardado.userId, userId)));
}
