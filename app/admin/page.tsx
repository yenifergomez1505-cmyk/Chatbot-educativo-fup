/** biome-ignore-all lint/suspicious/noAlert: <explanation> */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  UsersIcon,
  BarChartIcon,
  MessageSquareIcon,
  ArrowLeftIcon,
  ShieldIcon,
} from "lucide-react";

const MATERIA_LABELS: Record<string, string> = {
  poo: "POO",
  "estructura-de-datos": "Estructura de Datos",
  "ingenieria-de-software": "Ingeniería de Software I",
};

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

type Tab = "usuarios" | "estadisticas" | "consultas";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("usuarios");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [respuesta, setRespuesta] = useState<Record<string, string>>({});
  const [editando, setEditando] = useState<string | null>(null);
  const [showCrear, setShowCrear] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Header */}
      <div className="bg-[#1a3a5c] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-white hover:opacity-80"
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

      <div className="flex min-h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <div className="w-44 bg-[#1a3a5c] flex flex-col pt-4">
          <div className="px-4 pb-4 border-b border-white/10">
            <p className="text-white font-semibold text-sm">Panel Admin</p>
            <p className="text-white/50 text-xs">Administrador</p>
          </div>
          {[
            { id: "usuarios", label: "Usuarios", icon: UsersIcon },
            { id: "estadisticas", label: "Estadísticas", icon: BarChartIcon },
            { id: "consultas", label: "Conocimiento", icon: MessageSquareIcon },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id as Tab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors w-full text-left ${
                tab === id
                  ? "bg-[#2563a8] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Usuarios activos", value: totalUsuarios },
              { label: "Consultas totales", value: totalConsultas },
              { label: "Sin respuesta IA", value: sinResponder },
              { label: "Tasa satisfacción", value: "—" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-card rounded-xl border border-border p-4 text-center shadow-sm"
              >
                <p className="text-2xl font-bold text-[#1a3a5c] dark:text-foreground">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <p className="text-muted-foreground text-sm">Cargando...</p>
            </div>
          ) : (
            <>
              {/* TAB USUARIOS */}
              {tab === "usuarios" && (
                <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <h2 className="font-semibold text-sm">
                      Gestión de usuarios
                    </h2>
                    <button
                      type="button"
                      onClick={() => setShowCrear(true)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#1a3a5c] text-white font-medium hover:opacity-90"
                    >
                      + Agregar
                    </button>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-gray-50 dark:bg-muted/30">
                        <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">
                          Nombre
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">
                          Correo
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">
                          Rol
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">
                          Registro
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((u) => (
                        <tr
                          key={u.id}
                          className="border-b border-border last:border-0 hover:bg-gray-50 dark:hover:bg-muted/20"
                        >
                          <td className="px-5 py-3 text-sm font-medium">
                            {u.name ?? "Sin nombre"}
                          </td>
                          <td className="px-5 py-3 text-sm text-muted-foreground">
                            {u.email}
                          </td>
                          <td className="px-5 py-3">
                            {editando === u.id ? (
                              <select
                                defaultValue={u.role}
                                onChange={(e) =>
                                  handleCambiarRol(u.id, e.target.value)
                                }
                                className="text-xs border border-input rounded-lg px-2 py-1 bg-background"
                                autoFocus
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
                                      : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {u.role.charAt(0).toUpperCase() +
                                  u.role.slice(1)}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3 text-xs text-muted-foreground">
                            {new Date(u.createdAt).toLocaleDateString("es-CO")}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setEditando(editando === u.id ? null : u.id)
                                }
                                className="text-xs text-[#2563a8] hover:underline font-medium"
                              >
                                {editando === u.id ? "Cancelar" : "Editar"}
                              </button>
                              <span className="text-muted-foreground">·</span>
                              <button
                                type="button"
                                onClick={() => handleEliminar(u.id)}
                                className="text-xs text-red-500 hover:underline font-medium"
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
                  {/* Temas más consultados */}
                  <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm p-5">
                    <h2 className="font-semibold text-sm mb-4">
                      Temas más consultados
                    </h2>
                    {estadisticas.consultasPorMateria.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No hay datos aún — los temas aparecerán cuando los
                        estudiantes hagan consultas
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {estadisticas.consultasPorMateria.map((item) => (
                          <div
                            key={item.materia}
                            className="flex items-center gap-4"
                          >
                            <span className="text-sm w-48 shrink-0">
                              {MATERIA_LABELS[item.materia] ?? item.materia}
                            </span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#1a3a5c] rounded-full"
                                style={{
                                  width: `${Math.min(100, (Number(item.total) / Math.max(1, Number(estadisticas.totalConsultas))) * 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground w-8 text-right">
                              {item.total}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Consultas pendientes */}
                  <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm p-5">
                    <h2 className="font-semibold text-sm mb-4">
                      Consultas pendientes de respuesta docente
                    </h2>
                    {(estadisticas.pendientes ?? []).length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-6">
                        No hay consultas pendientes 🎉
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {(estadisticas.pendientes ?? []).map((c) => (
                          <div
                            key={c.id}
                            className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
                          >
                            <div>
                              <p className="text-sm font-medium">
                                {c.pregunta}
                              </p>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium mt-1 inline-block">
                                {MATERIA_LABELS[c.materia] ?? c.materia}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setTab("consultas")}
                              className="text-xs px-3 py-1.5 rounded-lg bg-[#1a3a5c] text-white font-medium hover:opacity-90 shrink-0 ml-4"
                            >
                              Responder
                            </button>
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
                    <div className="bg-white dark:bg-card rounded-xl border border-border p-10 text-center">
                      <MessageSquareIcon className="size-10 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">
                        No hay consultas pendientes
                      </p>
                    </div>
                  ) : (
                    consultas.map((c) => (
                      <div
                        key={c.id}
                        className="bg-white dark:bg-card rounded-xl border border-border p-4 space-y-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                            {MATERIA_LABELS[c.materia] ?? c.materia}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.respondida ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                          >
                            {c.respondida ? "✓ Respondida" : "Pendiente"}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{c.pregunta}</p>
                        {!c.respondida && (
                          <div className="space-y-2">
                            <textarea
                              value={respuesta[c.id] ?? ""}
                              onChange={(e) =>
                                setRespuesta((prev) => ({
                                  ...prev,
                                  [c.id]: e.target.value,
                                }))
                              }
                              placeholder="Escribe tu respuesta..."
                              rows={3}
                              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none resize-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleResponder(c.id)}
                              className="px-4 py-2 bg-[#1a3a5c] text-white rounded-xl text-sm font-medium hover:opacity-90"
                            >
                              Enviar respuesta
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal crear usuario */}
      {showCrear && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-card rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
            <h2 className="font-semibold text-lg">Crear usuario</h2>
            <input
              placeholder="Nombre"
              value={nuevoUsuario.name}
              onChange={(e) =>
                setNuevoUsuario((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full border border-input rounded-xl px-4 py-2 text-sm bg-background"
            />
            <input
              placeholder="Correo electrónico"
              value={nuevoUsuario.email}
              onChange={(e) =>
                setNuevoUsuario((p) => ({ ...p, email: e.target.value }))
              }
              className="w-full border border-input rounded-xl px-4 py-2 text-sm bg-background"
            />
            <input
              placeholder="Contraseña (mín. 6 caracteres)"
              type="password"
              value={nuevoUsuario.password}
              onChange={(e) =>
                setNuevoUsuario((p) => ({ ...p, password: e.target.value }))
              }
              className="w-full border border-input rounded-xl px-4 py-2 text-sm bg-background"
            />
            <select
              value={nuevoUsuario.role}
              onChange={(e) =>
                setNuevoUsuario((p) => ({ ...p, role: e.target.value }))
              }
              className="w-full border border-input rounded-xl px-4 py-2 text-sm bg-background"
            >
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="administrador">Administrador</option>
            </select>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowCrear(false)}
                className="px-4 py-2 text-sm rounded-xl border border-border hover:bg-muted"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCrear}
                className="px-4 py-2 text-sm rounded-xl bg-[#1a3a5c] text-white font-medium hover:opacity-90"
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