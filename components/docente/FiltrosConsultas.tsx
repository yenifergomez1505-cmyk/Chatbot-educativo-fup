import type { FiltroEstadoConsulta } from "@/types/docente";

export function FiltrosConsultas({
  filtroMateria,
  onMateriaChange,
  filtroEstado,
  onEstadoChange,
}: {
  filtroMateria: string;
  onMateriaChange: (v: string) => void;
  filtroEstado: FiltroEstadoConsulta;
  onEstadoChange: (v: FiltroEstadoConsulta) => void;
}) {
  return (
    <div className="flex gap-3 mb-4">
      <select
        className="flex-1 bg-white border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
        onChange={(e) => onMateriaChange(e.target.value)}
        value={filtroMateria}
      >
        <option value="">Todas las materias</option>
        <option value="poo">POO</option>
        <option value="estructura-de-datos">Estructura de Datos</option>
        <option value="ingenieria-de-software">Ingeniería de Software I</option>
        <option value="sin-materia">Sin materia</option>
      </select>
      <select
        className="flex-1 bg-white border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
        onChange={(e) => onEstadoChange(e.target.value as FiltroEstadoConsulta)}
        value={filtroEstado}
      >
        <option value="pendientes">Sin respuesta</option>
        <option value="respondidas">Respondidas</option>
        <option value="todas">Todas</option>
      </select>
    </div>
  );
}
