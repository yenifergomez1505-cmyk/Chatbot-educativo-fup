import type { NuevoUsuario } from "@/types/admin";

export function ModalCrearUsuario({
  usuario,
  onCampoChange,
  onCrear,
  onCancelar,
}: {
  usuario: NuevoUsuario;
  onCampoChange: (campo: keyof NuevoUsuario, valor: string) => void;
  onCrear: () => void;
  onCancelar: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4">
        <h2 className="font-semibold text-lg text-[#082e56]">Crear usuario</h2>
        <input
          className="w-full border border-[#7aaed8] rounded-xl px-4 py-2 text-sm bg-[#e0eef9]"
          onChange={(e) => onCampoChange("name", e.target.value)}
          placeholder="Nombre"
          value={usuario.name}
        />
        <input
          className="w-full border border-[#7aaed8] rounded-xl px-4 py-2 text-sm bg-[#e0eef9]"
          onChange={(e) => onCampoChange("email", e.target.value)}
          placeholder="Correo electrónico"
          value={usuario.email}
        />
        <input
          className="w-full border border-[#7aaed8] rounded-xl px-4 py-2 text-sm bg-[#e0eef9]"
          onChange={(e) => onCampoChange("password", e.target.value)}
          placeholder="Contraseña (mín. 6 caracteres)"
          type="password"
          value={usuario.password}
        />
        <select
          className="w-full border border-[#7aaed8] rounded-xl px-4 py-2 text-sm bg-[#e0eef9]"
          onChange={(e) => onCampoChange("role", e.target.value)}
          value={usuario.role}
        >
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          <option value="administrador">Administrador</option>
        </select>
        <div className="flex gap-2 justify-end pt-2">
          <button
            className="px-4 py-2 text-sm rounded-xl border border-[#7aaed8] hover:bg-[#e0eef9] text-[#082e56]"
            onClick={onCancelar}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-sm rounded-xl bg-[#0f4c8a] text-white font-medium hover:bg-[#082e56] transition-colors"
            onClick={onCrear}
            type="button"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
