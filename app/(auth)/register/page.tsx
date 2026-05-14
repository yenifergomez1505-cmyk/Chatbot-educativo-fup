"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "@/components/chat/toast";
import { type RegisterActionState, register } from "../actions";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [role, setRole] = useState<"estudiante" | "docente">("estudiante");

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    { status: "idle" }
  );

  const { update: updateSession } = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router and updateSession are stable refs
  useEffect(() => {
    if (state.status === "user_exists") {
      toast({ type: "error", description: "¡Este correo ya está registrado!" });
    } else if (state.status === "failed") {
      toast({ type: "error", description: "Error al crear la cuenta." });
    } else if (state.status === "invalid_data") {
      toast({
        type: "error",
        description:
          "Revisa el correo y que la contraseña tenga mínimo 6 caracteres.",
      });
    } else if (state.status === "success") {
      toast({ type: "success", description: "¡Cuenta creada exitosamente!" });
      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("role", role);
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <>
      <h1 className="mb-1 text-center text-base font-semibold text-edubot-dark">
        Crear cuenta
      </h1>
      <p className="mb-5 text-center text-[11px] text-edubot-medium">
        Únete a EduBot FUP y empieza a aprender
      </p>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-1 block text-[11px] font-medium text-edubot-primary"
            htmlFor="name"
          >
            Nombre completo
          </label>
          <input
            className="w-full rounded-md border border-edubot-light bg-edubot-input px-3 py-2 text-xs text-edubot-dark outline-none"
            id="name"
            name="name"
            placeholder="Juan Camilo Pérez"
            type="text"
          />
        </div>

        <div>
          <label
            className="mb-1 block text-[11px] font-medium text-edubot-primary"
            htmlFor="email"
          >
            Correo institucional
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

        <div>
          <label
            className="mb-1 block text-[11px] font-medium text-edubot-primary"
            htmlFor="confirmPassword"
          >
            Confirmar contraseña
          </label>
          <input
            className="w-full rounded-md border border-edubot-light bg-edubot-input px-3 py-2 text-xs text-edubot-dark outline-none"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            type="password"
          />
        </div>

        {/* Pills de rol */}
        <div>
          {/* biome-ignore lint/a11y/noLabelWithoutControl: botones personalizados de rol */}
          <label className="mb-2 block text-[11px] font-medium text-edubot-primary">
            Selecciona tu rol
          </label>
          <div className="flex gap-2">
            <button
              className={`flex flex-1 flex-col items-center rounded-md py-2 text-[11px] font-medium transition-all border ${
                role === "estudiante"
                  ? "bg-edubot-bg border-edubot-primary text-edubot-dark"
                  : "bg-edubot-input border-edubot-light text-edubot-medium"
              }`}
              onClick={() => setRole("estudiante")}
              type="button"
            >
              <span className="mb-1 text-base">👤</span>
              Estudiante
            </button>
            <button
              className={`flex flex-1 flex-col items-center rounded-md py-2 text-[11px] font-medium transition-all border ${
                role === "docente"
                  ? "bg-edubot-bg border-edubot-primary text-edubot-dark"
                  : "bg-edubot-input border-edubot-light text-edubot-medium"
              }`}
              onClick={() => setRole("docente")}
              type="button"
            >
              <span className="mb-1 text-base">🧑‍🏫</span>
              Docente
            </button>
          </div>
          <input name="role" type="hidden" value={role} />
        </div>

        <button
          className="mt-1 w-full rounded-lg bg-edubot-primary py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          disabled={isSuccessful}
          type="submit"
        >
          {isSuccessful ? "Creando cuenta..." : "Registrarse"}
        </button>

        <p className="mt-1 text-center text-[11px] text-edubot-medium">
          ¿Ya tienes cuenta?{" "}
          <Link
            className="font-medium text-edubot-primary underline-offset-2 hover:underline"
            href="/login"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </>
  );
}
