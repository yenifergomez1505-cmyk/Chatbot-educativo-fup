import { MessageSquareIcon } from "lucide-react";
import type { ConsultaAdmin } from "@/types/admin";
import { MATERIA_LABELS_ADMIN } from "@/types/admin";

export function TabConsultas({
  consultas,
  respuesta,
  onSetRespuesta,
  onResponder,
}: {
  consultas: ConsultaAdmin[];
  respuesta: Record<string, string>;
  onSetRespuesta: (id: string, texto: string) => void;
  onResponder: (id: string) => void;
}) {
  if (consultas.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#7aaed8] p-10 text-center">
        <MessageSquareIcon className="size-10 text-[#7aaed8] mx-auto mb-2" />
        <p className="text-[#1a6ab5] text-sm">No hay consultas pendientes</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {consultas.map((c) => (
        <div
          className="bg-white rounded-xl border border-[#7aaed8] p-4 space-y-3 shadow-sm"
          key={c.id}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#e0eef9] text-[#0f4c8a] font-medium">
              {MATERIA_LABELS_ADMIN[c.materia] ?? c.materia}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                c.respondida
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {c.respondida ? "✓ Respondida" : "Pendiente"}
            </span>
          </div>
          <p className="text-sm font-medium text-[#082e56]">{c.pregunta}</p>
          {!c.respondida && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
              Esta consulta debe ser respondida por el docente desde su panel.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
