import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchConsultas, responderConsulta } from "@/lib/api/docente";
import type { Consulta, FiltroEstadoConsulta } from "@/types/docente";

export function useConsultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMateria, setFiltroMateria] = useState("");
  const [filtroEstado, setFiltroEstado] =
    useState<FiltroEstadoConsulta>("pendientes");
  const [respondiendo, setRespondiendo] = useState<string | null>(null);
  const [respuesta, setRespuesta] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cargarConsultas = async () => {
    setLoading(true);
    try {
      const todas = filtroEstado === "todas" || filtroEstado === "respondidas";
      const data = await fetchConsultas(filtroMateria, todas);
      setConsultas(data);
    } catch {
      toast.error("Error al cargar consultas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarConsultas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroMateria, filtroEstado]);

  const consultasFiltradas = consultas.filter((c) => {
    if (filtroEstado === "pendientes") return c.respondida === false;
    if (filtroEstado === "respondidas") return c.respondida === true;
    return true;
  });

  const pendientes = consultas.filter((c) => !c.respondida).length;

  const iniciarRespuesta = (id: string) => {
    setRespondiendo(id);
    setRespuesta("");
  };

  const cancelarRespuesta = () => {
    setRespondiendo(null);
    setRespuesta("");
  };

  const enviarRespuesta = async (id: string) => {
    if (!respuesta.trim()) {
      toast.error("Escribe una respuesta");
      return;
    }
    setGuardando(true);
    try {
      await responderConsulta(id, respuesta.trim());
      toast.success("Respuesta publicada correctamente");
      setRespondiendo(null);
      setRespuesta("");
      await cargarConsultas();
    } catch {
      toast.error("Error al guardar la respuesta");
    } finally {
      setGuardando(false);
    }
  };

  return {
    consultasFiltradas,
    loading,
    pendientes,
    filtroMateria,
    setFiltroMateria,
    filtroEstado,
    setFiltroEstado,
    respondiendo,
    respuesta,
    setRespuesta,
    guardando,
    iniciarRespuesta,
    cancelarRespuesta,
    enviarRespuesta,
  };
}
