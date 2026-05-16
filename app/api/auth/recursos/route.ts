import { auth } from "@/app/(auth)/auth";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";
import {
  saveRecurso,
  getRecursosByUserId,
  deleteRecurso,
} from "@/lib/db/queries";

const client = postgres(process.env.POSTGRES_URL ?? "");
const db = drizzle(client);

const saveSchema = z.object({
  chatId: z.string(),
  messageId: z.string(),
  contenido: z.string(),
  materia: z.string(),
  etiqueta: z.string().optional(),
});

// Obtener todos los recursos del usuario
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const recursos = await getRecursosByUserId(session.user.id);
  return Response.json(recursos);
}

// Guardar un recurso nuevo
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const parsed = saveSchema.safeParse(body);

  if (!parsed.success) {
    return new Response("Datos inválidos", { status: 400 });
  }

  await saveRecurso({
    userId: session.user.id,
    ...parsed.data,
  });

  return Response.json({ success: true });
}

// Eliminar un recurso
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("ID requerido", { status: 400 });
  }

  await deleteRecurso(id, session.user.id);
  return Response.json({ success: true });
}