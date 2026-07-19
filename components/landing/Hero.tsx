import Link from "next/link";
import { ChatPreview } from "./ChatPreview";

export function Hero() {
  return (
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
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "760px",
        }}
      >
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
          Tu asistente academico inteligente
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
          Resuelve dudas de programacion, estructuras de datos e ingenieria de
          software en cualquier momento.
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
            }}
          >
            Empezar ahora
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
            Ver como funciona
          </a>
        </div>
      </div>
      <ChatPreview />
    </section>
  );
}
