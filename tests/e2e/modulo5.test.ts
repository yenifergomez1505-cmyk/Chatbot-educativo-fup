import { expect, test } from "@playwright/test";

const ESTUDIANTE_EMAIL = "leidyj@fup.edu.co";
const ESTUDIANTE_PASSWORD = "123456";
const ADMIN_EMAIL = "admin2@fup.edu.co";
const ADMIN_PASSWORD = "admin1";
const DOCENTE_EMAIL = "rol@fup.edu.co";
const DOCENTE_PASSWORD = "juan123";

async function loginComo(page: any, email: string, password: string) {
  await page.goto("/login");
  await page.getByPlaceholder("jperez@fup.edu.co").fill(email);
  await page.getByPlaceholder("••••••••").fill(password);
  await page.getByRole("button", { name: "Ingresar" }).click();
  await page.waitForFunction(() => !window.location.href.includes("/login"));
}

test.describe("Módulo 5 - Administración del sistema", () => {
  test("administrador puede acceder al panel admin", async ({ page }) => {
    await loginComo(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    await page.goto("/admin");
    await expect(page).toHaveURL("/admin");
  });

  test("panel admin muestra secciones principales", async ({ page }) => {
    await loginComo(page, ADMIN_EMAIL, ADMIN_PASSWORD);
    await page.goto("/admin");
    await expect(page.getByText("Administrador del sistema")).toBeVisible();
    await expect(page.getByText("Usuarios").first()).toBeVisible();
    await expect(page.getByText("Materias").first()).toBeVisible();
  });

  test("docente puede acceder al panel docente", async ({ page }) => {
    await loginComo(page, DOCENTE_EMAIL, DOCENTE_PASSWORD);
    await page.goto("/docente");
    await expect(page).toHaveURL("/docente");
  });

  test("panel docente muestra secciones principales", async ({ page }) => {
    await loginComo(page, DOCENTE_EMAIL, DOCENTE_PASSWORD);
    await page.goto("/docente");
    await expect(page.getByText(/Consultas/i).first()).toBeVisible();
  });

  test("estudiante no puede acceder al panel admin", async ({ page }) => {
    await loginComo(page, ESTUDIANTE_EMAIL, ESTUDIANTE_PASSWORD);
    await page.goto("/admin");
    await expect(page).not.toHaveURL("/admin");
  });

  test("estudiante puede ver respuestas del docente", async ({ page }) => {
    await loginComo(page, ESTUDIANTE_EMAIL, ESTUDIANTE_PASSWORD);
    await page.goto("/respuestas-docente");
    await expect(page.getByText(/Respuestas del docente/i)).toBeVisible();
  });
});
