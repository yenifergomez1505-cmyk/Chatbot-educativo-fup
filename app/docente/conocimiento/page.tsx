"use client";

import { FiltrosConocimiento } from "@/components/docente/FiltrosConocimiento";
import { FormularioTema } from "@/components/docente/FormularioTema";
import { TemaCard } from "@/components/docente/TemaCard";
import { useConocimiento } from "@/hooks/useConocimiento";

export default function ConocimientoPage() {
  const {
    temasFiltrados,
    cargando,
    editando,
    mostrarFormulario,

    form,
    actualizarCampo,
    guardando,
    busqueda,
    setBusqueda,
    filtroMateria,
    setFiltroMateria,
    filtroFecha,
    setFiltroFecha,
    hayFiltrosActivos,
    limpiarFiltros,
    setAgregando,
    handleGuardar,
    handleEditar,
    handleEliminar,
    handleCancelar,
  } = useConocimiento();

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
            className="bg-[#0f4c8a] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#082e56] transition-colors"
            onClick={() => setAgregando(true)}
            type="button"
          >
            + Agregar tema
          </button>
        )}
      </div>

      {mostrarFormulario && (
        <FormularioTema
          editando={editando !== null}
          form={form}
          guardando={guardando}
          onCampoChange={actualizarCampo}
          onCancelar={handleCancelar}
          onGuardar={handleGuardar}
        />
      )}

      <FiltrosConocimiento
        busqueda={busqueda}
        filtroFecha={filtroFecha}
        filtroMateria={filtroMateria}
        hayFiltrosActivos={hayFiltrosActivos}
        onBusquedaChange={setBusqueda}
        onFechaChange={setFiltroFecha}
        onLimpiar={limpiarFiltros}
        onMateriaChange={setFiltroMateria}
      />

      <div className="text-[10px] text-[#4a8dc4] mb-3">
        {temasFiltrados.length} tema{temasFiltrados.length !== 1 ? "s" : ""}{" "}
        encontrado{temasFiltrados.length !== 1 ? "s" : ""}
      </div>

      <div>
        {cargando ? (
          <div className="text-center py-12 text-[#4a8dc4] text-sm">
            Cargando temas...
          </div>
        ) : temasFiltrados.length === 0 ? (
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
              <TemaCard
                key={t.id}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
                tema={t}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
