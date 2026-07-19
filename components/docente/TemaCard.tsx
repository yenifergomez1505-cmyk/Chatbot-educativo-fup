import type { Tema } from "@/types/docente";

export function TemaCard({
  tema,
  onEditar,
  onEliminar,
}: {
  tema: Tema;
  onEditar: (tema: Tema) => void;
  onEliminar: (id: string) => void;
}) {
  return (
    <div className="bg-white border border-[#7aaed8] rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#082e56] mb-1">
            {tema.nombre}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#e0eef9] text-[#0f4c8a] text-[10px] px-2 py-0.5 rounded-full">
              {tema.materia}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                tema.activo
                  ? "bg-green-50 text-green-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {tema.activo ? "Activo" : "Borrador"}
            </span>
            <span className="text-[10px] text-[#4a8dc4]">
              {new Date(tema.creadoEn).toLocaleDateString("es-CO", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <p className="text-[11px] text-[#4a8dc4] line-clamp-2">
            {tema.contenido}
          </p>
        </div>
        <div className="flex flex-col gap-1.5 shrink-0">
          <button
            className="bg-[#e0eef9] text-[#0f4c8a] text-xs px-3 py-1.5 rounded-lg hover:bg-[#c8dff2] transition-colors"
            onClick={() => onEditar(tema)}
            type="button"
          >
            Editar
          </button>
          <button
            className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
            onClick={() => onEliminar(tema.id)}
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
