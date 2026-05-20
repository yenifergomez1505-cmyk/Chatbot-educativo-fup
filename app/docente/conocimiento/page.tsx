"use client";

import { useState } from "react";
import { toast } from "sonner";

type Tema = {
  id: string;
  materia: string;
  nombre: string;
  contenido: string;
  activo: boolean;
  creadoEn: string;
};

const MATERIAS = [
  "Ingeniería de Software I",
  "Estructura de Datos",
  "Programación Orientada a Objetos",
];

export default function ConocimientoPage() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const [editando, setEditando] = useState<Tema | null>(null);
  const [agregando, setAgregando] = useState(false);
  const [form, setForm] = useState({
    materia: MATERIAS[0],
    nombre: "",
    contenido: "",
    activo: true,
  });
  const [guardando, setGuardando] = useState(false);

  // Filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroMateria, setFiltroMateria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const mostrarFormulario = agregando || editando !== null;

  const temasFiltrados = temas.filter((t) => {
    const coincideMateria = filtroMateria === "" || t.materia === filtroMateria;
    const coincideBusqueda =
      busqueda === "" ||
      t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.contenido.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFecha =
      filtroFecha === "" || t.creadoEn.startsWith(filtroFecha);
    return coincideMateria && coincideBusqueda && coincideFecha;
  });

  const handleGuardar = async () => {
    if (!form.nombre.trim() || !form.contenido.trim()) {
      toast.error("Completa el nombre y el contenido");
      return;
    }
    setGuardando(true);
    try {
      if (editando) {
        setTemas((prev) =>
          prev.map((t) =>
            t.id === editando.id
              ? {
                  ...t,
                  materia: form.materia,
                  nombre: form.nombre,
                  contenido: form.contenido,
                  activo: form.activo,
                }
              : t
          )
        );
        toast.success("Tema actualizado correctamente");
      } else {
        const nuevoTema: Tema = {
          id: crypto.randomUUID(),
          materia: form.materia,
          nombre: form.nombre,
          contenido: form.contenido,
          activo: form.activo,
          creadoEn: new Date().toISOString(),
        };
        setTemas((prev) => [nuevoTema, ...prev]);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      {/* Encabezado */}
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
            className="bg-[#0f4c8a] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#082e56] transition-colors"
            onClick={() => setAgregando(true)}
            type="button"
          >
            + Agregar tema
          </button>
        )}
      </div>

      {/* Formulario agregar/editar */}
      {mostrarFormulario && (
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
                onChange={(e) =>
                  setForm((f) => ({ ...f, materia: e.target.value }))
                }
                value={form.materia}
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
                className="text-xs font-medium text-[#0f4c8a] mb-1 block"
                htmlFor="nombre"
              >
                Nombre del tema
              </label>
              <input
                className="w-full bg-[#e0eef9] border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
                id="nombre"
                onChange={(e) =>
                  setForm((f) => ({ ...f, nombre: e.target.value }))
                }
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
                onChange={(e) =>
                  setForm((f) => ({ ...f, contenido: e.target.value }))
                }
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
                onClick={() => setForm((f) => ({ ...f, activo: !f.activo }))}
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
                onClick={handleGuardar}
                type="button"
              >
                {guardando ? "Guardando..." : "Guardar"}
              </button>
              <button
                className="bg-[#c8dff2] text-[#082e56] text-xs px-4 py-2 rounded-lg hover:bg-[#7aaed8] transition-colors"
                onClick={handleCancelar}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtros y buscador — siempre visibles */}
      <div className="flex flex-col gap-2 mb-4">
        {/* Buscador */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a8dc4] text-xs">
            🔍
          </span>
          <input
            className="w-full bg-white border border-[#7aaed8] rounded-lg pl-8 pr-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o contenido..."
            type="text"
            value={busqueda}
          />
        </div>

        <div className="flex gap-2">
          {/* Filtro materia */}
          <div className="flex-1">
            <label className="sr-only" htmlFor="filtro-materia">
              Filtrar por materia
            </label>
            <select
              className="w-full bg-white border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
              id="filtro-materia"
              onChange={(e) => setFiltroMateria(e.target.value)}
              value={filtroMateria}
            >
              <option value="">Todas las materias</option>
              {MATERIAS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro fecha */}
          <div className="flex-1">
            <label className="sr-only" htmlFor="filtro-fecha">
              Filtrar por fecha
            </label>
            <input
              className="w-full bg-white border border-[#7aaed8] rounded-lg px-3 py-2 text-xs text-[#082e56] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
              id="filtro-fecha"
              onChange={(e) => setFiltroFecha(e.target.value)}
              type="date"
              value={filtroFecha}
            />
          </div>

          {/* Limpiar filtros */}
          {(busqueda !== "" || filtroMateria !== "" || filtroFecha !== "") && (
            <button
              className="bg-[#c8dff2] text-[#082e56] text-xs px-3 py-2 rounded-lg hover:bg-[#7aaed8] transition-colors shrink-0"
              onClick={() => {
                setBusqueda("");
                setFiltroMateria("");
                setFiltroFecha("");
              }}
              type="button"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Contador */}
      <div className="text-[10px] text-[#4a8dc4] mb-3">
        {temasFiltrados.length} tema{temasFiltrados.length !== 1 ? "s" : ""}{" "}
        encontrado{temasFiltrados.length !== 1 ? "s" : ""}
      </div>

      {/* Lista de temas */}
      <div>
        {temasFiltrados.length === 0 ? (
          <div className="text-center py-12 text-[#4a8dc4] text-sm">
            No hay temas.{" "}
            {!mostrarFormulario && (
              <button
                className="text-[#0f4c8a] hover:underline"
                onClick={() => setAgregando(true)}
                type="button"
              >
                Agrega el primero
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {temasFiltrados.map((t) => (
              <div
                className="bg-white border border-[#7aaed8] rounded-xl p-4"
                key={t.id}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#082e56] mb-1">
                      {t.nombre}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
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
                      <span className="text-[10px] text-[#4a8dc4]">
                        {new Date(t.creadoEn).toLocaleDateString("es-CO", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#4a8dc4] line-clamp-2">
                      {t.contenido}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      className="bg-[#e0eef9] text-[#0f4c8a] text-xs px-3 py-1.5 rounded-lg hover:bg-[#c8dff2] transition-colors"
                      onClick={() => handleEditar(t)}
                      type="button"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                      onClick={() => handleEliminar(t.id)}
                      type="button"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
