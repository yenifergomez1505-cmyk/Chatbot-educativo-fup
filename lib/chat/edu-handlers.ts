import { saveCalificacion, saveConsultaSinRespuesta } from "@/lib/db/queries";
import type { Materia } from "@/lib/materias";
import type { ChatMessage } from "@/lib/types";

function extraerTexto(parts?: Array<{ type: string; text?: string }>) {
  return parts
    ?.filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("")
    .trim();
}

/**
 * Guarda la calificación/estadística de la interacción cuando hay materia seleccionada.
 */
export async function registrarEstadisticaMateria({
  materia,
  chatId,
  userId,
  messageId,
}: {
  materia: Materia;
  chatId: string;
  userId: string;
  messageId: string;
}) {
  try {
    await saveCalificacion({
      chatId,
      userId,
      messageId,
      util: true,
      materia,
    });
  } catch (e) {
    console.error("Error guardando estadística:", e);
  }
}

/**
 * Si la IA respondió "NO_PUEDO_RESPONDER:", guarda la pregunta como
 * consulta pendiente para que el docente la responda.
 */
export async function registrarConsultaSiNoPuedeResponder({
  materia,
  chatId,
  userId,
  userMessage,
  finishedMessages,
}: {
  materia: Materia;
  chatId: string;
  userId: string;
  userMessage: ChatMessage;
  finishedMessages: Array<{
    role: string;
    parts?: Array<{ type: string; text?: string }>;
  }>;
}) {
  try {
    const lastAssistantMsg = finishedMessages
      .filter((m) => m.role === "assistant")
      .at(-1);

    const textContent = extraerTexto(lastAssistantMsg?.parts);

    if (textContent?.startsWith("NO_PUEDO_RESPONDER:")) {
      const pregunta = extraerTexto(userMessage.parts);

      await saveConsultaSinRespuesta({
        chatId,
        userId,
        pregunta: pregunta ?? "Pregunta sin texto",
        materia,
      });
    }
  } catch (e) {
    console.error("Error guardando consulta sin respuesta:", e);
  }
}
