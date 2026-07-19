import { z } from "zod";

const DOMINIO_ESTUDIANTE = "@estudiante.fup.edu.co";
const DOMINIO_DOCENTE = "@docente.fup.edu.co";

export function detectarRolPorCorreo(
  email: string
): "estudiante" | "docente" | null {
  if (email.endsWith(DOMINIO_ESTUDIANTE)) return "estudiante";
  if (email.endsWith(DOMINIO_DOCENTE)) return "docente";
  return null;
}

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  email: z
    .string()
    .email("Correo inválido")
    .refine((email) => detectarRolPorCorreo(email) !== null, {
      message:
        "Debes usar tu correo institucional (@estudiante.fup.edu.co o @docente.fup.edu.co)",
    }),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
  name: z.string().min(1, "El nombre es obligatorio").optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
