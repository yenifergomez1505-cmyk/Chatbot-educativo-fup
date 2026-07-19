import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Recurso } from "@/types/recursos";
import {
  MATERIA_COLORS_RECURSOS,
  MATERIA_LABELS_RECURSOS,
} from "@/types/recursos";

export function RecursoCard({
  recurso,
  onEliminar,
}: {
  recurso: Recurso;
  onEliminar: (id: string) => void;
}) {
  const router = useRouter();

  return (
    <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
              MATERIA_COLORS_RECURSOS[recurso.materia] ??
              "bg-muted text-muted-foreground border-border"
            }`}
          >
            {MATERIA_LABELS_RECURSOS[recurso.materia] ?? recurso.materia}
          </span>
          {recurso.etiqueta && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
              {recurso.etiqueta}
            </span>
          )}
        </div>
        <button
          className="text-muted-foreground hover:text-destructive transition-colors"
          onClick={() => onEliminar(recurso.id)}
          title="Eliminar recurso"
          type="button"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>

      <p className="text-sm text-foreground leading-relaxed line-clamp-4 whitespace-pre-wrap">
        {recurso.contenido}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {new Date(recurso.creadoEn).toLocaleDateString("es-CO", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <button
          className="text-xs text-primary hover:underline"
          onClick={() => router.push(`/chat/${recurso.chatId}`)}
          type="button"
        >
          Ver conversación →
        </button>
      </div>
    </div>
  );
}
