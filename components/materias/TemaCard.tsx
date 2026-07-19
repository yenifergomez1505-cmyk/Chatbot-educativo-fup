import { motion } from "framer-motion";
import type { TemaIndice } from "@/types/materias-indice";

export function TemaCard({
  tema,
  numero,
  onPreguntar,
}: {
  tema: TemaIndice;
  numero: number;
  onPreguntar: (titulo: string) => void;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border p-4 space-y-2 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 8 }}
      transition={{ delay: numero * 0.04, duration: 0.25 }}
    >
      <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
        Tema {numero + 1}
      </span>

      <h3 className="font-semibold text-foreground text-sm">{tema.titulo}</h3>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {tema.descripcion}
      </p>

      <code className="block rounded-lg bg-input border border-border text-primary font-mono text-[11px] px-3 py-2 whitespace-pre-wrap break-words">
        {tema.ejemplo}
      </code>

      <button
        className="w-full rounded-lg bg-primary text-primary-foreground text-xs font-medium py-1.5 hover:opacity-90 active:scale-95 transition-all"
        onClick={() => onPreguntar(tema.titulo)}
        type="button"
      >
        Preguntar al asistente →
      </button>
    </motion.div>
  );
}
