import Link from "next/link";

export function Navbar() {
  return (
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
          Como funciona
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
          Ingresar
        </Link>
      </div>
    </nav>
  );
}
