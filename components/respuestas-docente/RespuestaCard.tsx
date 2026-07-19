import type { ConsultaRespondida } from "@/types/respuestas-docente";
import { MATERIA_LABELS_RESPUESTAS } from "@/types/respuestas-docente";

export function RespuestaCard({ consulta }: { consulta: ConsultaRespondida }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <p className="text-xs font-semibold text-primary uppercase tracking-wide">
        Pregunta
      </p>
      <p className="text-sm font-medium text-foreground leading-relaxed">
        {consulta.pregunta}
      </p>

      <div className="flex items-center gap-2">
        <span className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0.5 rounded-full">
          {MATERIA_LABELS_RESPUESTAS[consulta.materia] ?? consulta.materia}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {new Date(consulta.creadoEn).toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-1">
          Respuesta del docente
        </p>
        <p className="text-sm text-foreground leading-relaxed border-l-2 border-primary/40 pl-2">
          {consulta.respuestaDocente}
        </p>
      </div>
    </div>
  );
}
