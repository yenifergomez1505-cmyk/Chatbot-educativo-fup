import { z } from "zod";
import { auth } from "@/app/(auth)/auth";
import { saveConsultaSinRespuesta } from "@/lib/db/queries";

const schema = z.object({
  chatId: z.string(),
  messageId: z.string(),
  pregunta: z.string(),
  materia: z.string(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return new Response("Datos inválidos", { status: 400 });
  }

  await saveConsultaSinRespuesta({
    chatId: parsed.data.chatId,
    userId: session.user.id,
    pregunta: parsed.data.pregunta,
    materia: parsed.data.materia,
  });

  return Response.json({ success: true });
}
