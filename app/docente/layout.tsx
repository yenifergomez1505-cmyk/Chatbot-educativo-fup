import {
  BarChartIcon,
  BookOpenIcon,
  LayoutDashboardIcon,
  MessageCircleIcon,
  ShieldIcon,
  UserCircleIcon,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function DocenteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-sm text-[#1a6ab5]">
          Cargando...
        </div>
      }
    >
      <DocenteShell>{children}</DocenteShell>
    </Suspense>
  );
}

async function DocenteShell({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const role = headersList.get("x-user-role") ?? "estudiante";
  const nombre = headersList.get("x-user-name") ?? "Docente";
  const userId = headersList.get("x-user-id");

  if (!userId) redirect("/login");
  if (role !== "docente" && role !== "administrador") redirect("/");

  const iniciales = nombre
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-screen font-sans overflow-hidden">
      {/* Sidebar — iconos solos en móvil, iconos+texto en desktop */}
      <aside className="bg-[#082e56] flex flex-col shrink-0 h-screen w-12 md:w-48 transition-all duration-300 sticky top-0">
        {/* Logo */}
        <div className="px-2 md:px-4 py-4 border-b border-white/10 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#e0eef9] rounded-lg flex items-center justify-center shrink-0">
              <ShieldIcon className="size-4 text-[#0f4c8a]" />
            </div>
            <div className="hidden md:block">
              <span className="text-white text-sm font-semibold">
                EduBot FUP
              </span>
              <div className="text-[#4a8dc4] text-[10px]">Panel Docente</div>
              <div className="text-[#c8dff2] text-[11px] font-medium truncate max-w-[100px]">
                {nombre}
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-0.5 px-1 md:px-2">
          <SidebarLink
            href="/docente"
            icon={LayoutDashboardIcon}
            label="Dashboard"
          />
          <SidebarLink
            badge
            href="/docente/consultas"
            icon={MessageCircleIcon}
            label="Consultas"
          />
          <SidebarLink
            href="/docente/conocimiento"
            icon={BookOpenIcon}
            label="Conocimiento"
          />
          <SidebarLink
            href="/docente/estadisticas"
            icon={BarChartIcon}
            label="Estadísticas"
          />
          <SidebarLink href="/perfil" icon={UserCircleIcon} label="Mi perfil" />
        </nav>

        {/* Footer */}
        <div className="px-1 md:px-2 py-3 border-t border-white/10">
          <div className="flex items-center gap-2 px-1 md:px-2 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-[#0f4c8a] flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {iniciales}
            </div>
            <div className="hidden md:block min-w-0">
              <div className="text-white text-[11px] font-medium truncate">
                {nombre.split(" ")[0]}
              </div>
              <Link
                className="text-[#4a8dc4] text-[10px] hover:text-white transition-colors"
                href="/api/auth/signout"
              >
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="bg-[#082e56] px-4 md:px-6 flex items-center justify-between h-12 shrink-0">
          <span className="text-white text-sm font-medium">
            EduBot FUP · Docente
          </span>
          <span className="text-[#c8dff2] text-xs hidden sm:block">
            {nombre} · <span className="text-[#4a8dc4]">Docente</span>
          </span>
        </div>

        <main className="flex-1 bg-[#e0eef9] p-4 md:p-6 overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex h-32 items-center justify-center text-sm text-[#1a6ab5]">
                Cargando...
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  label,
  badge,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: boolean;
}) {
  return (
    <Link
      className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg text-[#4a8dc4] text-xs hover:bg-[#0f4c8a] hover:text-white transition-colors group"
      href={href}
    >
      <Icon className="size-4 shrink-0" />
      <span className="hidden md:block">{label}</span>
      {badge && (
        <span className="ml-auto w-2 h-2 rounded-full bg-red-500 hidden md:block" />
      )}
      {badge && <span className="w-2 h-2 rounded-full bg-red-500 md:hidden" />}
    </Link>
  );
}
