import type { NextAuthConfig } from "next-auth";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const authConfig = {
  basePath: "/api/auth",
  trustHost: true,
  pages: {
    signIn: `${base}/login` ,
    newUser: `${base}/`,
    signOut: `${base}/landing`,
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as { role?: string })?.role ?? "estudiante";
      const path = nextUrl.pathname;

      if (path.startsWith("/docente")) {
        if (!isLoggedIn) {
          return Response.redirect(new URL(`${base}/login`, nextUrl));
        }
        if (role !== "docente" && role !== "administrador") {
          return Response.redirect(new URL(`${base}/`, nextUrl));
        }
        return true;
      }

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