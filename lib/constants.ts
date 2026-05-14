import { generateDummyPassword } from "./db/utils";

export const isProductionEnvironment = process.env.NODE_ENV === "production";
export const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT
);

export const guestRegex = /^guest-\d+$/;

export const DUMMY_PASSWORD = generateDummyPassword();

export const suggestions = [
  "¿Qué es la herencia en POO y cómo se aplica en Java?",
  "Explícame cómo funciona una lista enlazada con código",
  "¿Cuáles son las fases del ciclo de vida del software?",
  "Muéstrame un ejemplo de polimorfismo en Java",
];
