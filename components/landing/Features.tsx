const FEATURES = [
  {
    icon: "💬",
    title: "Consultas instantáneas",
    desc: "Pregunta cualquier duda y obtén respuesta inmediata con ejemplos claros.",
  },
  {
    icon: "💻",
    title: "Ejemplos de código",
    desc: "Genera ejemplos en Java y Python con comentarios explicativos paso a paso.",
  },
  {
    icon: "🧩",
    title: "Guía de ejercicios",
    desc: "El chatbot te guía sin darte la solución directa, fomentando tu aprendizaje.",
  },
  {
    icon: "📖",
    title: "Índice temático",
    desc: "Accede al contenido organizado por materia y tema para estudiar estructurado.",
  },
  {
    icon: "🔖",
    title: "Guarda recursos",
    desc: "Marca respuestas útiles y organízalas por materia para revisarlas después.",
  },
  {
    icon: "👩‍🏫",
    title: "Respaldo docente",
    desc: "Si la IA no sabe la respuesta, tu docente la recibe y responde para todos.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      style={{ padding: "100px 60px", background: "#e8f3fc" }}
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
          Funcionalidades
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
          ¿Qué puedes hacer con EduBot?
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
          Tu compañero de estudio inteligente para tres materias clave.
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
        {FEATURES.map((f) => (
          <div
            key={f.title}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "28px",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "22px", marginBottom: "18px" }}>
              {f.icon}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "17px",
                color: "#0a1f3d",
                marginBottom: "8px",
              }}
            >
              {f.title}
            </div>
            <div
              style={{ fontSize: "14px", color: "#5a7a99", lineHeight: 1.7 }}
            >
              {f.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
