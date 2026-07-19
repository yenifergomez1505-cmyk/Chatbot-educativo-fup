import Link from "next/link";
import type { Consulta } from "@/types/docente";
import { MATERIA_LABELS } from "@/types/docente";

export function ConsultaPendienteCard({ consulta }: { consulta: Consulta }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white border border-[#c8dff2] rounded-lg px-3 py-2.5">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-[#082e56] truncate">
          {consulta.pregunta}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="bg-[#e0eef9] text-[#0f4c8a] text-[10px] px-2 py-0.5 rounded-full">
            {MATERIA_LABELS[consulta.materia] ?? consulta.materia}
          </span>
          <span className="text-[10px] text-[#4a8dc4]">
            {new Date(consulta.creadoEn).toLocaleDateString("es-CO")}
          </span>
        </div>
      </div>
      <Link
        className="bg-[#0f4c8a] text-white text-[11px] px-3 py-1.5 rounded-lg hover:bg-[#082e56] transition-colors shrink-0"
        href="/docente/consultas"
      >
        Responder
      </Link>
    </div>
  );
}
