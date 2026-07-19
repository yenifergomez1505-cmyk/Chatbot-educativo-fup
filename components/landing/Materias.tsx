const MATERIAS_LANDING = [
  {
    num: "01",
    name: "Programación Orientada a Objetos",
    desc: "Aprende los pilares fundamentales de la POO con ejemplos en Java.",
    tags: ["Clases", "Herencia", "Polimorfismo", "Abstracción"],
    bg: "linear-gradient(135deg,#0a1f3d,#0f4c8a)",
  },
  {
    num: "02",
    name: "Estructura de Datos",
    desc: "Domina las estructuras y algoritmos para resolver problemas eficientemente.",
    tags: ["Listas", "Árboles", "Grafos", "Sorting"],
    bg: "linear-gradient(135deg,#0f4c8a,#1a6ab5)",
  },
  {
    num: "03",
    name: "Ingeniería de Software I",
    desc: "Comprende ciclos de vida, metodologías y principios del desarrollo.",
    tags: ["Ciclos de vida", "Requerimientos", "Diseño"],
    bg: "linear-gradient(135deg,#1a6ab5,#4a8dc4)",
  },
];

export function Materias() {
  return (
    <section
      id="materias"
      style={{ padding: "100px 60px", background: "#fff" }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#0f4c8a",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "12px",
          }}
        >
          Contenido disponible
        </div>
        <h2
          style={{
            fontSize: "clamp(28px,4vw,42px)",
            fontWeight: 800,
            color: "#0a1f3d",
            letterSpacing: "-0.03em",
            marginBottom: "12px",
          }}
        >
          Tres materias, un asistente
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#5a7a99",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Consulta temas, pide explicaciones y genera ejercicios para cualquiera
          de estas asignaturas.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {MATERIAS_LANDING.map((m) => (
          <div
            key={m.num}
            style={{
              borderRadius: "20px",
              padding: "32px 28px",
              background: m.bg,
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                opacity: 0.5,
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              Materia {m.num}
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                marginBottom: "10px",
                lineHeight: 1.2,
              }}
            >
              {m.name}
            </div>
            <div
              style={{
                fontSize: "13px",
                opacity: 0.7,
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              {m.desc}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {m.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "3px 9px",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
