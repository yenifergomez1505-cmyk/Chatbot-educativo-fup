"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "@/components/chat/toast";
import { type LoginActionState, login } from "../actions";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    { status: "idle" }
  );

  const { update: updateSession } = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router and updateSession are stable refs
  useEffect(() => {
    if (state.status === "failed") {
      toast({ type: "error", description: "Credenciales incorrectas." });
    } else if (state.status === "invalid_data") {
      toast({ type: "error", description: "Revisa tu correo y contraseña." });
    } else if (state.status === "success") {
      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <>
      <p className="mb-5 text-center text-[11px] text-edubot-medium">
        Ingresa a tu asistente académico
      </p>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-1 block text-[11px] font-medium text-edubot-primary"
            htmlFor="email"
          >
            Correo electrónico
          </label>
          <input
            className="w-full rounded-md border border-edubot-light bg-edubot-input px-3 py-2 text-xs text-edubot-dark outline-none"
            defaultValue={email}
            id="email"
            name="email"
            placeholder="jperez@fup.edu.co"
            required
            type="email"
          />
        </div>

        <div>
          <label
            className="mb-1 block text-[11px] font-medium text-edubot-primary"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="w-full rounded-md border border-edubot-light bg-edubot-input px-3 py-2 text-xs text-edubot-dark outline-none"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            type="password"
          />
        </div>

        <div className="text-right">
          <Link
            className="text-[11px] text-edubot-primary underline-offset-2 hover:underline"
            href="/forgot-password"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          className="w-full rounded-lg bg-edubot-primary py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          disabled={isSuccessful}
          type="submit"
        >
          {isSuccessful ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="mt-1 text-center text-[11px] text-edubot-medium">
          ¿No tienes cuenta?{" "}
          <Link
            className="font-medium text-edubot-primary underline-offset-2 hover:underline"
            href="/register"
          >
            Regístrate
          </Link>
        </p>
      </form>
    </>
  );
}
