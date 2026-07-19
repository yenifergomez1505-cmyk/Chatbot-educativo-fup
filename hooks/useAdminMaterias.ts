import { useState } from "react";
import { toast } from "sonner";

const MATERIAS_DEFAULT: Record<string, boolean> = {
  poo: true,
  "estructura-de-datos": true,
  "ingenieria-de-software": true,
};

export function useAdminMaterias() {
  const [materiasActivas, setMateriasActivas] =
    useState<Record<string, boolean>>(MATERIAS_DEFAULT);

  const cargar = () => {
    const saved = localStorage.getItem("materiasActivas");
    if (saved) setMateriasActivas(JSON.parse(saved));
  };

  const handleToggle = (materiaId: string) => {
    const nuevas = {
      ...materiasActivas,
      [materiaId]: !materiasActivas[materiaId],
    };
    setMateriasActivas(nuevas);
    localStorage.setItem("materiasActivas", JSON.stringify(nuevas));
    toast.success(
      `Materia ${nuevas[materiaId] ? "activada" : "desactivada"} correctamente`
    );
  };

  return { materiasActivas, cargar, handleToggle };
}
