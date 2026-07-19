import Link from "next/link";

export function Cta() {
  return (
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
  );
}
