import type { ChatMessage } from "@/lib/types";

/**
 * Busca el texto de la última pregunta del usuario anterior
 * a un mensaje del asistente en un índice dado. Se usa para
 * mostrarle al docente qué preguntó el estudiante exactamente.
 */
export function obtenerPreguntaUsuario(
  messages: ChatMessage[],
  index: number
): string | undefined {
  const mensaje = messages[index];
  if (mensaje.role !== "assistant") {
    return undefined;
  }

  const ultimoMensajeUsuario = messages
    .slice(0, index)
    .filter((m) => m.role === "user")
    .at(-1);

  if (!ultimoMensajeUsuario) {
    return undefined;
  }

  return ultimoMensajeUsuario.parts
    ?.filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join(" ")
    .trim();
}
