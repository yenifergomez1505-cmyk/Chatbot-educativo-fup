const PUNTOS_VENTANA = ["#ff5f57", "#febc2e", "#28c840"];

export function ChatPreview() {
  return (
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
            {PUNTOS_VENTANA.map((c) => (
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
  );
}
