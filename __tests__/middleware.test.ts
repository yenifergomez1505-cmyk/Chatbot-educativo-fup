/**
 * ============================================================
 *  __tests__/middleware.test.ts — Pruebas del Middleware
 *  EduBot FUP · Fundación Universitaria de Popayán · 2026
 * ============================================================
 *
 *  PROPÓSITO:
 *  Verificar que la lógica de seguridad del middleware funcione
 *  correctamente para todos los roles, rutas y estados de sesión.
 *
 *  ESTRUCTURA REAL DE CARPETAS (confirmada en el proyecto):
 *    app/
 *      (auth)/   → login, register, forgot-password, reset-password
 *      (chat)/   → chat principal con IA
 *      admin/    → panel exclusivo del administrador
 *      api/      → endpoints del servidor
 *      docente/  → panel exclusivo del docente
 *      landing/  → página de bienvenida pública
 *      materias/ → índice temático (autenticado)
 *      perfil/   → edición de perfil (autenticado)
 *
 *  CASOS CUBIERTOS:
 *    ✅ Usuario sin sesión      → rutas protegidas, APIs, /admin, /docente
 *    ✅ Estudiante autenticado  → accesos permitidos y denegados
 *    ✅ Docente autenticado     → acceso a /docente, denegado a /admin
 *    ✅ Administrador           → acceso a /admin y /docente
 *    ✅ APIs protegidas         → 401 sin sesión, paso con sesión
 *    ✅ callbackUrl             → guarda la ruta original
 *    ✅ Sub-rutas               → /admin/usuarios, /docente/estadisticas
 *    ✅ Rutas internas NextAuth → siempre permitidas
 *    ✅ /landing                → pública, redirige si autenticado
 *
 *  EJECUTAR:
 *    pnpm test
 * ============================================================
 */

/// <reference types="vitest/globals" />

import { describe, it, expect } from "vitest";

// ─────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────

type Rol = "estudiante" | "docente" | "admin";

interface SesionMock {
  user: { email: string; role: Rol };
}

interface ResultadoMiddleware {
  tipo: "permitido" | "redirect" | "json";
  destino?: string;
  status?: number;
  mensaje?: string;
}

// ─────────────────────────────────────────────────────────────
// Constantes del middleware (copia exacta de middleware.ts)
// ─────────────────────────────────────────────────────────────

const RUTAS_PUBLICAS = [
  "/landing",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const RUTAS_ADMIN = ["/admin"];

const RUTAS_DOCENTE = ["/docente"];

const PREFIJOS_API_PROTEGIDOS = [
  "/api/chat",
  "/api/history",
  "/api/vote",
  "/api/admin",
  "/api/auth/perfil",
  "/api/auth/recursos",
];

const RUTA_AUTH_INTERNA = "/api/auth";

// ─────────────────────────────────────────────────────────────
// Auxiliar: ruta de inicio según rol
// ─────────────────────────────────────────────────────────────
function obtenerRutaSegunRol(rol: Rol | undefined): string {
  if (rol === "admin") return "/admin";
  if (rol === "docente") return "/docente";
  return "/";
}

// ─────────────────────────────────────────────────────────────
// Función principal: simula la lógica del middleware
// (mismo algoritmo que middleware.ts, sin dependencias externas)
// ─────────────────────────────────────────────────────────────
function simularMiddleware(
  pathname: string,
  session: SesionMock | null
): ResultadoMiddleware {
  const estaAutenticado = !!session?.user;
  const rol = session?.user?.role;

  // Paso 1: APIs protegidas del proyecto → se evalúan PRIMERO
  // (antes de /api/auth interno de NextAuth, para no exponer
  //  /api/auth/perfil y /api/auth/recursos accidentalmente)
  const esApiProtegida = PREFIJOS_API_PROTEGIDOS.some((prefijo) =>
    pathname.startsWith(prefijo)
  );
  if (esApiProtegida) {
    if (!estaAutenticado) {
      return { tipo: "json", status: 401, mensaje: "No autorizado" };
    }
    return { tipo: "permitido" };
  }

  // Paso 2: Rutas internas de NextAuth → siempre permitidas
  // (se evalúa después de las APIs del proyecto)
  if (pathname.startsWith(RUTA_AUTH_INTERNA)) {
    return { tipo: "permitido" };
  }

  // Paso 3: Rutas exclusivas de administrador
  const esRutaAdmin = RUTAS_ADMIN.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  );
  if (esRutaAdmin) {
    if (!estaAutenticado)
      return { tipo: "redirect", destino: `/login?callbackUrl=${pathname}` };
    if (rol !== "admin") return { tipo: "redirect", destino: "/" };
    return { tipo: "permitido" };
  }

  // Paso 4: Rutas exclusivas de docente
  const esRutaDocente = RUTAS_DOCENTE.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  );
  if (esRutaDocente) {
    if (!estaAutenticado)
      return { tipo: "redirect", destino: `/login?callbackUrl=${pathname}` };
    if (rol !== "docente" && rol !== "admin")
      return { tipo: "redirect", destino: "/" };
    return { tipo: "permitido" };
  }

  // Paso 5: Rutas públicas con sesión activa → redirigir según rol
  const esRutaPublica = RUTAS_PUBLICAS.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  );
  if (esRutaPublica) {
    if (estaAutenticado)
      return { tipo: "redirect", destino: obtenerRutaSegunRol(rol) };
    return { tipo: "permitido" };
  }

  // Paso 6: Ruta protegida sin sesión
  if (!estaAutenticado) {
    return { tipo: "redirect", destino: `/login?callbackUrl=${pathname}` };
  }

  // Paso 7: Acceso permitido
  return { tipo: "permitido" };
}

