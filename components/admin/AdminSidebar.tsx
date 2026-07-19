import {
  BarChartIcon,
  MessageSquareIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import type { TabAdmin } from "@/types/admin";

const TABS = [
  { id: "usuarios" as TabAdmin, label: "Usuarios", icon: UsersIcon },
  { id: "estadisticas" as TabAdmin, label: "Estadísticas", icon: BarChartIcon },
  {
    id: "consultas" as TabAdmin,
    label: "Conocimiento",
    icon: MessageSquareIcon,
  },
  { id: "materias" as TabAdmin, label: "Materias", icon: SettingsIcon },
];

export function AdminSidebar({
  tab,
  onTabChange,
}: {
  tab: TabAdmin;
  onTabChange: (t: TabAdmin) => void;
}) {
  return (
    <div className="hidden md:flex w-48 bg-[#082e56] flex-col pt-4 shrink-0 overflow-y-auto">
      <div className="px-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 bg-[#e0eef9] rounded-lg flex items-center justify-center">
            <ShieldIcon className="size-4 text-[#0f4c8a]" />
          </div>
          <span className="text-white text-sm font-semibold">EduBot FUP</span>
        </div>
        <p className="text-white font-semibold text-sm">Panel Admin</p>
        <p className="text-white/50 text-xs">Administrador</p>
      </div>

      <nav className="flex-1 flex flex-col gap-0.5 pt-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors w-full text-left ${
              tab === id
                ? "bg-[#0f4c8a] text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            key={id}
            onClick={() => onTabChange(id)}
            type="button"
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-[#0f4c8a] flex items-center justify-center text-white font-semibold text-sm shrink-0">
            AF
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Administrador</p>
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
  );
}
