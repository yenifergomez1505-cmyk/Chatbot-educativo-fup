"use client";

import { useState } from "react";
import { toast } from "sonner";

type Tema = {
  id: string;
  materia: string;
  nombre: string;
  contenido: string;
  activo: boolean;
};

const MATERIAS = [
  "Ingeniería de Software I",
  "Estructura de Datos",
  "Programación Orientada a Objetos",
];

export default function ConocimientoPage() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const [filtroMateria, setFiltroMateria] = useState("");
  const [editando, setEditando] = useState<Tema | null>(null);
  const [agregando, setAgregando] = useState(false);
  const [form, setForm] = useState({
    materia: MATERIAS[0],
    nombre: "",
    contenido: "",
    activo: true,
  });
  const [guardando, setGuardando] = useState(false);

  const mostrarFormulario = agregando || editando !== null;

  const temasFiltrados = temas.filter((t) => {
    if (filtroMateria !== "") {
      return t.materia === filtroMateria;
    }
    return true;
  });

  const handleGuardar = async () => {
    if (!form.nombre.trim() || !form.contenido.trim()) {
      toast.error("Completa el nombre y el contenido");
      return;
    }
    setGuardando(true);
    try {
      const nuevoTema: Tema = {
        id: crypto.randomUUID(),
        materia: form.materia,
        nombre: form.nombre,
        contenido: form.contenido,
        activo: form.activo,
      };
      if (editando) {
        setTemas((prev) =>
          prev.map((t) =>
            t.id === editando.id ? { ...nuevoTema, id: editando.id } : t
          )
        );
        toast.success("Tema actualizado correctamente");
      } else {
        setTemas((prev) => [...prev, nuevoTema]);
        toast.success("Tema agregado correctamente");
      }
      setEditando(null);
      setAgregando(false);
      setForm({
        materia: MATERIAS[0],
        nombre: "",
        contenido: "",
        activo: true,
      });
    } catch {
      toast.error("Error al guardar el tema");
    } finally {
      setGuardando(false);
    }
  };

  const handleEditar = (t: Tema) => {
    setEditando(t);
    setAgregando(false);
    setForm({
      materia: t.materia,
      nombre: t.nombre,
      contenido: t.contenido,
      activo: t.activo,
    });
  };

  const handleEliminar = (id: string) => {
    setTemas((prev) => prev.filter((t) => t.id !== id));
    toast.success("Tema eliminado");
  };

  const handleCancelar = () => {
    setEditando(null);
    setAgregando(false);
    setForm({ materia: MATERIAS[0], nombre: "", contenido: "", activo: true });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-semibold text-[#082e56]">
            Base de conocimiento
          </h1>
          <p className="text-xs text-[#1a6ab5] mt-0.5">
            Gestiona los temas que el chatbot usa para responder
          </p>
        </div>
        {!mostrarFormulario && (
          <button
            type="button"
            onClick={() => setAgregando(true)}
            className="bg-[#0f4c8a] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#082e56] transition-colors"
          >
            + Agregar tema
          </button>
        )}
      </div>

      {mostrarFormulario && (
        <div className="bg-white border border-[#7aaed8] rounded-xl p-4 mb-4">
          <h2 className="text-sm font-semibold text-[#082e56] mb-4">
            {editando ? "Editar tema" : "Nuevo tema"}
          </h2>
          <div className="flex flex-col gap-3">
            <div>
              <label
                htmlFor="materia"
                className="text-xs font-medium text-[#0f4c8a] mb-1 block"
              >
                Materia
              </label>
              <select
                id="materia"
                value={form.materia}
                onChange={(e) =>
                  setForm((f) => ({ ...f, materia: e.target.value }))
                }
                className="w-full bg-[#e0eef9] border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
              >
                {MATERIAS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="nombre"
                className="text-xs font-medium text-[#0f4c8a] mb-1 block"
              >
                Nombre del tema
              </label>
              <input
                id="nombre"
                type="text"
                value={form.nombre}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nombre: e.target.value }))
                }
                placeholder="Ej: Listas enlazadas — definición y operaciones"
                className="w-full bg-[#e0eef9] border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
              />
            </div>

            <div>
              <label
                htmlFor="contenido"
                className="text-xs font-medium text-[#0f4c8a] mb-1 block"
              >
                Contenido
              </label>
              <textarea
                id="contenido"
                value={form.contenido}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contenido: e.target.value }))
                }
                placeholder="Escribe la explicación que el chatbot usará..."
                className="w-full bg-[#e0eef9] border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30 min-h-[120px] resize-y"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#0f4c8a]">Estado</span>
              <button
                id="toggle-activo"
                type="button"
                onClick={() => setForm((f) => ({ ...f, activo: !f.activo }))}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  form.activo ? "bg-[#0f4c8a]" : "bg-[#c8dff2]"
                }`}
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
                type="button"
                onClick={handleGuardar}
                disabled={guardando}
                className="bg-[#0f4c8a] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#082e56] transition-colors disabled:opacity-50"
              >
                {guardando ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                onClick={handleCancelar}
                className="bg-[#c8dff2] text-[#082e56] text-xs px-4 py-2 rounded-lg hover:bg-[#7aaed8] transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {!mostrarFormulario && (
        <div className="mb-4">
          <label htmlFor="filtro-materia" className="sr-only">
            Filtrar por materia
          </label>
          <select
            id="filtro-materia"
            value={filtroMateria}
            onChange={(e) => setFiltroMateria(e.target.value)}
            className="w-full bg-white border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
          >
            <option value="">Todas las materias</option>
            {MATERIAS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      )}

      {!mostrarFormulario && (
        <div>
          {temasFiltrados.length === 0 ? (
            <div className="text-center py-12 text-[#4a8dc4] text-sm">
              📚 No hay temas agregados aún.{" "}
              <button
                type="button"
                onClick={() => setAgregando(true)}
                className="text-[#0f4c8a] hover:underline"
              >
                Agrega el primero
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {temasFiltrados.map((t) => (
                <div
                  key={t.id}
                  className="bg-white border border-[#7aaed8] rounded-xl p-4 flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#082e56] mb-1 truncate">
                      {t.nombre}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#e0eef9] text-[#0f4c8a] text-[10px] px-2 py-0.5 rounded-full">
                        {t.materia}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          t.activo
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {t.activo ? "Activo" : "Borrador"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#4a8dc4] mt-2 line-clamp-2">
                      {t.contenido}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEditar(t)}
                      className="text-[#0f4c8a] text-xs hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEliminar(t.id)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}