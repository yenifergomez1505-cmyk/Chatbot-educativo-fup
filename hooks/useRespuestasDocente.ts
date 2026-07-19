import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchRespuestasDocente } from "@/lib/api/respuestas-docente";
import type { ConsultaRespondida } from "@/types/respuestas-docente";

export function useRespuestasDocente() {
  const [consultas, setConsultas] = useState<ConsultaRespondida[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMateria, setFiltroMateria] = useState("");

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      try {
        const data = await fetchRespuestasDocente(filtroMateria);
        setConsultas(data);
      } catch {
        toast.error("Error al cargar respuestas");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [filtroMateria]);

  return { consultas, loading, filtroMateria, setFiltroMateria };
}
