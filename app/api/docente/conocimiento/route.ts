import { z } from "zod";
import { auth } from "@/app/(auth)/auth";
import {
  createTemaConocimiento,
  deleteTemaConocimiento,
  getTemasConocimiento,
  updateTemaConocimiento,
} from "@/lib/db/queries";

async function verificarDocenteOAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  const role = (session.user as { role?: string }).role;
  if (role !== "docente" && role !== "administrador") {
    return null;
  }
  return session;
}

const temaSchema = z.object({
  materia: z.string().min(1),
  nombre: z.string().min(1),
  contenido: z.string().min(1),
  activo: z.boolean(),
});

export async function GET() {
  const session = await verificarDocenteOAdmin();
  if (!session) {
    return new Response("No autorizado", { status: 403 });
  }
  const temas = await getTemasConocimiento();
  return Response.json(temas);
}

export async function POST(request: Request) {
  const session = await verificarDocenteOAdmin();
  if (!session?.user?.id) {
    return new Response("No autorizado", { status: 403 });
  }
  const body = await request.json();
  const parsed = temaSchema.safeParse(body);
  if (!parsed.success) {
    return new Response("Datos inválidos", { status: 400 });
  }
  await createTemaConocimiento({
    ...parsed.data,
    creadoPor: session.user.id,
  });
  return Response.json({ success: true });
}

export async function PATCH(request: Request) {
  const session = await verificarDocenteOAdmin();
  if (!session) {
    return new Response("No autorizado", { status: 403 });
  }
  const body = await request.json();
  const schema = temaSchema.extend({ id: z.string() });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return new Response("Datos inválidos", { status: 400 });
  }
  const { id, ...datos } = parsed.data;
  await updateTemaConocimiento(id, datos);
  return Response.json({ success: true });
}

export async function DELETE(request: Request) {
  const session = await verificarDocenteOAdmin();
  if (!session) {
    return new Response("No autorizado", { status: 403 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response("ID requerido", { status: 400 });
  }
  await deleteTemaConocimiento(id);
  return Response.json({ success: true });
}