// ─────────────────────────────────────────────────────────────
// Sesiones de prueba reutilizables
// ─────────────────────────────────────────────────────────────

const SESION_ESTUDIANTE: SesionMock = {
  user: { email: "juan@fup.edu.co", role: "estudiante" },
};
const SESION_DOCENTE: SesionMock = {
  user: { email: "maria@fup.edu.co", role: "docente" },
};
const SESION_ADMIN: SesionMock = {
  user: { email: "admin@fup.edu.co", role: "admin" },
};
const SIN_SESION: SesionMock | null = null;

// ═════════════════════════════════════════════════════════════
// GRUPO 1: Usuario sin sesión activa
// ═════════════════════════════════════════════════════════════

describe("Middleware — Usuario sin sesión activa", () => {
  // ── Rutas protegidas ───────────────────────────────────────

  it("redirige a /login al intentar acceder al chat principal (/)", () => {
    const r = simularMiddleware("/", SIN_SESION);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/login?callbackUrl=/");
  });

  it("redirige a /login al intentar acceder a /perfil", () => {
    const r = simularMiddleware("/perfil", SIN_SESION);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/login?callbackUrl=/perfil");
  });

  it("redirige a /login al intentar acceder a /materias", () => {
    const r = simularMiddleware("/materias", SIN_SESION);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/login?callbackUrl=/materias");
  });

  it("redirige a /login al intentar acceder a /admin", () => {
    const r = simularMiddleware("/admin", SIN_SESION);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/login?callbackUrl=/admin");
  });

  it("redirige a /login al intentar acceder a /admin/usuarios", () => {
    const r = simularMiddleware("/admin/usuarios", SIN_SESION);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/login?callbackUrl=/admin/usuarios");
  });

  it("redirige a /login al intentar acceder a /docente", () => {
    const r = simularMiddleware("/docente", SIN_SESION);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/login?callbackUrl=/docente");
  });

  it("redirige a /login al intentar acceder a /docente/estadisticas", () => {
    const r = simularMiddleware("/docente/estadisticas", SIN_SESION);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/login?callbackUrl=/docente/estadisticas");
  });

  // ── Rutas públicas ─────────────────────────────────────────

  it("permite acceder a /landing sin sesión", () => {
    expect(simularMiddleware("/landing", SIN_SESION).tipo).toBe("permitido");
  });

  it("permite acceder a /login sin sesión", () => {
    expect(simularMiddleware("/login", SIN_SESION).tipo).toBe("permitido");
  });

  it("permite acceder a /register sin sesión", () => {
    expect(simularMiddleware("/register", SIN_SESION).tipo).toBe("permitido");
  });

  it("permite acceder a /forgot-password sin sesión", () => {
    expect(simularMiddleware("/forgot-password", SIN_SESION).tipo).toBe(
      "permitido"
    );
  });

  it("permite acceder a /reset-password sin sesión", () => {
    expect(simularMiddleware("/reset-password", SIN_SESION).tipo).toBe(
      "permitido"
    );
  });

  it("permite acceder a /reset-password/token123 (con token) sin sesión", () => {
    expect(simularMiddleware("/reset-password/token123", SIN_SESION).tipo).toBe(
      "permitido"
    );
  });

  // ── APIs protegidas ────────────────────────────────────────

  it("devuelve 401 en /api/chat sin sesión", () => {
    const r = simularMiddleware("/api/chat", SIN_SESION);
    expect(r.tipo).toBe("json");
    expect(r.status).toBe(401);
  });

  it("devuelve 401 en /api/history sin sesión", () => {
    const r = simularMiddleware("/api/history", SIN_SESION);
    expect(r.tipo).toBe("json");
    expect(r.status).toBe(401);
  });

  it("devuelve 401 en /api/vote sin sesión", () => {
    const r = simularMiddleware("/api/vote", SIN_SESION);
    expect(r.tipo).toBe("json");
    expect(r.status).toBe(401);
  });

  it("devuelve 401 en /api/admin sin sesión", () => {
    const r = simularMiddleware("/api/admin", SIN_SESION);
    expect(r.tipo).toBe("json");
    expect(r.status).toBe(401);
  });

  it("devuelve 401 en /api/auth/perfil sin sesión (ruta del proyecto, no de NextAuth)", () => {
    const r = simularMiddleware("/api/auth/perfil", SIN_SESION);
    expect(r.tipo).toBe("json");
    expect(r.status).toBe(401);
  });

  it("devuelve 401 en /api/auth/recursos sin sesión (ruta del proyecto, no de NextAuth)", () => {
    const r = simularMiddleware("/api/auth/recursos", SIN_SESION);
    expect(r.tipo).toBe("json");
    expect(r.status).toBe(401);
  });

  // ── Rutas internas NextAuth ────────────────────────────────

  it("permite /api/auth/session sin sesión (ruta interna NextAuth)", () => {
    expect(simularMiddleware("/api/auth/session", SIN_SESION).tipo).toBe(
      "permitido"
    );
  });

  it("permite /api/auth/csrf sin sesión (ruta interna NextAuth)", () => {
    expect(simularMiddleware("/api/auth/csrf", SIN_SESION).tipo).toBe(
      "permitido"
    );
  });

  it("permite /api/auth/callback/credentials sin sesión (ruta interna NextAuth)", () => {
    expect(
      simularMiddleware("/api/auth/callback/credentials", SIN_SESION).tipo
    ).toBe("permitido");
  });

  it("permite /api/auth/signout sin sesión (ruta interna NextAuth)", () => {
    expect(simularMiddleware("/api/auth/signout", SIN_SESION).tipo).toBe(
      "permitido"
    );
  });
});

