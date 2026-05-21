import { expect, test } from "@playwright/test";

test.describe("Módulo 1 - Autenticación", () => {
  test("la página de login se carga correctamente", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByPlaceholder("jperez@fup.edu.co")).toBeVisible();
    await expect(page.getByRole("button", { name: "Ingresar" })).toBeVisible();
  });

  test("la página de registro se carga correctamente", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByPlaceholder("Juan Camilo Pérez")).toBeVisible();
    await expect(page.getByPlaceholder("@fup.edu.co")).toBeVisible();
    await expect(page.getByRole("button", { name: "Registrarse" })).toBeVisible();
  });

  test("navegar de login a registro", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: "Regístrate" }).click();
    await expect(page).toHaveURL("/register");
  });

  test("navegar de registro a login", async ({ page }) => {
    await page.goto("/register");
    await page.getByRole("link", { name: /inicia|ingresa/i }).click();
    await expect(page).toHaveURL("/login");
  });

  test("no permite login con credenciales incorrectas", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("jperez@fup.edu.co").fill("noexiste@fup.edu.co");
    await page.getByPlaceholder("••••••••").fill("wrongpassword");
    await page.getByRole("button", { name: "Ingresar" }).click();
    await expect(page).toHaveURL("/login");
  });

  test("la landing page se carga para usuarios no autenticados", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Tu asistente académico/i })
    ).toBeVisible();
  });
});
