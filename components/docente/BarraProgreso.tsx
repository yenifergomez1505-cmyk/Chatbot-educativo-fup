import { MATERIA_LABELS } from "@/types/docente";

export function BarraProgreso({
  materia,
  total,
  maximo,
  color,
}: {
  materia: string;
  total: number;
  maximo: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-48 text-xs text-[#082e56] truncate shrink-0">
        {MATERIA_LABELS[materia] ?? materia}
      </div>
      <div className="flex-1 bg-[#e0eef9] rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all`}
          style={{ width: `${Math.round((total / maximo) * 100)}%` }}
        />
      </div>
      <div className="text-xs text-[#4a8dc4] w-8 text-right shrink-0">
        {total}
      </div>
    </div>
  );
}
