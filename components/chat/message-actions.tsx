import equal from "fast-deep-equal";
import { BookmarkIcon, HelpCircleIcon } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useCopyToClipboard } from "usehooks-ts";
import type { Vote } from "@/lib/db/schema";
import type { ChatMessage } from "@/lib/types";
import {
  MessageAction as Action,
  MessageActions as Actions,
} from "../ai-elements/message";
import { CopyIcon, PencilEditIcon, ThumbDownIcon, ThumbUpIcon } from "./icons";

export function PureMessageActions({
  chatId,
  message,
  vote,
  isLoading,
  onEdit,
}: {
  chatId: string;
  message: ChatMessage;
  vote: Vote | undefined;
  isLoading: boolean;
  onEdit?: () => void;
}) {
  const { mutate } = useSWRConfig();
  const [_, copyToClipboard] = useCopyToClipboard();

  if (isLoading) return null;

  const textFromParts = message.parts
    ?.filter((part) => part.type === "text")
    .map((part) => (part as { type: "text"; text: string }).text)
    .join("\n")
    .trim();

  const handleCopy = async () => {
    if (!textFromParts) {
      toast.error("No hay texto para copiar");
      return;
    }
    await copyToClipboard(textFromParts);
    toast.success("Copiado al portapapeles");
  };

  const handleGuardar = async () => {
    if (!textFromParts) {
      toast.error("No hay contenido para guardar");
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const materia = params.get("materia") ?? "sin-materia";
    try {
      const res = await fetch("/api/auth/recursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          messageId: message.id,
          contenido: textFromParts,
          materia,
        }),
      });
      if (!res.ok) throw new Error("Error al guardar");
      toast.success("Respuesta guardada en Mis recursos");
    } catch {
      toast.error("Error al guardar el recurso");
    }
  };

  const handlePedirAyuda = async () => {
    const params = new URLSearchParams(window.location.search);
    const materia = params.get("materia") ?? "sin-materia";
    const preguntaUsuario = textFromParts ?? "Pregunta sin texto";
    try {
      const res = await fetch("/api/auth/consultas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          messageId: message.id,
          pregunta: preguntaUsuario,
          materia,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      toast.success("Consulta enviada al docente ✅");
    } catch {
      toast.error("Error al enviar la consulta al docente");
    }
  };

  if (message.role === "user") {
    return (
      <Actions className="-mr-0.5 justify-end opacity-0 transition-opacity duration-150 group-hover/message:opacity-100">
        <div className="flex items-center gap-0.5">
          {onEdit && (
            <Action
              className="size-7 text-muted-foreground/50 hover:text-foreground"
              data-testid="message-edit-button"
              onClick={onEdit}
              tooltip="Editar"
            >
              <PencilEditIcon />
            </Action>
          )}
          <Action
            className="size-7 text-muted-foreground/50 hover:text-foreground"
            onClick={handleCopy}
            tooltip="Copiar"
          >
            <CopyIcon />
          </Action>
        </div>
      </Actions>
    );
  }

  return (
    <Actions className="-ml-0.5 opacity-0 transition-opacity duration-150 group-hover/message:opacity-100">
      {/* Copiar */}
      <Action
        className="text-muted-foreground/50 hover:text-foreground"
        onClick={handleCopy}
        tooltip="Copiar"
      >
        <CopyIcon />
      </Action>

      {/* Guardar respuesta */}
      <Action
        className="text-muted-foreground/50 hover:text-edubot-primary"
        onClick={handleGuardar}
        tooltip="Guardar en Mis recursos"
      >
        <BookmarkIcon className="size-4" />
      </Action>

      {/* Pedir ayuda al docente */}
      <Action
        className="text-muted-foreground/50 hover:text-amber-500"
        onClick={handlePedirAyuda}
        tooltip="Pedir ayuda al docente"
      >
        <HelpCircleIcon className="size-4" />
      </Action>

      {/* Útil */}
      <Action
        className="text-muted-foreground/50 hover:text-foreground"
        data-testid="message-upvote"
        disabled={vote?.isUpvoted}
        onClick={() => {
          const upvote = fetch(
            `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/vote`,
            {
              method: "PATCH",
              body: JSON.stringify({
                chatId,
                messageId: message.id,
                type: "up",
              }),
            }
          );
          toast.promise(upvote, {
            loading: "Votando...",
            success: () => {
              mutate<Vote[]>(
                `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/vote?chatId=${chatId}`,
                (currentVotes) => {
                  if (!currentVotes) return [];
                  const votesWithoutCurrent = currentVotes.filter(
                    (currentVote) => currentVote.messageId !== message.id
                  );
                  return [
                    ...votesWithoutCurrent,
                    { chatId, messageId: message.id, isUpvoted: true },
                  ];
                },
                { revalidate: false }
              );
              return "¡Marcado como útil!";
            },
            error: "Error al votar",
          });
        }}
        tooltip="Útil"
      >
        <ThumbUpIcon />
      </Action>

      {/* No útil */}
      <Action
        className="text-muted-foreground/50 hover:text-foreground"
        data-testid="message-downvote"
        disabled={vote && !vote.isUpvoted}
        onClick={() => {
          const downvote = fetch(
            `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/vote`,
            {
              method: "PATCH",
              body: JSON.stringify({
                chatId,
                messageId: message.id,
                type: "down",
              }),
            }
          );
          toast.promise(downvote, {
            loading: "Votando...",
            success: () => {
              mutate<Vote[]>(
                `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/vote?chatId=${chatId}`,
                (currentVotes) => {
                  if (!currentVotes) return [];
                  const votesWithoutCurrent = currentVotes.filter(
                    (currentVote) => currentVote.messageId !== message.id
                  );
                  return [
                    ...votesWithoutCurrent,
                    { chatId, messageId: message.id, isUpvoted: false },
                  ];
                },
                { revalidate: false }
              );
              return "Marcado como no útil";
            },
            error: "Error al votar",
          });
        }}
        tooltip="No útil"
      >
        <ThumbDownIcon />
      </Action>
    </Actions>
  );
}

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (!equal(prevProps.vote, nextProps.vote)) return false;
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    return true;
  }
);
