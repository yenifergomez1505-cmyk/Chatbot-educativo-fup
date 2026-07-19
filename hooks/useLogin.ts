import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { login } from "@/app/(auth)/actions";
import { toast } from "@/components/chat/toast";
import type { LoginActionState } from "@/types/auth";

const MENSAJES_ERROR: Record<string, string> = {
  failed: "Credenciales incorrectas.",
  invalid_data: "Revisa tu correo y contraseña.",
};

export function useLogin() {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [email, setEmail] = useState("");

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: "idle",
    }
  );

  useEffect(() => {
    if (state.status === "failed" || state.status === "invalid_data") {
      toast({ type: "error", description: MENSAJES_ERROR[state.status] });
      return;
    }
    if (state.status === "success") {
      setIsSuccessful(true);
      updateSession();
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setEmail(formData.get("email") as string);
    startTransition(() => formAction(formData));
  };

  return { email, isSuccessful, handleSubmit };
}
