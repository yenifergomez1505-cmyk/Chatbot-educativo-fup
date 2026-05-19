import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          height: "64px",
          background: "rgba(10,31,61,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #00c2ff, #38e8c0)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "16px",
              color: "#0a1f3d",
            }}
          >
            E
          </div>
          <span style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>
            EduBot <span style={{ color: "#00c2ff" }}>FUP</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a
            href="#features"
            style={{
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Funciones
          </a>
          <a
            href="#materias"
            style={{
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Materias
          </a>
          <a
            href="#como"
            style={{
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Cómo funciona
          </a>
          <Link
            href="/login"
            style={{
              background: "linear-gradient(135deg, #00c2ff, #0f4c8a)",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            Ingresar →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          background: "#0a1f3d",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,194,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(0,194,255,0.1) 0%, transparent 70%)",
            top: "-100px",
            right: "-100px",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "760px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0,194,255,0.12)",
              border: "1px solid rgba(0,194,255,0.25)",
              color: "#00c2ff",
              fontSize: "12px",
              fontWeight: 500,
              padding: "6px 14px",
              borderRadius: "20px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                background: "#00c2ff",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            Ingeniería de Sistemas · FUP Popayán
          </div>
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}
          >
            Tu asistente académico{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00c2ff, #38e8c0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              inteligente
            </span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto 40px",
              fontWeight: 300,
            }}
          >
            Resuelve dudas de programación, estructuras de datos e ingeniería de
            software en cualquier momento, sin esperar al profesor.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/register"
              style={{
                background: "linear-gradient(135deg, #00c2ff, #0f4c8a)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(0,194,255,0.3)",
              }}
            >
              Empezar ahora →
            </Link>
            <a
              href="#como"
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.8)",
                padding: "14px 32px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Ver cómo funciona
            </a>
          </div>
        </div>

        {/* Chat preview */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: "60px",
            width: "100%",
            maxWidth: "620px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex", gap: "5px" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <span
                    key={c}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: c,
                      display: "inline-block",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "12px",
                  marginLeft: "8px",
                }}
              >
                EduBot FUP
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  background: "rgba(0,194,255,0.15)",
                  color: "#00c2ff",
                  fontSize: "11px",
                  padding: "3px 10px",
                  borderRadius: "10px",
                  border: "1px solid rgba(0,194,255,0.2)",
                }}
              >
                📚 Estructura de Datos
              </span>
            </div>
            <div
              style={{
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row-reverse",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 700,
                  }}
                >
                  YG
                </div>
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius: "14px 4px 14px 14px",
                    background:
                      "linear-gradient(135deg, rgba(0,194,255,0.2), rgba(26,106,181,0.3))",
                    border: "1px solid rgba(0,194,255,0.2)",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                >
                  ¿Puedes mostrarme cómo funciona una lista enlazada?
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "linear-gradient(135deg, #00c2ff, #38e8c0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "13px",
                    color: "#0a1f3d",
                  }}
                >
                  E
                </div>
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius: "4px 14px 14px 14px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                >
                  ¡Claro! Una lista enlazada está formada por nodos:
                  <div
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      marginTop: "8px",
                      fontFamily: "monospace",
                      fontSize: "11px",
                      color: "#38e8c0",
                      lineHeight: 1.6,
                      border: "1px solid rgba(56,232,192,0.15)",
                    }}
                  >
                    class Nodo {"{"}
                    <br />
                    &nbsp;&nbsp;int dato;
                    <br />
                    &nbsp;&nbsp;Nodo siguiente;
                    <br />
                    {"}"}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "14px 20px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Escribe tu pregunta...
              </div>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "linear-gradient(135deg, #00c2ff, #0f4c8a)",
                  borderRadius: "9px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  boxShadow: "0 4px 12px rgba(0,194,255,0.3)",
                }}
              >
                ↑
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
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
        {[
          { n: "3", l: "Materias disponibles" },
          { n: "24/7", l: "Disponibilidad" },
          { n: "IA", l: "Potenciado por IA" },
          { n: "FUP", l: "Fundación Universitaria de Popayán" },
        ].map((s) => (
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

      {/* FEATURES */}
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
          {[
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
          ].map((f) => (
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

      {/* MATERIAS */}
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
            Consulta temas, pide explicaciones y genera ejercicios para
            cualquiera de estas asignaturas.
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
          {[
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
          ].map((m) => (
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

      {/* HOW */}
      <section
        id="como"
        style={{ padding: "100px 60px", background: "#0a1f3d" }}
      >
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
          {[
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
          ].map((s) => (
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

      {/* CTA */}
      <section
        style={{
          padding: "100px 60px",
          background: "linear-gradient(135deg,#0a1f3d,#0f4c8a)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px,4vw,48px)",
            color: "#fff",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}
        >
          ¿Listo para estudiar diferente?
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "36px",
          }}
        >
          Únete a EduBot FUP y transforma la forma en que aprendes programación.
        </p>
        <Link
          href="/register"
          style={{
            background: "linear-gradient(135deg,#00c2ff,#0f4c8a)",
            color: "#fff",
            padding: "16px 40px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 8px 32px rgba(0,194,255,0.3)",
          }}
        >
          Crear mi cuenta gratis →
        </Link>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#060f1e",
          padding: "32px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              background: "linear-gradient(135deg,#00c2ff,#38e8c0)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "13px",
              color: "#0a1f3d",
            }}
          >
            E
          </div>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            EduBot FUP · Fundación Universitaria de Popayán
          </span>
        </div>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
          © 2026 EduBot FUP
        </span>
      </footer>
    </div>
  );
}
