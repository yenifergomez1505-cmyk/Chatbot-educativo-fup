import { auth } from "@/app/(auth)/auth";
import { getAllConsultas } from "@/lib/db/queries";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("No autorizado", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const materia = searchParams.get("materia") ?? undefined;

  const todas = await getAllConsultas(materia);
  const respondidas = todas.filter((c) => c.respondida && c.respuestaDocente);

  return Response.json(respondidas);
}
