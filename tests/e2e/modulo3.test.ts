import { expect, test } from "@playwright/test";

const EMAIL = "leidyj@fup.edu.co";
const PASSWORD = "123456";

async function login(page: any) {
  await page.goto("/login");
  await page.getByPlaceholder("jperez@fup.edu.co").fill(EMAIL);
  await page.getByPlaceholder("••••••••").fill(PASSWORD);
  await page.getByRole("button", { name: "Ingresar" }).click();
  await page.waitForURL(/\/$/);
}

test.describe("Módulo 3 - Índice temático", () => {
  test("estudiante puede acceder al índice temático", async ({ page }) => {
    await login(page);
    await page.goto("/materias");
    await expect(page).toHaveURL("/materias");
  });

  test("se muestran las tres materias en el índice", async ({ page }) => {
    await login(page);
    await page.goto("/materias");
    await expect(page.getByText("Programación Orientada a Objetos")).toBeVisible();
    await expect(page.getByText("Estructura de Datos")).toBeVisible();
    await expect(page.getByText("Ingeniería de Software")).toBeVisible();
  });

  test("se muestran ejemplos al seleccionar una materia en el chat", async ({ page }) => {
    await login(page);
    await page.goto("/");
    await page.getByRole("button", { name: /POO Clases/i }).click();
    await expect(page.getByRole("button", { name: /Herencia/i }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Encapsulamiento/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Polimorfismo/i }).last()).toBeVisible();
  });

  test("al hacer clic en ejemplo se inicia conversación", async ({ page }) => {
    await login(page);
    await page.goto("/");
    await page.getByRole("button", { name: /Estructura de Datos/i }).click();
    await page.getByRole("button", { name: /Lista enlazada/i }).click();
    await expect(page).toHaveURL(/materia=estructura-de-datos/);
  });
});
