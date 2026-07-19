export function FormularioContrasena({
  currentPassword,
  password,
  confirmPassword,
  onCurrentPasswordChange,
  onPasswordChange,
  onConfirmPasswordChange,
}: {
  currentPassword: string;
  password: string;
  confirmPassword: string;
  onCurrentPasswordChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onConfirmPasswordChange: (v: string) => void;
}) {
  return (
    <div className="border-t border-border pt-4 space-y-3">
      <p className="text-sm font-medium text-foreground">Cambiar contraseña</p>

      <div className="space-y-1.5">
        <label
          className="text-sm text-muted-foreground"
          htmlFor="currentPassword"
        >
          Contraseña actual
        </label>
        <input
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          id="currentPassword"
          onChange={(e) => onCurrentPasswordChange(e.target.value)}
          placeholder="••••••••"
          type="password"
          value={currentPassword}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm text-muted-foreground" htmlFor="password">
          Nueva contraseña
        </label>
        <input
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          id="password"
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="••••••••"
          type="password"
          value={password}
        />
      </div>

      <div className="space-y-1.5">
        <label
          className="text-sm text-muted-foreground"
          htmlFor="confirmPassword"
        >
          Confirmar nueva contraseña
        </label>
        <input
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          id="confirmPassword"
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          placeholder="••••••••"
          type="password"
          value={confirmPassword}
        />
      </div>
    </div>
  );
}
