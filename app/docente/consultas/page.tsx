"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const MATERIA_LABELS: Record<string, string> = {
  poo: "POO",
  "estructura-de-datos": "Estructura de Datos",
  "ingenieria-de-software": "Ingeniería de Software I",
  "sin-materia": "Sin materia",
};

type Consulta = {
  id: string;
  pregunta: string;
  materia: string;
  respondida: boolean;
  respuestaDocente: string | null;
  creadoEn: string;
};

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMateria, setFiltroMateria] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("pendientes");
  const [respondiendo, setRespondiendo] = useState<string | null>(null);
  const [respuesta, setRespuesta] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cargarConsultas = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ tipo: "consultas" });
      if (filtroMateria !== "") {
        params.append("materia", filtroMateria);
      }
      if (filtroEstado === "todas" || filtroEstado === "respondidas") {
        params.append("todas", "true");
      }
      const res = await fetch(`/api/admin?${params.toString()}`);
      const data = await res.json();
      setConsultas(data);
    } catch {
      toast.error("Error al cargar consultas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarConsultas();
  }, [filtroMateria, filtroEstado]);

  const consultasFiltradas = consultas.filter((c: Consulta) => {
    if (filtroEstado === "pendientes") return c.respondida === false;
    if (filtroEstado === "respondidas") return c.respondida === true;
    return true;
  });

  const handleResponder = async (id: string) => {
    if (!respuesta.trim()) {
      toast.error("Escribe una respuesta");
      return;
    }
    setGuardando(true);
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "responder",
          consultaId: id,
          respuesta: respuesta.trim(),
        }),
      });
      if (!res.ok) throw new Error("Error en la respuesta");
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

  const pendientes = consultas.filter((c) => !c.respondida).length;

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

      {/* Filtros */}
      <div className="flex gap-3 mb-4">
        <select
          className="flex-1 bg-white border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
          onChange={(e) => setFiltroMateria(e.target.value)}
          value={filtroMateria}
        >
          <option value="">Todas las materias</option>
          <option value="poo">POO</option>
          <option value="estructura-de-datos">Estructura de Datos</option>
          <option value="ingenieria-de-software">
            Ingeniería de Software I
          </option>
          <option value="sin-materia">Sin materia</option>
        </select>
        <select
          className="flex-1 bg-white border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
          onChange={(e) => setFiltroEstado(e.target.value)}
          value={filtroEstado}
        >
          <option value="pendientes">Sin respuesta</option>
          <option value="respondidas">Respondidas</option>
          <option value="todas">Todas</option>
        </select>
      </div>

      {/* Lista */}
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
            <div
              className="bg-white border border-[#7aaed8] rounded-xl p-4"
              key={c.id}
            >
              <p className="text-sm font-medium text-[#082e56] mb-2 leading-relaxed">
                {c.pregunta}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#e0eef9] text-[#0f4c8a] text-[10px] px-2 py-0.5 rounded-full">
                  {MATERIA_LABELS[c.materia] ?? c.materia}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    c.respondida
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {c.respondida ? "Respondida" : "Pendiente"}
                </span>
                <span className="text-[10px] text-[#4a8dc4]">
                  {new Date(c.creadoEn).toLocaleDateString("es-CO", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {c.respondida && c.respuestaDocente && (
                <div className="bg-[#e0eef9] rounded-lg p-3 mb-3">
                  <p className="text-[10px] font-semibold text-[#0f4c8a] uppercase tracking-wide mb-1">
                    Tu respuesta
                  </p>
                  <p className="text-xs text-[#082e56] leading-relaxed border-l-2 border-[#7aaed8] pl-2">
                    {c.respuestaDocente}
                  </p>
                </div>
              )}

              {!c.respondida && (
                <div>
                  {respondiendo === c.id ? (
                    <div className="mt-2">
                      <textarea
                        className="w-full bg-[#e0eef9] border border-[#7aaed8] rounded-lg px-3 py-2.5 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30 min-h-[100px] resize-y"
                        onChange={(e) => setRespuesta(e.target.value)}
                        placeholder="Escribe tu respuesta... Será visible para todos los estudiantes con esta duda."
                        value={respuesta}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-[#0f4c8a] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#082e56] transition-colors disabled:opacity-50"
                          disabled={guardando}
                          onClick={() => handleResponder(c.id)}
                          type="button"
                        >
                          {guardando ? "Publicando..." : "Publicar respuesta"}
                        </button>
                        <button
                          className="bg-[#c8dff2] text-[#082e56] text-xs px-4 py-2 rounded-lg hover:bg-[#7aaed8] transition-colors"
                          onClick={() => {
                            setRespondiendo(null);
                            setRespuesta("");
                          }}
                          type="button"
                        >
                          Cancelar
                        </button>
                      </div>
                      <p className="text-[10px] text-[#4a8dc4] mt-2">
                        La respuesta quedará visible para todos los estudiantes
                        con esta misma duda.
                      </p>
                    </div>
                  ) : (
                    <button
                      className="bg-[#0f4c8a] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#082e56] transition-colors"
                      onClick={() => {
                        setRespondiendo(c.id);
                        setRespuesta("");
                      }}
                      type="button"
                    >
                      Responder
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
