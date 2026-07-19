import type { Materia } from "@/types/chat-materias";

export function MateriaCard({
  materia,
  isSelected,
  onSelect,
}: {
  materia: Materia;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      className={`rounded-2xl border-2 p-5 text-left transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "border-primary bg-secondary shadow-md"
          : "border-border bg-card hover:border-primary/50"
      }`}
      onClick={() => onSelect(materia.id)}
      type="button"
    >
      <h3
        className={`font-semibold text-base ${isSelected ? "text-primary" : "text-foreground"}`}
      >
        {materia.nombre}
      </h3>
      <p
        className={`mt-1 text-xs font-medium ${isSelected ? "text-edubot-medium" : "text-muted-foreground"}`}
      >
        {materia.subtitulo}
      </p>
      {isSelected && (
        <p className="mt-2 text-xs text-primary font-semibold">
          ✓ Seleccionada
        </p>
      )}
    </button>
  );
}
