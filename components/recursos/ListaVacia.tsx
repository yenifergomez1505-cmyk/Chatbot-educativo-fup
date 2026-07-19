import { BookmarkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function ListaVacia({ hayFiltro }: { hayFiltro: boolean }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <BookmarkIcon className="size-12 text-muted-foreground/30" />
      <p className="text-muted-foreground text-sm text-center">
        {hayFiltro
          ? "No tienes recursos guardados para esta materia."
          : "Aún no tienes recursos guardados. Guarda respuestas útiles del chatbot."}
      </p>
      <button
        className="text-xs text-primary hover:underline"
        onClick={() => router.push("/")}
        type="button"
      >
        Ir al chatbot
      </button>
    </div>
  );
}
