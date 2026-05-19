"use client";

import { ArrowLeftIcon, GraduationCapIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Consulta = {
  id: string;
  pregunta: string;
  materia: string;
  respondida: boolean;
  respuestaDocente: string | null;
  creadoEn: string;
};

export default function RespuestasDocentePage() {
  const router = useRouter();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMateria, setFiltroMateria] = useState("");

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filtroMateria) params.append("materia", filtroMateria);
        const res = await fetch(`/api/respuestas-docente?${params.toString()}`);
        const data = await res.json();
        setConsultas(data);
      } catch {
        toast.error("Error al cargar respuestas");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [filtroMateria]);

  return (
    <div className="min-h-screen bg-background">
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

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <select
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          onChange={(e) => setFiltroMateria(e.target.value)}
          value={filtroMateria}
        >
          <option value="">Todas las materias</option>
          <option value="poo">POO</option>
          <option value="estructura-de-datos">Estructura de Datos</option>
          <option value="ingenieria-de-software">
            Ingeniería de Software I
          </option>
        </select>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Cargando respuestas...
          </div>
        ) : consultas.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No hay respuestas del docente aún
          </div>
        ) : (
          consultas.map((c) => (
            <div
              className="bg-card border border-border rounded-xl p-4 space-y-3"
              key={c.id}
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                Pregunta
              </p>
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {c.pregunta}
              </p>

              <div className="flex items-center gap-2">
                <span className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0.5 rounded-full">
                  {c.materia}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(c.creadoEn).toLocaleDateString("es-CO", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-1">
                  Respuesta del docente
                </p>
                <p className="text-sm text-foreground leading-relaxed border-l-2 border-primary/40 pl-2">
                  {c.respuestaDocente}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
