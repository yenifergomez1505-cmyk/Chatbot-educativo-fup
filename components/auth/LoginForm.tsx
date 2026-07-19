"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { AuthInput } from "./AuthInput";

export function LoginForm() {
  const { email, isSuccessful, handleSubmit } = useLogin();

  return (
    <>
      <p className="mb-5 text-center text-[11px] text-edubot-medium">
        Ingresa a tu asistente académico
      </p>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <AuthInput
          defaultValue={email}
          id="email"
          label="Correo electrónico"
          name="email"
          placeholder="jperez@fup.edu.co"
          required
          type="email"
        />

        <AuthInput
          id="password"
          label="Contraseña"
          name="password"
          placeholder="••••••••"
          required
          type="password"
        />

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
