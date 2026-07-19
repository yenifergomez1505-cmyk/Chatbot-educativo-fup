"use client";

import type { RolRegistro } from "@/types/auth";

interface Props {
  role: RolRegistro;
  onChange: (role: RolRegistro) => void;
}

const OPCIONES: { id: RolRegistro; label: string; emoji: string }[] = [
  { id: "estudiante", label: "Estudiante", emoji: "👤" },
  { id: "docente", label: "Docente", emoji: "🧑‍🏫" },
];

export function RoleSelector({ role, onChange }: Props) {
  return (
    <div>
      <p className="mb-2 block text-[11px] font-medium text-edubot-primary">
        Selecciona tu rol
      </p>
      <div className="flex gap-2">
        {OPCIONES.map((op) => (
          <button
            className={`flex flex-1 flex-col items-center rounded-md py-2 text-[11px] font-medium transition-all border ${
              role === op.id
                ? "bg-edubot-bg border-edubot-primary text-edubot-dark"
                : "bg-edubot-input border-edubot-light text-edubot-medium"
            }`}
            key={op.id}
            onClick={() => onChange(op.id)}
            type="button"
          >
            <span className="mb-1 text-base">{op.emoji}</span>
            {op.label}
          </button>
        ))}
      </div>
      <input name="role" type="hidden" value={role} />
    </div>
  );
}
