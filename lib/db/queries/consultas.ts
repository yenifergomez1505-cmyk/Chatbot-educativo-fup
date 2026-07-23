import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { ChatbotError } from "../../errors";
import { db } from "../client";
import { calificacionesRespuesta, consultasSinRespuesta } from "../schema";

export async function saveConsultaSinRespuesta({
  chatId,
  userId,
  pregunta,
  materia,
}: {
  chatId: string;
  userId: string;
  pregunta: string;
  materia: string;
}) {
  return await db.insert(consultasSinRespuesta).values({
    chatId,
    userId,
    pregunta,
    materia,
    respondida: false,
    creadoEn: new Date(),
  });
}

export async function getConsultasSinRespuesta(materia?: string) {
  try {
    const condicion = materia
      ? and(
          eq(consultasSinRespuesta.respondida, false),
          eq(consultasSinRespuesta.materia, materia)
        )
      : eq(consultasSinRespuesta.respondida, false);
    return await db
      .select()
      .from(consultasSinRespuesta)
      .where(condicion)
      .orderBy(desc(consultasSinRespuesta.creadoEn));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get consultas sin respuesta"
    );
  }
}

export async function getAllConsultas(materia?: string) {
  try {
    const condicion = materia
      ? eq(consultasSinRespuesta.materia, materia)
      : undefined;
    return await db
      .select()
      .from(consultasSinRespuesta)
      .where(condicion)
      .orderBy(desc(consultasSinRespuesta.creadoEn));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get all consultas"
    );
  }
}

export async function responderConsulta(consultaId: string, respuesta: string) {
  try {
    return await db
      .update(consultasSinRespuesta)
      .set({
        respondida: true,
        respuestaDocente: respuesta,
        respondidoEn: new Date(),
      })
      .where(eq(consultasSinRespuesta.id, consultaId));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to responder consulta"
    );
  }
}

export async function saveCalificacion({
  messageId,
  util,
  materia,
  chatId,
  userId,
}: {
  messageId: string;
  util: boolean;
  materia: string;
  chatId: string;
  userId: string;
}) {
  return await db
    .insert(calificacionesRespuesta)
    .values({ messageId, util, materia, chatId, userId });
}
