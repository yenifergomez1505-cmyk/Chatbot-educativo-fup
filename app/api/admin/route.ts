import { auth } from "@/app/(auth)/auth";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  getAllUsers,
  updateUserRole,
  getEstadisticas,
  getConsultasSinRespuesta,
  responderConsulta,
  deleteUser,
} from "@/lib/db/queries";
import type { UserRole } from "@/lib/db/schema";
import { z } from "zod";

async function verificarAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  const client = postgres(process.env.POSTGRES_URL ?? "");
  const db = drizzle(client);
  const { user } = await import("@/lib/db/schema");
  const { eq } = await import("drizzle-orm");
  const [dbUser] = await db
    .select({ role: user.role })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);
  if (!dbUser || dbUser.role !== "administrador") {
    return null;
  }
  return session;
}

export async function GET(request: Request) {
  const session = await verificarAdmin();
  if (!session) {
    return new Response("No autorizado", { status: 403 });
  }
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo");
  if (tipo === "estadisticas") {
    const stats = await getEstadisticas();
    return Response.json(stats);
  }
  if (tipo === "consultas") {
    const materia = searchParams.get("materia") ?? undefined;
    const consultas = await getConsultasSinRespuesta(materia);
    return Response.json(consultas);
  }
  const usuarios = await getAllUsers();
  return Response.json(usuarios);
}

export async function POST(request: Request) {
  const session = await verificarAdmin();
  if (!session) {
    return new Response("No autorizado", { status: 403 });
  }
  const body = await request.json();
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
    role: z
      .enum(["estudiante", "docente", "administrador"])
      .default("estudiante"),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return new Response("Datos inválidos", { status: 400 });
  }
  const { createUser } = await import("@/lib/db/queries");
  await createUser(
    parsed.data.email,
    parsed.data.password,
    parsed.data.role as UserRole,
    parsed.data.name
  );
  return Response.json({ success: true });
}

export async function PATCH(request: Request) {
  const session = await verificarAdmin();
  if (!session) {
    return new Response("No autorizado", { status: 403 });
  }
  const body = await request.json();
  if (body.tipo === "rol") {
    const schema = z.object({
      userId: z.string(),
      role: z.enum(["estudiante", "docente", "administrador"]),
    });
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return new Response("Datos inválidos", { status: 400 });
    }
    await updateUserRole(parsed.data.userId, parsed.data.role as UserRole);
    return Response.json({ success: true });
  }
  if (body.tipo === "responder") {
    const schema = z.object({
      consultaId: z.string(),
      respuesta: z.string().min(1),
    });
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return new Response("Datos inválidos", { status: 400 });
    }
    await responderConsulta(parsed.data.consultaId, parsed.data.respuesta);
    return Response.json({ success: true });
  }
  return new Response("Tipo no válido", { status: 400 });
}

export async function DELETE(request: Request) {
  const session = await verificarAdmin();
  if (!session) {
    return new Response("No autorizado", { status: 403 });
  }
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new Response("userId requerido", { status: 400 });
  }
  await deleteUser(userId);
  return Response.json({ success: true });
}
