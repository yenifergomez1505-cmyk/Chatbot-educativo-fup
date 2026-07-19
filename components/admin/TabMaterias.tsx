import { CodeIcon, DatabaseIcon, LayersIcon } from "lucide-react";
import type { ComponentType } from "react";

const MATERIAS_CONFIG = [
  {
    id: "poo",
    nombre: "Programación Orientada a Objetos",
    descripcion:
      "Clases, herencia, polimorfismo, encapsulamiento y abstracción.",
    icon: CodeIcon,
  },
  {
    id: "estructura-de-datos",
    nombre: "Estructura de Datos",
    descripcion: "Listas, pilas, colas, árboles, grafos y algoritmos.",
    icon: DatabaseIcon,
  },
  {
    id: "ingenieria-de-software",
    nombre: "Ingeniería de Software I",
    descripcion:
      "Ciclos de vida, metodologías ágiles, requerimientos y diseño.",
    icon: LayersIcon,
  },
];

export function TabMaterias({
  materiasActivas,
  onToggle,
}: {
  materiasActivas: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#7aaed8] shadow-sm p-5">
      <h2 className="font-semibold text-sm text-[#082e56] mb-1">
        Configurar materias
      </h2>
      <p className="text-xs text-[#1a6ab5] mb-5">
        Activa o desactiva las materias disponibles para los estudiantes.
      </p>
      <div className="space-y-4">
        {MATERIAS_CONFIG.map((m) => {
          const Icon = m.icon as ComponentType<{ className?: string }>;
          return (
            <div
              className="flex items-center justify-between rounded-xl border border-[#c8dff2] px-5 py-4 hover:bg-[#e0eef9]/50 transition-colors"
              key={m.id}
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-[#e0eef9] flex items-center justify-center">
                  <Icon className="size-5 text-[#0f4c8a]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#082e56]">
                    {m.nombre}
                  </p>
                  <p className="text-xs text-[#4a8dc4]">{m.descripcion}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    materiasActivas[m.id]
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {materiasActivas[m.id] ? "Activa" : "Inactiva"}
                </span>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    materiasActivas[m.id] ? "bg-[#0f4c8a]" : "bg-[#c8dff2]"
                  }`}
                  onClick={() => onToggle(m.id)}
                  type="button"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      materiasActivas[m.id] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
