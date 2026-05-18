import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role === "administrador") {
    redirect("/admin");
  }

  redirect("/chat");
}