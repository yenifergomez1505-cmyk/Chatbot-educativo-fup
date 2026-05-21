import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import LandingPage from "@/app/landing/page";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return <LandingPage />;
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
