import { getEstadisticas } from "@/lib/db/queries";

export default async function EstadisticasPage() {
  const stats = await getEstadisticas();

  const maxConsultas = Math.max(...stats.temasPopulares.map((t) => t.count), 1);

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-[#082e56]">
          Estadísticas de mis materias
        </h1>
        <p className="text-xs text-[#1a6ab5] mt-0.5">{stats.periodo}</p>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-[#c8dff2] rounded-xl px-4 py-3 text-center">
          <div className="text-2xl font-bold text-[#0f4c8a]">
            {stats.totalConsultas}
          </div>
          <div className="text-[10px] text-[#1a6ab5] mt-1">
            Consultas totales
          </div>
        </div>
        <div className="bg-[#c8dff2] rounded-xl px-4 py-3 text-center">
          <div className="text-2xl font-bold text-[#0f4c8a]">
            {stats.totalUsuarios}
          </div>
          <div className="text-[10px] text-[#1a6ab5] mt-1">
            Estudiantes activos
          </div>
        </div>
        <div className="bg-[#c8dff2] rounded-xl px-4 py-3 text-center">
          <div className="text-2xl font-bold text-amber-700">
            {stats.promCalificacion}/5
          </div>
          <div className="text-[10px] text-[#1a6ab5] mt-1">Satisfacción IA</div>
        </div>
      </div>

      {/* Temas más consultados */}
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
              <div key={t.tema} className="flex items-center gap-3">
                <div className="w-36 text-xs text-[#082e56] truncate shrink-0">
                  {t.tema}
                </div>
                <div className="flex-1 bg-[#e0eef9] rounded-full h-2">
                  <div
                    className="bg-[#0f4c8a] h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.round((t.count / maxConsultas) * 100)}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-[#4a8dc4] w-8 text-right shrink-0">
                  {t.count}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consultas por materia */}
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
              <div key={m.tema} className="flex items-center gap-3">
                <div className="w-36 text-xs text-[#082e56] truncate shrink-0">
                  {m.tema}
                </div>
                <div className="flex-1 bg-[#e0eef9] rounded-full h-2">
                  <div
                    className="bg-[#1a6ab5] h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.round((m.count / maxConsultas) * 100)}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-[#4a8dc4] w-8 text-right shrink-0">
                  {m.count}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}