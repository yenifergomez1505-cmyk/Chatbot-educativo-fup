"use client";

import { ArrowLeftIcon, GraduationCapIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FiltroMateria } from "@/components/respuestas-docente/FiltroMateria";
import { RespuestaCard } from "@/components/respuestas-docente/RespuestaCard";
import { useRespuestasDocente } from "@/hooks/useRespuestasDocente";

export default function RespuestasDocentePage() {
  const router = useRouter();
  const { consultas, loading, filtroMateria, setFiltroMateria } =
    useRespuestasDocente();

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="bg-primary px-6 py-4 flex items-center gap-3">
        <button
          className="text-primary-foreground hover:opacity-80 transition-opacity"
          onClick={() => router.push("/")}
          type="button"
        >
          <ArrowLeftIcon className="size-5" />
        </button>
        <GraduationCapIcon className="size-5 text-primary-foreground" />
        <h1 className="text-primary-foreground font-semibold text-lg">
          Respuestas del docente
        </h1>
        <span className="ml-auto text-primary-foreground/70 text-sm">
          {consultas.length} respuestas
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4 overflow-y-auto flex-1">
        <FiltroMateria onChange={setFiltroMateria} value={filtroMateria} />

        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Cargando respuestas...
          </div>
        ) : consultas.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No hay respuestas del docente aún
          </div>
        ) : (
          consultas.map((c) => <RespuestaCard consulta={c} key={c.id} />)
        )}
      </div>
    </div>
  );
}
