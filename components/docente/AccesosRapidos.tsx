import { BarChartIcon, BookOpenIcon } from "lucide-react";
import Link from "next/link";

export function AccesosRapidos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Link
        className="bg-white border border-[#7aaed8] rounded-xl p-4 flex items-center gap-3 hover:bg-[#e0eef9] transition-colors"
        href="/docente/conocimiento"
      >
        <div className="w-10 h-10 bg-[#e0eef9] rounded-lg flex items-center justify-center shrink-0">
          <BookOpenIcon className="size-5 text-[#0f4c8a]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-[#082e56]">
            Base de conocimiento
          </div>
          <div className="text-[11px] text-[#1a6ab5]">
            Agregar o editar temas
          </div>
        </div>
      </Link>
      <Link
        className="bg-white border border-[#7aaed8] rounded-xl p-4 flex items-center gap-3 hover:bg-[#e0eef9] transition-colors"
        href="/docente/estadisticas"
      >
        <div className="w-10 h-10 bg-[#e0eef9] rounded-lg flex items-center justify-center shrink-0">
          <BarChartIcon className="size-5 text-[#0f4c8a]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-[#082e56]">
            Estadísticas
          </div>
          <div className="text-[11px] text-[#1a6ab5]">
            Ver temas más consultados
          </div>
        </div>
      </Link>
    </div>
  );
}
