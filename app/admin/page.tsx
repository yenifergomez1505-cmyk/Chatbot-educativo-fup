/** biome-ignore-all lint/suspicious/noAlert: <explanation> */
"use client";

import {
  ArrowLeftIcon,
  BarChartIcon,
  CodeIcon,
  DatabaseIcon,
  LayersIcon,
  MessageSquareIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const MATERIA_LABELS: Record<string, string> = {
  poo: "POO",
  "estructura-de-datos": "Estructura de Datos",
  "ingenieria-de-software": "Ingeniería de Software I",
};

const MATERIAS_CONFIG = [
  {
    id: "poo",
    nombre: "Programación Orientada a Objetos",
    descripcion:
      "Clases, herencia, polimorfismo, encapsulamiento y abstracción.",
    icon: CodeIcon,
    color: "text-[#0f4c8a]",
    bg: "bg-[#e0eef9]",
  },
  {
    id: "estructura-de-datos",
    nombre: "Estructura de Datos",
    descripcion: "Listas, pilas, colas, árboles, grafos y algoritmos.",
    icon: DatabaseIcon,
    color: "text-[#0f4c8a]",
    bg: "bg-[#e0eef9]",
  },
  {
    id: "ingenieria-de-software",
    nombre: "Ingeniería de Software I",
    descripcion:
      "Ciclos de vida, metodologías ágiles, requerimientos y diseño.",
    icon: LayersIcon,
    color: "text-[#0f4c8a]",
    bg: "bg-[#e0eef9]",
  },
];

interface Usuario {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
}

interface Estadisticas {
  totalConsultas: number;
  consultasPorMateria: { materia: string; total: number }[];
  consultasSinResponder: number;
  pendientes: {
    id: string;
    pregunta: string;
    materia: string;
    creadoEn: string;
  }[];
}

interface Consulta {
  id: string;
  pregunta: string;
  materia: string;
  respondida: boolean;
  respuestaDocente: string | null;
  creadoEn: string;
}

type Tab = "usuarios" | "estadisticas" | "consultas" | "materias";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("estadisticas");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [respuesta, setRespuesta] = useState<Record<string, string>>({});
  const [editando, setEditando] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [showCrear, setShowCrear] = useState(false);
  const [materiasActivas, setMateriasActivas] = useState<
    Record<string, boolean>
  >({
    poo: true,
    "estructura-de-datos": true,
    "ingenieria-de-software": true,
  });
  const [nuevoUsuario, setNuevoUsuario] = useState({
    email: "",
    password: "",
    name: "",
    role: "estudiante",
  });

  const cargarDatos = useCallback(
    async (tipo: Tab) => {
      setLoading(true);
      try {
        if (tipo === "usuarios") {
          const res = await fetch("/api/admin");
          if (res.status === 403) {
            router.push("/");
            return;
          }
          const data = await res.json();
          setUsuarios(Array.isArray(data) ? data : []);
        } else if (tipo === "estadisticas") {
          const res = await fetch("/api/admin?tipo=estadisticas");
          const data = await res.json();
          setEstadisticas(data);
        } else if (tipo === "consultas") {
          const res = await fetch("/api/admin?tipo=consultas");
          const data = await res.json();
          setConsultas(Array.isArray(data) ? data : []);
        } else if (tipo === "materias") {
          const saved = localStorage.getItem("materiasActivas");
          if (saved) {
            setMateriasActivas(JSON.parse(saved));
          }
        }
      } catch {
        toast.error("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    cargarDatos(tab);
  }, [tab, cargarDatos]);

  const handleToggleMateria = (materiaId: string) => {
    const nuevas = {
      ...materiasActivas,
      [materiaId]: !materiasActivas[materiaId],
    };
    setMateriasActivas(nuevas);
    localStorage.setItem("materiasActivas", JSON.stringify(nuevas));
    toast.success(
      `Materia ${nuevas[materiaId] ? "activada" : "desactivada"} correctamente`
    );
  };

  const handleCambiarRol = async (userId: string, role: string) => {
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "rol", userId, role }),
      });
      if (res.ok) {
        toast.success("Rol actualizado");
        setUsuarios((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role } : u))
        );
        setEditando(null);
      }
    } catch {
      toast.error("Error al actualizar rol");
    }
  };

  const handleEliminar = async (userId: string) => {
    if (!confirm("¿Eliminar este usuario?")) {
      return;
    }
    await fetch(`/api/admin?userId=${userId}`, { method: "DELETE" });
    setUsuarios((prev) => prev.filter((x) => x.id !== userId));
    toast.success("Usuario eliminado");
  };

  const handleCrear = async () => {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    });
    if (res.ok) {
      toast.success("Usuario creado");
      setShowCrear(false);
      setNuevoUsuario({
        email: "",
        password: "",
        name: "",
        role: "estudiante",
      });
      cargarDatos("usuarios");
    } else {
      toast.error("Error al crear usuario");
    }
  };

  const handleResponder = async (consultaId: string) => {
    const texto = respuesta[consultaId];
    if (!texto?.trim()) {
      toast.error("Escribe una respuesta");
      return;
    }
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "responder",
          consultaId,
          respuesta: texto,
        }),
      });
      if (res.ok) {
        toast.success("Respuesta enviada");
        setConsultas((prev) =>
          prev.map((c) =>
            c.id === consultaId
              ? { ...c, respondida: true, respuestaDocente: texto }
              : c
          )
        );
        setRespuesta((prev) => ({ ...prev, [consultaId]: "" }));
      }
    } catch {
      toast.error("Error al responder");
    }
  };

  const totalUsuarios = usuarios.length;
  const totalConsultas = estadisticas?.totalConsultas ?? 0;
  const sinResponder = estadisticas?.consultasSinResponder ?? 0;

  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideBusqueda =
      (u.name ?? "").toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRol = filtroRol === "todos" || u.role === filtroRol;
    return coincideBusqueda && coincideRol;
  });

  return (
    <div className="min-h-screen bg-[#e0eef9]">
      {/* Header */}
      <div className="bg-[#082e56] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="text-white hover:opacity-80"
            onClick={() => router.push("/")}
            type="button"
          >
            <ArrowLeftIcon className="size-5" />
          </button>
          <div className="size-8 rounded-full bg-white/20 flex items-center justify-center">
            <ShieldIcon className="size-4 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">
            EduBot FUP · Admin
          </span>
        </div>
        <span className="text-white/70 text-sm">Administrador del sistema</span>
      </div>

      <div className="flex h-[calc(100vh-60px)] overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-48 bg-[#082e56] flex-col pt-4 shrink-0 overflow-y-auto">
          <div className="px-4 pb-4 border-b border-white/10">
            <p className="text-white font-semibold text-sm">Panel Admin</p>
            <p className="text-white/50 text-xs">Administrador</p>
          </div>
          {[
            { id: "usuarios", label: "Usuarios", icon: UsersIcon },
            { id: "estadisticas", label: "Estadísticas", icon: BarChartIcon },
            { id: "consultas", label: "Conocimiento", icon: MessageSquareIcon },
            { id: "materias", label: "Materias", icon: SettingsIcon },
          ].map(({ id, label, icon: Icon }) => (
            <button
              className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors w-full text-left ${
                tab === id
                  ? "bg-[#0f4c8a] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
              key={id}
              onClick={() => setTab(id as Tab)}
              type="button"
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}

          <div className="mt-auto border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-[#0f4c8a] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                AF
              </div>
              <div>
                <p className="text-white text-xs font-semibold">
                  Administrador
                </p>
                <button
                  className="text-white/50 text-xs hover:text-white transition-colors"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  type="button"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 md:p-6 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Usuarios activos", value: totalUsuarios },
              { label: "Consultas totales", value: totalConsultas },
              { label: "Sin respuesta IA", value: sinResponder },
              { label: "Tasa satisfacción", value: "—" },
            ].map((s) => (
              <div
                className="bg-white rounded-xl border border-[#7aaed8] p-4 text-center shadow-sm"
                key={s.label}
              >
                <p className="text-2xl font-bold text-[#082e56]">{s.value}</p>
                <p className="text-xs text-[#1a6ab5] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <p className="text-[#1a6ab5] text-sm">Cargando...</p>
            </div>
          ) : (
            <>
              {/* TAB USUARIOS */}
              {tab === "usuarios" && (
                <div className="bg-white rounded-xl border border-[#7aaed8] shadow-sm">
                  <div className="px-5 py-4 border-b border-[#c8dff2] space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-sm text-[#082e56]">
                        Gestión de usuarios
                      </h2>
                      <button
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#0f4c8a] text-white font-medium hover:bg-[#082e56] transition-colors"
                        onClick={() => setShowCrear(true)}
                        type="button"
                      >
                        + Agregar
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <input
                        className="flex-1 text-sm border border-[#7aaed8] rounded-lg px-3 py-1.5 bg-[#e0eef9] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar por nombre o correo..."
                        type="text"
                        value={busqueda}
                      />
                      <select
                        className="text-sm border border-[#7aaed8] rounded-lg px-3 py-1.5 bg-[#e0eef9] focus:outline-none"
                        onChange={(e) => setFiltroRol(e.target.value)}
                        value={filtroRol}
                      >
                        <option value="todos">Todos los roles</option>
                        <option value="estudiante">Estudiante</option>
                        <option value="docente">Docente</option>
                        <option value="administrador">Administrador</option>
                      </select>
                    </div>
                    <p className="text-xs text-[#1a6ab5]">
                      {usuariosFiltrados.length} de {usuarios.length} usuarios
                    </p>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#c8dff2] bg-[#e0eef9]">
                        <th className="text-left px-5 py-3 text-xs font-medium text-[#1a6ab5]">
                          Nombre
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-[#1a6ab5]">
                          Correo
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-[#1a6ab5]">
                          Rol
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-[#1a6ab5]">
                          Registro
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-[#1a6ab5]">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuariosFiltrados.map((u) => (
                        <tr
                          className="border-b border-[#c8dff2] last:border-0 hover:bg-[#e0eef9]/50"
                          key={u.id}
                        >
                          <td className="px-5 py-3 text-sm font-medium text-[#082e56]">
                            {u.name ?? "Sin nombre"}
                          </td>
                          <td className="px-5 py-3 text-sm text-[#1a6ab5]">
                            {u.email}
                          </td>
                          <td className="px-5 py-3">
                            {editando === u.id ? (
                              <select
                                autoFocus
                                className="text-xs border border-[#7aaed8] rounded-lg px-2 py-1 bg-[#e0eef9]"
                                defaultValue={u.role}
                                onChange={(e) =>
                                  handleCambiarRol(u.id, e.target.value)
                                }
                              >
                                <option value="estudiante">Estudiante</option>
                                <option value="docente">Docente</option>
                                <option value="administrador">
                                  Administrador
                                </option>
                              </select>
                            ) : (
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  u.role === "administrador"
                                    ? "bg-purple-100 text-purple-700"
                                    : u.role === "docente"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-[#e0eef9] text-[#0f4c8a]"
                                }`}
                              >
                                {u.role.charAt(0).toUpperCase() +
                                  u.role.slice(1)}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3 text-xs text-[#4a8dc4]">
                            {new Date(u.createdAt).toLocaleDateString("es-CO")}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                className="text-xs text-[#0f4c8a] hover:underline font-medium"
                                onClick={() =>
                                  setEditando(editando === u.id ? null : u.id)
                                }
                                type="button"
                              >
                                {editando === u.id ? "Cancelar" : "Editar"}
                              </button>
                              <span className="text-[#7aaed8]">·</span>
                              <button
                                className="text-xs text-red-500 hover:underline font-medium"
                                onClick={() => handleEliminar(u.id)}
                                type="button"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB ESTADÍSTICAS */}
              {tab === "estadisticas" && estadisticas && (
                <div className="space-y-5">
                  <div className="bg-white rounded-xl border border-[#7aaed8] shadow-sm p-5">
                    <h2 className="font-semibold text-sm text-[#082e56] mb-4">
                      Temas más consultados
                    </h2>
                    {estadisticas.consultasPorMateria.length === 0 ? (
                      <p className="text-sm text-[#1a6ab5] text-center py-8">
                        No hay datos aún
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {estadisticas.consultasPorMateria.map((item) => (
                          <div
                            className="flex items-center gap-4"
                            key={item.materia}
                          >
                            <span className="text-sm w-48 shrink-0 text-[#082e56]">
                              {MATERIA_LABELS[item.materia] ?? item.materia}
                            </span>
                            <div className="flex-1 h-2 bg-[#e0eef9] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0f4c8a] rounded-full"
                                style={{
                                  width: `${Math.min(100, (Number(item.total) / Math.max(1, Number(estadisticas.totalConsultas))) * 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-[#1a6ab5] w-8 text-right">
                              {item.total}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-xl border border-[#7aaed8] shadow-sm p-5">
                    <h2 className="font-semibold text-sm text-[#082e56] mb-4">
                      Consultas pendientes de respuesta docente
                    </h2>
                    {(estadisticas.pendientes ?? []).length === 0 ? (
                      <p className="text-sm text-[#1a6ab5] text-center py-6">
                        No hay consultas pendientes 🎉
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {(estadisticas.pendientes ?? []).map((c) => (
                          <div
                            className="flex items-center justify-between rounded-lg border border-[#c8dff2] px-4 py-3"
                            key={c.id}
                          >
                            <div>
                              <p className="text-sm font-medium text-[#082e56]">
                                {c.pregunta}
                              </p>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[#e0eef9] text-[#0f4c8a] font-medium mt-1 inline-block">
                                {c.materia
                                  ? (MATERIA_LABELS[c.materia] ?? c.materia)
                                  : "Sin materia asignada"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB CONSULTAS */}
              {tab === "consultas" && (
                <div className="space-y-4">
                  {consultas.length === 0 ? (
                    <div className="bg-white rounded-xl border border-[#7aaed8] p-10 text-center">
                      <MessageSquareIcon className="size-10 text-[#7aaed8] mx-auto mb-2" />
                      <p className="text-[#1a6ab5] text-sm">
                        No hay consultas pendientes
                      </p>
                    </div>
                  ) : (
                    consultas.map((c) => (
                      <div
                        className="bg-white rounded-xl border border-[#7aaed8] p-4 space-y-3 shadow-sm"
                        key={c.id}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#e0eef9] text-[#0f4c8a] font-medium">
                            {MATERIA_LABELS[c.materia] ?? c.materia}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              c.respondida
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {c.respondida ? "✓ Respondida" : "Pendiente"}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-[#082e56]">
                          {c.pregunta}
                        </p>
                        {!c.respondida && (
                          <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                            Esta consulta debe ser respondida por el docente
                            desde su panel.
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB MATERIAS */}
              {tab === "materias" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-[#7aaed8] shadow-sm p-5">
                    <h2 className="font-semibold text-sm text-[#082e56] mb-1">
                      Configurar materias
                    </h2>
                    <p className="text-xs text-[#1a6ab5] mb-5">
                      Activa o desactiva las materias disponibles para los
                      estudiantes en el chatbot.
                    </p>
                    <div className="space-y-4">
                      {MATERIAS_CONFIG.map((m) => {
                        const Icon = m.icon;
                        return (
                          <div
                            className="flex items-center justify-between rounded-xl border border-[#c8dff2] px-5 py-4 hover:bg-[#e0eef9]/50 transition-colors"
                            key={m.id}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`size-10 rounded-lg ${m.bg} flex items-center justify-center`}
                              >
                                <Icon className={`size-5 ${m.color}`} />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-[#082e56]">
                                  {m.nombre}
                                </p>
                                <p className="text-xs text-[#4a8dc4]">
                                  {m.descripcion}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                  materiasActivas[m.id]
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {materiasActivas[m.id] ? "Activa" : "Inactiva"}
                              </span>
                              <button
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  materiasActivas[m.id]
                                    ? "bg-[#0f4c8a]"
                                    : "bg-[#c8dff2]"
                                }`}
                                onClick={() => handleToggleMateria(m.id)}
                                type="button"
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    materiasActivas[m.id]
                                      ? "translate-x-6"
                                      : "translate-x-1"
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal crear usuario */}
      {showCrear && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
            <h2 className="font-semibold text-lg text-[#082e56]">
              Crear usuario
            </h2>
            <input
              className="w-full border border-[#7aaed8] rounded-xl px-4 py-2 text-sm bg-[#e0eef9]"
              onChange={(e) =>
                setNuevoUsuario((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Nombre"
              value={nuevoUsuario.name}
            />
            <input
              className="w-full border border-[#7aaed8] rounded-xl px-4 py-2 text-sm bg-[#e0eef9]"
              onChange={(e) =>
                setNuevoUsuario((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="Correo electrónico"
              value={nuevoUsuario.email}
            />
            <input
              className="w-full border border-[#7aaed8] rounded-xl px-4 py-2 text-sm bg-[#e0eef9]"
              onChange={(e) =>
                setNuevoUsuario((p) => ({ ...p, password: e.target.value }))
              }
              placeholder="Contraseña (mín. 6 caracteres)"
              type="password"
              value={nuevoUsuario.password}
            />
            <select
              className="w-full border border-[#7aaed8] rounded-xl px-4 py-2 text-sm bg-[#e0eef9]"
              onChange={(e) =>
                setNuevoUsuario((p) => ({ ...p, role: e.target.value }))
              }
              value={nuevoUsuario.role}
            >
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="administrador">Administrador</option>
            </select>
            <div className="flex gap-2 justify-end pt-2">
              <button
                className="px-4 py-2 text-sm rounded-xl border border-[#7aaed8] hover:bg-[#e0eef9] text-[#082e56]"
                onClick={() => setShowCrear(false)}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm rounded-xl bg-[#0f4c8a] text-white font-medium hover:bg-[#082e56] transition-colors"
                onClick={handleCrear}
                type="button"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
