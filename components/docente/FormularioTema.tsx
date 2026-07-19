import type { TemaFormValues } from "@/types/docente";
import { MATERIAS_CONOCIMIENTO } from "@/types/docente";

export function FormularioTema({
  form,
  editando,
  guardando,
  onCampoChange,
  onGuardar,
  onCancelar,
}: {
  form: TemaFormValues;
  editando: boolean;
  guardando: boolean;
  onCampoChange: <K extends keyof TemaFormValues>(
    campo: K,
    valor: TemaFormValues[K]
  ) => void;
  onGuardar: () => void;
  onCancelar: () => void;
}) {
  return (
    <div className="bg-white border border-[#7aaed8] rounded-xl p-4 mb-4">
      <h2 className="text-sm font-semibold text-[#082e56] mb-4">
        {editando ? "✏️ Editar tema" : "➕ Nuevo tema"}
      </h2>
      <div className="flex flex-col gap-3">
        <div>
          <label
            className="text-xs font-medium text-[#0f4c8a] mb-1 block"
            htmlFor="materia"
          >
            Materia
          </label>
          <select
            className="w-full bg-[#e0eef9] border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
            id="materia"
            onChange={(e) => onCampoChange("materia", e.target.value)}
            value={form.materia}
          >
            {MATERIAS_CONOCIMIENTO.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="text-xs font-medium text-[#0f4c8a] mb-1 block"
            htmlFor="nombre"
          >
            Nombre del tema
          </label>
          <input
            className="w-full bg-[#e0eef9] border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
            id="nombre"
            onChange={(e) => onCampoChange("nombre", e.target.value)}
            placeholder="Ej: Listas enlazadas — definición y operaciones"
            type="text"
            value={form.nombre}
          />
        </div>

        <div>
          <label
            className="text-xs font-medium text-[#0f4c8a] mb-1 block"
            htmlFor="contenido"
          >
            Contenido
          </label>
          <textarea
            className="w-full bg-[#e0eef9] border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30 min-h-[120px] resize-y"
            id="contenido"
            onChange={(e) => onCampoChange("contenido", e.target.value)}
            placeholder="Escribe la explicación que el chatbot usará..."
            value={form.contenido}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#0f4c8a]">Estado</span>
          <button
            className={`relative w-10 h-5 rounded-full transition-colors ${
              form.activo ? "bg-[#0f4c8a]" : "bg-[#c8dff2]"
            }`}
            id="toggle-activo"
            onClick={() => onCampoChange("activo", !form.activo)}
            type="button"
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                form.activo ? "left-5" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-xs text-[#4a8dc4]">
            {form.activo
              ? "Activo — visible para el chatbot"
              : "Borrador — no visible"}
          </span>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            className="bg-[#0f4c8a] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#082e56] transition-colors disabled:opacity-50"
            disabled={guardando}
            onClick={onGuardar}
            type="button"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <button
            className="bg-[#c8dff2] text-[#082e56] text-xs px-4 py-2 rounded-lg hover:bg-[#7aaed8] transition-colors"
            onClick={onCancelar}
            type="button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
