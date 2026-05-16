import { auth } from "@/app/(auth)/auth";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcrypt-ts";
import { z } from "zod";

const client = postgres(process.env.POSTGRES_URL ?? "");
const db = drizzle(client);

const updateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  password: z.string().min(6).optional(),
  currentPassword: z.string().optional(),
  image: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  if (!result[0]) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(result[0]);
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return new Response("Datos inválidos", { status: 400 });
  }

  const { name, password, currentPassword, image } = parsed.data;
  const updates: Record<string, unknown> = {};

  if (name) updates.name = name;
  if (image) updates.image = image;

  if (password && currentPassword) {
    const currentUser = await db
      .select({ password: user.password })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    const isValid = await compare(
      currentPassword,
      currentUser[0]?.password ?? ""
    );

    if (!isValid) {
      return Response.json(
        { error: "Contraseña actual incorrecta" },
        { status: 400 }
      );
    }

    updates.password = await hash(password, 10);
  }

  updates.updatedAt = new Date();

  await db.update(user).set(updates).where(eq(user.id, session.user.id));

  return Response.json({ success: true });
}