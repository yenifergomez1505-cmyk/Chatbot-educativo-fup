import { recursoGuardado } from "./schema";
import "server-only";

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  gte,
  inArray,
  lt,
  type SQL,
} from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { ArtifactKind } from "@/components/chat/artifact";
import type { VisibilityType } from "@/components/chat/visibility-selector";
import { ChatbotError } from "../errors";
import { generateUUID } from "../utils";
import {
  type Chat,
  calificacionesRespuesta,
  chat,
  consultasSinRespuesta,
  type DBMessage,
  document,
  message,
  type Suggestion,
  stream,
  suggestion,
  type User,
  type UserRole,
  user,
  vote,
} from "./schema";
import { generateHashedPassword } from "./utils";

const client = postgres(process.env.POSTGRES_URL ?? "");
const db = drizzle(client);

export async function getUser(email: string): Promise<User[]> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get user by email"
    );
  }
}

export async function createUser(
  email: string,
  password: string,
  role: UserRole = "estudiante",
  name?: string
) {
  const hashedPassword = generateHashedPassword(password);

  try {
    return await db
      .insert(user)
      .values({ email, password: hashedPassword, role, name: name || null });
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to create user");
  }
}

export async function createGuestUser() {
  const email = `guest-${Date.now()}`;
  const password = generateHashedPassword(generateUUID());

  try {
    return await db.insert(user).values({ email, password }).returning({
      id: user.id,
      email: user.email,
    });
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to create guest user"
    );
  }
}

// ✅ ACTUALIZADO: ahora recibe materia opcional
export async function saveChat({
  id,
  userId,
  title,
  visibility,
  materia,
}: {
  id: string;
  userId: string;
  title: string;
  visibility: VisibilityType;
  materia?: string;
}) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      userId,
      title,
      visibility,
      materia: materia ?? null,
    });
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to save chat");
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(vote).where(eq(vote.chatId, id));
    await db.delete(message).where(eq(message.chatId, id));
    await db.delete(stream).where(eq(stream.chatId, id));

    const [chatsDeleted] = await db
      .delete(chat)
      .where(eq(chat.id, id))
      .returning();
    return chatsDeleted;
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to delete chat by id"
    );
  }
}

export async function deleteAllChatsByUserId({ userId }: { userId: string }) {
  try {
    const userChats = await db
      .select({ id: chat.id })
      .from(chat)
      .where(eq(chat.userId, userId));

    if (userChats.length === 0) {
      return { deletedCount: 0 };
    }

    const chatIds = userChats.map((c) => c.id);

    await db.delete(vote).where(inArray(vote.chatId, chatIds));
    await db.delete(message).where(inArray(message.chatId, chatIds));
    await db.delete(stream).where(inArray(stream.chatId, chatIds));

    const deletedChats = await db
      .delete(chat)
      .where(eq(chat.userId, userId))
      .returning();

    return { deletedCount: deletedChats.length };
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to delete all chats by user id"
    );
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;

    const query = (whereCondition?: SQL<unknown>) =>
      db
        .select()
        .from(chat)
        .where(
          whereCondition
            ? and(whereCondition, eq(chat.userId, id))
            : eq(chat.userId, id)
        )
        .orderBy(desc(chat.createdAt))
        .limit(extendedLimit);

    let filteredChats: Chat[] = [];

    if (startingAfter) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, startingAfter))
        .limit(1);

      if (!selectedChat) {
        throw new ChatbotError(
          "not_found:database",
          `Chat with id ${startingAfter} not found`
        );
      }

      filteredChats = await query(gt(chat.createdAt, selectedChat.createdAt));
    } else if (endingBefore) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, endingBefore))
        .limit(1);

      if (!selectedChat) {
        throw new ChatbotError(
          "not_found:database",
          `Chat with id ${endingBefore} not found`
        );
      }

      filteredChats = await query(lt(chat.createdAt, selectedChat.createdAt));
    } else {
      filteredChats = await query();
    }

    const hasMore = filteredChats.length > limit;

    return {
      chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
      hasMore,
    };
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get chats by user id"
    );
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    if (!selectedChat) {
      return null;
    }
    return selectedChat;
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to get chat by id");
  }
}

export async function saveMessages({ messages }: { messages: DBMessage[] }) {
  try {
    return await db.insert(message).values(messages);
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to save messages");
  }
}

