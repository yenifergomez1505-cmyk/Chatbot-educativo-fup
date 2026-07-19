"use server";

import { z } from "zod";
import { createUser, getUser } from "@/lib/db/queries";
import {
  detectarRolPorCorreo,
  loginSchema,
  registerSchema,
} from "@/lib/validations/auth";
import type { LoginActionState, RegisterActionState } from "@/types/auth";
import { signIn } from "./auth";

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validated = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validated.email,
      password: validated.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }
    return { status: "failed" };
  }
};

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const validated = registerSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });

    const [usuarioExistente] = await getUser(validated.email);
    if (usuarioExistente) {
      return { status: "user_exists" };
    }

    // El rol se detecta automáticamente por el dominio del correo
    const rol = detectarRolPorCorreo(validated.email);
    if (!rol) {
      return { status: "invalid_email" };
    }

    await createUser(
      validated.email,
      validated.password,
      rol,
      validated.name ?? ""
    );

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorCorreo = error.errors.find((e) =>
        e.message.includes("institucional")
      );
      if (errorCorreo) {
        return { status: "invalid_email" };
      }
      return { status: "invalid_data" };
    }
    return { status: "failed" };
  }
};
