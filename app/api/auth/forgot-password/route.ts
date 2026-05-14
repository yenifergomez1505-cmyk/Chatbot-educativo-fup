import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Resend } from "resend";
import { passwordResetToken, user } from "@/lib/db/schema";

const client = postgres(process.env.POSTGRES_URL ?? "");
const db = drizzle(client);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { error: "El correo es requerido." },
        { status: 400 }
      );
    }

    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (!existingUser) {
      return Response.json({ ok: true });
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await db.insert(passwordResetToken).values({
      userId: existingUser.id,
      token,
      expiresAt,
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/reset-password?token=${token}`;

    await resend.emails.send({
      from: "EduBot FUP <onboarding@resend.dev>",
      to: email,
      subject: "Restablecer contraseña - EduBot FUP",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #E6F1FB; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-size: 32px;">🤖</span>
            <h1 style="color: #0C447C; font-size: 20px; margin: 8px 0 4px;">EduBot FUP</h1>
            <p style="color: #378ADD; font-size: 12px; margin: 0;">Ingeniería de Sistemas</p>
          </div>
          <div style="background: white; border-radius: 12px; padding: 24px; border: 0.5px solid #B5D4F4;">
            <h2 style="color: #0C447C; font-size: 16px; margin: 0 0 12px;">Restablecer contraseña</h2>
            <p style="color: #378ADD; font-size: 13px; margin: 0 0 20px;">
              Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón para continuar.
            </p>
            <a href="${resetUrl}" style="display: block; background: #185FA5; color: white; text-align: center; padding: 12px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
              Restablecer contraseña
            </a>
            <p style="color: #85B7EB; font-size: 11px; margin: 16px 0 0; text-align: center;">
              Este enlace expira en 1 hora. Si no solicitaste esto, ignora este correo.
            </p>
          </div>
          <p style="color: #85B7EB; font-size: 10px; text-align: center; margin-top: 16px;">
            © 2026 EduBot FUP · Todos los derechos reservados
          </p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
