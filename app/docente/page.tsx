import { BarChartIcon, BookOpenIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/app/(auth)/auth";
import { getConsultasSinRespuesta, getEstadisticas } from "@/lib/db/queries";

const MATERIA_LABELS: Record<string, string> = {
  poo: "POO",
  "estructura-de-datos": "Estructura de Datos",
  "ingenieria-de-software": "Ingeniería de Software I",
};

export default async function DocenteDashboard() {
  const session = await auth();
  const nombre = session?.user?.name ?? "Docente";

  const stats = await getEstadisticas();
  const consultas = await getConsultasSinRespuesta();
  const pendientes = consultas.filter((c) => !c.respondida);

  return (
    <div>
      {/* Saludo */}
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-[#082e56]">
          Bienvenida, {nombre}
        </h1>
        <p className="text-xs text-[#1a6ab5] mt-1">
          Aquí tienes el resumen de hoy
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatCard
          color="text-red-600"
          label="Consultas pendientes"
          numero={pendientes.length}
        />
        <StatCard
          color="text-[#0f4c8a]"
          label="Consultas totales"
          numero={stats.totalConsultas ?? 0}
        />
        <StatCard
          color="text-green-700"
          label="Estudiantes activos"
          numero={stats.totalUsuarios ?? 0}
        />
        <StatCard
          color="text-amber-700"
          label="Satisfacción IA"
          numero={`${stats.promCalificacion ?? 0}/5`}
        />
      </div>

      {/* Consultas urgentes */}
      <div className="bg-white border border-[#7aaed8] rounded-xl p-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[#082e56]">
            Consultas sin respuesta IA
          </span>
          <span className="bg-red-50 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-semibold">
            {pendientes.length} pendientes
          </span>
        </div>

        {pendientes.length === 0 ? (
          <div className="text-center py-6 text-[#4a8dc4] text-xs">
            No hay consultas pendientes
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {pendientes.slice(0, 3).map((c) => (
              <div
                className="flex items-center justify-between gap-3 bg-white border border-[#c8dff2] rounded-lg px-3 py-2.5"
                key={c.id}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#082e56] truncate">
                    {c.pregunta}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="bg-[#e0eef9] text-[#0f4c8a] text-[10px] px-2 py-0.5 rounded-full">
                      {MATERIA_LABELS[c.materia] ?? c.materia}
                    </span>
                    <span className="text-[10px] text-[#4a8dc4]">
                      {new Date(c.creadoEn).toLocaleDateString("es-CO")}
                    </span>
                  </div>
                </div>
                <Link
                  className="bg-[#0f4c8a] text-white text-[11px] px-3 py-1.5 rounded-lg hover:bg-[#082e56] transition-colors shrink-0"
                  href="/docente/consultas"
                >
                  Responder
                </Link>
              </div>
            ))}
          </div>
        )}

        {pendientes.length > 3 && (
          <div className="text-center mt-3">
            <Link
              className="text-xs text-[#0f4c8a] hover:underline"
              href="/docente/consultas"
            >
              Ver todas ({pendientes.length}) →
            </Link>
          </div>
        )}
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link
          className="bg-white border border-[#7aaed8] rounded-xl p-4 flex items-center gap-3 hover:bg-[#e0eef9] transition-colors"
          href="/docente/conocimiento"
        >
          <div className="w-10 h-10 bg-[#e0eef9] rounded-lg flex items-center justify-center shrink-0">
            <BookOpenIcon className="size-5 text-[#0f4c8a]" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#082e56]">
              Base de conocimiento
            </div>
            <div className="text-[11px] text-[#1a6ab5]">
              Agregar o editar temas
            </div>
          </div>
        </Link>
        <Link
          className="bg-white border border-[#7aaed8] rounded-xl p-4 flex items-center gap-3 hover:bg-[#e0eef9] transition-colors"
          href="/docente/estadisticas"
        >
          <div className="w-10 h-10 bg-[#e0eef9] rounded-lg flex items-center justify-center shrink-0">
            <BarChartIcon className="size-5 text-[#0f4c8a]" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#082e56]">
              Estadísticas
            </div>
            <div className="text-[11px] text-[#1a6ab5]">
              Ver temas más consultados
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  numero,
  label,
  color,
}: {
  numero: number | string;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-[#c8dff2] rounded-xl px-4 py-3 text-center">
      <div className={`text-2xl font-bold ${color}`}>{numero}</div>
      <div className="text-[10px] text-[#1a6ab5] mt-1">{label}</div>
    </div>
  );
}
