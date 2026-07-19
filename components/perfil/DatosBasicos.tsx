export function DatosBasicos({
  nombre,
  correo,
  onNombreChange,
}: {
  nombre: string;
  correo: string;
  onNombreChange: (v: string) => void;
}) {
  return (
    <>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="nombre">
          Nombre completo
        </label>
        <input
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          id="nombre"
          onChange={(e) => onNombreChange(e.target.value)}
          placeholder="Tu nombre completo"
          type="text"
          value={nombre}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="correo">
          Correo institucional
        </label>
        <input
          className="w-full rounded-xl border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
          disabled
          id="correo"
          type="email"
          value={correo}
        />
        <p className="text-xs text-muted-foreground">
          El correo no se puede cambiar.
        </p>
      </div>
    </>
  );
}
