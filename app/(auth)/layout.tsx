export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh w-screen items-center justify-center bg-edubot-bg">
      <div className="w-full max-w-sm rounded-2xl border border-edubot-border bg-white p-8 shadow-md">
        {/* Logo */}
        <div className="mb-5 flex flex-col items-center">
          <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-edubot-primary text-white text-xl">
            🤖
          </div>
          <span className="text-lg font-semibold text-edubot-dark">
            EduBot FUP
          </span>
          <span className="text-xs text-edubot-medium">
            Ingeniería de Sistemas
          </span>
        </div>

        {children}

        <p className="mt-6 text-center text-[10px] text-edubot-light">
          © 2026 EduBot FUP · Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
