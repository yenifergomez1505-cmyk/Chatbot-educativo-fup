import { useEffect, useState } from "react";
import { toast } from "sonner";
import { eliminarRecurso, fetchRecursos } from "@/lib/api/recursos";
import type { Recurso } from "@/types/recursos";

export function useRecursos() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMateria, setFiltroMateria] = useState<string>("todas");

  useEffect(() => {
    fetchRecursos()
      .then(setRecursos)
      .catch(() => toast.error("Error al cargar los recursos"))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id: string) => {
    try {
      await eliminarRecurso(id);
      setRecursos((prev) => prev.filter((r) => r.id !== id));
      toast.success("Recurso eliminado");
    } catch {
      toast.error("Error al eliminar el recurso");
    }
  };

  const recursosFiltrados =
    filtroMateria === "todas"
      ? recursos
      : recursos.filter((r) => r.materia === filtroMateria);

  return {
    recursos,
    recursosFiltrados,
    loading,
    filtroMateria,
    setFiltroMateria,
    handleEliminar,
  };
}
