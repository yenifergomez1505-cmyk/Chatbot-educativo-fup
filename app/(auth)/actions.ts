"use server";

import { z } from "zod";
import { createUser, getUser } from "@/lib/db/queries";
import { signIn } from "./auth";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// validación de correo institucional
const registerFormSchema = z.object({
  email: z
    .string()
    .email("Correo inválido")
    .refine((email) => email.endsWith("@fup.edu.co"), {
      message: "Debes usar tu correo institucional (@fup.edu.co)",
    }),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
  role: z.enum(["estudiante", "docente"]).default("estudiante"),
  name: z.string().optional(),
});

export type LoginActionState = {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
};

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
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

export type RegisterActionState = {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data"
    | "invalid_email"; // estado para correo no institucional
};

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const validatedData = registerFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      name: formData.get("name"),
    });

    const [user] = await getUser(validatedData.email);

    if (user) {
      return { status: "user_exists" } as RegisterActionState;
    }

    await createUser(
      validatedData.email,
      validatedData.password,
      validatedData.role,
      validatedData.name ?? ""
    );

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // detectar específicamente el error de correo institucional
      const emailError = error.errors.find((e) =>
        e.message.includes("institucional")
      );
      if (emailError) {
        return { status: "invalid_email" } as RegisterActionState;
      }
      return { status: "invalid_data" };
    }
    return { status: "failed" };
  }
};