export async function updateMessage({
  id,
  parts,
}: {
  id: string;
  parts: DBMessage["parts"];
}) {
  try {
    return await db.update(message).set({ parts }).where(eq(message.id, id));
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to update message");
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get messages by chat id"
    );
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: "up" | "down";
}) {
  try {
    const [existingVote] = await db
      .select()
      .from(vote)
      .where(and(eq(vote.messageId, messageId)));

    if (existingVote) {
      return await db
        .update(vote)
        .set({ isUpvoted: type === "up" })
        .where(and(eq(vote.messageId, messageId), eq(vote.chatId, chatId)));
    }
    return await db.insert(vote).values({
      chatId,
      messageId,
      isUpvoted: type === "up",
    });
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to vote message");
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await db.select().from(vote).where(eq(vote.chatId, id));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get votes by chat id"
    );
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  userId: string;
}) {
  try {
    return await db
      .insert(document)
      .values({
        id,
        title,
        kind,
        content,
        userId,
        createdAt: new Date(),
      })
      .returning();
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to save document");
  }
}

export async function updateDocumentContent({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  try {
    const docs = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(desc(document.createdAt))
      .limit(1);

    const latest = docs[0];
    if (!latest) {
      throw new ChatbotError("not_found:database", "Document not found");
    }

    return await db
      .update(document)
      .set({ content })
      .where(and(eq(document.id, id), eq(document.createdAt, latest.createdAt)))
      .returning();
  } catch (_error) {
if (_error instanceof ChatbotError) {
  throw _error;
}
throw new ChatbotError(
  "bad_request:database",
  "Failed to update document content"
);
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(asc(document.createdAt));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get documents by id"
    );
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const [selectedDocument] = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(desc(document.createdAt));
    return selectedDocument;
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get document by id"
    );
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    await db
      .delete(suggestion)
      .where(
        and(
          eq(suggestion.documentId, id),
          gt(suggestion.documentCreatedAt, timestamp)
        )
      );

    return await db
      .delete(document)
      .where(and(eq(document.id, id), gt(document.createdAt, timestamp)))
      .returning();
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to delete documents by id after timestamp"
    );
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Suggestion[];
}) {
  try {
    return await db.insert(suggestion).values(suggestions);
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to save suggestions"
    );
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    return await db
      .select()
      .from(suggestion)
      .where(eq(suggestion.documentId, documentId));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get suggestions by document id"
    );
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    return await db.select().from(message).where(eq(message.id, id));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get message by id"
    );
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await db
      .select({ id: message.id })
      .from(message)
      .where(
        and(eq(message.chatId, chatId), gte(message.createdAt, timestamp))
      );

    const messageIds = messagesToDelete.map((m) => m.id);

    if (messageIds.length > 0) {
      await db
        .delete(vote)
        .where(
          and(eq(vote.chatId, chatId), inArray(vote.messageId, messageIds))
        );

      return await db
        .delete(message)
        .where(
          and(eq(message.chatId, chatId), inArray(message.id, messageIds))
        );
    }
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to delete messages by chat id after timestamp"
    );
  }
}

export async function updateChatVisibilityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: "private" | "public";
}) {
  try {
    return await db.update(chat).set({ visibility }).where(eq(chat.id, chatId));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to update chat visibility by id"
    );
  }
}

export async function updateChatTitleById({
  chatId,
  title,
}: {
  chatId: string;
  title: string;
}) {
  try {
    return await db.update(chat).set({ title }).where(eq(chat.id, chatId));
  } catch (_error) {
    return;
  }
}

export async function getMessageCountByUserId({
  id,
  differenceInHours,
}: {
  id: string;
  differenceInHours: number;
}) {
  try {
    const cutoffTime = new Date(
      Date.now() - differenceInHours * 60 * 60 * 1000
    );

    const [stats] = await db
      .select({ count: count(message.id) })
      .from(message)
      .innerJoin(chat, eq(message.chatId, chat.id))
      .where(
        and(
          eq(chat.userId, id),
          gte(message.createdAt, cutoffTime),
          eq(message.role, "user")
        )
      )
      .execute();

    return stats?.count ?? 0;
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get message count by user id"
    );
  }
}

export async function createStreamId({
  streamId,
  chatId,
}: {
  streamId: string;
  chatId: string;
}) {
  try {
    await db
      .insert(stream)
      .values({ id: streamId, chatId, createdAt: new Date() });
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to create stream id"
    );
  }
}

export async function getStreamIdsByChatId({ chatId }: { chatId: string }) {
  try {
    const streamIds = await db
      .select({ id: stream.id })
      .from(stream)
      .where(eq(stream.chatId, chatId))
      .orderBy(asc(stream.createdAt))
      .execute();

    return streamIds.map(({ id }) => id);
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to get stream ids by chat id"
    );
  }
}

// ── Módulo 2: Consultas sin respuesta ──

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

