import { MATERIAS_CONOCIMIENTO } from "@/types/docente";

export function FiltrosConocimiento({
  busqueda,
  onBusquedaChange,
  filtroMateria,
  onMateriaChange,
  filtroFecha,
  onFechaChange,
  hayFiltrosActivos,
  onLimpiar,
}: {
  busqueda: string;
  onBusquedaChange: (v: string) => void;
  filtroMateria: string;
  onMateriaChange: (v: string) => void;
  filtroFecha: string;
  onFechaChange: (v: string) => void;
  hayFiltrosActivos: boolean;
  onLimpiar: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a8dc4] text-xs">
          🔍
        </span>
        <input
          className="w-full bg-white border border-[#7aaed8] rounded-lg pl-8 pr-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
          onChange={(e) => onBusquedaChange(e.target.value)}
          placeholder="Buscar por nombre o contenido..."
          type="text"
          value={busqueda}
        />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="sr-only" htmlFor="filtro-materia">
            Filtrar por materia
          </label>
          <select
            className="w-full bg-white border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
            id="filtro-materia"
            onChange={(e) => onMateriaChange(e.target.value)}
            value={filtroMateria}
          >
            <option value="">Todas las materias</option>
            {MATERIAS_CONOCIMIENTO.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="sr-only" htmlFor="filtro-fecha">
            Filtrar por fecha
          </label>
          <input
            className="w-full bg-white border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
            id="filtro-fecha"
            onChange={(e) => onFechaChange(e.target.value)}
            type="date"
            value={filtroFecha}
          />
        </div>

        {hayFiltrosActivos && (
          <button
            className="bg-[#c8dff2] text-[#082e56] text-xs px-3 py-2 rounded-lg hover:bg-[#7aaed8] transition-colors shrink-0"
            onClick={onLimpiar}
            type="button"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
