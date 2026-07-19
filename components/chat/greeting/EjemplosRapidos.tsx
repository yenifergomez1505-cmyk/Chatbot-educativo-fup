import { motion } from "framer-motion";
import type { Materia } from "@/types/chat-materias";

export function EjemplosRapidos({
  materia,
  onPreguntar,
}: {
  materia: Materia;
  onPreguntar: (etiqueta: string) => void;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl"
      exit={{ opacity: 0, y: -6 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-xs text-muted-foreground mb-3 font-medium">
        💡 Ejemplos rápidos — haz clic para preguntar al asistente:
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {materia.ejemplos.map((ej) => (
          <button
            className="text-left rounded-xl border border-border bg-card p-3 hover:border-primary/60 hover:shadow-sm transition-all duration-200 group"
            key={ej.etiqueta}
            onClick={() => onPreguntar(ej.etiqueta)}
            type="button"
          >
            <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-primary border border-border mb-2">
              {ej.etiqueta}
            </span>
            <code className="block text-[11px] font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap group-hover:text-primary transition-colors">
              {ej.codigo}
            </code>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
