export function StatCard({
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
