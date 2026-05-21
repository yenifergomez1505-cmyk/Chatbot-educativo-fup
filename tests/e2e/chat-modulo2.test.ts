import { expect, test } from "@playwright/test";

const EMAIL = "leidyj@fup.edu.co";
const PASSWORD = "123456";

async function login(page: any) {
  await page.goto("/login");
  await page.getByPlaceholder("jperez@fup.edu.co").fill(EMAIL);
  await page.getByPlaceholder("••••••••").fill(PASSWORD);
  await page.getByRole("button", { name: "Ingresar" }).click();
  await page.waitForURL("/");
}

test.describe("Módulo 2 - Interacción con el Chatbot", () => {
  test("estudiante ve el selector de materias al iniciar sesión", async ({ page }) => {
    await login(page);
    await expect(page.getByText("Selecciona una materia para comenzar")).toBeVisible();
  });

  test("se muestran las materias disponibles", async ({ page }) => {
    await login(page);
    await expect(page.getByText("POO")).toBeVisible();
    await expect(page.getByText("Estructura de Datos")).toBeVisible();
    await expect(page.getByText("Ingeniería de Software I")).toBeVisible();
  });

  test("estudiante puede seleccionar una materia", async ({ page }) => {
    await login(page);
    await page.getByText("POO").click();
    await expect(page.getByText("Seleccionada")).toBeVisible();
  });

  test("botón iniciar conversación se activa al seleccionar materia", async ({ page }) => {
    await login(page);
    const boton = page.getByRole("button", { name: /Iniciar conversación/i });
    await expect(boton).toBeDisabled();
    await page.getByText("Estructura de Datos").click();
    await expect(boton).toBeEnabled();
  });

  test("al iniciar conversación la URL cambia con la materia", async ({ page }) => {
    await login(page);
    await page.getByText("POO").click();
    await page.getByRole("button", { name: /Iniciar conversación/i }).click();
    await expect(page).toHaveURL(/materia=poo/);
  });
});