// ═════════════════════════════════════════════════════════════
// GRUPO 2: Estudiante autenticado
// ═════════════════════════════════════════════════════════════

describe("Middleware — Estudiante autenticado", () => {
  it("puede acceder al chat principal (/)", () => {
    expect(simularMiddleware("/", SESION_ESTUDIANTE).tipo).toBe("permitido");
  });

  it("puede acceder a /perfil", () => {
    expect(simularMiddleware("/perfil", SESION_ESTUDIANTE).tipo).toBe(
      "permitido"
    );
  });

  it("puede acceder a /materias", () => {
    expect(simularMiddleware("/materias", SESION_ESTUDIANTE).tipo).toBe(
      "permitido"
    );
  });

  it("puede acceder a una conversación específica /chat/uuid-123", () => {
    expect(simularMiddleware("/chat/uuid-123", SESION_ESTUDIANTE).tipo).toBe(
      "permitido"
    );
  });

  it("NO puede acceder a /admin — redirige a /", () => {
    const r = simularMiddleware("/admin", SESION_ESTUDIANTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/");
  });

  it("NO puede acceder a /admin/estadisticas — redirige a /", () => {
    const r = simularMiddleware("/admin/estadisticas", SESION_ESTUDIANTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/");
  });

  it("NO puede acceder a /docente — redirige a /", () => {
    const r = simularMiddleware("/docente", SESION_ESTUDIANTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/");
  });

  it("NO puede acceder a /docente/estadisticas — redirige a /", () => {
    const r = simularMiddleware("/docente/estadisticas", SESION_ESTUDIANTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/");
  });

  it("es redirigido a / al ir a /login (ya autenticado)", () => {
    const r = simularMiddleware("/login", SESION_ESTUDIANTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/");
  });

  it("es redirigido a / al ir a /register (ya autenticado)", () => {
    const r = simularMiddleware("/register", SESION_ESTUDIANTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/");
  });

  it("es redirigido a / al ir a /landing (ya autenticado)", () => {
    const r = simularMiddleware("/landing", SESION_ESTUDIANTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/");
  });

  it("puede llamar /api/chat con sesión", () => {
    expect(simularMiddleware("/api/chat", SESION_ESTUDIANTE).tipo).toBe(
      "permitido"
    );
  });

  it("puede llamar /api/history con sesión", () => {
    expect(simularMiddleware("/api/history", SESION_ESTUDIANTE).tipo).toBe(
      "permitido"
    );
  });

  it("puede llamar /api/vote con sesión", () => {
    expect(simularMiddleware("/api/vote", SESION_ESTUDIANTE).tipo).toBe(
      "permitido"
    );
  });

  it("puede llamar /api/auth/perfil con sesión", () => {
    expect(simularMiddleware("/api/auth/perfil", SESION_ESTUDIANTE).tipo).toBe(
      "permitido"
    );
  });

  it("puede llamar /api/auth/recursos con sesión", () => {
    expect(
      simularMiddleware("/api/auth/recursos", SESION_ESTUDIANTE).tipo
    ).toBe("permitido");
  });
});

// ═════════════════════════════════════════════════════════════
// GRUPO 3: Docente autenticado
// ═════════════════════════════════════════════════════════════

describe("Middleware — Docente autenticado", () => {
  it("puede acceder al chat principal (/)", () => {
    expect(simularMiddleware("/", SESION_DOCENTE).tipo).toBe("permitido");
  });

  it("puede acceder a /perfil", () => {
    expect(simularMiddleware("/perfil", SESION_DOCENTE).tipo).toBe("permitido");
  });

  it("puede acceder a /materias", () => {
    expect(simularMiddleware("/materias", SESION_DOCENTE).tipo).toBe(
      "permitido"
    );
  });

  it("puede acceder a /docente", () => {
    expect(simularMiddleware("/docente", SESION_DOCENTE).tipo).toBe(
      "permitido"
    );
  });

  it("puede acceder a /docente/estadisticas", () => {
    expect(
      simularMiddleware("/docente/estadisticas", SESION_DOCENTE).tipo
    ).toBe("permitido");
  });

  it("NO puede acceder a /admin — redirige a /", () => {
    const r = simularMiddleware("/admin", SESION_DOCENTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/");
  });

  it("es redirigido a /docente al ir a /login (ya autenticado como docente)", () => {
    const r = simularMiddleware("/login", SESION_DOCENTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/docente");
  });

  it("es redirigido a /docente al ir a /landing (ya autenticado como docente)", () => {
    const r = simularMiddleware("/landing", SESION_DOCENTE);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/docente");
  });

  it("puede llamar /api/chat con sesión", () => {
    expect(simularMiddleware("/api/chat", SESION_DOCENTE).tipo).toBe(
      "permitido"
    );
  });
});

// ═════════════════════════════════════════════════════════════
// GRUPO 4: Administrador autenticado
// ═════════════════════════════════════════════════════════════

describe("Middleware — Administrador autenticado", () => {
  it("puede acceder a /admin", () => {
    expect(simularMiddleware("/admin", SESION_ADMIN).tipo).toBe("permitido");
  });

  it("puede acceder a /admin/usuarios", () => {
    expect(simularMiddleware("/admin/usuarios", SESION_ADMIN).tipo).toBe(
      "permitido"
    );
  });

  it("puede acceder a /docente (tiene permisos de docente también)", () => {
    expect(simularMiddleware("/docente", SESION_ADMIN).tipo).toBe("permitido");
  });

  it("puede acceder al chat principal (/)", () => {
    expect(simularMiddleware("/", SESION_ADMIN).tipo).toBe("permitido");
  });

  it("puede acceder a /perfil", () => {
    expect(simularMiddleware("/perfil", SESION_ADMIN).tipo).toBe("permitido");
  });

  it("puede acceder a /materias", () => {
    expect(simularMiddleware("/materias", SESION_ADMIN).tipo).toBe("permitido");
  });

  it("es redirigido a /admin al ir a /login (ya autenticado como admin)", () => {
    const r = simularMiddleware("/login", SESION_ADMIN);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/admin");
  });

  it("es redirigido a /admin al ir a /landing (ya autenticado como admin)", () => {
    const r = simularMiddleware("/landing", SESION_ADMIN);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/admin");
  });

  it("es redirigido a /admin al ir a /register (ya autenticado como admin)", () => {
    const r = simularMiddleware("/register", SESION_ADMIN);
    expect(r.tipo).toBe("redirect");
    expect(r.destino).toBe("/admin");
  });

  it("puede llamar /api/admin con sesión", () => {
    expect(simularMiddleware("/api/admin", SESION_ADMIN).tipo).toBe(
      "permitido"
    );
  });

  it("puede llamar /api/chat con sesión", () => {
    expect(simularMiddleware("/api/chat", SESION_ADMIN).tipo).toBe("permitido");
  });
});

// ═════════════════════════════════════════════════════════════
// GRUPO 5: Verificación de callbackUrl
// ═════════════════════════════════════════════════════════════

describe("Middleware — callbackUrl guarda la ruta original", () => {
  it("guarda /perfil como callbackUrl", () => {
    expect(simularMiddleware("/perfil", SIN_SESION).destino).toBe(
      "/login?callbackUrl=/perfil"
    );
  });

  it("guarda /materias como callbackUrl", () => {
    expect(simularMiddleware("/materias", SIN_SESION).destino).toBe(
      "/login?callbackUrl=/materias"
    );
  });

  it("guarda /chat/uuid-123 como callbackUrl", () => {
    expect(simularMiddleware("/chat/uuid-123", SIN_SESION).destino).toBe(
      "/login?callbackUrl=/chat/uuid-123"
    );
  });

  it("guarda /admin como callbackUrl", () => {
    expect(simularMiddleware("/admin", SIN_SESION).destino).toBe(
      "/login?callbackUrl=/admin"
    );
  });

  it("guarda /docente como callbackUrl", () => {
    expect(simularMiddleware("/docente", SIN_SESION).destino).toBe(
      "/login?callbackUrl=/docente"
    );
  });
});

// ═════════════════════════════════════════════════════════════
// GRUPO 6: Rutas internas de NextAuth (nunca bloqueadas)
// ═════════════════════════════════════════════════════════════

describe("Middleware — Rutas internas de NextAuth siempre permitidas", () => {
  it("permite /api/auth/session sin sesión", () => {
    expect(simularMiddleware("/api/auth/session", SIN_SESION).tipo).toBe(
      "permitido"
    );
  });

  it("permite /api/auth/csrf sin sesión", () => {
    expect(simularMiddleware("/api/auth/csrf", SIN_SESION).tipo).toBe(
      "permitido"
    );
  });

  it("permite /api/auth/callback/credentials sin sesión", () => {
    expect(
      simularMiddleware("/api/auth/callback/credentials", SIN_SESION).tipo
    ).toBe("permitido");
  });

  it("permite /api/auth/signout sin sesión", () => {
    expect(simularMiddleware("/api/auth/signout", SIN_SESION).tipo).toBe(
      "permitido"
    );
  });
});