import { useCallback, useState } from "react";
import { toast } from "sonner";
import { fetchConsultasAdmin, responderConsultaAdmin } from "@/lib/api/admin";
import type { ConsultaAdmin } from "@/types/admin";

export function useAdminConsultas() {
  const [consultas, setConsultas] = useState<ConsultaAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [respuesta, setRespuesta] = useState<Record<string, string>>({});

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchConsultasAdmin();
      setConsultas(data);
    } catch {
      toast.error("Error al cargar consultas");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleResponder = async (consultaId: string) => {
    const texto = respuesta[consultaId];
    if (!texto?.trim()) {
      toast.error("Escribe una respuesta");
      return;
    }
    try {
      await responderConsultaAdmin(consultaId, texto);
      toast.success("Respuesta enviada");
      setConsultas((prev) =>
        prev.map((c) =>
          c.id === consultaId
            ? { ...c, respondida: true, respuestaDocente: texto }
            : c
        )
      );
      setRespuesta((prev) => ({ ...prev, [consultaId]: "" }));
    } catch {
      toast.error("Error al responder");
    }
  };

  return {
    consultas,
    loading,
    respuesta,
    setRespuesta,
    cargar,
    handleResponder,
  };
}
