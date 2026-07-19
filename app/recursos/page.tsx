"use client";

import { ArrowLeftIcon, BookmarkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FiltroMateriaRecursos } from "@/components/recursos/FiltroMateriaRecursos";
import { ListaVacia } from "@/components/recursos/ListaVacia";
import { RecursoCard } from "@/components/recursos/RecursoCard";
import { useRecursos } from "@/hooks/useRecursos";

export default function RecursosPage() {
  const router = useRouter();
  const {
    recursos,
    recursosFiltrados,
    loading,
    filtroMateria,
    setFiltroMateria,
    handleEliminar,
  } = useRecursos();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">Cargando recursos...</p>
      </div>
    );
  }

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
        <BookmarkIcon className="size-5 text-primary-foreground" />
        <h1 className="text-primary-foreground font-semibold text-lg">
          Mis Recursos
        </h1>
        <span className="ml-auto text-primary-foreground/70 text-sm">
          {recursos.length} guardados
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 overflow-y-auto flex-1">
        <FiltroMateriaRecursos
          onChange={setFiltroMateria}
          value={filtroMateria}
        />

        {recursosFiltrados.length === 0 ? (
          <ListaVacia hayFiltro={filtroMateria !== "todas"} />
        ) : (
          <div className="space-y-3">
            {recursosFiltrados.map((recurso) => (
              <RecursoCard
                key={recurso.id}
                onEliminar={handleEliminar}
                recurso={recurso}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
