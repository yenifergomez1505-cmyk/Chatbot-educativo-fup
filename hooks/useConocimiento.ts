import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  crearTema,
  editarTema,
  eliminarTema,
  fetchTemas,
} from "@/lib/api/docente";
import type { Tema, TemaFormValues } from "@/types/docente";
import { MATERIAS_CONOCIMIENTO } from "@/types/docente";

const FORM_VACIO: TemaFormValues = {
  materia: MATERIAS_CONOCIMIENTO[0],
  nombre: "",
  contenido: "",
  activo: true,
};

export function useConocimiento() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState<Tema | null>(null);
  const [agregando, setAgregando] = useState(false);
  const [form, setForm] = useState<TemaFormValues>(FORM_VACIO);
  const [guardando, setGuardando] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroMateria, setFiltroMateria] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  const cargarTemas = async () => {
    setCargando(true);
    try {
      const data = await fetchTemas();
      setTemas(data);
    } catch {
      toast.error("Error al cargar los temas");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTemas();
  }, []);

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

  const actualizarCampo = <K extends keyof TemaFormValues>(
    campo: K,
    valor: TemaFormValues[K]
  ) => {
    setForm((f) => ({ ...f, [campo]: valor }));
  };

  const handleGuardar = async () => {
    if (!form.nombre.trim() || !form.contenido.trim()) {
      toast.error("Completa el nombre y el contenido");
      return;
    }
    setGuardando(true);
    try {
      if (editando) {
        await editarTema(editando.id, form);
        toast.success("Tema actualizado correctamente");
      } else {
        await crearTema(form);
        toast.success("Tema agregado correctamente");
      }
      handleCancelar();
      await cargarTemas();
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

  const handleEliminar = async (id: string) => {
    try {
      await eliminarTema(id);
      toast.success("Tema eliminado");
      await cargarTemas();
    } catch {
      toast.error("Error al eliminar el tema");
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    setAgregando(false);
    setForm(FORM_VACIO);
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroMateria("");
    setFiltroFecha("");
  };

  const hayFiltrosActivos =
    busqueda !== "" || filtroMateria !== "" || filtroFecha !== "";

  return {
    temasFiltrados,
    cargando,
    editando,
    agregando,
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
  };
}