// ── Módulo 2: Calificaciones ──

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
  return await db.insert(calificacionesRespuesta).values({
    messageId,
    util,
    materia,
    chatId,
    userId,
  });
}

// ── Módulo 4: Recursos guardados ──

// DESPUÉS (pegar esto):
export async function saveRecurso({
  userId,
  titulo,
  descripcion,
  url,
}: {
  userId: string;
  titulo: string;
  descripcion?: string;
  url?: string;
}) {
  return await db.insert(recursoGuardado).values({
    userId,
    titulo,
    descripcion: descripcion ?? null,
    url: url ?? null,
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

// ══════════════════════════════════════════════════
// MÓDULO 5 — Administración del sistema

// ── Obtener todos los usuarios ──
export async function getAllUsers() {
  try {
    return await db
      .select({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      })
      .from(user)
      .orderBy(asc(user.email));
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to get all users");
  }
}

// ── Actualizar rol de un usuario ──
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

// ── Eliminar usuario y todo lo relacionado ──
export async function deleteUser(userId: string) {
  try {
    // 1. Obtener todos los chats del usuario
    const userChats = await db
      .select({ id: chat.id })
      .from(chat)
      .where(eq(chat.userId, userId));

    const chatIds = userChats.map((c) => c.id);

    if (chatIds.length > 0) {
      // 2. Eliminar votos
      await db.delete(vote).where(inArray(vote.chatId, chatIds));
      // 3. Eliminar mensajes
      await db.delete(message).where(inArray(message.chatId, chatIds));
      // 4. Eliminar streams
      await db.delete(stream).where(inArray(stream.chatId, chatIds));
      // 5. Eliminar chats
      await db.delete(chat).where(eq(chat.userId, userId));
    }

    // 6. Eliminar recursos guardados
    await db.delete(recursoGuardado).where(eq(recursoGuardado.userId, userId));

    // 7. Eliminar calificaciones
    await db
      .delete(calificacionesRespuesta)
      .where(eq(calificacionesRespuesta.userId, userId));

    // 8. Eliminar consultas sin respuesta
    await db
      .delete(consultasSinRespuesta)
      .where(eq(consultasSinRespuesta.userId, userId));

    // 9. Eliminar el usuario
    return await db.delete(user).where(eq(user.id, userId));
  } catch (_error) {
    throw new ChatbotError("bad_request:database", "Failed to delete user");
  }
}

// ── Estadísticas globales ──
export async function getEstadisticas() {
  try {
    const [totalUsuariosResult] = await db
      .select({ total: count(user.id) })
      .from(user);

    const [totalConsultasResult] = await db
      .select({ total: count(message.id) })
      .from(message)
      .where(eq(message.role, "user"));

    const [promedioResult] = await db
      .select({ total: count(calificacionesRespuesta.id) })
      .from(calificacionesRespuesta)
      .where(eq(calificacionesRespuesta.util, true));

    const [totalCalResult] = await db
      .select({ total: count(calificacionesRespuesta.id) })
      .from(calificacionesRespuesta);

    const totalCal = Number(totalCalResult?.total ?? 0);
    const utiles = Number(promedioResult?.total ?? 0);
    const promCalificacion =
      totalCal > 0 ? Math.round((utiles / totalCal) * 5 * 10) / 10 : 0;

    const porMateria = await db
      .select({
        materia: chat.materia,
        total: count(chat.id),
      })
      .from(chat)
      .groupBy(chat.materia)
      .orderBy(desc(count(chat.id)))
      .limit(5);

    const temasPopulares = porMateria
      .filter((r) => r.materia)
      .map((r) => ({ tema: r.materia as string, count: Number(r.total) }));

    return {
      totalUsuarios: Number(totalUsuariosResult?.total ?? 0),
      usuariosActivos: Number(totalUsuariosResult?.total ?? 0),
      totalConsultas: Number(totalConsultasResult?.total ?? 0),
      promCalificacion,
      temasPopulares,
      consultasPorMateria: temasPopulares,
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

// ── Consultas sin respuesta ──
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

// ── Responder una consulta ──
// Usa los nombres exactos de tu schema:
// respuestaDocente y respondidoEn
export async function responderConsulta(consultaId: string, respuesta: string) {
  try {
    return await db
      .update(consultasSinRespuesta)
      .set({
        respondida: true,
        respuestaDocente: respuesta, // ← nombre correcto del schema
        respondidoEn: new Date(), // ← nombre correcto del schema
      })
      .where(eq(consultasSinRespuesta.id, consultaId));
  } catch (_error) {
    throw new ChatbotError(
      "bad_request:database",
      "Failed to responder consulta"
    );
  }
}
