"use client";

import { ArrowLeftIcon, ShieldIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminStats } from "@/components/admin/AdminStats";
import { ModalCrearUsuario } from "@/components/admin/ModalCrearUsuario";
import { TabConsultas } from "@/components/admin/TabConsultas";
import { TabEstadisticas } from "@/components/admin/TabEstadisticas";
import { TabMaterias } from "@/components/admin/TabMaterias";
import { TabUsuarios } from "@/components/admin/TabUsuarios";
import { useAdminConsultas } from "@/hooks/useAdminConsultas";
import { useAdminEstadisticas } from "@/hooks/useAdminEstadisticas";
import { useAdminMaterias } from "@/hooks/useAdminMaterias";
import { useAdminUsuarios } from "@/hooks/useAdminUsuarios";
import type { TabAdmin } from "@/types/admin";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabAdmin>("estadisticas");
  const tabCargadoRef = useRef<Set<TabAdmin>>(new Set());

  const usuariosHook = useAdminUsuarios();
  const estadisticasHook = useAdminEstadisticas();
  const consultasHook = useAdminConsultas();
  const materiasHook = useAdminMaterias();

  useEffect(() => {
    if (tabCargadoRef.current.has(tab)) return;
    tabCargadoRef.current.add(tab);
    if (tab === "usuarios") usuariosHook.cargar();
    else if (tab === "estadisticas") estadisticasHook.cargar();
    else if (tab === "consultas") consultasHook.cargar();
    else if (tab === "materias") materiasHook.cargar();
  }, [tab]);

  const loading =
    tab === "usuarios"
      ? usuariosHook.loading
      : tab === "estadisticas"
        ? estadisticasHook.loading
        : tab === "consultas"
          ? consultasHook.loading
          : false;

  return (
    <div className="min-h-screen bg-[#e0eef9]">
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
        <AdminSidebar onTabChange={setTab} tab={tab} />

        <div className="flex-1 p-3 md:p-6 overflow-y-auto">
          <AdminStats
            sinResponder={
              estadisticasHook.estadisticas?.consultasSinResponder ?? 0
            }
            totalConsultas={estadisticasHook.estadisticas?.totalConsultas ?? 0}
            totalUsuarios={usuariosHook.usuarios.length}
          />

          {loading ? (
            <div className="flex justify-center py-16">
              <p className="text-[#1a6ab5] text-sm">Cargando...</p>
            </div>
          ) : (
            <>
              {tab === "usuarios" && (
                <TabUsuarios
                  busqueda={usuariosHook.busqueda}
                  editando={usuariosHook.editando}
                  filtroRol={usuariosHook.filtroRol}
                  onAgregar={() => usuariosHook.setShowCrear(true)}
                  onBusquedaChange={usuariosHook.setBusqueda}
                  onCambiarRol={usuariosHook.handleCambiarRol}
                  onEditar={usuariosHook.setEditando}
                  onEliminar={usuariosHook.handleEliminar}
                  onFiltroRolChange={usuariosHook.setFiltroRol}
                  totalUsuarios={usuariosHook.usuarios.length}
                  usuariosFiltrados={usuariosHook.usuariosFiltrados}
                />
              )}

              {tab === "estadisticas" && estadisticasHook.estadisticas && (
                <TabEstadisticas estadisticas={estadisticasHook.estadisticas} />
              )}

              {tab === "consultas" && (
                <TabConsultas
                  consultas={consultasHook.consultas}
                  onResponder={consultasHook.handleResponder}
                  onSetRespuesta={(id, texto) =>
                    consultasHook.setRespuesta((prev) => ({
                      ...prev,
                      [id]: texto,
                    }))
                  }
                  respuesta={consultasHook.respuesta}
                />
              )}

              {tab === "materias" && (
                <TabMaterias
                  materiasActivas={materiasHook.materiasActivas}
                  onToggle={materiasHook.handleToggle}
                />
              )}
            </>
          )}
        </div>
      </div>

      {usuariosHook.showCrear && (
        <ModalCrearUsuario
          onCampoChange={(campo, valor) =>
            usuariosHook.setNuevoUsuario((p) => ({ ...p, [campo]: valor }))
          }
          onCancelar={() => usuariosHook.setShowCrear(false)}
          onCrear={usuariosHook.handleCrear}
          usuario={usuariosHook.nuevoUsuario}
        />
      )}
    </div>
  );
}
