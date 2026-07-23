import "server-only";
import { asc, count, desc, eq, inArray } from "drizzle-orm";
import { ChatbotError } from "../../errors";
import { db } from "../client";
import {
  calificacionesRespuesta,
  chat,
  consultasSinRespuesta,
  message,
  recursoGuardado,
  stream,
  type UserRole,
  user,
  vote,
} from "../schema";

export async function getAllUsers() {
  try {
    return await db
      .select({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      })
      .from(user)
      .orderBy(asc(user.email));
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to get all users");
  }
}

export async function updateUserRole(userId: string, role: UserRole) {
  try {
    return await db.update(user).set({ role }).where(eq(user.id, userId));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to update user role"
    );
  }
}

export async function deleteUser(userId: string) {
  try {
    const userChats = await db
      .select({ id: chat.id })
      .from(chat)
      .where(eq(chat.userId, userId));
    const chatIds = userChats.map((c) => c.id);
    if (chatIds.length > 0) {
      await db.delete(vote).where(inArray(vote.chatId, chatIds));
      await db.delete(message).where(inArray(message.chatId, chatIds));
      await db.delete(stream).where(inArray(stream.chatId, chatIds));
      await db.delete(chat).where(eq(chat.userId, userId));
    }
    await db.delete(recursoGuardado).where(eq(recursoGuardado.userId, userId));
    await db
      .delete(calificacionesRespuesta)
      .where(eq(calificacionesRespuesta.userId, userId));
    await db
      .delete(consultasSinRespuesta)
      .where(eq(consultasSinRespuesta.userId, userId));
    return await db.delete(user).where(eq(user.id, userId));
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to delete user");
  }
}

export async function getEstadisticas() {
  try {
    const [totalUsuariosResult] = await db
      .select({ total: count(user.id) })
      .from(user);
    const [totalConsultasResult] = await db
      .select({ total: count(message.id) })
      .from(message)
      .where(eq(message.role, "user"));
    const [votosUtilesResult] = await db
      .select({ total: count(vote.messageId) })
      .from(vote)
      .where(eq(vote.isUpvoted, true));
    const [totalVotosResult] = await db
      .select({ total: count(vote.messageId) })
      .from(vote);

    const totalVotos = Number(totalVotosResult?.total ?? 0);
    const votosUtiles = Number(votosUtilesResult?.total ?? 0);
    const promCalificacion =
      totalVotos > 0 ? Math.round((votosUtiles / totalVotos) * 5 * 10) / 10 : 0;

    const porMateria = await db
      .select({ materia: chat.materia, total: count(chat.id) })
      .from(chat)
      .groupBy(chat.materia)
      .orderBy(desc(count(chat.id)))
      .limit(5);

    const temasPopulares = porMateria
      .filter((r) => r.materia)
      .map((r) => ({ materia: r.materia as string, total: Number(r.total) }));

    return {
      totalUsuarios: Number(totalUsuariosResult?.total ?? 0),
      usuariosActivos: Number(totalUsuariosResult?.total ?? 0),
      totalConsultas: Number(totalConsultasResult?.total ?? 0),
      promCalificacion,
      temasPopulares,
      consultasPorMateria: temasPopulares,
      pendientes: await db
        .select({
          id: consultasSinRespuesta.id,
          pregunta: consultasSinRespuesta.pregunta,
          materia: consultasSinRespuesta.materia,
        })
        .from(consultasSinRespuesta)
        .where(eq(consultasSinRespuesta.respondida, false))
        .orderBy(desc(consultasSinRespuesta.creadoEn))
        .limit(20),
      periodo: new Date().toLocaleDateString("es-CO", {
        month: "long",
        year: "numeric",
      }),
    };
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get estadisticas"
    );
  }
}
