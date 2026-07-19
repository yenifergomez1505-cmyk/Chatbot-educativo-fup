export function FiltroMateria({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      <option value="">Todas las materias</option>
      <option value="poo">POO</option>
      <option value="estructura-de-datos">Estructura de Datos</option>
      <option value="ingenieria-de-software">Ingeniería de Software I</option>
    </select>
  );
}
