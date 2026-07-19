"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGreeting } from "@/hooks/useGreeting";
import { EjemplosRapidos } from "./greeting/EjemplosRapidos";
import { MateriaCard } from "./greeting/MateriaCard";

export const Greeting = () => {
  const {
    materias,
    selected,
    setSelected,
    materiaSeleccionada,
    handleIniciar,
    handlePreguntarEjemplo,
  } = useGreeting();

  return (
    <div className="flex flex-col items-center px-4 gap-6">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-semibold text-2xl tracking-tight text-foreground md:text-3xl"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Selecciona una materia para comenzar
      </motion.div>

      {materias.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground text-sm">
          No hay materias activas. El administrador debe activar al menos una
          materia.
        </div>
      ) : (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {materias.map((materia) => (
            <MateriaCard
              isSelected={selected === materia.id}
              key={materia.id}
              materia={materia}
              onSelect={setSelected}
            />
          ))}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {materiaSeleccionada && (
          <EjemplosRapidos
            key={materiaSeleccionada.id}
            materia={materiaSeleccionada}
            onPreguntar={handlePreguntarEjemplo}
          />
        )}
      </AnimatePresence>

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
