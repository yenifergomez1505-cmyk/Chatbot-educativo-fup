import { FilterIcon } from "lucide-react";
import {
  FILTROS_MATERIA_RECURSOS,
  MATERIA_LABELS_RECURSOS,
} from "@/types/recursos";

export function FiltroMateriaRecursos({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <FilterIcon className="size-4 text-muted-foreground" />
      {FILTROS_MATERIA_RECURSOS.map((m) => (
        <button
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
            value === m
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border hover:border-primary/50"
          }`}
          key={m}
          onClick={() => onChange(m)}
          type="button"
        >
          {m === "todas" ? "Todas" : MATERIA_LABELS_RECURSOS[m]}
        </button>
      ))}
    </div>
  );
}
