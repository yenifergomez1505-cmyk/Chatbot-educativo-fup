import { expect, test } from "@playwright/test";

const EMAIL = "leidyj@fup.edu.co";
const PASSWORD = "123456";

async function login(page: any) {
  await page.goto("/login");
  await page.getByPlaceholder("jperez@fup.edu.co").fill(EMAIL);
  await page.getByPlaceholder("••••••••").fill(PASSWORD);
  await page.getByRole("button", { name: "Ingresar" }).click();
  await page.waitForFunction(() => !window.location.href.includes("/login"));
}

test.describe("Módulo 4 - Historial y seguimiento", () => {
  test("estudiante puede acceder a Mis recursos", async ({ page }) => {
    await login(page);
    await page.goto("/recursos");
    await expect(page).toHaveURL("/recursos");
  });

  test("la página de recursos se carga correctamente", async ({ page }) => {
    await login(page);
    await page.goto("/recursos");
    await expect(page.getByText(/Mis recursos/i)).toBeVisible();
  });

  test("estudiante puede acceder a su perfil", async ({ page }) => {
    await login(page);
    await page.goto("/perfil");
    await expect(page).toHaveURL("/perfil");
  });

  test("la página de perfil muestra los datos del usuario", async ({ page }) => {
    await login(page);
    await page.goto("/perfil");
    await expect(page.getByText(/perfil|nombre|correo/i)).toBeVisible();
  });

  test("el sidebar existe en la página principal", async ({ page }) => {
    await login(page);
    await page.goto("/");
    await expect(page.getByText(/Nuevo chat/i)).toBeAttached();
  });
});
