import { useRouter } from "next/navigation";
import { useState } from "react";
import { MATERIAS_INDICE } from "@/lib/data/materias-indice";

export function useIndiceTematico() {
  const router = useRouter();
  const [materiaActivaId, setMateriaActivaId] = useState(MATERIAS_INDICE[0].id);

  const materiaActiva =
    MATERIAS_INDICE.find((m) => m.id === materiaActivaId) ?? MATERIAS_INDICE[0];

  const handlePreguntarTema = (titulo: string) => {
    const pregunta = `Explícame el tema "${titulo}" con ejemplos en código Java`;
    router.push(
      `/?query=${encodeURIComponent(pregunta)}&materia=${materiaActivaId}`
    );
  };

  return {
    materias: MATERIAS_INDICE,
    materiaActivaId,
    setMateriaActivaId,
    materiaActiva,
    handlePreguntarTema,
  };
}
