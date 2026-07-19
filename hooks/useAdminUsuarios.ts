import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  cambiarRolUsuario,
  crearUsuario,
  eliminarUsuario,
  fetchUsuarios,
} from "@/lib/api/admin";
import type { NuevoUsuario, Usuario } from "@/types/admin";

const NUEVO_USUARIO_VACIO: NuevoUsuario = {
  email: "",
  password: "",
  name: "",
  role: "estudiante",
};

export function useAdminUsuarios() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [showCrear, setShowCrear] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] =
    useState<NuevoUsuario>(NUEVO_USUARIO_VACIO);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsuarios();
      setUsuarios(data);
    } catch (e: unknown) {
      if (e instanceof Error && e.message === "forbidden") {
        router.push("/");
        return;
      }
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleCambiarRol = async (userId: string, role: string) => {
    try {
      await cambiarRolUsuario(userId, role);
      toast.success("Rol actualizado");
      setUsuarios((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role } : u))
      );
      setEditando(null);
    } catch {
      toast.error("Error al actualizar rol");
    }
  };

  const handleEliminar = async (userId: string) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    await eliminarUsuario(userId);
    setUsuarios((prev) => prev.filter((x) => x.id !== userId));
    toast.success("Usuario eliminado");
  };

  const handleCrear = async () => {
    try {
      await crearUsuario(nuevoUsuario);
      toast.success("Usuario creado");
      setShowCrear(false);
      setNuevoUsuario(NUEVO_USUARIO_VACIO);
      await cargar();
    } catch {
      toast.error("Error al crear usuario");
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideBusqueda =
      (u.name ?? "").toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRol = filtroRol === "todos" || u.role === filtroRol;
    return coincideBusqueda && coincideRol;
  });

  return {
    usuarios,
    usuariosFiltrados,
    loading,
    editando,
    setEditando,
    busqueda,
    setBusqueda,
    filtroRol,
    setFiltroRol,
    showCrear,
    setShowCrear,
    nuevoUsuario,
    setNuevoUsuario,
    cargar,
    handleCambiarRol,
    handleEliminar,
    handleCrear,
  };
}
