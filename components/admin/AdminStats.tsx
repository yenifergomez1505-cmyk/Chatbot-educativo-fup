export function AdminStats({
  totalUsuarios,
  totalConsultas,
  sinResponder,
}: {
  totalUsuarios: number;
  totalConsultas: number;
  sinResponder: number;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Usuarios activos", value: totalUsuarios },
        { label: "Consultas totales", value: totalConsultas },
        { label: "Sin respuesta IA", value: sinResponder },
        { label: "Tasa satisfacción", value: "—" },
      ].map((s) => (
        <div
          className="bg-white rounded-xl border border-[#7aaed8] p-4 text-center shadow-sm"
          key={s.label}
        >
          <p className="text-2xl font-bold text-[#082e56]">{s.value}</p>
          <p className="text-xs text-[#1a6ab5] mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
