/// <reference types="vitest/globals" />
import { generateHashedPassword, generateDummyPassword } from "@/lib/db/utils";
import { compareSync } from "bcrypt-ts";

test("generateHashedPassword genera un hash diferente a la contraseña original", () => {
  const password = "miContraseña123";
  const hash = generateHashedPassword(password);

  expect(hash).not.toBe(password);
});

test("generateHashedPassword genera un hash que se puede verificar", () => {
  const password = "miContraseña123";
  const hash = generateHashedPassword(password);

  const esValido = compareSync(password, hash);
  expect(esValido).toBe(true);
});

test("generateHashedPassword con la misma contraseña genera hashes diferentes", () => {
  const password = "miContraseña123";
  const hash1 = generateHashedPassword(password);
  const hash2 = generateHashedPassword(password);

  expect(hash1).not.toBe(hash2);
});

test("generateDummyPassword genera una contraseña hasheada", () => {
  const hash = generateDummyPassword();

  expect(hash).toBeTruthy();
  expect(hash.length).toBeGreaterThan(10);
});