import { BarraProgreso } from "@/components/docente/BarraProgreso";
import { StatCard } from "@/components/docente/StatCard";
import { getEstadisticas } from "@/lib/db/queries";

export default async function EstadisticasPage() {
  const stats = await getEstadisticas();
  const maxConsultas = Math.max(...stats.temasPopulares.map((t) => t.total), 1);

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-[#082e56]">
          Estadísticas de mis materias
        </h1>
        <p className="text-xs text-[#1a6ab5] mt-0.5">{stats.periodo}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard
          color="text-[#0f4c8a]"
          label="Consultas totales"
          numero={stats.totalConsultas}
        />
        <StatCard
          color="text-[#0f4c8a]"
          label="Estudiantes activos"
          numero={stats.totalUsuarios}
        />
        <StatCard
          color="text-amber-700"
          label="Satisfacción IA"
          numero={`${stats.promCalificacion}/5`}
        />
      </div>

      <div className="bg-white border border-[#7aaed8] rounded-xl p-4 mb-4">
        <h2 className="text-sm font-semibold text-[#082e56] mb-4">
          Temas más consultados
        </h2>
        {stats.temasPopulares.length === 0 ? (
          <div className="text-center py-6 text-[#4a8dc4] text-xs">
            No hay datos disponibles aún
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {stats.temasPopulares.map((t) => (
              <BarraProgreso
                color="bg-[#0f4c8a]"
                key={t.materia}
                materia={t.materia}
                maximo={maxConsultas}
                total={t.total}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-[#7aaed8] rounded-xl p-4">
        <h2 className="text-sm font-semibold text-[#082e56] mb-4">
          Consultas por materia
        </h2>
        {stats.consultasPorMateria.length === 0 ? (
          <div className="text-center py-6 text-[#4a8dc4] text-xs">
            No hay datos disponibles aún
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {stats.consultasPorMateria.map((m) => (
              <BarraProgreso
                color="bg-[#1a6ab5]"
                key={m.materia}
                materia={m.materia}
                maximo={maxConsultas}
                total={m.total}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
