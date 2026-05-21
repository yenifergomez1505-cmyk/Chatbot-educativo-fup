import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a1f3d",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Glow fondo */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,194,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Glow fondo */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(0,194,255,0.12) 0%, transparent 70%)",
          top: "-200px",
          right: "-200px",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(56,232,192,0.07) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-100px",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      {/* Tarjeta */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "440px",
          margin: "20px",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(10,31,61,0.12)",
          border: "1px solid #e0eef9",
          display: "grid",
          gridTemplateColumns: "6px 1fr",
        }}
      >
        {/* Franja lateral — se cambia por cada página vía CSS variable */}
        <div
          style={{ background: "linear-gradient(180deg, #00c2ff, #0a1f3d)" }}
        />

        {/* Contenido */}
        <div style={{ padding: "32px 28px" }}>
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #0a1f3d, #0f4c8a)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}
            >
              🤖
            </div>
            <div>
              <div
                style={{ color: "#0a1f3d", fontWeight: 700, fontSize: "15px" }}
              >
                EduBot <span style={{ color: "#00c2ff" }}>FUP</span>
              </div>
              <div style={{ color: "#5a7a99", fontSize: "11px" }}>
                Ingeniería de Sistemas
              </div>
            </div>
          </div>

          {children}

          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "9px",
              color: "#ccd",
            }}
          >
            © 2026 EduBot FUP · Todos los derechos reservados
          </p>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
