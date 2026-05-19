import type { NextAuthConfig } from "next-auth";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const authConfig = {
  basePath: "/api/auth",
  trustHost: true,
  pages: {
    signIn: `${base}/login`,
    newUser: `${base}/`,
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as { role?: string })?.role ?? "estudiante";
      const path = nextUrl.pathname;

      // Redirigir docente a su panel cuando va a la raíz
      if (path === "/" && isLoggedIn && role === "docente") {
        return Response.redirect(new URL(`${base}/docente`, nextUrl));
      }

      // Proteger rutas de docente
      if (path.startsWith("/docente")) {
        if (!isLoggedIn) {
          return Response.redirect(new URL(`${base}/login`, nextUrl));
        }
        if (role !== "docente" && role !== "administrador") {
          return Response.redirect(new URL(`${base}/`, nextUrl));
        }
        return true;
      }

      // Proteger rutas de admin
      if (path.startsWith("/admin")) {
        if (!isLoggedIn) {
          return Response.redirect(new URL(`${base}/login`, nextUrl));
        }
        if (role !== "administrador") {
          return Response.redirect(new URL(`${base}/`, nextUrl));
        }
        return true;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;