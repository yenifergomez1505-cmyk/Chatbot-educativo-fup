import type { MateriaIndice } from "@/types/materias-indice";

export function TabsMaterias({
  materias,
  materiaActivaId,
  onSeleccionar,
}: {
  materias: MateriaIndice[];
  materiaActivaId: string;
  onSeleccionar: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {materias.map((m) => (
        <button
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            materiaActivaId === m.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground border-border hover:border-primary/50"
          }`}
          key={m.id}
          onClick={() => onSeleccionar(m.id)}
          type="button"
        >
          {m.emoji} {m.nombre}
        </button>
      ))}
    </div>
  );
}
