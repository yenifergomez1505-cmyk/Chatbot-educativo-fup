import type { Consulta } from "@/types/docente";
import { MATERIA_LABELS } from "@/types/docente";

export function ConsultaCard({
  consulta,
  respondiendo,
  respuesta,
  guardando,
  onSetRespuesta,
  onIniciarRespuesta,
  onCancelarRespuesta,
  onEnviarRespuesta,
}: {
  consulta: Consulta;
  respondiendo: string | null;
  respuesta: string;
  guardando: boolean;
  onSetRespuesta: (v: string) => void;
  onIniciarRespuesta: (id: string) => void;
  onCancelarRespuesta: () => void;
  onEnviarRespuesta: (id: string) => void;
}) {
  const estaRespondiendo = respondiendo === consulta.id;

  return (
    <div className="bg-white border border-[#7aaed8] rounded-xl p-4">
      <p className="text-sm font-medium text-[#082e56] mb-2 leading-relaxed">
        {consulta.pregunta}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <span className="bg-[#e0eef9] text-[#0f4c8a] text-[10px] px-2 py-0.5 rounded-full">
          {MATERIA_LABELS[consulta.materia] ?? consulta.materia}
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full ${
            consulta.respondida
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {consulta.respondida ? "Respondida" : "Pendiente"}
        </span>
        <span className="text-[10px] text-[#4a8dc4]">
          {new Date(consulta.creadoEn).toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {consulta.respondida && consulta.respuestaDocente && (
        <div className="bg-[#e0eef9] rounded-lg p-3 mb-3">
          <p className="text-[10px] font-semibold text-[#0f4c8a] uppercase tracking-wide mb-1">
            Tu respuesta
          </p>
          <p className="text-xs text-[#082e56] leading-relaxed border-l-2 border-[#7aaed8] pl-2">
            {consulta.respuestaDocente}
          </p>
        </div>
      )}

      {!consulta.respondida && (
        <div>
          {estaRespondiendo ? (
            <div className="mt-2">
              <textarea
                className="w-full bg-[#e0eef9] border border-[#7aaed8] rounded-lg px-3 py-2.5 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30 min-h-[100px] resize-y"
                onChange={(e) => onSetRespuesta(e.target.value)}
                placeholder="Escribe tu respuesta... Será visible para todos los estudiantes con esta duda."
                value={respuesta}
              />
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-[#0f4c8a] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#082e56] transition-colors disabled:opacity-50"
                  disabled={guardando}
                  onClick={() => onEnviarRespuesta(consulta.id)}
                  type="button"
                >
                  {guardando ? "Publicando..." : "Publicar respuesta"}
                </button>
                <button
                  className="bg-[#c8dff2] text-[#082e56] text-xs px-4 py-2 rounded-lg hover:bg-[#7aaed8] transition-colors"
                  onClick={onCancelarRespuesta}
                  type="button"
                >
                  Cancelar
                </button>
              </div>
              <p className="text-[10px] text-[#4a8dc4] mt-2">
                La respuesta quedará visible para todos los estudiantes con esta
                misma duda.
              </p>
            </div>
          ) : (
            <button
              className="bg-[#0f4c8a] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#082e56] transition-colors"
              onClick={() => onIniciarRespuesta(consulta.id)}
              type="button"
            >
              Responder
            </button>
          )}
        </div>
      )}
    </div>
  );
}
