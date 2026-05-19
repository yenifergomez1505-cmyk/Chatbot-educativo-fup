import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { guestRegex, isDevelopmentEnvironment } from "./lib/constants";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Landing siempre accesible
  if (pathname === "/landing") {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  // Sin token → landing
  if (!token) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL(`${base}/landing`, request.url));
    }
    const redirectUrl = encodeURIComponent(new URL(request.url).pathname);
    return NextResponse.redirect(
      new URL(`${base}/api/auth/guest?redirectUrl=${redirectUrl}`, request.url)
    );
  }

  const isGuest = guestRegex.test(token?.email ?? "");
  const role = typeof token?.role === "string" ? token.role : "estudiante";
  const nombre = typeof token?.name === "string" ? token.name : "";

  // Invitado en raíz → landing
  if (pathname === "/" && isGuest) {
    return NextResponse.redirect(new URL(`${base}/landing`, request.url));
  }

  // Usuario real en raíz → redirigir según rol
  if (pathname === "/" && !isGuest) {
    if (role === "administrador") {
      return NextResponse.redirect(new URL(`${base}/admin`, request.url));
    }
    if (role === "docente") {
      return NextResponse.redirect(new URL(`${base}/docente`, request.url));
    }
    return NextResponse.next();
  }

 // Usuario real en login/register → redirigir según rol
 // Usuario real en login/register → dejar pasar siempre
  if (["/login", "/register"].includes(pathname)) {
    return NextResponse.next();
  }
  // Proteger rutas de docente
  if (pathname.startsWith("/docente") && role !== "docente" && role !== "administrador") {
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  // Proteger rutas de admin
  if (pathname.startsWith("/admin") && role !== "administrador") {
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-user-role", role);
  response.headers.set("x-user-name", nombre);
  response.headers.set("x-user-id", typeof token?.id === "string" ? token.id : "");
  return response;
}

export const config = {
  matcher: [
    "/",
    "/landing",
    "/chat/:id",
    "/api/:path*",
    "/login",
    "/register",
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};