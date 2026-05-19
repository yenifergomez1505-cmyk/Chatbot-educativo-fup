import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

export default async function DocenteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const role = headersList.get("x-user-role") ?? "estudiante";
  const nombre = headersList.get("x-user-name") ?? "Docente";
  const userId = headersList.get("x-user-id");

  if (!userId) {
    redirect("/login");
  }

  if (role !== "docente" && role !== "administrador") {
    redirect("/");
  }

  const iniciales = nombre
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex min-h-screen font-sans">
      <aside className="w-48 bg-[#082e56] flex flex-col shrink-0 min-h-screen">
        <div className="px-4 py-4 border-b border-[#1a6ab5] mb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 bg-[#c8dff2] rounded-lg flex items-center justify-center text-[#0f4c8a] text-sm font-bold">
              E
            </span>
            <span className="text-white text-sm font-semibold">EduBot FUP</span>
          </div>
          <div className="text-[#4a8dc4] text-[10px]">Panel Docente</div>
          <div className="text-[#c8dff2] text-[11px] font-medium mt-0.5 truncate">
            {nombre}
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5 px-2">
          <SidebarLink href="/docente" icon="📊" label="Dashboard" />
          <SidebarLink
            href="/docente/consultas"
            icon="💬"
            label="Consultas"
            badge
          />
          <SidebarLink
            href="/docente/conocimiento"
            icon="📚"
            label="Conocimiento"
          />
          <SidebarLink
            href="/docente/estadisticas"
            icon="📈"
            label="Estadísticas"
          />
          <SidebarLink href="/perfil" icon="👤" label="Mi perfil" />
        </nav>

        <div className="px-2 py-3 border-t border-[#1a6ab5]">
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-[#1a6ab5] flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {iniciales}
            </div>
            <div className="min-w-0">
              <div className="text-white text-[11px] font-medium truncate">
                {nombre.split(" ")[0]}
              </div>
              <Link
                href="/api/auth/signout"
                className="text-[#4a8dc4] text-[10px] hover:text-white transition-colors"
              >
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="bg-[#0f4c8a] px-6 flex items-center justify-between h-12 shrink-0">
          <span className="text-white text-sm font-medium">
            EduBot FUP · Docente
          </span>
          <span className="text-[#c8dff2] text-xs">
            {nombre} · <span className="text-[#4a8dc4]">Docente</span>
          </span>
        </div>

        <main className="flex-1 bg-[#e0eef9] p-5 overflow-y-auto">
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
  icon,
  label,
  badge,
}: {
  href: string;
  icon: string;
  label: string;
  badge?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#4a8dc4] text-xs hover:bg-[#0f4c8a] hover:text-white transition-colors"
    >
      <span className="text-sm">{icon}</span>
      <span>{label}</span>
      {badge && <span className="ml-auto w-2 h-2 rounded-full bg-red-500" />}
    </Link>
  );
}