import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PREGUNTA_INICIAL, TODAS_MATERIAS } from "@/types/chat-materias";

const MATERIAS_ACTIVAS_DEFAULT: Record<string, boolean> = {
  poo: true,
  "estructura-de-datos": true,
  "ingenieria-de-software": true,
};

export function useGreeting() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [materiasActivas, setMateriasActivas] = useState<
    Record<string, boolean>
  >(MATERIAS_ACTIVAS_DEFAULT);

  useEffect(() => {
    const saved = localStorage.getItem("materiasActivas");
    if (saved) setMateriasActivas(JSON.parse(saved));
  }, []);

  const materias = TODAS_MATERIAS.filter(
    (m) => materiasActivas[m.id] !== false
  );
  const materiaSeleccionada = materias.find((m) => m.id === selected) ?? null;

  const irAlChat = (pregunta: string, materiaId: string) => {
    router.push(`/?query=${encodeURIComponent(pregunta)}&materia=${materiaId}`);
  };

  const handleIniciar = () => {
    if (!selected) return;
    irAlChat(PREGUNTA_INICIAL[selected], selected);
  };

  const handlePreguntarEjemplo = (etiqueta: string) => {
    if (!selected) return;
    const pregunta = `Explícame "${etiqueta}" con un ejemplo completo en código Java`;
    irAlChat(pregunta, selected);
  };

  return {
    materias,
    selected,
    setSelected,
    materiaSeleccionada,
    handleIniciar,
    handlePreguntarEjemplo,
  };
}
