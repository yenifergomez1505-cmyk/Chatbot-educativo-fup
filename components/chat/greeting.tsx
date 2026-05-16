"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MATERIAS = [
  {
    id: "poo",
    nombre: "POO",
    subtitulo: "Clases · Herencia · Polimorfismo",
    ejemplos: [
      {
        etiqueta: "Herencia",
        codigo: "class Estudiante extends Persona {\n  int codigo;\n}",
      },
      {
        etiqueta: "Encapsulamiento",
        codigo:
          "private String nombre;\npublic String getNombre() {\n  return nombre;\n}",
      },
      {
        etiqueta: "Polimorfismo",
        codigo: "Persona p = new Estudiante();\np.saludar();",
      },
    ],
  },
  {
    id: "estructura-de-datos",
    nombre: "Estructura de Datos",
    subtitulo: "Listas · Árboles · Grafos · Sorting",
    ejemplos: [
      {
        etiqueta: "Lista enlazada",
        codigo: "class Nodo {\n  int dato;\n  Nodo siguiente;\n}",
      },
      {
        etiqueta: "Pila (Stack)",
        codigo:
          "Stack<Integer> pila = new Stack<>();\npila.push(1);\npila.pop();",
      },
      {
        etiqueta: "Árbol binario",
        codigo: "class Nodo {\n  int dato;\n  Nodo izq, der;\n}",
      },
    ],
  },
  {
    id: "ingenieria-de-software",
    nombre: "Ingeniería de Software I",
    subtitulo: "Ciclos de vida · Requerimientos · Diseño",
    ejemplos: [
      {
        etiqueta: "Requerimiento funcional",
        codigo: "RF01: El sistema debe permitir\nel registro de usuarios.",
      },
      {
        etiqueta: "Ciclo de vida",
        codigo: "Análisis → Diseño →\nImplementación → Pruebas",
      },
      {
        etiqueta: "Caso de uso",
        codigo: "Actor → [Registrarse]\nActor → [Iniciar sesión]",
      },
    ],
  },
] as const;

type MateriaId = (typeof MATERIAS)[number]["id"];

const PREGUNTA_INICIAL: Record<MateriaId, string> = {
  poo: "Explícame qué es la programación orientada a objetos",
  "estructura-de-datos": "Explícame qué es una lista enlazada",
  "ingenieria-de-software": "¿Qué es la ingeniería de software?",
};

export const Greeting = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<MateriaId | null>(null);

  const materiaSeleccionada = MATERIAS.find((m) => m.id === selected) ?? null;

  const handleIniciar = () => {
    if (!selected) return;
    const pregunta = PREGUNTA_INICIAL[selected];
    router.push(`/?query=${encodeURIComponent(pregunta)}&materia=${selected}`);
  };

  const handlePreguntarEjemplo = (etiqueta: string) => {
    if (!selected) return;
    const pregunta = `Explícame "${etiqueta}" con un ejemplo completo en código Java`;
    router.push(`/?query=${encodeURIComponent(pregunta)}&materia=${selected}`);
  };

  return (
    <div className="flex flex-col items-center px-4 gap-6">
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
        className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        {MATERIAS.map((materia) => {
          const isSelected = selected === materia.id;
          return (
            <button
              className={`rounded-2xl border-2 p-5 text-left transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? "border-primary bg-secondary shadow-md"
                  : "border-border bg-card hover:border-primary/50"
              }`}
              key={materia.id}
              onClick={() => setSelected(materia.id)}
              type="button"
            >
              <h3
                className={`font-semibold text-base ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}
              >
                {materia.nombre}
              </h3>
              <p
                className={`mt-1 text-xs font-medium ${
                  isSelected ? "text-edubot-medium" : "text-muted-foreground"
                }`}
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
        })}
      </motion.div>

      {/* Ejemplos predefinidos — solo cuando hay materia seleccionada */}
      <AnimatePresence mode="wait">
        {materiaSeleccionada && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl"
            exit={{ opacity: 0, y: -6 }}
            initial={{ opacity: 0, y: 10 }}
            key={materiaSeleccionada.id}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-muted-foreground mb-3 font-medium">
              💡 Ejemplos rápidos — haz clic para preguntar al asistente:
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {materiaSeleccionada.ejemplos.map((ej) => (
                <button
                  className="text-left rounded-xl border border-border bg-card p-3 hover:border-primary/60 hover:shadow-sm transition-all duration-200 group"
                  key={ej.etiqueta}
                  onClick={() => handlePreguntarEjemplo(ej.etiqueta)}
                  type="button"
                >
                  <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-primary border border-border mb-2">
                    {ej.etiqueta}
                  </span>
                  <code className="block text-[11px] font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap group-hover:text-primary transition-colors">
                    {ej.codigo}
                  </code>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Iniciar conversación */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button
          className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm transition-all duration-200 ${
            selected
              ? "bg-primary text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          disabled={!selected}
          onClick={handleIniciar}
          type="button"
        >
          Iniciar conversación →
        </button>
      </motion.div>
    </div>
  );
};
