"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeftIcon, TrashIcon, BookmarkIcon, FilterIcon } from "lucide-react";

const MATERIA_LABELS: Record<string, string> = {
  poo: "Programación Orientada a Objetos",
  "estructura-de-datos": "Estructura de Datos",
  "ingenieria-de-software": "Ingeniería de Software I",
};

const MATERIA_COLORS: Record<string, string> = {
  poo: "bg-blue-100 text-blue-700 border-blue-200",
  "estructura-de-datos": "bg-green-100 text-green-700 border-green-200",
  "ingenieria-de-software": "bg-purple-100 text-purple-700 border-purple-200",
};

interface Recurso {
  id: string;
  contenido: string;
  materia: string;
  etiqueta: string | null;
  creadoEn: string;
  chatId: string;
}

export default function RecursosPage() {
  const router = useRouter();
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMateria, setFiltroMateria] = useState<string>("todas");

  useEffect(() => {
    fetch("/api/recursos")
      .then((r) => r.json())
      .then((data) => {
        setRecursos(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error al cargar los recursos");
        setLoading(false);
      });
  }, []);

  const handleEliminar = async (id: string) => {
    try {
      await fetch(`/api/recursos?id=${id}`, { method: "DELETE" });
      setRecursos((prev) => prev.filter((r) => r.id !== id));
      toast.success("Recurso eliminado");
    } catch {
      toast.error("Error al eliminar el recurso");
    }
  };

  const recursosFiltrados = filtroMateria === "todas"
    ? recursos
    : recursos.filter((r) => r.materia === filtroMateria);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">Cargando recursos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-6 py-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-primary-foreground hover:opacity-80 transition-opacity"
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

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Filtro por materia */}
        <div className="flex items-center gap-2 flex-wrap">
          <FilterIcon className="size-4 text-muted-foreground" />
          {["todas", "poo", "estructura-de-datos", "ingenieria-de-software"].map(
            (m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFiltroMateria(m)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  filtroMateria === m
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {m === "todas" ? "Todas" : MATERIA_LABELS[m]}
              </button>
            )
          )}
        </div>

        {/* Lista de recursos */}
        {recursosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <BookmarkIcon className="size-12 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm text-center">
              {filtroMateria === "todas"
                ? "Aún no tienes recursos guardados. Guarda respuestas útiles del chatbot."
                : "No tienes recursos guardados para esta materia."}
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-xs text-primary hover:underline"
            >
              Ir al chatbot
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recursosFiltrados.map((recurso) => (
              <div
                key={recurso.id}
                className="bg-card rounded-2xl border border-border p-4 space-y-3"
              >
                {/* Header del recurso */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        MATERIA_COLORS[recurso.materia] ??
                        "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {MATERIA_LABELS[recurso.materia] ?? recurso.materia}
                    </span>
                    {recurso.etiqueta && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                        {recurso.etiqueta}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEliminar(recurso.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    title="Eliminar recurso"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </div>

                {/* Contenido */}
                <p className="text-sm text-foreground leading-relaxed line-clamp-4 whitespace-pre-wrap">
                  {recurso.contenido}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(recurso.creadoEn).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    type="button"
                    onClick={() => router.push(`/chat/${recurso.chatId}`)}
                    className="text-xs text-primary hover:underline"
                  >
                    Ver conversación →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}