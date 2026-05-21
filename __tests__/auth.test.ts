/// <reference types="vitest/globals" />
import { vi } from "vitest";
import { z } from "zod";

// Recreamos el schema exactamente como está en actions.ts
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

test("falla si el correo no es institucional", () => {
  const resultado = registerFormSchema.safeParse({
    email: "estudiante@gmail.com",
    password: "123456",
    role: "estudiante",
  });

  expect(resultado.success).toBe(false);

  const tieneErrorInstitucional = resultado.error?.errors.some((e) =>
    e.message.includes("institucional")
  );
  expect(tieneErrorInstitucional).toBe(true);
});

test("falla si la contraseña tiene menos de 6 caracteres", () => {
  const resultado = registerFormSchema.safeParse({
    email: "estudiante@fup.edu.co",
    password: "123",
    role: "estudiante",
  });

  expect(resultado.success).toBe(false);
  expect(resultado.error?.errors[0].message).toBe(
    "La contraseña debe tener mínimo 6 caracteres"
  );
});

test("falla si el correo tiene formato inválido", () => {
  const resultado = registerFormSchema.safeParse({
    email: "esto-no-es-un-correo",
    password: "123456",
    role: "estudiante",
  });

  expect(resultado.success).toBe(false);
});

test("pasa la validación con datos correctos", () => {
  const resultado = registerFormSchema.safeParse({
    email: "nuevo@fup.edu.co",
    password: "123456",
    role: "estudiante",
  });

  expect(resultado.success).toBe(true);
  expect(resultado.data?.email).toBe("nuevo@fup.edu.co");
  expect(resultado.data?.role).toBe("estudiante");
});