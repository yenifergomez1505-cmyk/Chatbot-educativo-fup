import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = (session.user as { role?: string })?.role ?? "estudiante";

  if (role === "administrador") {
    redirect("/admin");
  }

  if (role === "docente") {
    redirect("/docente");
  }

  return null;
}
