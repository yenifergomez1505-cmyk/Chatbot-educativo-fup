"use client";
import { motion } from "framer-motion";
import { ArrowLeftIcon, BookOpenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { TabsMaterias } from "@/components/materias/TabsMaterias";
import { TemaCard } from "@/components/materias/TemaCard";
import { useIndiceTematico } from "@/hooks/useIndiceTematico";

export default function MateriasPage() {
  const router = useRouter();
  const {
    materias,
    materiaActivaId,
    setMateriaActivaId,
    materiaActiva,
    cargando,
    handlePreguntarTema,
  } = useIndiceTematico();

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
        <BookOpenIcon className="size-5 text-primary-foreground" />
        <h1 className="text-primary-foreground font-semibold text-lg">
          Índice Temático
        </h1>
        <span className="ml-auto text-primary-foreground/70 text-sm">
          {materiaActiva.temas.length} temas
        </span>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5 overflow-y-auto flex-1">
        <TabsMaterias
          materiaActivaId={materiaActivaId}
          materias={materias}
          onSeleccionar={setMateriaActivaId}
        />

        {cargando ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Cargando temas...
          </div>
        ) : materiaActiva.temas.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Tu profesor aún no ha activado temas para esta materia. Vuelve a
            revisar más adelante.
          </div>
        ) : (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-3 md:grid-cols-2"
            initial={{ opacity: 0, y: 8 }}
            key={materiaActivaId}
            transition={{ duration: 0.25 }}
          >
            {materiaActiva.temas.map((tema, i) => (
              <TemaCard
                key={tema.titulo}
                numero={i}
                onPreguntar={handlePreguntarTema}
                tema={tema}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
