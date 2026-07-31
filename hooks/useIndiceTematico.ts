import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchTemasActivos } from "@/lib/api/materias";
import { MATERIAS_INDICE } from "@/lib/data/materias-indice";

// Solo usamos MATERIAS_INDICE para la lista de materias (id, nombre, emoji),
// no para los temas — los temas ahora vienen del docente en tiempo real.
const LISTA_MATERIAS = MATERIAS_INDICE.map((m) => ({
  id: m.id,
  nombre: m.nombre,
  emoji: m.emoji,
}));

type TemaVisible = {
  titulo: string;
  descripcion: string;
};

export function useIndiceTematico() {
  const router = useRouter();
  const [materiaActivaId, setMateriaActivaId] = useState(LISTA_MATERIAS[0].id);
  const [temas, setTemas] = useState<TemaVisible[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    fetchTemasActivos(materiaActivaId)
      .then((data) => {
        if (cancelado) return;
        setTemas(
          data.map((t) => ({
            titulo: t.nombre.replace(/["']/g, ""),
            descripcion: t.contenido,
          }))
        );
      })
      .catch(() => {
        if (!cancelado) setTemas([]);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    return () => {
      cancelado = true;
    };
  }, [materiaActivaId]);

  const materiaActiva = {
    ...LISTA_MATERIAS.find((m) => m.id === materiaActivaId)!,
    temas,
  };

  const handlePreguntarTema = (titulo: string) => {
    const pregunta = `Explícame el tema "${titulo}" con ejemplos en código Java`;
    router.push(
      `/?query=${encodeURIComponent(pregunta)}&materia=${materiaActivaId}`
    );
  };

  return {
    materias: LISTA_MATERIAS,
    materiaActivaId,
    setMateriaActivaId,
    materiaActiva,
    cargando,
    handlePreguntarTema,
  };
}
