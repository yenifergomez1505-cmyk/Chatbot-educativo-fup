const PASOS = [
  {
    n: "1",
    t: "Regístrate",
    d: "Crea tu cuenta con tu correo institucional FUP en segundos.",
  },
  {
    n: "2",
    t: "Elige materia",
    d: "Selecciona POO, Estructura de Datos o Ingeniería de Software.",
  },
  {
    n: "3",
    t: "Pregunta",
    d: "Escribe tu duda, pide ejemplos o solicita ayuda con ejercicios.",
  },
  {
    n: "4",
    t: "Aprende",
    d: "Recibe respuestas claras, guarda recursos y mejora tu rendimiento.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como" style={{ padding: "100px 60px", background: "#0a1f3d" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#00c2ff",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "12px",
          }}
        >
          Proceso
        </div>
        <h2
          style={{
            fontSize: "clamp(28px,4vw,42px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.03em",
            marginBottom: "12px",
          }}
        >
          ¿Cómo funciona?
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          En cuatro pasos sencillos tienes acceso a tu asistente académico.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {PASOS.map((s) => (
          <div
            key={s.n}
            style={{
              textAlign: "center",
              padding: "28px 20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#00c2ff,#0f4c8a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "16px",
                color: "#fff",
                margin: "0 auto 16px",
                boxShadow: "0 4px 16px rgba(0,194,255,0.3)",
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "15px",
                color: "#fff",
                marginBottom: "8px",
              }}
            >
              {s.t}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
              }}
            >
              {s.d}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
