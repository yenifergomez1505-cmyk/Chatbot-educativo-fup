"use client";

import Link from "next/link";
import { useRegister } from "@/hooks/useRegister";
import { AuthInput } from "./AuthInput";

export function RegisterForm() {
  const { email, isSuccessful, handleSubmit } = useRegister();

  return (
    <>
      <h1 className="mb-1 text-center text-base font-semibold text-edubot-dark">
        Crear cuenta
      </h1>
      <p className="mb-5 text-center text-[11px] text-edubot-medium">
        Únete a EduBot FUP y empieza a aprender
      </p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <AuthInput
          id="name"
          label="Nombre completo"
          name="name"
          placeholder="Juan Camilo Pérez"
        />
        <AuthInput
          defaultValue={email}
          hint="Estudiante: @estudiante.fup.edu.co · Docente: @docente.fup.edu.co"
          id="email"
          label="Correo institucional"
          name="email"
          placeholder="usuario@estudiante.fup.edu.co"
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
        <AuthInput
          id="confirmPassword"
          label="Confirmar contraseña"
          name="confirmPassword"
          placeholder="••••••••"
          type="password"
        />
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
