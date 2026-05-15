"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const Greeting = () => {
  const router = useRouter();

  const handleSelect = (materia: string) => {
    const preguntas = {
      poo: "Explícame qué es la programación orientada a objetos",
      "estructura-de-datos":
        "Explícame qué es una lista enlazada",
      "ingenieria-de-software":
        "¿Qué es la ingeniería de software?",
    };

    const pregunta =
      preguntas[materia as keyof typeof preguntas];

    const encoded = encodeURIComponent(pregunta);

    router.push(`/chat/new?prompt=${encoded}&materia=${materia}`);
  };

  return (
    <div className="flex flex-col items-center px-4 gap-6">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-semibold text-2xl tracking-tight text-foreground md:text-3xl"
        initial={{ opacity: 0, y: 10 }}
      >
        ¿En qué puedo ayudarte hoy?
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
      >
        Selecciona una materia para empezar.
      </motion.div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
        <button
          onClick={() => handleSelect("poo")}
          className="rounded-2xl border p-5 text-left hover:bg-muted"
        >
          <h3 className="font-semibold text-lg">POO</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Programación Orientada a Objetos
          </p>
        </button>

        <button
          onClick={() => handleSelect("estructura-de-datos")}
          className="rounded-2xl border p-5 text-left hover:bg-muted"
        >
          <h3 className="font-semibold text-lg">
            Estructura de Datos
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Listas, pilas, colas y árboles
          </p>
        </button>

        <button
          onClick={() => handleSelect("ingenieria-de-software")}
          className="rounded-2xl border p-5 text-left hover:bg-muted"
        >
          <h3 className="font-semibold text-lg">
            Ingeniería de Software
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            UML, requisitos y metodologías
          </p>
        </button>
      </div>
    </div>
  );
};