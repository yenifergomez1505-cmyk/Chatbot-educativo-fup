import { auth } from "@/app/(auth)/auth";
import { getTemasActivosPorMateria } from "@/lib/db/queries";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("No autorizado", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const materia = searchParams.get("materia");

  if (!materia) {
    return new Response("Materia requerida", { status: 400 });
  }

  const temas = await getTemasActivosPorMateria(materia);
  return Response.json(temas);
}
