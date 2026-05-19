import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { guestRegex, isDevelopmentEnvironment } from "./lib/constants";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!token) {
    const redirectUrl = encodeURIComponent(new URL(request.url).pathname);
    return NextResponse.redirect(
      new URL(`${base}/api/auth/guest?redirectUrl=${redirectUrl}`, request.url)
    );
  }

  const isGuest = guestRegex.test(token?.email ?? "");
  const role = typeof token?.role === "string" ? token.role : "estudiante";
  const nombre = typeof token?.name === "string" ? token.name : "";

  if (token && !isGuest && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  // Redirigir docente a su panel cuando va a la raíz
  if (pathname === "/" && !isGuest && role === "docente") {
    return NextResponse.redirect(new URL(`${base}/docente`, request.url));
  }

  if (
    pathname.startsWith("/docente") &&
    role !== "docente" &&
    role !== "administrador"
  ) {
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  if (pathname.startsWith("/admin") && role !== "administrador") {
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  // Pasar datos del usuario por headers para evitar await auth() en layouts
  const response = NextResponse.next();
  response.headers.set("x-user-role", role);
  response.headers.set("x-user-name", nombre);
  response.headers.set(
    "x-user-id",
    typeof token?.id === "string" ? token.id : ""
  );

  return response;
}

export const config = {
  matcher: [
    "/",
    "/chat/:id",
    "/api/:path*",
    "/login",
    "/register",
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};