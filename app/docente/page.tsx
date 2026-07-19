import { auth } from "@/app/(auth)/auth";
import { AccesosRapidos } from "@/components/docente/AccesosRapidos";
import { ConsultasPendientesPanel } from "@/components/docente/ConsultasPendientesPanel";
import { StatCard } from "@/components/docente/StatCard";
import { getConsultasSinRespuesta, getEstadisticas } from "@/lib/db/queries";

export default async function DocenteDashboard() {
  const session = await auth();
  const nombre = session?.user?.name ?? "Docente";

  const stats = await getEstadisticas();
  const consultas = await getConsultasSinRespuesta();
  const pendientes = consultas.filter((c) => !c.respondida);

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-[#082e56]">
          Bienvenida, {nombre}
        </h1>
        <p className="text-xs text-[#1a6ab5] mt-1">
          Aquí tienes el resumen de hoy
        </p>
      </div>

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

      <ConsultasPendientesPanel pendientes={pendientes} />

      <AccesosRapidos />
    </div>
  );
}
