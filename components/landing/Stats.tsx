const STATS = [
  { n: "3", l: "Materias disponibles" },
  { n: "24/7", l: "Disponibilidad" },
  { n: "IA", l: "Potenciado por IA" },
  { n: "FUP", l: "Fundación Universitaria de Popayán" },
];

export function Stats() {
  return (
    <div
      style={{
        background: "#0a1f3d",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "24px 60px",
        display: "flex",
        justifyContent: "center",
        gap: "64px",
      }}
    >
      {STATS.map((s) => (
        <div key={s.l} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #00c2ff, #38e8c0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {s.n}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              marginTop: "3px",
            }}
          >
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}
