import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { register } from "@/app/(auth)/actions";
import { toast } from "@/components/chat/toast";
import type { RegisterActionState } from "@/types/auth";

const MENSAJES_ERROR: Record<string, string> = {
  user_exists: "¡Este correo ya está registrado!",
  failed: "Error al crear la cuenta.",
  invalid_data:
    "Revisa el correo y que la contraseña tenga mínimo 6 caracteres.",
  invalid_email:
    "Debes usar tu correo institucional (@estudiante.fup.edu.co o @docente.fup.edu.co)",
};

export function useRegister() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    }
  );

  useEffect(() => {
    const mensaje = MENSAJES_ERROR[state.status];
    if (mensaje) {
      toast({ type: "error", description: mensaje });
      return;
    }
    if (state.status === "success") {
      toast({ type: "success", description: "¡Cuenta creada exitosamente!" });
      setIsSuccessful(true);
      router.push("/login");
    }
  }, [state.status, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setEmail(formData.get("email") as string);
    startTransition(() => formAction(formData));
  };

  return { email, isSuccessful, handleSubmit };
}
