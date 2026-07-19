import type { Estadisticas } from "@/types/admin";
import { MATERIA_LABELS_ADMIN } from "@/types/admin";

export function TabEstadisticas({
  estadisticas,
}: {
  estadisticas: Estadisticas;
}) {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-[#7aaed8] shadow-sm p-5">
        <h2 className="font-semibold text-sm text-[#082e56] mb-4">
          Temas más consultados
        </h2>
        {estadisticas.consultasPorMateria.length === 0 ? (
          <p className="text-sm text-[#1a6ab5] text-center py-8">
            No hay datos aún
          </p>
        ) : (
          <div className="space-y-3">
            {estadisticas.consultasPorMateria.map((item) => (
              <div className="flex items-center gap-4" key={item.materia}>
                <span className="text-sm w-48 shrink-0 text-[#082e56]">
                  {MATERIA_LABELS_ADMIN[item.materia] ?? item.materia}
                </span>
                <div className="flex-1 h-2 bg-[#e0eef9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0f4c8a] rounded-full"
                    style={{
                      width: `${Math.min(100, (Number(item.total) / Math.max(1, Number(estadisticas.totalConsultas))) * 100)}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-[#1a6ab5] w-8 text-right">
                  {item.total}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-[#7aaed8] shadow-sm p-5">
        <h2 className="font-semibold text-sm text-[#082e56] mb-4">
          Consultas pendientes de respuesta docente
        </h2>
        {(estadisticas.pendientes ?? []).length === 0 ? (
          <p className="text-sm text-[#1a6ab5] text-center py-6">
            No hay consultas pendientes 🎉
          </p>
        ) : (
          <div className="space-y-3">
            {estadisticas.pendientes.map((c) => (
              <div
                className="flex items-center justify-between rounded-lg border border-[#c8dff2] px-4 py-3"
                key={c.id}
              >
                <div>
                  <p className="text-sm font-medium text-[#082e56]">
                    {c.pregunta}
                  </p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#e0eef9] text-[#0f4c8a] font-medium mt-1 inline-block">
                    {c.materia
                      ? (MATERIA_LABELS_ADMIN[c.materia] ?? c.materia)
                      : "Sin materia"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
