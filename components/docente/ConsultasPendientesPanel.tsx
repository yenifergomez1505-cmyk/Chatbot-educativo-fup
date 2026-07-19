import Link from "next/link";
import type { Consulta } from "@/types/docente";
import { ConsultaPendienteCard } from "./ConsultaPendienteCard";

export function ConsultasPendientesPanel({
  pendientes,
}: {
  pendientes: Consulta[];
}) {
  return (
    <div className="bg-white border border-[#7aaed8] rounded-xl p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-[#082e56]">
          Consultas sin respuesta IA
        </span>
        <span className="bg-red-50 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-semibold">
          {pendientes.length} pendientes
        </span>
      </div>

      {pendientes.length === 0 ? (
        <div className="text-center py-6 text-[#4a8dc4] text-xs">
          No hay consultas pendientes
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {pendientes.slice(0, 3).map((c) => (
            <ConsultaPendienteCard consulta={c} key={c.id} />
          ))}
        </div>
      )}

      {pendientes.length > 3 && (
        <div className="text-center mt-3">
          <Link
            className="text-xs text-[#0f4c8a] hover:underline"
            href="/docente/consultas"
          >
            Ver todas ({pendientes.length}) →
          </Link>
        </div>
      )}
    </div>
  );
}
