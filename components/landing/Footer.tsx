export function Footer() {
  return (
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
  );
}
