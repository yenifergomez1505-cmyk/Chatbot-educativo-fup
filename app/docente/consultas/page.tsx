"use client";

import { ConsultaCard } from "@/components/docente/ConsultaCard";
import { FiltrosConsultas } from "@/components/docente/FiltrosConsultas";
import { useConsultas } from "@/hooks/useConsultas";

export default function ConsultasPage() {
  const {
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
  } = useConsultas();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-semibold text-[#082e56]">
            Consultas sin respuesta IA
          </h1>
          <p className="text-xs text-[#1a6ab5] mt-0.5">
            Responde las preguntas que el chatbot no pudo resolver
          </p>
        </div>
        <span className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full font-semibold">
          {pendientes} pendientes
        </span>
      </div>

      <FiltrosConsultas
        filtroEstado={filtroEstado}
        filtroMateria={filtroMateria}
        onEstadoChange={setFiltroEstado}
        onMateriaChange={setFiltroMateria}
      />

      {loading ? (
        <div className="text-center py-12 text-[#4a8dc4] text-sm">
          Cargando consultas...
        </div>
      ) : consultasFiltradas.length === 0 ? (
        <div className="text-center py-12 text-[#4a8dc4] text-sm">
          No hay consultas en esta categoría
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {consultasFiltradas.map((c) => (
            <ConsultaCard
              consulta={c}
              guardando={guardando}
              key={c.id}
              onCancelarRespuesta={cancelarRespuesta}
              onEnviarRespuesta={enviarRespuesta}
              onIniciarRespuesta={iniciarRespuesta}
              onSetRespuesta={setRespuesta}
              respondiendo={respondiendo}
              respuesta={respuesta}
            />
          ))}
        </div>
      )}
    </div>
  );
}
