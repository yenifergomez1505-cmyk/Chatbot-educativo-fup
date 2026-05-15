"use client";

import type { Materia } from "@/lib/materias";

type Props = {
  selectedMateria?: Materia | null;
  onSelect: (materia: Materia) => void;
};

const materias = [
  {
    id: "poo",
    nombre: "POO",
    descripcion: "Programación Orientada a Objetos",
  },
  {
    id: "estructura-de-datos",
    nombre: "Estructura de Datos",
    descripcion: "Listas, pilas, colas y árboles",
  },
  {
    id: "ingenieria-de-software",
    nombre: "Ingeniería de Software",
    descripcion: "Requisitos, UML y metodologías",
  },
] as const;

export function MateriaSelector({
  selectedMateria,
  onSelect,
}: Props) {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
      {materias.map((materia) => (
        <button
          key={materia.id}
          type="button"
          onClick={() => onSelect(materia.id as Materia)}
          className={`rounded-2xl border p-5 text-left transition-all hover:scale-[1.02] ${
            selectedMateria === materia.id
              ? "border-primary bg-primary/10"
              : "border-border bg-card"
          }`}
        >
          <h3 className="font-semibold text-lg">
            {materia.nombre}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {materia.descripcion}
          </p>
        </button>
      ))}
    </div>
  );
}