"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const materias = [
  {
    id: "poo",
    nombre: "POO",
    subtitulo: "Clases · Herencia · Polimorfismo",
    descripcion: "Programación Orientada a Objetos",
  },
  {
    id: "estructura-de-datos",
    nombre: "Estructura de Datos",
    subtitulo: "Listas · Árboles · Grafos · Sorting",
    descripcion: "Arreglos, pilas, colas y algoritmos",
  },
  {
    id: "ingenieria-de-software",
    nombre: "Ingeniería de Software I",
    subtitulo: "Ciclos de vida · Requerimientos · Diseño",
    descripcion: "UML, requisitos y metodologías",
  },
] as const;

type MateriaId = (typeof materias)[number]["id"];

export const Greeting = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<MateriaId | null>(null);

  const handleIniciar = () => {
    if (!selected) return;

    const preguntas: Record<MateriaId, string> = {
      poo: "Explícame qué es la programación orientada a objetos",
      "estructura-de-datos": "Explícame qué es una lista enlazada",
      "ingenieria-de-software": "¿Qué es la ingeniería de software?",
    };

    const pregunta = preguntas[selected];
    const encoded = encodeURIComponent(pregunta);
    router.push(`/chat/new?prompt=${encoded}&materia=${selected}`);
  };

  return (
    <div className="flex flex-col items-center px-4 gap-8">
      {/* Título */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-semibold text-2xl tracking-tight text-foreground md:text-3xl"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Selecciona una materia para comenzar
      </motion.div>

      {/* Tarjetas de materias */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3"
      >
        {materias.map((materia) => {
          const isSelected = selected === materia.id;
          return (
            <button
              key={materia.id}
              type="button"
              onClick={() => setSelected(materia.id)}
              className={`rounded-2xl border-2 p-5 text-left transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md"
                  : "border-border bg-card hover:border-blue-300"
              }`}
            >
              <h3 className={`font-semibold text-base ${isSelected ? "text-blue-700 dark:text-blue-400" : "text-foreground"}`}>
                {materia.nombre}
              </h3>
              <p className={`mt-1 text-xs font-medium ${isSelected ? "text-blue-500" : "text-muted-foreground"}`}>
                {materia.subtitulo}
              </p>
              {isSelected && (
                <p className="mt-2 text-xs text-blue-500 font-semibold">
                  ✓ Seleccionada
                </p>
              )}
            </button>
          );
        })}
      </motion.div>

      {/* Botón Iniciar conversación */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button
          type="button"
          onClick={handleIniciar}
          disabled={!selected}
          className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm transition-all duration-200 ${
            selected
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          Iniciar conversación →
        </button>
      </motion.div>
    </div>
  );
};