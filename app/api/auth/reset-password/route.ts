import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { passwordResetToken, user } from "@/lib/db/schema";
import { generateHashedPassword } from "@/lib/db/utils";

const client = postgres(process.env.POSTGRES_URL ?? "");
const db = drizzle(client);

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json({ error: "Datos incompletos." }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json(
        { error: "La contraseña debe tener mínimo 6 caracteres." },
        { status: 400 }
      );
    }

    // Buscar el token en la BD
    const [resetToken] = await db
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.token, token));

    if (!resetToken) {
      return Response.json(
        { error: "Enlace inválido o ya utilizado." },
        { status: 400 }
      );
    }

    // Verificar que no haya expirado
    if (new Date() > resetToken.expiresAt) {
      await db
        .delete(passwordResetToken)
        .where(eq(passwordResetToken.token, token));
      return Response.json(
        { error: "El enlace ha expirado. Solicita uno nuevo." },
        { status: 400 }
      );
    }

    // Actualizar contraseña
    const hashedPassword = generateHashedPassword(password);
    await db
      .update(user)
      .set({ password: hashedPassword, updatedAt: new Date() })
      .where(eq(user.id, resetToken.userId));

    // Eliminar el token usado
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.token, token));

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
