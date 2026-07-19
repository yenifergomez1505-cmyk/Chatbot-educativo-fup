import type { Usuario } from "@/types/admin";

export function TabUsuarios({
  usuariosFiltrados,
  totalUsuarios,
  editando,
  busqueda,
  filtroRol,
  onBusquedaChange,
  onFiltroRolChange,
  onEditar,
  onCambiarRol,
  onEliminar,
  onAgregar,
}: {
  usuariosFiltrados: Usuario[];
  totalUsuarios: number;
  editando: string | null;
  busqueda: string;
  filtroRol: string;
  onBusquedaChange: (v: string) => void;
  onFiltroRolChange: (v: string) => void;
  onEditar: (id: string | null) => void;
  onCambiarRol: (userId: string, role: string) => void;
  onEliminar: (userId: string) => void;
  onAgregar: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#7aaed8] shadow-sm">
      <div className="px-5 py-4 border-b border-[#c8dff2] space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm text-[#082e56]">
            Gestión de usuarios
          </h2>
          <button
            className="text-xs px-3 py-1.5 rounded-lg bg-[#0f4c8a] text-white font-medium hover:bg-[#082e56] transition-colors"
            onClick={onAgregar}
            type="button"
          >
            + Agregar
          </button>
        </div>
        <div className="flex gap-3">
          <input
            className="flex-1 text-sm border border-[#7aaed8] rounded-lg px-3 py-1.5 bg-[#e0eef9] focus:outline-none focus:ring-2 focus:ring-[#0f4c8a]/30"
            onChange={(e) => onBusquedaChange(e.target.value)}
            placeholder="Buscar por nombre o correo..."
            type="text"
            value={busqueda}
          />
          <select
            className="text-sm border border-[#7aaed8] rounded-lg px-3 py-1.5 bg-[#e0eef9] focus:outline-none"
            onChange={(e) => onFiltroRolChange(e.target.value)}
            value={filtroRol}
          >
            <option value="todos">Todos los roles</option>
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <p className="text-xs text-[#1a6ab5]">
          {usuariosFiltrados.length} de {totalUsuarios} usuarios
        </p>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#c8dff2] bg-[#e0eef9]">
            {["Nombre", "Correo", "Rol", "Registro", "Acción"].map((h) => (
              <th
                className="text-left px-5 py-3 text-xs font-medium text-[#1a6ab5]"
                key={h}
              >
                {h}
              </th>
            ))}
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
              <td className="px-5 py-3 text-sm text-[#1a6ab5]">{u.email}</td>
              <td className="px-5 py-3">
                {editando === u.id ? (
                  <select
                    autoFocus
                    className="text-xs border border-[#7aaed8] rounded-lg px-2 py-1 bg-[#e0eef9]"
                    defaultValue={u.role}
                    onChange={(e) => onCambiarRol(u.id, e.target.value)}
                  >
                    <option value="estudiante">Estudiante</option>
                    <option value="docente">Docente</option>
                    <option value="administrador">Administrador</option>
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
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
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
                    onClick={() => onEditar(editando === u.id ? null : u.id)}
                    type="button"
                  >
                    {editando === u.id ? "Cancelar" : "Editar"}
                  </button>
                  <span className="text-[#7aaed8]">·</span>
                  <button
                    className="text-xs text-red-500 hover:underline font-medium"
                    onClick={() => onEliminar(u.id)}
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
  );
}
